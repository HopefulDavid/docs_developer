---
description: "Porovnání verzí, historie souboru a nalezení commitu, který zavedl chybu."
---

# Git – čtení historie a hledání chyby

Historie pomáhá zjistit, proč se kód změnil a který uložený stav ještě fungoval.

Než začneš historii opravovat, nejprve prohlédni konkrétní rozdíl.

## Základní reference

| Syntaxe | Co zobrazí |
|---|---|
| `git log --oneline --graph --all [-<počet>]` | Stručnou návaznost všech místních referencí |
| `git show <commit>` | Zprávu a změnu konkrétního commitu |
| `git diff <starší-stav> <novější-stav> [-- <cesta>]` | Rozdíl konečného obsahu dvou stavů |
| `git log --follow -- <soubor>` | Historii jednoho souboru s pokusem sledovat přejmenování |
| `git blame -L <od-řádku>,<do-řádku> -- <soubor>` | Poslední zaznamenanou změnu jednotlivých řádků |
| `git log -S "<text>" -- <cesta>` | Commity, které změnily počet výskytů daného textu |

Blame pomáhá dohledat kontext; autor poslední úpravy řádku nemusí být původcem chyby.

## Jak označit verzi

| Zápis | Význam |
|---|---|
| `HEAD` | Aktuální commit |
| `HEAD~1` | Jeho první rodič |
| `HEAD~3` | Třetí předek po prvních rodičích, nikoli „poslední tři libovolné řádky logu“ |
| `<hash>` | Konkrétní ID z logu |
| `v1.0.0` | Tag s tímto názvem, pokud existuje |
| `main..feature/hledani` v logu | Commity dosažitelné z pracovní větve a nedosažitelné z main |

U merge existuje více rodičů; `HEAD^2` označuje druhého rodiče, zatímco `HEAD~2` postupuje dvakrát po prvním.

Příklad v PowerShellu i Bashi:

```bash
git log --oneline -- README.md
git diff HEAD~1 HEAD -- README.md
```

Výpis historie pomůže vybrat skutečný commit; druhý příkaz vyžaduje alespoň dva commity a porovná poslední změnu souboru vůči předchozímu stavu celé větve.

## Bisect: najdi první vadný commit

Bisect postupně vybírá verze mezi známým funkčním a nefunkčním stavem, aby zúžil místo vzniku chyby.

Předpokladem je opakovatelná zkouška, čistý pracovní strom a možnost spustit také starší verze projektu.

Na současné vadné verzi například:

```bash
git bisect start
git bisect bad
git bisect good v1.0.0
```

`v1.0.0` musí být existující ověřená funkční verze; nahraď ji konkrétním dobrým commitem nebo tagem svého projektu.

Git vybere prostřední commit a změní pracovní soubory, proto během hledání nevyvíjej novou funkci.

1. Obnov závislosti odpovídající právě vybrané verzi.
2. Spusť stejný test chyby.
3. Označ výsledek `git bisect good` nebo `git bisect bad`.
4. Pokud tuto verzi vůbec nelze vyzkoušet, použij `git bisect skip`.
5. Opakuj, dokud Git neurčí první vadný commit nebo interval, který kvůli přeskočeným verzím nejde zúžit.

Po zapsání výsledku se vrať na původní stav:

```bash
git bisect reset
```

Ani nalezení commitu samo neopraví chybu; zobraz jeho diff, pochop příčinu a vytvoř běžný opravný commit.

Pro automatizaci lze použít `git bisect run <testovací-příkaz> [<argument>...]`; test musí vracet `0` pro dobrý stav, `1–127` kromě `125` pro vadný a `125` pro nevyzkoušitelný stav.

Zdroje: [git log](https://git-scm.com/docs/git-log), [gitrevisions](https://git-scm.com/docs/gitrevisions), [git bisect](https://git-scm.com/docs/git-bisect).
