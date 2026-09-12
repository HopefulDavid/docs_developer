# NuGet – balíčky v .NET

NuGet obnovuje knihovny .NET podle závislostí deklarovaných projektem; pro moderní projekty stačí .NET SDK.

## Jak funguje správa balíčků

| Formát | Kde je deklarace | Co obnovuje |
|---|---|---|
| `PackageReference` | Projekt `.csproj`, případně společné verze v `Directory.Packages.props` | Přímé a odvozené závislosti do globální cache |
| `packages.config` | Samostatný soubor staršího projektu | Uvedené balíčky, typicky do společné složky řešení |

Formát určuje projekt, nikoli samotný rok jeho vzniku; starší `packages.config` může vyžadovat NuGet CLI nebo MSBuild. [PackageReference](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files), [obnova balíčků](https://learn.microsoft.com/en-us/nuget/consume-packages/package-restore)

## Před použitím

Příklady pro .NET 10 spouštěj ve složce s jedním `.csproj`; v řešení s více projekty vyber konkrétní projekt.

Ověř `dotnet --version` a zkontroluj čistý stav Gitu, aby byl rozdíl po instalaci čitelný.

## Praktický postup

```powershell
# Příklad knihovny pro vlastní SQL dotazy.
dotnet add package Dapper
dotnet restore
dotnet list package
dotnet build
```

`add package` zapíše odkaz do projektu a provede obnovu; samostatný `restore` ukazuje způsob opětovného stažení již deklarovaných balíčků.

Dapper můžeš nahradit potřebnou knihovnou; pro konkrétní ověřenou verzi přidej `--version` a její číslo.

V .NET 10 existuje také pořadí `dotnet package add`; zde používané `dotnet add package` zachovává známý zápis ze starších SDK. [Přidání balíčku](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-add)

## Kontrola a aktualizace

```powershell
dotnet list package --outdated
dotnet list package --vulnerable --include-transitive
```

První příkaz vypíše dostupné aktualizace, druhý známé zranitelnosti včetně odvozených závislostí; oba potřebují dostupné zdroje metadat. [Výpis balíčků](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list)

Vybraný balíček aktualizuj přes `add package`, zkontroluj změny deklarací a spusť testy; `dotnet outdated` je samostatný nástroj a není součástí SDK.

## Zdroje a cache

| Příkaz | Význam |
|---|---|
| `dotnet nuget list source` | Vypíše nakonfigurované zdroje |
| `dotnet nuget locals global-packages --list` | Ukáže skutečné umístění globálních balíčků |
| `dotnet nuget locals all --clear` | Vymaže cache; příští obnova může vyžadovat síť |
| `dotnet remove package Dapper` | Odebere přímou závislost; následně oprav používající kód |

Cache není záloha projektu; její umístění může změnit `NUGET_PACKAGES`. [Správa cache](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders)

## Opakovatelná obnova

U aplikace lze vytvořit a verzovat `packages.lock.json` pomocí `dotnet restore --use-lock-file`; následné `dotnet restore --locked-mode` odmítne neodpovídající změnu závislostí.

Lockfile pravidla přizpůsob typu projektu a společné správě verzí. [Zamknutí závislostí](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#locking-dependencies)
