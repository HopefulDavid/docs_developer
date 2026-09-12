# SSH klíče

> Vytvoření klíče, heslová fráze a odemykání pomocí agenta.

## Vytvoření klíče

V PowerShellu, Git Bash, Linuxu nebo macOS s dostupným `ssh-keygen` spusť:

```text
ssh-keygen -t ed25519 -C "Osobni notebook"
```

1. Potvrď nabídnuté umístění klíče ve složce `.ssh`, nebo zadej vlastní název.
2. Pokud program nabízí přepsání existujícího klíče, odpověz `n` a zvol jiný název.
3. Zadej heslovou frázi a potvrď ji; při psaní se znaky nezobrazují.

Frázi ulož do správce hesel, protože ji ze soukromého klíče nelze obnovit.

| Výchozí soubor | K čemu slouží |
| --- | --- |
| `id_ed25519` | Soukromý klíč; ponech jej u sebe a nikdy jej nevkládej do účtu ani repozitáře. |
| `id_ed25519.pub` | Veřejný klíč; přidává se na server nebo do účtu GitHub/Gitea. |

Hodnota za `-C` je pouze popisek klíče, nikoli heslo nebo přihlašovací jméno.

## Zkopírování veřejného klíče

V **PowerShellu** zobraz obsah; při jiném názvu uprav cestu:

```powershell
Get-Content -Encoding utf8 "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

Zkopíruj celý jediný řádek od `ssh-ed25519` včetně popisku a pokračuj [přidáním do GitHubu](git.md#připojení-ke-githubu) nebo [Gitea](../../vcs/git/server.md#ssh-přístup).

<details>
<summary>Výpis v Git Bash, Linuxu, macOS nebo CMD</summary>

V **Bashi**:

```bash
cat ~/.ssh/id_ed25519.pub
```

V **CMD**:

```bat
chcp 65001 >nul
type "%USERPROFILE%\.ssh\id_ed25519.pub"
```

</details>

## Změna heslové fráze nebo popisku

```text
ssh-keygen -p
```

Zadej cestu k **soukromému** klíči, dosavadní frázi a novou frázi; veřejný klíč zůstává stejný a není třeba jej znovu registrovat.

Pro změnu popisku použij `ssh-keygen -c` a postupuj podle výzev.

## Odemykání přes agenta

Pro Windows OpenSSH použij [nastavení služby a načtení klíče ve Windows](windows.md#3-zapni-společného-agenta-pokud-jej-chceš-používat).

### Agent v Git Bash, Linuxu a macOS

Nejprve zjisti, zda má aktuální terminál dostupného agenta:

```bash
ssh-add -l
```

Pokud hlásí, že se k agentovi nelze připojit, spusť jej v tomto terminálu:

```bash
eval "$(ssh-agent -s)"
```

Při hlášení `The agent has no identities` již agent běží; stačí přidat klíč:

```bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

Tento agent je dostupný procesům, které zdědí jeho `SSH_AUTH_SOCK`; IDE spuštěné jinak jej nemusí vidět.

<details>
<summary>Další příkazy agenta a starší servery</summary>

Příkazy spouštěj pomocí `ssh-add` odpovídajícího zvolenému agentovi.

| Úloha | Příkaz |
| --- | --- |
| Vypsat veřejné klíče | `ssh-add -L` |
| Odebrat jednu identitu z agenta | `ssh-add -d ~/.ssh/id_ed25519.pub` |
| Odebrat všechny identity z agenta | `ssh-add -D` |

Odebrání identity z agenta nemaže soubor klíče, ale ovlivní další spojení používající tohoto agenta.

Pokud starší server nepodporuje Ed25519, vytvoř místo něj RSA klíč příkazem `ssh-keygen -t rsa -b 4096 -C "Osobni notebook"`.

</details>

Podrobnosti: [ssh-keygen](https://man.openbsd.org/ssh-keygen), [ssh-agent](https://man.openbsd.org/ssh-agent), [ssh-add](https://man.openbsd.org/ssh-add) a [správa klíčů ve Windows](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement).
