---
description: "Základní příkazy pip pro správu balíčků v izolovaném Python prostředí."
---

# Python a pip

pip instaluje Python balíčky do zvoleného interpretu nebo jeho virtuálního prostředí.

Pro přenos balíčků použij [zálohu a obnovu bez internetu](backup-and-restore.md#python-a-pip).

## Základní příkazy

Pro projekt používej samostatné `.venv` a pip vždy spouštěj přes jeho Python.

Tím je z příkazu zřejmé, které prostředí měníš.

Zápis `<balíček>` nahraď názvem z Python Package Indexu a další značky vykládá [klíč syntaxe příkazů](../../operating-system/command-line-syntax.md).

### [Windows](#tab/pip-windows)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Vytvořit virtuální prostředí | `py -m venv .venv` | Připraví izolovaný Python ve složce `.venv` |
| Nainstalovat balíček | `./.venv/Scripts/python.exe -m pip install <balíček>[==<verze>]` | Přidá balíček do tohoto prostředí |
| Odinstalovat balíček | `./.venv/Scripts/python.exe -m pip uninstall <balíček>` | Vyžádá potvrzení a odebere balíček |
| Vypsat nainstalované balíčky | `./.venv/Scripts/python.exe -m pip list` | Zobrazí názvy a verze v prostředí |
| Zobrazit detail balíčku | `./.venv/Scripts/python.exe -m pip show <balíček>` | Vypíše verzi, umístění a deklarované vazby |
| Najít dostupné aktualizace | `./.venv/Scripts/python.exe -m pip list --outdated` | Porovná prostředí s nakonfigurovaným indexem |
| Aktualizovat balíček | `./.venv/Scripts/python.exe -m pip install --upgrade <balíček>` | Nainstaluje novější povolenou verzi |
| Obnovit seznam požadavků | `./.venv/Scripts/python.exe -m pip install -r requirements.txt` | Nainstaluje balíčky z požadavkového souboru |
| Ověřit závislosti | `./.venv/Scripts/python.exe -m pip check` | Ohlásí chybějící nebo nekompatibilní deklarované závislosti |

### [Linux a macOS](#tab/pip-unix)

| Účel | Příkaz | Výsledek |
|---|---|---|
| Vytvořit virtuální prostředí | `python3 -m venv .venv` | Připraví izolovaný Python ve složce `.venv` |
| Nainstalovat balíček | `./.venv/bin/python -m pip install <balíček>[==<verze>]` | Přidá balíček do tohoto prostředí |
| Odinstalovat balíček | `./.venv/bin/python -m pip uninstall <balíček>` | Vyžádá potvrzení a odebere balíček |
| Vypsat nainstalované balíčky | `./.venv/bin/python -m pip list` | Zobrazí názvy a verze v prostředí |
| Zobrazit detail balíčku | `./.venv/bin/python -m pip show <balíček>` | Vypíše verzi, umístění a deklarované vazby |
| Najít dostupné aktualizace | `./.venv/bin/python -m pip list --outdated` | Porovná prostředí s nakonfigurovaným indexem |
| Aktualizovat balíček | `./.venv/bin/python -m pip install --upgrade <balíček>` | Nainstaluje novější povolenou verzi |
| Obnovit seznam požadavků | `./.venv/bin/python -m pip install -r requirements.txt` | Nainstaluje balíčky z požadavkového souboru |
| Ověřit závislosti | `./.venv/bin/python -m pip check` | Ohlásí chybějící nebo nekompatibilní deklarované závislosti |

***

Po instalaci nebo aktualizaci uprav projektový manifest či lockfile způsobem, který daný Python projekt používá, a spusť jeho testy.

Referenci poskytuje oficiální seznam [příkazů pip](https://pip.pypa.io/en/stable/cli/), zejména [`pip install`](https://pip.pypa.io/en/stable/cli/pip_install/), [`pip uninstall`](https://pip.pypa.io/en/stable/cli/pip_uninstall/) a [`pip list`](https://pip.pypa.io/en/stable/cli/pip_list/).
