## 🚀 Flutter – Přehled příkazů

| 🗂️ **Kategorie**         | 💻 **Příkaz**                            | 📝 **Popis**                                                                                      |
|--------------------------|------------------------------------------|---------------------------------------------------------------------------------------------------|
| 🏷️ **Verze a kanály**    | `flutter --version`                      | Zobrazí verzi Flutter SDK, Dart SDK a aktivní kanál.                                              |
|                          | `flutter upgrade`                        | Aktualizuje Flutter SDK.                                                                          |
|                          | `flutter downgrade`                      | Vrátí Flutter SDK na předchozí verzi.                                                             |
|                          | `flutter channel`                        | Zobrazí dostupné kanály (`stable`, `beta`, `dev`, `master`).                                      |
|                          | `flutter channel stable`                 | Přepne na stabilní kanál.                                                                         |
|                          | `flutter channel beta`                   | Přepne na beta kanál.                                                                             |
| 🩺 **Diagnostika**        | `flutter doctor`                         | Zkontroluje nastavení Flutteru.                                                                   |
|                          | `flutter doctor -v`                      | Detailní výstup diagnostiky.                                                                      |
| 📦 **Závislosti**         | `flutter pub get`                        | Stáhne závislosti z `pubspec.yaml`.                                                               |
|                          | `flutter pub upgrade`                    | Aktualizuje závislosti.                                                                           |
|                          | `flutter pub cache repair`               | Opraví cache závislostí.                                                                          |
| 🛠️ **Projekt**           | `flutter create project_name`            | Vytvoří nový projekt.                                                                             |
|                          | `flutter run`                            | Spustí aplikaci.                                                                                  |
|                          | `flutter build apk`                      | Vytvoří produkční APK.                                                                            |
|                          | `flutter build ios`                      | Vytvoří build pro iOS (vyžaduje macOS a Xcode).                                                   |
|                          | `flutter clean`                          | Vyčistí build cache.                                                                              |
|                          | `flutter test`                           | Spustí testy.                                                                                     |
| 📱 **Zařízení**           | `flutter devices`                        | Zobrazí dostupná zařízení.                                                                        |
|                          | `flutter emulators`                      | Zobrazí dostupné emulátory.                                                                       |
|                          | `flutter emulators --launch emulator_id` | Spustí emulátor podle ID.                                                                         |
|                          | `flutter install`                        | Nainstaluje aplikaci na zařízení.                                                                 |
| 🧑‍💻 **Analýza a opravy** | `dart analyze`                           | Spustí analýzu kódu.                                                                              |
|                          | `dart fix --apply`                       | Aplikuje doporučené opravy.                                                                       |
| 📋 **Logy**               | `flutter logs`                           | Zobrazí logy aplikace.                                                                            |

---

> **Tip:**  
> Pro více informací ke konkrétnímu příkazu použij `--help` (např. `flutter run --help`).