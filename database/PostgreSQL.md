# PostgreSQL – Průvodce a tipy

> Přehled základních pojmů, instalace, příkazů a doporučení pro práci s PostgreSQL.

![PostgreSQL](../images/a32bfd31-f086-44eb-be6f-b8fbb993dec2.png)

## Co je PostgreSQL?

- **Objektově-relační databázový systém** s otevřeným zdrojovým kódem.
- Jeden z nejrobustnějších SQL systémů dostupných zdarma.
- Podporuje procedurální jazyky: `PL/pgSQL`, `PL/Python`, `PL/Perl`, `PL/Java` a další.

> [!NOTE]
> `PL` znamená „Procedural Language" – umožňuje psaní funkcí a procedur přímo v databázi.

## Uživatelské rozhraní

Doporučený klient je **pgAdmin 4** – instaluje se jako součást PostgreSQL:

![pgAdmin – otevření aplikace](../images/t0m7kk76Jm.png)

## Instalace PostgreSQL

<details>
<summary>Kompletní průvodce instalací krok za krokem</summary>

**1. Výběr verze a stažení**

Stáhni instalátor z [enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads):

![Výběr verze PostgreSQL](../images/postgreSQL_Install.png)

**2. Spuštění instalace**

![Spuštění instalace](../images/postgreSQL_Install_2.png)

**3. Výběr složky instalace** (doporučeno ponechat výchozí):

![Složka pro instalaci](../images/postgreSQL_Install_3.png)

**4. Výběr komponent**

![Výběr komponent](../images/wqiRRNNKOT.png)

> [!NOTE]
> Doporučeno nainstalovat `pgAdmin 4` (grafické rozhraní) a `Command Line Tools`.

**5. Složka pro data** (doporučeno ponechat výchozí):

![Složka pro data](../images/postgreSQL_Install_4.png)

**6. Nastavení hesla:**

![Nastavení hesla](../images/postgreSQL_Install_5.png)

**7. Port serveru** (výchozí: `5432`):

![Nastavení portu](../images/postgreSQL_Install_6.png)

**8. Geografická lokace:**

![Geografická lokace](../images/postgreSQL_Install_7.png)

**9. Kontrola a dokončení:**

![Kontrola před instalací](../images/postgreSQL_Install_8.png)

</details>

## Připojení z příkazového řádku

<details>
<summary>Test naslouchání a ověření připojení</summary>

Otevři konzoli PostgreSQL:

![Otevření konzole](../images/zGRvsmYA6A.png)

P�ipojení k serveru:

![Připojení k PostgreSQL](../images/t0Vjh1fqzy.png)

Výsledek:

![Úspěšné připojení](../images/oY0QJRKkL1.png)

Ověření verze:

```sql
SELECT version();
```

> [!WARNING]
> Pokud konzole nezobrazuje anglický text, uprav:
> - `C:\Program Files\PostgreSQL\16\data\postgresql.conf`
>
>![Konfigurace postgresql.conf](../images/G0Loa7KgVA.png)
>
> - Systémové proměnné prostředí
>
>![Proměnné prostředí](../images/0qjIRo5xxb.png)
>
> Poté restartuj konzoli.

</details>
