---
description: "Oprava posledního i staršího commitu a pravidla publikování přepsané vlastní větve."
---

# Git – oprava zprávy a obsahu commitu

Amend nebo rebase vytvoří opravené commity s novými ID.

Původní záznam se neupravuje na místě.

Pro již sdílenou historii je často přehlednější nový opravný commit, který nevyžaduje přepis serveru.

## Postup podle situace

| Potřeba | Možnost |
|---|---|
| Změnit zprávu posledního místního commitu | `git commit --amend -m "<nová-zpráva>"` |
| Doplnit obsah posledního místního commitu | Připravená oprava a `git commit --amend --no-edit` |
| Opravit starší vlastní commit | Fixup a interaktivní autosquash |
| Opravit již sdílenou změnu | Běžný nový commit, pro opačnou změnu [revert](delete-commits.md) |

## Opravovaný commit

<a id="poslední-místní-commit"></a>
<a id="starší-commit-fixup-a-autosquash"></a>

## [Poslední commit](#tab/fix-amend)

V PowerShellu nebo Bashi se nejprve zkontroluje index a uchová původní historie:

```bash
git status
git diff --cached
git branch backup/pred-amend
```

Pro změnu pouze zprávy musí být index bez připravených změn:

```bash
git commit --amend -m "fix: opravuje výběr jazyka"
git show --stat HEAD
```

Pro doplnění souboru se místo toho upraví příslušný soubor, například `README.md`:

```bash
git add -- README.md
git diff --cached
git commit --amend --no-edit
```

`--no-edit` zachová zprávu posledního commitu a zahrne připravený obsah.

Index nesmí obsahovat jinou rozpracovanou změnu.

## [Starší commit](#tab/fix-autosquash)

Tato ukázka je pro **PowerShell**, vlastní lineární větev s několika commity a čistý stav před opravou.

```powershell
git log --oneline -10
$target = Read-Host "Vlož ID opravovaného commitu z výpisu"
git show --stat $target
git branch backup/pred-fixup
$base = git rev-parse "$target^"
```

`$target` je zvolený opravovaný commit a `$base` jeho rodič, od kterého se později přehraje historie.

Pro první commit repozitáře rodič neexistuje.

V takovém případě se krok s `$base` vynechá a použije se níže varianta `--root`.

Po úpravě souboru vznikne samostatný opravný commit:

```powershell
git add -- README.md
git diff --cached
git commit --fixup $target
git rebase -i --autosquash $base
```

Fixup se nejprve uloží jako normální commit a teprve autosquash ho v editoru navrhne přesunout za původní commit a spojit.

Po kontrole pořadí a rozsahu se seznam uloží a zavře.

Oprava prvního commitu používá místo posledního řádku `git rebase -i --autosquash --root`.

V Bashi platí stejné Git operace s ručně zadaným skutečným ID místo PowerShellových proměnných.

Konflikt se řeší podle [rebase konfliktu](../merging.md#konflikt-git-potřebuje-rozhodnutí-o-obsahu).

`git rebase --abort` vrátí stav před zahájením rebase, tedy včetně samostatného fixup commitu.

***

## Ověření

Kontroluje se `git log --oneline -10`, `git show HEAD` a rozdíl proti záložní větvi.

Rozdíl má odpovídat právě opravovanému obsahu.

Při změně jen zpráv má být prázdný.

Spustí se testy a záložní větev zůstává do ověření publikování.

## Publikování přepsané vlastní větve

Tato možnost platí pouze pro vlastní krátkou větev, kde přepis dovolují pravidla serveru a nespoléhá na ni jiná práce.

Příklad je pro **PowerShell** a existující vzdálenou `feature/hledani`.

**Ještě před amend nebo rebase** se zaznamená vzdálený stav:

```powershell
git fetch origin
$expected = git rev-parse refs/remotes/origin/feature/hledani
git log --oneline --left-right HEAD...origin/feature/hledani
```

Před přepisem musí být jasné všechny rozdíly a případné nové vzdálené commity se zachovají.

`$expected` zůstává ve stejné otevřené relaci terminálu.

Po dokončené a otestované opravě:

```powershell
git push "--force-with-lease=refs/heads/feature/hledani:$expected" origin HEAD:refs/heads/feature/hledani
```

Explicitní lease povolí přepis jen tehdy, pokud server stále ukazuje na dříve uložený commit.

Automatický fetch v IDE uloženou proměnnou nezmění.

Pokud příkaz selže, znovu se zkontroluje serverová historie a začlení nová práce.

Pouhé přepsání `$expected` by obešlo účel této kontroly.

Běžný `--force` tuto kontrolu neposkytuje a chráněné větve se obcházením pravidel nepřepisují.

Zdroje: [git commit](https://git-scm.com/docs/git-commit), [git rebase](https://git-scm.com/docs/git-rebase), [git push](https://git-scm.com/docs/git-push).
