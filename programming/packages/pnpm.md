---
description: "Záloha pnpm projektu se store a metadaty, poté obnova jedním instalačním příkazem bez internetu."
---

# pnpm – záloha a obnova balíčků

Pro offline obnovu pnpm uchovej **projekt, store a cache metadat**.

Store obsahuje samotné balíčky; metadata jsou informace o nich, které pnpm může při obnově také potřebovat.

Postup je pro pnpm 12 se stejnou verzí pnpm, Node.js, OS a architektury na obou počítačích.

## 1. Připrav zálohu s internetem

Vytvoř `zaloha-pnpm/projekt` jako kopii projektu bez `node_modules`.

Zachovej `package.json`, `pnpm-lock.yaml`, celý workspace, místní závislosti, patche a hooky `.pnpmfile.*`.

V kopii projektu doplň nebo uprav v `pnpm-workspace.yaml` tyto dva klíče; ostatní nastavení ponech:

```yaml
storeDir: ../store
cacheDir: ../metadata
```

U samostatného projektu bez tohoto souboru jej vytvoř; u monorepa uprav soubor v kořeni workspace. [Nastavení pnpm](https://pnpm.io/settings)

Ve stejném kořeni spusť:

```bash
pnpm install --frozen-lockfile
```

Instalace připraví balíčky i metadata ve zvolených složkách a zachová lockfile.

Pro pozdější build a testy instaluj všechny závislosti včetně vývojových; přípravu neomezuj pomocí `--prod` nebo filtru projektů.

## 2. Přenes celou složku

```text
zaloha-pnpm/
  projekt/       zdroje, lockfile a úplná konfigurace
  store/         balíčky včetně indexu a verzovaných podsložek
  metadata/      cache metadat
```

Přípravné `node_modules` nepřenášej; po skončení instalace zkopíruj celý kořen zálohy a předtím nepoužívej `pnpm store prune`.

Přilož verze z `node --version` a `pnpm --version` a připrav jejich instalátory či archivy pro cílový počítač.

## 3. Obnov bez internetu

Na cíli rozbal pracovní kopii zálohy a v jejím `projekt` spusť:

```bash
pnpm install --offline --frozen-lockfile
pnpm list --depth Infinity
```

Relativní cesty v přeneseném `pnpm-workspace.yaml` najdou obě sousední složky i po přesunu zálohy jinam.

`--offline` zakáže stahování a `--frozen-lockfile` zachová uzamčené verze. [Pnpm install](https://pnpm.io/cli/install)

Nakonec spusť build, testy a běžnou aplikaci bez připojení; ve workspace můžeš pro výpis všech projektů použít `pnpm -r list --depth Infinity`.

## Chci převzít existující store

Nemusíš balíčky stahovat znovu: zjisti `pnpm store path` a skutečné nastavení `cacheDir`, poté zkopíruj oba adresáře do zálohy jako `store` a `metadata`.

Pokud první příkaz vypíše například `.../store/v11`, kopíruj **celý rodičovský `store`**, aby zůstala zachovaná jeho struktura.

Výchozí metadata jsou ve Windows obvykle `%LOCALAPPDATA%/pnpm-cache`; rozhoduje však nastavení `cacheDir` a případně `XDG_CACHE_HOME`. [Cache metadat](https://pnpm.io/settings/other#cachedir)

V záložní kopii projektu nastav stejné relativní cesty jako v kroku 1 a ověř obnovu každého projektu, pro který zálohu pořizuješ.

## Nástroje mimo projekt

Pro snadnou offline obnovu nástroje s lockfilem použij samostatný projekt, například v nové prázdné složce:

```bash
pnpm init
pnpm add --save-exact typescript@5.9.3
pnpm exec tsc --version
```

Tuto složku zazálohuj výše uvedenými třemi kroky a nástroj na cíli spouštěj přes `pnpm exec` z obnoveného projektu.

Názvy a verze svých globálních nástrojů zjistíš přes `pnpm list --global --depth=0`.

S internetem je lze znovu instalovat pomocí `pnpm add --global <balíček>@<verze>`.

## Když něco chybí

| Projev | Co doplnit |
|---|---|
| `ERR_PNPM_NO_OFFLINE_META` | Složku metadat, samotný store nestačí |
| `ERR_PNPM_NO_OFFLINE_TARBALL` | Chybějící balíček pro uložený lockfile a platformu |
| Chybí `file:` nebo `link:` závislost | Příslušné místní zdroje |
| Instalace projde, build selže | Povolené build skripty, nativní nástroje nebo jejich externí data |

Používáš-li starší pnpm, zachovej jeho verzi a konfigurační formát; u pnpm 12 patří běžné nastavení do `pnpm-workspace.yaml` a `.npmrc` slouží registrům a autentizaci.

S internetem stačí v přeneseném projektu `pnpm install --frozen-lockfile`; metadata a schválení build skriptů zachovej i tehdy. [Pravidla výběru závislostí](https://pnpm.io/settings/dependency-resolution)
