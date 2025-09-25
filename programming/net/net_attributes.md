# 🏷️ .NET – Atributy, Datové anotace & FileHelpers

> 🚀 Praktické rady pro práci s atributy v .NET, validaci dat pomocí anotací a zpracování souborů s FileHelpers.

---

## 🧩 Co jsou atributy?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy atributů</span></summary>

- Atributy přidávají **metadata** ke třídám, metodám, vlastnostem nebo polím.
- Umožňují rozšířit chování kódu bez změny jeho logiky.
- Často se využívají pro validaci, serializaci, mapování dat apod.

![](../../images/net_attributes_intro.png)

</details>

---

## 📝 Datové anotace

<details>
<summary><span style="color:#1E90FF;">📚 Nejčastější datové anotace</span></summary>

| Anotace              | Popis                                      |
|----------------------|---------------------------------------------|
| `[Required]`         | Hodnota je povinná                          |
| `[Range]`            | Hodnota v číselném rozsahu                  |
| `[MaxLength]`        | Maximální délka hodnoty                     |
| `[MinLength]`        | Minimální délka hodnoty                     |
| `[StringLength]`     | Maximální a volitelná minimální délka       |
| `[RegularExpression]`| Ověření hodnoty regulárním výrazem          |
| `[DataType]`         | Specifikuje datový typ                      |
| `[Display]`          | Název a pořadí hodnoty                      |

</details>

<details>
<summary><span style="color:#1E90FF;">🧑‍💻 Příklad použití datových anotací</span></summary>

**Definice třídy:**
```csharp
public class Author
{
    [Required(ErrorMessage = "{0} is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "First Name should be minimum 3 characters and a maximum of 50 characters")]
    [DataType(DataType.Text)]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "{0} is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Last Name should be minimum 3 characters and a maximum of 50 characters")]
    [DataType(DataType.Text)]
    public string LastName { get; set; }

    [DataType(DataType.PhoneNumber)]
    [Phone]
    public string PhoneNumber { get; set; }

    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email { get; set; }
}
```

**Validace dat:**
```csharp
Author author = new Author();
author.FirstName = "Joydip";
author.LastName = "";
author.PhoneNumber = "1234567890";
author.Email = "joydipkanjilal@yahoo.com";

ValidationContext context = new ValidationContext(author, null, null);
List<ValidationResult> validationResults = new List<ValidationResult>();
bool valid = Validator.TryValidateObject(author, context, validationResults, true);
if (!valid)
{
    foreach (ValidationResult validationResult in validationResults)
    {
        Console.WriteLine("{0}", validationResult.ErrorMessage);
    }
}
```
</details>

<details>
<summary><span style="color:#1E90FF;">🧬 Vlastní datová anotace</span></summary>

1. Vytvoř třídu dědící z `ValidationAttribute`.
2. Přepiš metodu `IsValid`.

**Definice:**
```csharp
[AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
public class IsEmptyAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        var inputValue = value as string;
        return !string.IsNullOrEmpty(inputValue);
    }
}
```

**Použití:**
```csharp
[IsEmpty(ErrorMessage = "Should not be null or empty.")]
public string FirstName { get; set; }

[IsEmpty(ErrorMessage = "Should not be null or empty.")]
public string LastName { get; set; }
```
</details>

---

## 📄 FileHelpers – Zpracování souborů

> [!IMPORTANT]
> Nepodporuje:
> - Záznamy s proměnnou délkou (každý záznam musí mít stejný počet polí)
> - Změnu formátu za běhu (formát musí být stejný po celou dobu běhu programu)

<details>
<summary><span style="color:#1E90FF;">🧩 Nejčastější atributy FileHelpers</span></summary>

### Třída
- `[DelimitedRecord]` – Záznamy s oddělovači
- `[FixedLengthRecord]` – Záznamy s pevnou délkou

### Pole
- `[FieldTrim]` – Odstranění bílých znaků
- `[FieldOptional]` – Volitelný sloupec
- `[FieldIgnore]` – Ignoruje sloupec
- `[FieldConverter]` – Přiřazení konvertoru
- `[FieldOrder]` – Pořadí sloupců
- `[FieldQuoted]` – Hodnota v uvozovkách

</details>

<details>
<summary><span style="color:#1E90FF;">📝 Příklad použití FileHelpers</span></summary>

**Definice třídy:**
```csharp
[DelimitedRecord(",")]
public class Order
{
    [FieldConverter(typeof(MyCustomConverter))]
    public int OrderID;
    // ...
}
```

**Čtení souboru:**
```csharp
var engine = new FileHelperEngine<Order>();
Order[] result = engine.ReadFile("Input.txt");
```

**Zápis do souboru:**
```csharp
var engine = new FileHelperEngine<Order>();
engine.WriteFile("Output.txt", result);
```
</details>

<details>
<summary><span style="color:#1E90FF;">🧬 Vlastní konvertor</span></summary>

1. Vytvoř třídu dědící z `ConverterBase`.
2. Přepiš metody `StringToField` a `FieldToString`.

**Definice:**
```csharp
public class MyCustomConverter : ConverterBase
{
    public override object StringToField(string from)
    {
        // Převeďte řetězec na objekt
    }

    public override string FieldToString(object fieldValue)
    {
        // Převeďte objekt na řetězec
    }
}
```
</details>