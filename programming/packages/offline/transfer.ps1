#requires -Version 6.0
<#
.SYNOPSIS
Připraví zálohu balíčků, ověří archiv, obnoví balíčky bez internetu nebo uklidí archiv.
.DESCRIPTION
Spouštějte v PowerShellu 6.0+. Chybějící parametry skript vyžádá interaktivně.
Záloha obsahuje instalační data, nikoli zdrojový projekt nebo instalaci SDK.
Úklid odstraní celý archiv až po kontrole a výslovném potvrzení SMAZAT.
#>
[CmdletBinding()]
param(
    [ValidateSet('Zaloha', 'Obnova', 'Overeni', 'Uklid')][string]$Akce,
    [ValidateSet('npm', 'pnpm', 'pip', 'nuget', 'dotnet-tools', 'dart')][string]$Spravce,
    [ValidateSet('Globalni', 'Lokalni', 'Vlastni')][string]$Rozsah,
    [string]$Archiv,
    [string]$Projekt,
    [string]$Umisteni,
    [string]$ZdrojBalicku,
    [string]$ObnoveneUloziste,
    [string]$Python,
    [ValidateSet('dart', 'flutter')][string]$DartPrikaz = 'dart'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Vyber-Hodnotu([string]$Hodnota, [string]$Popis) {
    if (-not $Hodnota) { $Hodnota = Read-Host $Popis }
    if (-not $Hodnota) { throw "Chybí údaj: $Popis" }
    return $Hodnota
}

function Spust([string]$Program, [string[]]$Argumenty) {
    & $Program @Argumenty
    if ($LASTEXITCODE -ne 0) { throw "$Program skončil kódem $LASTEXITCODE (argumenty: $($Argumenty -join ' '))." }
}

function Vystup([string]$Program, [string[]]$Argumenty) {
    $hodnota = & $Program @Argumenty | Out-String
    if ($LASTEXITCODE -ne 0) { throw "$Program skončil kódem $LASTEXITCODE." }
    return $hodnota.Trim()
}

function Prazdna-Slozka([string]$Cesta) {
    if (Test-Path -LiteralPath $Cesta) {
        if (@(Get-ChildItem -LiteralPath $Cesta -Force).Count -gt 0) { throw "Cílová složka není prázdná: $Cesta" }
    } else { New-Item -ItemType Directory -Path $Cesta -Force | Out-Null }
}

function Kopie-Projektoveho-Souboru([string]$Koreni, [string]$Relativni, [string]$Archiv) {
    $zdroj = Join-Path $Koreni $Relativni
    if (-not (Test-Path -LiteralPath $zdroj -PathType Leaf)) { throw "Chybí $zdroj" }
    $cil = Join-Path (Join-Path $Archiv 'projekt') $Relativni
    New-Item -ItemType Directory -Path (Split-Path $cil) -Force | Out-Null
    Copy-Item -LiteralPath $zdroj -Destination $cil
}

function Over-Projekt([string]$Archiv, [string]$Koreni) {
    $predlohy = Get-ChildItem -LiteralPath (Join-Path $Archiv 'projekt') -File -Recurse
    foreach ($soubor in $predlohy) {
        $rel = [IO.Path]::GetRelativePath((Join-Path $Archiv 'projekt'), $soubor.FullName)
        $cil = Join-Path $Koreni $rel
        if (-not (Test-Path -LiteralPath $cil -PathType Leaf)) { throw "V cílovém projektu chybí $rel" }
        if ((Get-FileHash -LiteralPath $cil -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $soubor.FullName -Algorithm SHA256).Hash) {
            throw "Cílový projekt má jiné závislosti nebo konfiguraci: $rel"
        }
    }
}

function Kontrola-Vstupu([string]$Archiv, [string]$Projekt) {
    if ($Projekt) {
        $koren = ([IO.Path]::GetFullPath($Projekt)).TrimEnd('\', '/')
        $cesta = [IO.Path]::GetFullPath($Archiv)
        if ($cesta.Equals($koren, [StringComparison]::OrdinalIgnoreCase) -or
            $cesta.StartsWith($koren + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
            throw 'Archiv musí ležet mimo projekt nebo vlastní umístění.'
        }
    }
}

function Pridej-Hash([string]$Archiv, [hashtable]$Popis) {
    $hash = @{}
    foreach ($soubor in Get-ChildItem -LiteralPath $Archiv -File -Recurse -Force) {
        $rel = [IO.Path]::GetRelativePath($Archiv, $soubor.FullName).Replace('\', '/')
        if ($rel -eq 'archiv.json') { continue }
        $hash[$rel] = (Get-FileHash -LiteralPath $soubor.FullName -Algorithm SHA256).Hash
    }
    $Popis.soubory = $hash
    $Popis | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $Archiv 'archiv.json') -Encoding utf8NoBOM
}

function Over-Hash([string]$Archiv, [hashtable]$Popis) {
    $koren = Get-Item -LiteralPath $Archiv
    if ($koren.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Archiv nesmí být symbolický odkaz ani připojená složka.' }
    $obsah = @(Get-ChildItem -LiteralPath $Archiv -Recurse -Force)
    if (@($obsah | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count -gt 0) {
        throw 'Archiv obsahuje symbolický odkaz nebo připojenou složku.'
    }
    foreach ($zaznam in $Popis.soubory.GetEnumerator()) {
        $rel = [string]$zaznam.Key
        if ($rel.StartsWith('/') -or $rel.Contains('\') -or $rel.Contains(':') -or $rel -match '(^|/)\.\.?(/|$)') {
            throw "Neplatná cesta v archivu: $rel"
        }
        $cesta = Join-Path $Archiv $rel
        if (-not (Test-Path -LiteralPath $cesta -PathType Leaf)) { throw "V archivu chybí $rel" }
        if ((Get-FileHash -LiteralPath $cesta -Algorithm SHA256).Hash -ne $zaznam.Value) { throw "Poškozený soubor archivu: $rel" }
    }
    $nalezeno = @($obsah | Where-Object {
        -not $_.PSIsContainer -and [IO.Path]::GetRelativePath($Archiv, $_.FullName).Replace('\', '/') -ne 'archiv.json'
    }).Count
    if ($nalezeno -ne $Popis.soubory.Count) { throw 'Archiv obsahuje neočekávané soubory.' }
}

function Otevri-Archiv([string]$Archiv) {
    $soubor = Join-Path $Archiv 'archiv.json'
    if (-not (Test-Path -LiteralPath $soubor -PathType Leaf)) { throw "V $Archiv chybí archiv.json. Žádné soubory nebyly změněny." }
    $popis = Get-Content -LiteralPath $soubor -Raw | ConvertFrom-Json -AsHashtable
    if ($popis.format -ne 1 -or $popis.spravce -notin @('npm','pnpm','pip','nuget','dotnet-tools','dart') -or
        $popis.rozsah -notin @('Globalni','Lokalni','Vlastni') -or -not $popis.soubory -or
        -not $popis.soubory.ContainsKey('transfer.ps1')) {
        throw 'Archiv nemá podporovaný formát ani úplný seznam souborů.'
    }
    Over-Hash $Archiv $popis
    return $popis
}

function Docasna-Slozka {
    $cesta = Join-Path ([IO.Path]::GetTempPath()) ("balicky-" + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $cesta | Out-Null
    return $cesta
}

function Smaz-Docasnou([string]$Cesta) {
    if ($Cesta -and (Split-Path $Cesta -Leaf) -match '^balicky-[a-f0-9]{32}$' -and (Test-Path -LiteralPath $Cesta)) {
        Remove-Item -LiteralPath $Cesta -Recurse -Force
    }
}

function Nuget-Feed([string]$Cache, [string]$Feed) {
    New-Item -ItemType Directory -Path $Feed -Force | Out-Null
    $balicky = @(Get-ChildItem -LiteralPath $Cache -Filter '*.nupkg' -File -Recurse -Force | Where-Object { $_.Name -match '\.\d+\.\d+[^\\/]*\.nupkg$' })
    if ($balicky.Count -eq 0) { throw 'Nebyl získán žádný soubor .nupkg.' }
    foreach ($balicek in $balicky) {
        $cil = Join-Path $Feed $balicek.Name
        if (Test-Path -LiteralPath $cil) {
            if ((Get-FileHash -LiteralPath $cil -Algorithm SHA256).Hash -eq (Get-FileHash -LiteralPath $balicek.FullName -Algorithm SHA256).Hash) { continue }
            throw "Kolize v místním NuGet zdroji: $($balicek.Name)"
        }
        Copy-Item -LiteralPath $balicek.FullName -Destination $cil
    }
}

function Nuget-Konfigurace([string]$Archiv) {
    @'
<?xml version="1.0" encoding="utf-8"?>
<configuration><packageSources><clear /><add key="offline" value="feed" /></packageSources></configuration>
'@ | Set-Content -LiteralPath (Join-Path $Archiv 'NuGet.Offline.Config') -Encoding utf8NoBOM
}

function Sluc-Soubory([string]$Zdroj, [string]$Cil, [string[]]$Oblasti) {
    foreach ($oblast in $Oblasti) {
        $koren = Join-Path $Zdroj $oblast
        if (-not (Test-Path -LiteralPath $koren)) { continue }
        foreach ($soubor in Get-ChildItem -LiteralPath $koren -File -Recurse -Force) {
            $rel = [IO.Path]::GetRelativePath($Zdroj, $soubor.FullName)
            $cilovySoubor = Join-Path $Cil $rel
            if (Test-Path -LiteralPath $cilovySoubor) {
                if ((Get-FileHash -LiteralPath $cilovySoubor -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $soubor.FullName -Algorithm SHA256).Hash) {
                    throw "Cílová pub cache má jiný obsah: $rel"
                }
                continue
            }
            New-Item -ItemType Directory -Path (Split-Path $cilovySoubor) -Force | Out-Null
            Copy-Item -LiteralPath $soubor.FullName -Destination $cilovySoubor
        }
    }
}

function Dart-Data-Home {
    if ($env:DART_DATA_HOME) { return [IO.Path]::GetFullPath($env:DART_DATA_HOME) }
    return Join-Path $env:LOCALAPPDATA 'Dart'
}

function Nova-Platforma {
    return "$([System.Runtime.InteropServices.RuntimeInformation]::OSDescription.Trim()) / $([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture)"
}

function Pouzij-Pnpm-Home([string]$Cesta) {
    $env:PNPM_HOME = $Cesta
    $bin = Join-Path $Cesta 'bin'
    New-Item -ItemType Directory -Path $bin -Force | Out-Null
    $env:PATH = "$bin$([IO.Path]::PathSeparator)$env:PATH"
}

function Polozky-Archivu([hashtable]$Popis) {
    if (-not $Popis.ContainsKey('balicky') -or @($Popis.balicky).Count -eq 0) {
        throw 'Archiv neobsahuje seznam přímo instalovaných balíčků.'
    }
    return $Popis.balicky
}

$puvodniProstredi = @{}
foreach ($nazev in @('PATH','PNPM_HOME','PNPM_CONFIG_CACHE_DIR','NUGET_PACKAGES','NUGET_HTTP_CACHE_PATH','DOTNET_CLI_HOME',
    'DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE','PUB_CACHE','DART_DATA_HOME','HTTP_PROXY','HTTPS_PROXY','PYTHONPATH')) {
    $puvodniProstredi[$nazev] = [Environment]::GetEnvironmentVariable($nazev, 'Process')
}
try {
if (-not $Akce) { $Akce = Vyber-Hodnotu '' 'Akce (Zaloha, Obnova, Overeni nebo Uklid)' }
if ($Akce -notin @('Zaloha','Obnova','Overeni','Uklid')) { throw "Neznámá akce: $Akce" }
if (-not $Archiv) {
    $vychoziArchiv = if (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'archiv.json') -PathType Leaf) {
        $PSScriptRoot
    } else {
        Join-Path (Get-Location).ProviderPath 'archiv'
    }
    $Archiv = Read-Host "Úplná cesta ke složce archivu [Enter = $vychoziArchiv]"
    if (-not $Archiv) { $Archiv = $vychoziArchiv }
}
$Archiv = [IO.Path]::GetFullPath((Vyber-Hodnotu $Archiv 'Úplná cesta ke složce archivu'))

if ($Akce -in @('Overeni','Uklid')) {
    $popis = Otevri-Archiv $Archiv
    Write-Host "Archiv: $Archiv"
    Write-Host "Správce: $($popis.spravce), rozsah: $($popis.rozsah), souborů: $($popis.soubory.Count)"
    if ($popis.ContainsKey('balicky')) { Write-Host "Přímo instalovaných balíčků: $(@($popis.balicky).Count)" }
    if ($Akce -eq 'Overeni') { Write-Host 'Archiv je úplný a otisky souborů souhlasí.'; return }
    if ($Archiv -eq [IO.Path]::GetPathRoot($Archiv)) { throw 'Kořen disku nelze odstranit.' }
    Write-Host 'Po úspěšné obnově nejdřív spusťte obnovené nástroje nebo testy.'
    $potvrzeni = Read-Host 'Pro trvalé odstranění celého archivu napište SMAZAT'
    if ($potvrzeni -cne 'SMAZAT') { Write-Host 'Úklid zrušen.'; return }
    $pracovniSlozka = [IO.Path]::GetFullPath((Get-Location).ProviderPath)
    if ($pracovniSlozka.Equals($Archiv, [StringComparison]::OrdinalIgnoreCase) -or
        $pracovniSlozka.StartsWith($Archiv.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        Set-Location (Split-Path $Archiv -Parent)
    }
    Remove-Item -LiteralPath $Archiv -Recurse -Force
    Write-Host 'Archiv byl odstraněn.'
    return
}

if ($Akce -eq 'Zaloha') {
    $Spravce = Vyber-Hodnotu $Spravce 'Správce (npm, pnpm, pip, nuget, dotnet-tools, dart)'
    $Rozsah = Vyber-Hodnotu $Rozsah 'Rozsah (Globalni, Lokalni, Vlastni)'
    if ($Spravce -notin @('npm','pnpm','pip','nuget','dotnet-tools','dart')) { throw "Neznámý správce: $Spravce" }
    if ($Rozsah -notin @('Globalni','Lokalni','Vlastni')) { throw "Neznámý rozsah: $Rozsah" }
    if ($Spravce -eq 'nuget' -and $Rozsah -ne 'Lokalni') { throw 'NuGet PackageReference má jen projektový rozsah.' }
    if ($Rozsah -eq 'Lokalni') { $Projekt = [IO.Path]::GetFullPath((Vyber-Hodnotu $Projekt 'Kořen projektu nebo prostředí')) }
    if ($Rozsah -eq 'Vlastni') { $Umisteni = [IO.Path]::GetFullPath((Vyber-Hodnotu $Umisteni 'Stávající vlastní umístění')) }
    if ($Spravce -eq 'pip') { $Python = Vyber-Hodnotu $Python 'Cesta k Python interpretu s pip' }
    if ($Spravce -eq 'dart' -and $Rozsah -eq 'Vlastni') { throw 'Pub cache není samostatný instalační rozsah; pro Dart použij Lokální nebo Globální.' }
    if (Test-Path -LiteralPath $Archiv -PathType Leaf) { throw "Archiv musí být složka: $Archiv" }
    if (Test-Path -LiteralPath $Archiv -PathType Container) {
        $obsah = @(Get-ChildItem -LiteralPath $Archiv -Force)
        if ($obsah.Count -gt 0) { throw "Archiv musí být nová nebo prázdná složka: $Archiv" }
    }
    Kontrola-Vstupu $Archiv $Projekt
    Kontrola-Vstupu $Archiv $Umisteni
    if (-not (Test-Path -LiteralPath $Archiv)) { New-Item -ItemType Directory -Path $Archiv | Out-Null }
    $tmp = Docasna-Slozka
    $popis = @{ format = 1; spravce = $Spravce; rozsah = $Rozsah; platforma = Nova-Platforma; verze = ''; prikaz = $DartPrikaz }
    try {
        switch ($Spravce) {
            'npm' {
                $popis.verze = Vystup 'npm' @('--version')
                if ($Rozsah -eq 'Lokalni') {
                    foreach ($nazev in @('package.json', 'package-lock.json')) { Kopie-Projektoveho-Souboru $Projekt $nazev $Archiv }
                    $npmrc = Join-Path $Projekt '.npmrc'
                    if (Test-Path -LiteralPath $npmrc) {
                        $radky = Get-Content -LiteralPath $npmrc
                        if (@($radky | Where-Object { $_ -match '(?i)(auth|token|password|email|registry|cert|key|proxy|\$\{)' }).Count -gt 0) {
                            throw '.npmrc obsahuje síťové nebo citlivé nastavení. Připrav jeho bezpečnou projektovou variantu.'
                        }
                        Kopie-Projektoveho-Souboru $Projekt '.npmrc' $Archiv
                    }
                    $konfig = Get-Content -LiteralPath (Join-Path $Projekt 'package.json') -Raw | ConvertFrom-Json -AsHashtable
                    $instalacniSkripty = @()
                    if ($konfig.ContainsKey('scripts')) { $instalacniSkripty = @('preinstall','install','postinstall','prepare') | Where-Object { $konfig.scripts.ContainsKey($_) } }
                    if ($konfig.ContainsKey('workspaces') -or @($instalacniSkripty).Count -gt 0) { throw 'Workspace nebo kořenové instalační skripty vyžadují individuální zálohu.' }
                    if ((Get-Content -LiteralPath (Join-Path $Projekt 'package-lock.json') -Raw) -match '"(?:file:|link:|git\+|https?://(?!registry\.npmjs\.org))') { throw 'Nestandardní zdroj závislosti vyžaduje individuální zálohu.' }
                    Get-ChildItem -LiteralPath (Join-Path $Archiv 'projekt') -File -Force | Copy-Item -Destination $tmp
                    Push-Location $tmp
                    try { Spust 'npm' @('ci', '--cache', (Join-Path $Archiv 'cache'), '--no-audit', '--no-fund') } finally { Pop-Location }
                    $over = Docasna-Slozka
                    try {
                        Get-ChildItem -LiteralPath (Join-Path $Archiv 'projekt') -File -Force | Copy-Item -Destination $over
                        Push-Location $over
                        try { Spust 'npm' @('ci', '--offline', '--cache', (Join-Path $Archiv 'cache'), '--no-audit', '--no-fund'); Spust 'npm' @('ls', '--depth=0') } finally { Pop-Location }
                    } finally { Smaz-Docasnou $over }
                } else {
                    $prefix = if ($Rozsah -eq 'Globalni') { Vystup 'npm' @('prefix', '--global') } else { $Umisteni }
                    if (-not (Test-Path -LiteralPath $prefix -PathType Container)) { throw "V npm prefixu $prefix nejsou žádné globální balíčky." }
                    $seznam = Vystup 'npm' @('ls', '--global', '--prefix', $prefix, '--depth=0', '--json') | ConvertFrom-Json -AsHashtable
                    if (-not $seznam.ContainsKey('dependencies') -or $seznam.dependencies.Count -eq 0) { throw "V $prefix nejsou žádné přímo nainstalované balíčky npm." }
                    $balicky = @(foreach ($id in $seznam.dependencies.Keys | Sort-Object) {
                        $zaznam = $seznam.dependencies[$id]
                        if (($zaznam.ContainsKey('link') -and $zaznam.link) -or -not $zaznam.ContainsKey('version')) { throw "Balíček $id nemá přenositelnou verzi z registru." }
                        @{ id = $id; verze = [string]$zaznam.version }
                    })
                    $popis.balicky = $balicky
                    $specifikace = @($balicky | ForEach-Object { "$($_.id)@$($_.verze)" })
                    Write-Host "Počet přímo instalovaných balíčků npm k záloze: $($balicky.Count)."
                    Spust 'npm' (@('install', '--global', '--prefix', $tmp, '--cache', (Join-Path $Archiv 'cache'), '--no-audit', '--no-fund') + $specifikace)
                    $over = Docasna-Slozka
                    try { Spust 'npm' (@('install', '--global', '--offline', '--prefix', $over, '--cache', (Join-Path $Archiv 'cache'), '--no-audit', '--no-fund') + $specifikace) } finally { Smaz-Docasnou $over }
                }
            }
            'pnpm' {
                $popis.verze = Vystup 'pnpm' @('--version')
                $env:PNPM_CONFIG_CACHE_DIR = Join-Path $Archiv 'pnpm-cache'
                if ($Rozsah -eq 'Lokalni') {
                    foreach ($nazev in @('package.json', 'pnpm-lock.yaml')) { Kopie-Projektoveho-Souboru $Projekt $nazev $Archiv }
                    $pnpmConfig = Join-Path $Projekt 'pnpm-workspace.yaml'
                    if (Test-Path -LiteralPath $pnpmConfig) {
                        if ((Get-Content -LiteralPath $pnpmConfig -Raw) -match '(?m)^\s*(packages|catalog|catalogs|patchedDependencies):') { throw 'Pnpm workspace, katalog nebo patche vyžadují individuální zálohu.' }
                        Kopie-Projektoveho-Souboru $Projekt 'pnpm-workspace.yaml' $Archiv
                    }
                    if ((Get-Content -LiteralPath (Join-Path $Projekt 'pnpm-lock.yaml') -Raw) -match '(\bfile:|\blink:|git\+|https?://(?!registry\.npmjs\.org))') { throw 'Nestandardní zdroj závislosti vyžaduje individuální zálohu.' }
                    Get-ChildItem -LiteralPath (Join-Path $Archiv 'projekt') -File -Force | Copy-Item -Destination $tmp
                    Push-Location $tmp
                    try { Spust 'pnpm' @('install', '--frozen-lockfile', '--store-dir', (Join-Path $Archiv 'store')) } finally { Pop-Location }
                    $over = Docasna-Slozka
                    try {
                        Get-ChildItem -LiteralPath (Join-Path $Archiv 'projekt') -File -Force | Copy-Item -Destination $over
                        Push-Location $over
                        try { Spust 'pnpm' @('install', '--offline', '--frozen-lockfile', '--store-dir', (Join-Path $Archiv 'store')); Spust 'pnpm' @('list', '--depth=0') } finally { Pop-Location }
                    } finally { Smaz-Docasnou $over }
                } else {
                    $env:PNPM_HOME = if ($Rozsah -eq 'Globalni') { Vyber-Hodnotu $env:PNPM_HOME 'PNPM_HOME aktuální instalace' } else { $Umisteni }
                    $vypis = Vystup 'pnpm' @('list', '--global', '--json', '--depth=0')
                    if (-not $vypis) { throw 'Ve vybraném PNPM_HOME nejsou žádné přímo nainstalované balíčky.' }
                    $seznam = $vypis | ConvertFrom-Json -AsHashtable
                    $koren = @($seznam)[0]
                    $zavislosti = if ($koren -and $koren.ContainsKey('dependencies')) { $koren.dependencies } else { @{} }
                    if (-not $zavislosti -or $zavislosti.Count -eq 0) { throw 'Ve vybraném PNPM_HOME nejsou žádné přímo nainstalované balíčky.' }
                    $balicky = @(foreach ($id in $zavislosti.Keys | Sort-Object) {
                        $zaznam = $zavislosti[$id]
                        if (-not $zaznam.ContainsKey('version')) { throw "Balíček $id nemá přenositelnou verzi z registru." }
                        @{ id = $id; verze = [string]$zaznam.version }
                    })
                    $popis.balicky = $balicky
                    $specifikace = @($balicky | ForEach-Object { "$($_.id)@$($_.verze)" })
                    Pouzij-Pnpm-Home (Join-Path $tmp 'home')
                    Write-Host "Počet přímo instalovaných balíčků pnpm k záloze: $($balicky.Count)."
                    Spust 'pnpm' (@('add', '--global', '--store-dir', (Join-Path $Archiv 'store')) + $specifikace)
                    $over = Docasna-Slozka
                    try {
                        Pouzij-Pnpm-Home (Join-Path $over 'home')
                        Spust 'pnpm' (@('add', '--global', '--offline', '--store-dir', (Join-Path $Archiv 'store')) + $specifikace)
                    } finally { Smaz-Docasnou $over }
                }
            }
            'pip' {
                $popis.verze = Vystup $Python @('--version')
                $argumenty = @('-m', 'pip', 'freeze')
                if ($Rozsah -eq 'Globalni') { $argumenty += '--user' }
                if ($Rozsah -eq 'Lokalni') { $argumenty += '--local' }
                if ($Rozsah -eq 'Vlastni') { $argumenty += @('--path', $Umisteni) }
                $seznam = Vystup $Python $argumenty
                if (-not $seznam) { throw 'Ve vybraném Python prostředí nejsou žádné balíčky.' }
                if ($seznam -match '(?m)^(-e |git\+|https?://|file:|\./|\.\\|[^\s=]+\s*@\s*)') { throw 'Přímé, editovatelné nebo lokální zdroje vyžadují individuální wheel.' }
                $seznam | Set-Content -LiteralPath (Join-Path $Archiv 'requirements.txt') -Encoding utf8NoBOM
                New-Item -ItemType Directory -Path (Join-Path $Archiv 'wheels') | Out-Null
                Spust $Python @('-m', 'pip', 'wheel', '--wheel-dir', (Join-Path $Archiv 'wheels'), '-r', (Join-Path $Archiv 'requirements.txt'))
                $over = Docasna-Slozka
                try {
                    Spust $Python @('-m', 'venv', $over)
                    $testPython = if ($IsWindows) { Join-Path $over 'Scripts/python.exe' } else { Join-Path $over 'bin/python' }
                    Spust $testPython @('-m', 'pip', '--isolated', 'install', '--no-index', '--find-links', (Join-Path $Archiv 'wheels'), '-r', (Join-Path $Archiv 'requirements.txt'))
                    Spust $testPython @('-m', 'pip', 'check')
                } finally { Smaz-Docasnou $over }
            }
            'nuget' {
                $popis.verze = Vystup 'dotnet' @('--version')
                $projekty = @(Get-ChildItem -LiteralPath $Projekt -File -Filter '*.*proj')
                if ($projekty.Count -ne 1) { throw 'Vyber kořen s právě jedním projektem .NET.' }
                $projektovySoubor = $projekty[0].Name
                if ((Get-Content -LiteralPath $projekty[0].FullName -Raw) -match '<(ProjectReference|Import)\b') {
                    throw 'ProjectReference a explicitní MSBuild Import vyžadují individuální zálohu navazujících souborů.'
                }
                foreach ($nazev in @($projektovySoubor, 'packages.lock.json')) { Kopie-Projektoveho-Souboru $Projekt $nazev $Archiv }
                foreach ($nazev in @('Directory.Packages.props', 'Directory.Build.props', 'Directory.Build.targets', 'global.json')) {
                    if (Test-Path -LiteralPath (Join-Path $Projekt $nazev)) { Kopie-Projektoveho-Souboru $Projekt $nazev $Archiv }
                }
                $popis.projektovySoubor = $projektovySoubor
                $env:NUGET_PACKAGES = Join-Path $tmp 'packages'
                $env:NUGET_HTTP_CACHE_PATH = Join-Path $tmp 'http'
                Spust 'dotnet' @('restore', (Join-Path $Projekt $projektovySoubor), '--locked-mode', '--packages', $env:NUGET_PACKAGES)
                Nuget-Feed $tmp (Join-Path $Archiv 'feed')
                Nuget-Konfigurace $Archiv
                $over = Docasna-Slozka
                try {
                    $env:NUGET_PACKAGES = Join-Path $over 'packages'
                    $env:NUGET_HTTP_CACHE_PATH = Join-Path $over 'http'
                    Spust 'dotnet' @('restore', (Join-Path $Projekt $projektovySoubor), '--locked-mode', '--packages', $env:NUGET_PACKAGES, '--configfile', (Join-Path $Archiv 'NuGet.Offline.Config'), '-p:NuGetAudit=false')
                } finally { Smaz-Docasnou $over }
            }
            'dotnet-tools' {
                $popis.verze = Vystup 'dotnet' @('--version')
                $env:NUGET_PACKAGES = Join-Path $tmp 'packages'
                $env:NUGET_HTTP_CACHE_PATH = Join-Path $tmp 'http'
                if ($Rozsah -eq 'Lokalni') {
                    $manifest = if (Test-Path -LiteralPath (Join-Path $Projekt '.config/dotnet-tools.json')) { '.config/dotnet-tools.json' } elseif (Test-Path -LiteralPath (Join-Path $Projekt 'dotnet-tools.json')) { 'dotnet-tools.json' } else { throw 'Chybí manifest dotnet-tools.json.' }
                    $popis.manifest = $manifest
                    Kopie-Projektoveho-Souboru $Projekt $manifest $Archiv
                    $volbyZdroje = if ($ZdrojBalicku) { @('--add-source',$ZdrojBalicku) } else { @() }
                    $env:DOTNET_CLI_HOME = Join-Path $tmp 'home'
                    Spust 'dotnet' (@('tool', 'restore', '--tool-manifest', (Join-Path $Projekt $manifest)) + $volbyZdroje)
                } else {
                    $vypis = if ($Rozsah -eq 'Globalni') { Vystup 'dotnet' @('tool','list','--global','--format','json') } else { Vystup 'dotnet' @('tool','list','--tool-path',$Umisteni,'--format','json') }
                    $nainstalovane = @(($vypis | ConvertFrom-Json -AsHashtable).data)
                    if ($nainstalovane.Count -eq 0) {
                        if ($Rozsah -eq 'Globalni') { throw 'Příkaz dotnet tool list --global nevrátil žádné nástroje pro aktuální účet. Projektové nástroje mají rozsah Lokalni, nástroje z --tool-path rozsah Vlastni.' }
                        throw "V umístění $Umisteni nejsou žádné .NET tools."
                    }
                    $balicky = @(foreach ($polozka in $nainstalovane | Sort-Object packageId) {
                        if (-not $polozka.packageId -or -not $polozka.version) { throw 'Seznam .NET tools neobsahuje ID nebo verzi.' }
                        @{ id = [string]$polozka.packageId; verze = [string]$polozka.version }
                    })
                    $popis.balicky = $balicky
                    $volbyZdroje = if ($ZdrojBalicku) { @('--add-source',$ZdrojBalicku) } else { @() }
                    Write-Host "Počet nainstalovaných .NET tools k záloze: $($balicky.Count)."
                    $env:DOTNET_CLI_HOME = Join-Path $tmp 'home'
                    foreach ($polozka in $balicky) {
                        Spust 'dotnet' (@('tool','install',$polozka.id,'--tool-path',(Join-Path $tmp 'tools'),'--version',$polozka.verze) + $volbyZdroje)
                    }
                }
                Nuget-Feed $tmp (Join-Path $Archiv 'feed')
                Nuget-Konfigurace $Archiv
                $over = Docasna-Slozka
                try {
                    $env:NUGET_PACKAGES = Join-Path $over 'packages'
                    $env:NUGET_HTTP_CACHE_PATH = Join-Path $over 'http'
                    $env:DOTNET_CLI_HOME = Join-Path $over 'home'
                    if ($Rozsah -eq 'Lokalni') {
                        Spust 'dotnet' @('tool','restore','--tool-manifest',(Join-Path (Join-Path $Archiv 'projekt') $manifest),'--configfile',(Join-Path $Archiv 'NuGet.Offline.Config'))
                    } else {
                        foreach ($polozka in $balicky) {
                            Spust 'dotnet' @('tool','install',$polozka.id,'--tool-path',(Join-Path $over 'tools'),'--version',$polozka.verze,'--configfile',(Join-Path $Archiv 'NuGet.Offline.Config'))
                        }
                    }
                } finally { Smaz-Docasnou $over }
            }
            'dart' {
                $popis.verze = Vystup $DartPrikaz @('--version')
                if ($Rozsah -eq 'Lokalni') {
                    foreach ($nazev in @('pubspec.yaml', 'pubspec.lock')) { Kopie-Projektoveho-Souboru $Projekt $nazev $Archiv }
                    if (Test-Path -LiteralPath (Join-Path $Projekt 'pubspec_overrides.yaml')) { Kopie-Projektoveho-Souboru $Projekt 'pubspec_overrides.yaml' $Archiv }
                    foreach ($nazev in @('pubspec.yaml','pubspec_overrides.yaml')) {
                        $soubor = Join-Path $Projekt $nazev
                        if ((Test-Path -LiteralPath $soubor) -and ((Get-Content -LiteralPath $soubor -Raw) -match '(?m)^\s*(path:|git:|workspace:)')) { throw 'Lokální, Git nebo workspace závislosti vyžadují individuální zálohu.' }
                    }
                    $env:PUB_CACHE = Join-Path $Archiv 'pub-cache'
                    Push-Location $Projekt
                    try { Spust $DartPrikaz @('pub','get','--enforce-lockfile'); Spust $DartPrikaz @('pub','get','--offline','--enforce-lockfile') } finally { Pop-Location }
                } else {
                    if (-not $IsWindows) { throw 'Záloha globálních Dart nástrojů je nyní podporována ve Windows.' }
                    $nainstalovane = Vystup 'dart' @('installed')
                    $radky = @($nainstalovane -split '\r?\n' | Where-Object { $_.Trim() })
                    if ($radky.Count -eq 0) { throw 'Dart installed neuvádí žádný globálně nainstalovaný nástroj.' }
                    $zdroj = Join-Path (Dart-Data-Home) 'install'
                    $balicky = @(foreach ($radek in $radky) {
                        if ($radek -notmatch '^([a-z][a-z0-9_]*)\s+([0-9][^\s]*)(?:\s+from\s+|\s*$)') {
                            throw "Nepodporovaný záznam Dart installed: $radek"
                        }
                        $id = $Matches[1]
                        $verze = $Matches[2]
                        $slozka = Join-Path (Join-Path $zdroj 'app-bundles') $id
                        if (-not (Test-Path -LiteralPath $slozka -PathType Container)) { throw "Chybí data nástroje $id v $slozka" }
                        $varianta = if ($radek -match '\s+from Git repository\s+.+\s+at "([a-f0-9]{8})"') {
                            $kandidati = @(Get-ChildItem -LiteralPath (Join-Path $slozka 'git') -Directory | Where-Object { $_.Name.StartsWith($Matches[1]) })
                            if ($kandidati.Count -ne 1) { throw "Nejednoznačná Git verze nástroje $id." }
                            Join-Path 'git' $kandidati[0].Name
                        } elseif ($radek -match '\s+from "') { 'local' } else { Join-Path 'hosted' $verze }
                        $zdrojBundle = Join-Path $slozka $varianta
                        if (-not (Test-Path -LiteralPath $zdrojBundle -PathType Container)) { throw "Chybí instalace nástroje ${id}: $zdrojBundle" }
                        $spoustece = @(foreach ($soubor in Get-ChildItem -LiteralPath (Join-Path $zdroj 'bin') -Filter '*.bat' -File) {
                            $obsah = Get-Content -LiteralPath $soubor.FullName -Raw
                            if ($obsah -match '(?im)^REM target_file_path_marker\s*$' -and
                                $obsah -match '(?im)^"([^"]+\.exe)" %\*\s*$') {
                                $exe = [IO.Path]::GetFullPath($Matches[1])
                                if ($exe.StartsWith($zdrojBundle.TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
                                    if (-not (Test-Path -LiteralPath $exe -PathType Leaf)) { throw "Spouštěč $soubor ukazuje na chybějící soubor." }
                                    @{ jmeno = $soubor.BaseName; relativni = [IO.Path]::GetRelativePath($slozka, $exe).Replace('\', '/') }
                                }
                            }
                        })
                        if ($spoustece.Count -eq 0) { throw "Nástroj $id nemá přenosný spouštěč." }
                        $cil = Join-Path (Join-Path (Join-Path $Archiv 'dart-install') 'app-bundles') $id
                        New-Item -ItemType Directory -Path (Split-Path $cil) -Force | Out-Null
                        $cilBundle = Join-Path $cil $varianta
                        New-Item -ItemType Directory -Path (Split-Path $cilBundle) -Force | Out-Null
                        Copy-Item -LiteralPath $zdrojBundle -Destination $cilBundle -Recurse
                        @{ id = $id; verze = $verze; spoustece = $spoustece }
                    })
                    $popis.dartInstalace = 'install'
                    $popis.balicky = $balicky
                    Write-Host "Počet nástrojů Dart installed k záloze: $($balicky.Count)."
                }
            }
        }
        Copy-Item -LiteralPath $PSCommandPath -Destination (Join-Path $Archiv 'transfer.ps1')
        if ($Spravce -eq 'npm') {
            $cache = Join-Path $Archiv 'cache'
            foreach ($soubor in Get-ChildItem -LiteralPath $cache -Force | Where-Object { $_.Name -ne '_cacache' }) {
                Remove-Item -LiteralPath $soubor.FullName -Recurse -Force
            }
        }
        if ($Spravce -eq 'dart' -and $Rozsah -eq 'Lokalni') {
            foreach ($nepotrebne in @('_temp','active_roots','README.md','bin')) {
                $cesta = Join-Path (Join-Path $Archiv 'pub-cache') $nepotrebne
                if (Test-Path -LiteralPath $cesta) { Remove-Item -LiteralPath $cesta -Recurse -Force }
            }
        }
        Pridej-Hash $Archiv $popis
        Write-Host "Záloha je připravena: $Archiv"
    } finally { Smaz-Docasnou $tmp }
    return
}

$popis = Otevri-Archiv $Archiv
$Spravce = $popis.spravce
$Rozsah = $popis.rozsah
if ($Spravce -eq 'dart' -and $Rozsah -eq 'Globalni') {
    $architektura = [regex]::Match([string]$popis.platforma, ' / ([^/]+)$').Groups[1].Value
    if (-not $IsWindows -or $architektura -ne [string][System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture) {
        throw 'Globální Dart archiv obsahuje spustitelné soubory pro Windows a architekturu zdrojového počítače.'
    }
}
if ($Rozsah -eq 'Lokalni') {
    $Projekt = [IO.Path]::GetFullPath((Vyber-Hodnotu $Projekt 'Cesta k existujícímu cílovému projektu nebo prostředí'))
    if ($Spravce -ne 'pip') { Over-Projekt $Archiv $Projekt }
} elseif ($Rozsah -eq 'Vlastni') {
    $Umisteni = [IO.Path]::GetFullPath((Vyber-Hodnotu $Umisteni 'Nové vlastní umístění'))
}
Kontrola-Vstupu $Archiv $Projekt
Kontrola-Vstupu $Archiv $Umisteni
Kontrola-Vstupu $Archiv $ObnoveneUloziste
if ($Spravce -eq 'pip') { $Python = Vyber-Hodnotu $Python 'Cesta k kompatibilnímu Python interpretu' }

switch ($Spravce) {
    'npm' {
        $docasna = Docasna-Slozka
        try {
            $cache = Join-Path $docasna 'cache'
            Copy-Item -LiteralPath (Join-Path $Archiv 'cache') -Destination $cache -Recurse
            if ($Rozsah -eq 'Lokalni') {
                Push-Location $Projekt
                try { Spust 'npm' @('ci','--offline','--cache',$cache,'--no-audit','--no-fund'); Spust 'npm' @('ls','--depth=0') } finally { Pop-Location }
            } else {
                $prefix = if ($Rozsah -eq 'Globalni') { Vystup 'npm' @('prefix','--global') } else { $Umisteni }
                $specifikace = @(Polozky-Archivu $popis | ForEach-Object { "$($_.id)@$($_.verze)" })
                Spust 'npm' (@('install','--global','--offline','--prefix',$prefix,'--cache',$cache,'--no-audit','--no-fund') + $specifikace)
                Spust 'npm' @('ls','--global','--prefix',$prefix,'--depth=0')
            }
        } finally { Smaz-Docasnou $docasna }
    }
    'pnpm' {
        $pnpmDocasna = Docasna-Slozka
        try {
        $env:PNPM_CONFIG_CACHE_DIR = Join-Path $pnpmDocasna 'pnpm-cache'
        if (Test-Path -LiteralPath (Join-Path $Archiv 'pnpm-cache')) {
            Copy-Item -LiteralPath (Join-Path $Archiv 'pnpm-cache') -Destination $env:PNPM_CONFIG_CACHE_DIR -Recurse
        }
        $cilStore = if ($ObnoveneUloziste) { [IO.Path]::GetFullPath($ObnoveneUloziste) } else { Split-Path (Vystup 'pnpm' @('store','path')) -Parent }
        New-Item -ItemType Directory -Path $cilStore -Force | Out-Null
        Sluc-Soubory (Join-Path $Archiv 'store') $cilStore @('.')
        if ($Rozsah -eq 'Lokalni') {
            Push-Location $Projekt
            try { Spust 'pnpm' @('install','--offline','--frozen-lockfile','--store-dir',$cilStore); Spust 'pnpm' @('list','--depth=0') } finally { Pop-Location }
        } else {
            $pnpmHome = if ($Rozsah -eq 'Globalni') { Vyber-Hodnotu $env:PNPM_HOME 'PNPM_HOME cílového uživatele' } else { $Umisteni }
            Pouzij-Pnpm-Home $pnpmHome
            $specifikace = @(Polozky-Archivu $popis | ForEach-Object { "$($_.id)@$($_.verze)" })
            Spust 'pnpm' (@('add','--global','--offline','--store-dir',$cilStore) + $specifikace)
            Spust 'pnpm' @('list','--global','--depth=0')
        }
        } finally { Smaz-Docasnou $pnpmDocasna }
    }
    'pip' {
        $pythonCil = $Python
        if ($Rozsah -eq 'Lokalni') {
            $venv = Join-Path $Projekt '.venv'
            if (Test-Path -LiteralPath $venv) { throw "Cílové prostředí už existuje: $venv" }
            Spust $Python @('-m','venv',$venv)
            $pythonCil = if ($IsWindows) { Join-Path $venv 'Scripts/python.exe' } else { Join-Path $venv 'bin/python' }
        }
        $parametry = @('-m','pip','--isolated','install','--no-index','--find-links',(Join-Path $Archiv 'wheels'),'-r',(Join-Path $Archiv 'requirements.txt'))
        if ($Rozsah -eq 'Globalni') { $parametry += '--user' }
        if ($Rozsah -eq 'Vlastni') { Prazdna-Slozka $Umisteni; $parametry += @('--target',$Umisteni) }
        Spust $pythonCil $parametry
        if ($Rozsah -eq 'Vlastni') { $env:PYTHONPATH = $Umisteni }
        Spust $pythonCil @('-m','pip','check')
    }
    'nuget' {
        $env:DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE = 'true'
        Spust 'dotnet' @('restore',(Join-Path $Projekt $popis.projektovySoubor),'--locked-mode','--configfile',(Join-Path $Archiv 'NuGet.Offline.Config'),'-p:NuGetAudit=false')
        Spust 'dotnet' @('build',(Join-Path $Projekt $popis.projektovySoubor),'--no-restore')
    }
    'dotnet-tools' {
        $env:DOTNET_CLI_WORKLOAD_UPDATE_NOTIFY_DISABLE = 'true'
        if ($Rozsah -eq 'Lokalni') {
            Spust 'dotnet' @('tool','restore','--tool-manifest',(Join-Path $Projekt $popis.manifest),'--configfile',(Join-Path $Archiv 'NuGet.Offline.Config'))
            Push-Location $Projekt
            try { Spust 'dotnet' @('tool','list','--local') } finally { Pop-Location }
        } else {
            $volba = if ($Rozsah -eq 'Globalni') { @('--global') } else { @('--tool-path',$Umisteni) }
            $balicky = @(Polozky-Archivu $popis)
            foreach ($polozka in $balicky) {
                Spust 'dotnet' (@('tool','install',$polozka.id) + $volba + @('--version',$polozka.verze,'--configfile',(Join-Path $Archiv 'NuGet.Offline.Config')))
            }
            Spust 'dotnet' (@('tool','list') + $volba)
        }
    }
    'dart' {
        if ($Rozsah -eq 'Globalni' -and $popis.ContainsKey('dartInstalace') -and $popis.dartInstalace -eq 'install') {
            $cilData = Dart-Data-Home
            $cilInstall = Join-Path $cilData 'install'
            $balicky = @(Polozky-Archivu $popis)
            foreach ($polozka in $balicky) {
                if ($polozka.id -notmatch '^[a-z][a-z0-9_]*$') { throw 'Archiv obsahuje neplatné ID Dart nástroje.' }
                $cilBalicek = Join-Path (Join-Path $cilInstall 'app-bundles') $polozka.id
                if (Test-Path -LiteralPath $cilBalicek) { throw "Cílový Dart nástroj již existuje: $cilBalicek" }
                foreach ($spoustec in @($polozka.spoustece)) {
                    if ($spoustec.jmeno -notmatch '^[a-zA-Z0-9_-]+$' -or
                        $spoustec.relativni -notmatch '^[a-zA-Z0-9_./-]+\.exe$' -or
                        $spoustec.relativni -match '(^|/)\.\.?(/|$)') { throw 'Archiv obsahuje neplatnou cestu Dart spouštěče.' }
                    if (-not (Test-Path -LiteralPath (Join-Path (Join-Path (Join-Path $Archiv 'dart-install') 'app-bundles') (Join-Path $polozka.id $spoustec.relativni)) -PathType Leaf)) {
                        throw "V archivu chybí Dart spouštěč $($spoustec.jmeno)."
                    }
                    $cilSpoustec = Join-Path (Join-Path $cilInstall 'bin') "$($spoustec.jmeno).bat"
                    if (Test-Path -LiteralPath $cilSpoustec) { throw "Cílový Dart spouštěč již existuje: $cilSpoustec" }
                }
            }
            New-Item -ItemType Directory -Path (Join-Path $cilInstall 'bin') -Force | Out-Null
            foreach ($polozka in $balicky) {
                $zdroj = Join-Path (Join-Path (Join-Path $Archiv 'dart-install') 'app-bundles') $polozka.id
                $cilBalicek = Join-Path (Join-Path $cilInstall 'app-bundles') $polozka.id
                New-Item -ItemType Directory -Path (Split-Path $cilBalicek) -Force | Out-Null
                Copy-Item -LiteralPath $zdroj -Destination $cilBalicek -Recurse
                foreach ($spoustec in @($polozka.spoustece)) {
                    $rel = $spoustec.relativni.Replace('/', '\')
                    $exe = Join-Path $cilBalicek $rel
                    $obsah = "@ECHO OFF`r`nREM target_file_path_marker`r`n`"$exe`" %*`r`nEXIT /B %ERRORLEVEL%`r`n"
                    Set-Content -LiteralPath (Join-Path (Join-Path $cilInstall 'bin') "$($spoustec.jmeno).bat") -Value $obsah -Encoding utf8NoBOM -NoNewline
                }
            }
            $env:DART_DATA_HOME = $cilData
            $vypis = Vystup 'dart' @('installed')
            foreach ($polozka in $balicky) {
                if ($vypis -notmatch "(?m)^$([regex]::Escape($polozka.id))\s+$([regex]::Escape($polozka.verze))(?:\s+from\s+|\s*$)") {
                    throw "Obnovený Dart nástroj $($polozka.id) není v seznamu dart installed."
                }
            }
            Write-Host "Dart spouštěče najdete v $(Join-Path $cilInstall 'bin')."
            break
        }
        $cilCache = if ($env:PUB_CACHE) { $env:PUB_CACHE } elseif ($IsWindows) { Join-Path $env:LOCALAPPDATA 'Pub/Cache' } else { Join-Path $env:HOME '.pub-cache' }
        $balicky = if ($Rozsah -eq 'Globalni') { @(Polozky-Archivu $popis) } else { @() }
        $spoustece = @(foreach ($polozka in $balicky) {
            foreach ($spoustec in @($polozka.spoustece)) {
                if ($spoustec) { @{ id = $polozka.id; jmeno = $spoustec.jmeno; skript = $spoustec.skript } }
            }
        })
        if ($Rozsah -eq 'Globalni') {
            foreach ($spoustec in $spoustece) {
                $cil = Join-Path (Join-Path $cilCache 'bin') "$($spoustec.jmeno).bat"
                if (Test-Path -LiteralPath $cil) { throw "Cílový spouštěč už existuje: $cil" }
            }
        }
        New-Item -ItemType Directory -Path $cilCache -Force | Out-Null
        $oblasti = if ($Rozsah -eq 'Globalni') { @('hosted','hosted-hashes','git','global_packages') } else { @('hosted','hosted-hashes','git') }
        Sluc-Soubory (Join-Path $Archiv 'pub-cache') $cilCache $oblasti
        $env:PUB_CACHE = $cilCache
        if ($Rozsah -eq 'Lokalni') {
            Push-Location $Projekt
            try { Spust $popis.prikaz @('pub','get','--offline','--enforce-lockfile'); Spust $popis.prikaz @('pub','deps') } finally { Pop-Location }
        } else {
            $vypis = Vystup 'dart' @('pub','global','list')
            foreach ($polozka in $balicky) {
                if ($vypis -notmatch "(?m)^$([regex]::Escape($polozka.id))\s+$([regex]::Escape($polozka.verze))\s*$") {
                    throw "Obnovená pub cache neobsahuje $($polozka.id) $($polozka.verze)."
                }
            }
            $bin = Join-Path $cilCache 'bin'
            New-Item -ItemType Directory -Path $bin -Force | Out-Null
            foreach ($spoustec in $spoustece) {
                $cil = Join-Path $bin "$($spoustec.jmeno).bat"
                if (Test-Path -LiteralPath $cil) { throw "Cílový spouštěč už existuje: $cil" }
                $obsah = "@echo off`r`nfor %%I in (`"%~dp0..`") do set `"PUB_CACHE=%%~fI`"`r`ndart pub global run $($spoustec.id):$($spoustec.skript) %*`r`nexit /b %errorlevel%`r`n"
                Set-Content -LiteralPath $cil -Value $obsah -Encoding ascii -NoNewline
            }
            Write-Host "Příkazové spouštěče najdete v $(Join-Path $env:PUB_CACHE 'bin')."
        }
    }
}
Write-Host 'Obnova dokončena. Archiv zůstává zachován; případný úklid spusťte zvlášť akcí Uklid.'
} finally {
    foreach ($nazev in $puvodniProstredi.Keys) {
        if ($null -eq $puvodniProstredi[$nazev]) {
            Remove-Item -LiteralPath "Env:$nazev" -ErrorAction SilentlyContinue
        } else {
            [Environment]::SetEnvironmentVariable($nazev, $puvodniProstredi[$nazev], 'Process')
        }
    }
}
