# Flutter – příkazy

Projektové příkazy spouštěj ve složce s `pubspec.yaml`.

| Účel | Příkaz |
|---|---|
| Verze SDK | `flutter --version` |
| Diagnostika prostředí | `flutter doctor -v` |
| Dostupná zařízení | `flutter devices` |
| Obnova závislostí | `flutter pub get` |
| Přehled aktualizací balíčků | `flutter pub outdated` |
| Statická analýza | `flutter analyze` |
| Testy | `flutter test` |
| Spuštění | `flutter run` |
| Sestavení Android APK | `flutter build apk` |
| Sestavení webu | `flutter build web` |
| Generování překladů | `flutter gen-l10n` |
| Nápověda konkrétního příkazu | `flutter help build` |

Sestavení vyžaduje nástroje cílové platformy. [Reference CLI](https://docs.flutter.dev/reference/flutter-cli)

## Aktualizace a čištění

`flutter pub upgrade` znovu vyřeší závislosti v povolených rozsazích a může změnit lockfile; změny zkontroluj a otestuj. [Pub upgrade](https://dart.dev/tools/pub/cmd/pub-upgrade)

`flutter upgrade` aktualizuje SDK v aktuálním kanálu, proto jej nepřidávej do běžné obnovy projektu.

`flutter clean` odstraní generované složky `build/` a `.dart_tool/`; používej jej při diagnostice problémů s těmito výstupy, následně spusť `flutter pub get`. [Reference CLI](https://docs.flutter.dev/reference/flutter-cli)
