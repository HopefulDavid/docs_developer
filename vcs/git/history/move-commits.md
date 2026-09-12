# Git – přesun commitů do jiné větve

Větev je ukazatel na commit; vytvořením nové větve lze hotovou práci zachovat a původní ukazatel přesunout zpět.

## Před použitím

Následující postup mění pouze **místní, dosud nepublikovanou** historii.

Ověř `git status --short` a pokračuj s čistým pracovním stromem; počet `3` je příklad tří posledních lineárních commitů.

## Přesun do nové větve

Z aktuální chybně použité větve spusť:

```bash
git log --oneline -5
git branch feature/presunuta-prace
git reset --keep HEAD~3
git switch feature/presunuta-prace
```

Nová větev nejprve uchová všechny commity; reset posune původní větev a `--keep` odmítne změny, které by přepsaly dotčené místní úpravy. [Reference git reset](https://git-scm.com/docs/git-reset)

Přes `git log --oneline --all --graph -10` ověř, že práce zůstala v nové větvi.

## Přenos do existující větve

Pro jednotlivý commit použij `cherry-pick`, aby se nepřenesla celá zdrojová větev:

```bash
# Ve zdrojové větvi uchovej poslední commit pojmenovaným ukazatelem.
git branch backup/zdroj
git switch cilova-vetev
git cherry-pick backup/zdroj
```

`cilova-vetev` nahraď existující cílovou větví; ukázka kopíruje pouze poslední commit, ne všechny commity ze zálohy.

Při více commitech vybírej jejich skutečná ID od nejstaršího; merge commity vyžadují samostatné posouzení. [Reference cherry-pick](https://git-scm.com/docs/git-cherry-pick)

Při konfliktu oprav soubory, připrav je pomocí `git add` a pokračuj přes `git cherry-pick --continue`; zrušení provede `git cherry-pick --abort`.

## Ověření a úklid

Spusť testy cílové větve a prohlédni rozdíl, než odstraníš commit ze zdrojové větve.

U již publikované práce preferuj [revert](delete-commits.md); reset sdílené větve by změnil historii ostatním.
