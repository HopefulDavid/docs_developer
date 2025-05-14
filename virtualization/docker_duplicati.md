1. Vytvoření a nastavení složky pro zálohy

    ```bash
    mkdir /cesta/k/tvojí/složce
    ```

   - Přístup pro všechny:

        ```bash
        chmod 777 /cesta/k/tvojí/složce
        ```

        >[!TIP]
        > Přístup pouze pro root.
        > 
        > ```bash
        > chmod 700 /cesta/k/tvojí/složce
        > ```

2. Nastavení oprávnění pro Docker volumes

    Pro zálohu je zapotřebí povolit přístup k souborům a ke složkám v dockeru.

    - Povolit rekurzivně pro složky:

        ```bash
        find /docker_XX -type d -exec chmod 755 {} \;
        ```
  
    - Povolit rekurzivně pro soubory:

        ```bash
        find /docker_XX -type f -exec chmod 644 {} \;
        ```

    | Popis             | Cesta                                                |
    |-------------------|------------------------------------------------------|
    | Host/volume       | `/var/lib/docker/volumes` (cesta k diskům)           |
    | Path in container | `/docker_XX` (vlastní cesta v kontejneru pro Volume) |

    > [!IMPORTANT]
    > V kontejneru duplicati musí být nastaveno na "Bind".
    
    
    > [!TIP]
    > Chcete-li vrátit zpět oprávnění na výchozí hodnoty, použijte následující příkaz:
    >
    > ```bash
    > chown -R root:root/docker_XX
    > ```
    >
    > Tento příkaz změní vlastníka a skupinu všech souborů a adresářů v `/docker_XX` na `root`, což je výchozí nastavení pro
    > většinu systémů.