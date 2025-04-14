## Visual Studio

<details>
<summary><span style="color:#1E90FF;">Stažení instalátoru pro offline použití</span></summary>

1. Stáhněte si instalátor Visual Studio Community
   z [oficiálních stránek](https://visualstudio.microsoft.com/cs/downloads/).
2. Přesuňte se do složky, kde je uložen instalační program (např. vs_community.exe).
3. Otevřete příkazový řádek a spusťte následující příkaz:

    ```bash
    vs_community.exe --layout C:\visualstudio_offline --lang cs-CZ en-US --all
    ```

    - `--layout` určuje složku, kam se mají stáhnout všechny potřebné soubory.
    - `--lang` určuje jazyky, které se mají stáhnout. (V tomto případě se stáhnou jazyky čeština a angličtina.)
    - `--all` zajistí, že se stáhnou všechny dostupné komponenty, včetně volitelných modulů a specifických nástrojů.

> [!NOTE]
> Po dokončení stahování se vytvoří složka `visualstudio_offline` s kompletními instalačními soubory.

</details>