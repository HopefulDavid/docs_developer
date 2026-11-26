---
description: "Instalace klienta, volba Windows OpenSSH nebo Git SSH a společný agent."
---

# SSH ve Windows – klient a agent

Windows OpenSSH, Git for Windows a WSL mohou mít každý svůj SSH program i vlastní prostředí.

Spolehlivé používání vyžaduje vědomou volbu klienta a načítání klíčů do agenta, se kterým tento klient skutečně komunikuje.

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

V Bashi pomůže `type -a ssh` a `command -v ssh`.

V CMD slouží `where.exe ssh`.

## Instalace Windows OpenSSH

Odchozí přihlášení i Git potřebují **Client**, nikoli službu SSH Server.

Chybějící klient se instaluje v 64bitovém Windows PowerShellu spuštěném jako správce:

```powershell
Get-WindowsCapability -Online -Name 'OpenSSH.Client*'
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Instalační příkaz se použije jen při stavu `NotPresent`.

Vyžaduje dostupný zdroj funkcí Windows.

Pokud instalace vyžaduje restart, počítač se restartuje a v novém běžném terminálu se ověří:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh.exe" -V
```

Alternativou je položka **Volitelné funkce → OpenSSH Client** v nastavení Windows.

## Jeden klient pro Windows a Git

Git používá jednu z následujících variant klienta.

<a id="varianta-a-windows-openssh"></a>
<a id="varianta-b-openssh-z-git-for-windows"></a>

## [Windows OpenSSH](#tab/ssh-client-windows)

Nejprve se zaznamená současné nastavení:

```powershell
git config --show-origin --show-scope --get-all core.sshCommand
Get-ChildItem Env:GIT_SSH*
```

Pro aktuální terminál lze Windows klienta upřednostnit:

```powershell
$env:Path = "$env:WINDIR\System32\OpenSSH;$env:Path"
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

První změna platí pouze pro toto okno, druhá nastaví klienta Gitu pro uživatelský účet.

Cesta se upraví, pokud jsou Windows jinde.

Trvalou volbu terminálu určuje pořadí položek Path v nastavení prostředí, přičemž ostatní adresáře zůstávají.

Potom se úplně restartuje terminál i IDE.

Prioritu místních výjimek a proměnných vysvětluje [Git přes SSH](git.md#které-ssh-používá-git).

## [Git for Windows](#tab/ssh-client-git)

Při převážném používání Git Bash lze ponechat klienta této instalace a načítat klíče do jeho agenta.

Následující příkaz je kvůli vnořeným uvozovkám určený pro **Git Bash**:

```bash
git config --global core.sshCommand '"C:/Program Files/Git/usr/bin/ssh.exe"'
```

Cesta se ověří podle instalace a postup pro agenta popisují [SSH klíče](keys.md#agent-v-git-bash-linuxu-a-macos).

***

Obě varianty jsou alternativy.

Není potřeba je střídavě nastavovat.

## Agent Windows OpenSSH

Tato část platí pouze při výběru Windows OpenSSH.

Agent zpřístupní odemčený klíč klientovi bez opakovaného zadávání heslové fráze.

V PowerShellu **jako správce**:

```powershell
Get-Service ssh-agent | Select-Object Name, Status, StartType
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

První příkaz zachytí původní stav, další zapnou automatické spouštění a současný běh služby.

V běžném PowerShellu **pod vlastním účtem** se načte existující klíč:

```powershell
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" "$env:USERPROFILE\.ssh\id_ed25519"
& "$env:WINDIR\System32\OpenSSH\ssh-add.exe" -l
```

Poslední příkaz musí vypsat jeho otisk.

Heslová fráze se zadává jen při odemčení.

Název souboru se přizpůsobí klíči a Windows služba se nesmí zaměnit s agentem spuštěným uvnitř Git Bash nebo WSL.

## Ověření a návrat

Ověří se běžné `ssh <alias>` a u Git projektu s SSH adresou `git ls-remote origin HEAD`.

Když terminál funguje a Git nikoli, pomůže zjistit [skutečně spuštěný klient](git.md#ověření-spuštěného-příkazu).

Návrat obnoví původní konfigurační hodnoty, Path a případně původní režim služby.

Pouze pokud předtím globální volba neexistovala, odstraní se přes `git config --global --unset-all core.sshCommand`.

## Kdy je potřeba SSH Server

Server se instaluje jen pro vzdálené přihlašování **na tento počítač**.

Vyžaduje samostatné nastavení služby `sshd`, firewallu a uživatelského přístupu.

U administrátorských účtů Windows má soubor veřejných klíčů odlišné výchozí umístění i požadavky na oprávnění.

Postup správy serveru vlastní [Microsoft OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse).

[Správa klíčů](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement) popisuje také `administrators_authorized_keys`.

Zdroje: [instalace OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse), [Windows SSH agent pro Git](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows#adding-your-ssh-key-to-the-ssh-agent).
