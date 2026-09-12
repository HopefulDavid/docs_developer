---
description: "Přihlášení na server, přenos souborů, konfigurace spojení a lokální tunel."
---

# SSH – připojení k jinému počítači

SSH je šifrované spojení, přes které se přihlásíš na vzdálený počítač, spustíš příkaz nebo přeneseš soubor.

Na tvém počítači běží **klient** a na cíli musí běžet dostupný **SSH server**; instalace klienta sama nepovolí příchozí přístup k tvému zařízení.

## Co potřebuješ před připojením

| Údaj | Příklad | Kdo ho určuje |
|---|---|---|
| Adresa | `server.example.com` nebo IP | Správce cílového počítače |
| Uživatelský účet | `jana` | Účet existující na cíli |
| Port | `22`, případně jiný | Konfigurace SSH serveru a firewallu |
| Přihlášení | Heslo nebo [SSH klíč](ssh/keys.md) | Povolený způsob na serveru |
| Otisk serveru | SHA256 otisk hostitelského klíče | Správce nebo oficiální dokumentace služby |

Adresa `server.example.com` je ukázková a musíš ji nahradit svým skutečným serverem.

Ve Windows nejprve ověř [instalaci a výběr klienta](ssh/windows.md).

## První přihlášení

Obecná syntaxe:

```text
ssh [-p <port>] [-i <soukromý-klíč>] <uživatel>@<server>
```

Příklad pro účet `jana` na serveru s výchozím portem:

```bash
ssh jana@server.example.com
```

Při prvním připojení porovnej zobrazený otisk s nezávisle získaným otiskem serveru a až při shodě potvrď důvěru.

Otisk se uloží do `known_hosts`, aby klient při příštím spojení poznal stejný server.

Po přihlášení příkazy spouštíš **na cílovém počítači** a používáš jeho shell; příkaz `exit` vzdálené přihlášení ukončí.

Heslo účtu nebo fráze klíče se při zadávání běžně nezobrazuje.

## Ulož připojení pod názvem

Do `%USERPROFILE%\.ssh\config` ve Windows nebo `~/.ssh/config` v Linuxu a macOS ulož:

```sshconfig
Host vyvoj
    HostName server.example.com
    User jana
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Soubor nemá příponu `.txt` a uvedené údaje musí odpovídat tvému serveru.

| Nastavení | Co můžeš změnit |
|---|---|
| `Host` | Vlastní krátký název spojení |
| `HostName` | Skutečnou adresu serveru |
| `User` | Cílový účet |
| `Port` | Skutečný naslouchající port; `2222` je pouze příklad |
| `IdentityFile` | Cestu k vlastnímu soukromému klíči |
| `IdentitiesOnly yes` | Omezí nabídku na nakonfigurované identity místo libovolných dalších klíčů agenta |

```bash
ssh -G vyvoj
ssh vyvoj
```

`-G` vypíše účinnou konfiguraci bez přihlášení a druhý příkaz použije zkratku.

Konkrétní bloky dávej před obecný `Host *`, protože pro běžné jednotlivé volby se použije první získaná hodnota.

## Přenos souborů

Příklady předpokládají nastavený alias `vyvoj` a linuxový cílový server, na kterém máš právo zapisovat do domovské složky.

```bash
scp ./poznamky.txt vyvoj:./poznamky.txt
scp vyvoj:./poznamky.txt ./stazene-poznamky.txt
```

První příkaz nahraje existující místní soubor do domovské složky cílového účtu a druhý jej stáhne pod jiným místním názvem.

Před kopírováním ověř cílový název, protože existující soubor lze přepsat.

| Syntaxe | Účel |
|---|---|
| `scp [-P <port>] <místní-soubor> <uživatel>@<server>:<cílová-cesta>` | Nahrání souboru |
| `scp [-P <port>] <uživatel>@<server>:<soubor> <místní-cesta>` | Stažení souboru |
| `scp -r <místní-adresář> <alias>:<cílová-cesta>` | Rekurzivní kopie adresáře |
| `sftp [-P <port>] <uživatel>@<server>` | Interaktivní přenos s příkazy `ls`, `get`, `put` a `exit` |

SSH používá pro port `-p`, ale SCP a SFTP `-P`; při použití aliasu si port převezmou z jeho konfigurace.

Novější OpenSSH používá pro SCP standardně protokol SFTP; kompatibilitu se starým serverem ověř, než budeš měnit transport.

## Lokální tunel k neveřejné službě

Představ si web na portu `80`, který je dostupný pouze ze SSH serveru.

```bash
ssh -N -L 127.0.0.1:8080:127.0.0.1:80 vyvoj
```

| Část | Význam |
|---|---|
| `-N` | Neotevře vzdálený shell, pouze tunel |
| První `127.0.0.1:8080` | Naslouchání jen na tvém počítači na portu 8080 |
| Druhé `127.0.0.1:80` | Cíl z pohledu SSH serveru, tedy jeho vlastní port 80 |
| `vyvoj` | Server, který vytvoří vzdálenou část spojení |

Po dobu běhu otevři `http://127.0.0.1:8080`; `Ctrl+C` tunel ukončí.

Místní port můžeš změnit na volný, ale cílovou adresu a port musíš znát a server musí tunelování povolovat.

`-L` zpřístupňuje cíl lokálně, `-R` vytváří naslouchání na vzdálené straně a `-D` místní SOCKS proxy; vzdálené či veřejné naslouchání nastavuj jen pro konkrétní zamýšlený přístup.

## Diagnostika podle chyby

| Projev | Co znamená a co ověřit |
|---|---|
| `Could not resolve hostname` | Chybný název nebo DNS; zkontroluj také potřebnou VPN |
| `Connection timed out` | Cesta k serveru, firewall, VPN nebo nesprávná adresa |
| `Connection refused` | Cíl spojení odmítl; ověř běžící server a správný port |
| `Permission denied` | Spojení došlo k ověření identity; kontroluj účet a nabízený klíč |
| Změna hostitelského klíče | Může jít o reinstalaci i cizí server; ověř nový otisk jiným kanálem |

`ssh -vvv <alias>` vypíše podrobnosti přihlášení; před sdílením logu odstraň soukromá jména, adresy a místní cesty.

Po nezávislém ověření legitimní změny můžeš odstranit starý záznam pomocí `ssh-keygen -R <server>`, u jiného portu `ssh-keygen -R "[<server>]:<port>"`, a při dalším spojení ověřit nový otisk.

Zdroje: [ssh](https://man.openbsd.org/ssh), [ssh_config](https://man.openbsd.org/ssh_config), [scp](https://man.openbsd.org/scp), [sftp](https://man.openbsd.org/sftp).

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
