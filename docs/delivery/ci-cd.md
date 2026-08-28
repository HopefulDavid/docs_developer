---
canonical_for: ci-cd-and-delivery
status: accepted
last_verified: 2026-08-28
owner: delivery
---

# CI, vydávání a nasazení

Tento dokument je kanonickým popisem platformy, fází CI, vydávání a nasazení.

Přesná workflow konfigurace zůstává strojově kanonická ve svých souborech.

Zde se vysvětluje její účel, pořadí, prostředí, oprávnění a způsob lokální reprodukce.

## Hosting a VCS

| Vlastnost | Ověřená hodnota | Důkaz |
|---|---|---|
| Hostingová platforma | GitHub | SSH remote `git@github.com:HopefulDavid/docs_developer.git`, vzdálený HEAD a `.github/workflows/` |
| VCS | Git | `.git/`, remote a projektová historie |
| Výchozí větev hostingu | `main` | Lokální symbolický ref `origin/HEAD -> origin/main` |
| Vývojová větev | `develop` | [`../development/workflow.md`](../development/workflow.md) |
| Ochrana zdrojových větví | Aktivní GitHub rulesety pro `main` a `develop` | [Nastavení rulesetů](https://github.com/HopefulDavid/docs_developer/settings/rules), vzdáleně ověřeno 2026-08-28 |
| Kanonická cesta quality | [`.github/workflows/quality.yml`](../../.github/workflows/quality.yml) | Read-only workflow pro `develop`, pull request a ruční běh |
| Kanonická cesta publikování | [`.github/workflows/main.yml`](../../.github/workflows/main.yml) | Ověření a deployment po pushi do `main` nebo ručním spuštění |
| Zdroj GitHub Pages | Kořen větve `gh-pages` | [Nastavení Pages](https://github.com/HopefulDavid/docs_developer/settings/pages), vzdáleně ověřeno 2026-08-28 |
| Runner nebo executor | GitHub-hosted `ubuntu-latest` | Obě workflow definice |

Publikované články mohou popisovat Forgejo, Gitea nebo jinou platformu, ale tyto tematické stránky nejsou důkazem hostingu tohoto projektu.

Živá pravidla GitHubu nejsou obsahem Git stromu.

Jejich poslední ověřený stav a povinné spouštěče další revize jsou uvedené v části [Vzdálené ochrany větví](#vzdálené-ochrany-větví) a zbytkové riziko driftu vlastní `ARCH-RISK-004`.

## Lokální ekvivalence

Každý ověřovací krok CI má volat stejný projektový vstup jako lokální vývoj.

Přesné lokální příkazy jsou v [`../development/commands.md`](../development/commands.md).

Workflow smí přidat platformní přípravu, cache, artifact upload a podmínky, ale nesmí skrývat alternativní build logiku.

| Fáze CI | Projektový příkaz | Platformní obal | Výstupní důkaz |
|---|---|---|---|
| Obnova changelog nástroje | `npm ci --ignore-scripts --no-audit --no-fund` | `setup-node` podle `package.json` a npm cache podle lockfilu | Přesná integrita `git-cliff` z `package-lock.json` |
| Obnova DocFX | `dotnet tool restore` | `setup-dotnet` podle `global.json` | Konzolový záznam o obnovené verzi |
| Kontrola, testy, changelog a build | `npm run verify` | Úplný checkout pomocí `fetch-depth: 0` | TAP výstup, vygenerovaný `changelog.md`, DocFX log, `_site/manifest.json` a ověřený `_site/` |
| Publikování | Lokální build kontrakt končí hotovým `_site/` | Připnutá `peaceiris/actions-gh-pages` předá obsah do `gh-pages` s `force_orphan: true` | Jediný kořenový deployment commit a log GitHub Actions |

## Historie publikační větve

Větev `gh-pages` je generovaný deploymentový artefakt, nikoli archiv zdrojové historie.

Každé úspěšné publikování ji pomocí `force_orphan: true` nahradí jediným kořenovým commitem obsahujícím nejnovější ověřený výstup `_site/`.

Audit zdrojové změny uchovávají `main`, zpráva deploymentového commitu a GitHub Actions; předchozí deployment se obnovuje opětovným publikováním zvoleného zdrojového stavu, nikoli návratem v historii `gh-pages`.

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

Nastavení repozitáře bylo 2026-08-28 ověřeno na výchozí read-only oprávnění `GITHUB_TOKEN` a nepovoluje GitHub Actions vytvářet ani schvalovat pull requesty.

Publikační workflow žádá pouze potřebné `contents: write`, zatímco quality workflow zůstává na `contents: read`.

Tajemství se zpřístupňuje pouze jobu a kroku, který je skutečně používá.

Kód z nedůvěryhodné větve nebo pull requestu nesmí běžet v kontextu s privilegovanými tajemstvími.

Logy a artefakty nesmějí obsahovat tajemství, osobní údaje ani produkční data.

| Tajemství nebo identita | Účel | Dostupné fáze | Vlastník | Rotace |
|---|---|---|---|---|
| Automatický `GITHUB_TOKEN` | Publikování ověřeného `_site/` do větve `gh-pages` | Pouze publikační workflow | GitHub a vlastník repozitáře | Krátkodobý token vydává a rotuje GitHub pro každý běh |

Hodnotu tajemství nikdy nezapisuj do tohoto dokumentu.

## Reprodukovatelnost a dostupnost

CI používá stejné lockfily, verze nástrojů a podporované registry jako lokální prostředí.

Oba workflow checkouty načítají úplnou Git historii, protože mělký klon nemůže vytvořit úplný changelog.

Závislosti se drží v řízeném prostředí, cache nebo mirroru podle možností projektu.

Cache urychluje sestavení, ale není jediným autoritativním zdrojem.

Každý stažený nebo použitý artefakt má mít ověřitelnou identitu a integritu.

Build artefakt vzniká jednou a postupuje mezi prostředími bez přebudování z jiného zdrojového stavu.

Identita artefaktu se váže na commit, verzi a relevantní provenance údaje.

Reprodukovatelnost se zvyšuje úměrně riziku a distribučnímu modelu projektu.

## Spouštěče workflow

| Událost | Workflow | Povinné kontroly | Oprávnění | Poznámka |
|---|---|---|---|---|
| Push do `develop` | `Ověření dokumentace` | `npm run verify` | `contents: read` | Nevytváří ani nepublikuje vzdálený artefakt |
| Pull request | `Ověření dokumentace` | `npm run verify` | `contents: read` | Nepoužívá `pull_request_target` ani privilegované tajemství |
| Push do `main` | `Publikování dokumentace` | `npm run verify` před deploymentem | `contents: write` | Publikuje pouze po úspěšném ověření; source checkout neuchovává credentials; `gh-pages` přepisuje jediným kořenovým commitem |
| Tag nebo release | Žádné workflow | Žádné | Žádné | Projekt nevydává verzované binární release |
| Ruční quality | `Ověření dokumentace` | `npm run verify` | `contents: read` | Diagnostický běh bez publikování |
| Ruční nasazení | `Publikování dokumentace` | `npm run verify` a deployment | `contents: write` | Spouští se pouze z důvěryhodného refu vybraného vlastníkem |

Nasazení do produkce vyžaduje explicitně přijatý proces projektu.

Automatické publikování se nezavádí jako vedlejší důsledek běžného ověřovacího workflow.

## Vzdálené ochrany větví

GitHub je strojovou autoritou pro živé rulesety a Pages settings.

Tato část zaznamenává přijatý význam a stav vzdáleně ověřený dne 2026-08-28, aby bylo možné rozpoznat pozdější drift.

Klasické branch protection rules nejsou nakonfigurované, protože zdrojové větve chrání moderní rulesety.

| Cíl | Ověřený ruleset a rozsah | Vynucované vlastnosti | Vztah k workflow |
|---|---|---|---|
| `develop` | Aktivní `Ochrana develop`, přesný cíl `develop`, prázdný bypass list | Zákaz smazání a force push; pull request ani status check nejsou podmínkou aktualizace | Umožňuje běžné fast-forward push aktualizace a po každém pushi spouští quality workflow |
| Výchozí větev `main` | Aktivní `Ochrana main`, cíl `Default` odpovídající `main`, prázdný bypass list | Zákaz smazání a force push, povinný pull request, aktuálnost vůči `main`, vyřešené konverzace a povinná kontrola `Lokálně reprodukovatelné kontroly` ze zdroje GitHub Actions; `0` povinných schválení a jediná povolená metoda `merge` | Vynucuje propagaci `develop` do `main` podle [`../development/workflow.md`](../development/workflow.md#publikování-změny) |
| `gh-pages` | Bez klasické ochrany a bez rulesetu | Platforma neblokuje ruční update, smazání ani force push | Větev je obnovitelný deploymentový artefakt a publikační workflow ji musí kvůli `force_orphan: true` nahradit; ruční změny zakazuje projektový workflow, nikoli GitHub |

### Důkaz vzdáleného ověření

- Výchozí větev byla `main` a oba rulesety byly aktivní bez bypass aktérů.
- [Quality běh `33182623326`](https://github.com/HopefulDavid/docs_developer/actions/runs/33182623326) úspěšně ověřil commit `ef77f7577e8cf9789949b6409712a25947e873c6` na `develop`.
- [Publikační běh `33182623548`](https://github.com/HopefulDavid/docs_developer/actions/runs/33182623548) úspěšně sestavil a publikoval stejný zdrojový commit z `main`.
- Pages používaly kořen větve `gh-pages`, vynucovaly HTTPS a poslední deployment dokončil navazující workflow `pages-build-deployment`.
- Vzdálená historie `gh-pages` obsahovala jediný kořenový commit `f38e9093188f259d4134e9701108e188aeb7c10a` se zprávou odkazující na zdrojový commit.
- [Veřejný web](https://hopefuldavid.github.io/docs_developer/) odpověděl přes HTTPS a zobrazil očekávanou homepage.

Vzdálené ověření zopakuj při změně rulesetu, výchozí větve, názvu povinného jobu, workflow triggeru nebo oprávnění, Pages source a publikačního modelu.

Kontrola musí potvrdit aktivní cíle a bypass listy, úspěšný quality i publish běh, jediný kořenový commit `gh-pages` a dostupný veřejný web.

## Prostředí a propagace

| Prostředí | Účel | Zdroj artefaktu | Schválení | Ověření po nasazení | Rollback |
|---|---|---|---|---|---|
| Lokální náhled | Vývoj a vizuální smoke | Lokální `_site/` | Nevyžaduje | Kroky `REQ-001` a `REQ-002` | Znovu sestavit nebo odstranit `_site/` |
| GitHub Actions quality | Kontrola změny bez publikování | Aktuální checkout | Událost workflow | `npm run verify` | Opravit zdroj a spustit znovu |
| GitHub Pages | Veřejný produkční statický web | `_site/` z ověřeného commitu `main` | Úspěšný publish job | HTTP a čtenářský smoke | Revertovat vadný zdrojový commit a znovu publikovat podle runbooku |

Konfigurace prostředí se odděluje od zdrojového kódu způsobem přijatým projektem.

Rozdíly prostředí se minimalizují a explicitně dokumentují.

Datová migrace musí mít pořadí kompatibilní s aplikací a plán návratu nebo bezpečného pokračování.

## Release

Projekt nevytváří verzované binární release ani release tagy.

Veřejně nasazovanou jednotkou je ověřený statický artefakt konkrétního commitu `main`.

Historii změn doplňuje při každém buildu generovaný a ignorovaný `changelog.md`, zatímco commit zprávy dodržují [`../development/workflow.md`](../development/workflow.md).

| Krok | Spouštěč | Kanonický nástroj nebo soubor | Ověření |
|---|---|---|---|
| Vytvoření historie změn | Každý lokální a CI build s úplnou historií | [`cliff.toml`](../../cliff.toml), uzamčený `git-cliff` a `npm run changelog:generate` | Integrační fixture přes tag a výsledná stránka v `_site/`; zdrojová větev se nemění |
| Vytvoření artefaktu | Push do `main` nebo ruční publish | `npm run verify` a [`docfx.json`](../../docfx.json) | 0 warningů, 0 chyb a úspěšný artifact check |
| Publikování | Úspěšný build v publikačním workflow | [`.github/workflows/main.yml`](../../.github/workflows/main.yml) | Jediný kořenový deployment commit v `gh-pages` a dostupný web |

## Selhání a diagnostika

Neúspěšný job zpřístupní dostatek logů a relevantních artefaktů pro lokální reprodukci.

Selhání nebo neúplnost changelogu se reprodukuje nad úplným checkoutem příkazy z [`../development/commands.md#changelog`](../development/commands.md#changelog).

Vizuální testy mají podle strategie ukládat trace, screenshot nebo video při selhání.

Dočasné diagnostické rozšíření se po vyřešení odstraní nebo se přijme jako trvalá pozorovatelnost.

Nestabilní CI se neopravuje nekonečným retry bez odstranění příčiny.

## Aktualizace dokumentu

Tento dokument se aktualizuje ve stejné změně jako hosting, workflow, runner, oprávnění, prostředí, release, deployment nebo rollback.

Při migraci platformy se starý stav označí jako přechod a po dokončení se odstraní.
