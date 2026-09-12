# Git – pull request

Pull request (PR) je návrh na začlenění změn mezi větvemi; poskytuje místo pro popis, kontrolu kódu a výsledky testů.

## Jak to funguje

Zdrojová větev obsahuje tvoje změny a cílová větev určuje, kam se mají začlenit.

PR spravuje hosting, nikoli samotný příkaz Git; GitLab používá název merge request. [GitHub: pull requesty](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

## Před použitím

Připrav samostatnou větev podle pravidel projektu, commitni zamýšlené změny a spusť relevantní kontroly.

## Praktický postup

1. [Publikuj pracovní větev](create-remote-branch.md).
2. Na hostingu otevři nový PR a ověř zdrojovou i cílovou větev.
3. Zkontroluj diff, napiš problém, výsledné chování a skutečně provedené testy.
4. Vyřeš připomínky a případná selhání kontrol.
5. Po splnění pravidel sluč PR podporovanou metodou.

Nové commity do stejné zdrojové větve aktualizují otevřený PR; CI se spustí pouze tehdy, pokud je pro daný repozitář nastavené.

## Způsoby sloučení

| Metoda | Co se stane s historií |
|---|---|
| Merge commit | Propojí obě historie novým commitem |
| Squash | Vytvoří jeden souhrnný commit v cíli |
| Rebase | Přehraje jednotlivé změny na cílovou historii |

Dostupnost závisí na hostingu a nastavení repozitáře. [Metody sloučení](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges)

## Ověření po sloučení

Zkontroluj stav **Merged**, cílovou větev a případné navazující nasazení.

Krátkodobou větev lze po ověření odstranit; dlouhodobou integrační větev ponech podle týmového workflow.
