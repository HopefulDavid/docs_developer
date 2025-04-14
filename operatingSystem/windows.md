## Instalace

<details>
<summary><span style="color:#1E90FF;">Řešení problému s neviditelným diskem při instalaci Windows</span></summary>

1. Stáhněte si ovladač pro diskovou jednotku

    - Získejte informace o diskových ovladačích:

      Zadejte: `Shift` + `F10`

      Otevře se příkazový řádek. Zadejte: `wmic diskdrive list brief`

   > [!NOTE]
   > Pokud používáte Intel RST (RAID) nebo Intel Optane, může se zobrazit Intel RAID Controller nebo Intel Optane v
   popisu.

    - **Intel RST (Rapid Storage Technology)**:
        - Použijte **"Intel RST VMD Managed Controller"** nebo **"Intel RST VMD Controller"**, pokud používáte
          technologii RAID nebo Intel RST.
        - Tento ovladač bude fungovat pro většinu běžných konfigurací disků (SATA, NVMe).

    - **Intel Optane**:
        - Pokud máte v notebooku **Intel Optane Memory**, stáhněte ovladač **Intel Optane Memory and Storage Management
          **.
        - Tento ovladač je potřebný pro správu Optane paměti a jejích disků.

   Ovladače by měly být ve formátu `.zip`.

   Ujistěte se, že máte rozbalený obsah souboru na **USB disku** (rozbalení souboru je nezbytné).

2. Načtení ovladač během instalace

    - Postup:

    1. Spusťte instalaci Windows.
    2. Na obrazovce, kde se výběr disků nezobrazuje nebo je omezený, klikněte na **Načíst ovladač (Load Driver)**.
    3. Vložte **USB disk**, na kterém máte rozbalený ovladač.
    4. Vyberte správný ovladač.

             > [!IMPORTANT]
             > Poznat novější verzi lze za pomoci čísla verze v názvu souboru.
             > 
             > Čísla jako **09AB**, **467F** atd. jsou zde jako **hexadecimální čísla**
             >
             > Například: 
             > - Intel RST VMD Managed Controller (09AB) - 9AB je verze ovladače.
             >    Jedná se o novější verzi než Intel RST VMD Managed Controller (08AB).
             > 
             > - Intel RST VMD Controller (467F)
             >
             >     Tento ovladač má nižší číselný kód (467F), což znamená, že je starší verze.

    5. Po načtení ovladače by měl být váš disk viditelný a připravený pro instalaci.

</details>

## Základní nastavení

<details>
<summary><span style="color:#1E90FF;">Zobrazení sekund v dolním panelu</span></summary>

<img src="../images/t9hZzZp1FO.png">

</details>

## Klávesnicové zkratky

<details>
<summary><span style="color:#1E90FF;">Minimalizace/Maximalizace všech oken</span></summary>

`Win` + `D`

</details>

<details>
<summary><span style="color:#1E90FF;"> Skočení na adresní řádek</span></summary>


`Alt` + `D`

<img src="../images/windows_keyboard_explorerAddressBar.png" alt="windows_explorer_addressBar.png" width="800px"/>

</details>

## Chybějící klávesy na klávesnici

<details>
<summary><span style="color:#1E90FF;">Kontextová klávesa</span></summary>

<img src="https://filestore.community.support.microsoft.com/api/images/d42eb865-8390-4aa3-af19-e7272d95121e" alt="windows_missingKeyboardContextMenu.png" width="800px"/>

Řešení:

`Shift` + `F10`

</details>