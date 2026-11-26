---
description: "Spojení vlastních pracovních commitů nebo squash až při sloučení do cíle."
---

# Git – spojení commitů do jednoho

Squash se hodí, když několik pracovních commitů představuje jednu ucelenou změnu.

Nejdříve se rozhodne, zda se přepíše vlastní pracovní větev, nebo vznikne souhrnný commit až při začlenění do cíle.

Pokud má celá vzdálená větev začít jediným kořenovým commitem bez původních předků, platí [nahrazení celé historie](replace-history.md).

## Rozsah spojení

<a id="nejmenší-zásah-squash-při-sloučení"></a>
<a id="úprava-vlastních-posledních-commitů"></a>
<a id="celá-vlastní-větev-od-společného-předka"></a>
<a id="ověření-a-návrat-po-interaktivním-rebase"></a>

## [Při sloučení](#tab/squash-merge)

**Nejmenší zásah: squash při sloučení**

Slouží k tomu [`git merge --squash`](../merging.md?tabs=git-merge-squash#squash-jedna-ucelená-změna-v-cíli) nebo možnost **Squash and merge** na hostingu.

Zdrojová větev si ponechá původní commity a cílová dostane jeden souhrnný.

Není potřeba přepisovat vzdálenou pracovní větev.

## [Poslední vlastní commity](#tab/squash-rebase)

Příklad je pro PowerShell i Bash, čistý strom a **tři poslední vlastní lineární commity**, které ještě nejsou sdílené.

```bash
git log --oneline -5
git branch backup/pred-squash
git rebase -i HEAD~3
```

`HEAD~3` označuje rodiče nejstaršího z těchto tří commitů.

Počet a rozsah se ověří předem.

V otevřeném seznamu zůstane první řádek jako `pick` a další dva se změní na `squash`:

```text
pick   <id-první-změny> Přidání základu hledání
squash <id-druhé-změny> Doplnění filtrování
squash <id-třetí-změny> Testy hledání
```

Zástupná ID se nekopírují: editor už obsahuje skutečné commity a mění se jen slovo na začátku řádku.

Po uložení se zadá jedna výsledná zpráva.

`fixup` místo `squash` by zahodil zprávu připojovaného commitu.

Pro rozsah zahrnující úplně první commit repozitáře se používá `git rebase -i --root`.

**Ověření a návrat po interaktivním rebase**

```bash
git diff backup/pred-squash HEAD
git log --oneline -5
```

Rozdíl konečného obsahu má být prázdný a log má ukazovat zamýšlený počet nových commitů.

Pokud rebase teprve probíhá, `git rebase --abort` jej zruší.

Po dokončení uchovává původní historii záložní větev.

Konflikt se řeší podle [návodu pro rebase](../merging.md), výsledek se otestuje a případná již zveřejněná vlastní větev se aktualizuje jen podle [postupu s lease](fix-commits.md#publikování-přepsané-vlastní-větve).

## [Celá vlastní větev](#tab/squash-branch)

**Spojení od společného předka**

Pro spojení všech vlastních změn větve do jednoho commitu bez ručního počítání lze použít původní postup se soft resetem.

Příklad je pro PowerShell, čistou vlastní větev `feature/hledani` a jediný společný základ s `origin/main`.

Nemá sloužit k neřízenému přepisování sdílené integrační větve.

```powershell
git switch feature/hledani
git fetch origin
git branch --no-track backup/pred-soft-squash
$base = git merge-base HEAD origin/main
git log --oneline "$base..HEAD"
git reset --soft $base
git diff --cached --stat
git commit -m "feat: přidává hledání"
git diff backup/pred-soft-squash HEAD
```

Nejdříve se zkontroluje vypsaný rozsah.

Soft reset ponechá aktuální index a soubory, takže nový commit zachytí jejich výsledný rozdíl proti společnému předku.

Poslední diff má být prázdný.

Operace nepřebírá nové změny z `origin/main`, které vznikly po rozvětvení.

Pokud větev obsahuje složité merge nebo má více společných základů, je vhodnější squash při začlenění do cíle.

Již publikovaná vlastní větev vyžaduje zachytit vzdálený stav **před resetem** a následně použít [publikování s lease](fix-commits.md#publikování-přepsané-vlastní-větve).

***

Zdroje: [interaktivní rebase](https://git-scm.com/docs/git-rebase#_interactive_mode), [git merge](https://git-scm.com/docs/git-merge), [git reset](https://git-scm.com/docs/git-reset), [git merge-base](https://git-scm.com/docs/git-merge-base).
