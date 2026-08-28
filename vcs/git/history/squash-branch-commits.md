# Git – Sloučení commitů větve do jednoho commitu

> Nejbezpečnější způsob, jak sloučit všechny commity, které jsou na `develop` navíc oproti `main`, do jednoho commitu.

## Postup krok za krokem

<details>
<summary>Krok 1: Přepnutí na větev develop a vytvoření zálohy</summary>

```bash
git checkout develop
git branch backup/develop-before-squash
```

- Přepne se na větev `develop`.
- Vytvoří záložní větev `backup/develop-before-squash` pro případ, že by se něco pokazilo.

> [!TIP]
> Zálohu větve smažeš až po ověření, že je vše v pořádku: `git branch -d backup/develop-before-squash`
</details>

<details>
<summary>Krok 2: Stažení aktuálního stavu z remote</summary>

```bash
git fetch origin
```

- Stáhne aktuální stav vzdáleného repozitáře bez automatického sloučení.
</details>

<details>
<summary>Krok 3: Soft reset na společný předek s main</summary>

```bash
git reset --soft $(git merge-base develop origin/main)
```

- Najde společného předka větví `develop` a `origin/main`.
- Soft resetem přesune HEAD na tento bod – všechny změny z commitů na `develop` navíc zůstanou ve stage.

> [!NOTE]
> `--soft` zachová všechny změny ve staging area (index), takže je lze hned znovu zakomitovat.
</details>

<details>
<summary>Krok 4: Vytvoření souhrnného commitu</summary>

```bash
git commit -m "Souhrnný commit pro develop"
```

- Vytvoří jediný nový commit obsahující všechny dříve samostatné změny na větvi `develop`.

> [!WARNING]
> Tímto krokem přepíšeš historii větve `develop`. Pokud větev sdílíš s ostatními, nezapomeň je informovat a použít `git push --force-with-lease origin develop`.
</details>
