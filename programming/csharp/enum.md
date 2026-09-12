---
description: "Pojmenované hodnoty, číselná reprezentace a kombinace příznaků."
---

# C# – výčtové typy enum

Výčtový typ dává číselným hodnotám jména; sám neomezuje vstup pouze na pojmenované členy.

## Deklarace a použití

```csharp
Status status = Status.Ready;
Console.WriteLine(status); // Ready

var received = (Status)99;
Console.WriteLine(Enum.IsDefined(received)); // False

/// <summary>Stav zpracování úlohy.</summary>
public enum Status : byte
{
    /// <summary>Stav nebyl určen.</summary>
    Unknown = 0,
    /// <summary>Úloha čeká na zpracování.</summary>
    Ready = 1,
    /// <summary>Úloha byla dokončena.</summary>
    Done = 2
}
```

Ukázku lze vložit do `Program.cs` konzolového projektu moderního .NET.

Výchozí hodnota enumu je nula i tehdy, když pro ni není pojmenovaný člen.

Vstup z čísla nebo řetězce validuj podle povolených hodnot domény. [Výčtové typy C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum)

## Typy enum podle velikosti

Výchozí podkladový typ je `int`; `byte` zvol například tehdy, když jej vyžaduje komunikační formát.

Menší podkladový typ nenahrazuje validaci ani automaticky neurčuje celkovou velikost objektu v paměti.

## Kombinovatelné příznaky

Pro bitové kombinace použij `[Flags]` a členy s hodnotami mocnin dvou, například `Read = 1`, `Write = 2`, `Execute = 4`.

Pojmenuj také nulovou hodnotu, obvykle `None = 0`.

`Enum.IsDefined` neuzná každou platnou kombinaci příznaků, pokud kombinace sama není pojmenovaným členem; validuj povolené bity. [FlagsAttribute](https://learn.microsoft.com/en-us/dotnet/fundamentals/runtime-libraries/system-flagsattribute), [Enum.IsDefined](https://learn.microsoft.com/en-us/dotnet/api/system.enum.isdefined?view=net-10.0)
