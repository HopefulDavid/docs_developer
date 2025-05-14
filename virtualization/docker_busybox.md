1. Zjistěte, jaké máte docker volumes:

    ```bash
    docker volume ls
    ```
   
2. Přenést data z docker volumes do počítače:

    ```bash
    docker run --rm -v projekty_planka_config:/volume -v C:\Users\xxx\Docker_Volumes\planka:/backup busybox:1.37.0-glibc sh -c "cp -r /volume/. /backup/"
    ```

    > [!NOTE]
    >
    > **Základní parametry:**
    > 
    > `--rm`
    > 
    >  - automaticky odstraní kontejner po dokončení operace
    >  - šetří místo na disku a udržuje systém čistý
    >
    > **Připojení volumes:**
    > 
    > `-v projekty_planka_config:/volume`
    > 
    >  - připojí Docker volume `projekty_planka_config`
    >  - v kontejneru bude dostupný jako adresář `/volume`
    >  - slouží jako zdroj dat pro zálohu
    >
    >  `-v C:\Users\xxx\Docker_Volumes\planka:/backup`
    >   
    >  - připojí lokální složku z hostitelského systému
    >  - v kontejneru bude dostupná jako `/backup`
    >  - cílové umístění pro zálohu dat
    >
    > **Použitý image a příkaz:**
    > 
    > `busybox:1.37.0-glibc`
    > 
    >   - minimalistický Linux image
    >   - obsahuje základní Unix nástroje
    >   - verze s glibc pro lepší kompatibilitu
    >
    >  `sh -c "cp -r /volume/. /backup/"`
    > 
    >  - `sh -c`: spustí shell s následujícím příkazem
    >  - `cp -r`: rekurzivní kopírování včetně podsložek
    >  - `/volume/.`: kopíruje obsah složky volume
    >  - `/backup/`: cílová složka pro zálohu