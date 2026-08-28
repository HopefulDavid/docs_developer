---
canonical_for: operations-runbook
status: accepted
last_verified: 2026-08-28
owner: operations
---

# Provozní runbook

Tento dokument je kanonickým vstupem pro bezpečný provoz, diagnostiku, obnovu a předání služby.

Nekopíruje architekturu ani deployment workflow.

Odkazuje na ně a popisuje konkrétní provozní rozhodovací kroky.

## Odpovědnost a kritičnost

| Vlastnost | Hodnota |
|---|---|
| Provozní vlastník | Maintainers a vlastník GitHub repozitáře |
| Eskalační kontakt nebo kanál | Vlastník repozitáře; samostatný veřejný provozní kanál není v projektu deklarovaný |
| Kritičnost služby | Nízká až střední; výpadek omezuje přístup ke znalostní bázi, ale neblokuje transakční ani bezpečnostní službu |
| Podporovaná prostředí | Odkaz na [`../delivery/ci-cd.md`](../delivery/ci-cd.md) |
| Hlavní uživatelské scénáře | `REQ-001` a `REQ-002` v [`../product/requirements.md`](../product/requirements.md) |
| Cíle dostupnosti a obnovy | Číselné SLO, RPO ani RTO nejsou přijaté; reprodukovatelnost a integritu chrání `QLT-002` a `QLT-003` |

## Ověření zdraví

| Kontrola | Jak ji provést | Zdravý výsledek | Typické selhání | Další krok |
|---|---|---|---|---|
| Zdroj a build | V kořeni spusť `dotnet tool restore` a `npm run verify` podle dokumentu příkazů | Vše skončí kódem 0, DocFX má 0 warningů a artifact check potvrdí veřejnou hranici | Drift navigace, test, warning DocFX nebo chybějící výstup | Oprav první konkrétní chybu v konzolovém výstupu a profil zopakuj |
| Lokální čtenářský tok | Spusť `npm run docs:serve`, otevři homepage, tematický článek a vyhledávání | Stránky se zobrazí, navigace funguje a vyhledávání vrátí očekávaný typ výsledku | Chyba šablony, stale `_site/` nebo klientský JavaScript | Znovu proveď čistý build a zkontroluj browser konzoli |
| Produkční dostupnost | Otevři veřejnou Pages URL z nastavení repozitáře a zopakuj `REQ-001` | Poslední ověřený web odpovídá očekávanému commitu `main` | Pages nebo publish workflow je nedostupné či zastaralé | Zkontroluj poslední běh `Publikování dokumentace` a větev `gh-pages` |

Health check nesmí vracet úspěch pouze proto, že proces běží, pokud hlavní schopnost není použitelná.

Kontrola zároveň nesmí zbytečně způsobovat drahé nebo destruktivní operace.

## Pozorovatelnost

| Signál | Kanonický zdroj | Co znamená | Retence | Citlivost |
|---|---|---|---|---|
| Logy | Konzolový výstup lokálních příkazů a GitHub Actions log | Obnova nástrojů, testy, build a deployment | Podle GitHub nastavení; lokální log se standardně nearchivuje | Nesmí obsahovat hodnotu `GITHUB_TOKEN` ani soukromý obsah |
| Metriky | Nejsou nakonfigurované | Projekt nemá přijaté provozní SLO ani vlastní runtime | Není relevantní | Znovu posoudit při přijetí dostupnostního cíle nebo analytiky |
| Trasování | Není použitelné | Statický web nemá serverový požadavek ani distribuovanou transakci | Není relevantní | Znovu posoudit při zavedení backendu |
| Audit | Git historie zdroje, workflow běhy a aktuální deployment commit `gh-pages` | Který commit změnil zdroj, prošel kontrolou a je právě publikovaný | Zdroj podle Git historie; běhy podle GitHub nastavení; `gh-pages` uchovává pouze poslední deployment | Commit metadata jsou veřejná podle viditelnosti repozitáře |

Uveď stabilní identifikátory, podle kterých lze propojit požadavek, uživatele v bezpečném rozsahu, job nebo transakci.

Do logů a trace neukládej tajemství ani data, která nejsou nutná pro provozní účel.

## Nejčastější diagnostické stromy

Každý postup začíná symptomem pozorovatelným uživatelem nebo monitoringem.

Kroky mají být bezpečné, ověřitelné a seřazené od nejméně invazivních.

Příkaz odkazuj na [`../development/commands.md`](../development/commands.md) nebo na řízený provozní nástroj místo kopírování jeho implementace.

### Symptom: Veřejný web je nedostupný nebo neodpovídá poslední změně

1. Ověř veřejnou URL a zaznamenej konkrétní HTTP nebo vizuální symptom bez změny vzdáleného stavu.
2. Zkontroluj poslední běh workflow `Publikování dokumentace`, jeho zdrojový commit a poslední deployment commit v `gh-pages`.
3. Na odpovídajícím zdrojovém commitu spusť `dotnet tool restore` a `npm run verify`.
4. Pokud lokální build projde, zkontroluj stav GitHub Pages a obecný incident GitHubu; pokud selže, pokračuj od prvního lokálního důkazu.

**Potvrzení příčiny:** příčina je potvrzená až shodou symptomu s neúspěšným krokem, rozdílným zdrojovým commitem nebo doloženým incidentem platformy.

**Bezpečná náprava:** oprav nebo revertuj vadný zdroj na standardní větvi, nech projít quality a znovu spusť podporované publikování; neupravuj sestavené HTML ručně jako nový zdroj pravdy.

**Eskalace:** vlastník repozitáře řeší oprávnění, Pages settings a ruční workflow; doložený incident platformy se eskaluje na GitHub podle jeho podpory.

## Zálohování a obnova

| Datová oblast | Způsob zálohy | Frekvence | Retence | Šifrování | Poslední ověřená obnova |
|---|---|---|---|---|---|
| Zdrojové články, konfigurace a projektová dokumentace | Distribuovaná Git historie a vzdálený GitHub repozitář | Při každém commitu a pushi | Podle Git historie projektu | Přenos přes SSH/HTTPS a ochrana GitHub účtu | 2026-08-28: lokální checkout vytvořil čistý ověřený web z deklarovaných zdrojů |
| Publikovaný statický web | Nezálohuje se jako autoritativní data; znovu se sestavuje ze zdrojového commitu | Při každém publish běhu | Pouze poslední kořenový commit `gh-pages`; starší stav se znovu publikuje ze zdroje | GitHub platforma | 2026-08-28: lokální reprodukce vytvořila 99 HTML stránek bez warningu |

Projekt neukládá uživatelská ani serverová data, takže obnova neobsahuje databázovou konzistenci nebo datovou migraci.

Pokud se přijme číselný RPO nebo RTO, musí vzniknout odpovídající `QLT-*` a tento postup se znovu ověří.

## Rollback a bezpečné pokračování

Popiš, kdy je bezpečné vrátit aplikaci, kdy je nutné roll-forward a jak se posuzuje kompatibilita dat.

Deployment kroky jsou v [`../delivery/ci-cd.md`](../delivery/ci-cd.md).

Zde je provozní rozhodnutí a ověření výsledku.

| Situace | Preferovaná akce | Datové omezení | Ověření | Eskalace |
|---|---|---|---|---|
| Vadný článek, navigace nebo šablona po publikování | Revertovat nebo opravit zdrojový commit a znovu publikovat | Žádné stavové datové schéma | `npm run verify` a produkční smoke `REQ-001` | Vlastník repozitáře při blokovaném merge nebo workflow |
| Neúspěšný publish po úspěšném buildu | Zachovat poslední funkční `gh-pages`, odstranit příčinu a použít roll-forward | Nepřepisovat ručně zdrojovou větev ani token | GitHub Actions log a dostupnost předchozího webu | Vlastník GitHub Pages settings |
| Kompromitovaný nebo podezřelý workflow běh | Zastavit další publish, zrušit běh a posoudit token i použité action SHA | Rotaci automatického tokenu řídí GitHub; zkontrolovat oprávnění repozitáře | Audit workflow, commitů a GitHub security logu | Vlastník repozitáře a GitHub podpora podle dopadu |

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
