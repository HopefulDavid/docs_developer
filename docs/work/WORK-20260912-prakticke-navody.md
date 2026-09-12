---
task_id: WORK-20260912
status: active
started: 2026-09-12
last_updated: 2026-09-12T00:00:00Z
owner: Codex
branch: develop
scope:
  - public-documentation
  - navigation-and-images
---

# WORK-20260912: Praktická dokumentace od základu

## Požadovaný výsledek

Splnit celé uživatelské zadání pro syntaxi, rozcestníky, Git pro solo juniora, JetBrains, velikosti obrázků, balíčky a jejich offline obnovu, DevOps, Docker, Kubernetes, síť a OS.

Uživatel odmítl rozpracovaný návrh a vrátil strom na a7008dd; návrh není přijatý ani dokončený a nelze jej mechanicky znovu nasadit.

## Kanonické vstupy

- [Požadavky](../product/requirements.md), [architektura](../architecture/overview.md).
- [Příkazy](../development/commands.md), [workflow](../development/workflow.md), [styl](../governance/documentation.md), [testování](../quality/testing.md).
- Původní podrobné zadání a následné výslovné požadavky začít znovu a neplýtvat tokeny v této konverzaci.

## Akceptační kritéria

- [x] Původní změny jsou zaverzované před úpravami: a7008dd.
- [ ] Jasná obecná syntaxe ve všech referencích a samostatná výuka značek; příklady zůstávají oddělené a vysvětlené.
- [ ] Rozcestníky mají stručné přímé popisy.
- [ ] Git učí princip, volbu workflow a běžnou práci i záchranu bez hádání účinků.
- [ ] JetBrains bez sekce zkratek, regex má skutečně vysvětlené příklady i možnosti.
- [ ] Každý použitý obrázek je posouzený a vhodně velký.
- [ ] Balíčky oddělené od nástrojů, reálné offline zálohy NuGet, .NET tools, npm, pnpm, Python, Dart.
- [ ] Infrastruktura jako kód česky, OpenTofu věcně vysvětlené.
- [ ] Čtyři určené Docker podstránky odstraněné; data Dockeru zůstávají v oblasti Virtualizace.
- [ ] Kubernetes, síť a OS jsou srozumitelné, praktické a přehledné.
- [ ] Ověření zahrnuje funkční příklady, celý build, odkazy a skutečné vizuální zobrazení.

## Omezení a orientace

Develop, bez push, merge a nasazení; projektové závislosti neměnit.

Generátor vlastní navigaci; splitFrontMatter zachovává metadata článků, htmlImageToMarkdown zachovává záměrně nastavené pozitivní šířky obrázků.

Zachovat funkční přístupnost a témata, nevytvářet další vlastní obecný framework.

## Baseline a výzkum

a7008dd je čistý výchozí bod po uživatelském vrácení; 8446e41 ani pozdější rozpracované Git stránky již nejsou v aktuálním stromu.

Obnovený npm run docs:build prošel: 0 warningů, 0 chyb, 238 zdrojů a 479 souborů.

Primární zdroje již přečtené: Microsoft Command-line syntax key, Ollama CLI, JetBrains hledání a nahrazování a Java Pattern, Git příkazové reference, NuGet cache, npm cache, pnpm fetch a Dart PUB_CACHE.

Pomocné skripty private/docs-review/rewrite-git-*.py obsahují odmítnuté pracovní návrhy; nespouštět je mechanicky.

## Rozhodnutí a průběh

| Milník | Stav | Důkaz / další ověření |
|---|---|---|
| M0 Původní commit a obnovený baseline | done | a7008dd a strict build |
| M1 Čtenářské rozhraní, syntaxe a model článků | done | Metadata description, článek syntaxe, reference a strict build; desktop rozcestníku zkontrolován |
| M2 Git a ostatní požadované obsahové oblasti | in-progress | Přepsané Git, síť, OS, Kubernetes a OpenTofu; odstraněné Docker stránky; probíhá závěrečné čtení |
| M3 Offline balíčky | in-progress | npm, pnpm, Python, NuGet a .NET tool prošly izolovanou obnovou; Dart ověřen ze zdrojů |
| M4 Celkové review a dokončení | in-progress | Strict build prošel; nové rozměry obrázků a širší UI kontrola zbývají |

Stručné popisy vlastní YAML description jednotlivých článků; generátor odmítá chybějící, prázdné nebo pro tabulku neplatné hodnoty a neopisuje úvod.

Git má novou čtyřdílnou navigaci a 24 článků od základů po obnovu; přípravu tvoří nové skripty git-foundations.py, git-collaboration.py, git-history.py a git-finalize.py, nikoli odmítnuté rewrite-git-*.py.

SQL dávka se přesunula z CMD do database/sqlcmd.md a profil/prompt PowerShellu do samostatné OS stránky.

Všech 18 používaných obrázků bylo posouzeno; 16 návodových snímků má vlastní šířku a odkaz na originál, dekorativní .NET obrázek a duplicitní snímek již vysvětleného vzorce byly z článků odstraněny.

Normalizátor nově zachovává HTML img s pozitivním width; CSS nechává tuto šířku platit a omezuje ji dostupným prostorem.

## Provedené obsahové zkoušky

- JBR Rideru: 10 testů Java Pattern pro příklady regexu.
- private/docs-review/test-documentation.py git: 19 kontrol indexu, restore, merge a abort, stash, reset, revert, reflog, worktree, bundle, squash a skutečně odmítnutého pushe do místního remote.
- Stejný skript npm a pnpm: po 3 kontrolách, offline instalace tranzitivní závislosti is-odd, nezměněný lockfile a očekávané selhání prázdné cache.
- Python: requests 2.32.5 a závislosti z wheelhouse nainstalované do nového venv s --no-index, pip check a import prošly.
- NuGet: Newtonsoft.Json 13.0.3 obnoven z místního feedu do prázdné cache a projekt sestaven; kopie globální složky funguje bez zdrojů a prázdná selže.
- .NET tool: DocFX 2.78.5 nainstalovaný z místního feedu do nové tool-path složky a spuštěný.
- npm run verify po obsahových změnách a opravě rozměrů obrázků: 20 testů, 0 warningů/chyb, 252 zdrojů a 493 výstupních souborů, všechny místní odkazy včetně kotev platné.

Testovací důkazy a jednorázové autorovací skripty jsou v ignorovaném private/docs-review; neopakovat již úspěšné instalace bez nové změny nebo zjištěného problému.

## Rizika a prostředí

První CUA start selhal kvůli ACL sandboxu; reset a další inicializace uspěly.

Browser 1, tab 1, bindingy tab/browser/viewport jsou dostupné; lokální server běží na 127.0.0.1:49673 (session 17826).

Připnuté prostředí: Node 24.13.0 a .NET SDK 10.0.301; git-cliff potřebuje automaticky schválený eskalovaný běh.

Nainstalované pnpm a JetBrains JBR dovolují místní ověření balíčků a Java regexu.

## Další bezpečný krok

Dokončit pravidla description a šířek obrázků v kanonických dokumentech, spustit aktuální build a commitnout ověřený milník s tímto záznamem.

Poté dokončit vizuální kontrolu 320/390/768/1440 px v obou motivech, kontrolu zbývajících příkladů a finální přenos znalostí; pracovní záznam odstranit až po skutečném dokončení.

## Stav předání a dokončení

Všechny změny po obnoveném a7008dd patří tomuto úkolu; žádné cizí rozpracované změny při restartu nebyly přítomné.

Před dokončením přenést pravidla a skutečné výsledky do kanonických dokumentů a pracovní záznam odstranit.
