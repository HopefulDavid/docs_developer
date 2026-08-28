'use strict';

/**
 * Regulární výraz pro parsování hlavičky konvenčního commitu.
 * Podporovaný formát: typ(volitelný-scope): popis
 */
const COMMIT_PATTERN = /^(feat|fix|docs|style|refactor|test|chore|perf)(?:\(([^)]+)\))?:\s*(.+)$/;

/**
 * Commity, jejichž hlavička obsahuje některý z těchto řetězců, jsou při generování přeskočeny.
 */
const SKIP_PATTERNS = ['update changelog', 'chore: release'];

/**
 * Převede datum na lokální datum ve formátu YYYY-MM-DD.
 * Eliminuje posuny způsobené časovými zónami.
 *
 * @param {string | Date} value - Datum ke konverzi.
 * @returns {string} Datum ve formátu YYYY-MM-DD.
 */
const toLocalDate = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

/**
 * Seřadí skupiny commitů sestupně podle data (nejnovější první).
 *
 * @param {{ title: string }} a
 * @param {{ title: string }} b
 * @returns {number}
 */
const sortGroupsByDate = (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime();

/**
 * Transformuje raw commit objekt do struktury požadované šablonou.
 * Vrací false, pokud má být commit přeskočen.
 *
 * @param {Object} commit - Původní commit objekt z git log.
 * @returns {Object | false} Transformovaný commit, nebo false pro přeskočení.
 */
const transformCommit = (commit) => {
  const header = (commit.header ?? '').trim();

  if (SKIP_PATTERNS.some((pattern) => header.toLowerCase().includes(pattern))) {
    return false;
  }

  const match = header.match(COMMIT_PATTERN);

  let type    = '';
  let scope   = '';
  let subject = header;

  if (match) {
    const [, matchedType, matchedScope, matchedSubject] = match;

    type    = matchedType;
    scope   = matchedScope ?? '';
    subject = matchedSubject;
  }

  return {
    ...commit,
    type,
    scope,
    subject,
    date: toLocalDate(commit.authorDate),
  };
};

/**
 * Handlebars šablona pro výstupní changelog.
 *
 * Příklad záznamu:
 *   - feat: přidání přihlašování (auth)
 *   - nekonvenční commit bez typu
 */
const OUTPUT_TEMPLATE = `Changelog
{{#each commitGroups}}
  {{#if title}}
## {{title}}
    {{#each commits}}
  - {{#if type}}{{type}}: {{/if}}{{subject}}{{#if scope}} ({{scope}}){{/if}}
    {{/each}}
  {{/if}}
{{/each}}
`;

module.exports = {
  writerOpts: {
    transform:        transformCommit,
    groupBy:          'date',
    commitGroupsSort: sortGroupsByDate,
    commitsSort:      ['scope', 'subject'],
    noteGroupsSort:   'title',
    mainTemplate:     OUTPUT_TEMPLATE,
    finalizeContext:  (context) => {
      context.commitGroups.sort(sortGroupsByDate);
      return context;
    },
  },
  gitRawCommitsOpts: {
    format: '%B%n-hash-%n%H%n-gitTags-%n%d%n-authorDate-%n%aI%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae',
  },
};