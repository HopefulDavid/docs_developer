---
description: "Přihlášení GitHub klíčem, dva účty na jednom počítači a diagnostika klienta."
---

# Git přes SSH

Git používá SSH jako přenos a ověření přístupu ke vzdálenému repozitáři.

Klíč rozhoduje o účtu na serveru, zatímco `git config user.name` a `user.email` pouze určují autora commitů.

## Připojení ke GitHubu

1. [Vytvoř klíč](keys.md#vytvoření-klíče) nebo vyber svůj existující.
2. V GitHubu otevři **Settings → SSH and GPG keys → New SSH key**.
3. Zvol **Authentication Key**, pojmenuj zařízení a vlož celý obsah veřejného `.pub` souboru.
4. Ulož a otestuj spojení:

```bash
ssh -T git@github.com
```

Při prvním připojení porovnej otisk s [oficiálními otisky GitHubu](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints).

Úspěšná odpověď obsahuje tvůj účet a informaci, že ověření prošlo, ale GitHub neposkytuje shell.

Tento test vrací kód `1` i při úspěšném přihlášení.

Připojovací účet je `git` a konkrétní GitHub identitu určí přijatý klíč.

## Připoj konkrétní repozitář

Zkopíruj SSH adresu z **Code → SSH**:

```text
git clone <SSH-URL> [<cílová-složka>]
```

Pro existující místní projekt místo klonování:

```text
git remote -v
git remote set-url origin <SSH-URL>
git ls-remote origin HEAD
```

Nahraď `<SSH-URL>` skutečnou adresou.

Například tvar `git@github.com:<vlastník>/<repozitář>.git` obsahuje dvě hodnoty z tvého projektu.

Příkaz `ls-remote` ověřuje čtení daného repozitáře, zatímco samotný `ssh -T` prokazuje pouze přihlášení k účtu.

Adresa začínající `https://` nepoužívá SSH.

Pokud má remote samostatnou push URL, zkontroluj také `git remote get-url --push --all origin` a podle záměru ji změň pomocí `git remote set-url --push origin <SSH-URL>`.

## Dva účty na jednom počítači

Vytvoř samostatný klíč pro každou identitu a registruj veřejné části do příslušných účtů.

V `~/.ssh/config`, ve Windows zpravidla `%USERPROFILE%\.ssh\config`:

```sshconfig
Host github-osobni
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_osobni
    IdentitiesOnly yes

Host github-prace
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_prace
    IdentitiesOnly yes
```

`Host` vytváří dvě místní zkratky stejného serveru, které se liší vybraným soukromým klíčem.

```bash
ssh -T github-osobni
ssh -T github-prace
```

Odpovědi mají identifikovat příslušné dva účty.

V remote URL pak použij alias, například syntaxi `git@github-prace:<organizace>/<repozitář>.git`, a projektovou identitu autora nastav samostatně přes `git config --local user.email "<pracovní-e-mail>"`.

## Které SSH používá Git

V PowerShellu uvnitř problémového repozitáře:

```powershell
git config --show-origin --show-scope --get-all core.sshCommand
git config --show-origin --show-scope --get-all ssh.variant
Get-ChildItem Env:GIT_SSH*
```

Prázdná konfigurace s návratovým kódem `1` může jen znamenat, že klíč není nastavený.

| Pořadí | Zdroj volby klienta |
|---|---|
| 1 | Proměnná `GIT_SSH_COMMAND` |
| 2 | Účinné `core.sshCommand` |
| 3 | Proměnná `GIT_SSH` |
| 4 | Příkaz `ssh` nalezený v prostředí procesu Gitu |

Místní konfigurace může přebít globální a dočasné `git -c` může přebít obě.

`ssh.variant` a `GIT_SSH_VARIANT` určují podobu argumentů klienta, nikoli jeho cestu.

Společný Windows nebo Git klient nastav podle [návodu pro Windows](windows.md#jeden-klient-pro-windows-a-git).

### Ověření spuštěného příkazu

Čtecí test pro SSH remote v PowerShellu:

```powershell
$previousGitTrace = $env:GIT_TRACE
try {
    $env:GIT_TRACE = "1"
    git ls-remote origin HEAD
} finally {
    $env:GIT_TRACE = $previousGitTrace
}
```

Výpis ukáže spouštěný příkaz a `finally` obnoví původní nastavení trasování.

Pokud výpis obsahuje pouze `ssh` bez celé cesty, její dohledání stále závisí na prostředí Gitu.

Nechtěné přepsání oprav pouze v nalezeném rozsahu.

Například `git config --local --unset-all core.sshCommand` odstraní místní volbu a nechá se uplatnit nižší nastavení.

## Diagnostika

| Projev | Co zkontrolovat |
|---|---|
| Přihlášení funguje, repozitář ne | Oprávnění daného účtu, přesnou URL, případně organizací vyžadované SSO |
| Nabízí se jiný účet | Alias v URL, `IdentityFile` a `IdentitiesOnly` |
| `Permission denied (publickey)` | Výpis `ssh -vvv -T <alias>`, registrovaný veřejný klíč a agenta |
| Terminál funguje, IDE ne | Git a SSH cestu IDE, zděděné prostředí a restart po změně konfigurace |
| Opakované zadávání fráze | Správného [agenta](keys.md#odemykání-přes-agenta) |

Zdroje: [test GitHub SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection), [proměnné Gitu](https://git-scm.com/docs/git#Documentation/git.txt-GITSSH), [core.sshCommand](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coresshCommand).
