---
description: "Sdílená konfigurační data oddělená od běhového stavu objektů."
---

# Unity: sdílená konfigurace se ScriptableObject

ScriptableObject je Unity objekt, který může existovat jako asset nezávislý na konkrétní scéně.

Umožňuje například více nepřátelům sdílet definici vlastností bez kopírování stejných hodnot do každého prefabu.

## Jak funguje a co připravit

C# třída definuje pole, asset uchovává jejich hodnoty a komponenta ve scéně dostane odkaz na asset přes Inspector.

Následující příklad je určený pro Unity 6 a odděluje výchozí konfiguraci od měnícího se zdraví konkrétní postavy.

## Vytvoření konfigurace

Ulož soubor `EnemyConfig.cs`.

```csharp
using UnityEngine;

/// <summary>Sdílená výchozí konfigurace nepřítele.</summary>
[CreateAssetMenu(fileName = "EnemyConfig", menuName = "Game/Enemy Config")]
public class EnemyConfig : ScriptableObject
{
    [SerializeField, Min(1)] private int maxHealth = 100;
    /// <summary>Výchozí maximum zdraví pro novou postavu.</summary>
    public int MaxHealth => maxHealth;
}
```

`CreateAssetMenu` přidá položku **Assets → Create → Game → Enemy Config** a `SerializeField` zpřístupní hodnotu v Inspectoru i při soukromém poli.

`100` je výchozí herní hodnota ukázky a můžeš ji pro každý vytvořený asset změnit.

## Praktické použití ve scéně

Ulož `EnemyHealth.cs`, přidej jej na postavu a do **Config** přetáhni vytvořený asset.

```csharp
using UnityEngine;

/// <summary>Uchovává zdraví jedné postavy odděleně od sdílené konfigurace.</summary>
public class EnemyHealth : MonoBehaviour
{
    [SerializeField] private EnemyConfig config;
    private int currentHealth;

    private void Start()
    {
        if (config == null)
        {
            Debug.LogError("Chybí EnemyConfig.", this);
            enabled = false;
            return;
        }
        // Každá postava má vlastní stav, sdílený asset se při zásahu nemění.
        currentHealth = config.MaxHealth;
        Debug.Log($"Počáteční zdraví: {currentHealth}", this);
    }
}
```

Vytvoř dvě postavy se stejným assetem a ověř, že obě přečtou stejné maximum.

Další logika poškození má měnit `currentHealth` příslušné komponenty, nikoli sdílený `maxHealth`.

## Ukládání a obnovení dat

V editoru se assety ukládají na disk a změny assetu během Play mohou přetrvat i po jeho ukončení.

Ve vydané aplikaci nelze používat editorové ukládání assetů jako systém pro uložení postupu hráče.

Pro save data navrhni samostatný formát a úložiště, například soubor v `Application.persistentDataPath`; citlivé údaje nepatří do nechráněného PlayerPrefs.

Rozdíl editoru a buildu popisuje [Unity: ScriptableObject](https://docs.unity3d.com/6000.0/Documentation/Manual/class-ScriptableObject.html).

## Co lze upravit

Přidej konfigurační pole pro rychlost nebo vzhled a pojmenuj assety podle domény, například `EnemyConfig_Boss`.

Sdílený odkaz není automaticky Singleton a obvykle není potřeba zavádět skryté globální vyhledávání assetu.

Pokud potřebuješ měnit celou konfiguraci za běhu, vytvoř vlastní runtime kopii a výslovně urči její životnost.
