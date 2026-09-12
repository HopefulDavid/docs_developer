# Windows – Průvodce a tipy

> Instalace, nastavení, klávesové zkratky a řešení problémů ve Windows.

## Instalace Windows bez Microsoft účtu

Dostupné volby úvodního nastavení OOBE závisí na edici, sestavení a způsobu správy počítače.

Staré příkazy `ms-cxh:localonly` a `OOBE\BYPASSNRO` nejsou stabilní podporované rozhraní, proto na nich nestav opakovatelný instalační postup.

Microsoft výslovně oznámil odstraňování těchto mechanismů v [Insider sestaveních](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26120-6772-beta-channel/); oznámení o konkrétní testovací verzi samo neurčuje chování všech vydaných instalátorů.

Pokud instalátor lokální účet přímo nabízí, použij jeho standardní volbu; u spravovaného zařízení dodrž postup organizace.

### Přechod na místní účet po instalaci

Pokud máš funkční osobní Windows přihlášené Microsoft účtem, podporovanou možností je přepnutí stávajícího profilu na místní přihlášení.

1. Ulož rozpracované soubory a otevři **Nastavení → Účty → Vaše informace**.
2. Zvol **Přihlásit se místo toho místním účtem**.
3. Dokonči ověření, nastav jméno a heslo a zvol odhlášení a dokončení.
4. Přihlas se místním účtem a ověř dostupnost svých souborů i aplikací.

Lokální heslo spravuješ pro tento počítač; přihlášení do OneDrive nebo jiných aplikací může zůstat samostatné.

Postup a možnosti návratu popisuje [Microsoft: změna typu účtu](https://support.microsoft.com/en-us/accounts-billing/manage/change-from-a-local-account-to-a-microsoft-account-in-windows).

## Řešení neviditelného disku při instalaci

Diagnostiku, výběr ovladače a bezpečné rozlišení interního SSD od instalačního USB najdeš v návodu [Instalátor Windows nevidí SSD – Intel RST a VMD](installation-missing-ssd.md).

## Soubor nebo složka nejde odstranit

Chybu „Položka nebyla nalezena“, rozlišení CMD a PowerShellu a problematické názvy řeší návod [Windows – nelze odstranit soubor nebo složku](cannot-delete-item.md).

## Základní nastavení

### Zobrazení sekund v dolním panelu

V aktuálních Windows 11 otevři pravým tlačítkem hodiny → **Upravit datum a čas** a u zobrazení času v oznamovací oblasti zapni **Zobrazovat sekundy**.

Ve starších sestaveních může být volba v chování hlavního panelu; její umístění a vyšší spotřebu popisuje [nastavení panelu Microsoftu](https://support.microsoft.com/en-US/Windows/Experience/Personalization/customize-the-taskbar-in-windows).

![Zobrazení sekund v taskbaru](../../images/t9hZzZp1FO.png)

## Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `Win` + `D` | Minimalizace / obnovení všech oken |
| `Alt` + `D` | Přechod na adresní řádek v Průzkumníku |
| `Shift` + `F10` | Náhrada chybějící kontextové klávesy |

### Skočení na adresní řádek

![Adresní řádek ve Windows Průzkumníku](../../images/windows_keyboard_explorerAddressBar.png)

### Chybějící kontextová klávesa

Náhrada: `Shift` + `F10`
