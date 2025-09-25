# 🗂️ Pandoc – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, příkazů a doporučení pro práci s Pandoc.

---

## 📖 Co je Pandoc?

- **Univerzální konvertor dokumentů**
- Podporuje širokou škálu formátů: Markdown, HTML, LaTeX, DOCX, PDF, EPUB, RTF a další
- Umožňuje převádět soubory mezi různými značkovacími formáty

> [!NOTE]  
> Pandoc je ideální pro automatizaci převodů dokumentů v projektech.

---

## 🛠️ Přehled příkazů

<details>
<summary><span style="color:#1E90FF;">📋 Tabulka převodů & možností</span></summary>

| **Vstupní Formát** | **Výstupní Formát** | **Příkaz** | **Poznámka** | **Užitečné Možnosti** |
|--------------------|---------------------|------------|--------------|-----------------------|
| 📝 Markdown (.md)  | 📄 DOCX (.docx)     | `pandoc soubor.md -o soubor.docx` | Markdown → Word | `--standalone`, `--template=moje-sablona.tex`, `--metadata title="Název dokumentu"` |
| 📝 Markdown (.md)  | 🌐 HTML (.html)     | `pandoc soubor.md -o soubor.html` | Markdown → HTML | `--self-contained`, `--css=style.css`, `--metadata title="Titul stránky"` |
| 📝 Markdown (.md)  | 📑 PDF (.pdf)       | `pandoc soubor.md -o soubor.pdf` | Markdown → PDF (vyžaduje LaTeX) | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |
| 📝 Markdown (.md)  | 📚 EPUB (.epub)     | `pandoc soubor.md -o soubor.epub` | Markdown → e-kniha | `--epub-metadata=metadata.xml`, `--css=style.css`, `--epub-cover-image=image.jpg` |
| 📄 DOCX (.docx)    | 📝 Markdown (.md)   | `pandoc soubor.docx -o soubor.md` | Word → Markdown | `--extract-media=.` |
| 📄 DOCX (.docx)    | 🌐 HTML (.html)     | `pandoc soubor.docx -o soubor.html` | Word → HTML | `--self-contained`, `--css=style.css` |
| 📄 DOCX (.docx)    | 📑 PDF (.pdf)       | `pandoc soubor.docx -o soubor.pdf` | Word → PDF | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |
| 📄 DOCX (.docx)    | 📚 EPUB (.epub)     | `pandoc soubor.docx -o soubor.epub` | Word → e-kniha | `--epub-metadata=metadata.xml`, `--css=style.css` |
| 🌐 HTML (.html)    | 📝 Markdown (.md)   | `pandoc soubor.html -o soubor.md` | HTML → Markdown | `--standalone`, `--self-contained` |
| 🌐 HTML (.html)    | 📄 DOCX (.docx)     | `pandoc soubor.html -o soubor.docx` | HTML → Word | `--self-contained`, `--extract-media=.` |
| 🌐 HTML (.html)    | 📑 PDF (.pdf)       | `pandoc soubor.html -o soubor.pdf` | HTML → PDF | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |
| 🌐 HTML (.html)    | 📚 EPUB (.epub)     | `pandoc soubor.html -o soubor.epub` | HTML → e-kniha | `--epub-metadata=metadata.xml`, `--css=style.css` |
| 📑 LaTeX (.tex)    | 📝 Markdown (.md)   | `pandoc soubor.tex -o soubor.md` | LaTeX → Markdown | `--standalone`, `--self-contained` |
| 📑 LaTeX (.tex)    | 📄 DOCX (.docx)     | `pandoc soubor.tex -o soubor.docx` | LaTeX → Word | `--pdf-engine=xelatex`, `--extract-media=.` |
| 📑 LaTeX (.tex)    | 🌐 HTML (.html)     | `pandoc soubor.tex -o soubor.html` | LaTeX → HTML | `--self-contained`, `--standalone` |
| 📑 LaTeX (.tex)    | 📑 PDF (.pdf)       | `pandoc soubor.tex -o soubor.pdf` | LaTeX → PDF | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |
| 📑 LaTeX (.tex)    | 📚 EPUB (.epub)     | `pandoc soubor.tex -o soubor.epub` | LaTeX → e-kniha | `--epub-metadata=metadata.xml`, `--css=style.css` |
| 📚 EPUB (.epub)    | 📝 Markdown (.md)   | `pandoc soubor.epub -o soubor.md` | EPUB → Markdown | `--standalone`, `--self-contained` |
| 📚 EPUB (.epub)    | 📄 DOCX (.docx)     | `pandoc soubor.epub -o soubor.docx` | EPUB → Word | `--extract-media=.` |
| 📚 EPUB (.epub)    | 🌐 HTML (.html)     | `pandoc soubor.epub -o soubor.html` | EPUB → HTML | `--self-contained`, `--standalone` |
| 📚 EPUB (.epub)    | 📑 PDF (.pdf)       | `pandoc soubor.epub -o soubor.pdf` | EPUB → PDF | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |
| 📄 RTF (.rtf)      | 📝 Markdown (.md)   | `pandoc soubor.rtf -o soubor.md` | RTF → Markdown | `--standalone`, `--self-contained` |
| 📄 RTF (.rtf)      | 📄 DOCX (.docx)     | `pandoc soubor.rtf -o soubor.docx` | RTF → Word | `--extract-media=.` |
| 📄 RTF (.rtf)      | 🌐 HTML (.html)     | `pandoc soubor.rtf -o soubor.html` | RTF → HTML | `--self-contained`, `--standalone` |
| 📄 RTF (.rtf)      | 📑 PDF (.pdf)       | `pandoc soubor.rtf -o soubor.pdf` | RTF → PDF | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc` |

</details>

---

## ⚙️ Užitečné možnosti pro konfiguraci výstupů

<details>
<summary><span style="color:#1E90FF;">🔧 Nastavení metadat, šablon a výstupů</span></summary>

- **Nastavení metadat (title, author, date):**
  ```sh
  pandoc soubor.md -o soubor.pdf --metadata title="Titul dokumentu" --metadata author="Autor"
  ```

- **Použití vlastní šablony pro PDF/HTML:**
  ```sh
  pandoc soubor.md -o soubor.pdf --template=moje-sablona.tex
  ```

- **Generování samostatného souboru pro HTML/PDF (včetně obrázků):**
  ```sh
  pandoc soubor.md -o soubor.html --standalone
  ```

- **Přidání obrázků přímo do HTML (base64):**
  ```sh
  pandoc soubor.md -o soubor.html --self-contained
  ```

- **Vložení obrázků (s externími cestami):**
  ```sh
  pandoc soubor.md -o soubor.html --extract-media=./media
  ```

- **Zobrazení obsahu (TOC):**
  ```sh
  pandoc soubor.md -o soubor.pdf --toc
  ```

- **Výběr formátu pro PDF engine (xelatex, pdflatex, etc.):**
  ```sh
  pandoc soubor.md -o soubor.pdf --pdf-engine=xelatex
  ```
</details>