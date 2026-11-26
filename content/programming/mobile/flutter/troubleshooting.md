---
description: "Diagnostika chyb SDK, balíčků, zařízení a sestavení."
---

# Řešení problémů ve Flutteru

Nejprve se rozliší problém prostředí, rozložení a statické analýzy.

Každá oblast má jiné ověření.

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

`Expanded` zde patří přímo do `Row`.

Mimo `Row`, `Column` nebo `Flex` jej nelze libovolně vložit. [Expanded](https://api.flutter.dev/flutter/widgets/Expanded-class.html)

Pro běžný delší text je vhodnější zalamování místo zmenšování, aby zůstal čitelný i při zvětšeném systémovém písmu.

## Pravidlo no_logic_in_create_state

`createState` má vrátit novou instanci stavu bez další logiky.

Hodnoty widgetu se ve stavu čtou přes `widget`.

Jednorázová inicializace patří podle své závislosti do příslušné metody životního cyklu, například `initState`.

Pravidlo se proto neřeší plošným vypnutím linteru. [Význam pravidla](https://dart.dev/tools/linter-rules/no_logic_in_create_state)

## Building with plugins requires symlink support

Ve Windows otevře nastavení vývojářů `Win+R` → `ms-settings:developers`, kde se povolí **Developer Mode**, pokud to dovolují zásady počítače.

Potom se sestavení zopakuje. [Režim pro vývojáře ve Windows](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development)

## Závislosti nebo zařízení nejsou dostupné

Výstup `flutter doctor -v` a `flutter devices` ukáže konkrétní chybu, podle které se opraví [instalace](setup-and-configuration.md).

Při chybě obnovy balíčků rozhoduje výstup `flutter pub get`.

Mazání celého projektu není diagnostický krok.
