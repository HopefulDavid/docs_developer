# Flutter – vytvoření projektu

Nový projekt vytvoř ve složce pro své zdrojové kódy; předem ověř [instalaci SDK](setup-and-configuration.md).

## Vytvoření a kontrola

```powershell
flutter create moje_aplikace
cd moje_aplikace
flutter analyze
flutter test
flutter devices
flutter run
```

Použij nový název složky ve tvaru `lowercase_with_underscores`.

Při více dostupných zařízeních vyber cíl v terminálu nebo přidej `-d` s jeho ID z výpisu.

Po spuštění ověř, že se výchozí aplikace zobrazí a její tlačítko změní počítadlo. [CLI Flutteru](https://docs.flutter.dev/reference/flutter-cli)

## Kde začít upravovat

| Cesta | Účel |
|---|---|
| `lib/main.dart` | Vstupní bod a výchozí uživatelské rozhraní |
| `test/widget_test.dart` | Test výchozího rozhraní; při jeho změně uprav i očekávání testu |
| `pubspec.yaml` | Závislosti a deklarace prostředků |
| `android/`, `ios/`, `web/` a desktopové složky | Konfigurace a nativní část jednotlivých platforem |

Změnu textu ulož a v běžícím `flutter run` stiskni `r` pro hot reload.

Klávesa `R` provede hot restart a ztratí aktuální stav aplikace; `q` běh ukončí. [Hot reload](https://docs.flutter.dev/tools/hot-reload)
