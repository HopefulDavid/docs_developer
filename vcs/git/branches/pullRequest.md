### 🟩 **Kdy použít Pull Request (PR):**

* **Týmová spolupráce** – ostatní vývojáři mají možnost kód zkontrolovat.
* **Code review**, komentáře, schválení.
* **Automatizované testy a CI/CD pipeline** se spustí před sloučením.
* **Audit a historie** – vše je dohledatelné, kdo co schválil a proč.

> ✅ **Typické v profesionálních projektech**, GitHub, GitLab, Bitbucket atd.

---

### 🟨 **Kdy použít přímo `git merge`:**

* **Jsi sám na projektu** nebo děláš rychlý merge bez potřeby review.
* Chceš rychle sloučit větev lokálně (např. `feature/login` do `develop`).
* Nepotřebuješ historii PR ani schvalovací proces.

```bash
git checkout develop
git merge feature/login-page
```

> ⚠️ Tento merge probíhá bez schválení a obvykle **lokálně** – pak je třeba pushnout změny.

---

### 🧠 Shrnutí

| Scénář                     | Použij PR? | Použij Merge?  |
|----------------------------|------------|----------------|
| Pracuješ sám               | ❌          | ✅              |
| Týmový projekt             | ✅          | ❌ *(většinou)* |
| Chceš review, testy, audit | ✅          | ❌              |
| Lokální rychlé sloučení    | ❌          | ✅              |
