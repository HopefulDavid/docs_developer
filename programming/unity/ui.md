# 🖥️ Unity – UI systém & Tipy

> 🚀 Praktické rady pro práci s UI v Unity, včetně nastavení tlačítek, detekce kliknutí a užitečných vlastností komponent.

---

## 🧩 Co je UI systém v Unity?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy UI</span></summary>

- Umožňuje vytvářet interaktivní prvky (tlačítka, texty, obrázky).
- Prvky UI jsou spravovány pomocí **Canvas**.
- Podporuje animace, eventy a dynamické změny.

![](../../images/unity_ui_intro.png)

</details>

---

## 🔘 Tlačítko (Button)

<details>
<summary><span style="color:#1E90FF;">🖱️ Vlastnosti tlačítka</span></summary>

- Tlačítko je základní interaktivní prvek UI.
- Lze mu přiřadit akce na kliknutí.
- Podporuje různé vizuální styly a animace.

![](../../images/unity_ui_button.png)

</details>

---

## 🟣 Rozsah detekce kliknutí podle průhlednosti

<details>
<summary><span style="color:#E95A84;">🩸 `alphaHitTestMinimumThreshold`</span></summary>

| 🏷️ Vlastnost                | 💡 Popis                                                                 |
|-----------------------------|--------------------------------------------------------------------------|
| `alphaHitTestMinimumThreshold` | Určuje minimální alfa hodnotu pro detekci kliknutí na obrázek.           |
| Rozsah hodnot                | 0 (klik i na průhledné části) až 1 (jen zcela neprůhledné části)         |
| Použití                      | Ideální pro kruhová nebo nepravidelná tlačítka                           |

> 📌 Nastav hodnotu podle požadované citlivosti na průhlednost.

### Příklad použití v C#:

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ExampleClass : MonoBehaviour
{
    public Image theButton;

    void Start()
    {
        theButton.alphaHitTestMinimumThreshold = 0.5f;
    }
}
```

> [!TIP]
> Vhodné například pro kruhová tlačítka, kde nechceme registrovat kliknutí na průhledné okraje.

</details>