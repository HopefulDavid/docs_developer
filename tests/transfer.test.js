const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const script = path.join(root, 'programming', 'packages', 'offline', 'transfer.ps1');

function invoke(cwd, env, scriptPath, args, input = '') {
  const result = spawnSync('pwsh', ['-NoProfile', '-File', scriptPath, ...args], {
    cwd,
    env,
    encoding: 'utf8',
    input,
    timeout: 120000,
  });
  assert.ifError(result.error);
  return { code: result.status, output: result.stdout + result.stderr };
}

test('záloha, kontrola, obnova a úklid používají stejnou přesnou cestu archivu', (context) => {
  const available = spawnSync('pwsh', ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.ToString()'], {
    encoding: 'utf8',
  });
  if (available.error?.code === 'ENOENT') {
    context.skip('PowerShell 6 není nainstalovaný');
    return;
  }
  assert.equal(available.status, 0, available.stderr);

  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'transfer-test-'));
  const project = path.join(fixture, 'projekt');
  const archive = path.join(fixture, 'archiv');
  const occupied = path.join(fixture, 'obsazeno');
  const temp = path.join(fixture, 'temp');
  const env = { ...process.env, TEMP: temp, TMP: temp };
  try {
    fs.mkdirSync(project);
    fs.mkdirSync(temp);
    fs.mkdirSync(occupied);
    fs.copyFileSync(script, path.join(occupied, 'transfer.ps1'));
    fs.writeFileSync(path.join(project, 'package.json'), '{"name":"transfer-test","version":"1.0.0","private":true}\n');
    fs.writeFileSync(path.join(project, 'package-lock.json'), '{"name":"transfer-test","version":"1.0.0","lockfileVersion":3,"packages":{"":{"name":"transfer-test","version":"1.0.0"}}}\n');

    const rejected = invoke(fixture, env, script, ['-Akce', 'Zaloha', '-Spravce', 'npm', '-Rozsah', 'Lokalni', '-Projekt', project, '-Archiv', occupied]);
    assert.notEqual(rejected.code, 0);
    assert.match(rejected.output, /nová nebo prázdná složka/);
    assert.deepEqual(fs.readdirSync(occupied), ['transfer.ps1']);

    const backup = invoke(fixture, env, script, ['-Akce', 'Zaloha', '-Spravce', 'npm', '-Rozsah', 'Lokalni', '-Projekt', project, '-Archiv', archive]);
    assert.equal(backup.code, 0, backup.output);
    assert.match(backup.output, /Záloha je připravena/);
    assert.ok(fs.existsSync(path.join(archive, 'archiv.json')));
    const archivedScript = path.join(archive, 'transfer.ps1');
    assert.ok(fs.existsSync(archivedScript));

    const missing = invoke(fixture, env, archivedScript, ['-Akce', 'Obnova', '-Archiv', path.join(fixture, 'chybi')]);
    assert.notEqual(missing.code, 0);
    assert.match(missing.output, /chybí archiv\.json/);

    const verify = invoke(fixture, env, archivedScript, ['-Akce', 'Overeni', '-Archiv', archive]);
    assert.equal(verify.code, 0, verify.output);
    assert.match(verify.output, /Archiv je úplný/);

    const archivedProject = path.join(archive, 'projekt', 'package.json');
    fs.appendFileSync(archivedProject, ' ');
    const damaged = invoke(fixture, env, archivedScript, ['-Akce', 'Overeni', '-Archiv', archive]);
    assert.notEqual(damaged.code, 0);
    assert.match(damaged.output, /Poškozený soubor archivu/);
    fs.truncateSync(archivedProject, fs.statSync(archivedProject).size - 1);

    const differentProject = path.join(fixture, 'jiny-projekt');
    fs.mkdirSync(differentProject);
    fs.writeFileSync(path.join(differentProject, 'package.json'), '{"name":"jiny-projekt","version":"1.0.0"}\n');
    fs.copyFileSync(path.join(project, 'package-lock.json'), path.join(differentProject, 'package-lock.json'));
    const mismatch = invoke(fixture, env, archivedScript, ['-Akce', 'Obnova', '-Archiv', archive, '-Projekt', differentProject]);
    assert.notEqual(mismatch.code, 0);
    assert.match(mismatch.output, /jiné závislosti nebo konfiguraci/);

    const manifest = path.join(archive, 'archiv.json');
    const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    metadata.verze = 'jiná kompatibilní verze správce';
    metadata.platforma = 'jiný operační systém / X64';
    fs.writeFileSync(manifest, JSON.stringify(metadata));

    const restore = invoke(fixture, env, archivedScript, ['-Akce', 'Obnova', '-Archiv', archive, '-Projekt', project]);
    assert.equal(restore.code, 0, restore.output);
    assert.match(restore.output, /Obnova dokončena/);
    assert.ok(fs.existsSync(path.join(archive, 'archiv.json')));
    const repeated = invoke(fixture, env, archivedScript, ['-Akce', 'Obnova', '-Archiv', archive, '-Projekt', project]);
    assert.equal(repeated.code, 0, repeated.output);

    const interactive = invoke(fixture, env, archivedScript, ['-Akce', 'Overeni'], '\n');
    assert.equal(interactive.code, 0, interactive.output);
    assert.ok(interactive.output.includes(`Archiv: ${archive}`), interactive.output);

    const sourceDefault = invoke(fixture, env, script, ['-Akce', 'Overeni'], '\n');
    assert.equal(sourceDefault.code, 0, sourceDefault.output);
    assert.ok(sourceDefault.output.includes(`Archiv: ${archive}`), sourceDefault.output);

    const cancelled = invoke(fixture, env, archivedScript, ['-Akce', 'Uklid', '-Archiv', archive], 'NE\n');
    assert.equal(cancelled.code, 0, cancelled.output);
    assert.ok(fs.existsSync(path.join(archive, 'archiv.json')));

    const cleanup = invoke(fixture, env, archivedScript, ['-Akce', 'Uklid', '-Archiv', archive], 'SMAZAT\n');
    assert.equal(cleanup.code, 0, cleanup.output);
    assert.equal(fs.existsSync(archive), false);
  } finally {
    assert.equal(path.dirname(fixture), os.tmpdir());
    assert.match(path.basename(fixture), /^transfer-test-/);
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
