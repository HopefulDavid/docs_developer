---
description: "Mapování .NET objektů na databázi a řízení změn pomocí migrací."
---

# Entity Framework Core – první databáze a migrace

EF Core mapuje model .NET na databázi, překládá podporované LINQ dotazy a sleduje změny entit.

## Funkční minimum se SQLite

Příklad používá .NET 10, EF Core 10 a místní soubor SQLite, takže nepotřebuje databázový server.

```powershell
dotnet new console -n EfDemo -f net10.0
cd EfDemo
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.12
dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.12
dotnet new tool-manifest
dotnet tool install dotnet-ef --version 10.0.12
```

Příklad připíná ověřenou verzi 10.0.12; při aktualizaci změň společně provider, Design i nástroj a znovu ověř migrace.

Provider musí podporovat zvolenou hlavní verzi EF Core. [První aplikace](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app), [Providery](https://learn.microsoft.com/en-us/ef/core/providers/)

Nahraď `Program.cs`:

```csharp
using Microsoft.EntityFrameworkCore;

await using var db = new AppDbContext();
db.Notes.Add(new Note { Text = "První poznámka" });
await db.SaveChangesAsync();

foreach (var note in await db.Notes.AsNoTracking().OrderBy(n => n.Id).ToListAsync())
{
    Console.WriteLine($"{note.Id}: {note.Text}");
}

/// <summary>Databázový kontext ukázky s lokálním úložištěm SQLite.</summary>
public sealed class AppDbContext : DbContext
{
    /// <summary>Poznámky uložené v databázi.</summary>
    public DbSet<Note> Notes => Set<Note>();

    /// <inheritdoc/>
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=notes.db");
}

/// <summary>Jedna uložená poznámka.</summary>
public sealed class Note
{
    /// <summary>Databázový identifikátor.</summary>
    public int Id { get; set; }

    /// <summary>Text poznámky.</summary>
    public string Text { get; set; } = "";
}
```

## Vytvoření schématu

```powershell
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

Očekávej soubor `notes.db` a vypsanou poznámku; každé další spuštění přidá další řádek.

Před aplikací migrace přečti její operace `Up` a `Down`, zvlášť pokud mění existující data. [Správa migrací](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/managing)

## Běžná správa

`<migrace>` je název nové migrace, nebo existující migrace z výpisu podle konkrétního řádku.

| Záměr | Syntaxe |
|---|---|
| Seznam migrací | `dotnet ef migrations list` |
| Nová změna modelu | `dotnet ef migrations add <migrace>` |
| Zrušení poslední dosud neaplikované migrace | `dotnet ef migrations remove` |
| Nastavení databáze na konkrétní migraci | `dotnet ef database update <migrace>` |
| Obnova lokálního nástroje z manifestu | `dotnet tool restore` |

Například `dotnet ef migrations add AddNotes` připraví migraci pojmenovanou `AddNotes`; teprve `dotnet ef database update AddNotes` ji aplikuje na nakonfigurovanou databázi.

Před aktualizací ověř connection string a vytvoř zálohu dat; výběr starší migrace může provést její kroky Down a odstranit data.

Cílová migrace může znamenat i návrat zpět a ztrátu dat; aplikovanou sdílenou migraci neopravuj smazáním její historie. [CLI EF Core](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

## Použití v aplikaci

Pro SQL Server změň provider a konfiguraci připojení podle cílového prostředí.

Jednu instanci `DbContext` nesdílej mezi souběžnými operacemi.

Výkon posuzuj podle generovaných SQL dotazů, projekce sloupců a objemu načtených dat. [Životnost DbContext](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)
