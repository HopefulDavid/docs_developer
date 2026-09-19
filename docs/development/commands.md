---
canonical_for: project-commands
status: accepted
last_verified: 2026-09-12
owner: engineering
---

# Projektové příkazy

Tento dokument je kanonickým lidským rozhraním pro lokální sestavení, spuštění, kontroly a testování.

Skripty, manifesty a build konfigurace zůstávají kanonické pro prováděnou strojovou logiku.

Zde se uvádí jejich podporovaný způsob vyvolání, pracovní adresář, požadavky a očekávaný výsledek.

## Požadované prostředí

| Nástroj nebo služba | Podporovaná verze | Kanonický zdroj verze | Lokální nebo řízená dostupnost | Ověření |
|---|---|---|---|---|
| Node.js | Přesná verze v [`package.json`](../../package.json) | [`package.json`](../../package.json) | Lokální instalace. GitHub Actions ji obnovuje přes `setup-node` | `node --version` |
| npm | Verze dodaná podporovanou instalací Node.js | Distribuce Node.js a [`../../package-lock.json`](../../package-lock.json) | Lokální instalace a GitHub runner. Obnovuje uzamčený changelog nástroj | `npm --version` |
| .NET SDK | Stabilní SDK kompatibilní s připnutým DocFX. Lokálně platí [pravidla výběru](dependencies.md#výběr-net-sdk) | Instalační kanál CI v [quality workflow](../../.github/workflows/quality.yml) a [publish workflow](../../.github/workflows/main.yml) | Lokální instalace. GitHub Actions ji obnovuje přes `setup-dotnet` | `dotnet --version` |
| DocFX | Přesná verze v [`.config/dotnet-tools.json`](../../.config/dotnet-tools.json) | [`.config/dotnet-tools.json`](../../.config/dotnet-tools.json) | Lokální .NET tool obnovený do řízené cache | `dotnet tool run docfx -- --version` |
| Git | Libovolná udržovaná verze podporující projektový workflow | Git instalace a [`workflow.md`](workflow.md) | Lokální | `git --version` |

Verzi nekopíruj do této tabulky, pokud ji lze jednoznačně načíst ze strojového souboru.

V takovém případě uveď pouze odkaz na tento zdroj a příkaz pro ověření.

## Inicializace prostředí

| Účel | Pracovní adresář | Přesný příkaz | Očekávaný výsledek | Síťové požadavky |
|---|---|---|---|---|
| Obnovení připnutých npm závislostí | Kořen repozitáře | `npm ci --ignore-scripts --no-audit --no-fund` | Přesné balíčky z lockfilu a dostupný lokální `git-cliff` | První obnova vyžaduje npm registry nebo odpovídající cache |
| Obnovení připnutého DocFX | Kořen repozitáře | `dotnet tool restore` | Příkaz obnoví přesnou verzi z tool manifestu a skončí kódem 0 | První obnova vyžaduje NuGet nebo odpovídající cache |

`npm ci` znovu vytvoří ignorovaný `node_modules/` a nesmí změnit `package-lock.json`.

Při hlášení o chybějícím SDK spusť z kořene repozitáře `dotnet --list-sdks` pro seznam instalací a `dotnet --version` pro ověření skutečného výběru.

Obnovení přes `dotnet tool restore` instaluje DocFX, nikoli chybějící SDK.

Pravidla aktualizace nástrojů vlastní [politika závislostí](dependencies.md).

## Sestavení

| Varianta | Pracovní adresář | Přesný příkaz | Výstup | Úspěch znamená |
|---|---|---|---|---|
| Strict lokální sestavení | Kořen repozitáře | `npm run docs:build` | Ignorovaný `changelog.md` a čistý adresář `_site/` | Changelog se vytvoří z úplné historie, DocFX skončí s 0 warningy a 0 chybami a artifact check potvrdí veřejnou hranici i lokální odkazy včetně kotev |
| Samotná kompilace pro diagnostiku | Kořen repozitáře | `npm run docs:compile` | Adresář podle [`docfx.json`](../../docfx.json) | DocFX skončí s 0 warningy a 0 chybami. Příkaz sám nečistí ani nekontroluje stale výstup |

`npm run docs:build` je jediný podporovaný kandidát pro publikování.

Před kompilací odstraní pouze odvozený ignorovaný `_site/` a po kompilaci ověří manifest, fyzické výstupní cesty a odkazy v HTML včetně kotev a přesného casingu.

Během sestavení může být místní `_site/` krátce neúplný, proto jej kontroluj až po úspěšném dokončení příkazu.

## Spuštění

| Scénář | Pracovní adresář | Přesný příkaz | Adresa nebo rozhraní | Bezpečné zastavení |
|---|---|---|---|---|
| Hlavní lokální běh | Kořen repozitáře po úspěšném buildu | `npm run docs:serve` | `http://127.0.0.1:4173` | `Ctrl+C` v terminálu se serverem |

Lokální server nevyžaduje tajemství ani externí službu.

Pokud je port `4173` obsazený, příkaz skončí chybou a běžící cizí proces se automaticky neukončuje.

Pro jednorázové použití jiného volného portu předej DocFX argumenty například jako `npm run docs:serve -- --port 49673` a otevři odpovídající adresu na `127.0.0.1`.

## Statické kontroly

| Kontrola | Přesný příkaz | Rozsah | Oprava formátu | Očekávaný výsledek |
|---|---|---|---|---|
| Generovaný drift, veřejná navigace a lokální odkazy | `npm run docs:check` | Nejprve obnoví ignorovaný changelog, potom ověří veřejné Markdown stránky, cesty, indexy a TOC | `npm run docs:generate` | Kód 0 a výstup `Dokumentace je aktuální.` |
| JavaScript syntax | `npm run lint` | Generátor, aktivní browserový modul a testy | Ruční oprava zdroje | Všechny `node --check` kroky skončí kódem 0 |
| Kanonická projektová metadata a interní odkazy | `npm test` | Dokumentační metadata, veřejná hranice, casing, interní odkazy a agentní adaptér | Ruční oprava kanonického zdroje | Všechny Node testy projdou |
| DocFX strict kompilace | `npm run docs:compile` | Povolené veřejné vstupy a aktivní šablona | — | 0 warningů a 0 chyb |

Projekt nemá samostatný typový systém ani obecný formátovací nástroj.

Generátor normalizuje pouze veřejný Markdown ve svém vlastním rozsahu a nesmí upravovat kanonické projektové dokumenty.

Normalizace mezer a interpunkce zachovává obsah vloženého Markdown kódu, aby příkazy v tabulkách a textu zůstaly použitelné.

## Testy

Strategie výběru testů je v [`../quality/testing.md`](../quality/testing.md).

Zde jsou pouze přesné podporované příkazy.

| Úroveň | Přesný příkaz | Potřebné služby | Výstupní artefakty | Typická doba nebo rozsah |
|---|---|---|---|---|
| Cílený test veřejné hranice a normalizace | `node --test --test-isolation=none tests/generate-docs.test.js` | Žádné | Konzolový TAP výstup | Hranice veřejného obsahu, normalizace kódu, české tokeny, casing a odkazy včetně kotev, běžně pod 1 sekundu |
| Cílený test changelogu | `node --test --test-isolation=none tests/changelog.test.mjs` | Lokální Git a obnovený `git-cliff` | Konzolový TAP výstup | Víceletá úplná fixture historie, otevřené nejnovější období, sdělení o vynechávání prázdných roků, sbalená starší období, jejich počty a kategorie, stabilní kotvy, breaking change, neklikací hashe a dvě časová prostředí |
| Automatizované testy | `npm test` | Lokální Git a obnovené npm závislosti | Konzolový TAP výstup | Všechny testovací soubory uvedené v `package.json`. Aktuální počet vypíše runner |
| Vizuální scénáře | `npm run docs:serve` a kroky níže | Předem vytvořený `_site/` a lokální prohlížeč | Vizuální pozorování, případně screenshot | Ruční smoke po rizikové změně UI, vyhledávání nebo navigace |
| Integrační build | `npm run docs:build` | Obnovené npm závislosti a lokální DocFX | `changelog.md`, `_site/manifest.json`, HTML a konzolový souhrn | Veřejný changelog a ostatní stránky vzniknou bez warningu. Běžně jednotky sekund na ověřeném stroji |
| Úplná lokální kontrola | `npm run verify` | Obnovené npm závislosti a lokální DocFX | TAP, DocFX log, `changelog.md`, manifest a `_site/` | Kontrola driftu, syntax, testy, generování changelogu, strict build a artifact check |

## Úprava nebo přidání článku

1. Vyber existující tematickou složku a zkontroluj, zda postup už nevlastní jiný článek.
2. Uprav jeho Markdown, nebo přidej nový soubor s malými písmeny a pomlčkami v názvu.
   Každý navigovaný článek potřebuje metadata `description: "Stručný přímý popis obsahu."` před prvním nadpisem v YAML front matter.
3. U nového článku přidej položku `name` a relativní `href` do odpovídající skupiny `navigation` v [`scripts/generate-docs.js`](../../scripts/generate-docs.js).
4. Spusť `npm run docs:generate`, zkontroluj Git diff a následně `npm run verify`.
5. Otevři sestavenou stránku a ověř navigaci, příklad i zobrazení podle smoke scénáře níže.

`sectionInfo` vlastní názvy a úvody hlavních oblastí, `sectionOrder` jejich pořadí a `navigation` podskupiny i články.

Stručné popisy řádků rozcestníku vlastní `description` cílového článku, nikoli jeho první odstavec nebo kopie v navigačním registru.

Pro rozměr snímku použij například `<img src="../images/dialog.png" alt="Nastavení dialogu" width="420">` se skutečnou cestou, popisem a posouzenou šířkou.

HTML obrázek s kladným width zůstává při normalizaci zachovaný.

Širší obsah se na mobilu zmenší podle CSS.

`docs:generate` přepíše odvozené indexy a TOC a normalizuje veřejné zdroje, proto před spuštěním zkontroluj pracovní strom.

Existující cesty nepřejmenovávej jen kvůli změně titulku a nový postup neduplikuj do více rozcestníků.

Obsahový standard vlastní [správa dokumentace](../governance/documentation.md#čitelnost-veřejných-návodů).

Pro přepínání samostatných variant lze použít nativní [záložky DocFX](https://dotnet.github.io/docfx/docs/markdown.html#tabs) se zápisem `## [Windows](#tab/jedinecne-id)`.

Skupinu ukonči samostatným řádkem `***`, aby společný postup za záložkami zůstal viditelný pro každou variantu.

Nepoužívej zde `---`, protože jej projektový normalizátor mimo metadata odstraňuje.

Přesný ampersand v názvu položky rozhraní mimo vložený kód zapisuj jako `&amp;`, aby jej normalizátor nepřevedl na české „a“.

Záložky a jejich obsah ověř v sestaveném webu včetně klávesnice a mobilní šířky.

Popisky dílčích variant uvnitř záložek zapisuj jako zvýrazněné odstavce, pokud nemají být v globálním obsahu stránky.

Odkaz obsahu na nadpis uvnitř skryté záložky totiž sám odpovídající záložku neotevře.

## Changelog

Každé sestavení odvozuje ignorovaný `changelog.md` z úplné dosažitelné Git historie pomocí přesně uzamčeného `git-cliff`.

Konfigurace v [`../../cliff.toml`](../../cliff.toml) zachovává nekonvenční commity, uvádí přesný zdrojový commit a celkový počet záznamů a seskupuje změny podle kalendářního roku v časovém pásmu `Europe/Prague`.

Rok nejnovějšího zahrnutého commitu je nejnovější otevřené období a uvádí vlastní počet změn.

Roky bez zahrnutých změn se nevykreslují a každý starší zobrazený rok je samostatný sbalený blok `<details>` se stejným údajem.

Uvnitř každého období zůstávají české kategorie, zvýrazněné breaking changes a sbalené technické typy.

Dosavadní stabilní kotva každé kategorie směřuje na její nejnovější výskyt a všechna období přidávají kotvy rozlišené rokem.

Release tagy historii nerozdělují a commity se zobrazují pouze krátkým neklikacím hashem.

| Účel | Přesný příkaz | Vedlejší účinek | Očekávaný výsledek |
|---|---|---|---|
| Náhled bez zápisu | `npm exec -- git-cliff --config cliff.toml` | Žádný soubor se nezmění | Úplný Markdown na standardním výstupu |
| Vytvoření vstupu pro sestavení | `npm run changelog:generate` | Přepíše pouze ignorovaný `changelog.md` | Úplný přehled s identitou zdroje, otevřeným nejnovějším obdobím, sdělením o vynechávání roků bez změn, sbalenými staršími roky, počty změn a kategoriemi |

`npm run docs:build` tento krok provádí automaticky před DocFX.

Při chybě `git-cliff`, která ve Windows hlásí odepřený přístup k cestě repozitáře, použij [diagnostiku omezeného sandboxu](../operations/runbook.md#symptom-windows-sandbox-blokuje-přístup-git-cliff).

## Reprezentativní smoke scénář

| Požadavek | Příprava | Kroky nebo příkaz | Očekávaný technický důkaz | Úklid |
|---|---|---|---|---|
| `REQ-001`, `REQ-002` | `npm ci --ignore-scripts --no-audit --no-fund`, `dotnet tool restore` a `npm run verify` | Spusť `npm run docs:serve`, otevři `http://127.0.0.1:4173`, přejdi z homepage do tematického článku a vyhledej výraz `Docker` | Homepage, navigace, cílový článek i výsledky vyhledávání jsou viditelné bez konzolové chyby blokující scénář | Ukonči server pomocí `Ctrl+C`. `_site/` lze bezpečně odstranit přes `npm run docs:clean` |
| `REQ-E002` | Žádná | Spusť `node --test --test-isolation=none tests/generate-docs.test.js` | Negativní příklady interních zdrojů a výstupů jsou odmítnuté a test přesného casingu projde | Žádný |

### Vizuální kontrola po změně obsahu nebo šablony

Na šířkách **320, 390, 768 a 1440 px** ověř světlý i tmavý motiv pro homepage, přehled Programování, Docker a reprezentativní článek s kódem, obrázky a rozbalovacím blokem.

1. Otevři navigaci, přejdi do oblasti a článku a použij obsah stránky.
2. Vyhledej `Docker`, otevři výsledek ve stejné kartě a potom ověř srozumitelný stav pro neexistující výraz.
3. Klávesnicí použij odkaz **Přejít k obsahu**, ovladač motivu a rozbalení doplňujícího postupu.
4. Ověř kopírování kódu, čitelnost syntaxe a vlastní vodorovný posuv pouze uvnitř široké ukázky nebo tabulky.
5. Po změně motivu znovu načti stránku a ověř zachování volby. Zkontroluj i automatický režim.
6. Projdi konec dlouhého článku, obrázky a případné video, aby obsah nevytvářel vodorovný posuv celé stránky.

Při selhání zaznamenej přesnou stránku, rozměr, motiv a pozorovaný problém.

Přepnutí do jiného prohlížeče není náhradou opravy reprodukovatelné regrese.

Lokální DocFX server může vracet statické soubory s cache na 60 sekund.

Po změně šablony a novém buildu použij úplné obnovení stránky bez cache.

Běžné obnovení může krátce ponechat starý dynamicky importovaný `main.js`.

Externí odkazy kontroluj odděleně podle rizika.

Odmítnutí HTTP požadavku nebo rate limit není samo důkazem zániku cílového dokumentu.

## Shoda lokálního prostředí a CI

CI obnovuje npm závislosti z lockfilu a musí používat stejné projektové vstupní příkazy jako lokální vývoj.

Workflow nesmí obsahovat skrytou alternativní sestavovací logiku, kterou nelze lokálně zopakovat.

Platformní obal, cache a publikování patří do [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

## Pravidlo ověření

Příkaz se do tohoto dokumentu zapíše až po skutečném spuštění v podporovaném prostředí.

Při změně skriptu, manifestu, verze nástroje nebo názvu cíle se tento dokument aktualizuje ve stejné změně.
