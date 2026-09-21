<!-- Tento soubor generuje pnpm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Verzování

Praktické postupy pro Git, větve, historii a běžnou správu repozitářů.

## Přehled stránek

### Začínáme s Gitem

| Stránka | Popis |
| --- | --- |
| [Principy a orientace](git/basics.md) | Pracovní soubory, index, commity, větve a vztah lokálního Gitu k serveru. |
| [Výběr způsobu práce](git/workflows.md) | Výběr mezi jednou větví, krátkými pracovními větvemi a odděleným vydáváním. |
| [Nastavení](git/configuration.md) | Identita autora, editor, konce řádků a kontrola účinného nastavení. |
| [Založení a klonování](git/repository.md) | Založení projektu, klonování existující historie a první ověřený commit. |
| [Připojení serveru](git/server.md) | Připojení remote, volba HTTPS nebo SSH a změna cílové adresy. |

### Každodenní práce

| Stránka | Popis |
| --- | --- |
| [Běžný pracovní den](git/in-practice.md) | Kontrola změn, příprava části souboru, commit a dokončení běžného pracovního dne. |
| [Vytvoření a výběr větve](git/branches/create-remote-branch.md) | Založení větve ze zvoleného základu, přepínání a první push. |
| [Synchronizace a push](git/synchronization.md) | Načtení a odeslání commitů, rozcházející se větve a odmítnutý push. |
| [Slučování a konflikty](git/merging.md) | Fast-forward, merge, squash a rebase včetně vyřešení nebo zrušení konfliktu. |
| [Pull request](git/branches/pull-request.md) | Vlastní kontrola změny na hostingu, sloučení a následná aktualizace místní kopie. |
| [Stash a worktree](git/stash-worktree.md) | Dočasné odložení souborů nebo práce na druhé větvi v samostatné složce. |
| [Odstranění větve](git/branches/delete-remote-branch.md) | Úklid dokončené místní i vzdálené větve a možnost obnovení. |
| [.gitignore](git/history/update-gitignore.md) | Pravidla pro generované a místní soubory a ukončení sledování existující položky. |

### Historie a řešení problémů

| Stránka | Popis |
| --- | --- |
| [Obnova při chybě](git/recovery.md) | Volba opravy podle stavu změny, záchrana přes reflog a řešení běžných chyb. |
| [Čtení historie a bisect](git/history/reading.md) | Porovnání verzí, historie souboru a nalezení commitu, který zavedl chybu. |
| [Oprava commitů](git/history/fix-commits.md) | Oprava posledního i staršího commitu a pravidla publikování přepsané vlastní větve. |
| [Vrácení změny](git/history/delete-commits.md) | Vrácení zveřejněné chyby revertem a návrat místní větve pomocí resetu. |
| [Přesun commitů](git/history/move-commits.md) | Přesun posledních commitů do nové i existující větve včetně úklidu zdroje, merge a cherry-pick. |
| [Spojení commitů](git/history/squash-branch-commits.md) | Spojení vlastních pracovních commitů nebo squash až při sloučení do cíle. |
| [Nahrazení celé historie](git/history/replace-history.md) | Nahrazení historie vzdálené větve jediným kořenovým commitem z aktuálního místního obsahu. |
| [Lokální konfigurace](git/history/assume-unchanged.md) | Oddělení lokální konfigurace a limity příznaků sledovaných souborů. |

### Vydávání a správa projektu

| Stránka | Popis |
| --- | --- |
| [Tagy a vydání](git/releases.md) | Označení ověřeného vydání tagem, publikování a návrat k vydané verzi. |
| [Záloha a migrace](git/backups.md) | Přenos celého projektu, offline bundle, LFS a řízená migrace na jiný server. |
| [Submoduly](git/submodules.md) | Připojení cizího repozitáře na konkrétní commit a jeho aktualizace. |
| [Git Flow](git/git-flow.md) | Oddělený vývoj, příprava vydání a naléhavé opravy při použití Git Flow. |
