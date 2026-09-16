---
description: "Uložení verzí Python balíčků, příprava složky wheelhouse a obnova nového prostředí bez internetu."
---

# Python – záloha a obnova balíčků

Pro offline obnovu ulož **seznam verzí a wheelhouse**, tedy složku s instalačními balíčky `.whl`.

Postup níže je pro PowerShell ve Windows a fungující projekt s prostředím `.venv`.

Na cíli použij stejnou verzi a implementaci Pythonu, OS a architekturu.

Na Linuxu a macOS místo `.venv/Scripts/python.exe` používej `.venv/bin/python`.

## 1. Připrav balíčky s internetem

V původním fungujícím projektu spusť:

```powershell
./.venv/Scripts/python.exe -m pip freeze | Set-Content -Encoding utf8 requirements-backup.txt
./.venv/Scripts/python.exe -m pip download --only-binary=:all: `
  --dest ../zaloha-python/wheelhouse -r requirements-backup.txt
```

První příkaz uloží nainstalované verze včetně nepřímých závislostí.

Druhý k nim stáhne instalační soubory. [Pip freeze](https://pip.pypa.io/en/stable/cli/pip_freeze/), [pip download](https://pip.pypa.io/en/stable/cli/pip_download/)

`--only-binary=:all:` vyžaduje hotové wheely, aby se na offline počítači nemusela připravovat jejich sestavovací prostředí.

Pokud některý balíček hotový wheel nemá, vytvoř jej online na kompatibilním počítači s potřebnými build nástroji:

```powershell
./.venv/Scripts/python.exe -m pip wheel `
  --wheel-dir ../zaloha-python/wheelhouse -r requirements-backup.txt
```

Obsahuje-li seznam `-e`, URL nebo místní cestu, použij níže variantu pro vlastní balíčky.

## 2. Přenes projekt a wheelhouse

Zkopíruj zdroje projektu včetně nového `requirements-backup.txt` do `zaloha-python/projekt`:

```text
zaloha-python/
  projekt/       zdroje a requirements-backup.txt
  wheelhouse/    všechny připravené .whl
```

Původní `requirements.txt`, `pyproject.toml` a další projektové soubory zachovej.

`.venv` nepřenášej: vytvoří se znovu a nebude obsahovat cesty ke starému počítači. [Přenositelnost venv](https://docs.python.org/3/library/venv.html#how-venvs-work)

Přilož výstup `./.venv/Scripts/python.exe --version` a připrav instalátor odpovídajícího Pythonu.

## 3. Obnov bez internetu

Na cíli rozbal pracovní kopii zálohy a v jejím `projekt`, kde ještě není `.venv`, spusť:

```powershell
python -m venv .venv
./.venv/Scripts/python.exe -m pip install --no-index `
  --find-links=../wheelhouse --only-binary=:all: --no-cache-dir `
  -r requirements-backup.txt
./.venv/Scripts/python.exe -m pip check
```

`--no-index` vypne registr, `--find-links` určí složku balíčků a `--no-cache-dir` zabrání využití staré pip cache. [Pip install](https://pip.pypa.io/en/stable/cli/pip_install/)

Aktivace prostředí není nutná, protože příkazy používají přímo jeho Python.

Nakonec spusť testy a běžnou aplikaci bez připojení.

`pip check` ověřuje pouze deklarované závislosti.

## Více projektů nebo obnova s internetem

Každý projekt potřebuje vlastní seznam verzí.

Kompatibilní wheely mohou sdílet jednu složku.

Pro jiný Python nebo platformu připrav a ověř samostatný wheelhouse.

S internetem stačí v novém prostředí `./.venv/Scripts/python.exe -m pip install -r requirements-backup.txt`.

## Vlastní, Git a editovatelné balíčky

`--no-index` neblokuje URL přímo uvedenou v seznamu, proto musí mít offline seznam názvy a verze místo původních cest.

Ve fungujícím prostředí sestav každý vlastní balíček a potom ulož přenositelný seznam.

Příklad pro sousední `moje-knihovna`:

```powershell
./.venv/Scripts/python.exe -m pip wheel --no-deps `
  --wheel-dir ../zaloha-python/wheelhouse ../moje-knihovna
./.venv/Scripts/python.exe -m pip list --format=freeze --exclude pip |
  Set-Content -Encoding utf8 requirements-offline.txt
./.venv/Scripts/python.exe -m pip download --only-binary=:all: `
  --find-links=../zaloha-python/wheelhouse `
  --dest ../zaloha-python/wheelhouse -r requirements-offline.txt
```

První příkaz zopakuj pro všechny vlastní balíčky.

Jejich verze musí odpovídat tomu, co máš nainstalované. [Pip wheel](https://pip.pypa.io/en/stable/cli/pip_wheel/), [pip list](https://pip.pypa.io/en/stable/cli/pip_list/)

Do zálohy přidej `requirements-offline.txt` a v kroku 3 jej použij místo `requirements-backup.txt`.

Zdrojové repozitáře uchovej také, protože wheel sám neobnoví editovatelnou vývojovou vazbu ani historii.
