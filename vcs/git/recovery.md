---
description: "Volba opravy podle stavu změny, záchrana přes reflog a řešení běžných chyb."
---

# Git – co dělat, když se něco nepovedlo

Nejdříve zjisti, zda je změna jen v souborech, připravená v indexu, uložená místně nebo už zveřejněná.

Podle toho vybereš opravu, která zachová potřebnou práci.

## Začni kontrolou

```bash
git status
git log --oneline -8
git diff
git diff --cached
```

Příkazy pouze čtou stav a fungují v PowerShellu i Bashi.

Pokud si nejsi jistý, uchovej před opravou kopii rozpracovaných souborů mimo repozitář; samotná záložní větev chrání jen commity.

## Najdi správný případ

| Situace | Postup |
|---|---|
| Připravil jsem do commitu špatný soubor | Vyřaď ho z indexu podle následujícího příkladu |
| Chci zahodit úpravu souboru, kterou jsem necommitnul | Obnov soubor až po prohlédnutí diffu |
| Chci opravit zprávu nebo obsah místního commitu | [Amend a fixup](history/fix-commits.md) |
| Chybný commit už je na serveru | [Revert](history/delete-commits.md) |
| Commitoval jsem na špatné větvi | [Přesun nebo cherry-pick](history/move-commits.md) |
| Probíhá konflikt | [Pokračování nebo zrušení operace](merging.md#konflikt-git-potřebuje-rozhodnutí-o-obsahu) |
| Zmizela větev nebo jsem posunul historii špatně | Záchrana pomocí reflogu níže |
| Nevím, který commit způsobil chybu | [Historie a bisect](history/reading.md) |
| Push je odmítnutý | [Synchronizace](synchronization.md#co-dělat-když-push-selže) |

## Vyřazení souboru z indexu

Příklad předpokládá repozitář s alespoň jedním commitem:

```bash
git restore --staged -- README.md
git diff -- README.md
```

`README.md` se vrátí z připravených do nepřipravených změn; jeho upravený obsah na disku zůstane.

U nového souboru **před prvním commitem repozitáře** ještě neexistuje HEAD, proto pro vyřazení použij `git rm --cached -- README.md`.

## Zahození necommitované úpravy souboru

Nejprve zkontroluj rozdíl:

```bash
git diff -- README.md
git restore -- README.md
```

Druhý příkaz **přepíše pracovní soubor obsahem indexu**; pokud nic není připravené, jde obvykle o poslední commit.

Pro výslovný návrat k poslednímu commitu v indexu i souboru:

```bash
git restore --source=HEAD --staged --worktree -- README.md
```

Tato varianta zahodí připravené i nepřipravené změny daného souboru.

Necommitovaný obsah nemusí být možné z Gitu obnovit; pomoci může historie editoru nebo záloha.

## Obnovení smazaného souboru ze starší verze

Obecná syntaxe:

```text
git restore --source=<commit-nebo-tag> -- <soubor>
```

Například `git restore --source=v1.0.0 -- README.md` obnoví soubor z existujícího tagu `v1.0.0` do pracovní složky.

Pak zkontroluj `git diff` a obnovení běžně commitni; nepřesouváš tím celou větev do minulosti.

## Záchrana přes reflog

Reflog je místní záznam dřívějších poloh HEAD a větví; může najít commit, na který už žádná běžná větev neukazuje.

```bash
git reflog --date=local -20
```

Vyber ID podle obsahu a času, ne pouze podle pořadového čísla z cizího příkladu.

```text
git show --stat <nalezený-commit>
git branch zachrana <nalezený-commit>
git log --oneline zachrana -5
```

Nová větev zpřístupní nalezenou historii, aniž by přepsala aktuální pracovní soubory.

Po kontrole na ni můžeš přepnout v čistém stromu nebo z ní přenést konkrétní commit.

Reflog neobnoví libovolný nikdy neuložený soubor a staré nedosažitelné objekty mohou být časem odstraněné údržbou.

## Detached HEAD

Při prohlížení tagu či starého commitu může HEAD ukazovat přímo na commit bez větve.

Jestli chceš vzniklou práci zachovat, ještě před odchodem vytvoř větev:

```bash
git switch -c zachrana-experimentu
```

Existující commity tím dostanou trvalé pojmenování; pokud jsi nic neměnil, stačí běžné `git switch main`.

## Nesledované soubory a tajemství

`git clean -nd` pouze vypíše nesledované soubory a složky navržené k odstranění.

Ke skutečnému odstranění použij po záloze raději přesně vybrané položky v editoru či správci souborů; `clean` nemá vlastní koš ani obnovu a `-x` by zahrnulo i ignorované soubory.

Pokud se do historie dostal token či heslo, nejprve jej zneplatni a nahraď; odstranění aktuálního souboru ani reset neodstraní všechny kopie zveřejněného údaje.

Zdroje: [restore](https://git-scm.com/docs/git-restore), [reflog](https://git-scm.com/docs/git-reflog), [clean](https://git-scm.com/docs/git-clean).
