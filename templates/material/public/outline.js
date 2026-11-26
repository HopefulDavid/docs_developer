// Navigace "V tomto článku": DocFX ji vykresluje bez zvýraznění právě čtené části.
let observedList = null;
let syncScheduled = false;

const isSection = (item) => item.querySelector(":scope > .link-body-emphasis") !== null;

/** Označí čtený nadpis a kapitolu druhé úrovně, do které patří. */
function syncOutline() {
  if (!observedList?.isConnected) return;

  const items = [...observedList.children];
  const headerHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--docs-header-height"),
  );
  const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

  const isReached = (item) => {
    const id = item.querySelector(":scope > a").hash.slice(1);
    const heading = document.getElementById(decodeURIComponent(id));
    return heading !== null && heading.getBoundingClientRect().top <= headerHeight + 96;
  };
  const activeItem = isAtPageEnd ? items.at(-1) : items.findLast(isReached) ?? items[0];
  const activeSection = items.slice(0, items.indexOf(activeItem) + 1).findLast(isSection) ?? items.find(isSection);

  items.forEach((item) => {
    item.classList.toggle("docs-current-item", item === activeItem);
    item.classList.toggle("docs-current-section", item === activeSection);
  });
}

/** Sloučí rychlé posuny stránky do jedné aktualizace na snímek. */
export function scheduleOutlineSync() {
  if (syncScheduled) return;

  syncScheduled = true;
  requestAnimationFrame(() => {
    syncScheduled = false;
    syncOutline();
  });
}

/** Najde seznam, který DocFX vytváří až po načtení článku. */
export function observeOutline() {
  observedList = document.querySelector("#affix > ul");
  syncOutline();
}
