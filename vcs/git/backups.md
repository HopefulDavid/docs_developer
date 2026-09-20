---
description: "Přenos celého projektu, offline bundle, LFS a řízená migrace na jiný server."
---

# Git – záloha a obnova projektu

Záloha musí obsahovat to, co chceš obnovit: historie Gitu, necommitované soubory, LFS objekty a data hostingu jsou různé části.

Push je užitečná další kopie commitů, ale nepřenese automaticky vše z pracovního počítače.

## Vyber typ zálohy

| Možnost | Co zachová | Co potřebuje navíc |
|---|---|---|
| Kopie celé pracovní složky včetně `.git` | Historii, místní nastavení a přítomné rozpracované soubory | Samostatná data mimo složku, skutečné cíle propojených worktrees a submodulů |
| `git bundle` | Vybrané Git reference a objekty v jednom offline souboru | Necommitované a ignorované soubory, LFS data, nastavení a externí závislosti |
| Mirror klon serveru | Reference a historii dostupnou ze serveru | LFS, issues, přílohy release, oprávnění a CI tajemství |

Pro preferovanou složkovou zálohu zavři IDE a procesy měnící projekt a zkopíruj celý adresář včetně skrytých položek na jiné úložiště.

Pokud `.git` není adresář, ale odkazový soubor, jde například o worktree či submodul.

Samotná kopie této složky nemusí obsahovat vlastní historii.

## Offline soubor s historií

V běžném repozitáři v PowerShellu nebo Bashi:

```bash
git status
git bundle create ../projekt.bundle --all
git bundle verify ../projekt.bundle
git bundle list-heads ../projekt.bundle
```

`--all` zahrne místní reference včetně větví a tagů.

Neobstará commity, které místní repozitář nikdy nestáhl.

Pokud má být záloha aktuální vůči serveru, před tvorbou proveď `git fetch --all --tags` a vyhodnoť případné chyby jednotlivých remotes.

`verify` kontroluje strukturu a případné potřebné předchozí objekty.

Test obnovy navíc ověří skutečné použití.

### Obnova na jiném počítači

Přenes bundle a vedle něj spusť:

```bash
git clone projekt.bundle projekt-obnoveny
git -C projekt-obnoveny log --oneline -5
git -C projekt-obnoveny branch -a
git -C projekt-obnoveny fsck --full
```

Vznikne nová pracovní kopie bez internetu.

Další větve z klonu případně vyber přes `git switch --track origin/<větev>`.

Remote `origin` zatím ukazuje na soubor zálohy, takže před dalším běžným pushem nastav skutečnou serverovou URL podle [připojení remote](server.md).

Na cíli obnov také balíčky projektu podle návodu pro použitý správce, SDK a soukromou konfiguraci.

## Git LFS a submoduly

Git LFS ukládá do historie textové ukazatele, zatímco velká data žijí samostatně.

Před úplnou zálohou projektu s LFS potřebuješ nainstalovaný Git LFS a dostupný původní server:

```bash
git lfs version
git lfs env
git lfs fetch --all origin
git lfs fsck
```

`fetch --all` stáhne LFS objekty dosažitelné z místních referencí, takže před ním načti potřebné větve a tagy.

U běžného repozitáře je lokální LFS úložiště zpravidla uvnitř `.git/lfs`.

Přesné `LocalMediaDir` zjistíš ve výpisu `git lfs env`, protože umístění lze změnit konfigurací.

Pro složkovou obnovu přenes i tento skutečný adresář a po přepnutí na požadovanou verzi použij `git lfs checkout` k doplnění pracovních souborů z místních objektů.

Samotný bundle LFS objekty neobsahuje.

Každý [submodul](submodules.md) je další repozitář, který musí mít dostupný připnutý commit i vlastní zálohu.

URL v `.gitmodules` se na offline počítači samy nezmění na místní cestu.

## Migrace serveru pomocí mirroru

Tuto variantu používej pro **nový prázdný cílový repozitář**, protože `push --mirror` může cílové reference přepsat i odstranit.

Obecná syntaxe po nahrazení obou URL:

```text
git clone --mirror <zdrojová-URL> projekt-mirror.git
cd projekt-mirror.git
git remote add destination <cílová-URL>
git ls-remote destination
git push --mirror --dry-run destination
```

Prohlédni cíl a navržené změny.

Zdrojový `origin` zůstává zachovaný a `destination` označuje pouze nový server.

Po potvrzení správného prázdného cíle a u projektů s již staženými LFS objekty nejprve proveď `git lfs push --all destination`.

Vlastní Git reference odešli:

```bash
git push --mirror destination
git ls-remote --heads --tags destination
```

Naklonuj nový server do další čisté složky, ověř větve, tagy, obsah LFS a spuštění projektu.

Mirror nepřenáší issues, účty, nastavení CI, release přílohy ani tajemství hostingu.

Ty exportuj nástroji konkrétní platformy.

Zdroje: [git bundle](https://git-scm.com/docs/git-bundle), [git clone](https://git-scm.com/docs/git-clone), [Git LFS fetch](https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-fetch.adoc), [Git LFS checkout](https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-checkout.adoc).
