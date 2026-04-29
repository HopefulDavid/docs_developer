# Unity – ScriptableObject & Tipy

> Praktické rady pro použití ScriptableObject v Unity, jejich výhody, omezení a moderní patterny.

---

## Co je ScriptableObject?

<details>
<summary>Základní principy</summary>

- **ScriptableObject** je speciální typ assetu v Unity.
- Umožňuje ukládat data mimo scénu – přímo v projektu.
- Vhodné pro konfigurace, globální data, nastavení, inventáře, atd.

</details>

---

## Vytvoření ScriptableObject

<details>
<summary>Jak vytvořit ScriptableObject?</summary>

1. Vytvoř novou C# třídu dědící ze `ScriptableObject`.
2. Přidej atribut `[CreateAssetMenu]` pro snadné vytvoření assetu.
3. Vytvoř asset přes **Assets > Create** v Unity.

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "NewConfig", menuName = "Config/Example")]
public class ExampleConfig : ScriptableObject
{
    public int value;
    public string description;
}
```

</details>

---

## Ukládání & Obnovení dat

<details>
<summary>Omezení ScriptableObject</summary>

- Data v ScriptableObject se **neukládají** mezi spuštěními hry.
- Po zavření a opětovném otevření hry se obnoví na výchozí hodnoty assetu.
- Pro trvalé ukládání použij **PlayerPrefs**, soubory nebo databázi.

> [!IMPORTANT]
> ScriptableObjects slouží hlavně pro **konfiguraci** a **sdílení dat** v rámci projektu, ne pro runtime ukládání.

</details>

---

## Singleton pattern se ScriptableObject

<details>
<summary>Jak na singleton ScriptableObject?</summary>

- Umožňuje globální přístup k datům bez nutnosti vytvářet instanci ve scéně.
- Vhodné pro nastavení, globální konfigurace, eventy.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O7ziNEzanWI?si=oymyfqzq4v0hDHn6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

</details>