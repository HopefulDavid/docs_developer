---
description: "Spouštění kontejnerů, Compose a zálohování obrazů i aplikačních dat."
---

# Docker – kontejnery, příkazy a data

Docker spouští aplikace v izolovaných kontejnerech vytvořených z image.

Kontejner sdílí jádro hostitelského systému, zatímco jeho soubory a procesy mají vlastní prostředí.

## Jak Docker funguje

| Pojem | Význam |
|---|---|
| Image | Vrstvená šablona aplikace a jejích závislostí |
| Kontejner | Konkrétní spuštěná nebo zastavená instance image |
| Dockerfile | Předpis pro sestavení image |
| Engine | Služba, která spravuje kontejnery. CLI se k ní připojuje |
| Registry | Úložiště image, například Docker Hub |
| Compose | Popis více služeb a jejich propojení v `compose.yaml` |
| Volume | Datové úložiště spravované Dockerem mimo životnost kontejneru |
| Bind mount | Připojení konkrétní složky hostitele do kontejneru |

Docker Desktop spouští linuxový engine ve Windows prostřednictvím virtualizovaného prostředí.

Podrobnosti popisuje [návod k WSL](../wsl.md).

## Před použitím

Po instalaci se Docker Desktop přepne na linuxové kontejnery a ověří se běžící engine:

```bash
docker version
docker context ls
```

`version` musí ukázat klienta i server.

Aktivní kontext určuje, který engine příkazy ovládají, včetně případného vzdáleného serveru.

Jednořádkové příkazy níže fungují v PowerShellu i Bashi.

První stažení image vyžaduje síť.

## Praktické použití

```bash
# Spustí jednorázový test a po skončení odstraní jeho kontejner.
docker run --rm hello-world
```

Výsledkem je text `Hello from Docker!`.

Image zůstane na disku.

Pro lokální webový server:

```bash
docker run --detach --name docs-web --publish 127.0.0.1:8080:80 nginx:stable-alpine
docker container ls
docker logs docs-web
```

Web je dostupný na `http://127.0.0.1:8080`.

Port `8080` patří místnímu počítači a `80` serveru v kontejneru.

Vazba na `127.0.0.1` omezuje přístup na místní počítač.

Název a vnější port lze změnit.

```bash
# Ukončení tohoto příkladu; mazání jiných kontejnerů sem nepatří.
docker stop docs-web
docker rm docs-web
```

Tag `stable-alpine` je pohyblivý.

Reprodukovatelné nasazení používá ověřenou konkrétní verzi nebo digest. [Spuštění kontejneru](https://docs.docker.com/reference/cli/docker/container/run/)

## Příkazy a restartování

| Úkol | Syntaxe | Význam |
|---|---|---|
| Všechny kontejnery | `docker container ls --all` | Zahrne i zastavené |
| Místní image | `docker image ls` | Šablony dostupné na enginu |
| Restartovací pravidlo | `docker update --restart=unless-stopped <kontejner>` | Obnovuje běh s výjimkou ručně zastaveného kontejneru |
| Vypnutí restartování | `docker update --restart=no <kontejner>` | Vyžaduje ruční spuštění |
| Export image | `docker image save --output <archiv.tar> <image>...` | Uchová image, nikoli data volumes |
| Import image | `docker image load --input <archiv.tar>` | Načte uloženou image |
| Compose konfigurace | `docker compose config --quiet` | Ověří a sloučí konfigurační vstupy |
| Spuštění služeb | `docker compose up --detach` | Vytvoří nebo aktualizuje služby definované Compose |
| Ukončení projektu | `docker compose down` | Odstraní jeho kontejnery a běžné projektové sítě |

Hodnota `<kontejner>` se nahradí názvem z výpisu všech kontejnerů.

Restartovací politika `yes` neexistuje. [Restartovací pravidla](https://docs.docker.com/engine/containers/start-containers-automatically/)

## Dockerfile pro konzolovou aplikaci .NET 10

Soubor `Dockerfile` ve složce s jediným konzolovým projektem cíleným na `net10.0`:

```dockerfile
# SDK obsahuje překladač; první fáze připraví aplikaci.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /out --no-self-contained

# Výsledný image obsahuje pouze runtime a publikovanou aplikaci.
FROM mcr.microsoft.com/dotnet/runtime:10.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "MojeAplikace.dll"]
```

`MojeAplikace.dll` se nahradí názvem assembly daného projektu.

ASP.NET Core používá odpovídající `aspnet` image a nastavené naslouchání a porty aplikace.

Obsah `.dockerignore`:

```text
bin/
obj/
.git/
.env
```

Tím se vynechají místní výstupy a běžný soubor tajných hodnot z kontextu sestavení.

Další soukromé soubory se vyloučí podle projektu.

```bash
docker build --tag moje-aplikace:local .
docker run --rm moje-aplikace:local
```

Samostatná tečka za mezerou určuje kontext sestavení.

Výstup má odpovídat lokálnímu běhu aplikace. [Microsoft: .NET v Dockeru](https://learn.microsoft.com/en-us/dotnet/core/docker/build-container)

Pro už publikovaný výstup stačí runtime fáze s `COPY ./publish .`.

Lokální NuGet zdroj patří do projektového `NuGet.Config` a potřebné balíčky do kontextu, ale ne jeho přihlašovací údaje.

## Volumes a zálohy

Záloha Dockeru zůstává v této oblasti, protože chrání image a provozní data aplikací.

Obnovení vývojových závislostí popisuje návod příslušného správce balíčků.

| Co se má obnovit | Co zálohovat |
|---|---|
| Image pro spuštění bez registru | Archiv přes `docker image save` |
| Data aplikace v pojmenovaném volume | Konzistentní obsah volume nebo aplikační export |
| Data v bind mountu | Skutečnou zdrojovou složku hostitele |
| Sestavu služeb | Compose soubory, konfiguraci, potřebná tajemství a data |
| Celé místní prostředí Docker Desktop WSL 2 | Vypnutý datový disk podle [postupu níže](#přenos-dat-docker-desktopu-na-jiný-počítač) |

Image neobsahuje obsah připojených volumes a `docker export` není náhradou zálohy image s jeho historií a konfigurací.

Pojmenované volumes běžné `docker compose down` zachová.

`--volumes` je naopak odstraní.

### Záloha a načtení image

Příklad pro existující image na aktuálním enginu:

```bash
docker image inspect nginx:stable-alpine
docker image save --output nginx-image.tar nginx:stable-alpine
```

První příkaz ověří přesný obraz a druhý uloží jeho místní podobu do nového archivu.

Po přenesení archivu na kompatibilním cílovém enginu:

```bash
docker image load --input nginx-image.tar
docker image inspect nginx:stable-alpine
```

Následuje porovnání ID obrazu a skutečné spuštění.

Manifest pro jinou architekturu není automaticky součástí každé lokální image.

### Záloha a obnova volume

Příklad je pro **PowerShell, místní linuxový engine** a existující vlastní volume `moje-data`.

Nejdříve se zastaví všechny zapisující aplikace.

U databáze je vhodnější její dokumentovaný konzistentní export, protože kopie živých souborů může být neobnovitelná.

```powershell
docker volume inspect moje-data
New-Item -ItemType Directory -Path ./docker-zaloha -ErrorAction Stop
$backupDirectory = (Resolve-Path ./docker-zaloha).Path
docker run --rm --mount source=moje-data,target=/data,readonly --mount "type=bind,source=$backupDirectory,target=/backup" alpine:3.22 tar -czf /backup/data.tgz -C /data .
```

`moje-data` se nahradí ověřeným názvem volume a záloha jde do nové složky.

Pomocný kontejner čte zdroj pouze pro čtení a zapisuje gzip archiv do hostitelské složky.

`-C /data .` zahrne i skryté položky.

První použití potřebuje dostupnou pomocnou image, kterou lze pro offline obnovu rovněž uložit přes `docker image save`.

Po úspěšném návratovém kódu se ověří obsah archivu:

```powershell
docker run --rm --mount "type=bind,source=$backupDirectory,target=/backup,readonly" alpine:3.22 tar -tzf /backup/data.tgz
Get-FileHash -LiteralPath ./docker-zaloha/data.tgz -Algorithm SHA256
```

Hash se uchová pro kontrolu přenosu.

Výpis ani shodný hash nenahrazují zkušební obnovu aplikace.

Na cíli se nejprve vypíše `docker volume ls` a zvolí **nové dosud nepoužité** jméno `obnovena-data`:

```powershell
docker volume create obnovena-data
$backupDirectory = (Resolve-Path ./docker-zaloha).Path
docker run --rm --mount source=obnovena-data,target=/data --mount "type=bind,source=$backupDirectory,target=/backup,readonly" alpine:3.22 tar -xzf /backup/data.tgz -C /data
```

`volume create` by při již existujícím názvu pouze vrátil staré volume, proto se jeho nepoužitost ověří předem.

Obnovené volume se připojí do oddělené testovací instance se stejnou verzí aplikace a ověří se konkrétní data i oprávnění souborů.

První obnova neprobíhá současně s upgradem aplikace.

Původní data zůstávají až do ověření.

Zdroje: [Docker volumes a záloha](https://docs.docker.com/engine/storage/volumes/#back-up-restore-or-migrate-data-volumes), [image save](https://docs.docker.com/reference/cli/docker/image/save/), [image load](https://docs.docker.com/reference/cli/docker/image/load/).

### Export schématu PostgreSQL z kontejneru

Následující příklad předpokládá běžící kontejner `supabase-db`, klienta `pg_dump`, databázi `postgres` a platné přihlašování uvnitř kontejneru:

```bash
docker exec supabase-db pg_dump -U postgres -d postgres --schema-only --file=/tmp/schema.sql
docker cp supabase-db:/tmp/schema.sql ./schema.sql
```

Příkazy se spouštějí postupně a při chybě exportu se nepokračuje.

`--schema-only` ukládá strukturu bez řádků dat.

Výstup nevede přes terminál s pseudo-TTY ani přes překódování shellu.

Při importu do nástroje jako sqlc se ověří podpora formátu dumpu a verze PostgreSQL.

Příkazy `psql` z exportu se neodstraňují bez posouzení kompatibility. [Pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)

## Řešení problémů

| Projev | Co zkontrolovat |
|---|---|
| Chybí část Server | Běh Docker Desktopu a aktivní kontext |
| Port je obsazený | Volný vnější port a správná URL |
| Kontejner se ukončil | `docker container ls --all` a jeho log |
| Po aktualizaci chybí data | Jméno Compose projektu, připojené volumes a aplikační migrace |

Restart síťové služby Windows není první krok diagnostiky.

Nejprve se ověří mapování portu a naslouchání aplikace.

## Docker Desktop a WSL 2 ve Windows

Tento postup ověřuje používání linuxových kontejnerů Docker Desktopu z vlastní distribuce WSL, například Ubuntu.

### Proč jsou v Průzkumníku Ubuntu i docker-desktop

V části **Linux** v Průzkumníku Windows mohou být obě distribuce současně:

| Distribuce | Účel |
|---|---|
| `Ubuntu-22.04` | Vlastní Linux prostředí pro projekty, Bash, Git a správu balíčků. Může být nainstalované běžně nebo importované z RootFS. |
| `docker-desktop` | Interní distribuce vytvořená a spravovaná Docker Desktopem, ve které běží Docker Engine. |

Zapnutá **WSL Integration** umožní zadávat příkazy `docker` z Ubuntu a používat engine spravovaný Docker Desktopem.

Ubuntu přitom není pro samotný běh Docker Desktopu povinné.

Docker lze používat také přímo z terminálu Windows.

Přítomnost obou distribucí není chyba ani důvod jednu smazat.

Do `docker-desktop` se běžně ručně nezasahuje. [Jak funguje integrace WSL](https://docs.docker.com/desktop/features/wsl/)

<a id="1-zkontroluj-distribuce-a-verzi-wsl"></a>

### 1. Kontrola distribucí a verze WSL

Ve **Windows PowerShellu nebo CMD**:

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

`Stopped` znamená zastavenou distribuci, kterou lze spustit.

Hvězdička označuje výchozí distribuci. [Výpis distribucí WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands#list-installed-linux-distributions)

Název `Ubuntu-22.04` je příklad z tohoto prostředí, proto se v dalších příkazech nahradí přesným názvem z vlastního výpisu.

<a id="2-zapni-integraci-pro-ubuntu"></a>

### 2. Zapnutí integrace pro Ubuntu

1. Po spuštění Docker Desktopu se vyčká na spuštění enginu.
2. V **Settings → General** se zapne **Use WSL 2 based engine**, pokud se tato volba zobrazuje.
3. V **Settings → Resources → WSL Integration** se zapne distribuce Ubuntu a potvrdí **Apply**.

Chybějící nabídka WSL Integration vede ke kontrole režimu kontejnerů a případně k volbě **Switch to Linux containers** v nabídce Docker Desktopu.

Pro tuto variantu se do Ubuntu neinstaluje další samostatný Docker Engine nebo Docker CLI, protože může s integrací Docker Desktopu kolidovat. [Nastavení integrace](https://docs.docker.com/desktop/features/wsl/#enable-docker-in-a-wsl-2-distribution)

<a id="3-ověř-spojení-s-enginem-a-spuštění-kontejneru"></a>

### 3. Ověření spojení s enginem a spuštění kontejneru

Ve **Windows PowerShellu nebo CMD** se otevře Ubuntu:

```text
wsl --distribution Ubuntu-22.04
```

Následující příkaz už běží **uvnitř Ubuntu**:

```text
docker version
```

Výpis má obsahovat části **Client** i **Server** bez chyby připojení.

Samotné `docker --version` ukazuje pouze verzi klienta. [Význam výstupu docker version](https://docs.docker.com/reference/cli/docker/version/)

Pak se ve stejném terminálu Ubuntu spustí testovací kontejner:

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

Při použití vzdáleného Dockeru se připojení ověří přes `docker context ls` a případné proměnné `DOCKER_HOST` nebo `DOCKER_CONTEXT`.

Úspěšný test se vztahuje k připojenému enginu. [Docker kontexty](https://docs.docker.com/engine/manage-resources/contexts/)

Z Ubuntu vrátí do terminálu Windows příkaz `exit`.

### Kam patří docker_data.vhdx

`docker_data.vhdx` je samostatný datový disk Docker Desktopu.

Obsahuje Docker images, kontejnery, pojmenované volumes a build cache.

Ubuntu má vlastní souborový systém a vlastní virtuální disk, takže záloha `docker_data.vhdx` nepatří do Ubuntu a nenahrazuje její disk.

Soubory připojené do kontejnerů pomocí bind mountů zůstávají ve zdrojových složkách Windows nebo Ubuntu a vyžadují vlastní zálohu. [Ukládání pomocí bind mountů](https://docs.docker.com/engine/storage/bind-mounts/)

Vlastní Ubuntu se přenáší [exportem a importem distribuce WSL](../wsl.md#přesun-wsl-distribuce-na-jiné-místo).

Pro datový disk Dockeru platí následující postup.

Úspěšné `hello-world` potvrzuje spuštění kontejneru, nikoli obnovu původních images, kontejnerů nebo dat aplikací.

### Přenos dat Docker Desktopu na jiný počítač

Tento postup je určený pro **Docker Desktop s backendem WSL 2 ve Windows, který ukládá data do souboru `docker_data.vhdx`**.

Záloha vzniká zkopírováním vypnutého datového disku a obnova jeho vložením do datového umístění cílové instalace podle [oficiálního postupu Dockeru](https://docs.docker.com/desktop/settings-and-maintenance/backup-and-restore/#if-docker-desktop-fails-to-start-or-you-want-to-back-up-the-whole-docker-desktop-vm).

Počítá se se stejnou architekturou obou počítačů, například x64.

Pro první obnovení doporučuji stejnou verzi Docker Desktopu jako na zdroji, aby se přenos nespojoval také s upgradem.

Obnova **nahradí současná Docker data na cíli**.

Nesloučí dvě existující prostředí.

Příkazy pro práci s datovým diskem se zadávají ve **Windows PowerShellu** pod účtem, který Docker Desktop používá.

Uvedené cesty jsou příklady, které se nahradí podle skutečných disků a složek.

<details>
<summary>Zdrojový počítač: záloha Docker dat</summary>

#### 1. Stav a skutečné umístění disku

V **About Docker Desktop** se poznamená verze aplikace a při spuštěném enginu se zaznamená, co má být po obnově k dispozici:

```text
docker context ls
docker image ls
docker container ls --all
docker volume ls
```

Klient musí používat místní Linux engine Docker Desktopu, protože výpis vzdáleného enginu by nepopisoval zálohovaný disk.

Datový soubor v běžném kořenovém adresáři Dockeru vyhledá:

```text
Get-ChildItem -LiteralPath "$env:LOCALAPPDATA\Docker\wsl" -Filter 'docker_data.vhdx' -File -Recurse |
    Select-Object FullName, Length
```

Při změněném datovém umístění se hledá v nastavené složce.

Pokud verze zobrazuje **Settings → Resources → Advanced → Disk image location**, ověří se cesta také tam. [Umístění dat backendu WSL](https://docs.docker.com/desktop/features/wsl/)

Pokud soubor chybí nebo není jasné, která nalezená kopie je aktivní, nejprve se ověří datové umístění instalace.

Nejde o disk Ubuntu ani o jiný soubor `ext4.vhdx`.

#### 2. Soubory mimo datový disk a ukončení Dockeru

Samostatně se uchovají Compose soubory, potřebné `.env` a konfigurace i zdrojové složky bind mountů.

Soubory uložené uvnitř vlastní distribuce Ubuntu přenese její export.

Aplikace a databáze se řádně zastaví, aby dokončily zápis.

U projektu spravovaného přes Compose lze v jeho složce použít:

```text
docker compose stop
```

Potom se z nabídky ikony Dockeru u hodin zvolí **Quit Docker Desktop** a vyčká se na úplné ukončení aplikace.

Uloží se také práce ve všech distribucích WSL a zavřou se jejich terminály, protože následující příkaz zastaví všechny distribuce i virtuální stroj WSL 2:

```text
wsl --shutdown
```

Do dokončení kopírování a kontroly se Docker Desktop znovu nespouští.

#### 3. Kopie disku a kontrola zálohy

V proměnné `$dockerDisk` se ukázková cesta nahradí skutečnou cestou z prvního kroku a záloha jde do nové složky na disku s dostatkem místa.

Přenosový disk musí podporovat velikost souboru.

FAT32 neumožňuje soubor větší než 4 GB.

```text
$dockerDisk = 'D:\DockerData\docker_data.vhdx'
New-Item -ItemType Directory -Path 'E:\Prenos\Docker' -ErrorAction Stop
Copy-Item -LiteralPath $dockerDisk -Destination 'E:\Prenos\Docker\docker_data.vhdx' -ErrorAction Stop
Get-FileHash -LiteralPath $dockerDisk -Algorithm SHA256
Get-FileHash -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Algorithm SHA256
```

Obě hodnoty `Hash` musí být shodné.

Zaznamenají se pro kontrolu po přenosu a při neshodě se záloha nepoužije.

Po úspěšném dokončení lze zdrojový Docker Desktop znovu spustit, ale pozdější změny už v této záloze nebudou.

Disk může obsahovat databáze a přístupové údaje aplikací, proto se záloha chrání stejně jako původní data.

</details>

<details>
<summary>Cílový počítač: obnova a ověření Docker dat</summary>

#### 1. Cílová instalace a kontrola přenosu

Přenosový disk se zálohou se připojí nebo se záložní soubor zkopíruje na cílový počítač a cesta v příkazech se upraví podle jeho umístění.

Na cíli se připraví WSL 2 a nainstaluje Docker Desktop pro linuxové kontejnery.

První spuštění vytvoří jeho datové umístění.

Skutečná cesta cílového `docker_data.vhdx` se zjistí stejně jako na zdroji.

Existující prostředí na cíli vyžaduje řádné zastavení jeho aplikací a databází.

Potom se Docker Desktop úplně ukončí přes **Quit Docker Desktop**.

Po uložení práce ve všech distribucích WSL:

```text
wsl --shutdown
Get-FileHash -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Algorithm SHA256
```

Hodnota `Hash` přenesené zálohy musí odpovídat hodnotě zaznamenané na zdroji.

Při neshodě se nepokračuje.

#### 2. Uchování cílového disku a jeho nahrazení zálohou

Proměnná `$cilovyDisk` obsahuje skutečnou cestu cílové instalace a původní cílová data jdou do nové záložní složky.

Po celou dobu kopírování a kontroly musí Docker Desktop zůstat ukončený.

Na disku musí být místo i pro zálohu dosavadních cílových dat.

Nejprve záloha současného cílového disku:

```text
$cilovyDisk = 'D:\DockerData\docker_data.vhdx'
New-Item -ItemType Directory -Path 'D:\Zalohy\Docker-pred-obnovou' -ErrorAction Stop
Copy-Item -LiteralPath $cilovyDisk -Destination 'D:\Zalohy\Docker-pred-obnovou\docker_data.vhdx' -ErrorAction Stop
Get-FileHash -LiteralPath $cilovyDisk -Algorithm SHA256
Get-FileHash -LiteralPath 'D:\Zalohy\Docker-pred-obnovou\docker_data.vhdx' -Algorithm SHA256
```

Teprve když oba kontrolní součty souhlasí, přepíše se cílový datový soubor přenesenou zálohou:

```text
Copy-Item -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Destination $cilovyDisk -ErrorAction Stop
Get-FileHash -LiteralPath $cilovyDisk -Algorithm SHA256
```

Výsledný `Hash` musí souhlasit se zálohou ze zdrojového počítače.

Tato kontrola proběhne ještě před spuštěním Docker Desktopu, který začne disk měnit.

#### 3. Obnova okolních souborů a kontrola dat aplikací

Před spuštěním enginu se obnoví také Compose soubory, konfigurace a zdrojové složky bind mountů do očekávaných cest, protože některé kontejnery se mohou automaticky spustit.

Pokud bind mounty používaly soubory z Ubuntu, nejprve se dokončí jeho import a ověří, že cesty odpovídají obnovenému prostředí.

Po spuštění Docker Desktopu se pro přístup z obnoveného Ubuntu zapne jeho [WSL Integration](#2-zapnutí-integrace-pro-ubuntu).

Nastavení aplikace Docker Desktop a zapnutí integrace se ověřují samostatně.

Kopie datového disku není zálohou nastavení Windows.

```text
docker version
docker image ls
docker container ls --all
docker volume ls
```

Ověří se části **Client** a **Server**, seznamy se porovnají se zdrojem a aplikace se spustí s obnovenou konfigurací.

Pokud se změnily cesty bind mountů nebo název distribuce Ubuntu, opraví se konfigurace a dotčené kontejnery se vytvoří znovu.

U Compose ze správné distribuce a složky projektu:

```text
docker compose up --detach --force-recreate
```

Původní název projektu Compose a názvy volumes zůstávají, aby aplikace použily obnovená data. [Opětovné vytvoření kontejnerů pomocí Compose](https://docs.docker.com/reference/cli/docker/compose/up/)

Kontrolují se konkrétní uložená data, například záznamy v databázi nebo nahrané soubory.

Samotná přítomnost volume ani úspěšné `hello-world` tuto kontrolu nenahrazují.

Původní zálohy zůstávají až do dokončení kontroly.

Při návratu k předchozímu cílovému stavu se Docker Desktop opět úplně ukončí a stejným postupem se vrátí jeho disk ze složky `Docker-pred-obnovou`.

</details>
