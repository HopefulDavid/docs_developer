# Git – změna.gitignore pro již sledované soubory

`.gitignore` ovlivňuje dosud nesledované soubory; již commitnutý soubor z historie ani z indexu neodstraní.

## Před použitím

Příklad vyřazuje sdílení složky `.idea/`; předem ověř, že její obsah tým skutečně nechce verzovat.

`--cached` ponechá místní soubory na disku, ale commit jejich odstranění se při načtení změny projeví také ostatním.

## Praktický postup

Do kořenového `.gitignore` přidej:

```gitignore
# Osobní nastavení IDE nemá být součástí dalšího commitu.
.idea/
```

Ve stejném repozitáři spusť:

```bash
git rm -r --cached -- .idea
git add .gitignore
git diff --cached
git commit -m "chore: vyřazuje místní nastavení IDE"
```

`-r` zahrne celý adresář a `--` odděluje volby od cesty; kontrola diffu před commitem má ukázat jen zamýšlené odstranění a nové pravidlo. [Git rm](https://git-scm.com/docs/git-rm)

## Ověření

```bash
git ls-files -- .idea
git check-ignore -v .idea/workspace.xml
```

První výpis má být prázdný, druhý ukazuje odpovídající ignorovací pravidlo; název souboru nahraď skutečnou položkou. [Gitignore](https://git-scm.com/docs/gitignore)

## Důležité poznámky

Kvůli jedné složce není potřeba odebrat a znovu přidat celý index.

Starší commity stále obsahují původní soubory; tajné údaje již uložené do historie vyžadují samostatnou nápravu.

Pouze místní ignorování nesledovaných souborů řeší [`.git/info/exclude`](assume-unchanged.md).
