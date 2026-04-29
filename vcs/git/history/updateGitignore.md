# Git – Jak správně aktualizovat `.gitignore` a odstranit sledované soubory

> Praktický průvodce, jak zajistit, aby Git ignoroval i soubory, které už dříve sledoval.

---


<img src="./images/ed2c9789-9939-4dc7-b8e1-80b50214c6eb.png" alt="Ollama" style="width: 100%; display: block; border-radius: 8px;">

## Proč aktualizovat `.gitignore`?

- Soubor `.gitignore` říká Gitu, které soubory nemá sledovat.
- Pravidla `.gitignore` se aplikují pouze na soubory, které Git zatím nesleduje (untracked).

> [!NOTE]
> Soubory, které už Git sleduje, je potřeba odebrat z indexu ručně.

---

## Postup krok za krokem

### Varianta A: Odebrání konkrétní složky

1. **Zkontroluj, že v `.gitignore` máš řádek:**
    ```gitignore
    .idea/
    ```

2. **Odeber složku z Git indexu (ale ne z disku):**
    ```bash
    git rm -r --cached .idea
    ```

3. **Ulož změny:**
    ```bash
    git commit -m "Remove .idea from tracking"
    ```

---

### Varianta B: Hromadné odebrání všech sledovaných souborů a znovu přidání podle `.gitignore`

1. **Odeber všechny soubory z indexu:**
    ```bash
    git rm -r --cached .
    ```

2. **Znovu přidej soubory podle `.gitignore`:**
    ```bash
    git add .
    ```

3. **Commitni změny:**
    ```bash
    git commit -m "Refresh .gitignore rules"
    ```

> [!WARNING]
> Tento postup odstraní všechny soubory z Git indexu a znovu je přidá.