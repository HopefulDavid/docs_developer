---
description: "Výpočet velikosti záběru a přizpůsobení kamery poměru stran."
---

# Unity: kamera a velikost záběru

Kamera převádí scénu na obraz.

Projekce, rozlišení a vrstvy určují, co hráč skutečně uvidí.

Pro 2D hru často vyhovuje ortografická projekce, ale výběr závisí na zamýšleném obrazu, nikoli jen na typu projektu.

## Ortografická a perspektivní kamera

| Vlastnost | Orthographic | Perspective |
|---|---|---|
| Velikost stejného objektu | Nemění se s jeho vzdáleností od kamery | Se vzdáleností se zmenšuje |
| Hlavní parametr záběru | Orthographic Size | Field of View |
| Typické použití | 2D hra, izometrie, technický pohled | Prostorový pohled, 3D hra |

Ortografická kamera stále používá ořezové roviny a pořadí vykreslení, takže vzdálenost není zcela bez významu.

## Praktické nastavení 2D kamery

Ve výukové scéně v Unity 6 je sprite na `(0, 0, 0)` a kameru na `(0, 0, -10)` s nulovou rotací.

Nastaví se **Projection → Orthographic**, **Size → 5** a ověří se, že Culling Mask obsahuje vrstvu spritu.

`Size = 5` znamená polovinu výšky záběru, tedy deset světových jednotek na výšku.

Při poměru 16:9 je šířka přibližně `10 × 16 / 9 = 17,78` jednotky.

Při změně poměru stran se proto mění viditelná šířka.

Význam parametru definuje [Camera.orthographicSize](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Camera-orthographicSize.html).

## Pixel Perfect Camera

Pixel Perfect Camera je nástroj pro pixel art, kde je důležité konzistentní mapování pixelů grafiky na obrazovku.

Není povinná pro všechny 2D hry a sama neopraví chybný atlas, souběh pohybových skriptů ani nestabilní snímkování.

Před přidáním se ověří podpora komponenty pro použitou renderovací pipeline a verzi balíčku.

**Assets Pixels Per Unit** se sjednotí s importem spritů a referenční rozlišení se nastaví podle výtvarného návrhu, například `320 × 180` pro ukázkovou pixelovou scénu.

Nastavení zvětšování a ořezu se ověří na více poměrech stran podle [návodu 2D Pixel Perfect](https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html).

## Co lze upravit a ověřit

Size nebo FOV se změní podle rozsahu scény a ověří se Game view i samostatný build při cílovém rozlišení.

Při neviditelném objektu se kontroluje Culling Mask, near/far clipping, polohu, Sorting Layer a aktivní kameru.

Neostré sprity a spáry mezi dlaždicemi řeší [diagnostika Unity 2D](2d.md#řešení-chyb-při-vykreslování-spritu).
