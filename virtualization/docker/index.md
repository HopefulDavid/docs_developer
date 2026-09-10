# Docker – Průvodce a reference

> Přehled základních pojmů, příkazů, konfigurace a doporučení pro práci s Dockerem na Windows.

![Docker](../../images/bfdff689-3382-451c-872a-5f566bacdca2.png)

## Co je Docker?

- Platforma pro vývoj, doručování a běh aplikací pomocí **kontejnerizace**.
- Izoluje aplikace v kontejnerech se všemi jejich závislostmi.
- Kontejnery jsou rychlejší a efektivnější než klasická virtualizace.

> [!NOTE]
> Pro použití Docker Desktopu s backendem WSL 2 ve Windows nejprve připrav [WSL](../wsl.md).

## Docker Desktop a WSL 2 ve Windows

Tento postup ověřuje používání linuxových kontejnerů Docker Desktopu z vlastní distribuce WSL, například Ubuntu.

### Proč jsou v Průzkumníku Ubuntu i docker-desktop

V části **Linux** v Průzkumníku Windows mohou být obě distribuce současně:

| Distribuce | Účel |
|---|---|
| `Ubuntu-22.04` | Tvoje vlastní Linux prostředí pro projekty, Bash, Git a správu balíčků; může být nainstalované běžně nebo importované z RootFS. |
| `docker-desktop` | Interní distribuce vytvořená a spravovaná Docker Desktopem, ve které běží Docker Engine. |

Zapnutá **WSL Integration** umožní zadávat příkazy `docker` z Ubuntu a používat engine spravovaný Docker Desktopem.

Ubuntu přitom není pro samotný běh Docker Desktopu povinné; Docker lze používat také přímo z terminálu Windows.

Přítomnost obou distribucí není chyba ani důvod jednu smazat; do `docker-desktop` běžně ručně nezasahuj. [Jak funguje integrace WSL](https://docs.docker.com/desktop/features/wsl/)

### 1. Zkontroluj distribuce a verzi WSL

Ve **Windows PowerShellu nebo CMD** spusť:

```text
wsl --list --verbose
```

Příklad výstupu při spuštěném Docker Desktopu:

```text
  NAME              STATE           VERSION
* Ubuntu-22.04      Stopped         2
  docker-desktop    Running         2
```

Pro tento postup musí používané distribuce běžet ve WSL 2, tedy mít ve sloupci `VERSION` hodnotu `2`.

`Stopped` znamená zastavenou distribuci, kterou můžeš spustit; hvězdička označuje výchozí distribuci. [Výpis distribucí WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#list-installed-linux-distributions)

Název `Ubuntu-22.04` je příklad z tohoto prostředí, proto jej v dalších příkazech nahraď přesným názvem ze svého výpisu.

### 2. Zapni integraci pro Ubuntu

1. Spusť Docker Desktop a počkej na spuštění enginu.
2. V **Settings → General** zapni **Use WSL 2 based engine**, pokud se tato volba zobrazuje.
3. V **Settings → Resources → WSL Integration** zapni svou distribuci Ubuntu a potvrď **Apply**.

Pokud nabídka WSL Integration chybí, ověř režim kontejnerů a případně v nabídce Docker Desktopu zvol **Switch to Linux containers**.

Pro tuto variantu neinstaluj do Ubuntu další samostatný Docker Engine nebo Docker CLI, protože může s integrací Docker Desktopu kolidovat. [Nastavení integrace](https://docs.docker.com/desktop/features/wsl/#enable-docker-in-a-wsl-2-distribution)

### 3. Ověř spojení s enginem a spuštění kontejneru

Ve **Windows PowerShellu nebo CMD** otevři Ubuntu:

```text
wsl --distribution Ubuntu-22.04
```

Následující příkaz už spusť **uvnitř Ubuntu**:

```text
docker version
```

Výpis má obsahovat části **Client** i **Server** bez chyby připojení; samotné `docker --version` ukazuje pouze verzi klienta. [Význam výstupu docker version](https://docs.docker.com/reference/cli/docker/version/)

Pak ve stejném terminálu Ubuntu spusť testovací kontejner:

```text
docker run --rm hello-world
```

Očekávaná zpráva je:

```text
Hello from Docker!
```

Pokud image ještě není uložená lokálně, Docker ji stáhne z Docker Hubu a potřebuje připojení k internetu.

Volba `--rm` po dokončení odstraní testovací kontejner, stažená image zůstane. [Spuštění a odstranění kontejneru](https://docs.docker.com/reference/cli/docker/container/run/#clean-up---rm)

| Výsledek | Co ověřit |
|---|---|
| `docker: command not found` | Zapnutí integrace pro správnou distribuci a nové otevření terminálu Ubuntu. |
| Chyba připojení v části `Server` | Běh Docker Desktopu a zvolené připojení klienta. |
| Chyba při stahování image | Přístup k Docker Hubu, proxy nebo limit stahování. |

Pokud používáš i vzdálený Docker, ověř připojení přes `docker context ls` a případné proměnné `DOCKER_HOST` nebo `DOCKER_CONTEXT`; úspěšný test se vztahuje k připojenému enginu. [Docker kontexty](https://docs.docker.com/engine/manage-resources/contexts/)

Z Ubuntu se do terminálu Windows vrátíš příkazem `exit`.

### Kam patří docker_data.vhdx

`docker_data.vhdx` je samostatný datový disk Docker Desktopu; obsahuje Docker images, kontejnery, pojmenované volumes a build cache.

Ubuntu má vlastní souborový systém a vlastní virtuální disk, takže záloha `docker_data.vhdx` nepatří do Ubuntu a nenahrazuje její disk.

Soubory připojené do kontejnerů pomocí bind mountů zůstávají ve zdrojových složkách Windows nebo Ubuntu a vyžadují vlastní zálohu. [Ukládání pomocí bind mountů](https://docs.docker.com/engine/storage/bind-mounts/)

Před obnovou Docker disku úplně ukonči Docker Desktop, ověř skutečné umístění jeho datového disku a uchovej zálohu současných dat; vlastní postup popisuje [oficiální návod k obnově Docker Desktopu](https://docs.docker.com/desktop/settings-and-maintenance/backup-and-restore/#if-docker-desktop-fails-to-start-or-you-want-to-back-up-the-whole-docker-desktop-vm).

Úspěšné `hello-world` potvrzuje spuštění kontejneru, nikoli obnovu původních images, kontejnerů nebo dat aplikací.

## Klíčové pojmy

| Pojem | Popis |
|-------|-------|
| **Dockerfile** | Textový soubor s instrukcemi pro sestavení Docker image |
| **Docker image** | Komprimovaná šablona aplikace, ze které se spouští kontejner |
| **Docker run** | Příkaz pro spuštění kontejneru z image |
| **Docker Hub** | Oficiální veřejné úložiště Docker images |
| **Docker Engine** | Jádro Dockeru – klient-server architektura spravující kontejnery |
| **Docker Compose** | Definice a správa více kontejnerů přes soubor `docker-compose.yml` |

## Klíčové soubory

| Soubor | Účel |
|--------|------|
| `dockerd.exe` | Spouští Docker Daemon – hlavní službu pro správu kontejnerů |
| `docker.exe` | Klientský nástroj pro ovládání Dockeru (`docker run`, `docker ps`) |
| `docker-compose.exe` | Nástroj pro správu více kontejnerů v jedné aplikaci |
| `docker-compose.yml` | Konfigurační soubor – služby, porty, volumes, proměnné prostředí |

## Základní příkazy

| Kategorie | Příkaz | Popis |
|-----------|--------|-------|
| Zobrazení | `docker ps` | Zobrazí běžící kontejnery |
| | `docker images` | Zobrazí všechny lokální images |
| Automatické spouštění | `docker update --restart=yes <id>` | Zapne autostart kontejneru |
| | `docker update --restart=no <id>` | Vypne autostart kontejneru |
| Stažení | `docker pull <image>` | Stáhne image z Docker Hub |
| Záloha | `docker save -o <cesta>.tar <image>` | Exportuje image do souboru |
| | `docker load -i <cesta>.tar` | Importuje image ze souboru |
| Sestavení | `docker build -t <název>.` | Sestaví image z Dockerfile |
| Spuštění | `docker run <image>` | Spustí kontejner |
| | `docker run -p 70:80 <image>` | Spustí s mapováním portu |
| | `docker run --rm <image>` | Spustí a po ukončení automaticky smaže |
| | `docker run -it <image>` | Spustí v interaktivním módu |
| Docker Compose | `docker compose up -d` | Spustí všechny služby na pozadí |
| | `docker compose down` | Zastaví a odstraní kontejnery |
| Zastavení | `docker stop <id>` | Zastaví kontejner |
| | `docker rm <id>` | Odstraní zastaveý kontejner |
| | `docker rmi <image>` | Odstraní image |

## Dockerfile – příklady

<details>
<summary>.NET Core aplikace (pouze runtime)</summary>

```dockerfile
FROM mcr.microsoft.com/dotnet/core/runtime:3.1
WORKDIR /app
COPY ./publish .
ENTRYPOINT ["dotnet", "myapp.dll"]
```
</details>

<details>
<summary>C# aplikace s buildem uvnitř kontejneru</summary>

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out
ENTRYPOINT ["dotnet", "out/myapp.dll"]
```
</details>

<details>
<summary>Aplikace s lokálními NuGet balíčky</summary>

```dockerfile
FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app
COPY . .
RUN dotnet restore --source ./nuget
RUN dotnet publish -c Release -o out
ENTRYPOINT ["dotnet", "out/myapp.dll"]
```
</details>

## Volumes a data

### Propojení složky z Windows s kontejnerem

| Nastavení | Cesta |
|-----------|-------|
| Host / Volume | `/run/desktop/mnt/host/c/Program Files/Unity/Hub/Editor/6000.0.33f1/Editor` |
| Cesta v kontejneru | `/app/unity` |

### Zachování dat z kontejneru na lokálním disku

![Docker – zachování dat lokálně](../../images/dockerKeepDataOnLocal.png)

## Získání dat z kontejneru

<details>
<summary>Export databázového schématu (PostgreSQL/Supabase)</summary>

```cmd
docker exec -t supabase-db pg_dump -U postgres -s postgres > D:\schema.sql
```

Příkaz se připojí k běžícímu kontejneru `supabase-db` a exportuje schéma databáze do souboru `D:\schema.sql`.

> [!WARNING]
> Pro `sqlc generate` je potřeba z exportovaného souboru odstranit nebo zakomentovat řádek začínající `\unrestrict`.
</details>

## Řešení problémů

### Port není dostupný

Restartujte službu Windows NAT:

```cmd
net stop winnat
net start winnat
```

> [!NOTE]
> Tento postup uvolní zablokované síťové porty pro Docker kontejnery.
