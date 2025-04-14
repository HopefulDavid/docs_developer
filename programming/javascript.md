## Balíčky

<details>
<summary><span style="color:#1E90FF;">Globální balíčky</span></summary>

- Umístění windows: C:\Users\<user>\AppData\Roaming\npm\node_modules

  ```bash
  npm root -g
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Záloha</span></summary>

```bash
# Cesta k souboru se seznamem balíčků v aktuální pracovní složce
$packageListFilePath = Join-Path -Path $PWD.Path -ChildPath 'npm_global_packages.txt'

# Cesta k složce, kde se mají balíčky uložit
$outputFolder = Join-Path -Path $PWD.Path -ChildPath 'offline_packages'

# Záloha globálních balíčků do souboru npm_global_packages.txt
Write-Host "Zálohuji seznam globálních balíčků..." -ForegroundColor Cyan
npm list -g --depth=0 | Out-File -FilePath $packageListFilePath -Encoding utf8

# Kontrola existence souboru se seznamem balíčků
if (!(Test-Path -Path $packageListFilePath)) {
    Write-Host "Soubor $packageListFilePath nebyl nalezen. Zkontrolujte, zda je správně vygenerován." -ForegroundColor Red
    throw "Soubor neexistuje."
}

# Vytvoření složky pro offline balíčky, pokud neexistuje
if (!(Test-Path -Path $outputFolder)) {
    Write-Host "Vytvářím složku pro offline balíčky: $outputFolder" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
}

# Načítání obsahu souboru
Write-Host "Načítám seznam balíčků z $packageListFilePath..." -ForegroundColor Cyan
$content = Get-Content -Path $packageListFilePath

# Přeskočení první řádky (pokud je soubor ve formátu, který obsahuje hlavičku)
$content = $content | Select-Object -Skip 1

# Inicializace počítadel
$totalPackages = 0
$successfulPackages = 0
$failedPackages = 0

# Zpracování každé řádky v souboru
foreach ($line in $content) {
    # Odstranění přebytečných znaků na začátku řádky
    $line = $line.Trim() -replace '^[+`-]+\s*', ''

    # Pokud je řádek prázdný nebo neobsahuje jméno balíčku, přeskočíme ho
    if ([string]::IsNullOrWhiteSpace($line)) {
        continue
    }

    # Rozdělení řádky pomocí '@' na jméno balíčku a verzi
    $parts = $line -split '@'
    $packageName = $parts[0].Trim()
    $version = if ($parts.Length -gt 1) { $parts[1].Trim() } else { '' }

    # Ověření, že balíček není součástí seznamu výjimek
    if ($packageName -in @("globalpackages.txt", "npm_global_packages.txt")) {
        continue
    }

    # Připravit cestu k balíčku
    $packageDir = Join-Path -Path $outputFolder -ChildPath $packageName
    if (!(Test-Path -Path $packageDir)) {
        Write-Host "Vytvářím složku pro balíček: $packageName" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $packageDir | Out-Null
    }

    # Stáhnout balíček s verzí, pokud je specifikována
    $totalPackages++
    $downloadSuccess = $false
    try {
        if ($version) {
            Write-Host "Stahuji balíček: $packageName@$version" -ForegroundColor Green
            $npmOutput = npm pack "$packageName@$version" --pack-destination $packageDir 2>&1
        } else {
            Write-Host "Stahuji balíček: $packageName" -ForegroundColor Green
            $npmOutput = npm pack $packageName --pack-destination $packageDir 2>&1
        }

        # Kontrola výstupu npm pro chyby
        if ($npmOutput -match "404 Not Found") {
            Write-Host "Chyba: Balíček $packageName nebyl nalezen v npm registry." -ForegroundColor Red
            $downloadSuccess = $false
        } elseif ($npmOutput -match "npm ERR") {
            Write-Host "Chyba při stahování balíčku: $packageName" -ForegroundColor Red
            $downloadSuccess = $false
        } else {
            $downloadSuccess = $true
        }
    } catch {
        Write-Host "Chyba při stahování balíčku: $packageName - $($_.Exception.Message)" -ForegroundColor Red
    }

    # Pokud se stahování neprovede, zvyšujeme počet neúspěšných balíčků
    if ($downloadSuccess) {
        Write-Host "Úspěšně staženo: $packageName" -ForegroundColor Green
        $successfulPackages++
    } else {
        Write-Host "Neúspěšně staženo: $packageName" -ForegroundColor Red
        $failedPackages++
    }

    # Pokud balíček obsahuje package.json, stáhnout závislosti
    $packageJsonPath = Join-Path -Path $packageDir -ChildPath 'package.json'
    if (Test-Path -Path $packageJsonPath) {
        Write-Host "Stahuji závislosti pro balíček: $packageName" -ForegroundColor Cyan
        $dependencies = (Get-Content -Path $packageJsonPath | ConvertFrom-Json).dependencies
        foreach ($dependency in $dependencies.Keys) {
            Write-Host "Stahuji závislost: $dependency" -ForegroundColor Cyan
            try {
                npm pack $dependency --pack-destination $packageDir
            }
            catch {
                Write-Host "Chyba při stahování závislosti ${dependency} pro balíček ${packageName}: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}

# Výpis výsledků
Write-Host "Zálohování dokončeno." -ForegroundColor Cyan
Write-Host "Úspěšně zálohováno: $successfulPackages z $totalPackages balíčků." -ForegroundColor Green
Write-Host "Neúspěšně zálohováno: $failedPackages balíčků." -ForegroundColor Red
```

</details>

<details>
<summary><span style="color:#1E90FF;">Obnova</span></summary>

```bash
# Cesta k složce s offline balíčky
$packageFolder = Join-Path -Path $PWD.Path -ChildPath 'offline_packages'
$installBaseFolder = Join-Path -Path $PWD.Path -ChildPath 'Installed'

# Kontrola, zda složka existuje
if (!(Test-Path -Path $packageFolder)) {
    Write-Host "Složka s offline balíčky nebyla nalezena: $packageFolder" -ForegroundColor Red
    exit
}

# Vytvoření složky pro instalaci, pokud ještě neexistuje
if (!(Test-Path -Path $installBaseFolder)) {
    Write-Host "Vytvářím složku pro instalaci: $installBaseFolder" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $installBaseFolder
}

# Získání všech .tgz souborů v dané složce a podadresářích
$tgzFiles = Get-ChildItem -Path $packageFolder -Filter *.tgz -Recurse

if ($tgzFiles.Count -eq 0) {
    Write-Host "Nebyl nalezen žádný .tgz soubor v složce $packageFolder. Zkontrolujte, že máte offline balíčky připravené." -ForegroundColor Red
    exit
}

# Inicializace počítadel
$totalPackages = $tgzFiles.Count
$successfulPackages = 0
$failedPackages = 0

# Instalace každého .tgz souboru
foreach ($tgzFile in $tgzFiles) {
    Write-Host "Instaluji balíček: $($tgzFile.Name)" -ForegroundColor Cyan

    # Extrahování názvu balíčku z názvu souboru .tgz
    $packageName = [System.IO.Path]::GetFileNameWithoutExtension($tgzFile.Name)

    # Vytvoření složky pro instalaci, pokud ještě neexistuje
    $installDir = Join-Path -Path $installBaseFolder -ChildPath $packageName
    if (!(Test-Path -Path $installDir)) {
        Write-Host "Vytvářím složku pro instalaci: $installDir" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $installDir
    }

    # Instalace balíčku pomocí .tgz souboru
    try {
        Write-Host "Instaluji balíček z $($tgzFile.FullName)..." -ForegroundColor Green
        npm install --prefix $installDir $tgzFile.FullName
        Write-Host "Balíček $packageName byl úspěšně nainstalován." -ForegroundColor Green
        $successfulPackages++
    }
    catch {
        Write-Host "Chyba při instalaci balíčku $packageName z $($tgzFile.FullName): $_" -ForegroundColor Red
        $failedPackages++
        continue
    }

    # Pokud balíček obsahuje závislosti (package.json), pokusíme se stáhnout a nainstalovat je offline
    $packageJsonPath = Join-Path -Path $installDir -ChildPath "node_modules\$packageName\package.json"

    if (Test-Path -Path $packageJsonPath) {
        Write-Host "Balíček $packageName obsahuje závislosti. Stahuji je..." -ForegroundColor Cyan

        # Načteme závislosti z package.json
        $dependencies = (Get-Content -Path $packageJsonPath | ConvertFrom-Json).dependencies
        if ($dependencies) {
            foreach ($dependency in $dependencies.Keys) {
                $dependencyPackagePath = Join-Path -Path $packageFolder -ChildPath "$dependency-*.tgz"

                if (Test-Path -Path $dependencyPackagePath) {
                    Write-Host "Instaluji závislost: $dependency" -ForegroundColor Cyan
                    npm install --prefix $installDir $dependencyPackagePath
                } else {
                    Write-Host "Závislost $dependency není k dispozici pro offline instalaci!" -ForegroundColor Red
                }
            }
        }
    }
}

# Výpis výsledků
Write-Host "Všechny balíčky byly úspěšně nainstalovány z offline záloh." -ForegroundColor Cyan
Write-Host "Úspěšně nainstalováno: $successfulPackages z $totalPackages balíčků." -ForegroundColor Green
Write-Host "Neúspěšně nainstalováno: $failedPackages balíčků." -ForegroundColor Red
```

## Aplikační balíčky

<details>
<summary><span style="color:#1E90FF;">conventional-changelog-cli</span></summary>

Slouží k automatickému generování changelogu na základě commit zpráv.

1. Instalace balíčku.

    ```bash
    npm install -g conventional-changelog-cli
    ```

2. Generování changelogu.

    ```bash
    conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md -s
    ```
   
   | Parameter         | Popis                                                                                   |
   |-------------------|-----------------------------------------------------------------------------------------|
   | `-p` / `--preset` | Přednastavený styl changelogu, např. `angular`, `eslint`, `conventionalcommits`.        |
   | `-i` / `--infile` | Vstupní soubor pro generování changelogu (např. `CHANGELOG.md`).                        |
   | `-o` / `--outfile`| Výstupní soubor pro generování changelogu.                                              |
   | `-r` / `--release-count` | Počet posledních verzí, pro které bude changelog generován.                      |
   | `--context`       | JSON nebo JS soubor obsahující vlastní kontext pro šablonu changelogu.                  |
   | `--pkg`           | Cesta k `package.json`, může být použita pro čtení verzí a dalších údajů.               |
   | `--append`        | Přidá změny na konec souboru místo přepsání celého obsahu.                              |
   | `--same-file`     | Přepíše stejný soubor bez použití dočasného souboru.                                    |
   | `--tag-prefix`    | Přidá prefix k tagům verzí (např. `v`).                                                 |
   | `-n` / `--config` | Vlastní konfigurační soubor, který přizpůsobí generování changelogu.                    |

   > [!TIP]
   > Použití vlastní šablony pro generování changelogu.
   >
   > ```bash
   > conventional-changelog -i index.md -s --config ./changelog-config.js
   > ```
   >
   > [Příklad konfigurace s emoji](../images/changelog-config.js)
   >
   > [Příklad konfigurace bez emoji](../images/changelog-config-noEmojis.js) 

</details>