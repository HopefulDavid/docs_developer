---
description: "Vlastní lokální domény a směrování na jednotlivé projekty."
---

# XAMPP: vlastní lokální doména projektu

Virtual Host vybírá web podle názvu v HTTP požadavku a přiřadí mu vlastní `DocumentRoot`.

Hodí se pro aplikaci, která má běžet přímo na kořeni domény nebo vystavovat jen složku `public`.

## Jak spolu části souvisejí

Soubor `hosts` přeloží `moje-aplikace.test` na místní IP adresu a Apache podle `ServerName` zvolí správnou složku.

Samotný záznam v `hosts` nenastavuje server ani port.

Doména `.test` je vyhrazená pro testování.

`.local` může kolidovat s multicast DNS.

## Před použitím

Předpokladem je funkční [XAMPP](access.md), Apache 2.4 a existující soubor `C:\projekty\moje-aplikace\public\index.php`.

Upravované konfigurační soubory se zálohují a ověří se, že v `C:\xampp\apache\conf\httpd.conf` je aktivní tento řádek.

```apache
# Načte doplňkovou konfiguraci virtuálních hostitelů.
Include conf/extra/httpd-vhosts.conf
```

## Konfigurace Apache

Do `C:\xampp\apache\conf\extra\httpd-vhosts.conf` patří blok pro `localhost` jako první výchozí host a potom projekt.

Existující hostitele se sloučí se změnami bez duplicitních názvů.

```apache
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot "C:/xampp/htdocs"
    <Directory "C:/xampp/htdocs">
        Require local
    </Directory>
</VirtualHost>

<VirtualHost *:80>
    ServerName moje-aplikace.test
    DocumentRoot "C:/projekty/moje-aplikace/public"
    <Directory "C:/projekty/moje-aplikace/public">
        # Zákaz výpisu souborů a přístupu z jiných zařízení.
        Options -Indexes
        Require local
        # Konfigurace se spravuje zde, nikoli souborem .htaccess.
        AllowOverride None
    </Directory>
</VirtualHost>
```

Cesta v `Directory` musí odpovídat veřejné složce a `Require local` dovoluje přístup pouze z místního počítače.

Pokud framework vyžaduje `.htaccess`, povol jen potřebné direktivy a modul podle jeho dokumentace.

Samotná ukázka ještě nenastavuje přepis URL.

## Překlad názvu a ověření

V editoru spuštěném jako správce se do `C:\Windows\System32\drivers\etc\hosts` přidá následující záznam bez změny přípony souboru.

```text
127.0.0.1 moje-aplikace.test
```

Řádek mapuje uvedený název na tento počítač, netýká se ostatních zařízení v síti.

V PowerShellu se před restartem Apache ověří syntaxe a seznam hostitelů.

```powershell
# -t kontroluje syntaxi, -S vypíše přiřazení virtuálních hostitelů.
& 'C:/xampp/apache/bin/httpd.exe' -t
& 'C:/xampp/apache/bin/httpd.exe' -S
```

Po `Syntax OK` se Apache restartuje přes Control Panel a otevře se `http://moje-aplikace.test/`.

Zároveň se ověří původní `http://localhost/`, aby první hostitel nepřesměroval jiné místní projekty do nové aplikace.

## Co lze upravit a časté chyby

Název se mění současně v `hosts` a `ServerName`, cestu současně v `DocumentRoot` a `Directory`.

Při 403 se prověří `Require` a oprávnění souborového systému, při zobrazení jiného webu výpis `httpd -S` a první výchozí host.

HTTPS vyžaduje důvěryhodný [lokální certifikát](../../network/certificates.md) a odpovídající TLS Virtual Host.

Změna URL na `https://` sama nestačí.

Příklady konfigurace vlastní [Apache HTTP Server](https://httpd.apache.org/docs/2.4/vhosts/examples.html), rezervované názvy [IANA](https://www.iana.org/assignments/special-use-domain-names/special-use-domain-names.xhtml).
