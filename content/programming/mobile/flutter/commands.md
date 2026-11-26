---
description: "Syntaxe příkazů pro spuštění, testování a sestavení aplikace."
---

# Flutter – příkazy

Projektové příkazy se spouštějí ve složce s `pubspec.yaml`.

| Účel | Syntaxe |
|---|---|
| Verze SDK | `flutter --version` |
| Diagnostika prostředí | `flutter doctor -v` |
| Dostupná zařízení | `flutter devices` |
| Obnova závislostí | `flutter pub get` |
| Přehled aktualizací balíčků | `flutter pub outdated` |
| Statická analýza | `flutter analyze` |
| Testy | `flutter test` |
| Spuštění | `flutter run [-d <id-zařízení>]` |
| Sestavení Android APK | `flutter build apk` |
| Sestavení webu | `flutter build web` |
| Generování překladů | `flutter gen-l10n` |
| Nápověda konkrétního příkazu | `flutter help <příkaz>` |

`<id-zařízení>` pochází z výpisu `flutter devices`.

Například `flutter run -d chrome` spustí webovou aplikaci v prohlížeči, pokud je cíl Chrome dostupný.

`flutter help build` je příklad nápovědy pro sestavení.

Volitelný zápis v hranatých závorkách se při zadávání příkazu neopisuje.

Sestavení vyžaduje nástroje cílové platformy. [Reference CLI](https://docs.flutter.dev/reference/flutter-cli)

## Aktualizace a čištění

`flutter pub upgrade` znovu vyřeší závislosti v povolených rozsazích a může změnit lockfile.

Změny se zkontrolují a otestují. [Pub upgrade](https://dart.dev/tools/pub/cmd/pub-upgrade)

`flutter upgrade` aktualizuje SDK v aktuálním kanálu, proto nepatří do běžné obnovy projektu.

`flutter clean` odstraní generované složky `build/` a `.dart_tool/`.

Hodí se při diagnostice problémů s těmito výstupy, po něm následuje `flutter pub get`. [Reference CLI](https://docs.flutter.dev/reference/flutter-cli)
