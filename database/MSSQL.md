# 🗂️ Microsoft SQL – Praktické dotazy & tipy

> 🚀 Moderní přehled SQL dotazů, postupů a tipů pro práci s Microsoft SQL Serverem.

---

## 🔎 Získání informací o serveru a databázi

<details>
<summary><span style="color:#1E90FF;">🖥️ Informace ze serveru</span></summary>

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
<summary><span style="color:#1E90FF;">📋 Informace z tabulky</span></summary>

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
<summary><span style="color:#1E90FF;">📏 Velikost tabulek</span></summary>

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
> Zaokrouhleno na dvě desetinná místa.
</details>

<details>
<summary><span style="color:#1E90FF;">🗂️ Informace o indexech na sloupcích</span></summary>

> [!TIP]  
> Indexy jsou nejefektivnější, když jsou často čteny a málo aktualizovány.

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

---

## 🔍 Hledání v databázi

<details>
<summary><span style="color:#1E90FF;">🔎 Najít tabulku podle sloupce</span></summary>

- **Komplexní informace:**

```sql
SELECT t.name AS table_name,
SCHEMA_NAME(schema_id) AS schema_name,
c.name AS column_name
FROM sys.tables AS t
INNER JOIN sys.columns c ON t.OBJECT_ID = c.OBJECT_ID
WHERE c.name LIKE '%ino_doklad%'
ORDER BY schema_name, table_name;
```

- **Základní informace:**

```sql
SELECT TABLE_NAME, COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME LIKE '%place_column_name%'
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 Datový typ sloupce z tabulky</span></summary>

```sql
SELECT DATA_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS
WHERE 
     TABLE_NAME = 'place_table_name' 
AND  COLUMN_NAME = 'place_column_name'
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔍 Hledat hodnotu ve všech textových a číselných sloupcích</span></summary>

> Prohledává textové i číselné hodnoty napříč všemi tabulkami a sloupci vybrané databáze.

```sql
DECLARE @SearchStr nvarchar(100) = 'Doplňte hledanou hodnotu zde!'
CREATE TABLE #Results (ColumnName nvarchar(370), ColumnValue nvarchar(3630))
-- ... (zbytek skriptu viz původní soubor)
```
</details>

<details>
<summary><span style="color:#1E90FF;">⏳ Nejnovější a nejstarší záznam</span></summary>

```sql
SELECT MIN(date_column) as Oldest, MAX(date_column) as Newest FROM table_name;
```
</details>

<details>
<summary><span style="color:#1E90FF;">📊 Nejčastěji se vyskytující hodnoty</span></summary>

```sql
SELECT place_column_name, COUNT(*) 
FROM place_table_name 
GROUP BY place_column_name 
ORDER BY COUNT(*) DESC;
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔌 Port na kterém je spuštěn server</span></summary>

```sql
EXEC xp_readerrorlog 0, 1, N'Server is listening on';
```
</details>

---

## ⚡ Výkon a statistiky

<details>
<summary><span style="color:#1E90FF;">📈 Efektivita dotazů</span></summary>

- **SQL Server Management Studio:**
  1. Menu Query > Include Client Statistics
  2. Spusťte dotaz

- **JetBrains:**
  1. File -> Settings -> Database -> General
  2. Zaškrtnout: Show query statistics

```sql
SET STATISTICS TIME ON;
SELECT * FROM place_table -- custom code to execute
SET STATISTICS TIME OFF;
```
</details>

---

## ⚙️ Konfigurace

<details>
<summary><span style="color:#1E90FF;">🌐 Vzdálený přístup</span></summary>

```sql
EXEC sp_configure 'remote access';
```
> [!NOTE]  
> `run_value = 1` znamená, že vzdálený přístup je povolen.  
> Pokud je hodnota 0, povolte vzdálený přístup příkazem:
>
> ```sql
> EXEC sp_configure 'remote access', 1;
> RECONFIGURE;
> ```
</details>

---

## 🔗 Spojování tabulek

<details>
<summary><span style="color:#E95A84;">⬅️ LEFT JOIN</span></summary>
Vrátí všechny řádky z první tabulky, druhá tabulka může být `NULL`.
</details>

<details>
<summary><span style="color:#E95A84;">➡️ RIGHT JOIN</span></summary>
Vrátí všechny řádky z druhé tabulky, první tabulka může být `NULL`.
</details>

<details>
<summary><span style="color:#E95A84;">🔄 FULL OUTER JOIN</span></summary>
Vrátí všechny řádky z obou tabulek, neexistující hodnoty budou `NULL`.
</details>

<details>
<summary><span style="color:#E95A84;">🔗 INNER JOIN</span></summary>
Vrátí pouze řádky, které mají odpovídající hodnoty v obou tabulkách.
</details>

<details>
<summary><span style="color:#E95A84;">🔍 CROSS APPLY</span></summary>
Umožňuje poddotaz pro každý řádek z první tabulky.
</details>

---

## 🧵 Spojování hodnot ze sloupce do řetězce

<details>
<summary><span style="color:#1E90FF;">🔗 STRING_AGG</span></summary>

```sql
SELECT STRING_AGG(column_name, ';') AS concatenated_values
FROM table_name
GROUP BY grouping_column
```
> [!NOTE]  
> Spojí hodnoty do jednoho řetězce odděleného středníkem.
</details>