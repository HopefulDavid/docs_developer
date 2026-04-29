# .NET – Implicitní & Explicitní operátory

> Praktické rady pro převody typů v .NET, rozdíly mezi implicitními a explicitními operátory, ukázky použití.

---

## Co jsou implicitní a explicitní operátory?

<details>
<summary>Základní principy převodů</summary>

- **Implicitní operátor**: Automatický převod, není potřeba psát `cast`.
- **Explicitní operátor**: Vyžaduje použití `cast` – převod je nutné napsat ručně.

> [!NOTE]
> Implicitní je pohodlnější, ale explicitní je bezpečnější pro složité nebo nejednoznačné převody.

</details>

---

## Implicitní operátor

<details>
<summary>Automatický převod</summary>

- Převod mezi typy probíhá automaticky, bez nutnosti psát `cast`.

**Příklad:**
```csharp
public struct Money
{
    private double _value;
    public Money(double value) { _value = value; }

    public static implicit operator double(Money money)
    {
        return money._value;
    }
}

// Použití
Money m = new Money(10.50);
double d = m * 2;  // Automaticky převede Money na double
```
</details>

---

## Explicitní operátor

<details>
<summary>Převod s použitím castu</summary>

- Převod je nutné napsat ručně pomocí `(typ)`.

**Příklad:**
```csharp
public struct Temperature
{
    private double _value;
    public Temperature(double value) { _value = value; }

    public static explicit operator double(Temperature temperature)
    {
        return temperature._value;
    }
}

// Použití
Temperature t = new Temperature(70.0);
double d = (double)t + 32.0;  // Explicitně převedete Temperature na double
```
</details>