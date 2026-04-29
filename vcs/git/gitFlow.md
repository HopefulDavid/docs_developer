# Git Flow – Strategie větvení & workflow

> Praktické rady pro efektivní správu větví v týmu pomocí Git Flow.

---

<img src="../../images/43ae90ca-b78a-405d-bf23-06f2be45eb83.png" alt="Ollama" style="width: 100%; display: block; border-radius: 8px;">

## Co je Git Flow?

- **Git Flow** je osvědčená strategie pro řízení verzí a vývoj v týmech.
- Umožňuje jasně oddělit vývoj, přípravu vydání a opravy chyb.

---

## Hlavní větve

<details>
<summary>Základní větve</summary>

- **`main` (nebo `master`)**: Produkční verze kódu
- **`develop`**: Připravované změny pro další vydání

</details>

<details>
<summary>Pomocné větve</summary>

- **`feature/*`**: Vývoj nových funkcí
- **`release/*`**: Příprava vydání
- **`hotfix/*`**: Rychlé opravy v produkci

</details>

---

## Typické workflow

<details>
<summary>Vývoj nové funkce</summary>

```bash
git checkout develop
git checkout -b feature/nova-funkce
# Vývoj...
git checkout develop
git merge feature/nova-funkce
```

> [!NOTE]
> Vždy vytvářejte feature větve z aktuální `develop` větve.

</details>

<details>
<summary>Příprava vydání</summary>

```bash
git checkout develop
git checkout -b release/1.0.0
# Finalizace...
git checkout main
git merge release/1.0.0
git checkout develop
git merge release/1.0.0
git tag -a v1.0.0 -m "Verze 1.0.0"
```

> [!TIP]
> V release větvích provádějte pouze opravy chyb, úpravy dokumentace a metadat.

</details>

<details>
<summary>Oprava chyby v produkci</summary>

```bash
git checkout main
git checkout -b hotfix/oprava-chyby
# Oprava...
git checkout main
git merge hotfix/oprava-chyby
git tag -a v1.0.1 -m "Oprava 1.0.1"
git checkout develop
git merge hotfix/oprava-chyby
```

> [!IMPORTANT]
> Hotfixy vždy slučujte do `main` i `develop`!

</details>

---

## Pravidla pro práci s Git Flow

<details>
<summary>Doporučené postupy</summary>

1. Nikdy nepracujte přímo v `main` ani `develop`
2. Každá funkce má vlastní feature větev
3. Před sloučením proveďte code review
4. Po sloučení release/hotfix větve označte verzi pomocí tagu
5. Používejte smysluplné názvy větví (např. `feature/user-auth`)
6. Udržujte commit zprávy jasné a popisné

</details>

---

## Vizualizace workflow

<details>
<summary>Schéma větvení</summary>

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