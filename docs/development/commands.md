---
canonical_for: project-commands
status: not-initialized
last_verified: null
owner: engineering
---

# Projektové příkazy

> `PROJECT-INIT`: Nahraď šablonu přesnými ověřenými příkazy z konkrétního projektu.
>
> `PROJECT-INIT`: Nevkládej domnělé příkazy pouze podle použitého jazyka.

Tento dokument je kanonickým lidským rozhraním pro lokální sestavení, spuštění, kontroly a testování.

Skripty, manifesty a build konfigurace zůstávají kanonické pro prováděnou strojovou logiku.

Zde se uvádí jejich podporovaný způsob vyvolání, pracovní adresář, požadavky a očekávaný výsledek.

## Požadované prostředí

| Nástroj nebo služba | Podporovaná verze | Kanonický zdroj verze | Lokální nebo řízená dostupnost | Ověření |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | Odkaz na manifest nebo konfiguraci | `PROJECT-INIT` | `PROJECT-INIT` |

Verzi nekopíruj do této tabulky, pokud ji lze jednoznačně načíst ze strojového souboru.

V takovém případě uveď pouze odkaz na tento zdroj a příkaz pro ověření.

## Inicializace prostředí

| Účel | Pracovní adresář | Přesný příkaz | Očekávaný výsledek | Síťové požadavky |
|---|---|---|---|---|
| Obnovení řízeného prostředí | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Sestavení

| Varianta | Pracovní adresář | Přesný příkaz | Výstup | Úspěch znamená |
|---|---|---|---|---|
| Vývojové sestavení | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Produkční sestavení | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Spuštění

| Scénář | Pracovní adresář | Přesný příkaz | Adresa nebo rozhraní | Bezpečné zastavení |
|---|---|---|---|---|
| Hlavní lokální běh | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

Konfiguraci a tajemství zde nekopíruj.

Odkazuj na jejich kanonický zdroj a uveď bezpečný způsob přípravy lokálního prostředí.

## Statické kontroly

| Kontrola | Přesný příkaz | Rozsah | Oprava formátu | Očekávaný výsledek |
|---|---|---|---|---|
| Formát | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Lint | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Typy nebo kompilace | `PROJECT-INIT` | `PROJECT-INIT` | — | `PROJECT-INIT` |
| Dokumentace | `PROJECT-INIT` | `PROJECT-INIT` | — | `PROJECT-INIT` |

## Testy

Strategie výběru testů je v [`../quality/testing.md`](../quality/testing.md).

Zde jsou pouze přesné podporované příkazy.

| Úroveň | Přesný příkaz | Potřebné služby | Výstupní artefakty | Typická doba nebo rozsah |
|---|---|---|---|---|
| Cílený test | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Automatizované testy | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Vizuální scénáře | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Integrační nebo end-to-end | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |
| Úplná lokální kontrola | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Reprezentativní smoke scénář

Popiš nejkratší podporovaný postup, který prokáže, že systém po sestavení skutečně funguje.

Nevkládej zde produktové akceptační znění.

Odkazuj na odpovídající `REQ-*` a uveď pouze technický způsob spuštění a pozorování.

| Požadavek | Příprava | Kroky nebo příkaz | Očekávaný technický důkaz | Úklid |
|---|---|---|---|---|
| `REQ-…` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## Shoda lokálního prostředí a CI

CI musí používat stejné projektové vstupní příkazy jako lokální vývoj.

Workflow nesmí obsahovat skrytou alternativní sestavovací logiku, kterou nelze lokálně zopakovat.

Platformní obal, cache a publikování patří do [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

## Pravidlo ověření

Příkaz se do tohoto dokumentu zapíše až po skutečném spuštění v podporovaném prostředí.

Při změně skriptu, manifestu, verze nástroje nebo názvu cíle se tento dokument aktualizuje ve stejné změně.
