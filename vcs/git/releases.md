---
description: "Označení ověřeného vydání tagem, publikování a návrat k vydané verzi."
---

# Git – tagy a vydání verze

Tag pojmenuje konkrétní commit, například `v1.0.0`, aby šlo později přesně najít vydaný stav.

Na rozdíl od větve se při dalších commitech automaticky neposouvá.

## Před vydáním

Ověř správnou větev, čistý pracovní strom a testy; číslo verze musí odpovídat tomu, co skutečně vydáváš.

| Označení | Co představuje |
|---|---|
| Git tag | Odkaz na konkrétní commit |
| Hosting release | Publikační záznam hostingu, často s poznámkami a binárními přílohami |
| Balíček nebo instalátor | Samostatný výstup sestavení, který tag sám nevytváří |

## Vytvoření a odeslání

Příklad pro PowerShell i Bash označí právě vybraný commit:

```bash
git status
git log --oneline -1
git tag -a v1.0.0 -m "První stabilní vydání"
git show --no-patch v1.0.0
git push origin v1.0.0
```

`-a` vytvoří anotovaný tag se zprávou a údaji autora; samostatný push odešle právě tento tag.

Číslo i zprávu změň podle své verze a používej nové dosud volné jméno.

Běžný push větve neposílá automaticky všechny tagy.

## Prohlédnutí staršího vydání

V čistém stromu:

```bash
git switch --detach v1.0.0
git status
```

Pracovní soubory se přepnou na vydaný commit bez vybrané větve.

Pro návrat použij `git switch main`; pro opravu této vydané verze založ vlastní větev přes `git switch -c hotfix/verze-1` a změnu následně začleň i do dalšího vývoje.

## Chybný tag

Místní dosud neodeslaný tag lze odstranit příkazem `git tag -d <tag>` a vytvořit znovu na správném commitu.

Již publikované vydání obvykle oprav novou verzí místo přesouvání stejného tagu, aby stejné označení neznamenalo pro různé lidi jiný obsah.

Obecná syntaxe `git tag -a <tag> [<commit>] -m "<zpráva>"` dovoluje označit i starší vybraný commit; vynechání commitu znamená HEAD.

Zdroje: [git tag](https://git-scm.com/docs/git-tag), [Git Book: tagování](https://git-scm.com/book/en/v2/Git-Basics-Tagging).
