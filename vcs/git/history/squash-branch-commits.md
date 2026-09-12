---
description: "Spojení vlastních pracovních commitů nebo squash až při sloučení do cíle."
---

# Git – spojení commitů do jednoho

Squash se hodí, když několik pracovních commitů představuje jednu ucelenou změnu.

Nejdříve zvol, zda chceš přepsat vlastní pracovní větev, nebo vytvořit souhrnný commit až při začlenění do cíle.

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

## Ověření a návrat

```bash
git diff backup/pred-squash HEAD
git log --oneline -5
```

Rozdíl konečného obsahu má být prázdný a log má ukazovat zamýšlený počet nových commitů.

Pokud rebase teprve probíhá, `git rebase --abort` jej zruší; po dokončení uchovává původní historii záložní větev.

Konflikt řeš podle [návodu pro rebase](../merging.md), výsledek otestuj a případnou již zveřejněnou vlastní větev aktualizuj jen podle [postupu s lease](fix-commits.md#publikování-přepsané-vlastní-větve).

Zdroje: [interaktivní rebase](https://git-scm.com/docs/git-rebase#_interactive_mode), [git merge](https://git-scm.com/docs/git-merge).
