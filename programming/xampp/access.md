# XAMPP: spuštění lokálního PHP projektu

XAMPP spojuje Apache, PHP a další nástroje pro místní vývoj.

Apache přijme HTTP požadavek a pro `.php` soubor spustí PHP; prohlížeč dostane výsledek, nikoli zdrojový kód.

## Před použitím

Návod předpokládá XAMPP ve Windows v `C:\xampp` a volný HTTP port 80.

Používej jej pro vývoj na vlastním počítači, ne jako hotovou konfiguraci veřejného produkčního serveru.

[Oficiální FAQ XAMPP](https://www.apachefriends.org/faq_windows.html) popisuje výchozí cesty, služby a omezení této sestavy.

## Praktické použití

1. Vytvoř složku `C:\xampp\htdocs\moje-aplikace`.
2. Ulož do ní soubor `index.php` s následujícím obsahem.
3. V **XAMPP Control Panel** spusť **Apache** tlačítkem **Start**.
4. Otevři `http://localhost/moje-aplikace/` a ověř zobrazení zprávy.

```php
<?php
// HTTP hlavička popisuje formát odpovědi a kódování českých znaků.
header('Content-Type: text/plain; charset=utf-8');
echo "PHP projekt funguje.\n";
```

Soubor neotevírej dvojklikem přes `file://`, protože tím obcházíš Apache a PHP se nespustí.

Pro tuto ukázku není potřeba zapínat databázovou službu ani měnit práva na správce.

## Co lze upravit

| Hodnota | Význam | Co změnit společně |
|---|---|---|
| `C:\xampp` | Místo instalace | Všechny odkazované konfigurační cesty |
| `moje-aplikace` | Podsložka webového kořene | Stejnou část URL za `localhost/` |
| Port 80 | HTTP naslouchání Apache | Při jiném portu přidat například `:8080` do URL |

Další projekt může mít vlastní podsložku, například `htdocs\druha-aplikace`.

Aplikaci vyžadující vlastní doménu nebo veřejný kořen `public` nastav jako [Virtual Host](virtual-hosts.md).

## Časté problémy

| Projev | Kontrola |
|---|---|
| Apache se nespustí | Chybový log a obsazení portu jinou službou |
| 404 Not Found | Název podsložky, souboru a skutečný DocumentRoot |
| Zobrazuje se zdroj PHP | Použití HTTP a aktivní konfigurace PHP v Apache |
| Po změně nic nového | Správná URL, uložený soubor a případná cache |

Do veřejné složky nepatří zálohy, soukromé klíče ani konfigurace s hesly.
