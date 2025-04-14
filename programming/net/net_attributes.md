Atributy obsahujá **Metadata**

## Datové anotace

= System.ComponentModel.Annotations (namespace)

- Nejvíce používané anotace:

    <details>
    <summary><span style="color:#1E90FF;">[Required]</span></summary>

  Hodnota je povinná

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[Range]</span></summary>

  Hodnota v číselném rozsahu

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[MaxLength]</span></summary>

  Hodnota s maximální délkou

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[MinLength]</span></summary>

  Hodnota s minimální délkou

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[StringLength]</span></summary>

  Hodnota s maximální a volitelnou minimální délkou

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[RegularExpression]</span></summary>

  Ověření hodnoty z regulárního výrazu

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[DataType]</span></summary>

  Specifikuje datový typ pro hodnotu

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[Display]</span></summary>

  Název a pořadí hodnoty

    </details>

<details>
<summary><span style="color:#1E90FF;">Příklad</span></summary>

<details>
<summary><span style="color:#E95A84;">Definice</span></summary>

```c#
public class Author
{
    [Required(ErrorMessage = "{0} is required")]
    [StringLength(50, MinimumLength = 3,
    ErrorMessage = "First Name should be minimum 3 characters and a maximum of 50 characters")]
    [DataType(DataType.Text)]
    public string FirstName { get; set; }
    
    [Required(ErrorMessage = "{0} is required")]
    [StringLength(50, MinimumLength = 3,
    ErrorMessage = "Last Name should be minimum 3 characters and a maximum of 50 characters")]
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

</details>

<details>
<summary><span style="color:#E95A84;">Použití</span></summary>

```c#
Author author = new Author();
author.FirstName = "Joydip";
author.LastName = "";
author.PhoneNumber = "1234567890";
author.Email = "joydipkanjilal@yahoo.com";

// Provedení kontroly dat
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
</details>

<details>
<summary><span style="color:#1E90FF;">Vlastní datová anotace</span></summary>

1. Vytvořit třídu a rozšířit ji o třídu `ValidationAttribute`

2. Přepsat metodu `IsValid`

    - Definice

        ```c#
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

    - Použití

        ```c#
        [IsEmpty(ErrorMessage = "Should not be null or empty.")]
        public string FirstName { get; set; }
     
        [IsEmpty(ErrorMessage = "Should not be null or empty.")]
        public string LastName { get; set; }
        ```

</details>

## FileHelpers

> [!IMPORTANT]
> Nepodporuje:
>
> Záznamy s proměnnou délkou (každý záznam musí mít stejný počet polí)
>
> Změnu formátu za běhu ( každý záznam musí mít stejný formát po celou dobu běhu programu)

- Nejvíce používané atributy:

  ## Třída
    <details>
    <summary><span style="color:#1E90FF;">[DelimitedRecord]</span></summary>

  Záznamy s oddělovači.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FixedLengthRecord]</span></summary>

  Záznamy s pevnou délkou.

    </details>

  ## Pole

    <details>
    <summary><span style="color:#1E90FF;">[FieldTrim]</span></summary>

  Odstranění bílých znaků z hodnoty.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FieldOptional]</span></summary>

  Volitelný sloupec.

  Pokud sloupec v souboru chybí, nebude to považováno za chybu.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FieldIgnore]</span></summary>

  Ignoruje sloupec při čtení nebo zápisu souboru.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FieldConverter]</span></summary>

  Přiřazení konvertoru.

  Konvertor = třída, převádí hodnoty mezi textovou reprezentací v souboru a hodnotou v datech.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FieldOrder]</span></summary>

  Určuje pořadí sloupců pro čtení nebo zápis souboru.

    </details>

    <details>
    <summary><span style="color:#1E90FF;">[FieldQuoted]</span></summary>

  Pokud je hodnota v souboru uvedena v uvozovkách.

    </details>

<details>
<summary><span style="color:#1E90FF;">Příklad</span></summary>


<details>
<summary><span style="color:#E95A84;">Definice třídy pro záznamy</span></summary>

Soubory s oddělovači: `[DelimitedRecord(",")]`

Soubory s pevnou délkou záznamu: `[FixedLengthRecord]`

</details>

<details>
<summary><span style="color:#E95A84;">Přečíst nebo zapsat soubor</span></summary>

- Čtení ze souboru:

  ```c#
  var engine = new FileHelperEngine<Order>();
  Order[] result = engine.ReadFile("Input.txt");	
  ```

- Zápis do souboru:

  ```c#
  var engine = new FileHelperEngine<Order>();
  engine.WriteFile("Output.txt", result);
  ```

</details>
</details>

### Vlastní konvertor

1. Vytvořit třídu a rozšířit ji o třídu `ConverterBase`.
2. Přepsat metody `StringToField` a `FieldToString.`

- Příklad:

  <details>
  <summary><span style="color:#1E90FF;">Definice</span></summary>
  
  ```c#
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
  
  <details>
  <summary><span style="color:#1E90FF;">Použití</span></summary>
  
  ```c#
  [DelimitedRecord(",")]
  public class Order
  {
      [FieldConverter(typeof(MyCustomConverter))]
      public int OrderID;
      // ...
  }
  ```
  
  </details>