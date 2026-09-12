# Docker – kontejnery, příkazy a data

Docker spouští aplikace v izolovaných kontejnerech vytvořených z image; kontejner sdílí jádro hostitelského systému, zatímco jeho soubory a procesy mají vlastní prostředí.

## Jak Docker funguje

| Pojem | Význam |
|---|---|
| Image | Vrstvená šablona aplikace a jejích závislostí |
| Kontejner | Konkrétní spuštěná nebo zastavená instance image |
| Dockerfile | Předpis pro sestavení image |
| Engine | Služba, která spravuje kontejnery; CLI se k ní připojuje |
| Registry | Úložiště image, například Docker Hub |
| Compose | Popis více služeb a jejich propojení v `compose.yaml` |
| Volume | Datové úložiště spravované Dockerem mimo životnost kontejneru |
| Bind mount | Připojení konkrétní složky hostitele do kontejneru |

Docker Desktop spouští linuxový engine ve Windows prostřednictvím virtualizovaného prostředí; více o [WSL](../wsl.md).

## Před použitím

Nainstaluj Docker Desktop, přepni jej na linuxové kontejnery a ověř běžící engine:

```bash
docker version
docker context ls
```

`version` musí ukázat klienta i server; aktivní kontext určuje, který engine příkazy ovládají, včetně případného vzdáleného serveru.

Jednořádkové příkazy níže fungují v PowerShellu i Bashi; první stažení image vyžaduje síť.

## Praktické použití

```bash
# Spustí jednorázový test a po skončení odstraní jeho kontejner.
docker run --rm hello-world
```

Očekávej text `Hello from Docker!`; image zůstane na disku.

Pro lokální webový server:

```bash
docker run --detach --name docs-web --publish 127.0.0.1:8080:80 nginx:stable-alpine
docker container ls
docker logs docs-web
```

Otevři `http://127.0.0.1:8080`; port `8080` patří tvému počítači a `80` serveru v kontejneru.

Vazba na `127.0.0.1` omezuje přístup na místní počítač; název a vnější port můžeš změnit.

```bash
# Ukončení tohoto příkladu; nepřidávej sem mazání jiných kontejnerů.
docker stop docs-web
docker rm docs-web
```

Tag `stable-alpine` je pohyblivý; pro reprodukovatelné nasazení zvol ověřenou konkrétní verzi nebo digest. [Spuštění kontejneru](https://docs.docker.com/reference/cli/docker/container/run/)

## Příkazy a restartování

| Úkol | Příkaz | Význam |
|---|---|---|
| Všechny kontejnery | `docker container ls --all` | Zahrne i zastavené |
| Místní image | `docker image ls` | Šablony dostupné na enginu |
| Restartovací pravidlo | `docker update --restart=unless-stopped docs-web` | Obnovuje běh s výjimkou ručně zastaveného kontejneru |
| Vypnutí restartování | `docker update --restart=no docs-web` | Vyžaduje ruční spuštění |
| Export image | `docker save --output web-image.tar nginx:stable-alpine` | Uchová image, nikoli data volumes |
| Import image | `docker load --input web-image.tar` | Načte uloženou image |
| Compose konfigurace | `docker compose config --quiet` | Ověří a sloučí konfigurační vstupy |
| Spuštění služeb | `docker compose up --detach` | Vytvoří nebo aktualizuje služby definované Compose |
| Ukončení projektu | `docker compose down` | Odstraní jeho kontejnery a běžné projektové sítě |

Příkazy pro `docs-web` vyžadují existující kontejner z příkladu; restartovací politika `yes` neexistuje. [Restartovací pravidla](https://docs.docker.com/engine/containers/start-containers-automatically/)

## Dockerfile pro konzolovou aplikaci .NET 10

Ve složce s jediným konzolovým projektem cíleným na `net10.0` vytvoř `Dockerfile`:

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

`MojeAplikace.dll` nahraď názvem assembly svého projektu; u ASP.NET Core použij odpovídající `aspnet` image a nastav naslouchání a porty aplikace.

Do `.dockerignore` přidej:

```text
bin/
obj/
.git/
.env
```

Tím vynecháš místní výstupy a běžný soubor tajných hodnot z kontextu sestavení; další soukromé soubory vyluč podle projektu.

```bash
docker build --tag moje-aplikace:local .
docker run --rm moje-aplikace:local
```

Samostatná tečka za mezerou určuje kontext sestavení; výstup má odpovídat lokálnímu běhu aplikace. [Microsoft: .NET v Dockeru](https://learn.microsoft.com/en-us/dotnet/core/docker/build-container)

Pokud už máš publikovaný výstup, stačí runtime fáze s `COPY ./publish .`; lokální NuGet zdroj přidej do projektového `NuGet.Config` a zahrň potřebné balíčky do kontextu, ale ne jeho přihlašovací údaje.

## Volumes a zálohy

Změny ve zapisovatelné vrstvě kontejneru zmizí při jeho odstranění; data potřebná mezi vytvořeními ukládej do volume nebo bind mountu.

Pojmenované volumes běžné `docker compose down` zachová; přidáním `--volumes` bys je odstranil.

[Záloha a zkušební obnova volume](busybox.md) vysvětluje rozdíl mezi archivem, kontrolou přenosu a skutečnou obnovou.

Pro aktualizace databázových služeb pokračuj [bezpečným upgradem](safe-stateful-upgrade.md).

### Export schématu PostgreSQL z kontejneru

Následující příklad předpokládá běžící kontejner `supabase-db`, klienta `pg_dump`, databázi `postgres` a platné přihlašování uvnitř kontejneru:

```bash
docker exec supabase-db pg_dump -U postgres -d postgres --schema-only --file=/tmp/schema.sql
docker cp supabase-db:/tmp/schema.sql ./schema.sql
```

Příkazy spusť postupně a při chybě exportu nepokračuj; `--schema-only` ukládá strukturu bez řádků dat.

Výstup nevede přes terminál s pseudo-TTY ani přes překódování shellu.

Při importu do nástroje jako sqlc ověř podporu formátu dumpu a verze PostgreSQL; příkazy `psql` z exportu neodstraňuj bez posouzení kompatibility. [Pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)

## Řešení problémů

| Projev | Co zkontrolovat |
|---|---|
| Chybí část Server | Běh Docker Desktopu a aktivní kontext |
| Port je obsazený | Zvol volný vnější port a správnou URL |
| Kontejner se ukončil | `docker container ls --all` a jeho log |
| Po aktualizaci chybí data | Jméno Compose projektu, připojené volumes a aplikační migrace |

Restart síťové služby Windows není první krok diagnostiky; nejprve ověř mapování portu a naslouchání aplikace.

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

Vlastní Ubuntu přenes pomocí [exportu a importu distribuce WSL](../wsl.md#přesun-wsl-distribuce-na-jiné-místo); pro datový disk Dockeru použij následující postup.

Úspěšné `hello-world` potvrzuje spuštění kontejneru, nikoli obnovu původních images, kontejnerů nebo dat aplikací.

### Přenos dat Docker Desktopu na jiný počítač

Tento postup je určený pro **Docker Desktop s backendem WSL 2 ve Windows, který ukládá data do souboru `docker_data.vhdx`**.

Záloha vzniká zkopírováním vypnutého datového disku a obnova jeho vložením do datového umístění cílové instalace podle [oficiálního postupu Dockeru](https://docs.docker.com/desktop/settings-and-maintenance/backup-and-restore/#if-docker-desktop-fails-to-start-or-you-want-to-back-up-the-whole-docker-desktop-vm).

Počítá se se stejnou architekturou obou počítačů, například x64; pro první obnovení doporučuji stejnou verzi Docker Desktopu jako na zdroji, aby se přenos nespojoval také s upgradem.

Obnova **nahradí současná Docker data na cíli**; nesloučí dvě existující prostředí.

Příkazy pro práci s datovým diskem zadávej ve **Windows PowerShellu** pod účtem, který Docker Desktop používá; uvedené cesty jsou příklady, které nahraď podle svých disků a složek.

<details>
<summary>Zdrojový počítač: záloha Docker dat</summary>

#### 1. Poznamenej si stav a skutečné umístění disku

V **About Docker Desktop** si poznamenej verzi aplikace a při spuštěném enginu zaznamenej, co chceš po obnově najít:

```text
docker context ls
docker image ls
docker container ls --all
docker volume ls
```

Ověř, že klient používá místní Linux engine Docker Desktopu, protože výpis vzdáleného enginu by nepopisoval zálohovaný disk.

Datový soubor v běžném kořenovém adresáři Dockeru vyhledáš takto:

```text
Get-ChildItem -LiteralPath "$env:LOCALAPPDATA\Docker\wsl" -Filter 'docker_data.vhdx' -File -Recurse |
    Select-Object FullName, Length
```

Pokud jsi datové umístění změnil, hledej v nastavené složce; jestli tvoje verze zobrazuje **Settings → Resources → Advanced → Disk image location**, ověř cestu také tam. [Umístění dat backendu WSL](https://docs.docker.com/desktop/features/wsl/)

Pokud soubor nenajdeš nebo nevíš, která nalezená kopie je aktivní, nejprve ověř datové umístění své instalace; nezaměňuj jej za disk Ubuntu ani za jiný soubor `ext4.vhdx`.

#### 2. Připrav soubory mimo datový disk a ukonči Docker

Samostatně uchovej Compose soubory, potřebné `.env` a konfigurace i zdrojové složky bind mountů; soubory uložené uvnitř vlastní distribuce Ubuntu přenese její export.

Řádně zastav své aplikace a databáze, aby dokončily zápis; u projektu spravovaného přes Compose lze v jeho složce použít:

```text
docker compose stop
```

Potom z nabídky ikony Dockeru u hodin zvol **Quit Docker Desktop** a počkej na úplné ukončení aplikace.

Ulož také práci ve všech distribucích WSL a zavři jejich terminály, protože následující příkaz zastaví všechny distribuce i virtuální stroj WSL 2:

```text
wsl --shutdown
```

Do dokončení kopírování a kontroly znovu nespouštěj Docker Desktop.

#### 3. Zkopíruj disk a ověř zálohu

V proměnné `$dockerDisk` nahraď ukázkovou cestu skutečnou cestou z prvního kroku a pro zálohu zvol novou složku na disku s dostatkem místa.

Přenosový disk musí podporovat velikost souboru; FAT32 neumožňuje soubor větší než 4 GB.

```text
$dockerDisk = 'D:\DockerData\docker_data.vhdx'
New-Item -ItemType Directory -Path 'E:\Prenos\Docker' -ErrorAction Stop
Copy-Item -LiteralPath $dockerDisk -Destination 'E:\Prenos\Docker\docker_data.vhdx' -ErrorAction Stop
Get-FileHash -LiteralPath $dockerDisk -Algorithm SHA256
Get-FileHash -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Algorithm SHA256
```

Obě hodnoty `Hash` musí být shodné; zaznamenej si je pro kontrolu po přenosu a při neshodě zálohu nepoužívej.

Po úspěšném dokončení můžeš zdrojový Docker Desktop znovu spustit, ale pozdější změny už v této záloze nebudou.

Disk může obsahovat databáze a přístupové údaje aplikací, proto zálohu chraň stejně jako původní data.

</details>

<details>
<summary>Cílový počítač: obnova a ověření Docker dat</summary>

#### 1. Připrav cílovou instalaci a ověř přenos

Připoj přenosový disk se zálohou nebo zkopíruj záložní soubor na cílový počítač a podle jeho umístění uprav cestu v příkazech.

Připrav WSL 2 a nainstaluj Docker Desktop pro linuxové kontejnery; prvním spuštěním nech vytvořit jeho datové umístění.

Zjisti skutečnou cestu cílového `docker_data.vhdx` stejným způsobem jako na zdroji.

Pokud na cíli už máš vlastní prostředí, řádně zastav jeho aplikace a databáze; potom Docker Desktop úplně ukonči přes **Quit Docker Desktop**.

Po uložení práce ve všech distribucích WSL spusť:

```text
wsl --shutdown
Get-FileHash -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Algorithm SHA256
```

Hodnota `Hash` přenesené zálohy musí odpovídat hodnotě zaznamenané na zdroji; při neshodě nepokračuj.

#### 2. Uchovej cílový disk a nahraď ho zálohou

V proměnné `$cilovyDisk` nastav skutečnou cestu cílové instalace a pro původní cílová data zvol novou záložní složku.

Po celou dobu kopírování a kontroly musí Docker Desktop zůstat ukončený; na disku musí být místo i pro zálohu dosavadních cílových dat.

Nejprve zazálohuj současný cílový disk:

```text
$cilovyDisk = 'D:\DockerData\docker_data.vhdx'
New-Item -ItemType Directory -Path 'D:\Zalohy\Docker-pred-obnovou' -ErrorAction Stop
Copy-Item -LiteralPath $cilovyDisk -Destination 'D:\Zalohy\Docker-pred-obnovou\docker_data.vhdx' -ErrorAction Stop
Get-FileHash -LiteralPath $cilovyDisk -Algorithm SHA256
Get-FileHash -LiteralPath 'D:\Zalohy\Docker-pred-obnovou\docker_data.vhdx' -Algorithm SHA256
```

Teprve když oba kontrolní součty souhlasí, přepiš cílový datový soubor přenesenou zálohou:

```text
Copy-Item -LiteralPath 'E:\Prenos\Docker\docker_data.vhdx' -Destination $cilovyDisk -ErrorAction Stop
Get-FileHash -LiteralPath $cilovyDisk -Algorithm SHA256
```

Výsledný `Hash` musí souhlasit se zálohou ze zdrojového počítače; tuto kontrolu proveď ještě před spuštěním Docker Desktopu, který začne disk měnit.

#### 3. Obnov okolní soubory a zkontroluj data aplikací

Před spuštěním enginu obnov také Compose soubory, konfigurace a zdrojové složky bind mountů do očekávaných cest, protože některé kontejnery se mohou automaticky spustit.

Pokud bind mounty používaly soubory z Ubuntu, nejprve dokonči jeho import a ověř, že cesty odpovídají obnovenému prostředí.

Spusť Docker Desktop a pro přístup z obnoveného Ubuntu zapni jeho [WSL Integration](#2-zapni-integraci-pro-ubuntu).

Nastavení aplikace Docker Desktop a zapnutí integrace ověř samostatně; kopie datového disku není zálohou nastavení Windows.

```text
docker version
docker image ls
docker container ls --all
docker volume ls
```

Ověř části **Client** a **Server**, porovnej seznamy se zdrojem a spusť své aplikace s obnovenou konfigurací.

Pokud se změnily cesty bind mountů nebo název distribuce Ubuntu, oprav konfiguraci a znovu vytvoř dotčené kontejnery; u Compose spusť ze správné distribuce a složky projektu:

```text
docker compose up --detach --force-recreate
```

Zachovej původní název projektu Compose a názvy volumes, aby aplikace použily obnovená data. [Opětovné vytvoření kontejnerů pomocí Compose](https://docs.docker.com/reference/cli/docker/compose/up/)

Zkontroluj konkrétní uložená data, například záznamy v databázi nebo nahrané soubory; samotná přítomnost volume ani úspěšné `hello-world` tuto kontrolu nenahrazují.

Původní zálohy ponech do dokončení kontroly; při návratu k předchozímu cílovému stavu Docker Desktop opět úplně ukonči a stejným postupem vrať jeho disk ze složky `Docker-pred-obnovou`.

</details>
