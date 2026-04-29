# Správa npm balíčků

> Pro správu balíčků je potřeba mít nainstalovaný **Node.js** a **npm**.

---

<img src="./images/7021cbf6-ee66-45b6-903c-a751e0653eec.png" alt="" style="width: 40%; display: block; border-radius: 8px;">

## Aktualizace balíčků

<details>
<summary>Jak správně aktualizovat balíčky?</summary>

1. 🚀 **Aktualizace Storybook:**
   ```bash
   npx storybook@latest upgrade
   ```
_Použije nejnovější verzi Storybook a provede upgrade._

2. 🕵️ **Zjištění zastaralých balíčků:**
   ```bash
   npm outdated
   ```
   _Vypíše seznam balíčků, které mají novější verzi._

3. 🛠️ **Aktualizace konkrétních balíčků:**
   ```bash
   npm install vite@latest @sveltejs/vite-plugin-svelte@latest
   ```
   _Nainstaluje nejnovější verze vybraných balíčků._

> **Tip:** Po aktualizaci spusťte projekt a ověřte funkčnost. Některé aktualizace mohou vyžadovat úpravy v konfiguraci nebo kódu.

</details>

---

## Globální balíčky

<details>
<summary>Kde najdu globální balíčky?</summary>

| 🖥️ Operační systém | 📂 Umístění globálních balíčků                |
|--------------------|-----------------------------------------------|
| 🪟 Windows         | `C:\Users\<user>\AppData\Roaming\npm\node_modules` |
| 🐧 Mac/Linux       | `~/.npm-global/lib/node_modules`              |

🔍 **Zjištění cesty příkazem:**
```bash
npm root -g
```
</details>

---

## Záloha globálních balíčků

<details>
<summary>Jak zálohovat globální balíčky?</summary>

Tento PowerShell skript zálohuje seznam globálních balíčků a stáhne je pro offline použití.

```powershell
# Vytvoření cesty k souboru se seznamem balíčků
$packageListFilePath = Join-Path $PWD.Path 'npm_global_packages.txt'
$outputFolder = Join-Path $PWD.Path 'offline_packages'

# Uložení seznamu balíčků
npm list -g --depth=0 | Out-File $packageListFilePath -Encoding utf8

# Vytvoření složky pro balíčky
if (!(Test-Path $outputFolder)) { New-Item -ItemType Directory -Path $outputFolder | Out-Null }

# Načtení balíčků a stažení .tgz souborů
$content = Get-Content $packageListFilePath | Select-Object -Skip 1
foreach ($line in $content) {
    $line = $line.Trim() -replace '^[+`-]+\s*', ''
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line -split '@'
    $packageName = $parts[0].Trim()
    $version = if ($parts.Length -gt 1) { $parts[1].Trim() } else { '' }
    $packageDir = Join-Path $outputFolder $packageName
    if (!(Test-Path $packageDir)) { New-Item -ItemType Directory -Path $packageDir | Out-Null }
    if ($version) {
        npm pack "$packageName@$version" --pack-destination $packageDir
    } else {
        npm pack $packageName --pack-destination $packageDir
    }
}
```
</details>

---

## Obnova balíčků z offline zálohy

<details>
<summary>Jak obnovit balíčky ze zálohy?</summary>

Tento PowerShell skript nainstaluje všechny zálohované balíčky z offline složky.

```powershell
$packageFolder = Join-Path $PWD.Path 'offline_packages'
$installBaseFolder = Join-Path $PWD.Path 'Installed'

if (!(Test-Path $packageFolder)) { Write-Host "Složka s offline balíčky nebyla nalezena." -ForegroundColor Red; exit }
if (!(Test-Path $installBaseFolder)) { New-Item -ItemType Directory -Path $installBaseFolder }

$tgzFiles = Get-ChildItem $packageFolder -Filter *.tgz -Recurse
foreach ($tgzFile in $tgzFiles) {
    $packageName = [System.IO.Path]::GetFileNameWithoutExtension($tgzFile.Name)
    $installDir = Join-Path $installBaseFolder $packageName
    if (!(Test-Path $installDir)) { New-Item -ItemType Directory -Path $installDir }
    npm install --prefix $installDir $tgzFile.FullName
}
```
</details>

---

## Aplikační balíčky

<details>
<summary>conventional-changelog-cli</summary>

**Slouží k automatickému generování changelogu na základě commit zpráv.**

### Instalace
```bash
npm install -g conventional-changelog-cli
```

### Generování changelogu
```bash
conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md -s
```

| ⚙️ Parametr                | 💡 Význam                                                                 |
|---------------------------|--------------------------------------------------------------------------|
| `-p` / `--preset`         | Styl changelogu (`angular`, `eslint`, `conventionalcommits`)             |
| `-i` / `--infile`         | Vstupní soubor (např. `CHANGELOG.md`)                                    |
| `-o` / `--outfile`        | Výstupní soubor                                                          |
| `-r` / `--release-count`  | Počet verzí pro generování                                               |
| `--context`               | Vlastní kontext pro šablonu changelogu                                   |
| `--pkg`                   | Cesta k `package.json`                                                   |
| `--append`                | Přidá změny na konec souboru                                             |
| `--same-file`             | Přepíše stejný soubor                                                    |
| `--tag-prefix`            | Prefix k tagům verzí                                                     |
| `-n` / `--config`         | Vlastní konfigurační soubor                                              |

> **Tip:**
> Pro vlastní šablonu použijte:
> ```bash
> conventional-changelog -i index.md -s --config ./changelog-config.js
> ```

</details>