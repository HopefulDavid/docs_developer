---
description: "Rozlišení zamčeného souboru, oprávnění a chybné cesty před přesným odstraněním."
---

# Windows – soubor nebo složka nejde odstranit

Chybové hlášení nejprve určuje příčinu.

Větší síla mazacího příkazu neřeší všechny případy.

## Rozhodnutí podle projevu

| Projev | První krok |
|---|---|
| „Položka nebyla nalezena“ | Obnovení Průzkumníku přes F5 a kontrola skutečného názvu i nadřazené cesty |
| Soubor používá jiný proces | Zavření dané aplikace a terminálů v mazané složce |
| Přístup odepřen | Kontrola vlastníka a oprávnění k přesné položce |
| Položka se vrací | Zjištění, která aplikace nebo synchronizace ji vytváří |
| Chyba disku | Nejprve ochrana dat, potom řešení úložiště |

Následující příkazy mažou přímo, bez přesunu do Koše.

Celá složka se maže pouze tehdy, když se má odstranit i veškerý její obsah.

## Nástroj pro odstranění

Postup pokračuje pouze ve zvoleném shellu a cíl se ověřuje přímo v něm.

<a id="powershell-kontrola-a-odstranění"></a>
<a id="cmd-rozlišení-souboru-a-složky"></a>
<a id="cmd-problematický-název-nebo-dlouhá-cesta"></a>

## [PowerShell](#tab/remove-powershell)

Cesta se nahradí skutečnou položkou, která se nejprve pouze vypíše:

```powershell
$itemPath = 'C:\Data\Ukazka\ProblemovaSlozka'
Get-Item -LiteralPath $itemPath -Force |
    Select-Object FullName, PSIsContainer, Attributes
```

`PSIsContainer: True` označuje adresář.

Při chybě výpisu se nepokračuje s odhadnutým názvem.

U adresáře se ověří také obsah a náhled:

```powershell
Get-ChildItem -LiteralPath $itemPath -Force
Remove-Item -LiteralPath $itemPath -Recurse -WhatIf
```

`-WhatIf` nic neodstraní a `-LiteralPath` chápe název doslova včetně hranatých závorek.

Po potvrzení správné úplné cesty:

```powershell
Remove-Item -LiteralPath $itemPath -Recurse -Confirm
```

Jediný soubor se odstraní s jeho přesnou cestou a bez `-Recurse`.

Při potřebě odstranit skrytou položku nebo soubor jen pro čtení lze přidat `-Force`, který však neobchází ACL oprávnění.

## [CMD](#tab/remove-cmd)

**Rozlišení souboru a složky**

Tato alternativa se spouští v **CMD**, protože `del` a `rd` jsou v PowerShellu aliasy jiného příkazu.

```cmd
cd /d "C:\Data\Ukazka"
dir /a /x
```

`/a` zahrne skryté položky a `/x` ukáže existující krátké názvy 8.3.

`<DIR>` ve výpisu znamená adresář.

| Syntaxe CMD | Účinek |
|---|---|
| `del /p "<soubor>"` | Odstraní přesný soubor s potvrzením |
| `del /f /p "<soubor>"` | Zahrne i soubor jen pro čtení |
| `rd "<prázdná-složka>"` | Odstraní prázdnou složku |
| `rd /s "<složka>"` | Po potvrzení odstraní celou složku i obsah |

Před `rd /s` se obsah zkontroluje přes `dir /a "<složka>"` a terminál se přepne mimo odstraňovanou složku.

Název typu `PROBLE~1` z ukázky se nepřebírá.

Platí pouze skutečný krátký název z výpisu, pokud vůbec existuje.

**Problematický název nebo dlouhá cesta**

Úplná cesta s předponou `\\?\` může pomoci u nástrojem podporované rozšířené cesty, například názvu končícího tečkou.

```cmd
dir /a "\\?\C:\Data\Ukazka"
dir /a "\\?\C:\Data\Ukazka\ProblemovaSlozka."
```

Příklad končí tečkou, která je součástí skutečného názvu.

Rozhoduje přesný výpis, nic se automaticky neopravuje ani nezkracuje.

Jen pro takto ověřenou celou složku:

```cmd
rd /s "\\?\C:\Data\Ukazka\ProblemovaSlozka."
```

Předpona nezvyšuje oprávnění a vyžaduje úplnou cestu bez relativních `.` a `..`.

Samostatný soubor odstraní `del /p` s jeho přesnou rozšířenou cestou.

***

## Ověření výsledku

Nadřazená složka se znovu vypíše stejným nástrojem a Průzkumník se obnoví přes F5.

Úspěch znamená, že cílová položka zmizela a ostatní data zůstala.

Další chyba se řeší podle jejího přesného znění.

Zdroje: [Remove-Item](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-item), [rd](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rd), [Windows cesty](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file).
