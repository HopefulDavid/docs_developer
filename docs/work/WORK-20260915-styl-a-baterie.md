---
task_id: WORK-20260915-styl-a-baterie
status: active
started: 2026-09-15
last_updated: 2026-09-15
owner: agent
branch: develop
scope:
  - dokumentace
  - scripts/generate-docs.js
---

# WORK-20260915: Čitelné odstavce a návod k baterii

## Požadovaný výsledek

První commit zavede preferenci krátkých vět a odstavců místo středníků a upraví existující dokumentaci.

Druhý commit obnoví rozpracovaný návod ze stashe a upraví jej pro běžné uživatele notebooků.

## Kanonické vstupy

- [Styl dokumentace](../governance/documentation.md#styl-markdownu).
- [Workflow](../development/workflow.md) a [příkazy](../development/commands.md).
- [Požadavky](../product/requirements.md) a [ověření](../quality/testing.md).

## Akceptační kritéria

- [x] Středníky v próze jsou převedené na vhodné věty, odstavce nebo výčty.
- [x] Technický zápis, kód, odkazy a význam rozhodnutí jsou zachované.
- [ ] Existují dva samostatné české Conventional Commits v požadovaném pořadí.
- [ ] Návod k baterii je pochopitelný i bez znalosti programování a má ověřené odkazy i zobrazení.

## Omezení a mimo rozsah

Pracujeme na `develop` bez publikování a bez změn nastavení skutečného notebooku.

## Orientace v dotčené oblasti

Generované indexy a TOC se obnovují z generátoru a metadat článků.

Jednorázová inventura prózy je v systémovém TEMP, nikoli v projektu.

## Výchozí stav a baseline

- Výchozí commit `5b7600e`, žádné cizí změny ani dřívější stash.
- Šest souborů předchozího úkolu uloženo přes `git stash push --include-untracked`.
- Stash má hash `9cb36ad9721e508b21ccc8e1d7769ed74d415f02` a popis `rozpracovaný návod k baterii před úpravou stylu`.
- Po odložení čistý pracovní strom.
- Prostředí a build tok navazují na předchozí ověření této relace.
- Baseline `npm run verify` prošel mimo sandbox kvůli právům git-cliff, 20 testů, 0 varování a 0 chyb.

## Rozhodnutí

Úprava mění redakční styl, nikoli technický význam historických ADR.

Středníky v kódu, příkazech, HTML entitách a jiné nutné syntaxi zůstávají zachované.

## Milníky a průběh

| Milník | Stav | Důkaz |
|---|---|---|
| Bezpečné odložení | done | Stash obsahuje všech šest souborů |
| Styl a první commit | in-progress | Úpravy hotové, kontrola syntaxe a 32 rozměrových kombinací prošla |
| Obnova a druhý commit | pending | — |

## Ověření výsledku

První milník má důkazy v [testovací dokumentaci](../quality/testing.md#ověření-úpravy-středníků-2026-09-15).

## Dotčené soubory a necommitované změny

Pouze změny tohoto úkolu.

## Další bezpečný krok

Zakomitovat ověřený první milník a obnovit konkrétní stash.

## Stav předání

- Nepoužívat `stash pop` naslepo, obnovit konkrétní uvedený stash a odstranit jej až po ověření druhého commitu.
- První commit ještě neexistuje.
- Trvalé důkazy přenést do testovací dokumentace a pracovní záznam po dokončení odstranit.
