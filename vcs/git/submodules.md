# Git Submodules

Umožňuje vložit jeden Git repozitář do jiného jako podadresář, přičemž si oba repozitáře zachovávají nezávislost.

Submoduly řeší problém, kdy potřebujete:

- Zahrnout externí kód do svého projektu
- Udržovat přesnou verzi závislostí
- Pracovat na více souvisejících projektech současně

<details>
<summary><span style="color:#1E90FF;">Základní struktura</span></summary>

```plaintext
HlavniProjekt/
  ├── .git/                  # Git repozitář hlavního projektu
  ├── .gitmodules            # Konfigurace submodulů
  ├── BeznyAdresar/          # Běžný adresář v hlavním projektu
  └── Submodul/              # Podadresář obsahující submodul
      └── .git/              # Samostatný git repozitář
```

</details>

---

<details>
<summary><span style="color:#1E90FF;">Základní příkazy</span></summary>

### Přidání submodulu

```bash
# Syntaxe: git submodule add [URL] [cesta]
git submodule add https://github.com/uzivatel/knihovna libs/knihovna
```

### Klonování projektu se submoduly

```bash
# Způsob 1: Vše najednou
git clone --recursive https://github.com/uzivatel/projekt

# Způsob 2: Nejprve projekt, pak inicializace submodulů
git clone https://github.com/uzivatel/projekt
git submodule init
git submodule update
```

### Aktualizace submodulů

```bash
# Aktualizace všech submodulů na nejnovější commit z remote
git submodule update --remote

# Aktualizace konkrétního submodulu
cd cesta/k/submodulu
git checkout main
git pull
cd ../..
git add cesta/k/submodulu
git commit -m "Aktualizován submodul na nejnovější verzi"
```

</details>

---

<details>
<summary><span style="color:#1E90FF;">Praktický příklad použití v Unity projektu</span></summary>

### Vhodná struktura

```plaintext
UnityProjekt/
  ├── .git/
  ├── .gitmodules
  └── Assets/
      ├── Game/             # Váš herní kód (součást hlavního repozitáře)
      └── Plugins/          # Složka pro externí knihovny
          ├── UI-Framework/ # Submodul s UI frameworkem
          │   └── .git/
          └── Network/      # Submodul s síťovou knihovnou
              └── .git/
```

### Vytvoření této struktury

```bash
# Vytvoření hlavního repozitáře
cd UnityProjekt
git init

# Přidání UI frameworku jako submodulu
git submodule add https://github.com/author/ui-framework Assets/Plugins/UI-Framework

# Přidání síťové knihovny jako submodulu
git submodule add https://github.com/author/network-lib Assets/Plugins/Network
```

</details>

---

<details>
<summary><span style="color:#1E90FF;">Tipy pro práci se submoduly</span></summary>

1. **Přepínání mezi verzemi**
   ```bash
   cd cesta/k/submodulu
   git checkout v2.0.0
   cd ../..
   git add cesta/k/submodulu
   git commit -m "Změněna verze submodulu na v2.0.0"
   ```

2. **Úpravy v submodulu**
   ```bash
   # Změny v submodulu
   cd cesta/k/submodulu
   git checkout -b oprava-chyby
   # proveďte změny
   git commit -am "Oprava chyby"
   git push origin oprava-chyby
   # vytvořte pull request v repozitáři submodulu
   ```

3. **Odstranění submodulu**
   ```bash
   # 1. Odebrat z .gitmodules
   git submodule deinit cesta/k/submodulu
   # 2. Odebrat z .git/config
   git rm --cached cesta/k/submodulu
   # 3. Smazat adresář
   rm -rf cesta/k/submodulu
   rm -rf .git/modules/cesta/k/submodulu
   # 4. Commit
   git commit -m "Odstraněn submodul"
   ```

</details>

---

<details>
<summary><span style="color:#1E90FF;">Časté problémy a řešení</span></summary>

1. **Submodul v "detached HEAD" stavu**
   ```bash
   cd cesta/k/submodulu
   git checkout main
   ```

2. **Submodul ukazuje změny i když žádné nemáte**
   ```bash
   git submodule update
   ```

3. **Změna URL submodulu**
   ```bash
   git config --file=.gitmodules submodule.nazev.url NOVA_URL
   git submodule sync
   ```

4. **Kontrola stavu submodulů**
   ```bash
   git submodule status
   ```

</details>

---

<details>
<summary><span style="color:#1E90FF;">Výhody a nevýhody</span></summary>

### Výhody submodulů
- Přesná kontrola verzí externích knihoven
- Možnost přímo upravovat a přispívat do závislostí
- Lepší organizace kódu v komplexních projektech

### Nevýhody submodulů
- Vyšší složitost správy repozitáře
- Nutnost vždy aktualizovat hlavní repozitář po změnách v submodulech
- Strmější učící křivka pro nové členy týmu

</details>