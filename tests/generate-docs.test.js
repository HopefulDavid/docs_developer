const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const docfx = require('../docfx.json');
const {
  cleanInline,
  isInternalArtifactPath,
  isInternalPath,
} = require('../scripts/generate-docs.js');

const root = path.resolve(__dirname, '..');

test('normalizace zachovává čitelný název .NET v nadpisu i textu', () => {
  for (const text of [
    'Vypnutí telemetrie .NET SDK',
    'Správa nástrojů .NET CLI a vypnutí telemetrie .NET SDK.',
    'Telemetrii .NET SDK vypneš proměnnou prostředí.',
    'Příkazy .NET CLI spouštěj v .NET SDK.',
  ]) {
    assert.equal(cleanInline(text), text);
  }

  assert.equal(cleanInline('  SDK  .NET : nastavení , ověření .  '),
    'SDK .NET: nastavení, ověření.');
});

test('normalizace zachovává příkazy v Markdown kódu uvnitř tabulek a textu', () => {
  for (const text of [
    '| Nahrání | `scp ./soubor.txt uzivatel@server.example.com:/home/uzivatel/` |',
    '| Stažení | `scp uzivatel@server.example.com:/home/uzivatel/soubor.txt ./` |',
    '| Adresář | `scp -P 2222 -r ./slozka uzivatel@server.example.com:/home/uzivatel/` |',
    'Příkaz `ssh server "echo A & echo B"` zachová argumenty.',
    'PowerShell: ``Write-Output `"A  &  B`"``.',
    'Vnořený oddělovač: ```text `` a ` .```.',
  ]) {
    assert.equal(cleanInline(text), text);
  }

  assert.equal(cleanInline('  Spusť  `ssh server "echo A & echo B"` , poté  `scp ./a ./b` .  '),
    'Spusť `ssh server "echo A & echo B"`, poté `scp ./a ./b`.');
});

function hasExactPath(relPath) {
  let current = root;

  for (const segment of relPath.split('/')) {
    const actual = fs.readdirSync(current).find((entry) => entry === segment);
    if (!actual) {
      return false;
    }
    current = path.join(current, actual);
  }

  return true;
}

test('interní projektové dokumenty jsou mimo veřejný obsah', () => {
  for (const relPath of [
    'AGENTS.md',
    'README.md',
    'CLAUDE.md',
    'docs/index.md',
    'docs/work/WORK-example.md',
    'database/AGENTS.md',
    'database/nested/AGENTS.override.md',
  ]) {
    assert.equal(isInternalPath(relPath), true, `Cesta musí být interní: ${relPath}`);
  }

  assert.equal(isInternalPath('database/agents.md'), false);
  assert.equal(isInternalPath('database/dapper.md'), false);
});

test('artefakt odmítá odvozené interní stránky v každé hloubce', () => {
  for (const relPath of [
    'AGENTS.html',
    'README.html',
    'CLAUDE.html',
    'docs/index.html',
    'docs/work/WORK-example.html',
    'database/AGENTS.html',
    'database/nested/AGENTS.override.html',
  ]) {
    assert.equal(
      isInternalArtifactPath(relPath),
      true,
      `Artefakt musí odmítnout interní cestu: ${relPath}`,
    );
  }

  assert.equal(isInternalArtifactPath('database/agents.html'), false);
  assert.equal(isInternalArtifactPath('database/dapper.html'), false);
});

test('DocFX explicitně vylučuje projektová metadata a instrukce', () => {
  const excludes = new Set(docfx.build.content[0].exclude);

  for (const pattern of [
    'docs/**',
    'private/**',
    'README.md',
    'AGENTS.md',
    'AGENTS.override.md',
    '**/AGENTS.md',
    '**/AGENTS.override.md',
    'CLAUDE.md',
  ]) {
    assert.equal(excludes.has(pattern), true, `Chybí DocFX exclusion ${pattern}`);
  }
});

test('DocFX používá české rozhraní bez editačních odkazů', () => {
  const customTemplate = docfx.build.template.at(-1);
  const tokens = JSON.parse(
    fs.readFileSync(path.join(root, customTemplate, 'token.json'), 'utf8'),
  );

  assert.equal(docfx.build.globalMetadata._lang, 'cs');
  assert.equal(docfx.build.globalMetadata._disableContribution, true);
  assert.equal(tokens.inThisArticle, 'V tomto článku');
  assert.equal(tokens.improveThisDoc, 'Upravit tuto stránku');
});

test('veřejné case-only migrace používají přesné lowercase cesty', () => {
  const canonicalPaths = [
    'database/dapper.md',
    'database/mssql.md',
    'database/postgresql.md',
    'database/mongodb.md',
    'ide/jetbrains.md',
  ];
  const retiredPaths = [
    'database/Dapper.md',
    'database/MSSQL.md',
    'database/PostgreSQL.md',
    'database/mongoDB.md',
    'ide/jetBrains.md',
  ];

  for (const relPath of canonicalPaths) {
    assert.equal(hasExactPath(relPath), true, `Chybí lowercase cesta ${relPath}`);
  }

  for (const relPath of retiredPaths) {
    assert.equal(hasExactPath(relPath), false, `Zůstala mixed-case cesta ${relPath}`);
  }
});
