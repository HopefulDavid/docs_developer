---
description: "Kontrola detekce SSD, načtení správného ovladače a ověření cílového disku."
---

# Instalátor Windows nevidí SSD

Chybějící SSD v instalátoru může znamenat chybějící ovladač řadiče, například Intel RST/VMD, nikoli nutně vadný nebo prázdný disk.

## 1. Rozliš příčinu

| Stav | Další krok |
|---|---|
| SSD je ve firmware / RST, ale ne v instalátoru | Ověř a načti ovladač řadiče |
| SSD není ani v informacích o úložišti UEFI | Ověř hardware a diagnostiku výrobce |
| Disk je vidět, ale instalace hlásí GPT/MBR | Řeš režim bootování a rozdělení disku, ne jiný ovladač |
| Vidíš pouze USB | Interní SSD zatím není prokázané; pokračuj kontrolou řadiče |

Seznam bootovacích položek není seznam fyzických disků; prázdné SSD nemusí mít Windows Boot Manager.

> [!WARNING]
> Pokud na disku očekáváš data a instalátor ho ukazuje jako celý nepřidělený, nepokračuj instalací ani vytvářením oddílů.

## 2. Připrav správný ovladač

Na funkčním počítači:

1. Zjisti přesný model cílového zařízení a verzi Windows.
2. Otevři oficiální podporu výrobce tohoto modelu.
3. Stáhni kompatibilní ovladač úložiště označený například RST, VMD nebo F6.
4. Rozbal ho a ověř přítomnost `.inf` a odpovídajících `.sys` a `.cat`.
5. Zkopíruj celou rozbalenou složku na USB, například do `Drivers\IRST`.

Samotný ZIP nebo běžný instalační EXE nestačí pro volbu **Načíst ovladač**.

### Intel SetupRST.exe

Pouze u podporovaného balíčku Intel lze v PowerShellu ve složce staženého instalátoru použít:

```powershell
.\SetupRST.exe -extractdrivers .\RST-extracted
```

Příkaz rozbalí ovladače do `RST-extracted`; tuto složku pak přenes na USB včetně podsložek.

U jiného instalačního balíčku se řiď postupem výrobce, protože přepínače nemusí být stejné.

## 3. Načti ovladač v instalátoru

1. Na obrazovce výběru disku zvol **Načíst ovladač → Procházet**.
2. Vyber rozbalenou složku VMD/F6.
3. Ponech zapnuté skrývání nekompatibilních ovladačů.
4. Vyber řadič odpovídající hardwaru a potvrď načtení.
5. Očekávej nově zobrazený interní disk.

Číslo či PCI kód v názvu řadiče není pořadím vhodnosti ovladačů; rozhoduje podporovaný hardware.

Pokud filtr nenabízí kompatibilní řadič, vrať se k přesnému modelu a balíčku místo vynucování jiné položky.

## 4. Ověř, který disk je cílový

Porovnej **model, celkovou kapacitu, číslo fyzického disku a jeho oddíly**.

Více řádků oddílů může patřit stejnému SSD nebo instalačnímu USB.

Pro čtecí kontrolu stiskni v instalátoru `Shift+F10`:

```text
diskpart
list disk
```

Podle skutečného seznamu vyber číslo disku; následující blok je syntaxe, ve které `<číslo>` nahradíš:

```text
select disk <číslo>
detail disk
list partition
exit
```

Tyto operace pouze vybírají a vypisují disk; `clean`, `format` ani `delete partition` nejsou součástí diagnostiky.

## 5. Pokračuj podle obsahu disku

| Disk | Postup |
|---|---|
| Ověřené nové nebo záměrně prázdné SSD | Vyber jeho nepřidělené místo a pokračuj |
| Disk s potřebnými oddíly | Nejdříve ověř zálohu a rozsah zamýšlené přeinstalace |
| Nečekaně nepřidělený disk s dřívějšími daty | Zastav zápisy a řeš obnovu dat |
| Instalační USB | Jeho oddíly ponech a nevybírej jako cíl |

Edice Home/Pro musí odpovídat licenci, ale sama neřeší viditelnost SSD.

## Když disk stále chybí

- Ověř detekci ve správné nabídce UEFI, nikoli jen seznam bootování.
- Zkontroluj režim řadiče a balíček pro přesnou architekturu a model.
- Intel Optane správcovská aplikace nenahrazuje potřebný instalační ovladač VMD.
- VMD nebo RAID/AHCI nepřepínej bez postupu výrobce; existující Windows mohou přestat bootovat.

Pro další instalaci uchovej rozbalený funkční ovladač, verzi balíčku, model zařízení a původní režim řadiče.

Zdroje: [Intel: chybějící disk](https://www.intel.com/content/www/us/en/support/articles/000091139/memory-and-storage.html), [extrakce SetupRST](https://www.intel.com/content/www/us/en/support/articles/000094664/technologies/intel-rapid-storage-technology-intel-rst.html), [Intel VMD](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html), [Microsoft: UEFI a GPT/MBR](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11).
