---
description: "Načtení a odeslání commitů, rozcházející se větve a odmítnutý push."
---

# Git – synchronizace se serverem

Synchronizace přenáší hotové commity mezi místní kopií a serverem.

Necommitované úpravy ani nové nesledované soubory se nepřenášejí.

## Tři odlišné operace

| Syntaxe | Účinek |
|---|---|
| `git fetch <remote>` | Stáhne dostupnou historii a aktualizuje místní záznam vzdálených větví |
| `git pull --ff-only [<remote> <větev>]` | Načte historii a posune aktuální větev pouze tehdy, když se nerozešla se zdrojem |
| `git push [-u] <remote> <větev>` | Odešle místní větev. `-u` nastaví její upstream |

`fetch` nemění pracovní soubory, zatímco `pull` může změnit aktuální větev i její soubory.

Upstream je sledovaná vzdálená větev pro porovnání stavu a výchozí synchronizaci.

První push ji běžně nastavuje přes `-u`.

## Běžná aktualizace hlavní větve

Příklad funguje v PowerShellu i Bashi a předpokládá existující `main`, remote `origin` a čistý pracovní strom.

```bash
git switch main
git fetch origin
git log --oneline --left-right main...origin/main
git merge --ff-only origin/main
```

Tři tečky jsou v tomto Git výrazu skutečně zapsané.

Porovnávají commity, které jsou jen na jedné z obou stran.

`<` ve výpisu označuje pouze místní commity, `>` pouze vzdálené.

`merge --ff-only` aktualizuje `main` bez vzniku nového merge commitu a při rozchodu větví skončí chybou.

Pro běžné opakování stejného záměru lze místo odděleného fetch a merge použít `git pull --ff-only origin main`, ale **až na vybrané větvi main**.

`pull origin main` spuštěný na pracovní větvi začleňuje `main` do této pracovní větve.

Sám nepřepíná větev.

## Když se větve rozešly

| Co ukazuje porovnání | Další krok |
|---|---|
| Pouze `>` | Místní větev je pozadu, fast-forward ji může aktualizovat |
| Pouze `<` | Místní větev má neodeslané commity, po kontrole následuje push |
| Oba znaky | Obě strany mají vlastní commity. Řešením je merge nebo rebase |
| Nic | Obě strany ukazují na stejnou historii |

Obě linie zachová na aktuální větvi `git merge origin/main`.

Vlastní **dosud nesdílené** commity přehraje na novější základ místo merge `git rebase origin/main`.

Tyto dvě varianty se nespouštějí po sobě jako jeden postup.

Jejich rozdíl a řešení konfliktů popisuje [slučování](merging.md).

## Odeslání vlastní větve

Po kontrole diffu a testech například:

```bash
git push -u origin feature/hledani
git branch -vv
```

První příkaz vytvoří nebo aktualizuje vzdálenou `feature/hledani` a druhý ukáže nastavené sledování.

Další odeslání může používat explicitní `git push origin feature/hledani`.

Na `main` se názvy přizpůsobí skutečné větvi.

<a id="co-dělat-když-push-selže"></a>

## Když push selže

| Hlášení | Význam a náprava |
|---|---|
| `non-fast-forward` / `fetch first` | Server má jinou historii. Po jejím načtení a kontrole rozdílu následuje merge nebo rebase |
| `no upstream branch` | První odeslání používá `git push -u <remote> <větev>` |
| `src refspec ... does not match any` | Kontrola názvu větve a existence prvního commitu |
| Chráněná větev / odmítnutí pravidlem | Pracovní větev a PR podle pravidel serveru |
| Přístup zamítnut | Kontrola [URL a účtu](server.md), u SSH [nabízeného klíče](../../network/ssh/git.md) |

Po vlastním amend nebo rebase mohou mít logicky stejné změny jiná ID.

Publikování přepsané vlastní větve řeší [opravy historie](history/fix-commits.md#publikování-přepsané-vlastní-větve).

## Ověření serveru

```bash
git fetch origin
git status --short --branch
git log --oneline --left-right HEAD...origin/feature/hledani
```

Poslední výpis má být prázdný, pokud aktuální a vzdálená pracovní větev obsahují stejnou historii.

Názvy se nahradí skutečnou větví.

Samotný stav „up to date“ bez čerstvého fetch může vycházet ze staršího místního záznamu serveru.

Zdroje: [fetch](https://git-scm.com/docs/git-fetch), [pull](https://git-scm.com/docs/git-pull), [push](https://git-scm.com/docs/git-push).
