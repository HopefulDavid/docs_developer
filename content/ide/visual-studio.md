---
description: "Příprava instalačního archivu a instalace IDE bez internetu."
---

# Visual Studio – offline instalace

Offline instalace používá předem stažený layout obsahující instalátor a vybrané komponenty.

## Stažení na počítači s internetem

1. Z [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/) se stáhne bootstrapper požadované edice a verze.
2. Ve složce se staženým `vs_community.exe` se otevře **CMD jako správce**.
3. Následující příkaz stáhne kompletní layout pro češtinu a angličtinu:

```cmd
vs_community.exe --layout C:\visualstudio_offline --lang cs-CZ en-US
```

Bez omezení `--add` se stahují všechny workloady a komponenty.

Úplný layout vyžaduje desítky GB a může trvat dlouho.

Menší layout obsahuje jen potřebné workloady vybrané podle [oficiálního postupu](https://learn.microsoft.com/en-us/visualstudio/install/create-an-offline-installation-of-visual-studio).

## Instalace bez internetu

Celá dokončená složka layoutu se zkopíruje na cílový počítač.

Instalátor se v CMD spouští přímo z této kopie:

```cmd
C:\visualstudio_offline\vs_community.exe --noWeb
```

Vybírají se pouze komponenty obsažené v layoutu.

Chybějící certifikáty nebo balíčky hlášené instalátorem se řeší podle jeho hlášení a instalační dokumentace.

`--noWeb` chybějící soubory nedoplní. [Offline instalace a certifikáty](https://learn.microsoft.com/en-us/visualstudio/install/create-an-offline-installation-of-visual-studio)

Instalaci ověří sestavení projektu, který zvolený workload vyžaduje.
