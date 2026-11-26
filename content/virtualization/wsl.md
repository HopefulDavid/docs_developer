---
description: "Instalace Linuxu ve Windows, správa distribucí a jejich přenos."
---

# WSL – Linux ve Windows

WSL umožňuje používat linuxové nástroje z Windows.

WSL 2 spouští skutečné linuxové jádro v řízeném lehkém virtuálním stroji.

## Před použitím

Následující instalace je pro podporované Windows 10 od verze 2004, sestavení 19041, nebo Windows 11.

WSL 2 vyžaduje povolenou virtualizaci procesoru v UEFI.

Ve virtualizovaném hostiteli je potřeba také podporovaná vnořená virtualizace.

Intel VT-d ani obecné IOMMU není potřeba doporučovat jako samostatný univerzální předpoklad tohoto postupu.

## Instalace WSL na Windows

V PowerShellu **jako správce**:

```powershell
wsl --install
```

Příkaz připraví WSL a výchozí distribuci Ubuntu.

Po případném restartu se dokončí vytvoření linuxového uživatele.

Jde o linuxový účet oddělený od účtu Windows. [Instalace WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

## Ověření a běžné použití

V běžném terminálu Windows:

```powershell
wsl --status
wsl --list --verbose
wsl
```

Výpis ukáže distribuce a sloupec `VERSION`.

Poslední příkaz otevře výchozí distribuci.

Kontrola prostředí uvnitř Linuxu:

```bash
whoami
pwd
uname -r
```

Příkazy vypíšou uživatele, pracovní adresář a jádro.

`exit` se vrátí do Windows.

## Co lze upravit

| Syntaxe ve Windows | Význam |
|---|---|
| `wsl --list --online` | Dostupné distribuce pro instalaci |
| `wsl --install -d <distribuce>` | Instaluje distribuci. Název pochází z online výpisu |
| `wsl --set-default <distribuce>` | Zvolí výchozí již nainstalovanou distribuci |
| <code>wsl --set-default-version {1&#124;2}</code> | Nastaví verzi pro další instalace, nemigruje existující distribuce |
| `wsl --update` | Aktualizuje WSL |
| `wsl --terminate <distribuce>` | Zastaví jednu již nainstalovanou distribuci |
| `wsl --shutdown` | Zastaví všechny distribuce i virtuální stroj WSL 2 |

`<distribuce>` se nahradí přesným názvem a u volby `{1|2}` se zadá jedno číslo bez závorek, například `wsl --set-default-version 2`.

Například `wsl --install -d Debian` instaluje Debian, zatímco `wsl --terminate Debian` tuto existující distribuci zastaví.

Před zastavením se uloží práce.

Názvy `Ubuntu` a `Debian` se nahradí skutečným názvem distribuce. [Reference WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

## Import vlastní distribuce

Archiv RootFS získaný od vydavatele odpovídající architektuře lze importovat pomocí `wsl --import`.

Stejný příkaz slouží k obnově exportu v následujícím postupu.

Import sám nemusí vytvořit běžného uživatele ani nastavit jeho výchozí přihlášení.

## Přesun WSL distribuce na jiné místo

Export a import umožní přenést vlastní Ubuntu na jiný počítač s Windows nebo obnovit jeho kopii na jiném disku stejného počítače.

Přenáší se souborový systém distribuce včetně nainstalovaných balíčků, linuxových uživatelů, nastavení a souborů v jejich domovských adresářích.

Složky Windows připojené například pod `/mnt/c`, externí disky a nastavení Windows v souboru `%UserProfile%\.wslconfig` se přenášejí samostatně.

Data Docker Desktopu mají [vlastní postup přenosu](docker/index.md#přenos-dat-docker-desktopu-na-jiný-počítač).

Následující příkazy se zadávají ve **Windows PowerShellu** pod účtem Windows, který danou distribuci používá.

Příklady počítají s WSL 2 a se stejnou architekturou obou počítačů, například x64.

Názvy distribucí a cesty se nahradí skutečnými hodnotami.

Export, přenášený archiv i obnovená distribuce potřebují dostatek místa.

Pro soubory větší než 4 GB se nehodí přenosový disk s FAT32.

<details>
<summary>Zdrojový počítač: export Ubuntu</summary>

### 1. Název distribuce a uživatele

```text
wsl --list --verbose
wsl --distribution Ubuntu-22.04 --exec whoami
```

V dalších příkazech je zdrojovou distribucí `Ubuntu-22.04`.

Poznamená se také vypsané linuxové uživatelské jméno pro přihlášení po importu.

### 2. Uložení práce a zastavení distribuce

Nejprve se řádně ukončí aplikace a databáze uvnitř Ubuntu, aby se jejich data dopsala na disk, a zavřou se jeho terminály i připojená vývojová prostředí.

```text
wsl --terminate Ubuntu-22.04
```

Tento příkaz zastaví pouze uvedenou distribuci.

Po dobu exportu se znovu nespouští.

### 3. Export a kontrolní součet

Záložní složka je nová a leží mimo exportovanou distribuci, například na přenosovém disku `E:`.

```text
New-Item -ItemType Directory -Path 'E:\Prenos\WSL' -ErrorAction Stop
wsl --export Ubuntu-22.04 'E:\Prenos\WSL\Ubuntu-22.04.tar'
if ($LASTEXITCODE -ne 0) { throw 'Export Ubuntu se nezdařil.' }
Get-FileHash -LiteralPath 'E:\Prenos\WSL\Ubuntu-22.04.tar' -Algorithm SHA256
```

Po úspěšném dokončení exportu se uloží hodnota `Hash` pro porovnání na cílovém počítači.

Výsledkem je archiv TAR.

Původní Ubuntu zůstává nainstalované a po exportu ho lze znovu používat.

Záloha zachycuje stav v okamžiku exportu, takže pozdější změny se do ní již nedoplní.

Archiv může obsahovat hesla, SSH klíče i další soukromé soubory.

Přenáší a uchovává se jako citlivá data.

[Dokumentace exportu WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#export-a-distribution)

</details>

<details>
<summary>Cílový počítač: import a ověření Ubuntu</summary>

### 1. Příprava WSL a kontrola přeneseného archivu

Na cílovém počítači musí fungovat WSL 2.

Před importem není potřeba instalovat novou distribuci Ubuntu z Microsoft Storu.

Archiv se přenese na cílový počítač nebo se připojí přenosový disk a archiv se zkontroluje:

```text
wsl --status
wsl --list --verbose
Get-FileHash -LiteralPath 'E:\Prenos\WSL\Ubuntu-22.04.tar' -Algorithm SHA256
```

Hodnota `Hash` musí přesně odpovídat hodnotě zaznamenané po exportu.

Při neshodě se archiv přenese znovu a import nepokračuje.

### 2. Import pod volným názvem do nové složky

Název `Ubuntu-22.04-Prenesena` nesmí být v předchozím výpisu a cílová složka musí být nová nebo prázdná.

Odlišný název umožní ponechat původní Ubuntu i při přesunu na stejném počítači.

```text
New-Item -ItemType Directory -Path 'D:\WSL\Ubuntu2204-Prenesena' -ErrorAction Stop
wsl --import Ubuntu-22.04-Prenesena 'D:\WSL\Ubuntu2204-Prenesena' 'E:\Prenos\WSL\Ubuntu-22.04.tar' --version 2
if ($LASTEXITCODE -ne 0) { throw 'Import Ubuntu se nezdařil.' }
wsl --list --verbose
```

Seznam má obsahovat novou distribuci s `VERSION 2`.

Její pracovní disk vznikne v cílové složce, archiv TAR zůstane samostatnou zálohou.

[Dokumentace importu WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#import-a-distribution)

### 3. Přihlášení a kontrola dat

V následujícím příkazu se `vyvojar` nahradí existujícím linuxovým uživatelským jménem zaznamenaným na zdroji:

```text
wsl --distribution Ubuntu-22.04-Prenesena --user vyvojar
```

Uvnitř Ubuntu se ověří uživatel a obsah jeho domovského adresáře:

```text
whoami
cd ~
ls -la
```

Následuje kontrola projektů, potřebných aplikací i jejich uložených dat.

Shodný kontrolní součet potvrzuje neporušený přenos archivu, nikoli funkčnost celého prostředí.

Pokud se distribuce bez přepínače `--user` spouští jako `root`, nastaví se v jejím `/etc/wsl.conf` výchozí uživatel.

Uvnitř Ubuntu soubor otevře například editor Nano:

```text
sudo nano /etc/wsl.conf
```

Ostatní sekce zůstávají a existující sekce `[user]` se upraví místo opětovného přidání.

Také zde se `vyvojar` nahradí skutečným linuxovým uživatelským jménem:

```ini
[user]
default=vyvojar
```

[Nastavení uživatele obnoveného Ubuntu](https://ubuntu.com/wsl/docs/latest/howto/manage-and-configure/#using-the-restored-backup)

V editoru Nano uloží změnu `Ctrl+O` s potvrzením Enterem a `Ctrl+X` editor zavře.

Po ukončení práce v Ubuntu vrátí `exit` do PowerShellu, kde se distribuce restartuje a ověří se výchozí přihlášení:

```text
wsl --terminate Ubuntu-22.04-Prenesena
wsl --distribution Ubuntu-22.04-Prenesena --exec whoami
```

V případě potřeby se obnovené Ubuntu nastaví také jako výchozí distribuce pro samotný příkaz `wsl`:

```text
wsl --set-default Ubuntu-22.04-Prenesena
```

### 4. Odstranění původní distribuce jen při skutečném přesunu

Při kopírování nebo zálohování není potřeba původní Ubuntu odstraňovat.

Odstranění provede následující krok **na zdrojovém počítači až po ověření obnovených dat a při zachované záloze TAR**:

```text
wsl --unregister Ubuntu-22.04
```

> [!WARNING]
> Odregistrace nevratně smaže souborový systém, nastavení i programy uvedené distribuce, proto se před spuštěním ověří její přesný název.

[Dopad odregistrace WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#unregister-or-uninstall-a-linux-distribution)

</details>

## Docker Desktop a vlastní Ubuntu

Rozdíl mezi distribucemi `Ubuntu-22.04` a `docker-desktop`, zapnutí integrace, ověření Dockeru z Ubuntu i význam disku `docker_data.vhdx` vysvětluje [Docker Desktop a WSL 2 ve Windows](docker/index.md#docker-desktop-a-wsl-2-ve-windows).
