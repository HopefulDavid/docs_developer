<!-- Tento soubor generuje npm run docs:generate. Neupravujte navigaci ani přehledy ručně. -->

# Virtualizace

Kontejnery, lokální virtualizace, orchestrace a související správa prostředí.

## Přehled stránek

### Prostředí

| Stránka | Popis |
| --- | --- |
| [WSL](wsl.md) | WSL umožňuje používat linuxové nástroje z Windows; WSL 2 spouští skutečné linuxové jádro v řízeném lehkém virtuálním stroji. |
| [Docker](docker/index.md) | Docker spouští aplikace v izolovaných kontejnerech vytvořených z image; kontejner sdílí jádro hostitelského systému, zatímco jeho soubory a procesy mají vlastní prostředí. |
| [Kubernetes](kubernetes.md) | Kubernetes řídí kontejnery podle požadovaného stavu, například „udržuj dvě instance této aplikace“. |

### Docker

| Stránka | Popis |
| --- | --- |
| [Bezpečný upgrade stateful služby](docker/safe-stateful-upgrade.md) | Opakovatelný postup pro aktualizaci kontejnerové služby s databází a persistentními volumes tak, aby existoval ověřený bod obnovy a jasná kontrola výsledku. |
| [Portainer](docker/portainer.md) | Portainer poskytuje webové rozhraní pro správu kontejnerů, image, sítí a volumes. |
| [Duplicati](docker/duplicati.md) | Duplicati vytváří verzované a šifrované zálohy; zdrojové soubory musí být dostupné uvnitř jeho kontejneru. |
| [BusyBox](docker/busybox.md) | BusyBox poskytuje malé linuxové nástroje; pomocný kontejner může vytvořit archiv pojmenovaného Docker volume. |
