---
description: "Připojení remote, volba HTTPS nebo SSH a změna cílové adresy."
---

# Git – připojení ke vzdálenému repozitáři

Remote je pojmenovaná adresa jiného repozitáře, ze kterého se načítají commity nebo do něj se posílá vlastní práce.

GitHub, GitLab, Forgejo i vlastní bare repozitář mohou plnit tuto úlohu.

Samotný Git nevyžaduje konkrétní hosting.

## Způsob přihlášení

| Protokol | Potřebné údaje | Typická adresa |
|---|---|---|
| HTTPS | Účet a přihlášení podporované hostingem, často přes správce přihlašovacích údajů nebo token | `https://git.example.com/ucet/projekt.git` |
| SSH | Klíč registrovaný u účtu a ověřený server | `git@git.example.com:ucet/projekt.git` |
| Místní cesta | Přístup k disku s repozitářem | `../centralni.git` |

Ukázkové domény představují syntaxi adres, nejsou servery určené k připojení.

U SSH není `git` uživatelské jméno na hostingu.

Často jde o společný technický účet a identita se určí podle klíče.

## Připojení nového projektu

Pro existující místní historii vznikne na hostingu prázdný repozitář **bez automatického README**.

Jeho clone URL se použije v kořeni pracovní kopie:

```text
git remote add origin <clone-URL>
git push -u origin <místní-větev>
```

`origin` je zvolený název spojení.

`<místní-větev>` vypíše `git branch --show-current`.

Před odesláním se ověří cílová adresa:

```bash
git remote -v
git status --short --branch
```

Pokud server už má vlastní první commit, nabízí se naklonování serverové verze a přenos vlastních souborů do ní.

Odmítnutí push není důvod k automatickému přepsání serveru.

## Existující remote nebo změna adresy

| Syntaxe | Účinek |
|---|---|
| `git remote -v` | Vypíše názvy a URL pro načítání i odesílání |
| `git remote add <název> <URL>` | Přidá nové spojení |
| `git remote set-url <název> <URL>` | Změní adresu existujícího spojení |
| `git remote remove <název>` | Odstraní místní konfiguraci spojení, ne repozitář na serveru |
| `git ls-remote <název>` | Ověří přístup ke čtení referencí na serveru |

Například po přejmenování vlastního projektu se URL nahradí přes `set-url`.

Žádná z těchto konfiguračních změn sama nepřenáší historii.

Token ani heslo nepatří do URL, kde by zůstaly v konfiguraci a historii terminálu.

## Praktické vyzkoušení bez hostingu

V nové složce určené pro pokus:

```bash
git init --bare --initial-branch=main centralni.git
git clone centralni.git pracovni-kopie
```

`centralni.git` bude místní serverová kopie bez pracovních souborů a `pracovni-kopie` místo pro editaci a commity.

Varování o prázdném klonu je očekávané.

V pracovní kopii vznikne první soubor a commit podle [založení repozitáře](repository.md) a potom následuje `git push -u origin main`.

Bare složka se neupravuje jako běžný projekt a soubory se do ní ručně nekopírují.

## Časté problémy

- `remote origin already exists`: kontrola přes `remote -v` a podle potřeby `set-url`.
- Úspěšné čtení a odmítnutý push: účet nemusí mít právo zápisu nebo větev chrání pravidlo.
- `Permission denied (publickey)`: pomůže [diagnostika Git přes SSH](../../network/ssh/git.md).
- Velké soubory zůstaly jako textové ukazatele: kontrola instalace a přístupu [Git LFS](backups.md#git-lfs-a-submoduly).

[Záloha a migrace](backups.md) se řeší odděleně od běžné synchronizace.

Zdroje: [git remote](https://git-scm.com/docs/git-remote), [Git na serveru](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols).
