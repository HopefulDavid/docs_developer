## Enum

= `enum` je výčtový typ, který umožňuje definovat vlastní datový typ, který může nabývat jedné z předem definovaných hodnot.

<details>
<summary><span style="color:#1E90FF;">Typy</span></summary>

- `enum A {}`:
    - Velký batoh, který může držet hodně věcí (čísel).
    - Zabírá 4 bajty místa.

- `enum A : byte {}`:
    - Malý batoh, který může držet jen pár věcí (čísel od 0 do 255).
    - Zabírá jen 1 bajt místa.

>[!TIP]
> Pokud potřebujete ušetřit místo a máte jen pár čísel, můžete použít `byte`. 
> 
> Pokud však potřebujete hodně čísel nebo negativní čísla, budete muset použít `int`.
</details>