---
description: "Co zkopírovat pro offline zálohu balíčků a jak ověřit obnovu bez původní instalace."
---

# Balíčky

Tento přehled propojuje správce balíčků s postupy pro přenos projektů mezi kompatibilními počítači.

Základní instalaci, odinstalaci, výpis a aktualizaci najdeš na stránce konkrétního správce.

## Záloha a obnova bez internetu

Pro obnovu bez internetu potřebuješ **projekt i samotné balíčky**.

Seznam verzí nebo lockfile jejich instalační data neobsahuje.

U každého správce níže najdeš tři kroky: **připravit s internetem → přenést zálohu → obnovit bez internetu**.

### Vyber správce

| Správce | Co uložit vedle zdrojů projektu | Návod |
|---|---|---|
| NuGet | Složku balíčků včetně `.nupkg` | [Knihovny .NET](nuget.md) |
| .NET tools | U globálních celou `tools` včetně `.store`, u lokálních manifest a balíčky | [.NET tools](dotnet-tools.md) |
| npm | Celou naplněnou `npm-cache` | [Npm](npm.md) |
| pnpm | `store` i `metadata` a nastavení jejich cest | [Pnpm](pnpm.md) |
| Python / pip | Seznam verzí a `wheelhouse` s balíčky `.whl` | [Python](python.md) |
| Dart / Flutter | `pubspec.lock` a celou `pub-cache` | [Dart a Flutter pub](dart.md) |

Cache je pracovní složka stažených balíčků.

Pro zálohu pořizuj její úplnou kopii po skončení instalací.

### Nejjednodušší postup

1. **Na původním počítači s internetem** připrav balíčky podle příslušného návodu a ověř, že projekt funguje.
2. **Zkopíruj zálohu na jiné úložiště**, včetně zdrojů, manifestů, lockfilů, konfigurace a případných místních závislostí.
3. **Na cíli bez internetu** rozbal pracovní kopii zálohy, obnov balíčky a spusť aplikaci, build i testy.

Původní uloženou zálohu ponech odděleně od pracovní kopie, kterou zkoušíš nebo dále používáš.

Pro více projektů můžeš sdílet složku balíčků jednoho správce, ale uchovej zdroje a uzamčené verze každého projektu zvlášť.

### Co připravit také

- **SDK a správce balíčků:** archiv či instalátor odpovídající verze .NET, Node.js, Pythonu, Dartu nebo Flutteru.
- **Stejné prostředí:** kompatibilní OS a architekturu, případně nativní knihovny a překladače.
- **Další data aplikace:** například databázi, modely, pluginy nebo prohlížeč stažený instalačním skriptem.

Pro vývoj, build a testy zahrň také vývojové závislosti.

Soukromé tokeny uchovávej odděleně od veřejných zdrojů.

### Jak poznáš, že je záloha úplná

Obnova musí fungovat bez původních pracovních instalací a cache, ideálně na novém účtu nebo druhém kompatibilním počítači.

Úspěšný výpis správce nestačí: spusť také běžnou operaci aplikace bez připojení, protože vlastní instalační nebo build skript může stahovat další data mimo správce balíčků.

Pokud něco chybí, doplň zálohu na počítači s internetem a znovu vyzkoušej její pracovní kopii.

Před zálohováním nepoužívej `cache clean`, `store prune` ani jiné čištění stažených dat.

Pokud při obnově internet máš, většinou stačí projekt s manifestem a lockfilem.

Jednotlivé návody uvádějí i tuto kratší variantu.

### Související zálohy

[Záloha Gitu](../../vcs/git/backups.md) uchovává historii zdrojů a [záloha Dockeru](../../virtualization/docker/index.md) image i provozní data kontejnerů.
