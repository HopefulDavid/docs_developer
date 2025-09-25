# 🗂️ Git – `fixup!` & `squash!` commity

> 🚀 Praktické rady, jak efektivně opravovat a slučovat commity pomocí `fixup!` a `squash!` v Gitu.

---

## 🛠️ Co znamená `fixup!` a `squash!`?

- **`fixup!`** – vytvoří commit, který opravuje předchozí commit bez změny jeho zprávy.
- **`squash!`** – vytvoří commit, který sloučí zprávu s původním commitem.

---

## 📋 Postup krok za krokem

<details>
<summary><span style="color:#1E90FF;">🔧 Krok 1: Vytvoření opravného commitu</span></summary>

- **Použití `fixup!`:**

    ```bash
    git commit --fixup <hashId>
    ```
  nebo
    ```bash
    git commit -m "fixup! <hashId> notUsedMessage"
    ```

  > [!NOTE]  
  > `<hashId>` je ID commitu, který chcete opravit.

- **Použití `squash!`:**

    ```bash
    git commit -m "squash! <hashId> optionalCustomMessage"
    ```

  > [!TIP]  
  > `squash!` umožňuje přidat vlastní zprávu ke sloučení.
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Krok 2: Rebase s automatickým sloučením</span></summary>

```bash
git rebase -i --autosquash HEAD~<n>
```
- Spustí interaktivní rebase s automatickým zařazením `fixup!` a `squash!` commitů.

> [!NOTE]  
> `<n>` je počet posledních commitů, které chcete upravit.
</details>

<details>
<summary><span style="color:#1E90FF;">📝 Krok 3: Úprava v editoru</span></summary>

- Otevře se textový editor s přehledem commitů.
- Proveďte potřebné změny, uložte soubor a zavřete editor.

> [!TIP]  
> Po zavření editoru se rebase automaticky dokončí a opravy/sloučení se aplikují.
</details>