---
description: "Nahrazení historie vzdálené větve jediným kořenovým commitem z aktuálního místního obsahu."
---

# Git – nahrazení celé historie jedním commitem

Tento postup zachová aktuální soubory místní větve, vytvoří z nich **jeden nový commit bez rodiče** a nahradí jím historii zvolené vzdálené větve.

Hodí se pro vědomý nový začátek projektu nebo odvozenou publikační větev, u které nechceš uchovávat předchozí verze.

Pro spojení jen několika pracovních commitů použij [squash](squash-branch-commits.md).

Pro vrácení chyby použij [revert](delete-commits.md).

## Před použitím

Ukázka používá **PowerShell**, místní větev `main` s požadovaným obsahem a existující vzdálenou `origin/main`.

Ve všech příkazech uprav `main` a `origin`, pokud se tvá větev nebo server jmenují jinak.

Přepis musí být dovolený pravidly cílového repozitáře a domluvený se všemi, kdo na historii navazují.

Pracovní strom musí být čistý a názvy `backup/pred-novou-historii`, `nova-historie` i soubor zálohy dosud nepoužité.

Každý krok proveď až po úspěchu předchozího.

## 1. Ověř cíl a zálohuj starou historii

```powershell
git status --short
git switch main
git remote -v
git fetch origin
$expected = git rev-parse refs/remotes/origin/main
git log --oneline --left-right main...origin/main
git branch --no-track backup/pred-novou-historii
git bundle create ../pred-novou-historii.bundle --all
git bundle verify ../pred-novou-historii.bundle
```

Pokud status vypíše rozpracované soubory, nejprve je ulož a začni znovu.

Prohlédni rozdíly vůči serveru: výsledkem bude **místní obsah**, takže potřebné vzdálené změny musíš začlenit před pokračováním.

Proměnná `$expected` uchová přesné ID vzdáleného commitu pro pozdější kontrolu pushe.

Pracuj dále ve stejném terminálu.

Bundle ulož také mimo tento počítač.

Obsah a hranice zálohy včetně LFS vysvětluje [záloha Gitu](../backups.md).

## 2. Vytvoř jediný kořenový commit

```powershell
git checkout --orphan nova-historie main
git diff --cached --stat
git commit -m "Initial commit"
git rev-list --count HEAD
git diff backup/pred-novou-historii HEAD
```

`checkout --orphan` připraví novou historii se sledovanými soubory z `main` už v indexu, takže není potřeba `git add -A`. [Git checkout](https://git-scm.com/docs/git-checkout)

Tím se do nového commitu nepřidají náhodné nesledované soubory.

Počet commitů musí být **1** a poslední diff prázdný, protože výsledný obsah má být stejný jako před přepisem.

Záměrně zde používáme `checkout --orphan`: `switch --orphan` odstraňuje sledované soubory a není přímou náhradou tohoto příkazu. [Git switch](https://git-scm.com/docs/git-switch)

## 3. Nahraď místní větev

```powershell
git branch -M main
git log --oneline main
```

Přejmenování nahradí původní místní `main` novou větví.

Starou historii stále uchovává záložní větev a bundle.

Není potřeba předem mazat `main` samostatným příkazem ani odstraňovat adresář `.git`.

Pokud už máš požadovanou místní větev s jediným kořenovým commitem připravenou, po ověření cíle a záloze z kroku 1 můžeš kroky 2 a 3 vynechat a přejít k publikování.

## 4. Nahraď vzdálenou historii

Nejdříve prohlédni návrh, potom proveď stejnou operaci bez `--dry-run`:

```powershell
git push --dry-run "--force-with-lease=refs/heads/main:$expected" origin main:refs/heads/main
git push "--force-with-lease=refs/heads/main:$expected" origin main:refs/heads/main
git fetch origin
git branch --set-upstream-to=origin/main main
git rev-list --count origin/main
git diff main origin/main
```

Explicitní lease povolí přepis jen tehdy, pokud vzdálená `main` stále ukazuje na commit zaznamenaný před změnou. [Git push](https://git-scm.com/docs/git-push)

Při odmítnutí prohlédni novou vzdálenou práci.

Pouhé přenastavení `$expected` nebo použití `--force` by tuto kontrolu obešlo.

Po úspěchu má také `origin/main` jeden commit a diff vůči místní větvi je prázdný.

## Ověření a další práce

Naklonuj server do nové složky a ověř `git log`, soubory a běžné testy projektu.

Ostatní pracovní kopie by měly po záloze vlastní rozpracované práce přejít na novou historii.

Běžný pull může narazit na nesouvisející historie.

| Co postup změní | Co zůstává zvlášť |
|---|---|
| Historii konkrétní vzdálené větve `main` | Ostatní větve a tagy |
| Místní `main` | Záložní větev, bundle a reflog |
| Historii nového klonu pro tuto větev | Staré klony, forky, reference hostingu a LFS objekty |

Postup tedy nahrazuje celou historii **jedné větve**, ale nezaručuje fyzické vymazání starých objektů ze všech kopií repozitáře.

## Návrat k původnímu stavu

Před publikováním lze starý obsah otevřít přes `git switch backup/pred-novou-historii`.

Pro obnovu do samostatné složky použij `git clone pred-novou-historii.bundle projekt-obnoveny` z adresáře s bundlem.

Po publikování by i návrat serveru představoval další přepis.

Musí znovu zohlednit případnou novou vzdálenou práci.
