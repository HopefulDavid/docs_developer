# Portainer – místní správa Dockeru

Portainer poskytuje webové rozhraní pro správu kontejnerů, image, sítí a volumes.

## Před použitím

Příklad předpokládá linuxový Docker engine s Unix socketem `/var/run/docker.sock`, například Docker Desktop v režimu linuxových kontejnerů.

Přístup k socketu dává Portaineru rozsáhlou kontrolu nad enginem; přístup k webovému rozhraní proto patří správcům.

## Praktické spuštění

Pro novou instalaci v PowerShellu nebo Bashi:

```bash
docker volume create portainer_data
docker run --detach --name portainer --restart=unless-stopped --publish 127.0.0.1:9443:9443 --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock --mount type=volume,src=portainer_data,dst=/data portainer/portainer-ce:lts
```

`portainer_data` uchovává konfiguraci mezi vytvořeními kontejneru, socket propojuje správu enginu a port `9443` nabízí HTTPS pouze místnímu počítači.

`lts` je pohyblivý kanál z instalační dokumentace; pro řízené nasazení zvol konkrétní ověřený tag nebo digest. [Instalace Portainer CE](https://docs.portainer.io/start/install-ce/server/docker/linux)

## První přihlášení a ověření

1. Otevři `https://localhost:9443` na hostiteli enginu.
2. Ověř certifikát vlastní instalace; výchozí certifikát je podepsaný sám sebou, pro důvěryhodné prostředí nastav vlastní TLS certifikát.
3. Pokud verze žádá setup token, načti jej lokálně přes `docker logs portainer` a nesdílej tento výpis.
4. Vytvoř správce, připoj místní prostředí a porovnej seznam kontejnerů s `docker container ls --all`.

Novější instalace chrání úvodní nastavení jednorázovým tokenem. [Setup token](https://docs.portainer.io/faqs/installing/setup-token)

## Co lze upravit

Pokud je místní port obsazený, změň v mapování první `9443`, například na `9543`, a použij odpovídající URL.

Port `8000` není pro tento místní příklad potřeba; používá se pro Edge funkce.

## Řešení problémů

| Projev | Ověření |
|---|---|
| Název portainer již existuje | Prohlédni existující kontejner; instalaci nepřepisuj bez zálohy |
| Rozhraní není dostupné | Stav `docker container ls --all`, mapování portu a log |
| Nelze připojit engine | Režim kontejnerů a skutečné umístění socketu |

Upgrade konfigurace připrav podle [postupu pro stateful služby](safe-stateful-upgrade.md).
