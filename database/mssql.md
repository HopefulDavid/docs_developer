---
description: "SQL dotazy, vazby tabulek a diagnostika databáze."
---

# SQL Server – dotazy a diagnostika

Dotazy spouštěj v kontextu zamýšlené databáze.

Přístup k metadatům a diagnostickým pohledům závisí na oprávnění účtu.

## Získání informací o serveru a databázi

```sql
SELECT
    SERVERPROPERTY('ServerName') AS ServerName,
    SERVERPROPERTY('Edition') AS Edition,
    SERVERPROPERTY('ProductVersion') AS ProductVersion,
    DB_NAME() AS DatabaseName,
    CONNECTIONPROPERTY('net_transport') AS Transport,
    CONNECTIONPROPERTY('local_tcp_port') AS LocalTcpPort;
```

Port může být `NULL`, pokud spojení nepoužívá TCP. [Connection properties](https://learn.microsoft.com/en-us/sql/t-sql/functions/connectionproperty-transact-sql)

### Sloupce tabulky

Nahraď `dbo.Users` skutečným schématem a tabulkou:

```sql
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = N'dbo' AND TABLE_NAME = N'Users'
ORDER BY ORDINAL_POSITION;
```

### Velikost tabulek

Pro běžné diskové tabulky lze sečíst alokace všech indexů a počet řádků pouze z heapu nebo clustered indexu:

```sql
SELECT
    SCHEMA_NAME(t.schema_id) AS SchemaName,
    t.name AS TableName,
    SUM(CASE WHEN p.index_id IN (0, 1) THEN p.row_count ELSE 0 END) AS ApproxRows,
    CAST(SUM(p.reserved_page_count) * 8.0 / 1024 AS decimal(18, 2)) AS ReservedMB,
    CAST(SUM(p.used_page_count) * 8.0 / 1024 AS decimal(18, 2)) AS UsedMB
FROM sys.tables AS t
JOIN sys.dm_db_partition_stats AS p ON p.object_id = t.object_id
WHERE t.is_ms_shipped = 0
GROUP BY t.schema_id, t.name
ORDER BY ReservedMB DESC;
```

Počet řádků je odhad z metadat.

Paměťově optimalizované tabulky vyžadují vlastní statistiky.

V SQL Serveru 2022 a novějším tento DMV vyžaduje `VIEW DATABASE PERFORMANCE STATE` a `VIEW SECURITY DEFINITION`.

Starší verze mají odlišné požadavky. [Statistiky oddílů](https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-db-partition-stats-transact-sql?view=sql-server-ver17)

Pro jednu tabulku použij také `EXEC sys.sp_spaceused N'dbo.Users';`. [Sp_spaceused](https://learn.microsoft.com/sql/relational-databases/system-stored-procedures/sp-spaceused-transact-sql?view=sql-server-ver17)

### Využití indexů

```sql
SELECT
    OBJECT_SCHEMA_NAME(s.object_id) AS SchemaName,
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks + s.user_scans + s.user_lookups AS [Reads],
    s.user_updates AS [Updates]
FROM sys.dm_db_index_usage_stats AS s
JOIN sys.indexes AS i
    ON i.object_id = s.object_id AND i.index_id = s.index_id
WHERE s.database_id = DB_ID()
  AND OBJECTPROPERTY(s.object_id, 'IsUserTable') = 1
ORDER BY [Reads] DESC, [Updates] ASC;
```

Statistiky se resetují například při restartu enginu.

Chybějící řádek není důkazem, že index nikdy není potřeba.

V SQL Serveru 2022 a novějším je potřeba `VIEW SERVER PERFORMANCE STATE`. [Význam čítačů a oprávnění](https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-db-index-usage-stats-transact-sql?view=sql-server-ver17)

## Hledání v databázi

### Najít tabulku podle sloupce

```sql
SELECT SCHEMA_NAME(t.schema_id) AS SchemaName,
       t.name AS TableName, c.name AS ColumnName
FROM sys.tables AS t
JOIN sys.columns AS c ON c.object_id = t.object_id
WHERE c.name LIKE N'%Name%'
ORDER BY SchemaName, TableName, ColumnName;
```

### Hledat hodnotu v textových a číselných sloupcích

Pro běžnou práci použij konkrétní tabulku, sloupec a parametr.

Následující diagnostika prohledává běžné textové a číselné typy jako text a vrací nejvýše 20 nálezů na sloupec.

Na velké databázi může být nákladná, proto ji nejprve použij na vývojové kopii.

<details>
<summary>Úplný skript pro vývojovou databázi</summary>

```sql
DECLARE @Search nvarchar(100) = N'hledaná hodnota';
DECLARE @Schema sysname, @Table sysname, @Column sysname;
DECLARE @Sql nvarchar(max), @Source nvarchar(776);

IF LEN(@Search) = 0
    THROW 50000, N'Hledaná hodnota nesmí být prázdná.', 1;

CREATE TABLE #DocSearchResults (
    SourceColumn nvarchar(776),
    FoundValue nvarchar(max)
);

DECLARE columnsToSearch CURSOR LOCAL FAST_FORWARD FOR
SELECT SCHEMA_NAME(t.schema_id), t.name, c.name
FROM sys.tables AS t
JOIN sys.columns AS c ON c.object_id = t.object_id
WHERE t.is_ms_shipped = 0
  AND c.system_type_id IN (48, 52, 56, 127, 59, 62, 106, 108, 60, 122, 167, 175, 231, 239)
ORDER BY t.schema_id, t.name, c.column_id;

OPEN columnsToSearch;
FETCH NEXT FROM columnsToSearch INTO @Schema, @Table, @Column;
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @Source = QUOTENAME(@Schema) + N'.' + QUOTENAME(@Table) + N'.' + QUOTENAME(@Column);
    SET @Sql = N'INSERT INTO #DocSearchResults (SourceColumn, FoundValue)
        SELECT TOP (20) @Source, CONVERT(nvarchar(max), ' + QUOTENAME(@Column) + N')
        FROM ' + QUOTENAME(@Schema) + N'.' + QUOTENAME(@Table) + N'
        WHERE CHARINDEX(@Search, CONVERT(nvarchar(max), ' + QUOTENAME(@Column) + N')) > 0;';
    EXEC sys.sp_executesql @Sql,
        N'@Search nvarchar(100), @Source nvarchar(776)',
        @Search = @Search, @Source = @Source;
    FETCH NEXT FROM columnsToSearch INTO @Schema, @Table, @Column;
END;
CLOSE columnsToSearch;
DEALLOCATE columnsToSearch;

SELECT SourceColumn, FoundValue FROM #DocSearchResults ORDER BY SourceColumn;
DROP TABLE #DocSearchResults;
```

Skript vyžaduje právo číst prohledávané tabulky.

Identifikátory se ohraničují pomocí `QUOTENAME`, hledaná hodnota zůstává parametrem `sp_executesql`. [QUOTENAME](https://learn.microsoft.com/en-us/sql/t-sql/functions/quotename-transact-sql?view=sql-server-ver17), [Sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

</details>

### Nejstarší, nejnovější a nejčastější hodnoty

Příklady předpokládají tabulku `dbo.Orders` se sloupci `CreatedAt` a `Status`:

```sql
SELECT MIN(CreatedAt) AS Oldest, MAX(CreatedAt) AS Newest FROM dbo.Orders;

SELECT Status, COUNT_BIG(*) AS Occurrences
FROM dbo.Orders
GROUP BY Status
ORDER BY Occurrences DESC;
```

## Výkon a statistiky

Před dotazem zapni měření a po něm jej vypni:

```sql
SET STATISTICS IO ON;
SET STATISTICS TIME ON;

SELECT Id, Name FROM dbo.Users WHERE Id = 1;

SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;
```

Výsledky čti spolu se skutečným plánem dotazu a reprezentativními daty. [STATISTICS IO](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-statistics-io-transact-sql)

## Konfigurace vzdáleného přístupu

Pro klientské TCP připojení ve Windows zkontroluj **SQL Server Configuration Manager → SQL Server Network Configuration → Protocols for danou instanci → TCP/IP**.

Změna protokolu vyžaduje restart služby.

Firewall musí povolit skutečně nastavený port pouze požadovaným klientům. [Síťové protokoly serveru](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol?view=sql-server-ver17)

Volba `sp_configure 'remote access'` řídí historické vzdálené spouštění uložených procedur mezi servery a nepotvrzuje dostupnost klientského TCP spojení. [Význam remote access](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-remote-access-server-configuration-option)

## Spojování tabulek

| Operace | Výsledek |
|---|---|
| `INNER JOIN` | Kombinace řádků splňující podmínku spojení |
| `LEFT JOIN` | Navíc všechny řádky levé strany. Chybějící pravé hodnoty jsou NULL |
| `RIGHT JOIN` | Navíc všechny řádky pravé strany. Chybějící levé hodnoty jsou NULL |
| `FULL OUTER JOIN` | Všechny odpovídající i nespárované řádky obou stran |
| `CROSS APPLY` | Pravý tabulkový výraz vyhodnocený pro řádky vlevo. Prázdný výsledek levý řádek vyřadí |

[Microsoft: JOIN a APPLY](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=sql-server-ver17).

## Spojování hodnot ze sloupce do řetězce

Pro SQL Server 2017 a novější s úrovní kompatibility databáze alespoň 110 kvůli řazení `WITHIN GROUP`:

```sql
SELECT Status,
       STRING_AGG(CONVERT(nvarchar(max), Id), N';')
           WITHIN GROUP (ORDER BY Id) AS OrderIds
FROM dbo.Orders
GROUP BY Status;
```

Převod na `nvarchar(max)` před agregací omezuje riziko překročení délky výsledku.

`NULL` hodnoty se vynechávají. [STRING_AGG](https://learn.microsoft.com/en-us/sql/t-sql/functions/string-agg-transact-sql)
