# Git – bezpečný push a přepis vlastní větve

Push přenáší místní commity do vzdáleného repozitáře; běžně smí vzdálenou větev pouze posunout dopředu.

## Jak funguje ochrana historie

**Fast-forward** znamená, že dosavadní vzdálený commit je předkem nového.

Odmítnutí **non-fast-forward** může způsobit nová cizí práce i tvůj rebase nebo amend, který vytvořil jiné commity.

## Před použitím

Příklady jsou pro **Git Bash nebo Bash** a vlastní krátkodobou větev `feature/nova-funkce`.

Přepis historie použij jen tam, kde jej dovolují pravidla repozitáře a domluva s ostatními; ochranu sdílené větve neobcházej.

## Běžný push

```bash
git status --short --branch
git fetch origin
git log --oneline --graph --all -15
git push origin feature/nova-funkce
```

První tři příkazy umožní zkontrolovat místní práci a vztah větví; poslední publikuje konkrétní větev.

Při odmítnutí nejprve prohlédni rozdíly a začleň vzdálené změny podle týmového workflow.

## Přepis po rebase nebo amend

Ještě **před úpravou historie** zaznamenej přesný vzdálený commit:

```bash
git fetch origin
expected=$(git rev-parse refs/remotes/origin/feature/nova-funkce)
git branch backup/pred-upravou
```

Proměnná `expected` je očekávaný stav serveru a záložní větev zachová původní místní historii.

Po [ověřené úpravě commitů](history/fix-commits.md) porovnej výsledek a publikuj:

```bash
git log --oneline --graph -15
git diff backup/pred-upravou HEAD
git push --force-with-lease=refs/heads/feature/nova-funkce:"$expected" origin HEAD:refs/heads/feature/nova-funkce
```

Explicitní lease dovolí přepis pouze tehdy, pokud server stále ukazuje na zaznamenaný commit; automatický fetch v IDE tuto uloženou hodnotu neposune. [Reference git push](https://git-scm.com/docs/git-push)

## Když push selže

Znovu načti a prohlédni vzdálenou historii, zachovej cizí změny a dohodni další postup.

Nepřepisuj jen hodnotu `expected` a neopakuj příkaz bez kontroly: tím bys mohl sám odsouhlasit odstranění nových commitů.

Záložní větev chrání commity, nikoli necommitované soubory.
