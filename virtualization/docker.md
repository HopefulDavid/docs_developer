# 🗂️ Docker – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, příkazů, konfigurace a doporučení pro práci s Dockerem na Windows.

---

## 📖 Co je Docker?

* **Platforma pro vývoj, doručování a běh aplikací pomocí kontejnerizace**
* Izoluje aplikace v kontejnerech se všemi závislostmi
* Kontejnery jsou rychlejší a efektivnější než klasická virtualizace

> [!NOTE]
> Pro instalaci Dockeru na Windows je nutné mít nainstalovaný [WSL](wsl.md).

---

## 🧩 Základní pojmy

<details>
<summary><span style="color:#1E90FF;">📦 Dockerfile</span></summary>
Textový soubor s instrukcemi pro vytvoření Docker image.
</details>

<details>
<summary><span style="color:#1E90FF;">🖼️ Docker image</span></summary>
Komprimovaná šablona aplikace, knihoven a binárek pro spuštění kontejneru.
</details>

<details>
<summary><span style="color:#1E90FF;">🚀 Docker run</span></summary>
Příkaz pro spuštění kontejneru z image.
</details>

<details>
<summary><span style="color:#1E90FF;">🌐 Docker hub</span></summary>
Oficiální úložiště pro sdílení Docker image.
</details>

<details>
<summary><span style="color:#1E90FF;">🛠️ Docker engine</span></summary>
Jádro Dockeru, které spravuje kontejnery (klient-server architektura).
</details>

<details>
<summary><span style="color:#1E90FF;">🧩 Docker compose</span></summary>
Definice a správa více kontejnerů pomocí souboru `docker-compose.yml`.
</details>

---

## 🗃️ Soubory Dockeru

<details>
<summary><span style="color:#E95A84;">dockerd.exe</span></summary>
Spouští Docker Daemon, hlavní službu pro správu kontejnerů.
</details>

<details>
<summary><span style="color:#E95A84;">docker.exe</span></summary>
Klientský nástroj pro ovládání Dockeru (např. `docker run`, `docker ps`).
</details>

<details>
<summary><span style="color:#E95A84;">docker-compose.exe</span></summary>
Nástroj pro správu více kontejnerů v jedné aplikaci.
</details>

<details>
<summary><span style="color:#E95A84;">docker-compose.yml</span></summary>
Konfigurační soubor pro definici služeb, obrazů, portů a nastavení kontejnerů.
</details>

---

## 🛠️ Základní příkazy

| 🟦 Kategorie              | 🛠️ Příkaz                               | 📄 Popis                                               |
|---------------------------|------------------------------------------|--------------------------------------------------------|
| 🔍 Zobrazení              | `docker ps`                              | Zobrazí běžící kontejnery                              |
|                           | `docker images`                          | Zobrazí všechny docker image                           |
| 🔄 Aktualizace nastavení  | `docker update --restart=yes <jméno/id>` | Zapne automatické spouštění kontejneru                 |
|                           | `docker update --restart=no <jméno/id>`  | Vypne automatické spouštění kontejneru                 |
| ⬇️ Stažení                | `docker pull <image>`                    | Stáhne docker image                                    |
| 💾 Záloha & obnova        | `docker save -o <cesta>.tar <image/id>`  | Zálohuje image do souboru                              |
|                           | `docker load -i <cesta>.tar`             | Obnoví image ze souboru                                |
| 🛠️ Vytvoření image       | `docker build -t <jméno> .`              | Sestaví image z Dockerfile                             |
| 🚀 Spuštění kontejneru    | `docker run <image>`                     | Spustí kontejner z image                               |
|                           | `docker run -p 70:80 <image>`            | Spustí kontejner na jiném portu                        |
|                           | `docker run --rm <image>`                | Spustí kontejner a smaže ho po ukončení                |
|                           | `docker run -it <image>`                 | Spustí kontejner v interaktivním módu                  |
| 🧩 Docker Compose         | `docker-compose up`                      | Spustí služby z docker-compose (běží v terminálu)      |
|                           | `docker compose up -d`                   | Spustí služby z docker-compose na pozadí               |
|                           | `docker compose down`                    | Zastaví a odstraní všechny kontejnery z docker-compose |
| ⏹️ Zastavení & odstranění | `docker stop <jméno/id>`                 | Zastaví kontejner                                      |
|                           | `docker rm <jméno/id>`                   | Odstraní kontejner                                     |
|                           | `docker rmi <image/id>`                  | Odstraní image                                         |

---

## 📄 Dockerfile – Příklady

<details>
<summary><span style="color:#1E90FF;">.NET Core aplikace</span></summary>

```Docker
FROM mcr.microsoft.com/dotnet/core/runtime:3.1
WORKDIR /app
COPY ./publish .
ENTRYPOINT ["dotnet", "myapp.dll"]
```

</details>

<details>
<summary><span style="color:#1E90FF;">C# aplikace s buildem</span></summary>

```Docker
FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out
ENTRYPOINT ["dotnet", "out/myapp.dll"]
```

</details>

<details>
<summary><span style="color:#1E90FF;">Lokální NuGet balíčky</span></summary>

```Docker
FROM mcr.microsoft.com/dotnet/core/sdk:3.1
WORKDIR /app
COPY . .
RUN dotnet restore --source ./nuget
RUN dotnet publish -c Release -o out
ENTRYPOINT ["dotnet", "out/myapp.dll"]
```

</details>

---

## 📦 Volumes & data

<details>
<summary><span style="color:#1E90FF;">Propojení složky z Windows s kontejnerem</span></summary>

| Nastavení         | Cesta                                                                       | Popis                              |
|-------------------|-----------------------------------------------------------------------------|------------------------------------|
| Host/Volume       | `/run/desktop/mnt/host/c/Program Files/Unity/Hub/Editor/6000.0.33f1/Editor` | Cesta ke složce na hostitelském PC |
| Path in container | `/app/unity`                                                                | Cesta uvnitř Docker kontejneru     |

</details>

<details>
<summary><span style="color:#1E90FF;">Zachování dat z kontejneru na lokálním disku</span></summary>
<img src="/../images/dockerKeepDataOnLocal.png" alt="dockerKeepDataOnLocal.png" width="800px"/>
</details>

---


## 🗂️ Získání dat z Dockeru

<details>
<summary><span style="color:#1E90FF;">Export databázového schématu</span></summary>

```cmd
docker exec -t supabase-db pg_dump -U postgres -s postgres > D:\schema.sql
```

Tento příkaz otevře terminál pro Docker kontejner s názvem **supabase-db** a vyexportuje schema databáze do souboru:

```
D:\schema.sql
```

> [!WARNING]
> Pro `sqlc generate`, je potřeba upravit obsah (viz níže).
> 
> Odstraň nebo zakomentuj řádek v souboru `schema.sql` začínající na:
>
>```
>\unrestrict
>```

</details>

---

## 🛡️ Řešení problémů

<details>
<summary><span style="color:#1E90FF;">Port není dostupný</span></summary>

Restartujte službu Windows NAT:

```cmd
net stop winnat
net start winnat
```

> [!NOTE]
> Uvolní zablokované síťové porty pro Docker kontejnery.

</details>