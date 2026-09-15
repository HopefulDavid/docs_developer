---
description: "Výběr mezi jednou větví, krátkými pracovními větvemi a odděleným vydáváním."
---

# Git – jak si vybrat způsob práce

Workflow je dohoda, kde vyvíjíš, jak kontroluješ změnu a kdy ji považuješ za hotovou.

Solo vývojář nepotřebuje povinně `develop` ani pull request pro každý commit.

Potřebuje rozumět stavu projektu a umět se vrátit k funkční verzi.

## Vyber podle své situace

| Způsob | Kdy se hodí | Co musíš hlídat |
|---|---|---|
| Jedna větev `main` | Učení, poznámky, malý projekt a krátké postupné změny | Každý commit přímo mění hlavní linii |
| `main` a krátké pracovní větve | Funkce zabere více commitů, experimentuješ nebo chceš před sloučením posoudit celý rozdíl | Větev průběžně dokončovat a nenechat ji dlouho rozcházet s `main` |
| `main` a `develop` | Stabilní vydání má zůstat oddělené od rozpracované příští verze | Opravy vydané verze vracet i do vývoje |
| Git Flow | Plánované verze potřebují samostatnou stabilizaci, release a hotfix větve | Více slučování a pravidel, která u malého projektu nemusí přinést užitek |

Pro běžnou solo aplikaci jsou krátké větve užitečný výchozí bod.

Pokud tě jejich správa zdržuje u drobných změn, jedna větev je plnohodnotná možnost.

Pravidla existujícího repozitáře mají přednost před zde uvedeným výběrem.

## Varianta A: jedna větev

Na `main` načteš vzdálený stav, upravíš soubory, otestuješ je, vytvoříš commit a odešleš jej.

```text
main: A ── B ── C
```

Písmena představují postupně uložené stavy.

Rozpracované změny mezi nimi nejsou v historii.

Postup je v [běžném pracovním dni](in-practice.md), kde jednoduše vynecháš vytvoření pracovní větve.

## Varianta B: krátká větev pro jednu změnu

```text
main:           A ───────── M
                 \         /
feature/hledani: B ─────── C
```

`B` a `C` tvoří jednu funkci.

`M` je její sloučení do hlavní větve.

1. Z aktuální `main` vytvoř `feature/hledani`.
2. Pracuj a commituj na této větvi, dokud funkce nefunguje.
3. Porovnej celý rozdíl proti `main` a spusť testy.
4. Slouč lokálně nebo přes pull request.
5. Ověř `main`, odešli ji a teprve potom odstraň dokončenou pracovní větev.

Lokální merge je vhodný, když nepotřebuješ serverovou kontrolu.

[Pull request](branches/pull-request.md) přidá přehled změn, výsledky CI a vlastní review před sloučením.

Nemusí ho schvalovat druhá osoba, pokud to pravidla hostingu nevyžadují.

## Varianta C: stabilní a vývojová větev

`main` obsahuje vydaný stav a `develop` změny pro příští vydání.

Pracovní větve zakládej z `develop` a do `main` přenes až připravené vydání.

Tato varianta přidává smysluplnou hranici například při vydávání desktopové aplikace po verzích.

Sama o sobě ale nevyžaduje všechny větve Git Flow.

Pokud skutečně potřebuješ i stabilizační období a urgentní opravy, pokračuj na [Git Flow](git-flow.md).

## Jak změny slučovat

| Metoda | Výsledek | Rozumné použití |
|---|---|---|
| Fast-forward | Cílová větev se posune na již existující commit | Krátká větev bez souběžných změn |
| Merge commit | Zachová jednotlivé commity a zaznamená spojení linií | Chceš uchovat hranici funkce a její historii |
| Squash | Celá funkce se uloží jako jeden nový commit | Pomocné pracovní commity nejsou užitečné v hlavní historii |
| Rebase | Přehraje vlastní commity na novější základ a změní jejich ID | Chceš aktualizovat soukromou pracovní větev před sloučením |

Rebase není odeslání ani dokončení funkce.

Po něm stále následuje testování a začlenění do cílové větve.

Konkrétní příkazy, konflikt a návrat vysvětluje [slučování větví](merging.md).

## Co si zapsat do vlastního projektu

- Která větev znamená stabilní stav.
- Z jaké větve začíná nová práce a kam se vrací.
- Zda se slučuje lokálně, nebo přes PR a CI.
- Jak označíš [vydanou verzi](releases.md) a kam uložíš [zálohu](backups.md).

Git podporuje různé modely práce.

Porovnání navazuje na [Git Book: workflow větví](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows).
