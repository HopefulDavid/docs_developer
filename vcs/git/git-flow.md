# Git Flow – větve pro plánovaná vydání

Git Flow odděluje přípravu příští verze od stabilní verze a oprav již vydaného produktu.

## Kdy se hodí

Model dává smysl například při plánovaných vydáních a souběžné podpoře více verzí.

Není univerzálním pravidlem pro každý repozitář; i autor modelu doporučuje pro průběžně dodávané webové aplikace zvážit jednodušší tok. [Původní model a doplnění autora](https://nvie.com/posts/a-successful-git-branching-model/)

## Jak fungují větve

| Větev | Úloha | Začíná z | Změny se vracejí do |
|---|---|---|---|
| `main` | Vydané verze | Výchozí historie | — |
| `develop` | Příští vydání | `main` | Přes release do `main` |
| `feature/*` | Jedna funkce | `develop` | `develop` |
| `release/*` | Stabilizace vydání | `develop` | `main` i `develop` |
| `hotfix/*` | Oprava vydané verze | `main` | `main` i `develop` |

## Před použitím

Dohodněte názvy větví, způsob review a vydávání; existující pravidla projektu mají přednost před tímto obecným příkladem.

Příkazy předpokládají čistý pracovní strom, existující `main` a `develop` a oprávnění slučovat; chráněné větve slučuj prostřednictvím PR.

## Praktické použití

### Nová funkce

```bash
git switch develop
git switch -c feature/nova-funkce
```

Po implementaci vytvoř a otestuj commity; hotovou větev začleň:

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

Vytvoř `hotfix/oprava` z `main`, proveď opravu a testy; pak použij stejné pořadí sloučení do `main`, označení novým tagem a vrácení změny do `develop`.

## Ověření

`git log --graph --oneline --all -20` zobrazí návaznost větví a tagů.

Lokální merge ani tag nejsou automaticky zveřejněné; publikování proveď podle pravidel týmu. [Git merge](https://git-scm.com/docs/git-merge), [git tag](https://git-scm.com/docs/git-tag)
