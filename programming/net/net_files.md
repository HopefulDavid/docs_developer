## Vyhledat oddělovač

```c#
public static StreamReader FindDelimiter(StreamReader reader, out char delimiter, int? linesToRead = null)
{
    const char semicolon = ';';
    const char comma = ',';

    Dictionary<char, int> delimiters = new Dictionary<char, int>
    {
        { semicolon, default(int) },
        { comma, default(int) },
    };

    string line;
    int linesRead = 0;
    while ((line = reader.ReadLine()) != null && (!linesToRead.HasValue || linesRead < linesToRead.Value))
    {
        foreach (char c in line)
        {
            switch (c)
            {
                case semicolon:
                    delimiters[semicolon]++;
                    break;

                case comma:
                    delimiters[comma]++;
                    break;
            }
        }

        linesRead++;
    }

    delimiters = delimiters.Where(i => i.Value != 0).ToDictionary(i => i.Key, i => i.Value);

    if (delimiters.Count == 0)
        throw new Exception("Nepodařilo se dohledat jakýkoli oddělovač.");

    var highest = delimiters.Aggregate((item1, item2) => item1.Value > item2.Value ? item1 : item2);

	// Kontrola, zda existuje jiný oddělovač, který se vyskytuje alespoň v 70% případů jako nejčastější oddělovač
    const int failPercentage = 70;
    if ((from val in delimiters
         where val.Key != highest.Key
         select new decimal(val.Value) / new decimal(highest.Value) * 100).Any(diff => diff >= failPercentage))
        throw new Exception("Typ oddělovače se nepodařilo jednoznačne identifikovat.");

    delimiter = highest.Key;

    reader.DiscardBufferedData();
    reader.BaseStream.Seek(0, System.IO.SeekOrigin.Begin);
    return reader;
}
```

## Escape sekvence

- `\uFEFF` 
 
    = **Byte Order Mark (BOM)**. 

    BOM nám říká, jak číst data v souboru - od začátku nebo od konce. 
	
    > [!WARNING]
    > Může způsobit problémy s některými nástroji a knihovnami, které jej neočekávají.

- `\u0000` 

  = **null znak**. 

  Null znak je speciální znak, který se často používá k označení konce řetězce v některých programovacích jazycích a systémech. 

  > [!WARNING]
  > Je obvykle nepotřebný a může způsobit problémy při parsování nebo zpracování dat.