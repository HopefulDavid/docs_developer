---
description: "Dočasné odložení souborů nebo práce na druhé větvi v samostatné složce."
---

# Git – přerušení práce, stash a worktree

Když je potřeba opravit jinou věc uprostřed rozpracované změny, lze ji uložit commitem, odložit do stashe nebo otevřít druhou pracovní složku.

## Volba podle potřeby

| Možnost | Kdy se hodí | Co zachová |
|---|---|---|
| Pracovní commit | Dohledatelná a odeslatelná rozpracovaná verze | Vše připravené v indexu |
| Stash | Krátké uvolnění stejné pracovní složky | Sledované změny, nové soubory jen s `-u` |
| Worktree | Obě větve otevřené současně | Původní složku beze změny a další pracovní strom sdílející historii |

Stash je místní úložiště, běžný push jej neposílá na server.

## Způsob přerušení práce

<a id="stash-odložit-a-vrátit"></a>
<a id="konflikt-při-vracení-stashe"></a>
<a id="worktree-dvě-složky-jedna-historie"></a>

## [Stash](#tab/pause-stash)

**Odložení a vrácení ve stejné složce**

V kořeni repozitáře v PowerShellu nebo Bashi:

```bash
git status --short
git stash push -u -m "Rozpracované hledání"
git stash list
git status
```

`-u` přidá nesledované soubory, ale ne ignorované.

`-a` by zahrnulo i ignorované soubory, což může být nevhodné pro velké buildy nebo tajemství.

Po dokončení jiné práce se přepne zpět na původní větev a zkontroluje se správný záznam:

```bash
git switch feature/hledani
git stash show --stat --include-untracked 'stash@{0}'
git stash apply 'stash@{0}'
git status
```

`stash@{0}` znamená poslední stash.

Uvozovky chrání zápis i v PowerShellu.

`apply` ponechá zálohu ve stash listu.

Volba `--index` navíc požádá o obnovení původního rozdělení mezi index a pracovní strom.

Po ověření vrácených souborů a případném commitu se odstraní právě použitý záznam:

```bash
git stash drop 'stash@{0}'
```

Po vytvoření dalších stashů se jejich čísla posunou, proto se před mazáním vždy znovu zkontroluje `git stash list`.

**Konflikt při vracení stashe**

Po `apply` záznam zůstává zachovaný.

Soubory se opraví jako běžný konflikt a výsledek ukáže `git status`.

Pro stash neexistuje `--continue` ani `--abort`.

Pro obnovu na původním základu s čistým pracovním stromem `git stash branch obnova-hledani 'stash@{0}'` vytvoří větev z původního commitu a záznam na ni aplikuje.

Při úspěchu daný stash odstraní.

## [Worktree](#tab/pause-worktree)

**Dvě složky se společnou historií**

V původním projektu vznikne nová větev ze stabilní místní `main`:

```bash
git worktree add -b hotfix/prihlaseni ../aplikace-oprava main
git worktree list
```

`../aplikace-oprava` je nová sousední složka a `hotfix/prihlaseni` nová větev.

Původní rozpracované soubory zůstávají tam, kde byly.

Nová složka se otevře v IDE, obnoví se její závislosti a práce pokračuje obvyklým způsobem.

Commity a větve jsou společné, pracovní soubory a index každého worktree jsou samostatné.

Stejná větev se běžně nedá současně vybrat ve dvou worktrees.

Po commitu a ověření opravy zpět do původní složky:

```bash
git worktree remove ../aplikace-oprava
git worktree list
```

`remove` odstraní pracovní složku, nikoli větev.

Při necommitované práci odmítne běžné odstranění.

Větev se slučuje samostatně podle [zvoleného workflow](workflows.md).

***

Zdroje: [git stash](https://git-scm.com/docs/git-stash), [git worktree](https://git-scm.com/docs/git-worktree).
