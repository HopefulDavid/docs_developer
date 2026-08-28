# Bezpečný upgrade stateful služby v Docker Compose

> Opakovatelný postup pro aktualizaci kontejnerové služby s databází a persistentními volumes tak, aby existoval ověřený bod obnovy a jasná kontrola výsledku.

## Cíl postupu

Stateful služba neukládá důležitá data do kontejneru, ale do databáze, pojmenovaných Docker volumes nebo bind mountů. Samotné znovuvytvoření kontejneru je proto běžné; riziková je změna datového formátu nebo databázového schématu při startu nové verze.

> [!WARNING]
> Úspěšný `docker compose up -d` nepotvrzuje, že aplikace zachovala data, dokončila migrace a fungují její pomocné služby. Upgrade je hotový až po kontrole dat, health stavu a logů.

## Základní pravidla

- Používej konkrétní verzi image, například `16.0.2-rootless`, nikoli `latest` ani pouze hlavní verzi.
- Předem přečti release notes, breaking changes a podporovanou cestu upgradu.
- Záloha musí být mimo produkční volume a musí projít kontrolou čitelnosti.
- Před zálohou zastav všechny služby, které zapisují do aplikačních dat. Databázi lze při logickém dumpu ponechat běžet.
- Nekopíruj živý datový adresář PostgreSQL jako běžné soubory. Použij `pg_dump`, databázový snapshot nebo databázi korektně zastav.
- Nepoužívej `docker compose down -v`, `docker volume rm` ani jiné příkazy odstraňující volumes.
- Po databázové migraci nespouštěj starou aplikaci proti nové databázi. Rollback obvykle vyžaduje obnovu aplikace i databáze ze stejného bodu.

## 1. Připrav změnu bez zásahu do runtime

V Compose souboru nejprve připni cílové image na konkrétní verze:

```yaml
services:
  app:
    image: registry.example/app:2.4.1
  runner:
    image: registry.example/runner:5.2.0
```

Ověř existenci tagu v registru a výslednou Compose konfiguraci:

```powershell
docker manifest inspect registry.example/app:2.4.1
docker compose -f docker-compose.yaml config --quiet
```

Pokud stack používá environment-specific overrides, validuj každou variantu:

```powershell
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml config --quiet
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml config --quiet
```

## 2. Zaznamenej výchozí stav

Před odstávkou ulož nebo alespoň zkontroluj:

```powershell
docker compose -f docker-compose.yaml ps -a
docker inspect app --format 'image={{.Config.Image}} status={{.State.Status}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}'
docker inspect db --format 'image={{.Config.Image}} status={{.State.Status}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}'
docker volume inspect app_data app_db_data --format '{{.Name}} created={{.CreatedAt}} mount={{.Mountpoint}}'
docker system df
```

Zjisti také:

- které kontejnery mohou zapisovat do dat;
- které volumes obsahují nenahraditelná data a které jsou pouze cache;
- kolik je uživatelů, repozitářů nebo jiných hlavních objektů;
- zda je na zálohovacím disku dostatek volného místa;
- zda právě neběží background job, import nebo CI workflow.

## 3. Vytvoř konzistentní a ověřenou zálohu

### Připrav samostatný adresář

```powershell
$backupStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupPath = "D:\Záloha\docker\manual\app\pre-2.4.1-$backupStamp"
New-Item -ItemType Directory -Path $backupPath -Force
```

Adresář nesmí ležet uvnitř produkčního volume. Časové razítko brání nechtěnému přepsání předchozí zálohy.

### Zastav zapisující služby

Nejprve zastav runner, worker a aplikaci. PostgreSQL ponech běžet a zdravý, aby mohl vytvořit konzistentní logický dump:

```powershell
docker compose -f docker-compose.yaml stop runner worker app
docker inspect db --format 'status={{.State.Status}} health={{.State.Health.Status}}'
```

Pokud záloha před nasazením selže, spusť původní již existující kontejnery příkazem `docker start`. Nepoužívej automaticky `docker compose up`, pokud Compose soubor už ukazuje na novou verzi.

### Zálohuj PostgreSQL

Následující příklad využívá proměnné uložené uvnitř databázového kontejneru a nevypisuje heslo:

```powershell
docker exec db sh -ec 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc -f /tmp/pre-upgrade.dump; pg_restore -l /tmp/pre-upgrade.dump >/dev/null'
docker cp db:/tmp/pre-upgrade.dump "$backupPath\database.dump"
docker exec db rm -f /tmp/pre-upgrade.dump
```

Formát `-Fc` lze kontrolovat i obnovovat pomocí `pg_restore`. Úspěšný `pg_restore -l` potvrzuje, že dump má čitelný katalog.

### Zálohuj aplikační volumes

Zdrojový volume připoj pouze pro čtení a pomocný image také připni na konkrétní verzi:

```powershell
docker run --rm --entrypoint sh `
  -v app_data:/source:ro `
  -v "${backupPath}:/backup" `
  busybox:1.37.0-glibc `
  -ec 'tar -czf /backup/app_data.tar.gz -C /source .'
```

Stejným způsobem zálohuj další nenahraditelné volumes, například identitu runneru. Image cache, build cache a Actions cache obvykle není nutné zálohovat.

### Ověř soubory a jejich kontrolní součty

```powershell
$hashes = Get-ChildItem -LiteralPath $backupPath -File | Get-FileHash -Algorithm SHA256
$hashes | Format-Table Path, Hash
$hashes |
  ForEach-Object { "$($_.Hash) *$([IO.Path]::GetFileName($_.Path))" } |
  Set-Content -LiteralPath (Join-Path $backupPath 'SHA256SUMS')
```

Úplná kontrola čitelnosti archivu:

```powershell
docker run --rm --entrypoint sh `
  -v "${backupPath}:/backup:ro" `
  busybox:1.37.0-glibc `
  -ec 'tar -tzf /backup/app_data.tar.gz >/dev/null; echo ARCHIVE_OK'
```

> [!IMPORTANT]
> Existence souboru nebo nenulová velikost sama o sobě nestačí. Před upgradem musí skončit úspěšně databázová i archivní kontrola.

## 4. Stáhni image a proveď řízené nasazení

Stahuj jen image, kterých se upgrade týká:

```powershell
docker compose -f docker-compose.yaml pull app runner
```

Potom nech Compose znovu vytvořit změněné kontejnery nad existujícími pojmenovanými volumes:

```powershell
docker compose -f docker-compose.yaml up -d
```

`up -d` zachová pojmenované volumes. Přesto zkontroluj výstup: vytvoření nového cache volume je očekávané, vytvoření nového produkčního datového volume obvykle signalizuje chybný název nebo změnu Compose projektu.

## 5. Ověř migrace, data a pomocné služby

### Verze a health stav

```powershell
docker compose -f docker-compose.yaml ps -a
docker exec app app-binary --version
docker inspect app db --format '{{.Name}} status={{.State.Status}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}} restarts={{.RestartCount}}'
```

Pokud aplikace poskytuje health a version endpointy, ověř je nezávisle z hostitele:

```powershell
Invoke-RestMethod 'http://127.0.0.1:3000/api/healthz'
Invoke-RestMethod 'http://127.0.0.1:3000/api/v1/version'
```

### Migrační a chybové logy

```powershell
docker logs --since 10m --tail 300 app
docker logs --since 10m --tail 200 runner
```

V logu hledej:

- úspěšné dokončení všech databázových migrací;
- spuštění HTTP a případně SSH serveru;
- úspěšné přihlášení runneru;
- `error`, `fatal`, `panic`, `permission denied` a opakované restarty.

### Zachování dat

Porovnej původní a nový počet hlavních objektů. U Git služby lze například porovnat počet záznamů v databázi s počtem adresářů repozitářů na volume. Zkontroluj také, že produkční volumes mají stejné datum vytvoření a mountpoint jako před upgradem.

## Oprávnění nového volume pro neprivilegovaný kontejner

Nový pojmenovaný volume bývá vlastněný uživatelem `root`. Aplikace běžící například jako `1000:1000` proto může skončit na `permission denied`. Nesnižuj bezpečnost celé služby spuštěním jako root; použij idempotentní jednorázový init kontejner:

```yaml
services:
  cache-init:
    image: busybox:1.37.0-glibc
    restart: "no"
    user: "0:0"
    read_only: true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - FOWNER
    security_opt:
      - no-new-privileges:true
    network_mode: none
    volumes:
      - runner_cache:/cache
    entrypoint: ["sh", "-ec"]
    command: ["chown 1000:1000 /cache && chmod 0700 /cache"]

  runner:
    user: "1000:1000"
    depends_on:
      cache-init:
        condition: service_completed_successfully
    volumes:
      - runner_cache:/cache

volumes:
  runner_cache:
```

`CHOWN` dovolí změnit vlastníka a `FOWNER` zachová idempotenci `chmod` i při dalších spuštěních, kdy volume už vlastní UID `1000`. Init nemá síť, kořenový filesystem je read-only a zvýšená oprávnění platí jen po dobu jednorázové úpravy mountu.

## Příklad: Forgejo 15 → 16 a Actions cache

Při ověřeném upgradu byly použity konkrétní image:

```yaml
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:16.0.2-rootless
  forgejo-runner:
    image: data.forgejo.org/forgejo/runner:13.0.0
```

Runnerová Actions cache vyžadovala nejen `enabled: true`, ale také persistentní adresář a adresu dosažitelnou z job kontejnerů:

```yaml
cache:
  enabled: true
  dir: /cache
  port: 0
  proxy_port: 8088
  actions_cache_url_override: http://127.0.0.1:8088
```

Protože joby běžely přes samostatný Docker-in-Docker daemon v režimu `network: host`, loopback adresa uvnitř jobu patřila DinD kontejneru. Samostatný `socat` proxy proto sdílel jeho síťový prostor a předával port runneru:

```yaml
services:
  forgejo-runner-cache-proxy:
    image: alpine/socat:1.8.1.3@sha256:3ed1cd38741bd445ebffa3aecb9d80c46a83db45f5b5ef03332976c7ca9814af
    restart: unless-stopped
    init: true
    user: "65534:65534"
    read_only: true
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges:true
    pids_limit: 64
    mem_limit: 32m
    network_mode: "service:forgejo-runner-docker"
    command:
      - TCP4-LISTEN:8088,fork,reuseaddr
      - TCP4:forgejo-runner:8088
```

Transportní kontrola z jobové sítě:

```powershell
docker exec forgejo-runner-docker sh -c 'wget -S -O /dev/null http://127.0.0.1:8088/ 2>&1 || true'
```

Očekávaná odpověď na kořenové cestě je HTTP `404 Not Found`: potvrzuje, že spojení prošlo přes DinD proxy až do HTTP serveru cache runneru. `Connection refused` nebo `error getting response` znamená, že cache server nebo forward nefunguje. Funkční workflow s `actions/cache` následně ověří autorizovanou cache cestu konkrétního jobu.

## Rollback

Rollback zahaj, pokud migrace skončí chybou, health stav se neustálí, data nesouhlasí nebo pomocná služba potřebná pro provoz nefunguje.

1. Zastav novou aplikaci, runner a všechny další zapisující služby.
2. Zachovej chybový stav pro diagnostiku; nemaž okamžitě nové kontejnery ani volumes.
3. Obnov databázi i aplikační data ze stejného předmigračního bodu.
4. Vrať Compose na původní konkrétní verze image.
5. Spusť starou verzi až nad obnovenou databází a daty.
6. Zopakuj health, log a datové kontroly.

> [!CAUTION]
> Obnova přepisuje stav a musí mít vlastní, předem nacvičený runbook. První test obnovy prováděj do nových volumes nebo izolovaného Compose projektu, ne přímo nad jedinou kopií produkčních dat.

## Kontrolní seznam

- [ ] Cílové image používají konkrétní verze a v registru existují.
- [ ] Compose konfigurace všech prostředí je validní.
- [ ] Je zaznamenán původní health stav, verze, volumes a počty dat.
- [ ] Všechny zapisující služby jsou před zálohou zastavené.
- [ ] Databázový dump prošel kontrolou.
- [ ] Archivy volumes prošly úplným testem čitelnosti.
- [ ] Záložní soubory mají uložené SHA-256.
- [ ] Produkční volumes nebyly odstraněny ani nově vytvořeny pod jiným názvem.
- [ ] Databázové migrace skončily úspěšně.
- [ ] Aplikace, databáze, runner a proxy jsou zdravé a bez nových chyb.
- [ ] Počty a dostupnost hlavních dat odpovídají stavu před upgradem.
- [ ] Je známá přesná cesta k záloze a postup rollbacku.
