---
canonical_for: decision-0002-public-docfx-build
status: accepted
date: 2026-08-28
last_verified: 2026-08-28
owners:
  - engineering
  - delivery
supersedes: null
superseded_by: null
---

# ADR-0002: Bezpečný a reprodukovatelný veřejný DocFX build

## Kontext

Projekt v jednom repozitáři uchovává veřejné články i interní kanonickou dokumentaci, agentní instrukce a dočasné pracovní záznamy.

Původní glob DocFX a původní průchod generátoru nerozlišovaly tyto dvě odpovědnosti.

Baseline dne 2026-08-28 proto sestavil 24 interních HTML stránek a `docs:check` odmítl interní soubory jako veřejné stránky bez navigace.

Build zároveň závisel na globálně instalovaném plovoucím DocFX a workflow měnilo zdrojovou větev před publikováním.

Rozhodnutí chrání `REQ-E002`, `QLT-002` a `QLT-003` z [`product/requirements.md`](../../product/requirements.md) a hranice popsané v [`architecture/overview.md`](../overview.md).

## Rozhodovací kritéria

- Veřejný artefakt nesmí obsahovat interní dokumentaci ani pracovní metadata.
- Lokální vývoj a GitHub Actions musí používat stejný projektový build kontrakt.
- Verze runtime, SDK a DocFX musí mít strojově čitelnou autoritu v repozitáři.
- Warning, chybějící veřejná stránka nebo interní výstup musí zastavit publikování.
- Řešení nesmí zavést serverový runtime ani novou aplikační závislost.

## Výzkumné podklady

| Tvrzení nebo kritérium | Zdroj a verze | Datum ověření | Co podklad ukazuje | Omezení |
|---|---|---|---|---|
| Původní hranice zveřejňuje interní soubory | Projektový baseline: `npm run docs:check`, `npm run docs:build` a `_site/manifest.json` | 2026-08-28 | Kontrola skončila kódem 1 a build vytvořil 24 interních HTML stránek | Pozorování platí pro výchozí commit a je po nápravě historickým důkazem |
| DocFX lze spouštět jako .NET tool a strict build | [DocFX Quick Start](https://dotnet.github.io/docfx/) a [DocFX 2.78.5](https://github.com/dotnet/docfx/releases/tag/v2.78.5) | 2026-08-28 | DocFX je vhodný pro statický Markdown web a verze 2.78.5 podporuje .NET 10 | Oficiální quick start preferuje jednoduchou globální instalaci, nikoli projektové pinning pravidlo |
| Projekt může vlastnit přesnou verzi nástroje a SDK | [Microsoft: .NET tools](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) a [`global.json`](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) | 2026-08-28 | Lokální tool manifest a `global.json` jsou commitnutelné autority obnovitelné v CI | Obnovení nástroje vyžaduje důvěru v NuGet zdroj a síť nebo cache |
| CI závislosti a token mají být omezené | [GitHub: Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) | 2026-08-28 | GitHub doporučuje nejmenší oprávnění a full commit SHA pro immutable action | Branch-push deployment stále dočasně vyžaduje `contents: write` |
| Zvolená kombinace funguje na tomto projektu | Lokální experiment s Node.js 24.13.0, .NET SDK 10.0.301 a DocFX 2.78.5 | 2026-08-28 | Strict build zpracoval 99 veřejných stránek s 0 warningy a artifact check potvrdil 231 zdrojů a 472 souborů | Vzdálený linuxový běh bude potvrzený až GitHub Actions |

Výzkum splňuje požadavky v [`research.md`](../../governance/research.md) kombinací projektových důkazů, primárních zdrojů a lokálního experimentu.

## Zvažované varianty

### Varianta A: Ponechat široké globy a globální nástroje

Varianta má nejmenší změnu konfigurace, ale interní obsah by dál závisel na implicitním chování globu a čistý runner by mohl použít jinou verzi DocFX.

Riziko zveřejnění a nereprodukovatelnosti je nepřijatelné.

### Varianta B: Vyloučit známé interní cesty pouze v DocFX

Varianta zabrání právě pozorovanému výstupu, ale generátor by interní Markdown dál normalizoval a žádná kontrola by neodhalila nový interní typ cesty nebo stale artefakt.

Návrat je snadný, ale ochrana není úplná.

### Varianta C: Jeden explicitní a ověřovaný build kontrakt

Generátor i DocFX používají shodnou explicitní klasifikaci veřejné hranice.

Projekt připíná Node.js, .NET SDK a lokální DocFX, sestavuje s warningy jako chybami a po buildu kontroluje manifest i fyzický výstup.

Stejné npm profily používá lokální vývoj i CI.

## Rozhodnutí

Přijímáme variantu C.

`scripts/generate-docs.js` ignoruje interní kořenové adresáře, projektové README a agentní instrukce a exportuje stejnou klasifikaci pro testy a kontrolu artefaktu.

`docfx.json` explicitně vylučuje stejné oblasti ze vstupního globu.

`package.json`, `global.json` a `.config/dotnet-tools.json` vlastní podporované verze a vstupní příkazy.

`npm run docs:build` vždy odstraní pouze odvozený `_site/`, provede strict DocFX build a ověří celý nový artefakt.

GitHub Actions obnoví deklarovaný toolchain a volá `npm run verify` bez alternativní build logiky.

Současný branch-push deployment zůstává přechodně zachovaný kvůli neověřenému živému nastavení GitHub Pages a je evidovaný jako `ARCH-RISK-002`.

## Důsledky

### Pozitivní

- Interní projektové informace mají testovanou negativní publikační hranici.
- Lokální a CI build používají stejné verze a příkazy.
- Build s warningem, chybějící stránkou nebo stale interním výstupem nemůže projít.
- Zdrojová větev už není automaticky měněná při publikování.

### Negativní

- První obnova DocFX vyžaduje síť nebo připravenou NuGet cache.
- Upgrade Node.js, .NET SDK nebo DocFX vyžaduje koordinovanou změnu manifestů a opakování celé regrese.
- Každý nový interní kořenový typ musí být přidaný do explicitní klasifikace i DocFX exclusions.

### Rizika a opatření

| Riziko | Pravděpodobnost nebo dopad | Opatření | Ověření |
|---|---|---|---|
| Nová interní cesta není klasifikovaná | Střední pravděpodobnost, vysoký dopad | Review změn obsahové hranice a negativní test pro každý nový typ | `npm test` a `npm run docs:artifact-check` |
| Připnutá verze zastará nebo obsahuje závadu | Střední pravděpodobnost, střední dopad | Pravidelný řízený upgrade z primárních zdrojů | `dotnet tool restore` a `npm run verify` na podporovaných platformách |
| Branch-push action má širší token než build potřebuje | Nízká pravděpodobnost, vysoký dopad | Full SHA, checkout bez credentials a plán odděleného deploy jobu | Workflow review a uzavření `ARCH-RISK-002` |
| Case-only migrace přeruší historický přímý odkaz | Neověřená pravděpodobnost, střední dopad | Evidovat změněné cesty a ověřit živé URL před rozhodnutím o redirectech | `ARCH-RISK-001` a vzdálený smoke |

## Migrace a kompatibilita

Nejdříve se oddělila interní hranice generátoru a DocFX a přidaly se negativní testy.

Poté generátor dokončil pět již deklarovaných case-only migrací na lowercase a test ověřil přesný casing v souborovém systému.

Následně byly přidány strojové autority nástrojů a lokálně reprodukovatelný CI profil.

Publikační workflow zachovává větev `gh-pages`, takže nevyžaduje okamžitou změnu GitHub Pages settings.

Datová migrace ani rollback schématu nejsou potřebné, protože web je plně odvozený ze zdrojů v Gitu.

## Ověření rozhodnutí

- `npm run docs:check` prokazuje deterministickou navigaci, platné lokální odkazy a žádný generovaný drift.
- `npm test` chrání veřejnou hranici, přesný casing, kanonická metadata a interní odkazy.
- `npm run docs:build` čistí pouze `_site/`, sestavuje s `--warningsAsErrors` a kontroluje artefakt.
- `npm run verify` je jediný souhrnný profil pro lokální vývoj i GitHub Actions.
- První vzdálený quality a publish běh po přijetí změny musí potvrdit linuxový runner a živé Pages nastavení.

## Stav a nahrazení

Rozhodnutí je přijaté.

Případnou změnu veřejné hranice, build toolchainu nebo distribučního modelu zaznamená nový ADR, který tento záznam výslovně nahradí podle [`README.md`](README.md).
