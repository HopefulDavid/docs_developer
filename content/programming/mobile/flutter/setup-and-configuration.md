---
description: "Příprava SDK a ověření nástrojů pro cílové platformy."
---

# Flutter – instalace a nastavení

Flutter používá Dart pro vývoj aplikací pro mobilní zařízení, web a desktop.

Potřebné nástroje se liší podle cílové platformy.

## Instalace ve Windows

1. Nainstaluje se Git for Windows.
2. Stabilní Flutter SDK se stáhne z [oficiálního instalačního postupu](https://docs.flutter.dev/install/manual).
3. SDK se rozbalí například do `C:\src\flutter`, mimo chráněné systémové složky a cesty s mezerami.
4. `C:\src\flutter\bin` se přidá do uživatelské proměnné `PATH`.
5. Po novém otevření terminálu i IDE se ověří instalace:

```powershell
flutter --version
flutter doctor -v
```

`doctor` vypíše chybějící nástroje.

Řeší se především platforma, pro kterou se aplikace sestavuje.

## Android toolchain

Připraví se [SDK, emulátor nebo telefon v Android Studiu](../android-studio.md).

Sestavování pro iOS vyžaduje macOS a Xcode. [Nastavení iOS](https://docs.flutter.dev/platform-integration/ios/setup)

## Vývoj webových aplikací

Ze složky projektu:

```powershell
flutter run -d chrome
```

Ve Windows lze zvolit také `-d edge`.

Pro ruční otevření jiného prohlížeče slouží `flutter run -d web-server` a adresa vypsaná terminálem. [Spuštění webové aplikace](https://docs.flutter.dev/platform-integration/web/building)

## Telemetrie

Odesílání analytických údajů a hlášení pádů vypne příkaz:

```powershell
flutter --disable-analytics
```

Tato volba nevypíná statickou analýzu kódu. [Hlášení pádů a telemetrie](https://docs.flutter.dev/reference/crash-reporting)

Další krok je [vytvoření projektu](create-project.md).
