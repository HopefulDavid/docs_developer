---
description: "Nahrazení historie vzdálené větve jediným kořenovým commitem z aktuálního místního obsahu."
---

# Git – nahrazení celé historie jedním commitem

Tento postup zachová aktuální soubory místní větve, vytvoří z nich **jeden nový commit bez rodiče** a nahradí jím historii zvolené vzdálené větve.

Hodí se pro vědomý nový začátek projektu nebo odvozenou publikační větev, u které se předchozí verze nemají uchovávat.

Spojení jen několika pracovních commitů řeší [squash](squash-branch-commits.md).

Vrácení chyby řeší [revert](delete-commits.md).

## Před použitím

Ukázka používá **PowerShell**, místní větev `main` s požadovaným obsahem a existující vzdálenou `origin/main`.

Ve všech příkazech se upraví `main` a `origin`, pokud se větev nebo server jmenují jinak.

Přepis musí být dovolený pravidly cílového repozitáře a domluvený se všemi, kdo na historii navazují.

Pracovní strom musí být čistý a názvy `backup/pred-novou-historii`, `nova-historie` i soubor zálohy dosud nepoužité.

Každý krok následuje až po úspěchu předchozího.

<a id="1-ověř-cíl-a-zálohuj-starou-historii"></a>

## 1. Ověření cíle a záloha staré historie

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

Rozpracované soubory ze statusu se nejprve uloží a postup začne znovu.

Kontrolují se rozdíly vůči serveru: výsledkem bude **místní obsah**, takže potřebné vzdálené změny se musí začlenit před pokračováním.

Proměnná `$expected` uchová přesné ID vzdáleného commitu pro pozdější kontrolu pushe.

Práce pokračuje ve stejném terminálu.

Bundle se uloží také mimo tento počítač.

Obsah a hranice zálohy včetně LFS vysvětluje [záloha Gitu](../backups.md).

<a id="2-vytvoř-jediný-kořenový-commit"></a>

## 2. Jediný kořenový commit

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

Záměrně se zde používá `checkout --orphan`: `switch --orphan` odstraňuje sledované soubory a není přímou náhradou tohoto příkazu. [Git switch](https://git-scm.com/docs/git-switch)

<a id="3-nahraď-místní-větev"></a>

## 3. Nahrazení místní větve

```powershell
git branch -M main
git log --oneline main
```

Přejmenování nahradí původní místní `main` novou větví.

Starou historii stále uchovává záložní větev a bundle.

Není potřeba předem mazat `main` samostatným příkazem ani odstraňovat adresář `.git`.

Pokud je požadovaná místní větev s jediným kořenovým commitem už připravená, po ověření cíle a záloze z kroku 1 lze kroky 2 a 3 vynechat a přejít k publikování.

<a id="4-nahraď-vzdálenou-historii"></a>

## 4. Nahrazení vzdálené historie

Nejdříve se zkontroluje návrh, potom se stejná operace provede bez `--dry-run`:

```powershell
git push --dry-run "--force-with-lease=refs/heads/main:$expected" origin main:refs/heads/main
git push "--force-with-lease=refs/heads/main:$expected" origin main:refs/heads/main
git fetch origin
git branch --set-upstream-to=origin/main main
git rev-list --count origin/main
git diff main origin/main
```

Explicitní lease povolí přepis jen tehdy, pokud vzdálená `main` stále ukazuje na commit zaznamenaný před změnou. [Git push](https://git-scm.com/docs/git-push)

Při odmítnutí se zkontroluje nová vzdálená práce.

Pouhé přenastavení `$expected` nebo použití `--force` by tuto kontrolu obešlo.

Po úspěchu má také `origin/main` jeden commit a diff vůči místní větvi je prázdný.

## Ověření a další práce

Server se naklonuje do nové složky a ověří se `git log`, soubory a běžné testy projektu.

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

Obnovu do samostatné složky provede `git clone pred-novou-historii.bundle projekt-obnoveny` z adresáře s bundlem.

Po publikování by i návrat serveru představoval další přepis.

Musí znovu zohlednit případnou novou vzdálenou práci.
