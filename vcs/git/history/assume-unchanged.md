---
description: "Oddělení lokální konfigurace a limity příznaků sledovaných souborů."
---

# Git – lokální konfigurace a assume-unchanged

Příznak `assume-unchanged` je optimalizace kontroly sledovaného souboru; není spolehlivý způsob ukládání vlastní konfigurace mimo historii.

## Proč tím neskrývat vlastní úpravy

Gitu slibuješ, že soubor neměníš, takže může vynechat některé kontroly pracovního stromu.

Git může změnu přesto rozpoznat nebo při merge vyžadovat odstranění příznaku. [Význam assume-unchanged](https://git-scm.com/docs/git-update-index#_using_assume_unchanged_bit)

## Před použitím

Rozliš, zda je soubor sledovaný; ověř jej příkazem `git ls-files -- config.local.json`.

Pokud příkaz nic nevypíše, soubor není v indexu a lze jej ignorovat běžným pravidlem.

## Praktické použití: vlastní konfigurace

Verzuj výchozí konfiguraci bez tajemství a aplikaci nastav tak, aby ji mohla doplnit místním souborem.

Do `.gitignore` přidej:

```gitignore
# Místní hodnoty; sdílená výchozí konfigurace zůstává verzovaná.
config.local.json
```

Pro pravidlo platné jen ve tvé kopii použij stejný řádek v `.git/info/exclude`.

Ignorování již sledovaného souboru vyžaduje [samostatnou změnu indexu](update-gitignore.md), která se po commitu projeví i ostatním.

## Kontrola a zrušení příznaku

Pokud někdo příznak dříve nastavil, obnov běžnou kontrolu:

```bash
# Nahraď cestu skutečným sledovaným souborem.
git ls-files -v -- config.json
git update-index --no-assume-unchanged -- config.json
git diff -- config.json
```

Malé počáteční písmeno ve výpisu `ls-files -v` označuje `assume-unchanged`; poslední příkaz ukáže místní změny. [Reference git ls-files](https://git-scm.com/docs/git-ls-files)

Samotné nastavení by mělo podobu `git update-index --assume-unchanged -- <sledovaný-soubor>`, ale pro lokální úpravy použij oddělenou konfiguraci výše.

## Důležité poznámky

Ani `skip-worktree` není obecná ochrana vlastních změn; jeho hlavní použití souvisí se sparse checkoutem. [Poznámky k indexu](https://git-scm.com/docs/git-update-index#_notes)

Pokud se tajemství dostalo do commitu, ignorovací příznak je neodstraní z historie ani nezneplatní.
