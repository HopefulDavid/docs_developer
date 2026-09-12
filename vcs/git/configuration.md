# Git – uživatelská konfigurace

Konfigurace určuje identitu autora, chování Gitu a používané nástroje pro porovnávání a slučování.

## Jak fungují rozsahy

`--local` platí pro aktuální repozitář, `--global` pro tvůj účet a `--system` pro instalaci Gitu; místní hodnota může přepsat obecnější nastavení.

Příkazy níže používají osobní konfiguraci a nevyžadují správce systému. [Reference git config](https://git-scm.com/docs/git-config)

## Praktické nastavení

Jméno a e-mail nahraď údaji, které chceš mít uvedené u commitů:

```bash
git config --global user.name "Jana Novakova"
git config --global user.email "jana@example.com"
git config --show-origin --get user.email
```

Poslední příkaz ukáže účinnou hodnotu i soubor, ze kterého pochází; nastavení nemění autorství starých commitů.

## Povolení dlouhých cest ve Windows

```bash
git config --global core.longpaths true
git config --show-origin --get core.longpaths
```

Volba rozšiřuje podporu dlouhých cest v Git for Windows; nezaručuje stejnou podporu ve všech editorech, build nástrojích a skriptech. [Git for Windows: dlouhé cesty](https://gitforwindows.org/faq.html)

Při přetrvávajícím problému nejprve zkrať kořenovou cestu projektu, například na `C:\src\aplikace`.

## Nastavení Meld jako diff a merge nástroje

Nainstaluj [Meld](https://meldmerge.org/) a zjisti jeho skutečnou cestu.

Ve Windows použij:

```bash
git config --global diff.tool meld
git config --global difftool.meld.path "C:/Program Files/Meld/Meld.exe"
git config --global merge.tool meld
git config --global mergetool.meld.path "C:/Program Files/Meld/Meld.exe"
```

Na Linuxu s nainstalovaným Meld v `PATH` stačí nastavit `diff.tool` a `merge.tool`; vlastní cestu zadávej jen podle skutečné instalace.

```bash
# Porovná necommitované změny proti indexu.
git difftool
# Při nevyřešeném merge otevře soubory s konflikty.
git mergetool
```

Po řešení konfliktu zkontroluj výsledný kód a testy; úspěšné zavření nástroje samo nepotvrzuje správnou změnu. [Difftool](https://git-scm.com/docs/git-difftool), [mergetool](https://git-scm.com/docs/git-mergetool)

## Co lze upravit

Nahrazením `--global` za `--local` omezíš nové nastavení na aktuální repozitář.

Například `git config --global --unset diff.tool` odstraní osobní volbu porovnávacího nástroje; pokud hodnota neexistuje, příkaz vrátí nenulový kód.

Výběr SSH klienta řeší [Git přes SSH](../../network/ssh/git.md#které-ssh-používá-git) a [společný klient ve Windows](../../network/ssh/windows.md#jeden-klient-pro-windows-a-git).
