# Git - Uživatelská konfigurace

## 🛣️ Povolení dlouhých cest ve Windows

```bash
git config --system core.longpaths true
```

povolí v Git podporu dlouhých cest na Windows, což často řeší chybu **„Filename too long“**.

> ⚠️ **Pozor:**
> - Tento příkaz se musí spustit s administrátorskými právy, protože mění systémovou konfiguraci Gitu.
> 
> - Musí mít ve Windows povolenou podporu dlouhých cest. (Pokud to není povolené, Git to nezvládne.)

Pokud ještě nemáte povolené dlouhé cesty v systému, lze to udělat takto:

1. Spusť `regedit`
2. Najdi klíč: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
3. Najdi nebo vytvoř DWORD hodnotu `LongPathsEnabled` a nastav ji na `1`.
4. Restartuj počítač.

---

## ⚙️ Nastavení Meld jako diff/merge tool

**Meld** je vizuální nástroj pro porovnávání a slučování souborů.

Umožňuje přehledné zobrazení rozdílů a snadné řešení konfliktů.

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

### 📝 Použití v praxi

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