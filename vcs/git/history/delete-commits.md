---
description: "Vrácení zveřejněné chyby revertem a návrat místní větve pomocí resetu."
---

# Git – vrácení změny nebo místního commitu

Revert vytvoří nový commit s opačnou změnou; reset přesune ukazatel aktuální větve a podle režimu změní index či soubory.

Pro běžnou opravu zveřejněné historie použij revert, aby navazující práce zůstala dohledatelná.

Pro nový začátek s jediným commitem použij samostatný postup [nahrazení celé vzdálené historie](replace-history.md).

## Revert zveřejněné změny

Příklad funguje v PowerShellu i Bashi a předpokládá čistý strom a poslední commit, který není merge:

```bash
git show HEAD
git revert HEAD
git show --stat HEAD
```

Nejprve zkontroluješ vracenou změnu, potom potvrdíš zprávu nového commitu v editoru a prohlédneš výsledek.

Místo `HEAD` lze zadat konkrétní starší commit; revert aplikuje jeho opačný rozdíl na současný kód, a proto může vyvolat konflikt.

Po vyřešení použij `git add -- <soubor>` a `git revert --continue`; zrušení zajistí `git revert --abort`.

Otestuj funkčnost a nový commit odešli běžným pushem.

## Reset vlastního neodeslaného commitu

Nejprve zachovej původní poslední commit:

```bash
git status
git branch backup/pred-reset
git log --oneline -5
```

Pokračuj jen v čistém stromu a pro místní historii, která není základem sdílené práce.

| Syntaxe | Co udělá |
|---|---|
| `git reset --soft <cílový-commit>` | Přesune větev a ponechá soubory i index, takže odebrané změny zůstanou připravené |
| `git reset --mixed <cílový-commit>` | Přesune větev a index, změny zůstanou v pracovních souborech nepřipravené |
| `git reset --keep <cílový-commit>` | Vrátí větev i dotčené soubory a odmítne kolizi s místními úpravami |
| `git reset --hard <cílový-commit>` | Přepíše větev, index i pracovní soubory a může odstranit i překážející nesledované položky |

Pro rozdělení posledního commitu na menší části například:

```bash
git reset --mixed HEAD~1
git status
git diff
```

`HEAD~1` je rodič posledního commitu, takže tento příklad vyžaduje alespoň dva commity a jeho smysl si nejprve ověř v logu.

Původní obsah zůstane v pracovním stromu a můžeš ho znovu připravit po částech přes `git add -p`.

Pro úplné zahazování souborů preferuj úzce zacílený [restore](../recovery.md); `--hard` není univerzální oprava Gitu.

## Vrácení merge commitu

Merge má více rodičů a Git potřebuje vědět, kterou linii považuješ za hlavní.

```text
git show --no-patch --pretty=raw <merge-commit>
git revert -m <číslo-rodiče> <merge-commit>
```

První příkaz ukáže pořadí rodičů; `-m 1` je správně jen tehdy, když první rodič odpovídá linii, kterou chceš zachovat.

Vrácení merge ovlivní i pozdější pokusy znovu sloučit stejné předky; opětovné zavedení práce může vyžadovat vrácení revertu nebo nové opravné commity.

## Obnova po chybném resetu

Původní stav prohlédni přes `git show backup/pred-reset` a zachraň jej jako větev; bez zálohy zkus [reflog](../recovery.md#záchrana-přes-reflog).

Ani reset, ani revert nevymažou tajemství ze všech starých kopií historie.

Zdroje: [git revert](https://git-scm.com/docs/git-revert), [git reset](https://git-scm.com/docs/git-reset).
