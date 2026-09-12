---
description: "Izolované prostředí a instalace Python balíčků ze zálohy wheelů."
---

# Python – balíčky a offline instalace

Balíčky doplňují Python o knihovny; `pip` je instaluje do prostředí konkrétního interpretu.

## Před použitím

Příklad používá Python 3 a PowerShell ve Windows; ověř `python --version` a `python -m pip --version`.

Pro projekt vytvoř samostatné virtuální prostředí, aby instalace neměnila jiné aplikace:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip --version
```

Na Linuxu a macOS použij při vytvoření `python3` a potom `.venv/bin/python`; aktivace prostředí není při plné cestě nutná. [Virtuální prostředí](https://docs.python.org/3/library/venv.html)

## Instalace a záznam verzí

```powershell
.\.venv\Scripts\python.exe -m pip install requests
.\.venv\Scripts\python.exe -m pip freeze | Set-Content -Encoding utf8 requirements.txt
.\.venv\Scripts\python.exe -m pip check
```

`requests` je ukázková HTTP knihovna; první příkaz stáhne balíček, druhý zaznamená instalované verze a třetí zkontroluje deklarované závislosti.

`freeze` není univerzální lockfile pro všechny platformy; uchovej také verzi Pythonu a způsob sestavení prostředí.

## Příprava offline instalace

Na počítači s internetem a **stejným OS, architekturou a verzí Pythonu** připrav balíčky podle záznamu:

```powershell
.\.venv\Scripts\python.exe -m pip download --only-binary=:all: --dest wheelhouse -r requirements.txt
```

`--only-binary=:all:` vyžaduje hotové wheel balíčky; pokud některý chybí, příkaz selže místo přípravy zdrojů vyžadujících další překladač a závislosti.

Na cílový počítač přenes `requirements.txt` a celý `wheelhouse`, vytvoř nové `.venv` a spusť:

```powershell
.\.venv\Scripts\python.exe -m pip install --no-index --find-links=wheelhouse -r requirements.txt
.\.venv\Scripts\python.exe -m pip check
```

`--no-index` vypne registry, `--find-links` určí složku balíčků a `-r` dodá seznam toho, co se má instalovat. [Pip: místní instalace](https://pip.pypa.io/en/stable/user_guide/#installing-from-local-packages)

## Ověření a úpravy

Pro tento příklad ověř import pomocí `.\.venv\Scripts\python.exe -c "import requests; print(requests.__version__)"` a potom spusť testy aplikace.

Názvy prostředí a složky můžeš změnit, ale stejné cesty použij ve všech příkazech.

Složku `.venv` nekopíruj jako přenosnou zálohu; rekonstruuj ji z uložených vstupů.

## Když hotový wheel neexistuje

Na kompatibilním počítači s internetem a potřebným překladačem lze balíček nejprve sestavit:

```powershell
.\.venv\Scripts\python.exe -m pip wheel --wheel-dir wheelhouse -r requirements.txt
```

`pip wheel` vytvoří instalační wheely včetně požadovaných závislostí; během sestavení může doplnit další build nástroje ze sítě.

Výslednou složku přenes celou a instaluj stejným postupem `--no-index --find-links` do nového prostředí.

Pokud požadavky obsahují Git URL, místní adresáře nebo editovatelné instalace, nahraď je pro cílovou obnovu odpovídajícími sestavenými balíčky s verzí a uchovej jejich zdroje zvlášť.

`pip freeze` popisuje aktuálně instalované prostředí, ale nezaručuje přenosnost těchto přímých cest ani řešení pro jiný systém.

## Lze zkopírovat cache pipu?

`python -m pip cache dir` ukáže skutečnou mezipaměť a `python -m pip cache info` její obsah a velikost.

Její struktura a uložené položky nejsou stabilní distribuční formát pro celou aplikaci; jako složkovou zálohu pro obnovu používej výše uvedený `wheelhouse`.

Virtuální prostředí může obsahovat absolutní cesty a skripty svázané s původním interpretem, proto na cíli vždy vytvoř nové.

## Referenční příkazy

V tabulce představuje `python` interpret zvoleného prostředí; ve Windows ho nahraď například `.\.venv\Scripts\python.exe`.

| Syntaxe | Co provede |
|---|---|
| `python -m pip install <balíček>[==<verze>]` | Nainstaluje balíček, případně přesně zvolenou verzi |
| `python -m pip uninstall <balíček>` | Odebere balíček z tohoto prostředí |
| `python -m pip list --outdated` | Online porovná nainstalované verze |
| `python -m pip check` | Ověří deklarované závislosti, nikoli funkčnost aplikace |
| `python -m pip download --only-binary=:all: --dest <složka> -r <požadavky>` | Připraví hotové balíčky do zálohy |

Pro jiný cílový interpret podporuje download volby `--platform`, `--python-version`, `--implementation` a `--abi`; všechny musí odpovídat cíli a výsledek stejně ověř instalací na této platformě.

Pro běžnou vlastní zálohu je snazší příprava na kompatibilním systému než odhadování správné kombinace těchto hodnot.

Zdroje: [pip download](https://pip.pypa.io/en/stable/cli/pip_download/), [pip wheel](https://pip.pypa.io/en/stable/cli/pip_wheel/), [nepřenositelnost venv](https://docs.python.org/3/library/venv.html#how-venvs-work).
