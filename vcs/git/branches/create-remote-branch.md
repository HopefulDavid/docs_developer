---
description: "Založení větve ze zvoleného základu, přepínání a první push."
---

# Git – vytvoření a výběr větve

Nová větev oddělí jednu změnu nebo experiment a začíná z konkrétního existujícího commitu.

Dokud neuděláš push, existuje pouze ve tvé místní kopii.

## Založení ze správného základu

Příklad pro PowerShell i Bash předpokládá čistý strom a již aktualizovanou místní `main`.

```bash
git status
git switch main
git switch -c feature/hledani
git branch --show-current
```

`switch -c` větev vytvoří a zároveň vybere; poslední příkaz musí vypsat `feature/hledani`.

Používáš-li workflow s `develop`, začni z této větve místo `main`.

## Další možnosti

| Syntaxe | Účel |
|---|---|
| `git switch <větev>` | Přepne na existující místní větev |
| `git switch -c <nová-větev> [<výchozí-commit>]` | Vytvoří a vybere větev z uvedeného základu nebo aktuálního HEAD |
| `git branch <nová-větev> [<výchozí-commit>]` | Vytvoří ukazatel bez přepnutí pracovních souborů |
| `git branch -a` | Vypíše místní i naposledy načtené vzdálené větve |
| `git branch -m <nový-název>` | Přejmenuje aktuální místní větev, vzdálený název nezmění |

Pro existující větev pouze na serveru nejprve načti aktuální seznam a pak ji začni sledovat:

```bash
git fetch origin
git switch --track origin/feature/hledani
```

Tuto variantu použij, když místní `feature/hledani` ještě neexistuje.

## První odeslání

```bash
git remote -v
git push -u origin feature/hledani
git branch -vv
```

`-u` nastaví vazbu na `origin/feature/hledani`, kterou pak Git používá pro přehled stavu.

Push nepřenese rozpracované soubory a nevloží funkci do `main`; k tomu slouží samostatný [merge](../merging.md) nebo [PR](pull-request.md).

## Když přepnutí odmítne

Hlášení o přepsání místních změn chrání necommitovanou práci; nejprve ji commitni nebo [odlož](../stash-worktree.md).

Při `branch already exists` použij běžný `switch`, pokud chceš právě tuto větev, nebo zvol jiné jméno.

Zdroj: [git switch](https://git-scm.com/docs/git-switch), [git branch](https://git-scm.com/docs/git-branch).
