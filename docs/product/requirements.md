---
canonical_for: product-requirements
status: accepted
last_verified: 2026-08-28
owner: product
---

# Produktový záměr a požadavky

Tento dokument je jediným kanonickým zdrojem produktového záměru, rozsahu a pozorovatelného chování.

Technické řešení patří do [`../architecture/overview.md`](../architecture/overview.md).

## Problém a očekávaný přínos

Praktické technické poznámky uložené jako izolované soubory se obtížně procházejí, vyhledávají a dlouhodobě udržují v konzistentní struktuře.

Projekt je sjednocuje do české osobní vývojářské znalostní báze, ve které čtenář najde tematický přehled, vyhledávání a navazující návody na jednom veřejném webu.

Správci umožňuje udržovat zdrojové články v Gitu a před publikováním mechanicky ověřit navigaci, lokální odkazy a výsledný artefakt.

## Uživatelé a další aktéři

| Aktér | Potřeba | Kontext použití | Kritické omezení |
|---|---|---|---|
| Čtenář | Rychle najít praktický technický postup nebo referenci | Veřejný statický web v desktopovém nebo mobilním prohlížeči | Obsah musí zůstat čitelný bez účtu a serverové relace |
| Správce obsahu | Přidat, upravit a publikovat článek bez ruční synchronizace přehledů | Git checkout, lokální nástroje a GitHub Actions | Zdrojová a generovaná část musí zůstat jednoznačně rozlišená |

## Cíle

- Zpřístupňovat praktické technické návody a reference podle stabilních tematických oblastí.
- Umožnit plnotextové vyhledávání a navigaci mezi souvisejícími stránkami.
- Udržet generované přehledy, TOC a lokální odkazy v souladu se zdrojovými články.
- Publikovat pouze ověřený veřejný obsah bez interních projektových dokumentů.

## Mimo rozsah

- Autentizace, uživatelské účty, komentáře a dynamická redakční administrace.
- Úplná kopie nebo náhrada autoritativní dokumentace všech popisovaných technologií.
- Serverový aplikační runtime, databáze a uživatelská data.
- Plošná odborná revize všech historických článků v rámci jedné infrastrukturní změny.

## Produktová omezení

Zapiš pouze omezení, která mají skutečný produktový nebo obchodní původ.

Technická omezení zaznamenej v architektonickém přehledu a zde na ně odkaž.

- Veřejný obsah a rozhraní webu jsou primárně v češtině.
- Web musí být použitelný jako statický artefakt bez backendu.
- Veřejné relativní URL a jejich přesný casing jsou pozorovatelnou kompatibilitou.
- Hosting zůstává na GitHub Pages, dokud vlastník nepřijme jiný distribuční model.

## Kanonické scénáře chování

Každý významný scénář má stabilní identifikátor.

Pracovní záznamy, testy a změny odkazují na identifikátor místo kopírování jeho znění.

| ID | Aktér a výchozí stav | Spouštěcí akce | Pozorovatelný výsledek | Priorita | Způsob ověření |
|---|---|---|---|---|---|
| `REQ-001` | Čtenář otevře kořenovou stránku bez předchozí relace | Vybere tematickou oblast a konkrétní článek | Zobrazí se přehled oblastí, navigace a obsah vybrané stránky bez přihlášení | Must | Vizuální smoke scénář nad lokálním DocFX webem |
| `REQ-002` | Čtenář je na libovolné veřejné stránce | Zadá technický termín do vyhledávání | Web nabídne odpovídající stránky a umožní otevřít zvolený výsledek | Should | Vizuální smoke scénář nad vytvořeným vyhledávacím indexem |
| `REQ-003` | Správce upravil zdrojový článek nebo registr navigace | Spustí podporované generování a kontrolu | Přehledy, TOC, cesty a lokální odkazy jsou deterministicky sjednocené a následná kontrola nehlásí drift | Must | `npm run docs:generate` a následné `npm run docs:check` |
| `REQ-004` | Změna na větvi `main` splnila projektové kontroly | GitHub Actions spustí publikační workflow | Workflow sestaví jediný ověřený statický artefakt a publikuje jej bez změny zdrojové větve | Must | Konfigurace workflow a úspěšný vzdálený běh po publikování změny |

## Chybové a hraniční scénáře

| ID | Podmínka | Očekávané chování | Dopad při selhání | Způsob ověření |
|---|---|---|---|---|
| `REQ-E001` | Veřejný článek chybí v registru, lokální odkaz neexistuje nebo se generovaný soubor liší | Kontrola skončí nenulovým kódem a uvede konkrétní cestu; změna se nesmí považovat za připravenou | Rozbitá navigace nebo nedostupný obsah | Negativní test generátoru a `npm run docs:check` |
| `REQ-E002` | DocFX manifest nebo výstup obsahuje interní `docs/`, agentní instrukci, README nebo jinou vyloučenou cestu | Ověření artefaktu skončí nenulovým kódem a publikování se zastaví | Únik interních pracovních informací | Jednotkové testy hranice a `npm run docs:artifact-check` |
| `REQ-E003` | DocFX při sestavení zjistí warning nebo chybu | Strict build skončí nenulovým kódem a nevznikne publikovatelný výsledek | Neúplný nebo nekonzistentní web | `npm run docs:compile` s `--warningsAsErrors` |

## Kvalitativní očekávání

Kvalitativní požadavek formuluj jako ověřitelný scénář s podmínkou, očekávanou odezvou a měřitelnou hranicí.

Konkrétní architektonická opatření patří do architektonického přehledu.

| ID | Oblast | Scénář | Měřítko nebo hranice | Priorita |
|---|---|---|---|---|
| `QLT-001` | Konzistence | Po vygenerování beze změny vstupů proběhne kontrola znovu | Návratový kód 0 a žádný hlášený soubor k aktualizaci | Must |
| `QLT-002` | Reprodukovatelnost | Čisté podporované prostředí obnoví deklarované nástroje a sestaví web | `npm run verify` skončí kódem 0, DocFX má 0 warningů a 0 chyb | Must |
| `QLT-003` | Ochrana interního obsahu | Každý kandidátní artefakt projde kontrolou veřejné hranice | 0 interních zdrojů a 0 interních výstupních cest | Must |
| `QLT-004` | Přenositelnost cest | Stejný checkout se ověřuje na Windows i linuxovém CI runneru | Kanonické cesty používají přesný lowercase casing a hranicové testy projdou v obou prostředích | Must |

## Slovník produktových pojmů

Termín definuj pouze zde, pokud vyjadřuje produktový nebo doménový význam.

Technické pojmy patří do architektonického slovníku.

| Termín | Kanonický význam |
|---|---|
| Zdrojový článek | Ručně udržovaná tematická Markdown stránka bez markeru generovaného souboru |
| Generovaná navigace | Indexy a soubory `toc.yml` odvozené ze strojového registru v generátoru |
| Veřejný obsah | Články a přílohy, které smějí vstoupit do DocFX artefaktu a GitHub Pages |
| Projektová dokumentace | Interní kanonické dokumenty v `docs/`, které řídí vývoj a nesmějí se publikovat jako obsah webu |

## Pravidla změn požadavků

Akceptační kritérium se nesmí měnit pouze proto, aby prošla existující implementace nebo test.

Změna významného chování musí vzniknout z přijatého produktového rozhodnutí a současně aktualizovat scénář, testy, architekturu a veřejné rozhraní, pokud jsou dotčené.

Odstraněný požadavek se z historie změn nemaže bez vysvětlení v odpovídajícím rozhodnutí nebo změnovém záznamu projektu.
