# Git – Pull Request (PR)

> Praktické rady, jak funguje **Pull Request**, kdy a proč ho použít.

---

<img src="./images/e0f402f8-94c5-417f-b4c3-0566724c4b7a.png" alt="" style="width: 100%; display: block; border-radius: 8px;">

## Co je Pull Request?

- **Pull Request (PR)** je žádost o začlenění změn z jedné větve do jiné (typicky z `feature` do `main` nebo `develop`).
- Umožňuje týmovou kontrolu, diskusi, testování a schválení změn před sloučením.

---

## Typický workflow PR

<details>
<summary>Krok 1: Vytvoření nové větve</summary>

```bash
git checkout -b feature/nova-funkce
# Vývoj, commity...
git push origin feature/nova-funkce
```
- Větev pushni na remote, aby byla dostupná pro PR.
</details>

<details>
<summary>Krok 2: Vytvoření PR na serveru</summary>

- Otevři webové rozhraní (GitHub, GitLab, Bitbucket).
- Vyber zdrojovou (`feature/nova-funkce`) a cílovou (`main`/`develop`) větev.
- Přidej popis změn, případně označ recenzenty.

> [!TIP]
> Popiš stručně, co PR řeší a proč je důležitý.
</details>

<details>
<summary>Krok 3: Code review & testy</summary>

- Tým provede **code review** – komentáře, návrhy, schválení.
- Automaticky se spustí **CI/CD pipeline** (testy, build).
- Případné úpravy proveď v původní větvi, PR se automaticky aktualizuje.

> [!NOTE]
> Review zvyšuje kvalitu kódu a snižuje riziko chyb.
</details>

<details>
<summary>Krok 4: Schválení & merge PR</summary>

- Po schválení a úspěšných testech lze PR sloučit (merge).
- Většina platforem nabízí různé typy merge:
    - **Merge commit** (zachová historii)
    - **Squash** (sloučí commity do jednoho)
    - **Rebase** (přepíše historii)

> [!IMPORTANT]
> Po merge PR se obvykle maže zdrojová větev.
</details>

---

## Výhody Pull Requestu

<details>
<summary>Proč používat PR?</summary>

- Týmová kontrola a diskuse nad změnami
- Automatizované testy před sloučením
- Jasná historie, kdo co schválil
- Možnost auditovat změny zpětně
- Zvyšuje kvalitu a bezpečnost kódu

</details>