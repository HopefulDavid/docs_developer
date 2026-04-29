# Unity – Universal Render Pipeline (URP)

> Nastavení URP, globální konfigurace, Volume efekty a optimalizace renderování v Unity.

---

## Co je URP?

Universal Render Pipeline je moderní renderovací pipeline pro Unity zaměřená na výkon napříč různými platformami. Podporuje pokročilé vizuální efekty a optimalizace.

---

## Klíčové komponenty URP

| Komponenta | Popis |
|------------|-------|
| **Default Volume Profile** | Výchozí sada nastavení Volume efektů (Bloom, Chromatic Aberration…). Základ pro post-processing. |
| **UniversalRenderPipelineGlobalSettings** | Globální nastavení platná pro celý projekt – HDR, barevné prostory, globální efekty. |
| **URP Render Pipeline Asset** | Hlavní konfigurace pipeline – kvalita, antialiasing, stíny, optimalizace. Přiřazuje se v Graphics Settings. |
| **URP Renderer Data** | Specifická nastavení pro jednotlivé renderery (Forward Renderer apod.). Různé renderer data pro různé typy objektů. |

---

## Doporučení

- Volume profily upravuj podle vizuálních potřeb konkrétní scény.
- Globální nastavení drž konzistentní pro jednotný vizuální styl napříč projektem.
- URP asset vytvoř a přiřaď v **Project Settings → Graphics**.
- Různé renderer data využij pro speciální vizuální efekty na vybraných objektech.
