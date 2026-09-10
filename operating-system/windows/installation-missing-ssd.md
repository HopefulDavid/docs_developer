# Instalátor Windows nevidí SSD – Intel RST a VMD

> Jak zpřístupnit interní SSD při instalaci Windows, vybrat kompatibilní ovladač a bezpečně odlišit cílový disk od instalačního USB.

Pokud instalátor nevidí SSD připojené přes Intel VMD, může mu chybět ovladač řadiče Intel Rapid Storage Technology (IRST/RST).

Chybějící ovladač se doplňuje přes **Načíst ovladač / Load driver** na obrazovce výběru disku; samotná nepřítomnost SSD v seznamu neznamená, že je disk vadný nebo že potřebuje formátování. ([Intel: načtení ovladače při instalaci](https://www.intel.com/content/www/us/en/support/articles/000091139/memory-and-storage.html))

Část věnovaná Intel RST/VMD platí pouze pro počítače s tímto řadičem; u jiného řadiče použij odpovídající ovladač doporučený výrobcem.

> [!WARNING]
> Pokud na cílovém SSD očekáváš důležitá data a instalátor ukazuje celý disk jako nepřidělené místo, nepokračuj v instalaci ani nevytvářej oddíly.
>
> Nové zápisy mohou zkomplikovat obnovu dat; nejprve vyřeš jejich zálohu nebo obnovu.

## Nejdříve rozliš příčinu

| Co vidíš | Jak situaci vyhodnotit | Další krok |
|---|---|---|
| SSD je uvedené v informacích o úložišti v UEFI/BIOS nebo v nabídce RST, ale v instalátoru chybí | Pravděpodobně chybí ovladač řadiče | Zjisti model počítače a načti odpovídající ovladač podle postupu níže |
| V instalátoru je pouze instalační USB | To nepotvrzuje dostupnost interního SSD | Porovnej seznam s firmwarem a ověř režim řadiče |
| SSD nenajdeš ani v informacích o úložišti ve firmwaru | Příčina nemusí být v instalátoru | Ověř správnou nabídku podle manuálu výrobce a diagnostiku SSD; bez dalšího důkazu neprováděj změny oddílů |
| SSD je vidět, ale instalátor hlásí chybu GPT/MBR | Jde o jiný problém než chybějící ovladač | Zapiš přesné znění chyby a řeš shodu režimu UEFI a rozdělení disku |

Seznam bootovacích položek není seznam fyzických disků: prázdné SSD nemusí mít položku **Windows Boot Manager**.

Chybu GPT/MBR řeš odděleně podle [dokumentace Microsoftu k režimu instalace](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11), vždy s ohledem na zachování dat.

## Příprava a správná edice Windows

Předem si poznamenej přesný model počítače ze štítku nebo UEFI/BIOS, model a kapacitu interního SSD a kapacitu instalačního USB.

Výrobce může na stránce podpory umožnit vyhledání přesné konfigurace podle sériového čísla nebo servisního identifikátoru.

Připrav si zálohu důležitých dat, funkční instalační USB a druhý počítač, na kterém lze stáhnout a rozbalit ovladač.

Nepotřebné externí disky před spuštěním instalace odpoj, aby se snížilo riziko záměny.

Pokud nevíš, zda zvolit **Home** nebo **Pro**, ověř původní licenci v dokladu o nákupu nebo v dosud funkčních Windows přes **Nastavení → Systém → O systému**.

Při přeinstalaci má edice odpovídat licenci; dostupnost SSD výběr edice neřeší. ([Microsoft: přeinstalace Windows](https://support.microsoft.com/en-US/Windows/Deployment/Install-Upgrade/reinstall-windows-with-the-installation-media))

## Načtení ovladače Intel RST/VMD

1. Na webu **výrobce počítače** otevři podporu přesného modelu nebo konfigurace a vyber instalovaný systém, například **Windows 11 64-bit**.
2. Vyhledej balíček označený **IRST**, **Intel Rapid Storage Technology**, **VMD** nebo **F6 storage driver**, který výrobce uvádí pro daný model.
3. ZIP rozbal a celou složku s ovladači zkopíruj na instalační USB nebo druhé USB, například do složky `Drivers\IRST`.
4. Zkontroluj, že složka obsahuje instalační soubory ovladače `.inf` a související `.sys` a `.cat`; nestačí samotný ZIP nebo běžný instalační program `.exe`.
5. V instalátoru Windows na obrazovce výběru cílového disku klikni na **Načíst ovladač / Load driver → Procházet / Browse**.
6. Vyber rozbalenou složku pro VMD, často `Drivers\VMD`, a ponech zapnuté skrytí ovladačů nekompatibilních s hardwarem.
7. Vyber kompatibilní ovladač řadiče **Intel RST VMD Controller**, potvrď **Další / Next** a počkej na obnovení seznamu disků.

Očekávaným výsledkem je nově viditelné interní SSD s odpovídající kapacitou.

Postup načtení rozbaleného ovladače potvrzují [Intel](https://www.intel.com/content/www/us/en/support/articles/000091139/memory-and-storage.html) a [znalostní báze Aceru](https://community.acer.com/en/kb/articles/13832-hard-disk-not-detected-during-windows).

Příklad Aceru se týká jiné generace hardwaru, takže jeho konkrétní označení řadiče nepřebírej pro svůj model.

### Když máš pouze SetupRST.exe

U balíčku Intel, který podporuje extrakci, otevři na funkčním počítači PowerShell ve složce se staženým souborem a použij:

```powershell
.\SetupRST.exe -extractdrivers .\RST-extracted
```

Na USB pak přenes vzniklou složku `RST-extracted` včetně podsložek.

Tento přepínač je určený pro `SetupRST.exe`; u jinak zabaleného ovladače od výrobce se řiď jeho návodem. ([Intel: rozbalení ovladače z EXE](https://www.intel.com/content/www/us/en/support/articles/000094664/technologies/intel-rapid-storage-technology-intel-rst.html))

### Jak rozlišit více nabízených ovladačů

Ovladač vybírej podle podporovaného hardwaru a režimu řadiče, nikoli podle pořadí řádků nebo nejvyššího čísla v názvu.

Hexadecimální kód zařízení uváděný u názvu řadiče **není verzí ovladače** a jeho číselné porovnání neurčuje novější nebo vhodnější balíček.

Windows přiřazuje ovladače pomocí identifikátorů hardwaru, například části `DEV_...` v PCI ID. ([Microsoft: identifikátory PCI zařízení](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/identifiers-for-pci-devices))

Pokud se objeví více kompatibilních řadičů a nevíš, který odpovídá zařízení, ověř model a pokyny výrobce; nevynucuj nekompatibilní ovladač vypnutím filtru.

Ve funkčních Windows lze ID zjistit ve **Správci zařízení → Vlastnosti řadiče → Podrobnosti → ID hardwaru**. ([Microsoft: identifikátory hardwaru](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/hardware-ids))

Položka **Intel Optane Memory and Storage Management Extension** nenahrazuje potřebný ovladač úložiště pro tuto instalaci; Intel odděluje načtení VMD ovladače v instalátoru od následné instalace správcovské aplikace ve Windows. ([Intel: instalace s VMD](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html))

## Bezpečný výběr cílového disku

Instalátor může zobrazit několik oddílů jednoho fyzického disku jako samostatné řádky.

Také instalační USB může mít hlavní oddíl se soubory a malý zaváděcí oddíl, takže několik položek nemusí znamenat několik fyzických disků.

Ověř proto **číslo disku, model, celkovou kapacitu a jeho oddíly společně**; samotná velikost nebo pořadí nestačí.

Číslo disku i písmeno jednotky se mohou mezi spuštěními změnit, takže nepřebírej `Disk 1` z cizího návodu.

### Diagnostika pomocí DiskPart

V instalátoru stiskni `Shift` + `F10` a zobraz seznam disků:

```text
diskpart
list disk
```

Podle výpisu nahraď `N` číslem disku, který chceš prohlédnout:

```text
select disk N
detail disk
list partition
exit
```

Tyto příkazy pouze vypisují informace a vybírají disk pro prohlížení; nemění oddíly ani jejich obsah. ([Microsoft: DiskPart](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart))

Pokud SSD chybí i v tomto výpisu, příkazový nástroj chybějící ovladač neobejde.

Do diagnostického postupu nepřidávej `clean`, `format` ani `delete partition`.

### Kdy pokračovat v instalaci

- **Nové nebo záměrně prázdné SSD:** po potvrzení správného fyzického disku vyber jeho nepřidělené místo a pokračuj přes **Další**.
- **SSD obsahuje oddíly s daty:** před mazáním nebo formátováním ověř zálohu a rozsah zamýšlené přeinstalace.
- **Celé SSD je nečekaně nepřidělené:** zastav se, pokud na něm měla být data; tento stav neprokazuje jejich bezpečné vymazání ani nepotřebnost.
- **Instalační USB:** jeho oddíly ponech beze změny a nevybírej je jako cíl instalace.

Při instalaci spuštěné v UEFI na správně vybraný prázdný disk vytvoří Windows potřebné rozdělení automaticky. ([Microsoft: instalace do nepřiděleného místa](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11))

## Když postup nepomůže

| Problém | Co ověřit |
|---|---|
| Ve složce se nenajde žádný ovladač | Rozbalení archivu, přítomnost `.inf` a správnou podsložku VMD/F6 |
| Se zapnutým filtrem není kompatibilní řadič | Přesný model, instalovaný systém, architekturu a podporu hardwaru v balíčku |
| Ovladač se načetl, SSD stále chybí | Detekci ve firmwaru, režim VMD/RST a dokumentaci výrobce pro danou konfiguraci |
| SSD je vidět, ale instalace je zakázaná | Přesné znění chyby, skutečný cílový disk a případný nesoulad UEFI/GPT |
| Seznam disků je nejasný | Modely a kapacity z `detail disk`, oddíly patřící k jednotlivým diskům a připojená USB zařízení |

Vypnutí VMD nebo přepnutí RAID/AHCI není univerzální opravou tohoto problému.

Takovou změnu zvažuj jen podle postupu výrobce a se znalostí současného zapojení disků; u existující instalace může změna režimu způsobit chybu **INACCESSIBLE_BOOT_DEVICE**. ([Intel: omezení změn VMD](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html))

## Co si uložit pro příště

- Model počítače a model i kapacitu SSD.
- Edici Windows odpovídající licenci.
- Původní nastavení řadiče v UEFI/BIOS.
- Odkaz na oficiální podporu, název a verzi úspěšně použitého balíčku.
- Rozbalenou složku ovladače dostupnou offline a označení skutečně vybraného řadiče.
- Výsledek ověření: SSD se zobrazilo, instalace doběhla a systém z něj úspěšně nastartoval.

Technický postup byl ověřen proti odkazovaným zdrojům 10. září 2026; při změně modelu, instalačního média nebo režimu řadiče ověř kompatibilitu znovu.
