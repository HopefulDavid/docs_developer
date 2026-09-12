# Appcast: bezpečné vydání aktualizace přes Sparkle

Appcast je RSS feed s rozšířeními, podle kterého updater Sparkle pro macOS vyhledá vhodnou aktualizaci a její archiv.

XML popisuje nabídku verzí; samotnou aktualizaci provádí Sparkle integrované v aplikaci.

## Jak spolu části souvisejí

| Část | Úloha |
|---|---|
| Aplikace | Obsahuje aktuální build číslo, adresu feedu a veřejný ověřovací klíč |
| Appcast | Nabízí verze, požadavky a odkaz na archiv |
| Archiv aktualizace | Obsahuje skutečný distribuovaný build |
| Podpis aktualizace | Umožní klientovi ověřit, že archiv pochází od držitele klíče |
| HTTPS hosting | Zpřístupní feed i soubory klientům |

## Před použitím

Potřebuješ macOS, integrované Sparkle 2, připravený distribuční build a podpisový klíč odpovídající veřejnému klíči zabudovanému do aplikace.

`CFBundleVersion` musí růst a `SUFeedURL` musí ukazovat na plánovanou HTTPS adresu feedu.

Vytvoření a ochranu klíče i integraci updateru proveď podle [oficiálního postupu Sparkle](https://sparkle-project.org/documentation/).

Soukromý klíč nepatří do Git repozitáře ani na veřejný server s aktualizacemi.

## Praktické použití: generování ze skutečného archivu

V terminálu macOS spusť příkazy ze složky distribuce Sparkle, která obsahuje adresář `bin`.

Ukázka předpokládá hotovou aplikaci `MyApp.app` v aktuální složce; název a umístění nahraď vlastním sestavením.

```bash
# Složka uchovává vydané archivy pro generování feedu a případných delt.
mkdir -p updates
# Vytvoří ZIP se zachováním struktury macOS aplikačního balíčku.
ditto -c -k --sequesterRsrc --keepParent MyApp.app updates/MyApp.zip
# Z archivu získá metadata, velikost a podpis; používá příslušný klíč v Keychain.
./bin/generate_appcast updates
```

Nástroj vytvoří appcast a podle dostupných předchozích verzí případně delta soubory.

Pro další vydání používej odlišný název archivu obsahující verzi, aby klienti a cache nezaměnili starý a nový soubor.

Před zveřejněním zkontroluj URL ve vygenerovaném feedu a nastavení nástroje příkazem `./bin/generate_appcast -h`.

Generování a podpisy popisuje [Publishing an update](https://sparkle-project.org/documentation/publishing/).

## Struktura feedu

Následující tabulka slouží ke čtení skutečně vygenerovaného XML; velikost a podpis se nesmějí nahradit odhadnutými hodnotami z univerzální ukázky.

| Element nebo atribut | Význam | Co lze upravit |
|---|---|---|
| `rss` a `xmlns:sparkle` | RSS kořen a namespace rozšíření | Namespace zachovat přesně podle Sparkle |
| `channel` | Metadata kanálu | Název a popis produktu |
| `item` | Jedno vydání | Poznámky a pravidla výběru dané verze |
| `sparkle:version` | Strojové build číslo | Musí odpovídat `CFBundleVersion` archivu |
| `sparkle:shortVersionString` | Čitelné označení vydání | Má odpovídat verzi aplikace |
| `enclosure url` | Adresa distribučního souboru | Musí vést na přesně podepsaný archiv |
| `length` a `sparkle:edSignature` | Velikost v bajtech a podpis | Generovat z hotového souboru |
| `sparkle:releaseNotesLink` | Odkaz na poznámky k vydání | Zveřejnit skutečně dostupný dokument |
| `sparkle:minimumSystemVersion` | Nejnižší podporovaný macOS | Musí odpovídat požadavkům buildu |
| `pubDate` | Datum vydání v RSS formátu | Správný den, čas a pásmo |

Doplňková RSS metadata nejsou náhradou za specifická pravidla Sparkle, například minimální verzi systému nebo kritickou aktualizaci.

## Delta aktualizace

Delta obsahuje rozdíl mezi konkrétní výchozí a cílovou verzí, nikoli univerzální patch pro libovolnou starší instalaci.

Nech ji vytvořit nástrojem z dostupných archivů a zachovej i plnou aktualizaci pro klienty, kteří deltu použít nemohou.

## Ověření před vydáním

1. Ověř podpis a distribuční požadavky samotné macOS aplikace včetně požadované notarizace.
2. Nahraj archivy a případné delty, ověř jejich dostupnost a teprve potom nabídni odpovídající feed.
3. Vyzkoušej aktualizaci ze skutečné starší podporované verze v odděleném testovacím prostředí.
4. Ověř zobrazení poznámek, odmítnutí nekompatibilního systému a spuštění nové verze se zachováním uživatelských dat.

Změna bajtů podepsaného archivu vyžaduje nový podpis a metadata.

Pokud aplikace vyžaduje i podepsaný feed (`SURequireSignedFeed`), po úpravě feedu nebo poznámek obnov také jejich podpisy podle dokumentace použité verze Sparkle.
