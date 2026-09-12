---
description: "Smlouvy rozhraní a rozdíl mezi mělkou a hlubokou kopií objektu."
---

# C# – rozhraní a kopírování objektů

Rozhraní popisuje kontrakt implementace; význam jednotlivých metod musí být jednoznačný pro volajícího.

## Mělká a hluboká kopie

Přiřazení proměnné referenčního typu kopíruje referenci na stejný objekt.

Mělká kopie vytvoří nový vnější objekt, ale jeho referenční pole stále odkazují na původní vnořené objekty.

Metoda `MemberwiseClone` dělá mělkou kopii; rozhraní `ICloneable` neurčuje, zda má `Clone` kopírovat mělce, nebo hluboce. [MemberwiseClone](https://learn.microsoft.com/en-us/dotnet/api/system.object.memberwiseclone), [ICloneable](https://learn.microsoft.com/en-us/dotnet/api/system.icloneable)

## Jednoznačný kontrakt kopie

Následující příklad kopíruje seznam značek profilu, aby jeho úprava neovlivnila originál.

Řetězce lze sdílet, protože jsou neměnné.

```csharp
var original = new Profile { Name = "Jana", Tags = ["editor"] };
var copy = original.Copy();
copy.Tags.Add("reviewer");
Console.WriteLine($"{original.Tags.Count}, {copy.Tags.Count}"); // 1, 2

/// <summary>Poskytuje kopii s nezávislými měnitelnými daty.</summary>
public interface ICopyable<T>
{
    /// <summary>Vytvoří kopii podle kontraktu konkrétního typu.</summary>
    T Copy();
}

/// <summary>Jméno a měnitelné značky jednoho profilu.</summary>
public sealed class Profile : ICopyable<Profile>
{
    /// <summary>Zobrazované jméno.</summary>
    public string Name { get; set; } = "";

    /// <summary>Značky přiřazené profilu.</summary>
    public List<string> Tags { get; set; } = [];

    /// <summary>Vrátí nový profil s vlastní kopií seznamu značek.</summary>
    public Profile Copy() => new() { Name = Name, Tags = [.. Tags] };
}
```

Pokud později přidáš měnitelné objekty do seznamu, musíš rozhodnout a otestovat i jejich kopírování.

## Serializace není univerzální klonování

Pro kopírování nepoužívej `BinaryFormatter`; v .NET 9 a novějším jeho vestavěná implementace vyhazuje výjimku a formát má bezpečnostní problémy.

Zvol explicitní kopii nebo serializaci s jasným datovým kontraktem, pokud skutečně potřebuješ přenos či uložení dat. [Migrace z BinaryFormatter](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-migration-guide/)
