---
canonical_for: development-workflow
status: accepted
last_verified: 2026-08-28
owner: maintainers
---

# Vývojový workflow

## Bezpečnost pracovního stromu

Před každou změnou ověř aktuální větev a pracovní strom.

Existující necommitované změny mohou patřit uživateli nebo jinému úkolu.

Nemaž je, nepřepisuj je, automaticky je neodkládej a nezahrnuj je do vlastního commitu bez prokazatelné souvislosti.

Před destruktivním Git příkazem musí být známý jeho přesný dopad.

## Povinná větev `develop`

Veškeré zpracování úkolů probíhá na větvi `develop`.

Nejdříve spusť:

```bash
git status --short --branch
git branch --list develop
git branch --show-current
```

Pokud lokální větev `develop` existuje a přepnutí neohrozí rozpracované změny, použij:

```bash
git switch develop
```

Pokud větev `develop` neexistuje, vytvoř ji z aktuálního lokálního stavu větve `main`.

Neprováděj předtím automatický pull ani reset.

```bash
git switch main
git switch -c develop
```

Pokud bezpečné přepnutí blokují cizí změny, nejdříve chraň jejich stav a popiš konflikt.

Nevytvářej `develop` z jiné větve pouze proto, aby práce mohla okamžitě pokračovat.

Existenci vzdálené větve a pravidla jejího publikování ověř podle platformy projektu.

## Role větví a propagace

`develop` je integrační větev a jediné místo, na kterém se běžně zpracovávají úkoly.

Běžné fast-forward push aktualizace do `develop` jsou povolené, zatímco přepis historie a odstranění větve jsou zakázané vzdáleným rulesetem.

Každý push do `develop` spouští vzdálené quality workflow, ale tato kontrola probíhá až po přijetí commitu, proto před pushem spusť lokální `npm run verify`.

`main` je výchozí a publikační větev.

Aktualizuje se pouze pull requestem z `develop`; přímý push do `main` není podporovanou součástí workflow.

Pull request musí obsahovat aktuální stav `main`, projít kontrolou `Lokálně reprodukovatelné kontroly` a mít vyřešené všechny review konverzace.

Sloučení používá merge commit, který je jedinou povolenou metodou rulesetu `main`.

Současný model nevyžaduje schválení další osobou a počet povinných schválení je `0`.

Přidání dalšího správce nebo požadavek na nezávislou kontrolu vyvolává revizi počtu schválení, rušení zastaralých schválení a pravidla pro poslední push.

`gh-pages` je odvozená publikační větev a nesmí se na ní ručně zpracovávat úkoly ani opravovat sestavený obsah.

Aktualizuje ji pouze publikační workflow, které ji záměrně nahrazuje jediným kořenovým deploymentovým commitem.

Přesná platformní pravidla, jejich ověřený stav a zbytková rizika vlastní [`../delivery/ci-cd.md`](../delivery/ci-cd.md#vzdálené-ochrany-větví).

### Publikování změny

1. Dokonči logickou změnu na `develop` a spusť `npm run verify`.
2. Pushni `develop` a ověř úspěšný běh workflow `Ověření dokumentace`.
3. Otevři pull request z `develop` do `main`, splň všechny vzdálené podmínky a sluč jej povoleným merge commitem.
4. Ihned po sloučení fast-forward synchronizuj dlouhodobou větev `develop` na nový merge commit z `main`.
5. Ověř workflow `Publikování dokumentace`, deployment `gh-pages` a veřejný web podle [`../operations/runbook.md`](../operations/runbook.md).

Synchronizaci proveď pouze v čistém pracovním stromu a bez přepisu historie:

```bash
git fetch origin
git switch develop
git merge --ff-only origin/main
git push origin develop
```

Pokud `--ff-only` selže, nepoužívej force push.

Nejdříve zjisti příčinu divergence a sjednoť větve dalším bezpečným krokem v rámci tohoto workflow.

## Pořadí změny

1. Přečti aktivní pracovní záznam a kanonické dokumenty dotčených oblastí.
2. Ověř nezměněný baseline.
3. Potvrď pozorovatelné požadované chování a cílovou architekturu.
4. Vyřeš blokující významná rozhodnutí.
5. Rozděl práci na malé samostatně ověřitelné milníky.
6. Uprav implementaci, testy, konfiguraci a dokumentaci společně.
7. Po každém rizikovém kroku spusť cílené ověření.
8. Před commitem zkontroluj rozdíl, nežádoucí soubory a cizí změny.
9. Před dokončením spusť přiměřenou širší regresi.
10. Přenes trvalé informace a odstraň dokončený pracovní záznam.

Změna nemá zůstat dlouho ve stavu, kdy je projekt úmyslně nesestavitelný.

Velkou migraci rozděl pomocí kompatibilních přechodových kroků.

Přechodový mechanismus musí mít popsanou podmínku odstranění.

## Rozsah a dlouhodobé narovnání

Úkol řeš v celém rozsahu nutném pro správné a udržitelné chování.

Nevytvářej lokální záplatu, která vědomě poruší cílovou architekturu.

Současně nerozšiřuj změnu na nesouvisející plošný refaktoring bez doloženého přínosu a rozhodnutí.

V dotčené oblasti odstraň zjevnou příčinu problému a přibliž projekt cílovému stavu.

Větší zjištěný problém mimo bezpečný rozsah zapiš jako architektonické riziko nebo samostatně rozhodnutý navazující záměr.

Nenechávej skryté `TODO`, které nemá kanonický význam, vlastníka ani podmínku dokončení.

## Conventional Commits v češtině

Každý commit používá formát Conventional Commits.

Typ a volitelný scope zachovávají standardní syntaxi.

Popis změny je stručný, jednoduchý a v češtině.

```text
<typ>(<scope>): <stručný český popis>
```

Příklady:

```text
feat(api): přidává filtrování objednávek
fix(auth): opravuje obnovu přihlášení
docs: zavádí kanonickou dokumentaci
refactor(core): zjednodušuje hranici doménové služby
test(ui): doplňuje scénář neplatné platby
ci: ověřuje odkazy v dokumentaci
```

Používej zejména typy `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `build`, `perf`, `chore` a `revert`.

Breaking change označ `!` a vysvětli jeho migrační dopad v těle commitu.

Tělo commitu přidej pouze tehdy, když je nutné vysvětlit důvod, riziko nebo kompatibilitu.

Commit nesmí míchat nesouvisející změny.

Dokumentace a testy patří do stejného logického commitu jako změna, kterou definují nebo ověřují.

## Práce s historií

Nevracej ani nepřepisuj cizí commit bez výslovného důvodu a bezpečného posouzení.

Nepoužívej force push jako běžný prostředek.

Merge do `main` a následné publikování prováděj pouze postupem v části [Publikování změny](#publikování-změny).

Git historie podporuje předání, ale nenahrazuje aktivní pracovní záznam ani kanonickou dokumentaci.

## Kontrola před commitem

Před každým commitem ověř:

- že změna odpovídá jednomu logickému výsledku,
- že rozdíl neobsahuje tajemství, lokální nastavení ani náhodné artefakty,
- že se nezměnil generovaný nebo cizí obsah bez odpovídajícího zdroje,
- že nové veřejné prvky mají požadované dokumentační komentáře,
- že byly spuštěné relevantní kontroly,
- že dotčená kanonická dokumentace odpovídá výsledku,
- že commit message je stručná, česká a odpovídá Conventional Commits.

## Definice dokončení

Úkol je dokončený pouze tehdy, když:

- pozorovatelné požadavky jsou splněné,
- implementace odpovídá cílové architektuře nebo explicitnímu přechodu,
- relevantní testy a kontroly prošly nebo je přesně zdokumentovaná existující překážka,
- veřejné rozhraní a vlastní veřejný kód jsou zdokumentované,
- kanonické dokumenty jsou aktualizované,
- trvalá rozhodnutí jsou v požadavcích nebo ADR,
- dokončený pracovní záznam je odstraněný,
- pracovní strom neobsahuje neidentifikované změny,
- závěrečné shrnutí uvádí důkazy a zbývající rizika a dodržuje [kanonický styl Markdownu](../governance/documentation.md#styl-markdownu).
