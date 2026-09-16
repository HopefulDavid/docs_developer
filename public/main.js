const themeKey = "theme";
const themeValues = new Set(["light", "dark", "auto"]);
let previousSearchQuery = "";

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

  document.querySelectorAll("article table").forEach((table) => {
    if (table.parentElement.classList.contains("docs-table-scroll")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "docs-table-scroll";
    table.before(wrapper);
    wrapper.append(table);
  });

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
  document.addEventListener("click", handleThemeClick, true);
  document.addEventListener("keydown", (event) => {
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
