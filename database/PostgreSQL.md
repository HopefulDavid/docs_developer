# PostgreSQL – Průvodce a tipy

> Přehled základních pojmů, instalace, příkazů a doporučení pro práci s PostgreSQL.

---

<img src="../images/a32bfd31-f086-44eb-be6f-b8fbb993dec2.png" alt="" style="width: 60%; display: block; border-radius: 8px;">

## Co je PostgreSQL?

- **Objektově-relační databázový systém** s otevřeným zdrojovým kódem.
- Jeden z nejrobustnějších SQL systémů dostupných zdarma.
- Podporuje procedurální jazyky: `PL/pgSQL`, `PL/Python`, `PL/Perl`, `PL/Java` a další.

> [!NOTE]
> `PL` znamená „Procedural Language" – umožňuje psaní funkcí a procedur přímo v databázi.

---

## Uživatelské rozhraní

Doporučený klient je **pgAdmin 4** – instaluje se jako součást PostgreSQL:

<img src="../images/t0m7kk76Jm.png" alt="pgAdmin – otevření aplikace"/>

---

## Instalace PostgreSQL

<details>
<summary>Kompletní průvodce instalací krok za krokem</summary>

**1. Výběr verze a stažení**

Stáhni instalátor z [enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads):

<img src="../images/postgreSQL_Install.png" alt="Výběr verze PostgreSQL"/>

**2. Spuštění instalace**

<img src="../images/postgreSQL_Install_2.png" alt="Spuštění instalace"/>

**3. Výběr složky instalace** (doporučeno ponechat výchozí):

<img src="../images/postgreSQL_Install_3.png" alt="Složka pro instalaci"/>

**4. Výběr komponent**

<img src="../images/wqiRRNNKOT.png" alt="Výběr komponent"/>

> [!NOTE]
> Doporučeno nainstalovat `pgAdmin 4` (grafické rozhraní) a `Command Line Tools`.

**5. Složka pro data** (doporučeno ponechat výchozí):

<img src="../images/postgreSQL_Install_4.png" alt="Složka pro data"/>

**6. Nastavení hesla:**

<img src="../images/postgreSQL_Install_5.png" alt="Nastavení hesla"/>

**7. Port serveru** (výchozí: `5432`):

<img src="../images/postgreSQL_Install_6.png" alt="Nastavení portu"/>

**8. Geografická lokace:**

<img src="../images/postgreSQL_Install_7.png" alt="Geografická lokace"/>

**9. Kontrola a dokončení:**

<img src="../images/postgreSQL_Install_8.png" alt="Kontrola před instalací"/>

</details>

---

## Připojení z příkazového řádku

<details>
<summary>Test naslouchání a ověření připojení</summary>

Otevři konzoli PostgreSQL:

<img src="../images/zGRvsmYA6A.png" alt="Otevření konzole"/>

P�ipojení k serveru:

<img src="../images/t0Vjh1fqzy.png" alt="Připojení k PostgreSQL"/>

Výsledek:

<img src="../images/oY0QJRKkL1.png" alt="Úspěšné připojení"/>

Ověření verze:

```sql
SELECT version();
```

> [!WARNING]
> Pokud konzole nezobrazuje anglický text, uprav:
> - `C:\Program Files\PostgreSQL\16\data\postgresql.conf`
>
>   <img src="../images/G0Loa7KgVA.png" alt="Konfigurace postgresql.conf"/>
>
> - Systémové proměnné prostředí
>
>   <img src="../images/0qjIRo5xxb.png" alt="Proměnné prostředí"/>
>
> Poté restartuj konzoli.

</details>
