# Duplicati – zálohování souborů z kontejnerů

Duplicati vytváří verzované a šifrované zálohy; zdrojové soubory musí být dostupné uvnitř jeho kontejneru.

## Jak fungují cesty

| Umístění | Úloha |
|---|---|
| `/data` v oficiálním image | Konfigurace a místní databáze Duplicati |
| Například `/source` | Připojená data, která má zálohovací úloha číst |
| Cílové úložiště | Oddělené místo pro zálohu, například jiný disk nebo vzdálené úložiště |

Jiné distribuce image mohou používat jiné cesty a uživatele; řiď se přesným image své instalace. [Duplicati v Dockeru](https://docs.duplicati.com/platform-specific-guides/using-duplicati-from-docker)

## Před použitím

Nejprve vytvoř konzistentní zdroj: zastav zapisující aplikaci, pořiď podporovaný snapshot nebo databázový dump.

Nastav přihlášení do Duplicati a bezpečně uchovej šifrovací heslo záloh i klíč pro ochranu jeho konfigurace; nejde o stejnou věc.

## Praktické připojení dat

Do existující služby Duplicati v Compose přidej tento fragment; `app_data` musí být skutečný existující volume:

```yaml
services:
  duplicati:
    volumes:
      # Zdroj je pouze pro čtení; nezmění oprávnění souborů aplikace.
      - app_data:/source:ro

volumes:
  app_data:
    external: true
```

Jde o doplnění existujícího Compose, nikoli o kompletní instalaci; zachovej image, konfiguraci, `/data` i přihlašování.

`external: true` zabrání tomu, aby překlep vytvořil nový prázdný volume; pro bind mount místo něj připoj skutečnou složku hostitele. [Compose volumes](https://docs.docker.com/reference/compose-file/volumes/)

## Vytvoření a ověření úlohy

1. V rozhraní Duplicati vytvoř zálohu a jako zdroj vyber `/source`.
2. Zvol oddělený cíl, šifrování, uchování verzí a interval podle změn dat.
3. Spusť první zálohu a prohlédni varování i seznam zahrnutých souborů.
4. Obnov známý soubor do nové složky a porovnej jeho obsah s původním.

Před automatickým během musí být zdroj konzistentní i při dalších spuštěních; samotný plán zálohy nezastaví databázi.

## Oprávnění a časté chyby

Nepoužívej plošné `chmod 777` ani `chown -R root:root` nad aplikačními daty: mohly by rozbít provoz a odhalit soukromé soubory.

Při `permission denied` zjisti UID/GID procesu, vlastníka souborů a požadovaný přístup; případnou úpravu omez na konkrétní zálohovaný adresář.

Chybu ochrany datové složky Duplicati řeš správným připojením a oprávněním `/data`, nikoli automatickým vypnutím kontroly.

Zálohu volumes s přímým testem obnovy popisuje [BusyBox](busybox.md).
