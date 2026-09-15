---
description: "Kontrola změn, příprava části souboru, commit a dokončení běžného pracovního dne."
---

# Git – běžný pracovní den

Jedna logická změna má projít kontrolou, testem a commitem, aby ses později dokázal vrátit k jejímu smyslu i obsahu.

Následující postup funguje v PowerShellu i Bashi.

Předpokládá existující repozitář a [zvolený způsob práce](workflows.md).

## 1. Zjisti, kde začínáš

```bash
git status --short --branch
git branch --show-current
```

Pokud už máš rozpracované soubory, nejdříve je dokonči nebo [odlož](stash-worktree.md).

Nesynchronizuj a nepřepínej bez pochopení jejich stavu.

Používáš-li server, aktualizuj výchozí větev podle [synchronizace](synchronization.md).

Pro samostatnou funkci vytvoř větev z právě zkontrolovaného základu:

```bash
git switch -c feature/hledani
```

`feature/hledani` je volitelný název tvého úkolu.

Při práci na jediné větvi tento krok vynech.

## 2. Uprav soubory a zkontroluj rozdíl

Po úpravách v editoru spusť:

```bash
git status --short
git diff
```

`status` ukáže i nové soubory, které `diff` zatím nezobrazuje.

Jejich obsah prohlédni v editoru.

Výpis `diff` může otevřít prohlížeč textu, ze kterého se běžně vrací klávesou `q`.

## 3. Vyber obsah jednoho commitu

Zvol jednu možnost podle toho, co patří k dokončované změně:

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

Pokud po `add` soubor ještě upravíš, spusť `add` znovu jen tehdy, chceš-li zahrnout i novou úpravu.

Při `add -p` volba `y` přijme kus změny, `n` jej přeskočí, `s` jej podle možností rozdělí a `?` zobrazí nápovědu.

## 4. Otestuj a ulož

Spusť build nebo testy, které projekt skutečně používá.

Univerzální příkaz pro všechny projekty neexistuje.

Pokud testuješ s dalšími nepřipravenými změnami, mysli na to, že testuješ pracovní strom, zatímco commit bude obsahovat jen index.

```bash
git diff --cached --check
git commit -m "docs: upřesňuje spuštění aplikace"
git show --stat --oneline HEAD
git status
```

`--check` upozorní například na některé chyby v bílých znacích, commit uloží připravený stav a `show` zobrazí právě uloženou změnu.

Zpráva má říct účel změny.

Prefix `docs:` je konvence pro dokumentaci, kterou můžeš přizpůsobit pravidlům projektu.

Hlášení `nothing to commit` znamená, že index neobsahuje rozdíl oproti poslednímu commitu.

## 5. Dokonči větev a vzdálenou kopii

- Na jediné větvi pokračuj [odesláním commitů](synchronization.md).
- Na pracovní větvi nejprve zkontroluj [sloučení](merging.md) nebo vytvoř [pull request](branches/pull-request.md).
- Rozdělanou práci, kterou zatím nechceš slučovat, můžeš commitnout a odeslat na vlastní větev.

Samotný push pracovní větve ještě nezmění `main`.

## Přejmenování a odstranění souboru

Git rozpoznává přejmenování podle podobnosti obsahu, proto funguje i změna v editoru následovaná přidáním obou cest.

Tyto příkazy zároveň upraví pracovní složku a připraví změnu do indexu:

```text
git mv <stará-cesta> <nová-cesta>
git rm -- <soubor>
```

Po nich opět použij `git diff --cached`.

`git rm` fyzicky odstraní soubor, zatímco varianta `git rm --cached` pouze ukončí sledování.

Pokud se něco nepovedlo, vyber odpovídající postup v [obnově](recovery.md).

Zdroje: [git add](https://git-scm.com/docs/git-add), [git commit](https://git-scm.com/docs/git-commit), [git status](https://git-scm.com/docs/git-status).
