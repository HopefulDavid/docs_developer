# 🗂️ Wireshark – Dešifrování HTTPS (SSL/TLS) & tipy

> 🚀 Moderní průvodce nastavením dešifrování SSL/TLS provozu ve Wiresharku.

---

## 📖 Co je dešifrování HTTPS?

- **Umožňuje analyzovat šifrovaný provoz** mezi klientem a serverem.
- Využívá soubor s klíči pro dešifrování paketů v reálném čase.
- Klíčové pro ladění, bezpečnostní analýzu a vývoj webových aplikací.

> [!NOTE]  
> Pro dešifrování je nutné mít přístup k Pre-Master Secret klíčům.

---

## 🛠️ Krok 1: Nastavení proměnné SSLKEYLOGFILE

<details>
<summary><span style="color:#1E90FF;">🔑 Vytvoření souboru s klíči</span></summary>

1. Nastavte systémovou proměnnou prostředí s názvem `SSLKEYLOGFILE` na cestu k souboru, kam bude prohlížeč ukládat klíče.
    - **Windows:**  
      Otevřete `Ovládací panely → Systém → Upřesnit nastavení systému → Proměnné prostředí`.
    - **Příklad cesty:**  
      `C:\Users\<uživatel>\sslkeys.log`
2. Restartujte prohlížeč, aby začal klíče zapisovat.

> [!TIP]  
> Podporují Chrome, Firefox, Edge. Safari a IE nikoliv.
</details>

---

## 🛠️ Krok 2: Konfigurace Wiresharku

<details>
<summary><span style="color:#1E90FF;">⚙️ Nastavení dešifrování TLS</span></summary>

1. Otevřete Wireshark
2. Jděte do `Edit → Preferences → Protocols → TLS`
3. Nastavte `Pre-Master-Secret log filename` na stejnou cestu jako `SSLKEYLOGFILE`

<img src="../images/wireshark_tls_settings.png" alt="wireshark_tls_settings" width="500px"/>

> [!NOTE]  
> Po nastavení Wireshark automaticky použije klíče k dešifrování provozu.
</details>

---

## 🛠️ Krok 3: Zachycení a analýza paketů

<details>
<summary><span style="color:#1E90FF;">📦 Zachycení dešifrovaného provozu</span></summary>

1. Spusťte zachytávání paketů ve Wiresharku
2. Proveďte požadovanou komunikaci v prohlížeči
3. Po ukončení zachytávání byste měli vidět dešifrovaný HTTP provoz

<img src="../images/wireshark_decrypted.png" alt="wireshark_decrypted" width="500px"/>

> [!TIP]  
> Filtrujte protokol `http` nebo `tls` pro lepší přehlednost.
</details>