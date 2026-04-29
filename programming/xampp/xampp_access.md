# Přístup k projektům v XAMPP

> Tento návod ukazuje, jak spravovat více projektů v XAMPP a pohodlně k nim přistupovat přes prohlížeč.

---

## 1. Spuštění Apache

<details>
<summary>Jak spustit Apache server?</summary>

1. Otevřete **XAMPP Control Panel**.
2. Klikněte na tlačítko <kbd>Start</kbd> u služby **Apache**.
3. Ujistěte se, že běží (zelený stav).

> Doporučení: Spouštějte XAMPP jako administrátor pro správné oprávnění.

</details>

---

## 2. Vytvoření složek pro projekty

<details>
<summary>Jak organizovat projekty?</summary>

Každý projekt vložte do vlastní složky v `htdocs`:

| 🏷️ Projekt   | 📂 Umístění složky                |
|--------------|-----------------------------------|
| project1     | `C:\xampp\htdocs\project1\`        |
| project2     | `C:\xampp\htdocs\project2\`        |
| project3     | `C:\xampp\htdocs\project3\`        |

> Složka `htdocs` je výchozí webový adresář Apache v XAMPP.

</details>

---

## 3. Přístup k projektům přes prohlížeč

<details>
<summary>Jak zobrazit projekty v prohlížeči?</summary>

Otevřete prohlížeč a zadejte URL podle názvu složky:

| 🏷️ Projekt   | 🌍 URL adresa                    |
|--------------|----------------------------------|
| project1     | `http://localhost/project1/`      |
| project2     | `http://localhost/project2/`      |
| project3     | `http://localhost/project3/`      |

> Každý projekt má vlastní URL pod `localhost`.

</details>