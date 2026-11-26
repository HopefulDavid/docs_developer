---
description: "Převody Markdownu, HTML, Wordu a PDF s volbou šablony."
---

# Pandoc – převody dokumentů

Pandoc převádí strukturu dokumentu mezi formáty.

Po převodu se kontrolují také tabulky, obrázky a stránkování.

## Základní použití

Pandoc se instaluje podle [oficiálního postupu](https://pandoc.org/installing.html) a instalaci ověří `pandoc --version`.

Příkazy se spouštějí ve složce vstupního souboru.

`<vstup>` a `<výstup>` zastupují cesty k souborům v uvedených formátech.

Příponu výstupu Pandoc používá při výběru formátu.

| Převod | Syntaxe |
|---|---|
| Markdown → DOCX | `pandoc <vstup.md> -o <výstup.docx>` |
| DOCX → Markdown a obrázky | `pandoc <vstup.docx> -t gfm --extract-media=<složka-obrázků> -o <výstup.md>` |
| Markdown → HTML | `pandoc <vstup.md> --standalone -o <výstup.html>` |
| HTML → Markdown | `pandoc <vstup.html> -t gfm -o <výstup.md>` |
| Markdown → EPUB | `pandoc <vstup.md> -o <výstup.epub>` |

Například `pandoc navod.md -o navod.docx` převede existující Markdown v pracovní složce do dokumentu Word.

Jména souborů se mění podle potřeby a výstup musí jít vytvořit nebo přepsat.

`-o` určuje výstupní soubor, `-t gfm` zvolí GitHub Flavored Markdown a `--extract-media=media` uloží obrázky do složky `media`.

Jména vstupu, výstupu a složky obrázků lze změnit, ale existující cílový soubor může být přepsán.

Seznam dostupných formátů zobrazí `pandoc --list-input-formats` a `pandoc --list-output-formats`.

## Výstupní formáty

Každá záložka ukazuje příklad pro jeden výstupní formát.

<a id="html-v-jednom-souboru"></a>
<a id="styly-docx"></a>
<a id="pdf"></a>

## [HTML](#tab/pandoc-html)

**HTML v jednom souboru**

```text
pandoc dokument.md --standalone --embed-resources -o dokument.html
```

`--standalone` přidává strukturu dokumentu.

Teprve `--embed-resources` vkládá podporované prostředky do HTML.

Starší `--self-contained` je zastaralý ekvivalent této kombinace.

## [Word DOCX](#tab/pandoc-docx)

**Referenční styly dokumentu**

```text
pandoc dokument.md --reference-doc=styly.docx -o dokument.docx
```

Soubor `styly.docx` poskytuje referenční styly a vlastnosti dokumentu.

Parametr `--template` není náhradou tohoto postupu.

## [PDF](#tab/pandoc-pdf)

```text
pandoc dokument.md --pdf-engine=xelatex -o dokument.pdf
```

Příklad vyžaduje nainstalovaný XeLaTeX a používané fonty.

PDF je výstupní formát, nikoli obecně podporovaný vstup pro převod PDF zpět na DOCX. [Manuál Pandocu](https://pandoc.org/MANUAL.html)

***
