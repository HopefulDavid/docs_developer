---
description: "Připojení Android zařízení a hledání i nahrazování textu pomocí regexu."
---

# JetBrains Rider – nastavení

Rider propojuje editor .NET s nástroji pro sestavení, ladění a práci se zdrojovým kódem.

## Propojení s mobilním zařízením (Android)

Nejprve připrav [Android SDK a zařízení](../programming/mobile/android-studio.md).

Pro projekt .NET MAUI musí instalace .NET obsahovat odpovídající workload a Rider musí rozpoznat SDK.

Dostupné cíle se řídí operačním systémem a projektem. [MAUI v Rideru](https://www.jetbrains.com/help/rider/MAUI.html)

V **File → Settings** vyhledej nastavení Android SDK a zkontroluj skutečné umístění SDK.

Potom vyber Android konfiguraci a zařízení v panelu spuštění.

Pokud zařízení chybí, ověř jej přes `adb devices`.

Nástroj je součástí adresáře `platform-tools` v Android SDK. [Android Debug Bridge](https://developer.android.com/tools/adb)

## XML komentáře

Odstavce v dokumentačním komentáři odděluj značkami `<para>`:

```csharp
/// <summary>
/// <para>Načte konfiguraci aplikace ze souboru.</para>
/// <para>Chybějící soubor oznámí výjimkou.</para>
/// </summary>
```

Vkládání prázdného odstavce s nezlomitelnou mezerou není potřeba.

Vzhled dokumentace závisí na rendereru. [Doporučené XML značky C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags)

## Regulární výrazy

Pro hledání opakujících se tvarů textu a jejich nahrazování pokračuj samostatným [návodem k regulárním výrazům](jetbrains/regular-expressions.md).

Najdeš v něm nastavení rozsahu, vysvětlené vzory, vstup i výsledek náhrady a přehled pokročilých možností.
