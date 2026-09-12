const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const docfx = require('../docfx.json');
const {
  cleanInline,
  collectHtmlLinkErrors,
  descriptionFromMarkdown,
  isInternalArtifactPath,
  isInternalPath,
} = require('../scripts/generate-docs.js');

const root = path.resolve(__dirname, '..');

test('HTML odkazy rozlišují kotvy, URL kódování, query a relativní cestu', () => {
  const pages = new Map([
    ['index.html', '<a href="guide/?mode=1&amp;lang=cs#p%C5%99%C3%ADklad">Návod</a>'],
    ['guide/index.html', '<h2 id="příklad">Příklad</h2><a href="#příklad">Zpět</a><img src="../images/a.png">'],
  ]);
  const files = new Set([...pages.keys(), 'images/a.png']);
  assert.deepEqual(collectHtmlLinkErrors(pages, files), []);
});

test('artefakt odmítá neexistující kotvu i casing, který Windows toleruje', () => {
  const pages = new Map([
    ['index.html', '<a href="guide.html#old">Starý nadpis</a><a href="Guide.html">Chybná cesta</a>'],
    ['guide.html', '<h2 id="new">Nový nadpis</h2>'],
  ]);
  const errors = collectHtmlLinkErrors(pages, new Set(pages.keys()));
  assert.equal(errors.length, 2);
  assert.match(errors[0], /guide.html#old: neexistující kotva/);
  assert.match(errors[1], /Guide.html: neexistující cesta nebo nesprávný casing/);
});

test('HTML kontrola neinterpretuje externí odkazy, komentáře a escapované ukázky jako navigaci', () => {
  const pages = new Map([['index.html', `
    <a href="https://example.com/#unknown">Web</a><a href="mailto:a@example.com">Email</a>
    <a href="//example.com/file">CDN</a><img src="data:image/png;base64,AA==">
    <!-- <a href="missing.html">Neaktivní</a> -->
    <code>&lt;a href="missing.html"&gt;</code>
    <script>const sample = '<a href="missing.html">';</script>`]]);
  assert.deepEqual(collectHtmlLinkErrors(pages, new Set(pages.keys())), []);
});

test('HTML kontrola vysvětlí neplatné procentové kódování místo pádu', () => {
  const pages = new Map([['index.html', '<a href="bad%ZZ.html">Chyba</a>']]);
  assert.match(collectHtmlLinkErrors(pages, new Set(pages.keys()))[0], /neplatné kódování URL/);
});

test('přehled nepřenáší relativní odkazy z úvodu do jiné složky', () => {
  const intro = '# Projekt\n\nNejprve ověř [instalaci SDK](setup-and-configuration.md).\n';
  assert.equal(descriptionFromMarkdown(intro), 'Nejprve ověř instalaci SDK.');
  assert.equal(
    descriptionFromMarkdown('# API\n\nPoužij `dotnet` a [referenci](https://example.com/api).'),
    'Použij `dotnet` a referenci.',
  );
});

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
