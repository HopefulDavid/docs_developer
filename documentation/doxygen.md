---
description: "Generování dokumentace z komentářů a konfigurace výstupu."
---

# Doxygen – dokumentace zdrojového kódu

Doxygen vytváří referenční dokumentaci z deklarací a dokumentačních komentářů ve zdrojových souborech.

## Instalace a první sestavení

Nainstaluj Doxygen pro svůj systém a ověř `doxygen --version`. [Instalace](https://www.doxygen.nl/manual/install.html)

V kořeni projektu vytvoř konfigurační soubor:

```text
doxygen -g Doxyfile
```

V něm uprav existující hodnoty podle následující ukázky.

`src` musí odpovídat skutečnému adresáři zdrojů:

```ini
PROJECT_NAME = "Moje aplikace"
OUTPUT_DIRECTORY = docs-api
INPUT = src
RECURSIVE = YES
EXTRACT_ALL = NO
EXTRACT_PRIVATE = NO
GENERATE_HTML = YES
GENERATE_LATEX = NO
HAVE_DOT = NO
```

`PROJECT_NAME` mění titulek, `OUTPUT_DIRECTORY` cíl generování a `INPUT` složku zdrojů.

`RECURSIVE` zahrne podsložky.

Volby `EXTRACT_*` určují rozsah API a `GENERATE_*` požadované formáty výstupu.

`HAVE_DOT = NO` umožní první sestavení bez Graphviz.

Sestav dokumentaci:

```text
doxygen Doxyfile
```

Otevři `docs-api/html/index.html`, zkontroluj očekávané typy a oprav varování v terminálu.

## Rozsah dokumentace

`EXTRACT_ALL = YES` zahrne i nedokumentované entity, ale soukromé členy mají samostatné nastavení `EXTRACT_PRIVATE`.

Pro běžné API komentáře ponech `EXTRACT_ALL = NO`, aby ses mohl řídit varováními o nedokumentovaných členech.

Případné výjimky vybírej přes `EXCLUDE`, `EXCLUDE_PATTERNS` nebo `EXCLUDE_SYMBOLS`.

Nepřepisuj význam klíčových slov jazyka makrem. [Konfigurace](https://www.doxygen.nl/manual/config.html)

## Grafy a PDF

Pro grafy nainstaluj Graphviz a nastav `HAVE_DOT = YES`.

Pro PDF nastav `GENERATE_LATEX = YES` a připrav LaTeX distribuci.

Doxygen nejprve vytvoří LaTeX zdroje.

Výsledné PDF vznikne až jejich překladem, například `make` v adresáři `docs-api/latex` v prostředí s dostupným Make a LaTeXem. [Výstupy Doxygenu](https://www.doxygen.nl/manual/output.html)
