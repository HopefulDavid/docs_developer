import { afterAll, beforeAll, expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dir, '..');
const gitCliff = Bun.which('git-cliff', { PATH: path.join(root, 'node_modules', '.bin') });
// Git-cliff občas ověřuje novou verzi na síti a čekání může přesáhnout výchozí limit testu.
const timeout = 30_000;
let repository;
let head;

beforeAll(() => {
  repository = mkdtempSync(path.join(tmpdir(), 'docs-changelog-'));
  run(['git', 'init', '--quiet']);
  run(['git', 'remote', 'add', 'origin', 'https://github.com/example/changelog-fixture.git']);
  commit('feat: přidej první změnu', '2024-08-27T12:00:00+02:00');
  run(['git', 'tag', 'v1.0.0']);
  commit('fix: oprav starší změnu', '2025-05-10T12:00:00+02:00');
  commit('docs: doplň starší návod', '2025-06-11T12:00:00+02:00');
  commit('ci: ověř aktuální změnu', '2025-12-31T23:30:00+00:00');
  commit('feat(core)!: změň veřejný kontrakt', '2026-08-28T13:00:00+02:00');
  commit('historický záznam', '2026-08-28T14:00:00+02:00');
  head = run(['git', 'rev-parse', '--short=7', 'HEAD']).trim();
}, timeout);

afterAll(() => rmSync(repository, { recursive: true, force: true }));

test('stránka změn řadí úplnou historii po letech a kategoriích bez ohledu na tagy a vzdálený repozitář', () => {
  const changelog = generate('Europe/Prague');

  expect(changelog).toStartWith('# Změny\n');
  expect(changelog).toContain(`> Zdrojový stav: \`${head}\`. Zahrnuté commity: **6**.`);
  expect(headings(changelog)).toEqual([
    '## Nejnovější období · 2026',
    '### ✨ Nové funkce',
    '### 🧾 Ostatní změny',
    '### 🔩 Technické změny',
    '<summary><strong>2025</strong> · počet změn: 2</summary>',
    '### 🐛 Opravy',
    '### 📚 Dokumentace',
    '<summary><strong>2024</strong> · počet změn: 1</summary>',
    '### ✨ Nové funkce',
  ]);
  expect(changelog).not.toContain('1.0.0');
  expect(changelog).not.toContain('https://github.com');
}, timeout);

test('stránka změn zachovává stálé kotvy roků a kategorií', () => {
  const anchors = [...generate('Europe/Prague').matchAll(/<a id="([^"]+)">/g)].map(([, id]) => id);

  expect(anchors).toEqual([
    'obdobi-2026',
    'nove-funkce',
    'nove-funkce-2026',
    'ostatni-zmeny',
    'ostatni-zmeny-2026',
    'technicke-zmeny',
    'technicke-zmeny-2026',
    'obdobi-2025',
    'opravy',
    'opravy-2025',
    'dokumentace',
    'dokumentace-2025',
    'obdobi-2024',
    'nove-funkce-2024',
  ]);
}, timeout);

test('záznam uvádí rozsah, nekompatibilitu, pražské datum a zkrácený otisk', () => {
  const changelog = generate('Europe/Prague');

  expect(changelog).toMatch(
    /- ⚠️ \*\*Nekompatibilní změna:\*\* \*\*core:\*\* Změň veřejný kontrakt · 2026-08-28 · `[0-9a-f]{7}`/,
  );
  expect(changelog).toMatch(/<summary>Zobrazit technické záznamy \(1\)<\/summary>\n\n- Ověř aktuální změnu · 2026-01-01 · /);
  expect(changelog).toContain('- Historický záznam · 2026-08-28 · ');
  expect(generate('UTC')).toBe(changelog);
}, timeout);

function headings(changelog) {
  return changelog.split('\n').filter((line) => /^(?:##|<summary><strong>)/.test(line));
}

function generate(timeZone) {
  return run([gitCliff, '--config', path.join(root, 'cliff.toml')], { TZ: timeZone }).replaceAll('\r\n', '\n');
}

function commit(message, date) {
  run(['git', '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid',
    'commit', '--quiet', '--allow-empty', '-m', message],
  { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date });
}

function run(command, environment = {}) {
  const { exitCode, stdout, stderr } = Bun.spawnSync(command, {
    cwd: repository,
    env: { ...process.env, ...environment },
  });
  if (exitCode !== 0) throw new Error(`${command.join(' ')}: ${stderr}`);
  return stdout.toString();
}
