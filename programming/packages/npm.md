---
description: "Základní příkazy npm a záloha nainstalovaných lokálních i globálních balíčků."
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

## Záloha a obnova nainstalovaných balíčků

Ano, nainstalované lokální balíčky lze zálohovat zkopírováním složky `node_modules`.

Pro obnovu celého projektu je jednodušší zkopírovat **celou složku projektu včetně `node_modules`**.

U globálních nástrojů se ve Windows kopíruje **celá složka globálního `prefix`**, protože vedle balíčků obsahuje i soubory, kterými se spouštějí jejich příkazy. [Složky npm](https://docs.npmjs.com/cli/v11/configuring-npm/folders/)

Tento postup přenáší už nainstalovaný stav bez stahování z internetu.

Na cílovém počítači nejdříve nainstaluj stejnou verzi Node.js a použij stejný operační systém a architekturu.

### Lokální balíčky v projektu

1. Zálohuj celou složku projektu včetně `node_modules`, zdrojových souborů, `package.json` a případného `package-lock.json`.
2. Při obnově zkopíruj celou složku zpět. Žádný příkaz npm k tomu nepotřebuješ.
3. V obnoveném projektu spusť obvyklý příkaz aplikace nebo její testy a ověř, že skutečně funguje.

Pokud máš zdrojový projekt bezpečně uložený jinde, můžeš samostatně zálohovat jen jeho `node_modules` a vrátit ji ke stejné verzi projektu.

Kopíruj ji celou včetně skryté složky `node_modules/.bin`, kde jsou příkazy lokálních nástrojů. [Složky npm](https://docs.npmjs.com/cli/v11/configuring-npm/folders/)

Při obnově z kopie **nespouštěj `npm ci`**: tento příkaz existující `node_modules` smaže a nainstaluje znovu. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

### Globální nástroje ve Windows

Na původním počítači zjisti adresář globální instalace:

```powershell
npm prefix --global
```

Ve výchozí instalaci Windows jde obvykle o `%AppData%\npm`.

**Zálohuj celý vypsaný adresář**, nejen jeho podsložku `node_modules`.

Obsahuje balíčky i spouštěcí soubory `.cmd` a `.ps1`. [Složky npm](https://docs.npmjs.com/cli/v11/configuring-npm/folders/)

Na cíli nejprve nainstaluj stejnou verzi Node.js, znovu spusť `npm prefix --global` a obsah zálohy zkopíruj do vypsaného adresáře.

Obnovuj do prázdného uživatelského adresáře `prefix`, aby kopie nepřepsala jiné globální nástroje.

Pokud `npm prefix --global` ukazuje přímo do instalační složky Node.js nebo do sdílené systémové složky, nepřepisuj ji kopií a obnov nástroje instalací přes npm.

Zkontroluj výpis balíčků a spusť alespoň jeden obnovený příkaz:

```powershell
npm ls --global --depth=0
```

Máš-li například globálně TypeScript, ověř jej příkazem `tsc --version`.

Pokud příkaz nástroje není nalezen, ověř, že je adresář z `npm prefix --global` v proměnné `PATH`. [Složky npm](https://docs.npmjs.com/cli/v11/configuring-npm/folders/)

### Kdy samotná kopie nestačí

Balíčky s nativním kódem nebo instalačními skripty nemusí po změně systému, architektury či verze Node.js fungovat.

Také pracovní prostory a propojené místní balíčky mohou obsahovat odkazy na další složky, které musíš zkopírovat spolu s nimi. [Npm rebuild](https://docs.npmjs.com/cli/v11/commands/npm-rebuild/) · [Workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)

Při přesunu globálního `prefix` do jiné cesty mohou některé nástroje vyžadovat novou instalaci kvůli cestám uloženým při instalaci.

Uživatelské nastavení npm a přihlašovací údaje k soukromým službám jsou samostatná data. [Npmrc](https://docs.npmjs.com/cli/v11/configuring-npm/npmrc/)

Zálohu proto ověř spuštěním důležitých příkazů z obnovené kopie.

Pokud potřebuješ přenos mezi různými systémy nebo verzemi Node.js, ponech v záloze zdroje a lockfile a v cílovém prostředí proveď novou instalaci pomocí `npm ci` s dostupným registrem. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
