---
canonical_for: system-architecture
status: not-initialized
last_verified: null
owner: architecture
---

# Architektura systému

> `PROJECT-INIT`: Tento dokument musí vzniknout až po důkladném průzkumu projektu a relevantních zdrojů.
>
> `PROJECT-INIT`: Odstraň výukové poznámky po nahrazení skutečným obsahem.

Tento dokument je jediným kanonickým popisem architektury projektu.

Funkční význam systému je definovaný v [`../product/requirements.md`](../product/requirements.md).

Důvody významných voleb jsou zaznamenané v [`decisions/`](decisions/README.md).

## Stav architektonických tvrzení

Tvrzení v tomto dokumentu používají kanonické stavy definované v části [`Stav tvrzení`](../governance/documentation.md#stav-tvrzení).

Při inicializaci označ pozorovaný stav, přijatý cíl a dočasné odchylky přesně podle uvedeného pravidla.

## 1. Účel architektury a kvalitativní cíle

Popiš pouze technické důsledky produktového záměru.

Požadavky zde nekopíruj a odkazuj na jejich stabilní identifikátory.

| Priorita | Kvalitativní cíl | Navázaný požadavek | Jak architektura podporuje ověření |
|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `QLT-…` | `PROJECT-INIT` |

## 2. Omezení

Zapiš ověřená organizační, technická, provozní, bezpečnostní a regulatorní omezení.

Preference bez doloženého původu neoznačuj jako omezení.

| Omezení | Původ | Dopad | Stav |
|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | Skutečnost nebo záměr |

## 3. Kontext a hranice systému

Popiš, co je uvnitř odpovědnosti systému a co je vnější závislost.

U každé vnější vazby uveď vlastnictví, protokol, důvěryhodnost, dostupnost a očekávané chování při selhání.

> `PROJECT-INIT`: Doplň Mermaid diagram systémového kontextu pouze tehdy, když vztahy urychlí pochopení.
>
> Text pod diagramem musí zůstat úplný i bez jeho vykreslení.

| Aktér nebo systém | Směr komunikace | Účel | Rozhraní | Vlastník | Selhání a náhrada |
|---|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## 4. Strategie řešení

Vysvětli několik nejdůležitějších principů, které spojují požadavky s celkovým technickým řešením.

Nevypisuj zde detailní konfiguraci ani seznam knihoven.

Na významná rozhodnutí odkazuj pomocí ADR.

- `PROJECT-INIT`

## 5. Stavební bloky a pravidla závislostí

Popiš moduly podle jejich odpovědnosti a veřejných hranic.

Rozliš logickou odpovědnost od fyzického adresáře.

Uveď povolený směr závislostí a zakaž cykly, které by narušily vlastnictví.

| Blok | Odpovědnost | Veřejná hranice | Povolené závislosti | Vlastník dat |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

> `PROJECT-INIT`: Doplň Mermaid diagram bloků nebo závislostí, pokud tabulka neukáže vztahy dostatečně rychle.

## 6. Klíčové běhové scénáře

Zdokumentuj pouze scénáře, které odhalují důležité pořadí, souběh, transakční hranice, asynchronní zpracování nebo chování při chybě.

Běžné produktové kroky zůstávají v požadavcích.

| Scénář | Navázaný požadavek | Konzistenční hranice | Selhání a zotavení |
|---|---|---|---|
| `PROJECT-INIT` | `REQ-…` | `PROJECT-INIT` | `PROJECT-INIT` |

> `PROJECT-INIT`: Pro pořadí komunikace použij Mermaid sequence diagram.
>
> Pro životní cyklus použij Mermaid state diagram.

## 7. Data a jejich životní cyklus

Popiš autoritativní úložiště, vlastnictví dat, identitu, konzistenci, migrace, retenci, zálohování a mazání.

Schéma databáze nebo API zůstává kanonické ve svém strojově čitelném zdroji a zde se uvádí pouze jeho architektonický význam a odkaz.

| Datová oblast | Autoritativní zdroj | Vlastník | Konzistence | Retence a mazání | Migrace |
|---|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## 8. Nasazení a provozní topologie

Popiš prostředí, běhové jednotky, síťové hranice, stavové služby a způsob škálování.

Přesné kroky nasazení patří do [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

Provozní zásahy patří do [`../operations/runbook.md`](../operations/runbook.md).

| Prostředí | Běhové jednotky | Stav | Síťová hranice | Škálování | Pozorovatelnost |
|---|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

> `PROJECT-INIT`: Doplň Mermaid deployment nebo flowchart diagram, pokud topologie obsahuje více hranic nebo prostředí.

## 9. Průřezové koncepty

Uveď jednotné přístupy pouze k tématům, která prostupují více stavebními bloky.

Patří sem například autentizace, autorizace, validace, konfigurace, chyby, čas, identifikátory, audit, lokalizace, observabilita a správa tajemství.

Detail jednoho modulu patří k jeho lokální dokumentaci, pokud ji skutečně potřebuje.

| Koncept | Kanonický princip | Vynucení | Výjimky |
|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | Odkaz na ADR nebo žádné |

## 10. Bezpečnost a ochrana dat

Zaznamenej důvěryhodnostní hranice, citlivá aktiva, hlavní hrozby a architektonická opatření.

Podrobný model hrozeb může být samostatný kanonický dokument pouze tehdy, když jeho rozsah opodstatňuje vlastníka a životní cyklus.

| Aktivum nebo hranice | Hrozba | Opatření | Zbytkové riziko | Ověření |
|---|---|---|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## 11. Známá rizika, dluh a přechodové stavy

Zaznamenej pouze architektonicky významné položky.

Detail realizace může být v issue trackeru, ale zde musí zůstat význam, dopad a vazba na cílový stav.

| ID | Skutečnost nebo přechod | Dopad | Cílový záměr | Vlastník | Podmínka uzavření |
|---|---|---|---|---|---|
| `ARCH-RISK-001` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` | `PROJECT-INIT` |

## 12. Architektonický slovník

| Termín | Kanonický technický význam |
|---|---|
| `PROJECT-INIT` | `PROJECT-INIT` |

## Pravidlo aktualizace

Tento dokument se aktualizuje ve stejné změně jako zásah do hranic modulů, toku dat, běhových scénářů, nasazení, bezpečnosti, veřejného rozhraní nebo významného kvalitativního opatření.

Rozsáhlý dokument se smí rozdělit pouze podle nepřekrývajících se oblastí vlastnictví a po aktualizaci [`../index.md`](../index.md).
