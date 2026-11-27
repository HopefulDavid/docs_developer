/** Otevře vyhledávání DocFX v horní liště, na úzkém displeji nejdřív rozbalí navigaci. */
function openSearch() {
  const input = document.querySelector("#search-query");
  if (!input) return;
  if (!input.offsetParent) document.querySelector('[data-bs-target="#navpanel"]')?.click();
  requestAnimationFrame(() => input.focus());
}

/** Tlačítko hledání na úvodní stránce a klávesa / odkudkoli, pokud se zrovna nepíše do pole. */
export function enableSearchShortcuts() {
  document.addEventListener("click", (event) => {
    if (event.target.closest?.("[data-docs-search]")) openSearch();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.target.closest?.("input, textarea, [contenteditable]")) return;
    event.preventDefault();
    openSearch();
  });
}
