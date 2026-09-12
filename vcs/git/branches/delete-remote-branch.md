# Git – smazání vzdálené větve

Smazáním větve odstraníš její pojmenovaný ukazatel na serveru; místní kopie a jiné větve tím nezmizí.

## Před použitím

Ověř dokončené review, začlenění práce a přesný název cíle; příklad maže krátkodobou větev `feature/hotovo`.

Pokud si potřebuješ uchovat její aktuální commit, po `git fetch origin` vytvoř zálohu `git branch backup/hotovo origin/feature/hotovo`.

## Praktický postup

```bash
git fetch origin
git log --oneline origin/main..origin/feature/hotovo
git push origin --delete feature/hotovo
git fetch origin --prune
```

Výpis před smazáním ukazuje commity nedosažitelné z `origin/main`; při squash merge může obsahovat položky i po začlenění výsledného kódu, proto ověř také PR a změny.

`--delete` odstraní vzdálenou větev a `--prune` uklidí místní odkazy na již neexistující vzdálené větve. [Git push](https://git-scm.com/docs/git-push), [git fetch](https://git-scm.com/docs/git-fetch)

## Ověření a obnova

`git ls-remote --heads origin feature/hotovo` už nemá vrátit tuto větev.

Existující zálohu lze znovu publikovat pomocí `git push origin backup/hotovo:refs/heads/feature/hotovo`, pokud jméno zůstalo volné a máš oprávnění.

Obnova není zaručena bez dostupného commitu; ochrana serveru může smazání i opětovné vytvoření odmítnout.
