## Spuštění portainer

```cmd
docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.27.5
```

> [!NOTE]
> - `-d` = Spustí kontejner na pozadí.
>
> - `-p 9000:9000` = Mapuje port 9000 na hostitelském stroji na port 9000 v kontejneru.
>
> - `--name portainer` = Pojmenuje kontejner "portainer".
>
> - `--restart always` = Kontejner se automaticky restartuje, pokud dojde k chybě nebo po restartu hostitelského stroje.
>
> - `-v /var/run/docker.sock:/var/run/docker.sock` = Umožňuje portaineru komunikovat s docker daemonem.
>
> - `-v portainer_data:/data` = Ukládá data portaineru do trvalého úložiště (Volume)
>
> - `portainer/portainer-ce:2.27.5` = Název docker image pro portainer.