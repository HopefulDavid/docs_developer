---
description: "Přesun práce na novou větev a přenos vybraných commitů pomocí cherry-pick."
---

# Git – práce na nesprávné větvi

Změnu můžeš uchovat na nové větvi nebo zkopírovat jednotlivé commity do existující větve.

Nejdříve rozliš, zda máš jen necommitované soubory, místní commity, nebo už sdílenou historii.

## Zatím jen rozpracované soubory

Pokud aktuální commit představuje správný základ nové práce:

```bash
git switch -c feature/presunuta-prace
git status
```

Nová větev vznikne z aktuálního HEAD a necommitované úpravy zůstanou v pracovním stromu.

Pokud potřebuješ jiný základ, nejprve použij [stash nebo worktree](../stash-worktree.md).

## Místní commity patří na novou větev

Příklad pro PowerShell i Bash předpokládá čistý strom a **jeden poslední neodeslaný commit** na špatné větvi.

```bash
git log --oneline -5
git branch feature/presunuta-prace
git reset --keep HEAD~1
git switch feature/presunuta-prace
git log --graph --oneline --all -8
```

Nejprve vytvoříš ukazatel na hotovou práci, teprve pak původní větev vrátíš k rodiči a přepneš na uchovanou práci.

Pro více commitů použij skutečný ověřený výchozí commit místo `HEAD~1`; nepočítej naslepo řádky logu obsahující merge.

Původní větev se vrací, ale nová větev stále obsahuje všechny přesunuté změny.

## Jeden commit patří do existující větve

Obecný postup:

```text
git switch <cílová-větev>
git cherry-pick <commit>
```

`cherry-pick` zkopíruje změnu zvoleného commitu na aktuální větev jako nový commit; ze zdrojové větve ji neodstraní.

Konkrétní příklad pro poslední commit zdrojové větve:

```bash
git branch backup/zdroj
git switch main
git cherry-pick backup/zdroj
git show --stat HEAD
```

`backup/zdroj` musíš vytvořit ještě ve zdrojové větvi; příklad přenese právě její poslední commit.

Při více změnách vybírej ID v pořadí od nejstaršího, aby byly zachované závislosti.

## Konflikt a kontrola

Při konfliktu oprav soubory, připrav je přes `git add` a použij `git cherry-pick --continue`; návrat zajistí `git cherry-pick --abort`.

Otestuj cílovou větev, než cokoli odstraníš ze zdroje.

U již publikované chybně umístěné práce použij ve zdroji [revert](delete-commits.md), pokud tam změna opravdu nemá zůstat; přenos a odstranění jsou dvě samostatná rozhodnutí.

Zdroje: [git cherry-pick](https://git-scm.com/docs/git-cherry-pick), [git reset](https://git-scm.com/docs/git-reset).
