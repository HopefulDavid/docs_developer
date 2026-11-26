---
description: "Orientace ve scénách, komponentách a assetech a nastavení Play Mode."
---

# Unity: orientace v projektu a Play Mode

Unity spojuje editor scén, assety a C# komponenty do aplikace, která se sestaví pro cílovou platformu.

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

V Unity Hub se zvolí editor a šablona odpovídající projektu, uloží se první scéna a vznikne jeden viditelný objekt.

Po spuštění Play se ověří konzole a ještě před rozšiřováním prototypu se vyzkouší build pro zamýšlenou platformu.

Grafiku popisují články [2D](2d.md), [kamera](camera.md) a [URP](renderer.md), ovládání rozhraní [UI Toolkit](ui-toolkit.md) nebo [Canvas UI](ui.md).

Sdílená data řeší [ScriptableObject](scriptable-object.md), pohyb postav [NavMesh](navigation.md) a klíčování [UMotion](animation.md).

## Rychlejší vstup do Play módu

V Unity 6 je nastavení v **Edit → Project Settings → Editor → Enter Play Mode Settings**.

Nejprve se změří výchozí stav a mění se jen jedna volba, aby šlo poznat příčinu rozdílu.

| Volba | Co se změní při vypnutí | Co ověřit |
|---|---|---|
| Reload Domain | Statická pole a odběry událostí se automaticky nevynulují | Opakovaný Play nezačíná se starým stavem ani duplicitními odběry |
| Reload Scene | Přeskočí se běžné načtení scény z disku | Inicializace objektů odpovídá očekávání i ve skutečném buildu |

## Příklad explicitního resetu

Soubor `SessionState.cs` ukazuje stav jedné herní relace.

Není potřeba jej přidávat jako komponentu.

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

Reset vlastního čítače neopraví jiné statické kolekce nebo odběry událostí.

Každý musí mít vlastní pravidlo životnosti.

Play se spustí a zastaví alespoň dvakrát a chování se porovná s čistým spuštěním buildu.

Podmínky popisuje [Unity: Domain Reload](https://docs.unity3d.com/6000.0/Documentation/Manual/domain-reloading.html).

## Důležité poznámky

Optimalizace editoru nezrychlí automaticky start vydané hry.

Při ladění problému se obnoví výchozí reload nastavení a ověří se, zda chyba nezávisí na předchozím běhu.

Verze editoru a závislostí se přebírá ze stávajícího projektu, ne z označení „nejnovější“ v obecném návodu.
