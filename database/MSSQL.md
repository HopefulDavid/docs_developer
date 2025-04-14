## Microsof SQL

### Kód

#### Získat informace

<details>
<summary><span style="color:#1E90FF;">Informace ze Serveru</span></summary>

  ```sql
    SELECT 
        SERVERPROPERTY('MachineName') AS MachineName,
        SERVERPROPERTY('ServerName') AS ServerName,
        SERVERPROPERTY('InstanceName') AS InstanceName,
        SERVERPROPERTY('IsClustered') AS IsClustered,
        SERVERPROPERTY('Edition') AS Edition,
        SERVERPROPERTY('ProductVersion') AS ProductVersion,
        SERVERPROPERTY('ProductLevel') AS ProductLevel,
        SERVERPROPERTY('ComputerNamePhysicalNetBIOS') AS PhysicalMachineName,
        CONNECTIONPROPERTY('client_net_address') AS ClientIPAddress
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Informace z Tabulky</span></summary>

  ```sql
     DECLARE @tableName NVARCHAR(128) = N'place_table_name';
     
     SELECT 
         C.TABLE_SCHEMA as 'Namespace',
         C.TABLE_NAME as 'Název tabulky',
         C.COLUMN_NAME as 'Název sloupce', 
         C.DATA_TYPE as 'Typ dat', 
         C.IS_NULLABLE as 'Může být NULL ?', 
         T.TABLE_TYPE as 'Typ tabulky'
     FROM 
         INFORMATION_SCHEMA.COLUMNS C
     INNER JOIN
         INFORMATION_SCHEMA.TABLES T
     ON
         C.TABLE_NAME = T.TABLE_NAME AND C.TABLE_SCHEMA = T.TABLE_SCHEMA
     WHERE 
         C.TABLE_NAME = @tableName
     ORDER BY 
         C.ORDINAL_POSITION;
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Velikost Tabulek</span></summary>

  ```sql
      SELECT 
        t.NAME AS [Název tabulky],
        s.Name AS [Název schématu],
        p.rows AS [Počet řádků],
        CONVERT(NVARCHAR, CAST(SUM(a.total_pages) * 8 / 1024.0 / 1024.0 AS DECIMAL(10, 2))) 
            + ' GB (' + CONVERT(NVARCHAR, CAST((SUM(a.total_pages) * 8 / 1024.0) AS INT)) + ' MB)' AS [Celkový prostor],
        CONVERT(NVARCHAR, CAST(SUM(a.used_pages) * 8 / 1024.0 / 1024.0 AS DECIMAL(10, 2))) 
            + ' GB (' + CONVERT(NVARCHAR, CAST((SUM(a.used_pages) * 8 / 1024.0) AS INT)) + ' MB)' AS [Využitý prostor],
        CONVERT(NVARCHAR, CAST((SUM(a.total_pages) - SUM(a.used_pages)) * 8 / 1024.0 / 1024.0 AS DECIMAL(10, 2))) 
            + ' GB (' + CONVERT(NVARCHAR, CAST(((SUM(a.total_pages) - SUM(a.used_pages)) * 8 / 1024.0) AS INT)) + ' MB)' AS [Nevyužitý prostor]
    FROM 
        sys.tables t
    INNER JOIN      
        sys.indexes i ON t.OBJECT_ID = i.object_id
    INNER JOIN 
        sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id
    INNER JOIN 
        sys.allocation_units a ON p.partition_id = a.container_id
    LEFT OUTER JOIN 
        sys.schemas s ON t.schema_id = s.schema_id
    WHERE 
        t.NAME NOT LIKE 'dt%' 
        AND t.is_ms_shipped = 0
        AND i.OBJECT_ID > 255 
    GROUP BY 
        t.Name, s.Name, p.Rows
    ORDER BY 
        SUM(a.total_pages) * 8 / 1024.0 / 1024.0 DESC;
  ```

> [!NOTE]
> Zaokrouhle na dvě místa

</details>

<details>
<summary><span style="color:#1E90FF;">Informace o indexech na sloupcích</span></summary>

> [!TIP]
> Indexy jsou nejefektivnější, když jsou často čteny a málo aktualizovány

  ```sql
  SELECT 
      OBJECT_NAME(s.object_id) AS 'Table',
      i.name AS 'Index',
      user_seeks + user_scans + user_lookups AS 'Reads',
      user_updates AS 'Updates'
  FROM 
      sys.dm_db_index_usage_stats AS s 
  JOIN 
      sys.indexes AS i 
  ON 
      s.object_id = i.object_id 
  AND 
      i.index_id = s.index_id
  WHERE 
      OBJECTPROPERTY(s.object_id,'IsUserTable') = 1
  ORDER BY 
      'Reads' DESC, 'Updates' ASC
  ```

</details>

#### Hledat

<details>
<summary><span style="color:#1E90FF;">Sloupec a zjistit v jaké Tabulce se nachází</span></summary>

- Komplexní informace (včetně názvu schématu)

    ```sql
    SELECT t.name AS table_name,
    SCHEMA_NAME(schema_id) AS schema_name,
    c.name AS column_name
    FROM sys.tables AS t
    INNER JOIN sys.columns c ON t.OBJECT_ID = c.OBJECT_ID
    WHERE c.name LIKE '%ino_doklad%'
    ORDER BY schema_name, table_name;
    ```

- Základní informace (pouze názvy tabulek a sloupců)

    ```sql
    SELECT TABLE_NAME, COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE COLUMN_NAME LIKE '%place_column_name%'
    ```

</details>


<details>
<summary><span style="color:#1E90FF;">Datový typ Sloupce z Tabulky</span></summary>

  ```sql
  Vyhledat datový typ sloupce:
  SELECT DATA_TYPE 
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
       TABLE_NAME = 'place_table_name' 
  AND  COLUMN_NAME = 'place_column_name'
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Hodnoty ve všech textových a číselných sloupcích databáze</span></summary>

Prohledává textové i číselné hodnoty napříč všemi tabulkami a sloupci vybrané databáze.

Pokud zadáte číslo, použije přesné porovnání, a pokud zadáte text, použije vyhledávání pomocí `LIKE`

  ```sql
  DECLARE @SearchStr nvarchar(100) = 'Doplňte hledanou hodnotu zde!'
  CREATE TABLE #Results (ColumnName nvarchar(370), ColumnValue nvarchar(3630))

  SET NOCOUNT ON

  DECLARE @TableName nvarchar(256), @ColumnName nvarchar(128), @SearchStr2 nvarchar(110)
  SET  @TableName = ''

  -- Rozhodnutí, zda hledaný řetězec je číslo nebo text (pro dynamické SQL)
  IF ISNUMERIC(@SearchStr) = 1
      SET @SearchStr2 = @SearchStr
  ELSE
      SET @SearchStr2 = QUOTENAME('%' + @SearchStr + '%','''')

  -- Získání celkového počtu tabulek
  DECLARE @TotalTables int, @CompletedTables int
  SELECT @TotalTables = COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'
  SET @CompletedTables = 0

  WHILE @TableName IS NOT NULL
  BEGIN
      SET @ColumnName = ''
      SET @TableName = 
      (
          SELECT MIN(QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME))
          FROM    INFORMATION_SCHEMA.TABLES
          WHERE       TABLE_TYPE = 'BASE TABLE'
              AND QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) > @TableName
              AND OBJECTPROPERTY(
                      OBJECT_ID(
                          QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME)
                           ), 'IsMSShipped'
                             ) = 0
      )

      WHILE (@TableName IS NOT NULL) AND (@ColumnName IS NOT NULL)
      BEGIN
          SET @ColumnName =
          (
              SELECT MIN(QUOTENAME(COLUMN_NAME))
              FROM    INFORMATION_SCHEMA.COLUMNS
              WHERE       TABLE_SCHEMA    = PARSENAME(@TableName, 2)
                  AND TABLE_NAME  = PARSENAME(@TableName, 1)
                  -- Rozšíření pro textové i číselné datové typy
                  AND DATA_TYPE IN ('char', 'varchar', 'nchar', 'nvarchar', 'int', 'decimal', 'float', 'numeric', 'bigint', 'smallint')
                  AND QUOTENAME(COLUMN_NAME) > @ColumnName
          )

          IF @ColumnName IS NOT NULL
          BEGIN
              -- Dynamický SQL pro číselné a textové typy
              IF ISNUMERIC(@SearchStr) = 1
              BEGIN
                  INSERT INTO #Results
                  EXEC
                  (
                      'SELECT ''' + @TableName + '.' + @ColumnName + ''', CAST(' + @ColumnName + ' AS nvarchar(3630)) 
                      FROM ' + @TableName + ' (NOLOCK) ' +
                      ' WHERE ' + @ColumnName + ' = ' + @SearchStr2
                  )
              END
              ELSE
              BEGIN
                  INSERT INTO #Results
                  EXEC
                  (
                      'SELECT ''' + @TableName + '.' + @ColumnName + ''', LEFT(' + @ColumnName + ', 3630) 
                      FROM ' + @TableName + ' (NOLOCK) ' +
                      ' WHERE ' + @ColumnName + ' LIKE ' + @SearchStr2
                  )
              END
          END
      END

      -- Aktualizace počtu dokončených tabulek a výpis pokroku
      SET @CompletedTables = @CompletedTables + 1
      PRINT 'Dokončeno ' + CAST(@CompletedTables AS nvarchar) + ' z ' + CAST(@TotalTables AS nvarchar) + ' tabulek.'
  END

  SELECT ColumnName, ColumnValue FROM #Results
  DROP TABLE #Results
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Nejnovější a Nejstarší záznam</span></summary>

  ```sql
  SELECT MIN(date_column) as Oldest, MAX(date_column) as Newest FROM table_name;
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Nejčastěji se vyskytující hodnoty</span></summary>

  ```sql
  SELECT place_column_name, COUNT(*) 
  FROM place_table_name 
  GROUP BY place_column_name 
  ORDER BY COUNT(*) DESC;
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Port na kterém je spuštěn Server</span></summary>

  ```sql
    EXEC xp_readerrorlog 0, 1, N'Server is listening on';
  ```

</details>

#### Výkon

<details>
<summary><span style="color:#1E90FF;">Efektivita dotazů</span></summary>

- SQL Server Managment Studio

    1. V menu SSMS vyberte Query > Include Client Statistics.
    2. Spusťte svůj dotaz.

- JetBrains

    1. File -> Settings -> Database -> General
    2. Zaškrtnout: Show query statistics.

  ```sql
  SET STATISTICS TIME ON;
  SELECT * FROM place_table -- custom code to execute
  SET STATISTICS TIME OFF;
  ```

</details>

#### Konfigurace

<details>
<summary><span style="color:#1E90FF;">Vzdálený přístup</span></summary>

  ```sql
  EXEC sp_configure 'remote access';
  ```

> [!NOTE]
> `run_value = 1` znamená, že vzdálený přístup je povolen.
>
> Pokud je hodnota 0, povolte vzdálený přístup příkazem:
>
> ```sql
  > EXEC sp_configure 'remote access', 1;
  > RECONFIGURE;
  > ```

</details>

#### Spojování tabulek

<details>
<summary><span style="color:#1E90FF;">left join</span></summary>

`left join` 

Vrátí všechny řádky z první tabulky.

> [!NOTE]
> Pokud existuje odpovídající řádek v druhé tabulce, budou vráceny hodnoty z obou tabulek.
> 
> Pokud neexistuje odpovídající řádek v druhé tabulce, budou hodnoty z druhé tabulky `NULL`.

```sql
SELECT
  employees.name AS EmployeeName,
  departments.name AS DepartmentName
FROM employees LEFT JOIN departments ON employees.department_id = departments.id;
```

Tento dotaz vrátí všechny zaměstnance a odpovídající oddělení (pokud existuje a pokud ne, bude hodnota `DepartmentName` `NULL`).

</details>

<details>
<summary><span style="color:#1E90FF;">right join</span></summary>

`right join`

Vrátí všechny řádky z druhé tabulky

> [!NOTE]
> Pokud existuje odpovídající řádek v první tabulce, budou vráceny hodnoty z obou tabulek.
> 
> Pokud neexistuje odpovídající řádek v první tabulce, budou hodnoty z první tabulky `NULL`.

```sql
SELECT
  employees.name AS EmployeeName,
  departments.name AS DepartmentName
FROM
  employees
    RIGHT JOIN
  departments ON employees.department_id = departments.id;
```

Tento dotaz vrátí všechny oddělení a odpovídající zaměstnance (pokud existuje a pokud ne, bude hodnota `EmployeeName` `NULL`).

</details>

<details>
<summary><span style="color:#1E90FF;">full outter join</span></summary>

`full outter join`

Vrátí všechny řádky z obou tabulek.

> [!NOTE]
> Pokud dojde k shodě, budou vráceny hodnoty z obou tabulek.
> 
> Pokud nedojde k shodě, řádek nebude vrácen.

```sql
SELECT
  employees.name AS EmployeeName,
  departments.name AS DepartmentName
FROM employees 
FULL OUTER JOIN departments ON employees.department_id = departments.id;
```

Příkaz vrátí všechny zaměstnance a oddělení (pokud existují a pokud ne, budou hodnoty `NULL`).

</details>

<details>
<summary><span style="color:#1E90FF;">inner join</span></summary>

`inner join`

Vrátí pouze řádky, které mají odpovídající hodnoty v obou tabulkách.

>[!NOTE]
> Pokud dojde k shodě, budou vráceny hodnoty z obou tabulek.
>
> Pokud nedojde k shodě, řádek nebude vrácen.

```sql
SELECT
  employees.name [Employee Name],
  departments.name [Department Name]
FROM employees 
INNER JOIN departments ON employees.department_id = departments.id;
```

Tento dotaz vrátí pouze zaměstnance, kteří mají odpovídající oddělení.

</details>

<details>
<summary><span style="color:#1E90FF;">cross apply</span></summary>

`cross apply` je užitečný, když potřebujete provést poddotaz pro každý řádek z první tabulky, což nelze snadno dosáhnout pomocí INNER JOIN.

```sql
SELECT t1.column1, t2.column2
FROM table1 t1
  CROSS APPLY (
    SELECT column2
    FROM table2
    WHERE t1.column1 = table2.column2
) t2;
```

Tento dotaz vrátí všechny řádky z `table1` a pro každý řádek provede poddotaz, který vrátí odpovídající hodnotu z `table2`.
</details>