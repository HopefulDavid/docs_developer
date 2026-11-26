---
description: "Parametrizované SQL a mapování výsledků na .NET objekty."
---

# Dapper – parametrizované SQL v .NET

Dapper mapuje výsledky SQL na objekty .NET.

Dotazy i databázové schéma spravuje aplikace.

## Instalace

Do existujícího konzolového projektu .NET se přidá Dapper a provider pro SQL Server:

```powershell
dotnet add package Dapper
dotnet add package Microsoft.Data.SqlClient
```

Jiná databáze potřebuje svůj ADO.NET provider. [Dapper](https://github.com/DapperLib/Dapper)

## Připojení a dotaz

Příklad předpokládá dostupný SQL Server, oprávnění ke čtení a tabulku `dbo.Users` se sloupci `Id int`, `Name nvarchar(100)` a `Age int`.

Proměnná prostředí `APP_DB_CONNECTION` obsahuje připojovací řetězec vývojového prostředí.

Obsah `Program.cs`:

```csharp
using Dapper;
using Microsoft.Data.SqlClient;

var connectionString = Environment.GetEnvironmentVariable("APP_DB_CONNECTION")
    ?? throw new InvalidOperationException("Chybí APP_DB_CONNECTION.");

await using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

var users = await connection.QueryAsync<User>(
    "SELECT Id, Name, Age FROM dbo.Users WHERE Age >= @MinAge ORDER BY Id;",
    new { MinAge = 18 });

foreach (var user in users)
{
    Console.WriteLine($"{user.Id}: {user.Name} ({user.Age})");
}

/// <summary>Výsledek dotazu na uživatele.</summary>
public sealed class User
{
    /// <summary>Identifikátor uživatele.</summary>
    public int Id { get; set; }

    /// <summary>Zobrazované jméno.</summary>
    public string Name { get; set; } = "";

    /// <summary>Věk v letech.</summary>
    public int Age { get; set; }
}
```

Hodnotu `MinAge` předává objekt parametrů.

Uživatelské hodnoty se do SQL nevkládají interpolací řetězce, protože by umožnily SQL injection. [Parametry v Dapperu](https://github.com/DapperLib/Dapper)

## Zápis dat

Ve stejném otevřeném připojení lze místo dotazu provést:

```csharp
var changed = await connection.ExecuteAsync(
    "UPDATE dbo.Users SET Name = @Name WHERE Id = @Id;",
    new { Id = 1, Name = "Jana" });
Console.WriteLine($"Změněné řádky: {changed}");
```

Tento příkaz mění data.

Předpokládá oprávnění k zápisu a správný identifikátor.

Více souvisejících změn patří do jedné transakce, která se předá každému příkazu.

Volba Dapperu nemá stát jen na obecném příslibu výkonu.

Rozhodují konkrétní dotazy, indexy, přenos dat a naměřený výsledek.
