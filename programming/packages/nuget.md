---
description: "Záloha knihoven .NET do složky a obnova projektu z místního zdroje nebo původní cache."
---

# NuGet – záloha a obnova knihoven .NET

NuGet obnovuje knihovny uvedené v projektu včetně jejich nepřímých závislostí.

Pro běžnou obnovu s internetem uchovej zdroje a uzamčené verze; pro offline obnovu přidej složku se skutečnými balíčky.

## Před použitím

Návod je pro **PowerShell a projekty s PackageReference**, například běžnou aplikaci v .NET 8 nebo 10.

Pracuj v kořeni řešení s odpovídajícím SDK a na stejné cílové platformě; pokud je ve složce více řešení, uváděj za `restore` konkrétní soubor.

Balíčky neobsahují samotné SDK, workloady ani všechny nástroje potřebné pro build.

## Obnova s internetem

Zálohuj celý zdrojový projekt včetně `.csproj`, `global.json`, `NuGet.Config`, používaných `Directory.*.props/targets` a `packages.lock.json`.

Pokud lockfile dosud nemáš, vytvoř jej jednou přes `dotnet restore --use-lock-file`, prohlédni vybrané verze a uchovej jej s projektem.

Na cíli se stejným SDK:

```powershell
dotnet restore --locked-mode
dotnet build --no-restore
```

`--locked-mode` odmítne obnovu, která by potřebovala změnit lockfile. [Uzamčení závislostí](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#locking-dependencies)

## Záloha složky balíčků

### 1. Připrav balíčky konkrétního projektu

V pracovní kopii projektu s internetem a hotovým lockfile:

```powershell
dotnet --info
dotnet restore --locked-mode --packages ../zaloha-nuget/balicky
dotnet build --no-restore
```

`--packages` uloží balíčky do samostatné složky vedle projektu; její obsah bude odpovídat tomuto restore. [Dotnet restore](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore)

Pro více řešení zopakuj restore každého z nich se stejnou cílovou složkou.

Pokud používáš různé frameworky, konfigurace nebo runtime identifikátory, připrav všechny potřebné varianty; pro publikování `win-x64` například také restore s `-r win-x64`.

### 2. Přenes zdroje a celou složku

Po dokončení všech instalací vytvoř tuto zálohu:

```text
zaloha-nuget/
  projekt/       zdrojový projekt, konfigurace a lockfily
  balicky/       celý adresář z --packages
  verze.txt      výstup dotnet --info a ověřený příkaz sestavení
```

`balicky` obsahují adresáře podle názvu a verze, původní archivy `.nupkg`, rozbalené soubory a metadata; nic z nich nevybírej ručně.

Takový adresář lze použít přímo jako hierarchický **místní zdroj NuGet**, pokud obsahuje původní `.nupkg`; není potřeba všechny archivy kopírovat do další ploché složky. [Místní zdroje NuGet](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds)

### 3. Obnov bez registru

Na cíli rozbal zálohu do pracovní složky a do `projekt/NuGet.Offline.Config` ulož:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="offline" value="../balicky" />
  </packageSources>
</configuration>
```

Cesta `../balicky` se počítá od konfiguračního souboru; `<clear />` ponechá jako zdroj jen tuto zálohu. [Konfigurace NuGet](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources)

V kořeni obnoveného projektu:

```powershell
dotnet restore --locked-mode --configfile NuGet.Offline.Config --packages ../obnovene-balicky --no-http-cache -p:NuGetAudit=false
dotnet build --no-restore
```

Pro první zkoušku musí být `obnovene-balicky` nová prázdná složka, aby obnovu nezachránila stará instalace.

Vstupní `balicky` zůstávají zdrojem archivů; NuGet rozbalí pracovní instalaci do `obnovene-balicky`.

Auditní metadata se při této offline operaci nestahují; kontrolu zranitelností proveď při přípravě online.

Pokud projekt používá vlastní source mapping nebo pravidla podpisů, přenes tato pravidla do offline konfigurace a přizpůsob mapování místnímu zdroji.

## Záloha všech již stažených balíčků

Pro zálohu více projektů můžeš místo přípravy samostatné složky převzít již naplněnou globální složku:

```powershell
dotnet nuget locals global-packages --list
```

Zkopíruj celý vypsaný adresář jako `zaloha-nuget/balicky` a obnovuj stejným postupem výše.

Výchozí cesta ve Windows je `%USERPROFILE%\.nuget\packages`, ale může ji změnit `NUGET_PACKAGES` nebo konfigurace projektu. [Složky NuGet](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders)

Před kopírováním dokonči restore všech projektů, které chceš obnovovat; globální cache obsahuje pouze balíčky, které do ní byly skutečně stažené.

### Použití kopie přímo jako globální složky

Pokud chceš šetřit místem a nepotřebuješ druhou pracovní kopii, nastav v novém PowerShellu:

```powershell
$env:NUGET_PACKAGES = [IO.Path]::GetFullPath("../balicky")
dotnet restore --locked-mode --configfile NuGet.Offline.Config --no-http-cache -p:NuGetAudit=false
dotnet build --no-restore
```

Tato varianta používá `balicky` současně jako pracovní instalaci, proto pracuj s kopií zálohy a zachovej i skryté soubory včetně `.nupkg.metadata`.

Proměnná platí pro toto okno a jeho potomky; jeho zavřením se vrátíš k původnímu nastavení.

## Ověření a běžná správa

Po obnově spusť také projektové testy a cílový build bez sítě; vlastní build target může stahovat data mimo NuGet.

| Příkaz | Účel |
|---|---|
| `dotnet add package Dapper` | Příklad přidání knihovny a aktualizace projektu |
| `dotnet remove package Dapper` | Odebrání přímého odkazu |
| `dotnet list package --include-transitive` | Výpis přímých i nepřímých závislostí |
| `dotnet list package --outdated` | Online porovnání verzí |
| `dotnet list package --vulnerable --include-transitive` | Online kontrola známých zranitelností |

V .NET 10 existuje také pořadí `dotnet package add` nebo `dotnet package list`; zachovej syntaxi podporovanou SDK projektu.

Při chybě chybějícího balíčku doplň jeho přesnou verzi do zálohy a zkoušku opakuj s prázdnou pracovní složkou.

`--ignore-failed-sources` nenahrazuje offline konfiguraci ani důkaz úplné zálohy.

Starší `packages.config` používá jiný restore model, například `nuget restore <řešení.sln> -Source <místní-složka> -PackagesDirectory <výstup>`; uchovej i potřebný `nuget.exe` a MSBuild. [NuGet restore](https://learn.microsoft.com/en-us/nuget/reference/cli-reference/cli-ref-restore)

Spustitelné nástroje jako DocFX mají samostatný postup [.NET tools](dotnet-tools.md).
