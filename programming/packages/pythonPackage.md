# 🐍 Python – Balíčky & Tipy

> 🚀 Praktické rady pro správu Python balíčků, zálohování, offline instalaci a užitečné příkazy.

---

## 📦 Co jsou Python balíčky?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy</span></summary>

- Balíčky rozšiřují možnosti Pythonu o nové knihovny a nástroje.
- Správa balíčků probíhá nejčastěji pomocí **pip**.
- Balíčky lze instalovat, zálohovat i používat offline.

![](../../images/python_packages_intro.png)

</details>

---

## 💾 Záloha balíčků

<details>
<summary><span style="color:#1E90FF;">🗂️ Jak zálohovat balíčky?</span></summary>

1. Použij příkaz pro stažení balíčku a jeho závislostí do složky:

```bash
pip download <název\_balíčku> -d <cesta\_k\_adresáři>
```

- Všechny potřebné soubory se uloží do zvolené složky.
- Vhodné pro instalaci na počítač bez internetu.

![](../../images/python_packages_backup.png)

</details>

---

## 🔄 Instalace balíčků ze zálohy

<details>
<summary><span style="color:#1E90FF;">🛠️ Offline instalace</span></summary>

1. Nainstaluj balíčky ze zálohy pomocí:

```bash
pip install --no-index --find-links <cesta\_k\_adresáři>
```

- `--no-index` zakáže hledání online.
- `--find-links` určí složku se staženými balíčky.

> [!NOTE]
> Tento postup je ideální pro offline prostředí nebo firemní instalace.

![](../../images/python_packages_offline.png)

</details>