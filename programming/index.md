<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Programování

Vývojové platformy, jazyky, frameworky, balíčky a opakovaně použitelné postupy.

## Přehled stránek

### Techniky a koncepty

| Stránka | Popis |
| --- | --- |
| [Výběr platformy pro vývoj](platform-selection.md) | Praktické rady pro výběr správné platformy a frameworku podle typu projektu. |
| [Komentáře v kódu](code-comments.md) | Definuje sadu konvencí pro komentáře v kódu, které pomáhají vývojářům rychle identifikovat různé typy poznámek a úkolů. |
| [Vývojové vzory](development-patterns.md) | Praktické rady pro opakovaně použitelné návrhové vzory v softwarovém vývoji. |
| [Techniky](techniques.md) | Přehled metodologií řízení projektů, rychlého prototypování a konvencí pojmenování v kódu. |

### Programovací jazyky a frameworky

| Stránka | Popis |
| --- | --- |
| [C# a .NET](csharp/index.md) | Přístupnost členů, cílová platforma a životnost prostředků určují, jak lze knihovnu bezpečně použít v aplikaci. |
| [Go](server/go.md) | Stránka zatím nemá krátký úvod. |

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
| [Unity](unity/index.md) | Efektivní práce v Unity, rychlé prototypování a výběr správného typu projektu. |

### Unity

| Stránka | Popis |
| --- | --- |
| [2D](unity/2d.md) | Praktické rady pro práci s 2D grafikou v Unity, nastavení Tilemap, velikosti obrázků, animace a řešení běžných problémů. |
| [Animace](unity/animation.md) | Praktické tipy pro efektivní práci s UMotion při ukládání změn animací. |
| [Kamera](unity/camera.md) | Praktické rady pro nastavení kamery v Unity, rozdíly mezi ortografickou a perspektivní kamerou, a proč používat Pixel Perfect Camera v 2D hrách. |
| [Navigace](unity/navigation.md) | Nastavení navigace, pohyb postav a využití NavMesh v Unity. |
| [ScriptableObject](unity/scriptable-object.md) | Praktické rady pro použití ScriptableObject v Unity, jejich výhody, omezení a moderní patterny. |
| [UI](unity/ui.md) | Praktické rady pro práci s UI v Unity, včetně nastavení tlačítek, detekce kliknutí a užitečných vlastností komponent. |
| [UI Toolkit](unity/ui-toolkit.md) | Praktické rady pro práci s UI Toolkit v Unity, jeho výhody, základní principy a moderní patterny. |
| [Vykreslování](unity/renderer.md) | Nastavení URP, globální konfigurace, Volume efekty a optimalizace renderování v Unity. |

### Nástroje a balíčky

| Stránka | Popis |
| --- | --- |
| [.NET CLI](packages/dotnet-cli.md) | Správa nástrojů .NET CLI a vypnutí i ověření telemetrie .NET SDK. |
| [NuGet](packages/nuget.md) | Pro správu balíčků je potřeba mít nainstalovaný **NuGet CLI** nebo používat integrované nástroje v IDE. |
| [npm](packages/npm.md) | Pro správu balíčků je potřeba mít nainstalovaný **Node.js** a **npm**. |
| [Python](packages/python.md) | Praktické rady pro správu Python balíčků, zálohování, offline instalaci a užitečné příkazy. |
| [Appcast feed](appcast.md) | Appcast je RSS feed ve formátu XML pro distribuci aktualizací aplikací pomocí technologie Sparkle. |

### Lokální vývoj

| Stránka | Popis |
| --- | --- |
| [XAMPP přístup](xampp/access.md) | Tento návod ukazuje, jak spravovat více projektů v XAMPP a pohodlně k nim přistupovat přes prohlížeč. |
| [XAMPP virtual hosts](xampp/virtual-hosts.md) | Virtual Hosts umožňují přiřadit každému projektu vlastní doménu, např. `project1.local`, pro pohodlnější přístup a testování. |
