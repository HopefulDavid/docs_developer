# Náhodná tajemství

> Generování náhodných hodnot pro aplikační tajemství pomocí OpenSSL.

S nainstalovaným OpenSSL vygeneruj požadovaný počet náhodných bajtů:

```text
openssl rand -base64 32
openssl rand -hex 64
```

| Příkaz | Výstup |
| --- | --- |
| `-base64 32` | 32 náhodných bajtů zakódovaných jako Base64 |
| `-hex 64` | 64 náhodných bajtů zapsaných jako 128 hexadecimálních znaků |

Jde o samostatné tajné hodnoty pro aplikace; [SSH pár klíčů](ssh/keys.md) vytvářej pomocí `ssh-keygen`.

Výsledek ulož do správce tajemství nebo lokální konfigurace vyloučené z Gitu a nesdílej jej ve výpisech či dokumentaci.

Parametry a generátor popisuje [OpenSSL rand](https://docs.openssl.org/master/man1/openssl-rand/).
