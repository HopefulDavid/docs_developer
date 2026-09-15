---
description: "Přístupnost členů, cílové platformy a použití nativních knihoven."
---

# .NET – Přístup, nasazení a nativní knihovny

Přístupnost členů, cílová platforma a životnost prostředků určují, jak lze knihovnu bezpečně použít v aplikaci.

## Modifikátory přístupu

| Modifikátor | Dostupnost |
|---|---|
| `public` | Odkudkoli, kde je dostupný obsahující typ |
| `private` | Uvnitř obsahujícího typu |
| `protected` | V obsahujícím typu a odvozených typech |
| `internal` | V rámci stejné assembly |
| `protected internal` | Ve stejné assembly **nebo** v odvozeném typu |
| `private protected` | V obsahujícím typu a potomcích ze stejné assembly |

Umístění dvou nesouvisejících tříd do stejného souboru jim nezpřístupní soukromé členy.

`file` omezuje viditelnost typu na soubor a používá se jen u typů nejvyšší úrovně, nikoli u metod nebo vlastností. [Microsoft: modifikátory přístupu](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers).

## Složka runtimes a multiplatformní nasazení

NuGet balíček může ve složce `runtimes/<RID>` poskytovat prostředky pro konkrétní OS a architekturu.

RID jako `win-x64`, `linux-x64` nebo `osx-arm64` identifikuje cílovou platformu. [Microsoft: nativní prostředky NuGet](https://learn.microsoft.com/en-us/nuget/create-packages/native-files-in-net-packages).

| Nasazení | Co potřebuje cílový počítač |
|---|---|
| Framework-dependent | Kompatibilní nainstalovaný .NET runtime a systémové závislosti |
| Self-contained | Systémové závislosti. .NET runtime je součástí výstupu |

V adresáři projektu publikujte každý cíl zvlášť:

```powershell
dotnet publish -c Release -r win-x64 --self-contained true -o publish/win-x64
dotnet publish -c Release -r linux-x64 --self-contained true -o publish/linux-x64
```

Self-contained neodstraňuje závislost na OS, architektuře ani kompatibilních nativních knihovnách.

Seznam `RuntimeIdentifiers` v projektu sám nevytvoří všechny výstupy jedním publikováním. [Microsoft: dotnet publish](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-publish).

## Uvolnění zdrojů

Garbage collector spravuje paměť řízených objektů, ale nezavolá automaticky `Dispose` v okamžiku, kdy skončí práce se souborem nebo připojením.

Pro objekty implementující `IDisposable` použij `using`.

Pro `IAsyncDisposable` použij podle API `await using`.

```csharp
using var reader = new StreamReader("input.txt");
Console.WriteLine(reader.ReadLine());
```

Čtečka se uvolní při opuštění rozsahu i při výjimce.

Finalizér `~ClassName()` nemá deterministické načasování.

Vlastní finalizér není běžnou náhradou za `Dispose`. [Microsoft: uvolňování neřízených prostředků](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/unmanaged).

## Volání funkcí z externích DLL (PInvoke)

Následující úplný `Program.cs` pro .NET 10 zavolá Unicode variantu Windows MessageBox:

```csharp
using System.Runtime.InteropServices;

if (!OperatingSystem.IsWindows())
    throw new PlatformNotSupportedException("Ukázka vyžaduje Windows.");

NativeMethods.MessageBoxW(IntPtr.Zero, "Příliš žluťoučký kůň", "Ukázka", 0);

internal static class NativeMethods
{
    [DllImport("user32.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
    internal static extern int MessageBoxW(
        IntPtr window, string text, string caption, uint type);
}
```

Deklarace musí odpovídat nativnímu podpisu, volací konvenci a kódování řetězců.

Název DLL a její architektura musí odpovídat cílovému prostředí. [Microsoft: P/Invoke](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/pinvoke), [MessageBoxW](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messageboxw).

Unity má vlastní pravidla pro nativní pluginy.

`__Internal` se například používá u staticky připojeného iOS pluginu a není univerzální název knihovny pro běžné .NET aplikace. [Unity: iOS pluginy](https://docs.unity3d.com/Manual/PluginsForIOS.html).
