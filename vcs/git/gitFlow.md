## Git Flow

Git Flow je strategie pro správu větví v Gitu, která usnadňuje práci v týmech a řízení verzí softwaru.

<details>
<summary><span style="color:#1E90FF;">Základní větve v Git Flow</span></summary>

- **`main` (nebo `master`)**: Obsahuje produkční verzi kódu
- **`develop`**: Obsahuje připravované změny pro příští vydání

</details>

---

<details>
<summary><span style="color:#1E90FF;">Pomocné větve</span></summary>

- **`feature/*`**: Pro vývoj nových funkcí
- **`release/*`**: Pro přípravu vydání
- **`hotfix/*`**: Pro rychlé opravy chyb v produkci

</details>

---

<details>
<summary><span style="color:#1E90FF;">Vývoj nové funkce</span></summary>

```bash
# Vytvoření nové feature větve
git checkout develop
git checkout -b feature/nova-funkce

# Po dokončení vývoje
git checkout develop
git merge feature/nova-funkce
```

> [!NOTE]
> Vždy vytvářejte feature větve z aktuální `develop` větve.

</details>

---

<details>
<summary><span style="color:#1E90FF;">Příprava vydání</span></summary>

```bash
# Vytvoření release větve
git checkout develop
git checkout -b release/1.0.0

# Po dokončení příprav
git checkout main
git merge release/1.0.0
git checkout develop
git merge release/1.0.0
git tag -a v1.0.0 -m "Verze 1.0.0"
```

> [!TIP]
> V release větvích se typicky provádí pouze opravy chyb, finální úpravy dokumentace a příprava metadat verze.

</details>

---

<details>
<summary><span style="color:#1E90FF;">Oprava chyby v produkci</span></summary>

```bash
# Vytvoření hotfix větve
git checkout main
git checkout -b hotfix/oprava-chyby

# Po dokončení opravy
git checkout main
git merge hotfix/oprava-chyby
git tag -a v1.0.1 -m "Oprava 1.0.1"
git checkout develop
git merge hotfix/oprava-chyby
```

> [!IMPORTANT]
> Hotfixy se vždy slučují jak do `main`, tak do `develop` větve!

</details>

---

<details>
<summary><span style="color:#1E90FF;">Pravidla pro práci s Git Flow</span></summary>

1. Nikdy nepracujte přímo v `main` ani `develop` větvích
2. Každá funkce má vlastní feature větev
3. Před sloučením proveďte code review
4. Po sloučení release nebo hotfix větve označte verzi pomocí Git tagu
5. Používejte smysluplné názvy větví (např. `feature/user-authentication`)
6. Udržujte commit zprávy jasné a popisné

</details>

---

<details>
<summary><span style="color:#1E90FF;">Vizualizace Git Flow</span></summary>

```
main       ●────────●─────────●────────●
            \        \         \        \
develop     ●─────●───●─────●───●───●────●
               \     /     /     /
feature         ●───●     /     /
                          /     /
release                  ●─────●
                              /
hotfix                       ●
```

</details>

---

Pro více informací navštivte [oficiální dokumentaci Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
```