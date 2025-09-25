# 🗂️ Git – Aktualizace `.gitignore` & odstranění mezipaměti

> 🚀 Praktické rady, jak správně aktualizovat `.gitignore` a odstranit již sledované soubory z Git mezipaměti.

---

## 📝 Proč aktualizovat `.gitignore`?

- `.gitignore` určuje, které soubory Git nemá sledovat.
- Po změně je nutné odstranit již sledované soubory z mezipaměti, aby se ignorovaly.

---

## 📋 Postup krok za krokem

<details>
<summary><span style="color:#1E90FF;">🧹 Krok 1: Odstranění mezipaměti sledovaných souborů</span></summary>

```bash
git rm -r --cached .
```
- Odstraní všechny soubory z mezipaměti (ne z disku).
- Git začne respektovat nové pravidla v `.gitignore`.

> [!WARNING]  
> Soubory zůstanou na disku, pouze se přestanou sledovat v Gitu.
</details>

<details>
<summary><span style="color:#1E90FF;">📥 Krok 2: Přidání změn do stage</span></summary>

```bash
git add .
```
- Přidá změny (včetně aktualizovaného `.gitignore`) do stage.

> [!TIP]  
> Ověřte, že `.gitignore` obsahuje vše potřebné.
</details>

<details>
<summary><span style="color:#1E90FF;">✅ Krok 3: Commit změn</span></summary>

```bash
git commit -m "Aktualizace .gitignore"
```
- Potvrďte změny v repozitáři.

> [!NOTE]  
> Po commitu budou ignorované soubory skutečně ignorovány.
</details>