---
description: "Parametry, nepovinné části a sestavení příkazu pro vlastní data."
---

# Jak číst zápis příkazů

Syntaxe je předpis, ze kterého se sestaví příkaz pro konkrétní data.

Ukazuje, **co se píše doslova**, **co se nahrazuje vlastní hodnotou** a **co lze vynechat**.

## Syntaxe a příklad nejsou totéž

| Syntaxe | Konkrétní příklad | Co se dosazuje |
|---|---|---|
| `ollama pull <model>` | `ollama pull llama3.2` | `<model>` je jméno modelu, zde `llama3.2` |
| `git switch <větev>` | `git switch main` | `<větev>` je existující místní větev, zde `main` |

Do terminálu patří až příkaz s dosazenými hodnotami, bez úhlových závorek.

První příklad stáhne soubory zvoleného modelu.

Druhý přepne pracovní soubory Gitu na zvolenou větev.

## Význam jednotlivých značek

Návody používají [konvenci Microsoftu pro zápis syntaxe](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/command-line-syntax-key).

| Značka | Význam | Zacházení |
|---|---|---|
| `příkaz --volba` | Pevný text | Opisuje se beze změny |
| `<hodnota>` | Zástupný parametr | Doplňuje se vlastní hodnota bez závorek |
| `[část]` | Nepovinná část | Buď se vynechá celá, nebo se doplní |
| <code>{a&#124;b}</code> | Povinný výběr jedné možnosti | Zapisuje se pouze `a` nebo pouze `b` |
| <code>[a&#124;b]</code> | Nepovinný výběr | Vynechá se, nebo se zapíše jedna možnost |
| `<soubor>...` | Opakovaná hodnota | Doplňuje se jeden nebo více souborů |
| `[<soubor>...]` | Volitelné opakování | Soubor nemusí být uvedený žádný |

V nápovědě jiného nástroje může být proměnná označená také kurzívou nebo velkými písmeny.

Rozhoduje legenda daného návodu.

## Jak doplnit volitelnou část

Zjednodušená syntaxe SSH:

```text
ssh [-p <port>] <uživatel>@<server>
```

Pevné části jsou `ssh`, přepínač `-p` a znak `@` mezi účtem a serverem.

| Situace | Příklad po dosazení |
|---|---|
| Výchozí port 22 | `ssh jana@server.example.com` |
| Server používá port 2222 | `ssh -p 2222 jana@server.example.com` |

`jana`, `server.example.com` a `2222` jsou ilustrační hodnoty, které se nahrazují účtem, adresou a portem skutečného serveru.

Volba `-p` vyžaduje i svou hodnotu.

Samotné `-p` není úplný parametr. [OpenSSH: ssh](https://man.openbsd.org/ssh)

## Mezery, uvozovky a prostředí

Příklad pro existující Git projekt v PowerShellu nebo Bashi:

```bash
git add -- "poznamky k projektu.md" README.md
```

Uvozovky spojí název s mezerami do jedné hodnoty, zatímco `README.md` je druhá cesta.

`--` je skutečný oddělovač voleb od cest a do tohoto příkazu patří.

Oba soubory se připraví do příštího commitu.

Příkaz je nevytváří ani neodesílá na server. [Git add](https://git-scm.com/docs/git-add)

Rozhoduje prostředí označené u ukázky: přepínače a uvozovky [CMD](windows/cmd.md) nemusí fungovat stejně v [PowerShellu](windows/powershell.md).

## Značky v hotovém kódu

Svislítko `|` znamená v referenční syntaxi výběr alternativ, ale v hotovém shellovém příkazu může být **roura předávající výstup**.

Podobně `>` může přesměrovat výstup do souboru a `[0-9]` je skutečné pravidlo regulárního výrazu.

Proto ukázky rozlišují označení **Syntaxe**, **Příklad**, **Konfigurace** a **Výstup**.

Značky parametrů se odstraňují při sestavení příkazu ze syntaxe, nikoli mechanicky z každé ukázky.

Před spuštěním se ještě ověří cílová složka, dosazené hodnoty a očekávaný účinek.

Nápovědu konkrétní verze vypíše například `ollama pull --help`.
