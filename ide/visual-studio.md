---
description: "Příprava instalačního archivu a instalace IDE bez internetu."
---

# Visual Studio – offline instalace

Offline instalace používá předem stažený layout obsahující instalátor a vybrané komponenty.

## Stažení na počítači s internetem

1. Stáhni bootstrapper požadované edice a verze z [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/).
2. Otevři **CMD jako správce** ve složce se staženým `vs_community.exe`.
3. Stáhni kompletní layout pro češtinu a angličtinu:

```cmd
vs_community.exe --layout C:\visualstudio_offline --lang cs-CZ en-US
```

Bez omezení `--add` se stahují všechny workloady a komponenty; úplný layout vyžaduje desítky GB a může trvat dlouho.

Pro menší layout vyber jen potřebné workloady podle [oficiálního postupu](https://learn.microsoft.com/en-us/visualstudio/install/create-an-offline-installation-of-visual-studio).

## Instalace bez internetu

Zkopíruj celou dokončenou složku layoutu na cílový počítač.

V CMD spusť instalátor přímo z této kopie:

```cmd
C:\visualstudio_offline\vs_community.exe --noWeb
```

Vyber pouze komponenty obsažené v layoutu.

Pokud instalátor hlásí chybějící certifikáty nebo balíčky, vyřeš příčinu podle jeho hlášení a instalační dokumentace; `--noWeb` chybějící soubory nedoplní. [Offline instalace a certifikáty](https://learn.microsoft.com/en-us/visualstudio/install/create-an-offline-installation-of-visual-studio)

Po dokončení spusť Visual Studio a sestav projekt vyžadující zvolený workload.
