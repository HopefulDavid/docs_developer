# 🗂️ Docker Duplicati – Praktický průvodce & tipy

> 🚀 Moderní přehled nastavení složek, oprávnění a doporučení pro zálohování s Duplicati v Dockeru.

---

## 📖 Co je Duplicati?

- **Open-source nástroj pro zálohování dat**
- Umožňuje šifrované, komprimované a inkrementální zálohy
- Snadná integrace s Dockerem

> [!NOTE]  
> Ideální pro automatizované zálohy v kontejnerizovaném prostředí.

---

## 🛠️ Krok 1: Vytvoření a nastavení složky pro zálohy

<details>
<summary><span style="color:#1E90FF;">📁 Vytvoření složky</span></summary>

```bash
mkdir /cesta/k/tvojí/složce
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔒 Nastavení oprávnění</span></summary>

- Přístup pro všechny:
  ```bash
  chmod 777 /cesta/k/tvojí/složce
  ```

- Přístup pouze pro root:
  ```bash
  chmod 700 /cesta/k/tvojí/složce
  ```
</details>

---

## 🛠️ Krok 2: Nastavení oprávnění pro Docker volumes

<details>
<summary><span style="color:#1E90FF;">📂 Rekurzivní nastavení složek a souborů</span></summary>

- Povolit rekurzivně pro složky:
  ```bash
  find /docker_XX -type d -exec chmod 755 {} \;
  ```

- Povolit rekurzivně pro soubory:
  ```bash
  find /docker_XX -type f -exec chmod 644 {} \;
  ```
</details>

| Popis             | Cesta                                                |
|-------------------|------------------------------------------------------|
| Host/volume       | `/var/lib/docker/volumes` (cesta k diskům)           |
| Path in container | `/docker_XX` (vlastní cesta v kontejneru pro Volume) |

> [!IMPORTANT]  
> V kontejneru Duplicati musí být typ svazku nastaven na **Bind**.

---

## 🔄 Obnovení výchozích oprávnění

<details>
<summary><span style="color:#1E90FF;">Vrácení oprávnění na výchozí hodnoty</span></summary>

```bash
chown -R root:root /docker_XX
```
Tímto příkazem nastavíte vlastníka a skupinu všech souborů a složek v `/docker_XX` na `root`.
</details>