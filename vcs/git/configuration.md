---
description: "Identita autora, editor, konce řádků a kontrola účinného nastavení."
---

# Git – nastavení pro vlastní projekty

Konfigurace určuje identitu commitů a chování nástrojů; jméno a e-mail autora nejsou přihlašovací údaje k serveru.

## Nastav jednou pro svůj účet

V PowerShellu nebo Bashi nahraď ukázkové údaje vlastními:

```bash
git config --global user.name "Jana Novakova"
git config --global user.email "jana@example.com"
git config --global init.defaultBranch main
```

Jméno a e-mail budou zapsané v nových commitech, které mohou být veřejné; na GitHubu lze použít přesnou soukromou noreply adresu uvedenou v nastavení účtu.

`init.defaultBranch` určuje název větve nových repozitářů, existující větve nepřejmenuje.

## Osobní versus projektové nastavení

| Rozsah | Kde platí | Kdy jej použít |
|---|---|---|
| `--local` | Jen aktuální repozitář, zpravidla `.git/config` | Jiný e-mail pro pracovní projekt |
| `--global` | Projekty tvého uživatelského účtu | Osobní výchozí nastavení |
| `--system` | Instalace Gitu pro více uživatelů | Správa společného prostředí |

Místní hodnota přebíjí globální; jednotlivý příkaz může navíc dostat dočasné nastavení přes `git -c <klíč>=<hodnota> <příkaz>`.

V kořeni pracovního projektu například:

```bash
git config --local user.email "jana@firma.example"
git config --show-origin --get user.email
```

Druhý příkaz ukáže účinnou hodnotu a zdrojový soubor; změna nepozmění autorství již vytvořených commitů.

## Editor zpráv commitů

Pokud používáš VS Code a jeho příkaz `code` funguje v terminálu, nastav:

```bash
git config --global core.editor "code --wait"
```

`--wait` nechá Git počkat na uložení a zavření editační karty.

Můžeš zvolit jiný nainstalovaný editor s odpovídající volbou čekání, nebo editor nechat výchozí; `git commit -m "<zpráva>"` editor vůbec neotevírá.

## Konce řádků patří k pravidlům projektu

LF a CRLF jsou dva způsoby ukončení textového řádku; nevhodné převody dokážou zobrazit celý soubor jako změněný.

Pokud projekt používá `.gitattributes`, respektuj ho a nenormalizuj hromadně cizí historii.

Pro nový projekt lze do `.gitattributes` uložit:

```gitattributes
# Rozpoznané texty ukládej do historie s normalizovanými konci řádků.
* text=auto
# Shell skripty potřebují LF, dávkové skripty Windows obvykle CRLF.
*.sh text eol=lf
*.cmd text eol=crlf
*.bat text eol=crlf
```

Pravidla jsou verzovaná společně s projektem; vlastní typy souborů můžeš doplnit podle nástrojů, které je čtou.

Změnu pravidel ve stávajícím projektu dělej v čistém stromu jako samostatnou změnu a nejprve prohlédni efekt `git add --renormalize .` přes `git diff --cached`.

## Porovnávání v grafickém nástroji

IDE obvykle umí zobrazit Git diff i vyřešit konflikt bez další konfigurace.

Pokud preferuješ samostatný Meld, nejprve jej nainstaluj a ve Windows ověř jeho skutečnou cestu:

```bash
git config --global diff.tool meld
git config --global difftool.meld.path "C:/Program Files/Meld/Meld.exe"
git config --global merge.tool meld
git config --global mergetool.meld.path "C:/Program Files/Meld/Meld.exe"
```

Na systému s příkazem `meld` v `PATH` obvykle stačí nastavit `diff.tool` a `merge.tool` bez vlastní cesty.

`git difftool` porovná pracovní změny s indexem a `git mergetool` otevře existující konflikty; po jejich vyřešení vždy zkontroluj výsledný kód a testy.

## Diagnostika a vrácení volby

```bash
git config --show-origin --get core.editor
git config --global --unset core.editor
```

První příkaz přečte nastavení a druhý odstraní jen osobní volbu editoru, čímž se uplatní případná jiná nebo výchozí hodnota.

Nenulový návrat při neexistujícím klíči znamená, že není co číst či mazat.

Při problému s dlouhou cestou ve Windows nejdříve zkrať umístění projektu, například na `C:\src\aplikace`; `git config --global core.longpaths true` rozšíří podporu v Git for Windows, nikoli automaticky ve všech ostatních programech.

SSH klienta řeší [Git přes SSH](../../network/ssh/git.md).

Zdroje: [git config](https://git-scm.com/docs/git-config), [gitattributes](https://git-scm.com/docs/gitattributes), [Git for Windows FAQ](https://gitforwindows.org/faq.html).
