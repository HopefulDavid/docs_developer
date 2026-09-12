---
description: "Záloha pnpm store i metadat a obnova projektu s uzamčenými verzemi bez registru."
---

# pnpm – záloha a obnova balíčků

pnpm ukládá obsah balíčků do sdíleného **store** a z něj vytváří projektové `node_modules`.

Samostatná **cache metadat** obsahuje informace o balíčcích a výsledcích kontrol, které mohou být potřeba i při offline instalaci. [Store](https://pnpm.io/settings/store), [cacheDir](https://pnpm.io/settings/other#cachedir)

Pro přenositelnou offline zálohu proto připrav oba adresáře.

## Obnova s internetem

Uchovej celý zdrojový projekt s `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, používanými patchemi a hooky `.pnpmfile.*`.

Na cíli se stejnou verzí pnpm a Node.js:

```bash
pnpm install --frozen-lockfile
pnpm list --depth Infinity
```

`--frozen-lockfile` odmítne změnu uzamčeného výběru závislostí. [Pnpm install](https://pnpm.io/cli/install)

## 1. Připrav záložní kopii projektu

Následující postup je ověřený s **pnpm 12**, se stejnou verzí správce, Node.js, OS a architektury na obou počítačích.

Vytvoř `zaloha-pnpm/projekt` jako kopii celého projektu bez `node_modules`.

Do existujícího `projekt/pnpm-workspace.yaml` **doplň nebo uprav pouze tyto dva klíče**, ostatní konfiguraci zachovej:

```yaml
storeDir: ../store
cacheDir: ../metadata
```

Pokud tento soubor neexistuje a jde o samostatný projekt, vytvoř ho s uvedeným obsahem.

Cesty jsou zvolené pro záložní kopii; neměň kvůli nim konfiguraci původního pracovního projektu. [Konfigurace pnpm](https://pnpm.io/settings)

U monorepa kopíruj celý workspace a nastavení uprav v jeho kořeni.

## 2. Naplň zálohu s internetem

V `zaloha-pnpm/projekt`:

```bash
node --version
pnpm --version
pnpm fetch
pnpm install --offline --frozen-lockfile
pnpm store path
```

`fetch` připraví závislosti podle lockfilu; instalace z nich vytvoří pracovní `node_modules`. [Pnpm fetch](https://pnpm.io/cli/fetch)

Pro zálohu na vývoj a build neomezuj přípravu pomocí `--prod`; zachovej všechny potřebné vývojové i volitelné závislosti.

Ověř, že `pnpm store path` ukazuje dovnitř zálohy a že vznikla také složka `metadata`.

Výsledek bude:

```text
zaloha-pnpm/
  projekt/       zdroje, lockfile a úplná konfigurace workspace
  store/         obsah balíčků včetně indexu a verzovaných podadresářů
  metadata/      cache metadat použitá při přípravě
  verze.txt      pnpm, Node.js, OS a architektura
```

Po dokončení všech procesů uchovej celý kořen zálohy; před kopírováním nespouštěj `pnpm store prune`.

Přípravné `node_modules` nejsou součástí přenosu, protože na cíli vzniknou znovu.

## 3. Obnov na cílovém počítači

Rozbal zálohu do pracovní složky a v jejím `projekt`, bez původního `node_modules`, spusť:

```bash
pnpm install --offline --frozen-lockfile
pnpm list --depth Infinity
```

Relativní `storeDir` a `cacheDir` z přenesené konfigurace použijí sousední záložní adresáře i po změně absolutní cesty.

`--offline` odmítne chybějící obsah; `--prefer-offline` by jej smělo stáhnout.

Potom spusť build a testy projektu bez sítě a zkontroluj, že se lockfile nezměnil.

Ve workspace použij pro výpis všech projektů `pnpm -r list --depth Infinity`.

## Záloha existujícího sdíleného úložiště

Pokud chceš uchovat balíčky pro více projektů, zjisti `pnpm store path` a účinné nastavení `storeDir` i `cacheDir`.

Zkopíruj celé odpovídající kořeny jako `store` a `metadata` a nastav v záložních projektech jejich nové relativní cesty.

Pokud `pnpm store path` vypíše například `.../store/v11`, zachovej **celý rodičovský kořen `store`**, nikoli samotný podadresář přejmenovaný na `store`.

Výchozí metadata jsou ve Windows obvykle `%LOCALAPPDATA%/pnpm-cache`; skutečnou cestu může změnit `cacheDir` nebo `XDG_CACHE_HOME`.

Zálohu pořizuj po ukončení instalací a ověř obnovou každého požadovaného projektu. [Pnpm store](https://pnpm.io/cli/store)

## Nástroje používané mimo projekt

Seznam globálních nástrojů vypíše `pnpm list --global --depth=0`; s internetem je obnovíš přes `pnpm add --global <balíček>@<verze>`.

Pro offline používání s uzamčenými nepřímými závislostmi vytvoř **samostatnou složku nástrojů** a používej ji jako projekt:

```bash
pnpm init
pnpm add --save-exact typescript@5.9.3
pnpm exec tsc --version
```

První příkaz patří do nové prázdné složky; název a verzi TypeScriptu nahraď vlastním nástrojem.

Složku potom zazálohuj a obnov stejnými třemi kroky výše, včetně store, metadat a lockfilu.

Nástroje spouštěj z obnovené složky přes `pnpm exec`; běžná globální instalace v účtu tím zůstává nezávislá.

## Důležité rozdíly a problémy

| Situace | Řešení |
|---|---|
| `ERR_PNPM_NO_OFFLINE_META` | Doplň i metadata, nikoli pouze store |
| `ERR_PNPM_NO_OFFLINE_TARBALL` | Doplň chybějící balíček pro přesný lockfile a platformu |
| Starší verze pnpm | Použij její původní verzi i konfigurační formát; záloha není důvod pro upgrade |
| `file:` nebo `link:` závislost | Přenes také místní zdroje; fetch je nenahrazuje |
| Chybí nativní nástroj | Ověř platformu, povolený build skript a jeho externí data |

U pnpm 12 nestačí všechny historické volby uložit do `.npmrc`: kromě registrů a autentizace patří nastavení do `pnpm-workspace.yaml`. [Nastavení](https://pnpm.io/settings)

Kontroly stáří a důvěry balíčků mohou vyžadovat metadata i pro existující lockfile; nevypínej je jen kvůli chybějící záloze. [Pravidla výběru závislostí](https://pnpm.io/settings/dependency-resolution)

Zachovej schválení build skriptů a zvlášť připrav runtime či binární data, která si instalace stahuje mimo správce balíčků.
