# Unity – Kamera & Tipy

> Praktické rady pro nastavení kamery v Unity, rozdíly mezi ortografickou a perspektivní kamerou, a proč používat Pixel Perfect Camera v 2D hrách.

---

## Pixel Perfect Camera

<details>
<summary>Proč ji použít v 2D?</summary>

- Zabrání deformacím a trhání obrazu.
- Zajistí ostré vykreslení pixelové grafiky.
- Doporučeno pro všechny 2D projekty.

> Přidej komponentu **Pixel Perfect Camera** na hlavní kameru v Inspectoru.

</details>

---

## Ortografická Kamera

<details>
<summary>Vlastnosti & použití</summary>

| 🏷️ Vlastnost         | 💡 Popis                                      |
|----------------------|-----------------------------------------------|
| Zobrazení            | Objektivní, bez perspektivního zkreslení      |
| Velikost objektů     | Stejná bez ohledu na vzdálenost               |
| Použití              | 2D hry, izometrie, architektura               |
| Nastavení            | **Orthographic Size** určuje záběr            |
| Linie                | Rovnoběžné linie zůstávají rovnoběžné         |

> Ideální pro 2D projekty!

</details>

---

## Perspektivní Kamera

<details>
<summary>Vlastnosti & použití</summary>

| 🏷️ Vlastnost         | 💡 Popis                                      |
|----------------------|-----------------------------------------------|
| Zobrazení            | Simuluje reálnou perspektivu                  |
| Velikost objektů     | Menší s rostoucí vzdáleností                  |
| Použití              | 3D hry, realistická hloubka                   |
| Nastavení            | **Field of View (FOV)** určuje šířku záběru   |
| Linie                | Rovnoběžné linie se sbíhají do jednoho bodu   |

> Vhodné pro 3D projekty!

</details>

---

## Novinky & Video

<details>
<summary>Co je nového v Unity kamerách?</summary>

<iframe width="560" height="315" src="https://www.youtube.com/embed/OL0bLrb8DV4?si=cYRtPAg8tjvLExw6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</details>
