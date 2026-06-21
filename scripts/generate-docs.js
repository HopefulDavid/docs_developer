const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const checkOnly = process.argv.includes('--check');
const collator = new Intl.Collator('cs', { sensitivity: 'base', numeric: true });

const generatedNotice =
  '<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->';
const generatedYamlNotice =
  '# Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně.';

const sectionInfo = {
  ai: {
    title: 'AI',
    intro:
      'Nástroje a postupy pro práci s lokálními i vývojářskými modely umělé inteligence.',
  },
  vcs: {
    title: 'Verzování',
    intro: 'Praktické postupy pro Git, větve, historii a běžnou správu repozitářů.',
  },
  ide: {
    title: 'IDE',
    intro: 'Nastavení a používání vývojových prostředí pro každodenní práci.',
  },
  programming: {
    title: 'Programování',
    intro:
      'Vývojové platformy, jazyky, frameworky, balíčky a opakovaně použitelné postupy.',
  },
  database: {
    title: 'Databáze',
    intro: 'Databázové systémy, dotazy a nástroje pro přístup k datům.',
  },
  devops: {
    title: 'DevOps',
    intro: 'Infrastruktura, automatizace a provozní postupy pro vývojářské prostředí.',
  },
  documentation: {
    title: 'Dokumentace',
    intro: 'Nástroje a postupy pro tvorbu, převod a údržbu technické dokumentace.',
  },
  virtualization: {
    title: 'Virtualizace',
    intro: 'Kontejnery, lokální virtualizace, orchestrace a související správa prostředí.',
  },
  network: {
    title: 'Síť',
    intro: 'Síťové technologie, přístupy, certifikáty a bezpečné propojení prostředí.',
  },
  'operating-system': {
    title: 'Operační systémy',
    navTitle: 'OS',
    intro: 'Praktické poznámky k operačním systémům a jejich příkazovým nástrojům.',
  },
  graphics: {
    title: 'Grafika',
    intro: 'Grafické nástroje, pracovní postupy a praktické tipy pro vizuální tvorbu.',
  },
  video: {
    title: 'Video',
    intro: 'Nástroje a postupy pro nahrávání, střih nebo zpracování videa.',
  },
  teamwork: {
    title: 'Komunikace',
    navTitle: 'Tým',
    intro: 'Nástroje a postupy pro týmovou komunikaci a organizaci práce.',
  },
};

const sectionOrder = [
  'ai',
  'vcs',
  'ide',
  'programming',
  'database',
  'devops',
  'documentation',
  'virtualization',
  'network',
  'operating-system',
  'graphics',
  'video',
  'teamwork',
];

const rootPages = [{ name: 'Změny', href: 'changelog.md' }];

const navigation = {
  ai: [{ name: 'Modely a nástroje', items: [{ name: 'Ollama', href: 'ollama.md' }] }],
  vcs: [
    {
      name: 'Git',
      items: [
        { name: 'Konfigurace', href: 'git/configuration.md' },
        { name: 'Úložiště', href: 'git/repository.md' },
        { name: 'Git server', href: 'git/server.md' },
        { name: 'Submoduly', href: 'git/submodules.md' },
        { name: 'Git Flow', href: 'git/git-flow.md' },
        { name: 'Použití v praxi', href: 'git/in-practice.md' },
        {
          name: 'Větve',
          items: [
            { name: 'Vytvoření vzdálené větve', href: 'git/branches/create-remote-branch.md' },
            { name: 'Smazání vzdálené větve', href: 'git/branches/delete-remote-branch.md' },
            { name: 'Pull request', href: 'git/branches/pull-request.md' },
          ],
        },
        {
          name: 'Historie',
          items: [
            { name: '.gitignore', href: 'git/history/update-gitignore.md' },
            { name: 'Přesun commitů', href: 'git/history/move-commits.md' },
            { name: 'Oprava commitů', href: 'git/history/fix-commits.md' },
            { name: 'Odstranění commitů', href: 'git/history/delete-commits.md' },
            { name: 'Lokální ignorování změn', href: 'git/history/assume-unchanged.md' },
          ],
        },
      ],
    },
  ],
  ide: [
    {
      name: 'Vývojová prostředí',
      items: [
        { name: 'JetBrains', href: 'jetbrains.md' },
        { name: 'Visual Studio', href: 'visual-studio.md' },
      ],
    },
  ],
  programming: [
    {
      name: 'Techniky a koncepty',
      items: [
        { name: 'Výběr platformy pro vývoj', href: 'platform-selection.md' },
        { name: 'Komentáře v kódu', href: 'code-comments.md' },
        { name: 'Vývojové vzory', href: 'development-patterns.md' },
        { name: 'Techniky', href: 'techniques.md' },
      ],
    },
    {
      name: 'Programovací jazyky a frameworky',
      items: [
        {
          name: 'C# a .NET',
          href: 'csharp/index.md',
          items: [
            { name: 'Komponenty', href: 'csharp/components.md' },
            { name: 'Interface', href: 'csharp/interface.md' },
            { name: 'Datové typy', href: 'csharp/data-types.md' },
            { name: 'Atributy', href: 'csharp/attributes.md' },
            { name: 'Enum', href: 'csharp/enum.md' },
            { name: 'Metody', href: 'csharp/methods.md' },
            { name: 'Implicitní a explicitní operátory', href: 'csharp/conversion.md' },
            { name: 'REST API', href: 'csharp/create-api.md' },
            { name: 'Soubory', href: 'csharp/files.md' },
            { name: 'XML', href: 'csharp/xml.md' },
            { name: 'NUnit', href: 'csharp/nunit.md' },
            { name: 'WPF', href: 'csharp/wpf.md' },
          ],
        },
        { name: 'Go', href: 'server/go.md' },
      ],
    },
    {
      name: 'Mobilní vývoj',
      items: [
        { name: 'Android Studio', href: 'mobile/android-studio.md' },
        {
          name: 'Flutter',
          href: 'mobile/flutter/setup-and-configuration.md',
          items: [
            { name: 'Vytvoření projektu', href: 'mobile/flutter/create-project.md' },
            { name: 'Záloha a obnova', href: 'mobile/flutter/backup-and-restore.md' },
            { name: 'Lokalizace', href: 'mobile/flutter/localization.md' },
            { name: 'Základy', href: 'mobile/flutter/basics.md' },
            { name: 'Příkazy', href: 'mobile/flutter/commands.md' },
            { name: 'Pokrytí kódu', href: 'mobile/flutter/code-coverage.md' },
            { name: 'Řešení problémů', href: 'mobile/flutter/troubleshooting.md' },
          ],
        },
      ],
    },
    {
      name: 'Herní vývoj',
      items: [
        {
          name: 'Unity',
          href: 'unity/index.md',
          items: [
            { name: '2D', href: 'unity/2d.md' },
            { name: 'Animace', href: 'unity/animation.md' },
            { name: 'Kamera', href: 'unity/camera.md' },
            { name: 'Navigace', href: 'unity/navigation.md' },
            { name: 'ScriptableObject', href: 'unity/scriptable-object.md' },
            { name: 'UI', href: 'unity/ui.md' },
            { name: 'UI Toolkit', href: 'unity/ui-toolkit.md' },
            { name: 'Vykreslování', href: 'unity/renderer.md' },
          ],
        },
      ],
    },
    {
      name: 'Nástroje a balíčky',
      items: [
        { name: '.NET CLI', href: 'packages/dotnet-cli.md' },
        { name: 'NuGet', href: 'packages/nuget.md' },
        { name: 'npm', href: 'packages/npm.md' },
        { name: 'Python', href: 'packages/python.md' },
        { name: 'Appcast feed', href: 'appcast.md' },
      ],
    },
    {
      name: 'Lokální vývoj',
      items: [
        { name: 'XAMPP přístup', href: 'xampp/access.md' },
        { name: 'XAMPP virtual hosts', href: 'xampp/virtual-hosts.md' },
      ],
    },
  ],
  database: [
    {
      name: 'Databázové systémy',
      items: [
        { name: 'Microsoft SQL', href: 'mssql.md' },
        { name: 'MongoDB', href: 'mongodb.md' },
        { name: 'PostgreSQL', href: 'postgresql.md' },
      ],
    },
    {
      name: 'Přístup k datům',
      items: [
        { name: 'Entity Framework', href: 'entity-framework.md' },
        { name: 'Dapper', href: 'dapper.md' },
      ],
    },
  ],
  devops: [
    { name: 'Infrastructure as Code', items: [{ name: 'OpenTofu', href: 'opentofu.md' }] },
  ],
  documentation: [
    {
      name: 'Nástroje',
      items: [
        { name: 'Pandoc', href: 'pandoc.md' },
        { name: 'Doxygen', href: 'doxygen.md' },
      ],
    },
  ],
  virtualization: [
    {
      name: 'Prostředí',
      items: [
        { name: 'WSL', href: 'wsl.md' },
        {
          name: 'Docker',
          href: 'docker/index.md',
          items: [
            { name: 'Portainer', href: 'docker/portainer.md' },
            { name: 'Duplicati', href: 'docker/duplicati.md' },
            { name: 'BusyBox', href: 'docker/busybox.md' },
          ],
        },
        { name: 'Kubernetes', href: 'kubernetes.md' },
      ],
    },
  ],
  network: [
    {
      name: 'Síťové nástroje',
      items: [
        { name: 'Certifikáty', href: 'certificates.md' },
        { name: 'VPN', href: 'vpn.md' },
      ],
    },
  ],
  'operating-system': [
    {
      name: 'Windows',
      href: 'windows/index.md',
      items: [
        { name: 'Command Line', href: 'windows/cmd.md' },
        { name: 'PowerShell', href: 'windows/powershell.md' },
      ],
    },
  ],
  graphics: [{ name: 'Grafické aplikace', items: [{ name: 'Affinity', href: 'affinity.md' }] }],
  video: [{ name: 'Nahrávání videa', items: [{ name: 'OBS', href: 'obs.md' }] }],
  teamwork: [{ name: 'Komunikace', items: [{ name: 'Outlook', href: 'outlook.md' }] }],
};

const legacyRenames = new Map([
  ['index.md', 'changelog.md'],
  ['database/Dapper.md', 'database/dapper.md'],
  ['database/EntityFramework.md', 'database/entity-framework.md'],
  ['database/MSSQL.md', 'database/mssql.md'],
  ['database/PostgreSQL.md', 'database/postgresql.md'],
  ['database/mongoDB.md', 'database/mongodb.md'],
  ['ide/jetBrains.md', 'ide/jetbrains.md'],
  ['ide/visualStudio.md', 'ide/visual-studio.md'],
  ['operatingSystem/windows.md', 'operating-system/windows/index.md'],
  ['operatingSystem/windows/cmd.md', 'operating-system/windows/cmd.md'],
  ['operatingSystem/windows/powerShell.md', 'operating-system/windows/powershell.md'],
  ['programming/codeComments.md', 'programming/code-comments.md'],
  ['programming/developmentPatterns.md', 'programming/development-patterns.md'],
  ['programming/index.md', 'programming/platform-selection.md'],
  ['programming/net.md', 'programming/csharp/index.md'],
  ['programming/net/net_attributes.md', 'programming/csharp/attributes.md'],
  ['programming/net/net_components.md', 'programming/csharp/components.md'],
  ['programming/net/net_conversion.md', 'programming/csharp/conversion.md'],
  ['programming/net/net_createAPI.md', 'programming/csharp/create-api.md'],
  ['programming/net/net_dataTypes.md', 'programming/csharp/data-types.md'],
  ['programming/net/net_enum.md', 'programming/csharp/enum.md'],
  ['programming/net/net_files.md', 'programming/csharp/files.md'],
  ['programming/net/net_interface.md', 'programming/csharp/interface.md'],
  ['programming/net/net_methods.md', 'programming/csharp/methods.md'],
  ['programming/net/net_nunit.md', 'programming/csharp/nunit.md'],
  ['programming/net/net_wpf.md', 'programming/csharp/wpf.md'],
  ['programming/net/net_xml.md', 'programming/csharp/xml.md'],
  ['programming/flutter/backup-and-restore.md', 'programming/mobile/flutter/backup-and-restore.md'],
  ['programming/flutter/basics.md', 'programming/mobile/flutter/basics.md'],
  ['programming/flutter/code-coverage.md', 'programming/mobile/flutter/code-coverage.md'],
  ['programming/flutter/commands.md', 'programming/mobile/flutter/commands.md'],
  ['programming/flutter/create-project.md', 'programming/mobile/flutter/create-project.md'],
  ['programming/flutter/localization.md', 'programming/mobile/flutter/localization.md'],
  [
    'programming/flutter/setup-and-configuration.md',
    'programming/mobile/flutter/setup-and-configuration.md',
  ],
  ['programming/flutter/troubleshooting.md', 'programming/mobile/flutter/troubleshooting.md'],
  ['programming/flutter/backupAndRestore.md', 'programming/mobile/flutter/backup-and-restore.md'],
  ['programming/flutter/codeCoverage.md', 'programming/mobile/flutter/code-coverage.md'],
  ['programming/flutter/create_project.md', 'programming/mobile/flutter/create-project.md'],
  [
    'programming/flutter/setupAndConfiguration.md',
    'programming/mobile/flutter/setup-and-configuration.md',
  ],
  ['programming/packages/netCLI.md', 'programming/packages/dotnet-cli.md'],
  ['programming/packages/nugetPackage.md', 'programming/packages/nuget.md'],
  ['programming/packages/pythonPackage.md', 'programming/packages/python.md'],
  ['programming/server/golang.md', 'programming/server/go.md'],
  ['programming/unity.md', 'programming/unity/index.md'],
  ['programming/unity/scriptableObject.md', 'programming/unity/scriptable-object.md'],
  ['programming/unity/uiToolkit.md', 'programming/unity/ui-toolkit.md'],
  ['programming/xampp/xampp_access.md', 'programming/xampp/access.md'],
  ['programming/xampp/xampp_virtualhosts.md', 'programming/xampp/virtual-hosts.md'],
  ['vcs/git/gitConfig.md', 'vcs/git/configuration.md'],
  ['vcs/git/gitFlow.md', 'vcs/git/git-flow.md'],
  ['vcs/git/gitServer.md', 'vcs/git/server.md'],
  ['vcs/git/inPractice.md', 'vcs/git/in-practice.md'],
  ['vcs/git/branches/createRemoteBranch.md', 'vcs/git/branches/create-remote-branch.md'],
  ['vcs/git/branches/deleteRemoteBranch.md', 'vcs/git/branches/delete-remote-branch.md'],
  ['vcs/git/branches/pullRequest.md', 'vcs/git/branches/pull-request.md'],
  ['vcs/git/history/assumeUnchanged.md', 'vcs/git/history/assume-unchanged.md'],
  ['vcs/git/history/deleteCommits.md', 'vcs/git/history/delete-commits.md'],
  ['vcs/git/history/fixCommits.md', 'vcs/git/history/fix-commits.md'],
  ['vcs/git/history/moveCommits.md', 'vcs/git/history/move-commits.md'],
  ['vcs/git/history/updateGitignore.md', 'vcs/git/history/update-gitignore.md'],
  ['virtualization/docker.md', 'virtualization/docker/index.md'],
  ['virtualization/docker_busybox.md', 'virtualization/docker/busybox.md'],
  ['virtualization/docker_duplicati.md', 'virtualization/docker/duplicati.md'],
  ['virtualization/docker_portainer.md', 'virtualization/docker/portainer.md'],
]);

const reverseRenames = new Map([...legacyRenames].map(([from, to]) => [to, from]));
const titleByPath = new Map();
const pagePaths = new Set();
const generatedFiles = new Set();
const pendingChanges = [];
const errors = [];

for (const page of rootPages) {
  titleByPath.set(page.href, page.name);
  pagePaths.add(page.href);
}

for (const section of sectionOrder) {
  for (const page of flattenItems(navigation[section] || [])) {
    if (!page.href) {
      continue;
    }
    const relPath = `${section}/${page.href}`;
    titleByPath.set(relPath, page.name);
    pagePaths.add(relPath);
  }
}

function absolute(relPath) {
  return path.join(root, relPath);
}

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function normalizeRel(value) {
  return toPosix(path.normalize(value));
}

function readFile(relPath) {
  return fs.readFileSync(absolute(relPath), 'utf8').replace(/\r\n/g, '\n');
}

function pathCasingMatches(relPath) {
  const parts = relPath.split('/');
  let current = root;

  for (const part of parts) {
    if (!fs.existsSync(current)) {
      return false;
    }

    const actual = fs
      .readdirSync(current)
      .find((entry) => entry.toLocaleLowerCase() === part.toLocaleLowerCase());

    if (!actual || actual !== part) {
      return false;
    }

    current = path.join(current, actual);
  }

  return true;
}

function writeFile(relPath, content) {
  const normalized = content.endsWith('\n') ? content : `${content}\n`;
  const fullPath = absolute(relPath);
  const current = fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n')
    : null;

  if (current === normalized) {
    return;
  }

  pendingChanges.push(relPath);

  if (!checkOnly) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, normalized, 'utf8');
  }
}

function moveFile(fromRel, toRel) {
  const from = absolute(fromRel);
  const to = absolute(toRel);

  if (!fs.existsSync(from)) {
    return;
  }

  const samePathExceptCase = fromRel.toLocaleLowerCase() === toRel.toLocaleLowerCase();
  if (samePathExceptCase && fs.existsSync(to) && pathCasingMatches(toRel)) {
    return;
  }

  const sourceContent = fs.readFileSync(from, 'utf8').replace(/\r\n/g, '\n');
  if (sourceContent.includes(generatedNotice)) {
    return;
  }

  if (fs.existsSync(to)) {
    const toContent = fs.readFileSync(to, 'utf8').replace(/\r\n/g, '\n');
    if (sourceContent !== toContent) {
      errors.push(`${fromRel}: cílový soubor ${toRel} už existuje s jiným obsahem`);
      return;
    }
  }

  pendingChanges.push(`${fromRel} -> ${toRel}`);

  if (!checkOnly) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (samePathExceptCase) {
      const temporaryPath = `${to}.rename-tmp-${process.pid}`;
      fs.renameSync(from, temporaryPath);
      fs.renameSync(temporaryPath, to);
    } else {
      fs.renameSync(from, to);
    }
  }
}

function walkFiles(dirRel = '.') {
  const files = [];
  const ignored = new Set(['.agents', '.codex', '.git', '.github', '.idea', '_site', 'private']);

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) {
          walk(path.join(dir, entry.name));
        }
        continue;
      }

      if (entry.isFile()) {
        files.push(toPosix(path.relative(root, path.join(dir, entry.name))));
      }
    }
  }

  walk(absolute(dirRel));
  return files.sort((a, b) => collator.compare(a, b));
}

function walkMarkdown() {
  return walkFiles().filter((relPath) => relPath.endsWith('.md'));
}

function flattenItems(items) {
  const result = [];

  for (const item of items) {
    if (item.href) {
      result.push(item);
    }
    if (item.items) {
      result.push(...flattenItems(item.items));
    }
  }

  return result;
}

function yamlString(value) {
  return JSON.stringify(value);
}

function yaml(items, indent = 0) {
  const pad = ' '.repeat(indent);
  const lines = [];

  for (const item of items) {
    lines.push(`${pad}- name: ${yamlString(item.name)}`);
    if (item.href) {
      lines.push(`${pad}  href: ${yamlString(item.href)}`);
    }
    if (item.items?.length) {
      lines.push(`${pad}  items:`);
      lines.push(yaml(item.items, indent + 4));
    }
  }

  return lines.join('\n');
}

function isExternalTarget(target) {
  return /^(?:https?:|mailto:|tel:|#|xref:)/i.test(target);
}

function splitTarget(target) {
  const match = target.match(/^([^?#]*)([?#].*)?$/);
  return { pathPart: match?.[1] || '', suffix: match?.[2] || '' };
}

function resolveRelative(baseRel, targetPath) {
  return normalizeRel(path.posix.join(path.posix.dirname(baseRel), targetPath));
}

function relativeLink(fromRel, toRel) {
  const fromDir = path.posix.dirname(fromRel);
  const rel = path.posix.relative(fromDir, toRel);
  return rel || path.posix.basename(toRel);
}

function normalizeTarget(target, currentRel, previousRel) {
  if (!target || isExternalTarget(target)) {
    return target;
  }

  const { pathPart, suffix } = splitTarget(target);
  if (!pathPart) {
    return target;
  }

  const candidates = [
    resolveRelative(currentRel, pathPart),
    resolveRelative(previousRel, pathPart),
  ];

  for (const candidate of candidates) {
    const renamed = legacyRenames.get(candidate) || candidate;
    if (fs.existsSync(absolute(renamed)) || pagePaths.has(renamed)) {
      return `${relativeLink(currentRel, renamed)}${suffix}`;
    }
  }

  return target;
}

function normalizeLinks(content, currentRel) {
  const previousRel = reverseRenames.get(currentRel) || currentRel;

  return content
    .replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, start, target, end) => {
      const cleanTarget = target.trim();
      return `${start}${normalizeTarget(cleanTarget, currentRel, previousRel)}${end}`;
    })
    .replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (match, start, target, end) => {
      return `${start}${normalizeTarget(target.trim(), currentRel, previousRel)}${end}`;
    });
}

function htmlImageToMarkdown(line, relPath, pageTitle) {
  const match = line.match(/^(\s*(?:>\s*)?)<img\b([^>]*)\/?>\s*$/i);
  if (!match) {
    return line;
  }

  const prefix = match[1];
  const attrs = match[2];
  const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1];
  if (!src) {
    return line;
  }

  const alt = attrs.match(/\balt=["']([^"']*)["']/i)?.[1]?.trim() || pageTitle;
  const normalizedSrc = normalizeTarget(src, relPath, reverseRenames.get(relPath) || relPath);
  return `${prefix}![${alt}](${normalizedSrc})`;
}

function cleanInline(value) {
  return value
    .replace(/\s&\s/g, ' a ')
    .replace(/[\u00A0\u202F]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\b(v|ve|s|se|pro|pomocí)\.NET/g, '$1 .NET')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

function normalizeHeadingTitle(title) {
  return cleanInline(title.replace(/^#+\s*/, ''));
}

function inferredTitle(relPath) {
  if (titleByPath.has(relPath)) {
    return titleByPath.get(relPath);
  }

  const base = path.posix.basename(relPath, '.md');
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

function splitFrontMatter(content) {
  if (!content.startsWith('---\n')) {
    return { frontMatter: '', body: content };
  }

  const end = content.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontMatter: '', body: content };
  }

  return {
    frontMatter: `${content.slice(0, end + 5).trimEnd()}\n\n`,
    body: content.slice(end + 5).replace(/^\n+/, ''),
  };
}

function normalizeMarkdown(relPath) {
  const original = readFile(relPath);
  const { frontMatter, body } = splitFrontMatter(original);
  const title = inferredTitle(relPath);
  const sourceLines = body.replace(/\r\n/g, '\n').split('\n');
  const output = [];
  let hasH1 = false;
  let previousHeadingLevel = 0;
  let fence = null;

  for (const sourceLine of sourceLines) {
    const fenceMatch = sourceLine.match(/^(\s*)(`{3,}|~{3,})(.*)$/);

    if (fence) {
      if (fenceMatch && fenceMatch[2] === fence.marker && fenceMatch[3].trim() === '') {
        output.push(`${fence.indent}${fence.marker}`);
        fence = null;
      } else {
        output.push(indentFenceContent(sourceLine, fence.indent));
      }
      continue;
    }

    if (fenceMatch) {
      fence = {
        indent: fenceMatch[1],
        marker: fenceMatch[2],
      };
      output.push(sourceLine.trimEnd());
      continue;
    }

    const linkedLine = normalizeLinks(sourceLine, relPath);
    const convertedLine = htmlImageToMarkdown(linkedLine, relPath, title);

    if (/^\s*-{3,}\s*$/.test(convertedLine)) {
      continue;
    }

    const heading = convertedLine.match(/^(#{1,6})\s+(.+)$/);

    if (!heading) {
      output.push(cleanMarkdownLine(convertedLine));
      continue;
    }

    let level = heading[1].length;
    const headingTitle = normalizeHeadingTitle(heading[2]);

    if (!hasH1) {
      level = 1;
      hasH1 = true;
    } else if (level === 1) {
      level = 2;
    }

    if (previousHeadingLevel && level > previousHeadingLevel + 1) {
      level = previousHeadingLevel + 1;
    }

    previousHeadingLevel = level;
    output.push(`${'#'.repeat(level)} ${headingTitle}`);
  }

  if (!hasH1) {
    output.unshift(`# ${title}`, '');
  }

  const normalized = collapseBlankLines(output).join('\n').trim();
  writeFile(relPath, `${frontMatter}${normalized}\n`);
}

function indentFenceContent(line, indent) {
  if (!indent || line.trim() === '' || line.startsWith(indent)) {
    return line.trimEnd();
  }

  return `${indent}${line.trimEnd()}`;
}

function cleanMarkdownLine(line) {
  if (line.trim() === '') {
    return '';
  }

  const indent = line.match(/^\s*/)[0];
  const body = line.slice(indent.length);
  return `${indent}${cleanInline(body)}`;
}

function collapseBlankLines(lines) {
  const result = [];

  for (const line of lines) {
    if (line === '' && result[result.length - 1] === '') {
      continue;
    }
    result.push(line);
  }

  while (result[0] === '') {
    result.shift();
  }
  while (result[result.length - 1] === '') {
    result.pop();
  }

  return result;
}

function firstHeading(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? cleanInline(match[1]) : '';
}

function descriptionFromMarkdown(content) {
  const lines = content.split('\n');
  const headingIndex = lines.findIndex((line) => /^#\s+/.test(line));

  for (let index = Math.max(0, headingIndex + 1); index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line || line.startsWith('<!--')) {
      continue;
    }
    if (line.startsWith('#') || line.startsWith('![') || line.startsWith('|')) {
      continue;
    }
    if (line.startsWith('> [!')) {
      continue;
    }

    return cleanInline(line.replace(/^>\s*/, '').replace(/^\*\*.+?:\*\*\s*/, ''));
  }

  return 'Stránka zatím nemá krátký úvod.';
}

function pageInfo(relPath) {
  if (!fs.existsSync(absolute(relPath))) {
    errors.push(`${relPath}: soubor je uvedený v navigaci, ale neexistuje`);
    return null;
  }

  const content = readFile(relPath);
  return {
    relPath,
    title: firstHeading(content) || inferredTitle(relPath),
    navTitle: titleByPath.get(relPath) || firstHeading(content) || inferredTitle(relPath),
    description: descriptionFromMarkdown(content),
  };
}

function link(fromFile, text, targetFile) {
  return `[${text}](${relativeLink(fromFile, targetFile)})`;
}

function table(headers, rows) {
  const divider = headers.map(() => '---');
  return `${[headers, divider, ...rows].map((row) => `| ${row.join(' | ')} |`).join('\n')}\n`;
}

function generatedPage(file, title, body) {
  generatedFiles.add(file);
  writeFile(file, `${generatedNotice}\n\n# ${title}\n\n${body.trim()}\n`);
}

function renderRootIndex() {
  const file = 'index.md';
  const sectionRows = sectionOrder.map((section) => {
    const pages = flattenItems(navigation[section] || []).filter((item) => item.href);
    const info = sectionInfo[section];
    return [
      link(file, info.title, `${section}/index.md`),
      String(pages.length),
      info.intro,
    ];
  });

  const body = `Osobní vývojářská dokumentace sjednocená podle tematických oblastí. Přehledy a navigace se skládají automaticky ze zdrojových souborů, aby zůstaly konzistentní i při dalším rozšiřování.\n\n## Oblasti\n\n${table(
    ['Oblast', 'Stránek', 'Záměr'],
    sectionRows
  )}\n## Údržba\n\n- Aktualizace přehledů a navigace: \`npm run docs:generate\`.\n- Kontrola bez zápisu: \`npm run docs:check\`.\n- Build DocFX výstupu: \`npm run docs:build\`.\n- Historie změn: ${link(file, 'Změny', 'changelog.md')}.`;

  generatedPage(file, 'Dokumentace pro vývojáře', body);
}

function collectSectionRows(section, items, groupName = null) {
  const rows = [];

  for (const item of items) {
    const currentGroup = item.href && !item.items?.length ? groupName : item.name || groupName;

    if (item.href) {
      const relPath = `${section}/${item.href}`;
      const info = pageInfo(relPath);
      if (info) {
        rows.push({
          group: groupName || item.name || 'Přehled',
          info,
        });
      }
    }

    if (item.items?.length) {
      rows.push(...collectSectionRows(section, item.items, currentGroup));
    }
  }

  return rows;
}

function renderSectionIndex(section) {
  const file = `${section}/index.md`;
  const info = sectionInfo[section];
  const rows = collectSectionRows(section, navigation[section] || []);
  const groups = new Map();

  for (const row of rows) {
    if (!groups.has(row.group)) {
      groups.set(row.group, []);
    }
    groups.get(row.group).push(row.info);
  }

  const groupBlocks = [...groups]
    .map(([group, pages]) => {
      const rowsForGroup = pages.map((page) => [
        link(file, page.navTitle, page.relPath),
        page.description,
      ]);
      return `### ${group}\n\n${table(['Stránka', 'Popis'], rowsForGroup)}`;
    })
    .join('\n');

  const body = `${info.intro}\n\n## Přehled stránek\n\n${groupBlocks}`;

  generatedPage(file, info.title, body);
}

function renderTocs() {
  const rootItems = [
    ...sectionOrder.map((section) => ({
      name: sectionInfo[section].navTitle || sectionInfo[section].title,
      href: `${section}/`,
    })),
  ];

  writeFile('toc.yml', `${generatedYamlNotice}\n${yaml(rootItems)}\n`);

  for (const section of sectionOrder) {
    const items = [{ name: 'Přehled', href: 'index.md' }, ...(navigation[section] || [])];
    writeFile(`${section}/toc.yml`, `${generatedYamlNotice}\n${yaml(items)}\n`);
  }
}

function validateNavigation() {
  const expected = new Set([...pagePaths, ...sectionOrder.map((section) => `${section}/index.md`)]);
  expected.add('index.md');

  for (const relPath of expected) {
    if (!fs.existsSync(absolute(relPath)) && !generatedFiles.has(relPath)) {
      errors.push(`${relPath}: očekávaný soubor neexistuje`);
    }
  }

  for (const relPath of walkMarkdown()) {
    if (relPath.endsWith('/toc.yml')) {
      continue;
    }
    if (relPath === 'index.md' || relPath === 'changelog.md') {
      continue;
    }
    if (relPath.endsWith('/index.md') && sectionOrder.some((section) => relPath === `${section}/index.md`)) {
      continue;
    }
    if (!expected.has(relPath)) {
      errors.push(`${relPath}: soubor není uvedený v navigaci`);
    }
  }
}

function validateLinks() {
  const missing = [];

  for (const relPath of walkMarkdown()) {
    const content = readFile(relPath);
    for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].trim();
      if (!target || isExternalTarget(target)) {
        continue;
      }

      const { pathPart } = splitTarget(target);
      if (!pathPart) {
        continue;
      }

      const resolved = resolveRelative(relPath, pathPart);
      if (!fs.existsSync(absolute(resolved))) {
        missing.push(`${relPath} -> ${target}`);
      }
    }
  }

  if (missing.length) {
    errors.push(...missing.map((item) => `neexistující odkaz: ${item}`));
  }
}

function removeObsoleteGeneratedFiles() {
  const generatedTargets = new Set([
    'index.md',
    'toc.yml',
    ...sectionOrder.flatMap((section) => [`${section}/index.md`, `${section}/toc.yml`]),
  ]);

  for (const relPath of walkFiles()) {
    if (!relPath.endsWith('.md') && !relPath.endsWith('.yml')) {
      continue;
    }
    if (generatedTargets.has(relPath)) {
      continue;
    }

    const content = readFile(relPath);
    if (!content.includes(generatedNotice) && !content.includes(generatedYamlNotice)) {
      continue;
    }

    pendingChanges.push(relPath);
    if (!checkOnly) {
      fs.unlinkSync(absolute(relPath));
    }
  }
}

function removeEmptyDirectories() {
  const dirs = walkDirectories()
    .filter((relPath) => relPath !== '.')
    .sort((a, b) => b.length - a.length);

  for (const relPath of dirs) {
    const fullPath = absolute(relPath);
    if (!fs.existsSync(fullPath)) {
      continue;
    }
    if (fs.readdirSync(fullPath).length > 0) {
      continue;
    }

    pendingChanges.push(relPath);
    if (!checkOnly) {
      fs.rmdirSync(fullPath);
    }
  }
}

function walkDirectories() {
  const dirs = ['.'];
  const ignored = new Set(['.agents', '.codex', '.git', '.github', '.idea', '_site', 'private']);

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || ignored.has(entry.name)) {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      dirs.push(toPosix(path.relative(root, fullPath)));
      walk(fullPath);
    }
  }

  walk(root);
  return dirs;
}

function applyLegacyRenames() {
  for (const [fromRel, toRel] of legacyRenames) {
    moveFile(fromRel, toRel);
  }
}

function normalizeMarkdownFiles() {
  for (const relPath of walkMarkdown()) {
    if (relPath.endsWith('/toc.yml')) {
      continue;
    }
    if (readFile(relPath).includes(generatedNotice)) {
      continue;
    }
    if (generatedFiles.has(relPath)) {
      continue;
    }
    normalizeMarkdown(relPath);
  }
}

function main() {
  applyLegacyRenames();
  normalizeMarkdownFiles();
  renderRootIndex();
  for (const section of sectionOrder) {
    renderSectionIndex(section);
  }
  renderTocs();
  removeObsoleteGeneratedFiles();
  validateNavigation();
  validateLinks();
  removeEmptyDirectories();

  if (errors.length) {
    for (const error of errors) {
      console.error(error);
    }
    process.exit(1);
  }

  if (!pendingChanges.length) {
    console.log('Dokumentace je aktuální.');
    return;
  }

  console.log(checkOnly ? 'Dokumentace není aktuální:' : 'Aktualizováno:');
  for (const relPath of pendingChanges) {
    console.log(`- ${relPath}`);
  }

  if (checkOnly) {
    process.exit(1);
  }
}

main();
