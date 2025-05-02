Pro umístění (pushnutí) nové větve `develop` na Git server (např. GitHub, GitLab) postupuj takto:

1. Vytvoř branch `develop` (pokud ji ještě nemáš):

    ```bash
    git checkout -b develop
    ```

2. Ujisti se, že máš vzdálený repozitář:

    ```bash
    git remote -v
    ```

   > [!NOTE]
   > Pokud není nastaven, použij např. `git remote add origin <url>`

3. Pushni větev `develop` na remote:

    ```bash
    git push -u origin develop
    ```

   > [!NOTE]
   > Parametr `-u` nastaví `develop` jako výchozí sledovanou větev vůči `origin/develop`.

4. Ověř, že větev je online:

   Lze se nyní podívat na webové rozhraní (GitHub, GitLab apod.), jestli se větev vzdáleně objevila.