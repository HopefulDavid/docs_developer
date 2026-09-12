---
description: "Vysvětlení záměru kódu a tvorba užitečných dokumentačních komentářů."
---

# Komentáře v kódu

Komentář vysvětluje záměr, omezení nebo důvod rozhodnutí, který není z kódu zřejmý.

Čitelný název proměnné nenahrazuje a opakování příkazu vlastními slovy obvykle nepřináší informaci.

## Praktické použití

Následující metoda přijímá časovou značku bez časového pásma ze starého exportu.

Komentář vysvětluje, proč je nutné pásmo určit výslovně, a názvy parametrů ukazují, které hodnoty dodává volající.

```csharp
using System;

/// <summary>Převádí časové značky exportu podle známého zdrojového pásma.</summary>
public static class ExportTime
{
    /// <summary>Převede jednoznačný místní čas exportu na UTC.</summary>
    public static DateTimeOffset ToUtc(DateTime exportedTime, TimeZoneInfo sourceZone)
    {
        // Export neobsahuje pásmo; lokální pásmo počítače by měnilo výsledek mezi servery.
        DateTime unspecified = DateTime.SpecifyKind(exportedTime, DateTimeKind.Unspecified);
        if (sourceZone.IsInvalidTime(unspecified) || sourceZone.IsAmbiguousTime(unspecified))
            throw new ArgumentException("Čas nelze jednoznačně převést kvůli změně letního času.");

        return new DateTimeOffset(TimeZoneInfo.ConvertTimeToUtc(unspecified, sourceZone));
    }
}
```

`sourceZone` musí odpovídat původu exportu, nikoli místu spuštění programu.

Ukázka nejednoznačný čas odmítá, aby si nevymyslela okamžik bez doménového pravidla.

## Značky poznámek

Značky jsou týmová konvence a editor je nemusí všechny automaticky zvýrazňovat.

| Značka | Kdy má význam | Co musí obsahovat |
|---|---|---|
| `NOTE` | Důvod neobvyklého chování | Konkrétní omezení nebo odkaz na kontrakt |
| `TODO` | Dohodnutá budoucí práce mimo dokončovaný rozsah | Odkaz na evidovaný úkol a podmínku řešení |
| `FIXME` | Známá závada | Dopad a návaznost na evidovanou opravu |
| `HACK` | Dočasné obejití problému závislosti | Příčinu, odkaz na problém a podmínku odstranění |
| `REVIEW` | Potřeba odborného rozhodnutí | Přesnou otázku, kterou má reviewer zodpovědět |
| `OPTIMIZE` | Změna odůvodněná měřením | Naměřený problém a očekávaný přínos |

Značka nesmí zakrývat nedokončený požadavek právě dodávané změny.

Poznámku „později optimalizovat“ bez měření nahraď buď konkrétním úkolem, nebo ji odstraň.

## Co lze upravit

Jazyk komentářů a podporované značky sjednoť podle projektu.

Pro veřejné API používej dokumentační formát daného jazyka, například [XML komentáře C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/), aby IDE zobrazovalo parametry a návratovou hodnotu.

Při změně chování aktualizuj i komentář; zastaralé vysvětlení je zavádějící i tehdy, když se program zkompiluje.
