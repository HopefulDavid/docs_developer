# .NET – XML a serializace

XML ukládá strukturovaná data do elementů a atributů; `XmlSerializer` mapuje tuto strukturu na veřejné členy objektů.

## Náhrada znaků v XML

XML předdefinuje pouze následujících pět pojmenovaných entit:

| Znak | Zápis |
|---|---|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |
| `'` | `&apos;` |
| `"` | `&quot;` |

Diakritiku zapisujte přímo v deklarovaném kódování, například UTF-8, nebo číselnou referencí jako `&#x10D;` pro `č`.

HTML entity jako `&ccaron;` nejsou v běžném XML bez vlastní deklarace platné. [W3C: entity XML](https://www.w3.org/TR/xml/#sec-predefined-ent).

## CDATA sekce

CDATA umožňuje zapsat text obsahující například `<` a `&` bez escapování:

```xml
<example><![CDATA[Podmínka: a < b && b > 0]]></example>
```

Uvnitř jedné CDATA sekce nesmí být ukončovací posloupnost `]]>` a stále platí omezení na povolené znaky XML. [W3C: CDATA](https://www.w3.org/TR/xml/#sec-cdata-sect).

## Serializace a deserializace objektů

Úplný `Program.cs` pro konzolový projekt .NET 10 provede převod na XML a zpět:

```csharp
using System.Xml;
using System.Xml.Serialization;

var serializer = new XmlSerializer(typeof(Person));
using var output = new StringWriter();
serializer.Serialize(output, new Person { Name = "Eva & Adam" });
Console.WriteLine(output.ToString());

using var input = new StringReader(output.ToString());
using var reader = XmlReader.Create(input, new XmlReaderSettings
{
    DtdProcessing = DtdProcessing.Prohibit,
    XmlResolver = null
});
var restored = (Person?)serializer.Deserialize(reader)
    ?? throw new InvalidDataException("Dokument neobsahuje osobu.");
Console.WriteLine(restored.Name);

/// <summary>Osoba ukládaná do XML dokumentu.</summary>
[XmlRoot("person", Namespace = "urn:example:people")]
public class Person
{
    /// <summary>Zobrazované jméno osoby.</summary>
    [XmlElement("name")]
    public string Name { get; set; } = "";
}
```

Serializátor sám escapuje ampersand a deserializovaný výstup je opět `Eva & Adam`.

`StringWriter` vytváří text s deklarací UTF-16; pro zápis přímo do UTF-8 souboru použijte `XmlWriter` nad souborem s odpovídajícím nastavením kódování. [Microsoft: příklady serializace XML](https://learn.microsoft.com/en-us/dotnet/standard/serialization/examples-of-xml-serialization).

Čtečka explicitně odmítá DTD a nenačítá externí zdroje. [DtdProcessing](https://learn.microsoft.com/en-us/dotnet/api/system.xml.xmlreadersettings.dtdprocessing), [XmlResolver](https://learn.microsoft.com/en-us/dotnet/api/system.xml.xmlreadersettings.xmlresolver).

## Namespace v XML

Identitu elementu určuje jeho lokální název a URI jmenného prostoru; prefix je jen zkratka.

URI nemusí být dostupná webová stránka.

Následující dva elementy tedy označují stejné jméno:

```xml
<p:person xmlns:p="urn:example:people" />
<person xmlns="urn:example:people" />
```

Pouhé odstranění prefixů a namespace může sloučit původně rozdílné názvy a změnit význam dat.

Namespace v atributech modelu musí odpovídat vstupnímu dokumentu. [W3C: Namespaces in XML](https://www.w3.org/TR/xml-names/).

## Konvence serializace XML

| Atribut | Účel |
|---|---|
| `XmlRoot` | Název a namespace kořenového elementu |
| `XmlElement` | Mapování člena na element |
| `XmlAttribute` | Mapování člena na atribut |
| `XmlText` | Textový obsah elementu |
| `XmlIgnore` | Vynechání člena |
| `XmlArray`, `XmlArrayItem` | Obal kolekce a položky |
| `XmlEnum` | Textová reprezentace hodnoty enumu |
| `XmlType` | Název a namespace XML typu |
| `XmlInclude` | Zahrnutí známého odvozeného typu |
| `XmlAnyElement`, `XmlAnyAttribute` | Zachycení dalších elementů nebo atributů |

Přesné mapování a omezení typů shrnuje [Microsoft: atributy pro XML serializaci](https://learn.microsoft.com/en-us/dotnet/standard/serialization/attributes-that-control-xml-serialization).
