# Git – Submoduly

> Správa externích repozitářů jako podadresářů v Git projektu.

---

<img src="./images/bcf90266-2493-4e1c-8f54-8d37b4e4e4a7.png" alt="Ollama" style="width: 100%; display: block; border-radius: 8px;">

## Co jsou submoduly?

- Umožňují vložit jeden Git repozitář do jiného jako podadresář.
- Oba repozitáře zůstávají nezávislé.
- Vhodné pro správu závislostí, sdílený kód nebo rozdělené projekty.

```
HlavniProjekt/
  ├── .git/
  ├── .gitmodules
  ├── BeznyAdresar/
  └── Submodul/
      └── .git/
```

---

## Základní příkazy

### Přidání submodulu

```bash
git submodule add https://github.com/uzivatel/knihovna libs/knihovna
```

### Klonování projektu se submoduly

```bash
# Vše najednou
git clone --recursive https://github.com/uzivatel/projekt

# Postupně (pokud projekt byl klonován bez --recursive)
git submodule init
git submodule update
```

### Aktualizace submodulů

```bash
# Všechny submoduly na nejnovější verzi
git submodule update --remote

# Konkrétní submodul ručně
cd cesta/k/submodulu
git checkout main
git pull
cd ../..
git add cesta/k/submodulu
git commit -m "Aktualizován submodul na nejnovější verzi"
```

### Přepnutí na konkrétní verzi

```bash
cd cesta/k/submodulu
git checkout v2.0.0
cd ../..
git add cesta/k/submodulu
git commit -m "Změněna verze submodulu na v2.0.0"
```

### Úpravy v submodulu

```bash
cd cesta/k/submodulu
git checkout -b oprava-chyby
# proveďte změny
git commit -am "Oprava chyby"
git push origin oprava-chyby
# vytvořte pull request v repozitáři submodulu
```

### Změna URL submodulu

```bash
git config --file=.gitmodules submodule.nazev.url NOVA_URL
git submodule sync
```

### Odstranění submodulu

```bash
git submodule deinit cesta/k/submodulu
git rm --cached cesta/k/submodulu
rm -rf cesta/k/submodulu
rm -rf .git/modules/cesta/k/submodulu
git commit -m "Odstraněn submodul"
```

### Kontrola stavu

```bash
git submodule status
```

---

## Příklad: Unity projekt se submoduly

```
UnityProjekt/
  ├── .git/
  ├── .gitmodules
  └── Assets/
      └── Plugins/
          ├── UI-Framework/
          └── Network/
```

```bash
cd UnityProjekt
git submodule add https://github.com/author/ui-framework Assets/Plugins/UI-Framework
git submodule add https://github.com/author/network-lib Assets/Plugins/Network
```

---

## Řešení problémů

**Submodul je v "detached HEAD" stavu:**

```bash
cd cesta/k/submodulu
git checkout main
```

**Submodul ukazuje změny i když žádné nemáš:**

```bash
git submodule update
```

---

## Výhody a nevýhody

| Výhody | Nevýhody |
|--------|----------|
| Přesná kontrola verzí závislostí | Složitější správa oproti přímému kódu |
| Možnost přímých úprav závislostí | Nutnost synchronizace po změnách |
| Lepší organizace komplexních projektů | Strmější učící křivka pro nové členy |
