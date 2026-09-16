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

Potřebuješ přístup do obou repozitářů.

Nepoužívej submodul jen jako náhradu správce balíčků, pokud potřebuješ běžnou publikovanou knihovnu.

Příkazy spouštěj z kořene hlavního projektu, `libs/knihovna` je ukázková cesta.

## Přidání a klonování

```bash
# URL nahraď existujícím repozitářem knihovny.
git submodule add https://git.example.com/tym/knihovna.git libs/knihovna
git add .gitmodules libs/knihovna
git commit -m "build: přidává submodul knihovny"
```

Pro nový klon hlavního projektu použij `git clone --recurse-submodules <URL> [<cílová-složka>]`, kde `<URL>` nahradíš adresou hlavního projektu.

V již naklonovaném projektu obnov přesně zapsané verze:

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

Nahraď `v2.0.0` existujícím ověřeným tagem.

`-C` spouští Git v daném adresáři bez změny tvého terminálu.

Před commitem hlavního projektu otestuj aplikaci s novou verzí závislosti.

## Úpravy uvnitř submodulu

Přes `git -C libs/knihovna switch -c oprava` vytvoř pracovní větev.

Úpravy commituj a publikuj v repozitáři knihovny.

Až poté aktualizuj gitlink v hlavním projektu, aby jej ostatní dokázali stáhnout.

Stav **detached HEAD** je při obnově připnuté verze očekávaný.

Sám o sobě není závada.

## Změna adresy nebo odstranění

`git submodule set-url <cesta-submodulu> <nová-URL>` změní adresu a synchronizuje místní konfiguraci.

Obě hodnoty nahraď podle své knihovny a commituj `.gitmodules`.

Po uchování vlastní práce lze submodul odstranit přes `git rm libs/knihovna`, zkontrolovat `git diff --cached` a vytvořit commit.

Neodstraňuj ručně `.git/modules` jako běžný úklid.

Může obsahovat jediné kopie místních commitů. [Odstranění a obnova submodulů](https://git-scm.com/docs/gitsubmodules)

## Když je složka prázdná nebo ukazuje jinou verzi

Po běžném pull hlavního projektu spusť `git submodule update --init --recursive`.

Tím obnovíš verze zapsané hlavním projektem, aniž bys vybíral nejnovější vzdálenou větev.

Znak `+` před ID ve výpisu `git submodule status` znamená jiný vybraný commit než ten zapsaný v hlavním indexu, `-` neinicializovaný submodul a `U` konflikt.

Před aktualizací prohlédni vlastní změny přes `git -C libs/knihovna status` a zachovej je, pokud nejsou hotové.
