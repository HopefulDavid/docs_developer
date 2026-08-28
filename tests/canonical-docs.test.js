const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const docsRoot = path.join(root, 'docs');

function walkMarkdown(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (fullPath !== path.join(docsRoot, 'templates')) {
        files.push(...walkMarkdown(fullPath));
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function relativeToRoot(filePath) {
  return path.relative(root, filePath).replace(/\\/g, '/');
}

function frontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  return match?.[1] || '';
}

function field(metadata, name) {
  return metadata.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
}

test('kanonické klíče jsou jedinečné a mají ověřená metadata', () => {
  const owners = new Map();

  for (const filePath of walkMarkdown(docsRoot)) {
    const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const metadata = frontMatter(content);
    const canonicalFor = field(metadata, 'canonical_for');

    if (!canonicalFor) {
      continue;
    }

    const relPath = relativeToRoot(filePath);
    assert.equal(owners.has(canonicalFor), false, `Duplicitní canonical_for ${canonicalFor}`);
    assert.notEqual(field(metadata, 'status'), 'not-initialized', `${relPath} není inicializovaný`);
    assert.notEqual(field(metadata, 'last_verified'), 'null', `${relPath} není ověřený`);
    owners.set(canonicalFor, relPath);
  }

  assert.ok(owners.size > 0, 'Nebyl nalezen žádný kanonický dokument');
});

test('projektově specifické dokumenty neobsahují inicializační zástupné hodnoty', () => {
  const projectFiles = [
    'README.md',
    'docs/product/requirements.md',
    'docs/architecture/overview.md',
    'docs/development/commands.md',
    'docs/delivery/ci-cd.md',
    'docs/operations/runbook.md',
  ];

  for (const relPath of projectFiles) {
    const content = fs.readFileSync(path.join(root, relPath), 'utf8');
    assert.equal(content.includes('PROJECT-INIT'), false, `${relPath} obsahuje PROJECT-INIT`);
  }
});

test('interní relativní Markdown odkazy vedou na existující cesty', () => {
  const files = [
    path.join(root, 'README.md'),
    path.join(root, 'AGENTS.md'),
    ...walkMarkdown(docsRoot),
  ];

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const content = original.replace(/```[\s\S]*?```/g, '');

    for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].trim();

      if (!target || /^(?:https?:|mailto:|tel:|#|xref:)/i.test(target)) {
        continue;
      }

      const pathPart = target.split(/[?#]/, 1)[0];
      if (!pathPart) {
        continue;
      }

      const resolved = path.resolve(path.dirname(filePath), pathPart);
      assert.equal(
        fs.existsSync(resolved),
        true,
        `${relativeToRoot(filePath)} odkazuje na neexistující ${target}`,
      );
    }
  }
});

test('Claude adaptér pouze importuje společné instrukce', () => {
  assert.equal(fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8'), '@AGENTS.md\n');
});
