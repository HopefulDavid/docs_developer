---
description: "Vlastní kontrola změny na hostingu, sloučení a následná aktualizace místní kopie."
---

# Git – pull request pro solo vývojáře

Pull request je návrh změny mezi dvěma větvemi na hostingu, kde je společně vidět popis, celý diff a výsledky automatických kontrol.

I jediný vývojář ho může využít jako poslední kontrolní místo před změnou stabilní větve.

## Kdy PR použít

- Před sloučením mají být všechny commity vidět jako jeden přehled změny.
- Hosting vyžaduje kontroly CI nebo chrání cílovou větev.
- Má se uchovat důvod změny a odkazy na řešený problém.

Pro lokální projekt bez těchto potřeb stačí [místní merge](../merging.md).

PR není příkaz Gitu.

GitLab stejný záměr označuje jako merge request.

## Příprava a kontrola

1. Práce na `feature/hledani` se dokončí a otestuje.
2. Odešle se přes `git push -u origin feature/hledani`.
3. Na hostingu vznikne PR ze zdrojové `feature/hledani` do cílové `main` nebo jiné větve daného workflow.
4. Kontroluje se celý diff, nejen seznam commitů, a skutečné výsledky CI.
5. Popis uvádí, co bylo chybně nebo chybělo, jak se chování mění a čím byla změna ověřena.

Názvy větví jsou příklad.

**Base/target** je cíl a **compare/source** je navrhovaná práce.

Opačný směr by navrhoval jinou změnu.

## Rozpracovaný PR a opravy

Draft PR lze otevřít dříve jako pracovní přehled, pokud ho hosting podporuje.

Další commity do stejné zdrojové větve PR aktualizují.

Nový PR kvůli každé opravě nevzniká.

CI běží jen tehdy, když je v repozitáři nastavené, a zelená kontrola dokládá pouze testy, které skutečně provedla.

## Způsob sloučení

| Metoda | Co zůstane v cíli |
|---|---|
| Merge commit | Pracovní commity a nový spojovací commit |
| Squash and merge | Jeden nový commit s celou změnou |
| Rebase and merge | Jednotlivé změny přehrané nad cílem, zpravidla s novými ID |

Metoda se volí podle [vlastního workflow](../workflows.md) a možností serveru.

## Po sloučení

Ověří se stav **Merged**, správná cílová větev a případný build či deployment.

Samotné sloučení ještě nedokazuje úspěšné nasazení.

V čisté místní kopii:

```bash
git switch main
git fetch origin
git merge --ff-only origin/main
git log --oneline -5
```

Tyto příkazy načtou serverový výsledek i při squash, kdy původní pracovní commit nemá stejné ID jako commit v `main`.

Pokud fast-forward selže, nejdříve se [zkontroluje rozchod historie](../synchronization.md).

Dokončená krátká větev se pak [odstraní](delete-remote-branch.md).

Dlouhodobá `develop` zůstává podle zvoleného modelu.

Zdroje: [GitHub: PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), [metody sloučení](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges).
