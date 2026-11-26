---
description: "Nastavení Canvasu a omezení klikání podle průhlednosti tlačítka."
---

# Unity UI: Canvas a tvar klikacího tlačítka

Unity UI neboli uGUI používá GameObjecty s komponentami, například Canvas, Image a Button.

Je odlišný od [UI Toolkitu](ui-toolkit.md), takže jeho komponenty a události nelze zaměňovat.

## Jak funguje kliknutí

Canvas vykresluje grafické prvky, Graphic Raycaster vyhledává zásahy a EventSystem s vhodným vstupním modulem předává události.

Button musí být interaktivní a jeho grafika musí přijímat raycasty.

## Před použitím

V projektu Unity 6 s Unity UI vznikne tlačítko přes **GameObject → UI → Button** a ověří se Canvas, Graphic Raycaster a EventSystem.

Vstupní modul musí odpovídat používanému Input Systemu projektu.

Nejprve se ověří běžné obdélníkové tlačítko, teprve potom následuje test průhlednosti.

## Rozsah detekce kliknutí podle průhlednosti

`Image.alphaHitTestMinimumThreshold` odmítá pixel spritu, jehož alfa je menší než zadaný práh.

Hodnota `0` ponechá obdélníkový zásah a například `0.5` vyžaduje alespoň poloviční krytí pixelu.

V importu textury se zapne **Read/Write**, přiřadí se sprite s průhlednými okraji a pro tuto ukázku se vynechá ze Sprite Atlasu.

Čtení pixelů může zvýšit paměťové nároky.

Alfa barvy komponenty `Image.color` se při tomto testu nepoužívá.

Komponenta `AlphaHitButton.cs` se přidá přímo na objekt s Image tlačítka.

```csharp
using UnityEngine;
using UnityEngine.UI;

/// <summary>Nastavuje klikací oblast Image podle průhlednosti spritu.</summary>
[RequireComponent(typeof(Image))]
public class AlphaHitButton : MonoBehaviour
{
    [SerializeField, Range(0f, 1f)] private float threshold = 0.5f;

    private void Awake()
    {
        // Práh ovlivní test pixelů spritu, nikoli jeho vykreslenou průhlednost.
        GetComponent<Image>().alphaHitTestMinimumThreshold = threshold;
    }
}
```

## Ověření výsledku

Tlačítko dostane viditelnou akci přes **On Click** a po spuštění Play se vyzkouší neprůhledný střed i průhledný roh.

Střed má akci vyvolat a průhledný roh ji vyvolat nemá.

Pokud roh dál reaguje, vypne se **Raycast Target** na dekorativním textu nebo jiných překrývajících grafikách a zkontroluje se, který prvek zásah skutečně přijímá.

## Co lze upravit

`threshold` se mění v Inspectoru podle okrajů spritu, ale ovládací plocha musí zůstat dostatečně velká pro dotyk.

Práh neovlivňuje aktivaci tlačítka klávesnicí nebo gamepadem.

Ověřuje se i tato cesta.

Podmínky čitelnosti textury popisuje [API Image](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/api/UnityEngine.UI.Image.html#UnityEngine_UI_Image_alphaHitTestMinimumThreshold).
