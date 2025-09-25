# 🧮 .NET – Enum (Výčtové typy)

> 🚀 Praktické rady pro použití výčtových typů v .NET, volbu velikosti a tipy pro efektivní správu hodnot.

---

## 🧩 Co je Enum?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy Enum</span></summary>

- **Enum** je výčtový typ, který umožňuje definovat vlastní datový typ s pevně danými hodnotami.
- Zvyšuje čitelnost kódu a zabraňuje chybám při práci s hodnotami.

![](../../images/net_enum_intro.png)

</details>

---

## 🗂️ Typy Enum podle velikosti

<details>
<summary><span style="color:#1E90FF;">📦 Velikost a rozsah Enum</span></summary>

| Deklarace             | Popis                                                                 | Velikost |
|-----------------------|-----------------------------------------------------------------------|----------|
| `enum A {}`           | Velký batoh, může držet hodně čísel (defaultně `int`)                | 4 bajty  |
| `enum A : byte {}`    | Malý batoh, jen pár čísel (0–255), vhodné pro úsporu místa           | 1 bajt   |

> [!TIP]
> Pokud potřebujete ušetřit místo a máte jen pár hodnot, použijte `byte`.  
> Pro větší rozsah nebo záporná čísla použijte `int`.

</details>

---

## 🧑‍💻 Příklad použití Enum

<details>
<summary><span style="color:#1E90FF;">📝 Ukázka deklarace a použití</span></summary>

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