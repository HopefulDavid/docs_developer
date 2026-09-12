# Git – vrácení změny a vytvoření historie od začátku

Vrácení chyby a odstranění historie jsou různé úkoly; pro běžnou opravu zveřejněné změny slouží nový revert commit.

## Před použitím

Zkontroluj pracovní strom a požadovaný commit přes `git status` a `git log --oneline`.

Revert zachovává dohledatelnou historii; nová kořenová větev mění její návaznost a vyžaduje samostatné rozhodnutí.

## Praktické použití: vrácení poslední změny

```bash
# Příklad předpokládá, že poslední commit není merge.
git revert HEAD
git show --stat HEAD
```

První příkaz vytvoří nový commit s opačnou změnou; druhý ukáže, co obsahuje.

Místo `HEAD` lze zadat ID konkrétního commitu; merge revert potřebuje zvolit hlavního rodiče a není zaměnitelný s tímto příkladem. [Reference git revert](https://git-scm.com/docs/git-revert)

Při konfliktu oprav soubory, spusť `git add` a `git revert --continue`; návrat provede `git revert --abort`.

## Pokročilé použití: samostatná kořenová větev

Pro export současného stavu bez předků pracuj v oddělené kopii a nejprve zachovej původní větev:

```bash
git branch backup/pred-novou-historii
git checkout --orphan nova-historie
git status
git diff --cached --stat
git commit -m "chore: zahajuje novou historii"
```

`checkout --orphan` připraví index a pracovní strom z výchozího commitu, ale první nový commit nebude mít rodiče. [Reference git checkout](https://git-scm.com/docs/git-checkout)

Ukázka vyžaduje čistou neprázdnou pracovní kopii a nesmaže původní větev.

Pokud chceš novou větev sdílet k posouzení, `git push -u origin nova-historie` ji nahraje pod novým názvem.

## Důležité poznámky

Přepsání větve nevymaže staré commity z cizích klonů, záloh ani všech referencí serveru.

Není to postup pro odstranění uniklého tajemství; nejprve zneplatni přístupový údaj a řeš historii podle hostingu.

Původní hlavní větev kvůli refaktoringu běžně nemaž.
