<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Verzování

Praktické postupy pro Git, větve, historii a běžnou správu repozitářů.

## Přehled stránek

### Git

| Stránka | Popis |
| --- | --- |
| [Konfigurace](git/configuration.md) | Konfigurace určuje identitu autora, chování Gitu a používané nástroje pro porovnávání a slučování. |
| [Repozitář](git/repository.md) | Git ukládá historii projektu do commitů; pracovní kopie navíc obsahuje soubory, které upravuješ v editoru. |
| [Git server](git/server.md) | Git server uchovává vzdálené repozitáře; platformy jako Forgejo, Gitea, GitHub nebo GitLab navíc spravují účty, oprávnění a návrhy změn. |
| [Submoduly](git/submodules.md) | Submodul připojuje samostatný repozitář do podadresáře projektu a hlavní repozitář zaznamenává jeho konkrétní commit. |
| [Git Flow](git/git-flow.md) | Git Flow odděluje přípravu příští verze od stabilní verze a oprav již vydaného produktu. |
| [Použití v praxi](git/in-practice.md) | Push přenáší místní commity do vzdáleného repozitáře; běžně smí vzdálenou větev pouze posunout dopředu. |

### Větve

| Stránka | Popis |
| --- | --- |
| [Vytvoření vzdálené větve](git/branches/create-remote-branch.md) | Novou větev nejprve vytvoříš místně; prvním pushem ji zpřístupníš na serveru. |
| [Smazání vzdálené větve](git/branches/delete-remote-branch.md) | Smazáním větve odstraníš její pojmenovaný ukazatel na serveru; místní kopie a jiné větve tím nezmizí. |
| [Pull request](git/branches/pull-request.md) | Pull request (PR) je návrh na začlenění změn mezi větvemi; poskytuje místo pro popis, kontrolu kódu a výsledky testů. |

### Historie

| Stránka | Popis |
| --- | --- |
| [.gitignore](git/history/update-gitignore.md) | `.gitignore` ovlivňuje dosud nesledované soubory; již commitnutý soubor z historie ani z indexu neodstraní. |
| [Přesun commitů](git/history/move-commits.md) | Větev je ukazatel na commit; vytvořením nové větve lze hotovou práci zachovat a původní ukazatel přesunout zpět. |
| [Sloučení commitů](git/history/squash-branch-commits.md) | Squash spojí práci z několika commitů do jednoho záznamu; hodí se k úpravě vlastní pracovní větve před review. |
| [Oprava commitů](git/history/fix-commits.md) | Opravný commit lze při interaktivním rebase spojit s původním commitem, aby historie popisovala ucelené změny. |
| [Odstranění commitů](git/history/delete-commits.md) | Vrácení chyby a odstranění historie jsou různé úkoly; pro běžnou opravu zveřejněné změny slouží nový revert commit. |
| [assume-unchanged a lokální konfigurace](git/history/assume-unchanged.md) | Příznak `assume-unchanged` je optimalizace kontroly sledovaného souboru; není spolehlivý způsob ukládání vlastní konfigurace mimo historii. |
