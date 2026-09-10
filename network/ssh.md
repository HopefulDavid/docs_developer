<a id="ssh--windows-git-a-volba-klienta"></a>

# SSH – příkazy a připojení

> Přihlášení na server, kopírování souborů a nastavení připojení.

```text
ssh uzivatel@server.example.com
```

Nahraď účet a adresu vlastními údaji; při prvním připojení ověř otisk serveru u jeho správce před potvrzením důvěry.

**Nastavení:** [Windows a volba klienta](ssh/windows.md) · [SSH klíče](ssh/keys.md) · [Git a GitHub](ssh/git.md)

## Základní SSH příkazy

Příklady platí pro OpenSSH v PowerShellu i Bashi; vzdálené cesty a příkaz `uname` předpokládají linuxový server.

| Úloha | Příkaz |
| --- | --- |
| Verze klienta | `ssh -V` |
| Připojení na jiný port | `ssh -p 2222 uzivatel@server.example.com` |
| Použití konkrétního klíče | `ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes uzivatel@server.example.com` |
| Jeden vzdálený příkaz | `ssh uzivatel@server.example.com "uname -a"` |
| Nahrání souboru | `scp ./soubor.txt uzivatel@server.example.com:/tmp/` |
| Stažení souboru | `scp uzivatel@server.example.com:/tmp/soubor.txt ./` |
| Nahrání adresáře | `scp -r ./data uzivatel@server.example.com:/tmp/` |
| Kopírování přes jiný port | `scp -P 2222 ./soubor.txt uzivatel@server.example.com:/tmp/` |
| Interaktivní přenos souborů | `sftp -P 2222 uzivatel@server.example.com` |
| Podrobná diagnostika | `ssh -vvv uzivatel@server.example.com` |
| Ukončení vzdáleného shellu | `exit` |

SSH používá pro port malé `-p`, zatímco SCP a SFTP velké `-P`.

## Konfigurace jednotlivých serverů

Ulož zkratku připojení do `%USERPROFILE%\.ssh\config` pro Windows OpenSSH nebo `~/.ssh/config` pro Bash, Linux a macOS; soubor nemá příponu `.txt`.

```sshconfig
Host pracovni-server
    HostName server.example.com
    User uzivatel
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Pak stačí `ssh pracovni-server`; účinné nastavení bez připojení vypíše `ssh -G pracovni-server`.

Konkrétní bloky `Host` dávej před obecný `Host *`, protože OpenSSH obvykle použije první získanou hodnotu.

<details>
<summary>Lokální tunel přes SSH</summary>

```text
ssh -N -L 127.0.0.1:8080:127.0.0.1:80 uzivatel@server.example.com
```

Po dobu běhu příkazu zpřístupní `http://127.0.0.1:8080` na tvém počítači port 80 z pohledu SSH serveru; tunel ukončíš `Ctrl+C`.

</details>

## Řešení problémů

| Projev | Další krok |
| --- | --- |
| Příkaz `ssh` neexistuje | [Zkontroluj instalaci a cestu](ssh/windows.md#které-ssh-se-spouští). |
| `Permission denied (publickey)` | Pomocí `ssh -vvv` porovnej nabízený klíč a účet s veřejným klíčem uloženým na serveru. |
| `Connection refused` | Ověř adresu, port a běh SSH serveru. |
| `Connection timed out` | Ověř dostupnost sítě, VPN a pravidla firewallu. |
| Změnil se otisk serveru | Nejdříve ověř nový otisk u správce, teprve potom uprav záznam v `known_hosts`. |
| Terminál funguje, Git selhává | [Zjisti klienta, kterého spouští Git](ssh/git.md#které-ssh-používá-git). |

Před sdílením diagnostického výpisu odstraň soukromé názvy serverů, účtů a lokální cesty.

## Nastavení SSH

<!-- Stabilní kotvy zachovávají staré záložky a vedou k příslušnému návodu níže. -->

<a id="kde-začít"></a>
<a id="klient-server-a-agent"></a>
<a id="které-ssh-se-skutečně-spouští"></a>
<a id="powershell-a-cmd"></a>
<a id="git-bash-linux-a-macos"></a>
<a id="instalace-windows-openssh"></a>
<a id="klient-přes-powershell"></a>
<a id="klient-přes-nastavení"></a>
<a id="kdy-instalovat-server"></a>
<a id="sjednocení-na-windows-openssh"></a>
<a id="1-zkontroluj-přepsání-a-poznamenej-původní-stav"></a>
<a id="2-vyber-primární-ssh-v-terminálu"></a>
<a id="3-nastav-stejného-klienta-gitu"></a>
<a id="4-načti-klíč-do-windows-agenta"></a>
<a id="5-ověř-výsledek"></a>
<a id="alternativa-openssh-z-git-for-windows"></a>
<a id="návrat-k-původní-volbě"></a>

- [SSH ve Windows](ssh/windows.md) – zjištění implementace, instalace, primární klient a sjednocení s Gitem.

<a id="agent-v-git-bash-linuxu-a-macos"></a>
<a id="rychlá-správa-agenta"></a>

- [SSH klíče](ssh/keys.md) – vytvoření, heslová fráze a správa agenta.

<a id="které-ssh-používá-git"></a>
<a id="ověření-skutečně-spuštěného-příkazu"></a>

- [Git přes SSH](ssh/git.md) – GitHub, adresy repozitářů a diagnostika výběru klienta.

Podrobné přepínače: [ssh](https://man.openbsd.org/ssh), [scp](https://man.openbsd.org/scp), [sftp](https://man.openbsd.org/sftp) a [ssh_config](https://man.openbsd.org/ssh_config).
