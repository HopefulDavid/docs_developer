---
canonical_for: documentation-governance
status: accepted
last_verified: 2026-09-11
owner: maintainers
---

# Správa kanonické dokumentace

## Základní pravidlo

Každá informace má právě jedno kanonické místo, kde je definována a udržována.

Jiné dokumenty mohou obsahovat pouze odkaz, stabilní identifikátor nebo stručnou navigační větu.

Kopie stejného pravidla nebo faktu není záloha, ale závada, protože vytváří více možných pravd.

## Vlastnictví informací

[`../index.md`](../index.md) je registr témat a jejich kanonických zdrojů.

Registr vlastní pouze směrování a nesmí přebírat obsah cílových dokumentů.

Nové téma dostane vlastní dokument pouze tehdy, když má odlišné publikum, životní cyklus, vlastníka nebo rozsah změn.

Rozdělení podle adresářů samo o sobě není důvodem k vytvoření nového zdroje.

Strojově čitelný artefakt je kanonický pro svůj přesný technický obsah.

Příkladem je schéma API, databázová migrace, manifest závislostí nebo definice sestavení.

Lidská dokumentace vysvětluje význam, hranice a použití takového artefaktu a odkazuje na něj.

Nesmí ručně kopírovat seznamy polí, verzí nebo příkazů, které lze spolehlivě získat z jejich strojového zdroje.

Generovaný dokument musí viditelně uvádět zdroj a způsob regenerace.

Ručně se upravuje zdroj, nikoli generovaný výstup.

Pokud generování nelze spolehlivě opakovat, výstup se nepovažuje za bezpečný kanonický zdroj.

## Stav tvrzení

Architektonické a provozní tvrzení musí rozlišit následující významy.

- **Skutečnost** označuje stav ověřený v repozitáři nebo běžícím systému k uvedenému datu.
- **Záměr** označuje přijatý normativní stav, kterému se má projekt přizpůsobit.
- **Přechod** označuje vědomou dočasnou odchylku s vlastníkem, rizikem a podmínkou ukončení.

Implementace bez označeného záměru nevyhrává spor pouze proto, že dnes existuje.

Dokumentace bez důkazu aktuálnosti nevyhrává spor pouze proto, že je napsaná.

Test bez vazby na přijaté chování nevyhrává spor pouze proto, že je automatizovaný.

## Řešení rozporů

Při rozporu dokumentace, konfigurace, implementace, testů nebo runtime pozorování postupuj v tomto pořadí.

1. Zapiš rozpor do aktivního pracovního záznamu včetně přesných souborů a důkazů.
2. Urči, zda existuje přijatý produktový požadavek, ADR, veřejný kontrakt nebo migrační závazek.
3. Ověř datum, verzi, vlastníka a původ každého zdroje.
4. Rozliš dnešní skutečnost od zamýšleného dlouhodobého stavu.
5. Pokud je volba významná a není jednoznačná, použij rozhodovací postup z [`decisions.md`](decisions.md).
6. Sjednoť implementaci, testy, konfiguraci a kanonickou dokumentaci podle přijatého výsledku.
7. Odstraň nebo označ zastaralý zdroj, aby po změně nezůstaly dvě možné interpretace.

Nevytvářej kompromisní text, který pouze popíše oba rozporné stavy bez určení normativního výsledku.

Dočasná odchylka je přípustná jen jako explicitní přechod s plánem ukončení.

## Aktuálnost

Dokumentace se aktualizuje ve stejné změně jako ovlivněná implementace.

Samostatný pozdější úkol na „doplnění dokumentace“ není přijatelnou náhradou.

Pole `last_verified` označuje datum, kdy byl celý kanonický obsah ověřený proti relevantním zdrojům.

Pouhá kosmetická úprava datum ověření neposouvá.

Hodnota `null` nebo stav `not-initialized` znamená, že dokument nelze používat jako potvrzený projektový fakt.

Stav `not-applicable` vyžaduje stručný důvod a událost, při které se má oblast znovu posoudit.

Aktualizaci vyvolává zejména změna:

- produktového chování nebo rozsahu,
- veřejného API nebo datového kontraktu,
- hranic modulů a směru závislostí,
- ukládání, migrace, retence nebo vlastnictví dat,
- běhového toku, chybového chování nebo bezpečnostní hranice,
- sestavení, testování, CI, vydávání nebo nasazení,
- provozního postupu, obnovy nebo pozorovatelnosti,
- závazného způsobu práce na projektu.

Agent při dokončení zkontroluje nejen upravené dokumenty, ale také odkazy z mapy a sousední kanonické oblasti, které změna významově zasáhla.

## Metadata kanonického dokumentu

Projektové dokumenty používají stručný YAML front matter.

| Pole | Význam |
|---|---|
| `canonical_for` | Jedinečný stabilní klíč oblasti vlastněné dokumentem |
| `status` | `not-initialized`, `not-applicable`, `draft`, `accepted` nebo `deprecated` |
| `last_verified` | ISO datum úplného ověření nebo `null` |
| `owner` | Tým nebo role odpovědná za obsah |
| `review_on` | Volitelný seznam událostí, které vyžadují kontrolu |

Dva aktivní dokumenty nesmějí mít stejnou hodnotu `canonical_for`.

Přejmenování souboru nemění stabilní klíč bez skutečné změny vlastnictví.

## Styl Markdownu

Běžný souvislý text piš tak, aby každá věta tvořila samostatný Markdown odstavec.

Mezi dvěma větami proto vždy ponech právě jeden prázdný řádek.

Samotné zalomení řádku je v Markdownu pouze soft line break a běžný renderer jej uvnitř odstavce zobrazí jako mezeru, nikoli jako viditelné oddělení.

Stejné pravidlo platí pro závěrečné shrnutí (`summary`) a jiné souvislé textové výstupy agenta.

Pro oddělení vět nepoužívej dvě koncové mezery ani `<br>`, protože vytvářejí pouze hard line break uvnitř stejného odstavce.

Pravidlo se nepoužívá na nadpisy, jednotlivé položky seznamů, tabulky, bloky kódu, Mermaid diagramy, YAML ani jiné přirozeně strukturované části.

Nevynucuj pevnou maximální délku řádku, která by větu uměle lámala.

Formátovací nástroj musí zachovat prázdné řádky oddělující odstavce a nesmí je převést na pouhá zalomení řádků.

Nadpis má popisovat oblast, nikoli okamžitý stav práce.

Používej relativní odkazy na soubory v repozitáři.

Odkazuj pokud možno na stabilní nadpis nebo identifikátor.

Neopisuj cílovou pasáž pouze pro pohodlí čtenáře.

## Čitelnost veřejných návodů

Veřejný článek vysvětluje jeden praktický cíl jazykem srozumitelným juniornímu programátorovi.

Výchozí pořadí je **co to je → k čemu to slouží → jak to funguje → předpoklady → praktické použití → příkazy a příklady → možnosti úprav → důležité poznámky**.

Jde o pořadí informací, nikoli povinnost vytvořit osm nadpisů.

Krátký opravný postup může spojit účel a princip v úvodu, referenční článek použít tabulku a koncepční srovnání místo příkazů popsat rozhodovací kritéria.

Používej předvídatelné názvy jako **Před použitím**, **Praktické použití**, **Ověření výsledku**, **Co lze upravit** a **Časté problémy**, případně je zpřesni podle tématu.

Prázdné nebo opakující se sekce nevytvářej.

### Příkazy a ukázky

Před ukázkou uveď prostředí, potřebnou verzi či kompatibilitu, pracovní složku, oprávnění a existující vstupy v rozsahu nutném pro její použití.

Každý blok má identifikátor jazyka; pro výpis, cestu nebo strukturu souborů použij `text`.

U kompletního programu napiš název souboru a způsob spuštění; u fragmentu přesné místo vložení a vztah k předchozí ukázce.

Komentář nebo bezprostřední vysvětlení objasní účel příkazu, význam netriviálních parametrů, očekávaný výsledek a hodnoty, které lze bezpečně změnit.

Ukázkové názvy a cesty jsou konkrétní a výslovně vysvětlené, nikoli nevysvětlené zástupné značky.

Referenční tabulky používají obecnou syntaxi: pevné části se píší doslova, `<hodnota>` označuje nahrazovaný argument, `[volba]` nepovinnou část, `{a|b}` povinnou alternativu a `...` opakování.

Konkrétní spustitelný příklad je označený jako příklad a bezprostředně vysvětluje vybrané názvy a hodnoty; tabulka rozebírající právě tento příklad smí jeho hodnoty opakovat.

Výukový význam značek vlastní veřejný [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md); skutečné operátory shellu a syntaxe programovacího jazyka se nezaměňují s touto dokumentační notací.

Příkaz měnící data má před sebou podmínky použití a kontrolu cíle; jeho návratový kód nenahrazuje ověření skutečného výsledku nebo obnovy.

Významnou technickou změnu dolož relevantní primární dokumentací a dostupným spustitelným ověřením, přičemž rozlišuj ověření zdroje, syntaxe a skutečného běhu služby.

### Struktura a navigace

Používej jeden H1 a logickou hierarchii H2/H3 bez přeskakování úrovní.

Základní vysvětlení a potřebné kroky nech viditelné; `<details>` používej pro samostatné alternativy, rozšiřující diagnostiku nebo rozsáhlé přílohy.

Tabulka porovnává souběžné možnosti, seznam zachycuje kroky nebo stručný výčet a upozornění označuje konkrétní důsledek u příslušného kroku.

Snímek obrazovky ani video nesmějí být jediným nositelem zásadního postupu; obrázek má popisný alternativní text a video smysluplný titulek.

U posouzeného snímku použij HTML `img` s kladnou šířkou `width` v pixelech; normalizátor ji zachová a CSS omezí šířku dostupným místem při zachování poměru stran.

Malé dialogy nezvětšuj nad potřebnou čitelnost; u rozsáhlých snímků ponech odkaz na původní rozlišení a informaci popiš také textem.

Dekorativní úvodní obrázky, emoji v každé buňce a nepodložená označení jako „kompletní“ nebo „nejlepší“ nepřidávají orientační hodnotu.

Související postup vlastní jedna stránka a ostatní na ni odkazují.

Při přidání tématu uprav registr v generátoru podle [projektových příkazů](../development/commands.md#úprava-nebo-přidání-článku), nikoli generované rozcestníky a TOC.

Každý navigovaný obsahový článek vlastní jednořádkové YAML metadata `description` v dvojitých uvozovkách s platným JSON escapováním.

Popis stručně a přímo říká, co čtenář u cíle najde, bez opisování definice z úvodu, formulace „tato stránka“, odkazů nebo znaku svislé čáry.

Generátor popis neodvozuje z prvního odstavce a chybějící či neplatná metadata odmítá, takže úvod a rozcestník lze udržovat podle jejich odlišného účelu.

Změna nadpisu musí zahrnout kontrolu příchozích odkazů na kotvu; veřejné cesty a jejich casing zachovávej.

### Vizuální kontrola

Ověř čitelnost světlého i tmavého motivu na desktopu, tabletu a mobilu včetně šířky 320 px.

Běžný text se zalamuje bez vodorovného posuvu stránky, zatímco široká tabulka nebo kód může mít vlastní dostupnou posuvnou oblast.

Kontrola zahrnuje navigaci klávesnicí, viditelný fokus, přepnutí motivu, vyhledávání, rozbalovací bloky, obrázky a dlouhé řádky kódu.

Konkrétní reprodukovatelné scénáře vlastní [testovací příkazy](../development/commands.md#reprezentativní-smoke-scénář).

## Mermaid diagramy

Mermaid použij tam, kde zkrátí čas potřebný k pochopení vztahů, pořadí, stavů, toku dat nebo nasazení.

Diagram doplňuje text, ale není jeho jediným nositelem.

Každý diagram musí mít krátké vysvětlení významu a hranic.

Do diagramu nevkládej detail, který je kanonicky definovaný v tabulce, schématu nebo konfiguraci.

Při změně vztahu se diagram aktualizuje ve stejné změně.

## Instrukce pro konkrétní nástroje a moduly

Kořenový [`../../AGENTS.md`](../../AGENTS.md) je společný agentní vstup.

[`../../CLAUDE.md`](../../CLAUDE.md) pouze importuje společný vstup a nesmí obsahovat kopii pravidel.

Další adaptér pro nástroj vzniká jen tehdy, když nástroj společný formát neumí načíst.

Takový adaptér obsahuje pouze podporovaný import nebo odkaz na kanonický zdroj.

Vnořený `AGENTS.md` je přípustný pouze pro skutečně odlišná pravidla konkrétního modulu.

Nesmí opakovat kořenová pravidla.

Musí uvést svůj rozsah a odkazovat na společné kanonické dokumenty.

Lokální osobní instrukce se necommitují jako projektová pravidla.

## Kontroly v CI

Pokud projekt používá CI, má se postupně zavést kontrola následujících mechanických vlastností.

- Platnost interních odkazů.
- Jedinečnost hodnot `canonical_for`.
- Platnost požadovaných metadat.
- Nepřítomnost dokončených pracovních záznamů.
- Zachování jediného importu v `CLAUDE.md`.
- Formát Markdownu podle přijaté konfigurace.
- Konzistence generovaných dokumentů s jejich zdrojem.

Mechanická kontrola nenahrazuje odborné ověření obsahu.

Nástroj se vybírá podle existujícího ekosystému projektu a nesmí bez důvodu zavést nový runtime nebo vlastní validátor.
