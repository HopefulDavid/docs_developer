## Záloha, obnova a ukládání dat

### Umístění aplikačních dat

- **shared_preferences.json**: `%APPDATA%\com.example\xxx_app`
    - `%APPDATA%` – uživatelská data (`C:\Users\<uživatel>\AppData\Roaming`)
    - `com.example` – identifikátor aplikace
    - `xxx_app` – název aplikace
    - `shared_preferences.json` – uložená data

---

### Záloha závislostí

Zálohujte složku `.pub-cache`:

- **Windows**: `C:\Users\<uživatelské_jméno>\AppData\Local\Pub\Cache`
- **macOS/Linux**: `/Users/<uživatelské_jméno>/.pub-cache`

- `hosted` – balíčky z repozitářů ([pub.dev](https://pub.dev/))
- `hosted-hashes` – hash soubory pro ověření integrity
- `temp` – dočasné soubory při stahování balíčků

---

### Obnova závislostí

Obnovte obsah složky `.pub-cache` do původního umístění.