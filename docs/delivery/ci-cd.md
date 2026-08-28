---
canonical_for: ci-cd-and-delivery
status: not-initialized
last_verified: null
owner: delivery
---

# CI, vydávání a nasazení

> `PROJECT-INIT`: Nejprve detekuj skutečný VCS hosting, existující CI a podporované prostředí.
>
> `PROJECT-INIT`: Nevytvářej GitHub workflow pouze proto, že jeho syntaxe je známá.

Tento dokument je kanonickým popisem platformy, fází CI, vydávání a nasazení.

Přesná workflow konfigurace zůstává strojově kanonická ve svých souborech.

Zde se vysvětluje její účel, pořadí, prostředí, oprávnění a způsob lokální reprodukce.

## Hosting a VCS

| Vlastnost | Ověřená hodnota | Důkaz |
|---|---|---|
| Hostingová platforma | `PROJECT-INIT` | Remote a projektová metadata |
| VCS | Git nebo `PROJECT-INIT` | `PROJECT-INIT` |
| Výchozí větev hostingu | `PROJECT-INIT` | `PROJECT-INIT` |
| Vývojová větev | `develop` | [`../development/workflow.md`](../development/workflow.md) |
| Kanonická cesta CI | `PROJECT-INIT` | Odkaz na workflow |
| Runner nebo executor | `PROJECT-INIT` | `PROJECT-INIT` |

Platformu určuj z více důkazů.

Forgejo, Gitea, GitHub a jiné systémy mohou používat podobnou syntaxi, ale nemusejí podporovat stejné akce, události ani bezpečnostní chování.

## Lokální ekvivalence

Každý ověřovací krok CI má volat stejný projektový vstup jako lokální vývoj.

Přesné lokální příkazy jsou v [`../development/commands.md`](../development/commands.md).

Workflow smí přidat platformní přípravu, cache, artifact upload a podmínky, ale nesmí skrývat alternativní build logiku.

| Fáze CI | Projektový příkaz | Platformní obal | Výstupní důkaz |
|---|---|---|---|
| `PROJECT-INIT` | Odkaz na příkaz | `PROJECT-INIT` | `PROJECT-INIT` |

## Názvy workflow a kroků

Pokud projekt používá CI, zobrazované názvy workflow, jobů a kroků piš stručně, srozumitelně a v češtině.

Z názvu a pořadí musí být patrné, co se provádí.

Technické identifikátory, které platforma omezuje nebo používá v API, mohou zůstat v podporovaném formátu.

Doporučený význam pořadí je:

1. Připraví prostředí.
2. Obnoví řízené závislosti.
3. Ověří formát a statická pravidla.
4. Sestaví projekt.
5. Spustí cílené a automatizované testy.
6. Spustí vizuální nebo integrační scénáře, pokud jsou relevantní.
7. Ověří dokumentaci a bezpečnostní vlastnosti.
8. Vytvoří a podepíše artefakt.
9. Publikuje nebo nasadí pouze při schválených podmínkách.
10. Ověří nasazení a zpřístupní diagnostické artefakty.

Skutečné fáze se přizpůsobí projektu.

Nevytvářej prázdné nebo duplicitní joby jen kvůli této šabloně.

## Externí akce a knihovny

Před vlastním CI skriptem preferuj udržovanou akci nebo knihovnu vhodnou pro zjištěnou platformu.

Výběr se řídí [`../development/dependencies.md`](../development/dependencies.md).

Připnutí, důvěryhodnost a údržbu externích akcí řiď kanonickou politikou v [`../development/dependencies.md`](../development/dependencies.md).

V kontextu workflow navíc ověř kompatibilitu s konkrétním runnerem a událostí.

Vlastní skript použij až tehdy, když vhodná akce neexistuje nebo je pro projekt méně bezpečná či méně reprodukovatelná.

## Oprávnění a tajemství

Workflow používá nejmenší možná oprávnění.

Výchozí token nemá zapisovat, pokud job zápis nepotřebuje.

Tajemství se zpřístupňuje pouze jobu a kroku, který je skutečně používá.

Kód z nedůvěryhodné větve nebo pull requestu nesmí běžet v kontextu s privilegovanými tajemstvími.

Logy a artefakty nesmějí obsahovat tajemství, osobní údaje ani produkční data.

| Tajemství nebo identita | Účel | Dostupné fáze | Vlastník | Rotace |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

Hodnotu tajemství nikdy nezapisuj do tohoto dokumentu.

## Reprodukovatelnost a dostupnost

CI používá stejné lockfily, verze nástrojů a podporované registry jako lokální prostředí.

Závislosti se drží v řízeném prostředí, cache nebo mirroru podle možností projektu.

Cache urychluje sestavení, ale není jediným autoritativním zdrojem.

Každý stažený nebo použitý artefakt má mít ověřitelnou identitu a integritu.

Build artefakt vzniká jednou a postupuje mezi prostředími bez přebudování z jiného zdrojového stavu.

Identita artefaktu se váže na commit, verzi a relevantní provenance údaje.

Reprodukovatelnost se zvyšuje úměrně riziku a distribučnímu modelu projektu.

## Spouštěče a ochrany

| Událost | Workflow | Povinné kontroly | Oprávnění | Poznámka |
|---|---|---|---|---|
| Push do `develop` | `PROJECT-INIT` | `PROJECT-INIT` | Pouze čtení nebo `PROJECT-INIT` | `PROJECT-INIT` |
| Pull request nebo merge request | `PROJECT-INIT` | `PROJECT-INIT` | Minimální | `PROJECT-INIT` |
| Tag nebo release | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Ruční nasazení | `PROJECT-INIT` | `PROJECT-INIT` | Chráněné prostředí | `PROJECT-INIT` |

Nasazení do produkce vyžaduje explicitně přijatý proces projektu.

Automatické publikování se nezavádí jako vedlejší důsledek běžného ověřovacího workflow.

## Prostředí a propagace

| Prostředí | Účel | Zdroj artefaktu | Schválení | Ověření po nasazení | Rollback |
|---|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | Odkaz na runbook |

Konfigurace prostředí se odděluje od zdrojového kódu způsobem přijatým projektem.

Rozdíly prostředí se minimalizují a explicitně dokumentují.

Datová migrace musí mít pořadí kompatibilní s aplikací a plán návratu nebo bezpečného pokračování.

## Release

Popiš jediný podporovaný způsob tvorby verze, tagu, changelogu, artefaktu a publikování.

Verzovací pravidlo a veřejná kompatibilita musí odpovídat produktu.

Commit zprávy jsou podle [`../development/workflow.md`](../development/workflow.md).

| Krok | Spouštěč | Kanonický nástroj nebo soubor | Ověření |
|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Selhání a diagnostika

Neúspěšný job zpřístupní dostatek logů a relevantních artefaktů pro lokální reprodukci.

Vizuální testy mají podle strategie ukládat trace, screenshot nebo video při selhání.

Dočasné diagnostické rozšíření se po vyřešení odstraní nebo se přijme jako trvalá pozorovatelnost.

Nestabilní CI se neopravuje nekonečným retry bez odstranění příčiny.

## Aktualizace dokumentu

Tento dokument se aktualizuje ve stejné změně jako hosting, workflow, runner, oprávnění, prostředí, release, deployment nebo rollback.

Při migraci platformy se starý stav označí jako přechod a po dokončení se odstraní.
