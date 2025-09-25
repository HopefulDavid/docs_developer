# 🗂️ Git – Smazání vzdálené větve

> 🚀 Praktické rady pro bezpečné odstranění větve z Git serveru (např. GitHub, GitLab).

---

## ⚠️ Upozornění

> [!WARNING]  
> Smazání vzdálené větve je **nevratná operace**.  
> Ujisti se, že větev už nepotřebuješ a všechny důležité změny jsou začleněny jinde.

---

## 📋 Postup krok za krokem

<details>
<summary><span style="color:#1E90FF;">🔎 Krok 1: Zobrazení všech větví</span></summary>

```bash
git branch -a
```
- Zobrazí seznam lokálních i vzdálených větví.
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Krok 2: Smazání vzdálené větve</span></summary>

```bash
git push origin --delete <nazev-vetve>
# nebo kratší varianta
git push origin :<nazev-vetve>
```
- Nahraď `<nazev-vetve>` skutečným názvem větve, kterou chceš smazat.

> [!NOTE]  
> Obě varianty provedou totéž – smažou větev na serveru.
</details>

<details>
<summary><span style="color:#1E90FF;">🧹 Krok 3: Vyčištění lokálních referencí</span></summary>

```bash
git fetch --prune
```
- Odstraní lokální reference na smazané vzdálené větve.

> [!TIP]  
> Tento krok není povinný, ale pomáhá udržet repozitář přehledný.
</details>