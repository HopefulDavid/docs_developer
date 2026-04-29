# .NET – XML: Serializace, CDATA, Namespace & Konvence

> Praktické rady pro práci s XML v .NET, náhradu znaků, CDATA, serializaci/deserializaci objektů, namespace a konvence.

---

## Náhrada znaků v XML

<details>
<summary>Základní a speciální znaky</summary>

| Znak      | Náhrada      | Popis                |
|-----------|--------------|----------------------|
| `<`       | `&lt;`       | Levá ostrá závorka   |
| `>`       | `&gt;`       | Pravá ostrá závorka  |
| `&`       | `&amp;`      | Ampersand            |
| `'`       | `&apos;`     | Apostrof             |
| `"`       | `&quot;`     | Uvozovky             |
| Á         | `&Aacute;`  | Á s čárkou           |
| á         | `&aacute;`  | á s čárkou           |
| Č         | `&Ccaron;`  | Č s háčkem           |
| č         | `&ccaron;`  | č s háčkem           |

> [!NOTE]
> Stejným způsobem lze nahradit i další znaky s diakritikou pomocí prefixů `acute` (čárka) nebo `caron` (háček).

</details>

---

## CDATA sekce

<details>
<summary>Co je CDATA?</summary>

- Umožňuje vložit do XML libovolný text, včetně speciálních znaků.
- Vše uvnitř CDATA není interpretováno jako XML.

**Ukázka:**
```xml
<exampleOfACDATA>
  <![CDATA[
    Můžete použít > < „ & nebo vkládat elementy <foo></bar>
    bez narušení formátu XML.
  ]]>
</exampleOfACDATA>
```
</details>

---

## Serializace & Deserializace objektů

<details>
<summary>Jak převést objekt na XML a zpět?</summary>

### Serializace objektu do XML
```csharp
public string SerializeObject(MyObject myObject)
{
    var serializer = new XmlSerializer(typeof(MyObject));
    using (var stringWriter = new StringWriter())
    {
        serializer.Serialize(stringWriter, myObject);
        return stringWriter.ToString();
    }
}
```

### Deserializace XML na objekt
```csharp
public MyObject DeserializeObject(string xml)
{
    var serializer = new XmlSerializer(typeof(MyObject));
    using (var stringReader = new StringReader(xml))
    {
        return (MyObject)serializer.Deserialize(stringReader);
    }
}
```
</details>

---

## Namespace v XML

<details>
<summary>Jak fungují jmenné prostory?</summary>

- Zabraňují konfliktu názvů v XML.
- Poznáte podle atributu `xmlns`.

> [!NOTE]
> URL namespace nemusí být skutečná adresa, slouží jen jako identifikátor.

**Příklad s prefixem:**
```xml
<p:Person xmlns:p="test">
    <p:FirstName>John</p:FirstName>
</p:Person>
```
**Serializace s namespace:**
```csharp
XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
ns.Add("p", "test");
s.Serialize(writer, person, ns);
```

**Bez namespace:**
```xml
<person>
    <name>John Doe</name>
</person>
```
```csharp
ns.Add("", "");
s.Serialize(writer, person, ns);
```

> [!WARNING]
> Vlastnosti nesmí mít atribut `XmlElement` s namespace, pokud serializujete bez namespace.

**Odebrání namespace z XML:**
```csharp
XDocument document = XDocument.Parse(dataOutput);
foreach (var element in document.Root.DescendantsAndSelf())
{
    element.Name = element.Name.LocalName;
    element.ReplaceAttributes(element.Attributes()
        .Where(x => !x.IsNamespaceDeclaration)
        .Select(x => new XAttribute(x.Name.LocalName, x.Value)));
}
dataOutput = document.ToString();
```
</details>

---

## Konvence serializace XML

<details>
<summary>Přizpůsobení serializace tříd a vlastností</summary>

| Attribut/Metoda                | Použití                                                                 |
|--------------------------------|------------------------------------------------------------------------|
| `[XmlRoot("MyClass")]`         | Pojmenuje kořenový element                                             |
| `[XmlIgnore]`                  | Ignoruje vlastnost při serializaci                                     |
| `[XmlNamespaceDeclarations]`   | Povolit jmenné prostory jako atributy                                  |
| `ShouldSerialize{Property}`    | Metoda rozhodující o serializaci vlastnosti                            |
| `{Property}Specified`          | Bool vlastnost určující serializaci                                    |
| `[XmlArray("MyCollection")]`   | Pojmenuje kolekci                                                      |
| `[XmlArrayItem("Item")]`       | Pojmenuje položky v kolekci                                            |
| `[XmlAttribute]`               | Serializuje vlastnost jako XML atribut                                 |
| `[XmlText]`                    | Serializuje vlastnost jako textový obsah elementu                      |
| `[XmlEnum("Value1")]`          | Pojmenuje hodnotu enumu v XML                                          |
| `[XmlType("MyClass")]`         | Pojmenuje třídu jako XML element                                       |
| `[XmlInclude(typeof(...))]`    | Umožní serializaci děděných tříd                                       |
| `[XmlAnyElement]`              | Libovolný XML element (typ XmlElement[])                               |
| `[XmlAnyAttribute]`            | Libovolný XML atribut (typ XmlAttribute[])                             |

> [!NOTE]
> Pro detailní nastavení serializace využijte kombinaci atributů a metod.

</details>