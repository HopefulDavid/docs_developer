# Git – sloučení commitů do jednoho

Squash spojí práci z několika commitů do jednoho záznamu; hodí se k úpravě vlastní pracovní větve před review.

## Před použitím

Příklad je pro **Bash nebo Git Bash**, vlastní větev `feature/nova-funkce` a cílovou `origin/main`.

Pracovní strom i index musí být čisté; názvy větví uprav podle projektu a nepoužívej postup automaticky na dlouhodobé sdílené větve.

## Praktický postup

```bash
git switch feature/nova-funkce
git status --short
git fetch origin
git branch backup/pred-squash
base=$(git merge-base HEAD origin/main)
git log --oneline "$base"..HEAD
```

`base` je společný předek; výpis ukáže commity, které přepis zahrne.

Pokračuj jen tehdy, když je to zamýšlený rozsah:

```bash
git reset --soft "$base"
git diff --cached --stat
git commit -m "feat: přidává novou funkci"
```

`--soft` přesune větev, ale zachová index i pracovní soubory; nový commit proto obsahuje jejich souhrnný stav. [Reference git reset](https://git-scm.com/docs/git-reset)

## Ověření výsledku

```bash
git diff backup/pred-squash HEAD
git log --oneline "$base"..HEAD
```

První výpis má být prázdný a druhý obsahovat jediný nový commit; následně spusť testy projektu.

Zveřejněnou vlastní větev aktualizuj podle [postupu pro přepis s lease](../in-practice.md), jehož očekávaný vzdálený commit je nutné zaznamenat před přepisem.

## Alternativa bez přepisu zdrojové větve

Pokud hosting nabízí **Squash and merge**, lze vytvořit jeden commit až při sloučení PR; možnost musí povolovat pravidla projektu.

Zálohu ponech do ověření výsledku a publikování.
