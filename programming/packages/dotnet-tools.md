---
description: "Záloha lokálních i globálních nástrojů .NET a jejich opětovná instalace z místních balíčků."
---

# .NET tools – záloha a obnova nástrojů

.NET tool je spustitelný nástroj distribuovaný jako NuGet balíček, například DocFX.

Projektové nástroje obnovuje manifest `.config/dotnet-tools.json`; globálně instalované nástroje obnovíš podle uložených názvů a verzí.

## Vyber podle instalace

| Co používáš | Záznam verzí | Obnova s internetem |
|---|---|---|
| Lokální nástroje projektu | `.config/dotnet-tools.json` | `dotnet tool restore` |
| Globální nástroje účtu | Výpis `dotnet tool list --global` | `dotnet tool install --global <balíček> --version <verze>` |
| Nástroje ve vlastní složce | `dotnet tool list --tool-path <složka>` | Instalace se stejnou verzí a `--tool-path <složka>` |

Zálohuj také konfiguraci nástroje a odpovídající .NET SDK či runtime; samotný manifest balíčky neobsahuje.

Příklady níže jsou pro **PowerShell a .NET SDK 10**; DocFX `2.78.5` je konkrétní ukázka, nikoli požadavek aktualizovat tvé nástroje.

## 1. Připrav manifest pro offline zálohu

Pokud už projekt manifest má, použij jeho kopii v pracovní složce.

Pro nástroje instalované globálně si nejprve ulož `dotnet tool list --global` a v **nové prázdné složce** vytvoř zálohovací manifest:

```powershell
dotnet new tool-manifest
dotnet tool install --local docfx --version 2.78.5
dotnet tool list
```

Instalaci zopakuj pro každý požadovaný balíček s přesnou verzí z inventáře; místní instalace nezmění jeho globální instalaci. [Lokální nástroje](https://learn.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use)

## 2. Stáhni všechny potřebné archivy

Ve složce s manifestem a s internetem, v novém PowerShellu:

```powershell
$env:NUGET_PACKAGES = [IO.Path]::GetFullPath("../zaloha-tools/balicky")
$env:DOTNET_CLI_HOME = [IO.Path]::GetFullPath("../zaloha-tools/priprava-cli")
dotnet tool restore --tool-manifest .config/dotnet-tools.json
dotnet tool run docfx -- --version
Get-ChildItem -LiteralPath $env:NUGET_PACKAGES -Recurse -Filter *.nupkg -File
```

Obě cílové složky musí být při první přípravě nové.

`NUGET_PACKAGES` určuje stažené balíčky a `DOTNET_CLI_HOME` oddělí také evidenci obnovených nástrojů; samotná změna první proměnné může nechat restore použít starou instalaci. [Umístění nástrojů](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install#installation-locations), [prostředí CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables#dotnet_cli_home)

Poslední příkaz musí vypsat skutečné archivy; úspěšná hláška restore s prázdnou zálohou nestačí.

U jiného nástroje nahraď `docfx -- --version` jeho vlastním příkazem a ověř také běžnou operaci.

## 3. Přenes zálohu

Po dokončení instalací přenes:

```text
zaloha-tools/
  projekt/       .config/dotnet-tools.json a vstupy nástrojů
  balicky/       celá stažená složka včetně .nupkg a metadat
  verze.txt      dotnet --info a inventář globálních nástrojů
```

Složku `priprava-cli` nepřenášej: obsahuje pracovní evidenci původního počítače.

`balicky` můžeš použít přímo jako hierarchický místní zdroj; převod archivů do další složky není nutný. [Lokální feed NuGet](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds)

## 4. Obnov lokální nástroje bez internetu

Do obnoveného `projekt/NuGet.Offline.Config` ulož:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="offline-tools" value="../balicky" />
  </packageSources>
</configuration>
```

V tomto projektu spusť:

```powershell
$env:NUGET_PACKAGES = [IO.Path]::GetFullPath("../obnovene-balicky")
$env:DOTNET_CLI_HOME = [IO.Path]::GetFullPath("../obnova-cli")
dotnet tool restore --tool-manifest .config/dotnet-tools.json --configfile NuGet.Offline.Config --no-cache
dotnet tool list
dotnet tool run docfx -- --version
```

Nové prázdné pracovní složky prokážou, že obnova opravdu používá zálohu; pro následné používání lokálních nástrojů zachovej tyto cesty a nastavení.

Pokud chceš nástroje obnovit do běžného profilu nového počítače, první dva řádky vynech a použij jeho výchozí umístění.

`--configfile` použije jen uvedenou konfiguraci; `--add-source` by pouze přidal zdroj k ostatním a offline režim by nezajistil. [Dotnet tool restore](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-restore)

## Obnova globálně nebo do vlastní složky

Ze stejné zálohy a s předchozím `NuGet.Offline.Config` zvol jednu alternativu:

```powershell
dotnet tool install --global docfx --version 2.78.5 --configfile NuGet.Offline.Config
```

Nebo do nové vlastní složky:

```powershell
dotnet tool install docfx --version 2.78.5 --tool-path ../moje-tools --configfile NuGet.Offline.Config
../moje-tools/docfx.exe --version
```

Globální variantu spouštěj v běžném novém terminálu bez dočasného `DOTNET_CLI_HOME`; názvy a verze nahraď uloženým inventářem.

`--tool-path` vytvoří spouštěč i potřebnou `.store` a nevyžaduje globální instalaci. [Dotnet tool install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install)

## Kopie již hotové složky

Pro obnovu stejného prostředí lze zálohovat celou složku globálních nástrojů nebo vlastní `--tool-path`, **včetně skryté `.store`**.

Výchozí globální složka je ve Windows `%USERPROFILE%/.dotnet/tools`, na Linuxu a macOS `$HOME/.dotnet/tools`; vlastní `DOTNET_CLI_HOME` může toto umístění změnit. [Umístění instalace](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install#installation-locations)

Samotné soubory `.exe` nebo shellové spouštěče nestačí.

Přenos celé složky ověř na stejném OS, architektuře a kompatibilním runtime; nástroj může mít vlastní data mimo tuto složku.

Pro obnovu na jiném počítači je opětovná instalace z připravených balíčků výše lépe kontrolovatelná.

## Ověření výsledku

Porovnej `dotnet tool list` nebo `dotnet tool list --global` s původním inventářem a spusť každý důležitý nástroj.

Při chybě runtime zkontroluj `dotnet --list-runtimes`; pokud nástroj po instalaci stahuje šablony, pluginy či další data, připrav je samostatně a vyzkoušej jeho běžnou práci bez sítě.
