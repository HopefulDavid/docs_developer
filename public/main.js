// Rozšíření moderní šablony DocFX. DocFX načte výchozí export a před vykreslením zavolá start().
import { enableKeyboardControls, labelControls, syncScrollableRegions } from "./accessibility.js";
import { enhanceArticle, restoreInitialHash } from "./article.js";
import { observeOutline, scheduleOutlineSync } from "./outline.js";
import { syncSearchResults } from "./search.js";
import { enableSearchShortcuts } from "./shortcuts.js";
import { followSystemTheme, syncThemeControl } from "./theme.js";

/** Doplní prvky, které DocFX vykresluje asynchronně. Text článků a ukázek nemění. */
function enhancePage() {
  const article = document.querySelector("article");
  if (article) enhanceArticle(article);

  observeOutline();
  syncThemeControl();
  labelControls();
  syncSearchResults();
  syncScrollableRegions();
}

export default {
  start() {
    enhancePage();
    restoreInitialHash();
    followSystemTheme();
    enableKeyboardControls();
    enableSearchShortcuts();

    new MutationObserver(enhancePage).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-search"],
    });
    window.addEventListener("resize", syncScrollableRegions);
    window.addEventListener("scroll", scheduleOutlineSync, { passive: true });
    document.addEventListener("toggle", syncScrollableRegions, true);
  },
};
