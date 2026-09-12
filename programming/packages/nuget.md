---
description: "Správa knihoven .NET a obnova z globální složky nebo místního NuGet zdroje."
---

# NuGet – knihovny .NET a offline obnova

NuGet vyhledá knihovny deklarované projektem, vyřeší jejich odvozené závislosti a připraví je pro sestavení.

U moderního `PackageReference` jsou deklarace v `.csproj`, případně společné verze v `Directory.Packages.props`, zatímco stažený obsah žije v globální složce balíčků.

## Běžná správa

Příkazy spouštěj ve složce s jedním projektem a s jeho požadovaným .NET SDK.

| Syntaxe | Co provede |
|---|---|
| `dotnet add package <balíček> [--version <verze>]` | Přidá nebo změní přímou závislost a provede restore |
| `dotnet remove package <balíček>` | Odebere přímý odkaz; používající kód musíš opravit |
| `dotnet restore [<projekt-nebo-řešení>]` | Obnoví deklarované balíčky |
| `dotnet list package --include-transitive` | Vypíše i odvozené závislosti |
| `dotnet list package --outdated` | Porovná verze s dostupným zdrojem |
| `dotnet list package --vulnerable --include-transitive` | Zkontroluje známé zranitelnosti podle dostupných metadat |

V .NET 10 lze použít i pořadí `dotnet package add` nebo `dotnet package list`; zde uvedený zápis funguje také ve starších podporovaných SDK.

Například `dotnet add package Dapper` připojí knihovnu pro provádění vlastních SQL dotazů; před přijetím změny zkontroluj verzi v projektu a spusť testy.

## Připrav uzamčený stav

U aplikace s `PackageReference` vytvoř a verzuj lockfile:

```powershell
dotnet restore --use-lock-file
dotnet restore --locked-mode
dotnet --info
dotnet nuget locals global-packages --list
```

První příkaz zapíše vyřešené verze do `packages.lock.json` a druhý odmítne změnu vyžadující jeho přepočítání.

Uchovej projekty, lockfile, `global.json` a soubory `Directory.*.props/targets`, které projekt používá; samotný lockfile neobsahuje knihovny.

Restore připrav pro stejné cílové frameworky a runtime identifikátory, které budeš používat na cíli; například self-contained publikování může potřebovat další runtime balíčky.

## Záloha složky balíčků

Skutečné umístění určuje poslední příkaz výše, nikoli odhad podle uživatelského jména.

| Výchozí systém | Globální složka |
|---|---|
| Windows | `%USERPROFILE%\.nuget\packages` |
| Linux a macOS | `~/.nuget/packages` |

Umístění může změnit `NUGET_PACKAGES` nebo konfigurace projektu.

Po úspěšném restore zastav další instalace a zkopíruj **celou složku** včetně skrytých souborů, `.nupkg`, hashů a `.nupkg.metadata`.

Na kompatibilním cíli ji můžeš obnovit do jeho zjištěného globálního umístění; stejné absolutní uživatelské jméno není podmínkou.

Při přenosu do vlastní složky, například `D:\offline\nuget-global`, v PowerShellu nastav:

```powershell
$env:NUGET_PACKAGES = "D:\offline\nuget-global"
dotnet nuget locals global-packages --list
```

Proměnná platí pro toto okno a jeho potomky; druhý příkaz ověří, že restore bude používat skutečně obnovený adresář.

### Obnova bez online zdrojů

V kořeni projektu vytvoř samostatný `NuGet.Offline.Config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <!-- Použij pouze úplně obnovenou globální složku, žádný server. -->
    <clear />
  </packageSources>
</configuration>
```

Potom:

```powershell
dotnet restore --locked-mode --configfile NuGet.Offline.Config -p:NuGetAudit=false
dotnet build --no-restore
```

`--configfile` vybere tuto konkrétní konfiguraci a `NuGetAudit=false` při offline obnově vypne dotazy na auditní metadata; online audit proveď před archivací a zopakuj při návratu k síti.

Pokud balíček v globální složce chybí, obnova musí selhat; `--ignore-failed-sources` není důkaz úplnosti zálohy.

## Přenositelný místní zdroj z balíčků.nupkg

Tato varianta obnoví projekt i do prázdné globální složky a umožní uchovávat archiv nezávisle na její vnitřní struktuře.

V PowerShellu s hotovou zálohou globální složky:

```powershell
$packageBackup = "D:\offline\nuget-global"
$localFeed = "D:\offline\nuget-feed"
New-Item -ItemType Directory -Path $localFeed -Force | Out-Null
Get-ChildItem -LiteralPath $packageBackup -Recurse -Filter *.nupkg -File |
    Copy-Item -Destination $localFeed
```

Nahraď obě cesty; skript zkopíruje původní balíčkové archivy do jednoho adresáře a globální zálohu nemění.

Do `packageSources` za `<clear />` přidej:

```xml
<add key="offline" value="D:\offline\nuget-feed" />
```

Jde o jeden řádek dovnitř předchozí konfigurace, nikoli druhý samostatný XML dokument.

Pro ověření nového prázdného cílového adresáře:

```powershell
dotnet restore --locked-mode --configfile NuGet.Offline.Config --packages .offline-test-packages -p:NuGetAudit=false
dotnet build --no-restore
```

`.offline-test-packages` musí být před první zkouškou nová složka a nepatří do Git historie.

## Omezení a řešení problémů

| Problém | Co doplnit nebo ověřit |
|---|---|
| Balíček nebyl nalezen | Správná verze a všechny odvozené balíčky v záloze |
| SDK nebo targeting pack chybí | Nainstalovaný odpovídající .NET SDK, případně workload; NuGet cache SDK nenahrazuje |
| Restore funguje, build chce síť | Build targety, generátory a vlastní stahovací skripty projektu |
| Projekt používá `packages.config` | Starší restore model typicky přes NuGet CLI či MSBuild a projektovou složku `packages` |
| Po přenosu je položka neúplná | Zálohuj až po dokončeném restore a nekopíruj jen rozbalené DLL |

Pro `packages.config` použij odpovídající nástroj projektu, například syntaxi `nuget restore <řešení.sln> -Source <místní-feed> -PackagesDirectory <složka-balíčků>`; nástroj `nuget.exe` a potřebný MSBuild uchovej také.

Zdroje: [NuGet cache](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders), [lockfile](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#locking-dependencies), [dotnet restore](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore), [NuGet restore](https://learn.microsoft.com/en-us/nuget/reference/cli-reference/cli-ref-restore).
