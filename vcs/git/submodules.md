# 🗂️ Git – Submoduly: Přehled & použití

> 🚀 Praktické rady pro správu externích repozitářů pomocí submodulů v Git.

---

## 🔎 Co jsou submoduly?

- Umožňují vložit jeden Git repozitář do jiného jako podadresář.
- Zachovávají nezávislost obou repozitářů.
- Vhodné pro správu závislostí, sdílený kód nebo více projektů najednou.

---

## 🏗️ Struktura projektu se submodulem

<details>
<summary><span style="color:#1E90FF;">📁 Ukázková struktura</span></summary>

```plaintext
HlavniProjekt/
  ├── .git/
  ├── .gitmodules
  ├── BeznyAdresar/
  └── Submodul/
      └── .git/
```
</details>

---

## ⚙️ Základní příkazy

<details>
<summary><span style="color:#1E90FF;">➕ Přidání submodulu</span></summary>

```bash
git submodule add https://github.com/uzivatel/knihovna libs/knihovna
```
</details>

<details>
<summary><span style="color:#1E90FF;">📥 Klonování projektu se submoduly</span></summary>

- Vše najednou:
  ```bash
  git clone --recursive https://github.com/uzivatel/projekt
  ```
- Postupně:
  ```bash
  git clone https://github.com/uzivatel/projekt
  git submodule init
  git submodule update
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Aktualizace submodulů</span></summary>

- Všechny submoduly:
  ```bash
  git submodule update --remote
  ```
- Konkrétní submodul:
  ```bash
  cd cesta/k/submodulu
  git checkout main
  git pull
  cd ../..
  git add cesta/k/submodulu
  git commit -m "Aktualizován submodul na nejnovější verzi"
  ```
</details>

---

## 🎮 Praktický příklad v Unity projektu

<details>
<summary><span style="color:#1E90FF;">🧩 Struktura & přidání submodulů</span></summary>

```plaintext
UnityProjekt/
  ├── .git/
  ├── .gitmodules
  └── Assets/
      ├── Game/
      └── Plugins/
          ├── UI-Framework/
          └── Network/
```

```bash
cd UnityProjekt
git init
git submodule add https://github.com/author/ui-framework Assets/Plugins/UI-Framework
git submodule add https://github.com/author/network-lib Assets/Plugins/Network
```
</details>

---

## 💡 Tipy pro práci se submoduly

<details>
<summary><span style="color:#1E90FF;">🔀 Přepínání verzí submodulu</span></summary>

```bash
cd cesta/k/submodulu
git checkout v2.0.0
cd ../..
git add cesta/k/submodulu
git commit -m "Změněna verze submodulu na v2.0.0"
```
</details>

<details>
<summary><span style="color:#1E90FF;">✏️ Úpravy v submodulu</span></summary>

```bash
cd cesta/k/submodulu
git checkout -b oprava-chyby
# proveďte změny
git commit -am "Oprava chyby"
git push origin oprava-chyby
# vytvořte pull request v repozitáři submodulu
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Odstranění submodulu</span></summary>

```bash
git submodule deinit cesta/k/submodulu
git rm --cached cesta/k/submodulu
rm -rf cesta/k/submodulu
rm -rf .git/modules/cesta/k/submodulu
git commit -m "Odstraněn submodul"
```
</details>

---

## 🛠️ Řešení častých problémů

<details>
<summary><span style="color:#1E90FF;">🧩 Submodul v "detached HEAD" stavu</span></summary>

```bash
cd cesta/k/submodulu
git checkout main
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Submodul ukazuje změny i když žádné nemáte</span></summary>

```bash
git submodule update
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔗 Změna URL submodulu</span></summary>

```bash
git config --file=.gitmodules submodule.nazev.url NOVA_URL
git submodule sync
```
</details>

<details>
<summary><span style="color:#1E90FF;">📋 Kontrola stavu submodulů</span></summary>

```bash
git submodule status
```
</details>

---

## ⚖️ Výhody & nevýhody submodulů

<details>
<summary><span style="color:#1E90FF;">✅ Výhody</span></summary>

- Přesná kontrola verzí externích knihoven
- Možnost přímých úprav závislostí
- Lepší organizace v komplexních projektech

</details>

<details>
<summary><span style="color:#E95A84;">❌ Nevýhody</span></summary>

- Vyšší složitost správy
- Nutnost synchronizace hlavního repozitáře po změnách v submodulech
- Strmější učící křivka pro nové členy týmu

</details>