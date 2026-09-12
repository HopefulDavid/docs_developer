# VPN: tunel, směrování a ověření přístupu

VPN vytváří spojení mezi zařízením a vzdálenou sítí nebo bránou; běžné VPN protokoly tento tunel šifrují.

Vývojář ji používá například pro přístup k internímu Git serveru, databázi nebo testovacímu prostředí.

## Jak VPN funguje

Klient ověří server, vytvoří tunel a podle směrovací tabulky do něj posílá vybraný provoz.

Za VPN bránou už ochrana samotného tunelu končí, proto mají aplikace dál používat HTTPS, SSH nebo jiné koncové šifrování.

| Režim | Co prochází tunelem | Praktický důsledek |
|---|---|---|
| Split tunnel | Jen vybrané sítě nebo adresy | Interní server může být dostupný, zatímco běžný web dál používá domácí připojení |
| Full / force tunnel | Výchozí směrování vede přes VPN, podle konfigurace mohou existovat výjimky | Internetový provoz může vystupovat přes VPN bránu a závisí na její kapacitě |

Přesné chování určuje konfigurace IPv4, IPv6, DNS a výjimek, nikoli pouze zelená ikona klienta.

Princip rozdělení provozu popisuje [Microsoft: směrování VPN](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/vpn/vpn-routing).

## Co je potřeba vědět před použitím

Získej od správce schváleného klienta, adresu serveru, způsob přihlášení a název služby, ke které máš mít přístup.

Soubor konfigurace může obsahovat soukromý klíč, proto jej nesdílej jako běžnou ukázku.

VPN neuděluje automaticky oprávnění k databázi a nenahrazuje aktualizace systému, vícefaktorové přihlášení ani kontrolu certifikátu.

## Praktické použití a kontrola

1. Připoj se schváleným klientem a dokonči požadované ověření identity.
2. Otevři konkrétní interní službu, kterou máš oprávnění používat.
3. Pokud nefunguje, rozliš překlad názvu, dosažitelnost portu a přihlášení do aplikace.

Ve Windows lze v PowerShellu ověřit interní web následujícím způsobem; ukázkový název nahraď názvem od správce.

```powershell
# DNS musí vrátit adresu očekávaného interního serveru.
Resolve-DnsName -Name 'git.firma.example'
# Kontrola TCP spojení na HTTPS; neověřuje přihlášení ani platnost certifikátu.
Test-NetConnection -ComputerName 'git.firma.example' -Port 443
```

`TcpTestSucceeded: True` znamená dostupné TCP spojení, nikoli zaručeně funkční web.

## Časté problémy

| Projev | Co prověřit |
|---|---|
| Název neexistuje | Přidělené DNS servery a správnost názvu |
| DNS funguje, port ne | Směrování, firewall a oprávnění dané VPN skupiny |
| Přihlášení je odmítnuto | Účet aplikace a jeho oprávnění |
| Nefunguje jen část sítí | Split tunnel, IPv6 nebo překryv domácí a firemní podsítě |
| Certifikát neodpovídá serveru | Správnou adresu a certifikát se správcem; chybu neobcházej |

## Důležité poznámky

HTTPS chrání obsah webové komunikace i bez VPN, pokud používáš důvěryhodný server a platný certifikát.

VPN přesouvá část důvěry k provozovateli brány; sama nezaručuje anonymitu, protože web tě může poznat podle účtu nebo cookies.

Změněná veřejná IP adresa není důkazem, že všechny aplikace a DNS dotazy používají tunel.
