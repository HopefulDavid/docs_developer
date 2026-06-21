const themeKey = "theme";
const themeValues = new Set(["light", "dark", "auto"]);

function readStoredTheme() {
  try {
    return localStorage.getItem(themeKey) || "auto";
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
  const text = item.textContent.trim().toLowerCase();

  if (text.includes("light")) {
    return "light";
  }

  if (text.includes("dark")) {
    return "dark";
  }

  if (text.includes("auto")) {
    return "auto";
  }

  return "";
}

function syncThemeControl(theme = readStoredTheme()) {
  const toggle = document.querySelector('a[title="Change theme"], button[title="Change theme"]');
  const icon = toggle?.querySelector("i");

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
    item.toggleAttribute("aria-current", active);
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

function start() {
  setTheme(readStoredTheme(), false);
  document.addEventListener("click", handleThemeClick, true);

  const observer = new MutationObserver(() => syncThemeControl());
  observer.observe(document.body, { childList: true, subtree: true });

  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (readStoredTheme() === "auto") {
      setTheme("auto", false);
    }
  });
}

export default {
  start,
};
