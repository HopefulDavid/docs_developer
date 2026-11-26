---
description: "Založení větve ze zvoleného základu, přepínání a první push."
---

# Git – vytvoření a výběr větve

Nová větev oddělí jednu změnu nebo experiment a začíná z konkrétního existujícího commitu.

Do pushe existuje pouze v místní kopii.

## Založení ze správného základu

Příklad pro PowerShell i Bash předpokládá čistý strom a již aktualizovanou místní `main`.

```bash
git status
git switch main
git switch -c feature/hledani
git branch --show-current
```

`switch -c` větev vytvoří a zároveň vybere.

Poslední příkaz musí vypsat `feature/hledani`.

Workflow s `develop` začíná z této větve místo `main`.

## Další možnosti

| Syntaxe | Účel |
|---|---|
| `git switch <větev>` | Přepne na existující místní větev |
| `git switch -c <nová-větev> [<výchozí-commit>]` | Vytvoří a vybere větev z uvedeného základu nebo aktuálního HEAD |
| `git branch <nová-větev> [<výchozí-commit>]` | Vytvoří ukazatel bez přepnutí pracovních souborů |
| `git branch -a` | Vypíše místní i naposledy načtené vzdálené větve |
| `git branch -m <nový-název>` | Přejmenuje aktuální místní větev, vzdálený název nezmění |

Pro existující větev pouze na serveru se nejprve načte aktuální seznam a pak se větev začne sledovat:

```bash
git fetch origin
git switch --track origin/feature/hledani
```

Tato varianta platí, když místní `feature/hledani` ještě neexistuje.

## První odeslání

```bash
git remote -v
git push -u origin feature/hledani
git branch -vv
```

`-u` nastaví vazbu na `origin/feature/hledani`, kterou pak Git používá pro přehled stavu.

Push nepřenese rozpracované soubory a nevloží funkci do `main`.

K tomu slouží samostatný [merge](../merging.md) nebo [PR](pull-request.md).

## Když přepnutí odmítne

Hlášení o přepsání místních změn chrání necommitovanou práci.

Nejprve se commitne nebo [odloží](../stash-worktree.md).

Při `branch already exists` stačí běžný `switch`, pokud jde právě o tuto větev, jinak je potřeba jiné jméno.

Zdroj: [git switch](https://git-scm.com/docs/git-switch), [git branch](https://git-scm.com/docs/git-branch).
