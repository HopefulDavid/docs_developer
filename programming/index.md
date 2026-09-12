<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Programování

Vývojové platformy, jazyky, frameworky, balíčky a opakovaně použitelné postupy.

## Přehled stránek

### Techniky a koncepty

| Stránka | Popis |
| --- | --- |
| [Výběr platformy pro vývoj](platform-selection.md) | Platformu vybírej podle toho, kde má aplikace fungovat, jaká zařízení potřebuje ovládat a kdo ji bude dlouhodobě udržovat. |
| [Komentáře v kódu](code-comments.md) | Komentář vysvětluje záměr, omezení nebo důvod rozhodnutí, který není z kódu zřejmý. |
| [Návrhové vzory](development-patterns.md) | Návrhový vzor je pojmenované řešení opakujícího se problému se vztahy mezi objekty nebo částmi programu. |
| [Metodiky a konvence](techniques.md) | Metodika pomáhá týmu organizovat práci; konvence sjednocuje podobu kódu a prototyp ověřuje nápad před větší investicí. |

### Programovací jazyky a frameworky

| Stránka | Popis |
| --- | --- |
| [C# a .NET](csharp/index.md) | Přístupnost členů, cílová platforma a životnost prostředků určují, jak lze knihovnu bezpečně použít v aplikaci. |
| [Go](server/go.md) | Go překládá zdrojové soubory do programu; modul v `go.mod` určuje jeho identitu a závislosti. |

### C# a .NET

| Stránka | Popis |
| --- | --- |
| [Windows Workflow (WF)](csharp/components.md) | Windows Workflow Foundation je technologie .NET Framework pro modelování a spouštění pracovních postupů z aktivit. |
| [Rozhraní a kopírování](csharp/interface.md) | Rozhraní popisuje kontrakt implementace; význam jednotlivých metod musí být jednoznačný pro volajícího. |
| [Kolekce a datové typy](csharp/data-types.md) | Kolekci vybírej podle přístupu k prvkům, pořadí, jedinečnosti a požadavků na souběh. |
| [Atributy](csharp/attributes.md) | Atributy připojují metadata k typům a členům; jejich účinek závisí na kompilátoru, runtime nebo knihovně, která je zpracovává. |
| [Enum](csharp/enum.md) | Výčtový typ dává číselným hodnotám jména; sám neomezuje vstup pouze na pojmenované členy. |
| [Metody](csharp/methods.md) | Podpis metody určuje předávané hodnoty a výsledek; způsob předání je důležitý zejména u měnitelných objektů. |
| [Implicitní a explicitní operátory](csharp/conversion.md) | Vlastní konverzní operátor určuje, jak se hodnota uživatelského typu převádí na jiný typ. |
| [REST API](csharp/create-api.md) | Tento postup pro SDK .NET 10 vytvoří lokální API poznámek s funkčním přidáním, čtením, úpravou a mazáním. |
| [Soubory](csharp/files.md) | Při čtení dat určete kódování, oddělovač a očekávané sloupce podle smluveného formátu souboru. |
| [XML](csharp/xml.md) | XML ukládá strukturovaná data do elementů a atributů; `XmlSerializer` mapuje tuto strukturu na veřejné členy objektů. |
| [NUnit](csharp/nunit.md) | NUnit umožňuje spouštět automatizované testy a zapisovat očekávání pomocí `Assert.That`. |
| [WPF](csharp/wpf.md) | WPF je UI framework pro desktopové aplikace Windows; vzhled popisuje XAML a chování obvykle C#. |

### Mobilní vývoj

| Stránka | Popis |
| --- | --- |
| [Android Studio](mobile/android-studio.md) | Android Studio poskytuje Android SDK, správu emulátorů a nástroje pro ladění aplikací na telefonu. |
| [Flutter](mobile/flutter/setup-and-configuration.md) | Flutter používá Dart pro vývoj aplikací pro mobilní zařízení, web a desktop; potřebné nástroje se liší podle cílové platformy. |

### Flutter

| Stránka | Popis |
| --- | --- |
| [Vytvoření projektu](mobile/flutter/create-project.md) | Nový projekt vytvoř ve složce pro své zdrojové kódy; předem ověř instalaci SDK. |
| [Záloha a obnova](mobile/flutter/backup-and-restore.md) | Obnovitelný projekt potřebuje zdrojové soubory, konfiguraci, prostředky a záznam použité verze SDK. |
| [Lokalizace](mobile/flutter/localization.md) | Vestavěný generátor `gen-l10n` vytváří typované překlady ze souborů ARB; tento postup nepotřebuje balíček `intl_utils`. |
| [Základy](mobile/flutter/basics.md) | Rozhraní Flutteru tvoří strom widgetů; každý widget popisuje část vzhledu nebo chování aplikace. |
| [Příkazy](mobile/flutter/commands.md) | Projektové příkazy spouštěj ve složce s `pubspec.yaml`. |
| [Pokrytí kódu](mobile/flutter/code-coverage.md) | Pokrytí ukazuje, které části kódu se při testech vykonaly; vysoké procento samo neprokazuje správná očekávání testů. |
| [Řešení problémů](mobile/flutter/troubleshooting.md) | Nejprve rozliš problém prostředí, rozložení a statické analýzy; každá oblast má jiné ověření. |

### Herní vývoj

| Stránka | Popis |
| --- | --- |
| [Unity](unity/index.md) | Unity spojuje editor scén, assety a C# komponenty do aplikace, kterou sestavíš pro cílovou platformu. |

### Unity

| Stránka | Popis |
| --- | --- |
| [2D](unity/2d.md) | SpriteRenderer zobrazuje samostatný sprite, zatímco Tilemap skládá dlaždice do buněk mřížky. |
| [Animace](unity/animation.md) | Praktické tipy pro efektivní práci s UMotion při ukládání změn animací. |
| [Kamera](unity/camera.md) | Kamera převádí scénu na obraz; projekce, rozlišení a vrstvy určují, co hráč skutečně uvidí. |
| [Navigace](unity/navigation.md) | NavMesh popisuje schůdné plochy a propojení mezi nimi; NavMeshAgent podle něj plánuje a provádí pohyb. |
| [ScriptableObject](unity/scriptable-object.md) | ScriptableObject je Unity objekt, který může existovat jako asset nezávislý na konkrétní scéně. |
| [UI](unity/ui.md) | Unity UI neboli uGUI používá GameObjecty s komponentami, například Canvas, Image a Button. |
| [UI Toolkit](unity/ui-toolkit.md) | UI Toolkit vytváří rozhraní jako strom prvků, který popisuje UXML, styluje USS a ovládá C#. |
| [Vykreslování](unity/renderer.md) | Universal Render Pipeline neboli URP určuje, jak Unity připraví a vykreslí snímek. |

### Nástroje a balíčky

| Stránka | Popis |
| --- | --- |
| [.NET CLI](packages/dotnet-cli.md) | Správa nástrojů .NET CLI a vypnutí i ověření telemetrie .NET SDK. |
| [NuGet](packages/nuget.md) | NuGet obnovuje knihovny .NET podle závislostí deklarovaných projektem; pro moderní projekty stačí .NET SDK. |
| [npm](packages/npm.md) | npm spravuje JavaScriptové balíčky a projektové příkazy; `package.json` popisuje požadavky a `package-lock.json` zaznamenává konkrétní vyřešené závislosti. |
| [Python](packages/python.md) | Balíčky doplňují Python o knihovny; `pip` je instaluje do prostředí konkrétního interpretu. |
| [Appcast feed](appcast.md) | Appcast je RSS feed s rozšířeními, podle kterého updater Sparkle pro macOS vyhledá vhodnou aktualizaci a její archiv. |

### Lokální vývoj

| Stránka | Popis |
| --- | --- |
| [XAMPP přístup](xampp/access.md) | XAMPP spojuje Apache, PHP a další nástroje pro místní vývoj. |
| [XAMPP virtual hosts](xampp/virtual-hosts.md) | Virtual Host vybírá web podle názvu v HTTP požadavku a přiřadí mu vlastní `DocumentRoot`. |
