---
description: "Oddělený vývoj, příprava vydání a naléhavé opravy při použití Git Flow."
---

# Git Flow – větve pro plánovaná vydání

Git Flow odděluje přípravu příští verze od stabilní verze a oprav již vydaného produktu.

## Kdy se hodí

Model dává smysl například při plánovaných vydáních a souběžné podpoře více verzí.

Není univerzálním pravidlem pro každý repozitář.

I autor modelu doporučuje pro průběžně dodávané webové aplikace zvážit jednodušší tok. [Původní model a doplnění autora](https://nvie.com/posts/a-successful-git-branching-model/)

Pro jednodušší model nejprve porovnej [způsoby práce pro solo vývojáře](workflows.md).

## Jak fungují větve

| Větev | Úloha | Začíná z | Změny se vracejí do |
|---|---|---|---|
| `main` | Vydané verze | Výchozí historie | — |
| `develop` | Příští vydání | `main` | Přes release do `main` |
| `feature/*` | Jedna funkce | `develop` | `develop` |
| `release/*` | Stabilizace vydání | `develop` | `main` i `develop` |
| `hotfix/*` | Oprava vydané verze | `main` | `main` i `develop` |

## Před použitím

Pro vlastní projekt si zapiš názvy větví, způsob kontroly a vydávání.

Existující pravidla projektu mají přednost před tímto obecným příkladem.

Příkazy předpokládají čistý pracovní strom, existující `main` a `develop` a oprávnění slučovat.

Chráněné větve slučuj prostřednictvím PR.

## Praktické použití

### Příprava vývojové větve

Pokud máš pouze čistou aktuální `main` s prvním commitem, jednorázově vytvoř `develop`:

```bash
git switch main
git switch -c develop
```

Tím začne vývojová větev ze stejného stavu jako stabilní.

Existující `develop` znovu nevytvářej.

### Nová funkce

```bash
git switch develop
git switch -c feature/nova-funkce
```

Po implementaci vytvoř a otestuj commity.

Hotovou větev začleň:

```bash
git switch develop
git merge --no-ff feature/nova-funkce
```

`--no-ff` zachová merge commit i tam, kde by šel provést prostý posun větve.

### Vydání

```bash
git switch develop
git switch -c release/1.0.0
```

Na release větvi dokonči opravy, verzi a testy, potom:

```bash
git switch main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Verze 1.0.0"
git switch develop
git merge --no-ff release/1.0.0
```

Tag vzniká na vydaném commitu v `main`, ještě před přepnutím do `develop`.

### Oprava vydané verze

V čistém stromu vyjdi ze skutečně vydaného stavu:

```bash
git switch main
git switch -c hotfix/oprava
```

Po opravě vytvoř běžný commit a otestuj výsledek, potom:

```bash
git switch main
git merge --no-ff hotfix/oprava
git tag -a v1.0.1 -m "Oprava verze 1.0.0"
git switch develop
git merge --no-ff hotfix/oprava
```

Oprava musí přijít i do dalšího vývoje, aby se chyba nevrátila v příštím vydání.

Číslo tagu přizpůsob skutečné verzi a při aktivní release větvi začleň opravu také do ní.

## Ověření

`git log --graph --oneline --all -20` zobrazí návaznost větví a tagů.

Lokální merge ani tag nejsou automaticky zveřejněné.

Publikování proveď podle pravidel týmu. [Git merge](https://git-scm.com/docs/git-merge), [git tag](https://git-scm.com/docs/git-tag)

## Publikování a úklid

Při oprávněném lokálním slučování odešli ověřené větve přes `git push origin main develop` a konkrétní nový tag přes `git push origin <tag>`.

Na hostingu s chráněnými větvemi nahraď místní slučování odpovídajícími PR a následně načti jejich výsledek, než označíš vydaný commit tagem.

Dokončené feature, release a hotfix větve odstraň až po ověření všech cílových větví podle [návodu pro úklid](branches/delete-remote-branch.md).
