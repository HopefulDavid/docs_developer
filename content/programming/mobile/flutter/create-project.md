---
description: "Založení aplikace, spuštění na zařízení a vytvoření sestavení."
---

# Flutter – vytvoření projektu

Nový projekt vzniká ve složce pro zdrojové kódy.

Předem se ověří [instalace SDK](setup-and-configuration.md).

## Vytvoření a kontrola

```powershell
flutter create moje_aplikace
cd moje_aplikace
flutter analyze
flutter test
flutter devices
flutter run
```

Název nové složky má tvar `lowercase_with_underscores`.

Při více dostupných zařízeních se cíl vybere v terminálu nebo se přidá `-d` s jeho ID z výpisu.

Po spuštění se ověří, že se výchozí aplikace zobrazí a její tlačítko změní počítadlo. [CLI Flutteru](https://docs.flutter.dev/reference/flutter-cli)

## Kde začít upravovat

| Cesta | Účel |
|---|---|
| `lib/main.dart` | Vstupní bod a výchozí uživatelské rozhraní |
| `test/widget_test.dart` | Test výchozího rozhraní. Při jeho změně se upraví i očekávání testu |
| `pubspec.yaml` | Závislosti a deklarace prostředků |
| `android/`, `ios/`, `web/` a desktopové složky | Konfigurace a nativní část jednotlivých platforem |

Po uložení změny textu spustí hot reload klávesa `r` v běžícím `flutter run`.

Klávesa `R` provede hot restart a ztratí aktuální stav aplikace.

`q` běh ukončí. [Hot reload](https://docs.flutter.dev/tools/hot-reload)
