## Pandoc

Pandoc je univerzální konvertor dokumentů, který dokáže převádět soubory z jednoho značkovacího formátu do jiného. 

Podporuje širokou škálu formátů, včetně Markdown, HTML, LaTeX a mnoha dalších.

<details>
<summary><span style="color:#1E90FF;">Přehled příkazů</span></summary>

| **Vstupní Formát**            | **Výstupní Formát**            | **Příkaz**                                                             | **Poznámka**                                                                                      | **Užitečné Možnosti (Parametry)**                                                                                                |
|-------------------------------|--------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| 📝 **Markdown (.md)**          | 📄 **DOCX (.docx)**            | `pandoc soubor.md -o soubor.docx`                                       | Převod z Markdownu do Word dokumentu.                                                              | `--standalone`, `--template=moje-sablona.tex`, `--metadata title="Název dokumentu"`                                             |
| 📝 **Markdown (.md)**          | 🌐 **HTML (.html)**            | `pandoc soubor.md -o soubor.html`                                       | Generování HTML souboru z Markdownu.                                                              | `--self-contained`, `--standalone`, `--css=style.css`, `--metadata title="Titul stránky"`                                        |
| 📝 **Markdown (.md)**          | 📑 **PDF (.pdf)**              | `pandoc soubor.md -o soubor.pdf`                                        | Generování PDF souboru z Markdownu (vyžaduje LaTeX nebo jiný engine).                              | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--variable graphics=yes`, `--toc`                                          |
| 📝 **Markdown (.md)**          | 📚 **EPUB (.epub)**            | `pandoc soubor.md -o soubor.epub`                                       | Generování e-knihy z Markdownu.                                                                   | `--epub-metadata=metadata.xml`, `--css=style.css`, `--epub-cover-image=image.jpg`, `--output=output.epub`                       |
| 📄 **DOCX (.docx)**            | 📝 **Markdown (.md)**          | `pandoc soubor.docx -o soubor.md`                                       | Převod Word dokumentu na Markdown.                                                                 | `--extract-media=.` (extrakce obrázků do složky `media/`), `--standalone`                                                          |
| 📄 **DOCX (.docx)**            | 🌐 **HTML (.html)**            | `pandoc soubor.docx -o soubor.html`                                     | Generování HTML z Word dokumentu.                                                                 | `--self-contained`, `--standalone`, `--css=style.css`, `--output=output.html`                                                     |
| 📄 **DOCX (.docx)**            | 📑 **PDF (.pdf)**              | `pandoc soubor.docx -o soubor.pdf`                                      | Generování PDF z Word souboru (vyžaduje LaTeX).                                                    | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc`, `--output=output.pdf`                                             |
| 📄 **DOCX (.docx)**            | 📚 **EPUB (.epub)**            | `pandoc soubor.docx -o soubor.epub`                                     | Generování e-knihy z Word souboru.                                                                | `--epub-metadata=metadata.xml`, `--css=style.css`, `--epub-cover-image=image.jpg`                                                 |
| 🌐 **HTML (.html)**            | 📝 **Markdown (.md)**          | `pandoc soubor.html -o soubor.md`                                       | Převod HTML do Markdownu.                                                                          | `--standalone`, `--self-contained`, `--metadata`                                                                                  |
| 🌐 **HTML (.html)**            | 📄 **DOCX (.docx)**            | `pandoc soubor.html -o soubor.docx`                                     | Generování Word dokumentu z HTML.                                                                 | `--self-contained`, `--standalone`, `--extract-media=.`                                                                             |
| 🌐 **HTML (.html)**            | 📑 **PDF (.pdf)**              | `pandoc soubor.html -o soubor.pdf`                                      | Generování PDF z HTML souboru (vyžaduje LaTeX nebo jiný engine).                                  | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc`, `--output=output.pdf`                                             |
| 🌐 **HTML (.html)**            | 📚 **EPUB (.epub)**            | `pandoc soubor.html -o soubor.epub`                                     | Generování e-knihy z HTML souboru.                                                                | `--epub-metadata=metadata.xml`, `--css=style.css`, `--epub-cover-image=image.jpg`                                                 |
| 📑 **LaTeX (.tex)**            | 📝 **Markdown (.md)**          | `pandoc soubor.tex -o soubor.md`                                        | Převod LaTeX souboru na Markdown.                                                                  | `--standalone`, `--self-contained`                                                                                               |
| 📑 **LaTeX (.tex)**            | 📄 **DOCX (.docx)**            | `pandoc soubor.tex -o soubor.docx`                                      | Generování Word dokumentu z LaTeX souboru.                                                       | `--pdf-engine=xelatex`, `--extract-media=.`                                                                                     |
| 📑 **LaTeX (.tex)**            | 🌐 **HTML (.html)**            | `pandoc soubor.tex -o soubor.html`                                      | Generování HTML z LaTeX souboru.                                                                 | `--self-contained`, `--standalone`, `--metadata`                                                                                  |
| 📑 **LaTeX (.tex)**            | 📑 **PDF (.pdf)**              | `pandoc soubor.tex -o soubor.pdf`                                       | Kompilace LaTeX souboru do PDF.                                                                   | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc`, `--output=output.pdf`                                            |
| 📑 **LaTeX (.tex)**            | 📚 **EPUB (.epub)**            | `pandoc soubor.tex -o soubor.epub`                                      | Generování e-knihy z LaTeX souboru.                                                               | `--epub-metadata=metadata.xml`, `--css=style.css`, `--epub-cover-image=image.jpg`                                                 |
| 📚 **EPUB (.epub)**            | 📝 **Markdown (.md)**          | `pandoc soubor.epub -o soubor.md`                                       | Převod EPUB knihy na Markdown.                                                                    | `--standalone`, `--self-contained`, `--metadata`                                                                                  |
| 📚 **EPUB (.epub)**            | 📄 **DOCX (.docx)**            | `pandoc soubor.epub -o soubor.docx`                                     | Generování Word dokumentu z EPUB knihy.                                                           | `--epub-metadata=metadata.xml`, `--css=style.css`, `--extract-media=.`                                                           |
| 📚 **EPUB (.epub)**            | 🌐 **HTML (.html)**            | `pandoc soubor.epub -o soubor.html`                                     | Generování HTML z EPUB knihy.                                                                    | `--self-contained`, `--standalone`, `--metadata`                                                                                  |
| 📚 **EPUB (.epub)**            | 📑 **PDF (.pdf)**              | `pandoc soubor.epub -o soubor.pdf`                                      | Generování PDF z EPUB knihy (vyžaduje LaTeX nebo jiný engine).                                    | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc`, `--output=output.pdf`                                            |
| 📄 **RTF (.rtf)**             | 📝 **Markdown (.md)**          | `pandoc soubor.rtf -o soubor.md`                                        | Převod RTF do Markdownu.                                                                           | `--standalone`, `--self-contained`, `--metadata`                                                                                  |
| 📄 **RTF (.rtf)**             | 📄 **DOCX (.docx)**            | `pandoc soubor.rtf -o soubor.docx`                                      | Generování Word dokumentu z RTF.                                                                  | `--extract-media=.`                                                                                                              |
| 📄 **RTF (.rtf)**             | 🌐 **HTML (.html)**            | `pandoc soubor.rtf -o soubor.html`                                      | Generování HTML z RTF souboru.                                                                   | `--self-contained`, `--standalone`, `--metadata`                                                                                  |
| 📄 **RTF (.rtf)**             | 📑 **PDF (.pdf)**              | `pandoc soubor.rtf -o soubor.pdf`                                       | Generování PDF z RTF souboru (vyžaduje LaTeX nebo jiný engine).                                  | `--pdf-engine=xelatex`, `--template=moje-sablona.tex`, `--toc`, `--output=output.pdf`                                            |

</details>

---

<details>
<summary><span style="color:#1E90FF;">Užitečné Možnosti pro Konfiguraci Výstupů</span></summary>

- **Nastavení metadat (title, author, date)**:  
  ```sh
  pandoc soubor.md -o soubor.pdf --metadata title="Titul dokumentu" --metadata author="Autor"
  ```

- **Použití vlastní šablony pro PDF/HTML**:  
  ```sh
  pandoc soubor.md -o soubor.pdf --template=moje-sablona.tex
  ```

- **Generování samostatného souboru pro HTML/PDF (včetně obrázků)**:  
  ```sh
  pandoc soubor.md -o soubor.html --standalone
  ```

- **Přidání obrázků přímo do HTML (base64)**:  
  ```sh
  pandoc soubor.md -o soubor.html --self-contained
  ```

- **Vložení obrázků (s externími cestami)**:  
  ```sh
  pandoc soubor.md -o soubor.html --extract-media=./media
  ```

- **Zobrazení obsahu (TOC)**:  
  ```sh
  pandoc soubor.md -o soubor.pdf --toc
  ```

- **Výběr formátu pro PDF engine (xelatex, pdflatex, etc.)**:  
  ```sh
  pandoc soubor.md -o soubor.pdf --pdf-engine=xelatex
  ```

</details>