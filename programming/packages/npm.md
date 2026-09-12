# npm – instalace, aktualizace a obnova balíčků

npm spravuje JavaScriptové balíčky a projektové příkazy; `package.json` popisuje požadavky a `package-lock.json` zaznamenává konkrétní vyřešené závislosti.

## Před použitím

Nainstaluj Node.js ve verzi požadované projektem a ověř `node --version` i `npm --version`.

Projektové příkazy spouštěj ve složce s `package.json`.

## Běžná práce

| Úkol | Příkaz | Co změní |
|---|---|---|
| Obnova z existujícího lockfilu | `npm ci` | Znovu vytvoří `node_modules`, při nesouladu manifestu a lockfilu selže |
| Přidání knihovny | `npm install knihovna` | Zapíše závislost a aktualizuje lockfile |
| Přidání vývojového nástroje | `npm install --save-dev nastroj` | Zapíše nástroj mezi `devDependencies` |
| Dostupné aktualizace | `npm outdated` | Vypíše stav bez instalace |
| Aktualizace v povolených rozsazích | `npm update` | Obnoví verze podle rozsahů manifestu |
| Odebrání | `npm uninstall knihovna` | Odebere deklaraci a upraví lockfile |
| Dostupné projektové příkazy | `npm run` | Vypíše sekci `scripts` |

`knihovna` a `nastroj` jsou místa pro skutečné názvy z registru; do terminálu je nekopíruj bez nahrazení.

`npm ci` nemění lockfile, ale může spouštět instalační skripty závislostí; `--ignore-scripts` použij jen tehdy, pokud projekt bez nich funguje. [Npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/), [npm update](https://docs.npmjs.com/cli/v11/commands/npm-update/)

## Praktický příklad: changelog pomocí git-cliff

V samostatném Git projektu s `package.json` spusť:

```bash
npm install --save-dev --save-exact git-cliff
npm exec -- git-cliff --init
npm exec -- git-cliff --config cliff.toml --output CHANGELOG.md
```

První příkaz uloží přesnou aktuálně vybranou verzi, druhý vytvoří konfiguraci a třetí zpracuje dostupnou Git historii do Markdownu.

Ve stávajícím projektu s `cliff.toml` inicializaci neopakuj; místo toho uprav jeho skupiny, šablonu a filtrování.

Možnosti popisuje [Git-cliff: použití](https://git-cliff.org/docs/category/usage/).

Verzuj manifest, lockfile a konfiguraci společně; při generování úplné historie potřebuješ úplný klon.

## Globální nástroje a jejich obnova

```powershell
npm list -g --depth=0 --json | Set-Content -Encoding utf8 npm-global.json
npm root -g
npm config get prefix
```

JSON uchovává strukturované názvy i verze, včetně názvů se scope jako `@scope/balicek`; druhé dva příkazy ukazují skutečné instalační cesty.

Na novém počítači vyber z inventáře potřebné nástroje a nainstaluj je pomocí `npm install -g NAZEV@VERZE`, kde obě hodnoty nahradíš záznamem.

## Offline instalace a omezení

Samotný `npm pack` nevytváří úplnou offline zálohu všech tranzitivních závislostí.

Pro opakovatelnou obnovu uchovej projekt a lockfile; v řízeném prostředí připrav registry mirror nebo naplněnou cache a vyzkoušej `npm ci --offline` bez sítě na stejné platformě.

Chybějící položka cache tento příkaz zastaví; nativní balíčky a instalační skripty mohou potřebovat další platformní prostředky. [Npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache/), [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/)

## Ověření aktualizace

Před přechodem na hlavní verzi prostuduj migrační pokyny nástroje; `@latest` není záruka kompatibility s ostatními balíčky.

Zkontroluj diff obou manifestů a spusť build i testy definované projektem.
