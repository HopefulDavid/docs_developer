# 🗂️ .NET – Práce se soubory: Oddělovače & Escape sekvence

> 🚀 Praktické rady pro detekci oddělovače v souboru, práci s BOM a speciálními znaky v .NET.

---

## 🔎 Vyhledání oddělovače v souboru

<details>
<summary><span style="color:#1E90FF;">🧩 Algoritmus detekce oddělovače</span></summary>

- Prochází řádky souboru a počítá výskyt oddělovačů (`;`, `,`).
- Vybere nejčastější oddělovač, pokud je jednoznačný.
- Pokud není jednoznačný (jiný oddělovač se vyskytuje alespoň v 70% případů), vyhodí chybu.

**Příklad kódu:**
```csharp
public static StreamReader FindDelimiter(StreamReader reader, out char delimiter, int? linesToRead = null)
{
    const char semicolon = ';';
    const char comma = ',';

    Dictionary<char, int> delimiters = new Dictionary<char, int>
    {
        { semicolon, 0 },
        { comma, 0 },
    };

    string line;
    int linesRead = 0;
    while ((line = reader.ReadLine()) != null && (!linesToRead.HasValue || linesRead < linesToRead.Value))
    {
        foreach (char c in line)
        {
            switch (c)
            {
                case semicolon: delimiters[semicolon]++; break;
                case comma: delimiters[comma]++; break;
            }
        }
        linesRead++;
    }

    delimiters = delimiters.Where(i => i.Value != 0).ToDictionary(i => i.Key, i => i.Value);

    if (delimiters.Count == 0)
        throw new Exception("Nepodařilo se dohledat jakýkoli oddělovač.");

    var highest = delimiters.Aggregate((item1, item2) => item1.Value > item2.Value ? item1 : item2);

    const int failPercentage = 70;
    if ((from val in delimiters
         where val.Key != highest.Key
         select new decimal(val.Value) / new decimal(highest.Value) * 100).Any(diff => diff >= failPercentage))
        throw new Exception("Typ oddělovače se nepodařilo jednoznačně identifikovat.");

    delimiter = highest.Key;

    reader.DiscardBufferedData();
    reader.BaseStream.Seek(0, System.IO.SeekOrigin.Begin);
    return reader;
}
```
</details>

---

## 🏷️ Escape sekvence v souborech

<details>
<summary><span style="color:#1E90FF;">🔍 Nejčastější speciální znaky</span></summary>

| Sekvence   | Název                    | Popis                                                                 |
|------------|--------------------------|-----------------------------------------------------------------------|
| `\uFEFF`   | Byte Order Mark (BOM)    | Určuje pořadí bajtů, může způsobit problémy při čtení souborů.        |
| `\u0000`   | Null znak                | Označuje konec řetězce, může komplikovat parsování dat.               |

> [!WARNING]
> BOM i null znak mohou způsobit potíže s některými knihovnami a nástroji.  
> Doporučuje se je odstraňovat nebo správně ošetřit při zpracování dat.

</details>