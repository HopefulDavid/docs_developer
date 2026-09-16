---
description: "Rozlišení zamčeného souboru, oprávnění a chybné cesty před přesným odstraněním."
---

# Windows – soubor nebo složka nejde odstranit

Chybové hlášení nejprve použij k určení příčiny.

Větší síla mazacího příkazu neřeší všechny případy.

## Rozhodni podle projevu

| Projev | První krok |
|---|---|
| „Položka nebyla nalezena“ | Obnov Průzkumník přes F5 a ověř skutečný název i nadřazenou cestu |
| Soubor používá jiný proces | Zavři danou aplikaci a terminály v mazané složce |
| Přístup odepřen | Ověř vlastníka a oprávnění k přesné položce |
| Položka se vrací | Zjisti, která aplikace nebo synchronizace ji vytváří |
| Chyba disku | Nejprve chraň data a řeš úložiště |

Následující příkazy mažou přímo, bez přesunu do Koše.

Celou složku maž pouze tehdy, když je jejím zamýšleným odstraněním i veškerý obsah.

## Vyber nástroj pro odstranění

Pokračuj pouze ve zvoleném shellu a ověř cíl přímo v něm.

<a id="powershell-kontrola-a-odstranění"></a>
<a id="cmd-rozlišení-souboru-a-složky"></a>
<a id="cmd-problematický-název-nebo-dlouhá-cesta"></a>

## [PowerShell](#tab/remove-powershell)

Nahraď cestu skutečnou položkou a nejprve ji pouze prohlédni:

```powershell
$itemPath = 'C:\Data\Ukazka\ProblemovaSlozka'
Get-Item -LiteralPath $itemPath -Force |
    Select-Object FullName, PSIsContainer, Attributes
```

`PSIsContainer: True` označuje adresář.

Při chybě výpisu nepokračuj s odhadnutým názvem.

Pro adresář ověř také obsah a náhled:

```powershell
Get-ChildItem -LiteralPath $itemPath -Force
Remove-Item -LiteralPath $itemPath -Recurse -WhatIf
```

`-WhatIf` nic neodstraní a `-LiteralPath` chápe název doslova včetně hranatých závorek.

Po potvrzení správné úplné cesty použij:

```powershell
Remove-Item -LiteralPath $itemPath -Recurse -Confirm
```

Pro jediný soubor nastav jeho přesnou cestu a vynech `-Recurse`.

Při potřebě odstranit skrytou položku nebo soubor jen pro čtení lze přidat `-Force`, který však neobchází ACL oprávnění.

## [CMD](#tab/remove-cmd)

**Rozlišení souboru a složky**

Tuto alternativu spouštěj v **CMD**, protože `del` a `rd` jsou v PowerShellu aliasy jiného příkazu.

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

Před `rd /s` prohlédni obsah přes `dir /a "<složka>"` a přejdi v terminálu mimo odstraňovanou složku.

Nepřebírej název typu `PROBLE~1` z ukázky.

Použij pouze skutečný krátký název z výpisu, pokud vůbec existuje.

**Problematický název nebo dlouhá cesta**

Úplná cesta s předponou `\\?\` může pomoci u nástrojem podporované rozšířené cesty, například názvu končícího tečkou.

```cmd
dir /a "\\?\C:\Data\Ukazka"
dir /a "\\?\C:\Data\Ukazka\ProblemovaSlozka."
```

Příklad končí tečkou, která je součástí skutečného názvu.

Ověř přesný výpis, nic automaticky neopravuj ani nezkracuj.

Jen pro takto ověřenou celou složku:

```cmd
rd /s "\\?\C:\Data\Ukazka\ProblemovaSlozka."
```

Předpona nezvyšuje oprávnění a vyžaduje úplnou cestu bez relativních `.` a `..`.

Pro samostatný soubor použij `del /p` s jeho přesnou rozšířenou cestou.

***

## Ověření výsledku

Znovu vypiš nadřazenou složku stejným nástrojem a obnov Průzkumník přes F5.

Úspěch znamená, že cílová položka zmizela a ostatní data zůstala.

Při další chybě postupuj podle jejího přesného znění.

Zdroje: [Remove-Item](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-item), [rd](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rd), [Windows cesty](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file).
