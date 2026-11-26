---
description: "Vytvoření a ochrana SSH klíče, registrace veřejné části a používání agenta."
---

# SSH klíče – vytvoření a používání

SSH pár tvoří soukromý klíč u uživatele a veřejný klíč uložený u cílového účtu.

Server ověří, že uživatel ovládá odpovídající soukromou část, aniž by mu ji posílal.

## Dvě různá ověření

| Ověření | Co prokazuje |
|---|---|
| Hostitelský klíč serveru | Spojení vede ke známému správnému serveru |
| Uživatelský klíč | Uživatel smí vystupovat jako daný účet |

Heslová fráze chrání soukromý klíč na disku.

Není to heslo vzdáleného účtu.

## Vytvoření klíče

S dostupným OpenSSH v PowerShellu nebo Bashi:

```bash
ssh-keygen -t ed25519 -C "Osobni notebook"
```

`-t` volí algoritmus a `-C` čitelný popisek zařízení.

1. Klíč dostane nabízenou cestu nebo vlastní jméno v `.ssh`.
2. Nabídku přepsání existujícího klíče odmítne `n` a nový název, aby původní identita zůstala zachovaná.
3. Silná heslová fráze se uloží do správce hesel.

| Výchozí soubor | Zacházení |
|---|---|
| `id_ed25519` | Soukromý klíč, nepatří do hostingu, chatu ani repozitáře |
| `id_ed25519.pub` | Veřejná část určená k registraci u serveru |

Pro starší systém, který Ed25519 nepodporuje, lze po ověření jeho požadavků použít `ssh-keygen -t rsa -b 4096 -C "Osobni notebook"`.

Počet `4096` určuje velikost RSA klíče, nikoli délku hesla.

## Registrace veřejného klíče

V PowerShellu:

```powershell
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

V Bashi slouží `cat ~/.ssh/id_ed25519.pub` a kopíruje se celý řádek začínající `ssh-ed25519`.

- U Git hostingu patří řádek do nastavení SSH klíčů účtu. [GitHub postup](git.md#připojení-ke-githubu) popisuje konkrétní obrazovku.
- U linuxového serveru patří veřejný řádek do `~/.ssh/authorized_keys` cílového účtu.
- U Windows serveru závisí umístění i oprávnění na typu účtu. Popisuje je [postup Microsoftu](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement).

Na Linuxu s existujícím heslovým přístupem a nástrojem `ssh-copy-id` má automatické přidání syntaxi `ssh-copy-id -i <veřejný-klíč.pub> <uživatel>@<server>`.

Při ručním nastavení na Linuxu bývá potřeba `chmod 700 ~/.ssh` a `chmod 600 ~/.ssh/authorized_keys` provedené na serveru pod správným účtem.

Vlastník souboru musí odpovídat tomuto účtu.

## Ověření konkrétní identity

```text
ssh -i <soukromý-klíč> -o IdentitiesOnly=yes <uživatel>@<server>
ssh-keygen -lf <veřejný-klíč.pub>
```

První příkaz nabídne vybranou identitu a druhý ukáže její otisk pro porovnání s registrovaným klíčem.

Funkční cestu lze trvale uvést v [SSH config](../ssh.md#uložení-připojení-pod-názvem).

## Odemykání přes agenta

Pro Windows OpenSSH slouží [služba ssh-agent](windows.md#agent-windows-openssh).

### Agent v Git Bash, Linuxu a macOS

Nejprve kontrola agenta:

```bash
ssh-add -l
```

Výpis identit znamená dostupného agenta.

Hlášení `The agent has no identities` znamená běžícího agenta bez načteného klíče.

Pouze pokud se k agentovi nelze připojit, spustí se pro tuto relaci:

```bash
eval "$(ssh-agent -s)"
```

Příkaz načte proměnné nově spuštěného agenta do aktuálního shellu.

Potom se přidá klíč:

```bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

Procesy musí zdědit odpovídající `SSH_AUTH_SOCK`.

Samostatně spuštěné IDE nemusí vidět stejného agenta.

| Syntaxe | Účinek |
|---|---|
| `ssh-add <soukromý-klíč>` | Odemkne a načte identitu |
| `ssh-add -l` | Vypíše otisky načtených klíčů |
| `ssh-add -d <veřejný-klíč.pub>` | Odebere jednu identitu z agenta |
| `ssh-add -D` | Odebere všechny identity z tohoto agenta |

Odebrání identity nemaže soubor klíče, jen jeho dostupnost pro další přihlášení přes agenta.

## Změna fráze, záloha a ztráta

`ssh-keygen -p -f <soukromý-klíč>` změní ochrannou frázi po zadání původní.

Veřejná identita zůstane stejná.

Záloha patří do chráněného šifrovaného úložiště a fráze se uchovává odděleně od nechráněné kopie souboru.

Při podezření na únik soukromého klíče se jeho veřejná část odebere ze všech účtů, vytvoří se nový pár a registrace se nahradí.

Pouhá změna fráze neodvolá již zkopírovanou identitu.

Agent forwarding `ssh -A` se nezapíná plošně: vzdálený systém může po dobu spojení využívat dostupného agenta.

Zdroje: [ssh-keygen](https://man.openbsd.org/ssh-keygen), [ssh-add](https://man.openbsd.org/ssh-add), [ssh-agent](https://man.openbsd.org/ssh-agent).
