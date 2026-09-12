---
description: "Připojení remote, volba HTTPS nebo SSH a změna cílové adresy."
---

# Git – připojení ke vzdálenému repozitáři

Remote je pojmenovaná adresa jiného repozitáře, ze kterého načítáš commity nebo do něj posíláš svoji práci.

GitHub, GitLab, Forgejo i vlastní bare repozitář mohou plnit tuto úlohu; samotný Git nevyžaduje konkrétní hosting.

## Vyber přihlášení

| Protokol | Co potřebuješ | Typická adresa |
|---|---|---|
| HTTPS | Účet a přihlášení podporované hostingem, často přes správce přihlašovacích údajů nebo token | `https://git.example.com/ucet/projekt.git` |
| SSH | Klíč registrovaný u účtu a ověřený server | `git@git.example.com:ucet/projekt.git` |
| Místní cesta | Přístup k disku s repozitářem | `../centralni.git` |

Ukázkové domény představují syntaxi adres, nejsou servery určené k připojení.

U SSH nemusí být `git` tvé uživatelské jméno na hostingu; často jde o společný technický účet a identita se určí podle klíče.

## Připojení nového projektu

Na hostingu vytvoř prázdný repozitář **bez automatického README**, pokud už máš místní historii.

Zkopíruj jeho clone URL a v kořeni své pracovní kopie použij:

```text
git remote add origin <clone-URL>
git push -u origin <místní-větev>
```

`origin` je zvolený název spojení; `<místní-větev>` zjistíš přes `git branch --show-current`.

Před odesláním ověř cílovou adresu:

```bash
git remote -v
git status --short --branch
```

Pokud server už má vlastní první commit, zvaž naklonování serverové verze a přenos svých souborů do ní; odmítnutí push není důvod k automatickému přepsání serveru.

## Existující remote nebo změna adresy

| Syntaxe | Účinek |
|---|---|
| `git remote -v` | Vypíše názvy a URL pro načítání i odesílání |
| `git remote add <název> <URL>` | Přidá nové spojení |
| `git remote set-url <název> <URL>` | Změní adresu existujícího spojení |
| `git remote remove <název>` | Odstraní místní konfiguraci spojení, ne repozitář na serveru |
| `git ls-remote <název>` | Ověří přístup ke čtení referencí na serveru |

Například po přejmenování vlastního projektu nahradíš URL přes `set-url`; žádná z těchto konfiguračních změn sama nepřenáší historii.

Token ani heslo nevkládej do URL, kde by zůstaly v konfiguraci a historii terminálu.

## Praktické vyzkoušení bez hostingu

V nové složce určené pro pokus spusť:

```bash
git init --bare --initial-branch=main centralni.git
git clone centralni.git pracovni-kopie
```

`centralni.git` bude místní serverová kopie bez pracovních souborů a `pracovni-kopie` místo pro editaci a commity.

Varování o prázdném klonu je očekávané; vytvoř v pracovní kopii první soubor a commit podle [založení repozitáře](repository.md), potom použij `git push -u origin main`.

Bare složku neupravuj jako běžný projekt a své soubory do ní ručně nekopíruj.

## Časté problémy

- `remote origin already exists`: prohlédni `remote -v` a podle potřeby použij `set-url`.
- Úspěšné čtení a odmítnutý push: účet nemusí mít právo zápisu nebo větev chrání pravidlo.
- `Permission denied (publickey)`: pokračuj [diagnostikou Git přes SSH](../../network/ssh/git.md).
- Velké soubory zůstaly jako textové ukazatele: ověř instalaci a přístup [Git LFS](backups.md#git-lfs-a-submoduly).

[Zálohu a migraci](backups.md) řeš odděleně od běžné synchronizace.

Zdroje: [git remote](https://git-scm.com/docs/git-remote), [Git na serveru](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols).
