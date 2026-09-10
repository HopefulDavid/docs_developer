# C# – implicitní a explicitní převody

Vlastní konverzní operátor určuje, jak se hodnota uživatelského typu převádí na jiný typ.

## Rozdíl v použití

| Operátor | Volání | Vhodný význam |
|---|---|---|
| `implicit` | Bez přetypování | Převod bez očekávané ztráty informace nebo výjimky |
| `explicit` | S přetypováním `(Typ)hodnota` | Převod, jehož provedení má být v kódu výslovné |

Samotné slovo `explicit` nezaručuje bezpečnost převodu; chování určuje implementace. [Konverzní operátory](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/user-defined-conversion-operators)

## Příklad: hodnota s jednotkou

Ukázka pro konzolový projekt .NET převádí počet metrů na číselnou hodnotu a výslovně zpět:

```csharp
var distance = (Meters)12.5m;
decimal value = distance;
Console.WriteLine(value);

/// <summary>Vzdálenost vyjádřená v metrech.</summary>
public readonly struct Meters
{
    /// <summary>Vytvoří vzdálenost z počtu metrů.</summary>
    public Meters(decimal value) => Value = value;

    /// <summary>Počet metrů.</summary>
    public decimal Value { get; }

    /// <summary>Vrátí číselnou hodnotu ve stejné jednotce.</summary>
    public static implicit operator decimal(Meters distance) => distance.Value;

    /// <summary>Výslovně přiřadí číselné hodnotě jednotku metr.</summary>
    public static explicit operator Meters(decimal value) => new(value);
}
```

Převod hodnoty na číslo není převodem jednotek.

Pro změnu jednotky, například Celsius → Fahrenheit, je často čitelnější pojmenovaná metoda, která jasně vyjadřuje výpočet.
