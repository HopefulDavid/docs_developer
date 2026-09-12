# Výběr platformy podle požadavků projektu

Platformu vybírej podle toho, kde má aplikace fungovat, jaká zařízení potřebuje ovládat a kdo ji bude dlouhodobě udržovat.

Následující přehled je pomůcka pro porovnání kandidátů, nikoli žebříček univerzálně nejlepších frameworků.

## Co zjistit před výběrem

| Otázka | Dopad na rozhodnutí |
|---|---|
| Kdo a na čem aplikaci používá? | Prohlížeč, telefon, firemní Windows nebo více desktopových systémů |
| Musí fungovat offline? | Lokální data, synchronizace a řešení konfliktů |
| Potřebuje kameru, Bluetooth nebo systémové služby? | Dostupnost API a nativních modulů |
| Jaké jsou nároky na odezvu a dostupnost? | Měřitelné cíle pro prototyp, provoz a testy |
| Co tým zná a kdo systém převezme? | Náklady na vývoj, nábor a dlouhodobou údržbu |
| Jak se aplikace distribuuje? | Webový hosting, firemní instalace nebo pravidla obchodů |

Před přijetím ověř podporované verze, licence, dostupnost potřebných knihoven a náklady provozu přímo u dodavatelů.

## Webové aplikace

Frontend řeší rozhraní v prohlížeči, backend zpracování požadavků a přístup k datům; nejde vždy o vzájemně zaměnitelné nástroje.

| Potřeba | Kandidáti k posouzení | Co vyzkoušet |
|---|---|---|
| Interaktivní komponentové rozhraní | React, Vue, Angular, Svelte | Formuláře, navigaci, přístupnost a sestavení |
| Serverová aplikace v C# | ASP.NET Core | Přihlášení, API a nasazení do cílového prostředí |
| Server s konvencemi a aplikačními moduly | Django, Laravel, Ruby on Rails, Spring Boot | Práci s doménou, databází a rozšíření mimo výchozí konvence |
| Menší HTTP server v JavaScriptu | Express | Validaci, chybové odpovědi a způsob skládání middleware |

React je knihovna rozhraní a pro celou aplikaci potřebuješ také rozhodnout o směrování, získávání dat a sestavení; možnosti vysvětluje [Creating a React App](https://react.dev/learn/creating-a-react-app).

Velikost firmy sama neurčuje, zda je Vue vhodné, a použití virtuálního DOM samo nedokazuje vyšší výkon.

## Mobilní aplikace

| Přístup | Příklady | Rozhodující kontrola |
|---|---|---|
| Nativní aplikace | Swift / SwiftUI pro Apple, Kotlin pro Android | Využití platformních API a náklady oddělených implementací |
| Sdílené UI a část logiky | Flutter, React Native, .NET MAUI | Dostupnost pluginů a chování na skutečném iOS i Android zařízení |
| Sdílení vybraných vrstev | Kotlin Multiplatform | Co konkrétně sdílíš a co zůstává nativní |
| Webové UI v aplikačním obalu | Ionic s Capacitor, případně existující Cordova projekt | Omezení WebView, offline provoz a systémové integrace |

[Flutter](https://flutter.dev/multi-platform) podporuje více typů platforem, ale dostupnost konkrétního pluginu musíš ověřit zvlášť.

Pro existující Xamarin projekt řeš [migraci na podporované .NET varianty](https://learn.microsoft.com/en-us/dotnet/maui/migration/), místo abys jej vybíral jako nový výchozí stack.

[.NET MAUI](https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui) zahrnuje Android, iOS, macOS přes Mac Catalyst a Windows; nepředpokládej automaticky podporu všech desktopových systémů.

## Počítačové aplikace

| Požadavek | Kandidáti | Co ověřit |
|---|---|---|
| Aplikace pro Windows v .NET | WPF, WinForms | Datové vazby, přístupnost, instalaci a potřebné ovládací prvky |
| Webové technologie na desktopu | Electron | Paměť, aktualizace a oddělení webového obsahu od systémových oprávnění |
| UI pro více systémů | Qt, JavaFX, GTK nebo framework odpovídající týmu | Podporované cíle, balení, licenci a chování systémových dialogů |

Existující Swing nebo Tcl/Tk aplikaci neposuzuj jen podle stáří nástroje, ale podle udržovatelnosti a konkrétního migračního přínosu.

Praktické základy pro .NET obsahují [WPF](csharp/wpf.md) a [přehled .NET](csharp/index.md).

## Databázový vývoj

| Potřeba | Kandidáti | Co změřit nebo navrhnout |
|---|---|---|
| Relační data a transakce mezi více klienty | PostgreSQL, SQL Server, MySQL, MariaDB, Oracle Database | Dotazy, souběh, migrace a obnovu zálohy |
| Vestavěná lokální databáze | SQLite | Počet současných zapisovatelů a umístění souboru |
| Dokumentový model | MongoDB | Dotazy, validaci dokumentů, indexy a transakční hranice |
| Cache nebo rychlé datové struktury | Redis | Expiraci, persistenci a chování při ztrátě cache |
| Distribuované zápisy nebo vyhledávání | Cassandra, Elasticsearch podle problému | Model dat, konzistenci a provozní náklady |

Databáze nejsou zaměnitelné jen podle dostupnosti na operačním systému.

SQLite není obecně „nevhodné pro velké aplikace“; rozhodují konkrétní způsoby použití a souběhu popsané v [oficiálním přehledu SQLite](https://www.sqlite.org/whentouse.html).

Pro praktické návody pokračuj na [databáze](../database/index.md).

## Herní vývoj

Zvaž Unity, Unreal Engine nebo Godot podle požadované grafiky, cílových zařízení, pracovního postupu týmu a dostupných nástrojů.

Pro úžeji zaměřenou hru může dávat smysl také GameMaker, RPG Maker, Construct nebo webový Phaser, pokud pokryjí konkrétní mechaniky a export.

V každém kandidátovi vytvoř stejnou malou scénu s reálným vstupem, sestav ji pro cílové zařízení a změř dobu snímku i velikost distribuce.

Licenční podmínky engine a assetů ověř pro vlastní způsob distribuce; neodvozuj je z obecného označení „zdarma“.

## CI a CD

Začni u platformy repozitáře, například GitHub Actions, GitLab CI/CD, Azure Pipelines nebo Bitbucket Pipelines.

Jenkins, TeamCity, Bamboo, CircleCI či další službu posuzuj podle potřeby vlastních runnerů, podporovaných systémů, správy tajemství a provozního vlastnictví.

Požaduj opakovatelné sestavení z čistého checkoutu a oddělení ověření změny od oprávnění publikovat.

Aktuální platformy a nabídku runnerů ověř například v [dokumentaci GitHub Actions](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners).

## Testování

Testovací nástroj vybírej podle vrstvy a jazyka: například NUnit pro .NET, JUnit pro JVM, pytest pro Python a nástroje ekosystému JavaScript pro jeho kód.

Selenium, Playwright nebo Cypress posuzuj pro skutečné uživatelské scénáře v prohlížeči, nikoli jako náhradu všech menších testů.

Ověř podporované prohlížeče, běh v CI, stabilitu čekání a kvalitu diagnostiky selhání v [dokumentaci vybraného nástroje](https://playwright.dev/docs/intro).

## Praktické rozhodnutí

Vyber nejvýše několik kandidátů a pro každý otestuj stejný průřez: přihlášení, hlavní operaci s daty, chybový stav a nasazení.

Zapiš měření, potřebné doplňky, omezení a důvod výběru včetně podmínek, při kterých se má rozhodnutí znovu posoudit.

Výsledek typu „funguje na našem zařízení, splňuje požadovanou odezvu a tým jej umí nasadit“ je užitečnější než obecná tvrzení o modernosti nebo škálovatelnosti.
