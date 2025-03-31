## Doxygen

Slouží k automatickému generování dokumentace z komentářů v kódu. 

Je to velmi užitečný nástroj pro vývojáře, kteří chtějí mít přehlednou a strukturovanou dokumentaci ke kódu.

<details>
<summary><span style="color:#1E90FF;">Instalace</span></summary>

#### **🔹 Krok 1: Instalace potřebných nástrojů**
1. **Nainstalovat Doxygen**  
   - Stáhněte a nainstalujte z [doxygen.nl](https://www.doxygen.nl/download.html).  
   - Po instalaci ověřte, že funguje, spuštěním příkazu v terminálu nebo příkazovém řádku:
     ```sh
     doxygen --version
     ```
   
2. **Nainstalujte Graphviz** (pro generování diagramů)  
   - Stáhněte z [Graphviz Download](https://graphviz.gitlab.io/download/) a nainstalujte.  
   - Přidejte cestu ke složce **Graphviz/bin** do **systémové PATH**, aby Doxygen našel `dot.exe`.  
   - Ověřte, že Graphviz funguje:
     ```sh
     dot -version
     ```

3. **Nainstaluj TeX Live nebo MiKTeX** (pro PDF)  
   - **Windows**: Stáhněte si **MiKTeX** [miktex.org/download](https://miktex.org/download)  
   - **Linux**:  
     ```sh
     sudo apt install texlive-full
     ```
   - **Mac**:  
     ```sh
     brew install mactex
     ```

---

#### **🔹 Krok 2: Vytvoření konfiguračního souboru Doxygen**
1. **Otevřete terminál / CMD v adresáři projektu** a vytvořte `Doxyfile`:
   ```sh
   doxygen -g Doxyfile
   ```
   **Tím se vytvoří soubor `Doxyfile`, který bude obsahovat všechna nastavení.**

2. **Otevřete `Doxyfile` v textovém editoru a upravte klíčové parametry:**
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
    > Tyto parametry ovlivňují generování dokumentace
    > 
    > Obsahuje spoustu dalších nastavení, které můžeš upravit podle potřeby.

---

#### **🔹 Krok 3: Generování dokumentace**
1. **Spusťte Doxygen** a vygeneruj výstupní soubory:
   ```sh
   doxygen Doxyfile
   ```
Doxygen vytvoří složku s názvem `docs` (nebo jiným dle `OUTPUT_DIRECTORY`), která obsahuje vygenerovanou dokumentaci.

</details>

---

<details>
<summary><span style="color:#1E90FF;">Vynechat private a protected z dokumentace</span></summary>

V souboru `DoxyFile` upravit:

```plaintext
Along with EXTRACT_PRIVATE = NO, use the following additional settings:

ENABLE_PREPROCESSING = YES
MACRO_EXPANSION = YES
EXPAND_ONLY_PREDEF = YES
PREDEFINED = protected=private
```

Tímto způsobem Doxygen vynechá private a protected členy z dokumentace.

</details>