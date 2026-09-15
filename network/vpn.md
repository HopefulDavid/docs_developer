---
description: "Připojení do soukromé sítě, rozdělení provozu a diagnostika DNS, tras a portů."
---

# VPN – přístup do vzdálené sítě

VPN vytvoří tunel mezi tvým zařízením a vzdálenou bránou nebo dalším zařízením.

Vývojář přes něj může dosáhnout na interní Git, databázi či server, které nejsou přímo dostupné z internetu.

## Jak spojení funguje

```text
tvůj počítač → VPN tunel → vzdálená brána → interní služba
```

Směrování určuje, který provoz se do tunelu pošle, a DNS může pro interní jména potřebovat jiný resolver než běžný internet.

VPN přístup do sítě sám neuděluje účet ani databázové oprávnění.

## Vyber podle skutečné infrastruktury

| Situace | Co použít |
|---|---|
| Firemní síť | Klienta a profil určený správcem |
| Vlastní WireGuard server | WireGuard klienta a konfiguraci konkrétního peeru |
| Server poskytuje OpenVPN | Odpovídající klient a profil serveru |
| Brána poskytuje protokol podporovaný Windows | Vestavěné VPN připojení se správným typem ověření |
| Jen jedna neveřejná TCP služba za SSH | Může stačit [SSH tunel](ssh.md#lokální-tunel-k-neveřejné-službě) |

Nainstalování libovolného VPN klienta nevytvoří kompatibilní server.

Profil musí odpovídat protokolu a nastavení protistrany.

## Split tunnel a celý provoz

| Režim | Chování | Jak ho poznat při použití |
|---|---|---|
| Split tunnel | Tunelem jdou jen vybrané sítě | Interní server je dostupný, veřejný internet může dál používat místní bránu |
| Full / force tunnel | Výchozí trasa vede přes VPN, mohou existovat výjimky | Běžný internetový provoz zpravidla vystupuje u VPN brány |

IPv4, IPv6 a DNS se mohou směrovat samostatně, takže změna veřejné IP sama neprokazuje úplný průchod všech aplikací tunelem.

U WireGuardu `AllowedIPs` ovlivňuje výběr provozu pro peer a povolené zdrojové adresy.

Nejde o seznam uživatelů a nemá se bez důvodu změnit na všechny sítě.

## Praktické připojení

1. Získej správný profil, přihlašovací údaje a přesný název či IP interní služby.
2. Importuj profil do odpovídajícího klienta a zkontroluj, pro jakou síť je určený.
3. Připoj se a dokonči požadované vícefaktorové ověření.
4. Otevři konkrétní interní službu a přihlas se i do ní.
5. Po práci se odpoj, pokud VPN nepotřebuješ trvale.

Ve Windows se vestavěné připojení spravuje v **Nastavení → Síť a internet → VPN**.

WireGuard nebo OpenVPN obvykle používají vlastní klientské rozhraní.

Profil může obsahovat soukromý klíč, a proto jej uchovávej jako přístupový údaj.

## Diagnostika ve Windows

Příkazy v PowerShellu nic nepřesměrovávají.

Ukázkový název nahraď interní službou od správce.

```powershell
Resolve-DnsName -Name "git.firma.example"
Test-NetConnection -ComputerName "git.firma.example" -Port 443
Get-NetIPConfiguration
```

První příkaz ověří DNS, druhý TCP port a třetí zobrazí síťová rozhraní včetně relevantní konfigurace.

| Projev | Co ověřit |
|---|---|
| VPN se nepřipojí | Adresu brány, přihlášení, čas zařízení a log klienta |
| VPN je připojená, interní jméno neexistuje | DNS přidělené VPN a správný název |
| DNS funguje, TCP ne | Trasu, pravidla firewallu, běh služby a oprávnění VPN skupiny |
| TCP funguje, aplikace odmítá přihlášení | Samostatný účet a práva aplikace |
| Nefunguje jen určitá síť | Překryv domácí a vzdálené podsítě nebo split tunnel |
| Po připojení přestane fungovat internet | Výchozí trasu, DNS, kapacitu brány a požadovanou politiku přístupu |

Při překryvu například dvou sítí `192.168.1.0/24` může počítač hledat vzdálený server v domácí síti.

Neopravuj to náhodným mazáním tras a nejprve vyřeš adresní plán se správcem.

## Co VPN nezajišťuje sama

Tunel končí na vzdálené straně, proto služby dál používej přes HTTPS nebo SSH.

VPN nezaručuje anonymitu a web tě může poznat podle přihlášení či cookies.

Další rozlišení chyb je v [síťové diagnostice](basics.md).

Zdroje: [Microsoft: VPN routing](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/vpn/vpn-routing), [WireGuard: principy](https://www.wireguard.com/#cryptokey-routing), [OpenVPN dokumentace](https://openvpn.net/community-docs/).
