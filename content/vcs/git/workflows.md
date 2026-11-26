---
description: "Výběr mezi jednou větví, krátkými pracovními větvemi a odděleným vydáváním."
---

# Git – jak si vybrat způsob práce

Workflow je dohoda, kde se vyvíjí, jak se kontroluje změna a kdy je hotová.

Solo vývojář nepotřebuje povinně `develop` ani pull request pro každý commit.

Potřebuje rozumět stavu projektu a umět se vrátit k funkční verzi.

## Volba podle situace

| Způsob | Kdy se hodí | Na co dát pozor |
|---|---|---|
| Jedna větev `main` | Učení, poznámky, malý projekt a krátké postupné změny | Každý commit přímo mění hlavní linii |
| `main` a krátké pracovní větve | Funkce zabere více commitů, jde o experiment nebo se má před sloučením posoudit celý rozdíl | Větev průběžně dokončovat a nenechat ji dlouho rozcházet s `main` |
| `main` a `develop` | Stabilní vydání má zůstat oddělené od rozpracované příští verze | Opravy vydané verze vracet i do vývoje |
| Git Flow | Plánované verze potřebují samostatnou stabilizaci, release a hotfix větve | Více slučování a pravidel, která u malého projektu nemusí přinést užitek |

Pro běžnou solo aplikaci jsou krátké větve užitečný výchozí bod.

Pokud tě jejich správa zdržuje u drobných změn, jedna větev je plnohodnotná možnost.

Pravidla existujícího repozitáře mají přednost před zde uvedeným výběrem.

## Postup podle workflow

<a id="varianta-a-jedna-větev"></a>
<a id="varianta-b-krátká-větev-pro-jednu-změnu"></a>
<a id="varianta-c-stabilní-a-vývojová-větev"></a>

## [Jedna větev](#tab/workflow-single)

Na `main` se načte vzdálený stav, upraví a otestují se soubory, vznikne commit a odešle se.

```text
main: A ── B ── C
```

Písmena představují postupně uložené stavy.

Rozpracované změny mezi nimi nejsou v historii.

Postup je v [běžném pracovním dni](in-practice.md), kde se jednoduše vynechá vytvoření pracovní větve.

## [Krátké pracovní větve](#tab/workflow-feature)

```text
main:           A ───────── M
                 \         /
feature/hledani: B ─────── C
```

`B` a `C` tvoří jednu funkci.

`M` je její sloučení do hlavní větve.

1. Z aktuální `main` vznikne `feature/hledani`.
2. Na této větvi se pracuje a commituje, dokud funkce nefunguje.
3. Celý rozdíl se porovná proti `main` a spustí se testy.
4. Sloučení proběhne lokálně nebo přes pull request.
5. Ověřená `main` se odešle a teprve potom se odstraní dokončená pracovní větev.

Lokální merge je vhodný, když není potřeba serverová kontrola.

[Pull request](branches/pull-request.md) přidá přehled změn, výsledky CI a vlastní review před sloučením.

Nemusí ho schvalovat druhá osoba, pokud to pravidla hostingu nevyžadují.

## [Stabilní a vývojová větev](#tab/workflow-develop)

`main` obsahuje vydaný stav a `develop` změny pro příští vydání.

Pracovní větve vznikají z `develop` a do `main` se přenáší až připravené vydání.

Tato varianta přidává smysluplnou hranici například při vydávání desktopové aplikace po verzích.

Sama o sobě ale nevyžaduje všechny větve Git Flow.

Pro stabilizační období a urgentní opravy slouží [Git Flow](git-flow.md).

***

## Jak změny slučovat

| Metoda | Výsledek | Rozumné použití |
|---|---|---|
| Fast-forward | Cílová větev se posune na již existující commit | Krátká větev bez souběžných změn |
| Merge commit | Zachová jednotlivé commity a zaznamená spojení linií | Má se uchovat hranice funkce a její historie |
| Squash | Celá funkce se uloží jako jeden nový commit | Pomocné pracovní commity nejsou užitečné v hlavní historii |
| Rebase | Přehraje vlastní commity na novější základ a změní jejich ID | Aktualizace soukromé pracovní větve před sloučením |

Rebase není odeslání ani dokončení funkce.

Po něm stále následuje testování a začlenění do cílové větve.

Konkrétní příkazy, konflikt a návrat vysvětluje [slučování větví](merging.md).

## Co si zapsat do vlastního projektu

- Která větev znamená stabilní stav.
- Z jaké větve začíná nová práce a kam se vrací.
- Zda se slučuje lokálně, nebo přes PR a CI.
- Jak se označí [vydaná verze](releases.md) a kam se uloží [záloha](backups.md).

Git podporuje různé modely práce.

Porovnání navazuje na [Git Book: workflow větví](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows).
