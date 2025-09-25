# 🗂️ PowerShell – Praktický průvodce & tipy

> 🚀 Moderní přehled instalace, nastavení, správy balíčků, oprávnění, práce se soubory a sítě v PowerShellu.

---

## 📦 Správa balíčků

<details>
<summary><span style="color:#1E90FF;">📁 Umístění modulů</span></summary>

- Windows:  
  `C:\Users\{xxx}\Documents\PowerShell\Modules`

</details>

---

## 🎨 Změna designu PowerShellu

<details>
<summary><span style="color:#1E90FF;">🖌️ Modernizace vzhledu</span></summary>

- **Původní vzhled:**  
  <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*lelcpOyX-WuXlYR5oy2g4Q.png" alt="oldPowerShell.png" width="500px"/>

- **Nový vzhled:**  
  <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*SI0w1Cg7iVzG6mZMtBfWqQ.png" alt="newPowerShell.png" width="500px"/>

<details>
<summary><span style="color:#E95A84;">🛠️ Postup modernizace</span></summary>

1. **Instalace PowerShell 7+**
    - Zjistěte verzi:
      ```bash
      $PSVersionTable
      ```
    - [Stáhnout PowerShell](https://github.com/PowerShell/PowerShell)

2. **Instalace Windows Terminal**
    - [Stáhnout Windows Terminal](https://github.com/microsoft/terminal)

3. **Spusťte PowerShell jako administrátor**  
   <img src="/../../images/runAsAdministatorPowerShell.png" alt="runAsAdministatorPowerShell.png" width="500px"/>

4. **Nastavte oprávnění na Bypass**
   ```bash
   Set-ExecutionPolicy -Scope CurrentUser Bypass
   ```

5. **Rozdělte okno na části**
    - Klávesová zkratka: `Alt` + `Left Click`
      <img src="/../../images/optionsPowerShell.png" alt="optionsPowerShell.png" width="500px"/>

6. **Instalace modulů**
   ```bash
   Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
   Install-Module posh-git
   ```

7. **Změna vzhledu příkazové řádky**
   ```bash
   oh-my-posh init pwsh --config 'C:\Users\{xxx}\Themes\PowerShell\aliens.omp.json' | Invoke-Expression
   ```

8. **Import modulu**
   ```bash
   Import-Module posh-git
   ```

9. **Nastavení trvalého vzhledu**
    - Zjistěte cestu k profilu:
      ```bash
      $PROFILE
      ```
    - Otevřete nebo vytvořte soubor:
      ```bash
      notepad $PROFILE
      ```
    - Vložte:
      ```bash
      Import-Module posh-git
      oh-my-posh init pwsh --config 'C:\Users\{xxx}\themes\aliens.omp.json' | Invoke-Expression
      ```

10. **Nastavte oprávnění na RemoteSigned**
    ```bash
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    ```

11. **Vypněte administrátorský režim**  
    <img src="/../../images/runAsAdministatorPowerShell.png" alt="runAsAdministatorPowerShell.png" width="500px"/>

</details>
</details>

---

## 🎭 Nastavení vzhledů (themes)

<details>
<summary><span style="color:#E95A84;">🎨 Výběr a změna vzhledu</span></summary>

- Navigujte do složky s tématy:  
  `C:\Users\{xxx}\themes\`
- Zobrazte dostupné vzhledy:
  ```bash
  Get-PoshThemes
  ```
- Změna vzhledu v profilu:
  ```bash
  Import-Module posh-git
  oh-my-posh init pwsh --config 'C:\Users\{xxx}\Documents\themes\catppuccin.omp.json' | Invoke-Expression
  ```
- [Šablony ke stažení](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes)

</details>

---

## 🕑 Historie příkazů

<details>
<summary><span style="color:#1E90FF;">📜 Umístění historie</span></summary>

```bash
(Get-PSReadlineOption).HistorySavePath
```

</details>

---

## 🔐 Oprávnění

<details>
<summary><span style="color:#1E90FF;">🔎 Zjištění oprávnění</span></summary>

```bash
Get-ExecutionPolicy -Scope CurrentUser
```

- `Restricted` – Skripty nejsou povoleny
- `AllSigned` – Pouze podepsané skripty
- `RemoteSigned` – Skripty z internetu musí být podepsané
- `Unrestricted` – Všechny skripty povoleny
- `Undefined` – Výchozí nastavení podle typu systému

</details>

<details>
<summary><span style="color:#1E90FF;">⚙️ Nastavení oprávnění</span></summary>

```bash
Set-ExecutionPolicy -Scope CurrentUser Bypass
```

- `AllSigned`, `Bypass`, `Default`, `RemoteSigned`, `Restricted`, `Undefined`, `Unrestricted`

[Více info](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.4#-executionpolicy)

</details>

<details>
<summary><span style="color:#1E90FF;">🚀 Spuštění skriptu bez změny oprávnění</span></summary>

```bash
powershell -ExecutionPolicy Bypass -File "C:\{xxx}\Downloads\WSL-Offline-Install.ps1"
```

</details>

---

## 📁 Práce se soubory

<details>
<summary><span style="color:#1E90FF;">🕒 Změna metadat souboru</span></summary>

- Změna času posledního zápisu:
  ```bash
  (Get-Item "C:\Users\{xxx}\FileA.docx").LastWriteTime = "2024.10.10 17:00:00"
  ```
- Úprava celkového času v dokumentu Word:
    1. Přejmenujte `.docx` na `.zip`
    2. Rozbalte soubor
    3. V souboru `docProps/app.xml` upravte `<TotalTime>`
    4. Zazipujte zpět a změňte příponu na `.docx`

</details>

<details>
<summary><span style="color:#1E90FF;">📋 Kopírování souborů</span></summary>

- Kopírování ze zdroje:
  ```bash
  xcopy /y /z "\\192.xxx.xx.xx\files\module.xml" "C:\Users\Test\Downloads\*"
  ```
- Kopírování do podsložek:
  ```bash
  for /D %%G in ("C:\Users\Test\Downloads\*") DO (xcopy /y /z  "C:\Users\Test\Downloads\module.xml" "%%G\SubDirectory\*")
  ```
- Přidejte `pause` pro zobrazení výsledků.

</details>

---

## 🌐 Síť

<details>
<summary><span style="color:#1E90FF;">🔍 Získání názvu hostitele</span></summary>

```bash
Resolve-DnsName -Name <IP adresa> -Type PTR
```

</details>

<details>
<summary><span style="color:#1E90FF;">🌐 Získání síťových adaptérů</span></summary>

- Všechny:
  ```bash
  Get-NetAdapter -physical
  ```
- Aktivní:
  ```bash
  Get-NetAdapter -physical | where status -eq 'up'
  ```

</details>