## PostgreSQL

- Podporuje programovací jazyky: `C`, `C++`, `Java`, `Perl`, `Python`, `Ruby`, `Tcl`, `Scheme`, `PHP`, `Swift`, `Go`, `JavaScript`, `TypeScript`, `R`, `Rust`, `Kotlin`, `Lua`, `Erlang`, `Elixir`, `Haskell`, `Scala`, `D`, `Julia`, `PL/pgSQL`, `SQL`, `PL/Python`, `PL/Perl`, `PL/Tcl`, `PL/Java`, `PL/R`, `PL/V8`

    > [!NOTE]
    > `PL` znamená "Procedural Language" (procedurální jazyk)
    >
    > Tyto jazyky se používají k psaní funkcí a spouštěcích procedur v rámci databáze PostgreSQL.
    >
    > Procedurální jazyky umožňují provádět složitější logiku a operace přímo v databázi.

- PostgreSQL podporuje v podstatě všechny funkce, které podporují jiné systémy pro správu databází.

<details>
<summary><span style="color:#1E90FF;"> Uživatelské rozhraní</span></summary>

Otevřete aplikaci:

<img src="../images/t0m7kk76Jm.png"/>

</details>

### Instalace

<details>
<summary><span style="color:#1E90FF;">Výběr verze produktu</span></summary>

<a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads"><img src="../images/postgreSQL_Install.png"></a>

</details>

<details>
<summary><span style="color:#1E90FF;">Spustit instalaci</span></summary>

Po dokončení stahování dvakrát klikněte na stažený soubor a spusťte instalaci:

<img src="../images/postgreSQL_Install_2.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Složka pro instalaci</span></summary>

Můžete zadat umístění PostgreSQL, vybereme prozatím výchozí volbu:

<img src="../images/postgreSQL_Install_3.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Výběr komponent</span></summary>

<img src="../images/wqiRRNNKOT.png"/>

> [!NOTE]
> Chcete-li používat PostgreSQL, budete muset nainstalovat PostgreSQL Server.
>
> Doporučuji `pgAdmin 4`, který poskytuje uživatelské rozhraní a `Comand Line Tools` pro příkazový řádek.

</details>

<details>
<summary><span style="color:#1E90FF;">Složka pro uložení dat databáze</span></summary>

Vyberte kam uložit data databáze, použijeme výchozí volbu:

<img src="../images/postgreSQL_Install_4.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Nastavit heslo</span></summary>

Pro přístup do databáze budete muset zvolit heslo.

<img src="../images/postgreSQL_Install_5.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Port k naslouchání</span></summary>

Můžete nastavit port, na kterém má server naslouchat, použijeme výchozí volbu:

<img src="../images/postgreSQL_Install_6.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Geografické umístění serveru</span></summary>

Vyberte geografické umístění databázového serveru:

<img src="../images/postgreSQL_Install_7.png"/>

</details>

<details>
<summary><span style="color:#1E90FF;">Kontrola před provedením</span></summary>

<img src="../images/postgreSQL_Install_8.png"/>

Následně stačí dokončit instalaci

</details>

### Příkazový řádek

<details>
<summary><span style="color:#1E90FF;"> Otestovat zda PostgreSQL naslouchá</span></summary>

Otevřít:

<img src="../images/zGRvsmYA6A.png"/>

Připojení:

<img src="../images/t0Vjh1fqzy.png"/>


Nyní byste měli dostat výsledek podobný níže:

<img src="../images/oY0QJRKkL1.png"/>

> [!WARNING]
> **Pokud nevidíte konzoli v angličtině**, musíte udělat tyto změny:
>
> - Nastavit v `C:\Program Files\PostgreSQL\16\data\postgresql.conf`
    >
    >    <img src="../images/G0Loa7KgVA.png"/>
>
> - Nastavit v proměnném prostředí
    >
    >    <img src="../images/0qjIRo5xxb.png"/>
>
> Nyní stačí vypnout a zapnout konzoli a změny by se měli projevit


Pro odzkoušení zda jsme se správně připojili stačí zavolat kód níže:

```sql
SELECT version();
```

</details>