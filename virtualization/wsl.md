---
description: "Instalace Linuxu ve Windows, správa distribucí a jejich přenos."
---

# WSL – Linux ve Windows

WSL umožňuje používat linuxové nástroje z Windows; WSL 2 spouští skutečné linuxové jádro v řízeném lehkém virtuálním stroji.

## Před použitím

Následující instalace je pro podporované Windows 10 od verze 2004, sestavení 19041, nebo Windows 11.

Pro WSL 2 potřebuješ povolenou virtualizaci procesoru v UEFI; ve virtualizovaném hostiteli také podporovanou vnořenou virtualizaci.

Intel VT-d ani obecné IOMMU není potřeba doporučovat jako samostatný univerzální předpoklad tohoto postupu.

## Instalace WSL na Windows

V PowerShellu **jako správce** spusť:

```powershell
wsl --install
```

Příkaz připraví WSL a výchozí distribuci Ubuntu; pokud vyžádá restart, proveď jej a dokonči vytvoření linuxového uživatele.

Jde o linuxový účet oddělený od účtu Windows. [Instalace WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

## Ověření a běžné použití

V běžném terminálu Windows:

```powershell
wsl --status
wsl --list --verbose
wsl
```

Výpis ukáže distribuce a sloupec `VERSION`; poslední příkaz otevře výchozí distribuci.

Uvnitř Linuxu ověř prostředí:

```bash
whoami
pwd
uname -r
```

Příkazy vypíšou uživatele, pracovní adresář a jádro; `exit` se vrátí do Windows.

## Co lze upravit

| Syntaxe ve Windows | Význam |
|---|---|
| `wsl --list --online` | Dostupné distribuce pro instalaci |
| `wsl --install -d <distribuce>` | Instaluje distribuci; název vyber z online výpisu |
| `wsl --set-default <distribuce>` | Zvolí výchozí již nainstalovanou distribuci |
| `wsl --set-default-version {1\|2}` | Nastaví verzi pro další instalace, nemigruje existující distribuce |
| `wsl --update` | Aktualizuje WSL |
| `wsl --terminate <distribuce>` | Zastaví jednu již nainstalovanou distribuci |
| `wsl --shutdown` | Zastaví všechny distribuce i virtuální stroj WSL 2 |

`<distribuce>` nahraď přesným názvem a u volby `{1|2}` zadej jedno číslo bez závorek, například `wsl --set-default-version 2`.

Například `wsl --install -d Debian` instaluje Debian, zatímco `wsl --terminate Debian` tuto existující distribuci zastaví.

Před zastavením ulož práci; názvy `Ubuntu` a `Debian` nahraď skutečným názvem své distribuce. [Reference WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

## Import vlastní distribuce

Archiv RootFS získaný od vydavatele odpovídající architektuře lze importovat pomocí `wsl --import`; stejný příkaz slouží k obnově exportu v následujícím postupu.

Import sám nemusí vytvořit běžného uživatele ani nastavit jeho výchozí přihlášení.

## Přesun WSL distribuce na jiné místo

Export a import umožní přenést vlastní Ubuntu na jiný počítač s Windows nebo obnovit jeho kopii na jiném disku stejného počítače.

Přenáší se souborový systém distribuce včetně nainstalovaných balíčků, linuxových uživatelů, nastavení a souborů v jejich domovských adresářích.

Složky Windows připojené například pod `/mnt/c`, externí disky a nastavení Windows v souboru `%UserProfile%\.wslconfig` přenes samostatně.

Data Docker Desktopu mají [vlastní postup přenosu](docker/index.md#přenos-dat-docker-desktopu-na-jiný-počítač).

Následující příkazy zadávej ve **Windows PowerShellu** pod účtem Windows, který danou distribuci používá.

Příklady počítají s WSL 2 a se stejnou architekturou obou počítačů, například x64; názvy distribucí a cesty nahraď svými skutečnými hodnotami.

Na export, přenášený archiv i obnovenou distribuci potřebuješ dostatek místa; pro soubory větší než 4 GB nepoužívej přenosový disk s FAT32.

<details>
<summary>Zdrojový počítač: export Ubuntu</summary>

### 1. Zjisti název distribuce a uživatele

```text
wsl --list --verbose
wsl --distribution Ubuntu-22.04 --exec whoami
```

V dalších příkazech je zdrojovou distribucí `Ubuntu-22.04`; poznamenej si také vypsané linuxové uživatelské jméno pro přihlášení po importu.

### 2. Ulož práci a zastav distribuci

Nejprve řádně ukonči aplikace a databáze uvnitř Ubuntu, aby se jejich data dopsala na disk, a zavři jeho terminály i připojená vývojová prostředí.

```text
wsl --terminate Ubuntu-22.04
```

Tento příkaz zastaví pouze uvedenou distribuci; po dobu exportu ji znovu nespouštěj.

### 3. Vytvoř export a zaznamenej kontrolní součet

Zvol novou záložní složku mimo exportovanou distribuci, například na přenosovém disku `E:`.

```text
New-Item -ItemType Directory -Path 'E:\Prenos\WSL' -ErrorAction Stop
wsl --export Ubuntu-22.04 'E:\Prenos\WSL\Ubuntu-22.04.tar'
if ($LASTEXITCODE -ne 0) { throw 'Export Ubuntu se nezdařil.' }
Get-FileHash -LiteralPath 'E:\Prenos\WSL\Ubuntu-22.04.tar' -Algorithm SHA256
```

Počkej na úspěšné dokončení exportu a ulož si hodnotu `Hash`, abys ji mohl porovnat na cílovém počítači.

Výsledkem je archiv TAR; původní Ubuntu zůstává nainstalované a po exportu ho můžeš znovu používat.

Záloha zachycuje stav v okamžiku exportu, takže pozdější změny se do ní již nedoplní.

Archiv může obsahovat hesla, SSH klíče i další soukromé soubory; přenášej a uchovávej jej jako citlivá data.

[Dokumentace exportu WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#export-a-distribution)

</details>

<details>
<summary>Cílový počítač: import a ověření Ubuntu</summary>

### 1. Připrav WSL a ověř přenesený archiv

Na cílovém počítači musí fungovat WSL 2; před importem není potřeba instalovat novou distribuci Ubuntu z Microsoft Storu.

Přenes archiv na cílový počítač nebo připoj přenosový disk a zkontroluj jej:

```text
wsl --status
wsl --list --verbose
Get-FileHash -LiteralPath 'E:\Prenos\WSL\Ubuntu-22.04.tar' -Algorithm SHA256
```

Hodnota `Hash` musí přesně odpovídat hodnotě zaznamenané po exportu; při neshodě archiv znovu přenes a nepokračuj v importu.

### 2. Importuj pod volným názvem do nové složky

Název `Ubuntu-22.04-Prenesena` nesmí být v předchozím výpisu a cílová složka musí být nová nebo prázdná.

Odlišný název umožní ponechat původní Ubuntu i při přesunu na stejném počítači.

```text
New-Item -ItemType Directory -Path 'D:\WSL\Ubuntu2204-Prenesena' -ErrorAction Stop
wsl --import Ubuntu-22.04-Prenesena 'D:\WSL\Ubuntu2204-Prenesena' 'E:\Prenos\WSL\Ubuntu-22.04.tar' --version 2
if ($LASTEXITCODE -ne 0) { throw 'Import Ubuntu se nezdařil.' }
wsl --list --verbose
```

V seznamu očekávej novou distribuci s `VERSION 2`; její pracovní disk vznikne v cílové složce, archiv TAR zůstane samostatnou zálohou.

[Dokumentace importu WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#import-a-distribution)

### 3. Přihlas se a ověř svoje data

V následujícím příkazu nahraď `vyvojar` existujícím linuxovým uživatelským jménem zaznamenaným na zdroji:

```text
wsl --distribution Ubuntu-22.04-Prenesena --user vyvojar
```

Uvnitř Ubuntu ověř uživatele a obsah jeho domovského adresáře:

```text
whoami
cd ~
ls -la
```

Otevři své projekty a ověř potřebné aplikace i jejich uložená data; shodný kontrolní součet potvrzuje neporušený přenos archivu, nikoli funkčnost celého prostředí.

Pokud se distribuce bez přepínače `--user` spouští jako `root`, nastav v jejím `/etc/wsl.conf` výchozího uživatele; uvnitř Ubuntu můžeš soubor otevřít například editorem Nano:

```text
sudo nano /etc/wsl.conf
```

Zachovej ostatní sekce a existující sekci `[user]` uprav místo jejího opětovného přidání; také zde nahraď `vyvojar` svým linuxovým uživatelským jménem:

```ini
[user]
default=vyvojar
```

[Nastavení uživatele obnoveného Ubuntu](https://ubuntu.com/wsl/docs/latest/howto/manage-and-configure/#using-the-restored-backup)

V editoru Nano ulož změnu pomocí `Ctrl+O`, potvrď Enterem a editor zavři pomocí `Ctrl+X`.

Zavři práci v Ubuntu a příkazem `exit` se vrať do PowerShellu, kde distribuci restartuj a ověř výchozí přihlášení:

```text
wsl --terminate Ubuntu-22.04-Prenesena
wsl --distribution Ubuntu-22.04-Prenesena --exec whoami
```

V případě potřeby nastav obnovené Ubuntu také jako výchozí distribuci pro samotný příkaz `wsl`:

```text
wsl --set-default Ubuntu-22.04-Prenesena
```

### 4. Původní distribuci odstraň jen při skutečném přesunu

Při kopírování nebo zálohování není potřeba původní Ubuntu odstraňovat.

Pokud je chceš odstranit, proveď následující krok **na zdrojovém počítači až po ověření obnovených dat a při zachované záloze TAR**:

```text
wsl --unregister Ubuntu-22.04
```

> [!WARNING]
> Odregistrace nevratně smaže souborový systém, nastavení i programy uvedené distribuce, proto před spuštěním ověř její přesný název.

[Dopad odregistrace WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#unregister-or-uninstall-a-linux-distribution)

</details>

## Docker Desktop a vlastní Ubuntu

Rozdíl mezi distribucemi `Ubuntu-22.04` a `docker-desktop`, zapnutí integrace, ověření Dockeru z Ubuntu i význam disku `docker_data.vhdx` vysvětluje [Docker Desktop a WSL 2 ve Windows](docker/index.md#docker-desktop-a-wsl-2-ve-windows).
