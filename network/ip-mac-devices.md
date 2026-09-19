---
description: "Příkazy pro zjištění IP, MAC, brány, DNS, adresy WSL a dohledání telefonu nebo jiného zařízení v místní síti."
---

# IP, MAC a zařízení v místní síti

Tento tahák pomůže rychle zjistit adresy vlastního počítače, WSL i dalších zařízení ve stejné domácí nebo pracovní síti.

Příkazy nemění nastavení sítě.

Nepotřebují oprávnění správce.

Ping a dotaz na veřejnou IP ale posílají běžný síťový požadavek.

## Nejdřív vyber správný údaj

| Co hledáš | Co použít |
|---|---|
| Místní IP počítače | `Get-NetIPConfiguration` pro adresu aktivního rozhraní v současné síti |
| MAC vlastního adaptéru | `Get-NetAdapter` pro linkovou adresu rozhraní |
| IP a MAC telefonu nebo tiskárny | Správu routeru nebo `Get-NetNeighbor` pro zařízení ve stejné místní síti |
| IP distribuce WSL 2 | `wsl.exe hostname -I`, zejména v režimu NAT |
| Windows host z WSL 2 | `ip route show default` pro výchozí bránu v režimu NAT |
| Veřejná IP | Externí službu, nikoli výpis místního adaptéru |

Počítač může mít současně více adres kvůli Wi-Fi, Ethernetu, VPN, WSL, Dockeru a IPv6.

Pro spojení v domácí síti obvykle hledáš IPv4 aktivního adaptéru s výchozí bránou.

## Windows: vlastní IP, brána, DNS a MAC

V běžném PowerShellu spusť:

```powershell
Get-NetIPConfiguration
```

Výpis seskupí aktivní rozhraní a ukáže jejich IP adresy, výchozí bránu a DNS servery.

Řádek `IPv4Address` u používané Wi-Fi nebo Ethernetu je obvykle adresa, kterou použije jiné zařízení ve stejné síti.

Pro stručný seznam adaptérů a jejich MAC adres:

```powershell
Get-NetAdapter |
    Select-Object Name, Status, MacAddress, LinkSpeed
```

`Status` má být u používaného adaptéru `Up`.

MAC adresa zde patří tvému počítači, nikoli routeru nebo telefonu.

Klasický příkaz dostupný v PowerShellu i CMD:

```bat
ipconfig /all
```

Hledej adaptér, který má **IPv4 Address**, **Default Gateway** a stav připojeného média.

Virtuální adaptéry WSL, Dockeru nebo VPN mohou mít vlastní adresu, ale obvykle nejsou adresou počítače v domácí Wi-Fi.

## Veřejná IP

Veřejná IP není totéž co místní adresa z `Get-NetIPConfiguration`.

Ukáže ji až služba dostupná přes internet, například ipify:

```powershell
(Invoke-RestMethod -Uri "https://api.ipify.org?format=json").ip
```

V Bashi se stejným účelem:

```bash
curl --silent https://api.ipify.org
```

Požadavek odešle službě tvoji veřejnou zdrojovou adresu, protože bez ní ji nemůže vrátit.

Výsledek může patřit routeru, VPN nebo sdílenému překladu adres poskytovatele a nemusí jednoznačně označovat jeden počítač.

## WSL: adresa Linuxu a Windows hostu

Z PowerShellu zjistíš adresu výchozí distribuce WSL 2 takto:

```powershell
wsl.exe hostname -I
```

Z konkrétní distribuce:

```powershell
wsl.exe --distribution Ubuntu hostname -I
```

`Ubuntu` nahraď názvem z `wsl.exe --list --verbose`.

Velké `I` je důležité.

Malé `hostname -i` může vrátit pomocnou adresu jako `127.0.1.1`, která není adresou WSL dostupnou z Windows.

Přímo uvnitř WSL použij:

```bash
hostname -I
ip -brief address
ip route show default
```

`hostname -I` vypíše všechny nelokální adresy oddělené mezerou.

`ip -brief address` přiřadí adresy ke konkrétním rozhraním.

`ip route show default` ukáže výchozí bránu.

V běžném režimu NAT bývá brána zároveň adresou Windows hostu viditelnou z WSL.

Pokud potřebuješ jen tuto adresu:

```bash
ip route show | awk '/default/ { print $3; exit }'
```

V zrcadleném síťovém režimu WSL lze pro spojení mezi Windows a Linuxem často použít `localhost`.

Adresa WSL se může změnit po `wsl.exe --shutdown` nebo restartu počítače, proto ji nevkládej natrvalo do konfigurace bez skutečné potřeby.

## Telefon, tiskárna nebo jiné zařízení

MAC jiného zařízení lze z počítače zjistit pouze tehdy, když je zařízení ve stejné místní síti a počítač o něm má záznam v sousední tabulce.

Přes router, VPN nebo internet se původní MAC adresa nepřenáší.

### Když znáš IP zařízení

Následující příklad používá ilustrační adresu `192.168.1.42`.

Nahraď ji adresou svého zařízení:

```powershell
ping.exe -n 1 192.168.1.42
Get-NetNeighbor -IPAddress "192.168.1.42" |
    Format-Table IPAddress, LinkLayerAddress, State, InterfaceAlias
```

První příkaz vyvolá pokus o místní komunikaci a druhý vyhledá odpovídající IP a MAC adresu.

Zařízení nemusí na ping odpovědět, ale Windows přesto může při pokusu doplnit jeho linkovou adresu.

Prázdný výsledek znamená, že Windows odpovídající záznam nemá, zařízení je vypnuté, používá jinou síť nebo mezi zařízeními stojí router či izolace Wi-Fi klientů.

### Když IP zařízení neznáš

Zobraz aktuálně známé sousedy IPv4:

```powershell
Get-NetNeighbor -AddressFamily IPv4 |
    Where-Object { $_.State -notin "Unreachable", "Incomplete" } |
    Sort-Object InterfaceAlias, IPAddress |
    Format-Table InterfaceAlias, IPAddress, LinkLayerAddress, State
```

Jednodušší historická varianta pro PowerShell i CMD:

```bat
arp -a
```

Tyto výpisy nejsou úplný seznam sítě.

Obsahují jen nedávno známé sousedy a mohou zahrnovat router, multicastové adresy, virtuální adaptéry nebo staré záznamy.

Nejspolehlivější přehled připojených zařízení poskytuje stránka **Connected devices**, **Clients**, **DHCP leases** nebo podobně pojmenovaná část správy vlastního routeru.

Pro přehledné aktivní hledání zařízení můžeš použít také [základní kontrolu NetSentinelu](netsentinel/basic-check.md).

Skenuj pouze vlastní síť nebo síť, k jejíž kontrole máš souhlas.

## Jak poznat iPhone

1. Připoj iPhone ke stejné Wi-Fi jako počítač.
2. Na iPhonu otevři **Nastavení → Wi-Fi** a klepni na informační tlačítko u připojené sítě.
3. Porovnej zobrazenou IP adresu a **Wi-Fi adresu** se správou routeru nebo sousední tabulkou ve Windows.
4. Pokud se zařízení v routeru zobrazuje pod nejasným názvem, pojmenuj si ho podle této dvojice adres.

iPhone používá pro jednotlivé Wi-Fi sítě soukromou MAC adresu.

V novějších verzích iOS může být pevná pro danou síť nebo se pravidelně měnit.

Router proto nemusí ukazovat hardwarovou MAC adresu uvedenou v obecných informacích o telefonu.

Soukromou adresu nevypínej jen kvůli rozpoznání zařízení.

Pro identifikaci použij aktuální Wi-Fi adresu z detailu konkrétní sítě.

## Linux: stejné údaje bez WSL

Na běžné distribuci Linuxu fungují stejné nástroje jako ve WSL:

```bash
hostname
hostname -I
ip -brief address
ip route show default
ip neigh show
```

`hostname` vrátí název počítače.

`ip neigh show` zobrazí IP a linkové adresy známých zařízení ve stejné síti.

Stejně jako ve Windows jde o cache sousedů, nikoli o zaručený inventář všech zařízení.

## Názvy, DNS a dostupnost služby

Název vlastního počítače ve Windows:

```powershell
hostname.exe
```

Překlad známého názvu na IP adresu:

```powershell
Resolve-DnsName -Name "server.example.com"
```

Ověření konkrétního TCP portu:

```powershell
Test-NetConnection -ComputerName "server.example.com" -Port 443
```

Úspěšný ping sám nepotvrzuje, že funguje web, SSH nebo jiná služba.

Při diagnostice pokračuj podle [postupu pro nefunkční spojení](basics.md).

## Co z výpisu bezpečně nevyvodíš

- Stejná IP v jinou dobu nemusí patřit stejnému zařízení, protože DHCP adresy znovu přiděluje.
- Stejný telefon může v různých Wi-Fi sítích používat jinou soukromou MAC adresu.
- MAC adresa sama spolehlivě nepotvrzuje vlastníka ani bezpečnost zařízení.
- Veřejná IP obvykle patří routeru, VPN nebo poskytovateli, nikoli jednomu konkrétnímu počítači.
- Záznam `Stale` říká, že vazba je v cache, nikoli že je zařízení právě online.

Celé výpisy nesdílej veřejně bez kontroly.

Mohou obsahovat interní názvy, adresy, identifikátory adaptérů a údaje o firemní síti.

Zdroje: [Microsoft: Get-NetIPConfiguration](https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-netipconfiguration), [Get-NetAdapter](https://learn.microsoft.com/en-us/powershell/module/netadapter/get-netadapter), [Get-NetNeighbor](https://learn.microsoft.com/en-us/powershell/module/nettcpip/get-netneighbor), [ARP](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/arp), [síťování ve WSL](https://learn.microsoft.com/en-us/windows/wsl/networking), [Apple: soukromé Wi-Fi adresy](https://support.apple.com/cs-cz/102509), [Linux ip-neighbour](https://man7.org/linux/man-pages/man8/ip-neighbour.8.html), [ipify API](https://www.ipify.org/).
