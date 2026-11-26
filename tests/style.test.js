import { expect, test } from 'bun:test';
import path from 'node:path';
import { loadContent } from '../scripts/content.js';

// Články nikoho neoslovují (rozhodnutí vlastníka v AGENTS.md). Test zachytí typické tvary
// druhé osoby: přítomný čas jednotného čísla, tvary s „-te“ a přivlastňovací zájmena.
// Rozkazovací způsob jednotného čísla nemá spolehlivý tvar, ten hlídá revize.
const patterns = [
  /(?<!\p{L})\p{L}{2,}(?:eš|íš|áš|ěš)(?!\p{L})/u,
  /(?<!\p{L})\p{L}{3,}(?:ujte|ejte|ijte|ěte|ete|áte|íte)(?!\p{L})/u,
  /(?<!\p{L})(?:tvůj|tvoje|tvá|tvé|tvého|tvému|tvém|tvým|tvou|tvoji|tvých|tvými|tebe|tobě|tebou)(?!\p{L})/iu,
];

/** Ponechá jen prózu: bez bloků kódu, kódu v textu, adres odkazů, HTML, kotev a tučných názvů z rozhraní. */
function stripInlineHtmlTags(input) {
  let previous;
  let current = input;
  do {
    previous = current;
    current = current.replace(/<[^>\n]*>/g, '');
  } while (current !== previous);
  return current;
}

function prose(source) {
  return stripInlineHtmlTags(
    source
      // Blok kódu se nahradí prázdnými řádky, aby čísla řádků v nálezech seděla.
      .replace(/^(`{3,}|~{3,})[\s\S]*?^\1/gm, (block) => block.replace(/[^\n]/g, ''))
      .replace(/`[^`\n]*`/g, '')
      .replace(/\]\([^)]*\)/g, ']')
      .replace(/\*\*[^*\n]*\*\*/g, ''),
  );
}

function addressing(source) {
  return prose(source)
    .split('\n')
    .flatMap((line, index) => (patterns.some((pattern) => pattern.test(line)) ? [`${index + 1}: ${line.trim()}`] : []));
}

test('detektor rozpozná oslovení druhou osobou', () => {
  expect(addressing('Soubor otevřeš v editoru.\nVýstup zkontrolujte.\nUlož tvůj klíč.')).toHaveLength(3);
  expect(addressing('Soubor se otevře v editoru.\nPříkaz `odešleš` v kódu\n**Použijte heslo**')).toEqual([]);
});

test('články nepoužívají oslovení druhou osobou', () => {
  const { pages } = loadContent(path.resolve(import.meta.dir, '../content'));
  const findings = [...pages].flatMap(([file, page]) => addressing(page.source).map((line) => `${file}:${line}`));
  expect(findings).toEqual([]);
});
