<details>
<summary><span style="color:#1E90FF;">Náhrada znaků</span></summary>

Základní znaky:

- `<` (levá ostrá závorka)

    `&lt;`
- `>` (pravá ostrá závorka)

    `&gt;`
- `&` (ampersand)

    `&amp;`
- `'` (apostrof)

    `&apos;`
- `"` (uvozovky)

    `&quot;`

Znaky s diakritikou:

- Á

  `&Aacute;`

- á

  `&aacute;`

- Č

  `&Ccaron;`

- č

  `&ccaron;`

> [!NOTE]
> Stejným způsobem lze následně nahradit i další znaky s diakritikou.
>
> s prefixem `caron` (uvozovky) nebo `acute` (čárka nad písmenem).
</details>

<details>
<summary><span style="color:#1E90FF;">CDATA</span></summary>

CDATA (Character Data) je způsob, jak vložit data do XML souboru, která by jinak byla interpretována jako XML.

```xml
<exampleOfACDATA>
  <![CDATA[
    Protože se jedná o sekci CDATA
    mohu použít všechny druhy vyhrazených znaků jako:
    > < „ &
    nebo psát věci jako:
    <foo></bar>
    a dokument je stále dobře zformátovaný!
]]>
</exampleOfACDATA>
```
</details>

<details>
<summary><span style="color:#1E90FF;">Serializace a Deserializace objektu</span></summary>

### Serializace

Proces, kdy se objekt převede na XML soubor.

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

### Deserializace

Proces, kdy se XML soubor převede zpět na objekt.

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

<details>
<summary><span style="color:#1E90FF;">Namespace</span></summary>

Způsob jak zabránit konfliktu jmen v XML souborech.

> [!NOTE]
> Poznáme podle klíčového slova **`xmlns`** u atributu.

> [!WARNING]
> Pokud je namespace použit, musí se uvést i při zpracování souboru.

> [!NOTE]
> URL namespace v XML dokumentu nemusí být skutečná existující URL adresa.
>
> Je to pouze jedinečný identifikátor, který se používá k rozlišení názvů elementů a atributů v XML dokumentu.
>
> Tento identifikátor je často ve formě URL pro snadnou identifikaci a jedinečnost, ale nemusí to být nutně platná URL adresa, kterou byste mohli otevřít v prohlížeči.
>
> Například:
> ```xml
> <?xml version="1.0" encoding="utf-16"?>
> <p:Person xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:p="test">
>     <p:FirstName>John</p:FirstName>
>     <p:LastName>Doe</p:LastName>
>     <p:Age>30</p:Age>
> </p:Person>
> ```
>
> ```csharp
> XmlSerializer s = new XmlSerializer(person.GetType());
> StringBuilder sb = new StringBuilder();
> using (StringWriter writer = new StringWriter(sb))
> {
>     XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
>     ns.Add("p", "test");
>     s.Serialize(writer, person, ns);
> }
> ```

### XML soubor bez namespace

```xml
<person>
    <name>John Doe</name>
    <age>30</age>
</person>
```

> [!WARNING]
> Vlastnosti na objektu **nesmí mít atribut `XmlElement` s namespace**.

```csharp
XmlSerializer s = new XmlSerializer(person.GetType());
XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
ns.Add("", "");
StringBuilder sb = new StringBuilder();
using (StringWriter writer = new StringWriter(sb))
{
    s.Serialize(writer, person, ns);
}
```

> [!NOTE]
> Řešením jak odebrat namespace úplně všude a nebere v potaz atributy `XmlElement` s namespace.
>
> ```csharp
> XDocument document = XDocument.Parse(dataOutput);
> if (document.Root == null) return;
> foreach (var element in document.Root.DescendantsAndSelf())
> {
>     element.Name = element.Name.LocalName;
>     element.ReplaceAttributes(element.Attributes()
>            .Where(x => !x.IsNamespaceDeclaration)
>            .Select(x => new XAttribute(x.Name.LocalName, x.Value)));
> }
> dataOutput = document.ToString();
> ```
>
> Pro více info <a href="https://stackoverflow.com/questions/10438284/how-to-strip-namespaces-from-xml-document">zde</a>.

### XML soubor s namespace

Příklad 1:

```xml
<?xml version="1.0" encoding="utf-16"?>
<Person xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <FirstName>John</FirstName>
    <LastName>Doe</LastName>
    <Age>30</Age>
</Person>
```

```csharp
XmlSerializer s = new XmlSerializer(person.GetType());
StringBuilder sb = new StringBuilder();
using (StringWriter writer = new StringWriter(sb))
{
    s.Serialize(writer, person);
}
```
Příklad 2:

```xml
<?xml version="1.0" encoding="utf-16"?>
<p:Person xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:p="http://www.example.com">
    <p:FirstName>John</p:FirstName>
    <p:LastName>Doe</p:LastName>
    <p:Age>30</p:Age>
</p:Person>
```

```csharp
XmlSerializer s = new XmlSerializer(person.GetType());
StringBuilder sb = new StringBuilder();
using (StringWriter writer = new StringWriter(sb))
{
    XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
    ns.Add("p", "http://www.example.com");
    s.Serialize(writer, person, ns);
}
```
> [!NOTE]
> V tomto kódu "p" je prefix pro namespace a "http://www.example.com" je URL namespace.
</details>

<details>
<summary><span style="color:#1E90FF;">Konvence serializace XML</span></summary>

Umožňuje přizpůsobit jak se třídy a vlastnosti serializují do XML.

### Kořenový element

Označí třídu, která se má serializovat jako kořenový element

Pojmenuje kořenový element.

```csharp
[XmlRoot("MyClass")]
public class MyClass
{
    // ...
}
```

### Ignorovat vlastnosti

Označuje vlastnosti, která se nemají serializovat.

```csharp
[XmlIgnore]
public string MyProperty { get; set; }
```

### Povolit jmenné prostory

Označuje, že se mají jmenné prostory serializovat jako atributy.

```csharp
[XmlNamespaceDeclarations]
public class MyClass
{
    // ...
}
```

### Povolit/Zakázat přes metodu

ShouldSerialize{PropertyName} je metoda, která se volá při serializaci objektu.

Tato metoda se používá k rozhodnutí, zda se daná vlastnost má serializovat.

- Pokud metoda vrátí `true`

  vlastnost `{PropertyName}` se serializuje

- Pokud metoda vrátí `false`

  vlastnost `{PropertyName}` se neserializuje

```csharp
public bool ShouldSerializeMyProperty()
{
    // logika rozhodnutí zda serializovat MyProperty
}
```

### Povolit/Zakázat přes vlastnost bool

`{PropertyName}Specified` je vlastnost typu `bool`, která se používá k rozhodnutí, zda se má vlastnost serializovat.

Toto je alternativa k `ShouldSerialize{PropertyName}`.

- `{PropertyName}Specified` pokud je `true`

  vlastnost `{PropertyName}` se serializuje

- `{PropertyName}Specified` pokud je `false`

  vlastnost `{PropertyName}` se neserializuje

```csharp
public bool MyPropertySpecified { get; set; }
```

### Pojmenování kolekce a položek v kolekci

Používá se k pojmenování kolekce a položek v kolekci.

```csharp
[XmlArray("MyCollection"), XmlArrayItem("Item")]
public List<string> MyProperty { get; set; }
```

### Xml element ➡ xml atribut

Vlastnost, ktera se serializují jako "XML atribut" místo jako "XML element".

```csharp
[XmlAttribute]
public string MyProperty { get; set; }
```

### Xml element ➡ textový obsah

Označuje vlastnosti, která má serializovat jako obsah XML elementu.

> To znamená, že vlastnost se serializuje jako textový obsah XML elementu, nikoli jako samostatný element.

```csharp
[XmlText]
public string MyProperty { get; set; }
```

### Enum ➡ xml element

Označuje výčtový typ, který se má serializovat jako XML element.

```csharp
public enum MyEnum
{
    [XmlEnum("Value1")]
    Value1,
    [XmlEnum("Value2")]
    Value2
}
```

### Třída ➡ xml element

Označí třídu, která se má serializovat jako XML element.

```csharp
[XmlType("MyClass")]
public class MyClass
{
    // ...
}
```

### Třída ze které se dědí ➡ xml element

Označuje třídy, které se mají serializovat jako potomky rodičovské třídy.

> To znamená, že pokud máte třídu `MyBaseClass` a od ní odvozenou třídu `MyDerivedClass`, musíte označit `MyBaseClass` pomocí `XmlIncludeAttribute`.

```csharp
[XmlInclude(typeof(MyDerivedClass))]
public class MyBaseClass
{
    // ...
}

public class MyDerivedClass : MyBaseClass
{
    // ...
}
```

### Libovolný xml element

Označuje vlastnost, která může obsahovat libovolný XML element.

> [!WARNING]
> Musí být typu `XmlElement[]`, nebo `XmlElement`

```csharp
[XmlAnyElement]
public XmlElement[] MyProperty { get; set; }
```

### Libovolný xml atribut

Označuje vlastnost, která může obsahovat libovolný XML atribut.

> [!WARNING]
> Musí být typu `XmlAttribute[]`, nebo `XmlAttribute`

```csharp
[XmlAnyAttribute]
public XmlAttribute[] MyProperty { get; set; }
```
</details>