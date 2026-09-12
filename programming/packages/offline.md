---
description: "Co zálohovat pro každý správce balíčků a jak ověřit obnovu na jiném počítači."
---

# Balíčky – záloha a obnova bez internetu

Obnovitelná záloha obsahuje balíčky všech potřebných verzí, jejich závislosti a vstupy projektu, podle kterých je správce znovu sestaví do pracovního prostředí.

Samotný seznam názvů nestačí, pokud v době obnovy nebude dostupný registr.

## Co přenést podle ekosystému

| Ekosystém | Doporučený obsah zálohy | Obnova |
|---|---|---|
| [NuGet / .NET knihovny](nuget.md#záloha-složky-balíčků) | Celá globální složka balíčků nebo lokální zdroj `.nupkg`, projekty a lockfile | Obnova přes místní zdroj nebo obnovenou globální složku |
| [.NET nástroje](dotnet-tools.md) | Manifest verzí a balíčky nástrojů v místním NuGet zdroji | `dotnet tool restore` nebo instalace konkrétní verze |
| [npm](npm.md#offline-záloha-a-obnova) | Ověřená kompletní instalační cache, zdroje a `package-lock.json` | `npm ci --offline` s touto cache |
| [pnpm](pnpm.md) | Naplněný store, konfigurace workspace, patche a `pnpm-lock.yaml` | `pnpm install --offline --frozen-lockfile` |
| [Python / pip](python.md) | Složka wheelů a přesný seznam požadavků | Nové virtuální prostředí a instalace přes `--no-index` |
| [Dart / Flutter pub](dart.md) | Celý pub cache, zdroje a `pubspec.lock` | `dart pub get --offline` nebo `flutter pub get --offline` |

Tabulka shrnuje účel příkazů; přesné cesty, předpoklady a kontrola jsou vždy v příslušném návodu.

## Složka balíčků není hotové vývojové prostředí

| Vrstva | Co uchovat zvlášť |
|---|---|
| Projekt | Zdrojové soubory, prostředky, manifesty, lockfile, workspace, patche a lokální závislosti |
| Nástroje | Instalátor nebo archiv požadovaného SDK, interpretu a správce balíčků |
| Platforma | Potřebný OS, architektura, nativní knihovny, překladač, workload nebo platformní SDK |
| Vnější data | Databáze, modely AI, prohlížeče stažené nástroji, certifikáty a soukromé konfigurace |

Nativní balíček pro Windows x64 nemusí fungovat na Linuxu ARM64 a kopie `node_modules` či `.venv` nemusí přežít ani změnu cesty.

Proto zálohuj přenositelný vstup správce a instalaci na cíli nech znovu vytvořit.

## Postup pro skutečně použitelnou zálohu

1. Vyber konkrétní projekt, jeho verzi a cílovou platformu.
2. S internetem obnov všechny požadované závislosti včetně vývojových, pokud budeš na cíli buildit a testovat.
3. Podle návodu připrav samostatnou složku balíčků a uchovej manifesty i lockfile ze stejného stavu.
4. Zastav instalace před kopírováním cache, aby nevznikla neúplná položka.
5. Na čisté cílové kopii obnov balíčky s vypnutým online zdrojem nebo offline přepínačem.
6. Bez připojení spusť build, testy i běžnou funkci aplikace, která může potřebovat další data.

Offline přepínač správce balíčků nemusí zakázat síť libovolnému instalačnímu skriptu, proto je poslední zkouška bez připojení důležitá.

## Co si přiložit k záloze

Do krátkého textu ulož datum, identifikaci projektu, OS, architekturu, výstup verzí nástrojů a příkaz, kterým obnova prošla.

Soukromé registry mohou vyžadovat oprávnění k uchování balíčků; tokeny do veřejného repozitáře ani veřejného záložního archivu nepatří.

Cache před zálohou nečisti příkazy typu `cache clean`, `store prune` nebo `locals --clear`.

Pro dlouhodobě spravovaný archiv více projektů je vhodný vlastní balíčkový registr nebo místní feed s oddělenou zálohou; obyčejná cache nemá automaticky retenční záruky.

## Kde končí tato oblast

Záloha [Git historie](../../vcs/git/backups.md) řeší zdrojový projekt a [záloha Dockeru](../../virtualization/docker/index.md) image i provozní data kontejnerů.

Tyto návody se doplňují, ale nepokrývají navzájem stejné soubory.
