## Vývojové metodiky

Techniky vývoje softwaru jsou postupy, které určují, jakým způsobem se vyvíjí software.

<details>
<summary><span style="color:#1E90FF;">Agilní metodika (Scrum)</span></summary>

> [!WARNING]
> Není vhodná pro projekty, které vyžadují pevný plán a jasně definované výstupy.

- Zaměřuje se na spolupráci, zákaznickou spokojenost a schopnost reagovat na změny.

- V praxi tým pracuje v krátkých iteracích zvaných `sprinty`, které trvají obvykle **2-4 týdny**.

  > [!NOTE]
  > Na konci každého sprintu tým prezentuje hotové funkce zákazníkovi a získává zpětnou vazbu.


- Podrobný postup:

  <details>

  <summary><span style="color:#E95A84;">Plánování sprintu (Sprint Planning)</span></summary>

  Týmová schůzka na začátku sprintu, která se koná jednou.

  Výběr úkolů (z backlogu) pro daný sprint k provedení.

  Diskutování o tom, jak budou tyto úkoly provedeny.

  </details>

  <details>

  <summary><span style="color:#E95A84;">Vývoj</span></summary>

  Každodenní práce na úkolech, které byly vybrány během plánování sprintu.

  Každodenní týmová schůzka zvaná: `Daily Scrum`, kde se diskutuje o pokroku a případných překážkách na úkolech.

  Testování je součástí této sekce vývoje.

  > [!NOTE]
  > Jakmile je úkol nebo funkce vyvinuta, je ihned testována, aby se zajistilo, že funguje správně a splňuje požadavky.
  >
  > Toto průběžné testování umožňuje rychlé odhalení a opravu chyb.

  </details>

  <details>

  <summary><span style="color:#E95A84;">Revize sprintu (Sprint Review)</span></summary>

  Týmová schůzka na konci sprintu, která se koná jednou.

  Prezentuje se práce zákazníkovi a získává se zpětná vazba.

  > [!TIP]
  > Tato schůzka je také příležitostí k diskusi o tom, co se v sprintu povedlo a co ne.

  </details>

  <details>

  <summary><span style="color:#E95A84;">Retrospektiva sprintu (Sprint Retrospective)</span></summary>

  Týmová schůzka obvykle hned po revizi sprintu.

  Diskutuje se o tom, co se v průběhu sprintu povedlo, co se nepovedlo a jak se mohou věci zlepšit v dalším sprintu.

</details>

<details>
<summary><span style="color:#1E90FF;">Vodopádová metodika</span></summary>

> [!WARNING]
> Délka každé fáze závisí na velikosti a složitosti projektu, počtu lidí v týmu a mnoha dalších faktorech.

Každá fáze musí být dokončena, než může začít další.

- Podrobný postup:

  <details>
  <summary><span style="color:#E95A84;">Analýza požadavků</span></summary>

  Na začátku projektu se shromažďují a analyzují požadavky.

  > [!NOTE]
  > Toto zahrnuje porozumění potřebám zákazníka a definování, co bude systém dělat.

  </details>

  <details>
  <summary><span style="color:#E95A84;">Návrh</span></summary>

  Vytváří se podrobný plán toho, jak bude systém fungovat a jak bude vypadat.

  </details>

  <details>
  <summary><span style="color:#E95A84;">Implementace</span></summary>

  Návrh se převede na zdrojový kód.

  Programátoři píší kód, který realizuje návrh systému.

    </details>

    <details>
    <summary><span style="color:#E95A84;">Testování</span></summary>

  Kontroluje se, zda systém splňuje požadavky definované v první fázi a zda neobsahuje chyby.

    </details>

    <details>
    <summary><span style="color:#E95A84;">Nasazení</span></summary>

  Jakmile je systém otestován a schválen, je nasazen do produkčního prostředí.

  </details>

  <details>
  <summary><span style="color:#E95A84;">Údržba</span></summary>

  Sleduje se výkon systému, opravují se chyby a přidávají se nové funkce podle potřeb zákazníka.

  </details>

</details>

<details>

<summary><span style="color:#1E90FF;">Kanban</span></summary>

Vizuální systém řízení práce, který se zaměřuje na dokončení úkolů.

> [!WARNING]
> Není vhodný pro projekty, které vyžadují pevné plány a termíny

> [!NOTE]
> Zaměřuje se na průběžnou dodávku a minimalizaci času stráveného na úkolech.

- Podrobný postup:

  <details>
  <summary><span style="color:#1E90FF;">Definování úkolů</span></summary>

  Na začátku se vytvoří seznam úkolů, které je třeba dokončit.

  > [!TIP]
  > Tyto úkoly se zapisují na karty, které se umístí na Kanban tabuli.

  </details>

  <details>
  <summary><span style="color:#1E90FF;">Vizualizace práce</span></summary>

  Kanban tabule je rozdělena na několik sloupců, které reprezentují různé stavy úkolu.

  > [!TIP]
  > Například: `Backlog`, `Todo`, `Done`, atd...

  Karty s úkoly se přesouvají mezi těmito sloupci podle toho, v jakém stavu se nacházejí.

  </details>

  <details>
  <summary><span style="color:#1E90FF;">Práce na úkolech</span></summary>

  Tým začne pracovat na úkolech, začínajíc u těch, které jsou nejvíce prioritní.

  > [!NOTE]
  > Jakmile je úkol dokončen, karta se přesune do dalšího sloupce.
  >
  > Například sloupec: `Done`

  </details>

  <details>
  <summary><span style="color:#1E90FF;">Omezení práce v průběhu (Work in Progress, WIP)</span></summary>

  Kanban klade důraz na omezení množství práce, která se může dělat současně.

  > [!NOTE]
  > Zvyšuje se efektivita a snižuje se doba, kterou úkol stráví v systému.

  </details>

  <details>
  <summary><span style="color:#1E90FF;">Průběžné zlepšování</span></summary>

  Tým pravidelně hodnotí svůj proces a hledá způsoby, jak ho zlepšit.

  > [!TIP]
  > To může zahrnovat změnu počtu úkolů, prioratizaci úkolů atd...

  </details>

</details>

</details>

## Rychlé prototypování

Proces pro vytvoření funkčního modelu projektu co nejrychleji, aby bylo možné testovat a iterovat nápady.

> [!NOTE]
> V kontextu Unity to znamená vytvoření základní verze hry nebo aplikace, která zahrnuje pouze klíčové mechaniky a
> funkce.

<details>
<summary><span style="color:#1E90FF;">Rychlá iterace</span></summary>

- Rychle testovat a provádět nápady.
- Pokud vytvoříte prototyp, zkuste ho co nejdříve otestovat a získat zpětnou vazbu.
- Poté můžete na základě této zpětné vazby upravit a vylepšit svůj prototyp.

> [!IMPORTANT]
> **Cílem je vytvořit funkční model** vašeho projektu, **ne dokonalý produkt**.
> Nebojte se udělat kompromisy v kvalitě, pokud to znamená, že můžete rychleji testovat a iterovat své nápady.

</details>

<details>
<summary><span style="color:#1E90FF;">Postup</span></summary>

1. **Definice konceptu**

   Než se začne s prototypováním, měli byste mít jasnou představu o tom, co chcete vytvořit.

   > [!TIP]
   > To může zahrnovat definování klíčových mechanik, funkcí a cílů vašeho projektu.

2. **Vytvoření základní scény v Unity**

   > [!TIP]
   > Tato scéna bude sloužit jako základ pro váš prototyp.

3. **Přidání základních objektů**

   Přidejte do scény základní objekty, jako jsou krychle, koule a válce, které můžete použít k reprezentaci různých
   prvků ve vaší hře.

4. **Přidání mechanik a funkcí**

   Použijte skriptování a vestavěné nástroje Unity k přidání mechanik a funkcí do vašeho prototypu.

5. **Testování a iterace**

   Jakmile máte základní prototyp, začněte ho testovat.

   > [!NOTE]
   > Získejte zpětnou vazbu od ostatních a na základě této zpětné vazby upravte a vylepšujte svůj prototyp.

6. **Opakování procesu**

   Po provedení změn na svém prototypu ho znovu otestujte a pokračujte v tomto cyklu, dokud nejste spokojeni s
   výsledkem.

   > [!TIP]
   > Rychlé prototypování je iterativní proces.

</details>

## Pojmenování BEM

BEM = "Block Element Modifier"

Metodika pro pojmenování tříd v `HTML` a `CSS`.

> [!NOTE]
> Pomáhá udržet váš kód organizovaný a snadno pochopitelný, a to i pro ostatní vývojáře, kteří se na váš kód podívají.

Příklad:

```html
<div class="block"> <!-- Block -->
  <div class="block__element"> <!-- Element -->
  </div>
  <div class="block__element--modifier"> <!-- Element with modifier -->
  </div>
</div>
```

```css
.block { ... }
.block__element { ... }
.block__element--modifier { ... }
```

<details>
<summary><span style="color:#1E90FF;">Block</span></summary>

Jedná se o samostatnou entitu, která má smysl sama o sobě.

Například: `header`, `container`, `menu`, `checkbox`, atd.

</details>

<details>
<summary><span style="color:#1E90FF;">Element</span></summary>

Část bloku, která nemá samostatný význam.

Je semanticky vázána na svůj blok.

Například: `menu item`, `list item`, `checkbox caption`, atd.

</details>

<details>
<summary><span style="color:#1E90FF;">Modifier</span></summary>

Varianta bloku nebo prvku, která mění vzhled nebo chování.

Například: `disabled`, `highlighted`, `checked`, atd.

</details>

<details>
<summary><span style="color:#1E90FF;">Syntax BEM</span></summary>

Názvy bloků a elementů jsou odděleny dvěma podtržítky: **`__`**

Názvy modifikátorů jsou odděleny dvěma pomlčkami: **`--`**

</details>

<details>
<summary><span style="color:#1E90FF;">Použití v kódu</span></summary>

<details>
<summary><span style="color:#E95A84;">Jasné a popisné názvy</span></summary>

Názvy proměnných, funkcí, tříd atd. by měly být dostatečně popisné, aby bylo jasné, co dělají nebo co reprezentují.

Například:

Místo: `p`, **použijte: `product`**

místo: `calc`, **použijte: `calculateAverage`**.

> [!TIP]
> Vyhněte se používání zkratek a akronymů.

</details>

<details>
<summary><span style="color:#E95A84;">Boolovské proměnné</span></summary>

Boolovské proměnné by měly začínat předponou jako: `is`, `has`, `can` atd., které naznačují, že hodnota může být
pravdivá nebo nepravdivá.

Například: `isAvailable`, `hasPermission`, `canExecute`.

</details>

<details>
<summary><span style="color:#E95A84;">Názvy funkcí</span></summary>

Funkce by měly začínat slovesem, které popisuje, co funkce dělá.

Například: `getUserName()`, `calculateTotalPrice()`, `printReport()`.

</details>

<details>
<summary><span style="color:#E95A84;">Konzistentní názvosloví</span></summary>

Pokud se rozhodnete pro určitý styl názvosloví, buďte konzistentní v jeho používání po celém kódu.

Například: pokud používáte `camelCase` pro názvy proměnných, používejte je všude.

</details>

<details>
<summary><span style="color:#E95A84;">Jednotné názvy pro stejné typy proměnných</span></summary>

Pokud máte více polí.

Například:`firstArray`, `secondArray`.

</details>

<details>
<summary><span style="color:#E95A84;">Množné čísla (plurál) pro kolekce</span></summary>

Pokud proměnná reprezentuje kolekci objektů, použijte množné číslo.

Například:`users`, `products`, `items`.

</details>

<details>
<summary><span style="color:#E95A84;">Konstanty pro "magické" hodnoty</span></summary>

Pokud kód obsahuje "magické" hodnoty, které nejsou okamžitě zřejmé, zvažte jejich nahrazení pojmenovanými konstantami.

Například: místo: `if (status == 1)`, **použijte: `if (status == STATUS_ACTIVE)`**.

</details>
</details>