# 🌐 Virtual Hosts v XAMPP

> 🚀 Virtual Hosts umožňují přiřadit každému projektu vlastní doménu, např. `project1.local`, pro pohodlnější přístup a testování.

---

## 🛠️ 1. Konfigurace Apache

<details>
<summary><span style="color:#1E90FF;">🔧 Jak nastavit Virtual Hosts?</span></summary>

Otevřete soubor:

```
C:\xampp\apache\conf\extra\httpd-vhosts.conf
```

Přidejte bloky pro každý projekt:

```apache
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/project1"
    ServerName project1.local
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/project2"
    ServerName project2.local
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/project3"
    ServerName project3.local
</VirtualHost>
```
</details>

---

## 📝 2. Úprava hosts souboru

<details>
<summary><span style="color:#1E90FF;">🖥️ Jak přidat domény do hosts?</span></summary>

Otevřete soubor `hosts` jako administrátor:

```
C:\Windows\System32\drivers\etc\hosts
```

Přidejte řádky:

```
127.0.0.1 project1.local
127.0.0.1 project2.local
127.0.0.1 project3.local
```
</details>

---

## 🔄 3. Restart Apache

<details>
<summary><span style="color:#1E90FF;">♻️ Jak restartovat Apache?</span></summary>

1. Otevřete **XAMPP Control Panel**.
2. Klikněte na <kbd>Stop</kbd> a poté <kbd>Start</kbd> u služby **Apache**.
3. Ujistěte se, že server běží (zelený stav).

</details>

---

## 🌍 4. Přístup k projektům

<details>
<summary><span style="color:#1E90FF;">🔗 Jak přistupovat k projektům?</span></summary>

| 🏷️ Projekt   | 🌐 URL adresa             |
|--------------|--------------------------|
| project1     | `http://project1.local`  |
| project2     | `http://project2.local`  |
| project3     | `http://project3.local`  |

> Každý projekt má vlastní "friendly URL" místo `localhost/projectX`.
</details>