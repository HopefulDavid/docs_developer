---
description: "Parametrizované SQL a mapování výsledků na .NET objekty."
---

# Dapper – parametrizované SQL v .NET

Dapper mapuje výsledky SQL na objekty .NET; dotazy i databázové schéma spravuje aplikace.

## Instalace

V existujícím konzolovém projektu .NET přidej Dapper a provider pro SQL Server:

```powershell
dotnet add package Dapper
dotnet add package Microsoft.Data.SqlClient
```

Pro jinou databázi zvol její ADO.NET provider. [Dapper](https://github.com/DapperLib/Dapper)

## Připojení a dotaz

Příklad předpokládá dostupný SQL Server, oprávnění ke čtení a tabulku `dbo.Users` se sloupci `Id int`, `Name nvarchar(100)` a `Age int`.

Do proměnné prostředí `APP_DB_CONNECTION` nastav připojovací řetězec svého vývojového prostředí.

V `Program.cs` použij:

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

Hodnotu `MinAge` předává objekt parametrů; nevkládej uživatelské hodnoty do SQL interpolací řetězce. [Parametry v Dapperu](https://github.com/DapperLib/Dapper)

## Zápis dat

Ve stejném otevřeném připojení lze místo dotazu provést:

```csharp
var changed = await connection.ExecuteAsync(
    "UPDATE dbo.Users SET Name = @Name WHERE Id = @Id;",
    new { Id = 1, Name = "Jana" });
Console.WriteLine($"Změněné řádky: {changed}");
```

Tento příkaz mění data; předpokládá oprávnění k zápisu a správný identifikátor.

Pro více souvisejících změn použij transakci a předej ji každému příkazu.

Dapper nevybírej pouze podle obecného příslibu výkonu; rozhodují konkrétní dotazy, indexy, přenos dat a naměřený výsledek.
