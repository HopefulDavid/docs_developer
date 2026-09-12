---
description: "Záloha Python prostředí jako seznam verzí a složka wheelů, včetně vlastních balíčků."
---

# Python – záloha a obnova balíčků

Pro obnovu Python projektu uchovej jeho zdroje a přesné verze závislostí.

Pokud se chceš obejít bez internetu, přidej **wheelhouse**: obyčejnou složku s instalačními balíčky `.whl`. [Opakovatelné instalace pip](https://pip.pypa.io/en/stable/topics/repeatable-installs/)

## Před použitím

Příklady jsou pro **Python 3 a PowerShell ve Windows** a předpokládají fungující projektové prostředí `.venv`.

Na Linuxu nebo macOS nahraď `.venv/Scripts/python.exe` cestou `.venv/bin/python` a při vytvoření prostředí případně použij `python3`.

Použití úplné cesty k interpretu zajistí, že pip pracuje právě s tímto prostředím; aktivace není nutná.

Zálohu připrav pro stejnou verzi a implementaci Pythonu, OS a architekturu jako na cíli.

## 1. Zaznamenej fungující prostředí

V kořeni projektu:

```powershell
./.venv/Scripts/python.exe --version
./.venv/Scripts/python.exe -m pip --version
./.venv/Scripts/python.exe -m pip check
./.venv/Scripts/python.exe -m pip freeze | Set-Content -Encoding utf8 requirements-backup.txt
```

`freeze` zachytí aktuálně instalované verze včetně nepřímých závislostí; jde o snímek prostředí, nikoli univerzální lockfile pro všechny platformy. [Pip freeze](https://pip.pypa.io/en/stable/cli/pip_freeze/)

Původní `requirements.txt`, `pyproject.toml` a další projektové vstupy zachovej.

Pokud projekt ještě vlastní prostředí nemá, vytvoř je přes `python -m venv .venv` a nainstaluj do něj jeho skutečné závislosti, například přes `./.venv/Scripts/python.exe -m pip install -r requirements.txt`.

## 2. Připrav balíčky pro obnovu bez internetu

S internetem, ve stejném projektu:

```powershell
./.venv/Scripts/python.exe -m pip download --only-binary=:all: --dest ../zaloha-python/wheelhouse -r requirements-backup.txt
```

`--only-binary=:all:` vyžaduje hotové wheely, takže na cíli nebude potřeba dodatečně stahovat build závislosti pro zdrojové archivy. [Pip download](https://pip.pypa.io/en/stable/cli/pip_download/)

Pokud pro některou knihovnu wheel neexistuje, připrav jej online na kompatibilním počítači s potřebným překladačem:

```powershell
./.venv/Scripts/python.exe -m pip wheel --wheel-dir ../zaloha-python/wheelhouse -r requirements-backup.txt
```

Tato alternativa vytvoří wheely balíčků i jejich závislostí; build může při přípravě potřebovat další nástroje a internet. [Pip wheel](https://pip.pypa.io/en/stable/cli/pip_wheel/)

Pro jiný OS či Python připrav samostatný wheelhouse; nejjednodušší je provést přípravu přímo v kompatibilním prostředí.

## 3. Přenes zálohu

```text
zaloha-python/
  projekt/       zdroje, projektové vstupy a requirements-backup.txt
  wheelhouse/    všechny připravené .whl
  verze.txt      Python, pip, OS a architektura
```

Přidej instalátor či archiv Pythonu a případné externí knihovny, které aplikace potřebuje.

`.venv` na cíli vytvoř znovu: spouštěče mohou obsahovat absolutní cesty k původnímu interpretu. [Přenositelnost venv](https://docs.python.org/3/library/venv.html#how-venvs-work)

## 4. Obnov v novém prostředí

V obnoveném `zaloha-python/projekt`, kde ještě není `.venv`:

```powershell
python -m venv .venv
./.venv/Scripts/python.exe -m pip install --no-index --find-links=../wheelhouse --only-binary=:all: --no-cache-dir -r requirements-backup.txt
./.venv/Scripts/python.exe -m pip check
```

`--no-index` vypne indexy balíčků, `--find-links` použije wheelhouse a `--no-cache-dir` zabrání využití staré pip cache během zkoušky. [Pip install](https://pip.pypa.io/en/stable/cli/pip_install/)

Potom spusť testy a běžnou operaci aplikace.

Například u projektu s `requests` ověř import přes `./.venv/Scripts/python.exe -c "import requests; print(requests.__version__)"`.

Pokud máš internet a nepotřebuješ wheelhouse, ve stejném novém prostředí stačí `./.venv/Scripts/python.exe -m pip install -r requirements-backup.txt`.

## Vlastní, Git a editovatelné balíčky

Pokud snímek obsahuje `-e`, URL nebo přímou cestu, není sám o sobě přenositelný: `--no-index` nezakazuje stažení z URL přímo uvedené v požadavcích.

Takový balíček nejdříve sestav ze svého ověřeného zdroje do wheelhouse; příklad pro sousední `moje-knihovna`:

```powershell
./.venv/Scripts/python.exe -m pip wheel --no-deps --wheel-dir ../zaloha-python/wheelhouse ../moje-knihovna
./.venv/Scripts/python.exe -m pip list --format=freeze --exclude pip | Set-Content -Encoding utf8 requirements-offline.txt
./.venv/Scripts/python.exe -m pip download --only-binary=:all: --find-links=../zaloha-python/wheelhouse --dest ../zaloha-python/wheelhouse -r requirements-offline.txt
```

První krok zopakuj pro každý vlastní balíček; jeho deklarovaná verze musí odpovídat nainstalované verzi.

`pip list --format=freeze` zapíše názvy a verze bez editovatelných cest, takže tento zvláštní snímek lze obnovit z připravených wheelů. [Pip list](https://pip.pypa.io/en/stable/cli/pip_list/)

Pro cílovou instalaci pak použij `requirements-offline.txt` místo `requirements-backup.txt`.

Zdrojové repozitáře uchovej zvlášť, protože wheel neobnoví editovatelnou vývojovou vazbu ani celou historii zdroje.

## Co upravit podle potřeby

| Potřeba | Postup |
|---|---|
| Záloha jen jednoho projektu | Snímek z jeho vlastního prostředí |
| Balíčky z více projektů | Samostatný seznam verzí pro každý projekt; kompatibilní wheely mohou sdílet složku |
| Jiná platforma | Samostatná příprava nebo přesné cílové volby `pip download`, potom zkouška na cíli |
| Kontrola integrity archivů | Požadavky s hashi a `--require-hashes` podle pravidel projektu |
| Pouze kopie pip cache | Použij raději wheelhouse; interní cache není stabilní instalační archiv |

Když instalace hlásí, že neexistuje odpovídající distribuce, zkontroluj název, verzi a kompatibilitu wheelu s cílovým Pythonem.

`pip check` ověřuje deklarované závislosti, ale samotnou funkčnost aplikace potvrdí až její testy.
