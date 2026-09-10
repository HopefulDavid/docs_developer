<a id="klíče-a-certifikáty"></a>

# TLS certifikáty pro místní HTTPS

> Důvěryhodný certifikát pro lokální vývoj pomocí mkcert.

<a id="tls-certifikáty--mkcert"></a>
<a id="instalace"></a>

## Instalace mkcert

Ve Windows stáhni odpovídající binární soubor z [vydání mkcert](https://github.com/FiloSottile/mkcert/releases), přejmenuj jej na `mkcert.exe` a ulož například do `C:\mkcert`.

Přidej tento adresář do `Path` a otevři nový terminál.

<a id="instalace-lokální-ca"></a>

## Vytvoření certifikátu

V adresáři projektu spusť:

```text
mkcert -install
mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1
```

První příkaz vytvoří a zaregistruje místní certifikační autoritu, druhý vydá certifikát pro uvedené adresy.

| Soubor | Nastavení HTTPS serveru |
| --- | --- |
| `localhost.pem` | Certifikát |
| `localhost-key.pem` | Soukromý klíč |

Soubory nastav ve své aplikaci; mkcert její HTTPS server nekonfiguruje.

Pro vlastní doménu přidej její název do příkazu a zajisti lokální překlad adresy, například přes soubor `hosts`.

Soukromé klíče necommituj; zejména `rootCA-key.pem` umožňuje vystavovat certifikáty důvěryhodné na počítačích s touto autoritou a nesmíš jej sdílet podle [dokumentace mkcert](https://github.com/FiloSottile/mkcert).

<a id="použití-certifikátů"></a>

## Jiný formát nebo nedůvěryhodný certifikát

<details>
<summary>Aplikace vyžaduje PFX / PKCS#12</summary>

Pokud máš OpenSSL, spoj certifikát a klíč do jednoho souboru:

```text
openssl pkcs12 -export -out server.pfx -inkey localhost-key.pem -in localhost.pem
```

Zadej exportní heslo a použij jej při načítání `server.pfx` v aplikaci podle [OpenSSL pkcs12](https://docs.openssl.org/master/man1/openssl-pkcs12/).

</details>

<details>
<summary>Aplikace očekává přípony CRT a KEY</summary>

Pokud očekává obsah PEM, můžeš předat soubory `.pem` nebo jim dát požadované přípony; přejmenování samo o sobě formát nemění.

Příklad zapojení do Go aplikace nabízí [návod HTTPS serveru v Echo](https://echo.labstack.com/cookbook/http2/).

</details>

<details>
<summary>Prohlížeč certifikátu nedůvěřuje</summary>

Zkontroluj, že URL odpovídá některému názvu v certifikátu a že jsi na tomto počítači spustil `mkcert -install`.

Umístění místní autority zjistíš příkazem `mkcert -CAROOT`; pokud ji Firefox nepřebírá ze systému, importuj odtud **veřejný** `rootCA.pem` mezi důvěryhodné autority v nastavení certifikátů prohlížeče.

</details>

<details>
<summary>Přesunuté návody ze starší verze stránky</summary>

<!-- Stabilní kotvy zachovávají staré záložky; obsah vlastní odkazované SSH návody. -->

<a id="ssh-klíč-s-heslovou-frází"></a>
<a id="vytvoření-klíče"></a>
<a id="soukromý-a-veřejný-soubor"></a>
<a id="dodatečné-nastavení-nebo-změna-heslové-fráze"></a>
<a id="volitelné-odemykání-přes-ssh-agent"></a>

- [SSH klíče a heslová fráze](ssh/keys.md).

<a id="ssh--nastavení-pro-github"></a>
<a id="přidání-klíče-do-účtu"></a>
<a id="test-připojení"></a>
<a id="použití-v-git-repozitáři"></a>

- [Git přes SSH a připojení ke GitHubu](ssh/git.md).

<a id="generování-klíčů"></a>
<a id="openssl"></a>

- [Generování náhodných tajemství](secrets.md).

</details>
