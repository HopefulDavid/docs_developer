Zde je moderní návod v 3. osobě pro soubor `vcs/git/history/assumeUnchanged.md`:

# 🗂️ Git – Lokální ignorování změn (`assume-unchanged`)

> 🚀 Praktické rady, jak lze **lokálně ignorovat změny** ve složce nebo souborech, aniž by se to projevilo na vzdáleném repozitáři.

---

## 🧐 Kdy použít?

- Pokud je potřeba **fyzicky smazat** nebo upravit soubory/složku pouze lokálně, ale **neovlivnit remote** při push.
- Když má Git **ignorovat změny** v konkrétních souborech/složkách pouze na daném počítači.

---

## 📋 Postup krok za krokem

<details>
<summary><span style="color:#1E90FF;">🧹 Ignorování změn ve složce/souborech</span></summary>

```bash
git ls-files cesta/xxx/Directory | xargs git update-index --assume-unchanged
```

- Git přestane sledovat změny v zadaných souborech/složce **jen lokálně**.
- Soubory lze smazat nebo upravit, ale při push se remote **nezmění**.

> [!IMPORTANT]
> Je nutné spustit tento příkaz v bashovém prostředí (např. Git Bash).

> [!NOTE]  
> Pokud se necommituje smazání, remote zůstane nedotčený i při `git push -f`.
</details>

---

<details>
<summary><span style="color:#1E90FF;">🔄 Vrácení zpět (opětovné sledování změn)</span></summary>

```bash
git ls-files cesta/xxx/Directory | xargs git update-index --no-assume-unchanged
```
- Git začne opět sledovat změny v souborech/složce.

</details>

---

## ⚠️ Upozornění na rizika

- **Změny jsou pouze lokální** – ostatní členové týmu je nevidí.
- Pokud se commitne smazání nebo úprava souborů, push už remote ovlivní.
- Vhodné pro dočasné úpravy, testování, nebo když je potřeba něco skrýt před Gitem.

---

## 🏷️ Slovníček pojmů

- **assume-unchanged**: Git ignoruje změny v souboru/složce pouze na daném počítači.
- **no-assume-unchanged**: Git opět začne změny sledovat.

---

## 💡 Shrnutí

- Lokální ignorování změn je **bezpečné** pro push, dokud se necommitne smazání nebo úprava.
- Remote repozitář zůstane **beze změny**.

---

> [!TIP]  
> Pro trvalé ignorování se používá `.gitignore`, pro dočasné lokální ignorování slouží `assume-unchanged`.