// Výběr motivu obstarává DocFX. Zde se doplňuje označení zvolené položky a změna motivu systému za běhu.
const themeIcons = { light: "sun", dark: "moon", auto: "circle-half" };

function storedTheme() {
  try {
    return localStorage.getItem("theme") || "auto";
  } catch {
    // Prohlížeč může úložiště zakázat.
    return "auto";
  }
}

export function syncThemeControl() {
  const toggle = document.querySelector(".icons .dropdown-toggle");
  if (!toggle) return;

  // DocFX vykresluje odkaz bez href, který bez doplnění nelze ovládat klávesnicí.
  toggle.setAttribute("role", "button");
  toggle.setAttribute("tabindex", "0");
  toggle.setAttribute("aria-label", toggle.title);

  const activeIcon = `.bi-${themeIcons[storedTheme()]}`;
  document.querySelectorAll(".icons .dropdown-item").forEach((item) => {
    const active = item.querySelector(activeIcon) !== null;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  });
}

export function followSystemTheme() {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  systemDark.addEventListener("change", () => {
    if (storedTheme() === "auto") {
      root.setAttribute("data-bs-theme", systemDark.matches ? "dark" : "light");
    }
  });
  new MutationObserver(syncThemeControl).observe(root, { attributeFilter: ["data-bs-theme"] });
}
