---
description: "Oprava posledního i staršího commitu a pravidla publikování přepsané vlastní větve."
---

# Git – oprava zprávy a obsahu commitu

Amend nebo rebase vytvoří opravené commity s novými ID.

Původní záznam se neupravuje na místě.

Pro již sdílenou historii je často přehlednější nový opravný commit, který nevyžaduje přepis serveru.

## Vyber podle situace

| Potřeba | Možnost |
|---|---|
| Změnit zprávu posledního místního commitu | `git commit --amend -m "<nová-zpráva>"` |
| Doplnit obsah posledního místního commitu | Připrav opravu a použij `git commit --amend --no-edit` |
| Opravit starší vlastní commit | Fixup a interaktivní autosquash |
| Opravit již sdílenou změnu | Běžný nový commit, pro opačnou změnu [revert](delete-commits.md) |

## Vyber opravovaný commit

<a id="poslední-místní-commit"></a>
<a id="starší-commit-fixup-a-autosquash"></a>

## [Poslední commit](#tab/fix-amend)

V PowerShellu nebo Bashi nejprve prohlédni index a uchovej původní historii:

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

Pro doplnění souboru místo toho uprav příslušný soubor, například `README.md`:

```bash
git add -- README.md
git diff --cached
git commit --amend --no-edit
```

`--no-edit` zachová zprávu posledního commitu a zahrne připravený obsah.

Ověř, že index neobsahuje jinou rozpracovanou změnu.

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

V takovém případě krok s `$base` vynech a použij níže variantu `--root`.

Uprav soubor a vytvoř samostatný opravný commit:

```powershell
git add -- README.md
git diff --cached
git commit --fixup $target
git rebase -i --autosquash $base
```

Fixup se nejprve uloží jako normální commit a teprve autosquash ho v editoru navrhne přesunout za původní commit a spojit.

Zkontroluj pořadí a rozsah, ulož a zavři seznam.

Pro opravu prvního commitu použij místo posledního řádku `git rebase -i --autosquash --root`.

V Bashi použij stejné Git operace s ručně zadaným skutečným ID místo PowerShellových proměnných.

Při konfliktu postupuj podle [rebase konfliktu](../merging.md#konflikt-git-potřebuje-rozhodnutí-o-obsahu).

`git rebase --abort` vrátí stav před zahájením rebase, tedy včetně samostatného fixup commitu.

***

## Ověření

Prohlédni `git log --oneline -10`, `git show HEAD` a rozdíl proti záložní větvi.

Rozdíl má odpovídat právě opravovanému obsahu.

Při změně jen zpráv má být prázdný.

Spusť testy a záložní větev ponech do ověření publikování.

## Publikování přepsané vlastní větve

Tuto možnost použij pouze u své krátké větve, kde přepis dovolují pravidla serveru a nespoléhá na ni jiná práce.

Příklad je pro **PowerShell** a existující vzdálenou `feature/hledani`.

**Ještě před amend nebo rebase** zaznamenej vzdálený stav:

```powershell
git fetch origin
$expected = git rev-parse refs/remotes/origin/feature/hledani
git log --oneline --left-right HEAD...origin/feature/hledani
```

Před přepisem musíš rozumět všem rozdílům a zachovat případné nové vzdálené commity.

`$expected` ponech ve stejné otevřené relaci terminálu.

Po dokončené a otestované opravě:

```powershell
git push "--force-with-lease=refs/heads/feature/hledani:$expected" origin HEAD:refs/heads/feature/hledani
```

Explicitní lease povolí přepis jen tehdy, pokud server stále ukazuje na dříve uložený commit.

Automatický fetch v IDE uloženou proměnnou nezmění.

Pokud příkaz selže, znovu prohlédni serverovou historii a začleň novou práci.

Pouhé přepsání `$expected` by obešlo účel této kontroly.

Běžný `--force` tuto kontrolu neposkytuje a chráněné větve nepřepisuj obcházením pravidel.

Zdroje: [git commit](https://git-scm.com/docs/git-commit), [git rebase](https://git-scm.com/docs/git-rebase), [git push](https://git-scm.com/docs/git-push).
