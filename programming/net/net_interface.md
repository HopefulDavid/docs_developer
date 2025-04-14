Interface = rozhraní

<details>
<summary><span style="color:#1E90FF;">ICloneable</span></summary>

- Vytvoří kopii objektu

  <details>
  <summary><span style="color:#E95A84;">Mělká</span></summary>
  
  ```c#
  public object Clone ()
  {
      // Pro referenční typy se kopíruje reference (odkaz), nikoli objekt
      return this.MemberwiseClone(); 
  }
  ```
  
  </details>
  
  <details>
  <summary><span style="color:#E95A84;">Hluboká</span></summary>
  
  Kopírování referencí jako objekt
  
  > [!WARNING]
  > Může mít vliv na výkon
  
  - Automaticky:
  
       ```c#
      public static T DeepClone<T>(T obj)
      {
          using (var ms = new MemoryStream())
          {
              var formatter = new BinaryFormatter();
              formatter.Serialize(ms, obj);
              ms.Position = 0;
      
              return (T) formatter.Deserialize(ms);
          }
      }
       ```
  
    - Ručně:
  
       ```c#
       public class Record : ICloneable
        {
            // ... other properties ...
      
            public List<string> Tnr { get; set; }
            public List<string> Ean { get; set; }
            // ... other properties ...
      
            public object Clone()
            {
                return new Record
                {
                    // ... clone other properties ...
      
                    Tnr = this.Tnr != null ? new List<string>(this.Tnr) : null,
                    Ean = this.Ean != null ? new List<string>(this.Ean) : null,
                    // ... clone other properties ...
                };
            }
        }
       ```
  
    >   [!NOTE]
    >   Stejným způsob pro klonování vnořených objektů
  
  </details>
</details>