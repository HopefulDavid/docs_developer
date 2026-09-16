---
description: "Přenos Dart nebo Flutter projektu s celou pub cache a obnova uzamčených balíčků bez internetu."
---

# Dart a Flutter – záloha a obnova balíčků pub

K offline obnově potřebuješ **projekt s `pubspec.lock` a celou pub cache**, tedy složku stažených balíčků.

Postup je pro PowerShell a Dart 3.

Na cíli použij stejnou verzi SDK, OS a architekturu.

U Flutter projektu nahraď v příkazech `dart pub` za `flutter pub`, aby se použil Dart dodaný s Flutter SDK.

## 1. Připrav zálohu s internetem

Vytvoř `zaloha-pub/projekt` jako kopii zdrojového projektu bez generovaných `.dart_tool` a `build`.

Zachovej `pubspec.yaml`, `pubspec.lock`, celý workspace, případné overrides a místní `path:` závislosti v odpovídajících cestách.

V této kopii projektu spusť:

```powershell
$env:PUB_CACHE = Join-Path $PWD "../pub-cache"
dart pub get --enforce-lockfile
```

První řádek zvolí sousední složku pro balíčky.

Druhý ji naplní verzemi z lockfilu. [PUB_CACHE](https://dart.dev/tools/pub/environment-variables), [pub get](https://dart.dev/tools/pub/cmd/pub-get)

Pokud projekt lockfile dosud nemá, proveď nejprve běžné `dart pub get` a vzniklý `pubspec.lock` uchovej.

## 2. Přenes celou složku

```text
zaloha-pub/
  projekt/       zdroje, konfigurace a pubspec.lock
  pub-cache/     celá naplněná cache
```

Kopíruj až po dokončení stahování a zachovej metadata, hashe i případné Git závislosti.

Samotná podsložka `hosted` nemusí stačit.

Přípravnou `.dart_tool` nepřenášej, protože mapování cest vytvoří pub na cíli znovu. [Generované soubory](https://dart.dev/tools/pub/private-files)

Přilož výstup `dart --version` nebo `flutter --version` a archiv odpovídajícího SDK.

## 3. Obnov bez internetu

Na cíli rozbal pracovní kopii zálohy a v jejím `projekt` spusť:

```powershell
$env:PUB_CACHE = Join-Path $PWD "../pub-cache"
dart pub get --offline --enforce-lockfile
dart pub deps
```

`--offline` použije místní cache a `--enforce-lockfile` zachová uzamčené verze i kontrolní hashe.

Potom spusť `dart analyze`, běžnou aplikaci a její testy.

Pro Flutter použij `flutter analyze` a `flutter test`.

Nastavení `PUB_CACHE` platí pro aktuální terminál a procesy z něj spuštěné.

Při další práci použij stejnou cestu také v novém terminálu či IDE.

## Chci zálohovat už používanou cache

Místo nového stahování můžeš převzít celou stávající cache:

| Prostředí | Výchozí umístění |
|---|---|
| Windows | `%LOCALAPPDATA%/Pub/Cache` |
| Linux a macOS | `~/.pub-cache` |

Pokud máš nastavenou proměnnou `PUB_CACHE`, kopíruj adresář z ní.

V PowerShellu ji zobrazíš přes `$env:PUB_CACHE`.

Ulož jej jako `pub-cache` a obnovuj podle kroku 3.

Pro více projektů nejprve obnov jejich balíčky a uchovej zdroje i lockfile každého z nich.

## CLI nástroje

Seznam globálních nástrojů získáš přes `dart pub global list`.

Pro snadnou offline obnovu použij samostatný projekt nástrojů, například s internetem:

```bash
dart create -t console nastroje
cd nastroje
dart pub add --dev dhttpd:4.1.0
dart run dhttpd --help
```

Tento projekt zazálohuj výše uvedenými kroky a po offline obnově spouštěj nástroj ze složky projektu přes `dart run`.

`dhttpd` a `4.1.0` nahraď svým nástrojem a verzí, pokud podporuje tento způsob spuštění.

`dart pub global activate` nemá přepínač `--offline`.

S internetem lze použít například `dart pub global activate dhttpd 4.1.0`. [Pub global](https://dart.dev/tools/pub/cmd/pub-global), [implementace aktivace](https://github.com/dart-lang/pub/blob/master/lib/src/command/global_activate.dart)

## Co potřebuje navíc Flutter

Pub cache obsahuje Dart balíčky, ale ne celý Flutter engine, Android SDK, Gradle/Maven cache, Xcode nebo CocoaPods.

Před odpojením spusť `flutter precache` pro potřebné platformy, proveď jejich skutečný build a uchovej použitá SDK i platformní cache. [Flutter CLI](https://docs.flutter.dev/reference/flutter-cli)

Podrobnosti vlastní [záloha a obnova Flutteru](../mobile/flutter/backup-and-restore.md).

U Git závislostí uchovej připnutý commit v cache a nainstalovaný Git.

Úplnost zálohy vždy ověř obnovením a spuštěním bez připojení.

S internetem stačí projekt a `dart pub get --enforce-lockfile`, případně stejný příkaz přes `flutter pub`.
