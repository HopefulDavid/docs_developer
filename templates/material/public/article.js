const languageNames = { bash: "Shell", sh: "Shell", csharp: "C#", cs: "C#" };

export function enhanceArticle(article) {
  addSkipLink(article);
  groupLead(article);
  labelCodeBlocks(article);
}

function addSkipLink(article) {
  if (document.querySelector(".docs-skip-link")) return;

  article.id ||= "docs-content";
  article.tabIndex = -1;
  const link = document.createElement("a");
  link.className = "docs-skip-link";
  link.href = `#${article.id}`;
  link.textContent = "Přejít k obsahu";
  document.body.prepend(link);
}

/** Spojí nadpis článku a první odstavec do jednoho úvodního bloku. */
function groupLead(article) {
  const title = article.querySelector(":scope > h1:first-child");
  if (!title) return;

  const lead = document.createElement("header");
  lead.className = "docs-article-lead";
  title.before(lead);
  lead.append(title);

  const summary = lead.nextElementSibling;
  if (summary?.matches("p, .docs-intro")) lead.append(summary);
}

/** Uloží název jazyka ukázky, který zobrazuje main.css. */
function labelCodeBlocks(article) {
  article.querySelectorAll("pre:not([data-language]) > code").forEach((code) => {
    const language = [...code.classList].find((name) => name.startsWith("lang-"))?.slice(5);
    if (language) code.parentElement.dataset.language = languageNames[language] ?? language;
  });
}

/** Vrátí stránku na kotvu z adresy, protože úvodní blok mění výšku obsahu po načtení. */
export function restoreInitialHash() {
  let target;
  try {
    target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  } catch {
    // Neplatné procentové kódování neoznačuje žádnou kotvu.
  }
  if (!target) return;

  requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({ block: "start" })));
}
