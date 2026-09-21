---
description: "Základní příkazy npm a jednoduchá záloha projektu i globálních nástrojů."
---

# npm

npm spravuje závislosti projektů Node.js i příkazové nástroje instalované pro celý uživatelský účet.

## Základní příkazy

Příkazy projektové záložky spusť ve složce s `package.json`.

Zápis `<balíček>` nahraď názvem balíčku a `[<balíček>]` můžeš vynechat pro práci se všemi přímými závislostmi.

Další značky popisuje [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [Projekt](#tab/npm-project)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat běhovou závislost | `npm install <balíček>[@<verze>]` | Zapíše balíček do `dependencies` a aktualizuje lockfile |
| Přidat vývojovou závislost | `npm install --save-dev <balíček>[@<verze>]` | Zapíše balíček do `devDependencies` |
| Odebrat přímou závislost | `npm uninstall <balíček>` | Odebere balíček z manifestu, lockfilu i instalace |
| Vypsat přímé závislosti | `npm list --depth=0` | Zobrazí jednu úroveň nainstalovaného stromu |
| Najít dostupné aktualizace | `npm outdated` | Porovná nainstalované, povolené a nejnovější verze |
| Aktualizovat v povoleném rozsahu | `npm update [<balíček>]` | Aktualizuje instalaci podle omezení v `package.json` |
| Čistě obnovit lockfile | `npm ci` | Nahradí `node_modules` přesným obsahem `package-lock.json` |

### [Globální nástroje](#tab/npm-global)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Nainstalovat nástroj | `npm install --global <balíček>[@<verze>]` | Zpřístupní příkazy balíčku globálně pro aktuální instalaci npm |
| Odinstalovat nástroj | `npm uninstall --global <balíček>` | Odebere globální instalaci |
| Vypsat globální balíčky | `npm list --global --depth=0` | Zobrazí přímo nainstalované globální balíčky |
| Najít dostupné aktualizace | `npm outdated --global` | Porovná globální instalace s registrem |
| Aktualizovat nástroje | `npm update --global [<balíček>]` | Aktualizuje jeden nebo všechny zastaralé globální balíčky |
| Zjistit kořen instalace | `npm root --global` | Vypíše adresář globálních balíčků |

***

Příkazy měnící projekt kontroluj spolu se změnami `package.json` a `package-lock.json` a po aktualizaci spusť testy.

Podrobnosti uvádí oficiální reference příkazů [`npm install`](https://docs.npmjs.com/cli/v11/commands/npm-install/), [`npm uninstall`](https://docs.npmjs.com/cli/v11/commands/npm-uninstall/), [`npm update`](https://docs.npmjs.com/cli/v11/commands/npm-update/) a [`npm outdated`](https://docs.npmjs.com/cli/v11/commands/npm-outdated/).

## Záloha projektu a obnova

**Záloha s internetem:** zkopíruj celou složku projektu na jiné místo, ale vynech `node_modules`.

V kopii musí zůstat zdroje, `package.json`, `package-lock.json` a potřebné projektové nastavení.

Pokud používáš workspace, zkopíruj všechny jeho části.

Pokud `package-lock.json` chybí, vytvoř jej před zálohou v původním projektu pomocí `npm install` a přidej do kopie.

**Obnova:** nainstaluj kompatibilní Node.js, otevři složku obnoveného projektu v PowerShellu nebo Bashi a s internetem spusť:

```bash
npm ci --include=dev
```

`npm ci` vytvoří `node_modules` podle lockfilu a při nesouladu s `package.json` skončí chybou. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) · [Package lock](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)

**Ověření:** vyzkoušej tento postup na kopii zálohy a spusť projektový build nebo testy.

### Když musí obnova fungovat bez internetu

Vytvoř složku `zaloha-npm/projekt` jako kopii projektu bez `node_modules`.

V této kopii s internetem spusť:

```bash
npm ci --include=dev --cache ../npm-cache --no-audit --no-fund
```

Zkopíruj celou složku `zaloha-npm` včetně vytvořené `npm-cache`, ale vynech `projekt/node_modules`.

Na cíli otevři `zaloha-npm/projekt` a spusť:

```bash
npm ci --offline --include=dev --cache ../npm-cache --no-audit --no-fund
```

Před použitím bez připojení vyzkoušej obnovu a build z **nové kopie** zálohy se stejným operačním systémem a architekturou.

Npm cache není spolehlivý dlouhodobý archiv. `--offline` zakáže npm síťové požadavky, ale instalační skripty mohou potřebovat další data mimo cache. [Npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache/) · [Konfigurace `offline`](https://docs.npmjs.com/cli/v11/using-npm/config/#offline)

### Globální nástroje

Globální nástroje nejsou součástí zálohy projektu.

Ve **Windows PowerShellu** otevři složku, do které ukládáš zálohu, a vytvoř soubor s jejich názvy a verzemi:

```powershell
$inventory = npm ls --global --depth=0 --json | Out-String
if ($LASTEXITCODE -ne 0) { throw 'Výpis globálních balíčků selhal.' }
$tools = ($inventory | ConvertFrom-Json).dependencies.PSObject.Properties |
  Where-Object { $_.Name -notin @('npm', 'corepack') -and $_.Value.version } |
  ForEach-Object { "$($_.Name)@$($_.Value.version)" }
$tools | Set-Content -Encoding utf8 npm-global.txt
```

Soubor `npm-global.txt` ulož spolu se zálohou projektu.

Po instalaci Node.js na cílovém počítači otevři složku s tímto souborem v PowerShellu a s internetem spusť:

```powershell
$tools = @(Get-Content npm-global.txt | Where-Object { $_.Trim() })
if ($tools.Count) { npm install --global $tools }
```

Zkontroluj výsledek pomocí `npm ls --global --depth=0` a spusť obnovené příkazy.

Postup vynechává `npm` a `corepack`, které se pořizují spolu s Node.js, a počítá s balíčky dostupnými v registru. [Npm ls](https://docs.npmjs.com/cli/v11/commands/npm-ls/) · [Npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)

Uložené verze platí pro přímé globální balíčky; jejich nepřímé závislosti nemají společný lockfile.

U místních, Git a soukromých balíčků ulož také jejich zdroje nebo přístup k registru.

Konfigurační soubory s tokeny uchovávej odděleně. [Npmrc](https://docs.npmjs.com/cli/v11/configuring-npm/npmrc/)
