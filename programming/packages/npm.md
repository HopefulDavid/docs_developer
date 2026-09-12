---
description: "Správa závislostí Node.js a přenos ověřené cache pro npm ci bez registru."
---

# npm – balíčky a offline obnova

npm spravuje závislosti Node.js a spouští skripty projektu z `package.json`.

`package-lock.json` zaznamenává konkrétní vyřešené verze, které má `npm ci` znovu nainstalovat.

## Běžné příkazy

Spouštěj je v kořeni projektu se správnou verzí Node.js a npm.

| Syntaxe | Účinek |
|---|---|
| `npm ci` | Odstraní stávající `node_modules` a obnoví přesný lockfile |
| `npm install <balíček>[@<verze>]` | Přidá knihovnu a aktualizuje manifest i lockfile |
| `npm install --save-dev <balíček>[@<verze>]` | Přidá vývojovou závislost |
| `npm uninstall <balíček>` | Odebere deklaraci i odpovídající instalaci |
| `npm outdated` | Ukáže dostupné novější verze |
| `npm update` | Aktualizuje závislosti v povolených rozsazích manifestu |
| `npm run [<skript>]` | Vypíše skripty nebo spustí zvolený projektový příkaz |

Například `npm install --save-dev --save-exact typescript` uloží aktuálně zvolenou konkrétní verzi překladače TypeScript bez rozsahového prefixu.

Před přijetím aktualizace prohlédni oba změněné soubory a spusť testy; `@latest` neznamená automaticky kompatibilní verzi.

## Offline záloha a obnova

Cache npm je pracovní mezipaměť, nikoli garantovaný trvalý archiv; pro konkrétní zálohu ji proto naplň a **ověř obnovou do čistého projektu**.

Příklady fungují v PowerShellu i Bashi a používají npm 11; verzi správce zachovej i na cíli.

### 1. Připrav obsah s internetem

V čisté kopii projektu s platným lockfile:

```bash
node --version
npm --version
npm ci --cache ../zaloha-npm/npm-cache --no-audit --no-fund
npm cache verify --cache ../zaloha-npm/npm-cache
```

`ci` nově nainstaluje celý projekt a pro stahování používá samostatnou cache v sousední složce zálohy.

`--no-audit` a `--no-fund` vynechají doprovodný audit a výpis financování; bezpečnostní audit závislostí udělej online zvlášť.

Pokud projekt pro vytvoření lockfilu vyžadoval například `legacy-peer-deps` nebo jiné instalační nastavení, uchovej stejné projektové `.npmrc` bez tokenů.

### 2. Přenes celou složku

Zálohu sestav takto:

```text
zaloha-npm/
  projekt/          zdroje, package.json, package-lock.json, .npmrc, workspaces
  npm-cache/        celá naplněná cache
  verze.txt         Node.js, npm, OS a architektura
```

`projekt` je kopie skutečných zdrojů bez `node_modules`; přidej i používané lokální `file:` závislosti a všechny workspaces v odpovídajících relativních cestách.

Před kopírováním cache ukonči instalace a nic v ní ručně nevybírej ani nečisti.

Pokud chceš zálohovat již používanou globální cache, její cestu ukáže `npm config get cache`; lze přenést celý tento adresář, ale úplnost pro projekt musíš prokázat stejnou offline zkouškou.

### 3. Obnov na cílovém počítači

Nainstaluj stejnou verzi Node.js a npm, otevři terminál v `zaloha-npm/projekt` a spusť:

```bash
npm ci --offline --cache ../npm-cache --no-audit --no-fund
npm ls --all
```

`--offline` zabrání npm stahovat chybějící obsah z registru; chybějící položka způsobí chybu místo tichého doplnění ze sítě.

`npm ls` zkontroluje strom závislostí; poté spusť skutečný build, testy a aplikaci podle jejích skriptů.

## Co může potřebovat samostatnou zálohu

- Nativní moduly a volitelné balíčky závisejí na OS, CPU a verzi Node.js.
- Instalační skripty mohou stahovat prohlížeče, binární nástroje nebo jiná data mimo cache npm.
- Git závislosti a lokální soubory vyžadují i dostupný zdroj, který lockfile označuje.
- `npm pack` vytvoří archiv zvoleného balíčku, ale automaticky nearchivuje celý strom jeho závislostí.

`--ignore-scripts` může být užitečné pro kontrolovaný test instalace, ale není plnohodnotnou obnovou, pokud aplikace výstup těchto skriptů potřebuje.

## Globální nástroje

Inventář zjistíš příkazem `npm list -g --depth=0` a umístění přes `npm root -g` a `npm config get prefix`.

Globální složka a spouštěče nejsou obecně přenosná instalace; pro důležitý nástroj preferuj projektovou závislost s lockfile a výše ověřenou cache.

Globální opětovná instalace má syntaxi `npm install -g <balíček>@<verze> --offline --cache <zálohovaná-cache>` a musíš ji samostatně vyzkoušet s úplnou cache tohoto nástroje.

## Časté problémy

| Chyba | Náprava při přípravě zálohy |
|---|---|
| `ENOTCACHED` | Naplň cache znovu online pro přesný projekt, platformu a lockfile |
| Manifest a lockfile nesouhlasí | Vědomě sjednoť přes `npm install`, zkontroluj diff a vytvoř novou zálohu |
| Instalační skript chce internet | Uchovej jeho externí data nebo použij dokumentované offline nastavení daného balíčku |
| Jiná platforma | Připrav a otestuj samostatnou zálohu pro tuto kombinaci OS, CPU a Node.js |

Zdroje: [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/), [npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache/), [konfigurace offline](https://docs.npmjs.com/cli/v11/using-npm/config/#offline).
