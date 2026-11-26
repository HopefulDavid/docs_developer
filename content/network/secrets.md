---
description: "Vytvoření náhodného aplikačního tajemství, délka, kódování a bezpečné uložení."
---

# Náhodná tajemství pro aplikace

Aplikační tajemství je neveřejná hodnota, například podpisový klíč relace nebo token pro přístup ke službě.

Vzniká kryptografickým generátorem podle požadavků aplikace, ne skládáním předvídatelného názvu a data.

## Požadovaný formát

| Požadavek aplikace | Potřebný výsledek |
|---|---|
| Náhodný symetrický klíč | Přesný počet náhodných bajtů, případně zakódovaný jako Base64 či hex |
| Token služby | Hodnotu vydanou touto službou, vlastní náhodný text ji nenahradí |
| SSH identita | [Pár klíčů pomocí ssh-keygen](ssh/keys.md) |
| HTTPS server | [Certifikát a soukromý klíč](certificates.md) |

Kódování není šifrování: Base64 i hex lze převést zpět na původní bajty bez hesla.

## Nástroj pro generování

Standardní Base64 může obsahovat `+`, `/` a `=`.

Aplikace požadující Base64url má vlastní dokumentovaný postup, který nahrazuje ruční odstraňování znaků.

<a id="generování-pomocí-openssl"></a>
<a id="alternativa-bez-openssl-v-powershellu-7"></a>

## [OpenSSL](#tab/secret-openssl)

S nainstalovaným OpenSSL v PowerShellu nebo Bashi:

```bash
openssl rand -base64 32
```

Vznikne 32 náhodných bajtů, tedy 256 bitů, zakódovaných do 44 znaků Base64 včetně výplně `=`.

Číslo je délka vstupních bajtů, nikoli počet znaků výstupu.

Alternativa pro aplikaci vyžadující hex:

```bash
openssl rand -hex 32
```

Opět jde o 32 náhodných bajtů, tentokrát zapsaných jako 64 hexadecimálních znaků.

Každý příkaz vytváří jinou novou hodnotu.

| Syntaxe | Význam |
|---|---|
| `openssl rand -base64 <počet-bajtů>` | Base64 reprezentace požadované náhodnosti |
| `openssl rand -hex <počet-bajtů>` | Hex reprezentace, dva znaky na bajt |

## [PowerShell 7](#tab/secret-powershell)

Tato varianta vytvoří Base64 bez instalace OpenSSL.

```powershell
$secretBytes = [byte[]]::new(32)
[System.Security.Cryptography.RandomNumberGenerator]::Fill($secretBytes)
[Convert]::ToBase64String($secretBytes)
```

Pole obsahuje 32 bajtů, systémový generátor ho naplní a poslední řádek vypíše Base64.

Obyčejný `Get-Random` pro tento účel nenahrazuje požadavek na kryptograficky bezpečný generátor.

***

## Uložení a změna klíče

Výstup patří do správce tajemství nebo do chráněné místní konfigurace, kterou aplikace umí načíst.

Záznam v `.gitignore` chrání jen budoucí změny v Gitu, nikoli už uložené verze nebo zálohy.

Před výměnou se posoudí dopad: změna podpisového klíče může zneplatnit relace a ztráta šifrovacího klíče může znemožnit čtení dat.

U více instancí aplikace musí být klíče sdílené nebo verzované podle jejího návrhu, nikoli vygenerované jinak při každém startu.

Zdroje: [OpenSSL rand](https://docs.openssl.org/master/man1/openssl-rand/), [RandomNumberGenerator](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.randomnumbergenerator).
