---
description: "Obnova Node.js projektu z lockfilu, přenos celé npm cache a záloha globálních nástrojů."
---

# npm – záloha a obnova balíčků

npm instaluje závislosti Node.js podle `package.json`; jejich konkrétní vyřešené verze uchovává `package-lock.json`.

S internetem stačí obnovitelné zdroje projektu, zatímco bez registru potřebuješ také naplněnou instalační cache.

## Obnova s internetem

Zálohuj celý zdrojový projekt, lockfile, všechny workspaces a projektové `.npmrc` bez přihlašovacích tokenů.

Na cíli nainstaluj stejnou verzi Node.js a npm a v kořeni projektu spusť:

```bash
npm ci --include=dev --no-audit --no-fund
npm ls --all
```

`npm ci` obnoví uzamčené verze, odmítne nesoulad manifestu s lockfilem a odstraní stávající `node_modules`. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

Proto postup zkoušej v pracovní kopii, nikoli ve složce s ručními úpravami instalovaných balíčků.

## Offline záloha a obnova

Příklady jsou pro npm 11 a fungují v PowerShellu i Bashi.

Zachovej instalační nastavení projektu, zejména volby jako `legacy-peer-deps` nebo `install-links`, se kterými vznikl lockfile.

### 1. Naplň samostatnou cache s internetem

V pracovní kopii projektu s hotovým lockfile:

```bash
node --version
npm --version
npm ci --include=dev --cache ../zaloha-npm/npm-cache --no-audit --no-fund
npm cache verify --cache ../zaloha-npm/npm-cache
```

`--include=dev` zahrne vývojové závislosti i při nastaveném `NODE_ENV=production`, aby na cíli nechyběly nástroje pro build a testy.

`cache verify` prověří integritu uložených dat, **nikoli úplnost zálohy pro projekt**. [Npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache/)

Úplnost ověří až instalace v nové složce níže.

### 2. Přenes zálohu

Po skončení instalací přenes:

```text
zaloha-npm/
  projekt/       zdroje, package.json, package-lock.json, konfigurace a workspaces
  npm-cache/     celá cache z předchozího příkazu
  verze.txt      Node.js, npm, operační systém a architektura
```

Projekt přenes bez `node_modules`; přidej také skutečné lokální `file:` závislosti v odpovídajících relativních cestách.

Cache npm nemá záruky trvalého archivu, proto dokončenou a vyzkoušenou kopii ulož odděleně od běžně používané cache.

Ve Windows zvol krátkou cílovou cestu: cache obsahuje dlouhé názvy a kopírovací nástroj bez podpory dlouhých cest může část souborů vynechat nebo skončit chybou.

### 3. Obnov bez internetu

Na kompatibilním cíli v `zaloha-npm/projekt`:

```bash
npm ci --offline --include=dev --cache ../npm-cache --no-audit --no-fund
npm ls --all
```

`--offline` zakáže síťové požadavky npm a při chybějícím balíčku instalace selže; `--prefer-offline` chybějící obsah naopak smí stáhnout. [Konfigurace offline režimu](https://docs.npmjs.com/cli/v11/using-npm/config/#offline)

Nakonec spusť skutečné skripty projektu, například jeho build a testy.

`--no-audit` vynechá síťový audit; kontrolu zranitelností proveď online při přípravě a po návratu k registru.

## Záloha celé již používané cache

Její skutečné umístění zjistíš:

```bash
npm config get cache
```

Po dokončení instalací zkopíruj celý vypsaný adresář jako `npm-cache` a ověř z něj obnovu každého požadovaného projektu.

Výchozí cesta bývá ve Windows `%LOCALAPPDATA%\npm-cache`, na Linuxu a macOS `~/.npm`; rozhoduje však skutečná konfigurace.

Nekopíruj jen jednotlivé soubory z `_cacache` a před archivací cache nečisti.

## Globální nástroje

Nejdříve si ulož inventář `npm list --global --depth=0`; `npm root --global` ukazuje instalované balíčky, nikoli jejich instalační cache.

S internetem je na cíli obnovíš přes `npm install --global <balíček>@<verze>`.

Pro offline obnovu konkrétního nástroje naplň cache jeho instalací do **nové pomocné složky**, například pro TypeScript:

```bash
npm install --global --prefix ../zaloha-npm/priprava-tools typescript@5.9.3 --cache ../zaloha-npm/npm-cache --no-audit --no-fund
```

Tím připravíš balíček i potřebné závislosti bez změny běžné globální instalace. [Npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)

Na cíli ze složky `zaloha-npm/projekt`:

```bash
npm install --global typescript@5.9.3 --offline --cache ../npm-cache --no-audit --no-fund
tsc --version
```

Název a verzi nahraď inventářem a postup zopakuj pro další nástroje.

Pro zkoušku na původním počítači přidej k cílové instalaci `--prefix ../obnovene-tools` a spusť nový spouštěč z této složky; ve Windows například `../obnovene-tools/tsc.cmd --version`. [Umístění spouštěčů](https://docs.npmjs.com/cli/v11/configuring-npm/folders/)

Globální instalace nemá projektový lockfile pro celý strom závislostí, proto pro dlouhodobě opakovatelný výběr nástroje preferuj samostatný projekt s přesnou závislostí a lockfilem.

## Co samotná cache nepokrývá

| Potřeba | Jak ji zajistit |
|---|---|
| Jiný OS, CPU nebo Node.js ABI | Připrav a vyzkoušej samostatnou zálohu pro cílovou platformu |
| Binární data stahovaná instalačním skriptem | Zálohuj je podle dokumentace konkrétního balíčku |
| Git a lokální závislosti | Uchovej i zdrojové repozitáře či soubory a ověř čistou instalaci |
| Výstup build skriptů | Proveď skutečný build; `--ignore-scripts` může nechat instalaci nefunkční |

`npm pack` vytvoří archiv jednoho balíčku, ale běžně do něj nepřibalí všechny jeho závislosti, takže nenahrazuje zálohu projektu. [Npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/)

Při `ENOTCACHED` doplň zálohu online pro stejný lockfile a zkoušku opakuj od čisté instalace.

## Běžná správa

| Syntaxe | Účel |
|---|---|
| `npm install <balíček>[@<verze>]` | Přidání nebo změna závislosti |
| `npm install --save-dev <balíček>[@<verze>]` | Vývojová závislost |
| `npm uninstall <balíček>` | Odebrání závislosti |
| `npm outdated` | Přehled novějších verzí |
| `npm update` | Aktualizace v povolených rozsazích |
| `npm run [<skript>]` | Výpis nebo spuštění projektového skriptu |

Po záměrné aktualizaci uchovej nový manifest i lockfile a připrav novou zálohu.
