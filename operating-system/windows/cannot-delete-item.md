# Windows – nelze odstranit soubor nebo složku

> Postup při chybě „Položka nebyla nalezena“, rozlišení příkazů CMD a PowerShellu a odstranění položek s problematickým názvem.

Pokud Průzkumník hlásí, že položka už není v daném umístění, samotná zpráva ještě neurčuje příčinu.

Může jít o neobnovený seznam, nesprávnou cestu nebo název, se kterým běžné rozhraní Windows neumí pracovat.

## Nejdříve ověř položku a prostředí

1. Zavři chybové okno a obnov složku klávesou **F5**; pokud položka zmizí, další mazání není potřeba.
2. Pokud zůstane, ověř v adresním řádku její nadřazenou složku a zjisti, zda jde o soubor, nebo adresář.
3. Zavři aplikaci, která položku může používat, a vyber postup pro svůj příkazový interpret níže.

Windows Terminal může obsahovat PowerShell i CMD, takže samotný vzhled okna nerozhoduje.

| Prostředí | Jak ho otevřít | Příkazy v tomto návodu |
|---|---|---|
| PowerShell | Vyber profil Windows PowerShell nebo PowerShell v terminálu | `Get-ChildItem`, `Get-Item`, `Remove-Item` |
| CMD | V adresním řádku Průzkumníku napiš `cmd` a stiskni Enter | `dir`, `del`, `rd` |

V PowerShellu jsou `del` a `rd` aliasy pro `Remove-Item`, proto do něj nekopíruj přepínače CMD jako `/f`, `/s` nebo `/q`.

> [!WARNING]
> Následující příkazy mažou přímo a nepřesouvají položky do Koše.
>
> Cesty `C:\Data\Ukazka`, názvy souborů a složek jsou pouze příklady: před mazáním je nahraď a ověř, že označují přesně zamýšlený cíl.
>
> Rekurzivní odstranění smaže celou zvolenou složku včetně obsahu; kvůli jedinému chybnému souboru tak nemaž jeho nadřazenou složku, pokud chceš ostatní data zachovat.

## PowerShell: kontrola a odstranění

Nejprve vypiš nadřazenou složku včetně skrytých položek a zkontroluj úplnou cestu cíle:

```text
Get-ChildItem -LiteralPath 'C:\Data\Ukazka' -Force
Get-Item -LiteralPath 'C:\Data\Ukazka\ProblemovaSlozka' -Force |
    Select-Object FullName, PSIsContainer, Attributes
```

Hodnota `PSIsContainer` je u adresáře `True` a u souboru `False`.

Pokud ověření cesty skončí chybou, nepokračuj mazáním odhadnutého názvu a přejdi k [diagnostice v CMD](#cmd-rozlišení-souboru-a-složky).

Pro **složku**, jejíž celý obsah chceš odstranit, nejprve zobraz obsah a náhled operace:

```text
Get-ChildItem -LiteralPath 'C:\Data\Ukazka\ProblemovaSlozka' -Force
Remove-Item -LiteralPath 'C:\Data\Ukazka\ProblemovaSlozka' -Recurse -Force -WhatIf
```

`-WhatIf` nic nemaže, ale není zárukou, že skutečné odstranění později proběhne bez chyby.

Po kontrole cíle spusť odstranění s potvrzením:

```text
Remove-Item -LiteralPath 'C:\Data\Ukazka\ProblemovaSlozka' -Recurse -Force -Confirm
```

Pro **jednotlivý soubor** použij jeho přesnou cestu a vynech `-Recurse`:

```text
Remove-Item -LiteralPath 'C:\Data\Ukazka\problem.txt' -Force -Confirm
```

`-LiteralPath` zachází s cestou doslovně, takže například hranaté závorky v názvu nejsou zástupným vzorem.

`-Force` umožňuje odstranit také skryté položky nebo soubory jen pro čtení, ale neobchází přístupová oprávnění. ([Microsoft: Remove-Item](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-item))

## CMD: rozlišení souboru a složky

Následující příkazy zadávej v samostatném **CMD**, nikoli do PowerShellu.

Přejdi do nadřazené složky a ověř výpis:

```text
cd /d "C:\Data\Ukazka"
dir /a /x
```

`cd /d` změní složku i jednotku; při mazání adresáře nesmíš mít tento adresář ani jeho podsložku jako aktuální pracovní složku.

Přepínač `/a` zahrne skryté a systémové položky a `/x` zobrazí také existující krátké názvy 8.3. ([Microsoft: dir](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/dir))

U běžné složky výpis uvádí `<DIR>`, zatímco u souboru zobrazuje velikost.

Pro **soubor** použij jeho přesný název a potvrď jeho odstranění:

```text
del /f /p "problem.txt"
```

`/f` umožní smazat soubor jen pro čtení a `/p` vyžádá potvrzení.

Pro **celou složku včetně obsahu** nejprve zkontroluj obsah a potom použij `rd`:

```text
dir /a "ProblemovaSlozka"
rd /s "ProblemovaSlozka"
```

Přepínač `/s` zahrnuje všechny podsložky a soubory; `/q` by potlačil potvrzení, proto jej tento ruční postup nepoužívá. ([Microsoft: rd](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/rd))

Příkaz `del` neodstraní samotný adresář: pokud mu předáš cestu ke složce, může smazat soubory uvnitř, proto jej nepoužívej jako náhradu za `rd`. ([Microsoft: del](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/del))

### Použití krátkého názvu

Pokud `dir /a /x` u problematické položky ukáže krátký název, například `PROBLE~1.TXT`, můžeš jej v odpovídajícím příkazu výše použít místo dlouhého názvu.

Převezmi přesně název z výpisu včetně případné přípony a ověř, ke které položce patří; nevymýšlej jej podle příkladu a nepoužívej zástupné znaky `*` nebo `?`.

Krátký název nemusí existovat, protože jeho vytváření může být vypnuté. ([Microsoft: krátké a dlouhé názvy](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#short-vs-long-names))

## CMD: problematický název nebo dlouhá cesta

Pokud běžná cesta selže, může pomoci úplná cesta s předponou `\\?\`, zejména u dlouhé cesty nebo názvu končícího tečkou či mezerou.

Předpona mění zpracování cesty v podporujících Windows API; neposkytuje vyšší oprávnění a není univerzálním řešením každé chyby při mazání. ([Microsoft: názvy a jmenné prostory cest](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#win32-file-namespaces))

V CMD nejprve ověř nadřazenou složku a obsah přesné cílové složky:

```text
dir /a /x "\\?\C:\Data\Ukazka"
dir /a "\\?\C:\Data\Ukazka\ProblemovaSlozka"
```

Teprve pokud výpis odpovídá složce, kterou chceš odstranit **celou**, spusť:

```text
rd /s "\\?\C:\Data\Ukazka\ProblemovaSlozka"
```

Pro samostatný soubor použij `del /f /p` s jeho úplnou cestou obsahující stejnou předponu.

Cesta za `\\?\` musí být úplná a přesná včetně případné koncové tečky nebo mezery; nepřepisuj ji na relativní cestu s `.` či `..`.

Podpora rozšířených cest se mezi nástroji liší, proto tyto příklady nepřenášej automaticky do jiné aplikace.

## Ověření výsledku a další chyby

Po odstranění znovu vypiš nadřazenou složku a v Průzkumníku stiskni **F5**.

**PowerShell:**

```text
Get-ChildItem -LiteralPath 'C:\Data\Ukazka' -Force
```

**CMD:**

```text
dir /a "C:\Data\Ukazka"
```

U problematických názvů zopakuj také výpis s předponou `\\?\` z předchozího kroku.

Úspěch znamená, že cílová položka ve výpisu chybí a ostatní zamýšlená data zůstala na místě.

Pokud se objeví další chyba, zapiš její přesné znění a nepokračuj plošným mazáním nadřazených složek.

| Chyba nebo stav | Další krok |
|---|---|
| Parametr `/f`, `/s` nebo `/q` není rozpoznán | Ověř, zda jsi nezadal příkaz CMD do PowerShellu |
| Přístup byl odepřen | Ověř oprávnění k přesné položce; `-Force` ani `\\?\` je neobcházejí |
| Soubor používá jiný proces | Zavři příslušnou aplikaci a ověř, že cílovou složku nepoužívá některý terminál |
| Položka se po odstranění znovu objeví | Zjisti, zda ji znovu nevytváří běžící aplikace nebo synchronizační služba |
| Přesný výpis stále selhává nebo se objeví chyba disku | Nejprve chraň zbývající data a pokračuj diagnostikou podle konkrétní chyby |
