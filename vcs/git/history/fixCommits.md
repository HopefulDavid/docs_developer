# Git – `fixup!` & `squash!` commity

> Praktické rady, jak efektivně opravovat a slučovat commity pomocí `fixup!` a `squash!` v Gitu.

---

<img src="./images/5a5f2db1-3bf6-4219-a7a1-65305baeb7ca.png" alt="" style="width: 100%; display: block; border-radius: 8px;">

## Co znamená `fixup!` a `squash!`?

- **`fixup!`** – vytvoří commit, který opravuje předchozí commit bez změny jeho zprávy.
- **`squash!`** – vytvoří commit, který sloučí zprávu s původním commitem.

---

## Postup krok za krokem

<details>
<summary>Krok 1: Vytvoření opravného commitu</summary>

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
<summary>Krok 2: Rebase s automatickým sloučením</summary>

```bash
git rebase -i --autosquash HEAD~<n>
```
- Spustí interaktivní rebase s automatickým zařazením `fixup!` a `squash!` commitů.

> [!NOTE]
> `<n>` je počet posledních commitů, které chcete upravit.
</details>

<details>
<summary>Krok 3: Úprava v editoru</summary>

- Otevře se textový editor s přehledem commitů.
- Proveďte potřebné změny, uložte soubor a zavřete editor.

> [!TIP]
> Po zavření editoru se rebase automaticky dokončí a opravy/sloučení se aplikují.
</details>