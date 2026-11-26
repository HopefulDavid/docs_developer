---
description: "Přihlášení na server, přenos souborů, konfigurace spojení a lokální tunel."
---

# SSH – připojení k jinému počítači

SSH je šifrované spojení, přes které se lze přihlásit na vzdálený počítač, spustit příkaz nebo přenést soubor.

Na místním počítači běží **klient** a na cíli musí běžet dostupný **SSH server**.

Instalace klienta sama nepovolí příchozí přístup k místnímu zařízení.

## Údaje potřebné před připojením

| Údaj | Příklad | Kdo ho určuje |
|---|---|---|
| Adresa | `server.example.com` nebo IP | Správce cílového počítače |
| Uživatelský účet | `jana` | Účet existující na cíli |
| Port | `22`, případně jiný | Konfigurace SSH serveru a firewallu |
| Přihlášení | Heslo nebo [SSH klíč](ssh/keys.md) | Povolený způsob na serveru |
| Otisk serveru | SHA256 otisk hostitelského klíče | Správce nebo oficiální dokumentace služby |

Adresa `server.example.com` je ukázková a nahrazuje se skutečným serverem.

Ve Windows se nejprve ověří [instalace a výběr klienta](ssh/windows.md).

## První přihlášení

Obecná syntaxe:

```text
ssh [-p <port>] [-i <soukromý-klíč>] <uživatel>@<server>
```

Příklad pro účet `jana` na serveru s výchozím portem:

```bash
ssh jana@server.example.com
```

Při prvním připojení se zobrazený otisk porovná s nezávisle získaným otiskem serveru a důvěra se potvrdí až při shodě.

Otisk se uloží do `known_hosts`, aby klient při příštím spojení poznal stejný server.

Po přihlášení se příkazy spouštějí **na cílovém počítači** v jeho shellu.

Příkaz `exit` vzdálené přihlášení ukončí.

Heslo účtu nebo fráze klíče se při zadávání běžně nezobrazuje.

## Uložení připojení pod názvem

Obsah souboru `%USERPROFILE%\.ssh\config` ve Windows nebo `~/.ssh/config` v Linuxu a macOS:

```sshconfig
Host vyvoj
    HostName server.example.com
    User jana
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Soubor nemá příponu `.txt` a uvedené údaje musí odpovídat skutečnému serveru.

| Nastavení | Co lze změnit |
|---|---|
| `Host` | Vlastní krátký název spojení |
| `HostName` | Skutečná adresa serveru |
| `User` | Cílový účet |
| `Port` | Skutečný naslouchající port. `2222` je pouze příklad |
| `IdentityFile` | Cesta k vlastnímu soukromému klíči |
| `IdentitiesOnly yes` | Omezí nabídku na nakonfigurované identity místo libovolných dalších klíčů agenta |

```bash
ssh -G vyvoj
ssh vyvoj
```

`-G` vypíše účinnou konfiguraci bez přihlášení a druhý příkaz použije zkratku.

Konkrétní bloky patří před obecný `Host *`, protože pro běžné jednotlivé volby se použije první získaná hodnota.

## Přenos souborů

Příklady předpokládají nastavený alias `vyvoj` a linuxový cílový server, na kterém má účet právo zapisovat do domovské složky.

```bash
scp ./poznamky.txt vyvoj:./poznamky.txt
scp vyvoj:./poznamky.txt ./stazene-poznamky.txt
```

První příkaz nahraje existující místní soubor do domovské složky cílového účtu a druhý jej stáhne pod jiným místním názvem.

Před kopírováním se ověří cílový název, protože existující soubor lze přepsat.

| Syntaxe | Účel |
|---|---|
| `scp [-P <port>] <místní-soubor> <uživatel>@<server>:<cílová-cesta>` | Nahrání souboru |
| `scp [-P <port>] <uživatel>@<server>:<soubor> <místní-cesta>` | Stažení souboru |
| `scp -r <místní-adresář> <alias>:<cílová-cesta>` | Rekurzivní kopie adresáře |
| `sftp [-P <port>] <uživatel>@<server>` | Interaktivní přenos s příkazy `ls`, `get`, `put` a `exit` |

SSH používá pro port `-p`, ale SCP a SFTP `-P`.

Při použití aliasu si port převezmou z jeho konfigurace.

Novější OpenSSH používá pro SCP standardně protokol SFTP.

Kompatibilita se starým serverem se ověřuje před změnou transportu.

## Lokální tunel k neveřejné službě

Příklad předpokládá web na portu `80`, který je dostupný pouze ze SSH serveru.

```bash
ssh -N -L 127.0.0.1:8080:127.0.0.1:80 vyvoj
```

| Část | Význam |
|---|---|
| `-N` | Neotevře vzdálený shell, pouze tunel |
| První `127.0.0.1:8080` | Naslouchání jen na místním počítači na portu 8080 |
| Druhé `127.0.0.1:80` | Cíl z pohledu SSH serveru, tedy jeho vlastní port 80 |
| `vyvoj` | Server, který vytvoří vzdálenou část spojení |

Po dobu běhu je web dostupný na `http://127.0.0.1:8080`.

`Ctrl+C` tunel ukončí.

Místní port lze změnit na jiný volný, ale cílová adresa a port musí být známé a server musí tunelování povolovat.

`-L` zpřístupňuje cíl lokálně, `-R` vytváří naslouchání na vzdálené straně a `-D` místní SOCKS proxy.

Vzdálené či veřejné naslouchání se nastavuje jen pro konkrétní zamýšlený přístup.

## Diagnostika podle chyby

| Projev | Co znamená a co ověřit |
|---|---|
| `Could not resolve hostname` | Chybný název nebo DNS. Případně chybí potřebná VPN |
| `Connection timed out` | Cesta k serveru, firewall, VPN nebo nesprávná adresa |
| `Connection refused` | Cíl spojení odmítl. Ověřuje se běžící server a správný port |
| `Permission denied` | Spojení došlo k ověření identity. Kontroluje se účet a nabízený klíč |
| Změna hostitelského klíče | Může jít o reinstalaci i cizí server. Nový otisk se ověří jiným kanálem |

`ssh -vvv <alias>` vypíše podrobnosti přihlášení.

Před sdílením logu se odstraní soukromá jména, adresy a místní cesty.

Po nezávislém ověření legitimní změny odstraní starý záznam `ssh-keygen -R <server>`, u jiného portu `ssh-keygen -R "[<server>]:<port>"`, a při dalším spojení se ověří nový otisk.

Zdroje: [ssh](https://man.openbsd.org/ssh), [ssh_config](https://man.openbsd.org/ssh_config), [scp](https://man.openbsd.org/scp), [sftp](https://man.openbsd.org/sftp).

<a id="ulož-připojení-pod-názvem"></a>
<a id="ssh--windows-git-a-volba-klienta"></a>
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
<a id="agent-v-git-bash-linuxu-a-macos"></a>
<a id="rychlá-správa-agenta"></a>
<a id="které-ssh-používá-git"></a>
<a id="ověření-skutečně-spuštěného-příkazu"></a>
