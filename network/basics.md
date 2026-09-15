---
description: "IP adresa, DNS, port, localhost a postupné ověření nedostupné služby."
---

# Síť – jak najít příčinu nefunkčního spojení

Přístup k aplikaci vyžaduje správnou adresu, cestu sítí, dostupný port a funkční službu.

Když tyto vrstvy ověřuješ postupně, poznáš, zda opravovat DNS, firewall, server nebo přihlášení.

## Co znamená adresa služby

```text
https://git.example.com:8443/projekty
│       │               │    └─ cesta zpracovaná aplikací
│       │               └────── TCP port serveru
│       └────────────────────── název, který DNS přeloží na IP adresu
└────────────────────────────── HTTPS: HTTP chráněné TLS
```

U běžného HTTPS bez uvedeného portu se používá `443` a u HTTP `80`.

Doména sama neurčuje číslo portu a úspěšné DNS ještě neznamená dostupnou aplikaci.

## Adresy, se kterými se vývojář setká

| Zápis | Význam |
|---|---|
| `127.0.0.1` a `::1` | Loopback: tento počítač, pro IPv4 a IPv6 |
| `localhost` | Jméno místního počítače pro loopback |
| `0.0.0.0` při naslouchání | Všechna místní IPv4 rozhraní, nikoli cílová adresa jiného počítače |
| `192.168.1.20` | Příklad soukromé IPv4 adresy v místní síti |
| `192.168.1.0/24` | Síť s 24 pevnými počátečními bity. Nejde o jeden konkrétní počítač |
| Výchozí brána | Router pro cíle mimo přímo připojené sítě |

Soukromé IPv4 rozsahy jsou `10.0.0.0/8`, `172.16.0.0/12` a `192.168.0.0/16`.

Přístup do nich z jiné sítě vyžaduje odpovídající propojení, například VPN.

NAT převádí adresy při průchodu routerem, ale sám službu na tvém počítači nezpřístupní lidem na internetu.

`localhost` uvnitř kontejneru označuje tento kontejner, nikoli automaticky hostitelský počítač.

## Postup ve Windows

V běžném PowerShellu nahraď název skutečnou službou a port jejím protokolem:

```powershell
Resolve-DnsName -Name "git.example.com"
Test-NetConnection -ComputerName "git.example.com" -Port 443
```

První příkaz ověřuje překlad názvu a druhý navázání TCP spojení.

`TcpTestSucceeded: True` ještě neověřuje heslo, certifikát ani obsah webu.

### Rozhodnutí podle výsledku

| Výsledek | Další kontrola |
|---|---|
| DNS nevrátí adresu | Přesný název, přidělené DNS a potřebná VPN |
| DNS vrátí jinou než očekávanou adresu | Správný resolver, hosts a síťové prostředí |
| TCP port není dostupný | Trasa, firewall, správný port a běh služby |
| TCP funguje, HTTPS selže | Certifikát, název serveru, čas počítače a TLS |
| Web vrací 401 nebo 403 | Přihlášení a oprávnění aplikace |
| Web vrací 500 | Logy serverové aplikace |

Ve Windows lze HTTP hlavičky orientačně načíst přes `curl.exe -I https://git.example.com`.

`.exe` odlišuje skutečný curl od historického PowerShell aliasu.

`-I` posílá metodu HEAD, kterou některé aplikace nepodporují, proto výsledné 405 samo neznamená nefunkční GET v prohlížeči.

## Je místní služba skutečně spuštěná?

Pro místní vývojový port `8080`:

```powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen |
    Select-Object LocalAddress, LocalPort, OwningProcess
```

Výpis ukáže adresu naslouchání a ID procesu.

Prázdný výsledek znamená, že tento TCP port v okamžiku kontroly nenaslouchá.

Služba na `127.0.0.1` je dostupná jen místně.

Změna na všechna rozhraní vyžaduje i promyšlené síťové oprávnění a nastavení firewallu.

`ping` ověřuje ICMP, nikoli HTTP či SSH port.

Blokovaný ping nevylučuje funkční aplikaci.

## Konfigurace a trasa

| Příkaz ve Windows | Co zjistí |
|---|---|
| `ipconfig /all` | Adresy rozhraní, brány a DNS |
| `route print` | Směrovací tabulku IPv4 a IPv6 |
| `tracert <server>` | Dostupné odpovědi po trase. Některé uzly nemusejí odpovídat |

Diagnostiku prováděj vůči konkrétní službě, ke které máš přístup, a veřejně nesdílej celý interní síťový výpis.

Navazují [VPN](vpn.md), [SSH](ssh.md) a [certifikáty HTTPS](certificates.md).

Zdroje: [Test-NetConnection](https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection), [soukromé adresy RFC 1918](https://www.rfc-editor.org/rfc/rfc1918), [curl](https://curl.se/docs/manpage.html).
