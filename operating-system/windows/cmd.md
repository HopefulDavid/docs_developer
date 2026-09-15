---
description: "Základní orientace v CMD, soubory, proměnné a dávkové skripty."
---

# CMD – příkazový řádek Windows

CMD spouští příkazy Windows a dávkové soubory `.cmd` nebo `.bat`.

Jeho syntaxe používá například `%PROMENNA%` a není zaměnitelná s PowerShellem ani Bashem.

## Začni ve správné složce

Otevři profil **Příkazový řádek** ve Windows Terminalu nebo spusť `cmd.exe`.

```cmd
rem Vypise aktualni slozku a jeji obsah.
cd
dir
rem /d prejde i na jinou jednotku; cestu nahrad vlastnim projektem.
cd /d "C:\projekty\moje-aplikace"
```

Při neexistující cestě oprav název.

Další příkazy jinak zůstanou v předchozí složce.

## Nejčastější operace

| Syntaxe CMD | Účinek |
|---|---|
| `dir [<cesta>]` | Vypíše obsah složky |
| `dir /a /x [<cesta>]` | Zahrne skryté položky a existující krátké názvy |
| `cd /d "<cesta>"` | Změní složku i jednotku |
| `mkdir "<složka>"` | Vytvoří složku |
| `copy "<zdroj>" "<cíl>"` | Zkopíruje soubor. Zkontroluj případné přepsání cíle |
| `type "<soubor>"` | Vypíše textový obsah |
| `where.exe <program>` | Vyhledá program v cestách |
| `<příkaz> /?` | U většiny vestavěných příkazů zobrazí nápovědu |

Mazání souboru a celé složky se liší.

Použij [cílený postup](cannot-delete-item.md#cmd-rozlišení-souboru-a-složky).

## Proměnné a přesměrování

```cmd
set "PROJECT_NAME=moje-aplikace"
echo %PROJECT_NAME%
dir /b > soubory.txt
```

`set` nastaví proměnnou pro aktuální proces, `echo` ji vypíše a `>` přepíše výstupní soubor seznamem názvů.

`>>` by připojovalo na konec a `|` předává textový výstup dalšímu příkazu.

Použij nový výstupní soubor, protože přesměrování může bez dalšího dotazu nahradit jeho obsah.

## Malý opakovatelný skript

Do nové složky ulož `seznam.cmd`:

```cmd
@echo off
setlocal
rem Zacni ve slozce tohoto skriptu; pri neuspechu okamzite skonci.
pushd "%~dp0" || exit /b 1
dir /b
popd
exit /b 0
```

Spusť `seznam.cmd` v CMD.

Skript vypíše obsah své složky, vrátí původní pracovní adresář a oznámí úspěch kódem `0`.

`@echo off` skryje vypisování samotných příkazů, `setlocal` omezí změny prostředí a `%~dp0` označuje disk a cestu dávky.

Nenulový návrat signalizuje chybu podle použitého programu.

V dávce `if errorlevel 1` kontroluje hodnotu alespoň jedna.

Ve smyčce dávkového souboru se používá například `%%G`, zatímco stejná ručně zadaná smyčka v CMD používá `%G`.

Pro konkrétní databázový postup pokračuj na [spouštění SQL souborů přes sqlcmd](../../database/sqlcmd.md).

## Kontrola a optimalizace disku

Windows běžně zajišťuje plánovanou údržbu přes **Defragmentovat a optimalizovat jednotky**.

Pokud potřebuješ ruční analýzu, v CMD jako správce:

```cmd
defrag C: /A /V
```

`/A` jen analyzuje a `/V` vypíše podrobnosti.

`C:` nahraď skutečně kontrolovanou jednotkou.

Pro vědomě požadovanou optimalizaci `defrag C: /O /U` nechá Windows zvolit postup podle typu média a zobrazí průběh.

Písmeno jednotky neurčuje SSD/HDD a TRIM nepředstavuje bezpečné vymazání dat.

Zdroje: [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd), [set](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1), [defrag](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/defrag).
