---
description: "Práce se SDK, lokálními a globálními nástroji a telemetrií."
---

# .NET CLI (Command Line Interface)

> Správa nástrojů .NET CLI a vypnutí i ověření telemetrie .NET SDK.

Pro práci s příkazy .NET CLI nainstaluj **.NET SDK**.

## Vypnutí telemetrie .NET SDK

Telemetrii .NET SDK vypneš proměnnou prostředí `DOTNET_CLI_TELEMETRY_OPTOUT` s hodnotou `1` nebo `true` nastavenou před spuštěním příkazu `dotnet`. [Dokumentace Microsoftu](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out)

Následující postup používá jednotně hodnotu `1`.

Nastavení se vztahuje na telemetrii SDK při příkazech jako `dotnet build`, `dotnet restore`, `dotnet run` nebo `dotnet test` a není nutné přidávat parametr ke každému spuštění.

Telemetrie Visual Studia, VS Code nebo aplikace spuštěné přes `dotnet run` má vlastní nastavení.

### Windows: trvalé vypnutí pro aktuální účet

V běžném PowerShellu nebo CMD spusť:

```text
setx DOTNET_CLI_TELEMETRY_OPTOUT 1
```

Příkaz uloží hodnotu pro přihlášeného uživatele a nevyžaduje spuštění jako správce.

Nastavení zůstane uložené i po restartu počítače, dokud jej nezměníš nebo neodstraníš.

`setx` mění uložené prostředí, ale neaktualizuje již běžící terminál ani editor. [Popis příkazu setx](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/setx#remarks)

Po uložení proto proveď obě kontroly níže.

### Windows: ověření uložené a aktuální hodnoty

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

### Windows: trvalé nastavení pro všechny uživatele

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

### Kam Windows nastavení ukládá

`setx` uloží hodnotu pojmenovanou `DOTNET_CLI_TELEMETRY_OPTOUT` do registru podle zvoleného rozsahu:

- **Aktuální účet** bez `/M`: `HKEY_CURRENT_USER\Environment`.
- **Celý počítač** s `/M`: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`.

Tyto cesty odpovídají rozsahům `User` a `Machine` v rozhraní [EnvironmentVariableTarget](https://learn.microsoft.com/en-us/dotnet/api/system.environmentvariabletarget).

### Linux a macOS: Bash a Zsh

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

### Co ověření potvrzuje

Hodnota `1` v prostředí spouštěného procesu potvrzuje použití dokumentovaného vypínače telemetrie SDK.

Také `true` je platné vypnutí.

Prázdná hodnota ani `0` telemetrii nevypínají. [Význam proměnné](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables#dotnet_cli_telemetry_optout)

Jde o kontrolu konfigurace, nikoli měření síťového provozu všech nástrojů a aplikací, které příkaz může spustit.

Zmizení úvodní zprávy o telemetrii není důkazem vypnutí, protože `DOTNET_NOLOGO` pouze skrývá úvodní text. [Rozdíl mezi zprávou a telemetrií](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#disclosure)

Chceš-li zabránit i telemetrickému záznamu instalátoru .NET SDK, nastav proměnnou ještě před jeho spuštěním.

Pozdější změna nevrátí již odeslaný záznam. [Telemetrie instalátoru](https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out)

## Správa nástrojů .NET

.NET tool je spustitelný nástroj distribuovaný přes NuGet.

Knihovny připojené do aplikace řeší [správa NuGet balíčků](nuget.md).

Globální nástroj patří uživateli, lokální manifest v `.config/dotnet-tools.json` sdílí výběr nástrojů s projektem.

### Lokální nástroj pro projekt

V novém testovacím projektu bez manifestu spusť:

```powershell
dotnet new tool-manifest
dotnet tool install docfx
dotnet tool list
dotnet tool run docfx -- --version
```

Manifest vytvoř jen jednou.

Instalace do něj zapíše vybranou verzi a poslední příkaz ověří spustitelnost nástroje.

Po klonování stejného projektu použij `dotnet tool restore`, který obnoví verze z manifestu. [Lokální nástroje](https://learn.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use)

### Příkazy a jejich rozsah

| Účel | Globální syntaxe | Lokální syntaxe |
|---|---|---|
| Seznam | `dotnet tool list -g` | `dotnet tool list` |
| Instalace | `dotnet tool install -g <balíček> [--version <verze>]` | `dotnet tool install <balíček> [--version <verze>]` |
| Aktualizace | `dotnet tool update -g <balíček> [--version <verze>]` | `dotnet tool update <balíček> [--version <verze>]` |
| Odinstalace | `dotnet tool uninstall -g <balíček>` | `dotnet tool uninstall <balíček>` |

`<balíček>` je identifikátor nástroje na NuGet, například `docfx`.

`<verze>` je přesná požadovaná verze a její uvedení umožní opakovat stejnou instalaci.

`dotnet tool list` nemá přepínač `--outdated`.

Seznam zastaralých **knihoven** je jiný příkaz. [Reference tool list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-list)

### Umístění a obnova

Výchozí spouštěče globálních nástrojů jsou v `%USERPROFILE%\.dotnet\tools` ve Windows a `~/.dotnet/tools` na Linuxu a macOS.

Samotný SDK hostitel `dotnet` může být jinde.

V PowerShellu zjistíš hostitele přes `Get-Command dotnet`, v CMD přes `where.exe dotnet` a v Bashi přes `command -v dotnet`.

Globální nástroje obnov z inventáře `dotnet tool list -g` opětovnou instalací stejných verzí.

Pouhá kopie složky není spolehlivá obnova pro jiný systém nebo runtime. [Správa .NET tools](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools)

Konkrétní postup podle typu instalace popisuje [záloha a obnova .NET tools](dotnet-tools.md).
