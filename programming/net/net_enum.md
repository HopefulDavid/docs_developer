# .NET – Enum (Výčtové typy)

> Praktické rady pro použití výčtových typů v .NET, volbu velikosti a tipy pro efektivní správu hodnot.

---

## Co je Enum?

<details>
<summary>Základní principy Enum</summary>

- **Enum** je výčtový typ, který umožňuje definovat vlastní datový typ s pevně danými hodnotami.
- Zvyšuje čitelnost kódu a zabraňuje chybám při práci s hodnotami.

</details>

---

## Typy Enum podle velikosti

<details>
<summary>Velikost a rozsah Enum</summary>

| Deklarace             | Popis                                                                 | Velikost |
|-----------------------|-----------------------------------------------------------------------|----------|
| `enum A {}`           | Velký batoh, může držet hodně čísel (defaultně `int`)                | 4 bajty  |
| `enum A : byte {}`    | Malý batoh, jen pár čísel (0–255), vhodné pro úsporu místa           | 1 bajt   |

> [!TIP]
> Pokud potřebujete ušetřit místo a máte jen pár hodnot, použijte `byte`.
> Pro větší rozsah nebo záporná čísla použijte `int`.

</details>

---

## ‍ Příklad použití Enum

<details>
<summary>Ukázka deklarace a použití</summary>

```csharp
public enum Day
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

// Použití
Day today = Day.Monday;
Console.WriteLine(today); // Monday
```

**Enum s vlastní velikostí:**
```csharp
public enum Status : byte
{
    Ok = 1,
    Error = 2,
    Unknown = 3
}
```
</details>