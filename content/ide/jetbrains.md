---
description: "Připojení Android zařízení a hledání i nahrazování textu pomocí regexu."
---

# JetBrains Rider – nastavení

Rider propojuje editor .NET s nástroji pro sestavení, ladění a práci se zdrojovým kódem.

## Propojení s mobilním zařízením (Android)

Nejprve se připraví [Android SDK a zařízení](../programming/mobile/android-studio.md).

Pro projekt .NET MAUI musí instalace .NET obsahovat odpovídající workload a Rider musí rozpoznat SDK.

Dostupné cíle se řídí operačním systémem a projektem. [MAUI v Rideru](https://www.jetbrains.com/help/rider/MAUI.html)

V **File → Settings** se vyhledá nastavení Android SDK a zkontroluje skutečné umístění SDK.

Potom se v panelu spuštění vybere Android konfigurace a zařízení.

Chybějící zařízení se ověří přes `adb devices`.

Nástroj je součástí adresáře `platform-tools` v Android SDK. [Android Debug Bridge](https://developer.android.com/tools/adb)

## XML komentáře

Odstavce v dokumentačním komentáři oddělují značky `<para>`:

```csharp
/// <summary>
/// <para>Načte konfiguraci aplikace ze souboru.</para>
/// <para>Chybějící soubor oznámí výjimkou.</para>
/// </summary>
```

Vkládání prázdného odstavce s nezlomitelnou mezerou není potřeba.

Vzhled dokumentace závisí na rendereru. [Doporučené XML značky C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags)

## Regulární výrazy

Hledání opakujících se tvarů textu a jejich nahrazování popisuje samostatný [návod k regulárním výrazům](jetbrains/regular-expressions.md).

Obsahuje nastavení rozsahu, vysvětlené vzory, vstup i výsledek náhrady a přehled pokročilých možností.
