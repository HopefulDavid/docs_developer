# 🗂️ Docker – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, příkazů, konfigurace a doporučení pro práci s Dockerem na Windows.

---

## 📖 Co je Docker?

- **Platforma pro vývoj, doručování a běh aplikací pomocí kontejnerizace**
- Izoluje aplikace v kontejnerech se všemi závislostmi
- Kontejnery jsou rychlejší a efektivnější než klasická virtualizace

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

<details>
<summary><span style="color:#1E90FF;">🔍 Zobrazení</span></summary>

- Zobrazit běžící kontejnery
  ```Docker
  docker ps
  ```
- Zobrazit všechny docker image
  ```Docker
  docker images
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Aktualizace nastavení</span></summary>

- Zapnout automatické spouštění
  ```Docker
  docker update --restart=yes <container name or id>
  ```
- Vypnout automatické spouštění
  ```Docker
  docker update --restart=no <container name or id>
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">⬇️ Stažení</span></summary>

- Stáhnout docker image
  ```Docker
  docker pull <Image name>
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">💾 Záloha & obnova</span></summary>

- Zálohovat image
  ```Docker
  docker save -o <path to tar file> <docker image name or id>
  ```
- Obnovit image
  ```Docker
  docker load -i <path to tar file>
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🛠️ Vytvoření image</span></summary>

- Sestavit image
  ```Docker
  docker build -t myapp .
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🚀 Spuštění kontejneru</span></summary>

- Spustit služby z docker-compose
  ```Docker
  docker-compose up
  ```
- Spustit kontejner z image
  ```Docker
  docker run kitematic/hello-world-nginx
  ```
- Spustit na jiném portu
  ```Docker
  docker run -p 70:80 kitematic/hello-world-nginx
  ```
- Spustit a smazat po ukončení
  ```Docker
  docker run --rm kitematic/hello-world-nginx
  ```
- Spustit v interaktivním módu
  ```Docker
  docker run -it kitematic/hello-world-nginx
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🧩 Spuštění více kontejnerů</span></summary>

Příklad souboru `docker-compose.yaml`:
```yaml
version: '3.4'
services:
  webapp:
    image: mcr.microsoft.com/dotnet/core/samples:aspnetapp
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:80"
```
</details>

<details>
<summary><span style="color:#1E90FF;">⏹️ Zastavení & odstranění</span></summary>

- Zastavit kontejner
  ```Docker
  docker stop <docker container name or id>
  ```
- Odstranit kontejner
  ```Docker
  docker rm <container name or id>
  ```
- Odstranit image
  ```Docker
  docker rmi <docker image name or id>
  ```
</details>

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