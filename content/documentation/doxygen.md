---
description: "Generování dokumentace z komentářů a konfigurace výstupu."
---

# Doxygen – dokumentace zdrojového kódu

Doxygen vytváří referenční dokumentaci z deklarací a dokumentačních komentářů ve zdrojových souborech.

## Instalace a první sestavení

Po instalaci Doxygenu pro daný systém se verze ověří příkazem `doxygen --version`. [Instalace](https://www.doxygen.nl/manual/install.html)

Konfigurační soubor vznikne v kořeni projektu:

```text
doxygen -g Doxyfile
```

V něm se upraví existující hodnoty podle následující ukázky.

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

Sestavení dokumentace:

```text
doxygen Doxyfile
```

Výsledek je v `docs-api/html/index.html`, kde se zkontrolují očekávané typy, a varování v terminálu se opraví.

## Rozsah dokumentace

`EXTRACT_ALL = YES` zahrne i nedokumentované entity, ale soukromé členy mají samostatné nastavení `EXTRACT_PRIVATE`.

Pro běžné API komentáře zůstává `EXTRACT_ALL = NO`, protože jen tak se zobrazují varování o nedokumentovaných členech.

Případné výjimky se vybírají přes `EXCLUDE`, `EXCLUDE_PATTERNS` nebo `EXCLUDE_SYMBOLS`.

Význam klíčových slov jazyka se makrem nepřepisuje. [Konfigurace](https://www.doxygen.nl/manual/config.html)

## Grafy a PDF

Grafy vyžadují Graphviz a nastavení `HAVE_DOT = YES`.

PDF vyžaduje `GENERATE_LATEX = YES` a distribuci LaTeXu.

Doxygen nejprve vytvoří LaTeX zdroje.

Výsledné PDF vznikne až jejich překladem, například `make` v adresáři `docs-api/latex` v prostředí s dostupným Make a LaTeXem. [Výstupy Doxygenu](https://www.doxygen.nl/manual/output.html)
