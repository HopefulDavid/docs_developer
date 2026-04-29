### Lokalizace (interní knihovna)

1. Přidejte do `pubspec.yaml`:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     flutter_localizations:
       sdk: flutter
     cupertino_icons: ^1.0.8
     flutter_svg: ^2.0.16
   ```

2. Vytvořte lokalizační soubory:
    - `lib/l10n/intl_en.arb`:
      ```json
      {
        "@@locale": "en",
        "hello": "Hello",
        "welcome": "Welcome"
      }
      ```
    - `lib/l10n/intl_cs.arb`:
      ```json
      {
        "@@locale": "cs",
        "hello": "Ahoj",
        "welcome": "Vítejte"
      }
      ```

3. Přidejte `intl_utils` do `pubspec.yaml`:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     flutter_localizations:
       sdk: flutter
     intl_utils: ^2.5.0
     cupertino_icons: ^1.0.8
     flutter_svg: ^2.0.16
   ```

4. Vygenerujte lokalizační soubory:
   ```bash
   dart pub get
   dart run intl_utils:generate
   ```

5. Použití lokalizace v aplikaci:
   ```dart
   import 'package:flutter/material.dart';
   import 'package:flutter_localizations/flutter_localizations.dart';
   import 'generated/l10n.dart';

   void main() {
     runApp(MyApp());
   }

   class MyApp extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         localizationsDelegates: [
           S.delegate,
           GlobalMaterialLocalizations.delegate,
           GlobalWidgetsLocalizations.delegate,
           GlobalCupertinoLocalizations.delegate,
         ],
         supportedLocales: S.delegate.supportedLocales,
         home: MainPage(),
       );
     }
   }

   class MainPage extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(title: Text(S.of(context).hello)),
         body: Center(child: Text(S.of(context).welcome)),
       );
     }
   }
   ```