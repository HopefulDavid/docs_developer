# OBS Studio – parametry spuštění

Parametry OBS umožňují vybrat profil, scénu a případně automaticky zahájit nahrávání nebo streamování.

## Argumenty příkazové řádky

| Argument | Význam |
|---|---|
| `--help` | Nápověda parametrů |
| `--startrecording` | Zahájení nahrávání |
| `--startstreaming` | Zahájení vysílání |
| `--startvirtualcam` | Spuštění virtuální kamery |
| `--startreplaybuffer` | Spuštění předem nastaveného replay bufferu |
| `--collection "name"` | Výběr existující kolekce scén |
| `--profile "name"` | Výběr existujícího profilu |
| `--scene "name"` | Výběr scény |
| `--studio-mode` | Režim Studio |
| `--minimize-to-tray` | Minimalizace do oznamovací oblasti |
| `--portable` | Přenosný režim |
| `--multi` | Povolení více instancí bez varování |
| `--verbose` | Podrobnější log |
| `--safe-mode` | Diagnostický běh bez pluginů třetích stran, skriptů a websocketů |

Parametr `--version` není dostupný ve Windows. [Oficiální parametry OBS](https://obsproject.com/kb/launch-parameters)

## Příklad automatického spuštění nahrávání

Nejprve v OBS nastav zdroje, zvuk a cestu pro záznam a krátký záznam ručně vyzkoušej.

Následující příkaz pro **CMD ve Windows** ihned zahájí nahrávání:

```cmd
start "" /d "C:\Program Files\obs-studio\bin\64bit" obs64.exe --startrecording
```

Prázdný první argument je název okna pro příkaz `start`; `/d` nastavuje pracovní složku OBS.

Cestu uprav podle instalace a po spuštění ověř indikátor záznamu i výsledný soubor. [Spuštění OBS](https://obsproject.com/kb/launch-parameters), [Příkaz start](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/start)
