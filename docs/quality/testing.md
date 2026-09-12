---
canonical_for: testing-strategy
status: accepted
last_verified: 2026-09-12
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
| `QLT-006` | Artifact check nad všemi HTML a cílené negativní testy | Ověří konkrétní cíle i kotvy bez závislosti na Windows toleranci casingu; externí URL nejsou součástí deterministického buildu |
| Metadata a interní dokumentační odkazy | `tests/canonical-docs.test.js` | Mechanická pravidla mají rychlý deterministický důkaz bez zahrnutí interních dokumentů do veřejného buildu |

Přesné příkazy, pořadí a technický smoke scénář vlastní [`../development/commands.md`](../development/commands.md).

Changelogový test vytváří izolovaný víceletý Git repozitář v dočasném adresáři a spouští stejný uzamčený binární příkaz jako projektový build bez změny pracovního stromu; následně kontroluje i vazbu hlavičky na jeho skutečný `HEAD` a zařazení hraničního commitu na přelomu roku podle `Europe/Prague`.

Projekt nemá schválenou pixelovou baseline ani automatizovaný end-to-end browser harness.

Automatický vizuální nástroj se zavede pouze tehdy, když opakované UI regrese nebo rozsah interakce ospravedlní jeho závislosti a údržbu.

Jednorázové testovací repozitáře, instalace balíčků a jejich cache vytvářej mimo pracovní checkout, například v samostatné složce systémového TEMP.

Ani ignorovaná složka uvnitř projektu není vhodná pro vnořené Git repozitáře: vývojové prostředí je může zobrazovat jako další projekty a větve.

Do kanonické dokumentace přenes důkaz a jeho omezení; po ověření ukliď jednorázové prostředí a případné logy ponech mimo projekt.

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

Parser PowerShellu přijal všech 77 kontrolovaných bloků bez syntaktické chyby; neznamená to provedení jejich systémových změn.

Ukázky vyžadující Unity, Docker, Kubernetes, další nenainstalované nástroje nebo externí služby byly posouzeny podle primární dokumentace, nikoli vydávány za místně spuštěné integrační testy.

Dostupnost všech externích odkazů nelze z tohoto prostředí potvrdit, protože některé servery odmítají automatické požadavky nebo je omezují; zjištěné neplatné adresy byly opraveny a tato kontrola není zaměňována za deterministickou kontrolu lokálních odkazů.

## Ověření praktických návodů 2026-09-12

Kontroly po přepsání návodů prošly 20 projektovými testy, strict sestavením bez varování a kontrolou 252 zdrojů a 493 výstupních souborů včetně lokálních kotev a casingu.

V prohlížeči prošlo 17 reprezentativních stránek na šířkách 320, 390, 768 a 1440 px v obou motivech, celkem 136 kombinací, bez vodorovného přetékání stránky, chyb načítání obrázků nebo nepřístupných posuvných tabulek.

Výběr zahrnoval homepage, rozcestníky Verzování a Programování, syntaxi, Ollamu, regex, offline balíčky, .NET tools, Kubernetes, Docker, základy sítě a všech šest článků s návodovými obrázky.

V dalších osmi kombinacích se otevřely všechny čtyři rozbalovací postupy Unity 2D a ověřila viditelnost všech jejich snímků.

Celkem 16 obrázků má individuálně posouzenou šířku a odkaz na originál; zkouška otevřela také původní rozlišení snímku z článku o animaci.

Interakce zahrnovaly mobilní obsah oblasti, hledání offline návodů a nenalezeného výrazu, vymazání hledání, přechod na výsledek, kopírování kódu, přeskočení navigace a změnu motivu klávesnicí.

Samostatný závěrečný scénář hledání prošel všemi osmi kombinacemi šířky a motivu: interní výsledek se otevřel ve stejné kartě a dlouhé URL nepřesahovaly stránku ani při 320 px.

Víceřádkový odkaz nyní zahrnuje i plochu mezi řádky, kde původní inline odkaz při kliknutí nereagoval.

Kontrola vykreslené syntaxe odhalila viditelné zpětné lomítko před alternativami v tabulkách; HTML entity nyní zobrazují správně samotné svislítko.

| Obsahová oblast | Provedený důkaz | Hranice ověření |
|---|---|---|
| Git | 19 kontrol indexu, restore, merge a abort, stash, reset, revert, reflog, worktree, bundle, squash a odmítnutého pushe s následným fetch/rebase | Izolované repozitáře a místní bare remote, bez zápisu na hosting |
| Java regex | 10 příkladů přes Java Pattern v JBR JetBrains | Převod velikosti písmen v poli Replace ověřen v dokumentaci IDE, nikoli zaměněn za vlastnost Java Matcher |
| npm a pnpm | U každého offline instalace tranzitivní závislosti do nového projektu, nezměněný lockfile a očekávané selhání prázdné cache | npm 11 a pnpm 12 ve Windows; nevynucuje síťová pravidla cizích instalačních skriptů |
| Python | Instalace requests a závislostí z wheelhouse do nového venv, `pip check` a použití knihovny | `--no-index` bez dotazu do registru |
| NuGet | Obnova uzamčeného projektu z místního feedu do prázdné cache a build; obnova z kopie globální složky bez zdrojů; očekávané selhání prázdné cache | .NET SDK 10, PackageReference a jeden balíček s reálným sestavením |
| .NET tools | Instalace do nové tool-path složky i oddělená obnova lokálního manifestu z vlastního feedu s prázdnou evidencí CLI; spuštění DocFX | Praktický test odhalil, že změna samotného `NUGET_PACKAGES` nemusí naplnit zálohu; návod proto odděluje také `DOTNET_CLI_HOME` |
| PowerShell | Parser přijal všech 76 veřejných bloků | Kontrola syntaxe, nikoli provedení systémových změn |
| Místní HTTPS | Publikovaný Node server odpověděl přes TLS s ověřeným dočasným certifikátem | Důvěra předaná jen testovacímu klientovi, bez instalace CA do systému |
| Kubernetes | YAML parser a shoda selectorů, Pod labelů, portu Service a readiness kontroly | Cluster nebyl místně spuštěn |

Jednorázové testy a jejich výstupy vznikly v ignorované `private/docs-review`; nejsou novým veřejným build profilem ani závislostí projektu.

Dart/Flutter, Docker, skutečný cluster Kubernetes a OpenTofu nebyly v této revizi místně provozované; jejich změněné postupy byly ověřeny podle odkazovaných primárních zdrojů.

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

Postupy obnovy používaly nové pracovní instalace a explicitní offline režim nebo místní zdroj; síťové chování vlastních build skriptů není těmito přepínači obecně řízené.

Zkouška pnpm bez metadat skutečně skončila `ERR_PNPM_NO_OFFLINE_META`; návod proto zálohuje `cacheDir` i `storeDir` a používá ověřené nastavení YAML.

První kopírování npm fixture přes Python `shutil` selhalo na délce cesty ve Windows; úspěšné opakování použilo kratší pracovní kořen a návod tuto praktickou hranici uvádí.

Logy a výsledky jednorázových experimentů původně vznikly v ignorovaných `private/docs-review/followup/*-revision-20260912`, `private/docs-review/revision-20260912/*-proof` a `private/npm-r12`; při následném úklidu byly všechny tyto složky přesunuty mimo projekt do systémového TEMP.

Parser PowerShellu přijal všech 27 bloků ve složkách balíčků a historie Gitu bez syntaktické chyby.

V prohlížeči prošlo 17 stránek při 320, 390, 768 a 1440 px v obou motivech, celkem 136 kombinací, bez vodorovného přetékání, chyb obrázků nebo posuvné ukázky nepřístupné klávesnicí.

Výběr zahrnoval homepage, Programování, Verzování, Docker, Unity 2D, Affinity, OpenTofu, tři změněné návody historie a všech sedm článků skupiny Balíčky.

Mobilní navigace otevřela přesun commitů, hledání `historie` našlo nový článek, hledání `Docker` otevřelo výsledek ve stejné kartě a neexistující výraz zobrazil prázdný výsledek.

Ověřeno bylo také přesné kopírování prvního PowerShell bloku nového návodu, přeskočení navigace klávesnicí, rozbalení obrázkového postupu Unity, zachování tmavého motivu po reloadu a volba automatického motivu.

Víceslovný dotaz `nahrazení celé historie` výsledek nevrátil, ačkoli jednoslovné `historie` článek našlo; omezení vyhledávání eviduje `ARCH-RISK-005` v [architektuře](../architecture/overview.md#11-známá-rizika-dluh-a-přechodové-stavy).

Affinity má v desktopovém článku šířky 760 a 482 px a shodné automatické levé i pravé okraje; rozdílné odsazení odpovídá pouze různé šířce snímků a bylo podle zadání zachováno.

Git testy neměnily skutečný hosting; plný platformní build Flutteru a legacy `packages.config` nebyly součástí provedených integračních zkoušek.

## Ověření zjednodušených offline záloh 2026-09-12

Následná revize sjednotila návody na přípravu, přenos a obnovu a zachovala odlišnosti jednotlivých správců.

Nová dočasná prostředí mimo checkout prošla 18 cílenými kontrolami ve stejných verzích nástrojů uvedených výše:

| Oblast | Kontrol | Provedený důkaz |
|---|---|---|
| NuGet a .NET tools | 6 | Obnova knihovny přímo přes `--source ../balicky`, nezměněný lockfile, build a spuštění aplikace; lokální nástroj z kopie NuGet složky; globální `.store`, seznam a spuštění po přesunu k jinému testovacímu účtu s nedostupnou původní instalací |
| npm | 4 | Přenesená cache obnovila běžné i vývojové závislosti při `NODE_ENV=production`, lockfile se nezměnil, prázdná cache selhala a globální TypeScript se obnovil do nové prefix složky |
| pnpm | 4 | Jediný přípravný `install --frozen-lockfile` bez `fetch` naplnil store i metadata; offline obnova zachovala lockfile a fungující běžné i vývojové závislosti; chybějící archiv a metadata samostatně selhaly |
| Python | 1 | Nové venv se obnovilo z kopie wheelhouse bez indexu i pip cache, prošlo `pip check` a import připnuté verze requests |
| Dart | 3 | Přesunutá pub cache obnovila nezměněný lockfile, prošla analýza a spuštění aplikace i samostatného CLI nástroje |

Obnovy používaly nové pracovní instalace, explicitní offline režim nebo místní zdroj a nedostupnou HTTP/HTTPS proxy.

Tato izolace ověřuje dostupné ukázky; nenahrazuje zkoušku libovolných vlastních skriptů při fyzicky odpojené síti ani platformní build Flutteru.

Přenesený globální DocFX navíc skutečně sestavil malou dokumentaci s 0 chybami a 0 varováními.

Parser PowerShellu přijal všech 11 aktuálních bloků balíčků bez syntaktické chyby.

Projektové `npm run verify` prošlo 20 testy a strict buildem s 0 chybami a 0 varováními; kontrola artefaktu ověřila 253 zdrojů a 494 výstupních souborů.
