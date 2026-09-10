# SSH – Windows, Git a volba klienta

> Zjištění používaného SSH, instalace Windows OpenSSH, základní příkazy a sjednocení klienta i agenta pro Git.

SSH umožňuje šifrované připojení ke vzdálenému počítači a Git jej může využívat pro přístup k repozitářům.

Ve Windows může být současně nainstalováno několik klientů, takže úspěšné `ssh` v PowerShellu ještě nepotvrzuje, kterého klienta spouští Git nebo IDE.

## Kde začít

- **Chci zjistit aktuální stav:** [Diagnostika klienta](#které-ssh-se-skutečně-spouští) a [diagnostika Gitu](#které-ssh-používá-git).
- **SSH mi chybí:** [Instalace klienta ve Windows](#instalace-windows-openssh).
- **Chci jeden klient pro Windows i Git:** [Sjednocení na Windows OpenSSH](#sjednocení-na-windows-openssh).
- **Chci používat klienta dodaného s Gitem:** [Alternativa Git for Windows](#alternativa-openssh-z-git-for-windows).
- **Potřebuji běžný příkaz:** [Základní příkazy](#základní-ssh-příkazy) a [řešení problémů](#řešení-problémů).

Vytvoření klíče, heslovou frázi, popisek a registraci klíče u GitHubu popisuje navazující návod [Klíče a certifikáty](certificates.md#ssh-klíč-s-heslovou-frází).

Příklady pro Windows používají **PowerShell**, pokud blok výslovně neuvádí Git Bash nebo CMD.

Zástupné údaje `uzivatel`, `server.example.com`, port a cesty nahraď vlastními hodnotami.

## Klient, server a agent

| Součást | Úloha | Kdy ji potřebuješ |
| --- | --- | --- |
| `ssh` – klient | Připojuje se ke vzdálenému SSH serveru | Přihlášení na server a Git přes SSH |
| `sshd` – server | Přijímá příchozí SSH spojení | Pokud se má někdo přihlašovat na tento počítač |
| `ssh-agent` | Zpřístupňuje načtené klíče pro ověřování bez opakovaného zadávání fráze | Volitelné pohodlnější používání klíčů |
| `ssh-add` | Přidává klíče do příslušného agenta a vypisuje jejich seznam | Správa klíčů dostupných agentovi |
| `ssh-keygen` | Vytváří a spravuje klíče a jejich otisky | [Práce s klíči](certificates.md#ssh-klíč-s-heslovou-frází) |
| `scp`, `sftp` | Přenášejí soubory přes SSH | Kopírování souborů mezi počítači |

Pro běžnou práci s Gitem stačí klient; instalace `sshd` ani otevření příchozího portu 22 nejsou potřeba.

Windows OpenSSH a OpenSSH dodávané s Git for Windows jsou dvě distribuce OpenSSH se samostatnými binárními soubory a aktualizacemi.

| Distribuce | Typické umístění klienta | Prostředí a agent |
| --- | --- | --- |
| Windows OpenSSH jako součást Windows | `C:\Windows\System32\OpenSSH\ssh.exe` | Nativní klient a služba Windows `ssh-agent` |
| OpenSSH z Git for Windows | `C:\Program Files\Git\usr\bin\ssh.exe` | Prostředí Git Bash a jeho `ssh-agent` s proměnnou `SSH_AUTH_SOCK` |
| OpenSSH v distribuci WSL | `/usr/bin/ssh` uvnitř Linuxu | Vlastní linuxová instalace, konfigurace a agent |
| PuTTY / Plink | Podle instalace, například `plink.exe` | Jiný klient a obvykle agent Pageant |

Cesty jsou příklady pro běžnou instalaci, nikoli záruka skutečného umístění na tvém počítači.

Windows služba a agent Git Bash standardně nesdílejí načtené klíče; sjednocuj proto **klienta i odpovídající `ssh-add`**, nejen soubor klíče.

Tento rozdíl a možnost použít nativní Windows klient pro Git popisuje [GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows#adding-your-ssh-key-to-the-ssh-agent).

## Které SSH se skutečně spouští

### PowerShell a CMD

V terminálu, ve kterém problém nastává, spusť:

```powershell
Get-Command ssh -All | Select-Object CommandType, Name, Source, Definition
where.exe ssh
ssh -V
```

- `Get-Command ssh -All` ukáže také alias nebo funkci, které mohou překrýt spustitelný soubor; první výsledek odpovídá volbě PowerShellu.
- `where.exe ssh` vyhledá soubory v aktuálním adresáři a `PATH`; v PowerShellu používej příponu `.exe`, protože `where` je alias pro `Where-Object`.
- `ssh -V` vypíše verzi skutečně spuštěného klienta, například s označením `OpenSSH_for_Windows` nebo `OpenSSH`, ale nenahradí kontrolu cesty.

PowerShell nespouští program z aktuálního adresáře pouhým názvem, pokud tento adresář není v `PATH`; proto se jeho volba může od výpisu `where.exe` lišit.

Pravidla výběru příkazu vysvětluje [Microsoft – about_Command_Precedence](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence).

V **CMD** použij `where.exe ssh` a `ssh -V`; příkaz `Get-Command` patří do PowerShellu.

Stejně zkontroluj související nástroje a případně více instalací Gitu:

```powershell
Get-Command ssh-add, ssh-agent, ssh-keygen, scp, sftp, git -All |
    Select-Object Name, Source
```

Konkrétní instalaci ověříš nezávisle na `PATH` přímým spuštěním jejího souboru:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh.exe" -V
& 'C:\Program Files\Git\usr\bin\ssh.exe' -V
```

Operátor `&` v PowerShellu spouští program, jehož cesta je v uvozovkách.

Pokud cesta neexistuje, daná instalace buď chybí, nebo je jinde; seznam z `PATH` sám o sobě není inventářem všech instalací na disku.

### Git Bash, Linux a macOS

V **Git Bash nebo Bashi** zjisti všechny dostupné shody a aktuální volbu:

```bash
type -a ssh
command -v ssh
ssh -V
```

`/usr/bin/ssh` v Git Bash typicky znamená klienta uvnitř instalace Gitu, zatímco stejná cesta ve WSL označuje program uvnitř Linuxu.

Skutečnou Windows cestu v Git Bash vypíše například `cygpath -w /usr/bin/ssh.exe`.

Na Linuxu a macOS použij také `command -v ssh` a `ssh -V`; výsledky platí pro daný shell a jeho prostředí.

### Které SSH používá Git

Kontrolu prováděj **uvnitř konkrétního repozitáře a ve stejném prostředí**, ze kterého běžně spouštíš Git:

```powershell
git remote -v
git config --show-origin --show-scope --get-all core.sshCommand
git config --show-origin --show-scope --get-all ssh.variant
Get-ChildItem Env:GIT_SSH*
```

Prázdný výpis konfigurace s návratovým kódem `1` znamená, že daná položka není nastavená.

`--show-origin` ukazuje soubor původu a `--show-scope` rozsah, takže odhalíš i nastavení načtená přes `include` nebo `includeIf`.

V Git Bash zobrazíš proměnné příkazem `env | grep '^GIT_SSH'`.

Pořadí volby klienta je následující, od nejvyšší priority:

| Priorita | Nastavení | Význam |
| --- | --- | --- |
| 1 | `GIT_SSH_COMMAND` | Příkaz v prostředí procesu, může obsahovat argumenty |
| 2 | `core.sshCommand` | Efektivní Git konfigurace, může obsahovat argumenty |
| 3 | `GIT_SSH` | Cesta k programu, bez dalších argumentů |
| 4 | Implicitní `ssh` | Vyhledání v prostředí, které má k dispozici proces Gitu |

V rámci Git konfigurace má běžně přednost `git -c` před worktree, lokální, globální a systémovou konfigurací, takže lokální hodnota může přebít `--global`.

`ssh.variant` a `GIT_SSH_VARIANT` určují podobu argumentů pro OpenSSH či Plink, **nevybírají cestu ke klientovi**.

Podrobnosti dokládají [proměnné prostředí Gitu](https://git-scm.com/docs/git#Documentation/git.txt-GITSSH), [Git konfigurace](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coresshCommand) a [výběr klienta ve zdroji Gitu](https://github.com/git/git/blob/v2.55.0/connect.c).

Remote začínající `https://` používá pro běžné Git operace HTTPS; změna SSH klienta se takového spojení netýká.

Přechod remote na SSH popisuje [Použití v Git repozitáři](certificates.md#použití-v-git-repozitáři).

#### Ověření skutečně spuštěného příkazu

Pro SSH remote spusť tento čtecí test, který nevytváří commit ani nemění větve:

```powershell
$previousGitTrace = $env:GIT_TRACE
try {
    $env:GIT_TRACE = '1'
    git ls-remote origin HEAD
} finally {
    $env:GIT_TRACE = $previousGitTrace
}
```

Ve výpisu `run_command` hledej příkaz SSH; pokud obsahuje jen `ssh`, je stále potřeba dohledat jeho cestu v prostředí daného procesu nebo ji nastavit explicitně.

Při prvním spojení ověř otisk serveru podle [postupu pro GitHub](certificates.md#test-připojení), případně proti údaji od správce jiného serveru.

Úspěšný test neprázdného repozitáře vypíše hash a `HEAD`; úspěšné čtení prázdného repozitáře může skončit bez řádku, proto zkontroluj i `$LASTEXITCODE`.

IDE může mít vlastní Git, SSH klient nebo prostředí zděděné při startu; diagnostiku zopakuj také v něm a po změnách prostředí jej úplně restartuj.

Před sdílením diagnostiky odstraň soukromé názvy serverů, účtů, repozitářů a lokální cesty.

## Instalace Windows OpenSSH

Postup je určený pro vestavěnou volitelnou součást Windows 11, Windows 10 od sestavení 1809 a Windows Server od verze 2019 podle [instalačního návodu Microsoftu](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse).

### Klient přes PowerShell

Otevři **64bitový Windows PowerShell jako správce** a zjisti stav klienta:

```powershell
Get-WindowsCapability -Online -Name 'OpenSSH.Client*'
```

Při stavu `NotPresent` nainstaluj klienta:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

`OpenSSH.Client~~~~0.0.1.0` je identifikátor součásti Windows, nikoli verze samotného SSH.

Po dokončení znovu ověř stav `Installed` a respektuj případný výstup `RestartNeeded: True`.

V novém běžném PowerShellu ověř soubor a verzi:

```powershell
Test-Path "$env:WINDIR\System32\OpenSSH\ssh.exe"
& "$env:WINDIR\System32\OpenSSH\ssh.exe" -V
```

### Klient přes Nastavení

1. Ve Startu vyhledej **Volitelné funkce / Optional features**.
2. Otevři přidání funkce, například **Zobrazit funkce / View features**.
3. Vyber **OpenSSH Client / Klient OpenSSH** a dokonči instalaci.
4. V novém terminálu proveď stejné ověření souboru a verze jako výše.

Pokud instalace selže kvůli zdroji balíčků, Windows Update nebo firemním zásadám, použij [diagnostiku instalace Microsoftu](https://learn.microsoft.com/en-us/troubleshoot/windows-server/system-management-components/cant-install-openssh-features).

### Kdy instalovat server

**OpenSSH Server** instaluj jen tehdy, má-li tento počítač přijímat vzdálená přihlášení.

Instalaci serveru, spuštění služby `sshd` a kontrolu firewallu řeší [oficiální postup Microsoftu](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse#install-openssh-server--client).

## Sjednocení na Windows OpenSSH

Pro práci převážně ve Windows je praktickou výchozí volbou Windows OpenSSH, které umožní používat stejnou službu agenta z PowerShellu i při Git operacích.

Následující postup nastavuje zvlášť **primární příkaz v terminálu** a **klienta používaného Gitem**.

### 1. Zkontroluj přepsání a poznamenej původní stav

Nejprve proveď [diagnostiku Gitu](#které-ssh-používá-git) a ulož si nalezené hodnoty pro případ návratu.

U proměnných prostředí rozliš právě běžící proces a trvalé hodnoty uživatele nebo počítače:

```powershell
foreach ($name in 'GIT_SSH_COMMAND', 'GIT_SSH', 'GIT_SSH_VARIANT') {
    [pscustomobject]@{
        Name = $name
        Process = [Environment]::GetEnvironmentVariable($name, 'Process')
        User = [Environment]::GetEnvironmentVariable($name, 'User')
        Machine = [Environment]::GetEnvironmentVariable($name, 'Machine')
    }
}
```

Zastaralé přepsání odstraň pouze tam, kde jsi je skutečně našel a chceš je nahradit.

Například odstranění nepotřebného `GIT_SSH_COMMAND` z aktuálního PowerShellu a trvalého uživatelského prostředí vypadá takto:

```powershell
Remove-Item Env:GIT_SSH_COMMAND -ErrorAction SilentlyContinue
[Environment]::SetEnvironmentVariable('GIT_SSH_COMMAND', $null, 'User')
```

Stejným způsobem lze odstranit nepotřebné `GIT_SSH` nebo `GIT_SSH_VARIANT`; systémovou hodnotu řeš v systémových proměnných s právy správce.

Proměnnou může znovu nastavovat profil shellu, spouštěcí skript nebo IDE, proto oprav i její zdroj a otevři novou relaci.

### 2. Vyber primární SSH v terminálu

Pro **aktuální PowerShell** přidej adresář Windows OpenSSH na začátek vyhledávací cesty:

```powershell
$env:Path = "$env:WINDIR\System32\OpenSSH;$env:Path"
Get-Command ssh, ssh-add, ssh-keygen | Select-Object Name, Source
ssh -V
```

Změna platí pro tento proces a jeho potomky; alias nebo funkci `ssh` odhalenou diagnostikou je potřeba řešit samostatně v profilu shellu.

Pro **trvalou volbu ve Windows**:

1. Ve Startu otevři **Upravit proměnné prostředí systému → Proměnné prostředí**.
2. Poznamenej si původní položky `Path` včetně pořadí a rozsahu.
3. Zajisti, aby `%WINDIR%\System32\OpenSSH` v účinném `PATH` předcházel adresářům s konkurenčním `ssh.exe`.
4. Změny systémového `Path` proveď jako správce; samotné posunutí položky v uživatelském `Path` nemusí překonat dřívější systémovou položku.
5. Úplně ukonči a znovu otevři Windows Terminal i IDE a zopakuj [diagnostiku klienta](#powershell-a-cmd).

Neupravuj `Path` nahrazením celého seznamu jediným adresářem.

**Git Bash** si připravuje vlastní `PATH`, proto pro jeho přímé příkazy nastav Windows klienta také v něm:

```bash
export PATH="/c/Windows/System32/OpenSSH:$PATH"
hash -r
type -a ssh
ssh -V
```

Pro trvalé chování vlož řádek s `export` do `~/.bashrc` a ověř, že jej tvůj přihlašovací profil `~/.bash_profile` načítá; stávající obsah profilů zachovej.

Cestu `/c/Windows` uprav, pokud Windows leží jinde.

### 3. Nastav stejného klienta Gitu

Následující příklady předpokládají Windows v `C:\Windows`; při jiném umístění použij cestu z [diagnostiky](#powershell-a-cmd) v zápisu s `/`.

V **běžném PowerShellu** nastav výchozí klient pro repozitáře svého uživatele:

```powershell
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

Příkaz nemění volbu přímého `ssh` v terminálu a stále jej může přebít vyšší priorita z [tabulky výběru](#které-ssh-používá-git).

Pokud má repozitář nepotřebnou lokální výjimku, odstraň ji uvnitř tohoto repozitáře, aby převzal globální hodnotu:

```powershell
git config --local --unset-all core.sshCommand
```

Pokud místo globální volby chceš změnit **pouze jeden repozitář**, použij v něm:

```powershell
git config --local core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

Pro **jediný příkaz bez uložení konfigurace** použij:

```powershell
git -c core.sshCommand=C:/Windows/System32/OpenSSH/ssh.exe ls-remote origin HEAD
```

Ani `git -c` nepřebije existující `GIT_SSH_COMMAND`.

Pokud diagnostika ukázala vynucený Plink, odstraň jeho zastaralé `ssh.variant` ve zjištěném rozsahu a `GIT_SSH_VARIANT` v prostředí, případně nastav odpovídající variantu `ssh`.

Pro standardně pojmenovaný `ssh.exe` Git OpenSSH rozpoznává automaticky.

### 4. Načti klíč do Windows agenta

Nejprve připrav existující nebo nový [klíč s heslovou frází](certificates.md#ssh-klíč-s-heslovou-frází).

V **PowerShellu správce** nastav automatické spuštění služby a spusť ji:

```powershell
Get-Service ssh-agent | Select-Object Name, Status, StartType
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

Očekávaný stav po spuštění je `Running`.

Pokud chceš službu spouštět ručně, zvol `Manual` místo `Automatic` a po restartu ji podle potřeby spusť přes `Start-Service ssh-agent` jako správce.

V **běžném PowerShellu pod svým účtem** potom přidej soukromý klíč pomocí Windows nástroje a vypiš načtené identity:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" "$env:USERPROFILE\.ssh\id_ed25519"
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" -l
```

Při vlastním názvu klíče uprav cestu a na výzvu zadej jeho heslovou frázi.

Agent nepřidává veřejný klíč na server; registraci účtu dokonči podle [návodu pro GitHub](certificates.md#ssh--nastavení-pro-github), případně podle svého poskytovatele.

Tento způsob správy služby a klíčů vychází z [dokumentace Microsoftu](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement#user-key-generation).

Pro tuto variantu není potřeba spouštět dalšího agenta pomocí `eval` v Git Bash.

### 5. Ověř výsledek

1. Nový PowerShell i Git Bash mají při přímém `ssh` ukazovat zvoleného Windows klienta.
2. Windows `ssh-add.exe -l` má zobrazit otisk tvého načteného klíče.
3. Proveď [test účtu na GitHubu](certificates.md#test-připojení) nebo test vlastního serveru.
4. Proveď [trasování `git ls-remote`](#ověření-skutečně-spuštěného-příkazu) a ověř cestu Windows klienta i dostupnost repozitáře.

Test samotného `ssh` a test Gitu se doplňují; každý ověřuje jinou cestu spuštění.

## Alternativa: OpenSSH z Git for Windows

Pokud pracuješ hlavně v Git Bash a chceš používat jeho agenta, můžeš jako primární zvolit OpenSSH dodávané s Gitem.

Nejprve odstraň nepotřebná přepsání podle [diagnostiky a původního stavu](#1-zkontroluj-přepsání-a-poznamenej-původní-stav).

V **Git Bash** nastav jeho nástroje pro aktuální relaci a Gitu ulož výslovnou cestu:

```bash
export PATH="/usr/bin:$PATH"
hash -r
type -a ssh
cygpath -w /usr/bin/ssh.exe
git config --global core.sshCommand '"C:/Program Files/Git/usr/bin/ssh.exe"'
```

Cestu v posledním příkazu uprav podle skutečné instalace; vnější jednoduché uvozovky zachovají v uložené hodnotě vnitřní dvojité uvozovky potřebné pro mezeru v `Program Files`.

Tento konkrétní zápis s vnořenými uvozovkami spouštěj v **Git Bash**.

Pro trvalé pořadí nástrojů uprav svůj načítaný profil podle [postupu pro primární klient](#2-vyber-primární-ssh-v-terminálu), tentokrát s `/usr/bin` na začátku.

### Agent v Git Bash, Linuxu a macOS

V aktuálním **Bashi nebo Zsh** nejprve ověř, zda už máš dostupného agenta:

```bash
ssh-add -l
```

Pokud není připojení k agentovi dostupné, spusť jej a následně přidej klíč:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

Jestli agent běží a pouze hlásí `The agent has no identities`, stačí `ssh-add`; dalšího agenta nespouštěj.

`eval` nastaví proměnné v aktuálním shellu a jeho potomcích; již běžící IDE ani jiné nezávislé terminály je automaticky nepřevezmou.

Na Linuxu a macOS může agenta spravovat přihlašovací prostředí, proto nejprve využij existujícího agenta.

Životní cyklus a proměnnou `SSH_AUTH_SOCK` vysvětluje [manuál ssh-agent](https://man.openbsd.org/ssh-agent).

Chceš-li klienta Gitu spouštět přímo z PowerShellu, použij úplnou cestu z [diagnostiky](#powershell-a-cmd) a zajisti dostupnost jeho agenta v prostředí volajícího procesu.

Plošné přidání `Git\usr\bin` na začátek Windows `PATH` mění výběr i dalších unixových nástrojů, proto je pro samotné SSH přehlednější explicitní cesta nebo práce v Git Bash.

## Konfigurace jednotlivých serverů

Soubor `config` v uživatelské složce `.ssh` určuje hostitele, uživatele, port a klíč, ale **nevybírá implementaci `ssh.exe`**.

| Klient | Uživatelský konfigurační soubor |
| --- | --- |
| Windows OpenSSH | `%USERPROFILE%\.ssh\config` |
| OpenSSH v Git Bash | `~/.ssh/config`, kde `~` odpovídá `$HOME` Git Bash |
| Linux, macOS a WSL | `~/.ssh/config` v daném systému |

Git Bash a Windows často ukazují do stejného profilu, ale při vlastním `HOME` se mohou lišit; společný soubor také automaticky neznamená společného agenta.

Vytvoř soubor `config` **bez přípony `.txt`**, případně zachovej jeho obsah a uprav odpovídající blok:

```sshconfig
Host pracovni-server
    HostName server.example.com
    User uzivatel
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Potom stačí `ssh pracovni-server`.

`IdentitiesOnly yes` omezí nabízení identit na nakonfigurované klíče a pomáhá při větším počtu klíčů v agentovi.

Konkrétní bloky `Host` umisťuj před obecný `Host *`, protože OpenSSH u většiny voleb používá první získanou hodnotu.

Výslednou konfiguraci bez připojení zobrazíš příkazem:

```powershell
ssh -G pracovni-server |
    Select-String '^(hostname|user|port|identityfile|identitiesonly|identityagent) '
```

`ssh -G` nepotvrzuje existenci klíče ani oprávnění na serveru; pro zjištění načítaných souborů přidej `-v`.

Podrobnosti popisují [OpenSSH ssh_config](https://man.openbsd.org/ssh_config) a [konfigurace Windows klienta](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration#openssh-configuration-files).

## Základní SSH příkazy

Následující příklady připojení předpokládají vzdálený Linux nebo jiný server s uvedenými cestami a příkazy.

| Účel | Příkaz | Poznámka |
| --- | --- | --- |
| Verze klienta | `ssh -V` | Velké `V` |
| Přihlášení na server | `ssh uzivatel@server.example.com` | Bez jiné konfigurace používá port 22 |
| Jiný port | `ssh -p 2222 uzivatel@server.example.com` | Malé `p` |
| Konkrétní klíč | `ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes uzivatel@server.example.com` | Cesta k soukromému klíči |
| Jeden vzdálený příkaz | `ssh uzivatel@server.example.com "uname -a"` | Příkaz se vykoná na serveru |
| Podrobná diagnostika | `ssh -vvv uzivatel@server.example.com` | Načítané soubory, spojení a nabízené identity |
| Nahrání souboru | `scp ./soubor.txt uzivatel@server.example.com:/home/uzivatel/` | Zapisuje soubor na server |
| Stažení souboru | `scp uzivatel@server.example.com:/home/uzivatel/soubor.txt ./` | Zapisuje do místního adresáře |
| Kopírování adresáře přes jiný port | `scp -P 2222 -r ./slozka uzivatel@server.example.com:/home/uzivatel/` | U `scp` je port velké `P` |
| Interaktivní přenos | `sftp -P 2222 uzivatel@server.example.com` | Uvnitř používej `ls`, `pwd`, `get`, `put` a `bye` |
| Lokální tunel | `ssh -N -L 127.0.0.1:8080:127.0.0.1:80 uzivatel@server.example.com` | Místní port 8080 zpřístupní port 80 z pohledu SSH serveru |

Interaktivní shell ukonči příkazem `exit` a tunel běžící v popředí pomocí `Ctrl+C`.

Při kopírování zkontroluj cíl, protože stejně pojmenovaný soubor může být přepsán.

Tunel s uvedeným lokálním bindem přijímá spojení pouze z tvého počítače a po dobu používání musí SSH běžet.

Přepínače a další možnosti popisují manuály [ssh](https://man.openbsd.org/ssh), [scp](https://man.openbsd.org/scp) a [sftp](https://man.openbsd.org/sftp).

### Rychlá správa agenta

Příkazy spouštěj pomocí `ssh-add` odpovídajícího vybranému agentovi, u Windows varianty případně jeho úplnou cestou z [postupu načtení klíče](#4-načti-klíč-do-windows-agenta).

| Účel | Příkaz | Význam |
| --- | --- | --- |
| Seznam otisků | `ssh-add -l` | Malé `l`, bez výpisu soukromých klíčů |
| Seznam veřejných klíčů | `ssh-add -L` | Velké `L` |
| Odebrání jedné identity | `ssh-add -d ~/.ssh/id_ed25519.pub` | Odebere identitu z agenta |
| Odebrání všech identit | `ssh-add -D` | Ovlivní další spojení používající tohoto agenta |

Odebrání identity z agenta nemaže soubor klíče ani nezruší veřejný klíč na serveru.

Podrobnosti a návratové kódy uvádí [manuál ssh-add](https://man.openbsd.org/ssh-add).

## Návrat k původní volbě

Pokud před úpravou `core.sshCommand` neexistoval, odstraň pouze hodnotu, kterou jsi přidal, v odpovídajícím rozsahu:

```powershell
# Pouze pokud jsi přidal globální hodnotu:
git config --global --unset-all core.sshCommand

# Pouze pokud jsi přidal lokální hodnotu v tomto repozitáři:
git config --local --unset-all core.sshCommand
```

Pokud hodnota existovala už před změnou, obnov její původní obsah místo odstranění.

Odstranění konfigurace neznamená automatický návrat ke klientovi Gitu, protože znovu rozhodne [zbývající priorita](#které-ssh-používá-git).

Obnov také změněné proměnné, původní pořadí `Path` nebo upravený řádek v profilu a restartuj terminály i IDE.

Případnou změnu režimu služby `ssh-agent` vrať na poznamenaný původní stav; klíče ani instalace kvůli změně preference nemaž.

## Řešení problémů

| Projev | Co ověřit | Další krok |
| --- | --- | --- |
| `ssh` není rozpoznán | [Stav instalace](#instalace-windows-openssh) a přímou cestu k programu | Doinstaluj klienta nebo oprav `PATH` a otevři nový terminál |
| PowerShell funguje, Git selhává | [Prioritu Gitu a trasování](#které-ssh-používá-git) | Sjednoť klienta a prověř lokální konfiguraci i proměnné |
| Fráze se zadává znovu při každé Git operaci | Cestu k `ssh.exe`, odpovídající `ssh-add -l` a stav agenta | [Načti klíč do správného agenta](#4-načti-klíč-do-windows-agenta) |
| `Error connecting to agent` nebo `Could not open a connection to your authentication agent` | Windows službu nebo `SSH_AUTH_SOCK` v Git Bash | Spusť odpovídajícího agenta a používej jeho `ssh-add` |
| `The agent has no identities` | Agent je dostupný, ale nemá klíče | Přidej zamýšlený klíč přes `ssh-add` |
| `Permission denied (publickey)` | Účet, cílový server, načtený klíč a registrovaný veřejný klíč | Použij `ssh -vvv` a porovnej nabízené identity s účtem na serveru |
| `Too many authentication failures` | Počet nabízených identit | Nastav pro daný `Host` správný `IdentityFile` a `IdentitiesOnly yes` |
| Timeout, odmítnutí spojení nebo chyba DNS | Název serveru, port, VPN a dostupnost služby | Ve Windows použij `Test-NetConnection server.example.com -Port 22`; úspěšný TCP test ještě nepotvrzuje SSH přihlášení |
| `REMOTE HOST IDENTIFICATION HAS CHANGED` | Změnu serveru a jeho nový otisk ověřený jinou důvěryhodnou cestou | Teprve po ověření aktualizuj konkrétní záznam `known_hosts`; nevypínej kontrolu identity serveru |
| GitHub po `ssh -T` vrací kód `1` | Text výsledku a přihlášený účet | Vyhodnoť [specifické chování testu GitHubu](certificates.md#test-připojení) |
| Git chce heslo k HTTPS | `git remote -v` | Použij správný protokol podle [nastavení remote](certificates.md#použití-v-git-repozitáři) |

Při změně Windows, Git for Windows, SSH distribuce nebo prostředí IDE znovu zkontroluj výběr klienta a agenta.

Postupy a odkazy byly ověřeny proti uvedeným oficiálním zdrojům dne **10. září 2026**.
