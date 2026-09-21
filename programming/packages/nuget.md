---
description: "Základní příkazy NuGet pro správu knihoven v projektech .NET."
---

# NuGet

NuGet spravuje knihovny a další balíčky používané projekty .NET.

Pro přenos knihoven použij [zálohu a obnovu bez internetu](backup-and-restore.md#nuget).

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
