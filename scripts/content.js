import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Načte články a navigaci z adresáře obsahu.
 * Navigaci určují soubory toc.yml, které čte i DocFX.
 */
export function loadContent(root) {
  const read = (file) => readFileSync(path.join(root, file), 'utf8').replaceAll('\r\n', '\n');
  const files = readdirSync(root, { recursive: true }).map((file) => file.replaceAll(path.sep, '/'));
  const pages = new Map(
    files
      // Stránku změn vytváří git-cliff a odkazuje na ni úvodní stránka.
      .filter((file) => file.endsWith('.md') && file !== 'changelog.md')
      .sort()
      .map((file) => [file, parsePage(read(file))]),
  );
  // Horní lišta seskupuje oblasti do nabídek, oblast je každá položka s odkazem na složku.
  // Odkaz na stránku, například na stránku změn, oblastí není a přehled nedostane.
  const areas = (items, group) =>
    items.flatMap(({ name, href, items: children }) => {
      if (children) return areas(children, name);
      return href?.endsWith('/') ? [{ href, group: group ?? name }] : [];
    });
  const sections = areas(Bun.YAML.parse(read('toc.yml'))).map(({ href, group }) => {
    const directory = href.replace(/\/$/, '');
    return { directory, group, items: Bun.YAML.parse(read(`${directory}/toc.yml`)) };
  });

  return { pages, sections };
}

function parsePage(source) {
  const [, frontMatter, body] = source.match(/^(?:---\n([\s\S]*?)\n---\n)?([\s\S]*)$/);
  const metadata = (frontMatter && Bun.YAML.parse(frontMatter)) || {};

  return {
    source,
    title: body.match(/^# (.+)$/m)?.[1] ?? '',
    intro: body.match(/^# .+\n+(.+)$/m)?.[1] ?? '',
    description: typeof metadata.description === 'string' ? metadata.description.trim() : '',
    isRedirect: 'redirect_url' in metadata,
  };
}

/** Rozbalí položky navigace oblasti na stránky s názvem skupiny, do které v přehledu patří. */
export function flattenNavigation(items, group) {
  return items.flatMap(({ name, href, items: children = [] }) => [
    ...(href ? [{ name, href, group: group ?? name }] : []),
    ...flattenNavigation(children, name),
  ]);
}
