const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const docfx = require('../docfx.json');
const {
  isInternalArtifactPath,
  isInternalPath,
} = require('../scripts/generate-docs.js');

const root = path.resolve(__dirname, '..');

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
