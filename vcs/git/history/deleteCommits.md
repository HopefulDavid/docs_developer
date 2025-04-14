### Nahrazení Vzdálené Branch z Lokální Branch

<ol>

<li>

Přepnout se na novou branch

```bash
git checkout --orphan latest_branch
```

> [!NOTE]
> `--orphan` znamená, že vytvoří branch bez historie commitů
    
</li>
<li>

Přidat všechny soubory.

```bash
git add -A
```
</li>
<li>

Provedení commitu.

```bash
git commit -am "Initialize commit"
```

> [!TIP]
> `-am` je zkrácený zápis
>
> Je to stejné jako zápis: `--all` `--message "commit message"`
</li>
<li>

Smazat hlavní branch.

> [!WARNING]
> Zjistěte název hlavní větve. (Většinou se jmenuje `master` nebo `main`)

```bash
git branch -D main
```
</li>
<li>

Přejmenovat aktivní branch na branch z předchozího kroku.

> [!WARNING]
> Zjistěte název hlavní větve. (Většinou se jmenuje `master` nebo `main`)

```bash
git branch -m main
```
</li>
<li>

Odeslat změny z pracovního adresáře do centrálního úložiště

```bash
git push -f origin main
```

> [!TIP]
> `-f` (force) = Historie commitů v centrálním úložišti je nahrazena historií z pracovního adresáře
</li>
</ol>