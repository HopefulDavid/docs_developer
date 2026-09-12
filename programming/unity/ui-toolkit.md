---
description: "Propojení UXML, stylů USS a reakcí na události v C#."
---

# Unity: UI Toolkit od UXML ke kliknutí

UI Toolkit vytváří rozhraní jako strom prvků, který popisuje UXML, styluje USS a ovládá C#.

Používá se pro editorové nástroje i runtime rozhraní; tento návod ukazuje runtime tlačítko v Unity 6.

## Jak spolu části souvisejí

| Část | Úloha |
|---|---|
| UXML | Definuje prvky a jejich názvy |
| USS | Určuje rozměry, barvy a rozložení |
| UIDocument | Připojí dokument ke scéně |
| Panel Settings | Řídí vykreslení a škálování panelu |
| C# komponenta | Najde prvek a reaguje na jeho události |

USS se podobá CSS, ale nepodporuje automaticky všechny webové vlastnosti.

## Před použitím

Vytvoř složku `Assets/UI` a ulož do ní oba následující soubory se stejnými názvy.

Ukázka používá pouze runtime namespace `UnityEngine.UIElements`; prvky z `UnityEditor` do výsledné hry nepatří.

## UXML a USS

Soubor `Menu.uxml` načítá styl relativně ke svému umístění.

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements">
  <Style src="Menu.uss" />
  <ui:VisualElement class="menu">
    <ui:Label name="status" text="Připraveno" />
    <ui:Button name="start-button" text="Spustit" />
  </ui:VisualElement>
</ui:UXML>
```

`name` slouží k vyhledání konkrétního prvku v C#, `class` ke společnému stylování.

Soubor `Menu.uss` zarovná obsah do středu a nastaví čitelné tlačítko.

```css
.menu {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background-color: rgb(24, 30, 40);
    color: white;
}
#start-button {
    min-width: 160px;
    height: 44px;
    margin-top: 12px;
    background-color: rgb(30, 90, 160);
    color: white;
    font-size: 18px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
```

Rozměry a barvy jsou výchozí vzhled ukázky, zatímco selektor `#start-button` musí odpovídat názvu v UXML.

## Propojení s C# a scénou

Ulož následující komponentu jako `MenuController.cs`.

```csharp
using UnityEngine;
using UnityEngine.UIElements;

/// <summary>Propojuje runtime UXML menu s akcí tlačítka.</summary>
[RequireComponent(typeof(UIDocument))]
public class MenuController : MonoBehaviour
{
    private Button startButton;
    private Label status;

    private void OnEnable()
    {
        var root = GetComponent<UIDocument>().rootVisualElement;
        startButton = root.Q<Button>("start-button");
        status = root.Q<Label>("status");
        if (startButton == null || status == null)
        {
            Debug.LogError("Menu.uxml nemá očekávané prvky.", this);
            return;
        }
        startButton.clicked += HandleStart;
    }

    private void OnDisable()
    {
        // Odhlášení zabrání opakovaným odběrům při opětovné aktivaci objektu.
        if (startButton != null) startButton.clicked -= HandleStart;
    }

    private void HandleStart() => status.text = "Tlačítko funguje";
}
```

1. Vytvoř **Panel Settings** přes **Assets → Create → UI Toolkit**.
2. Přidej do scény GameObject s **UIDocument** a přiřaď `Menu.uxml` do **Source Asset** i vytvořený Panel Settings.
3. Na stejný objekt přidej `MenuController`.
4. Spusť Play a klikni na tlačítko; popisek se musí změnit na „Tlačítko funguje“.

## Co lze upravit a ověřit

Obsluhu `HandleStart` nahraď akcí aplikace; při přejmenování prvků uprav UXML i řetězce v `Q`.

V Panel Settings zvol škálování podle cílového rozlišení a ověř Game view v úzkém i širokém poměru stran.

Pokud rozhraní chybí, zkontroluj přiřazení dokumentu, aktivitu GameObjectu, Panel Settings a chyby importu UXML v konzoli.

Princip runtime dokumentu popisuje [oficiální návod UI Toolkit](https://docs.unity3d.com/6000.0/Documentation/Manual/UIE-HowTo-CreateRuntimeUI.html).

Pro rozhraní založené na Canvas pokračuj na [Unity UI](ui.md).
