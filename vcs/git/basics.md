---
description: "Pracovní soubory, index, commity, větve a vztah lokálního Gitu k serveru."
---

# Git – principy a první orientace

Git ukládá historii souborů projektu, takže můžeš porovnat změny, vrátit se k funkční verzi nebo vyvíjet více variant vedle sebe.

Funguje i bez internetu.

GitHub, GitLab nebo vlastní server přidávají vzdálenou kopii a služby jako pull requesty.

## Co si Git pamatuje

| Pojem | Co znamená v běžné práci |
|---|---|
| Repozitář | Projekt s historií v adresáři `.git` |
| Pracovní strom | Soubory, které právě vidíš a upravuješ v editoru |
| Index / staging area | Připravený obsah příštího commitu |
| Commit | Uložený stav sledovaných souborů s autorem, zprávou a odkazem na předchozí historii |
| ID / hash commitu | Jedinečný identifikátor, například z `git log --oneline` |
| Větev | Pojmenovaný ukazatel na poslední commit určité linie vývoje |
| `HEAD` | Obvykle odkaz na právě vybranou větev. Určuje výchozí commit práce |
| Remote | Pojmenované spojení na jiný repozitář, obvykle `origin` |
| `origin/main` | Místní záznam naposledy načteného stavu větve `main` na serveru |

### Cesta jedné změny

```text
editor → pracovní strom → git add → index → git commit → místní historie
                                                        ↓ git push
                                                  vzdálený repozitář
```

`git add` připraví obsah souboru v daném okamžiku.

Další úprava v editoru se do připraveného commitu nepřidá sama.

`git commit` uloží právě index a `git push` odešle hotové commity, takže necommitované soubory nejsou zálohované na serveru.

## Jak poznáš stav projektu

Příkazy spouštěj v kořeni svého repozitáře.

Fungují v PowerShellu i Bashi.

```bash
git status
git diff
git diff --cached
git log --oneline -5
```

| Příkaz | Na jakou otázku odpovídá |
|---|---|
| `git status` | Na jaké větvi jsem a které soubory jsou změněné, připravené nebo nesledované? |
| `git diff` | Co jsem změnil oproti indexu a zatím nepřipravil? |
| `git diff --cached` | Co přesně by se teď uložilo příkazem commit? |
| `git log --oneline -5` | Jakých bylo posledních pět commitů této větve? |

Prázdný `git diff` neznamená, že nejsou žádné změny: mohou už být v indexu nebo může jít o nový nesledovaný soubor.

Číslo `5` jen omezuje délku výpisu a lze ho bezpečně zvýšit.

### Jak číst krátký stav

`git status --short` používá dva sloupce: první popisuje index vůči commitu a druhý pracovní soubor vůči indexu.

```text
 M README.md
M  src/app.cs
MM src/config.cs
?? poznamky.txt
```

- `README.md` je upravený, ale nepřipravený.
- `src/app.cs` má změnu připravenou do commitu.
- `src/config.cs` má připravenou verzi i další dosud nepřipravené úpravy.
- `poznamky.txt` je nový soubor, který Git dosud nesleduje.

## Větev není další složka projektu

Přepnutí větve obvykle změní soubory v téže pracovní složce podle jejího posledního commitu.

Názvy `main`, `master` a `develop` nemají zvláštní technické schopnosti.

Jejich význam určuje zvolený způsob práce.

Pokud chceš současně otevřít dvě větve ve dvou složkách, použij [worktree](stash-worktree.md).

## Jak navázat

1. [Zvol způsob práce](workflows.md) podle velikosti změn a způsobu vydávání.
2. [Nastav identitu](configuration.md) a [založ nebo naklonuj repozitář](repository.md).
3. Projdi [běžný pracovní den](in-practice.md) a pak [synchronizaci](synchronization.md).
4. Při chybě začni [rozcestníkem obnovy](recovery.md), který rozlišuje neuložené, místní i zveřejněné změny.

V referencích označuje `<soubor>` hodnotu k nahrazení.

Podrobný [klíč syntaxe](../../operating-system/command-line-syntax.md) vysvětluje i hranaté závorky a alternativy.

Principy vycházejí z [Git Book: základy](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) a [zaznamenávání změn](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).
