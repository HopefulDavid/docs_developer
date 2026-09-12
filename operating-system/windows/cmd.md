# Windows CMD: dávkové skripty a správa disků

CMD je příkazový interpret Windows, ve kterém příkazy pracují převážně s textem a návratovými kódy.

Soubor `.cmd` nebo `.bat` umožňuje opakovat stejnou posloupnost; jeho syntaxe se liší od [PowerShellu](powershell.md).

## Před použitím

Otevři **Příkazový řádek** nebo profil CMD ve Windows Terminalu a ověř aktuální složku.

```cmd
rem cd bez parametru vypise aktualni slozku; dir zobrazi jeji obsah.
cd
dir
rem /d zmeni soucasne slozku i jednotku; cestu nahrad svym projektem.
cd /d "C:\projekty\moje-aplikace"
```

Cesty s mezerami piš do uvozovek a oprávnění správce používej jen pro operace, které je vyžadují.

## Spouštění SQL skriptů ze složky

Následující dávka je pro ručně zkontrolované skripty v testovací databázi a nainstalovaný `sqlcmd` s přihlášením Windows.

Soubory pojmenuj například `001-schema.sql` a `002-data.sql`, aby řazení podle názvu odpovídalo požadovanému pořadí.

Ulož `run-sql.cmd` vedle nich a uprav dvě konfigurační hodnoty.

```cmd
@echo off
setlocal
rem Zmen pouze na server a testovaci databazi, ktere chces upravit.
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

`%%G` patří do dávkového souboru; při ručním zápisu smyčky přímo do CMD se používá `%G`.

Chyba zastaví další skripty, ale nevrátí dříve potvrzené změny; transakce a opakovatelnost musí řešit samotné SQL nebo migrační nástroj.

Po spuštění ověř očekávané tabulky a data, ne pouze návratový kód.

Při SQL autentizaci neukládej heslo do dávky ani nepoužívej `-P` s heslem v historii; způsob přihlášení a TLS nastav podle [dokumentace své varianty sqlcmd](https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility).

## Optimalizace disků ve Windows

Windows má plánovanou údržbu v aplikaci **Defragmentovat a optimalizovat jednotky**.

Písmeno jednotky neurčuje, zda jde o SSD nebo HDD, a TRIM není bezpečné vymazání dat.

Pro ruční diagnostiku spusť CMD jako správce.

```cmd
rem /A pouze analyzuje vybranou jednotku, /V vypise podrobnosti.
defrag C: /A /V
```

Pokud je ruční optimalizace potřebná, nech Windows zvolit postup podle typu média.

```cmd
rem /O zvoli vhodnou optimalizaci, /U ukazuje prubeh.
defrag C: /O /U
```

`C:` nahraď konkrétní zamýšlenou jednotkou a zachovej běžnou plánovanou údržbu, pokud nemáš důvod ji měnit.

Podporované volby a pravidla údržby SSD popisuje [Microsoft: defrag](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/defrag).

## Odstranění souborů a složek

Rozlišení `del` a `rd`, rozšířené cesty a kontrolu cíle vlastní návod [nelze odstranit soubor nebo složku](cannot-delete-item.md#cmd-rozlišení-souboru-a-složky).
