# .NET – Interface (Rozhraní)

> Praktické rady pro použití rozhraní v .NET, rozdíl mezi mělkým a hlubokým klonováním, ukázky implementace.

---

## ‍ Co je Interface?

<details>
<summary>Základní principy rozhraní</summary>

- **Interface** definuje smlouvu, kterou musí třída implementovat.
- Umožňuje polymorfismus a oddělení implementace od definice.

</details>

---

## ICloneable – Klonování objektů

<details>
<summary>Mělká kopie</summary>

- Kopíruje pouze odkazy na objekty, ne jejich obsah.

```csharp
public object Clone()
{
    // Pro referenční typy se kopíruje reference (odkaz), nikoli objekt
    return this.MemberwiseClone();
}
```
</details>

<details>
<summary>Hluboká kopie</summary>

- Kopíruje celý objekt včetně vnořených dat.
- Může mít vliv na výkon.

> [!WARNING]
> Hluboké klonování je náročnější na výkon, používej s rozmyslem.

**Automaticky (serializace):**
```csharp
public static T DeepClone<T>(T obj)
{
    using (var ms = new MemoryStream())
    {
        var formatter = new BinaryFormatter();
        formatter.Serialize(ms, obj);
        ms.Position = 0;
        return (T)formatter.Deserialize(ms);
    }
}
```

**Ručně (vlastní implementace):**
```csharp
public class Record : ICloneable
{
    // ... další vlastnosti ...

    public List<string> Tnr { get; set; }
    public List<string> Ean { get; set; }
    // ... další vlastnosti ...

    public object Clone()
    {
        return new Record
        {
            // ... klonování dalších vlastností ...
            Tnr = this.Tnr != null ? new List<string>(this.Tnr) : null,
            Ean = this.Ean != null ? new List<string>(this.Ean) : null,
            // ... klonování dalších vlastností ...
        };
    }
}
```

> [!NOTE]
> Stejný postup použij pro klonování vnořených objektů.

</details>