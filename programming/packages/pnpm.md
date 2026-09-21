---
description: "Instalace pnpm, oprava PATH na Windows a příkazy pro balíčky."
---

# pnpm

pnpm spravuje balíčky Node.js pomocí sdíleného úložiště a projektových odkazů v `node_modules`.

Pro přenos balíčků použij [zálohu a obnovu bez internetu](backup-and-restore.md#pnpm).

## Instalace a umístění pnpm

Příkaz `npx get-pnpm` spustí instalátor přes npm a nainstaluje samostatný pnpm. [Oficiální postup instalace](https://pnpm.io/installation#using-npm)

Na Windows najdeš nainstalovaný příkaz ve složce určené uživatelskou proměnnou `PNPM_HOME`.

Po instalaci otevři nový PowerShell a ověř umístění i verzi:

```powershell
$pnpmHome = [Environment]::GetEnvironmentVariable('PNPM_HOME', 'User')
$pnpmHome
Get-Command pnpm -All -ErrorAction SilentlyContinue |
    Select-Object Source
& (Join-Path $pnpmHome 'bin/pnpm.cmd') --version
```

Pokud `Get-Command` vypíše výsledek, jeho první položka ukazuje příkaz spuštěný při zadání `pnpm`.

Pokud ukazuje jinam než do `PNPM_HOME/bin`, máš v `PATH` také jinou instalaci pnpm.

### Příkaz pnpm není v PATH na Windows

Pokud přímé spuštění `pnpm.cmd` vypíše verzi, ale `Get-Command pnpm` nic nenajde, pnpm je nainstalovaný a v uživatelském `PATH` chybí složka `PNPM_HOME/bin`.

Ponech hodnotu `PNPM_HOME` nastavenou instalátorem a přidej do `PATH` její podsložku `bin`, ve které leží `pnpm.cmd`.

Tento postup nejprve zkontroluje soubor a potom přidá chybějící složku do uživatelského `PATH`:

```powershell
$pnpmHome = [Environment]::GetEnvironmentVariable('PNPM_HOME', 'User')
if (-not $pnpmHome) { throw 'Chybí PNPM_HOME. Zkontroluj instalaci.' }

$pnpmBin = Join-Path $pnpmHome 'bin'
$pnpmCommand = Join-Path $pnpmBin 'pnpm.cmd'
if (-not (Test-Path -LiteralPath $pnpmCommand -PathType Leaf)) {
    throw "Chybí $pnpmCommand. Zkontroluj instalaci."
}

$userPath = [string][Environment]::GetEnvironmentVariable('Path', 'User')
if (($userPath -split ';') -notcontains $pnpmBin) {
    $prefix = $userPath.TrimEnd(';')
    $newPath = if ($prefix) { "$prefix;$pnpmBin" } else { $pnpmBin }
    [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
}
```

Změna uživatelského `PATH` platí pro nově otevřené terminály.

Pro tento PowerShell přidej cestu také do aktuální relace a ověř nalezený příkaz i verzi:

```powershell
if (($env:Path -split ';') -notcontains $pnpmBin) {
    $env:Path += ";$pnpmBin"
}

Get-Command pnpm -All | Select-Object Source
pnpm --version
```

Ve výpisu `Get-Command` ověř, že první položka odpovídá očekávané instalaci, a verzi projektu porovnej s polem `packageManager` v `package.json`.

Pomocný balíček `get-pnpm` může zůstat v cache npm pro `npx`, zatímco nainstalovaný pnpm leží v `PNPM_HOME`.

Příkaz `pnpm list --global` vypisuje balíčky nainstalované pomocí pnpm, nikoli umístění samotného pnpm.

## Základní příkazy

Příkazy projektové záložky spusť ve složce s `package.json`.

Zápis `<balíček>` nahraď názvem balíčku a `[<balíček>]` můžeš vynechat pro práci se všemi přímými závislostmi.

Další značky popisuje [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [Projekt](#tab/pnpm-project)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat běhovou závislost | `pnpm add <balíček>[@<verze>]` | Zapíše balíček do `dependencies` a aktualizuje lockfile |
| Přidat vývojovou závislost | `pnpm add --save-dev <balíček>[@<verze>]` | Zapíše balíček do `devDependencies` |
| Odebrat přímou závislost | `pnpm remove <balíček>` | Odebere balíček z manifestu, lockfilu i instalace |
| Vypsat přímé závislosti | `pnpm list --depth=0` | Zobrazí přímé nainstalované balíčky |
| Najít dostupné aktualizace | `pnpm outdated` | Porovná používané verze s registrem |
| Aktualizovat v povoleném rozsahu | `pnpm update [<balíček>]` | Aktualizuje jeden nebo všechny balíčky podle rozsahů |
| Obnovit přesný lockfile | `pnpm install --frozen-lockfile` | Nainstaluje závislosti bez změny `pnpm-lock.yaml` |

### [Globální nástroje](#tab/pnpm-global)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Nainstalovat nástroj | `pnpm add --global <balíček>[@<verze>]` | Přidá globální balíček a jeho příkazy |
| Odinstalovat nástroj | `pnpm remove --global <balíček>` | Odebere globální instalaci |
| Vypsat globální balíčky | `pnpm list --global --depth=0` | Zobrazí přímo nainstalované globální balíčky |
| Najít dostupné aktualizace | `pnpm outdated --global` | Porovná globální instalace s registrem |
| Aktualizovat nástroje | `pnpm update --global [<balíček>]` | Aktualizuje jeden nebo všechny globální balíčky |
| Zjistit globální adresář | `pnpm root --global` | Vypíše kořen globální instalace |

***

V kořeni workspace použij `--filter <výběr>` pro cílený projekt nebo `--recursive` pro všechny projekty, pokud daný příkaz tyto volby podporuje.

Před potvrzením aktualizace zkontroluj změny `package.json` a `pnpm-lock.yaml` a spusť testy.

Podrobnosti uvádí oficiální reference příkazů [`pnpm add`](https://pnpm.io/cli/add), [`pnpm remove`](https://pnpm.io/cli/remove), [`pnpm list`](https://pnpm.io/cli/list), [`pnpm update`](https://pnpm.io/cli/update) a [`pnpm outdated`](https://pnpm.io/cli/outdated).
