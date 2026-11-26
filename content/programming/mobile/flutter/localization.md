---
description: "Překlady pomocí ARB souborů a generování lokalizačních tříd."
---

# Flutter – lokalizace

Vestavěný generátor `gen-l10n` vytváří typované překlady ze souborů ARB.

Tento postup nepotřebuje balíček `intl_utils`.

## 1. Závislosti a generování

V kořeni projektu:

```powershell
flutter pub add flutter_localizations --sdk=flutter
flutter pub add intl:any
```

Do existující sekce `flutter:` v `pubspec.yaml` se doplní `generate: true`.

Druhá sekce stejného názvu nevzniká.

Soubor `l10n.yaml`:

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

Následuje `flutter gen-l10n`.

Vygenerované soubory se ručně neupravují.

## 3. Napojení aplikace

Import v `lib/main.dart`:

```dart
import 'l10n/app_localizations.dart';
```

Do existujícího `MaterialApp` se doplní tyto parametry:

```dart
localizationsDelegates: AppLocalizations.localizationsDelegates,
supportedLocales: AppLocalizations.supportedLocales,
```

Widget pod tímto `MaterialApp` používá jeho `BuildContext`:

```dart
Text(AppLocalizations.of(context)!.welcome)
```

Kontext nad `MaterialApp` ještě lokalizace neobsahuje.

Ověří se přepnutí jazyka zařízení mezi češtinou a angličtinou a zobrazení obou textů. [Oficiální lokalizační postup](https://docs.flutter.dev/ui/internationalization)
