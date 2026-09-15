---
description: "Překlady pomocí ARB souborů a generování lokalizačních tříd."
---

# Flutter – lokalizace

Vestavěný generátor `gen-l10n` vytváří typované překlady ze souborů ARB.

Tento postup nepotřebuje balíček `intl_utils`.

## 1. Závislosti a generování

V kořeni projektu spusť:

```powershell
flutter pub add flutter_localizations --sdk=flutter
flutter pub add intl:any
```

Do existující sekce `flutter:` v `pubspec.yaml` doplň `generate: true`.

Nevytvářej druhou sekci stejného názvu.

Vytvoř `l10n.yaml`:

```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

## 2. Texty

Soubor `lib/l10n/app_en.arb`:

```json
{
  "@@locale": "en",
  "welcome": "Welcome"
}
```

Soubor `lib/l10n/app_cs.arb`:

```json
{
  "@@locale": "cs",
  "welcome": "Vítejte"
}
```

Spusť `flutter gen-l10n`.

Vygenerované soubory ručně neupravuj.

## 3. Napojení aplikace

V `lib/main.dart` importuj:

```dart
import 'l10n/app_localizations.dart';
```

Do existujícího `MaterialApp` doplň tyto parametry:

```dart
localizationsDelegates: AppLocalizations.localizationsDelegates,
supportedLocales: AppLocalizations.supportedLocales,
```

Ve widgetu pod tímto `MaterialApp` použij jeho `BuildContext`:

```dart
Text(AppLocalizations.of(context)!.welcome)
```

Kontext nad `MaterialApp` ještě lokalizace neobsahuje.

Ověř přepnutí jazyka zařízení mezi češtinou a angličtinou a zobrazení obou textů. [Oficiální lokalizační postup](https://docs.flutter.dev/ui/internationalization)
