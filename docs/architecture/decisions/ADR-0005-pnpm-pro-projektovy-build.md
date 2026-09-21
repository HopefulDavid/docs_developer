---
canonical_for: decision-0005-pnpm-project-build
status: accepted
date: 2026-09-21
last_verified: 2026-09-21
owners:
  - engineering
  - delivery
supersedes: ADR-0002-verejny-docfx-build.md, ADR-0003-generovani-changelogu-pomoci-git-cliff.md
superseded_by: null
---

# ADR-0005: pnpm pro projektový build

## Kontext

Projekt používal npm pro instalaci jediné vývojové závislosti, spouštění skriptů a oba GitHub Actions běhy.

Uživatel požádal o přechod na pnpm, pokud zůstane zachovaná reprodukovatelnost buildu.

Toto rozhodnutí nahrazuje pouze způsob instalace a spouštění balíčků v [`ADR-0002`](ADR-0002-verejny-docfx-build.md) a [`ADR-0003`](ADR-0003-generovani-changelogu-pomoci-git-cliff.md).

Volba `git-cliff` a formát changelogu zůstávají platné.

## Rozhodovací kritéria

- Čisté Windows a linuxové prostředí obnoví stejné deklarované verze.
- Lokální příkazy a CI používají stejný vstupní build profil.
- Changelog a DocFX artefakt se nemění kvůli správci balíčků.
- Migrace nezasáhne veřejné návody a testovací fixture pro npm.

## Výzkumné podklady

| Tvrzení nebo kritérium | Zdroj a verze | Datum ověření | Co podklad ukazuje | Omezení |
|---|---|---|---|---|
| Import existujícího lockfilu | [pnpm import](https://pnpm.io/cli/import), 12.x | 2026-09-21 | Příkaz podporuje převod npm lockfilu na `pnpm-lock.yaml` | Výsledek je nutné ověřit instalací |
| Reprodukovatelná instalace | [pnpm install](https://pnpm.io/cli/install#--frozen-lockfile), 12.x | 2026-09-21 | `--frozen-lockfile` odmítá nesoulad manifestu a lockfilu | První obnova vyžaduje registr nebo cache |
| CI instalace a cache | [pnpm/action-setup](https://github.com/pnpm/action-setup) a [actions/setup-node](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data) | 2026-09-21 | Obě actions podporují připnutý pnpm a cache závislou na lockfilu | Vzdálený GitHub běh bude důkazem linuxové varianty |
| Projektová kompatibilita | Lokální `pnpm import`, `pnpm install --frozen-lockfile --ignore-scripts` a `pnpm run verify` na Windows, pnpm 12.4.0, Node.js 24.13.0 | 2026-09-21 | Instalace i všech 21 testů, DocFX build s 0 warningy a kontrola artefaktu prošly | Běh `git-cliff` vyžadoval prostředí bez omezení Windows sandboxu |

Projektový důkaz, primární dokumentace a migrační experiment splňují [výzkumný standard](../../governance/research.md).

## Zvažované varianty

### Varianta A: Ponechat npm

Zachovala by současný lockfile a CI beze změny, ale nesplnila by požadovaný pracovní postup.

Návrat je snadný obnovením původního manifestu, lockfilu a příkazů z Gitu.

### Varianta B: Převést projekt na pnpm

Ponechává Node.js skripty a `git-cliff`, převádí lockfile a mění pouze instalaci a volání skriptů.

Vyžaduje instalaci připnutého pnpm lokálně a další připnutou action v CI.

Návrat je možný, ale vyžadoval by nový převod lockfilu a opakované ověření.

## Rozhodnutí

Přijímáme variantu B.

Přesná verze pnpm je v `package.json#packageManager`; `pnpm-lock.yaml` uzamyká správce i vývojové balíčky.

CI instaluje stejnou verzi a používá `pnpm install --frozen-lockfile --ignore-scripts` a `pnpm run verify`.

Projektový npm lockfile se odstraňuje, aby neexistovaly dva zdroje pravdy pro závislosti.

## Důsledky

- Jediný aktivní lockfile je `pnpm-lock.yaml`.
- CI má novou externí action, připnutou na plný commit SHA.
- Správce musí mít pnpm před prvním lokálním spuštěním skriptů.
- Veřejné výukové materiály o npm a npm testovací fixture se nemění.

## Migrace a kompatibilita

Import npm lockfilu zachoval přesnou verzi `git-cliff`.

Po úspěšné frozen instalaci a úplné lokální kontrole se odstranil `package-lock.json` a projektové příkazy byly sjednocené.

Veřejný web neobsahuje Node runtime ani žádnou runtime závislost, takže změna nevyžaduje datovou migraci.

## Ověření rozhodnutí

Každá změna manifestu nebo lockfilu musí projít frozen instalací a `pnpm run verify` lokálně i v quality workflow.

Publish workflow používá stejný vstupní profil před nasazením.
