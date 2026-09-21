---
canonical_for: product-requirements
status: accepted
last_verified: 2026-09-19
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
| Čtenář včetně juniorního programátora | Rychle najít postup, pochopit jeho princip a přizpůsobit příklad | Veřejný statický web v desktopovém nebo mobilním prohlížeči | Obsah musí zůstat čitelný bez účtu a serverové relace |
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
- Automatické spouštění publikovaných ukázek proti uživatelským účtům, produkčním službám nebo skutečným datům.

## Produktová omezení

Technická omezení vlastní [architektonický přehled](../architecture/overview.md).

- Veřejný obsah a rozhraní webu jsou primárně v češtině.
- Veřejné rozhraní nenabízí odkaz pro editaci stránky ani zobrazení zdrojového souboru.
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
| `REQ-004` | Změna na větvi `main` splnila projektové kontroly | GitHub Actions spustí publikační workflow | Workflow sestaví jediný ověřený statický artefakt, veřejný changelog v něm zachová úplnou historii, nejnovější rok změn nechá otevřený, roky bez změn vynechá, starší zobrazené roky sbalí a web publikuje bez změny zdrojové větve | Must | Cílený changelogový test, konfigurace workflow a úspěšný vzdálený běh po publikování změny |
| `REQ-005` | Junior otevře návod bez znalosti konkrétního nástroje | Přečte úvod, předpoklady a provede popsaný příklad | Rozumí účelu, vztahu částí, upravitelným hodnotám i očekávanému výsledku. Nezbytné informace nejsou ukryté v rozbalovacím bloku | Must | Obsahové review podle pravidel čitelnosti a dostupné ověření ukázky |
| `REQ-006` | Čtenář vybírá článek nebo používá příkazovou referenci | Prohlédne rozcestník a tabulku příkazů | Popis rovnou označuje obsah cíle. Syntaxe odlišuje dosazované parametry od vysvětleného spustitelného příkladu | Must | Kontrola metadat, obsahové review a skutečně vykreslené tabulky |
| `REQ-007` | Solo vývojář zná jen základy Gitu | Vybere způsob práce a řeší běžnou operaci nebo chybu | Rozumí více workflow, změně pracovního stromu, indexu a historie i bezpečnému pokračování nebo návratu | Must | Praktické scénáře v izolovaných repozitářích a kontrola návaznosti návodů |
| `REQ-008` | Čtenář připravuje přesun balíčků bez internetu | Vybere správce, dostupný rozsah a akci jediného interaktivního PowerShell skriptu | Záloha zahrne všechny přímo instalované balíčky zvoleného globálního nebo vlastního rozsahu a jejich závislosti, ověří offline použitelnost a odmítne nepodporované zdroje. Obnova nainstaluje celý uložený seznam bez registru a archiv zachová. Samostatná kontrolní akce ověří archiv bez instalace; volitelná úklidová akce jej odstraní až po kontrole a výslovném potvrzení | Must | Primární dokumentace správců, izolované zálohy a skutečné offline obnovy více balíčků, kontrola poškozeného a staršího archivu, zrušeného a potvrzeného úklidu a sestavených záložek |

### Uspořádání praktických témat

Verzování rozlišuje začátky, každodenní práci, historii s řešením problémů a vydávání se správou projektu.

Přesun commitů má zahrnovat novou i existující větev, uchování práce v cíli a následný úklid zdroje.

Samostatný postup popisuje nahrazení historie vzdálené větve jediným místním kořenovým commitem.

Programování odděluje Balíčky od Vývojových nástrojů.

Přesun mezi skupinami sám nemění existující veřejnou cestu článku.

Návody balíčků rozlišují globální, projektové a vlastní umístění podle možností konkrétního správce.

Přepínače v článku oddělují zálohu a obnovu a skripty nabízejí chybějící volby interaktivně.

Zkouška obnovy nesmí spoléhat na původní pracovní instalaci nebo skrytou cache.

Hlavní offline postup má přímo uvést, co připravit, co přenést a co spustit na cíli.

Diagnostická izolace testovacího prostředí není povinným krokem běžné obnovy na novém počítači.

`-Archiv` vždy znamená přesnou složku archivu. Každá akce bez tohoto přepínače ukáže výchozí cestu a umožní ji potvrdit nebo změnit; zveřejněné příklady zálohy a obnovy používají stejné umístění.

Globální, lokální a vlastní .NET tools se obnovují z místního NuGet feedu do nového cíle.

Zálohy image a provozních dat patří k Dockeru ve Virtualizaci a zálohy zdrojové historie k Gitu.

Přehled balíčků na ně odkazuje bez duplikace postupů.

Rozsah nezahrnuje Docker podstránky Bezpečný upgrade stateful služby, Portainer, Duplicati a BusyBox ani sekci klávesových zkratek JetBrains.

Regulární výrazy JetBrains mají samostatný návod a význam zápisu příkazů společný článek v OS.

Síť začíná vztahy adres, názvů a portů.

OS odděluje rychlé použití shellu od jeho nastavení a SQL dávku vlastní databázová oblast.

Skupina Notebooky v OS vlastní [omezení nabíjení na 80 %](../../operating-system/laptop-battery.md) podle systému, výrobce a podporované modelové řady.

## Chybové a hraniční scénáře

| ID | Podmínka | Očekávané chování | Dopad při selhání | Způsob ověření |
|---|---|---|---|---|
| `REQ-E001` | Veřejný článek chybí v registru, lokální odkaz neexistuje nebo se generovaný soubor liší | Kontrola skončí nenulovým kódem a uvede konkrétní cestu. Změna se nesmí považovat za připravenou | Rozbitá navigace nebo nedostupný obsah | Negativní test generátoru a `npm run docs:check` |
| `REQ-E002` | DocFX manifest nebo výstup obsahuje interní `docs/`, agentní instrukci, README nebo jinou vyloučenou cestu | Ověření artefaktu skončí nenulovým kódem a publikování se zastaví | Únik interních pracovních informací | Jednotkové testy hranice a `npm run docs:artifact-check` |
| `REQ-E003` | DocFX při sestavení zjistí warning nebo chybu | Strict build skončí nenulovým kódem a nevznikne publikovatelný výsledek | Neúplný nebo nekonzistentní web | `npm run docs:compile` s `--warningsAsErrors` |
| `REQ-E004` | Navigovaný článek nemá platný stručný popis | Generátor uvede konkrétní soubor a skončí chybou bez náhrady úvodním odstavcem | Nejasné, duplicitní nebo rozbité popisy rozcestníku | Negativní test metadat a `docs:check` |

## Kvalitativní očekávání

Kvalitativní požadavky se ověřují nad zdrojovým obsahem i sestaveným webem.

| ID | Oblast | Scénář | Měřítko nebo hranice | Priorita |
|---|---|---|---|---|
| `QLT-001` | Konzistence | Po vygenerování beze změny vstupů proběhne kontrola znovu | Návratový kód 0 a žádný hlášený soubor k aktualizaci | Must |
| `QLT-002` | Reprodukovatelnost | Čisté podporované prostředí obnoví deklarované nástroje a sestaví web | `npm run verify` skončí kódem 0, DocFX má 0 warningů a 0 chyb | Must |
| `QLT-003` | Ochrana interního obsahu | Každý kandidátní artefakt projde kontrolou veřejné hranice | 0 interních zdrojů a 0 interních výstupních cest | Must |
| `QLT-004` | Přenositelnost cest | Stejný checkout se ověřuje na Windows i linuxovém CI runneru | Kanonické cesty používají přesný lowercase casing a hranicové testy projdou v obou prostředích | Must |
| `QLT-005` | Čitelnost a přístupnost | Čtenář používá mobil, tablet nebo desktop a zvolí světlý či tmavý motiv | Bez vodorovného přetékání celé stránky při 320, 390, 768 a 1440 px. Dostupná navigace, fokus, čitelný text a kód v obou motivech | Must |
| `QLT-006` | Odkazy na obsah | Sestavený článek odkazuje na jinou stránku nebo její nadpis | 0 neexistujících lokálních souborů, rozdílů casingu a neplatných kotev v HTML | Must |

## Slovník produktových pojmů

Technické pojmy vlastní [architektonický slovník](../architecture/overview.md#12-architektonický-slovník).

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
