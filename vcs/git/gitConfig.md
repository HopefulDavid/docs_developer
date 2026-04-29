# Git – Uživatelská konfigurace

> Praktické rady pro globální nastavení Gitu, dlouhé cesty na Windows a konfiguraci vizuálních nástrojů.

---

<img src="./images/e159d23c-f2b8-4884-bc0b-800bae9db096.png" alt="Ollama" style="width: 100%; max-width: 950px; display: block; border-radius: 8px;">

## Povolení dlouhých cest ve Windows

```bash
git config --system core.longpaths true
```

povolí v Git podporu dlouhých cest na Windows, což často řeší chybu **„Filename too long“**.

> **Pozor:**
> - Tento příkaz se musí spustit s administrátorskými právy, protože mění systémovou konfiguraci Gitu.
>
> - Musí mít ve Windows povolenou podporu dlouhých cest. (Pokud to není povolené, Git to nezvládne.)

Pokud ještě nemáte povolené dlouhé cesty v systému, lze to udělat takto:

1. Spusť `regedit`
2. Najdi klíč: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
3. Najdi nebo vytvoř DWORD hodnotu `LongPathsEnabled` a nastav ji na `1`.
4. Restartuj počítač.

---

## Nastavení Meld jako diff/merge tool

**Meld** je vizuální nástroj pro porovnávání a slučování souborů.

Umožňuje přehledné zobrazení rozdílů a snadné řešení konfliktů.

<details>
<summary>Windows – Kompletní postup</summary>

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
<summary>Linux – Kompletní postup</summary>

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

### Použití v praxi

<details>
<summary>Porovnání změn</summary>

- Spusťte porovnání souborů:
  ```bash
  git difftool
  ```

</details>

<details>
<summary>Řešení konfliktů při slučování</summary>

- Spusťte nástroj pro slučování:
  ```bash
  git mergetool
  ```

</details>