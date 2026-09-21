---
description: "Záloha a obnova balíčků npm, pnpm, pip, NuGet, .NET tools a Dart bez internetu."
---

# Záloha a obnova balíčků

[Skript](offline/transfer.ps1) připraví archiv pro obnovu balíčků bez internetu.

Na obou počítačích potřebuješ **PowerShell 6 nebo novější** a program, kterým své balíčky spravuješ, například npm nebo pip.

Na počítači, kde budeš zálohu obnovovat, musí být také programy nutné ke spuštění projektu, například Node.js, Python, .NET, Dart nebo Flutter.

Nemusíš použít stejné verze programů jako na prvním počítači, ale zvolené verze musí fungovat s projektem a jeho balíčky.

Počítače běžně nemusí mít stejný systém ani typ procesoru.

Pokud ale projekt používá balíček vytvořený jen pro určitý systém nebo typ procesoru, potřebuješ balíček určený pro cílový počítač.

U nástrojů instalovaných přes `dart install` musí mít oba počítače Windows a stejný typ procesoru, například x64.

## npm

Záloha ověří, že uložená cache stačí k offline instalaci.

### [Lokální](#tab/npm-lokalni)

Projekt vyžaduje `package.json` a `package-lock.json`.

Obnova pomocí `npm ci` nahradí `node_modules` a vyžaduje původní adresu registru.

Workspace, kořenové instalační skripty a nestandardní zdroje skript odmítne.

### [Globální](#tab/npm-globalni)

Zahrne všechny přímé balíčky z `npm ls --global --depth=0`.

### [Vlastní](#tab/npm-vlastni)

Zahrne všechny přímé balíčky ve zvoleném prefixu.

***

### [Záloha](#tab/npm-zaloha/npm-lokalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce npm -Rozsah Lokalni -Archiv ./archiv
```

Skript se zeptá na kořen projektu a vytvoří `./archiv`.

### [Záloha](#tab/npm-zaloha/npm-globalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce npm -Rozsah Globalni -Archiv ./archiv
```

Skript zjistí celý globální seznam a vytvoří `./archiv`.

Globální seznam patří právě používanému `npm prefix --global`, proto balíčky v jiném prefixu zálohuj přes kartu Vlastní.

### [Záloha](#tab/npm-zaloha/npm-vlastni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce npm -Rozsah Vlastni -Archiv ./archiv
```

Skript se zeptá na stávající prefix a vytvoří `./archiv`.

### [Obnova](#tab/npm-obnova/npm-lokalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej cestu ke stejnému projektu na cílovém počítači.

### [Obnova](#tab/npm-obnova/npm-globalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Po dokončení ověř příkaz nainstalovaného nástroje.

### [Obnova](#tab/npm-obnova/npm-vlastni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej nový cílový prefix a spusť nástroj jeho úplnou cestou.

***

## pnpm

Skript zálohuje offline store a při obnově jej sloučí do úložiště pnpm.

Jinou cílovou cestu určíš pomocí `-ObnoveneUloziste`.

### [Lokální](#tab/pnpm-lokalni)

Projekt vyžaduje `package.json` a `pnpm-lock.yaml`.

Závislosti se vrátí do `node_modules`.

Workspace, místní a nestandardní zdroje skript odmítne.

### [Globální](#tab/pnpm-globalni)

Zahrne všechny nástroje z `pnpm list --global --depth=0`.

Na obou počítačích nastav správné `PNPM_HOME`.

### [Vlastní](#tab/pnpm-vlastni)

Zadané `PNPM_HOME` určuje instalační složku nástrojů.

***

### [Záloha](#tab/pnpm-zaloha/pnpm-lokalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pnpm -Rozsah Lokalni -Archiv ./archiv
```

### [Záloha](#tab/pnpm-zaloha/pnpm-globalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pnpm -Rozsah Globalni -Archiv ./archiv
```

### [Záloha](#tab/pnpm-zaloha/pnpm-vlastni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pnpm -Rozsah Vlastni -Archiv ./archiv
```

### [Obnova](#tab/pnpm-obnova/pnpm-lokalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej kořen cílového projektu.

### [Obnova](#tab/pnpm-obnova/pnpm-globalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Ověř obnovený příkaz nástroje.

### [Obnova](#tab/pnpm-obnova/pnpm-vlastni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej nové `PNPM_HOME` a ověř jeho spouštěče.

***

## Python a pip

Skript vytvoří wheelhouse ověřený instalací bez indexu.

Editovatelné, Git, URL a místní zdroje odmítne.

### [Lokální](#tab/pip-lokalni)

Zadej Python z existujícího `.venv` a kořen projektu.

Obnova vytvoří nové `.venv`.

### [Globální](#tab/pip-globalni)

Tato záložka znamená instalaci aktuálního uživatele pomocí `pip install --user`.

Systémovou instalaci se zvýšenými právy skript nemění.

### [Vlastní](#tab/pip-vlastni)

Zadej adresář balíčků nainstalovaných pomocí `pip install --target`.

Po obnově nastav pro spuštění aplikace `PYTHONPATH` na obnovený adresář.

***

### [Záloha](#tab/pip-zaloha/pip-lokalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pip -Rozsah Lokalni -Archiv ./archiv
```

### [Záloha](#tab/pip-zaloha/pip-globalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pip -Rozsah Globalni -Archiv ./archiv
```

### [Záloha](#tab/pip-zaloha/pip-vlastni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce pip -Rozsah Vlastni -Archiv ./archiv
```

### [Obnova](#tab/pip-obnova/pip-lokalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej kompatibilní základní Python a kořen cílového projektu bez `.venv`.

### [Obnova](#tab/pip-obnova/pip-globalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej Python cílového uživatele.

### [Obnova](#tab/pip-obnova/pip-vlastni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej Python a novou prázdnou cílovou složku.

***

## NuGet

Kořen projektu musí obsahovat právě jeden projektový soubor a jeho `packages.lock.json`.

Archiv obsahuje místní feed `.nupkg` pro uzamčenou obnovu.

### [Záloha](#tab/nuget-zaloha)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce nuget -Rozsah Lokalni -Archiv ./archiv
```

Zadej kořen projektu a archiv vznikne v `./archiv`.

### [Obnova](#tab/nuget-obnova)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej kořen shodného projektu.

Skript po obnově spustí `dotnet build --no-restore`.

***

## .NET tools

Archiv obsahuje místní NuGet feed ověřený zkušební obnovou.

### [Lokální](#tab/tools-lokalni)

Projekt potřebuje `.config/dotnet-tools.json` nebo kořenový `dotnet-tools.json` podle verze SDK.

### [Globální](#tab/tools-globalni)

Zahrne všechny nástroje aktuálního účtu z `dotnet tool list --global`.

### [Vlastní](#tab/tools-vlastni)

Zahrne nástroje ze zadané složky `--tool-path` a obnoví je do nové cílové složky.

***

### [Záloha](#tab/tools-zaloha/tools-lokalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce dotnet-tools -Rozsah Lokalni -Archiv ./archiv
```

### [Záloha](#tab/tools-zaloha/tools-globalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce dotnet-tools -Rozsah Globalni -Archiv ./archiv
```

### [Záloha](#tab/tools-zaloha/tools-vlastni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce dotnet-tools -Rozsah Vlastni -Archiv ./archiv
```

### [Obnova](#tab/tools-obnova/tools-lokalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej kořen projektu s odpovídajícím manifestem.

### [Obnova](#tab/tools-obnova/tools-globalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

### [Obnova](#tab/tools-obnova/tools-vlastni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej novou cílovou složku a spusť nástroj její úplnou cestou.

***

## Dart a Flutter

Vyber projektové závislosti nebo globální nástroje `dart install`.

### [Lokální](#tab/dart-lokalni)

Projekt potřebuje `pubspec.yaml`, `pubspec.lock` a odpovídající SDK.

Zachovej `PUB_HOSTED_URL`.

Workspace, místní a Git zdroje skript odmítne.

### [Globální](#tab/dart-globalni)

Vyžaduje Dart 3.10+, Windows a stejnou architekturu.

Vlastní `DART_DATA_HOME` nastav před zálohou i obnovou.

Obnovené spouštěče najdeš v `install/bin`.

***

### [Záloha](#tab/dart-zaloha/dart-lokalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce dart -Rozsah Lokalni -Archiv ./archiv
```

Pro Flutter přidej `-DartPrikaz flutter` a přenes také Flutter SDK.

### [Záloha](#tab/dart-zaloha/dart-globalni)

```powershell
pwsh ./transfer.ps1 -Akce Zaloha -Spravce dart -Rozsah Globalni -Archiv ./archiv
```

### [Obnova](#tab/dart-obnova/dart-lokalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Zadej kořen shodného projektu.

### [Obnova](#tab/dart-obnova/dart-globalni)

```powershell
pwsh ./archiv/transfer.ps1 -Akce Obnova -Archiv ./archiv
```

Po dokončení spusť příkaz nástroje a ověř jeho výstup.

***

## Ověření výsledku a úklid

Na cíli spusť testy projektu nebo příkaz nástroje bez internetu.

Archiv si ponech, dokud neprojdou.

Úplnost archivu můžeš ověřit samostatně:

```powershell
pwsh ./archiv/transfer.ps1 -Akce Overeni -Archiv ./archiv
```

Úklid po ověření vyžaduje potvrzení `SMAZAT` a smaže celý archiv:

```powershell
pwsh ./archiv/transfer.ps1 -Akce Uklid -Archiv ./archiv
```

## Omezení

Archiv nepřenáší runtime, SDK, systémové knihovny, certifikáty, přihlašovací údaje ani data stahovaná instalačními skripty.

Složka bez `archiv.json` není dokončená záloha.

Minimální verze PowerShellu vychází z použitých funkcí pro [načítání JSON](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json#-ashashtable), [zápis UTF-8](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/set-content#-encoding) a [relativní cesty](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getrelativepath).

Kompatibilitu cíle určují [formát npm lockfilu](https://docs.npmjs.com/files/package-lock.json/), [offline instalace pnpm](https://pnpm.io/cli/install#--offline), [tagy Python wheel](https://packaging.python.org/en/latest/specifications/platform-compatibility-tags/), [varianty NuGet pro runtime](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog), [výběr .NET SDK](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json), [.NET runtime pro tools](https://learn.microsoft.com/en-us/dotnet/core/tools/troubleshoot-usage-issues) a [omezení Dart SDK](https://dart.dev/tools/pub/pubspec#sdk-constraints).

Požadavek pro globální Dart vychází z [nativních binárek `dart install`](https://dart.dev/tools/pub/cmd/pub-global) a jejich [vazby na architekturu](https://dart.dev/tools/dart-compile#subcommands).
