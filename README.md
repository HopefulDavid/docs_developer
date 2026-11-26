# Dokumentace pro vývojáře

Veřejný web s českými návody pro každodenní práci vývojáře: Git, .NET, databáze, Docker, sítě, IDE a další. Web běží na [hopefuldavid.github.io/docs_developer](https://hopefuldavid.github.io/docs_developer/) a průběžně se doplňuje. Repozitář slouží autorovi článků a správci webu.

## Požadavky

| Program | Verze | K čemu |
| --- | --- | --- |
| [Git](https://git-scm.com/downloads) | libovolná aktuální | Klonování a historie, ze které vzniká stránka Změny |
| [Bun](https://bun.com/docs/installation) | 1.4.3 | Skripty přehledů, testy a generátor změn |
| [.NET SDK](https://dotnet.microsoft.com/download) | 10 | Spuštění generátoru webu DocFX 2.78.5, který se instaluje jako místní nástroj |

## Zprovoznění

Příkazy se spouštějí v PowerShellu v kořeni repozitáře.

```powershell
git clone https://github.com/HopefulDavid/docs_developer.git
cd docs_developer
bun ci
dotnet tool restore
bun run build
bun run preview
```

`build` obnoví stránku Změny a přehledy oblastí a sestaví web do složky `_site` zhruba za 10 s. `preview` ho zpřístupní na `http://127.0.0.1:4173` a běží, dokud se neukončí klávesami Ctrl+C. Po dalším `build` stačí stránku v prohlížeči obnovit.

## Nový článek

1. Článek vznikne jako soubor `.md` ve složce oblasti, například `content/ide/rider.md`. Obrázky patří do `content/images`.
2. Začátek souboru obsahuje popis, ze kterého vzniká přehled oblasti:

   ```markdown
   ---
   description: "Ladění a profilování v Rideru."
   ---

   # Rider
   ```

3. Do `toc.yml` stejné oblasti se přidá záznam s názvem článku. Určuje jeho místo v navigaci.
4. `bun run build:overviews` obnoví přehledy oblastí a `bun run validate` zkontroluje celý web.

Přehledy mezi značkami `přehled` se ručně neupravují, protože je `build:overviews` přepíše.

## Přidání oblasti

Nová oblast je složka v `content` s vlastním `index.md` a `toc.yml`. V `content/toc.yml` se zařadí do jedné z nabídek horní lišty (Vývoj, Provoz, Tvorba) nebo stojí samostatně jako AI a Tým. Podle těchto nabídek `build:overviews` seskupí karty oblastí na úvodní stránce a doplní k nim počet článků.

Vzorem je oblast [AI](content/ai/index.md): její `toc.yml` začíná položkou `Přehled` s odkazem na `index.md` a `index.md` obsahuje značky přehledu, mezi které `build:overviews` doplní tabulku článků. Položka horní lišty, která odkazuje na stránku místo složky, oblastí není.

## Přesun článku

Na původní adrese zůstane soubor s přesměrováním, aby dál fungovaly uložené odkazy. Záznam v `toc.yml` vede na nový článek. Vzorem je [dotnet-cli.md](content/programming/packages/dotnet-cli.md).

## Kontrola a publikování

| Příkaz | Co dělá |
| --- | --- |
| `bun run validate` | Zkontroluje přehledy, spustí testy a sestaví web stejně jako GitHub Actions |
| `bun run check` | Zkontroluje aktuálnost přehledů (`check:overviews`), nic nepřepisuje |
| `bun run test` | Spustí testy obsahu a skriptů |
| `bun run build` | Obnoví stránku Změny (`build:changelog`) a přehledy oblastí (`build:overviews`) a sestaví web do `_site` (`build:site`), přepisuje tyto soubory |
| `bun run build:overviews` | Obnoví jen přehledy oblastí podle `toc.yml` a popisů článků |
| `bun run preview` | Zpřístupní sestavený web na `http://127.0.0.1:4173`, běží do Ctrl+C |

Pull request projde [kontrolou v GitHub Actions](https://github.com/HopefulDavid/docs_developer/actions). Push do větve `main` po úspěšné kontrole web zveřejní. Chybnou změnu vrátí `git revert` a další push.

Zprávy commitů se objeví na veřejné stránce [Změny](https://hopefuldavid.github.io/docs_developer/changelog.html). Kategorii určuje předpona podle Conventional Commits, například `docs:` nebo `fix:`.

## Řešení potíží

| Hlášení | Příčina | Oprava |
| --- | --- | --- |
| `Neaktuální přehled: …` z `bun run validate` | Článek nebo `toc.yml` se změnil bez obnovy přehledů | `bun run build:overviews`, potom znovu `bun run validate` |
| Varování DocFX o neplatném odkazu nebo kotvě | Odkaz míří na přesunutý článek nebo přejmenovaný nadpis | Oprava odkazu v článku, kontrola přes `bun run build` |
| Test `články nepoužívají oslovení druhou osobou` selže | Článek oslovuje čtenáře, například `otevřeš` nebo `zkontrolujte` | Přepis vypsaného řádku do neutrální podoby (`otevře se`, `zkontroluje se`), potom znovu `bun run validate` |
| Test `názvy testů jsou české` selže | Název testu ve vypsaném souboru a řádku je anglicky nebo bez diakritiky | Přepis názvu do češtiny s diakritikou v neutrálním stylu, potom znovu `bun run validate` |
| `docfx` nejde spustit | Místní nástroj DocFX není obnovený | `dotnet tool restore` |
