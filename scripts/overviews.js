import path from 'node:path';
import { flattenNavigation } from './content.js';

const blockStart = '<!-- přehled: generuje bun run build:overviews -->';
const blockEnd = '<!-- /přehled -->';

/**
 * Porovná obsah s navigací a sestaví přehledy oblastí a úvodní stránky.
 * Vrací chyby obsahu a úplný nový text stránek, jejichž přehled neodpovídá zdrojům.
 */
export function planOverviews({ pages, sections }) {
  const errors = [];
  const linked = new Set(['index.md']);
  const overviews = new Map();

  for (const { directory, items } of sections) {
    const index = `${directory}/index.md`;
    const rows = [];

    for (const { name, href, group } of flattenNavigation(items)) {
      const file = path.posix.join(directory, href);
      const page = pages.get(file);
      linked.add(file);

      if (!page) {
        errors.push(`${directory}/toc.yml: stránka ${href} neexistuje, rozhoduje i velikost písmen`);
      } else if (file !== index) {
        if (!page.description) errors.push(`${file}: chybí description v metadatech`);
        rows.push({ name, href, group, description: page.description });
      }
    }
    overviews.set(index, renderSection(rows));
  }
  overviews.set('index.md', renderAreas(pages, sections));

  for (const [file, page] of pages) {
    if (!linked.has(file) && !page.isRedirect) {
      errors.push(`${file}: soubor není uvedený v toc.yml své oblasti`);
    }
  }

  const updates = new Map();
  for (const [file, overview] of overviews) {
    const source = pages.get(file)?.source ?? '';
    const start = source.indexOf(blockStart);
    const end = source.indexOf(blockEnd);

    if (start < 0 || end < start) {
      errors.push(`${file}: chybí značky "${blockStart}" a "${blockEnd}"`);
      continue;
    }
    const updated = `${source.slice(0, start)}${blockStart}\n\n${overview}\n\n${source.slice(end)}`;
    if (updated !== source) updates.set(file, updated);
  }

  return { errors, updates };
}

function renderSection(rows) {
  return [...Map.groupBy(rows, ({ group }) => group)]
    .map(([group, groupRows]) => [
      `### ${group}`,
      '',
      '| Stránka | Popis |',
      '| --- | --- |',
      ...groupRows.map(({ name, href, description }) =>
        `| [${name}](${href}) | ${description.replaceAll('|', '\\|')} |`),
    ].join('\n'))
    .join('\n\n');
}

/** Česky skloňovaný počet článků, například 1 článek, 3 články, 12 článků. */
export function countArticles(count) {
  if (count === 1) return '1 článek';
  if (count >= 2 && count <= 4) return `${count} články`;
  return `${count} článků`;
}

function renderAreas(pages, sections) {
  return [...Map.groupBy(sections, ({ group }) => group)]
    .map(([group, groupSections]) => [
      `### ${group}`,
      '',
      ...groupSections.map(({ directory, items }) => {
        const index = `${directory}/index.md`;
        const { title, intro } = pages.get(index) ?? { title: directory, intro: '' };
        const count = flattenNavigation(items).filter(({ href }) => href !== 'index.md').length;
        return `- **[${title}](${index})** ${intro} <span class="docs-count">${countArticles(count)}</span>`;
      }),
    ].join('\n'))
    .join('\n\n');
}
