# 🗂️ Windows CMD & optimalizace – Praktický průvodce & tipy

> 🚀 Moderní přehled práce s příkazovým řádkem, dávkovými skripty a optimalizací disků ve Windows.

---

## 📖 Příkazový řádek & dávkové skripty

- **Batch skript** má příponu `.bat` nebo `.cmd`.
- Umožňuje automatizovat úlohy ve Windows.

---

## 🛠️ Spouštění SQL skriptů ze složky

<details>
<summary><span style="color:#1E90FF;">📂 Hromadné spuštění všech SQL skriptů</span></summary>

```cmd
for %%G in (*.sql) do sqlcmd /S serverTest /d CT46 -U userName -P password123 -i"%%G"
pause
```

> [!NOTE]  
> Smyčka `for %%G in (*.sql)` projde všechny `.sql` soubory v adresáři a spustí je pomocí `sqlcmd` na zadaném SQL serveru.  
> `pause` umožní zobrazit výsledek před zavřením okna.

</details>

---

## 🛠️ Optimalizace disků ve Windows

<details>
<summary><span style="color:#1E90FF;">💾 Automatická optimalizace SSD & HDD</span></summary>

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
<summary><span style="color:#1E90FF;">📝 Co se stane po spuštění?</span></summary>

1️⃣ **SSD (C:)**
- Spustí se TRIM, který vymaže nepoužívané bloky a zlepší výkon SSD.

2️⃣ **HDD (D:)**
- Spustí se defragmentace, která přesune roztříštěné soubory a zrychlí čtení dat.

</details>