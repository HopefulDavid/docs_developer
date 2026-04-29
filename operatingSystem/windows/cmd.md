# Windows CMD & optimalizace – Praktický průvodce & tipy

> Moderní přehled práce s příkazovým řádkem, dávkovými skripty a optimalizací disků ve Windows.

---

<img src="./images/ad71ff83-1ef8-45b0-9e21-2e05c0075935.png" alt="" style="width: 20%; display: block; border-radius: 8px;">

## Příkazový řádek & dávkové skripty

- **Batch skript** má příponu `.bat` nebo `.cmd`.
- Umožňuje automatizovat úlohy ve Windows.

---

## Spouštění SQL skriptů ze složky

<details>
<summary>Hromadné spuštění všech SQL skriptů</summary>

```cmd
for %%G in (*.sql) do sqlcmd /S serverTest /d CT46 -U userName -P password123 -i"%%G"
pause
```

> [!NOTE]
> Smyčka `for %%G in (*.sql)` projde všechny `.sql` soubory v adresáři a spustí je pomocí `sqlcmd` na zadaném SQL serveru.
> `pause` umožní zobrazit výsledek před zavřením okna.

</details>

---

## Optimalizace disků ve Windows

<details>
<summary>Automatická optimalizace SSD & HDD</summary>

> [!NOTE]
> Windows 10+ automaticky spouští TRIM na SSD jednou týdně. U HDD je doporučena defragmentace jednou měsíčně.

```cmd
defrag C: D: /O
```

🔍 **Rozbor příkazu:**
- `defrag` – Spustí optimalizaci disků.
- `C: D:` – Vybere disky C: (SSD) a D: (HDD).
- `/O` – Automaticky použije správnou metodu (TRIM pro SSD, defragmentaci pro HDD).

</details>

<details>
<summary>Co se stane po spuštění?</summary>

1️⃣ **SSD (C:)**
- Spustí se TRIM, který vymaže nepoužívané bloky a zlepší výkon SSD.

2️⃣ **HDD (D:)**
- Spustí se defragmentace, která přesune roztříštěné soubory a zrychlí čtení dat.

</details>