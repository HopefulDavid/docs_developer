---
description: "Převody Markdownu, HTML, Wordu a PDF s volbou šablony."
---

# Pandoc – převody dokumentů

Pandoc převádí strukturu dokumentu mezi formáty; po převodu ověř také tabulky, obrázky a stránkování.

## Základní použití

Nainstaluj Pandoc podle [oficiálního postupu](https://pandoc.org/installing.html) a ověř `pandoc --version`.

Příkazy spouštěj ve složce vstupního souboru:

`<vstup>` a `<výstup>` nahraď cestami k souborům v uvedených formátech; příponu výstupu Pandoc používá při výběru formátu.

| Převod | Syntaxe |
|---|---|
| Markdown → DOCX | `pandoc <vstup.md> -o <výstup.docx>` |
| DOCX → Markdown a obrázky | `pandoc <vstup.docx> -t gfm --extract-media=<složka-obrázků> -o <výstup.md>` |
| Markdown → HTML | `pandoc <vstup.md> --standalone -o <výstup.html>` |
| HTML → Markdown | `pandoc <vstup.html> -t gfm -o <výstup.md>` |
| Markdown → EPUB | `pandoc <vstup.md> -o <výstup.epub>` |

Například `pandoc navod.md -o navod.docx` převede existující Markdown ve tvé pracovní složce do dokumentu Word; jména souborů změň podle potřeby a zvol výstup, který můžeš vytvořit nebo přepsat.

`-o` určuje výstupní soubor, `-t gfm` zvolí GitHub Flavored Markdown a `--extract-media=media` uloží obrázky do složky `media`.

Jména vstupu, výstupu a složky obrázků můžeš změnit, ale existující cílový soubor může být přepsán.

Seznam dostupných formátů zobrazí `pandoc --list-input-formats` a `pandoc --list-output-formats`.

## HTML v jednom souboru

```text
pandoc dokument.md --standalone --embed-resources -o dokument.html
```

`--standalone` přidává strukturu dokumentu; teprve `--embed-resources` vkládá podporované prostředky do HTML.

Starší `--self-contained` je zastaralý ekvivalent této kombinace.

## Styly DOCX

```text
pandoc dokument.md --reference-doc=styly.docx -o dokument.docx
```

Soubor `styly.docx` poskytuje referenční styly a vlastnosti dokumentu; parametr `--template` není náhradou tohoto postupu.

## PDF

```text
pandoc dokument.md --pdf-engine=xelatex -o dokument.pdf
```

Příklad vyžaduje nainstalovaný XeLaTeX a používané fonty.

PDF je výstupní formát, nikoli obecně podporovaný vstup pro převod PDF zpět na DOCX. [Manuál Pandocu](https://pandoc.org/MANUAL.html)
