<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Programování

Vývojové platformy, jazyky, frameworky, balíčky a opakovaně použitelné postupy.

## Přehled stránek

### Techniky a koncepty

| Stránka | Popis |
| --- | --- |
| [Výběr platformy pro vývoj](platform-selection.md) | Výběr platformy podle zařízení, distribuce, výkonu a zkušeností. |
| [Komentáře v kódu](code-comments.md) | Vysvětlení záměru kódu a tvorba užitečných dokumentačních komentářů. |
| [Návrhové vzory](development-patterns.md) | Řešení opakovaných návrhových problémů na malých příkladech. |
| [Metodiky a konvence](techniques.md) | Organizace vývoje, pojmenování a rozhodování o struktuře kódu. |

### Programovací jazyky a frameworky

| Stránka | Popis |
| --- | --- |
| [C# a .NET](csharp/index.md) | Přístupnost členů, cílové platformy a použití nativních knihoven. |
| [Go](server/go.md) | První program, moduly, spuštění, testy a sestavení aplikace. |

### C# a .NET

| Stránka | Popis |
| --- | --- |
| [Windows Workflow (WF)](csharp/components.md) | Komponenty a běh pracovních postupů Windows Workflow. |
| [Rozhraní a kopírování](csharp/interface.md) | Smlouvy rozhraní a rozdíl mezi mělkou a hlubokou kopií objektu. |
| [Kolekce a datové typy](csharp/data-types.md) | Výběr kolekcí podle způsobu přístupu, vyhledávání a změn dat. |
| [Atributy](csharp/attributes.md) | Metadata typů a členů a jejich čtení pomocí reflexe. |
| [Enum](csharp/enum.md) | Pojmenované hodnoty, číselná reprezentace a kombinace příznaků. |
| [Metody](csharp/methods.md) | Předávání parametrů, návratové hodnoty a asynchronní volání. |
| [Implicitní a explicitní operátory](csharp/conversion.md) | Vlastní převody mezi typy a volba implicitního či explicitního operátoru. |
| [REST API](csharp/create-api.md) | Vytvoření HTTP API, validace vstupů a ověření požadavků. |
| [Soubory](csharp/files.md) | Čtení a zápis textu, CSV a volba správného kódování. |
| [XML](csharp/xml.md) | Čtení XML a převod mezi dokumentem a objekty aplikace. |
| [NUnit](csharp/nunit.md) | Příprava testovacího projektu, testovací případy a spuštění testů. |
| [WPF](csharp/wpf.md) | Rozložení oken, datové vazby, styly a opakované použití vzhledu. |

### Mobilní vývoj

| Stránka | Popis |
| --- | --- |
| [Android Studio](mobile/android-studio.md) | Instalace SDK, příprava emulátoru a připojení fyzického zařízení. |
| [Flutter](mobile/flutter/setup-and-configuration.md) | Příprava SDK a ověření nástrojů pro cílové platformy. |

### Flutter

| Stránka | Popis |
| --- | --- |
| [Vytvoření projektu](mobile/flutter/create-project.md) | Založení aplikace, spuštění na zařízení a vytvoření sestavení. |
| [Záloha a obnova](mobile/flutter/backup-and-restore.md) | Přenos projektu, SDK a navazujících závislostí na další počítač. |
| [Lokalizace](mobile/flutter/localization.md) | Překlady pomocí ARB souborů a generování lokalizačních tříd. |
| [Základy](mobile/flutter/basics.md) | Widgety, rozložení a základní práce se stavem aplikace. |
| [Příkazy](mobile/flutter/commands.md) | Syntaxe příkazů pro spuštění, testování a sestavení aplikace. |
| [Pokrytí kódu](mobile/flutter/code-coverage.md) | Spuštění testů s pokrytím a čtení výsledného reportu. |
| [Řešení problémů](mobile/flutter/troubleshooting.md) | Diagnostika chyb SDK, balíčků, zařízení a sestavení. |

### Herní vývoj

| Stránka | Popis |
| --- | --- |
| [Unity](unity/index.md) | Orientace ve scénách, komponentách a assetech a nastavení Play Mode. |

### Unity

| Stránka | Popis |
| --- | --- |
| [2D](unity/2d.md) | Sprity, Tilemap, kostra postavy a řešení mezer v grafice. |
| [Animace](unity/animation.md) | Klíčování pohybu a nastavení automatického záznamu animace. |
| [Kamera](unity/camera.md) | Výpočet velikosti záběru a přizpůsobení kamery poměru stran. |
| [Navigace](unity/navigation.md) | Příprava NavMesh a pohyb postavy k cíli. |
| [ScriptableObject](unity/scriptable-object.md) | Sdílená konfigurační data oddělená od běhového stavu objektů. |
| [UI](unity/ui.md) | Nastavení Canvasu a omezení klikání podle průhlednosti tlačítka. |
| [UI Toolkit](unity/ui-toolkit.md) | Propojení UXML, stylů USS a reakcí na události v C#. |
| [Vykreslování](unity/renderer.md) | Příprava URP, materiály a rozdíl mezi světly a postprocessingem. |

### Balíčky

| Stránka | Popis |
| --- | --- |
| [Záloha a offline obnova](packages/offline.md) | Výběr zálohy podle správce balíčků, obnova s internetem i bez něj a kontrola úplnosti. |
| [NuGet](packages/nuget.md) | Záloha knihoven .NET do složky a obnova projektu z místního zdroje nebo původní cache. |
| [.NET tools – offline obnova](packages/dotnet-tools.md) | Záloha lokálních i globálních nástrojů .NET a jejich opětovná instalace z místních balíčků. |
| [npm](packages/npm.md) | Obnova Node.js projektu z lockfilu, přenos celé npm cache a záloha globálních nástrojů. |
| [pnpm](packages/pnpm.md) | Záloha pnpm store i metadat a obnova projektu s uzamčenými verzemi bez registru. |
| [Python](packages/python.md) | Záloha Python prostředí jako seznam verzí a složka wheelů, včetně vlastních balíčků. |
| [Dart a Flutter pub](packages/dart.md) | Záloha pub cache a uzamčených závislostí Dart či Flutter, včetně offline používání CLI nástrojů. |

### Vývojové nástroje

| Stránka | Popis |
| --- | --- |
| [.NET CLI](packages/dotnet-cli.md) | Práce se SDK, lokálními a globálními nástroji a telemetrií. |
| [Appcast feed](appcast.md) | Vytvoření a podepisování aktualizačního feedu aplikace pro Sparkle. |

### Lokální vývoj

| Stránka | Popis |
| --- | --- |
| [XAMPP přístup](xampp/access.md) | Zpřístupnění místní aplikace a kontrola portů Apache. |
| [XAMPP virtual hosts](xampp/virtual-hosts.md) | Vlastní lokální domény a směrování na jednotlivé projekty. |
