import { afterEach, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadContent } from '../scripts/content.js';
import { countArticles, planOverviews } from '../scripts/overviews.js';

const emptyBlock = '<!-- přehled: generuje bun run build:overviews -->\n<!-- /přehled -->\n';
const article = (title, description) => `---\ndescription: "${description}"\n---\n\n# ${title}\n`;
const fixtures = [];

afterEach(() => {
  for (const fixture of fixtures.splice(0)) rmSync(fixture, { recursive: true, force: true });
});

function plan(changes = {}) {
  const root = mkdtempSync(path.join(tmpdir(), 'docs-overviews-'));
  fixtures.push(root);
  const files = {
    'toc.yml': '- name: OS\n  href: os/\n',
    'index.md': `# Úvod\n\nText před.\n\n${emptyBlock}\nText za.\n`,
    'os/toc.yml': [
      '- name: Přehled\n  href: index.md',
      '- name: Nástroje\n  items:\n    - name: SSH\n      href: ssh.md\n      items:\n        - name: Klíče\n          href: ssh/keys.md',
      '- name: Windows\n  href: windows.md\n',
    ].join('\n'),
    'os/index.md': `# Operační systémy\n\nPoznámky k systémům.\n\n## Přehled stránek\n\n${emptyBlock}`,
    'os/ssh.md': article('SSH', 'Připojení k serveru.'),
    'os/ssh/keys.md': article('Klíče', 'Veřejný | soukromý.'),
    'os/windows.md': article('Windows', 'Nastavení.'),
    ...changes,
  };
  for (const [file, source] of Object.entries(files)) {
    if (source === null) continue;
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), source);
  }
  return planOverviews(loadContent(root));
}

test('přehled oblasti řadí stránky do skupin podle toc.yml s popisem z článku', () => {
  const { errors, updates } = plan();

  expect(errors).toEqual([]);
  expect(updates.get('os/index.md')).toBe(`# Operační systémy

Poznámky k systémům.

## Přehled stránek

<!-- přehled: generuje bun run build:overviews -->

### Nástroje

| Stránka | Popis |
| --- | --- |
| [SSH](ssh.md) | Připojení k serveru. |

### SSH

| Stránka | Popis |
| --- | --- |
| [Klíče](ssh/keys.md) | Veřejný \\| soukromý. |

### Windows

| Stránka | Popis |
| --- | --- |
| [Windows](windows.md) | Nastavení. |

<!-- /přehled -->
`);
});

test('úvodní stránka přebírá nadpis a úvod oblasti a zachovává okolní text', () => {
  const index = plan().updates.get('index.md');

  expect(index).toContain('### OS\n\n- **[Operační systémy](os/index.md)** Poznámky k systémům.');
  expect(index).toContain('<span class="docs-count">3 články</span>');
  expect(index).toStartWith('# Úvod\n\nText před.\n');
  expect(index).toEndWith('\nText za.\n');
});

test('úvodní stránka seskupí oblasti podle nabídek horní lišty', () => {
  const index = plan({
    'toc.yml': '- name: Provoz\n  items:\n    - name: OS\n      href: os/\n',
  }).updates.get('index.md');

  expect(index).toContain('### Provoz\n\n- **[Operační systémy](os/index.md)**');
});

test('odkaz na stránku v horní liště není oblast', () => {
  const { errors, updates } = plan({
    'toc.yml': '- name: OS\n  href: os/\n- name: Změny\n  href: changelog.md\n',
    'changelog.md': '# Změny\n',
  });

  expect(errors).toEqual([]);
  expect(updates.get('index.md')).not.toContain('Změny');
});

test('počet článků se skloňuje', () => {
  expect([1, 2, 4, 5, 12].map(countArticles)).toEqual(['1 článek', '2 články', '4 články', '5 článků', '12 článků']);
});

test('aktuální přehledy se znovu nemění ani při koncích řádků CRLF', () => {
  const current = Object.fromEntries(plan().updates);
  expect(plan(current).updates.size).toBe(0);

  const windows = Object.fromEntries(
    Object.entries(current).map(([file, source]) => [file, source.replaceAll('\n', '\r\n')]),
  );
  expect(plan(windows).updates.size).toBe(0);
});

test('článek mimo navigaci je chyba, přesměrování a stránka změn nikoli', () => {
  const { errors } = plan({
    'os/lost.md': article('Ztracený', 'Popis.'),
    'os/AGENTS.md': '# Instrukce\n',
    'os/old.md': '---\nredirect_url: "ssh.html"\n---\n',
    'changelog.md': '# Změny\n',
  });

  expect(errors).toEqual([
    'os/AGENTS.md: soubor není uvedený v toc.yml své oblasti',
    'os/lost.md: soubor není uvedený v toc.yml své oblasti',
  ]);
});

test('chybějící stránka, jiná velikost písmen, popis nebo značky přehledu jsou chyba', () => {
  expect(plan({ 'os/windows.md': null }).errors).toEqual([
    'os/toc.yml: stránka windows.md neexistuje, rozhoduje i velikost písmen',
  ]);
  expect(plan({ 'os/windows.md': null, 'os/Windows.md': article('Windows', 'Popis.') }).errors).toContain(
    'os/toc.yml: stránka windows.md neexistuje, rozhoduje i velikost písmen',
  );
  expect(plan({ 'os/windows.md': '# Windows\n' }).errors).toEqual(['os/windows.md: chybí description v metadatech']);
  expect(plan({ 'os/index.md': '# OS\n' }).errors[0]).toStartWith('os/index.md: chybí značky');
});
