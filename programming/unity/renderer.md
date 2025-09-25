# 🖌️ Unity – Universal Render Pipeline (URP) & Tipy

> 🚀 Praktické rady pro nastavení URP, globální konfigurace, Volume efekty a optimalizaci renderování v Unity.

---

## 🌈 Co je Universal Render Pipeline (URP)?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy URP</span></summary>

- Moderní renderovací pipeline pro Unity.
- Vysoký výkon na různých platformách.
- Podpora pokročilých efektů a optimalizací.

![](../../images/unity_urp_intro.png)

</details>

---

## 🧩 Default Volume Profile

<details>
<summary><span style="color:#1E90FF;">✨ Výchozí efekty Volume</span></summary>

- Sada výchozích nastavení pro **Volume efekty**.
- Obsahuje efekty jako **Bloom**, **Chromatic Aberration** a další.
- Slouží jako základní profil pro post-processing.

![](../../images/unity_urp_volume.png)

> 📌 Upravuj Volume profily podle vizuálních potřeb projektu.

</details>

---

## ⚙️ UniversalRenderPipelineGlobalSettings

<details>
<summary><span style="color:#1E90FF;">🌐 Globální nastavení URP</span></summary>

- Určuje chování a vlastnosti URP v projektu.
- Nastavení pro HDR, barevné prostory, globální efekty.
- Ovlivňuje všechny scény v projektu.

![](../../images/unity_urp_global.png)

> 📌 Spravuj globální nastavení pro konzistentní vizuální styl.

</details>

---

## 🗂️ URP Render Pipeline Asset

<details>
<summary><span style="color:#1E90FF;">🛠️ Hlavní konfigurace URP</span></summary>

- Asset pro detailní nastavení render pipeline.
- Nastavení kvality, efektů, optimalizace.
- Konfigurace antialiasingu, stínů, renderování obrazu.

![](../../images/unity_urp_asset.png)

> 📌 Vytvoř a přiřaď URP asset v **Graphics Settings**.

</details>

---

## 🖼️ URP Renderer Data

<details>
<summary><span style="color:#1E90FF;">🎨 Specifická nastavení rendereru</span></summary>

- Konfigurace pro jednotlivé renderery (např. **Forward Renderer**).
- Nastavení stínů, efektů, post-processingu na úrovni rendereru.
- Možnost různých rendererů pro různé typy objektů.

![](../../images/unity_urp_renderer.png)

> 📌 Využij různé renderer data pro specifické vizuální efekty.

</details>