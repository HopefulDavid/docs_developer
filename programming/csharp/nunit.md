# .NET – NUnit

NUnit umožňuje spouštět automatizované testy a zapisovat očekávání pomocí `Assert.That`.

## Založení a spuštění testů

Se SDK .NET 10 vytvořte projekt a spusťte jeho testy:

```powershell
dotnet new nunit -n NUnitDemo -f net10.0
cd NUnitDemo
dotnet test
```

Šablona přidá NUnit, testovací adaptér a SDK potřebné pro objevování a spouštění testů. [Microsoft: testování s NUnit a dotnet test](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-nunit).

## Multiple Asserts

Více souvisejících ověření jednoho výsledku seskupte do `Assert.Multiple`.

Soubor `UnitTest1.cs` nahraďte úplnou ukázkou:

```csharp
using System.Numerics;
using NUnit.Framework;

/// <summary>Ukázka ověření více složek jednoho výsledku.</summary>
public sealed class ComplexTests
{
    /// <summary>Součet komplexních čísel zachová obě složky.</summary>
    [Test]
    public void AdditionAddsBothComponents()
    {
        var result = new Complex(2, 1) + new Complex(3, 3);
        Assert.Multiple(() =>
        {
            Assert.That(result.Real, Is.EqualTo(5));
            Assert.That(result.Imaginary, Is.EqualTo(4));
        });
    }
}
```

Znovu spusťte `dotnet test`; očekáván je jeden úspěšný test.

Ukázka demonstruje syntaxi na standardním typu; v aplikaci tímto způsobem ověřujte výsledky vlastního kódu.

NUnit shromáždí selhání asertů v bloku, ale neošetřená výjimka může zbývající vykonávání ukončit.

Od NUnit 4.2 existuje také `using (Assert.EnterMultipleScope())`; `Assert.Multiple` je použitelné i pro starší verze. [NUnit: Multiple Asserts](https://docs.nunit.org/articles/nunit/writing-tests/assertions/multiple-asserts.html).

## Video prezentace

[Trendy v unit testování a mockování, WUG Days 2018](https://download.wug.cz/videos/wug/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani_1080p.mp4) nabízí historický kontext; podobu současného API ověřujte v dokumentaci NUnit.
