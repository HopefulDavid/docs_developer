# SSH ve Windows

> Zjištění implementace, instalace a nastavení společného klienta pro terminál i Git.

## Které SSH se spouští

V **PowerShellu** spusť:

```powershell
Get-Command ssh -All | Select-Object CommandType, Name, Source, Definition
where.exe ssh
ssh -V
```

První výsledek `Get-Command` určuje volbu PowerShellu; cesta odliší instalace, verze potvrdí spuštěný program.

| Typická cesta | Implementace |
| --- | --- |
| `C:\Windows\System32\OpenSSH\ssh.exe` | Windows OpenSSH |
| `C:\Program Files\Git\usr\bin\ssh.exe` | OpenSSH přibalené ke Git for Windows |
| `/usr/bin/ssh` ve WSL | Samostatná linuxová instalace |
| `plink.exe` | Klient PuTTY / Plink |

Windows i Git dodávají OpenSSH, ale každý má vlastní programy a aktualizace; samotné číslo verze proto nestačí.

<details>
<summary>CMD, Git Bash a podrobnosti vyhledávání</summary>

V **CMD** použij `where.exe ssh` a `ssh -V`.

V **Git Bash, Bashi na Linuxu nebo macOS**:

```bash
type -a ssh
command -v ssh
ssh -V
```

V Git Bash odpovídá `/usr/bin/ssh` instalaci Gitu; Windows cestu zobrazí `cygpath -w /usr/bin/ssh.exe`.

`where.exe` hledá i v aktuálním adresáři, zatímco PowerShell odtud program bez `./` nespouští, pokud adresář není v `PATH`.

Alias nebo funkce může překrýt program i po změně `PATH`; původ ukáže `Get-Command` podle [pravidel PowerShellu](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence).

</details>

## Instalace Windows OpenSSH

Otevři **64bitový Windows PowerShell jako správce** a zjisti stav klienta:

```powershell
Get-WindowsCapability -Online -Name 'OpenSSH.Client*'
```

Pokud je stav `NotPresent`, nainstaluj jej:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Znovu ověř stav `Installed`, při `RestartNeeded: True` restartuj počítač a v novém běžném PowerShellu ověř verzi:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh.exe" -V
```

Pro připojování a Git stačí **OpenSSH Client**; server `sshd` potřebuješ pouze pro příchozí přihlášení na tento počítač.

<details>
<summary>Instalace přes Nastavení nebo řešení chyby instalace</summary>

Ve Startu vyhledej **Volitelné funkce → Přidat / Zobrazit funkce → OpenSSH Client** a dokonči instalaci.

Postup pro vestavěnou součást Windows 11, Windows 10 od sestavení 1809 a Windows Server od verze 2019 popisuje [Microsoft](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse), včetně samostatné instalace serveru.

Při problému se zdrojem balíčků nebo firemními zásadami použij [diagnostiku instalace](https://learn.microsoft.com/en-us/troubleshoot/windows-server/system-management-components/cant-install-openssh-features).

</details>

## Jeden klient pro Windows a Git

Následující postup volí **Windows OpenSSH**; terminál vybírá program přes `PATH`, Git může mít vlastní nastavení.

### 1. Nastav primární klient v terminálu

Pro aktuální **PowerShell**:

```powershell
$env:Path = "$env:WINDIR\System32\OpenSSH;$env:Path"
Get-Command ssh, ssh-add, ssh-keygen | Select-Object Name, Source
```

Pro trvalou volbu otevři **Proměnné prostředí → Path**, poznamenej si původní pořadí a umísti `%WINDIR%\System32\OpenSSH` před adresáře s jiným SSH.

Rozhoduje výsledné pořadí systémového a uživatelského `Path`; úprava systémové části vyžaduje správce a samotné přesunutí uživatelské položky nemusí stačit.

Ostatní položky zachovej, úplně restartuj Windows Terminal i IDE a zopakuj kontrolu z úvodu.

<details>
<summary>Stejný primární klient také v Git Bash</summary>

```bash
export PATH="/c/Windows/System32/OpenSSH:$PATH"
hash -r
type -a ssh
```

Pro trvalé nastavení přidej řádek `export` do `~/.bashrc` a ověř, že jej přihlašovací profil `~/.bash_profile` načítá.

Cestu uprav, pokud jsou Windows nainstalované jinde.

</details>

### 2. Nastav klienta pro Git

V repozitáři nejprve zobraz původní nastavení a případná přepsání:

```powershell
git config --show-origin --show-scope --get-all core.sshCommand
Get-ChildItem Env:GIT_SSH*
```

Poznamenej si původní hodnoty a nastav klienta pro svůj účet; cestu případně uprav podle instalace:

```powershell
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

Pokud už existuje `GIT_SSH_COMMAND` nebo lokální `core.sshCommand`, mají před globální volbou přednost; uprav je podle [diagnostiky Gitu](git.md#které-ssh-používá-git).

Pro výjimku v jediném repozitáři použij `--local` místo `--global`.

### 3. Zapni společného agenta, pokud jej chceš používat

Agent zpřístupní [SSH klíč](keys.md#vytvoření-klíče) bez opakovaného zadávání heslové fráze.

V **PowerShellu jako správce** si poznamenej původní stav služby a zapni ji:

```powershell
Get-Service ssh-agent | Select-Object Name, Status, StartType
Set-Service -Name ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

V **běžném PowerShellu pod svým účtem** načti soukromý klíč a ověř jeho otisk:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" "$env:USERPROFILE\.ssh\id_ed25519"
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" -l
```

Windows agent a agent Git Bash standardně nesdílejí načtené klíče, proto používej klienta i `ssh-add` ze stejné instalace podle [GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows#adding-your-ssh-key-to-the-ssh-agent).

### 4. Ověř skutečné připojení

Pro GitHub dokonči [registraci klíče a test spojení](git.md#připojení-ke-githubu), potom v repozitáři s SSH adresou spusť:

```powershell
git ls-remote origin HEAD
```

Úspěch vrátí kód `0` v `$LASTEXITCODE`; prázdný repozitář nemusí vypsat žádný řádek.

Pokud Git používá jiný klient nebo spojení selže pouze v IDE, pokračuj [trasováním příkazu](git.md#ověření-spuštěného-příkazu).

## Alternativa: primární OpenSSH z Git for Windows

Pokud pracuješ převážně v Git Bash, můžeš zvolit jeho klienta; tento příkaz se kvůli uvozovkám spouští v **Git Bash**:

```bash
git config --global core.sshCommand '"C:/Program Files/Git/usr/bin/ssh.exe"'
```

Uprav cestu podle instalace, v `PATH` terminálu upřednostni odpovídající adresář a pro klíče použij [agenta Git Bash](keys.md#agent-v-git-bash-linuxu-a-macos).

<details>
<summary>Návrat k původní volbě</summary>

Obnov původní hodnotu `core.sshCommand`; pokud před změnou žádná nebyla, odstraň přidanou globální volbu:

```text
git config --global --unset-all core.sshCommand
```

Lokální změnu vrať pomocí `--local` a obnov také původní `Path`, případný profil Git Bash a režim služby `ssh-agent`.

Po restartu terminálu znovu ověř volbu klienta; odstranění jedné hodnoty pouze uvolní místo dalšímu nastavení podle [priority Gitu](git.md#které-ssh-používá-git).

</details>
