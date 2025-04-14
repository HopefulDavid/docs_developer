### Implicitní a Explicitní operátory

Rozdíly:
- Implicitní: 

  Automatický převod (žádný `cast` není potřeba)
- Explicitní: 

  Vyžaduje `cast` (musíte převod jasně napsat)

> [!NOTE]
> Implicitní je pohodlnější, ale explicitní je bezpečnější pro složité nebo nejednoznačné převody.

<details>
<summary><span style="color:#1E90FF;">Implicitní operátor</span></summary>

- Automatický převod mezi typy. (Není potřeba nic speciálně psát, převod se provede sám.)

    Příklad:
    
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

<details>
<summary><span style="color:#1E90FF;">Explicitní operátor</span></summary>

- Vyžaduje použití **castu**, například: `(double)`. (Převod není automatický, musíte ho sami zadat.)

    Příklad:
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