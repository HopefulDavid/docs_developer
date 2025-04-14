### Appcast Feed XML

Appcast je RSS feed ve formátu XML.

Poskytuje informace o dostupných verzích aplikace.

Podporuje aktualizace aplikací pomocí technologie [`Sparkle`](https://sparkle-project.org/).

---

Struktura:

<details>
<summary><span style="color:#1E90FF;">Hlavní komponenty</span></summary>

| Element     | Popis                                                         |
|-------------|---------------------------------------------------------------|
| `<rss>`     | Kořenový element obsahující informaci o verzi a namespace.    |
| `<channel>` | Hlavní sekce feedu obsahující informace o kanálu aktualizací. |
| `<item>`    | Každý jednotlivý záznam pro jednu verzi aplikace.             |

</details>

<details>
<summary><span style="color:#1E90FF;">Příklad feedu</span></summary>

```xml
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
    <channel>
        <!-- Název kanálu aktualizací -->
        <title>Aktualizace pro MyApp</title>

        <!-- URL adresa feedu -->
        <link>https://example.com/updates.xml</link>

        <!-- Popis kanálu aktualizací -->
        <description>Aktualizace pro aplikaci MyApp</description>

        <!-- Datum vydání kanálu v RFC 822 formátu -->
        <pubDate>Thu, 18 Jan 2025 10:00:00 +0000</pubDate>

        <!-- Jazyk feedu (např. cs-cz, en-us) -->
        <language>cs-cz</language>

        <item>
            <!-- Název verze aplikace -->
            <title>Verze 1.0</title>

            <!-- URL adresa s více informacemi o verzi -->
            <link>https://example.com/release/1.0</link>

            <!-- Popis verze aplikace -->
            <description>První verze aplikace MyApp.</description>

            <!-- Datum vydání verze v RFC 822 formátu -->
            <pubDate>Fri, 17 Jan 2025 10:00:00 +0000</pubDate>

            <!-- Odkaz na instalační balíček -->
            <!-- url = odkaz na instalační balíček -->
            <!-- sparkle:version = verze aplikace -->
            <!-- length = velikost souboru v bajtech -->
            <!-- type = MIME typ souboru -->
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

Hlavni komponenty:

<details>
<summary><span style="color:#1E90FF;">&lt;rss&gt;</span></summary>

Označuje začátek feedu a specifikuje verzi RSS a použité namespace pro Sparkle.

> [!NOTE]
> RSS je zkratka pro "Rich Site Summary" nebo "Really Simple Syndication".
>
> To je formát pro distribuci obsahu na webu.

Atributy:

<table>
  <tr>
    <th>Atribut</th>
    <th>Popis</th>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">version</td>
    <td>Verze RSS specifikace, obvykle "2.0".</td>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">xmlns:sparkle</td>
    <td>Namespace pro Sparkle, obvykle "http://www.andymatuschak.org/xml-namespaces/sparkle".</td>
  </tr>
</table>

Příklad:

```xml
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
    <!-- Obsah feedu viz. níže -->
   <channel>
      <item>
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

<details>
<summary><span style="color:#1E90FF;">&lt;channel&gt;</span></summary>

Popisuje kanál feedu a obsahuje metadata, která se vztahují k celému feedu.

Elementy a atributy:

<table>
  <tr>
    <th>Element</th>
    <th>Popis</th>
    <th>Atributy</th>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;title&gt;</td>
    <td>Název kanálu, např. „Aktualizace pro MyApp“.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;link&gt;</td>
    <td>URL adresa feedu (přímý odkaz na XML soubor).</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;description&gt;</td>
    <td>Stručný popis kanálu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;language&gt;</td>
    <td>Jazyk feedu (např. `en-us`, `cs-cz`).</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;copyright&gt;</td>
    <td>Informace o autorských právech.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;managingEditor&gt;</td>
    <td>Emailová adresa správce kanálu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;webMaster&gt;</td>
    <td>Emailová adresa webového správce.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;pubDate&gt;</td>
    <td>Datum vydání kanálu v RFC 822 formátu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;lastBuildDate&gt;</td>
    <td>Datum poslední aktualizace kanálu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;category&gt;</td>
    <td>Kategorie kanálu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;generator&gt;</td>
    <td>Software použitý k vytvoření kanálu.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;docs&gt;</td>
    <td>URL adresa specifikace RSS.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;cloud&gt;</td>
    <td>Specifikace pro cloudové služby.</td>
    <td>
      <ul>
        <li>domain: Doména služby</li>
        <li>port: Port služby</li>
        <li>path: Cesta k RPC</li>
        <li>registerProcedure: Název procedury</li>
        <li>protocol: Protokol (např. `xml-rpc`)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;ttl&gt;</td>
    <td>Čas v minutách, po který má být kanál cachován.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;image&gt;</td>
    <td>Obsahuje logo nebo obrázek související s kanálem.</td>
    <td>
      <ul>
        <li>url: URL adresa obrázku</li>
        <li>title: Titulek obrázku</li>
        <li>link: URL adresa, kam odkazuje obrázek</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;textInput&gt;</td>
    <td>Formulář pro zadávání textu.</td>
    <td>
      <ul>
        <li>title: Titulek formuláře</li>
        <li>description: Popis formuláře</li>
        <li>name: Název vstupního pole</li>
        <li>link: URL adresa, kam formulář odesílá data</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;skipHours&gt;</td>
    <td>Hodiny, během kterých nemá být kanál aktualizován.</td>
    <td>
      <ul>
        <li>hour: Hodina (0-23)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;skipDays&gt;</td>
    <td>Dny, během kterých nemá být kanál aktualizován.</td>
    <td>
      <ul>
        <li>day: Den (např. `Monday`, `Tuesday`)</li>
      </ul>
    </td>
  </tr>
</table>

Příklad:

```xml

<channel>
    <!-- Název kanálu aktualizací -->
    <title>Aktualizace pro MyApp</title>

    <!-- URL adresa feedu -->
    <link>https://example.com/updates.xml</link>

    <!-- Popis kanálu aktualizací -->
    <description>Aktualizace pro aplikaci MyApp</description>

    <!-- Datum vydání kanálu v RFC 822 formátu -->
    <pubDate>Thu, 18 Jan 2025 10:00:00 +0000</pubDate>

    <!-- Jazyk feedu (např. cs-cz, en-us) -->
    <language>cs-cz</language>

    <!-- Informace o autorských právech -->
    <copyright>© 2025 MyApp</copyright>

    <!-- Emailová adresa správce kanálu -->
    <managingEditor>editor@example.com</managingEditor>

    <!-- Emailová adresa webového správce -->
    <webMaster>webmaster@example.com</webMaster>

    <!-- Datum poslední aktualizace kanálu -->
    <lastBuildDate>Thu, 18 Jan 2025 10:00:00 +0000</lastBuildDate>

    <!-- Kategorie kanálu -->
    <category>Software Updates</category>

    <!-- Software použitý k vytvoření kanálu -->
    <generator>MyApp Generator</generator>

    <!-- URL adresa specifikace RSS -->
    <docs>https://www.rssboard.org/rss-draft-1</docs>

    <!-- Specifikace pro cloudové služby -->
    <cloud domain="rpc.example.com" port="80" path="/rpc" registerProcedure="myAppUpdate" protocol="xml-rpc"/>

    <!-- Čas v minutách, po který má být kanál cachován -->
    <ttl>60</ttl>

    <!-- Obrázek související s kanálem -->
    <image>
        <!-- URL adresa obrázku -->
        <url>https://example.com/logo.png</url>

        <!-- Titulek obrázku -->
        <title>MyApp Logo</title>

        <!-- URL adresa, kam odkazuje obrázek -->
        <link>https://example.com</link>
    </image>

    <!-- Formulář pro zadávání textu -->
    <textInput>
        <title>Search</title>
        <description>Search MyApp updates</description>
        <name>search</name>
        <link>https://example.com/search</link>
    </textInput>

    <!-- Hodiny, během kterých nemá být kanál aktualizován -->
    <skipHours>
        <hour>0</hour>
        <hour>1</hour>
    </skipHours>

    <!-- Dny, během kterých nemá být kanál aktualizován -->
    <skipDays>
        <day>Saturday</day>
        <day>Sunday</day>
    </skipDays>
</channel>
```

</details>

<details>
<summary><span style="color:#1E90FF;">&lt;item&gt;</span></summary>

Každý `<item>` představuje jednu verzi aplikace a její aktualizaci.

Elementy a atributy:

<table>
  <tr>
    <th>Element</th>
    <th>Popis</th>
    <th>Atributy</th>
    <th>Vnořené elementy</th>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;title&gt;</td>
    <td>Název položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;link&gt;</td>
    <td>URL adresa položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:rgba(255,0,0,0.78); color:white;">&lt;description&gt;</td>
    <td>Stručný popis položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;author&gt;</td>
    <td>Emailová adresa autora položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;category&gt;</td>
    <td>Kategorie, do které položka patří.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;comments&gt;</td>
    <td>URL adresa stránky s komentáři k položce.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;enclosure&gt;</td>
    <td>Popisuje mediální objekt připojený k položce.</td>
    <td>
      <ul>
        <li>url<br>URL adresa mediálního objektu</li>
        <li>length<br>Velikost souboru v bajtech</li>
        <li>type<br>MIME typ souboru</li>
        <li>sparkle:version<br>Verze aplikace</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>&lt;sparkle:criticalUpdate&gt;<br>Označuje kritickou aktualizaci</li>
        <li>&lt;sparkle:minimumSystemVersion&gt;<br>Minimální verze OS</li>
        <li>&lt;sparkle:maximumSystemVersion&gt;<br>Maximální verze OS</li>
        <li>&lt;sparkle:releaseNotesLink&gt;<br>Odkaz na poznámky k vydání</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;guid&gt;</td>
    <td>Jedinečný identifikátor položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;pubDate&gt;</td>
    <td>Datum publikace položky.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;source&gt;</td>
    <td>RSS kanál, ze kterého položka pochází.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td style="background-color:#575656; color:white;">&lt;sparkle:tags&gt;</td>
    <td>Sparkle-specifické tagy pro kritické aktualizace.</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>&lt;sparkle:criticalUpdate&gt;<br>Označuje kritickou aktualizaci</li>
        <li>&lt;sparkle:minimumSystemVersion&gt;<br>Minimální verze OS</li>
        <li>&lt;sparkle:maximumSystemVersion&gt;<br>Maximální verze OS</li>
        <li>&lt;sparkle:releaseNotesLink&gt;<br>Odkaz na poznámky k vydání</li>
      </ul>
    </td>
  </tr>
</table>

Příklad:

```xml

<item>
    <!-- Název položky -->
    <title>Verze 1.0</title>

    <!-- URL adresa položky -->
    <link>https://example.com/release/1.0</link>

    <!-- Stručný popis položky -->
    <description>První verze aplikace MyApp.</description>

    <!-- Emailová adresa autora položky -->
    <author>author@example.com</author>

    <!-- Kategorie, do které položka patří -->
    <category>Software</category>

    <!-- URL adresa stránky s komentáři k položce -->
    <comments>https://example.com/release/1.0/comments</comments>

    <!-- Popisuje mediální objekt připojený k položce -->
    <enclosure
            url="https://example.com/files/MyApp-1.0.zip"
            sparkle:version="1.0"
            length="102400"
            type="application/octet-stream"/>

    <!-- Jedinečný identifikátor položky -->
    <guid>https://example.com/release/1.0</guid>

    <!-- Datum publikace položky -->
    <pubDate>Fri, 17 Jan 2025 10:00:00 +0000</pubDate>

    <!-- RSS kanál, ze kterého položka pochází -->
    <source>https://example.com/updates.xml</source>

    <!-- Sparkle-specifické tagy pro kritické aktualizace -->
    <sparkle:tags>
        <sparkle:criticalUpdate/>
    </sparkle:tags>
</item>
```

</details>

---

Delta aktualizace:

> [!WARNING]
> Delta soubory je zapotřebí vytvořit pomocí nástroje pro generování delta souborů.

Delta soubory obsahují pouze rozdíly mezi verzemi aplikace.

Tento typ souboru šetří šířku pásma a urychluje proces aktualizace.

<details>
<summary><span style="color:#1E90FF;">Příklad</span></summary>

```xml
<item>
    <!-- Název verze aplikace -->
    <title>Verze 3.0</title>

    <!-- Popis delta aktualizace -->
    <description>Delta aktualizace pro přechod z verze 2.0.</description>

    <!-- Datum vydání verze v RFC 822 formátu -->
    <pubDate>Wed, 23 Jan 2025 10:00:00 +0000</pubDate>

    <!-- Odkaz na instalační balíček -->
        <!-- url = odkaz na instalační balíček -->
        <!-- sparkle:version = verze aplikace -->
        <!-- length = velikost souboru v bajtech -->
        <!-- type = MIME typ souboru -->
    <enclosure
            url="https://example.com/files/MyApp-3.0.zip"
            sparkle:version="3.0"
            length="512000"
            type="application/octet-stream"/>

    <!-- Delta aktualizace -->
    <sparkle:deltas>
        <!-- Odkaz na delta soubor -->
            <!-- url = odkaz na delta soubor -->
            <!-- sparkle:version = verze aplikace -->
            <!-- sparkle:deltaFrom = verze, ze které se aktualizuje -->
            <!-- length = velikost delta souboru v bajtech -->
            <!-- type = MIME typ souboru -->
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
        <enclosure/>
    </sparkle:deltas>
</item>
```
</details>