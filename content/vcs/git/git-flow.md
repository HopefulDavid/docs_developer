---
description: "Oddělený vývoj, příprava vydání a naléhavé opravy při použití Git Flow."
---

# Git Flow – větve pro plánovaná vydání

Git Flow odděluje přípravu příští verze od stabilní verze a oprav již vydaného produktu.

## Kdy se hodí

Model dává smysl například při plánovaných vydáních a souběžné podpoře více verzí.

Není univerzálním pravidlem pro každý repozitář.

I autor modelu doporučuje pro průběžně dodávané webové aplikace zvážit jednodušší tok. [Původní model a doplnění autora](https://nvie.com/posts/a-successful-git-branching-model/)

Pro jednodušší model se nejprve porovnají [způsoby práce pro solo vývojáře](workflows.md).

## Jak fungují větve

| Větev | Úloha | Začíná z | Změny se vracejí do |
|---|---|---|---|
| `main` | Vydané verze | Výchozí historie | — |
| `develop` | Příští vydání | `main` | Přes release do `main` |
| `feature/*` | Jedna funkce | `develop` | `develop` |
| `release/*` | Stabilizace vydání | `develop` | `main` i `develop` |
| `hotfix/*` | Oprava vydané verze | `main` | `main` i `develop` |

## Před použitím

Vlastní projekt má zapsané názvy větví, způsob kontroly a vydávání.

Existující pravidla projektu mají přednost před tímto obecným příkladem.

Příkazy předpokládají čistý pracovní strom, existující `main` a `develop` a oprávnění slučovat.

Chráněné větve se slučují prostřednictvím PR.

## Praktické použití

### Příprava vývojové větve

Z čisté aktuální `main` s prvním commitem vznikne jednorázově `develop`:

```bash
git switch main
git switch -c develop
```

Tím začne vývojová větev ze stejného stavu jako stabilní.

Existující `develop` se znovu nevytváří.

### Nová funkce

```bash
git switch develop
git switch -c feature/nova-funkce
```

Po implementaci vzniknou a otestují se commity.

Začlenění hotové větve:

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

Na release větvi se dokončí opravy, verze a testy, potom:

```bash
git switch main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Verze 1.0.0"
git switch develop
git merge --no-ff release/1.0.0
```

Tag vzniká na vydaném commitu v `main`, ještě před přepnutím do `develop`.

### Oprava vydané verze

V čistém stromu se vychází ze skutečně vydaného stavu:

```bash
git switch main
git switch -c hotfix/oprava
```

Po opravě vznikne běžný commit a otestuje se výsledek, potom:

```bash
git switch main
git merge --no-ff hotfix/oprava
git tag -a v1.0.1 -m "Oprava verze 1.0.0"
git switch develop
git merge --no-ff hotfix/oprava
```

Oprava musí přijít i do dalšího vývoje, aby se chyba nevrátila v příštím vydání.

Číslo tagu se přizpůsobí skutečné verzi a při aktivní release větvi se oprava začlení také do ní.

## Ověření

`git log --graph --oneline --all -20` zobrazí návaznost větví a tagů.

Lokální merge ani tag nejsou automaticky zveřejněné.

Publikování se řídí pravidly týmu. [Git merge](https://git-scm.com/docs/git-merge), [git tag](https://git-scm.com/docs/git-tag)

## Publikování a úklid

Při oprávněném lokálním slučování se ověřené větve odešlou přes `git push origin main develop` a konkrétní nový tag přes `git push origin <tag>`.

Na hostingu s chráněnými větvemi nahrazují místní slučování odpovídající PR a jejich výsledek se načte dřív, než se vydaný commit označí tagem.

Dokončené feature, release a hotfix větve se odstraní až po ověření všech cílových větví podle [návodu pro úklid](branches/delete-remote-branch.md).
