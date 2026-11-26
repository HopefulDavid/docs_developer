// Popisky, které moderní šablona DocFX obsahuje pevně v angličtině mimo token.json.
const labels = {
  "Toggle navigation": "Otevřít navigaci",
  "Search": "Hledat v dokumentaci",
  "Close": "Zavřít",
  "Show table of contents": "Zobrazit obsah",
  "Anchor": "Odkaz na tento nadpis",
};

export function labelControls() {
  document.querySelectorAll("[aria-label]").forEach((element) => {
    const label = labels[element.getAttribute("aria-label")];
    if (label) element.setAttribute("aria-label", label);
  });
  document.querySelectorAll("a.code-action[title]").forEach((element) => {
    element.setAttribute("aria-label", element.title);
  });
  const tocLabel = document.querySelector("#tocOffcanvasLabel");
  if (tocLabel?.textContent === "Table of Contents") tocLabel.textContent = "Obsah oblasti";
}

/** Zastávku klávesy Tab dostane jen oblast, kterou je třeba vodorovně posouvat. */
export function syncScrollableRegions() {
  document.querySelectorAll("article .table-responsive, article pre").forEach((region) => {
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

/** Karty v článku se přepínají šipkami, výběr motivu se otevírá klávesami Enter a mezerník. */
export function enableKeyboardControls() {
  document.addEventListener("keydown", (event) => {
    const currentTab = event.target.closest?.('[role="tab"]');
    if (currentTab) {
      moveBetweenTabs(event, currentTab);
    } else if ((event.key === "Enter" || event.key === " ")
        && event.target.matches?.('a[role="button"][data-bs-toggle="dropdown"]')) {
      event.preventDefault();
      event.target.click();
    }
  });
}

function moveBetweenTabs(event, currentTab) {
  const tabs = [...currentTab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')]
    .filter((tab) => !tab.closest("[hidden]"));
  const index = tabs.indexOf(currentTab);
  const target = {
    Home: tabs[0],
    End: tabs.at(-1),
    ArrowLeft: tabs.at(index - 1),
    ArrowRight: tabs[(index + 1) % tabs.length],
  }[event.key];
  if (!target) return;

  event.preventDefault();
  target.click();
  target.focus();
}
