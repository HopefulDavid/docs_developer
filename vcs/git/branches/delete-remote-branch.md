---
description: "Úklid dokončené místní i vzdálené větve a možnost obnovení."
---

# Git – odstranění dokončené větve

Odstraněním větve zrušíš její jméno.

Místní a vzdálená větev jsou samostatné reference.

Nejdříve ověř, že její práce je začleněná nebo ji už nepotřebuješ.

## Zkontroluj výsledek

Příklad používá dokončenou `feature/hledani` a cílovou `main`.

Před přepnutím musí být pracovní strom čistý.

```bash
git switch main
git fetch origin
git log --oneline main..feature/hledani
```

Výpis ukazuje commity pracovní větve, které nejsou dosažitelné z místní `main`.

Po serverovém PR nejprve [aktualizuj main](../synchronization.md).

Při squash nebo rebase merge mohou mít začleněné změny jiná ID, proto navíc ověř skutečný obsah a stav PR.

## Místní větev

```bash
git branch -d feature/hledani
```

`-d` používá kontrolu začlenění do upstreamu, případně do HEAD, pokud upstream není nastavený.

Není náhradou vlastní kontroly zamýšlené cílové větve.

Když kontrola selže po ověřeném squash, můžeš si nejprve ponechat záložní jméno a vědomě odstranit původní:

```bash
git branch backup/hledani feature/hledani
git branch -D feature/hledani
```

`-D` kontrolu sloučení obchází, proto ho nepoužívej jen kvůli odstranění chybového hlášení.

## Vzdálená větev

```bash
git push origin --delete feature/hledani
git fetch origin --prune
git ls-remote --heads origin feature/hledani
```

První příkaz odstraní jméno na serveru a druhý uklidí místní odkazy na zaniklé vzdálené větve.

Poslední příkaz už nemá vypsat odstraněnou větev.

Místní `backup/hledani` zůstane zachovaná.

## Obnova

Pokud máš záložní větev a název je volný:

```bash
git branch feature/hledani backup/hledani
git push -u origin feature/hledani
```

Obnovíš místní i vzdálené pojmenování původního commitu.

Bez zálohy může pomoci místní [reflog](../recovery.md), jeho dostupnost ale není trvalá.

Zdroje: [git branch](https://git-scm.com/docs/git-branch), [git push](https://git-scm.com/docs/git-push).
