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
