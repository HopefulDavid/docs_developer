# Virtual Hosts

Pomocí Virtual Hosts můžete přiřadit každému projektu vlastní lokální doménu, např. `project1.local`.

## 1. Konfigurace Apache

Otevřete soubor:

```
C:\xampp\apache\conf\extra\httpd-vhosts.conf
````

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
````

## 2. Úprava hosts souboru

Otevřete soubor `hosts` (Windows: `C:\Windows\System32\drivers\etc\hosts`) jako administrátor a přidejte:

```
127.0.0.1 project1.local
127.0.0.1 project2.local
127.0.0.1 project3.local
```

## 3. Restart Apache

Po úpravách restartujte `Apache` v XAMPP Control Panel.

## 4. Přístup k projektům

* `http://project1.local`

* `http://project2.local`

* `http://project3.local`

> Každý projekt má vlastní "friendly URL" místo `localhost/projectX`.