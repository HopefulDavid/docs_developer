# 🗂️ Doxygen – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, instalace, konfigurace a doporučení pro práci s Doxygen.

---

## 📖 Co je Doxygen?

- **Nástroj pro automatické generování dokumentace z komentářů v kódu**
- Podporuje různé jazyky (C, C++, C#, Java, Python, atd.)
- Umožňuje generovat dokumentaci ve formátech HTML, LaTeX (PDF), RTF, XML

> [!NOTE]  
> Doxygen je ideální pro udržení přehledné a strukturované dokumentace ke kódu.

---

## 🛠️ Instalace

<details>
<summary><span style="color:#1E90FF;">🔹 Krok 1: Instalace potřebných nástrojů</span></summary>

1. **Nainstalovat Doxygen**
    - Stáhněte z [doxygen.nl/download.html](https://www.doxygen.nl/download.html)
    - Ověřte instalaci:
      ```sh
      doxygen --version
      ```

2. **Nainstalovat Graphviz** (pro diagramy)
    - Stáhněte z [Graphviz Download](https://graphviz.gitlab.io/download/)
    - Přidejte cestu ke složce `Graphviz/bin` do systémové `PATH`
    - Ověřte instalaci:
      ```sh
      dot -version
      ```

3. **Nainstalovat TeX Live nebo MiKTeX** (pro PDF)
    - **Windows:** [miktex.org/download](https://miktex.org/download)
    - **Linux:**
      ```sh
      sudo apt install texlive-full
      ```
    - **Mac:**
      ```sh
      brew install mactex
      ```
</details>

---

## ⚙️ Konfigurace

<details>
<summary><span style="color:#1E90FF;">🔹 Krok 2: Vytvoření konfiguračního souboru</span></summary>

1. **Vytvořte `Doxyfile` v adresáři projektu:**
   ```sh
   doxygen -g Doxyfile
   ```

2. **Upravte klíčové parametry v `Doxyfile`:**
   ```
   INPUT                  = ../../
   PROJECT_NAME           = "Moje C# dokumentace"
   OUTPUT_DIRECTORY       = "docs"
   RECURSIVE              = YES
   EXTRACT_ALL            = YES
   GENERATE_LATEX         = YES
   GENERATE_HTML          = NO
   GENERATE_XML           = NO
   HAVE_DOT               = YES
   UML_LOOK               = YES
   DOT_PATH               = "C:/Program Files/Graphviz/bin"
   SHOW_USED_FILES        = NO
   SHOW_NAMESPACES        = NO
   DOT_IMAGE_FORMAT       = svg
   ```
   > [!IMPORTANT]  
   > Tyto parametry ovlivňují generování dokumentace.  
   > Další nastavení lze upravit dle potřeby.
</details>

---

## 📄 Generování dokumentace

<details>
<summary><span style="color:#1E90FF;">🔹 Krok 3: Generování výstupních souborů</span></summary>

- Spusťte Doxygen:
  ```sh
  doxygen Doxyfile
  ```
- Výstupní složka bude dle `OUTPUT_DIRECTORY` (např. `docs`)
</details>

---

## 🚫 Vynechání private a protected členů

<details>
<summary><span style="color:#1E90FF;">Jak vynechat private a protected z dokumentace</span></summary>

V souboru `Doxyfile` nastavte:

```
EXTRACT_PRIVATE      = NO
ENABLE_PREPROCESSING = YES
MACRO_EXPANSION      = YES
EXPAND_ONLY_PREDEF   = YES
PREDEFINED           = protected=private
```

Tímto způsobem Doxygen vynechá private a protected členy z dokumentace.
</details>