# Flutter – záloha a obnova

Obnovitelný projekt potřebuje zdrojové soubory, konfiguraci, prostředky a záznam použité verze SDK.

## Co uchovat

- Zdrojový kód včetně platformních složek, testů a prostředků.
- `pubspec.yaml` a u aplikace také `pubspec.lock`.
- `.metadata`, `.gitignore` a ostatní projektové konfigurace.
- Výstup `flutter --version` pro výběr stejného SDK při obnově.
- Podpisové klíče, hesla a neveřejné konfigurace v oddělené chráněné záloze.

Složky `build/` a `.dart_tool/` lze znovu vytvořit; nejsou náhradou zdrojů. [Co verzovat podle Dart pub](https://dart.dev/tools/pub/private-files)

Git uchovává pouze přidané a commitnuté soubory, proto samostatně zkontroluj necommitnuté a ignorované soubory.

## Obnova na novém počítači

1. Obnov zdroje z repozitáře nebo zálohy do nové složky.
2. Nainstaluj odpovídající Flutter SDK a [nástroje cílové platformy](setup-and-configuration.md).
3. Obnov potřebné neveřejné konfigurace a podpisové klíče.
4. V kořeni projektu spusť:

```powershell
flutter pub get
flutter analyze
flutter test
flutter run
```

`pub get` využívá lockfile, pokud jeho verze vyhovují projektu; chybějící balíčky musí být dostupné v síti nebo místní cache. [Obnova závislostí](https://dart.dev/tools/pub/cmd/pub-get)

Ověř také načtení prostředků a přístup k používaným službám; úspěšné stažení balíčků samo nepotvrzuje úplnou obnovu.
