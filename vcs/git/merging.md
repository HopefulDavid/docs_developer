---
description: "Fast-forward, merge, squash a rebase včetně vyřešení nebo zrušení konfliktu."
---

# Git – slučování větví a konflikty

Sloučením přeneseš hotovou práci do cílové větve.

Metoda určuje, jak se výsledek zapíše do historie.

Nejdříve si ujasni **zdroj** změn a **cíl**, do kterého mají přijít.

## Před použitím

Příklady používají hotovou `feature/hledani` a cílovou `main` v jednom repozitáři.

Před začátkem musí být pracovní strom čistý, obě větve aktuální a práce otestovaná.

Příkazy fungují v PowerShellu i Bashi.

```bash
git status
git switch main
git diff main...feature/hledani
git log --oneline main..feature/hledani
```

`diff` se třemi tečkami ukazuje změnu pracovní větve od společného předka.

`log` se dvěma tečkami vypíše její commity, které cílová větev nemá.

## Zvol jednu metodu

### Fast-forward: jednoduchý posun

```bash
git merge --ff-only feature/hledani
```

Povolí jen posunutí `main` na již existující commit pracovní větve.

Pokud na `main` mezitím přibyly jiné commity, skončí chybou bez zahájení konfliktu.

Pro takovou situaci vyber merge nebo nejprve aktualizuj pracovní větev.

### Merge commit: zachování obou linií

```bash
git merge --no-ff feature/hledani
```

Vytvoří spojovací commit i v případě, kdy by šel pouhý posun.

Editor zprávy ulož a zavři.

Historie zachová jednotlivé pracovní commity i informaci, která větev se začlenila.

### Squash: jedna ucelená změna v cíli

```bash
git merge --squash feature/hledani
git diff --cached
git commit -m "feat: přidává hledání"
```

První příkaz připraví výslednou změnu do indexu, ale commit ještě nevytvoří.

Po kontrole a testech ji uložíš jako jeden commit.

Původní pracovní větev se nepřepisuje, ale její commity nejsou předky nového commitu.

Proto po squash může `git branch -d` odmítnout smazání pracovní větve, přestože výsledný kód už je začleněný.

## Aktualizace pracovní větve pomocí rebase

Na vlastní, dosud nesdílené pracovní větvi můžeš přesunout základ vývoje:

```bash
git switch feature/hledani
git branch backup/pred-rebase
git rebase main
```

Git přehraje vlastní commity nad místní `main` a vytvoří jim nová ID.

Nejprve proto aktualizuj `main` ze serveru, pokud má být základem jeho aktuální stav.

Záložní větev uchovává původní commity, nikoli necommitované soubory.

Po úspěšném rebase znovu otestuj funkci a na `main` ji můžeš začlenit například přes fast-forward.

## Konflikt: Git potřebuje rozhodnutí o obsahu

Konflikt typicky vznikne, když obě větve jinak upravily stejnou část souboru.

```bash
git status
git diff --name-only --diff-filter=U
```

Příkazy ukážou probíhající operaci a nevyřešené soubory.

V textovém souboru můžeš uvidět:

```text
<<<<<<< HEAD
title = "Seznam"
=======
title = "Moje poznámky"
>>>>>>> feature/hledani
```

V editoru zvol správný výsledný text, případně obě změny smysluplně spoj, a všechny značky odstraň.

Tlačítka „ours/theirs“ neposuzuj jen podle názvu: při rebase představují strany jiný kontext než při běžném merge.

### Dokončení

Pro upravený soubor, například `src/settings.js`:

```bash
git add -- src/settings.js
git status
```

Přidej všechny vyřešené soubory, spusť testy a pokračuj podle skutečně běžící operace:

| Operace | Pokračování | Zrušení |
|---|---|---|
| Merge | `git merge --continue` | `git merge --abort` |
| Rebase | `git rebase --continue` | `git rebase --abort` |
| Cherry-pick | `git cherry-pick --continue` | `git cherry-pick --abort` |
| Revert | `git revert --continue` | `git revert --abort` |

Rebase může zastavit na dalším commitu s dalším konfliktem.

`--skip` použij jen při vědomém vynechání právě přehrávané změny.

Squash nezakládá běžný stav merge: po vyřešení jeho konfliktů použij `git commit`.

Chceš-li squash zahodit a začínal jsi skutečně s čistým stromem, `git restore --source=HEAD --staged --worktree -- .` vrátí sledované soubory k cílovému commitu a zahodí i případné další místní úpravy.

Před tím si případnou novou práci odlož mimo repozitář.

## Ověření výsledku

```bash
git status
git log --graph --oneline --all -12
```

Ověř čistý stav, zamýšlenou návaznost historie a testy celého výsledku.

Git umí vytvořit bezkonfliktní merge, který přesto obsahuje logickou chybu aplikace.

Pak následuje [push](synchronization.md) a případný [úklid pracovní větve](branches/delete-remote-branch.md).

Zdroje: [git merge](https://git-scm.com/docs/git-merge), [git rebase](https://git-scm.com/docs/git-rebase), [git diff](https://git-scm.com/docs/git-diff).
