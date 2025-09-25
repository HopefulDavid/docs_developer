# 🧰 Unity – UI Toolkit & Tipy

> 🚀 Praktické rady pro práci s UI Toolkit v Unity, jeho výhody, základní principy a moderní patterny.

---

## 🌟 Co je UI Toolkit?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy UI Toolkit</span></summary>

- Moderní systém pro tvorbu UI v Unity.
- Využívá **UXML** (markup) a **USS** (styly podobné CSS).
- Podporuje editor i runtime UI.
- Snadná tvorba responzivních a stylovaných rozhraní.

![](../../images/unity_ui_toolkit_intro.png)

</details>

---

## 🛠️ Jak začít s UI Toolkit?

<details>
<summary><span style="color:#1E90FF;">📦 Základní kroky</span></summary>

1. Vytvoř **UXML** soubor pro strukturu UI.
2. Vytvoř **USS** soubor pro styly.
3. Přidej **UIDocument** komponentu do GameObjectu ve scéně.
4. Propoj soubory v Inspectoru.

![](../../images/unity_ui_toolkit_setup.png)

> 📌 UI Toolkit je vhodný pro editorové nástroje i herní UI.

</details>

---

## 🖼️ UXML & USS – Příklad

<details>
<summary><span style="color:#1E90FF;">📝 Ukázka kódu</span></summary>

**UXML:**
```xml
<engine:UIDocument xmlns:ui="UnityEngine.UIElements" xmlns:uie="UnityEditor.UIElements">
  <ui:Button text="Klikni mě!" />
</engine:UIDocument>
```

**USS:**
```css
Button {
  background-color: #1E90FF;
  color: white;
  font-size: 18px;
  border-radius: 8px;
}
```

> [!TIP]
> UXML definuje strukturu, USS vzhled – podobně jako HTML a CSS.

</details>

---

## 🆕 Novinky & Video

<details>
<summary><span style="color:#1E90FF;">🎬 Co je nového v UI Toolkit?</span></summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/HQ0TmO8ZA4o?si=BMjBISi75KH9qj1I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</details>