# JetBrains Rider – Android, komentáře a zkratky

Rider propojuje editor .NET s nástroji pro sestavení, ladění a práci se zdrojovým kódem.

## Propojení s mobilním zařízením (Android)

Nejprve připrav [Android SDK a zařízení](../programming/mobile/android-studio.md).

Pro projekt .NET MAUI musí instalace .NET obsahovat odpovídající workload a Rider musí rozpoznat SDK; dostupné cíle se řídí operačním systémem a projektem. [MAUI v Rideru](https://www.jetbrains.com/help/rider/MAUI.html)

V **File → Settings** vyhledej nastavení Android SDK a zkontroluj skutečné umístění SDK.

Potom vyber Android konfiguraci a zařízení v panelu spuštění.

Pokud zařízení chybí, ověř jej přes `adb devices`; nástroj je součástí adresáře `platform-tools` v Android SDK. [Android Debug Bridge](https://developer.android.com/tools/adb)

## XML komentáře

Odstavce v dokumentačním komentáři odděluj značkami `<para>`:

```csharp
/// <summary>
/// <para>Načte konfiguraci aplikace ze souboru.</para>
/// <para>Chybějící soubor oznámí výjimkou.</para>
/// </summary>
```

Vkládání prázdného odstavce s nezlomitelnou mezerou není potřeba; vzhled dokumentace závisí na rendereru. [Doporučené XML značky C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags)

## Klávesové zkratky

Tabulka platí pro **IntelliJ keymap ve Windows**; vlastní mapování ověř v **Settings → Keymap**.

| Akce | Zkratka |
|---|---|
| Informace o parametrech | `Ctrl+P` |
| Navigace zpět | `Ctrl+Alt+Left` |
| Navigace dopředu | `Ctrl+Alt+Right` |
| Doplnění podle očekávaného typu | `Ctrl+Shift+Space` |

[Oficiální přehled zkratek](https://resources.jetbrains.com/storage/products/rider/docs/Rider_default_win_shortcuts.pdf)

## Regulární výrazy

V panelu nahrazování zapni režim **Regex** a před hromadnou změnou zkontroluj náhled.

| Zachycení | Hledat | Nahradit |
|---|---|---|
| Číselná skupina | `<h2>(.*?)</h2>` | `<h2>Test $1</h2>` |
| Pojmenovaná skupina | `<h2>(?<customName>.*?)</h2>` | `<h2>Test ${customName}</h2>` |

Příklad předpokládá jednoduchý nadpis na jednom řádku; nejde o obecný parser HTML.

Vyhledávání v IDE používá Java regex, jehož syntaxe se může lišit od regexu v aplikaci .NET. [Nahrazování pomocí regexu](https://www.jetbrains.com/help/rider/Tutorial_Finding_and_Replacing_Text_Using_Regular_Expressions.html)
