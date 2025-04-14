### Aktualizace .gitignore

Odstraňte mezipaměť všech souborů:

```bash
git rm -r --cached .
```

Jakmile vymažete existující mezipaměť, přidejte/stage soubor/soubory v aktuálním adresáři:

```bash
git add .
```

Potvrďte změny:

```
git commit -m "Aktualizace .gitignore"
```