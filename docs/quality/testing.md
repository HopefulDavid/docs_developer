---
canonical_for: testing-strategy
status: accepted
last_verified: 2026-09-19
owner: quality
---

# Strategie testování

## Cíl

Testy chrání důležité pozorovatelné chování, klíčové scénáře a reálná rizika.

Nevznikají kvůli formálnímu počtu, procentu pokrytí ani testování triviálních implementačních detailů.

Testovací strategie se odvozuje z produktových scénářů, architektury, historie závad a dopadu selhání.

## Projektový testovací profil

Nejvyšší rizika tohoto statického webu jsou rozbitá navigace, rozdílný casing cest, nechtěné zveřejnění interních souborů, warningy DocFX a nefunkční čtenářský tok po změně šablony.

| Riziko nebo požadavek | Primární důkaz | Proč tato úroveň stačí |
|---|---|---|
| `REQ-003`, `REQ-E001`, `QLT-001` | `npm run docs:check` | Ověřuje skutečný registr, všechny veřejné stránky, lokální odkazy a generovaný drift bez zápisu |
| Poškození příkazů při normalizaci Markdownu | Cílený Node test normalizace a kontrola sestaveného článku | Chrání mezery, interpunkci a znaky shellu uvnitř vloženého kódu v textu i tabulkách včetně různě dlouhých oddělovačů |
| `REQ-006`, `REQ-E004` a rozměry obrázků | Testy popisných metadat a zachování šířky, poté kontrola skutečného HTML | Odmítají návrat k úvodním odstavcům v rozcestníku a chrání autorem posouzené rozměry při regeneraci |
| `REQ-E002`, `QLT-003`, `QLT-004` | Node testy v [`tests/`](../../tests) a artifact check | Negativní příklady chrání klasifikaci a celý sestavený výstup potvrzuje integrační hranici |
| `REQ-E003`, `QLT-002` | `npm run docs:build` s warningy jako chybami | Testuje skutečný DocFX, šablonu, manifest a výsledné HTML místo náhrady build systému |
| České rozhraní bez editačních odkazů | Node test globálních metadat a tokenů, poté skutečný DocFX build | Chrání `_lang`, `_disableContribution` a české popisky a potvrzuje jejich výsledné HTML |
| Neúplný, nečitelný nebo prostředím ovlivněný changelog | Skutečný `git-cliff` nad víceletou dočasnou historií s tagem, conventional, breaking i legacy commitem ve dvou časových prostředích | Chrání úplnost historie, otevřené nejnovější období, sdělení o vynechávání prázdných roků, sbalená starší období, počty a kategorie v každém roce, stabilní kotvy, technické záznamy, breaking marker a determinismus výstupu |
| `REQ-001`, `REQ-002` | Krokovatelný lokální smoke v prohlížeči | Zobrazení, navigace, vyhledávání a volba tématu jsou pozorovatelné až v reálném browserovém výstupu |
| `REQ-005` | Obsahové review a provedení dostupných ukázek v izolovaném prostředí | Rozlišuje vysvětlení principu, syntaxi a skutečný běh místo předstírání podpory cizí služby |
| `QLT-005` | Reálný prohlížeč, čtyři šířky a oba motivy podle příkazového dokumentu | Zachytí přetékání, nečitelné tabulky, klávesnicové problémy a změny rozložení po otevření menu |
| `QLT-006` | Artifact check nad všemi HTML a cílené negativní testy | Ověří konkrétní cíle i kotvy bez závislosti na Windows toleranci casingu. Externí URL nejsou součástí deterministického buildu |
| Metadata a interní dokumentační odkazy | `tests/canonical-docs.test.js` | Mechanická pravidla mají rychlý deterministický důkaz bez zahrnutí interních dokumentů do veřejného buildu |

Přesné příkazy, pořadí a technický smoke scénář vlastní [`../development/commands.md`](../development/commands.md).

Changelogový test vytváří izolovaný víceletý Git repozitář v dočasném adresáři a spouští stejný uzamčený binární příkaz jako projektový build bez změny pracovního stromu.

Následně kontroluje i vazbu hlavičky na jeho skutečný `HEAD` a zařazení hraničního commitu na přelomu roku podle `Europe/Prague`.

Projekt nemá schválenou pixelovou baseline ani automatizovaný end-to-end browser harness.

Automatický vizuální nástroj se zavede pouze tehdy, když opakované UI regrese nebo rozsah interakce ospravedlní jeho závislosti a údržbu.

Jednorázové testovací repozitáře, instalace balíčků a jejich cache vytvářej mimo pracovní checkout, například v samostatné složce systémového TEMP.

Ani ignorovaná složka uvnitř projektu není vhodná pro vnořené Git repozitáře: vývojové prostředí je může zobrazovat jako další projekty a větve.

Do kanonické dokumentace přenes důkaz a jeho omezení.

Po ověření ukliď jednorázové prostředí a případné logy ponech mimo projekt.

## Volba typu testu

Nejprve určuj, co musí být pozorovatelné a jaké riziko test snižuje.

Teprve poté vybírej nástroj a úroveň.

| Potřeba nebo riziko | Preferovaný důkaz |
|---|---|
| Vizuální uživatelský tok | Krokovatelný scénář v reálném nebo věrohodném UI s viditelným výsledkem |
| Vzhled, rozložení nebo stav komponenty | Vizuální komponentový scénář a cílené porovnání stabilního výstupu |
| Integrace více částí systému | Integrační test přes skutečné hranice s kontrolovanými závislostmi |
| Veřejný protokol nebo kompatibilita | Kontraktní test proti kanonickému schématu |
| Doménové pravidlo bez UI | Rychlý automatizovaný test pozorovatelného výsledku |
| Mnoho kombinací vstupů a invariantů | Parametrizovaný nebo vlastnostní test |
| Souběh, opakování nebo idempotence | Cílený test selhání a opakovaného provedení |
| Výkonová hranice | Reprodukovatelný benchmark nebo zátěžový scénář |
| Bezpečnostní hranice | Negativní test a odpovídající bezpečnostní kontrola |
| Nasazení nebo obnova | Smoke test prostředí, rollback nebo řízené cvičení obnovy |

Jedna funkce může potřebovat více vrstev pouze tehdy, když každá chrání jiné důležité riziko.

Stejný scénář nekopíruj na všech úrovních bez odlišné hodnoty.

## Vizuálně sledovatelné scénáře

Vše, co lze smysluplně ověřit vizuálně, testuj tímto způsobem.

Vizuální test má umožnit sledovat kroky, stav aplikace a konečný výsledek.

Preferuj nástroj přirozený pro technologii projektu, například browser test s trace, komponentový scénář nebo řízený desktopový tok.

Vizuální scénář musí:

- odkazovat na produktový identifikátor `REQ-*`,
- začínat z deterministického a pochopitelného stavu,
- používat významné uživatelské kroky místo interních selektorových triků,
- zpřístupnit screenshot, trace, video nebo stav komponenty tam, kde pomůže diagnostice,
- ověřit viditelný výsledek a důležité vedlejší účinky,
- po sobě bezpečně uklidit data nebo používat izolovaný kontext,
- být krokovatelný lokálně bez závislosti pouze na CI.

Trace a obrazové artefakty se standardně uchovávají při selhání nebo podle projektové retenční politiky.

Citlivá data se do nich nesmějí dostat.

Vizuální snapshot se používá pouze pro stabilní zobrazení, u kterého změna pixelů představuje skutečné riziko.

Masivní snapshot celé aplikace není náhradou srozumitelných scénářů.

## Automatizované nevizuální testy

Chování, které vizuálně testovat nelze nebo by to nedávalo smysl, ověř automatizovaným testem na nejnižší úrovni, která zachovává důležitý kontrakt.

Nevaz test na soukromé pořadí volání, pokud toto pořadí není součástí chování.

Mock použij pro kontrolovanou hranici, nikoli jako kopii interní implementace.

Databázi, frontu nebo protokol nahrazuj pouze tehdy, když test neztrácí riziko, které má chránit.

Preferuj malou sadu rychlých testů pro čistá pravidla, dostatečné integrační testy pro hranice a několik reprezentativních end-to-end scénářů.

Přesný poměr není univerzální a vychází z architektury projektu.

Pomalý test bez jedinečné hodnoty odstraň nebo přesuň na vhodnější úroveň.

## Co netestovat

Nevytvářej test pouze pro:

- automatické gettery a settery bez chování,
- konstruktor, který pouze přiřazuje hodnoty,
- konstantu nebo mapování zaručené kompilátorem,
- soukromou metodu oddělenou od pozorovatelného výsledku,
- implementační detail, který lze libovolně refaktorovat,
- třetí stranu bez vlastní integrační hranice,
- generovaný kód,
- duplicitní pokrytí stejného triviálního případu.

Výjimka je přípustná, pokud zdánlivě triviální prvek chrání historickou regresi, kompatibilitu nebo bezpečnostní invariant.

Důvod musí být z testu zřejmý.

## Výběr scénářů podle rizika

Každý důležitý scénář posuzuj podle dopadu, pravděpodobnosti, zjistitelnosti a ceny opravy.

Prioritu mají zejména:

- ztráta nebo poškození dat,
- porušení bezpečnosti nebo oprávnění,
- nesprávná platba nebo jiný nevratný účinek,
- porušení veřejné kompatibility,
- nedostupnost hlavní uživatelské cesty,
- chyby v migraci, rollbacku nebo opakování,
- historicky častá regrese,
- složitá hranice mezi moduly nebo systémy.

Pokrytí řádků je diagnostická metrika.

Není cílem ani důkazem správnosti.

Nízké pokrytí kritického toku je problém, i když celkové procento vypadá dobře.

## Průběžné ověřování změny

Před změnou spusť baseline relevantní pro dotčenou oblast.

Během práce používej nejrychlejší test, který spolehlivě zachytí aktuální riziko.

Po dokončení spusť cílené scénáře a širší regresi odpovídající rozsahu změny.

Přesné příkazy patří do [`../development/commands.md`](../development/commands.md).

Doporučené pořadí je:

1. reprodukce problému nebo potvrzení výchozího scénáře,
2. nejbližší cílený automatizovaný nebo vizuální test,
3. statické kontroly a sestavení dotčené části,
4. integrační hranice,
5. reprezentativní smoke scénář,
6. širší projektová sada podle rizika.

Test, který před změnou prokazuje závadu, musí po opravě prokázat očekávané chování.

U nové funkce test vzniká z akceptačního scénáře, nikoli z hotové implementace.

## Důkazy a diagnostika

Pracovní záznam uvádí přesný příkaz, prostředí, výsledek a cestu k relevantnímu artefaktu.

Pouhé „testy prošly“ nestačí u dlouhého nebo rizikového úkolu.

Selhání musí být rozlišeno na existující baseline, regresi, nestabilitu prostředí nebo chybu testu.

Nestabilní test se neopakuje potichu, dokud náhodou neprojde.

Nejdříve se zjistí příčina.

Dočasné retry může být pouze přechod s vlastníkem a podmínkou odstranění.

## Testovací kód

Test je udržovaný kód.

Má používat doménově čitelné názvy, minimum skrytých helperů a jasnou přípravu, akci a ověření.

Sdílená testovací abstrakce vzniká až při skutečně stabilním společném významu.

Příliš chytrý testovací framework může skrýt chování stejně jako příliš chytrý produkční helper.

Veřejné prvky testovací infrastruktury vytvořené projektem podléhají stejným dokumentačním pravidlům jako ostatní vlastní kód.

Technická viditelnost vyžadovaná frameworkem nemění povinnost stručně popsat účel veřejného prvku.

## Změna strategie

Nový typ testu nebo nástroj se zavádí, pokud pokrývá důležité riziko lépe než existující prostředky.

Významná změna testovací architektury se prozkoumá a případně zaznamená v ADR.

Konkrétní nástroje, umístění testů a CI artefakty se po inicializaci doplní sem nebo do odkazovaných strojových konfigurací bez kopírování verzí.

## Ověření sjednocení dokumentace 2026-09-11

`npm run verify` v připnutém projektovém prostředí prošel 19 testy a sestavil DocFX bez chyby nebo varování.

Kontrola artefaktu ověřila 238 zdrojů a 479 výstupních souborů včetně lokálních HTML odkazů, kotev a přesného casingu.

V prohlížeči byly zkontrolovány homepage, přehled Programování, Docker a Unity 2D při 320, 390, 768 a 1440 px v obou motivech: všech 32 kombinací zachovalo obsah v šířce stránky a mělo načtené obrázky bez chyby.

Samostatné interakce ověřily vyhledávání a prázdný výsledek, přepnutí a zachování motivu, automatický motiv, obsah oblasti, přeskočení navigace, posun kódu klávesnicí, kopírování přesného textu a rozbalení obrázkového postupu.

Spustitelné obsahové kontroly zahrnovaly 12 konzolových ukázek C#, ukázkové REST API se scénáři vytvoření, čtení, změny, smazání a chybných vstupů, tři příklady JavaScriptu a Git scénáře v izolovaných lokálních repozitářích.

Parser PowerShellu přijal všech 77 kontrolovaných bloků bez syntaktické chyby.

Neznamená to provedení jejich systémových změn.

Ukázky vyžadující Unity, Docker, Kubernetes, další nenainstalované nástroje nebo externí služby byly posouzeny podle primární dokumentace, nikoli vydávány za místně spuštěné integrační testy.

Dostupnost všech externích odkazů nelze z tohoto prostředí potvrdit, protože některé servery odmítají automatické požadavky nebo je omezují.

Zjištěné neplatné adresy byly opraveny a tato kontrola není zaměňována za deterministickou kontrolu lokálních odkazů.

## Ověření praktických návodů 2026-09-12

Kontroly po přepsání návodů prošly 20 projektovými testy, strict sestavením bez varování a kontrolou 252 zdrojů a 493 výstupních souborů včetně lokálních kotev a casingu.

V prohlížeči prošlo 17 reprezentativních stránek na šířkách 320, 390, 768 a 1440 px v obou motivech, celkem 136 kombinací, bez vodorovného přetékání stránky, chyb načítání obrázků nebo nepřístupných posuvných tabulek.

Výběr zahrnoval homepage, rozcestníky Verzování a Programování, syntaxi, Ollamu, regex, offline balíčky, .NET tools, Kubernetes, Docker, základy sítě a všech šest článků s návodovými obrázky.

V dalších osmi kombinacích se otevřely všechny čtyři rozbalovací postupy Unity 2D a ověřila viditelnost všech jejich snímků.

Celkem 16 obrázků má individuálně posouzenou šířku a odkaz na originál.

Zkouška otevřela také původní rozlišení snímku z článku o animaci.

Interakce zahrnovaly mobilní obsah oblasti, hledání offline návodů a nenalezeného výrazu, vymazání hledání, přechod na výsledek, kopírování kódu, přeskočení navigace a změnu motivu klávesnicí.

Samostatný závěrečný scénář hledání prošel všemi osmi kombinacemi šířky a motivu: interní výsledek se otevřel ve stejné kartě a dlouhé URL nepřesahovaly stránku ani při 320 px.

Víceřádkový odkaz nyní zahrnuje i plochu mezi řádky, kde původní inline odkaz při kliknutí nereagoval.

Kontrola vykreslené syntaxe odhalila viditelné zpětné lomítko před alternativami v tabulkách.

HTML entity nyní zobrazují správně samotné svislítko.

| Obsahová oblast | Provedený důkaz | Hranice ověření |
|---|---|---|
| Git | 19 kontrol indexu, restore, merge a abort, stash, reset, revert, reflog, worktree, bundle, squash a odmítnutého pushe s následným fetch/rebase | Izolované repozitáře a místní bare remote, bez zápisu na hosting |
| Java regex | 10 příkladů přes Java Pattern v JBR JetBrains | Převod velikosti písmen v poli Replace ověřen v dokumentaci IDE, nikoli zaměněn za vlastnost Java Matcher |
| npm a pnpm | U každého offline instalace tranzitivní závislosti do nového projektu, nezměněný lockfile a očekávané selhání prázdné cache | npm 11 a pnpm 12 ve Windows. Nevynucuje síťová pravidla cizích instalačních skriptů |
| Python | Instalace requests a závislostí z wheelhouse do nového venv, `pip check` a použití knihovny | `--no-index` bez dotazu do registru |
| NuGet | Obnova uzamčeného projektu z místního feedu do prázdné cache a build. Obnova z kopie globální složky bez zdrojů. Očekávané selhání prázdné cache | .NET SDK 10, PackageReference a jeden balíček s reálným sestavením |
| .NET tools | Instalace do nové tool-path složky i oddělená obnova lokálního manifestu z vlastního feedu s prázdnou evidencí CLI. Spuštění DocFX | Praktický test odhalil, že změna samotného `NUGET_PACKAGES` nemusí naplnit zálohu. Návod proto odděluje také `DOTNET_CLI_HOME` |
| PowerShell | Parser přijal všech 76 veřejných bloků | Kontrola syntaxe, nikoli provedení systémových změn |
| Místní HTTPS | Publikovaný Node server odpověděl přes TLS s ověřeným dočasným certifikátem | Důvěra předaná jen testovacímu klientovi, bez instalace CA do systému |
| Kubernetes | YAML parser a shoda selectorů, Pod labelů, portu Service a readiness kontroly | Cluster nebyl místně spuštěn |

Jednorázové testy a jejich výstupy vznikly v ignorované `private/docs-review`.

Nejsou novým veřejným build profilem ani závislostí projektu.

Dart/Flutter, Docker, skutečný cluster Kubernetes a OpenTofu nebyly v této revizi místně provozované.

Jejich změněné postupy byly ověřeny podle odkazovaných primárních zdrojů.

Úspěšný statický build se nevydává za provozní zkoušku těchto prostředí ani za ověření každého externího odkazu.

## Ověření obnovených postupů Gitu a balíčků 2026-09-12

Navazující revize obnovila záměr historického `c3474271` a ověřila nové příkazy skutečnými nástroji v oddělených pracovních složkách.

Závěrečné `npm run verify` prošlo 20 projektovými testy, sestavilo DocFX bez chyby či varování a zkontrolovalo 253 zdrojů a 494 výstupních souborů včetně místních odkazů, kotev a casingu.

Celkem prošlo 46 obsahových kontrol:

| Oblast | Kontrol | Provedený důkaz |
|---|---|---|
| Git | 22 | Přesun právě tří commitů do nové i existující větve, původní varianta merge, zachování práce cíle, konflikt a abort, odmítnutí kolidujícího resetu, reverty publikovaných commitů, soft squash, jediný kořenový commit se stejným stromem, dry-run, skutečný přepis místního bare serveru, odmítnutí zastaralého lease a obnova bundlem i novým klonem |
| NuGet a .NET tools | 7 | Příprava projektových archivů, obnova přímo z nezměněné kopie hierarchické složky, build s lockfilem, izolace evidence CLI, spuštění obnoveného DocFX a přenos celé tool-path složky včetně `.store` s nedostupnou původní instalací |
| npm | 4 | Přesunutá cache obnoví produkční i vývojové nepřímé závislosti při `NODE_ENV=production`, lockfile zůstane stejný, prázdná cache selže a přesná verze globálního nástroje se obnoví do nové izolované prefix složky |
| pnpm | 5 | Příprava store i metadat přes skutečný `pnpm-workspace.yaml`, přesunutá záloha obnoví produkční i vývojové nepřímé závislosti, zachová lockfile a odmítne chybějící archiv i metadata |
| Python | 4 | Kopie wheelhouse obnoví nové venv bez indexu a pip cache, projde kontrola závislostí a vlastní editovatelný balíček se obnoví z wheelu podle normalizovaného seznamu verzí |
| Dart | 4 | Přesunutá úplná pub cache obnoví striktní lockfile, znovu vytvoří mapování cest a spustí aplikaci, prázdná cache selže a projekt CLI nástroje funguje i při nedostupné původní cache |

Prostředí bylo Windows, Node.js 24.13.0, npm 11.6.2, pnpm 12.4.0, .NET SDK 10.0.301, DocFX 2.78.5, Python 3.12.14 a Dart 3.12.2.

Postupy obnovy používaly nové pracovní instalace a explicitní offline režim nebo místní zdroj.

Síťové chování vlastních build skriptů není těmito přepínači obecně řízené.

Zkouška pnpm bez metadat skutečně skončila `ERR_PNPM_NO_OFFLINE_META`.

Návod proto zálohuje `cacheDir` i `storeDir` a používá ověřené nastavení YAML.

První kopírování npm fixture přes Python `shutil` selhalo na délce cesty ve Windows.

Úspěšné opakování použilo kratší pracovní kořen a návod tuto praktickou hranici uvádí.

Logy a výsledky jednorázových experimentů původně vznikly v ignorovaných `private/docs-review/followup/*-revision-20260912`, `private/docs-review/revision-20260912/*-proof` a `private/npm-r12`.

Při následném úklidu byly všechny tyto složky přesunuty mimo projekt do systémového TEMP.

Parser PowerShellu přijal všech 27 bloků ve složkách balíčků a historie Gitu bez syntaktické chyby.

V prohlížeči prošlo 17 stránek při 320, 390, 768 a 1440 px v obou motivech, celkem 136 kombinací, bez vodorovného přetékání, chyb obrázků nebo posuvné ukázky nepřístupné klávesnicí.

Výběr zahrnoval homepage, Programování, Verzování, Docker, Unity 2D, Affinity, OpenTofu, tři změněné návody historie a všech sedm článků skupiny Balíčky.

Mobilní navigace otevřela přesun commitů, hledání `historie` našlo nový článek, hledání `Docker` otevřelo výsledek ve stejné kartě a neexistující výraz zobrazil prázdný výsledek.

Ověřeno bylo také přesné kopírování prvního PowerShell bloku nového návodu, přeskočení navigace klávesnicí, rozbalení obrázkového postupu Unity, zachování tmavého motivu po reloadu a volba automatického motivu.

Víceslovný dotaz `nahrazení celé historie` výsledek nevrátil, ačkoli jednoslovné `historie` článek našlo.

Omezení vyhledávání eviduje `ARCH-RISK-005` v [architektuře](../architecture/overview.md#11-známá-rizika-dluh-a-přechodové-stavy).

Affinity má v desktopovém článku šířky 760 a 482 px a shodné automatické levé i pravé okraje.

Rozdílné odsazení odpovídá pouze různé šířce snímků a bylo podle zadání zachováno.

Git testy neměnily skutečný hosting.

Plný platformní build Flutteru a legacy `packages.config` nebyly součástí provedených integračních zkoušek.

## Ověření zjednodušených offline záloh 2026-09-12

Následná revize sjednotila návody na přípravu, přenos a obnovu a zachovala odlišnosti jednotlivých správců.

Nová dočasná prostředí mimo checkout prošla 18 cílenými kontrolami ve stejných verzích nástrojů uvedených výše:

| Oblast | Kontrol | Provedený důkaz |
|---|---|---|
| NuGet a .NET tools | 6 | Obnova knihovny přímo přes `--source ../balicky`, nezměněný lockfile, build a spuštění aplikace. Lokální nástroj z kopie NuGet složky. Globální `.store`, seznam a spuštění po přesunu k jinému testovacímu účtu s nedostupnou původní instalací |
| npm | 4 | Přenesená cache obnovila běžné i vývojové závislosti při `NODE_ENV=production`, lockfile se nezměnil, prázdná cache selhala a globální TypeScript se obnovil do nové prefix složky |
| pnpm | 4 | Jediný přípravný `install --frozen-lockfile` bez `fetch` naplnil store i metadata. Offline obnova zachovala lockfile a fungující běžné i vývojové závislosti. Chybějící archiv a metadata samostatně selhaly |
| Python | 1 | Nové venv se obnovilo z kopie wheelhouse bez indexu i pip cache, prošlo `pip check` a import připnuté verze requests |
| Dart | 3 | Přesunutá pub cache obnovila nezměněný lockfile, prošla analýza a spuštění aplikace i samostatného CLI nástroje |

Obnovy používaly nové pracovní instalace, explicitní offline režim nebo místní zdroj a nedostupnou HTTP/HTTPS proxy.

Tato izolace ověřuje dostupné ukázky.

Nenahrazuje zkoušku libovolných vlastních skriptů při fyzicky odpojené síti ani platformní build Flutteru.

Přenesený globální DocFX navíc skutečně sestavil malou dokumentaci s 0 chybami a 0 varováními.

Parser PowerShellu přijal všech 11 aktuálních bloků balíčků bez syntaktické chyby.

Projektové `npm run verify` prošlo 20 testy a strict buildem s 0 chybami a 0 varováními.

Kontrola artefaktu ověřila 253 zdrojů a 494 výstupních souborů.

Při následné vizuální kontrole byly dlouhé příkazy Pythonu rozděleny do více řádků.

Přesný blok obnovy převzatý z Markdownu úspěšně vytvořil nové venv, obnovil balíčky a prošel `pip check` i importem requests.

Přímá zkouška PowerShellu odhalila, že `[IO.Path]::GetFullPath` s relativní cestou vychází z pracovního adresáře procesu, který se může lišit od aktuální složky PowerShellu.

Návod Dartu proto používá `Join-Path $PWD "../pub-cache"`.

Po `Push-Location` do testovacího projektu byla ověřena správná cesta, offline obnova s lockfilem i spuštění aplikace.

V prohlížeči prošlo 18 stránek při 320, 390, 768 a 1440 px ve světlém i tmavém motivu, celkem 144 kombinací bez vodorovného přetékání celé stránky, rozbitých obrázků nebo posuvného bloku nepřístupného klávesnicí.

Rozsah zahrnoval všech sedm článků balíčků, .NET CLI, Programování, homepage, Verzování, Docker, Unity 2D, Affinity, OpenTofu a tři návody úprav historie Gitu.

Po posledních úpravách Pythonu a Dartu znovu prošlo všech 16 jejich kombinací rozměru a motivu.

Zkontrolovány byly také snímky celých článků a mobilní zobrazení.

Ověřeny byly nové popisy a krátký název .NET tools v rozcestníku i navigaci, odkaz z .NET CLI, přechod mezi balíčky v mobilní navigaci, vyhledání Dockeru a prázdný výsledek pro neexistující výraz.

Kopírování .NET restore i víceřádkového Python bloku přesně zachovalo text.

Klávesnice přesunula fokus na obsah a rozbalila obrázkový postup Unity, tmavý motiv zůstal po reloadu a prohlížeč nezaznamenal JavaScript chybu.

Affinity nadále používá snímky šířky 760 a 482 px se shodným pravidlem centrování, takže odlišné odsazení odpovídá pouze jejich šířce.

Úklid VCS přesunul vnořené testovací repozitáře i staré instalační experimenty mimo checkout.

Závěrečná kontrola našla jen skutečnou projektovou `.git`, jeden worktree a místní `main` a `develop`, se zachovanou vzdálenou `gh-pages`.

## Ověření návodu Flameshot 2026-09-13

Návod [Flameshot místo Výstřižků](../../operating-system/windows/flameshot.md) byl obsahově ověřen proti primární dokumentaci a skutečným volbám Windows 11 25H2 a Flameshotu 14.0.0.

Vypnutá systémová volba Print Screen, zaškrtnuté automatické spouštění a otevření výběru Flameshotu po stisku Print Screen byly vizuálně potvrzené.

Automatizace neuměla cílit překryvné okno pro tažení výběru, takže kopírování snímku ani běh po novém přihlášení nebyly místně ověřené.

Článek obsahuje kroky pro jejich ověření čtenářem.

Na následnou žádost vlastníka je výsledný návod textový a obrázky doplní vlastník samostatně.

`npm run verify` prošlo všemi 20 testy a strict buildem bez varování.

Po odstranění obrázků znovu prošlo `npm run docs:build` s 0 chybami a 0 varováními a kontrolou 254 zdrojů a 495 výstupních souborů.

Kontroly vyžadovaly existující připnuté uživatelské SDK a běh mimo sandbox, který odepíral přístup SDK a nástroji git-cliff.

Toto omezení prostředí se neřešilo změnou projektových verzí.

Finální článek prošel kontrolou rozměrů při 320, 390, 768 a 1440 px ve světlém i tmavém motivu bez vodorovného přetékání stránky.

Celý text byl vizuálně zkontrolován na desktopu a mobilní zobrazení na šířce 320 px.

Rozměrová regrese homepage, Programování, Dockeru, Unity 2D a obou rozcestníků OS a Windows zahrnula dalších 48 kombinací rozměru a motivu bez přetékání stránky, chyb načítání obrázků nebo nepřístupných posuvných bloků.

Samostatné interakce ověřily odkaz z Windows, mobilní obsah oblasti, vyhledání Flameshotu a prázdný výsledek, ovládání motivu klávesnicí, zachování tmavého motivu po načtení a shodu automatického motivu se systémem.

Regresní kontrola Unity 2D potvrdila rozbalení obrázkového postupu klávesnicí a přesné zkopírování ukázky kódu.

Kontrolovaný prohlížeč nezaznamenal JavaScript chybu.

## Ověření výběru SDK 2026-09-13

Izolovaný experiment ve Windows s minimem 10.0.301 a jediným systémovým SDK 10.0.401 potvrdil odmítnutí při `disable` a `latestPatch` a úspěšný výběr 10.0.401 při `latestFeature` i bez `global.json`.

Experiment proběhl v samostatných složkách TEMP bez úpravy projektové konfigurace a jeho soubory byly odstraněné.

Podporu přímé deklarace kanálu, stabilní kvality a odděleného instalačního adresáře v CI potvrdilo čtení dokumentace a zdroje přesné připnuté revize `setup-dotnet`, které jsou odkazované v [`ADR-0004`](../architecture/decisions/ADR-0004-vyber-dotnet-sdk.md).

Po odstranění projektového `global.json` vybral `dotnet --version` SDK 10.0.401 a `dotnet tool restore` úspěšně obnovil DocFX.

`npm run verify` prošlo 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 254 zdrojů a 495 výstupních souborů včetně lokálních odkazů a kotev.

Článek Flameshot po odstranění věty prošel rozměrovou kontrolou při 320, 390, 768 a 1440 px v obou motivech bez přetékání stránky.

Desktopový a mobilní snímek potvrdily čitelnost a prohlížeč nezaznamenal JavaScript chybu.

Kontroly vyžadovaly běh mimo sandbox kvůli přístupu git-cliff a NuGet konfigurace.

Vzdálený běh upravených workflow ani budoucí verze SDK se při této lokální změně neověřovaly.

## Ověření úpravy středníků 2026-09-15

Redakční kontrola nahradila 816 středníků na 806 řádcích ve 119 ručně spravovaných Markdown souborech vhodnými větami, odstavci nebo formulacemi v tabulkách a seznamech.

Text homepage byl upravený v generátoru a výstup obnovený přes `npm run docs:generate`.

Jednorázové porovnání s výchozím commitem potvrdilo nezměněné bloky kódu, inline kód, cíle odkazů a nadpisy ve všech 120 upravených Markdown souborech včetně homepage před doplněním tohoto záznamu.

Následná inventura nenašla žádný středník v próze mimo chráněnou technickou syntaxi.

`npm run verify` prošel 20 testy, strict buildem s 0 varováními a 0 chybami a kontrolou 254 zdrojů a 495 výstupních souborů.

Rozměrová kontrola homepage, Programování, Dockeru a Unity 2D zahrnula 32 kombinací šířek 320, 390, 768 a 1440 px se světlým a tmavým motivem bez přetékání celé stránky.

Vizuální kontrola potvrdila čitelné odstavce a tabulku Dockeru na mobilu i text a kód Unity 2D na desktopu.

Prohlížeč nezaznamenal JavaScript chybu.

Úprava zachovává technický význam textů včetně historických ADR a není novým ověřením všech popisovaných nástrojů.

## Ověření návodu k baterii 2026-09-16

[Návod k omezení nabíjení](../../operating-system/laptop-battery.md) byl ověřen proti odkazované dokumentaci výrobců, systémů a původním implementacím přímých rozhraní.

Windows PowerShell 5.1 ověřil syntaxi všech 10 bloků a 15 izolovaných scénářů pěti nastavovacích postupů s nahrazenými hardwarovými rozhraními.

Scénáře zahrnuly úspěch, chybějící podporu, kalibraci, zamítnutí změny, stav pouze pro čtení a nesoulad zpětného čtení podle daného rozhraní.

Kontrola ověřila cílové hodnoty a pořadí zápisů bez volání skutečných metod notebooku.

Tato zkouška nenahrazuje fyzické ověření nabíjení ani zachování limitu po vypnutí na všech výrobcích.

Dřívější místní ověření Aceru doložilo zapnutí a opakované přečtení ochranného režimu bez Care Center, nikoli zastavení nabíjení při dosažení hranice.

Všechny čtyři systémové záložky prošly 32 kombinacemi šířek 320, 390, 768 a 1440 px se světlým a tmavým motivem bez vodorovného přetékání stránky a vždy s jediným viditelným panelem.

Regrese homepage, Programování, Dockeru a Unity 2D ověřila dalších 32 kombinací bez přetékání stránky a rozbitých načtených obrázků.

Snímky potvrdily čitelnost desktopového úvodu a mobilního rozbaleného postupu včetně viditelného fokusu a samostatně posuvného kódu.

Klávesnice ověřila odkaz z rozcestníku OS, přesun na obsah, systémové záložky a rozbalení Aceru.

Vyhledávání našlo článek pro výraz `baterie` a zobrazilo srozumitelný stav pro neexistující výraz.

Zkopírovaný text Aceru odpovídal ukázce po vložení do jednořádkového pole, které odstraňuje konce řádků, takže jejich zachování tato kontrola neověřuje.

Tmavý motiv zůstal po obnovení stránky a automatický motiv odpovídal nastavení systému.

Při rychlém střídání navigace zaznamenal integrovaný prohlížeč jeden `AbortError: Transition was skipped`, následné klávesnicové otevření článku a jeho ovládání fungovalo.

`npm run verify` prošel 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 255 zdrojů a 496 výstupních souborů.

Stejně jako baseline vyžadoval přístup nástroje git-cliff běh mimo sandbox.

## Ověření záložek v návodech 2026-09-16

Revize struktury 148 verzovaných Markdown souborů vybrala 17 veřejných článků pro rozdělení alternativ do 38 nativních záložek DocFX.

Změna pokrývá varianty Gitu, shellů, .NET nástrojů, certifikátů, PostgreSQL, Outlooku a Pandocu.

Navazující kroky a srovnávací přehledy zůstaly souvislé, interní projektové dokumenty se do DocFX nepřeváděly.

Jednorázové porovnání s výchozím stavem potvrdilo zachování všech 86 bloků kódu a obrázků v upravených článcích.

Všech 59 původních kotev z převedených nadpisů zůstává u výběru variant, takže starý odkaz dovede čtenáře k záložkám.

Tři známé příchozí odkazy navíc používají parametr `?tabs=` a prohlížeč ověřil automatické otevření odpovídající varianty CMD, PowerShellu a squash merge.

Všech 38 záložek prošlo klávesnicovým přepnutím při 320, 390, 768 a 1440 px ve světlém i tmavém motivu, celkem 304 kombinací.

Každá kombinace zobrazila právě jeden panel odpovídající vybrané záložce, bez přetékání celé stránky a rozbitých načtených obrázků.

Panely neobsahují nadpisy vedoucí z globálního obsahu do skryté varianty.

Vizuální kontrola potvrdila zalamování dlouhých názvů záložek, mobilní kód a tabulky i obrázky klasického Outlooku.

Regrese homepage, Programování, Dockeru a Unity 2D zahrnula dalších 32 kombinací rozměru a motivu bez přetékání stránky a rozbitých načtených obrázků.

Samostatné kontroly ověřily přesun klávesnicí na obsah, rozbalení doplňujícího postupu, hledání Dockeru, otevření výsledku, prázdný výsledek, zachování tmavého motivu po obnovení a shodu automatického motivu se systémem.

Kopírování z aktivní záložky PDF v Pandocu odpovídalo zobrazenému jednořádkovému příkazu po vložení do vyhledávacího pole.

Při rychlé navigaci prohlížeč zaznamenal jeden `AbortError: Transition was skipped`, otevření článku i záložky následně fungovalo.

Vložení celého příkazu s přepínači do vyhledávání také vyvolalo `QueryParseError` v nezměněném vyhledávači DocFX, běžný dotaz `Docker` poté znovu vrátil výsledky.

Tyto projevy nejsou opravené touto obsahovou změnou.

`npm run verify` prošel 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 255 zdrojů a 496 výstupních souborů.

Ověření vyžadovalo stejně jako baseline běh mimo sandbox kvůli nástroji git-cliff.

Příkazy článků se nespouštěly proti uživatelským datům a revize není novým technickým ověřením všech popisovaných nástrojů.

## Ověření návodu Smart App Control 2026-09-16

[Návod k blokované aplikaci](../../operating-system/windows/smart-app-control.md) vychází z posledního postupu ve sdíleném chatu, jehož účinek potvrdil vlastník.

Kroky, plošný dopad vypnutí, absence jednotlivé výjimky, kontrola souboru a alternativa podpisu byly porovnány s odkazovanou primární dokumentací Microsoftu.

Aktuální FAQ umožňuje opětovné zapnutí po nedávných aktualizacích na podporovaných zařízeních, zatímco některé starší přehledy stále uvádějí čistou instalaci.

Článek proto podmiňuje návrat dostupností volby a upozorněním konkrétního systému.

Bezpečnostní nastavení počítače se během tvorby návodu neměnila a aplikace KeyPilot se nespouštěla.

Tvrzení z chatu o kontrole konkrétního EXE nebyla převzata jako nezávisle ověřená záruka bezpečnosti.

Přiložený dialog byl upraven vestavěným imagegen se zadáním oříznout okolí a neprůhledně zakrýt adresářovou část před názvem EXE při zachování textu a ovládacích prvků.

Vizuální kontrola potvrdila české znění, čitelný název souboru a zakrytí osobní cesty.

PNG má 1451 × 1084 px a v článku deklarovanou šířku 537 px.

Kontrola struktury PNG nenašla textové chunky s osobní cestou ani vložený původní PNG, do verzované změny patří pouze upravená příloha.

SHA-256 přílohy ve zdrojích a sestaveném webu se shoduje.

Nový článek, oba rozcestníky OS a Windows a regrese homepage, Programování, Dockeru a Unity 2D prošly 56 kombinacemi šířek 320, 390, 768 a 1440 px ve světlém i tmavém motivu.

Kontrola nenašla vodorovné přetékání celé stránky, rozbité načtené obrázky ani nepřístupné posuvné bloky.

Snímky potvrdily čitelnost dialogu na desktopu, mobilní zmenšení obrázku a čitelné varování i číslované kroky při 320 px.

Navigace otevřela návod z přehledů OS i Windows a vyhledávání nabídlo právě článek pro výraz `KeyPilot`.

Samostatně prošlo otevření výsledku, prázdné hledání, obsah stránky, klávesnicový přesun na obsah, zachování tmavého motivu po obnovení a automatický motiv podle systému.

Regrese Unity 2D potvrdila klávesnicové rozbalení doplňujícího postupu a shodu kopírovaného kódu po vložení do jednořádkového filtru, který odstraňuje konce řádků.

Integrovaný prohlížeč při navigaci zaznamenal pět již dříve pozorovaných hlášení `AbortError: Transition was skipped`, následné otevření cílových stránek i ovládání fungovalo.

Šablona ani její navigační JavaScript se touto obsahovou změnou nemění.

`npm run verify` prošel 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 257 zdrojů a 498 výstupních souborů včetně odkazů a kotev.

Stejně jako baseline vyžadoval přístup git-cliff běh mimo sandbox.

## Ověření návodů NetSentinel 2026-09-19

Pět článků [přehled](../../network/netsentinel.md), [základní kontrola](../../network/netsentinel/basic-check.md), [pokročilé kontroly](../../network/netsentinel/advanced-checks.md), [sledování a automatizace](../../network/netsentinel/monitoring.md) a [přehled funkcí](../../network/netsentinel/reference.md) vzniklo nad nainstalovaným NetSentinelem 2.3.0 ve Windows 11 bez oprávnění správce a s běžící službou Npcap.

Seznam devíti sekcí a 74 stránek byl převzat z `ui/nav/builder.py` značky `v2.3.0` a porovnán s živým seznamem stránek v aplikaci, každá stránka byla otevřena a zachycena přes UI Automation.

Postupy základní kontroly proběhly skutečně: úplný sken, seznam zařízení se čtyřmi záznamy, kontextová nabídka řádku, Security Overview, Network Grade s výsledkem A a pěti z osmi kontrol, Speed Test přes Ookla CLI, DNS Benchmark, diagnostika What's Wrong? s příznakem pomalého internetu, otevření nápovědy stránky, palety příkazů, okna Quick Check, dialogu About a nastavení.

Z pokročilých kontrol proběhly Port Scanner routeru se třemi otevřenými porty, Exposed to Internet bez UPnP pravidel, Full Device Discovery v pasivním režimu, ARP Spoof Watch na 30 sekund se dvěma pakety, Device Risk Score, aktualizace Threat Intel se 680 indikátory, CVE Lookup bez verzí služeb, Hop-by-Hop Trace k `8.8.8.8`, Root Cause Correlator a Service Diagnostics.

Ze sledování proběhly Network Logger s CSV v `Dokumenty\NetSentinel\logs`, App Traffic po dobu 45 sekund, Active Connections, Network Health Report uložený přes dialog z Network Grade a vstup do Notifications včetně panelu upozornění.

| Zjištění | Důkaz | Dopad na návod |
|---|---|---|
| Volba **Only scan devices within my local subnet** bere nejširší lokální podsíť, zde adaptér WSL `172.20.224.0/20`, a sken skončil s nula zařízeními | První dva skeny v GUI `devices=0` v `netsentinel_scan_timing.log`, CLI sken našel tři zařízení, po vypnutí volby až druhý sken našel čtyři | Sekce Časté problémy v základní kontrole |
| **WiFi Networks** vrací nula sítí bez zapnuté polohy ve Windows | `netsh wlan show networks` hlásí požadavek na Location services | Časté problémy, sken Wi-Fi nebyl ověřen a systémové nastavení soukromí se neměnilo |
| **Config Snapshots** selže při prvním snímku | Text `Scan error: _SnapshotWorker.result_ready[list].emit(): argument 1 has unexpected type DiscoveryResult` | Uvedeno jako známá chyba verze 2.3.0 |
| **Network Health Report → Generate Now** zůstane ve stavu Generating a čítač Errors roste | Dva pokusy bez nového souboru v `NetSentinel-Reports` | Návod doporučuje report z Network Grade, který vytvořil HTML o 8 KB |
| **DHCP Rogue Monitor** bez správce nic nezachytí | Hláška `try running as Administrator with Npcap` | Požadavek správce uveden u postupu |
| `Alt+1` nepřepne na Dashboard, `Alt+2` až `Alt+5` fungují | Zkouška zkratek přes UI Automation | Tabulka zkratek uvádí jen funkční kombinace |

Stránky se štítkem admin, tedy SYN a UDP sken, OS Detection, Login Test, Bandwidth Usage, Broadcast Storm, Rogue Bridge, IoT Behaviour a 802.11 Monitor, nebyly spuštěny a jejich popis vychází z rozhraní a primární dokumentace.

Hardwarové pluginy, MQTT, REST API, automatizační háky a upozornění e-mailem nebyly propojeny se skutečnou službou.

Všech 26 snímků vzniklo v okně 1240 × 800 px, citlivé údaje jsou zakryté neprůhlednými šrafovanými bloky přímo v PNG a číslované popisky odpovídají tabulkám v článcích.

Zakryté jsou MAC adresy, názvy zařízení a doména poskytovatele, veřejná adresa WAN, adresy tranzitních směrovačů, názvy a cesty procesů, soukromé adresy `192.168.0.x` zůstaly viditelné.

Úprava proběhla jednorázovým skriptem nad System.Drawing mimo repozitář a do verzované změny patří pouze výsledné přílohy.

`npm run verify` prošel 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 288 zdrojů a 529 výstupních souborů včetně místních odkazů a kotev.

V prohlížeči prošlo šest stránek, tedy pět článků a rozcestník Síť, na šířkách 320, 390, 768 a 1440 px ve světlém i tmavém motivu, celkem 48 kombinací, bez vodorovného přetékání stránky a bez rozbitého nebo přetékajícího obrázku.

Regrese homepage, Programování, Dockeru a Unity 2D prošla 16 kombinacemi šířek 320 a 1440 px v obou motivech.

Záložky **Bez oprávnění správce** a **Se správcem a Npcap** přepínaly klikem s parametrem `?tabs=` a vždy zobrazily právě jeden panel.

Vyhledávání `NetSentinel` vrátilo všech pět článků a `Npcap` šest stránek.

Po ověření byla volba omezení podsítě v aplikaci vrácena do zapnutého stavu, zastaveny spuštěné monitory a obnovena původní velikost okna.

### Revize struktury a tovární reset

Navazující revize z 2026-09-19 přidala šestý článek [Tovární reset](../../network/netsentinel/factory-reset.md), seřadila navigaci podle běžného pracovního toku a opravila umístění databáze instalované verze na `%LOCALAPPDATA%\NetSentinel\NetSentinel.db`.

Umístění databáze, uživatelského adresáře, nastavení `QSettings` a pověření bylo ověřené proti značce `v2.3.0`, zejména souborům `modules/utils.py`, `modules/metric_store_queries.py` a `ui/pages/settings_cards.py` a použití knihovny `keyring`.

Kontrola zdroje potvrdila, že vestavěný reset volá pouze vymazání nastavení a nemaže databázi ani pověření.

Destruktivní reset nebyl spuštěný nad skutečným profilem uživatele. Veřejný postup proto nejdřív vypisuje přesné cíle, používá omezené cesty aktuálního profilu, odděluje pověření a přenosnou databázi a uvádí pozorovatelné podmínky čistého spuštění.

Všech šest článků a rozcestník Síť prošly na šířkách 320, 390, 768 a 1440 px ve světlém i tmavém motivu, celkem 56 kombinací.

Kontrola nenašla vodorovné přetékání celé stránky, rozbitý nebo přetékající obrázek, odchylku centrování obrázku nad 20 px ani přetékající varování nebo blok kódu.

Všech 26 snímků zachovává autorem posouzenou šířku a má jednotný odkaz na plné rozlišení.

Vyhledávání `NetSentinel` vrátilo všech šest článků, rozcestník a changelog; nový tovární reset byl první výsledek a otevřel správnou stránku.

`npm run verify` prošel 20 testy, strict buildem s 0 chybami a 0 varováními a kontrolou 289 zdrojů a 530 výstupních souborů včetně místních odkazů a kotev.

## Ověření společného vzhledu 2026-09-19

Domovská stránka, přehled Programování, kódový návod Dockeru a obrazový článek NetSentinelu prošly v reálném prohlížeči šířkami 320, 390, 768 a 1440 px ve světlém i tmavém motivu, celkem 32 kombinacemi.

Kontrola v každé kombinaci nenašla vodorovné přetékání celé stránky, rozbitý obrázek, vnořený obal posuvné tabulky ani skutečně přetékající tabulku nebo blok kódu bez klávesnicově dostupného posuvu.

Snímky byly samostatně posouzené pro domovské rozcestníky, třísloupcové rozvržení, mobilní navigaci, tabulky, kódový článek, obraz NetSentinelu a odkazy na předchozí a další článek.

Výsledný redakční vzhled nepoužívá rám kolem celého článku ani opakované karty pro běžné odkazy. Hierarchii tvoří velikost a rozestupy nadpisů, omezená délka řádku a jednoduché oddělovače; plný rám zůstává jen u tabulek, kódu, upozornění a dalších skutečných komponent.

Vizuální kontrola odhalila původní dvojité obalení tabulek, které vytvářelo druhý rám a prázdný proužek nad hlavičkou. Upravený browserový doplněk ponechává jediný responzivní obal i po asynchronním zpracování DocFX; všech šest tabulek přehledu NetSentinelu mělo po načtení právě jeden obal.

Přepínání motivu, mobilní rozbalení navigace a zachování obsahu oblasti zůstaly funkční. Prohlížeč po závěrečné regresi nezaznamenal JavaScriptovou chybu.
