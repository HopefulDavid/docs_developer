# 🧭 Výběr platformy pro vývoj aplikací

> 🚀 Praktické rady pro výběr správné platformy a frameworku podle typu projektu.

---

## 🌐 Webové aplikace

<details>
<summary><span style="color:#1E90FF;">🖥️ Přehled populárních frameworků</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **React**            | Web             | ✅ Velká komunita<br>🔄 Znovupoužitelné komponenty<br>⚡ Virtuální DOM<br>🔌 Bohatý ekosystém | 📈 Strmá křivka učení<br>🔤 JSX syntaxe<br>🔗 Nutnost dalších knihoven |
| **Vue.js**           | Web             | 🧩 Snadné na naučení<br>🔗 Reaktivní datové vazby<br>🛠️ Flexibilní<br>👥 Silná komunita | 📦 Menší ekosystém<br>📉 Omezená škálovatelnost<br>🏢 Méně vhodné pro enterprise |
| **Angular**          | Web             | 🏗️ Komplexní framework<br>🔄 Obousměrné datové vazby<br>🧩 Injekce závislostí<br>👥 Silná komunita | 📈 Strmá křivka učení<br>🧱 Složitost<br>⚡ Výkon u velkých aplikací |
| **Svelte**           | Web             | 🚀 Žádný virtuální DOM<br>⚡ Výkonný<br>📝 Jednoduchá syntaxe<br>🔗 Reaktivní model | 👥 Menší komunita<br>📦 Omezený ekosystém<br>🧪 Méně vyspělý |
| **ASP.NET Core**     | Web             | ⚡ Vysoký výkon<br>🌍 Cross-platform<br>🔒 Bezpečnost<br>🔗 Integrace s .NET | 📈 Strmá křivka učení<br>🧱 Složitost<br>🎨 Omezené front-end možnosti |
| **Django**           | Web             | 🏗️ Vysoce úrovňový<br>🛡️ Bezpečnost<br>🧩 Admin panel<br>📈 Škálovatelnost | 🧱 Monolitická struktura<br>📈 Strmá křivka učení<br>🎨 Omezené front-end možnosti |
| **Laravel**          | Web             | ✨ Elegantní syntaxe<br>🔒 Autentizace<br>👥 Komunita<br>⚡ Rychlý vývoj | ⚡ Výkon<br>🧱 Monolitická struktura<br>📉 Škálovatelnost |
| **Spring Boot**      | Web             | 🏗️ Komplexní<br>🔒 Bezpečnost<br>📈 Škálovatelnost<br>🔗 Integrace s Java | 📈 Strmá křivka učení<br>🧱 Složitost<br>⚙️ Konfigurace |
| **Express.js**       | Web             | 🧩 Minimalistický<br>⚡ Výkonný<br>🛠️ Flexibilní<br>👥 Komunita | 🔗 Nutnost dalších knihoven<br>📦 Omezené funkce<br>🧩 Nekonzistentní kód |
| **Ruby on Rails**    | Web             | 📝 Konvence<br>⚡ Rychlý vývoj<br>🧪 Testování<br>👥 Komunita | ⚡ Výkon<br>🧱 Monolitická struktura<br>📈 Strmá křivka učení |

</details>

---

## 📱 Mobilní aplikace

<details>
<summary><span style="color:#1E90FF;">📲 Frameworky pro mobilní vývoj</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **React Native**     | iOS, Android    | ⚡ Rychlý vývoj<br>👥 Komunita<br>🔄 Znovupoužitelný kód<br>🔥 Hot-reload | ⚡ Výkon<br>📦 Velikost aplikace<br>🔗 Závislost na nativních modulech |
| **Flutter**          | iOS, Android    | ⚡ Výkon<br>🎨 Krásné UI<br>🔄 Jeden kód<br>🔥 Hot-reload | 📦 Velikost aplikace<br>📚 Omezené knihovny<br>📈 Křivka učení pro Dart |
| **Xamarin**          | iOS, Android    | ⚡ Nativní výkon<br>🔄 Jeden kód<br>🔗 Microsoft podpora<br>🛠️ Přístup k API | 📦 Velikost aplikace<br>🐢 Pomalejší vývoj<br>🔗 Závislost na Microsoft |
| **Swift**            | iOS             | ⚡ Výkon<br>🎨 Nativní vzhled<br>🍏 Apple podpora<br>🛠️ Přístup k funkcím | 🍏 Pouze iOS<br>📈 Křivka učení<br>👥 Menší komunita |
| **Kotlin Multiplatform** | iOS, Android | 🔄 Sdílení kódu<br>🔗 Kotlin podpora<br>🛠️ Postupný přechod | 🧪 Vývoj<br>👥 Omezená komunita<br>⚙️ Složitější nastavení |
| **Ionic**            | iOS, Android    | 🌐 Web technologie<br>⚡ Rychlý vývoj<br>👥 Komunita<br>🔌 Pluginy | ⚡ Výkon<br>🚫 Nevhodné pro náročné aplikace<br>🌐 Závislost na webview |
| **Cordova**          | iOS, Android    | 🌐 Web technologie<br>🔌 Pluginy<br>🛠️ Integrace s webem | ⚡ Výkon<br>🚫 Nevhodné pro složité aplikace<br>🌐 Závislost na webview |
| **NativeScript**     | iOS, Android    | ⚡ Nativní výkon<br>🛠️ Přístup k API<br>🔗 Podpora Angular/Vue<br>📝 TypeScript | 👥 Menší komunita<br>📚 Omezené knihovny<br>🐞 Složitější ladění |
| **PhoneGap**         | iOS, Android    | 🌐 Web technologie<br>🛠️ Snadné použití<br>⚡ Rychlý vývoj<br>🔗 Adobe podpora | ⚡ Výkon<br>🚫 Nevhodné pro složité aplikace<br>🌐 Závislost na webview |
| **Sencha Touch**     | iOS, Android    | 🎨 Bohaté UI<br>⚡ Výkon<br>🏗️ MVC architektura<br>🔗 Ext JS integrace | 💰 Drahé licence<br>👥 Menší komunita<br>📈 Křivka učení |

</details>

---

## 💻 Počítačové aplikace

<details>
<summary><span style="color:#1E90FF;">🖥️ Frameworky pro desktop</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **Electron**         | Windows, macOS, Linux | 🌐 Web technologie<br>👥 Komunita<br>🔌 Pluginy<br>🛠️ Integrace s webem | 📦 Velikost aplikace<br>🧠 Spotřeba paměti<br>🌐 Závislost na Chromium |
| **Qt**               | Windows, macOS, Linux | ⚡ Výkon<br>🎨 Widgety<br>🔗 Více jazyků<br>🖥️ Nativní vzhled | 📈 Křivka učení<br>💰 Drahé licence<br>📦 Velikost knihovny |
| **WPF**              | Windows | 🎨 Bohaté UI<br>🔗 Microsoft podpora<br>🛠️ .NET integrace<br>🏗️ MVVM | 🪟 Pouze Windows<br>📈 Křivka učení<br>🧠 Nároky na systém |
| **JavaFX**           | Windows, macOS, Linux | 🔗 Více platforem<br>🛠️ Java integrace<br>🎨 Bohaté UI<br>📝 FXML | 📈 Křivka učení<br>👥 Menší komunita<br>🧠 Nároky na systém |
| **GTK**              | Windows, macOS, Linux | 🖥️ Nativní vzhled<br>🔗 Více jazyků<br>👥 Komunita<br>🔓 Open source | 📈 Křivka učení<br>🎨 Omezené UI<br>🐞 Složitější ladění |
| **WinForms**         | Windows | 🛠️ Snadné použití<br>⚡ Rychlý vývoj<br>🔗 .NET integrace<br>👥 Komunita | 🪟 Pouze Windows<br>🧓 Zastaralý vzhled<br>🎨 Omezené UI |
| **Swing**            | Windows, macOS, Linux | 🔗 Více platforem<br>🛠️ Java integrace<br>🎨 Bohaté UI<br>👥 Komunita | 🧓 Zastaralý vzhled<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **Tcl/Tk**           | Windows, macOS, Linux | 🛠️ Snadné použití<br>⚡ Rychlý vývoj<br>🔗 Více jazyků<br>🔓 Open source | 🧓 Zastaralý vzhled<br>🎨 Omezené UI<br>👥 Menší komunita |

</details>

---

## 🗄️ Databázový vývoj

<details>
<summary><span style="color:#1E90FF;">🗃️ Přehled databázových technologií</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **PostgreSQL**       | Cross-platform  | 🔓 Open source<br>👥 Komunita<br>🧩 Pokročilé funkce<br>⚡ Výkon | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **MySQL**            | Cross-platform  | 🔓 Open source<br>👥 Komunita<br>🛠️ Snadné použití<br>⚡ Výkon | 📚 Omezené funkce<br>⚡ Výkon při zatížení<br>🔗 Méně flexibilní |
| **SQLite**           | Cross-platform  | 🔓 Open source<br>🛠️ Snadné použití<br>🧠 Nízké nároky<br>🔌 Vestavěný | 📚 Omezené funkce<br>🚫 Nevhodné pro velké aplikace<br>👥 Omezená podpora |
| **MongoDB**          | Cross-platform  | 🔓 Open source<br>🔗 Flexibilní schéma<br>⚡ Výkon<br>👥 Komunita | 🧠 Nároky na systém<br>📚 Omezené transakce<br>⚠️ Konzistence dat |
| **Microsoft SQL Server** | Windows, Linux | 🔗 Microsoft podpora<br>🧩 Pokročilé funkce<br>⚡ Výkon<br>🛠️ .NET integrace | 💰 Licence<br>🧠 Nároky na systém<br>🪟 Omezená podpora mimo Windows |
| **Oracle Database**  | Cross-platform  | 🧩 Pokročilé funkce<br>⚡ Výkon<br>🏢 Podpora pro enterprise<br>📈 Škálovatelnost | 💰 Licence<br>⚙️ Nastavení<br>🧠 Nároky na systém |
| **Redis**            | Cross-platform  | 🔓 Open source<br>⚡ Výkon<br>🔗 Datové struktury<br>🛠️ Snadné použití | 📚 Omezené funkce<br>🚫 Nevhodné pro trvalá data<br>🔗 Omezené dotazy |
| **Cassandra**        | Cross-platform  | 🔓 Open source<br>📈 Škálovatelnost<br>⚡ Výkon<br>👥 Komunita | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **MariaDB**          | Cross-platform  | 🔓 Open source<br>👥 Komunita<br>🛠️ Snadné použití<br>⚡ Výkon | 📚 Omezené funkce<br>⚡ Výkon při zatížení<br>🔗 Méně flexibilní |
| **Elasticsearch**    | Cross-platform  | 🔓 Open source<br>⚡ Výkon<br>🔍 Full-text vyhledávání<br>📈 Škálovatelnost | 🧠 Nároky na systém<br>⚙️ Nastavení<br>📚 Omezené transakce |

</details>

---

## 🎮 Herní vývoj

<details>
<summary><span style="color:#1E90FF;">🕹️ Frameworky pro vývoj her</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **Unity**            | Cross-platform  | 👥 Komunita<br>🛒 Asset store<br>🧩 C# skriptování<br>🎮 2D/3D hry | 📈 Křivka učení<br>⚡ Výkon u velkých projektů<br>💰 Licence |
| **Unreal Engine**    | Cross-platform  | 🎨 Grafika<br>🧩 Blueprint skriptování<br>👥 Komunita<br>🆓 Zdarma pro malé projekty | 📈 Křivka učení<br>🧠 Systémové požadavky<br>💰 Licence pro velké projekty |
| **Godot**            | Cross-platform  | 🔓 Open source<br>🧩 Lehký<br>📝 GDScript<br>🎮 2D/3D hry | 👥 Menší komunita<br>🧪 Méně vyspělý<br>🛒 Omezený asset store |
| **GameMaker Studio** | Cross-platform  | 🧩 Snadné na naučení<br>🖱️ Drag-and-drop<br>🎮 2D hry<br>👥 Komunita | 📚 Omezené 3D<br>💰 Licence<br>⚡ Výkon u velkých projektů |
| **CryEngine**        | Cross-platform  | 🎨 Grafika<br>🆓 Zdarma<br>⚡ Výkon pro FPS<br>👥 Komunita | 📈 Křivka učení<br>🧠 Systémové požadavky<br>📚 Dokumentace |
| **RPG Maker**        | Cross-platform  | 🧩 Snadné použití<br>🎮 RPG hry<br>👥 Komunita<br>🛒 Asset store | 🚫 Omezeno na RPG<br>📚 Omezené možnosti<br>💰 Licence |
| **Construct**        | Cross-platform  | 🧩 Snadné na naučení<br>🖱️ Drag-and-drop<br>🎮 2D hry<br>👥 Komunita | 📚 Omezené 3D<br>💰 Licence<br>⚡ Výkon u velkých projektů |
| **Cocos2d**          | Cross-platform  | 🔓 Open source<br>🎮 2D hry<br>🧩 Lehký<br>👥 Komunita | 📚 Omezené 3D<br>📈 Křivka učení<br>🛒 Omezený asset store |
| **Panda3D**          | Cross-platform  | 🔓 Open source<br>🎮 3D hry<br>📝 Python skriptování<br>👥 Komunita | 📈 Křivka učení<br>🛒 Omezený asset store<br>🧪 Méně vyspělý |
| **Phaser**           | Cross-platform  | 🔓 Open source<br>🎮 2D hry<br>📝 JavaScript<br>👥 Komunita | 📚 Omezené 3D<br>⚡ Výkon u velkých projektů<br>🛒 Omezený asset store |

</details>

---

## 🔄 CI & CD

<details>
<summary><span style="color:#1E90FF;">🔁 Nástroje pro automatizaci</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **Jenkins**          | Cross-platform  | 🔓 Open source<br>👥 Komunita<br>🔌 Pluginy<br>🛠️ Flexibilní | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **GitLab CI/CD**     | Cross-platform  | 🔗 GitLab integrace<br>🛠️ Snadné použití<br>👥 Komunita<br>🌍 Podpora platforem | 🚫 Omezené mimo GitLab<br>🧠 Nároky na systém<br>⚙️ Složitější konfigurace |
| **CircleCI**         | Cross-platform  | 🛠️ Snadné použití<br>⚡ Rychlé buildy<br>🔌 Docker podpora<br>🔗 Integrace s GitHub/Bitbucket | 🚫 Omezené pro self-hosting<br>💰 Náklady<br>🌍 Omezená podpora |
| **Travis CI**        | Cross-platform  | 🛠️ Snadné použití<br>🔗 GitHub integrace<br>🧩 Více jazyků<br>🆓 Open source | 🚫 Omezené pro self-hosting<br>💰 Náklady<br>🌍 Omezená podpora |
| **Azure DevOps**     | Cross-platform  | 🔗 Microsoft podpora<br>🌍 Azure integrace<br>🛠️ Podpora platforem<br>🔒 Bezpečnost | ⚙️ Nastavení<br>💰 Náklady<br>📈 Křivka učení |
| **GitHub Actions**   | Cross-platform  | 🔗 GitHub integrace<br>🛠️ Snadné použití<br>🌍 Podpora platforem<br>👥 Komunita | 🚫 Omezené mimo GitHub<br>💰 Náklady<br>⚙️ Složitější konfigurace |
| **Bamboo**           | Cross-platform  | 🔗 Atlassian podpora<br>🔗 Jira integrace<br>🌍 Podpora platforem<br>🛠️ Flexibilní | 💰 Náklady<br>⚙️ Nastavení<br>📈 Křivka učení |
| **TeamCity**         | Cross-platform  | 🔗 JetBrains podpora<br>🌍 Podpora platforem<br>🛠️ Flexibilní<br>🔒 Bezpečnost | 💰 Náklady<br>⚙️ Nastavení<br>📈 Křivka učení |
| **Bitbucket Pipelines** | Cross-platform | 🔗 Bitbucket integrace<br>🛠️ Snadné použití<br>🌍 Podpora platforem<br>👥 Komunita | 🚫 Omezené mimo Bitbucket<br>💰 Náklady<br>⚙️ Složitější konfigurace |
| **Spinnaker**        | Cross-platform  | 🌍 Multi-cloud podpora<br>🛠️ Flexibilní<br>👥 Komunita<br>🌍 Podpora platforem | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |

</details>

---

## 🧪 Testování

<details>
<summary><span style="color:#1E90FF;">🧩 Frameworky pro automatizované testy</span></summary>

| Nástroj/Framework    | Platformy       | Výhody                                                                 | Nevýhody                                                                |
|----------------------|-----------------|-----------------------------------------------------------------------|------------------------------------------------------------------------|
| **Selenium**         | Cross-platform  | 🔓 Open source<br>🌍 Více prohlížečů<br>👥 Komunita<br>🛠️ Flexibilní | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **JUnit**            | Cross-platform  | 🔓 Open source<br>🔗 Java integrace<br>🛠️ Snadné použití<br>👥 Komunita | 🚫 Omezené pro ne-Java<br>📦 Omezené funkce<br>🔗 Nutnost dalších knihoven |
| **TestNG**           | Cross-platform  | 🔓 Open source<br>🛠️ Flexibilní<br>⚡ Paralelní testy<br>🔗 Java integrace | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **Cypress**          | Cross-platform  | 🛠️ Snadné použití<br>⚡ Rychlé testy<br>🔗 JavaScript podpora<br>📚 Funkce | 🚫 Omezené pro ne-JS<br>🧠 Nároky na systém<br>🌍 Omezená podpora pro prohlížeče |
| **Mocha**            | Cross-platform  | 🛠️ Snadné použití<br>🛠️ Flexibilní<br>🔗 JavaScript podpora<br>🔗 Node.js integrace | 📦 Omezené funkce<br>🔗 Nutnost dalších knihoven<br>🌍 Omezená podpora pro prohlížeče |
| **Jest**             | Cross-platform  | 🛠️ Snadné použití<br>⚡ Rychlé testy<br>🔗 JavaScript podpora<br>📚 Funkce | 🚫 Omezené pro ne-JS<br>🧠 Nároky na systém<br>🌍 Omezená podpora pro prohlížeče |
| **PyTest**           | Cross-platform  | 🔓 Open source<br>🛠️ Snadné použití<br>🔗 Python podpora<br>🛠️ Flexibilní | 🚫 Omezené pro ne-Python<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **Robot Framework**  | Cross-platform  | 🔓 Open source<br>🛠️ Snadné použití<br>🔗 Více jazyků<br>🛠️ Flexibilní | ⚙️ Nastavení<br>🧠 Nároky na systém<br>📈 Křivka učení |
| **Karma**            | Cross-platform  | 🛠️ Snadné použití<br>⚡ Rychlé testy<br>🔗 JavaScript podpora<br>🔗 Angular integrace | 🚫 Omezené pro ne-JS<br>🧠 Nároky na systém<br>🌍 Omezená podpora pro prohlížeče |
| **NUnit**            | Cross-platform  | 🔓 Open source<br>🔗 .NET integrace<br>🛠️ Snadné použití<br>👥 Komunita | 🚫 Omezené pro ne-.NET<br>📦 Omezené funkce<br>🔗 Nutnost dalších knihoven |

</details>