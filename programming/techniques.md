# Vývojové metodiky a konvence

Metodika pomáhá týmu organizovat práci; konvence sjednocuje podobu kódu a prototyp ověřuje nápad před větší investicí.

Tyto postupy řeší různé problémy a mohou se používat společně.

## Vývojové metodiky

Nejprve si ujasni, jak často se mění požadavky, kdo rozhoduje o prioritách a podle čeho poznáte hotový výsledek.

| Přístup | Jak funguje | Co vyžaduje v praxi |
|---|---|---|
| Scrum | Tým pracuje za společným cílem ve sprintech dlouhých nejvýše jeden měsíc | Product Ownera, Scrum Mastera, vývojáře, průběžnou kontrolu výsledku a společnou Definition of Done |
| Kanban | Práce prochází viditelným tokem a tým omezuje počet současně rozpracovaných položek | Jasné podmínky přechodu mezi sloupci, WIP limity a sledování doby průchodu |
| Sekvenční plánování | Analýza, návrh, implementace a ověření mají navazující výstupy | Řízení změn a zpětnou vazbu i před závěrečným testováním |

Scrum je jedním z agilních rámců, nikoli synonymem agility.

Daily Scrum slouží vývojářům k úpravě plánu směrem k cíli sprintu, není to povinný reporting vedoucímu.

Sprint Review kontroluje výsledek se zainteresovanými lidmi, retrospektiva zlepšuje způsob spolupráce.

Přesné odpovědnosti a události definuje [Scrum Guide](https://scrumguides.org/scrum-guide.html).

Pevný termín sám o sobě nevylučuje Scrum ani Kanban; rozhodující je způsob plánování rozsahu a práce s nejistotou.

## Praktické použití: malá týmová změna

1. Popiš výsledek z pohledu uživatele, například „objednávku lze vyhledat podle čísla“.
2. Dohodni kritéria: oprávněný uživatel najde existující objednávku a pro neexistující číslo dostane srozumitelnou zprávu.
3. Rozděl práci na ověřitelné části a zviditelni ji na tabuli **Připraveno → Rozpracováno → Kontrola → Hotovo**.
4. Pro tříčlenný tým lze zkusit limit dvou rozpracovaných položek, aby někdo mohl pomáhat dokončovat kontrolu.
5. Po dodání ověř skutečné použití a uprav pravidla podle zjištěných překážek.

Limit dvě je výchozí experiment pro uvedený tým, nikoli univerzální doporučení.

Hotovo musí zahrnovat potřebné testy, kontrolu a dokumentaci; samotné napsání kódu nemusí být dodanou funkcí.

## Rychlé prototypování

Prototyp odpovídá na konkrétní otázku, například zda hráč pochopí ovládání nebo zda zvolená knihovna zvládne požadovaný formát.

Stanov otázku, časový limit a měřitelný výsledek, vytvoř nejmenší ověřitelnou variantu a vyzkoušej ji s reálným vstupem.

U prototypu hry lze použít jednoduché tvary místo finální grafiky, pokud právě grafika není předmětem ověření.

Před převzetím do produktu prověř chybové stavy, bezpečnost a údržbu; rychlý experiment automaticky nesplňuje podmínky produkčního kódu.

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

Názvy a barvy můžeš změnit, zachovej však vztahy `blok__prvek` a `blok--modifikátor` v HTML i CSS.

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

Styl jako `camelCase`, `PascalCase` nebo `snake_case` přebírej z jazyka a projektu, nemíchej je nahodile.

Důvod netriviálního omezení patří do [komentáře](code-comments.md), samotný název konstanty jej nevysvětlí.
