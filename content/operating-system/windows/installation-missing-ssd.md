---
description: "Kontrola detekce SSD, načtení správného ovladače a ověření cílového disku."
---

# Instalátor Windows nevidí SSD

Chybějící SSD v instalátoru může znamenat chybějící ovladač řadiče, například Intel RST/VMD, nikoli nutně vadný nebo prázdný disk.

## 1. Rozlišení příčiny

| Stav | Další krok |
|---|---|
| SSD je ve firmware / RST, ale ne v instalátoru | Ověření a načtení ovladače řadiče |
| SSD není ani v informacích o úložišti UEFI | Kontrola hardwaru a diagnostika výrobce |
| Disk je vidět, ale instalace hlásí GPT/MBR | Řešení režimu bootování a rozdělení disku, ne jiný ovladač |
| Je vidět pouze USB | Interní SSD zatím není prokázané. Následuje kontrola řadiče |

Seznam bootovacích položek není seznam fyzických disků.

Prázdné SSD nemusí mít Windows Boot Manager.

> [!WARNING]
> Pokud má disk obsahovat data a instalátor ho ukazuje jako celý nepřidělený, instalace ani vytváření oddílů nepokračuje.

## 2. Příprava správného ovladače

Na funkčním počítači:

1. Zjistí se přesný model cílového zařízení a verze Windows.
2. Na oficiální podpoře výrobce tohoto modelu se najde ovladač.
3. Stáhne se kompatibilní ovladač úložiště označený například RST, VMD nebo F6.
4. Po rozbalení se ověří přítomnost `.inf` a odpovídajících `.sys` a `.cat`.
5. Celá rozbalená složka se zkopíruje na USB, například do `Drivers\IRST`.

Samotný ZIP nebo běžný instalační EXE nestačí pro volbu **Načíst ovladač**.

### Intel SetupRST.exe

Pouze u podporovaného balíčku Intel lze v PowerShellu ve složce staženého instalátoru použít:

```powershell
.\SetupRST.exe -extractdrivers .\RST-extracted
```

Příkaz rozbalí ovladače do `RST-extracted`.

Tato složka se pak přenese na USB včetně podsložek.

U jiného instalačního balíčku platí postup výrobce, protože přepínače nemusí být stejné.

## 3. Načtení ovladače v instalátoru

1. Na obrazovce výběru disku se zvolí **Načíst ovladač → Procházet**.
2. Vybere se rozbalená složka VMD/F6.
3. Skrývání nekompatibilních ovladačů zůstává zapnuté.
4. Vybere se řadič odpovídající hardwaru a načtení se potvrdí.
5. Výsledkem je nově zobrazený interní disk.

Číslo či PCI kód v názvu řadiče není pořadím vhodnosti ovladačů.

Rozhoduje podporovaný hardware.

Když filtr nenabízí kompatibilní řadič, řešením je návrat k přesnému modelu a balíčku, ne vynucení jiné položky.

## 4. Ověření cílového disku

Porovnává se **model, celková kapacita, číslo fyzického disku a jeho oddíly**.

Více řádků oddílů může patřit stejnému SSD nebo instalačnímu USB.

Čtecí kontrolu otevře v instalátoru `Shift+F10`:

```text
diskpart
list disk
```

Číslo disku se vybere podle skutečného seznamu.

Následující blok je syntaxe, ve které se nahradí `<číslo>`:

```text
select disk <číslo>
detail disk
list partition
exit
```

Tyto operace pouze vybírají a vypisují disk.

`clean`, `format` ani `delete partition` nejsou součástí diagnostiky.

## 5. Postup podle obsahu disku

| Disk | Postup |
|---|---|
| Ověřené nové nebo záměrně prázdné SSD | Výběr jeho nepřiděleného místa a pokračování |
| Disk s potřebnými oddíly | Nejdříve kontrola zálohy a rozsahu zamýšlené přeinstalace |
| Nečekaně nepřidělený disk s dřívějšími daty | Zastavení zápisů a obnova dat |
| Instalační USB | Jeho oddíly zůstávají a nevybírají se jako cíl |

Edice Home/Pro musí odpovídat licenci, ale sama neřeší viditelnost SSD.

## Když disk stále chybí

- Detekce se ověřuje ve správné nabídce UEFI, nikoli jen v seznamu bootování.
- Režim řadiče a balíček musí odpovídat přesné architektuře a modelu.
- Intel Optane správcovská aplikace nenahrazuje potřebný instalační ovladač VMD.
- VMD ani RAID/AHCI se nepřepíná bez postupu výrobce. Existující Windows mohou přestat bootovat.

Pro další instalaci se uchová rozbalený funkční ovladač, verzi balíčku, model zařízení a původní režim řadiče.

Zdroje: [Intel: chybějící disk](https://www.intel.com/content/www/us/en/support/articles/000091139/memory-and-storage.html), [extrakce SetupRST](https://www.intel.com/content/www/us/en/support/articles/000094664/technologies/intel-rapid-storage-technology-intel-rst.html), [Intel VMD](https://www.intel.com/content/www/us/en/support/articles/000057787/memory-and-storage/intel-optane-memory.html), [Microsoft: UEFI a GPT/MBR](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-installing-using-the-mbr-or-gpt-partition-style?view=windows-11).
