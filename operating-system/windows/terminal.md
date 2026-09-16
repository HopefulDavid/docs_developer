---
description: "Profily PowerShellu, moduly, Execution Policy a nastavení promptu Oh My Posh."
---

# PowerShell – nastavení prostředí

Profil je skript spouštěný při otevření konkrétního prostředí PowerShellu.

Moduly přidávají příkazy a prompt upravuje vzhled vstupního řádku.

Každou změnu nejprve vyzkoušej v aktuálním okně a teprve funkční nastavení ukládej do profilu.

## Profil bez přepsání existujícího nastavení

V PowerShellu:

```powershell
$PROFILE
if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
notepad $PROFILE
```

První řádek ukáže profil aktuálního hostitele a verze PowerShellu.

Podmínka vytvoří soubor pouze tehdy, když chybí.

Do již existujícího profilu přidávej řádky, nepřepisuj ho cizí kompletní konfigurací.

Nové okno ověří načtení profilu.

`pwsh -NoProfile` pomůže otevřít PowerShell 7 bez vadného profilu.

## Moduly

```powershell
$env:PSModulePath -split [IO.Path]::PathSeparator
Get-Module -ListAvailable | Select-Object Name, Version, Path
```

První příkaz vypíše prohledávané adresáře a druhý dostupné moduly včetně verzí.

Modul nainstalovaný pro Windows PowerShell 5.1 nemusí být kompatibilní s PowerShellem 7.

Před instalací ověř vydavatele a požadované prostředí.

## Execution Policy

Politika určuje pravidla spouštění skriptů.

Není náhradou zabezpečení ani oprávněním k souborům.

```powershell
Get-ExecutionPolicy
Get-ExecutionPolicy -List
```

Nejprve prohlédni efektivní hodnotu a zdroj nastavení.

Na vlastním nespravovaném zařízení můžeš pro své lokální skripty použít:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

`CurrentUser` omezuje změnu na účet a `RemoteSigned` vyžaduje podpis skriptů označených jako stažené z internetu.

Poznamenej si původní hodnotu pro návrat.

Firemní Group Policy může mít přednost.

Pokud jsi důvěryhodný stažený skript skutečně zkontroloval, `Unblock-File -LiteralPath <skript.ps1>` odebere jeho internetové označení bez plošného přepínání na Bypass.

## Oh My Posh

Oh My Posh může zobrazit například Git větev a stav projektu v promptu.

Nemění syntaxi ani oprávnění shellu.

S dostupným Windows Package Managerem:

```powershell
winget install --id JanDeDobbeleer.OhMyPosh --exact
```

Přesné ID vybírá balíček nástroje.

Po instalaci otevři nový terminál.

```powershell
oh-my-posh version
Get-ChildItem -LiteralPath $env:POSH_THEMES_PATH -Filter "*.omp.json"
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression
```

Ověříš program, dostupná témata a vyzkoušíš jedno z nich.

Pokud proměnná témat není dostupná, nejprve ověř instalaci a použij existující místní konfigurační soubor.

`Invoke-Expression` zde vykonává inicializační kód lokálně nainstalovaného nástroje.

Stejný funkční inicializační řádek přidej do profilu.

Pro návrat ho zase odstraň nebo zakomentuj a otevři nové okno.

Chybějící ikony řeší odpovídající Nerd Font vybraný v nastavení terminálu, nikoli opakovaná změna Execution Policy.

Zdroje: [profily](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles), [Execution Policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies), [Oh My Posh pro Windows](https://ohmyposh.dev/docs/installation/windows).
