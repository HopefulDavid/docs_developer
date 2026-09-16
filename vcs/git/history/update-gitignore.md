---
description: "Pravidla pro generované a místní soubory a ukončení sledování existující položky."
---

# Git – ignorování souborů

`.gitignore` říká Gitu, které dosud nesledované soubory běžně nenabízet k přidání do historie.

Hodí se pro výstupy sestavení, obnovené závislosti a soukromá místní nastavení.

## Kam pravidlo patří

| Soubor | Platnost |
|---|---|
| `.gitignore` v projektu | Sdílená pravidla verzovaná spolu s projektem |
| `.git/info/exclude` | Pravidla jen pro tuto místní pracovní kopii |
| Soubor nastavený přes `core.excludesFile` | Osobní pravidla napříč projekty |

Ignorování neslouží k zabezpečení tajemství a již sledované soubory nepřestane sledovat samo.

## Příklad pro kořen projektu

Do `.gitignore` vlož jen pravidla odpovídající skutečnému projektu:

```gitignore
# Obnovitelné závislosti Node.js.
node_modules/
# Výstupy sestavení .NET v libovolné hloubce.
bin/
obj/
# Soukromé prostředí v kořeni; bezpečný vzor zůstává verzovaný.
/.env
/.env.*
!/.env.example
```

Koncové `/` vybírá adresáře, počáteční `/` kotví cestu ke složce tohoto `.gitignore` a `!` pravidlo obrací.

Výjimka uvnitř zcela ignorovaného rodičovského adresáře sama nestačí, protože Git takový adresář standardně neprochází.

Manifesty a lockfile balíčků obvykle verzuj, aby šlo obnovit stejné závislosti.

## Ověř konkrétní pravidlo

Příkazy v PowerShellu i Bashi spouštěj v kořeni projektu:

```bash
git check-ignore -v .env
git status --short --ignored
```

První příkaz ukáže soubor, řádek a pravidlo, které odpovídá cestě.

Druhý označí ignorované položky `!!`.

Pokud je položka už sledovaná, ověř ji přes `git ls-files -- <cesta>`.

Pro samotné posouzení pravidla i u sledované cesty lze použít `git check-ignore --no-index -v <cesta>`.

## Soubor už je v historii

Příklad ukončí sledování vlastního `config.local.json`, ale ponechá jeho místní soubor na disku:

```gitignore
# Přidej tento řádek do projektového .gitignore.
config.local.json
```

Potom:

```bash
git rm --cached -- config.local.json
git add -- .gitignore
git diff --cached
git commit -m "chore: odděluje místní konfiguraci"
```

Commit odstraní soubor z budoucích verzí projektu.

Po načtení změny se odstranění projeví také v jiných pracovních kopiích.

Potřebnou soukromou konfiguraci proto před synchronizací jinde uchovej a verzuj bezpečný vzor s vysvětlenými hodnotami.

Pro adresář má syntaxe podobu `git rm -r --cached -- <adresář>`.

Kvůli jedné cestě není potřeba znovu vytvářet celý index.

## Důležité poznámky

Starší commity si původní soubor ponechávají, takže uniklý token nejprve zneplatni.

Pouhé skrývání změn sledovaného souboru pomocí [assume-unchanged](assume-unchanged.md) není náhradou oddělené konfigurace.

Zdroje: [gitignore](https://git-scm.com/docs/gitignore), [check-ignore](https://git-scm.com/docs/git-check-ignore), [git rm](https://git-scm.com/docs/git-rm).
