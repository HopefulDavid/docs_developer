---
description: "Profily PowerShellu, moduly a bezpečné nastavení Execution Policy."
---

# PowerShell – nastavení prostředí

Profil je skript spouštěný při otevření konkrétního prostředí PowerShellu.

Moduly přidávají příkazy a profil umožňuje připravit vlastní prostředí při spuštění shellu.

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

Zdroje: [profily](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles), [Execution Policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies).
