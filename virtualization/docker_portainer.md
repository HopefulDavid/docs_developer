# Portainer – Praktický průvodce & tipy

> Moderní přehled spuštění, parametrů a doporučení pro práci s Portainerem v Dockeru.

---

## Co je Portainer?

- **Webové rozhraní pro správu Docker kontejnerů**
- Umožňuje snadnou správu, monitoring a konfiguraci kontejnerů, image, volume a sítí
- Podporuje Docker, Docker Swarm, Kubernetes

> [!NOTE]
> Portainer výrazně zjednodušuje správu Docker prostředí.

---

## Spuštění Portaineru

<details>
<summary>Krok 1: Spuštění kontejneru</summary>

```cmd
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.27.5
```

| Parametr                       | Význam                                                                 |
|---------------------------------|------------------------------------------------------------------------|
| `-d`                           | Spustí kontejner na pozadí                                             |
| `-p 9000:9000`                  | Mapuje port 9000 hostitele na port 9000 v kontejneru                   |
| `--name portainer`              | Pojmenuje kontejner jako "portainer"                                   |
| `--restart always`              | Automatický restart při chybě nebo restartu hostitele                  |
| `-v /var/run/docker.sock:/var/run/docker.sock` | Umožňuje Portaineru komunikovat s Docker daemonem         |
| `-v portainer_data:/data`       | Ukládá data Portaineru do trvalého úložiště (Volume)                   |
| `portainer/portainer-ce:2.27.5` | Použitý Docker image Portaineru                                        |

</details>

---

## Přístup k Portaineru

<details>
<summary>Krok 2: Otevření webového rozhraní</summary>

- Po spuštění kontejneru otevřete prohlížeč a zadejte:
  `http://localhost:9000`
- Nastavte administrátorské heslo a připojte se k Docker endpointu.

</details>

---

## Řešení problémů

<details>
<summary>Port 9000 je obsazený</summary>

- Změňte port v příkazu, např.:
  ```cmd
  docker run -d -p 9100:9000 ...
  ```
- Ověřte, zda není jiný kontejner na stejném portu:
  ```cmd
  docker ps
  ```
</details>

<details>
<summary>Chyba při připojení k Docker daemonu</summary>

- Ověřte, že Docker běží a máte správně namapovaný `docker.sock`.
- Zkontrolujte oprávnění k souboru `/var/run/docker.sock`.
</details>