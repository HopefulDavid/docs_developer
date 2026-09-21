---
description: "Základní příkazy npm pro správu projektových a globálních balíčků."
---

# npm

npm spravuje závislosti projektů Node.js i příkazové nástroje instalované pro celý uživatelský účet.

Pro přenos balíčků použij [zálohu a obnovu bez internetu](backup-and-restore.md#npm).

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
