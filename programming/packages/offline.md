---
description: "Výběr zálohy podle správce balíčků, obnova s internetem i bez něj a kontrola úplnosti."
---

# Balíčky – záloha a obnova

Nejdříve rozhodni, zda při obnově budeš mít internet a původní balíčky zůstanou dostupné v registru.

**Pro běžnou obnovu** uchovej zdrojový projekt, manifesty, lockfily a verze nástrojů.

**Pro obnovu bez registru** přidej skutečné balíčky se všemi potřebnými závislostmi a předem ověř jejich instalaci.

## Vyber správce balíčků

| Správce | Co přidat do offline zálohy | Podrobný postup |
|---|---|---|
| NuGet | Celou složku balíčků včetně archivů `.nupkg` | [Knihovny .NET](nuget.md) |
| .NET tools | Manifest nebo inventář nástrojů a jejich NuGet balíčky | [Lokální a globální nástroje](dotnet-tools.md) |
| npm | Celou ověřenou npm cache | [Projekty i globální nástroje](npm.md) |
| pnpm | Store **i cache metadat** a konfiguraci jejich cest | [Projekty a složka nástrojů](pnpm.md) |
| Python / pip | Wheelhouse se všemi instalačními `.whl` | [Virtuální prostředí a vlastní balíčky](python.md) |
| Dart / Flutter pub | Celou pub cache včetně metadat a Git závislostí | [Projekty a CLI nástroje](dart.md) |

Každý odkaz obsahuje konkrétní příkazy pro přípravu, přenos, obnovu a ověření i variantu pro již používanou cache, pokud je vhodná.

## Jeden projekt, více projektů, nebo celý počítač

| Potřeba | Praktická volba |
|---|---|
| Obnovit jeden projekt | Samostatná záloha balíčků podle jeho lockfilu |
| Uchovat více projektů | Společná složka balíčků daného správce, ale zdroje a uzamčené verze každého projektu zvlášť |
| Přenést vývojové nástroje | Inventář přesných verzí; podle správce manifest, samostatný projekt nástrojů nebo nová instalace |
| Obnovit celý vývojový počítač | Balíčky doplněné o SDK, runtime, systémové nástroje, konfiguraci a vlastní data |

Kopie globální cache obsahuje jen to, co do ní bylo skutečně stažené; před archivací obnov všechny projekty, které chceš později používat.

Zálohu pořizuj až po ukončení instalací a předem nepoužívej příkazy jako `cache clean`, `store prune` nebo `locals --clear`.

## Co uchovat vedle balíčků

- **Projekt:** zdroje, prostředky, manifesty, lockfily, workspace, patche, hooky a místní závislosti.
- **Nástroje:** instalátor nebo archiv správné verze SDK, interpretu a správce balíčků.
- **Platforma:** potřebný OS a architektura, nativní knihovny, překladače a platformní SDK.
- **Další data:** například databáze, modely, prohlížeče stažené instalačními skripty nebo konfigurace aplikace.

Autentizační tokeny a soukromou konfiguraci uchovej odděleně od veřejného projektu.

Pokud má být na cíli možné sestavení a testování, zahrň také vývojové závislosti; záloha jen produkčních balíčků k tomu nemusí stačit.

## Jak ověřit, že záloha funguje

1. Zkopíruj zálohu do nové pracovní složky na kompatibilním počítači.
2. Použij připravené nástroje a čistou instalaci bez původních `node_modules`, `.venv`, `.dart_tool` nebo evidence obnovených .NET tools.
3. Obnov balíčky pouze ze zálohy podle příslušného návodu.
4. Porovnej uzamčené verze a spusť build, testy i běžnou operaci aplikace.
5. Přilož datum, OS, architekturu, verze nástrojů a příkaz, kterým obnova prošla.

Ověřuj pracovní kopii zálohy, aby její původní uložený obsah zůstal zachovaný.

Offline přepínač správce nemusí omezit síť vlastního instalačního nebo build skriptu, proto závěrečnou funkční zkoušku proveď bez připojení.

Úspěch na původním počítači se starými cache není důkazem obnovy na čistém cíli.

## Související zálohy

[Záloha Gitu](../../vcs/git/backups.md) uchovává zdrojovou historii, [záloha Dockeru](../../virtualization/docker/index.md) image a provozní data kontejnerů.

Pro dlouhodobý archiv více projektů lze využít také spravovaný lokální feed nebo balíčkový registr s vlastní zálohou; běžná pracovní cache sama nezaručuje trvalou dostupnost.
