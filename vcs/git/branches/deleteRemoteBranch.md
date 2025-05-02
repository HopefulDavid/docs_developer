> [!WARNING]
> Smazání vzdálené větve je nevratná operace.
>
> Ujisti se, že větev už nepotřebuješ a že všechny potřebné změny byly začleněny do jiných větví.

Pro smazání vzdálené větve z Git serveru (např. GitHub, GitLab) postupuj takto:

1. Zobraz si seznam všech větví (lokální i vzdálené):

    ```bash
    git branch -a
    ```

2. Smaž vzdálenou větev jedním z těchto příkazů:

    ```bash
    git push origin --delete <nazev-vetve>
    # nebo kratší varianta
    git push origin :<nazev-vetve>
    ```

   > [!NOTE]
   > Nahraď `<nazev-vetve>` skutečným názvem větve, kterou chceš smazat.

3. Vyčisti lokální reference na smazané vzdálené větve:

    ```bash
    git fetch --prune
    ```

   > [!TIP]
   > Tento krok není povinný, ale pomáhá udržet lokální repozitář čistý.