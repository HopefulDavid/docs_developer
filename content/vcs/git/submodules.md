---
description: "Připojení cizího repozitáře na konkrétní commit a jeho aktualizace."
---

# Git – submoduly

Submodul připojuje samostatný repozitář do podadresáře projektu a hlavní repozitář zaznamenává jeho konkrétní commit.

## Jak to funguje

Soubor `.gitmodules` obsahuje cesty a URL.

Samotný gitlink v historii určuje verzi závislosti.

Submodul má vlastní historii a jeho `.git` bývá soubor odkazující do úložiště hlavního projektu. [Model submodulů](https://git-scm.com/docs/gitsubmodules)

## Před použitím

Potřebný je přístup do obou repozitářů.

Submodul nenahrazuje správce balíčků, pokud stačí běžná publikovaná knihovna.

Příkazy se spouštějí z kořene hlavního projektu, `libs/knihovna` je ukázková cesta.

## Přidání a klonování

```bash
# URL se nahradí existujícím repozitářem knihovny.
git submodule add https://git.example.com/tym/knihovna.git libs/knihovna
git add .gitmodules libs/knihovna
git commit -m "build: přidává submodul knihovny"
```

Nový klon hlavního projektu vytvoří `git clone --recurse-submodules <URL> [<cílová-složka>]`, kde se `<URL>` nahradí adresou hlavního projektu.

V již naklonovaném projektu obnoví přesně zapsané verze:

```bash
git submodule update --init --recursive
git submodule status --recursive
```

Tento postup obnovuje připnuté commity, nikoli automaticky nejnovější verzi knihovny. [Příkazy submodule](https://git-scm.com/docs/git-submodule)

## Změna verze

```bash
git -C libs/knihovna fetch --tags
git -C libs/knihovna switch --detach v2.0.0
git diff --submodule
git add libs/knihovna
git commit -m "build: připíná knihovnu na verzi 2.0.0"
```

`v2.0.0` se nahradí existujícím ověřeným tagem.

`-C` spouští Git v daném adresáři bez změny složky terminálu.

Před commitem hlavního projektu se aplikace otestuje s novou verzí závislosti.

## Úpravy uvnitř submodulu

Pracovní větev vytvoří `git -C libs/knihovna switch -c oprava`.

Úpravy se commitují a publikují v repozitáři knihovny.

Až poté se aktualizuje gitlink v hlavním projektu, aby jej ostatní dokázali stáhnout.

Stav **detached HEAD** je při obnově připnuté verze očekávaný.

Sám o sobě není závada.

## Změna adresy nebo odstranění

`git submodule set-url <cesta-submodulu> <nová-URL>` změní adresu a synchronizuje místní konfiguraci.

Obě hodnoty se nahradí podle konkrétní knihovny a `.gitmodules` se commitne.

Po uchování vlastní práce lze submodul odstranit přes `git rm libs/knihovna`, zkontrolovat `git diff --cached` a vytvořit commit.

`.git/modules` se ručně neodstraňuje jako běžný úklid.

Může obsahovat jediné kopie místních commitů. [Odstranění a obnova submodulů](https://git-scm.com/docs/gitsubmodules)

## Když je složka prázdná nebo ukazuje jinou verzi

Po běžném pull hlavního projektu následuje `git submodule update --init --recursive`.

Tím se obnoví verze zapsané hlavním projektem bez výběru nejnovější vzdálené větve.

Znak `+` před ID ve výpisu `git submodule status` znamená jiný vybraný commit než ten zapsaný v hlavním indexu, `-` neinicializovaný submodul a `U` konflikt.

Před aktualizací se vlastní změny zkontrolují přes `git -C libs/knihovna status` a nehotové se zachovají.
