// Aktualizuje přehledy v adresáři content, s přepínačem --check je jen porovná.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadContent } from './content.js';
import { planOverviews } from './overviews.js';

const contentRoot = path.resolve(import.meta.dir, '../content');
const checkOnly = process.argv.includes('--check');
const { errors, updates } = planOverviews(loadContent(contentRoot));

for (const error of errors) console.error(error);

if (!errors.length && !checkOnly) {
  for (const [file, source] of updates) writeFileSync(path.join(contentRoot, file), source);
}

for (const file of updates.keys()) {
  console.log(`${checkOnly || errors.length ? 'Neaktuální přehled' : 'Aktualizováno'}: ${file}`);
}
if (checkOnly && updates.size) console.error('Přehledy aktualizuje příkaz bun run build:overviews.');
if (!errors.length && !updates.size) console.log('Přehledy jsou aktuální.');

process.exitCode = errors.length || (checkOnly && updates.size) ? 1 : 0;
