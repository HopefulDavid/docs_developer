# Unity: orientace v projektu a Play Mode

Unity spojuje editor scén, assety a C# komponenty do aplikace, kterou sestavíš pro cílovou platformu.

Tyto návody jsou určené juniorovi se základy C# a rozlišují nastavení editoru od chování vydané hry.

## Jak se v projektu orientovat

| Část | Účel |
|---|---|
| Scene | Uložená sestava herních objektů |
| GameObject a komponenty | Objekt a jeho jednotlivé schopnosti, například kamera nebo skript |
| Prefab | Opakovaně použitelná definice objektu |
| Asset | Soubor projektu, například sprite, zvuk nebo konfigurace |
| Inspector | Vlastnosti právě vybraného objektu nebo assetu |
| Console | Chyby kompilace, runtime výjimky a diagnostika |

Změny objektů scény provedené v Play se obvykle po ukončení vrátí, ale změny souborů a assetů nemusí být dočasné.

## Praktický začátek

V Unity Hub zvol editor a šablonu odpovídající projektu, ulož první scénu a vytvoř jeden viditelný objekt.

Spusť Play, ověř konzoli a ještě před rozšiřováním prototypu vyzkoušej build pro zamýšlenou platformu.

Pro grafiku pokračuj na [2D](2d.md), [kameru](camera.md) a [URP](renderer.md), pro ovládání rozhraní na [UI Toolkit](ui-toolkit.md) nebo [Canvas UI](ui.md).

Sdílená data řeší [ScriptableObject](scriptable-object.md), pohyb postav [NavMesh](navigation.md) a klíčování [UMotion](animation.md).

## Rychlejší vstup do Play módu

V Unity 6 otevři **Edit → Project Settings → Editor → Enter Play Mode Settings**.

Nejprve změř výchozí stav a měň jen jednu volbu, aby šlo poznat příčinu rozdílu.

| Volba | Co se změní při vypnutí | Co musíš ověřit |
|---|---|---|
| Reload Domain | Statická pole a odběry událostí se automaticky nevynulují | Opakovaný Play nezačíná se starým stavem ani duplicitními odběry |
| Reload Scene | Přeskočí se běžné načtení scény z disku | Inicializace objektů odpovídá očekávání i ve skutečném buildu |

## Příklad explicitního resetu

Soubor `SessionState.cs` ukazuje stav jedné herní relace; není potřeba jej přidávat jako komponentu.

```csharp
using UnityEngine;

/// <summary>Uchovává a resetuje stav jedné herní relace.</summary>
public static class SessionState
{
    /// <summary>Skóre aktuální relace, při startu resetované na nulu.</summary>
    public static int Score { get; set; }

    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
    private static void Reset()
    {
        // Nová herní relace musí začít stejně i bez Domain Reload.
        Score = 0;
    }
}
```

Reset vlastního čítače neopraví jiné statické kolekce nebo odběry událostí; každý musí mít vlastní pravidlo životnosti.

Spusť a zastav Play alespoň dvakrát a porovnej chování s čistým spuštěním buildu.

Podmínky popisuje [Unity: Domain Reload](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html).

## Důležité poznámky

Optimalizace editoru nezrychlí automaticky start vydané hry.

Při ladění problému obnov výchozí reload nastavení a ověř, zda chyba nezávisí na předchozím běhu.

Verzi editoru a závislostí přebírej ze stávajícího projektu, ne z označení „nejnovější“ v obecném návodu.
