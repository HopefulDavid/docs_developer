---
description: "Předávání parametrů, návratové hodnoty a asynchronní volání."
---

# C# – parametry, metody a asynchronní práce

Podpis metody určuje předávané hodnoty a výsledek; způsob předání je důležitý zejména u měnitelných objektů.

## Parametry

| Zápis | Význam |
|---|---|
| Bez modifikátoru | Předání hodnotou; u třídy se kopíruje reference, nikoli objekt |
| `ref` | Metoda může číst i měnit proměnnou volajícího |
| `out` | Metoda musí při běžném návratu přiřadit výstup |
| `in` | Reference pro čtení; neznamená hlubokou neměnnost odkazovaného objektu |
| `params` | Proměnný počet argumentů, například `params int[] values` |
| Volitelný parametr | Použije výchozí hodnotu, pokud argument chybí |

[Pravidla parametrů](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters)

Příklad s lokálními funkcemi v konzolovém `Program.cs`:

```csharp
var number = 1;
var values = new List<int> { 1 };

ChangeValue(number);
Console.WriteLine(number); // 1

ChangeReference(ref number);
Console.WriteLine(number); // 2

Append(values);
Console.WriteLine(values.Count); // 2

static void ChangeValue(int value) => value = 2;
static void ChangeReference(ref int value) => value = 2;
static void Append(List<int> items) => items.Add(2);
```

Metoda `Append` dostává kopii reference, ale mění společný objekt seznamu.

## Druhy metod

- Instanční metoda pracuje s konkrétním objektem; `static` metoda instanci nepotřebuje.
- Přetížení má stejné jméno a jiný podpis parametrů; samotný návratový typ nestačí.
- `virtual` umožňuje přepsání v potomkovi přes `override`.
- Rozšiřující metoda poskytuje syntaxi volání nad existujícím typem.
- Delegát představuje typované volání metody; například `Func<int, int>` přijme a vrátí číslo.

[Metody v C#](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods)

## Asynchronní zpracování

`async` samo nezakládá nové vlákno.

Pro I/O používej asynchronní API a `await`; pro výpočetně náročnou práci lze podle prostředí použít `Task.Run`. [Asynchronní scénáře](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios)

Příklad vyžaduje existující soubor `vstup.txt` v pracovní složce:

```csharp
using var cancellation = new CancellationTokenSource(TimeSpan.FromSeconds(10));
string text = await File.ReadAllTextAsync("vstup.txt", cancellation.Token);
Console.WriteLine(text.Length);
```

Operace může skončit chybou souboru nebo zrušením; rozhodni, kde je aplikace zachytí a oznámí.

Vyhýbej se `async void` kromě obsluhy událostí; vrácený `Task` dovoluje čekat na dokončení a pozorovat výjimku. [Návratové typy async](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-return-types)
