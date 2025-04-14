module.exports = {
  writerOpts: {
    transform: (commit) => {

      const headerMatch = commit.header.match(/^(feat|fix|docs|style|refactor|test|chore|perf)(?:\s*\(([^)]+)\))?:\s*(.+)$/);
      let type = '';
      let scope = '';
      let subject = commit.header;

      if (headerMatch) {
        type = headerMatch[1];
        scope = headerMatch[2] || '';
        subject = headerMatch[3];
      }

      const date = new Date(commit.authorDate);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // Oprava časové zóny

      return {
        ...commit,
        type: type || '',
        scope: scope,
        subject: subject,
        date: localDate, // Použití lokálního data
      };
    },
    groupBy: 'date',
    commitGroupsSort: (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime(),
    commitsSort: ['-date', 'scope', 'subject'],
    noteGroupsSort: 'title',
    mainTemplate: `
{{#each commitGroups}}
  {{#if title}}
## {{title}}
    {{#each commits}}
  - {{#if type}}{{type}}: {{/if}}{{subject}}{{#if scope}} ({{scope}}){{/if}}
    {{/each}}
  {{/if}}
{{/each}}
`,
    finalizeContext: (context) => {
      context.commitGroups.sort((a, b) => new Date(b.title).getTime() - new Date(a.title).getTime());
      return context;
    }
  },
  gitRawCommitsOpts: {
    format: '%B%n-hash-%n%H%n-gitTags-%n%d%n-authorDate-%n%aI%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae',
  },
};