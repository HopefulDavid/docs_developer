---
description: "Příprava SDK a ověření nástrojů pro cílové platformy."
---

# Flutter – instalace a nastavení

Flutter používá Dart pro vývoj aplikací pro mobilní zařízení, web a desktop; potřebné nástroje se liší podle cílové platformy.

## Instalace ve Windows

1. Nainstaluj Git for Windows.
2. Stáhni stabilní Flutter SDK z [oficiálního instalačního postupu](https://docs.flutter.dev/install/manual).
3. Rozbal SDK například do `C:\src\flutter`, mimo chráněné systémové složky a cesty s mezerami.
4. Přidej `C:\src\flutter\bin` do uživatelské proměnné `PATH`.
5. Znovu otevři terminál i IDE a ověř instalaci:

```powershell
flutter --version
flutter doctor -v
```

`doctor` vypíše chybějící nástroje; řeš především platformu, pro kterou budeš aplikaci sestavovat.

## Android toolchain

Připrav [SDK, emulátor nebo telefon v Android Studiu](../android-studio.md).

Pro sestavování iOS potřebuješ macOS a Xcode. [Nastavení iOS](https://docs.flutter.dev/platform-integration/ios/setup)

## Vývoj webových aplikací

Ze složky projektu spusť:

```powershell
flutter run -d chrome
```

Ve Windows lze zvolit také `-d edge`; pro ruční otevření jiného prohlížeče použij `flutter run -d web-server` a adresu vypsanou terminálem. [Spuštění webové aplikace](https://docs.flutter.dev/platform-integration/web/building)

## Telemetrie

Odesílání analytických údajů a hlášení pádů vypneš příkazem:

```powershell
flutter --disable-analytics
```

Tato volba nevypíná statickou analýzu kódu. [Hlášení pádů a telemetrie](https://docs.flutter.dev/reference/crash-reporting)

Pokračuj [vytvořením projektu](create-project.md).
