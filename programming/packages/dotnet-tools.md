---
description: "Záloha manifestu a NuGet archivů pro obnovu nástrojů .NET bez serveru."
---

# .NET tools – offline záloha nástrojů

.NET tool je spustitelný nástroj distribuovaný jako NuGet balíček, například generátor dokumentace DocFX.

Lokální nástroje vybírá projektový manifest `.config/dotnet-tools.json`, globální instalace patří uživatelskému účtu.

## Co zálohovat

| Část | Úloha |
|---|---|
| Manifest nástrojů | Názvy balíčků, přesné verze a dostupné příkazy |
| Místní zdroj `.nupkg` | Skutečné archivy nástrojů a potřebných závislostí |
| .NET SDK a runtime | Prostředí potřebné pro instalaci a spuštění daných verzí |
| Projektová konfigurace | Vstupy, které nástroj používá, například `docfx.json` |

Kopie samotných spouštěčů z `%USERPROFILE%\.dotnet\tools` nepředstavuje přenositelnou instalaci na jiný počítač.

## 1. Připrav manifest s internetem

Pokud projekt již manifest má, zachovej ho a přeskoč jeho vytváření.

V nové zkušební složce bez manifestu s .NET SDK 10 například:

```powershell
dotnet new tool-manifest
dotnet tool install docfx --version 2.78.5
dotnet tool list
```

Příklad připíná konkrétní ověřenou verzi DocFX, nikoli doporučení automaticky měnit verzi v jiném projektu.

Pro jiný nástroj má instalační syntaxe podobu `dotnet tool install <balíček> --version <verze>`.

### Naplň samostatnou složku balíčků

Ve stejném projektu v PowerShellu:

```powershell
$env:NUGET_PACKAGES = [IO.Path]::GetFullPath("../zaloha-tools/packages")
dotnet tool restore
dotnet tool run docfx -- --version
```

Proměnná určí samostatnou globální složku pro tuto relaci a restore z ní připraví nástroje z manifestu.

Spusť i běžnou operaci nástroje s internetem, pokud může při prvním použití doplňovat vlastní data.

## 2. Vytvoř přenositelný feed

Po úspěšném restore:

```powershell
$toolFeed = [IO.Path]::GetFullPath("../zaloha-tools/feed")
New-Item -ItemType Directory -Path $toolFeed -Force | Out-Null
Get-ChildItem -LiteralPath $env:NUGET_PACKAGES -Recurse -Filter *.nupkg -File |
    Copy-Item -Destination $toolFeed
```

Skript zkopíruje balíčkové archivy do jednoho adresáře; nestačí zálohovat pouze rozbalené DLL nebo globální spouštěč.

K feedu přenes projekt včetně `.config/dotnet-tools.json` a záznam verze `dotnet --info`.

Použij strukturu `zaloha-tools/projekt` vedle `zaloha-tools/feed`.

## 3. Obnov na cílovém počítači

Nainstaluj odpovídající SDK a runtime a v obnoveném projektu vytvoř `NuGet.Offline.Config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <!-- Cesta je relativní k tomuto konfiguračnímu souboru. -->
    <add key="offline-tools" value="../feed" />
  </packageSources>
</configuration>
```

V kořeni projektu:

```powershell
dotnet tool restore --configfile NuGet.Offline.Config
dotnet tool list
dotnet tool run docfx -- --version
```

Konfigurace obsahuje pouze místní zdroj, takže chybějící balíček nemá odkud stáhnout.

Při ověřování použij čistou cílovou cache, aby již nainstalovaný nástroj nezamaskoval neúplný feed.

## Globální nástroj nebo vlastní složka

Seznam globálně používaných balíčků a verzí vypíše `dotnet tool list --global`.

Pro obnovu stejného nástroje z již připraveného feedu lze místo manifestu použít:

```text
dotnet tool install --global <balíček> --version <verze> --configfile NuGet.Offline.Config
dotnet tool install <balíček> --version <verze> --tool-path <cílová-složka> --configfile NuGet.Offline.Config
```

Jde o dvě alternativy: první instaluje pro účet a druhá do zvolené nové složky, ze které nástroj spouštíš vlastní cestou.

Přesná verze a platforma musí mít odpovídající balíčky ve feedu; odlišná architektura může potřebovat jiný platformní balíček téhož nástroje.

## Ověření a problémy

| Výsledek | Co ověřit |
|---|---|
| Balíček není nalezen | Feed, přesnou verzi a všechny stažené archivy |
| Instalace projde, spuštění vyžaduje runtime | `dotnet --list-runtimes` a požadavky nástroje |
| Příkaz není nalezen | Lokální `dotnet tool run <příkaz>`, případně cestu globálního spouštěče |
| Nástroj sám chce internet | Jeho konfiguraci, rozšíření, šablony a další data mimo NuGet |

Zdroje: [dotnet tool restore](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-restore), [tool install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install), [lokální nástroje](https://learn.microsoft.com/en-us/dotnet/core/tools/local-tools-how-to-use).
