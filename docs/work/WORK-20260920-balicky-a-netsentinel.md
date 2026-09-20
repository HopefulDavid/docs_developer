---
task_id: WORK-20260920-balicky-a-netsentinel
status: active
started: 2026-09-20
last_updated: 2026-09-20T06:41:24Z
owner: Codex
branch: develop
scope:
  - programming/packages
  - network/netsentinel
  - public-navigation
---

# WORK-20260920: Základní příkazy balíčků a odstranění NetSentinelu

> Tento soubor je dočasný.
>
> Stabilní projektová fakta nekopíruj a odkazuj na jejich kanonický zdroj.
>
> Po dokončení přenes trvalé informace a tento soubor odstraň.

## Požadovaný výsledek

Každý článek ve skupině Programování → Balíčky nabídne před postupem zálohy a obnovy přehlednou tabulku běžných příkazů a nadpis stránky nebude omezený jen na zálohu.

Veřejná dokumentace, navigace, požadavky a obrazové zdroje nebudou obsahovat sekci NetSentinel.

## Kanonické vstupy

- Produktové scénáře: [`../product/requirements.md#kanonické-scénáře-chování`](../product/requirements.md#kanonické-scénáře-chování)
- Správa dokumentace: [`../governance/documentation.md#čitelnost-veřejných-návodů`](../governance/documentation.md#čitelnost-veřejných-návodů)
- Projektové příkazy: [`../development/commands.md`](../development/commands.md)
- Externí zadání: požadavek uživatele z 2026-09-20 a sdílený příklad ChatGPT

## Akceptační kritéria

- [ ] NuGet, .NET tools, npm, pnpm, Python/pip a Dart/Flutter pub mají před zálohou tabulku instalace, odinstalace, výpisu a souvisejících základních operací.
- [ ] Záložky rozlišují skutečně odlišné rozsahy nebo prostředí a sestavený DocFX je vykreslí bez neplatných kotev.
- [ ] NetSentinel nemá články, navigaci, příchozí odkazy, produktové tvrzení ani osiřelé obrázky.
- [ ] `npm run verify` projde a obsah je vizuálně zkontrolovaný v podporovaných šířkách a motivech.
- [ ] Změny jsou rozdělené do dvou logických commitů v češtině podle Conventional Commits.

## Omezení a mimo rozsah

### Omezení

- Zachovat existující veřejné cesty článků balíčků a příkazy ověřit v primární dokumentaci.
- Nezahrnout cizí necommitovanou složku `.claude/`.

### Mimo rozsah

- Přepis samostatného článku `.NET CLI` ve skupině Vývojové nástroje.
- Publikování nebo push vzdálené větve.

## Orientace v dotčené oblasti

| Prvek | Úloha v tomto úkolu | Kanonický nebo zdrojový odkaz |
|---|---|---|
| Články správců balíčků | Zdroj základních a offline postupů | [`../../programming/packages`](../../programming/packages) |
| Registr navigace | Zdroj generovaných indexů a TOC | [`../../scripts/generate-docs.js`](../../scripts/generate-docs.js) |
| Produktové požadavky | Vlastní veřejný rozsah a scénáře | [`../product/requirements.md`](../product/requirements.md) |
| NetSentinel | Odstraňovaná obsahová větev | [`../../network/netsentinel.md`](../../network/netsentinel.md) |

## Výchozí stav a baseline

| Datum a čas UTC | Prostředí | Příkaz nebo pozorování | Výsledek | Význam |
|---|---|---|---|---|
| `2026-09-20T06:25:13Z` | Windows, Node.js 24.13.0, větev `develop` | `npm run verify` mimo omezený sandbox | kód 0, 20 testů, DocFX 0 warningů a 0 chyb | Nezměněná výchozí verze prokazatelně prochází |
| `2026-09-20T06:25:13Z` | Omezený sandbox | `npm run verify` | kód 1 při `git-cliff`, přístup k cestě repozitáře odepřen | Známé omezení prostředí, nikoli závada projektu |

## Výzkumné podklady

| Tvrzení nebo otázka | Zdroj a verze | Datum ověření | Závěr pro úkol | Jistota nebo omezení |
|---|---|---|---|---|
| Příklad požaduje výpis a odinstalaci globálního .NET toolu | Sdílený chat uživatele | 2026-09-20 | Zahrnout `dotnet tool list --global` a `dotnet tool uninstall --global <nástroj>` | Příklad není normativní zdroj, syntaxi ověří dokumentace Microsoftu |
| Správa NuGet a .NET tools rozlišuje verzi SDK a rozsah instalace | Microsoft Learn, .NET 8 až 10 | 2026-09-20 | Oddělit .NET 10 od starší syntaxe a globální, lokální i vlastní umístění tools | Vysoká, primární dokumentace |
| npm a pnpm rozlišují projektové a globální instalace | npm CLI 11 a pnpm 12 | 2026-09-20 | Použít dvě záložky a uvést instalaci, odebrání, výpis, zastaralé a aktualizaci | Vysoká, primární dokumentace |
| pip má být svázaný s konkrétním Python interpretem | pip 26 a Python `venv` | 2026-09-20 | Použít cestu k Pythonu v `.venv` a oddělit Windows od Unixu | Vysoká, primární dokumentace |
| Flutter projekt používá `flutter pub`, Dart 3.10 přidal správu CLI nástrojů | Dart a Flutter dokumentace | 2026-09-20 | Oddělit Dart, Flutter a moderní CLI nástroje | Vysoká, primární dokumentace |

## Rozhodnutí

### Přijatá rozhodnutí

| Datum UTC | Rozhodnutí | Rozhodl | Důvod pro tento úkol | Trvalý cíl |
|---|---|---|---|---|
| `2026-09-20` | Rozdělit výsledek na commit balíčků a commit odstranění NetSentinelu | AI | Jde o dva samostatné čtenářské výsledky | Pouze tento záznam |
| `2026-09-20` | Použít záložky jen pro varianty s odlišnou syntaxí nebo rozsahem | AI | Odpovídá pravidlům DocFX a nezakrývá základní obsah | `REQ-005`, `REQ-006` |

### Blokující rozhodnutí

| ID | Otázka | Stav | Rozhodovací karta | Co lze dělat bez odpovědi |
|---|---|---|---|---|
| — | Žádné | closed | — | Celý úkol |

## Milníky a průběh

| ID | Ověřitelný výsledek | Stav | Důkaz dokončení | Poslední změna UTC |
|---|---|---|---|---|
| `M1` | Ověřené příkazy a sjednocené články balíčků | done | `npm run verify`, DocFX 0 warningů a 0 chyb, záložky a šířky viz ověření | `2026-09-20T06:41:24Z` |
| `M2` | Odstraněná sekce NetSentinel včetně zdrojů a odkazů | in-progress | — | `2026-09-20T06:41:24Z` |
| `M3` | Úplné automatické a vizuální ověření, odstraněný pracovní záznam a dva commity | pending | — | `2026-09-20T06:25:13Z` |

## Objevy, neúspěšné pokusy a rizika

| Datum UTC | Typ | Pozorování a důkaz | Dopad na další postup |
|---|---|---|---|
| `2026-09-20T06:25:13Z` | discovery | NetSentinel je výslovně uvedený v produktových požadavcích a odkazuje na něj obecný síťový článek | Odstranění musí zahrnout kanonický rozsah i příchozí odkaz |
| `2026-09-20T06:25:13Z` | risk | V pracovním stromu existuje nesledovaná `.claude/` | Ponechat ji beze změny a mimo commity |

## Ověření výsledku

| Akceptační kritérium nebo riziko | Přesný příkaz či scénář | Prostředí | Výsledek | Artefakt nebo důkaz |
|---|---|---|---|---|
| `REQ-003`, `REQ-006`, `QLT-002` pro M1 | `npm run verify` | Windows mimo omezený sandbox | pass, 20 testů, DocFX 0 warningů a 0 chyb | Artefakt 290 zdrojů a 531 souborů |
| `QLT-005` | Vizuální kontrola `.NET tools` na 320, 390, 768 a 1440 px ve světlém i tmavém motivu | In-app browser | pass, bez přetečení celé stránky | Přepnutí obou skupin záložek, světlý i tmavý motiv |
| `QLT-005` pro všechny správce | Mobilní kontrola NuGet, .NET tools, npm, pnpm, Python/pip a Dart/Flutter pub na 320 px | In-app browser | pass, všechny H1, tabulky a záložky vykreslené bez přetečení stránky | `scrollWidth` 305 při viewportu 320 px |
| Úplné odstranění NetSentinelu | `rg -n -i "netsentinel|net sentinel" . -g '!_site/**' -g '!node_modules/**' -g '!.git/**'` | Windows | pending | — |

## Dotčené soubory a necommitované změny

| Cesta nebo oblast | Vlastník změny | Stav | Poznámka |
|---|---|---|---|
| `programming/packages/*.md` | tento úkol | plánováno | Šest článků správců a rozcestník offline obnovy |
| `scripts/generate-docs.js` | tento úkol | plánováno | Odstranění navigační větve NetSentinel |
| `network/netsentinel.md`, `network/netsentinel/`, `images/netsentinel-*.png` | tento úkol | plánováno | Úplné odstranění |
| `network/ip-mac-devices.md`, `docs/product/requirements.md` | tento úkol | plánováno | Odstranění příchozího odkazu a produktového tvrzení |
| `.claude/` | uživatel | beze změny | Nesledovaná cizí změna, nebude zahrnuta |

## Další bezpečný krok

Odstraň navigaci, články, příchozí odkaz, produktové tvrzení a obrázky NetSentinelu a spusť `npm run docs:generate`.

## Stav předání

- Poslední ověřený commit: `6a673ce`
- Aktuální milník: `M2`
- Běžící procesy nebo dočasné prostředí: DocFX server na `127.0.0.1:4173`, bezpečné ukončení `Ctrl+C` v relaci 97827
- Známé cizí změny: nesledovaná `.claude/`
- Poslední smoke ověření: `2026-09-20T06:41:24Z`, `npm run verify` a responzivní kontrola prošly
- Blokace: žádné

## Kontrola přenosu trvalých znalostí

- [ ] Produktové změny jsou v kanonických požadavcích.
- [ ] Architektura, rizika a přechody jsou v architektonickém přehledu.
- [ ] Významná rozhodnutí jsou v ADR.
- [ ] Příkazy, testování, CI a provozní postupy jsou aktualizované.
- [ ] Akceptační kritéria mají důkaz.
- [ ] Zbývající rizika mají kanonického vlastníka.
- [ ] Soubor lze bezpečně odstranit.
