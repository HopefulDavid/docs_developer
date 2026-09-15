---
canonical_for: decision-0004-dotnet-sdk-selection
status: accepted
date: 2026-09-13
last_verified: 2026-09-13
owners:
  - engineering
  - delivery
supersedes: ADR-0002-verejny-docfx-build.md
superseded_by: null
---

# ADR-0004: Výběr .NET SDK bez projektového global.json

## Kontext

Přesné připnutí SDK v [`ADR-0002`](ADR-0002-verejny-docfx-build.md) vyžadovalo změnu repozitáře při odstranění starší lokální instalace.

Vlastník projektu zvolil odstranění souboru, aby aktualizace lokálního SDK nevyžadovala editaci projektové konfigurace.

DocFX soubor `global.json` nevyžaduje.

[Architektura](../overview.md) odděluje lokální výběr SDK od řízené instalace v CI.

## Rozhodovací kritéria

- Projekt neobsahuje lokální připnutí SDK ani jeho automaticky generovanou náhradu.
- CI obnovuje stabilní SDK z explicitně zvoleného kanálu.
- Verze samotného DocFX zůstává přesně řízená tool manifestem.
- Zůstává ověřovací profil pro `QLT-002` z [požadavků](../../product/requirements.md).

## Výzkumné podklady

| Tvrzení | Zdroj | Ověřeno | Závěr a omezení |
|---|---|---|---|
| Projektové připnutí je volitelné | [Microsoft: global.json](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) | 2026-09-13 | Bez souboru CLI vybírá nejnovější instalované SDK včetně preview. Ovlivnit jej může soubor v nadřazené složce |
| Starší feature band nemusí mít stejnou životnost jako celý .NET | [Microsoft: životní cyklus SDK](https://learn.microsoft.com/en-us/dotnet/core/porting/versioning-sdk-msbuild-vs#lifecycle) | 2026-09-13 | Udržování přesného staršího SDK vyžaduje další správu. Odstranění připnutí ovšem neaktualizuje lokální instalaci |
| CI může instalovat SDK samostatně | [Připnutá setup-dotnet v6.0.0](https://github.com/actions/setup-dotnet/blob/a98b56852c35b8e3190ac28c8c2271da59106c68/README.md) a [její instalátor](https://github.com/actions/setup-dotnet/blob/a98b56852c35b8e3190ac28c8c2271da59106c68/src/installer.ts) | 2026-09-13 | Podporuje `dotnet-version`, stabilní kvalitu `ga` a vlastní `DOTNET_INSTALL_DIR`. SDK v oddělené instalaci neovlivňují předinstalovaná SDK runneru |
| Odstranění řeší pozorovaný problém | Lokální experiment Windows s minimem 10.0.301 a instalovaným 10.0.401 v oddělených složkách TEMP | 2026-09-13 | `disable` i `latestPatch` skončily chybou chybějícího SDK. Bez souboru se vybralo 10.0.401. Experiment nedokazuje budoucí kompatibilitu DocFX |

Výzkum kombinuje primární dokumentaci, zdroj CI akce, projektové důkazy a spustitelný experiment podle [výzkumného standardu](../../governance/research.md).

## Zvažované varianty

| Varianta | Přínos | Nevýhoda a důvod výběru |
|---|---|---|
| Přesná verze nebo `latestPatch` | Menší rozdíly SDK mezi prostředími | Neřeší přechod mezi feature bandy, který vyvolal tento úkol |
| `latestFeature` se zákazem preview | Automatické použití novější instalace stejné řady a zachovaná hranice kompatibility | Zachovává soubor a omezení lokálních SDK, které vlastník nechce udržovat |
| Odstranění `global.json` | Lokální SDK vybírá instalace počítače bez projektových editací | Přijatá varianta. Připouští další major verze i preview a vyžaduje samostatnou konfiguraci CI |

Všechny varianty lze vrátit změnou konfigurace.

Přijatá varianta odpovídá explicitní preferenci vlastníka.

## Rozhodnutí

Odstraňujeme `global.json`.

Lokální výběr SDK se řídí standardním chováním .NET a [politikou závislostí](../../development/dependencies.md#výběr-net-sdk).

Přesná verze DocFX zůstává v `.config/dotnet-tools.json`.

Obě CI workflow deklarují stabilní instalační kanál přímo a instalují SDK do samostatného adresáře podle [CI dokumentace](../../delivery/ci-cd.md#reprodukovatelnost-a-dostupnost).

Tímto se nahrazuje pouze přesné připnutí SDK z ADR-0002.

Veřejná hranice, přesné verze ostatních nástrojů a publikační model zůstávají platné.

## Důsledky a rizika

Běžná aktualizace nainstalovaného SDK nevyžaduje commit.

Lokální prostředí a CI mohou použít odlišné SDK.

Pro diagnostiku je nutná skutečná verze z logu a případná reprodukce v izolovaném prostředí.

Nové SDK může obsahovat regresi, proto každý ověřovaný build prochází celým `npm run verify` a při problému se použije izolovaná instalace známé funkční verze.

Vlastníkem reakce na regresi je engineering.

Přechod CI na další řadu zůstává řízenou aktualizací.

## Migrace a kompatibilita

Soubor se odstraňuje společně s oběma vstupy `global-json-file` a aktualizací dokumentace, bez nových skriptů, závislostí nebo datové migrace.

Projekt negeneruje dočasný `global.json`.

Kompatibilitu lokálního SDK s DocFX prokazuje skutečná obnova a sestavení.

## Ověření rozhodnutí

`dotnet --version`, `dotnet tool restore` a `npm run verify` potvrzují výběr, obnovu a skutečný build podle [projektových příkazů](../../development/commands.md).

Konkrétní provedené kontroly a jejich omezení vlastní [testovací důkazy](../../quality/testing.md#ověření-výběru-sdk-2026-09-13).

## Stav a nahrazení

Rozhodnutí je přijaté.

Další změna rozsahu SDK používá [životní cyklus ADR](README.md).
