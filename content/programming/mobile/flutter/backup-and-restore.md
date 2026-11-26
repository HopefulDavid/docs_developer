---
description: "Přenos projektu, SDK a navazujících závislostí na další počítač."
---

# Flutter – záloha a obnova

Obnovitelný projekt potřebuje zdrojové soubory, konfiguraci, prostředky a záznam použité verze SDK.

## Co uchovat

- Zdrojový kód včetně platformních složek, testů a prostředků.
- `pubspec.yaml` a u aplikace také `pubspec.lock`.
- `.metadata`, `.gitignore` a ostatní projektové konfigurace.
- Výstup `flutter --version` pro výběr stejného SDK při obnově.
- Podpisové klíče, hesla a neveřejné konfigurace v oddělené chráněné záloze.

Složky `build/` a `.dart_tool/` lze znovu vytvořit.

Nejsou náhradou zdrojů. [Co verzovat podle Dart pub](https://dart.dev/tools/pub/private-files)

Git uchovává pouze přidané a commitnuté soubory, proto se samostatně kontrolují necommitnuté a ignorované soubory.

## Obnova na novém počítači

Pro cílový počítač bez internetu se nejprve připraví [offline záloha pub cache](../../packages/dart.md) a platformní nástroje.

Následující základní varianta předpokládá dostupný zdroj chybějících závislostí.

1. Zdroje se obnoví z repozitáře nebo zálohy do nové složky.
2. Nainstaluje se odpovídající Flutter SDK a [nástroje cílové platformy](setup-and-configuration.md).
3. Obnoví se potřebné neveřejné konfigurace a podpisové klíče.
4. V kořeni projektu se spustí:

```powershell
flutter pub get
flutter analyze
flutter test
flutter run
```

`pub get` využívá lockfile, pokud jeho verze vyhovují projektu.

Chybějící balíčky musí být dostupné v síti nebo místní cache. [Obnova závislostí](https://dart.dev/tools/pub/cmd/pub-get)

Ověří se také načtení prostředků a přístup k používaným službám.

Úspěšné stažení balíčků samo nepotvrzuje úplnou obnovu.
