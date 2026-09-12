---
description: "Parametry, nepovinné části a sestavení příkazu pro vlastní data."
---

# Jak číst zápis příkazů

Syntaxe je předpis, ze kterého sestavíš příkaz pro svoje data.

Ukazuje **co napsat doslova**, **co nahradit vlastní hodnotou** a **co můžeš vynechat**.

## Syntaxe a příklad nejsou totéž

| Syntaxe | Konkrétní příklad | Co se dosazuje |
|---|---|---|
| `ollama pull <model>` | `ollama pull llama3.2` | `<model>` je jméno modelu; zde `llama3.2` |
| `git switch <větev>` | `git switch main` | `<větev>` je existující místní větev; zde `main` |

Do terminálu patří až příkaz s dosazenými hodnotami, bez úhlových závorek.

První příklad stáhne soubory zvoleného modelu; druhý přepne pracovní soubory Gitu na zvolenou větev.

## Význam jednotlivých značek

Používáme [konvenci Microsoftu pro zápis syntaxe](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/command-line-syntax-key).

| Značka | Význam | Jak s ní naložit |
|---|---|---|
| `příkaz --volba` | Pevný text | Opiš jej beze změny |
| `<hodnota>` | Zástupný parametr | Doplň vlastní hodnotu bez závorek |
| `[část]` | Nepovinná část | Buď ji vynech celou, nebo ji doplň |
| <code>{a&#124;b}</code> | Povinný výběr jedné možnosti | Zapiš pouze `a` nebo pouze `b` |
| <code>[a&#124;b]</code> | Nepovinný výběr | Vynech, nebo zapiš jednu možnost |
| `<soubor>...` | Opakovaná hodnota | Doplň jeden nebo více souborů |
| `[<soubor>...]` | Volitelné opakování | Nemusíš zadat žádný soubor |

V nápovědě jiného nástroje může být proměnná označená také kurzívou nebo velkými písmeny; rozhoduje legenda daného návodu.

## Jak doplnit volitelnou část

Zjednodušená syntaxe SSH:

```text
ssh [-p <port>] <uživatel>@<server>
```

Pevné části jsou `ssh`, přepínač `-p` a znak `@` mezi účtem a serverem.

| Co potřebuješ | Příklad po dosazení |
|---|---|
| Výchozí port 22 | `ssh jana@server.example.com` |
| Server používá port 2222 | `ssh -p 2222 jana@server.example.com` |

`jana`, `server.example.com` a `2222` jsou ilustrační hodnoty: nahraď je účtem, adresou a portem svého serveru.

Pokud vybereš volbu `-p`, musíš dodat i její hodnotu; samotné `-p` není úplný parametr. [OpenSSH: ssh](https://man.openbsd.org/ssh)

## Mezery, uvozovky a prostředí

Příklad pro existující Git projekt v PowerShellu nebo Bashi:

```bash
git add -- "poznamky k projektu.md" README.md
```

Uvozovky spojí název s mezerami do jedné hodnoty, zatímco `README.md` je druhá cesta.

`--` je skutečný oddělovač voleb od cest a do tohoto příkazu patří.

Oba soubory se připraví do příštího commitu; příkaz je nevytváří ani neodesílá na server. [Git add](https://git-scm.com/docs/git-add)

Vždy ověř prostředí označené u ukázky: přepínače a uvozovky [CMD](windows/cmd.md) nemusí fungovat stejně v [PowerShellu](windows/powershell.md).

## Značky neodstraňuj z hotového kódu

Svislítko `|` znamená v referenční syntaxi výběr alternativ, ale v hotovém shellovém příkazu může být **roura předávající výstup**.

Podobně `>` může přesměrovat výstup do souboru a `[0-9]` je skutečné pravidlo regulárního výrazu.

Proto rozlišuj označení **Syntaxe**, **Příklad**, **Konfigurace** a **Výstup**; značky parametrů odstraňuješ při sestavení příkazu ze syntaxe, nikoli mechanicky z každé ukázky.

Před spuštěním ještě ověř cílovou složku, dosazené hodnoty a očekávaný účinek; nápovědu konkrétní verze získáš například přes `ollama pull --help`.
