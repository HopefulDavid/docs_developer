---
task_id: WORK-20260912-jednoduche-offline-zalohy
status: active
started: 2026-09-12
last_updated: 2026-09-12
owner: Codex
branch: develop
scope:
  - programming/packages
  - scripts/generate-docs.js
  - local-vcs
---

# Jednoduché offline zálohy a úklid VCS

## Požadovaný výsledek

Zjednodušit offline zálohu a obnovu všech šesti správců a přehledu, zejména .NET tools, bez ztráty funkčnosti.

Odstranit „– offline obnova“ z názvu .NET tools a synchronizovat projekt po vzdáleném merge.

Odstranit nepořádek v místním VCS způsobený testovacími repozitáři.

## Kanonické vstupy

- [Požadavky](../product/requirements.md)
- [Čitelnost](../governance/documentation.md#čitelnost-veřejných-návodů)
- [Workflow](../development/workflow.md)
- [Příkazy](../development/commands.md)
- [Testování](../quality/testing.md)

## Akceptační kritéria

- [x] Každý správce má jasný hlavní postup co zálohovat a jak obnovit bez internetu.
- [x] .NET tools mají krátký název a samostatně pochopitelné větve podle typu instalace.
- [x] Místní main a develop a origin/develop odpovídají merge PR #5, bez přepisu historie.
- [x] Vnořené experimentální repozitáře jsou mimo pracovní projekt.
- [ ] Obsahové zkoušky, projektové testy a vykreslení prošly.

## Výchozí stav a baseline

Čistý develop 8a81d48; fetch odhalil origin/main 0bdc5bd, merge PR #5, a aktualizovanou publikační gh-pages.

Main i develop posunuty fast-forward na 0bdc5bd; npm run verify prošlo 20 testy, strict build 0 varování a 0 chyb, 253 zdrojů a 494 výstupních souborů.

Synchronizovaný develop byl úspěšně odeslán na origin.

## Milníky

| ID | Výsledek | Stav | Důkaz |
|---|---|---|---|
| M1 | Synchronizace VCS | done | Origin/develop a obě místní větve na 0bdc5bd |
| M2 | Jednodušší návody a úklid | done | Sedm návodů sjednoceno na přípravu, přenos a obnovu; experimenty mimo checkout |
| M3 | Obsahové a vizuální ověření | in-progress | 18 obsahových kontrol, skutečný build kopie DocFX, 11 PowerShell bloků a npm run verify prošly; čeká prohlížeč |
| M4 | Přenos a dokončení | pending | — |

## Rozhodnutí a rizika

Uživatel žádá pouze main a develop; lokálně už takové větve jsou, vnořené testovací repozitáře v private/docs-review však mají vlastní větve.

Uživatel výslovně potvrdil zachování vzdálené gh-pages; hosting se nemění.

První přesun private/docs-review a private/npm-r12 do TEMP skončil částečně na přístupu nebo atributu; po kontrole zdroje i cíle jej dokončilo robocopy /E /MOVE /XJ /SL bez chyby.

Přesunuto 5,286 GiB a 83,51 MiB do C:/Users/David/AppData/Local/Temp/docs-developer-checks-20260912-212300; žádné testovací Git větve se neodesílaly na server.

GitHub quality běh 34714004232 pro synchronizovaný develop 0bdc5bd je completed/success.

Budoucí testovací repozitáře a prostředí vytvářet pouze mimo projekt.

Zjednodušené příkazy ověřil nový experiment C:/Users/David/AppData/Local/Temp/dd-simple-0912/proof.py: npm 4, pnpm 4, NuGet a tools 6, Python 1 a Dart 3 úspěšné kontroly.

Obnovy měly nové instalace, místní zdroje nebo offline přepínače a nedostupnou HTTP/HTTPS proxy; globální tools se spustily i po přejmenování původní testovací instalace.

První běh fixture selhal na chybně zapsaném prefixu dlouhé cesty ve Windows; opravený kopírovací helper a nová prostředí v2 prošly.

Uživatel navíc výslovně žádá vizuální kontrolu všech dokončených změn i funkčnosti jejich postupů.

Před úplným ověřením chyběl projektový node_modules; podporované npm ci --ignore-scripts --no-audit --no-fund obnovilo uzamčené závislosti beze změny lockfilu.

Následné npm run verify prošlo 20 testy, strict build 0 varování a 0 chyb, 253 zdrojů a 494 souborů.

## Další bezpečný krok

Projde všechny dotčené stránky v prohlížeči v obou motivech a čtyřech šířkách; doplní důkaz do testing.md a odstraní dokončený pracovní záznam.

## Stav předání

- Poslední ověřený commit: 0bdc5bd.
- Běžící procesy: žádný projektový build ani preview.
- Cizí změny: žádné.
- Návod na přepis historie Gitu se v tomto úkolu nemění.
