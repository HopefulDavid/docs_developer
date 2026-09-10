# Řešení problémů ve Flutteru

Nejprve rozliš problém prostředí, rozložení a statické analýzy; každá oblast má jiné ověření.

## Automatické zmenšení textu bez doplňků

Tento fragment patří do rozhraní s omezenou šířkou, například do těla `Scaffold`:

```dart
const Row(
  children: [
    Expanded(
      child: FittedBox(
        fit: BoxFit.scaleDown,
        alignment: Alignment.centerLeft,
        child: Text('Celková cena objednávky: 1 250 Kč'),
      ),
    ),
  ],
)
```

`Expanded` zde patří přímo do `Row`; mimo `Row`, `Column` nebo `Flex` jej nelze libovolně vložit. [Expanded](https://api.flutter.dev/flutter/widgets/Expanded-class.html)

Pro běžný delší text zvaž zalamování místo zmenšování, aby zůstal čitelný i při zvětšeném systémovém písmu.

## Pravidlo no_logic_in_create_state

`createState` má vrátit novou instanci stavu bez další logiky.

Hodnoty widgetu čti ve stavu přes `widget`; jednorázovou inicializaci umísti podle její závislosti do příslušné metody životního cyklu, například `initState`.

Pravidlo proto neřeš plošným vypnutím linteru. [Význam pravidla](https://dart.dev/tools/linter-rules/no_logic_in_create_state)

## Building with plugins requires symlink support

Ve Windows otevři nastavení vývojářů přes `Win+R` → `ms-settings:developers` a povol **Developer Mode**, pokud to dovolují zásady počítače.

Potom opakuj sestavení. [Režim pro vývojáře ve Windows](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development)

## Závislosti nebo zařízení nejsou dostupné

Spusť `flutter doctor -v`, `flutter devices` a podle konkrétní chyby oprav [instalaci](setup-and-configuration.md).

Při chybě obnovy balíčků zkontroluj výstup `flutter pub get`; mazání celého projektu není diagnostický krok.
