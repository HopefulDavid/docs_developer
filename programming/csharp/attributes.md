# .NET – Atributy, validace a FileHelpers

Atributy připojují metadata k typům a členům; jejich účinek závisí na kompilátoru, runtime nebo knihovně, která je zpracovává.

Samotné přidání validačního atributu neověří každé přiřazení hodnoty. [Microsoft: atributy](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/reflection-and-attributes/).

## Datové anotace

| Atribut | Účel |
|---|---|
| `Required` | Povinná hodnota |
| `Range` | Rozsah hodnot |
| `StringLength` | Maximální a případně minimální délka řetězce |
| `MinLength`, `MaxLength` | Mezní délky podporovaných hodnot |
| `RegularExpression` | Kontrola formátu regulárním výrazem |
| `EmailAddress`, `Phone` | Kontrola formátu, nikoli existence schránky nebo čísla |
| `DataType` | Nápověda pro prezentaci dat; sama nezajišťuje validaci |
| `Display` | Zobrazovaný název a další metadata |

Úplný `Program.cs` pro .NET 10 spustí validaci explicitně:

```csharp
using System.ComponentModel.DataAnnotations;

var author = new Author { Name = "", Email = "eva@example.test" };
var errors = new List<ValidationResult>();
bool valid = Validator.TryValidateObject(
    author, new ValidationContext(author), errors,
    validateAllProperties: true);

Console.WriteLine(valid);
foreach (var error in errors)
    Console.WriteLine(error.ErrorMessage);

/// <summary>Vstupní údaje autora.</summary>
public sealed class Author
{
    /// <summary>Jméno požadované při uložení autora.</summary>
    [Required(ErrorMessage = "Jméno je povinné.")]
    [StringLength(50)]
    public string Name { get; set; } = "";

    /// <summary>Volitelná e-mailová adresa.</summary>
    [EmailAddress]
    public string? Email { get; set; }
}
```

Výstup obsahuje `False` a zprávu `Jméno je povinné.`.

`TryValidateObject` s `validateAllProperties: true` vyhodnotí validační atributy vlastností, ale neprochází rekurzivně celý graf vnořených objektů. [Microsoft: TryValidateObject](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validator.tryvalidateobject?view=net-10.0).

Pro vlastní pravidlo lze odvodit `ValidationAttribute` a implementovat `IsValid`; běžnou povinnou hodnotu již řeší `Required`. [Microsoft: DataAnnotations](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations).

## FileHelpers – Zpracování souborů

FileHelpers mapuje textové záznamy na pole třídy podle atributů.

V samostatném konzolovém projektu přidej balíček:

```powershell
dotnet add package FileHelpers
```

Následující úplný `Program.cs` čte dva záznamy s oddělovačem `;`:

```csharp
using FileHelpers;

var engine = new FileHelperEngine<Order>();
var orders = engine.ReadString("1;Tuzka\n2;Sesit\n");
foreach (var order in orders)
    Console.WriteLine($"{order.Id}: {order.Product}");

/// <summary>Jeden záznam souboru objednávek.</summary>
[DelimitedRecord(";")]
public sealed class Order
{
    /// <summary>Číselný identifikátor objednávky.</summary>
    public int Id;

    /// <summary>Název objednané položky.</summary>
    public string Product = "";
}
```

Pro soubory použij `engine.ReadFile("Input.txt")` a `engine.WriteFile("Output.txt", orders)`. [FileHelpers: Quick Start](https://www.filehelpers.net/quickstart/).

| Atribut | Použití |
|---|---|
| `DelimitedRecord`, `FixedLengthRecord` | Oddělená pole nebo pevné šířky |
| `FieldQuoted` | Hodnoty v uvozovkách |
| `FieldTrim` | Odstranění okrajových mezer |
| `FieldOptional` | Volitelné pole |
| `FieldConverter` | Konverze, například data s konkrétním formátem |
| `FieldOrder` | Explicitní pořadí polí |

Formát a pravidla konverze zvol podle vstupu; možnosti knihovny nejsou omezené jen na jeden neměnný typ záznamu. [FileHelpers: dokumentace a příklady](https://www.filehelpers.net/).
