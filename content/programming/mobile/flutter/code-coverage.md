---
description: "Spuštění testů s pokrytím a čtení výsledného reportu."
---

# Flutter – pokrytí kódu testy

Pokrytí ukazuje, které části kódu se při testech vykonaly.

Vysoké procento samo neprokazuje správná očekávání testů.

## Vytvoření reportu

Projekt musí obsahovat testy, například výchozí `test/widget_test.dart` z [nového projektu](create-project.md).

V jeho kořeni:

```powershell
flutter test --coverage
```

Po úspěšném dokončení vznikne soubor `coverage/lcov.info`.

Jinou cestu lze určit pomocí `--coverage-path`. [Implementace příkazu Flutter test](https://github.com/flutter/flutter/blob/stable/packages/flutter_tools/lib/src/commands/test.dart)

Report otevře nástroj podporující LCOV, například prohlížeč pokrytí v IDE.

V CI se report uchová jako artefakt konkrétního běhu.

## Jak výsledek číst

Nejprve se ověří, že všechny testy prošly a že report skutečně zahrnuje měřené soubory.

Potom se doplní smysluplné testy pro nepokryté větve, chybové stavy a hraniční hodnoty.

Unit testy ověřují logiku, widget testy rozhraní a integrační testy spolupráci větších částí aplikace. [Testovací strategie Flutteru](https://docs.flutter.dev/testing/overview)
