---
task_id: WORK-20260910
status: active
started: 2026-09-10
last_updated: 2026-09-10
owner: codex
branch: develop
scope:
  - všechny veřejné i interní dokumenty, přílohy a sestavený DocFX
---

# WORK-20260910: Úplný audit čitelnosti a správnosti dokumentace

## Požadovaný výsledek

Každý dokument bude celý přečtený, posouzený a případné nedostatky opravené v kanonickém zdroji.

Veřejné návody musí být stručné, srozumitelné, funkční a vizuálně ověřené v sestaveném DocFX; změny technického chování vyžadují primární webové důkazy.

Uživatel výslovně požaduje konečný commit a následné vypnutí tohoto počítače.

## Kanonické vstupy

- [Mapa pravidel](../index.md), [požadavky](../product/requirements.md), [architektura](../architecture/overview.md).
- [Workflow](../development/workflow.md), [příkazy](../development/commands.md), [testování](../quality/testing.md).
- [Výzkum](../governance/research.md), [styl](../governance/documentation.md), [protokol záznamu](README.md).

## Akceptační kritéria

- [ ] Úplná inventura a celé přečtení všech verzovaných dokumentů, navigace a PDF přílohy.
- [ ] Opravené odborné, strukturální a redakční závady, každá změna chování doložená oficiálními zdroji.
- [ ] Celý veřejný sestavený obsah přečtený v DocFX a vizuálně zkontrolovaný včetně interakcí.
- [ ] `npm run verify` projde na připnutých nástrojích, Git diff je zkontrolovaný.
- [ ] Trvalé závěry přenesené, tento záznam odstraněný, finální změny commitnuté na `develop` a počítač vypnutý.

## Omezení a rozhodnutí

- Zachovat veřejné URL, interní/veřejnou hranici a existující DocFX architekturu.
- Generovanou navigaci měnit pouze přes `scripts/generate-docs.js`.
- Uživatelské schválení pokrývá opravy, commit a vypnutí; publikování není požadované.
- Pracovat bez subagentů; současné instrukce jejich samostatné nasazení neumožňují.

## Výchozí stav a baseline

| Prostředí / příkaz | Výsledek | Význam |
|---|---|---|
| Windows, PowerShell; `git status --short`, `git branch --show-current` | Čistý strom, `develop`, HEAD `b20660a` | Žádné cizí změny |
| `git remote -v`, větve | SSH origin na HopefulDavid/docs_developer, main/develop/gh-pages, origin/HEAD main | Hosting GitHub |
| Vyhledání instrukcí a `docs/work/WORK-*.md` | Pouze kořenový AGENTS a CLAUDE, žádný předchozí WORK | Nový záznam |
| `node --version; npm --version; dotnet --version` | Node 24.19.0, npm nenalezeno, SDK 10.0.401 nevyhovuje připnutému 10.0.301 | Překážka prostředí před změnami; obnovit přesné nástroje izolovaně bez změny manifestů |

## Milníky a průběh

| ID | Výsledek | Stav | Důkaz |
|---|---|---|---|
| M1 | Úplné načtení pravidel, inventura, běžící nezměněný baseline | complete | `private/audit/baseline-full.log`: 14 testů, 106 konceptuálních stran, 479 artefaktů, 0 varování/chyb |
| M2 | Úplné přečtení a audit všech dokumentů s evidencí po souborech | pending | — |
| M3 | Opravy ověřené zdroji a rychlými DocFX rebuildy | pending | — |
| M4 | Úplná čtenářská a vizuální revize sestaveného webu, finální verify | pending | — |
| M5 | Přenos znalostí, commit, odstranění záznamu a vypnutí | pending | — |

## Evidence přečtení a nálezy

Celé přečtené: AGENTS.md, CLAUDE.md, README.md, všechny interní `docs/**/*.md` včetně ADR, šablon a testovací strategie.

Veřejné zdroje celé přečtené: všechny články v `ai`, `ide`, `documentation`, `graphics`, `teamwork`, `video`, `database`, `devops`, `network`, `vcs/git`, `operating-system/windows`, `programming/csharp`, `programming/mobile`, `programming/packages`, `programming/server`, `programming/xampp` a samostatné `programming/{appcast,code-comments,development-patterns,techniques,platform-selection}.md`.

Zbývá celé přečíst: `programming/unity`, `virtualization`, generované indexy a všechny TOC, PDF přílohu (extrahovaná do `private/audit/design-patterns.txt`, 10 stran).

Sestavený web zatím vizuálně zkontrolovaný: homepage a prázdné Flutter Basics; úplná čtenářská revize teprve následuje.

### Konkrétní nálezy k opravě a primárnímu ověření

| Oblast | Nálezy |
|---|---|
| Struktura | Významná část hlavního postupu skrytá v details; redundantní reklamní úvody a loga; šest článků obsahuje pouze H1 (Android Studio, Flutter zálohování/základy/coverage/příkazy/vytvoření). Zachovat veřejné URL a rozumně i kotvy. |
| Ollama / IDE | Ollama nevyžaduje GUI exe pro CLI server; proměnné prostředí a startup opravit dle Windows dokumentace. Rider obsahuje cizí navigaci Project Structure, chybné zkratky a tvrzení o XML para. VS layout neobsahuje úplný instalační postup. |
| Doxygen / Pandoc | Doxygen slibuje HTML i PDF při vypnutém HTML, chybí překlad LaTeXu. Nepodporovaný univerzální hack protected/private. Pandoc zaměňuje standalone za embed-resources a DOCX reference-doc za TeX template. |
| OBS / Affinity / Outlook | Ověřit Windows parametry OBS a pracovní adresář; scope konkrétní verze Designer a classic Outlook. |
| Dapper / EF | Dapper chybějící provider balíček, vhodnější Microsoft.Data.SqlClient. EF chybí provider/Design/context a verze nástrojů; nepravdivé paušální soudy o výkonu. Zkrátit nefunkční vrstvy a ukázat funkční minimum. |
| MongoDB | Používat db po use, zápis teprve vytváří databázi. Nahradit legacy insert/update/count/remove. Opravit createIndexes a význam deleteOne/deleteMany, projekci _id. |
| MSSQL / PG | MSSQL remote access není klientské TCP; DMV usage musí filtrovat database_id, ORDER BY řetězec je chybný; vyhledávací skript obsahuje nefunkční zástupný komentář; velikosti tabulek nepřesný join. PG poškozený nadpis, instalátor/pgAdmin nejsou univerzální, doplnit textové připojení. |
| OpenTofu | Není pravda, že neumí řídit aplikace; init může potřebovat síť i při lokálním příkladu. Doplnit lockfile/state a validate hranice. |
| Flutter | Neexistující --no-web-browser; analytics není analyzer. Lokalizace vydává intl_utils za vestavěné řešení; použít oficiální gen-l10n a aktuální importy. Opravit kontext Expanded a createState. |
| C# typy / metody | PriorityQueue potřebuje dva typy a nejnižší priorita první; WeakReference<int> neplatné. ReadOnlyCollection není neměnná kopie, ObservableCollection nehlásí vlastnosti položek. Reference předávaná hodnotou umožňuje mutaci objektu. async nezajišťuje vlákno. |
| C# bezpečnost / kompatibilita | BinaryFormatter nepoužívat; explicitní kopie místo nejasného ICloneable. WF je .NET Framework technologie. file není modifikátor přístupu člena; self-contained neznamená nezávislost na OS. P/Invoke ukázky opravit. |
| C# příklady | Neúplné API .NET 6 nahradit runnable .NET 10 s jasnými limity; XML nevlastní HTML entity, CDATA nemůže ]]>; CSV odhad oddělovače není spolehlivý. Atributy samy nic nespouštějí. NUnit SomeCalculator chybí. WPF Button nemá CornerRadius, Grid nemá procenta, Viewbox casing. |
| Návrh / platformy | Marketingové stereotypy a opuštěné frameworky; Scrum sprint <= měsíc, framework a metody nerozmělňovat. Factory Method zaměněný za Simple Factory a Object.create není hluboká kopie. |
| Go / XAMPP | Chybné mezery go build./fmt./; go run kompiluje. XAMPP virtuální .local koliduje s mDNS, použít .test; zachovat localhost a ověřit apache -t. |
| Balíčky | npm globální cesta není vždy ~/.npm-global, textový parser selže na scoped balíčcích, npm pack nezahrnuje závislosti. dotnet tool list --outdated není příkaz. Kopie složek nástrojů není přenosná záloha. NuGet má publikovanou konverzační odpověď a nepravdivý konec packages.config. pip offline instalace postrádá argument. |
| Git | Chybné tvrzení o core.longpaths a povinném .git suffixu. Mirror může smazat refs, potřebuje kontrolu chyb/LFS. Submodule .git bývá soubor, pinned vs remote, child push před parent. Gitflow tag na nesprávné větvi. PR nemá automaticky CI. assume-unchanged není ignore. Fixup zpráva neodpovídá syntaxi. Reset/squash/rewrite musí chránit pracovní změny a sdílenou historii; žádné automatické force přepsání main. |
| Síť / Windows | VPN negarantuje veškeré šifrování ani anonymitu; HTTPS funguje bez VPN. OOBE bypass je nepodporovaný/měněný. SQLCMD skript obsahuje heslo a neřeší chyby/pořadí. Defrag nesmí předpokládat typ média podle písmene. ExecutionPolicy není bezpečnostní hranice; chybné module paths a shell for /D v PowerShell bloku. |
| Interní dokumenty | CI/CD skutečný remote je SSH, ne HTTPS; neopakovat neověřenou aktuální shodu s origin. Nový commit neopraví zprávu starého commitu. docs:check píše ignorovaný changelog, nemění verzované zdroje. Dokumentovat rychlý cyklus compile/generate. |
| Šablona webu | Prověřit funkci theme přepínače: vlastní JS rozpoznává anglické názvy, tokeny jsou české. Nejprve reprodukovat v UI, potom opravit dle skutečného DOM. |

Zjištěno: CI/CD uvádí HTTPS remote a aktuální shodu s origin, zatímco skutečný lokální remote je SSH; nepřesný údaj opravit bez předstírání nového auditu živých rulesetů.

## Výzkumné podklady

Zatím žádná změna technického chování.

Otevřené primární zdroje: docs.ollama.com/windows a /faq; pandoc.org/MANUAL.html; doxygen.nl/manual/config.html a preprocessing.html; jetbrains.com/help/rider/Navigation_and_Search__Index.html a MAUI.html; Rider_default_win_shortcuts.pdf; learn.microsoft.com Visual Studio offline installation a C# documentation-comments; obsproject.com/kb/launch-parameters; mongodb.com/docs metody createIndexes a mongosh run-commands; SQL Server remote-access-server-configuration-option; docs.flutter.dev install/manual, Android setup, internationalization a CLI.

Před implementací každé skupiny dočíst konkrétní odpovědi, uložit odkazy do upravených článků a ověřit proveditelné příklady lokálně.

## Ověření výsledku

Připnutý Node 24.13.0/npm 11.6.2 a SDK 10.0.301 byly stažené z oficiálních distribucí do ignorovaného `private/audit/toolchain`, ověřené SHA256/SHA512.

`npm ci --ignore-scripts --no-audit --no-fund` a `dotnet tool restore` uspěly, DocFX 2.78.5.

Úplné nezměněné `npm run verify` uspělo (14 testů, 106 článků, 0 varování/chyb), log `private/audit/baseline-full.log`.

Sandbox blokuje čtení kořene pro git-cliff, proto build/verify běží s eskalací; tento environment problém není závadou projektu.

## Dotčené soubory

Vlastníkem všech změn od čistého HEAD b20660a je tento úkol.

## Další bezpečný krok

Dokončit čtení Unity, virtualizace, generovaných indexů/TOC a PDF; poté opravy po tematických skupinách s webovým ověřením a rychlými rebuildy.

## Stav předání

- Poslední commit: b20660a.
- DocFX server běží v exec session 70108 na http://127.0.0.1:4173; na konci zastavit pouze tento vlastní proces.
- Prostředí obnovit příkazem `. ./private/audit/env.ps1` v PowerShell bez profilu (`login:false`).
- CUA browser id 1, proměnné browser a tab (id 1); aktuálně Flutter basics. CUA používat výhradně přes mcp__cua_repl.
- Žádné blokující rozhodnutí uživatele.
- Vypnutí je autorizované až po úplném dokončení a commitu.

## Kontrola přenosu trvalých znalostí

- [ ] Závěry a odkazy jsou v dotčených kanonických zdrojích.
- [ ] Akceptační kritéria mají důkaz, zbývající omezení jsou viditelná.
- [ ] Tento soubor lze odstranit.
