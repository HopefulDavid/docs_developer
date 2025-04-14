# PowerShell

<details>
<summary><span style="color:#1E90FF;">Balíčky</span></summary>

Umístění

- Windows: `C:\Users\{xxx}\Documents\PowerShell\Modules`

</details>

<details>
<summary><span style="color:#1E90FF;">Změna designu</span></summary>

Původní:

<img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*lelcpOyX-WuXlYR5oy2g4Q.png" alt="oldPowerShell.png"/>

Nový:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*SI0w1Cg7iVzG6mZMtBfWqQ.png" alt="newPowerShell.png"/>

<details>
<summary><span style="color:#E95A84;">Postup</span></summary>

> [!TIP]
> Nainstalujte si verzi `PowerShell` 7.0 a vyšší.
>
> Zjištění verze:
>
> ```bash 
> $PSVersionTable
> ```
>
> Ke stažení <a href="https://github.com/PowerShell/PowerShell">zde</a>.

> [!IMPORTANT]
> Musíte mít nainstalovaný `windows terminal`.
>
> Ke stažení <a href="https://github.com/microsoft/terminal">zde</a>.

<ol>
<li>

Spustit PowerShell v administrátorském modu.
<br/>
<img src="/../../images/runAsAdministatorPowerShell.png" alt="runAsAdministatorPowerShell.png" width="800px"/>

</li>
<li>

Otevřít novou záložku.

To nás vyzve do administrátorského režimu -> `Yes`.
</li>
<li>

Zjistíme si aktuální oprávnění na uživateli.

```bash
Get-ExecutionPolicy -Scope CurrentUser
```

</li>
<li>

Nastavit oprávnění na `Bypass`.

```bash
Set-ExecutionPolicy -Scope CurrentUser Bypass
```

> [!TIP]
> Oprávnění `Bypass` znamená, že PowerShell spustí jakýkoliv skript bez jakýchkoliv omezení.
</li>
<li>

Ověřit, že nastavení proběhlo v pořádku.

```bash
Get-ExecutionPolicy -Scope CurrentUser
```

> [!NOTE]
> Pokud znovu provedeme příkaz `Get-ExecutionPolicy -Scope CurrentUser`, mělo by nám to vrátit `Bypass`.
</li>
<li>Nyní rozdělíme okno na části. 

Toho docílíme skrze klávesovou zkratku `Alt` + `Left Click`.

<img src="/../../images/optionsPowerShell.png" alt="optionsPowerShell.png" width="800px"/>
</li>
<li>V každém oknu spustíme jednotlivé PowerShell příkazy.

```bash
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
```

```bash
Install-Module posh-git
```

> [!NOTE]
> Potvrdíme instalovat všechno skrze `a`.

> [!TIP]
> Pokud chcete přepsat již nainstalované moduly, použijte parametr: `-AllowClobber`
</li>
<li> 

Nyní máme nainstalované moduly `posh-git` a aplikaci `oh-my-posh`.
</li>
<li> 

Změníme vzhled příkazové řádky.

> [!WARNING]
> Cesta nesmí obsahovat mezery, háčky, ani speciální znaky!

```bash
oh-my-posh init pwsh --config 'C:\Users\{xxx}\Themes\PowerShell\aliens.omp.json' | Invoke-Expression
```

> [!WARNING]
> Změní se projeví pouze pro aktivní okno.

> [!NOTE]
> V dalších krocích si nastavíme změnu vzhledu do konfiguračního souboru, aby po každém spuštění PowerShellu se vzhled
> změnil.

> [!TIP]
> Cesta k souboru se <a href="https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes">šablonami stylů (
> themes)</a>: `C:\Users\{xxx}\themes\aliens.omp.json`
>
> `aliens.omp.json` = název šablony v tomto příkladu.

> [!TIP]
> Pokud nezafunguje změna stylu konzolové řádky pro `oh-my-posh`
>
> Zkuste se podívat do `Environment Variables` a přidat cestu: `C:\Users\user\AppData\Local\Programs\oh-my-posh\bin`.
</li>
<li>

Modul si naimportujeme.

```bash
Import-Module posh-git
```

> [!WARNING]
> Změní se projeví pouze pro aktivní okno.

> [!NOTE]
> V dalších krocích si nastavíme změnu vzhledu do konfiguračního souboru, aby po každém spuštění PowerShellu se vzhled
> změnil.
</li>
<li>

Nyní zjistíme soubor s nastavením pro PowerShell.

```bash
$PROFILE
```

Vrátí se cesta k souboru s nastavením.

Toto nastavení se poté již spouští při každém spuštění PowerShell a tedy do jakéhokoli okna.
</li>
<li>

Nastavíme si soubor s nastavením pro PowerShell.

- Pokud **soubor existuje**, tak otevřeme v textovém editoru.

- Pokud **soubor neexistuje**, tak jej vytvoříme.

    ```bash
    notepad $PROFILE
    ```

  Potvrdíme, že chceme vytvořit nový soubor -> `Yes`.

</li>
<li>

Do souboru s nastavením vložíme následující kód.

```bash
Import-Module posh-git # Zobrazí aktuální větev a stav

oh-my-posh init pwsh --config 'C:\Users\{xxx}\themes\aliens.omp.json' | Invoke-Expression # Změní vzhled příkazové řádky 
```

</li>
<li> 

Uložíme a zavřeme soubor.
</li>
<li> 

Nastavíme oprávnění na spouštění pouze vlastních skriptů.

```bash
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

> [!TIP]
> Nastavit oprávnění na `RemoteSigned`, aby se neoprávněné osoby nemohly pokoušet spouštět virové skripty na Vašem
> zařízení.

</li>
<li> 

Vypneme spuštění v administrátorském režimu.

<img src="/../../images/runAsAdministatorPowerShell.png" alt="runAsAdministatorPowerShell.png" width="800px"/>
</li>
</ol>

Pokud nyní otevřeme PowerShell, nebo nové okno v již stávajícím, tak by vše mělo fungovat.

</details>

<details>
<summary><span style="color:#E95A84;">Nastavit theme</span></summary>

Navigovat do složky s vzhledy (themes).

Například:

`C:\Users\{xxx}\themes\`

Nyní stačí spustit příkaz níže a zobrazí se nám všechny dostupné vzhledy.

```bash
Get-PoshThemes
```

> [!TIP]
> Tyto vzhledy pak lze snadno změnit v konfiguračním souboru PowerShellu.
>
>```bash
>$PROFILE # Zobrazí cestu k souboru s nastavením 
>```
>
> Například změníme vzhled na `catppuccino`.:
>
>```bash
> Import-Module posh-git # Zobrazí aktuální větev a stav
>
> oh-my-posh init pwsh --config 'C:\Users\{xxx}\Documents\themes\catppuccin.omp.json' | Invoke-Expression # Změní vzhled příkazové řádky 
>```
>
> Šablony je možné stáhnout <a href="https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes">zde</a>.

<a href="https://levelup.gitconnected.com/windows-terminal-making-powershell-better-561f2cab27f3">Zdroj</a>.
</details>

</details>

## Historie

<details>
<summary><span style="color:#1E90FF;">Umístění historie</span></summary>

```Bash
(Get-PSReadlineOption).HistorySavePath
```

</details>

## Oprávnění

<details>
<summary><span style="color:#1E90FF;">Zjistit oprávnění</span></summary>

```Bash
Get-ExecutionPolicy -Scope CurrentUser
```

> Zjistí jaké je nastavení pro spouštění skriptů aktuálního uživatele.
>
>- `Restricted` = Omezené
   >
   >   Skripty nejsou povoleny.
>
>- `AllSigned`
   >
   >   Podepsané skripty mohou být spuštěny pouze pokud jsou podepsány důvěryhodným vydavatelem.
>
>- `RemoteSigned`
   >
   >   Podepsané skripty mohou být spuštěny, ale skripty stažené z internetu musí být podepsány.
>
>- `Unrestricted`
   >
   >   Všechny skripty mohou být spuštěny.
>
>- `Undefined`
   >
   >   Není nastaveno žádné omezení.
   >
   >   V takovém případě se pro Windows klienta použije `Restricted` a pro Windows server `RemoteSigned`.

</details>

<details>
<summary><span style="color:#1E90FF;">Nastavit oprávnění</span></summary>

Nastavení oprávnění pro spouštění skriptů v PowerShellu se provádí pomocí příkazu `Set-ExecutionPolicy`.

Příklad:

```Bash
Set-ExecutionPolicy -Scope CurrentUser Bypass
```

> [!TIP]
> Odeberete předchozí oprávnění a nastavíte nové.

- AllSigned

  Vyžaduje, aby všechny skripty a konfigurační soubory byly podepsány důvěryhodným vydavatelem, včetně skriptů napsaných
  v místním počítači.

- Bypass

  Žádné omezení, všechny skripty mohou být spuštěny.

- Default

  Nastaví výchozí zásady provádění.

  > [!NOTE]
  > Klienti windows: `Restricted`
  >
  > Servery windows: `RemoteSigned`

- RemoteSigned

  Vyžaduje, aby všechny skripty a konfigurační soubory stažené z Internetu byly podepsány důvěryhodným vydavatelem.

  > [!NOTE]
  > Výchozí zásada spouštění pro počítače se serverem Windows.

- Restricted

  Nenačítá konfigurační soubory ani nespouští skripty.

  > [!NOTE]
  > Výchozí zásady spouštění pro klientské počítače se systémem Windows.

- Undefined

  Není nastaveno žádné omezení.

  > [!WARNING]
  > V tomto případě je oprávnění jako pro `Restricted`.

- Unrestricted

  Načte všechny konfigurační soubory a spustí všechny skripty.

  > [!WARNING]
  > Pokud spustíte nepodepsaný skript, který byl stažen z internetu, budete před jeho spuštěním vyzváni k získání
  povolení.
  >
  > Počínaje verzí `PowerShell 6.0` se jedná o výchozí zásadu spouštění pro počítače s jiným systémem než Windows,
  kterou nelze změnit.

Více
info <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.4#-executionpolicy">
zde</a>.

</details>

<details>
<summary><span style="color:#1E90FF;">Spustit skript bez změny oprávnění</span></summary>

```bash
powershell -ExecutionPolicy Bypass -File "C:\{xxx}\Downloads\WSL-Offline-Install.ps1"
```

</details>

## Práce se soubory

<details>
<summary><span style="color:#1E90FF;">Změna metadat</span></summary>

- Změna času posledního zápisu do souboru

    ```bash
    (Get-Item "C:\Users\{xxx}\FileA.docx").LastWriteTime = "2024.10.10 17:00:00"
    ```

> [!TIP]
> Pokud chcete změnit i celkový čas v dokumentu Word, postup je následovný:
>
> Přejmenujte **.docx** soubor na **.zip**.
>
> Rozbalte soubor.
>
> V souboru **docProps/app.xml** najděte řádek obsahující `<TotalTime>` a upravte hodnotu v minutách.
>
> Zazipujte soubory zpět a změňte příponu zpět na **.docx**.

</details>

<details>
<summary><span style="color:#1E90FF;">Kopírování</span></summary>

- Ze zdroje na cílové umístění

    ```bash
    xcopy /y /z "\\192.xxx.xx.xx\files\module.xml" "C:\Users\Test\Downloads\*"`
    ```

- Do podsložek

    ```bash
    for /D %%G in ("C:\Users\Test\Downloads\*") 
    DO (xcopy /y /z  "C:\Users\Test\Downloads\module.xml" "%%G\SubDirectory\*")
    ```

  > `for /D`
  >
  > Prochází podsložky
  >
  > `%%G`
  >
  > Proměnná pro každou podsložku

> [!TIP]
> Nakonec přidejte příkaz `pause` pro zobrazení výsledků.

</details>

## Síť

<details>
<summary><span style="color:#1E90FF;">Získat název hostitele (webové adresy)</span></summary>

```Bash
Resolve-DnsName -Name <IP adresa> -Type PTR
```

</details>

<details>
<summary><span style="color:#1E90FF;">Získat síťové adaptéry (interfaces)</span></summary>

- Všechny

  ```Bash
  Get-NetAdapter -physical
  ```

- Aktuálně aktivní

  ```Bash
  Get-NetAdapter -physical | where status -eq 'up'
  ```

</details>