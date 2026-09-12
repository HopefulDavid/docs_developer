---
description: "Záloha sdíleného store a instalace projektu z lockfilu bez přístupu k registru."
---

# pnpm – sdílené balíčky a offline obnova

pnpm ukládá obsah balíčků do společného store a projektové `node_modules` sestavuje pomocí odkazů a vlastní struktury.

Proto zálohuj store a vstupy projektu, potom instalaci na cíli znovu vytvoř.

## Před použitím

Zaznamenej `node --version` a `pnpm --version` a zachovej verzi pnpm uvedenou projektem, například v poli `packageManager`.

Příkazy níže byly zkoušeny s pnpm 12; starší projekt neaktualizuj jen kvůli záloze a jeho vlastní nastavení zachovej.

| Syntaxe | Účel |
|---|---|
| `pnpm add <balíček>[@<verze>]` | Přidá běžnou závislost |
| `pnpm add -D <balíček>[@<verze>]` | Přidá vývojovou závislost |
| `pnpm remove <balíček>` | Odebere závislost |
| `pnpm install --frozen-lockfile` | Obnoví bez změny lockfilu |
| `pnpm store path` | Vypíše skutečné umístění store pro účinnou konfiguraci |
| `pnpm run <skript>` | Spustí skript z manifestu |

`pnpm add -D typescript` je například instalace překladače jen pro vývoj projektu.

## 1. Naplň store s internetem

V kořeni projektu s `pnpm-lock.yaml`:

```bash
pnpm fetch --store-dir ../zaloha-pnpm/store
pnpm install --offline --frozen-lockfile --store-dir ../zaloha-pnpm/store
pnpm store path --store-dir ../zaloha-pnpm/store
```

`fetch` připraví balíčky podle lockfilu a příslušné konfigurace; druhý příkaz rovnou ověří, zda instalace umí vystačit s jejich obsahem.

`--store-dir` určuje kořen store, pod kterým pnpm může vytvořit vlastní verzované podadresáře.

Zálohuj celý zvolený kořen `zaloha-pnpm/store` a na cíli předávej znovu tento kořen, nikoli náhodně vybranou vnitřní složku.

Při použití už existujícího store ověř `pnpm store path` i konfiguraci `store-dir` a uchovej odpovídající strukturu stejné verze pnpm.

## 2. Co přesně přenést

```text
zaloha-pnpm/
  projekt/          package.json, pnpm-lock.yaml, pnpm-workspace.yaml, zdroje
  store/            celý kořen použitý v --store-dir
  verze.txt         pnpm, Node.js, OS a CPU
```

Přidej projektové `.npmrc` bez tajemství, patche, všechny workspace projekty a skutečné obsahy lokálních závislostí.

`fetch` sám nevyřeší chybějící místní `file:` zdroje a kopie jednoho podprojektu nemusí být úplný workspace.

Zálohu store vytvářej až po dokončení operací a předtím nespouštěj `pnpm store prune`.

## 3. Obnov v nové pracovní složce

Na kompatibilním cíli se stejnými nástroji, bez původního `node_modules`, spusť v `zaloha-pnpm/projekt`:

```bash
pnpm install --offline --frozen-lockfile --store-dir ../store
pnpm list --depth Infinity
```

`--offline` zakazuje doplnění chybějících balíčků z registru a `--frozen-lockfile` chrání vyřešené verze před změnou.

`--prefer-offline` není totéž: chybějící obsah může stále stáhnout.

Nakonec spusť projektové testy a build bez internetového připojení.

## Instalační skripty a runtime

Novější pnpm řídí povolování build skriptů závislostí; potřebné skripty schvaluj jednotlivě podle projektu a uchovej vzniklou konfiguraci.

Nevypínej plošně ochrany jen proto, že se neobjevil požadovaný binární soubor.

Projekt může pomocí pnpm spravovat také Node.js runtime nebo stahovat externí nástroje; balíčkový store sám neprokazuje dostupnost těchto dalších dat.

## Časté problémy

| Situace | Co ověřit |
|---|---|
| Balíček není dostupný offline | Přesný lockfile, všechny vývojové závislosti a store z přípravy |
| Chyba verze lockfilu | Použitou verzi pnpm, neprovádět neplánovaný převod formátu |
| Chybí binární soubor | Povolený instalační skript, platformní balíček a jeho externí stažená data |
| Symlink míří na starou cestu | Na cíli znovu vytvořit `node_modules` běžnou offline instalací |

Zdroje: [pnpm fetch](https://pnpm.io/cli/fetch), [pnpm install](https://pnpm.io/cli/install), [nastavení](https://pnpm.io/settings).
