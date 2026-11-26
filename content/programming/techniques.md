---
description: "Organizace vývoje, pojmenování a rozhodování o struktuře kódu."
---

# Vývojové metodiky a konvence

Metodika pomáhá týmu organizovat práci.

Konvence sjednocuje podobu kódu a prototyp ověřuje nápad před větší investicí.

Tyto postupy řeší různé problémy a mohou se používat společně.

## Vývojové metodiky

Nejprve se ujasní, jak často se mění požadavky, kdo rozhoduje o prioritách a podle čeho se pozná hotový výsledek.

| Přístup | Jak funguje | Co vyžaduje v praxi |
|---|---|---|
| Scrum | Tým pracuje za společným cílem ve sprintech dlouhých nejvýše jeden měsíc | Product Ownera, Scrum Mastera, vývojáře, průběžnou kontrolu výsledku a společnou Definition of Done |
| Kanban | Práce prochází viditelným tokem a tým omezuje počet současně rozpracovaných položek | Jasné podmínky přechodu mezi sloupci, WIP limity a sledování doby průchodu |
| Sekvenční plánování | Analýza, návrh, implementace a ověření mají navazující výstupy | Řízení změn a zpětnou vazbu i před závěrečným testováním |

Scrum je jedním z agilních rámců, nikoli synonymem agility.

Daily Scrum slouží vývojářům k úpravě plánu směrem k cíli sprintu, není to povinný reporting vedoucímu.

Sprint Review kontroluje výsledek se zainteresovanými lidmi, retrospektiva zlepšuje způsob spolupráce.

Přesné odpovědnosti a události definuje [Scrum Guide](https://scrumguides.org/scrum-guide.html).

Pevný termín sám o sobě nevylučuje Scrum ani Kanban.

Rozhodující je způsob plánování rozsahu a práce s nejistotou.

## Praktické použití: malá týmová změna

1. Výsledek se popíše z pohledu uživatele, například „objednávku lze vyhledat podle čísla“.
2. Dohodnou se kritéria: oprávněný uživatel najde existující objednávku a pro neexistující číslo dostane srozumitelnou zprávu.
3. Práce se rozdělí na ověřitelné části a zviditelní na tabuli **Připraveno → Rozpracováno → Kontrola → Hotovo**.
4. Pro tříčlenný tým lze zkusit limit dvou rozpracovaných položek, aby někdo mohl pomáhat dokončovat kontrolu.
5. Po dodání se ověří skutečné použití a pravidla se upraví podle zjištěných překážek.

Limit dvě je výchozí experiment pro uvedený tým, nikoli univerzální doporučení.

Hotovo musí zahrnovat potřebné testy, kontrolu a dokumentaci.

Samotné napsání kódu nemusí být dodanou funkcí.

## Rychlé prototypování

Prototyp odpovídá na konkrétní otázku, například zda hráč pochopí ovládání nebo zda zvolená knihovna zvládne požadovaný formát.

Stanoví se otázka, časový limit a měřitelný výsledek, vznikne nejmenší ověřitelná varianta a vyzkouší se s reálným vstupem.

U prototypu hry lze použít jednoduché tvary místo finální grafiky, pokud právě grafika není předmětem ověření.

Před převzetím do produktu se prověří chybové stavy, bezpečnost a údržba.

Rychlý experiment automaticky nesplňuje podmínky produkčního kódu.

## BEM: pojmenování CSS tříd

BEM rozlišuje samostatný **blok**, jeho **prvek** a **modifikátor** vzhledu nebo stavu.

Následující tlačítko má základní třídu i modifikátor, který pouze mění barvu.

```html
<button class="button button--primary" type="button">
  <span class="button__label">Uložit změny</span>
</button>
```

```css
/* Blok vlastní společný vzhled všech tlačítek. */
.button { padding: 0.6rem 1rem; border: 1px solid currentColor; }
/* Prvek patří k bloku button. */
.button__label { font-weight: 600; }
/* Modifikátor se používá společně se základní třídou. */
.button--primary { color: white; background: #175ba5; }
```

Názvy a barvy lze změnit, zachovávají se však vztahy `blok__prvek` a `blok--modifikátor` v HTML i CSS.

BEM nepřidává chování tlačítka ani nenahrazuje sémantické HTML.

Konvenci popisuje [archivovaná dokumentace GetBEM](https://github.com/getbem/getbem.github.io/blob/master/src/pages/naming.mdx).

## Konvence pojmenování v kódu

| Záměr | Příklad | Proč pomáhá |
|---|---|---|
| Popsat účel | `userRepository` místo `ur` | Čtenář nemusí odhadovat zkratku |
| Rozpoznat pravdivostní hodnotu | `isAvailable`, `hasAccess` | Název lze číst jako otázku |
| Vyjádřit činnost | `calculateTotalPrice()` | Je zřejmé, co funkce provádí |
| Rozlišit kolekci | `orders` | Název naznačuje více položek |
| Pojmenovat rozhodnutí | `maxRetries` | Limit má význam a lze jej vysvětlit |

Styl jako `camelCase`, `PascalCase` nebo `snake_case` se přebírá z jazyka a projektu a nahodile se nemíchá.

Důvod netriviálního omezení patří do [komentáře](code-comments.md), samotný název konstanty jej nevysvětlí.
