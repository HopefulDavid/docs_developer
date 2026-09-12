---
description: "Dočasné odložení souborů nebo práce na druhé větvi v samostatné složce."
---

# Git – přerušení práce, stash a worktree

Pokud potřebuješ opravit jinou věc uprostřed rozpracované změny, můžeš ji uložit commitem, odložit do stashe nebo otevřít druhou pracovní složku.

## Vyber podle potřeby

| Možnost | Kdy se hodí | Co zachová |
|---|---|---|
| Pracovní commit | Chceš dohledatelnou a odeslatelnou rozpracovanou verzi | Vše, co jsi připravil do indexu |
| Stash | Krátce uvolníš stejnou pracovní složku | Sledované změny; nové soubory jen s `-u` |
| Worktree | Chceš obě větve otevřené současně | Původní složku beze změny a další pracovní strom sdílející historii |

Stash je místní úložiště, běžný push jej neposílá na server.

## Stash: odložit a vrátit

V kořeni repozitáře v PowerShellu nebo Bashi:

```bash
git status --short
git stash push -u -m "Rozpracované hledání"
git stash list
git status
```

`-u` přidá nesledované soubory, ale ne ignorované; `-a` by zahrnulo i ignorované soubory, což může být nevhodné pro velké buildy nebo tajemství.

Po dokončení jiné práce se vrať na původní větev a prohlédni správný záznam:

```bash
git switch feature/hledani
git stash show --stat --include-untracked 'stash@{0}'
git stash apply 'stash@{0}'
git status
```

`stash@{0}` znamená poslední stash; uvozovky chrání zápis i v PowerShellu.

`apply` ponechá zálohu ve stash listu; volba `--index` navíc požádá o obnovení původního rozdělení mezi index a pracovní strom.

Až ověříš vrácené soubory a případně je commitneš, odstraň právě použitý záznam:

```bash
git stash drop 'stash@{0}'
```

Po vytvoření dalších stashů se jejich čísla posunou, proto před mazáním vždy znovu zkontroluj `git stash list`.

### Konflikt při vracení stashe

Záznam zůstává zachovaný, pokud jsi použil `apply`; soubory oprav jako běžný konflikt a výsledek zkontroluj přes `git status`.

Pro stash neexistuje `--continue` ani `--abort`.

Pokud chceš obnovovat na původním základu a máš čistý pracovní strom, `git stash branch obnova-hledani 'stash@{0}'` vytvoří větev z původního commitu a záznam na ni aplikuje; při úspěchu daný stash odstraní.

## Worktree: dvě složky, jedna historie

V původním projektu vytvoř novou větev ze stabilní místní `main`:

```bash
git worktree add -b hotfix/prihlaseni ../aplikace-oprava main
git worktree list
```

`../aplikace-oprava` je nová sousední složka a `hotfix/prihlaseni` nová větev; původní rozpracované soubory zůstávají tam, kde byly.

Otevři novou složku v IDE, obnov její závislosti a pracuj obvyklým způsobem.

Commity a větve jsou společné, pracovní soubory a index každého worktree jsou samostatné; stejná větev se běžně nedá současně vybrat ve dvou worktrees.

Po commitu a ověření opravy se vrať do původní složky:

```bash
git worktree remove ../aplikace-oprava
git worktree list
```

`remove` odstraní pracovní složku, nikoli větev; při necommitované práci odmítne běžné odstranění.

Větev sluč samostatně podle [zvoleného workflow](workflows.md).

Zdroje: [git stash](https://git-scm.com/docs/git-stash), [git worktree](https://git-scm.com/docs/git-worktree).
