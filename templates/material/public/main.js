const themeKey = "theme";
const themeValues = new Set(["light", "dark", "auto"]);
let previousSearchQuery = "";
let observedAffixList = null;
let affixObserver = null;
let affixSyncScheduled = false;
let initialHashRestored = false;

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(themeKey);
    return themeValues.has(stored) ? stored : "auto";
  } catch {
    return "auto";
  }
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(themeKey, theme);
  } catch {
    // Storage can be unavailable in strict browser contexts.
  }
}

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolvedTheme(theme = readStoredTheme()) {
  return theme === "auto" ? systemTheme() : theme;
}

function setTheme(theme, persist = true) {
  if (!themeValues.has(theme)) {
    theme = "auto";
  }

  if (persist) {
    writeStoredTheme(theme);
  }

  document.documentElement.setAttribute("data-bs-theme", resolvedTheme(theme));
  syncThemeControl(theme);
}

function itemTheme(item) {
  if (item.querySelector(".bi-sun")) {
    return "light";
  }

  if (item.querySelector(".bi-moon")) {
    return "dark";
  }

  if (item.querySelector(".bi-circle-half")) {
    return "auto";
  }

  return "";
}

function syncThemeControl(theme = readStoredTheme()) {
  const toggle = document.querySelector('[title="Změnit motiv"], [title="Change theme"]');
  const icon = toggle?.querySelector("i");

  if (toggle) {
    // DocFX renders an anchor without href.
    // Supply button semantics and keyboard access.
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-label", "Změnit motiv");
  }

  if (icon) {
    icon.className = theme === "light" ? "bi bi-sun" : theme === "dark" ? "bi bi-moon" : "bi bi-circle-half";
  }

  document.querySelectorAll(".dropdown-menu .dropdown-item").forEach((item) => {
    const value = itemTheme(item);

    if (!value) {
      return;
    }

    const active = value === theme;
    item.dataset.docsThemeValue = value;
    item.classList.toggle("active", active);
    if (active) {
      item.setAttribute("aria-current", "true");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function handleThemeClick(event) {
  const item = event.target.closest?.(".dropdown-menu .dropdown-item");

  if (!item) {
    return;
  }

  const theme = item.dataset.docsThemeValue || itemTheme(item);

  if (!themeValues.has(theme)) {
    return;
  }

  event.preventDefault();
  setTheme(theme);
}

/** Keep one focusable scroll container when DocFX adds its responsive wrapper asynchronously. */
function normalizeTableScrollers(article) {
  article.querySelectorAll("table").forEach((table) => {
    let wrapper = table.closest(".table-responsive") || table.closest(".docs-table-scroll");

    if (!wrapper) {
      wrapper = document.createElement("div");
      table.before(wrapper);
      wrapper.append(table);
    }

    wrapper.classList.add("docs-table-scroll");

    const redundantWrappers = [];
    for (let element = table.parentElement; element && element !== article; element = element.parentElement) {
      if (element !== wrapper && element.classList.contains("docs-table-scroll")) {
        redundantWrappers.push(element);
      }
    }

    redundantWrappers.forEach((element) => {
      if (element.isConnected) {
        element.replaceWith(...element.childNodes);
      }
    });
  });
}

/** Present the page title and its opening summary as one visual introduction. */
function enhanceArticleLead(article) {
  if (article.querySelector(":scope > .docs-article-lead")) {
    return;
  }

  const title = article.querySelector(":scope > h1:first-child");
  if (!title) {
    return;
  }

  const lead = document.createElement("header");
  lead.className = "docs-article-lead";
  title.before(lead);
  lead.append(title);

  const summary = lead.nextElementSibling;
  if (summary?.matches("p, .docs-intro")) {
    lead.append(summary);
  }
}

/** Add a quiet, useful language caption to fenced code examples. */
function enhanceCodeBlocks(article) {
  const languageNames = {
    bash: "Shell",
    shell: "Shell",
    sh: "Shell",
    powershell: "PowerShell",
    ps1: "PowerShell",
    dockerfile: "Dockerfile",
    yaml: "YAML",
    yml: "YAML",
    json: "JSON",
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    html: "HTML",
    css: "CSS",
    csharp: "C#",
    cs: "C#",
    sql: "SQL",
    xml: "XML",
    text: "Text",
    plaintext: "Text",
  };

  article.querySelectorAll("pre > code").forEach((code) => {
    const pre = code.parentElement;
    const languageClass = [...code.classList].find((name) => /^(?:lang|language)-/.test(name));
    const language = languageClass?.replace(/^(?:lang|language)-/, "").toLowerCase();

    pre.classList.add("docs-code-block");
    if (language) {
      pre.dataset.language = languageNames[language] || language.toUpperCase();
    }
  });
}

/** Restore a deep link after the article lead has reached its final layout. */
function restoreInitialHash() {
  if (initialHashRestored || !window.location.hash) {
    return;
  }

  let id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  initialHashRestored = true;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
      scheduleAffixSync();
    });
  });
}

/** Mark the active heading together with the H2 section that owns it. */
function syncAffixHierarchy(list = observedAffixList) {
  if (!list?.isConnected) {
    return;
  }

  const items = [...list.children].filter((item) => item.matches("li"));
  const headerHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--docs-header-height"),
  ) || 56;
  const headingThreshold = headerHeight + 96;
  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let section = null;
  let firstSection = null;
  let activeSection = null;
  let activeItem = items[0] ?? null;

  items.forEach((item) => {
    const link = item.querySelector(":scope > a");

    const href = link?.getAttribute("href") || "";
    const heading = href.startsWith("#") ? document.getElementById(decodeURIComponent(href.slice(1))) : null;
    const headingLevel = Number.parseInt(heading?.tagName.slice(1) || "0", 10);
    const isSection = headingLevel === 2
      || (headingLevel === 0 && (link?.classList.contains("link-body-emphasis") ?? false));

    for (let level = 2; level <= 6; level += 1) {
      item.classList.toggle(`docs-affix-level-${level}`, headingLevel === level);
    }

    item.classList.toggle("docs-affix-section", isSection);
    item.classList.toggle("docs-affix-subsection", !isSection);

    if (isSection) {
      section = item;
      firstSection ||= item;
    }

    if (heading && heading.getBoundingClientRect().top <= headingThreshold) {
      activeItem = item;
    }
  });

  if (isAtPageEnd && items.length) {
    activeItem = items.at(-1);
  }

  section = null;
  items.forEach((item) => {
    if (item.classList.contains("docs-affix-section")) {
      section = item;
    }

    item.classList.toggle("docs-current-item", item === activeItem);
    if (item === activeItem) {
      activeSection = section;
    }
  });

  activeSection ||= firstSection;
  items.forEach((item) => {
    item.classList.toggle("docs-current-section", item === activeSection && item.classList.contains("docs-affix-section"));
  });
}

/** Coalesce rapid scroll events into one navigation update per frame. */
function scheduleAffixSync() {
  if (affixSyncScheduled) {
    return;
  }

  affixSyncScheduled = true;
  window.requestAnimationFrame(() => {
    affixSyncScheduled = false;
    syncAffixHierarchy();
  });
}

/** Follow DocFX when it creates or replaces the in-page navigation. */
function observeAffixHierarchy() {
  const list = document.querySelector("#affix > ul");

  if (!list || list === observedAffixList) {
    syncAffixHierarchy(list);
    return;
  }

  affixObserver?.disconnect();
  observedAffixList = list;
  syncAffixHierarchy(list);
  affixObserver = new MutationObserver(() => syncAffixHierarchy(list));
  affixObserver.observe(list, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}

/** Enhance generated DocFX markup without changing article content or code text. */
function enhanceReading() {
  const article = document.querySelector("article");
  if (article && !document.querySelector(".docs-skip-link")) {
    article.id ||= "docs-content";
    article.tabIndex = -1;
    const skip = document.createElement("a");
    skip.className = "docs-skip-link";
    skip.href = `#${article.id}`;
    skip.textContent = "Přejít k obsahu";
    document.body.prepend(skip);
  }

  if (article) {
    enhanceArticleLead(article);
    enhanceCodeBlocks(article);
    normalizeTableScrollers(article);
  }

  observeAffixHierarchy();

  const labels = {
    "Toggle navigation": "Otevřít navigaci",
    "Search": "Hledat v dokumentaci",
    "Filter by title": "Filtrovat názvy článků",
    "Close": "Zavřít",
    "Show table of contents": "Zobrazit obsah",
    "Anchor": "Odkaz na tento nadpis",
  };
  document.querySelectorAll("[aria-label]").forEach((element) => {
    const translated = labels[element.getAttribute("aria-label")];
    if (translated) element.setAttribute("aria-label", translated);
  });
  document.querySelectorAll("a.code-action[title]").forEach((element) => {
    element.setAttribute("aria-label", element.title);
  });
  const tocLabel = document.querySelector("#tocOffcanvasLabel");
  if (tocLabel?.textContent === "Table of Contents") tocLabel.textContent = "Obsah oblasti";
  // Internal search results follow normal article navigation in the current tab.
  document.querySelectorAll('#search-results a[target="_blank"]').forEach((link) => {
    if (new URL(link.href).origin === window.location.origin) link.removeAttribute("target");
  });
  // A new query starts at its first result, even when the article was scrolled down.
  const query = document.body.dataset.search === "true"
    ? document.querySelector("#search-query")?.value.trim() || ""
    : "";
  if (query && query !== previousSearchQuery) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  previousSearchQuery = query;
  syncScrollableRegions();
}

/** Only overflowing regions need a tab stop for horizontal keyboard scrolling. */
function syncScrollableRegions() {
  document.querySelectorAll(".docs-table-scroll, article pre").forEach((region) => {
    if (region.scrollWidth > region.clientWidth + 1) {
      region.tabIndex = 0;
      region.setAttribute("role", "region");
      region.setAttribute("aria-label", region.matches("pre") ? "Posuvná ukázka kódu" : "Posuvná tabulka");
    } else {
      region.removeAttribute("tabindex");
      region.removeAttribute("role");
      region.removeAttribute("aria-label");
    }
  });
}

function start() {
  setTheme(readStoredTheme(), false);
  enhanceReading();
  restoreInitialHash();
  document.addEventListener("click", handleThemeClick, true);
  document.addEventListener("keydown", (event) => {
    const currentTab = event.target.closest?.('[role="tab"]');
    if (currentTab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const tabs = [...currentTab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')]
        .filter((tab) => !tab.closest('[hidden]'));
      const index = tabs.indexOf(currentTab);
      if (index >= 0 && tabs.length > 0) {
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next].click();
        tabs[next].focus();
      }
      return;
    }
    if ((event.key === "Enter" || event.key === " ") &&
        event.target.matches('a[role="button"][data-bs-toggle="dropdown"]')) {
      event.preventDefault();
      event.target.click();
    }
  });

  const observer = new MutationObserver(() => {
    syncThemeControl();
    enhanceReading();
  });
  observer.observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ["data-search"],
  });
  window.addEventListener("resize", syncScrollableRegions);
  window.addEventListener("scroll", scheduleAffixSync, { passive: true });
  document.addEventListener("toggle", syncScrollableRegions, true);

  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (readStoredTheme() === "auto") {
      setTheme("auto", false);
    }
  });
}

export default {
  start,
};
