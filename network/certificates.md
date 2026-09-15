---
description: "Důvěryhodné místní HTTPS, výběr certifikátu a zapojení do vývojového serveru."
---

# Certifikáty – HTTPS při místním vývoji

TLS certifikát pomáhá klientovi ověřit jméno serveru a vytvořit šifrované spojení.

Nestačí mít soubor s příponou `.crt`: klient musí důvěřovat jeho vydavateli a navštívené jméno musí odpovídat certifikátu.

## Vyber nástroj podle cíle

| Potřeba | Vhodná cesta |
|---|---|
| Vývoj ASP.NET Core na localhost | Vývojový certifikát `dotnet dev-certs` |
| Místní server s vlastními názvy nebo jiným frameworkem | `mkcert` a vlastní místní certifikační autorita |
| Veřejná produkční doména | Certifikát od veřejně důvěryhodné CA podle hostingu, obvykle s automatickou obnovou |

Vývojová autorita mkcert ani vývojový certifikát .NET nepatří jako univerzální řešení pro veřejné produkční servery.

## Co obsahují soubory

| Pojem | Úloha |
|---|---|
| Certifikát | Veřejné údaje serveru, názvy SAN, platnost a podpis vydavatele |
| Soukromý klíč serveru | Důkaz identity serveru, musí zůstat chráněný |
| Kořenový certifikát CA | Veřejný základ důvěry v certifikáty vydané touto autoritou |
| Soukromý klíč CA | Umožňuje vydávat další důvěryhodné certifikáty |
| PEM | Textový formát. Může obsahovat certifikát i klíč podle obsahu |
| PFX / PKCS#12 | Kontejner pro certifikát a klíč, obvykle chráněný heslem |

Přejmenování přípony samo formát nepřevede.

## Varianta A: ASP.NET Core

S nainstalovaným .NET SDK v PowerShellu nebo Bashi:

```bash
dotnet dev-certs https --trust
dotnet dev-certs https --check --trust
```

První příkaz vytvoří nebo najde vývojový certifikát a požádá o jeho důvěryhodnost.

Druhý jen ověří platnost a důvěru.

Spusť aplikaci s HTTPS profilem uvedeným v `Properties/launchSettings.json` a použij přesnou adresu z výpisu serveru.

Na Linuxu a v některých prohlížečích se správa důvěry liší.

Postupuj podle instrukcí konkrétního SDK a výsledku kontroly.

`dotnet dev-certs https --clean` odstraní vývojové HTTPS certifikáty, a proto ho nepoužívej jako první univerzální opravu.

## Varianta B: mkcert pro vlastní server

Nainstaluj [mkcert z oficiálních vydání](https://github.com/FiloSottile/mkcert/releases), ověř jeho původ a dostupnost `mkcert -version`.

Ve Windows lze odpovídající binární soubor pojmenovat `mkcert.exe` a jeho složku přidat do Path.

V samostatné výukové složce:

```bash
mkcert -install
mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1
```

`-install` vytvoří a nainstaluje místní kořen důvěry, což může vyžadovat potvrzení systému.

Druhý příkaz vydá certifikát pro uvedená jména a adresy.

Výstupy nepřepisuj v adresáři s již používanými klíči.

Pro vlastní jméno přidej například `app.test` do seznamu a zajisti jeho překlad na cílovou IP, například v místním souboru hosts.

mkcert nastaví certifikáty, ale sám nespustí ani nenakonfiguruje HTTPS aplikaci.

### Spustitelný příklad Node.js

Vedle obou PEM souborů ulož `server.cjs`:

```javascript
const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

// Cesty vycházejí ze složky skriptu, nikoli z náhodné aktuální složky terminálu.
const options = {
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
};

https.createServer(options, (_request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Místní HTTPS funguje.\n');
}).listen(8443, '127.0.0.1', () => {
  console.log('Otevři https://localhost:8443');
});
```

S nainstalovaným Node.js spusť `node server.cjs` a otevři uvedenou adresu.

`Ctrl+C` server ukončí.

`cert` je veřejný certifikát, `key` soukromý klíč, `8443` zvolený volný port a `127.0.0.1` omezuje naslouchání na tento počítač.

Port můžeš změnit, ale nové jméno serveru musí být zároveň uvedené v certifikátu.

## Aplikace vyžaduje PFX

S dostupným OpenSSL ve složce certifikátů:

```bash
openssl pkcs12 -export -out server.pfx -inkey localhost-key.pem -in localhost.pem
```

Program se zeptá na exportní heslo.

`server.pfx` pak obsahuje klíč i certifikát a heslo použij podle nastavení konkrétního serveru.

Heslo nepiš přímo jako veřejný argument do skriptu.

## Ověření a časté chyby

| Projev | Co zkontrolovat |
|---|---|
| Neznámý vydavatel | Důvěru v CA na tomto počítači a v konkrétním klientovi |
| Nesouhlas názvu | URL proti SAN certifikátu. Certifikát pro localhost neplatí automaticky pro IP v LAN |
| Vypršený certifikát | Platnost a systémový čas. Vydat a nasadit nový certifikát |
| Prohlížeč funguje, nástroj ne | Nástroj může používat vlastní úložiště CA |
| Jiný počítač nedůvěřuje | Jeho vlastní důvěryhodné autority, nikoli jen certifikát uložený na serveru |

`mkcert -CAROOT` ukáže složku místní autority.

Pro důvěru na dalším vlastním testovacím zařízení přenášej pouze veřejný `rootCA.pem`.

`rootCA-key.pem` nesdílej a necommituj, protože umožňuje vydávat důvěryhodné certifikáty pro libovolná jména na zařízeních důvěřujících této CA.

`mkcert -uninstall` odebere místní důvěru, ale nepředstavuje smazání všech vytvořených souborů.

Zdroje: [mkcert](https://github.com/FiloSottile/mkcert), [dotnet dev-certs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs), [Node.js HTTPS](https://nodejs.org/api/https.html), [OpenSSL PKCS#12](https://docs.openssl.org/master/man1/openssl-pkcs12/).

<a id="klíče-a-certifikáty"></a>
<a id="tls-certifikáty--mkcert"></a>
<a id="instalace"></a>
<a id="instalace-lokální-ca"></a>
<a id="použití-certifikátů"></a>
<a id="ssh-klíč-s-heslovou-frází"></a>
<a id="vytvoření-klíče"></a>
<a id="soukromý-a-veřejný-soubor"></a>
<a id="dodatečné-nastavení-nebo-změna-heslové-fráze"></a>
<a id="volitelné-odemykání-přes-ssh-agent"></a>
<a id="ssh--nastavení-pro-github"></a>
<a id="přidání-klíče-do-účtu"></a>
<a id="test-připojení"></a>
<a id="použití-v-git-repozitáři"></a>
<a id="generování-klíčů"></a>
<a id="openssl"></a>
