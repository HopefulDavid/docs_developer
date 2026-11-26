---
description: "Kontrola změn, příprava části souboru, commit a dokončení běžného pracovního dne."
---

# Git – běžný pracovní den

Jedna logická změna má projít kontrolou, testem a commitem, aby se později dalo vrátit k jejímu smyslu i obsahu.

Následující postup funguje v PowerShellu i Bashi.

Předpokládá existující repozitář a [zvolený způsob práce](workflows.md).

<a id="1-zjisti-kde-začínáš"></a>

## 1. Výchozí stav

```bash
git status --short --branch
git branch --show-current
```

Rozpracované soubory se nejdříve dokončí nebo [odloží](stash-worktree.md).

Synchronizace ani přepnutí neproběhnou bez pochopení jejich stavu.

Při práci se serverem se výchozí větev aktualizuje podle [synchronizace](synchronization.md).

Samostatná funkce dostane větev z právě zkontrolovaného základu:

```bash
git switch -c feature/hledani
```

`feature/hledani` je volitelný název úkolu.

Při práci na jediné větvi se tento krok vynechá.

<a id="2-uprav-soubory-a-zkontroluj-rozdíl"></a>

## 2. Úprava souborů a kontrola rozdílu

Po úpravách v editoru:

```bash
git status --short
git diff
```

`status` ukáže i nové soubory, které `diff` zatím nezobrazuje.

Jejich obsah se zkontroluje v editoru.

Výpis `diff` může otevřít prohlížeč textu, ze kterého se běžně vrací klávesou `q`.

<a id="3-vyber-obsah-jednoho-commitu"></a>

## 3. Obsah jednoho commitu

Možnost se volí podle toho, co patří k dokončované změně:

| Syntaxe | Co připraví do indexu |
|---|---|
| `git add -- <soubor>...` | Právě vyjmenované soubory včetně jejich úprav nebo odstranění |
| `git add -p [-- <soubor>]` | Interaktivně vybrané části změn sledovaných souborů |
| `git add -A` | Všechny změny v repozitáři včetně nových souborů a odstranění |
| `git restore --staged -- <soubor>` | Vyřadí soubor z indexu, úpravy ponechá v pracovní složce |

`--` odděluje volby od cest, aby například pomlčka v názvu souboru nebyla vyhodnocena jako přepínač.

Pro změnu samotného `README.md`:

```bash
git add -- README.md
git diff --cached
```

Do commitu půjde přesně zobrazený rozdíl.

Když se soubor po `add` ještě upraví, `add` se spouští znovu jen tehdy, má-li commit zahrnout i novou úpravu.

Při `add -p` volba `y` přijme kus změny, `n` jej přeskočí, `s` jej podle možností rozdělí a `?` zobrazí nápovědu.

<a id="4-otestuj-a-ulož"></a>

## 4. Test a uložení

Spustí se build nebo testy, které projekt skutečně používá.

Univerzální příkaz pro všechny projekty neexistuje.

Test s dalšími nepřipravenými změnami ověřuje pracovní strom, zatímco commit bude obsahovat jen index.

```bash
git diff --cached --check
git commit -m "docs: upřesňuje spuštění aplikace"
git show --stat --oneline HEAD
git status
```

`--check` upozorní například na některé chyby v bílých znacích, commit uloží připravený stav a `show` zobrazí právě uloženou změnu.

Zpráva má říct účel změny.

Prefix `docs:` je konvence pro dokumentaci, kterou lze přizpůsobit pravidlům projektu.

Hlášení `nothing to commit` znamená, že index neobsahuje rozdíl oproti poslednímu commitu.

<a id="5-dokonči-větev-a-vzdálenou-kopii"></a>

## 5. Dokončení větve a vzdálené kopie

- Na jediné větvi následuje [odeslání commitů](synchronization.md).
- Na pracovní větvi nejprve [sloučení](merging.md) nebo [pull request](branches/pull-request.md).
- Rozdělanou práci, která se zatím nemá slučovat, lze commitnout a odeslat na vlastní větev.

Samotný push pracovní větve ještě nezmění `main`.

## Přejmenování a odstranění souboru

Git rozpoznává přejmenování podle podobnosti obsahu, proto funguje i změna v editoru následovaná přidáním obou cest.

Tyto příkazy zároveň upraví pracovní složku a připraví změnu do indexu:

```text
git mv <stará-cesta> <nová-cesta>
git rm -- <soubor>
```

Po nich opět následuje `git diff --cached`.

`git rm` fyzicky odstraní soubor, zatímco varianta `git rm --cached` pouze ukončí sledování.

Pokud se něco nepovedlo, odpovídající postup nabízí [obnova](recovery.md).

Zdroje: [git add](https://git-scm.com/docs/git-add), [git commit](https://git-scm.com/docs/git-commit), [git status](https://git-scm.com/docs/git-status).
