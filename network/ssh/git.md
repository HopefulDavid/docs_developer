# Git přes SSH

> Připojení ke GitHubu, SSH adresy repozitářů a diagnostika klienta používaného Gitem.

## Připojení ke GitHubu

1. [Vytvoř SSH klíč a zkopíruj jeho veřejnou část](keys.md#vytvoření-klíče), pokud jej ještě nemáš.
2. V GitHubu otevři **Settings → SSH and GPG keys → New SSH key**.
3. Vyplň název zařízení do **Title**, zvol **Authentication Key**, vlož veřejný klíč a ulož jej.
4. Otestuj připojení:

```text
ssh -T git@github.com
```

Při prvním spojení porovnej zobrazený otisk s [otisky SSH serverů GitHubu](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints), teprve potom potvrď důvěru.

Zpráva `Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.` znamená úspěch; tento test přesto vrací kód `1`, protože GitHub neposkytuje shell podle [oficiálního návodu](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection).

Vždy se připojuj jako `git`; konkrétní GitHub účet určuje přijatý klíč.

## SSH adresa repozitáře

Nový repozitář naklonuj pomocí SSH adresy z tlačítka **Code → SSH**:

```text
git clone git@github.com:uzivatel/repozitar.git
```

U existujícího repozitáře nejprve zkontroluj adresy a potom uprav zamýšlený remote:

```text
git remote -v
git remote set-url origin git@github.com:uzivatel/repozitar.git
git remote -v
```

Adresa `https://` používá HTTPS, takže ji výběr SSH klienta neovlivní.

<details>
<summary>Jiný server nebo oddělené adresy pro fetch a push</summary>

Pro jiný server převezmi SSH adresu od jeho správce, například `ssh://git@server.example.com:2222/tym/repozitar.git`.

Pokud `git remote -v` ukazuje samostatnou adresu pro push, uprav i ji, pokud ji chceš převést na SSH:

```text
git remote set-url --push origin git@github.com:uzivatel/repozitar.git
```

Při více adresách zkontroluj `git remote get-url --all origin` a `git remote get-url --push --all origin` a měň každou zamýšlenou adresu jednotlivě podle [git remote](https://git-scm.com/docs/git-remote).

</details>

## Které SSH používá Git

Spusť **uvnitř repozitáře v PowerShellu**, případně v terminálu IDE, kde problém nastává:

```powershell
git config --show-origin --show-scope --get-all core.sshCommand
git config --show-origin --show-scope --get-all ssh.variant
Get-ChildItem Env:GIT_SSH*
```

Prázdný výpis konfigurace s kódem `1` znamená nenastavenou položku; v Git Bash zobrazíš proměnné pomocí `env | grep '^GIT_SSH'`.

Git vybírá klienta v tomto pořadí:

| Priorita | Zdroj |
| --- | --- |
| 1 | `GIT_SSH_COMMAND` – příkaz v prostředí procesu |
| 2 | `core.sshCommand` – účinná konfigurace Gitu |
| 3 | `GIT_SSH` – cesta k programu bez dalších argumentů |
| 4 | `ssh` nalezené v prostředí procesu Gitu |

U `core.sshCommand` má přednost `git -c` před worktree, lokální, globální a systémovou konfigurací.

`ssh.variant` a `GIT_SSH_VARIANT` určují podobu argumentů pro OpenSSH či Plink, nikoli cestu ke klientovi.

**Změnu preference** pro terminál i Git proveď podle [nastavení Windows OpenSSH nebo klienta z Git for Windows](windows.md#jeden-klient-pro-windows-a-git).

<details>
<summary>Odstranění nechtěného přepsání</summary>

Pokud lokální hodnota pouze přebíjí požadovanou globální volbu, poznamenej si ji a odstraň ji v daném repozitáři:

```text
git config --local --unset-all core.sshCommand
```

Původ proměnných zkontroluj v PowerShellu:

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

Nepotřebné `GIT_SSH_COMMAND` z aktuálního procesu a uživatelského prostředí odstraníš takto:

```powershell
Remove-Item Env:GIT_SSH_COMMAND -ErrorAction SilentlyContinue
[Environment]::SetEnvironmentVariable('GIT_SSH_COMMAND', $null, 'User')
```

Uprav jen nalezené přepsání; může jej znovu nastavovat profil shellu nebo IDE, systémové proměnné vyžadují správce.

Při přechodu z Plinku odstraň také jeho nepotřebné `ssh.variant` v nalezeném rozsahu a `GIT_SSH_VARIANT`; standardní `ssh.exe` Git rozpozná automaticky.

</details>

### Ověření spuštěného příkazu

Pro repozitář s SSH remote spusť čtecí test v **PowerShellu**:

```powershell
$previousGitTrace = $env:GIT_TRACE
try {
    $env:GIT_TRACE = '1'
    git ls-remote origin HEAD
} finally {
    $env:GIT_TRACE = $previousGitTrace
}
```

Ve výpisu `run_command` hledej SSH příkaz; pokud je uvedené jen `ssh`, dohledání cesty stále závisí na prostředí Gitu a jednoznačnou volbu zajistí úplná cesta v `core.sshCommand`.

Po změně prostředí úplně restartuj IDE, které může používat jiný Git nebo vlastní SSH klient.

## Když připojení nefunguje

| Projev | Co zkontrolovat |
| --- | --- |
| Git chce přihlášení k HTTPS | SSH adresu v `git remote -v`. |
| `ssh -T` funguje, ale Git selhává | [Skutečně spuštěný příkaz](#ověření-spuštěného-příkazu) a přístup účtu ke konkrétnímu repozitáři. |
| `Permission denied (publickey)` | Nabízený klíč pomocí `ssh -vvv -T git@github.com` a veřejný klíč v účtu. |
| Heslová fráze se zadává opakovaně | [Agenta odpovídajícího klientovi](keys.md#odemykání-přes-agenta). |

Výběr klienta dokládají [proměnné Gitu](https://git-scm.com/docs/git#Documentation/git.txt-GITSSH), [core.sshCommand](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coresshCommand) a [implementace Gitu](https://github.com/git/git/blob/v2.55.0/connect.c).
