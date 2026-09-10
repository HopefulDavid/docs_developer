# .NET – Textové soubory, CSV a kódování

Při čtení dat určete kódování, oddělovač a očekávané sloupce podle smluveného formátu souboru.

## CSV s hodnotami v uvozovkách

Počítání čárek a středníků nerozliší oddělovač od interpunkce uvnitř hodnoty.

Pro import s neznámým formátem nechte uživatele potvrdit náhled a oddělovač; samotný odhad není validace.

`TextFieldParser` z `Microsoft.VisualBasic.FileIO` lze použít také v C# a v běžném projektu .NET nevyžaduje další NuGet balíček.

Následující úplný `Program.cs` pro konzolový projekt .NET 10 načte dvě pole včetně středníku uvnitř uvozovek:

```csharp
using Microsoft.VisualBasic.FileIO;

const string csv = """
Name;Note
Eva;"Praha; centrum"
""";

using var input = new StringReader(csv);
using var parser = new TextFieldParser(input)
{
    TextFieldType = FieldType.Delimited,
    HasFieldsEnclosedInQuotes = true,
    TrimWhiteSpace = false
};
parser.SetDelimiters(";");

var header = parser.ReadFields();
if (header is null || !header.SequenceEqual(new[] { "Name", "Note" }))
    throw new FormatException("Očekávána hlavička Name;Note.");

while (!parser.EndOfData)
{
    var fields = parser.ReadFields();
    if (fields is null || fields.Length != 2)
        throw new FormatException("Každý záznam musí mít dvě pole.");

    Console.WriteLine($"{fields[0]}: {fields[1]}");
}
```

Výstup je `Eva: Praha; centrum`.

Parser hlásí neplatně zapsaný záznam výjimkou `MalformedLineException`; chybný import má zobrazit místo a důvod chyby, nikoli záznam tiše zahodit. [Microsoft: čtení oddělených polí](https://learn.microsoft.com/en-us/dotnet/visual-basic/developing-apps/programming/drives-directories-files/how-to-read-from-comma-delimited-text-files).

## Kódování a BOM

Pro skutečný soubor můžete místo `StringReader` použít následující vstup; soubor bez BOM bude interpretován jako UTF-8:

```csharp
using var input = new StreamReader(
    "input.csv",
    new System.Text.UTF8Encoding(false, true),
    detectEncodingFromByteOrderMarks: true);
```

BOM je posloupnost bajtů na začátku souboru, podle které čtečka může rozpoznat podporované kódování.

Není to pokyn odstranit všechny znaky `\uFEFF` z již načteného obsahu. [StreamReader a rozpoznání kódování](https://learn.microsoft.com/en-us/dotnet/api/system.io.streamreader.-ctor).

| Zápis v C# | Význam |
|---|---|
| `\n` | Přechod na nový řádek LF |
| `\r\n` | Konce řádků CRLF |
| `\t` | Tabulátor |
| `\uFEFF` | Znak používaný v úvodní signatuře Unicode |
| `\0` | Nulový znak uvnitř řetězce |

Nulový znak neukončuje řetězec `System.String`; například `"A\0B".Length` je `3`.

Rozdílná pravidla mohou platit při předání řetězce nativnímu API. [Microsoft: řetězce v C#](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/).
