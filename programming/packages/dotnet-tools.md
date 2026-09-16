---
description: "Jednoduchá záloha a obnova .NET nástrojů podle toho, zda jsou globální, nebo patří k projektu."
---

# .NET tools – záloha a obnova

.NET tools jsou příkazové nástroje, například DocFX.

**Nejdříve vyber, jak je máš nainstalované:**

| Typ instalace | Jak ji poznáš | Co zálohovat |
|---|---|---|
| Globální, pro celý účet | Nástroj je ve výpisu `dotnet tool list --global` | Celou složku `tools` |
| Lokální, pro jeden projekt | Projekt má `.config/dotnet-tools.json` | Projekt a balíčky NuGet |
| Vlastní složka `--tool-path` | Při instalaci jsi zadal vlastní cestu | Celou tuto složku |

Příklady jsou pro PowerShell ve Windows.

Na druhém počítači připrav stejný OS, architekturu a odpovídající .NET SDK či runtime.

## Vyber typ instalace

<a id="globální-nástroje-zkopíruj-celou-složku"></a>
<a id="1-záloha-na-původním-počítači"></a>
<a id="2-obnova-bez-internetu"></a>
<a id="3-ověření"></a>
<a id="lokální-nástroje-přenes-projekt-a-balíčky"></a>
<a id="1-záloha-s-internetem"></a>
<a id="2-obnova-bez-internetu-1"></a>

## [Globální nebo vlastní složka](#tab/tools-global)

**Zkopíruj celou složku nástrojů.**

**1. Záloha na původním počítači**

Ulož si výpis `dotnet tool list --global` a verzi prostředí z `dotnet --info`.

Zavři běžící nástroje a v Průzkumníku zkopíruj tuto **celou složku včetně skryté `.store`** na záložní disk:

```text
%USERPROFILE%\.dotnet\tools
```

V `.store` jsou vlastní soubory nástrojů.

Samotné spouštěče `.exe` nestačí. [Umístění instalace](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install#installation-locations)

Pro vlastní `--tool-path` kopíruj celý zadaný adresář.

Na Linuxu a macOS je běžná globální cesta `~/.dotnet/tools`.

Pokud používáš vlastní `DOTNET_CLI_HOME`, vycházej ze skutečného umístění instalace.

**2. Obnova bez internetu**

Na cílovém počítači nainstaluj připravené .NET SDK či runtime a vrať uloženou složku `tools` do jeho `%USERPROFILE%\.dotnet`.

Pokud tam už jiné nástroje máš, původní složku nejprve odlož stranou.

Dvě instalace neslévej naslepo.

Nástroje se z této kopie spouštějí přímo, bez nového stahování balíčků.

**3. Ověření**

Pro ukázkový DocFX spusť:

```powershell
dotnet tool list --global
& "$env:USERPROFILE/.dotnet/tools/docfx.exe" --version
```

Porovnej seznam a verze se zálohou a vyzkoušej běžnou práci nástroje bez připojení.

Pro spouštění samotným `docfx` musí být složka `tools` v `PATH`.

Příkaz s úplnou cestou výše to nevyžaduje.

## [Lokální v projektu](#tab/tools-local)

**Přenes projekt a balíčky.**

Lokální nástroje obnovuje soubor `.config/dotnet-tools.json`.

Nepřenášej je kopií globální složky `tools`.

**1. Záloha s internetem**

V projektu nejprve obnov nástroje a zjisti složku stažených balíčků:

```powershell
dotnet tool restore
dotnet nuget locals global-packages --list
```

Zkopíruj **celý projekt včetně skryté `.config`** a celý vypsaný adresář balíčků do této zálohy:

```text
zaloha-tools/
  projekt/       projekt včetně .config/dotnet-tools.json
  balicky/       kopie složky NuGet včetně .nupkg a metadat
```

Pro více projektů obnov každý z nich a potom pořizuj společnou kopii balíčků.

**2. Obnova bez internetu**

Na cíli pracuj s rozbalenou kopií zálohy a v `projekt` vytvoř soubor `NuGet.Offline.Config`:

```xml
<configuration>
  <packageSources>
    <clear />
    <add key="offline" value="../balicky" />
  </packageSources>
</configuration>
```

Tím určíš, že se mají balíčky hledat jen v přenesené složce.

Ve stejném projektu spusť:

```powershell
dotnet tool restore --configfile NuGet.Offline.Config
dotnet tool list
dotnet tool run docfx -- --version
```

V posledním řádku nahraď DocFX vlastním nástrojem z manifestu a ověř jeho běžnou práci. [Obnova lokálních nástrojů](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-restore)

Úplnost zálohy zkoušej na novém účtu nebo počítači bez původní instalace.

Obnovení na stejném účtu může využít jeho staré balíčky.

***

## Když máš při obnově internet

Lokálním nástrojům stačí projekt s manifestem a `dotnet tool restore`.

Globální nástroje nainstaluj podle uloženého seznamu, například:

```powershell
dotnet tool install --global docfx --version 2.78.5
```

`docfx` a `2.78.5` jsou ukázkové hodnoty.

Dosaď názvy a verze ze své zálohy.

Složka nástrojů neobsahuje .NET runtime ani všechna vlastní data, pluginy či šablony nástroje.

Ty zálohuj také, pokud je používáš.
