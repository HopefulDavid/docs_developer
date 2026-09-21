---
description: "Základní příkazy pub pro balíčky projektů Dart a Flutter a CLI nástroje."
---

# Dart a Flutter pub

Pub spravuje balíčky projektů Dart a Flutter podle `pubspec.yaml` a `pubspec.lock`.

Pro přenos balíčků použij [zálohu a obnovu bez internetu](backup-and-restore.md#dart-a-flutter).

## Základní příkazy

Příkazy projektových záložek spusť ve složce s `pubspec.yaml`.

Zápis `<balíček>` nahraď názvem z pub.dev a další značky vykládá [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [Dart projekt](#tab/pub-dart)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat běhovou závislost | `dart pub add <balíček>[:<omezení-verze>]` | Upraví `pubspec.yaml`, stáhne balíčky a aktualizuje lockfile |
| Přidat vývojovou závislost | `dart pub add dev:<balíček>[:<omezení-verze>]` | Zapíše balíček do `dev_dependencies` |
| Odebrat přímou závislost | `dart pub remove <balíček>` | Odebere balíček z pubspecu a přepočítá závislosti |
| Obnovit deklarované balíčky | `dart pub get` | Stáhne závislosti a vytvoří potřebná metadata projektu |
| Vypsat strom závislostí | `dart pub deps` | Zobrazí přímé i nepřímé balíčky |
| Najít dostupné aktualizace | `dart pub outdated` | Porovná aktuální, povolené a nejnovější verze |
| Aktualizovat balíčky | `dart pub upgrade [<balíček>]` | Aktualizuje lockfile v mezích `pubspec.yaml` |

### [Flutter projekt](#tab/pub-flutter)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Přidat běhovou závislost | `flutter pub add <balíček>[:<omezení-verze>]` | Upraví pubspec a použije Dart dodaný s Flutter SDK |
| Přidat vývojovou závislost | `flutter pub add dev:<balíček>[:<omezení-verze>]` | Zapíše balíček do `dev_dependencies` |
| Odebrat přímou závislost | `flutter pub remove <balíček>` | Odebere balíček a přepočítá závislosti |
| Obnovit deklarované balíčky | `flutter pub get` | Stáhne závislosti Flutter projektu |
| Vypsat strom závislostí | `flutter pub deps` | Zobrazí přímé i nepřímé balíčky |
| Najít dostupné aktualizace | `flutter pub outdated` | Porovná aktuální, povolené a nejnovější verze |
| Aktualizovat balíčky | `flutter pub upgrade [<balíček>]` | Aktualizuje lockfile v mezích `pubspec.yaml` |

### [CLI nástroje od Dart 3.10](#tab/pub-tools)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Nainstalovat nástroj | `dart install <balíček>[@<omezení-verze>]` | Nainstaluje spustitelné soubory balíčku pro aktuální účet |
| Vypsat nainstalované nástroje | `dart installed` | Zobrazí balíčky instalované přes `dart install` |
| Aktualizovat nástroj | `dart install <balíček>[@<nové-omezení-verze>]` | Znovu nainstaluje vybranou dostupnou verzi |
| Odinstalovat nástroj | `dart uninstall <balíček>` | Odebere nástroj instalovaný přes `dart install` |

***

Po změně závislostí spusť `dart analyze` a testy, u Flutteru `flutter analyze` a `flutter test`.

Oficiální dokumentace rozlišuje [příkazy pub](https://dart.dev/tools/pub/cmd), [použití balíčků ve Flutteru](https://docs.flutter.dev/packages-and-plugins/using-packages) a moderní [`dart install`](https://dart.dev/tools/dart-install).
