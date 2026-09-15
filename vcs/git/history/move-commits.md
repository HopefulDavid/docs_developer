---
description: "Přesun posledních commitů do nové i existující větve včetně úklidu zdroje, merge a cherry-pick."
---

# Git – přesun commitů do jiné větve

Přesun má dvě části: nejprve zachováš práci v cílové větvi, potom ji odebereš ze zdrojové.

Vytvoření větve nebo merge zachová původní commity.

`cherry-pick` přenáší vybrané změny a na jiném základu vytváří nové commity.

## Před použitím

Příklady fungují v PowerShellu i Bashi a přesouvají **poslední tři neodeslané lineární commity** z místní větve `main`.

Názvy `main` a `feature/presunuta-prace` nahraď podle projektu.

Záložní větev `backup/pred-presunem` musí být nová.

Nejdříve ověř čistý pracovní strom:

```bash
git status --short
git switch main
git log --graph --oneline --decorate -8
git branch --no-track backup/pred-presunem
git log --reverse --oneline backup/pred-presunem~3..backup/pred-presunem
```

Pokud první příkaz vypíše změny, nejprve je commitni nebo [odlož přes stash](../stash-worktree.md), pak začni znovu.

Poslední výpis musí obsahovat právě commity, které chceš přesunout.

`backup/pred-presunem~3` je jejich předchozí základ.

Pro jiný počet uprav `~3` ve všech krocích, případně použij ověřené ID základního commitu.

Rozsah `základ..konec` **nezahrnuje základ**, proto do něj nepatří ID prvního přesouvaného commitu.

Při merge commitech nebo změnách promíchaných s cizí prací nepoužívej tento reset posledních tří commitů bez úpravy rozsahu.

## Přesun commitů do nové větve

Z výchozího stavu `A–B–C–D–E (main)` vznikne `A–B (main)`, zatímco nová větev zachová `A–B–C–D–E`.

Po společné přípravě, stále na `main`:

```bash
git branch --no-track feature/presunuta-prace backup/pred-presunem
git reset --keep backup/pred-presunem~3
git switch feature/presunuta-prace
git log --graph --oneline --decorate --all -10
```

Nová větev ukazuje na původní poslední commit ještě před resetem, takže práce i její ID zůstanou zachované.

`--keep` vrátí zdrojovou větev a dotčené soubory.

Při kolizi s necommitovanou úpravou skončí chybou místo jejího přepsání. [Git reset](https://git-scm.com/docs/git-reset)

`--no-track` zabrání nechtěnému nastavení původní místní větve jako upstreamu, který by později ovlivňoval pull nebo rebase. [Git branch](https://git-scm.com/docs/git-branch)

Potom ověř obsah a testy na nové větvi.

## Přesun commitů do existující větve

### Vybrané commity pomocí cherry-pick

Po společné přípravě přepni na **již existující místní** cílovou větev:

```bash
git switch feature/presunuta-prace
git cherry-pick backup/pred-presunem~3..backup/pred-presunem
git log --oneline -5
git diff --stat backup/pred-presunem~3 backup/pred-presunem
```

Přeneseš změny posledních tří commitů v pořadí od nejstaršího a zachováš vlastní práci cílové větve.

Poslední příkaz připomene rozsah přenášených změn.

Správnost jejich začlenění ověř v cílových souborech a testech.

Jednotlivé nesousedící commity můžeš vybrat syntaxí `git cherry-pick <nejstarší-ID> <další-ID> <nejnovější-ID>`.

Jejich závislosti musí být v cíli dostupné. [Git cherry-pick](https://git-scm.com/docs/git-cherry-pick)

### Celá zdrojová větev pomocí merge

Jestli do cíle patří **veškerá historie zdroje, která v něm chybí**, použij místo cherry-pick původní postup se sloučením:

```bash
git switch feature/presunuta-prace
git merge backup/pred-presunem
git log --graph --oneline --decorate -10
```

Merge zachová ID původních commitů.

Podle vztahu větví provede fast-forward nebo vytvoří merge commit.

Nepřenáší automaticky jen poslední tři commity, proto se pro přesný výběr z odlišné historie hodí předchozí cherry-pick. [Git merge](https://git-scm.com/docs/git-merge)

### Odebrání ze zdrojové větve

**Až po úspěšném přenosu a otestování cíle** dokonči jednu z předchozích variant:

```bash
git switch main
git reset --keep backup/pred-presunem~3
git switch feature/presunuta-prace
git log --graph --oneline --decorate --all -12
```

Zdrojová `main` nyní končí před přesouvanými commity a cílová obsahuje jejich práci.

Záložní větev do ověření výsledku ponech.

Reset zde nemaže jedinou existující kopii commitů.

## Konflikt při přenosu

| Operace | Po opravě konfliktů a `git add -- <soubor>` | Zrušení rozpracované operace |
|---|---|---|
| Cherry-pick | `git cherry-pick --continue` | `git cherry-pick --abort` |
| Merge | `git merge --continue` | `git merge --abort` |

Při konfliktu se ke kroku odebrání ze zdroje ještě nepřechází.

Po abortu zůstane zdrojová historie i záložní větev zachovaná.

## Pokud už byly commity odeslané

Nejprve práci přenes a ověř v cíli.

Ve sdílené zdrojové větvi potom použij [revert](delete-commits.md), aby navazující historie zůstala platná.

Pro tři uvedené lineární commity provedeš ze zdrojové větve opačné změny od nejnovějšího:

```bash
git switch main
git revert --no-edit backup/pred-presunem backup/pred-presunem~1 backup/pred-presunem~2
```

Vzniknou tři nové vratné commity, které můžeš odeslat běžným pushem.

Pokud později chceš stejnou práci vrátit přes merge, zohledni i tyto reverty.

Git si pamatuje, že původní commity už ve zdroji byly.

Novou cílovou větev zveřejníš přes `git push -u origin feature/presunuta-prace`.

Místní přesun neodeslaných commitů nevyžaduje force push zdroje.

## Zatím jen rozpracované soubory

Pokud ještě nemáš commit a současný základ je správný, stačí `git switch --no-track -c feature/presunuta-prace`.

Necommitované úpravy zůstanou v pracovním stromu nové větve.

Pro jiný základ použij [stash nebo worktree](../stash-worktree.md).

Další rozbor variant: [Stack Overflow – přesun posledních commitů](https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git).
