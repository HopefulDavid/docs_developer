let previousQuery = "";

export function syncSearchResults() {
  // Výsledek vyhledávání se otevírá jako běžný článek ve stejné kartě.
  document.querySelectorAll('#search-results a[target="_blank"]').forEach((link) => {
    if (link.origin === window.location.origin) link.removeAttribute("target");
  });

  // Nový dotaz začíná prvním výsledkem i po posunu v článku.
  const query = document.body.dataset.search === "true"
    ? document.querySelector("#search-query")?.value.trim() ?? ""
    : "";
  if (query && query !== previousQuery) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  previousQuery = query;
}
