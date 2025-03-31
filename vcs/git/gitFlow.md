# Git Flow - Jak správně pracovat s větvemi

Git Flow je strategie pro správu větví v Gitu, která usnadňuje práci v týmech a řízení verzí softwaru.

## Hlavní větve

- **`main` (nebo `master`)**: Obsahuje produkční verzi kódu
- **`develop`**: Obsahuje připravované změny pro příští vydání

## Pomocné větve

- **`feature/*`**: Pro vývoj nových funkcí
- **`release/*`**: Pro přípravu vydání
- **`hotfix/*`**: Pro rychlé opravy chyb v produkci

## Jak pracovat s Git Flow

### 1. Vývoj nové funkce

```bash
# Vytvoření nové feature větve
git checkout develop
git checkout -b feature/nova-funkce

# Po dokončení vývoje
git checkout develop
git merge feature/nova-funkce
```

### 2. Příprava vydání

```bash
# Vytvoření release větve
git checkout develop
git checkout -b release/1.0.0

# Po dokončení příprav
git checkout main
git merge release/1.0.0
git checkout develop
git merge release/1.0.0
```

### 3. Oprava chyby v produkci

```bash
# Vytvoření hotfix větve
git checkout main
git checkout -b hotfix/oprava-chyby

# Po dokončení opravy
git checkout main
git merge hotfix/oprava-chyby
git checkout develop
git merge hotfix/oprava-chyby
```

## Pravidla pro práci

1. Nikdy nepracujte přímo v `main` ani `develop` větvích
2. Každá funkce má vlastní feature větev
3. Před sloučením proveďte code review (to znamená, že někdo zkontroluje váš kód a schválí ho před sloučením)
4. Po sloučení release nebo hotfix větve označte verzi pomocí Git tagu

---

Pro více informací navštivte [oficiální dokumentaci Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)