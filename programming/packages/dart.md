---
description: "Přenos pub cache, uzamčených verzí a obnova závislostí Dart nebo Flutter offline."
---

# Dart a Flutter – záloha balíčků pub

Pub spravuje balíčky deklarované v `pubspec.yaml` a jejich konkrétní vyřešené verze zapisuje do `pubspec.lock`.

Stažené balíčky uchovává ve společné cache, kterou lze přenést na další kompatibilní počítač.

## Kde cache leží

| Prostředí | Výchozí umístění |
|---|---|
| Windows | `%LOCALAPPDATA%\Pub\Cache` |
| Linux a macOS | `~/.pub-cache` |
| Vlastní nastavení | Adresář určený proměnnou `PUB_CACHE` |

Ve Windows ověř vlastní přesměrování přes `$env:PUB_CACHE` v PowerShellu; prázdná hodnota znamená, že tento proces používá výchozí umístění.

Zálohuj celý adresář včetně metadat a hashů, nikoli jen vybranou podsložku `hosted`.

## Připrav samostatnou zálohu

Příklad pro PowerShell v kořeni existující aplikace:

```powershell
$env:PUB_CACHE = [IO.Path]::GetFullPath("../zaloha-pub/pub-cache")
dart --version
dart pub get
dart pub deps
```

Proměnná přesměruje cache pro toto okno; `pub get` s internetem doplní závislosti a `pub deps` vypíše jejich strom.

Pro Flutter použij v těchto operacích `flutter --version`, `flutter pub get` a `flutter pub deps`, aby se použila verze Dartu dodaná s Flutter SDK.

Na Bashi je odpovídající nastavení `export PUB_CACHE="/absolutni/cesta/pub-cache"`, kde cestu nahradíš svým cílem.

## Co přenést

- Celou připravenou `pub-cache`.
- Zdrojový projekt, `pubspec.yaml` a u aplikace `pubspec.lock`.
- Všechny balíčky zadané pomocí `path:` ve správných relativních umístěních.
- Používané Git závislosti a dostupné připnuté commity v pub cache; nespoléhej na to, že půjdou na cíli stáhnout.
- Stejnou verzi Dart nebo Flutter SDK a případné externí generátory či platformní nástroje.

V projektu nemusíš přenášet `.dart_tool/package_config.json`, protože obsahuje mapování místních cest, které na cíli znovu vytvoří pub.

## Obnova na cíli

Příklad předpokládá strukturu `zaloha-pub/projekt` a sousední `zaloha-pub/pub-cache`.

V kořeni obnoveného projektu:

```powershell
$env:PUB_CACHE = [IO.Path]::GetFullPath("../pub-cache")
dart pub get --offline --enforce-lockfile
dart analyze
dart test
```

`--offline` používá místní cache a `--enforce-lockfile` vyžaduje, aby obnova respektovala existující lockfile včetně kontrol obsahu.

Testovací příkaz předpokládá projekt s testy a odpovídající závislostí `test`; jinak spusť konkrétní testy či aplikaci svého projektu.

Pro Flutter použij `flutter pub get --offline --enforce-lockfile`, `flutter analyze` a `flutter test`.

Pokud verze SDK daného projektu volbu `--enforce-lockfile` nepodporuje, ověř `pub get --help` a po `--offline` zkontroluj, že se lockfile nezměnil.

## Flutter potřebuje více než pub

Offline Dart balíčky nezahrnují všechny artefakty Flutter enginu, Android SDK, Gradle a jeho Maven závislosti, Xcode ani CocoaPods.

Při přípravě Flutteru použij příslušný `flutter precache` pro své cílové platformy a proveď jejich skutečný build s internetem; tyto platformní cache a nástroje pak zálohuj zvlášť.

Úplnost prokáže až build a spuštění cílové varianty bez sítě, nikoli samotný úspěch `pub get`.

Celý projektový přenos popisuje [záloha Flutteru](../mobile/flutter/backup-and-restore.md).

## Časté problémy

| Hlášení nebo chování | Co napravit |
|---|---|
| Verzi nelze vyřešit offline | Zálohuj přesné balíčky z lockfilu a stejný SDK constraint |
| Chybí `path:` balíček | Přenes také lokální zdrojový adresář |
| Git závislost chce síť | Ověř předem cache konkrétního připnutého commitu |
| Pub projde, build selže | Doplň potřebnou platformní nebo nástrojovou vrstvu |

Zdroje: [PUB_CACHE](https://dart.dev/tools/pub/environment-variables), [pub get a offline režim](https://dart.dev/tools/pub/cmd/pub-get), [soukromé soubory pub](https://dart.dev/tools/pub/private-files), [Flutter CLI](https://docs.flutter.dev/reference/flutter-cli).
