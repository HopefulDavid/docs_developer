---
description: "Spojení vlastních pracovních commitů nebo squash až při sloučení do cíle."
---

# Git – spojení commitů do jednoho

Squash se hodí, když několik pracovních commitů představuje jednu ucelenou změnu.

Nejdříve zvol, zda chceš přepsat vlastní pracovní větev, nebo vytvořit souhrnný commit až při začlenění do cíle.

Pokud má celá vzdálená větev začít jediným kořenovým commitem bez původních předků, použij [nahrazení celé historie](replace-history.md).

## Nejmenší zásah: squash při sloučení

Použij [`git merge --squash`](../merging.md#squash-jedna-ucelená-změna-v-cíli) nebo možnost **Squash and merge** na hostingu.

Zdrojová větev si ponechá původní commity a cílová dostane jeden souhrnný; není potřeba přepisovat vzdálenou pracovní větev.

## Úprava vlastních posledních commitů

Příklad je pro PowerShell i Bash, čistý strom a **tři poslední vlastní lineární commity**, které ještě nesdílíš.

```bash
git log --oneline -5
git branch backup/pred-squash
git rebase -i HEAD~3
```

`HEAD~3` označuje rodiče nejstaršího z těchto tří commitů; ověř počet a rozsah předem.

V otevřeném seznamu ponech první řádek jako `pick` a další dva změň na `squash`:

```text
pick   <id-první-změny> Přidání základu hledání
squash <id-druhé-změny> Doplnění filtrování
squash <id-třetí-změny> Testy hledání
```

Zástupná ID nekopíruj: editor už obsahuje skutečné commity a měníš jen slovo na začátku řádku.

Po uložení zadej jednu výslednou zprávu; `fixup` místo `squash` by zahodil zprávu připojovaného commitu.

Pro rozsah zahrnující úplně první commit repozitáře se používá `git rebase -i --root`.

## Celá vlastní větev od společného předka

Pokud chceš spojit všechny vlastní změny větve do jednoho commitu bez ručního počítání, lze použít původní postup se soft resetem.

Příklad je pro PowerShell, čistou vlastní větev `feature/hledani` a jediný společný základ s `origin/main`; nemá sloužit k neřízenému přepisování sdílené integrační větve.

```powershell
git switch feature/hledani
git fetch origin
git branch --no-track backup/pred-soft-squash
$base = git merge-base HEAD origin/main
git log --oneline "$base..HEAD"
git reset --soft $base
git diff --cached --stat
git commit -m "feat: přidává hledání"
git diff backup/pred-soft-squash HEAD
```

Nejdříve prohlédni vypsaný rozsah; soft reset ponechá aktuální index a soubory, takže nový commit zachytí jejich výsledný rozdíl proti společnému předku.

Poslední diff má být prázdný; operace nepřebírá nové změny z `origin/main`, které vznikly po rozvětvení.

Pokud větev obsahuje složité merge nebo má více společných základů, použij raději squash při začlenění do cíle.

Již publikovaná vlastní větev vyžaduje zachytit vzdálený stav **před resetem** a následně použít [publikování s lease](fix-commits.md#publikování-přepsané-vlastní-větve).

## Ověření a návrat po interaktivním rebase

```bash
git diff backup/pred-squash HEAD
git log --oneline -5
```

Rozdíl konečného obsahu má být prázdný a log má ukazovat zamýšlený počet nových commitů.

Pokud rebase teprve probíhá, `git rebase --abort` jej zruší; po dokončení uchovává původní historii záložní větev.

Konflikt řeš podle [návodu pro rebase](../merging.md), výsledek otestuj a případnou již zveřejněnou vlastní větev aktualizuj jen podle [postupu s lease](fix-commits.md#publikování-přepsané-vlastní-větve).

Zdroje: [interaktivní rebase](https://git-scm.com/docs/git-rebase#_interactive_mode), [git merge](https://git-scm.com/docs/git-merge), [git reset](https://git-scm.com/docs/git-reset), [git merge-base](https://git-scm.com/docs/git-merge-base).
