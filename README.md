# Dokumentace pro vývojáře

Zdroj veřejného webu [hopefuldavid.github.io/docs_developer](https://hopefuldavid.github.io/docs_developer/) s českými návody pro každodenní práci vývojáře: Git, .NET, databáze, Docker, sítě, IDE a další nástroje. Web soustřeďuje postupy, které jsou jinak roztroušené v dokumentaci jednotlivých nástrojů, na jedno prohledávatelné místo v češtině a každý návod vede od principu přes použitelný příklad až po ověření výsledku. Web čtou česky mluvící vývojáři, repozitář slouží jedinému autorovi článků a správci webu. Jde o osobní projekt, web je zveřejněný a průběžně se doplňuje.

## Požadavky

| Program | Verze | K čemu |
| --- | --- | --- |
| [Git](https://git-scm.com/downloads) | bez pevné verze, ověřeno s 2.55 | Klonování a historie, ze které vzniká stránka Změny |
| [Bun](https://bun.com/docs/installation) | 1.4.3 | Skripty přehledů, testy a generátor stránky Změny git-cliff, který se instaluje jako závislost |
| [.NET SDK](https://dotnet.microsoft.com/download) | 10, ověřeno s 10.0.401 | Spuštění generátoru webu DocFX 2.81.0, který se instaluje jako místní nástroj |

## Zprovoznění

Příkazy se spouštějí v PowerShellu, první ve složce, kam se má repozitář naklonovat, ostatní v kořeni repozitáře. Kroky 1 až 3 stahují data ze sítě.

1. Naklonování repozitáře:

   ```powershell
   git clone https://github.com/HopefulDavid/docs_developer.git
   cd docs_developer
   ```

2. Instalace závislostí podle `bun.lock` do složky `node_modules`:

   ```powershell
   bun ci
   ```

3. Obnovení místního nástroje DocFX podle `.config/dotnet-tools.json`:

   ```powershell
   dotnet tool restore
   ```

4. Sestavení webu:

   ```powershell
   bun run build
   ```

   Sestavení trvá zhruba 10 s a končí řádky `Build succeeded.` a `0 warning(s)`. Vytvoří složku `_site` a stránku `content/changelog.md`, které Git ignoruje, a obnoví neaktuální přehledy oblastí. Hlášení, že `dotnet-docfx` neexistuje, znamená vynechaný krok 3.

## Náhled webu

Náhled zobrazuje web sestavený posledním `bun run build`:

```powershell
bun run preview
```

Příkaz vypíše `Serving "…\_site" on http://127.0.0.1:4173` a na této adrese se otevře úvodní stránka Dokumentace pro vývojáře. Server běží, dokud se neukončí klávesami Ctrl+C. Po dalším `bun run build` stačí stránku v prohlížeči obnovit.

## Přidání článku

1. Článek vznikne jako soubor `.md` ve složce oblasti, například `content/ide/rider.md`. Obrázky patří do `content/images`. Text je psaný neutrálně, bez oslovení čtenáře, a nadpisy mají popisnou podobu (`Výběr typu zálohy`, ne `Vyber typ zálohy`).
2. Začátek souboru obsahuje popis, ze kterého vzniká přehled oblasti:

   ```markdown
   ---
   description: "Ladění a profilování v Rideru."
   ---

   # Rider
   ```

3. Do `toc.yml` stejné oblasti se přidá záznam s názvem a souborem článku. Určuje jeho místo v navigaci.
4. Obnovení přehledu oblasti:

   ```powershell
   bun run build:overviews
   ```

   Příkaz vypíše `Aktualizováno:` se souborem přehledu, nebo `Přehledy jsou aktuální.`. Přehledy mezi značkami `přehled` se ručně neupravují, protože je tento příkaz přepíše.

Článek se dál kontroluje a zveřejňuje podle následující části.

## Kontrola a zveřejnění změn

1. Kontrola celého webu, stejná jako v GitHub Actions:

   ```powershell
   bun run validate
   ```

   Úspěšná kontrola hlásí `0 fail` u testů a končí řádky `Build succeeded.` a `0 warning(s)`. Hlášení `Neaktuální přehled: …` opraví `bun run build:overviews` a nové spuštění kontroly.

2. Commit změny. Zpráva commitu se objeví na veřejné stránce [Změny](https://hopefuldavid.github.io/docs_developer/changelog.html) a předpona podle Conventional Commits určuje kategorii, například `feat:` Nové funkce, `fix:` Opravy a `docs:` Dokumentace. Zpráva se vykresluje jako Markdown, proto generika a značky jako `<T>` patří do zpětných apostrofů a odkazy ani obrázky do ní nepatří.
3. Obnovení stránky Změny z historie příkazem `bun run build`. Varování DocFX v souboru `changelog.md` znamená chybnou zprávu commitu, kterou před pushem opraví `git commit --amend`, protože zpráva po pushi na stránce zůstane.
4. Push do větve `main`. Workflow Dokumentace v [GitHub Actions](https://github.com/HopefulDavid/docs_developer/actions) spustí `bun run validate` a po úspěchu nahradí obsah větve `gh-pages`, ze které se web zveřejňuje. Větev `gh-pages` se při každém zveřejnění vytváří znovu, proto se ručně neupravuje. Pull request projde stejnou kontrolou, ale web nezveřejní.

Chybnou zveřejněnou změnu vrátí `git revert` a další push.

## Přesun článku

Na původní adrese zůstane soubor s přesměrováním (`redirect_url` v úvodních metadatech), aby dál fungovaly uložené odkazy. Záznam v `toc.yml` vede na nový článek. Vzorem je [dotnet-cli.md](content/programming/packages/dotnet-cli.md).

## Přidání oblasti

Nová oblast je složka v `content` s vlastním `index.md` a `toc.yml`. V `content/toc.yml` se zařadí do jedné z nabídek horní lišty (Vývoj, Provoz, Tvorba), ne jako další samostatná položka. Samostatně stojí jen AI a Tým. Podle těchto nabídek `bun run build:overviews` seskupí karty oblastí na úvodní stránce a doplní k nim počet článků.

Vzorem je oblast [AI](content/ai/index.md): její `toc.yml` začíná položkou `Přehled` s odkazem na `index.md` a `index.md` obsahuje značky přehledu, mezi které `bun run build:overviews` doplní tabulku článků. Položka horní lišty, která odkazuje na stránku místo složky, oblastí není.

## Nastavení webu

| Soubor | Co určuje |
| --- | --- |
| `docfx.json` | Název webu, jazyk, vyhledávání, šablony a zdroje obsahu a obrázků |
| `cliff.toml` | Podobu stránky Změny a kategorie podle předpon commitů |
| `templates/material` | Vzhled a skripty webu |
| `.config/dotnet-tools.json` | Verzi DocFX |

Po změně `templates/material` nebo verze DocFX nestačí `bun run validate`, protože projde i s nefunkčním JavaScriptem nebo CSS. Web se proto zkontroluje v náhledu: konzole prohlížeče, světlý a tmavý motiv, úzké okno, vyhledávání a osnova stránky.

## Řešení potíží

| Hlášení | Příčina | Oprava |
| --- | --- | --- |
| Varování DocFX o neplatném odkazu nebo kotvě a neúspěšné sestavení | Odkaz míří na přesunutý článek nebo přejmenovaný nadpis, DocFX bere varování jako chybu | Oprava odkazu v článku, potom znovu `bun run validate` |
| Test `články nepoužívají oslovení druhou osobou` selže | Článek oslovuje čtenáře, například `otevřeš` nebo `zkontrolujte` | Přepis vypsaného řádku do neutrální podoby (`otevře se`, `zkontroluje se`), potom znovu `bun run validate` |

Test zachytí jen běžné tvary druhé osoby. Rozkazovací tvary jako `ověř` nebo `nastav` je potřeba najít při vlastní kontrole textu.

## Vývoj skriptů a testů

Skripty generují přehledy oblastí, testy v `tests` ověřují přehledy, stránku Změny a styl článků. Názvy testů jsou česky s diakritikou, jinak selže test `názvy testů jsou české`.

| Příkaz | Co dělá |
| --- | --- |
| `bun run validate` | Spustí `check`, `test` a `build` za sebou, stejně jako GitHub Actions |
| `bun run check` | Zkontroluje aktuálnost přehledů (`check:overviews`), nic nepřepisuje |
| `bun run test` | Spustí testy obsahu a skriptů |
| `bun run build` | Obnoví stránku Změny (`build:changelog`) a přehledy oblastí (`build:overviews`) a sestaví web do `_site` (`build:site`), přepisuje tyto soubory |
| `bun run build:overviews` | Obnoví jen přehledy oblastí podle `toc.yml` a popisů článků |
| `bun run preview` | Zpřístupní sestavený web na `http://127.0.0.1:4173`, běží do Ctrl+C |
