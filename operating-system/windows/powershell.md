---
description: "Objekty v rouře, soubory, proměnné, skripty a čitelné zacházení s chybami."
---

# PowerShell – každodenní práce

PowerShell předává mezi příkazy objekty s vlastnostmi, takže můžeš filtrovat soubory či procesy podle skutečných údajů.

Windows PowerShell 5.1 a PowerShell 7 jsou různá prostředí.

Následující příklady míří na PowerShell 7 ve Windows.

## Orientace a nápověda

```powershell
$PSVersionTable.PSVersion
Get-Location
Get-Help Copy-Item -Examples
```

Zjistíš verzi shellu, aktuální složku a příklady konkrétního příkazu.

| Syntaxe | Účel |
|---|---|
| `Set-Location -LiteralPath <složka>` | Přejde do existující složky |
| `Get-ChildItem -LiteralPath <cesta> [-Force]` | Vypíše položky, případně i skryté |
| `Get-Content -LiteralPath <soubor>` | Přečte text |
| `Copy-Item -LiteralPath <zdroj> -Destination <cíl> [-WhatIf]` | Zkopíruje nebo pouze předvede operaci |
| `Get-Command <název>` | Zjistí dostupný příkaz a jeho původ |

`-LiteralPath` zachová doslovný název včetně hranatých závorek.

`-Path` u mnoha příkazů naopak podporuje zástupné vzory.

## Roura: vyber soubory větší než 1 MB

```powershell
Get-ChildItem -LiteralPath . -File |
    Where-Object Length -gt 1MB |
    Select-Object Name, Length
```

Tečka znamená aktuální složku, první příkaz vrací soubory, filtr porovnává jejich vlastnost `Length` a poslední příkaz vybírá sloupce.

`1MB` můžeš změnit podle potřeb.

Tato ukázka nic neupravuje.

## Proměnné a spuštění programu

```powershell
$projectPath = "C:\projekty\moje-aplikace"
Set-Location -LiteralPath $projectPath
& "C:\Program Files\nodejs\node.exe" --version
```

Obě cesty přizpůsob své instalaci.

`&` spustí program, jehož cesta je v uvozovkách.

Vnější programy jako Git nebo Node předávají návratový kód v `$LASTEXITCODE`, zatímco PowerShell cmdlety používají také vlastní chybové záznamy.

Proměnná prostředí používá zápis `$env:NÁZEV` a změna platí jen pro současný proces a jeho potomky, pokud ji výslovně neuložíš trvale.

## Kopie souboru s kontrolou

V projektové složce s existujícím `module.xml`:

```powershell
$sourceFile = Join-Path (Get-Location) "module.xml"
$exportDirectory = Join-Path (Get-Location) "export"
New-Item -ItemType Directory -Path $exportDirectory -Force | Out-Null
Copy-Item -LiteralPath $sourceFile -Destination $exportDirectory -WhatIf
```

`Join-Path` bezpečně sestaví cestu a `-WhatIf` zobrazí plán bez kopírování.

Po ověření cíle zopakuj poslední řádek bez `-WhatIf`.

Již existující stejnojmenný soubor může být přepsán.

Pro mazání použij samostatný [postup s ověřením cíle](cannot-delete-item.md?tabs=remove-powershell#powershell-kontrola-a-odstranění).

## Skript a chyba

Ulož jako `kontrola-souboru.ps1`:

```powershell
param(
    [Parameter(Mandatory)]
    [string]$FilePath
)

try {
    # Stop prevede i beznou chybu cmdletu na chybu zachycenou v catch.
    Get-Item -LiteralPath $FilePath -ErrorAction Stop |
        Select-Object FullName, Length, LastWriteTime
} catch {
    Write-Error "Soubor nelze přečíst: $($_.Exception.Message)"
    exit 1
}
```

Spusť `.\kontrola-souboru.ps1 -FilePath .\module.xml`.

Parametr vybírá soubor a při chybě skript končí nenulovým kódem.

Pokud spouštění blokuje politika, ověř [Execution Policy](terminal.md#execution-policy), nikoli náhodné vypínání kontrol.

## Další běžné úlohy

- [Profil, moduly a Oh My Posh](terminal.md).
- [DNS, porty a síťová diagnostika](../../network/basics.md).
- [SSH klient ve Windows](../../network/ssh/windows.md).
- [Telemetrie a nástroje .NET](../../programming/packages/dotnet-cli.md).

`(Get-PSReadLineOption).HistorySavePath` ukáže soubor dlouhodobé historie příkazů.

Může obsahovat citlivé argumenty a `Clear-History` tuto uloženou historii sám nevymaže.

Zdroje: [PowerShell pipeline](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines), [Copy-Item](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item), [chyby](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_try_catch_finally).
