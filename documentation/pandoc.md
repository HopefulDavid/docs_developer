# Pandoc – převody dokumentů

Pandoc převádí strukturu dokumentu mezi formáty; po převodu ověř také tabulky, obrázky a stránkování.

## Základní použití

Nainstaluj Pandoc podle [oficiálního postupu](https://pandoc.org/installing.html) a ověř `pandoc --version`.

Příkazy spouštěj ve složce vstupního souboru:

| Převod | Příkaz |
|---|---|
| Markdown → DOCX | `pandoc dokument.md -o dokument.docx` |
| DOCX → Markdown a obrázky | `pandoc dokument.docx -t gfm --extract-media=media -o dokument.md` |
| Markdown → HTML | `pandoc dokument.md --standalone -o dokument.html` |
| HTML → Markdown | `pandoc dokument.html -t gfm -o dokument.md` |
| Markdown → EPUB | `pandoc dokument.md -o dokument.epub` |

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
