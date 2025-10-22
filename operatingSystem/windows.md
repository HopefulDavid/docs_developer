# 🗂️ Windows – Praktický průvodce & tipy

> 🚀 Moderní přehled instalace, nastavení, klávesových zkratek a řešení problémů ve Windows.

---

## 🪟 Instalace Windows bez Microsoft účtu

Na začátku instalace při výběru jazyka stiskněte:

1. `Shift` + `F10` pro otevření příkazového řádku.
2. Zadejte příkaz:

   `start ms-cxh:localonly`

   > [!TIP]
   > Pokud nezafunguje, zkuste místo toho:
   >
   > `OOBE\BYPASSNRO`

## 🛠️ Instalace Windows & řešení neviditelného disku

<details>
<summary><span style="color:#1E90FF;">💾 Řešení problému s neviditelným diskem při instalaci</span></summary>

1. **Stáhněte si ovladač pro diskovou jednotku**
    - Otevřete příkazový řádek:  
      `Shift` + `F10`
    - Zobrazte informace o discích:  
      `wmic diskdrive list brief`
    - Pokud používáte **Intel RST (RAID)** nebo **Intel Optane**, stáhněte odpovídající ovladač:
        - **Intel RST VMD Managed Controller** / **Intel RST VMD Controller** pro RAID/NVMe/SATA
        - **Intel Optane Memory and Storage Management** pro Optane
    - Ovladač rozbalte na **USB disk**.

2. **Načtení ovladače během instalace**
    - Spusťte instalaci Windows.
    - Na obrazovce s výběrem disků klikněte na **Načíst ovladač (Load Driver)**.
    - Vložte USB disk s ovladačem a vyberte správný soubor.
    - Novější verzi poznáte podle vyššího hexadecimálního čísla v názvu (např. 09AB je novější než 08AB).

   > [!IMPORTANT]  
   > Po načtení ovladače by měl být disk viditelný a připravený pro instalaci.

</details>

---

## ⚙️ Základní nastavení

<details>
<summary><span style="color:#1E90FF;">⏱️ Zobrazení sekund v dolním panelu</span></summary>

<img src="../images/t9hZzZp1FO.png" alt="windows_taskbar_seconds" width="500px"/>

</details>

---

## ⌨️ Klávesnicové zkratky

<details>
<summary><span style="color:#1E90FF;">🗔 Minimalizace/Maximalizace všech oken</span></summary>

`Win` + `D`

</details>

<details>
<summary><span style="color:#1E90FF;">🔗 Skočení na adresní řádek</span></summary>

`Alt` + `D`

<img src="../images/windows_keyboard_explorerAddressBar.png" alt="windows_explorer_addressBar.png" width="800px"/>

</details>

---

## 🖱️ Chybějící klávesy na klávesnici

<details>
<summary><span style="color:#1E90FF;">🗂️ Kontextová klávesa</span></summary>

<img src="https://filestore.community.support.microsoft.com/api/images/d42eb865-8390-4aa3-af19-e7272d95121e" alt="windows_missingKeyboardContextMenu.png" width="800px"/>

**Řešení:**  
`Shift` + `F10`

</details>