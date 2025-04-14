## Flutter

Používá se pro vývoj mobilních aplikací pro Android a iOS.

Využívá **Dart** jako programovací jazyk.

#### Instalace a vytvoření nového projektu

<details>
<summary><span style="color:#1E90FF;">Instalace</span></summary>

> [!IMPORTANT]
> Flutter používá `Git` pro správu závislostí, takže je potřeba mít nainstalovaný `Git`.

> [!IMPORTANT]
> Flutter vyžaduje nainstalovaný `Android Studio` pro vývoj aplikací pro Android.

<details>
<summary><span style="color:#E95A84;">Windows</span></summary>

1. Stáhnout Flutter SDK z [oficiálních stránek](https://flutter.dev/docs/get-started/install/windows)
2. Rozbalit ZIP soubor do složky, například: `C:\src\flutter`
   > [!IMPORTANT]
   > Cesta nesmí obsahovat mezery nebo speciální znaky
3. Přidat cestu k adresáři `flutter\bin` do proměnného prostředí `PATH`

4. Spuště nyní kontrolu zda je vše správně nastaveno:

    ```bash
    flutter doctor
    ```

5. Příkaz pro vypnutí analyzování:

    ```bash
    flutter config --no-analytics
    ```

> [!TIP]
> Pro kontrolu veškerého nastavení:
>
> ```bash
> flutter config
> ```

<details>
<summary><span style="color:#E95A84;">Android toolchain - develop for Android devices</span></summary>

1. Ujistěte se, že je nainstalován `Android Studio`
2. <img src="../../images/77fb408804c94851a06078aae17e694f.png">
3. <img src="../../images/5d7ee05eacb549d5ada6e1edef7a2e59.png">

</details>

<details>
<summary><span style="color:#E95A84;">Prohlížeč pro vývoj webových aplikací</span></summary>

Pokud chcete používat jiný prohlížeč než **Google Chrome**:

```bash
flutter config --no-web-browser
```

1. Použijte

    ```bash
    flutter run -d web-server
    ```

2. Otevřete ve vlastním prohlížeči a zadejte adresu `http://localhost:PORT/`

</details>

</details>
</details>

<details>
<summary><span style="color:#1E90FF;">Vytvoření nového projektu</span></summary>

```bash
flutter create project_name
```

Nyní můžete spustit aplikaci:

```bash
cd project_name
flutter run
```

</details>

#### Záloha/Obnova a ukládání dat

<details>
<summary><span style="color:#1E90FF;">Umístění aplikačních dat</span></summary>

Aplikační data jsou uložena v následujících lokacích:

- **shared_preferences.json**: `%APPDATA%\com.example\xxx_app`

  > [!NOTE]
  > Soubor se nachází v následující struktuře složek:
  > - `%APPDATA%` - složka s uživatelskými daty (`C:\Users\<uživatel>\AppData\Roaming`)
  > - `com.example` - identifikátor aplikace
  > - `xxx_app` - název aplikace
  > - `shared_preferences.json` - soubor s uloženými daty

</details>

<details>
<summary><span style="color:#1E90FF;">Záloha závislostí</span></summary>

Pro zálohování všech balíčků projektu při použití `flutter pub get`, můžete zálohovat složku `.pub-cache`, která obsahuje všechny stažené závislosti.

- **Windows**: `C:\Users\<uživatelské_jméno>\AppData\Local\Pub\Cache`
- **macOS** a **Linux**: `/Users/<uživatelské_jméno>/.pub-cache`

> [!TIP]
> Složka `hosted` obsahuje všechny balíčky stažené z veřejných (například: [pub.dev](https://pub.dev/)) nebo  soukromých repozitářů. (Hlavní úložiště pro závislosti projektu.)
> 
> Složka `hosted-hashes` obsahuje hash soubory, které slouží k ověření integrity balíčků uložených ve složce `hosted`. (Zajišťuje, že balíčky nebyly změněny.)
> 
> Složka `temp` obsahuje dočasné soubory, které jsou vytvořeny během stahování balíčků a jsou odstraněny po dokončení stahování.

</details>

<details>
<summary><span style="color:#1E90FF;">Obnova závislostí</span></summary>

Pro obnovení všech balíčků projektu zálohovaných v `.pub-cache`, stačí obnovit obsah složky `.pub-cache` do původního umístění.

- **Windows**: `C:\Users\<uživatelské_jméno>\AppData\Local\Pub\Cache`
- **macOS** a **Linux**: `/Users/<uživatelské_jméno>/.pub-cache`


> [!TIP]
> Složka `hosted` obsahuje všechny balíčky stažené z veřejných (například: [pub.dev](https://pub.dev/)) nebo  soukromých repozitářů. (Hlavní úložiště pro závislosti projektu.)
>
> Složka `hosted-hashes` obsahuje hash soubory, které slouží k ověření integrity balíčků uložených ve složce `hosted`. (Zajišťuje, že balíčky nebyly změněny.)
>
> Složka `temp` obsahuje dočasné soubory, které jsou vytvořeny během stahování balíčků a jsou odstraněny po dokončení stahování.

</details>

#### Základní znalosti

<details>
<summary><span style="color:#1E90FF;">Widget</span></summary>

Widget je základní stavební prvek Flutter aplikace a je zodpovědný za vykreslení uživatelského rozhraní.

Každý widget je buď `StatelessWidget` nebo `StatefulWidget`.

- `StatelessWidget` - neměnný widget, který se nemění během životního cyklu aplikace

  ```dart
    class MyStatelessWidget extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: Text('Stateless Widget Example'),
         ),
         body: Center(
           child: Text('This is a stateless widget'),
         ),
       );
     }
   }
  ```

- `StatefulWidget` - měnný widget, který se může měnit během životního cyklu aplikace

  ```dart
   // A StatefulWidget is a widget that has mutable state.
   class MyStatefulWidget extends StatefulWidget {
     @override
     _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
   }
   
   // This is the state class for MyStatefulWidget.
   // It holds the state of the widget and contains the logic to update the state.
   class _MyStatefulWidgetState extends State<MyStatefulWidget> {
     int _counter = 0;
   
     // This method increments the counter and calls setState to update the UI.
     void _incrementCounter() {
       setState(() {
         _counter++;
       });
     }
   
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: Text('Simple Stateful Widget Example'),
         ),
         body: Center(
           child: Column(
             mainAxisAlignment: MainAxisAlignment.center,
             children: <Widget>[
               Text('You have pushed the button this many times:'),
               Text('$_counter'),
             ],
           ),
         ),
         floatingActionButton: FloatingActionButton(
           onPressed: _incrementCounter,
           tooltip: 'Increment',
           child: Icon(Icons.add),
         ),
       );
     }
   }
   
   void main() {
     runApp(MaterialApp(
       home: MyStatefulWidget(),
     ));
   }
  ```

</details>

#### Příkazy

<details>
<summary><span style="color:#1E90FF;">Tabulka s příkazy</span></summary>

| Kategorie                | Příkaz                                   | Popis                                                                                             |
|--------------------------|------------------------------------------|---------------------------------------------------------------------------------------------------|
| **Verze a kanály**       | `flutter --version`                      | Zobrazí aktuální verzi Flutter SDK, Dart SDK a aktivní kanál.                                     |
|                          | `flutter upgrade`                        | Aktualizuje Flutter SDK na nejnovější verzi v aktuálním kanálu.                                   |
|                          | `flutter downgrade`                      | Vrátí Flutter SDK na předchozí verzi.                                                             |
|                          | `flutter channel`                        | Zobrazí aktuální kanál a seznam dostupných kanálů (stable, beta, dev, master).                    |
|                          | `flutter channel stable`                 | Přepne na stabilní kanál.                                                                         |
|                          | `flutter channel beta`                   | Přepne na beta kanál.                                                                             |
| **Diagnostika**          | `flutter doctor`                         | Zkontroluje nastavení Flutteru a zobrazí seznam chybějících nebo nesprávně nastavených komponent. |
|                          | `flutter doctor -v`                      | Detailní výstup diagnostiky Flutteru.                                                             |
| **Závislosti**           | `flutter pub get`                        | Stáhne závislosti uvedené v souboru `pubspec.yaml`.                                               |
|                          | `flutter pub upgrade`                    | Aktualizuje všechny závislosti na nejnovější kompatibilní verze.                                  |
|                          | `flutter pub cache repair`               | Opraví a znovu stáhne závislosti uložené v cache.                                                 |
| **Projektové příkazy**   | `flutter create project_name`            | Vytvoří nový Flutter projekt ve složce `project_name`.                                            |
|                          | `flutter run`                            | Spustí aplikaci na připojeném zařízení nebo emulátoru.                                            |
|                          | `flutter build apk`                      | Vytvoří produkční APK soubor aplikace.                                                            |
|                          | `flutter build ios`                      | Vytvoří produkční build pro iOS (vyžaduje macOS a Xcode).                                         |
|                          | `flutter clean`                          | Odstraní dočasné soubory a vyčistí build cache.                                                   |
|                          | `flutter test`                           | Spustí všechny testy definované v projektu.                                                       |
| **Zařízení a emulátory** | `flutter devices`                        | Zobrazí seznam připojených zařízení a dostupných emulátorů.                                       |
|                          | `flutter emulators`                      | Zobrazí seznam dostupných emulátorů.                                                              |
|                          | `flutter emulators --launch emulator_id` | Spustí specifický emulátor podle jeho ID.                                                         |
|                          | `flutter install`                        | Nainstaluje aplikaci na připojené zařízení.                                                       |
| **Analýza a opravy**     | `dart analyze`                           | Spustí analýzu kódu na projektu a zobrazí potenciální chyby nebo varování.                        |
|                          | `dart fix --apply`                       | Aplikuje doporučené opravy kódu podle výsledků analýzy.                                           |
| **Logy**                 | `flutter logs`                           | Zobrazí logy aplikace z běžící instance Flutteru.                                                 |

</details>

#### Balíčky

<details>
<summary><span style="color:#1E90FF;">Lokalizace (interní knihovna)</span></summary>

1. Přidání závislosti do souboru `pubspec.yaml`:

   Přidejte `flutter_localizations` viz. níže:

   ```yaml
   dependencies:
   #  Internal dependencies
   flutter:
        sdk: flutter
   flutter_localizations:
        sdk: flutter
   # External dependencies
   cupertino_icons: ^1.0.8
   flutter_svg: ^2.0.16
   ```

2. Vytvořte lokalizační soubory

    - `lib/l10n/intl_en.arb`, příklad souboru pro anglické texty

         ```json
             {
               "@@locale": "en",
               "hello": "Hello",
               "welcome": "Welcome"
             }
         ```

    - `lib/l10n/intl_cs.arb`, příklad souboru pro české texty

         ```json
        {
            "@@locale": "cs",
            "hello": "Ahoj",
            "welcome": "Vítejte"
        }
        ```
   > [!NOTE]
   > `@@locale`, definuje jazykovou verzi překladu obsaženou v souboru `.arb`.

   > [!TIP]
   > Pokud chcete nastavit výchozí lokalizační soubor bez nutnosti mít `intl_messages.arb`, musíte nastavit výchozí
   jazyk ve vašem Flutter kódu.
   >
   > ```c++
   > // Material design for applications
   > import 'package:flutter/material.dart';
   > // Localization
   > import 'package:flutter_localizations/flutter_localizations.dart';
   > import 'generated/l10n.dart';
   >	
   > void main() {
   >    runApp(MyApp());
   > }
   >	
   >   class MyApp extends StatelessWidget {
   >   @override
   >   Widget build(BuildContext context) {
   >   		return MaterialApp(
   >   			localizationsDelegates: [
   >   				S.delegate,
   >   				GlobalMaterialLocalizations.delegate,
   >   				GlobalWidgetsLocalizations.delegate,
   >   				GlobalCupertinoLocalizations.delegate,
   >   		],
   >   		supportedLocales: S.delegate.supportedLocales,
   >   		locale: Locale('cs'), // Nastavení výchozího jazyka na češtinu
   >   		home: MainPage(),
   >   	);
   >    }
   > }
   >```

3. Vygenerovat potřebné lokalizační soubory

   Přidejte `intl_utils` do konfiguračního souboru (`pubspec.yaml`):

    ```yaml
	dependencies:
	  #  Internal dependencies
	  flutter:
		sdk: flutter
	  flutter_localizations:
		sdk: flutter
	  # External dependencies
	  intl_utils: ^2.5.0
	  cupertino_icons: ^1.0.8
	  flutter_svg: ^2.0.16
	```

   Spusťte následující příkaz:

    ```bash
    # Install the dependencies listed in pubspec.yaml
    dart pub get
   # Generate the necessary localization files based on the ARB files
    dart run intl_utils:generate
    ```
4. Zobrazení textu z lokalizace

    ```dart
	import 'package:flutter/material.dart'; // Import package for material design
	import 'package:flutter_localizations/flutter_localizations.dart'; // Import package for localization
	import 'generated/l10n.dart'; // Import generated localization file

	void main() {
		// Spuštění aplikace
		runApp(MyApp());
	}

	class MyApp extends StatelessWidget {
		@override
		Widget build(BuildContext context) {
			return MaterialApp(
				// Definování delegátů pro lokalizaci
				localizationsDelegates: [
					S.delegate, // Vlastní generovaný delegát pro lokalizaci
					GlobalMaterialLocalizations.delegate, // Material design lokalizace
					GlobalWidgetsLocalizations.delegate, // Widgety lokalizace
					GlobalCupertinoLocalizations.delegate, // Cupertino (iOS) lokalizace
				],
				// Podporované jazyky
				supportedLocales: S.delegate.supportedLocales,
				// Hlavní stránka aplikace
				home: MainPage(),
			);
		}
	}

	class MainPage extends StatelessWidget {
		@override
		Widget build(BuildContext context) {
			return Scaffold(
				appBar: AppBar(
					// Zobrazení lokalizovaného textu v AppBar
					title: Text(S.of(context).hello),
				),
				body: Center(
					// Zobrazení lokalizovaného textu v těle stránky
					child: Text(S.of(context).welcome),
				),
			);
		}
	}
    ```

</details>

#### Pokrytí kódů (Code Coverage)

<details>
<summary><span style="color:#1E90FF;">Bez nahlédnutí do zdrojového kódu</span></summary>

1. Nainstalujte balíček skrze npm:

    ```bash
    npm install -g @lcov-viewer/cli
    ```
   
2. Vytvořte nový soubor `package.json` s výchozími hodnoty:

    ```bash
   npm init -y
    ```
   
3. Vaše konfigurace bude vypadat podobně takto:

    ```json 
   {
   "name": "xxx_app",
   "version": "1.0.0",
   "description": "A new Flutter project.",
   "main": "index.js",
   "directories": {
   "lib": "lib",
   "test": "test"
   },
   "scripts": {
   "test-report": " flutter test --coverage && lcov-viewer lcov -o ./coverage/report ./coverage/lcov.info"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
   }
    ```
   
4. Spusťte příkaz:

    ```bash
    npm run test-report
    ```

</details>

<details>
<summary><span style="color:#1E90FF;">S nahlédnutím do zdrojového kódu</span></summary>

1. Stáhněte si soubor [`genhtml`](https://github.com/linux-test-project/lcov/releases)

   > [!WARNING]
   > Nové verze `genhtml` obsahují další závislosti, které mohou být potřeba pro správné fungování.
   >
   > Jedná se o verze `2.0` a vyšší. 

2. Dejte soubor `genhtml` do kořenové složky projektu
3. Ujistěte se, že máte nainstalovaný `Git Bash`

   > [!NOTE]
   > S tím se nainstaluje i perl, který je potřeba pro správné fungování `genhtml`.
   > 
   > Spusťte příkaz v Git Bash:
   > 
   > ```bash
   > where perl
   > ``` 

4. Spusťte následující příkaz v Git Bash v kořenové složce projektu:

    ```bash
    perl genhtml coverage/lcov.info -o coverage/html
    ```
</details>

#### Řešení problémů

##### Zlepšení chování v kódi
<details>
<summary><span style="color:#1E90FF;">Automaticky zmenšit text bez použití doplňků</span></summary>

```dart
Expanded(
  child: FittedBox(
    fit: BoxFit.scaleDown,
    child: Text('${widget.article.price * chosenQuantity} DH',
      style: const TextStyle(fontSize: 25 , fontWeight: FontWeight.w700),
    ),
  ),
),
```

</details>

##### Analýza kódu napříč IDE
<details>
<summary><span style="color:#1E90FF;">Vypnutí pravida "no_logic_in_create_state"</span></summary>

1. Otevřete soubor `analysis_options.yaml`

   Tento soubor by měl být umístěn v kořenovém adresáři vašeho projektu.

   > [!NOTE]
   > Pokud soubor nemáte, můžete ho vytvořit v hlavním adresáři projektu.

2. Přidejte sekci linter

Pokud v souboru ještě není definovaná sekce linter, přidejte ji spolu s pravidly.

Příklad:

```yaml
linter:
  rules:
    no_logic_in_create_state: false
```

3. Uložte soubor

4. Restartujte IDE

   Po restartu by mělo být pravidlo `no_logic_in_create_state` vypnuto a měli byste být schopni používat logiku v metodě `createState()` bez varování.
</details>

##### Spuštění aplikace
<details>
<summary><span style="color:#1E90FF;">Building with plugins requires symlink support.</span></summary>

Pokud se vyskytne chyba `Building with plugins requires symlink support.` při spuštění aplikace, je potřeba povolit
`Developer Mode` v systému Windows.

1. Stiskněte klávesovou zkratku `Win + R`
2. Zadejte `ms-settings:developers` a stiskněte `Enter`
3. Povolte `Developer Mode`

</details>