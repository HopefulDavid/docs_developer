---
description: "Základní příkazy NuGet pro správu knihoven .NET a postup jejich zálohy a obnovy bez internetu."
---

# NuGet

NuGet spravuje knihovny a další balíčky používané projekty .NET.

## Základní příkazy

Příkazy spusť ve složce projektu s `PackageReference`.

Zápis `<balíček>` nahraď ID balíčku, například `Serilog`, a volitelnou `<verze>` konkrétním číslem.

Význam hranatých a lomených závorek vysvětluje [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [.NET 10 a novější](#tab/nuget-dotnet-10)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat balíček nebo změnit jeho verzi | `dotnet package add <balíček> [--version <verze>]` | Upraví projekt a provede obnovu závislostí |
| Odebrat přímou závislost | `dotnet package remove <balíček>` | Odebere odkaz z projektu |
| Vypsat přímé balíčky | `dotnet package list` | Zobrazí balíčky uvedené projektem a jejich verze |
| Zahrnout i nepřímé závislosti | `dotnet package list --include-transitive` | Doplní balíčky přitažené jinými balíčky |
| Najít dostupné aktualizace | `dotnet package list --outdated` | Porovná používané verze s nakonfigurovanými zdroji |
| Obnovit deklarované balíčky | `dotnet restore [<projekt-nebo-řešení>]` | Stáhne závislosti projektu nebo řešení |

### [.NET 9 a starší](#tab/nuget-dotnet-9)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat balíček nebo změnit jeho verzi | `dotnet add package <balíček> [--version <verze>]` | Upraví projekt a provede obnovu závislostí |
| Odebrat přímou závislost | `dotnet remove package <balíček>` | Odebere odkaz z projektu |
| Vypsat přímé balíčky | `dotnet list package` | Zobrazí balíčky uvedené projektem a jejich verze |
| Zahrnout i nepřímé závislosti | `dotnet list package --include-transitive` | Doplní balíčky přitažené jinými balíčky |
| Najít dostupné aktualizace | `dotnet list package --outdated` | Porovná používané verze s nakonfigurovanými zdroji |
| Obnovit deklarované balíčky | `dotnet restore [<projekt-nebo-řešení>]` | Stáhne závislosti projektu nebo řešení |

***

Přidání již uvedeného balíčku s novou verzí slouží také jako jeho cílená aktualizace.

Po změně verze spusť build a testy, protože správce balíčků neověří kompatibilitu veřejného API knihovny.

Syntaxi potvrzuje oficiální přehled [správy závislostí v .NET](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies) a reference příkazu [`dotnet package list`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list).

## Záloha a obnova bez internetu

Pro obnovu bez internetu potřebuješ **zdrojový projekt a složku s jeho balíčky**.

Níže je postup pro projekty s `PackageReference`, například běžnou aplikaci v .NET 8 nebo 10.

Na obou počítačích použij odpovídající .NET SDK a stejnou cílovou platformu.

Příkazy fungují v PowerShellu i Bashi.

### 1. Připrav zálohu s internetem

Vytvoř složku `zaloha-nuget/projekt` a zkopíruj do ní celý projekt bez generovaných `bin` a `obj`.

Zachovej také soubory řešení, `global.json`, `NuGet.Config`, `Directory.*.props/targets` a `packages.lock.json`.

V této kopii projektu spusť:

```bash
dotnet restore --locked-mode --packages ../balicky
dotnet build --no-restore
```

`--packages` stáhne balíčky do sousední složky `balicky`, takže je máš pohromadě k přenosu.

Pokud projekt ještě nemá lockfile, vytvoř jej nejprve příkazem `dotnet restore --use-lock-file` a uchovej ho se zdroji.

`--locked-mode` potom chrání zaznamenané verze před změnou. [Uzamčení závislostí](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#locking-dependencies)

### 2. Přenes celou složku

```text
zaloha-nuget/
  projekt/       zdroje, konfigurace a lockfily
  balicky/       všechny stažené balíčky
```

Balíčky kopíruj celé, včetně souborů `.nupkg` a skrytých metadat.

Není potřeba je rozbalovat ani přesouvat do jiné struktury. [Místní zdroj NuGet](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds)

Přidej si výstup `dotnet --info` a instalátor potřebného SDK pro cílový počítač.

### 3. Obnov bez internetu

Na druhém počítači rozbal pracovní kopii zálohy a v jejím `projekt` spusť:

```bash
dotnet restore --locked-mode --source ../balicky -p:NuGetAudit=false
dotnet build --no-restore
```

`--source ../balicky` použije přenesenou složku místo online zdrojů.

Pro tento běžný postup nepotřebuješ další konfigurační soubor. [Dotnet restore](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore)

`NuGetAudit=false` vynechá online kontrolu zranitelností během této obnovy.

Audit proveď při přípravě s internetem.

Nakonec spusť testy projektu přes `dotnet test --no-restore` a běžnou aplikaci bez sítě.

Úplnost zálohy ověř na účtu nebo počítači bez původních balíčků.

Při zkoušce na původním stroji přidej k restore `--packages ../zkusebni-balicky --no-http-cache` s novou prázdnou složkou.

### Chci zálohovat všechny již stažené balíčky

Místo samostatného stahování zjisti používanou složku:

```bash
dotnet nuget locals global-packages --list
```

Zkopíruj celý vypsaný adresář jako `balicky` a obnovuj stejným postupem výše.

Před kopírováním dokonči restore všech projektů, které chceš později obnovovat.

Společná cache obsahuje pouze to, co se do ní skutečně stáhlo.

Pro více řešení můžeš také opakovat přípravu se stejnou cestou `--packages`, ale zdroje a lockfily každého projektu uchovej zvlášť.

### Co přizpůsobit projektu

| Situace | Co udělat |
|---|---|
| Ve složce je více řešení | Za `restore` i `build` uveď konkrétní soubor řešení |
| Publikování pro konkrétní runtime | Připrav a obnov i tuto variantu, například s `-r win-x64` |
| Vlastní mapování zdrojů nebo podpisy | Zachovej pravidla projektu a přizpůsob mapování místnímu zdroji |
| Starší `packages.config` | Použij jeho původní NuGet/MSBuild postup, například `nuget restore reseni.sln -Source ../balicky` |
| Obnova s internetem | V přeneseném projektu stačí `dotnet restore --locked-mode` |

SDK, workloady a data stahovaná vlastními build skripty nejsou automaticky součástí NuGet zálohy.

Spustitelné nástroje jako DocFX mají samostatný postup [.NET tools](dotnet-tools.md).
