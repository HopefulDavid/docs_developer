# Git – opravy commitů pomocí fixup a autosquash

Opravný commit lze při interaktivním rebase spojit s původním commitem, aby historie popisovala ucelené změny.

## Jak to funguje

`--fixup` připraví opravu bez zachování její zprávy; `--squash` připraví i zprávu k pozdějšímu sloučení.

Teprve `rebase --autosquash` tyto commity skutečně přeuspořádá a spojí. [Reference git commit](https://git-scm.com/docs/git-commit)

## Před použitím

Použij vlastní větev a ověř čistý stav před rebase; sdílenou historii měň jen po dohodě.

Příkazy fungují v PowerShellu i Bashi.

## Praktický postup

```bash
# Najdi opravovaný commit a uchovej původní větev.
git log --oneline -10
git branch backup/pred-fixup
```

Uprav soubor, například `src/app.cs`, a připrav jeho opravu:

```bash
git add src/app.cs
git diff --cached
git commit --fixup HEAD~1
```

`HEAD~1` zde označuje předposlední commit **před vytvořením fixupu**; nahraď jej ID skutečného opravovaného commitu z výpisu.

Pro spojení se zprávou použij místo posledního příkazu `git commit --squash HEAD~1`.

```bash
# Rozsah musí zahrnout původní commit i jeho opravu.
git rebase -i --autosquash HEAD~3
```

V editoru zkontroluj pořadí a akce, ulož a zavři soubor; pokud opravuješ první commit repozitáře, použij místo `HEAD~3` volbu `--root`.

## Konflikty a ověření

Při konfliktu oprav označené soubory, přidej je přes `git add` a spusť `git rebase --continue`; návrat k výchozímu stavu provede `git rebase --abort`. [Reference git rebase](https://git-scm.com/docs/git-rebase)

Po dokončení zkontroluj `git log --oneline -10`, `git diff backup/pred-fixup HEAD` a spusť testy projektu.

Zveřejněnou vlastní větev aktualizuj podle [postupu s explicitním lease](../in-practice.md).
