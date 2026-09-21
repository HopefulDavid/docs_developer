---
description: "Příkazy .NET tools a postup vypnutí telemetrie .NET SDK."
---

# .NET tools

.NET tools jsou příkazové nástroje, například DocFX.

Pro přenos nástrojů použij [zálohu a obnovu bez internetu](backup-and-restore.md#net-tools).

**Doporučení:** Před prvním použitím .NET SDK [vypni jeho telemetrii](#vypnutí-telemetrie-net-sdk).

## Základní příkazy

Zápis `<balíček>` znamená ID balíčku nástroje a `<příkaz>` název, kterým se nástroj spouští.

Tyto názvy nemusí být stejné.

Další značky popisuje [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [Globální](#tab/tools-commands-global)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Vyhledat nástroj | `dotnet tool search <hledaný-text>` | Vyhledá nástroje v NuGet zdrojích |
| Nainstalovat nástroj pro aktuální účet | `dotnet tool install --global <balíček> [--version <verze>]` | Zpřístupní jeho příkaz ze všech složek |
| Vypsat nainstalované nástroje | `dotnet tool list --global` | Zobrazí ID balíčků, verze a příkazy |
| Aktualizovat nástroj | `dotnet tool update --global <balíček> [--version <verze>]` | Nahradí nainstalovanou verzi |
| Odinstalovat nástroj | `dotnet tool uninstall --global <balíček>` | Odebere globální instalaci aktuálního účtu |
| Spustit nástroj | `<příkaz> [argumenty]` | Spustí příkaz zveřejněný balíčkem |

### [Lokální v projektu](#tab/tools-commands-local)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Vytvořit manifest | `dotnet new tool-manifest` | Vytvoří `.config/dotnet-tools.json` pro projekt |
| Přidat nástroj do manifestu | `dotnet tool install <balíček> [--version <verze>]` | Zapíše lokální nástroj a obnoví ho |
| Obnovit všechny nástroje | `dotnet tool restore` | Nainstaluje nástroje uvedené v manifestu |
| Vypsat lokální nástroje | `dotnet tool list --local` | Zobrazí nástroje dostupné z aktuální složky |
| Aktualizovat nástroj | `dotnet tool update <balíček> [--version <verze>]` | Změní verzi v nalezeném manifestu |
| Odebrat nástroj | `dotnet tool uninstall <balíček>` | Odebere záznam z nalezeného manifestu |
| Spustit nástroj | `dotnet tool run <příkaz> -- [argumenty]` | Spustí lokální příkaz a předá mu argumenty za `--` |

### [Vlastní složka](#tab/tools-commands-path)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Nainstalovat do zvolené složky | `dotnet tool install <balíček> --tool-path <složka> [--version <verze>]` | Umístí nástroj mimo výchozí globální cestu |
| Vypsat nástroje ve složce | `dotnet tool list --tool-path <složka>` | Zobrazí instalace v přesně zadané cestě |
| Aktualizovat nástroj | `dotnet tool update <balíček> --tool-path <složka> [--version <verze>]` | Nahradí verzi v této složce |
| Odinstalovat nástroj | `dotnet tool uninstall <balíček> --tool-path <složka>` | Odebere nástroj z této složky |
| Spustit nástroj | `<složka>/<příkaz> [argumenty]` | Spustí nástroj úplnou nebo relativní cestou |

***

.NET tools běží s oprávněními uživatele, proto před instalací ověř autora a původ balíčku.

Podporované rozsahy a syntaxi shrnuje oficiální návod [Jak spravovat .NET tools](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools).

### První lokální nástroj

V novém testovacím projektu s nainstalovaným .NET SDK spusť:

```powershell
dotnet new tool-manifest
dotnet tool install docfx
dotnet tool list --local
dotnet tool run docfx -- --version
```

Manifest vytvoř jen jednou.

Instalace do něj zapíše vybranou verzi a poslední příkaz ověří spustitelnost nástroje. [Lokální nástroje](https://learn.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use)

## Vypnutí telemetrie .NET SDK

Telemetrii .NET SDK vypneš proměnnou prostředí `DOTNET_CLI_TELEMETRY_OPTOUT` s hodnotou `1` nebo `true` nastavenou před spuštěním příkazu `dotnet`. [Dokumentace Microsoftu](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out)

Následující postup používá jednotně hodnotu `1`.

Nastavení se vztahuje na telemetrii SDK při příkazech jako `dotnet build`, `dotnet restore`, `dotnet run` nebo `dotnet test` a není nutné přidávat parametr ke každému spuštění.

Telemetrie Visual Studia, VS Code nebo aplikace spuštěné přes `dotnet run` má vlastní nastavení.

Vyber systém, ve kterém spouštíš .NET SDK.

### [Windows](#tab/telemetry-windows)

**Trvalé vypnutí pro aktuální účet**

V běžném PowerShellu nebo CMD spusť:

```text
setx DOTNET_CLI_TELEMETRY_OPTOUT 1
```

Příkaz uloží hodnotu pro přihlášeného uživatele a nevyžaduje spuštění jako správce.

Nastavení zůstane uložené i po restartu počítače, dokud jej nezměníš nebo neodstraníš.

`setx` mění uložené prostředí, ale neaktualizuje již běžící terminál ani editor. [Popis příkazu setx](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setx#remarks)

Po uložení proto proveď obě kontroly níže.

**Ověření uložené a aktuální hodnoty**

**1. Ověř trvalé uložení v PowerShellu:**

```text
[Environment]::GetEnvironmentVariable(
    "DOTNET_CLI_TELEMETRY_OPTOUT", "User"
)
```

Očekávaný výstup po uvedeném příkazu `setx` je:

```text
1
```

Tuto kontrolu můžeš provést ihned ve stejném okně, protože čte uloženou uživatelskou hodnotu z registru. [Environment.GetEnvironmentVariable](https://learn.microsoft.com/en-us/dotnet/api/system.environment.getenvironmentvariable)

Alternativou použitelnou v CMD i PowerShellu je:

```text
reg query HKCU\Environment /v DOTNET_CLI_TELEMETRY_OPTOUT
```

Ve výpisu najdi řádek s názvem `DOTNET_CLI_TELEMETRY_OPTOUT`, typem `REG_SZ` a hodnotou `1`.

**2. Ověř prostředí, ze kterého budeš spouštět `dotnet`:**

Úplně ukonči a znovu otevři terminál.

Při práci v integrovaném terminálu restartuj také celý editor nebo IDE.

Nový terminál spusť například z nabídky Start, protože proces spuštěný ze starého terminálu může zdědit jeho původní prostředí. [Dědění proměnných prostředí](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables#long-description)

V novém **PowerShellu** zadej:

```text
$env:DOTNET_CLI_TELEMETRY_OPTOUT
```

V novém **CMD** použij místo toho:

```text
echo %DOTNET_CLI_TELEMETRY_OPTOUT%
```

Očekávaný výstup je znovu `1` a z tohoto okna už můžeš běžně spouštět příkazy `dotnet`.

Pokud CMD vypíše doslova `%DOTNET_CLI_TELEMETRY_OPTOUT%`, proměnná v jeho prostředí není definovaná.

| Výsledek kontroly | Význam a další krok |
|---|---|
| Uložená i aktuální hodnota je `1` | Trvalé nastavení je uložené a aktuální terminál jej předá přímo spuštěnému procesu `dotnet`. |
| Uložená hodnota je `1`, aktuální je prázdná nebo `0` | Běžící proces nastavení nepřevzal nebo jej něco přepsalo. Restartuj celou hostitelskou aplikaci a zkontroluj její konfiguraci i profil shellu. |
| Uložená uživatelská hodnota je prázdná | Pro tento účet není uživatelská hodnota uložená. Zopakuj `setx` pod správným účtem, případně zkontroluj systémovou variantu níže. |

Pokud nové okno stále přebírá staré prostředí, odhlášení a nové přihlášení do Windows obnoví uživatelskou relaci.

Pro okamžité vypnutí také v již otevřeném okně nastav **navíc** jeho aktuální prostředí:

| Shell | Příkaz pouze pro aktuální proces a jeho potomky |
|---|---|
| PowerShell | `$env:DOTNET_CLI_TELEMETRY_OPTOUT = "1"` |
| CMD | `set "DOTNET_CLI_TELEMETRY_OPTOUT=1"` |

Tyto dva příkazy samy o sobě trvalé nastavení neukládají.

**Trvalé nastavení pro všechny uživatele**

Pokud má být hodnota uložená na úrovni počítače, otevři PowerShell nebo CMD **jako správce** a spusť:

```text
setx DOTNET_CLI_TELEMETRY_OPTOUT 1 /M
```

Uložení ověř v PowerShellu pro rozsah `Machine`:

```text
[Environment]::GetEnvironmentVariable(
    "DOTNET_CLI_TELEMETRY_OPTOUT", "Machine"
)
```

Očekávej `1` a následně zopakuj také kontrolu aktuální hodnoty v nově spuštěném terminálu.

Systémová hodnota nepřepisuje prostředí již běžících procesů a není vynucenou zásadou, která by zabránila uživateli nebo aplikaci nastavení změnit.

Při rozporu ověř také rozsah `User` a nastavení shellu či IDE, protože pro `dotnet` rozhoduje hodnota v prostředí jeho procesu.

**Kam Windows nastavení ukládá**

`setx` uloží hodnotu pojmenovanou `DOTNET_CLI_TELEMETRY_OPTOUT` do registru podle zvoleného rozsahu:

- **Aktuální účet** bez `/M`: `HKEY_CURRENT_USER\Environment`.
- **Celý počítač** s `/M`: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`.

Tyto cesty odpovídají rozsahům `User` a `Machine` v rozhraní [EnvironmentVariableTarget](https://learn.microsoft.com/en-us/dotnet/api/system.environmentvariabletarget).

### [Linux a macOS](#tab/telemetry-unix)

Postup je pro Bash a Zsh.

Pro aktuální shell nastav proměnnou před prvním příkazem `dotnet`:

```text
export DOTNET_CLI_TELEMETRY_OPTOUT=1
```

Pro trvalé použití v dalších terminálech přidej stejný řádek do inicializačního souboru používaného shellem:

- **Interaktivní Bash bez přihlašovacího režimu:** `~/.bashrc`.
- **Bash v přihlašovacím režimu:** první existující čitelný soubor z `~/.bash_profile`, `~/.bash_login` a `~/.profile`. Samotný `~/.bashrc` se načte jen tehdy, pokud jej přihlašovací soubor výslovně načítá. [Pravidla Bash](https://www.gnu.org/s/bash/manual/html_node/Bash-Startup-Files.html)
- **Interaktivní Zsh:** `~/.zshrc`, případně `$ZDOTDIR/.zshrc`, pokud používáš vlastní `ZDOTDIR`. [Pravidla Zsh](https://zsh.sourceforge.io/Doc/Release/Files.html)

Po otevření nového terminálu ověř zděděnou exportovanou hodnotu:

```text
printenv DOTNET_CLI_TELEMETRY_OPTOUT
```

Očekávaný výstup je `1`.

Profil terminálu nepokrývá automaticky služby, CI, kontejnery ani aplikace spouštěné z grafického prostředí, proto nastav a ověř proměnnou také přímo v prostředí, kde tyto procesy spouštějí `dotnet`.

***

### Co ověření potvrzuje

Hodnota `1` v prostředí spouštěného procesu potvrzuje použití dokumentovaného vypínače telemetrie SDK.

Také `true` je platné vypnutí.

Prázdná hodnota ani `0` telemetrii nevypínají. [Význam proměnné](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables#dotnet_cli_telemetry_optout)

Jde o kontrolu konfigurace, nikoli měření síťového provozu všech nástrojů a aplikací, které příkaz může spustit.

Zmizení úvodní zprávy o telemetrii není důkazem vypnutí, protože `DOTNET_NOLOGO` pouze skrývá úvodní text. [Rozdíl mezi zprávou a telemetrií](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#disclosure)

Chceš-li zabránit i telemetrickému záznamu instalátoru .NET SDK, nastav proměnnou ještě před jeho spuštěním.

Pozdější změna nevrátí již odeslaný záznam. [Telemetrie instalátoru](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out)
