# Docker – záloha a obnova volume pomocí BusyBox

BusyBox poskytuje malé linuxové nástroje; pomocný kontejner může vytvořit archiv pojmenovaného Docker volume.

## Před použitím

Příklad používá PowerShell, linuxový Docker engine a **existující** volume `app_data`.

Zastav všechny procesy zapisující do volume; pro běžící databázi použij její nativní zálohu, nikoli prosté archivování souborů.

```powershell
docker volume inspect app_data
if ($LASTEXITCODE -ne 0) { throw 'Zdrojový volume neexistuje.' }
$backupPath = Join-Path $PWD.Path ('zaloha-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backupPath -ErrorAction Stop
```

Kontrola názvu brání nechtěné záloze nového prázdného volume; adresář s časem odděluje jednotlivé zálohy.

## Vytvoření archivu

```powershell
docker run --rm --mount type=volume,src=app_data,dst=/source,readonly --mount "type=bind,src=$backupPath,dst=/backup" busybox:1.37.0-glibc tar -czf /backup/app_data.tar.gz -C /source .
if ($LASTEXITCODE -ne 0) { throw 'Záloha selhala.' }
Get-FileHash -LiteralPath (Join-Path $backupPath 'app_data.tar.gz') -Algorithm SHA256
```

Zdroj se připojí pouze pro čtení, výstup patří hostiteli a `--rm` odstraní pouze pomocný kontejner.

`tar -czf` vytvoří komprimovaný archiv; `-C /source .` zahrne obsah včetně skrytých položek.

Běžný tar nezachová automaticky všechna rozšířená metadata nebo ACL; požadavky aplikace ověř samostatně. [Zálohy Docker volumes](https://docs.docker.com/engine/storage/volumes/#back-up-restore-or-migrate-data-volumes)

## Kontrola a zkušební obnova

```powershell
docker run --rm --mount "type=bind,src=$backupPath,dst=/backup,readonly" busybox:1.37.0-glibc tar -tzf /backup/app_data.tar.gz
if ($LASTEXITCODE -ne 0) { throw 'Archiv nelze přečíst.' }
```

Výpis potvrzuje čitelnost archivu; nenahrazuje test aplikace nad obnovenými daty.

Zvol dosud nepoužitý název obnovovacího volume:

```powershell
$restoreVolume = 'docs-restore-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
docker volume create $restoreVolume
if ($LASTEXITCODE -ne 0) { throw 'Obnovovací volume nevznikl.' }
docker run --rm --mount "type=volume,src=$restoreVolume,dst=/restore" --mount "type=bind,src=$backupPath,dst=/backup,readonly" busybox:1.37.0-glibc tar -xzf /backup/app_data.tar.gz -C /restore
if ($LASTEXITCODE -ne 0) { throw 'Obnova selhala.' }
```

Zkušební aplikaci připoj k novému volume a ověř známé soubory, vlastníky i chování; původní volume zůstává zachovaný.

## Co lze upravit

Změň název zdroje, záložní složku a image podle svého prostředí; cesty bind mountu se vyhodnocují na hostiteli Docker enginu.

Po testu a odpojení zkušební aplikace lze přes `docker volume rm $restoreVolume` odstranit pouze zkušební kopii.

Pro řízenou aktualizaci navazuje [upgrade stateful služby](safe-stateful-upgrade.md).
