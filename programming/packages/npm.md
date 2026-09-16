---
description: "Příprava jedné npm cache, její přenos a obnova projektu či globálních nástrojů bez internetu."
---

# npm – záloha a obnova balíčků

Záloha pro npm má dvě části: **zdrojový projekt s lockfilem a naplněnou npm cache**.

Cache je složka se staženými instalačními daty.

`node_modules` na cíli vytvoří npm znovu.

Postup je pro npm 11 a funguje v PowerShellu i Bashi.

Na cíli použij stejnou verzi Node.js, npm, OS a architekturu.

## 1. Připrav zálohu s internetem

Vytvoř `zaloha-npm/projekt` jako kopii projektu bez `node_modules`.

Zachovej `package.json`, `package-lock.json`, celý workspace, místní závislosti a instalační nastavení `.npmrc`.

Přihlašovací tokeny uchovávej zvlášť.

V této kopii projektu spusť:

```bash
npm ci --include=dev --cache ../npm-cache --no-audit --no-fund
```

Tím se připraví přesné verze z lockfilu a jejich instalační data v sousední `npm-cache`.

`--include=dev` zahrne také nástroje pro build a testy, i při nastaveném `NODE_ENV=production`. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

## 2. Přenes celou složku

```text
zaloha-npm/
  projekt/       zdroje, manifest, lockfile a konfigurace
  npm-cache/     celá připravená cache
```

Přípravné `node_modules` nepřenášej.

Cache kopíruj až po skončení instalace a nečisti ji.

Přilož verze z `node --version` a `npm --version` i instalátor Node.js pro cílový počítač.

Ve Windows zvol krátkou cestu k záloze, protože cache obsahuje dlouhé názvy souborů.

## 3. Obnov bez internetu

Na cíli rozbal pracovní kopii zálohy a v jejím `projekt` spusť:

```bash
npm ci --offline --include=dev --cache ../npm-cache --no-audit --no-fund
npm ls --all
```

`--offline` použije pouze přenesenou cache.

Chybějící balíček skončí chybou `ENOTCACHED`. [Offline režim](https://docs.npmjs.com/cli/v11/using-npm/config/#offline)

Nakonec spusť build, testy a běžnou aplikaci bez připojení.

Lockfile se nemá změnit.

`npm ci` nahrazuje stávající `node_modules`, proto zkoušej obnovu v pracovní kopii.

## Chci zálohovat celou používanou cache

Její cestu zjistíš příkazem:

```bash
npm config get cache
```

Zkopíruj celý vypsaný adresář jako `npm-cache` a použij stejný příkaz obnovy výše.

Pro více projektů předem proveď jejich instalaci a uchovej zdroje i lockfile každého z nich.

`npm cache verify` kontroluje integritu cache, ale její úplnost pro projekt prokáže až úspěšná obnova. [Npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache/)

## Globální nástroje

Ulož si seznam `npm list --global --depth=0` a připrav přesné verze nástrojů.

Například TypeScript stáhneš do stejné zálohy z její složky `projekt`:

```bash
npm install --global --prefix ../priprava-tools typescript@5.9.3 --cache ../npm-cache --no-audit --no-fund
```

Pomocná `priprava-tools` slouží jen k naplnění cache a nepřenáší se.

Na cíli ze stejné relativní složky:

```bash
npm install --global typescript@5.9.3 --offline --cache ../npm-cache --no-audit --no-fund
tsc --version
```

Název a verzi nahraď podle uloženého seznamu.

Při zkoušce na původním počítači použij novou vlastní `--prefix` složku. [Npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)

Globální instalace neuzamyká všechny nepřímé závislosti lockfilem.

Pro přesně opakovatelnou dlouhodobou zálohu nástroje jej můžeš spravovat v samostatném projektu s lockfilem.

## Co ještě zachovat

- Lokální a Git závislosti, patche a nastavení, se kterými vznikl lockfile, například `legacy-peer-deps`.
- Nativní nástroje a data stahovaná instalačními skripty, například prohlížeče nebo binární knihovny.
- Původní uloženou zálohu odděleně od pracovní cache. Cache npm nemá záruku trvalého archivu.

`--prefer-offline` může použít internet a `npm pack` běžně nezabalí celý strom závislostí, proto tyto příkazy nenahrazují uvedenou obnovu.

S internetem stačí v přeneseném projektu `npm ci --include=dev`.

Audit zranitelností proveď při online přípravě a po návratu k registru.
