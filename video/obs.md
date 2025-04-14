## OBS (Open Broadcast Software)

<details>
<summary><span style="color:#1E90FF;">Argumenty</span></summary>

| **Argument**                    | **Popis**                                                                                        |
|---------------------------------|--------------------------------------------------------------------------------------------------|
| `--help`, `-h`                  | Získat seznam dostupných parametrů.                                                              |
| `--version`, `-v`               | Získat verzi OBS.*                                                                               |
| `--startstreaming`              | Automaticky spustí streamování.                                                                  |
| `--startrecording`              | Automaticky spustí nahrávání.                                                                    |
| `--startvirtualcam`             | Automaticky spustí virtuální kameru.                                                             |
| `--startreplaybuffer`           | Automaticky spustí Replay Buffer.                                                                |
| `--collection "name"`           | Spustí s danou sbírkou scén.                                                                     |
| `--profile "name"`              | Spustí s daným profilem.                                                                         |
| `--scene "name"`                | Spustí s danou scénou.                                                                           |
| `--studio-mode`                 | Spustí s aktivním režimem Studio.                                                                |
| `--minimize-to-tray`            | Spustí minimalizováno do systémové lišty.                                                        |
| `--portable`, `-p`              | Použijte přenosný režim.                                                                         |
| `--multi`, `-m`                 | Nebude varovat při spuštění více instancí.                                                       |
| `--always-on-top`               | Spustí v režimu "vždy nahoře".                                                                   |
| `--verbose`                     | Učiní protokol podrobnějším.                                                                     |
| `--unfiltered_log`              | Zakáže filtr logu (nepotlačuje opakující se řádky).                                              |
| `--disable-updater`             | Zakáže vestavěný updater (pouze Windows/macOS).                                                  |
| `--allow-opengl`                | Povolit OpenGL renderer na Windows.                                                              |
| `--only-bundled-plugins`        | Spustí pouze s vestavěnými moduly.                                                               |
| `--safe-mode`                   | Donutí OBS spustit v nouzovém režimu, zakáže všechny třetí strany pluginy, skripty a websockety. |
| `--disable-shutdown-check`      | Zakáže detekci neuklizeného vypnutí, které by vyvolalo spuštění v nouzovém režimu.               |
| `--disable-missing-files-check` | Zakáže dialog o chybějících souborech, který se může objevit při spuštění.                       |

> [!TIP]
> Příklad automatického nahrávání skrze batch:
>
> ```bash
> start /d "C:\Program Files\obs-studio\bin\64bit" obs64.exe --startrecording 
> ```

</details>