# 🗂️ Git – Nastavení porovnávání & slučování přes Meld

> 🚀 Praktické rady pro konfiguraci nástroje Meld jako diff/merge tool v Git na Windows i Linuxu.

---

## 🔍 Co je Meld?

- **Meld** je vizuální nástroj pro porovnávání a slučování souborů.
- Umožňuje přehledné zobrazení rozdílů a snadné řešení konfliktů.

---

## ⚙️ Nastavení Meld jako diff/merge tool

<details>
<summary><span style="color:#1E90FF;">💻 Windows – Kompletní postup</span></summary>

1. **Nainstalujte Meld**  
   [Stáhnout Meld pro Windows](https://meldmerge.org/)

2. **Nastavte Git pro použití Meld:**

   ```bash
   git config --global diff.tool meld
   git config --global difftool.meld.path "C:\Program Files\Meld\Meld.exe"
   git config --global difftool.prompt false

   git config --global merge.tool meld
   git config --global mergetool.meld.path "C:\Program Files\Meld\Meld.exe"
   git config --global mergetool.prompt false
   ```

> [!NOTE]  
> Cestu k `Meld.exe` upravte podle umístění instalace.

</details>

<details>
<summary><span style="color:#1E90FF;">🐧 Linux – Kompletní postup</span></summary>

1. **Nainstalujte Meld**
   ```bash
   sudo apt install meld
   ```

2. **Nastavte Git pro použití Meld:**

   ```bash
   git config --global diff.tool meld
   git config --global difftool.meld.path "/usr/bin/meld"
   git config --global difftool.prompt false

   git config --global merge.tool meld
   git config --global mergetool.meld.path "/usr/bin/meld"
   git config --global mergetool.prompt false
   ```

</details>

---

## 📝 Použití v praxi

<details>
<summary><span style="color:#1E90FF;">🔎 Porovnání změn</span></summary>

- Spusťte porovnání souborů:
  ```bash
  git difftool
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🔀 Řešení konfliktů při slučování</span></summary>

- Spusťte nástroj pro slučování:
  ```bash
  git mergetool
  ```
</details>