---
description: "Fast-forward, merge, squash a rebase včetně vyřešení nebo zrušení konfliktu."
---

# Git – slučování větví a konflikty

Sloučení přenese hotovou práci do cílové větve.

Metoda určuje, jak se výsledek zapíše do historie.

Nejdříve se ujasní **zdroj** změn a **cíl**, do kterého mají přijít.

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

<a id="zvol-jednu-metodu"></a>

## Volba metody

Ze způsobů začlenění práce se spouští jen jeden zvolený.

<a id="fast-forward-jednoduchý-posun"></a>
<a id="merge-commit-zachování-obou-linií"></a>
<a id="squash-jedna-ucelená-změna-v-cíli"></a>

## [Fast-forward](#tab/git-merge-ff)

**Jednoduchý posun cílové větve**

```bash
git merge --ff-only feature/hledani
```

Povolí jen posunutí `main` na již existující commit pracovní větve.

Pokud na `main` mezitím přibyly jiné commity, skončí chybou bez zahájení konfliktu.

V takové situaci pomůže merge nebo nejprve aktualizace pracovní větve.

## [Merge commit](#tab/git-merge-commit)

**Zachování obou linií**

```bash
git merge --no-ff feature/hledani
```

Vytvoří spojovací commit i v případě, kdy by šel pouhý posun.

Editor zprávy se uloží a zavře.

Historie zachová jednotlivé pracovní commity i informaci, která větev se začlenila.

## [Squash](#tab/git-merge-squash)

**Jedna ucelená změna v cíli**

```bash
git merge --squash feature/hledani
git diff --cached
git commit -m "feat: přidává hledání"
```

První příkaz připraví výslednou změnu do indexu, ale commit ještě nevytvoří.

Po kontrole a testech se uloží jako jeden commit.

Původní pracovní větev se nepřepisuje, ale její commity nejsou předky nového commitu.

Proto po squash může `git branch -d` odmítnout smazání pracovní větve, přestože výsledný kód už je začleněný.

***

## Aktualizace pracovní větve pomocí rebase

Na vlastní, dosud nesdílené pracovní větvi lze přesunout základ vývoje:

```bash
git switch feature/hledani
git branch backup/pred-rebase
git rebase main
```

Git přehraje vlastní commity nad místní `main` a vytvoří jim nová ID.

Nejprve se proto aktualizuje `main` ze serveru, pokud má být základem jeho aktuální stav.

Záložní větev uchovává původní commity, nikoli necommitované soubory.

Po úspěšném rebase se funkce znovu otestuje a na `main` ji lze začlenit například přes fast-forward.

## Konflikt: Git potřebuje rozhodnutí o obsahu

Konflikt typicky vznikne, když obě větve jinak upravily stejnou část souboru.

```bash
git status
git diff --name-only --diff-filter=U
```

Příkazy ukážou probíhající operaci a nevyřešené soubory.

V textovém souboru se může objevit:

```text
<<<<<<< HEAD
title = "Seznam"
=======
title = "Moje poznámky"
>>>>>>> feature/hledani
```

V editoru se zvolí správný výsledný text, případně se obě změny smysluplně spojí, a všechny značky se odstraní.

Tlačítka „ours/theirs“ se neposuzují jen podle názvu: při rebase představují strany jiný kontext než při běžném merge.

### Dokončení

Pro upravený soubor, například `src/settings.js`:

```bash
git add -- src/settings.js
git status
```

Přidají se všechny vyřešené soubory, spustí se testy a pokračuje se podle skutečně běžící operace:

| Operace | Pokračování | Zrušení |
|---|---|---|
| Merge | `git merge --continue` | `git merge --abort` |
| Rebase | `git rebase --continue` | `git rebase --abort` |
| Cherry-pick | `git cherry-pick --continue` | `git cherry-pick --abort` |
| Revert | `git revert --continue` | `git revert --abort` |

Rebase může zastavit na dalším commitu s dalším konfliktem.

`--skip` se použije jen při vědomém vynechání právě přehrávané změny.

Squash nezakládá běžný stav merge: po vyřešení jeho konfliktů následuje `git commit`.

Pro zahození squashe, který skutečně začínal s čistým stromem, `git restore --source=HEAD --staged --worktree -- .` vrátí sledované soubory k cílovému commitu a zahodí i případné další místní úpravy.

Předtím se případná nová práce odloží mimo repozitář.

## Ověření výsledku

```bash
git status
git log --graph --oneline --all -12
```

Ověří se čistý stav, zamýšlená návaznost historie a testy celého výsledku.

Git umí vytvořit bezkonfliktní merge, který přesto obsahuje logickou chybu aplikace.

Pak následuje [push](synchronization.md) a případný [úklid pracovní větve](branches/delete-remote-branch.md).

Zdroje: [git merge](https://git-scm.com/docs/git-merge), [git rebase](https://git-scm.com/docs/git-rebase), [git diff](https://git-scm.com/docs/git-diff).
