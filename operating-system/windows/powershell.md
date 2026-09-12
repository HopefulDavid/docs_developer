# PowerShell: prostředí, soubory a diagnostika

PowerShell je shell a skriptovací jazyk, jehož příkazy mohou předávat objekty s vlastnostmi místo pouhého textu.

Hodí se pro automatizaci Windows i opakovatelné vývojářské úlohy.

## Před použitím

Windows PowerShell 5.1 (`powershell.exe`) a PowerShell 7 (`pwsh.exe`) jsou odlišná prostředí a mohou mít jiné profily i moduly.

Ukázky jsou určené pro PowerShell 7 ve Windows; síťové příkazy vyžadují příslušné moduly Windows.

```powershell
# Verze shellu, aktualni slozka a napoveda konkretniho prikazu.
$PSVersionTable.PSVersion
Get-Location
Get-Help Copy-Item -Examples
```

Příkazy spouštěj v uvedeném prostředí; [CMD](cmd.md) smyčku `for /D` nelze vložit do PowerShellu.

## Jak funguje roura

```powershell
# Get-ChildItem vraci objekty souboru; Where-Object vybira podle vlastnosti Length.
Get-ChildItem -LiteralPath . -File |
    Where-Object Length -gt 1MB |
    Select-Object Name, Length
```

Tečka označuje aktuální složku, `-File` vynechá adresáře a `1MB` je hranice velikosti, kterou můžeš upravit.

## Správa modulů

Modul přidává další příkazy a jeho umístění závisí na verzi PowerShellu i rozsahu instalace.

```powershell
# Vyhledavaci cesty a skutecne dostupne verze modulu na tomto pocitaci.
$env:PSModulePath -split [IO.Path]::PathSeparator
Get-Module -ListAvailable | Select-Object Name, Version, Path
```

Instalace pro aktuálního uživatele obvykle nevyžaduje správce, ale před instalací ověř zdroj a vydavatele balíčku.

## Přizpůsobení prostředí: Oh My Posh

Oh My Posh mění prompt, například zobrazuje větev Gitu; nevylepšuje oprávnění ani nemění syntaxi shellu.

Následující instalace používá Windows Package Manager a vyžaduje dostupný `winget`.

```powershell
# Presne ID vybira konkretni balicek; po instalaci otevri novy terminal.
winget install --id JanDeDobbeleer.OhMyPosh --exact
```

V novém terminálu ověř program a zkus dodané téma.

```powershell
oh-my-posh version
# Promenna ukazuje na temata instalace, nenastavuj natvrdo cestu jineho uzivatele.
Get-ChildItem -LiteralPath $env:POSH_THEMES_PATH -Filter '*.omp.json'
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression
```

Zde `Invoke-Expression` provádí inicializační kód lokálně nainstalovaného nástroje, nikoli libovolný vzdálený skript.

Pokud cesta k tématům není nastavena, ověř instalaci podle [oficiálního postupu pro Windows](https://ohmyposh.dev/docs/installation/windows).

Pro trvalé použití nejprve vytvoř profil, pokud chybí, a otevři jej bez přepsání existujícího obsahu.

```powershell
if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
notepad $PROFILE
```

Na konec profilu přidej stejný příkaz `oh-my-posh init pwsh ... | Invoke-Expression`, který už fungoval v aktuálním okně.

Chybějící symboly řeš výběrem podporovaného Nerd Font v nastavení terminálu; přepínání témat samotné font nenainstaluje.

## Execution Policy

Execution Policy řídí pravidla spouštění skriptů, není bezpečnostní hranicí ani oprávněním k souborům.

Nejprve zjisti efektivní hodnotu a všechna nastavení, protože firemní zásady mají přednost.

```powershell
Get-ExecutionPolicy
Get-ExecutionPolicy -List
```

Pokud spravuješ vlastní prostředí a potřebuješ spouštět své lokální skripty, lze nastavit uživatelský rozsah.

```powershell
# RemoteSigned vyzaduje podpis pro skripty oznacene jako stazene z internetu.
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Před změnou si poznamenej předchozí hodnotu pro případ obnovení; plošné `Bypass` není potřebným krokem instalace promptu.

Význam jednotlivých hodnot a prioritu rozsahů vysvětluje [Microsoft: Execution Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies).

## Práce se soubory

`-LiteralPath` interpretuje cestu doslova, takže hranaté závorky v názvu nejsou hledací vzor.

```powershell
# Zdroj musi existovat; cestu uprav podle vlastniho projektu.
$source = Join-Path (Get-Location) 'module.xml'
$destination = Join-Path (Get-Location) 'export'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $destination -WhatIf
```

`-WhatIf` zobrazí plán a nekopíruje; po kontrole spusť poslední řádek bez tohoto přepínače.

Existující stejnojmenný soubor v cíli může být přepsán, proto pro nový export používej samostatnou složku.

Kontrolu před mazáním vlastní návod [nelze odstranit soubor nebo složku](cannot-delete-item.md#powershell-kontrola-a-odstranění).

### Časy a metadata

```powershell
# Zobrazeni casu souboru nic nemeni.
Get-Item -LiteralPath './module.xml' | Select-Object Name, CreationTime, LastWriteTime
```

Změna `LastWriteTime` mění metadata souborového systému, nikoli údaje uvnitř Word dokumentu ani skutečnou historii práce.

Úpravu obsahu `.docx` řeš nástrojem, který zachová strukturu dokumentu, ne ručním přejmenováním a přebalením archivu.

## Historie a síť

```powershell
# Soubor dlouhodobe historie modulu PSReadLine muze obsahovat citlive prikazy.
(Get-PSReadLineOption).HistorySavePath
# Fyzicke aktivni adaptery Windows; virtualni VPN adaptery zde nejsou.
Get-NetAdapter -Physical | Where-Object Status -eq 'Up'
# example.com nahrad serverem, ktery potrebujes diagnostikovat.
Resolve-DnsName -Name 'example.com'
Test-NetConnection -ComputerName 'example.com' -Port 443
```

Do příkazové historie nevkládej hesla ani tokeny a její obsah nesdílej bez kontroly.

## Související témata

Instalaci SSH vlastní [SSH ve Windows](../../network/ssh/windows.md), vypnutí telemetrie SDK [návod .NET CLI](../../programming/packages/dotnet-cli.md#vypnutí-telemetrie-net-sdk).
