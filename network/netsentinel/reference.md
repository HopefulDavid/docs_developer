---
description: "Tabulkový přehled všech devíti sekcí a 74 stránek NetSentinelu 2.3.0 s účelem, požadavky a odkazem na postup."
---

# NetSentinel – přehled všech funkcí

Tabulky odpovídají pořadí sekcí a stránek v levém pruhu aplikace verze 2.3.0.

Sloupec **Vyžaduje** uvádí spuštění jako správce nebo ovladač Npcap, prázdná hodnota znamená běh bez zvláštních oprávnění.

Konkrétní název nejrychleji najdeš hledáním prohlížeče nebo paletou příkazů `Ctrl+K` v NetSentinelu. Katalog přímo v aplikaci je v **Education → Feature Guide**.

Pro vedený postup nepoužívej tuto referenci od začátku do konce. Začni [základní kontrolou](basic-check.md), [sledováním](monitoring.md) nebo [pokročilou kontrolou](advanced-checks.md) podle svého cíle.

## Getting Started

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Home** | Souhrn stavu sítě, tlačítko **Scan Network**, doporučené další kroky a týdenní přehled | | [Základní kontrola](basic-check.md#1-spusť-sken-sítě) |
| **Dashboard** | Dlaždice se stavem skenů, zařízeními, šířkou pásma a DNS, **Edit Layout** je přeskládá, **Share Card** a **Export…** sdílejí výsledek | | [Reporty](monitoring.md#reporty) |
| **Speed Test** | Měření rychlosti stahování a odesílání přes Ookla s historií a volitelným automatickým během | | [Základní kontrola](basic-check.md#5-změř-rychlost-a-stabilitu) |
| **DNS &amp; Stability** | Živý graf odezvy routeru a DNS, detekce výpadků a **DNS Benchmark** resolverů | | [Základní kontrola](basic-check.md#5-změř-rychlost-a-stabilitu) |
| **What's Wrong?** | Diagnostika podle příznaku s verdiktem v jednoduché angličtině | | [Základní kontrola](basic-check.md#6-když-internet-zlobí) |
| **Troubleshoot** | Rozcestník příznaků, který otevře správný nástroj | | [Základní kontrola](basic-check.md#6-když-internet-zlobí) |

## Discover

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Devices** | Seznam zařízení s IP, MAC, výrobcem, typem a rizikem, filtry a kontextová nabídka | | [Základní kontrola](basic-check.md#2-zkontroluj-nalezená-zařízení) |
| **Network Map** | Interaktivní nebo klasická mapa topologie, **Traffic Overlay** ukáže provoz, **Share (Sanitised)** exportuje obrázek bez adres | | |
| **WiFi Networks** | Seznam okolních Wi-Fi sítí s kanálem, signálem a podezřelými SSID | zapnutá poloha ve Windows | [Časté problémy](basic-check.md#wi-fi-networks-ukazuje-nula-sítí) |
| **WiFi Heatmap** | Mapa síly signálu nad importovaným půdorysem, **Add Sample** po každém přesunu, **Render Heatmap** vykreslí | | |
| **DHCP Leases** | Přehled přidělených adres a DHCP serveru, na Windows z ARP cache | | [Pokročilé kontroly](advanced-checks.md#cizí-dhcp-server) |
| **DNS Zone Map** | Zónový přenos AXFR a mDNS služby v síti, například tiskárny a NAS | | |
| **Home Automation** | Chytrá zařízení podle výrobce s možností připnout je na Dashboard a propojit s MQTT | | |

## Monitor

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Network Logger** | Průběžný záznam odezvy, DNS a HTTP do CSV a živý log událostí | | [Sledování](monitoring.md#záznam-výpadků-a-odezvy) |
| **Live Bandwidth** | Rychlost odesílání a stahování po rozhraních za posledních 60 s | | [Sledování](monitoring.md#živý-provoz) |
| **App Traffic** | Provoz podle zařízení a kategorie, například web, streamování nebo VPN | Npcap | [Sledování](monitoring.md#živý-provoz) |
| **Active Connections** | Procesy tohoto počítače s otevřenými spojeními a blokování ve firewallu | | [Sledování](monitoring.md#živý-provoz) |
| **Syslog Viewer** | Příjem zpráv syslog z routerů, switchů a Linuxu přes UDP | | [Sledování](monitoring.md#historie-a-změny) |
| **SNMP Trap Receiver** | Příjem SNMP trap v1 a v2c od síťových prvků | | [Sledování](monitoring.md#historie-a-změny) |
| **Monitor Status** | Dlaždice se stavem všech monitorů a **Start Core Monitors** | | [Sledování](monitoring.md#historie-a-změny) |
| **Network Timeline** | Časová osa událostí ze všech zdrojů s filtry | | [Sledování](monitoring.md#historie-a-změny) |
| **Availability History** | Graf odezvy a dostupnosti sledovaných hostů | | [Sledování](monitoring.md#historie-a-změny) |
| **Inventory Changes** | Aktuální zařízení, štítky, události připojení a odpojení a porovnání skenů | | [Sledování](monitoring.md#historie-a-změny) |
| **Bandwidth Usage** | Objem dat na zařízení během zachytávání | správce a Npcap | [Sledování](monitoring.md#živý-provoz) |
| **Service Heartbeat** | Minutová kontrola dostupnosti zadaných hostitelů a portů | | [Sledování](monitoring.md#historie-a-změny) |
| **IPv6 Devices** | Sousedé v IPv6 a ping na link-local rozsah | | [Sledování](monitoring.md#historie-a-změny) |
| **Uptime &amp; SLA** | Dostupnost zařízení v procentech za 24 h, 7 a 30 dní | | [Sledování](monitoring.md#historie-a-změny) |

## Reports

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Network Grade** | Známka A až F v osmi dimenzích, HTML report a texty pro poskytovatele | | [Základní kontrola](basic-check.md#4-oznámkuj-síť) |
| **Network Health Report** | Automatické generování reportů v intervalu a jejich odesílání e-mailem | | [Reporty](monitoring.md#reporty) |
| **Network Doc** | HTML dokumentace sítě s topologií, zařízeními, porty a certifikáty | | [Reporty](monitoring.md#reporty) |
| **IP Calculator** | Výpočet podsítě z CIDR, binární zobrazení adresy a referenční tabulka prefixů | | [Reporty](monitoring.md#reporty) |
| **Notifications** | Pravidla upozornění, kanály, citlivost a historie doručení | | [Upozornění](monitoring.md#upozornění) |

## Analysis

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Broadcast Storm** | Měření broadcast a multicast provozu a určení zdroje | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#bouře-smyčky-a-bezdrátový-provoz) |
| **Rogue Bridge (STP)** | Zachycení BPDU a nalezení zařízení, které se prohlašuje za kořenový most | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#bouře-smyčky-a-bezdrátový-provoz) |
| **IoT Behaviour** | Naučení běžného provozu zařízení a hlášení odchylek | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#bouře-smyčky-a-bezdrátový-provoz) |
| **802.11 Monitor** | Pasivní zachycení rámců Wi-Fi včetně skrytých SSID a deautentizací | správce, Npcap a monitor mode | [Pokročilé kontroly](advanced-checks.md#bouře-smyčky-a-bezdrátový-provoz) |
| **ARP Spoof Watch** | Detekce konfliktů IP a MAC, tedy podvrženého routeru | Npcap | [Pokročilé kontroly](advanced-checks.md#podvržený-router) |
| **Hop-by-Hop Trace** | Průběžný traceroute se ztrátou a odezvou po skocích | | [Pokročilé kontroly](advanced-checks.md#cesta-k-serveru-a-pomalé-služby) |
| **SNMP Device Info** | Dotaz SNMP na název, popis, dobu běhu a chyby rozhraní zařízení | community string zařízení | |
| **Tools &amp; Wake-on-LAN** | Odeslání magic packetu podle MAC a seznam nových zařízení proti uložené základně | | |
| **Port Scanner** | TCP connect sken běžných portů jednoho zařízení | | [Pokročilé kontroly](advanced-checks.md#otevřené-porty) |
| **Geolocation Map** | Umístění veřejných adres z hrozeb a spojení na offline mapu | stažená databáze GeoLite2 | |
| **Trend Forecasts** | Předpověď odezvy, ztrát a jitteru z historie loggeru | několik dní dat | |
| **Service Diagnostics** | Diagnostika vrstev DNS, dostupnost, latence a cesta pro známé služby nebo vlastní hostitele | | [Pokročilé kontroly](advanced-checks.md#cesta-k-serveru-a-pomalé-služby) |
| **Root Cause Correlator** | Jedna společná příčina potíží sestavená z výsledků skenů | alespoň jeden sken | [Pokročilé kontroly](advanced-checks.md#cesta-k-serveru-a-pomalé-služby) |

## Automation

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Automation Hooks** | Příkaz nebo webhook spuštěný při události v síti | | [Integrace](monitoring.md#integrace-a-rozšíření) |
| **Scheduled Scans** | Opakovaný sken zařízení v zadaném intervalu | | [Plánované skeny](monitoring.md#plánované-skeny) |
| **Custom Triggers** | Vlastní výrazy nad metrikami s živým testem | | [Integrace](monitoring.md#integrace-a-rozšíření) |
| **MQTT / Home Assistant** | Publikování stavu a upozornění na MQTT broker | MQTT broker | [Integrace](monitoring.md#integrace-a-rozšíření) |
| **REST API** | Místní API jen pro čtení pro Grafanu, Home Assistant a skripty | | [Integrace](monitoring.md#integrace-a-rozšíření) |
| **Config Snapshots** | Snímky seznamu zařízení a portů a jejich porovnání | ve verzi 2.3.0 selhává | [Integrace](monitoring.md#integrace-a-rozšíření) |
| **Maintenance Windows** | Potlačení upozornění vybraných zařízení během údržby | | [Upozornění](monitoring.md#upozornění) |

## Security Audit

| Stránka | K čemu slouží | Vyžaduje | Postup |
|---|---|---|---|
| **Security Overview** | Známka, stav a stáří všech bezpečnostních kontrol, plánované kontroly na pozadí | | [Základní kontrola](basic-check.md#3-přečti-bezpečnostní-přehled) |
| **Port Scan (TCP)** | SYN sken portů s volbou rychlosti a rozsahu | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#otevřené-porty) |
| **Port Scan (UDP)** | Sken UDP služeb jednoho zařízení | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#otevřené-porty) |
| **CVE Lookup** | Vyhledání zranitelností NVD podle verzí služeb | verze ze skenu portů | [Pokročilé kontroly](advanced-checks.md#zranitelnosti-služeb) |
| **Threat Intel** | Porovnání adres s veřejnými seznamy hrozeb a ruční ověření adresy | | [Pokročilé kontroly](advanced-checks.md#riziko-zařízení-a-hrozby) |
| **TLS &amp; Exposure** | Sledování platnosti certifikátů zadaných hostů | | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **Login Test** | Přihlášení přes SSH a soupis balíčků, služeb, uživatelů a portů | správce a přístup SSH | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **OS Detection** | Odhad operačního systému zařízení | správce | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **Device Risk Score** | Rizikové skóre každého zařízení s doporučením | | [Pokročilé kontroly](advanced-checks.md#riziko-zařízení-a-hrozby) |
| **CVE Tracker** | Evidence nalezených CVE a jejich stavu | | [Pokročilé kontroly](advanced-checks.md#zranitelnosti-služeb) |
| **Exposed to Internet** | Veřejná adresa, CGNAT a pravidla UPnP routeru | | [Pokročilé kontroly](advanced-checks.md#dostupnost-z-internetu) |
| **Full Device Discovery** | Souběžné hledání zařízení přes ARP, ICMP, TCP SYN a mDNS | správce pro aktivní režim | [Pokročilé kontroly](advanced-checks.md#chybí-zařízení) |
| **Windows Shares (SMB)** | Výpis sdílených složek a uživatelů přes SMB | | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **Recon Plugins** | Vlastní kontroly v Pythonu ze složky `plugins` | | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **Private Endpoint Check** | Ověření privátních endpointů, jejich adres a certifikátů | | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **Cloud Metadata Probe** | Detekce běhu v cloudu a proxy k metadatům | | [Pokročilé kontroly](advanced-checks.md#další-bezpečnostní-nástroje) |
| **DHCP Rogue Monitor** | Odeslání DHCP Discover a výpis odpovídajících serverů | správce a Npcap | [Pokročilé kontroly](advanced-checks.md#cizí-dhcp-server) |

## Education

| Stránka | K čemu slouží |
|---|---|
| **Protocol Visualizer** | Animované diagramy deseti protokolů, například ARP, DNS, TCP a DHCP, s adresami z tvé sítě a exportem PNG |
| **Lab Mode** | Deset vedených cvičení nad živou sítí s nápovědami, řešením, odznaky a exportem HTML reportu |
| **Feature Guide** | Prohledávatelný katalog všech funkcí s tlačítky **Open** |
| **Help &amp; Reference** | Rychlý start, klávesové zkratky, slovník pojmů a tabulka běžných scénářů |

## Extend

| Stránka | K čemu slouží |
|---|---|
| **Hardware** | Záložka **Hardware** přidá plugin routeru, modemu nebo Home Assistantu, **Browse** stahuje komunitní pluginy a **Write a Plugin** obsahuje průvodce tvorbou vlastního pluginu |

Po přidání pluginu se jeho stránka objeví v této sekci pod názvem zařízení.

## Nastavení a hlavička

Nastavení aplikace, hlavičku, stavový řádek a klávesové zkratky popisuje [přehled aplikace](../netsentinel.md#první-spuštění-a-orientace).

Vestavěný reset nastavení nemaže databázi ani pověření. Úplné vyčištění popisuje [návrat do továrního stavu](factory-reset.md).
