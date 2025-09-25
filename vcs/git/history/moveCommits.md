# 🗂️ Git – Přesun commitů do nové nebo existující větve

> 🚀 Praktické rady, jak přesunout poslední commity ze jedné větve do nové nebo existující větve.

---

## 🌱 Přesun commitů do **nové větve**

<details>
<summary><span style="color:#1E90FF;">🛠️ Krok 1: Vytvoření nové větve z aktuální</span></summary>

```bash
git checkout master
git branch newbranch
git checkout master
```
- Přepne se do zdrojové větve (`master`), vytvoří novou větev (`newbranch`) se stejnou historií.
</details>

<details>
<summary><span style="color:#1E90FF;">🧹 Krok 2: Odstranění commitů ze zdrojové větve</span></summary>

```bash
git reset --hard HEAD~3
```
- Odstraní poslední 3 commity ze zdrojové větve (`master`).

> [!WARNING]  
> Tento krok je **nevratný** – commity budou ze zdrojové větve smazány.
</details>

<details>
<summary><span style="color:#1E90FF;">🔀 Krok 3: Přepnutí do nové větve</span></summary>

```bash
git checkout newbranch
```
- Nová větev obsahuje původní commity, které byly odstraněny ze zdrojové větve.
</details>

---

## 🔄 Přesun commitů do **existující větve**

<details>
<summary><span style="color:#1E90FF;">🔗 Krok 1: Merge commitů do cílové větve</span></summary>

```bash
git checkout existingbranch
git merge branchToMoveCommitFrom
```
- Přepne se do cílové větve (`existingbranch`) a sloučí commity ze zdrojové větve (`branchToMoveCommitFrom`).
</details>

<details>
<summary><span style="color:#1E90FF;">🧹 Krok 2: Odstranění commitů ze zdrojové větve</span></summary>

```bash
git checkout branchToMoveCommitFrom
git reset --hard HEAD~3
```
- Odstraní poslední 3 commity ze zdrojové větve.

> [!WARNING]  
> Tento krok je **nevratný** – commity budou ze zdrojové větve smazány.
</details>

<details>
<summary><span style="color:#1E90FF;">🔀 Krok 3: Přepnutí do cílové větve</span></summary>

```bash
git checkout existingbranch
```
- Pokračuj v práci na cílové větvi s přesunutými commity.
</details>

---

> [!NOTE]  
> Více informací najdeš v [diskuzi na Stack Overflow](https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git).