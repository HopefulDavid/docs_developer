---
description: "Hledání a nahrazování podle vzoru, skupiny, více řádků a převod písmen."
---

# JetBrains – hledání a nahrazování pomocí regexu

Regulární výraz, zkráceně regex, popisuje tvar hledaného textu.

Například `TASK-\d+` najde `TASK-7` i `TASK-208`, aniž bys předem znal konkrétní číslo.

## Kdy použít regex

| Potřeba | Vhodný nástroj |
|---|---|
| Najít přesné slovo | Běžné hledání, Regex vypnutý |
| Přepsat opakující se formát textu | Regex a náhled náhrad |
| Přejmenovat třídu, metodu nebo proměnnou i s odkazy | Refactor → Rename |
| Změnit strukturu programu nebo vnořeného dokumentu | Refaktoring, parser nebo strukturální hledání podporované konkrétním IDE |

Hledání v editoru JetBrains používá Java regex; regex v kódu aplikace se dál řídí jazykem aplikace, například .NET v C#. [JetBrains: regex v Rideru](https://www.jetbrains.com/help/rider/Tutorial_Finding_and_Replacing_Text_Using_Regular_Expressions.html)

## Připrav hledání

1. Otevři **Edit → Find → Replace** pro jeden soubor, nebo **Replace in Files** pro více souborů.
2. Pro více souborů nastav **Directory / Scope**, aby se úprava týkala správné části projektu.
3. Podle potřeby omez **File mask**, například `*.cs,*.md`.
4. Zapni **Regex**, tlačítko `.*` u hledání.
5. Rozhodni, zda zapnout **Match Case** pro rozlišení malých a velkých písmen.
6. Zkontroluj náhled a nejprve nahraď jednu shodu.

Maska vybírá soubory, regex hledá jejich obsah; `*.cs` tedy patří do masky, ne do pole regexu.

Před hromadnou náhradou měj přehledný Git stav, abys mohl výsledek zkontrolovat a případně vrátit. [JetBrains: hledání v řešení](https://www.jetbrains.com/help/rider/Finding_and_Replacing_Text_in_Project.html)

## Příklad 1: změnit předponu a zachovat číslo

Vstupní text:

```text
TASK-7: formulář
TASK-208: export
TASK-X: poznámka
```

| Pole | Hodnota |
|---|---|
| Find | `TASK-(\d+)` |
| Replace | `ISSUE-$1` |

Výsledek:

```text
ISSUE-7: formulář
ISSUE-208: export
TASK-X: poznámka
```

- `TASK-` je doslovná část, kterou hledáš.
- `\d` znamená číslici a `+` jednu nebo více číslic.
- `(...)` zachytí text jako skupinu číslo 1.
- `$1` vloží tuto skupinu do náhrady, takže původní číslo zůstane.

Řádek s `X` nevyhovuje číselnému vzoru a nezmění se.

## Příklad 2: změnit pořadí částí

Chceš převést zjednodušené datum `12.09.2026` na `2026-09-12`.

| Pole | Hodnota |
|---|---|
| Find | `(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})` |
| Replace | `${year}-${month}-${day}` |

`{2}` a `{4}` určují přesný počet číslic, `\.` hledá skutečnou tečku a `(?<day>...)` ukládá skupinu pod jménem.

Pojmenované skupiny zjednodušují náhradu, protože nemusíš počítat pořadí závorek.

Tento příklad mění formát, **neověřuje platnost kalendářního data**; odpovídal by mu i text `99.99.2026`.

## Příklad 3: odstranit mezery na konci řádků

| Pole | Hodnota |
|---|---|
| Find | `(?m)\h+$` |
| Replace | Nech prázdné |

`\h+` vybere mezery a tabulátory, `$` konec řádku a `(?m)` zapne zpracování začátků a konců jednotlivých řádků.

Prázdná náhrada nalezený text smaže; samotné konce řádků zůstanou.

Pro tuto úlohu nepoužívej neurčité `\s+`, protože `\s` zahrnuje také konce řádků.

## Přehled: co může být v poli Find

| Zápis | Význam | Příklad |
|---|---|---|
| `.` | Jeden znak kromě konce řádku | `a.c` najde `abc` i `a-c` |
| `\.`, `\+`, `\?`, `\\` | Doslovný speciální znak | `config\.json` |
| `[abc]`, `[0-9]` | Jeden znak ze sady nebo rozsahu | `[ABC]-[0-9]` |
| `[^"]` | Jeden znak kromě uvozovky | `"[^"]*"` pro jednoduchou citovanou hodnotu |
| `\d` / `\D` | Číslice / jiný znak | `\d+` |
| `\s` / `\S` | Bílý / nebílý znak | `\S+` pro úsek bez mezer |
| `\w` / `\W` | Slovní / neslovní znak | Pro česká písmena raději výslovné `\p{L}` |
| `\p{L}`, `\p{N}` | Unicode písmeno nebo číslo | `\p{L}+` najde i `Žluťoučký` |
| `\t`, `\n`, `\R` | Tabulátor, LF, libovolný konec řádku | `\R` zahrne i CRLF |
| `*`, `+`, `?` | Nula a více, jedna a více, nula nebo jedna | `colou?r` najde `color` i `colour` |
| `{n}`, `{n,m}`, `{n,}` | Přesný počet, rozsah, nejméně n | `\d{2,4}` |
| `a\|b` | Jedna z alternativ | `cat\|dog` |
| `(...)`, `(?<name>...)` | Číselná nebo pojmenovaná skupina | `ID=(?<id>\d+)` |
| `(?:...)` | Skupina bez zachycení pro náhradu | `(?:cat\|dog)s?` |
| `\b` | Hranice slova | `\bcat\b` nenajde část `category` |
| `^`, `$` | Začátek a konec; s `(?m)` pro jednotlivé řádky | `(?m)^ERROR.*$` |
| `\A`, `\z` | Začátek a konec celého vstupu | `\A\d+\z` |
| `\1`, `\k<id>` | Znovu stejný text skupiny uvnitř hledání | `(\w+)\h+\1` najde `test test` |

V poli Find se píše přímo regex, bez uvozovek řetězcového literálu a bez jeho dodatečného escapování.

Třídy `\w` a `\d` závisí také na Unicode režimu; pro přesné zadání použij `[0-9]` nebo Unicode kategorie. [Java Pattern](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html)

## Přehled: co může být v poli Replace

| Zápis | Význam | Příklad výsledku |
|---|---|---|
| `$0` | Celá nalezená shoda | `[$0]` obalí shodu hranatými závorkami |
| `$1`, `$2` | Zachycené skupiny podle pořadí | `$2-$1` prohodí dvě skupiny |
| `${id}` | Skupina s daným jménem | `ID: ${id}` |
| `\u$1` / `\l$1` | Velké / malé první písmeno skupiny | `test → Test` / `Test → test` |
| `\U$1\E` / `\L$1\E` | Všechna písmena velká / malá | `test → TEST` / `TEST → test` |
| `\$` | Doslovný dolar | Náhrada měnové zkratky symbolem |
| Prázdná hodnota | Smazání shody | Odstranění koncových mezer |

`\E` ukončuje převod písmen, aby neovlivnil další text; značky pro převod v náhradě jsou schopnost IDE, nikoli univerzální syntaxe všech regex knihoven. [JetBrains: náhrady a převod písmen](https://www.jetbrains.com/help/idea/tutorial-finding-and-replacing-text-using-regular-expressions.html)

## Více řádků, okolí a pokročilé možnosti

- **`(?s)`** dovolí tečce zahrnout konce řádků; například `(?s)BEGIN.*?END` najde jednoduchý blok.
- **`(?i)`** vypne rozlišování velikosti písmen; `(?i:todo)` omezí režim na skupinu.
- **`(?x)`** dovolí mezery a komentáře pro čitelnost vzoru; doslovnou mezeru pak piš například `[ ]`.
- **`(?=...)` / `(?!...)`** ověří následující text; `\d+(?= Kč)` označí číslo, ale ne měnu.
- **`(?<=...)` / `(?<!...)`** ověří předchozí text; `(?<=ID: )\d+` označí jen číslo po `ID: `.
- **`*?` / `+?`** hledají kratší shodu; `".*"` vezme od první po poslední uvozovku na řádku, `".*?"` jednotlivé jednoduché citované úseky.
- **`\Q...\E`** hledá doslovný text uvnitř, například `\Q[a+b]\E`.
- Java podporuje i průnik znakových tříd, atomické skupiny a possessive opakování; používej je až podle přesné potřeby a testu z [úplné reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html).

Regex není obecný parser HTML ani vnořených bloků; náhrady nad strukturou dokumentu vždy omez na tvar, který umíš ověřit.

## Když výsledek neodpovídá očekávání

| Problém | Kontrola |
|---|---|
| Hledá se doslova `\d+` | Je zapnutý Regex? |
| Náhrada nevrací skupinu | V Find použij `\1`, v Replace `$1` |
| Nálezy jsou v jiných souborech | Ověř Scope, Directory a File mask |
| Shoda pohltí příliš mnoho textu | Zpřesni znakové třídy nebo rozsah místo obecného `.*` |
| Vzor překračuje řádek | Ověř `\s` a režim `(?s)` |
| Česká písmena chybí | Použij `\p{L}` a zkontroluj Match Case |

Po nahrazení prohlédni Git diff a spusť odpovídající testy; správně nalezený text ještě neznamená správně změněný program.
