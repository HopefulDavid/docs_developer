## WSL (Windows Subsystem for Linux)

Wsl slouží k instalaci linuxových distribucí na Windows.

Umožňuje spouštět linuxové aplikace přímo na Windows bez potřeby virtuálního stroje.

Instalace

<details> 
<summary><span style="color:#1E90FF;">Windows</span></summary>

>[!IMPORTANT]  
> Pro správnou funkci WSL je nutné v BIOSu/UEFI povolit následující nastavení:
> 
> - **Podpora CPU virtualizace**  
>   - U procesorů Intel: **Intel VT-x**  
>   - U procesorů AMD: **AMD-V** nebo **SVM (Secure Virtual Machine)**
>   
> - **Virtualizační technologie**  
>   - U procesorů Intel: **VT-d** (pokud je k dispozici)  
>   - U procesorů AMD: **AMD-Vi** (pokud je k dispozici)  
>   
>     Toto nastavení může být označeno jako **"Hardware Virtualization"**
>   
> - **Vnořená virtualizace (Nested Virtualization)**  
>   - Toto nastavení je potřebné pouze v případě, že chcete používat virtualizaci uvnitř WSL, což není běžné pro všechny uživatele.  
>   - V některých verzích BIOSu/UEFI je označeno jako **"VT-x/AMD-V Virtualization"**.

Kontrola povolení virtualizace:
 
- Stiskněte `Ctrl + Shift + Esc`

- Přejděte na záložku "Performance" (Výkon)

- Dole by mělo být "Virtualization: Enabled"

Viz zde na obrázku: 

![Zobrazení virtualization:Enabled](../images/wv1G8UBxvy.png)]

1. Povolení WSL na vašem počítači

   Ve výchozím nastavení je WSL na vašem PC deaktivovaný.

   (WSL = Windows Subsystem for Linux, umožňuje spouštět Linuxové distribuce na Windows.)

   Spustťte jako správce "PowerShell"

   ![Spuštění PowerShellu jako správce](../images/pnAzi0NFm3.png)

   Nyní povolíme WSL vložením následujícího příkazu:

    ```bash
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    ```

   > [!NOTE]
   > Pokud vše proběhlo v pořádku, výstup bude vypadat takto:
   >
   >![Povolení WSL](../images/mei8XmPaWt.png)

2. Povolení platformy Virtual Machine a WSL 2 na Windows

   Pro spuštění nejnovější verze WSL, což je WSL 2, musíte povolit "Windows Virtual Machine Platform".

   Použijte tento příkaz:

    ```
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    ```

   > [!NOTE]
   > Výstup bude podobný tomuto:
   >
   > ![Povolení WSL 2](../images/cADNNtfdn8.png)

   > [!IMPORTANT]
   > Aby se všechny nové změny a povolené funkce projevily, musíte restartovat počítač.

3. Stažení aktualizace Linux jádra

   Nyní je čas [stáhnout a nainstalovat](https://github.com/Microsoft/WSL/releases) aktualizační balíček linuxového jádra.

   > [!NOTE]
   > Narazil jsem na problém, kdy WSL nefungoval správně s Dockerem, dokud jsem nenainstaloval poslední aktualizaci, která vše opravila.
   >
   > Proto doporučuji stáhnout a nainstalovat poslední aktualizaci jádra.

4. Nastavení WSL 2 jako výchozí

   Nyní je čas nastavit nejnovější verzi WSL, tedy WSL 2, jako výchozí.

   Toho dosáhnete otevřením dalšího PowerShell terminálu jako správce (jak bylo ukázáno dříve) a spuštěním následujícího příkazu:

    ```
    wsl --set-default-version 2
    ```

   > [!NOTE]
   > Výstup bude vypadat takto:
   >
   > ![Nastavení výchozí verze WSL](../images/LNHIGgBhcb.png)

5. Instalace linuxové distribuce podle vašeho výběru pomocí WSL

   Nyní, když jsme plně připravili systém a nainstalovali všechny požadavky, můžeme konečně pokračovat s instalací linuxového subsystému na náš počítač.

   Stáhneme si libovolnou linuxovou distribuci podle našeho výběru "RootFS" (Root File System) a nainstalujeme ji pomocí WSL.

   Například pro [Ubuntu](https://cloud-images.ubuntu.com/wsl/jammy/current/)

    ```bash
    wsl --import Ubuntu-22.04 C:\WSL\Ubuntu2204 C:\UbuntuRootFS\ubuntu-jammy-wsl-amd64-ubuntu22.04lts.rootfs.tar.gz --version 2
    ```

   > [!NOTE]
   > `Ubuntu-22.04` = Název distribuce,který chcete použít.
   >
   > `C:\WSL\Ubuntu2204` = Cesta, kde chcete mít nainstalovanou distribuci.
   >
   > `C:\UbuntuRootFS\ubuntu-jammy-wsl-amd64-ubuntu22.04lts.rootfs.tar.gz` = Cesta k souboru, který jste stáhli.
   >
   > `--version 2` = Použití WSL 2 jako výchozí verze pro tuto distribuci.

   Nyní ověříme, zda je distribuce nainstalována správně pomocí příkazu:

    ```bash
    wsl --list
    ```

   > [!WARNING]
   > Pokud ste nainstalovali špatně distribuci, můžete ji odstranit pomocí příkazu:
   >
   > ```bash
    > wsl --unregister <distro name>
    > ```
   >
   > Například: `wsl --unregister Ubuntu-22.04`

To je vše, nyní máte nainstalovaný WSL na vašem počítači včetně linuxové distribuce.

> Pro detailní informace o instalaci WSL2 najdete kompletní návod na [blogu Contabo](https://contabo.com/blog/how-to-install-wsl2-on-windows-10/).

</details>