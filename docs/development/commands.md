---
canonical_for: project-commands
status: accepted
last_verified: 2026-08-28
owner: engineering
---

# Projektové příkazy

Tento dokument je kanonickým lidským rozhraním pro lokální sestavení, spuštění, kontroly a testování.

Skripty, manifesty a build konfigurace zůstávají kanonické pro prováděnou strojovou logiku.

Zde se uvádí jejich podporovaný způsob vyvolání, pracovní adresář, požadavky a očekávaný výsledek.

## Požadované prostředí

| Nástroj nebo služba | Podporovaná verze | Kanonický zdroj verze | Lokální nebo řízená dostupnost | Ověření |
|---|---|---|---|---|
| Node.js | Přesná verze v [`package.json`](../../package.json) | [`package.json`](../../package.json) | Lokální instalace; GitHub Actions ji obnovuje přes `setup-node` | `node --version` |
| npm | Verze dodaná podporovanou instalací Node.js | Distribuce Node.js; projekt nemá npm závislosti ani lockfile | Lokální instalace a GitHub runner | `npm --version` |
| .NET SDK | Přesná verze a roll-forward pravidlo v [`global.json`](../../global.json) | [`global.json`](../../global.json) | Lokální instalace; GitHub Actions ji obnovuje přes `setup-dotnet` | `dotnet --version` |
| DocFX | Přesná verze v [`.config/dotnet-tools.json`](../../.config/dotnet-tools.json) | [`.config/dotnet-tools.json`](../../.config/dotnet-tools.json) | Lokální .NET tool obnovený do řízené cache | `dotnet tool run docfx -- --version` |
| Git | Libovolná udržovaná verze podporující projektový workflow | Git instalace a [`workflow.md`](workflow.md) | Lokální | `git --version` |

Verzi nekopíruj do této tabulky, pokud ji lze jednoznačně načíst ze strojového souboru.

V takovém případě uveď pouze odkaz na tento zdroj a příkaz pro ověření.

## Inicializace prostředí

| Účel | Pracovní adresář | Přesný příkaz | Očekávaný výsledek | Síťové požadavky |
|---|---|---|---|---|
| Obnovení připnutého DocFX | Kořen repozitáře | `dotnet tool restore` | Příkaz obnoví přesnou verzi z tool manifestu a skončí kódem 0 | První obnova vyžaduje NuGet nebo odpovídající cache |

Projekt nemá npm balíčky, proto se před běžným ověřením nespouští `npm install`.

Pokud přibude npm závislost, musí ve stejné změně vzniknout odpovídající lockfile a tento postup se znovu ověří.

## Sestavení

| Varianta | Pracovní adresář | Přesný příkaz | Výstup | Úspěch znamená |
|---|---|---|---|---|
| Strict lokální sestavení | Kořen repozitáře | `npm run docs:build` | Čistý adresář `_site/` | DocFX skončí s 0 warningy a 0 chybami a artifact check potvrdí veřejnou hranici |
| Samotná kompilace pro diagnostiku | Kořen repozitáře | `npm run docs:compile` | Adresář podle [`docfx.json`](../../docfx.json) | DocFX skončí s 0 warningy a 0 chybami; příkaz sám nečistí ani nekontroluje stale výstup |

`npm run docs:build` je jediný podporovaný kandidát pro publikování.

Před kompilací odstraní pouze odvozený ignorovaný `_site/` a po kompilaci ověří manifest i fyzické výstupní cesty.

## Spuštění

| Scénář | Pracovní adresář | Přesný příkaz | Adresa nebo rozhraní | Bezpečné zastavení |
|---|---|---|---|---|
| Hlavní lokální běh | Kořen repozitáře po úspěšném buildu | `npm run docs:serve` | `http://127.0.0.1:4173` | `Ctrl+C` v terminálu se serverem |

Lokální server nevyžaduje tajemství ani externí službu.

Pokud je port `4173` obsazený, příkaz skončí chybou a běžící cizí proces se automaticky neukončuje.

Pro jednorázové použití jiného volného portu předej DocFX argumenty například jako `npm run docs:serve -- --port 49673` a otevři odpovídající adresu na `127.0.0.1`.

## Statické kontroly

| Kontrola | Přesný příkaz | Rozsah | Oprava formátu | Očekávaný výsledek |
|---|---|---|---|---|
| Generovaný drift, veřejná navigace a lokální odkazy | `npm run docs:check` | Veřejné Markdown stránky, cesty, indexy a TOC | `npm run docs:generate` | Kód 0 a výstup `Dokumentace je aktuální.` |
| JavaScript syntax | `npm run lint` | Generátor, aktivní browserový modul a testy | Ruční oprava zdroje | Všechny `node --check` kroky skončí kódem 0 |
| Kanonická projektová metadata a interní odkazy | `npm test` | Dokumentační metadata, veřejná hranice, casing, interní odkazy a agentní adaptér | Ruční oprava kanonického zdroje | Všechny Node testy projdou |
| DocFX strict kompilace | `npm run docs:compile` | Povolené veřejné vstupy a aktivní šablona | — | 0 warningů a 0 chyb |

Projekt nemá samostatný typový systém ani obecný formátovací nástroj.

Generátor normalizuje pouze veřejný Markdown ve svém vlastním rozsahu a nesmí upravovat kanonické projektové dokumenty.

## Testy

Strategie výběru testů je v [`../quality/testing.md`](../quality/testing.md).

Zde jsou pouze přesné podporované příkazy.

| Úroveň | Přesný příkaz | Potřebné služby | Výstupní artefakty | Typická doba nebo rozsah |
|---|---|---|---|---|
| Cílený test veřejné hranice | `node --test --test-isolation=none tests/generate-docs.test.js` | Žádné | Konzolový TAP výstup | 4 testy; běžně pod 1 sekundu |
| Automatizované testy | `npm test` | Žádné | Konzolový TAP výstup | Všechny soubory v `tests/`; běžně pod 1 sekundu |
| Vizuální scénáře | `npm run docs:serve` a kroky níže | Předem vytvořený `_site/` a lokální prohlížeč | Vizuální pozorování, případně screenshot | Ruční smoke po rizikové změně UI, vyhledávání nebo navigace |
| Integrační build | `npm run docs:build` | Obnovený lokální DocFX | `_site/manifest.json`, HTML a konzolový souhrn | 99 veřejných HTML stránek; běžně jednotky sekund na ověřeném stroji |
| Úplná lokální kontrola | `npm run verify` | Obnovený lokální DocFX | TAP, DocFX log, manifest a `_site/` | Kontrola driftu, syntax, testy, strict build a artifact check |

## Reprezentativní smoke scénář

| Požadavek | Příprava | Kroky nebo příkaz | Očekávaný technický důkaz | Úklid |
|---|---|---|---|---|
| `REQ-001`, `REQ-002` | `dotnet tool restore` a `npm run verify` | Spusť `npm run docs:serve`, otevři `http://127.0.0.1:4173`, přejdi z homepage do tematického článku a vyhledej výraz `Docker` | Homepage, navigace, cílový článek i výsledky vyhledávání jsou viditelné bez konzolové chyby blokující scénář | Ukonči server pomocí `Ctrl+C`; `_site/` lze bezpečně odstranit přes `npm run docs:clean` |
| `REQ-E002` | Žádná | Spusť `node --test --test-isolation=none tests/generate-docs.test.js` | Negativní příklady interních zdrojů a výstupů jsou odmítnuté a test přesného casingu projde | Žádný |

## Shoda lokálního prostředí a CI

CI musí používat stejné projektové vstupní příkazy jako lokální vývoj.

Workflow nesmí obsahovat skrytou alternativní sestavovací logiku, kterou nelze lokálně zopakovat.

Platformní obal, cache a publikování patří do [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

## Pravidlo ověření

Příkaz se do tohoto dokumentu zapíše až po skutečném spuštění v podporovaném prostředí.

Při změně skriptu, manifestu, verze nástroje nebo názvu cíle se tento dokument aktualizuje ve stejné změně.
