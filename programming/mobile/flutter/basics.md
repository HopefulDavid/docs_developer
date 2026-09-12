---
description: "Widgety, rozložení a základní práce se stavem aplikace."
---

# Flutter – základy

Rozhraní Flutteru tvoří strom widgetů; každý widget popisuje část vzhledu nebo chování aplikace.

## Widget a stav

| Typ | Kdy jej použít |
|---|---|
| `StatelessWidget` | Výstup závisí na předaných hodnotách a kontextu, widget nemá vlastní měnitelný stav |
| `StatefulWidget` + `State` | Rozhraní má měnitelný stav, například rozepsaný formulář nebo počítadlo |

Samotný `StatefulWidget` je neměnný; měnitelná data patří do jeho objektu `State`.

Po změně lokálního stavu zavolej `setState`, aby framework naplánoval nové sestavení rozhraní. [StatefulWidget](https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html), [StatelessWidget](https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html)

Metoda `build` popisuje rozhraní a může běžet opakovaně; nezačínej v ní při každém zavolání síťový požadavek.

## Rozložení

- `Row` řadí potomky vodorovně, `Column` svisle.
- `Padding` přidává vnitřní odstup.
- `Expanded` rozděluje dostupný prostor uvnitř `Row`, `Column` nebo `Flex`.
- `ListView` poskytuje rolovatelný seznam.

Rozměry musí respektovat omezení rodiče; `Expanded` není univerzální řešení pro neomezený prostor. [Omezení rozložení](https://docs.flutter.dev/ui/layout/constraints)

## Pracovní cyklus

Uprav widget, proveď hot reload, prohlédni výsledek a spusť relevantní testy.

Hot reload zachovává stav a znovu nespouští `main` ani `initState`; změny inicializace ověř také po restartu. [Hot reload](https://docs.flutter.dev/tools/hot-reload)

Navazuje [vytvoření projektu](create-project.md) a [přehled příkazů](commands.md).
