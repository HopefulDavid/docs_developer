# 📰 Appcast Feed XML

> 🚀 Appcast je RSS feed ve formátu XML pro distribuci aktualizací aplikací pomocí technologie [Sparkle](https://sparkle-project.org/).

---

## 🧩 Hlavní komponenty

| 🏷️ Element     | 💡 Popis                                                         |
|----------------|------------------------------------------------------------------|
| `<rss>`        | Kořenový element, verze a namespace.                             |
| `<channel>`    | Hlavní sekce feedu, metadata kanálu aktualizací.                 |
| `<item>`       | Jednotlivý záznam pro jednu verzi aplikace.                      |

---

## 📦 Struktura feedu

<details>
<summary><span style="color:#1E90FF;">🔍 Příklad feedu</span></summary>

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>Aktualizace pro MyApp</title>
    <link>https://example.com/updates.xml</link>
    <description>Aktualizace pro aplikaci MyApp</description>
    <pubDate>Thu, 18 Jan 2025 10:00:00 +0000</pubDate>
    <language>cs-cz</language>
    <item>
      <title>Verze 1.0</title>
      <link>https://example.com/release/1.0</link>
      <description>První verze aplikace MyApp.</description>
      <pubDate>Fri, 17 Jan 2025 10:00:00 +0000</pubDate>
      <enclosure
        url="https://example.com/files/MyApp-1.0.zip"
        sparkle:version="1.0"
        length="102400"
        type="application/octet-stream"/>
    </item>
  </channel>
</rss>
```
</details>

---

## 🏷️ `<rss>` – Kořenový element

<details>
<summary><span style="color:#1E90FF;">📖 Detaily & příklad</span></summary>

| ⚙️ Atribut         | 💡 Popis                                                                 |
|--------------------|--------------------------------------------------------------------------|
| `version`          | Verze RSS specifikace, obvykle `2.0`.                                   |
| `xmlns:sparkle`    | Namespace pro Sparkle, např. `http://www.andymatuschak.org/xml-namespaces/sparkle`. |

```xml
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <!-- ... -->
</rss>
```
</details>

---

## 📡 `<channel>` – Metadata kanálu

<details>
<summary><span style="color:#1E90FF;">📋 Elementy & atributy</span></summary>

| 🏷️ Element           | 💡 Popis                                      | ⚙️ Atributy / Vnořené elementy         |
|----------------------|-----------------------------------------------|----------------------------------------|
| `<title>`            | Název kanálu                                  | —                                      |
| `<link>`             | URL adresa feedu                              | —                                      |
| `<description>`      | Stručný popis kanálu                          | —                                      |
| `<language>`         | Jazyk feedu                                   | —                                      |
| `<copyright>`        | Informace o autorských právech                | —                                      |
| `<managingEditor>`   | Email správce kanálu                          | —                                      |
| `<webMaster>`        | Email webového správce                        | —                                      |
| `<pubDate>`          | Datum vydání kanálu                           | —                                      |
| `<lastBuildDate>`    | Datum poslední aktualizace                    | —                                      |
| `<category>`         | Kategorie kanálu                              | —                                      |
| `<generator>`        | Software použitý k vytvoření kanálu           | —                                      |
| `<docs>`             | URL adresa specifikace RSS                    | —                                      |
| `<cloud>`            | Specifikace pro cloudové služby               | domain, port, path, registerProcedure, protocol |
| `<ttl>`              | Čas cache v minutách                          | —                                      |
| `<image>`            | Logo/obrázek kanálu                           | url, title, link                       |
| `<textInput>`        | Formulář pro zadávání textu                   | title, description, name, link          |
| `<skipHours>`        | Hodiny bez aktualizací                        | hour                                   |
| `<skipDays>`         | Dny bez aktualizací                           | day                                    |

</details>

---

## 📝 `<item>` – Jednotlivá aktualizace

<details>
<summary><span style="color:#1E90FF;">📋 Elementy & atributy</span></summary>

| 🏷️ Element           | 💡 Popis                                      | ⚙️ Atributy / Vnořené elementy         |
|----------------------|-----------------------------------------------|----------------------------------------|
| `<title>`            | Název položky                                 | —                                      |
| `<link>`             | URL adresa položky                            | —                                      |
| `<description>`      | Stručný popis položky                         | —                                      |
| `<author>`           | Email autora                                  | —                                      |
| `<category>`         | Kategorie položky                             | —                                      |
| `<comments>`         | URL komentářů                                 | —                                      |
| `<enclosure>`        | Mediální objekt (instalační balíček)          | url, length, type, sparkle:version     |
| `<guid>`             | Jedinečný identifikátor položky               | —                                      |
| `<pubDate>`          | Datum publikace                               | —                                      |
| `<source>`           | RSS kanál původu                              | —                                      |
| `<sparkle:tags>`     | Sparkle tagy (kritická aktualizace, min/max OS, poznámky k vydání) | vnořené elementy                       |

</details>

---

## 🧩 Delta aktualizace

> ⚠️ Delta soubory obsahují pouze rozdíly mezi verzemi aplikace a šetří šířku pásma.

<details>
<summary><span style="color:#1E90FF;">🧪 Příklad delta aktualizace</span></summary>

```xml
<item>
  <title>Verze 3.0</title>
  <description>Delta aktualizace pro přechod z verze 2.0.</description>
  <pubDate>Wed, 23 Jan 2025 10:00:00 +0000</pubDate>
  <enclosure
    url="https://example.com/files/MyApp-3.0.zip"
    sparkle:version="3.0"
    length="512000"
    type="application/octet-stream"/>
  <sparkle:deltas>
    <enclosure url="https://example.com/files/3.0_from_2.0.patch"
               sparkle:version="3.0"
               sparkle:deltaFrom="2.0"
               length="51200"
               type="application/octet-stream"/>
    <enclosure url="https://example.com/files/3.0_from_2.1.patch"
               sparkle:version="3.0"
               sparkle:deltaFrom="2.1"
               length="51200"
               type="application/octet-stream"/>
  </sparkle:deltas>
</item>
```
</details>