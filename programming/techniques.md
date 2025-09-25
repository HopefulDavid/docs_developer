# 🧑‍💻 Vývojové metodiky & Konvence pojmenování

> 🚀 Praktické rady pro vývoj softwaru, metodiky řízení projektů, rychlé prototypování a pojmenování v kódu.

---

## 🗂️ Vývojové metodiky

<details>
<summary><span style="color:#1E90FF;">⚡ Agilní metodika (Scrum)</span></summary>

- Zaměření na spolupráci, zákaznickou spokojenost a rychlou reakci na změny.
- Práce v krátkých iteracích – **sprinty** (2-4 týdny).
- Průběžné testování a zpětná vazba.

> [!WARNING]
> Nevhodné pro projekty s pevným plánem a jasně definovanými výstupy.

**Kroky Scrum:**
<details>
<summary><span style="color:#E95A84;">📝 Plánování sprintu</span></summary>
Tým vybírá úkoly z backlogu a plánuje jejich provedení.
</details>
<details>
<summary><span style="color:#E95A84;">💻 Vývoj & Daily Scrum</span></summary>
Denní schůzky, průběžné testování, řešení překážek.
</details>
<details>
<summary><span style="color:#E95A84;">🔍 Revize sprintu</span></summary>
Prezentace výsledků zákazníkovi, získání zpětné vazby.
</details>
<details>
<summary><span style="color:#E95A84;">🔄 Retrospektiva</span></summary>
Zhodnocení procesu, návrhy na zlepšení.
</details>
</details>

<details>
<summary><span style="color:#1E90FF;">💧 Vodopádová metodika</span></summary>

- Postupné dokončování fází: analýza, návrh, implementace, testování, nasazení, údržba.
- Každá fáze musí být dokončena před začátkem další.

> [!WARNING]
> Délka fází závisí na velikosti projektu a týmu.

**Kroky Vodopádu:**
<details>
<summary><span style="color:#E95A84;">🔎 Analýza požadavků</span></summary>
Shromažďování a analýza potřeb zákazníka.
</details>
<details>
<summary><span style="color:#E95A84;">📝 Návrh</span></summary>
Plánování struktury a funkcí systému.
</details>
<details>
<summary><span style="color:#E95A84;">💻 Implementace</span></summary>
Převod návrhu do zdrojového kódu.
</details>
<details>
<summary><span style="color:#E95A84;">🧪 Testování</span></summary>
Ověření funkčnosti a hledání chyb.
</details>
<details>
<summary><span style="color:#E95A84;">🚀 Nasazení</span></summary>
Přechod do produkčního prostředí.
</details>
<details>
<summary><span style="color:#E95A84;">🔧 Údržba</span></summary>
Opravy, vylepšení, sledování výkonu.
</details>
</details>

<details>
<summary><span style="color:#1E90FF;">🗃️ Kanban</span></summary>

- Vizuální řízení práce pomocí tabule a karet.
- Průběžná dodávka, omezení práce v průběhu (WIP).

> [!WARNING]
> Nevhodné pro projekty s pevnými termíny.

**Kroky Kanban:**
<details>
<summary><span style="color:#1E90FF;">📝 Definování úkolů</span></summary>
Seznam úkolů na kartách.
</details>
<details>
<summary><span style="color:#1E90FF;">📊 Vizualizace práce</span></summary>
Tabule rozdělená na sloupce (Backlog, Todo, Done...).
</details>
<details>
<summary><span style="color:#1E90FF;">💻 Práce na úkolech</span></summary>
Přesouvání karet podle stavu.
</details>
<details>
<summary><span style="color:#1E90FF;">🔄 Omezení WIP</span></summary>
Omezení počtu rozpracovaných úkolů.
</details>
<details>
<summary><span style="color:#1E90FF;">📈 Průběžné zlepšování</span></summary>
Pravidelné hodnocení procesu a úpravy.
</details>
</details>

---

## 🚀 Rychlé prototypování

<details>
<summary><span style="color:#1E90FF;">🧩 Postup prototypování</span></summary>

1. **Definice konceptu** – jasná představa, klíčové mechaniky a cíle.
2. **Vytvoření základní scény** – např. v Unity.
3. **Přidání objektů** – krychle, koule, válce pro reprezentaci prvků.
4. **Implementace mechanik** – skriptování, základní funkce.
5. **Testování & iterace** – získání zpětné vazby, úpravy.
6. **Opakování cyklu** – iterativní vylepšování.

> [!IMPORTANT]
> Cílem je funkční model, ne dokonalý produkt. Rychlost a zpětná vazba jsou klíčové.

</details>

---

## 🏷️ Pojmenování BEM & Konvence v kódu

<details>
<summary><span style="color:#1E90FF;">🧩 BEM metodika</span></summary>

- **BEM = Block Element Modifier** – strukturované pojmenování tříd v HTML/CSS.

```html
<div class="block">
  <div class="block__element"></div>
  <div class="block__element--modifier"></div>
</div>
```
```css
.block { ... }
.block__element { ... }
.block__element--modifier { ... }
```

| Typ         | Popis                                      |
|-------------|--------------------------------------------|
| Block       | Samostatná entita (např. `header`, `menu`) |
| Element     | Část bloku (`menu item`, `list item`)      |
| Modifier    | Varianta bloku/prvku (`disabled`, `checked`)|

- Blok/element: `__`, modifikátor: `--`
</details>

<details>
<summary><span style="color:#1E90FF;">📝 Konvence pojmenování v kódu</span></summary>

<details>
<summary><span style="color:#E95A84;">🔤 Jasné názvy</span></summary>
Používejte popisné názvy, vyhněte se zkratkám.
</details>
<details>
<summary><span style="color:#E95A84;">🔒 Boolovské proměnné</span></summary>
Začínejte předponou: `is`, `has`, `can` (např. `isAvailable`).
</details>
<details>
<summary><span style="color:#E95A84;">⚡ Názvy funkcí</span></summary>
Začínejte slovesem: `getUserName()`, `calculateTotalPrice()`.
</details>
<details>
<summary><span style="color:#E95A84;">🔗 Konzistentní styl</span></summary>
Dodržujte jednotný styl (např. `camelCase`).
</details>
<details>
<summary><span style="color:#E95A84;">📚 Plurál pro kolekce</span></summary>
Používejte množné číslo pro pole: `users`, `products`.
</details>
<details>
<summary><span style="color:#E95A84;">🔢 Konstanty pro magické hodnoty</span></summary>
Nahraďte magické hodnoty pojmenovanými konstantami.
</details>
</details>