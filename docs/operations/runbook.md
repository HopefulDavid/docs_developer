---
canonical_for: operations-runbook
status: not-initialized
last_verified: null
owner: operations
---

# Provozní runbook

> `PROJECT-INIT`: Vyplň pro službu, aplikaci nebo jiný projekt s provozní odpovědností.
>
> `PROJECT-INIT`: U čisté knihovny nastav stav `not-applicable`, uveď důvod a odkaz na distribuční nebo podpůrný proces.

Tento dokument je kanonickým vstupem pro bezpečný provoz, diagnostiku, obnovu a předání služby.

Nekopíruje architekturu ani deployment workflow.

Odkazuje na ně a popisuje konkrétní provozní rozhodovací kroky.

## Odpovědnost a kritičnost

| Vlastnost | Hodnota |
|---|---|
| Provozní vlastník | `PROJECT-INIT` |
| Eskalační kontakt nebo kanál | `PROJECT-INIT` |
| Kritičnost služby | `PROJECT-INIT` |
| Podporovaná prostředí | Odkaz na [`../delivery/ci-cd.md`](../delivery/ci-cd.md) |
| Hlavní uživatelské scénáře | Odkazy na `REQ-*` |
| Cíle dostupnosti a obnovy | Odkazy na `QLT-*` |

## Ověření zdraví

Popiš nejrychlejší bezpečné pořadí, kterým lze rozlišit zdravou službu od částečného nebo úplného selhání.

| Kontrola | Jak ji provést | Zdravý výsledek | Typické selhání | Další krok |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

Health check nesmí vracet úspěch pouze proto, že proces běží, pokud hlavní schopnost není použitelná.

Kontrola zároveň nesmí zbytečně způsobovat drahé nebo destruktivní operace.

## Pozorovatelnost

| Signál | Kanonický zdroj | Co znamená | Retence | Citlivost |
|---|---|---|---|---|
| Logy | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Metriky | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Trasování | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Audit | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

Uveď stabilní identifikátory, podle kterých lze propojit požadavek, uživatele v bezpečném rozsahu, job nebo transakci.

Do logů a trace neukládej tajemství ani data, která nejsou nutná pro provozní účel.

## Nejčastější diagnostické stromy

Každý postup začíná symptomem pozorovatelným uživatelem nebo monitoringem.

Kroky mají být bezpečné, ověřitelné a seřazené od nejméně invazivních.

Příkaz odkazuj na [`../development/commands.md`](../development/commands.md) nebo na řízený provozní nástroj místo kopírování jeho implementace.

### Symptom: `PROJECT-INIT`

1. `PROJECT-INIT`
2. `PROJECT-INIT`
3. `PROJECT-INIT`

**Potvrzení příčiny:** `PROJECT-INIT`

**Bezpečná náprava:** `PROJECT-INIT`

**Eskalace:** `PROJECT-INIT`

## Zálohování a obnova

| Datová oblast | Způsob zálohy | Frekvence | Retence | Šifrování | Poslední ověřená obnova |
|---|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

Záloha bez ověřené obnovy není dostatečný důkaz obnovitelnosti.

Obnovovací test používá bezpečné prostředí a ověřuje integritu i použitelnost dat.

RPO a RTO musí odkazovat na přijatý kvalitativní požadavek.

## Rollback a bezpečné pokračování

Popiš, kdy je bezpečné vrátit aplikaci, kdy je nutné roll-forward a jak se posuzuje kompatibilita dat.

Deployment kroky jsou v [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

Zde je provozní rozhodnutí a ověření výsledku.

| Situace | Preferovaná akce | Datové omezení | Ověření | Eskalace |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Incident

Při incidentu nejprve chraň uživatele, data a bezpečnost.

Zaznamenej čas, pozorovaný dopad, změny stavu a provedené zásahy.

Neprováděj několik nevratných zásahů současně bez možnosti určit jejich účinek.

Po stabilizaci zachovej potřebné důkazy a vytvoř navazující analýzu podle procesu projektu.

| Fáze | Povinný výstup |
|---|---|
| Detekce | Symptom, čas, rozsah a zdroj signálu |
| Omezení dopadu | Provedený bezpečný krok a jeho výsledek |
| Diagnostika | Potvrzená nebo pracovní hypotéza s důkazy |
| Obnova | Stav služby, dat a uživatelských scénářů |
| Následná práce | Příčina, preventivní opatření, vlastník a ověření |

## Údržba runbooku

Každý incident, cvičení obnovy, změna topologie nebo změna pozorovatelnosti musí posoudit aktuálnost tohoto runbooku.

Postup, který při skutečném použití nefungoval, se opraví ve stejné změně jako nápravné opatření.

Citlivé provozní údaje se ukládají v řízeném systému a zde zůstává bezpečný odkaz nebo způsob získání.
