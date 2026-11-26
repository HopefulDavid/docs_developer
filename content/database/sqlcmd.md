---
description: "Spuštění seřazených SQL skriptů dávkou, zastavení při chybě a kontrola výsledku."
---

# sqlcmd – spuštění SQL skriptů ze složky

Dávkový soubor umožní opakovat zkontrolovanou sadu SQL skriptů ve stanoveném pořadí.

## Před použitím

Následující dávka je pro ručně zkontrolované skripty v testovací databázi a nainstalovaný `sqlcmd` s přihlášením Windows.

Soubory se pojmenují například `001-schema.sql` a `002-data.sql`, aby řazení podle názvu odpovídalo požadovanému pořadí.

Soubor `run-sql.cmd` leží vedle nich a upravují se v něm dvě konfigurační hodnoty.

```cmd
@echo off
setlocal
rem Pouze server a testovaci databaze, ktere se maji upravit.
set "SQL_SERVER=localhost"
set "SQL_DATABASE=MojeTestovaciDatabaze"
rem Prepnuti do slozky skriptu zabrani pouziti souboru z jineho adresare.
pushd "%~dp0" || exit /b 1
if not exist "*.sql" (
  echo Ve slozce nejsou SQL skripty.
  popd
  exit /b 1
)
for /f "delims=" %%G in ('dir /b /a-d /on *.sql') do (
  echo Spoustim %%G
  sqlcmd -S "%SQL_SERVER%" -d "%SQL_DATABASE%" -E -b -i "%%G"
  if errorlevel 1 (
    echo Chyba: dalsi skripty se nespusti.
    popd
    exit /b 1
  )
)
popd
exit /b 0
```

`-S` určuje server, `-d` databázi, `-E` použije identitu Windows, `-i` načte soubor a `-b` způsobí chybový návratový kód při odpovídající SQL chybě.

`%%G` patří do dávkového souboru.

Při ručním zápisu smyčky přímo do CMD se používá `%G`.

Chyba zastaví další skripty, ale nevrátí dříve potvrzené změny.

Transakce a opakovatelnost musí řešit samotné SQL nebo migrační nástroj.

Po spuštění se kontrolují očekávané tabulky a data, ne pouze návratový kód.

Při SQL autentizaci nepatří heslo do dávky ani do parametru `-P`, který ho zanechá v historii.

Způsob přihlášení a TLS popisuje [dokumentace použité varianty sqlcmd](https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility).
