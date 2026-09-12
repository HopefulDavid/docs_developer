---
task_id: WORK-20260912-obnova-historie-a-balicku
status: active
started: 2026-09-12
last_updated: 2026-09-12
owner: Codex
branch: develop
scope:
  - vcs/git/history
  - programming/packages
  - devops/opentofu.md
  - graphics/affinity.md
---

# Obnova úplných postupů pro Git a balíčky

## Požadovaný výsledek

Vrátit srozumitelný postup nahrazení vzdálené historie jediným místním commitem a úplný přesun commitů do nové i existující větve podle záměru z `c3474271`.

Zjednodušit a věcně ověřit každý návod skupiny Balíčky pro online i offline obnovu.

Odstranit Časté problémy OpenTofu a ověřit důvod zarovnání Affinity; je-li důvodem šířka, vzhled zachovat.

## Kanonické vstupy

- [Požadavky REQ-005 až REQ-008](../product/requirements.md)
- [Architektura](../architecture/overview.md)
- [Příkazy](../development/commands.md)
- [Výzkum](../governance/research.md)
- [Testování](../quality/testing.md)
- [Workflow](../development/workflow.md)

## Akceptační kritéria

- [x] OpenTofu nemá požadovanou sekci; Affinity má doloženou příčinu.
- [x] Git obsahuje úplné, ověřené postupy včetně původní a cílové větve a přepsání jedním kořenovým commitem.
- [x] Každý správce má jednoduchý sled příprava, přenos, obnova, ověření, varianty a přesné zdroje.
- [x] Build, lokální odkazy, obsahové experimenty a vykreslení mají zaznamenané výsledky.

## Omezení a rozsah

Práce na čisté větvi develop, bez publikování a bez přepisu skutečné projektové historie.

Příklady Gitu se zkoušejí pouze v izolovaných repozitářích s místním bare serverem.

## Výchozí stav

HEAD `24e8c94`, develop je 14 commitů před lokálním origin/develop, origin používá SSH GitHub.

Neexistoval aktivní pracovní záznam ani cizí změny; jediný AGENTS.md je v kořeni.

`npm run verify` v sandboxu selhal při git-cliff na přístupu ke kořeni; systémové dotnet má 10.0.401, projekt vyžaduje 10.0.301.

## Milníky

| ID | Výsledek | Stav | Důkaz |
|---|---|---|---|
| M1 | Baseline, historie a výzkum | done | Oficiální Git, npm, pnpm, NuGet/.NET, pip/Python, Dart/Flutter; historický commit a Stack Overflow 1628563 |
| M2 | Úpravy veřejných návodů | done | Přepsáno šest správců, přehled, přesun Git, přepis historie, soft squash a navigace |
| M3 | Obsahové a vizuální ověření | done | 46 obsahových kontrol, 27 PowerShell bloků, 136 kombinací stránek, strict build bez chyb a varování |
| M4 | Přenos důkazů a úklid | in-progress | Výsledky v testing.md, požadavky v requirements.md, omezení hledání v ARCH-RISK-005; zbývá závěrečná regrese a odstranění záznamu |

## Objevy

Affinity používá stejné CSS centrování pro oba snímky; šířky jsou 760 a 482 px.

Existují ignorované experimenty z dřívější revize v private/docs-review, jejich přítomnost není důkazem nového ověření.

Baseline s existujícím SDK C:/Users/David/.dotnet, DOTNET_ROOT a upraveným PATH prošel mimo sandbox: 20 testů, 0 varování, 252 zdrojů / 493 souborů.

pnpm 12.4.0 potřebuje při studeném offline restore také metadata; samotný store vedl k ERR_PNPM_NO_OFFLINE_META.

Funkční příprava používá storeDir a cacheDir v pnpm-workspace.yaml, nikoli neúčinné CLI experimenty s --config.cacheDir; --cache-dir není podporovaný argument fetch této verze.

Npm ověření původně selhalo v Python shutil.copytree na Windows délce cílové cesty nad 260 znaků, nikoli v instalaci; další pokus používá kratší private/npm-r12.

Výsledky a přesné logy jsou v ignorovaných private/docs-review/followup/*-revision-20260912 a private/docs-review/revision-20260912/*-proof.

## Další bezpečný krok

Spustit závěrečné npm run verify, uložit ověřený milník, odstranit pracovní záznam a potvrdit čistý Git stav.

## Stav předání

- Cizí změny: žádné.
- Blokující rozhodnutí: žádné.
- Ověření obsahu a trvalý přenos: hotové, podrobnosti v docs/quality/testing.md.
- Známá omezení: víceslovné hledání ARCH-RISK-005, plný platformní build Flutteru nebyl proveden.
