---
description: "Záloha pub cache a uzamčených závislostí Dart či Flutter, včetně offline používání CLI nástrojů."
---

# Dart a Flutter – záloha a obnova balíčků pub

Pub obnovuje balíčky podle `pubspec.yaml` a vyřešené verze zaznamenává do `pubspec.lock`.

Pro offline obnovu uchovej také celou **pub cache**; zdrojový projekt, cache a SDK jsou tři samostatné části zálohy.

## Obnova s internetem

Přenes zdroje, `pubspec.yaml`, `pubspec.lock` a používané lokální balíčky či workspace.

S odpovídajícím Dart SDK v kořeni projektu:

```bash
dart pub get --enforce-lockfile
```

Pro Flutter použij `flutter pub get --enforce-lockfile`, aby se použila verze Dartu dodaná s Flutter SDK.

`--enforce-lockfile` odmítne nesoulad manifestu, lockfilu nebo kontrolních hashů; starší SDK bez této volby vyžaduje kontrolu nezměněného lockfilu po obnově. [Pub get](https://dart.dev/tools/pub/cmd/pub-get)

## 1. Naplň samostatnou cache

Příklad používá **PowerShell a Dart 3** ve fungujícím projektu s hotovým lockfile:

```powershell
$env:PUB_CACHE = [IO.Path]::GetFullPath("../zaloha-pub/pub-cache")
dart --version
dart pub get --enforce-lockfile
dart pub deps
```

Proměnná přesměruje cache pro toto okno a jeho potomky; s internetem se sem stáhnou balíčky projektu. [PUB_CACHE](https://dart.dev/tools/pub/environment-variables)

Pokud lockfile ještě nemáš, nejprve proveď běžné `dart pub get`, prohlédni výsledek a přidej lockfile do zálohy i při archivaci knihovny.

U Flutter projektu použij `flutter --version`, `flutter pub get --enforce-lockfile` a `flutter pub deps`.

V Bashi nastav místo prvního řádku `export PUB_CACHE="/absolutni/cesta/zaloha-pub/pub-cache"`.

## 2. Přenes zálohu

Po dokončení instalací uchovej:

```text
zaloha-pub/
  projekt/       zdroje, pubspec.yaml, pubspec.lock a konfigurace
  pub-cache/     celá naplněná cache
  verze.txt      Dart nebo Flutter, OS a architektura
```

Přidej všechny `path:` závislosti v odpovídajících relativních cestách, soubory overrides a celý workspace, pokud je používáš.

Git závislosti potřebují připnutý commit dostupný v přenesené cache i nástroj Git; jejich obnovu vyzkoušej před odpojením.

Celou generovanou `.dart_tool` nepřenášej jako podmínku obnovy; mapování cest do cache vytvoří pub na cíli znovu. [Generované soubory pub](https://dart.dev/tools/pub/private-files)

## 3. Obnov bez internetu

V `zaloha-pub/projekt` na kompatibilním cíli se stejnou verzí SDK:

```powershell
$env:PUB_CACHE = [IO.Path]::GetFullPath("../pub-cache")
dart pub get --offline --enforce-lockfile
dart pub deps
dart analyze
```

`--offline` vyhledává balíčky pouze v místní cache a `--enforce-lockfile` chrání původní výběr verzí.

Nakonec spusť vlastní aplikaci a testy, například `dart test`, pokud projekt používá balíček `test`.

U Flutteru použij `flutter pub get --offline --enforce-lockfile`, `flutter analyze` a `flutter test`.

Pokud projekt používá sdílený workspace lockfile, obnovuj z kořene workspace.

## Záloha celé stávající cache

Místo nové cache můžeš převzít již používanou:

| Prostředí | Výchozí cesta, pokud není nastavený PUB_CACHE |
|---|---|
| Windows | `%LOCALAPPDATA%/Pub/Cache` |
| Linux a macOS | `~/.pub-cache` |

V PowerShellu zjisti přesměrování přes `$env:PUB_CACHE`.

Zkopíruj celý skutečný adresář jako `pub-cache`, včetně metadat, hashů a Git části; samotný výběr podsložky `hosted` nemusí stačit.

Před zálohou obnov všechny požadované projekty a nepoužívej `pub cache clean`.

## Nástroje aktivované globálně

Inventář vypíše `dart pub global list`; s internetem lze přesnou verzi obnovit například přes `dart pub global activate dhttpd 4.1.0`. [Pub global](https://dart.dev/tools/pub/cmd/pub-global)

**Globální aktivace nemá přepínač `--offline`**; ani kopie spouštěčů v `pub-cache/bin` sama neřeší cesty k původní cache. [Implementace global activate](https://github.com/dart-lang/pub/blob/master/lib/src/command/global_activate.dart)

Pro připravené offline používání vytvoř s internetem samostatný projekt nástrojů:

```bash
dart create -t console nastroje
cd nastroje
dart pub add --dev dhttpd:4.1.0
dart run dhttpd --help
```

`dhttpd` je ukázkový CLI balíček; dosaď nástroj a přesnou verzi z inventáře, pokud podporuje spuštění přes `dart run`.

Tento projekt včetně lockfilu potom zazálohuj výše uvedeným postupem a na cíli obnov přes `pub get --offline --enforce-lockfile`.

Nástroj spouštěj z obnoveného projektu přes `dart run dhttpd --help`; tím se vyhneš potřebě nové globální aktivace.

## Flutter potřebuje i platformní nástroje

Pub cache neobsahuje celé Flutter SDK, artefakty enginu, Android SDK, Gradle a Maven cache, Xcode ani CocoaPods.

Při přípravě spusť `flutter precache` pro potřebné cílové platformy a proveď jejich skutečný build s internetem; použité SDK a platformní cache zálohuj samostatně. [Flutter CLI](https://docs.flutter.dev/reference/flutter-cli)

Rozsah celého projektu popisuje [záloha a obnova Flutteru](../mobile/flutter/backup-and-restore.md).

Úspěšné `pub get` potvrzuje obnovu Dart balíčků; úplnou obnovu prokáže až build a spuštění cílové aplikace bez sítě.

## Pokud obnova selže

| Situace | Co doplnit |
|---|---|
| Chybí přesná verze offline | Balíček odpovídající uloženému lockfilu |
| Nesouhlasí SDK constraint | Původní kompatibilní Dart nebo Flutter SDK |
| Chybí `path:` závislost | Lokální zdroj ve správné relativní cestě |
| Git chce síť | Cache konkrétního připnutého commitu |
| Pub projde, build selže | Platformní cache, generátor nebo jiná data mimo pub |
