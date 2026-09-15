---
description: "Vlastní kontrola změny na hostingu, sloučení a následná aktualizace místní kopie."
---

# Git – pull request pro solo vývojáře

Pull request je návrh změny mezi dvěma větvemi na hostingu, kde společně vidíš popis, celý diff a výsledky automatických kontrol.

I jako jediný vývojář ho můžeš využít jako poslední kontrolní místo před změnou stabilní větve.

## Kdy PR použít

- Chceš před sloučením vidět všechny commity jako jeden přehled změny.
- Hosting vyžaduje kontroly CI nebo chrání cílovou větev.
- Chceš uchovat důvod změny a odkazy na řešený problém.

Pro lokální projekt bez těchto potřeb stačí [místní merge](../merging.md).

PR není příkaz Gitu.

GitLab stejný záměr označuje jako merge request.

## Příprava a kontrola

1. Dokonči a otestuj práci na `feature/hledani`.
2. Odešli ji přes `git push -u origin feature/hledani`.
3. Na hostingu vytvoř PR ze zdrojové `feature/hledani` do cílové `main` nebo jiné větve svého workflow.
4. Projdi celý diff, nejen seznam commitů, a ověř skutečné výsledky CI.
5. Napiš, co bylo chybně nebo chybělo, jak se chování mění a čím jsi změnu ověřil.

Názvy větví jsou příklad.

**Base/target** je cíl a **compare/source** je tvoje práce.

Při výběru opačného směru bys navrhoval jinou změnu.

## Rozpracovaný PR a opravy

Draft PR můžeš otevřít dříve jako pracovní přehled, pokud ho hosting podporuje.

Další commity do stejné zdrojové větve PR aktualizují.

Nový PR kvůli každé opravě nezakládej.

CI běží jen tehdy, když je v repozitáři nastavené, a zelená kontrola dokládá pouze testy, které skutečně provedla.

## Vyber způsob sloučení

| Metoda | Co zůstane v cíli |
|---|---|
| Merge commit | Pracovní commity a nový spojovací commit |
| Squash and merge | Jeden nový commit s celou změnou |
| Rebase and merge | Jednotlivé změny přehrané nad cílem, zpravidla s novými ID |

Vyber metodu podle [vlastního workflow](../workflows.md) a možností serveru.

## Po sloučení

Ověř stav **Merged**, správnou cílovou větev a případný build či deployment.

Samotné sloučení ještě nedokazuje úspěšné nasazení.

V čisté místní kopii:

```bash
git switch main
git fetch origin
git merge --ff-only origin/main
git log --oneline -5
```

Tyto příkazy načtou serverový výsledek i při squash, kdy původní pracovní commit nemá stejné ID jako commit v `main`.

Pokud fast-forward selže, nejdříve [prohlédni rozchod historie](../synchronization.md).

Dokončenou krátkou větev pak [odstraň](delete-remote-branch.md).

Dlouhodobou `develop` ponech podle svého modelu.

Zdroje: [GitHub: PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), [metody sloučení](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges).
