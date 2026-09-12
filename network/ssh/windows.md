---
description: "Instalace klienta, volba Windows OpenSSH nebo Git SSH a společný agent."
---

# SSH ve Windows – klient a agent

Windows OpenSSH, Git for Windows a WSL mohou mít každý svůj SSH program i vlastní prostředí.

Pro bezproblémové používání zvol klienta vědomě a načítej klíče do agenta, se kterým tento klient skutečně komunikuje.

## Které SSH se spouští

V běžném PowerShellu:

```powershell
Get-Command ssh -All | Select-Object CommandType, Name, Source, Definition
where.exe ssh
ssh -V
```

`Get-Command` ukáže i případný alias nebo funkci, `where.exe` cesty nalezených programů a `-V` verzi skutečně spuštěného klienta.

| Typická cesta | Prostředí |
|---|---|
| `C:\Windows\System32\OpenSSH\ssh.exe` | Windows OpenSSH |
| `C:\Program Files\Git\usr\bin\ssh.exe` | OpenSSH dodané s Git for Windows |
| `/usr/bin/ssh` ve WSL | Linuxová instalace ve zvolené distribuci |

Stejná cesta `/usr/bin/ssh` v Git Bash označuje jeho vlastní prostředí, nikoli automaticky WSL.

V Bashi pomůže `type -a ssh` a `command -v ssh`; v CMD použij `where.exe ssh`.

## Instalace Windows OpenSSH

Pro odchozí přihlášení nebo Git potřebuješ **Client**, nikoli službu SSH Server.

Pokud klient chybí, otevři 64bitový Windows PowerShell jako správce:

```powershell
Get-WindowsCapability -Online -Name 'OpenSSH.Client*'
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Instalační příkaz použij jen při stavu `NotPresent`; vyžaduje dostupný zdroj funkcí Windows.

Při požadovaném restartu restartuj počítač a v novém běžném terminálu ověř:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh.exe" -V
```

Alternativně vyhledej ve Windows **Volitelné funkce → OpenSSH Client**.

## Jeden klient pro Windows a Git

### Varianta A: Windows OpenSSH

Nejprve si poznamenej současné nastavení:

```powershell
git config --show-origin --show-scope --get-all core.sshCommand
Get-ChildItem Env:GIT_SSH*
```

Pro aktuální terminál můžeš Windows klienta upřednostnit:

```powershell
$env:Path = "$env:WINDIR\System32\OpenSSH;$env:Path"
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

První změna platí pouze pro toto okno, druhá nastaví klienta Gitu pro uživatelský účet; cestu uprav, pokud jsou Windows jinde.

Pro trvalou volbu terminálu uprav pořadí položek Path v nastavení prostředí a zachovej ostatní adresáře.

Potom úplně restartuj terminál i IDE; prioritu místních výjimek a proměnných vysvětluje [Git přes SSH](git.md#které-ssh-používá-git).

### Varianta B: OpenSSH z Git for Windows

Pokud používáš převážně Git Bash, lze ponechat klienta této instalace a načítat klíče do jeho agenta.

Následující příkaz je kvůli vnořeným uvozovkám určený pro **Git Bash**:

```bash
git config --global core.sshCommand '"C:/Program Files/Git/usr/bin/ssh.exe"'
```

Cestu ověř podle své instalace a postup pro agenta vyber v [SSH klíčích](keys.md#agent-v-git-bash-linuxu-a-macos).

Obě varianty jsou alternativy; není potřeba je střídavě nastavovat.

## Agent Windows OpenSSH

Agent zpřístupní odemčený klíč klientovi bez opakovaného zadávání heslové fráze.

V PowerShellu **jako správce**:

```powershell
Get-Service ssh-agent | Select-Object Name, Status, StartType
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

První příkaz zachytí původní stav, další zapnou automatické spouštění a současný běh služby.

V běžném PowerShellu **pod vlastním účtem** načti svůj existující klíč:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" "$env:USERPROFILE\.ssh\id_ed25519"
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" -l
```

Poslední příkaz musí vypsat jeho otisk; heslovou frázi zadáváš jen při odemčení.

Název souboru přizpůsob svému klíči a Windows službu nezaměňuj s agentem spuštěným uvnitř Git Bash nebo WSL.

## Ověření a návrat

Ověř běžné `ssh <alias>` a u Git projektu s SSH adresou `git ls-remote origin HEAD`.

Pokud terminál funguje a Git nikoli, zjisti [skutečně spuštěný klient](git.md#ověření-spuštěného-příkazu).

Pro návrat obnov původní konfigurační hodnoty, Path a případně původní režim služby; pouze pokud předtím globální volba neexistovala, odstraň ji přes `git config --global --unset-all core.sshCommand`.

## Kdy potřebuješ SSH Server

Server instaluj jen tehdy, pokud se chceš vzdáleně přihlašovat **na tento počítač**.

Vyžaduje samostatné nastavení služby `sshd`, firewallu a uživatelského přístupu; u administrátorských účtů Windows má soubor veřejných klíčů odlišné výchozí umístění i požadavky na oprávnění.

Postup správy serveru vlastní [Microsoft OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse); [správa klíčů](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement) popisuje také `administrators_authorized_keys`.

Zdroje: [instalace OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse), [Windows SSH agent pro Git](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows#adding-your-ssh-key-to-the-ssh-agent).
