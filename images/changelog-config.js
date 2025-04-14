module.exports = {
  writerOpts: {
    transform: (commit) => {
      const emojiMap = {
        feat: '✨',
        fix: '🐛',
        docs: '📝',
        style: '🎨',
        refactor: '🔨',
        test: '✅',
        chore: '🔧',
        perf: '⚡',
      };

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
        type: emojiMap[type] || '',
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
  - {{type}} {{subject}}{{#if scope}} ({{scope}}){{/if}}
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