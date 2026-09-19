---
description: "Bezpečný úplný reset NetSentinelu ve Windows: záloha, ukončení aplikace, odstranění databáze, nastavení, reportů a uložených pověření a ověření čistého spuštění."
---

# NetSentinel – návrat do továrního stavu

Úplný reset odstraní nastavení, historii skenů, známá zařízení, automatizační pravidla, reporty i uložená pověření.

Použij ho, když chceš začít stejně jako při prvním spuštění nebo předat počítač bez předchozích dat NetSentinelu.

Tento postup platí pro Windows a NetSentinel 2.3.0.

> [!WARNING]
> Následující postup nevratně maže místní data NetSentinelu.
>
> Vestavěné **Settings → Danger Zone → Reset all settings to defaults** nestačí: smaže nastavení, ale ponechá databázi i hesla a tokeny ve Správci pověření Windows.

## Co se odstraní

- **Databáze a stav aplikace:** `%LOCALAPPDATA%\NetSentinel`
  Databáze `NetSentinel.db`, výsledky skenů, automatizační pravidla, pluginy, cache a diagnostické logy.
- **Nastavení uživatele:** `HKCU\Software\NetSentinel`
  Volby rozhraní, skenování a další nastavení aktuálního účtu Windows.
- **Ručně uložené výstupy:** `%USERPROFILE%\Documents\NetSentinel`
  CSV loggeru, reporty a základny zařízení.
- **Automatické reporty:** `%USERPROFILE%\NetSentinel-Reports`.
- **Uložená pověření:** Správce pověření Windows
  Hesla a tokeny integrací s názvem začínajícím `NetSentinel`.

Npcap ani samotná instalace aplikace se nemažou.

Jestli chceš pouze obnovit volby rozhraní a skenování, použij vestavěné **Reset all settings to defaults** a v tomto postupu nepokračuj.

## 1. Volitelně vytvoř zálohu

1. Otevři **Settings → Maintenance**.
2. Použij **Export settings (JSON)** a **Export All Data (ZIP)**.
3. Pokud potřebuješ zachovat samostatné CSV a reporty, zkopíruj si také složky `Dokumenty\NetSentinel` a `NetSentinel-Reports`.

Export nastavení neobsahuje hesla ani tokeny integrací.

Zálohu po resetu neimportuj, pokud chceš zachovat skutečně čistý stav.

## 2. NetSentinel skutečně ukonči

1. Zastav běžící logger, zachytávání provozu a plánované skeny.
2. Použij **⚙︎ → Quit NetSentinel** nebo `Ctrl+Q`.
3. Ve Správci úloh ověř, že neběží proces `NetSentinel.exe`.

Křížek vpravo nahoře nestačí, protože podle nastavení může aplikaci jen skrýt do oznamovací oblasti.

## 3. Nejdřív zobraz přesné cíle

Otevři běžný Windows PowerShell bez oprávnění správce a spusť pouze kontrolu:

```powershell
$netsentinelTargets = @(
    "$env:LOCALAPPDATA\NetSentinel"
    "$env:USERPROFILE\Documents\NetSentinel"
    "$env:USERPROFILE\NetSentinel-Reports"
)

$netsentinelTargets | ForEach-Object {
    Get-Item -LiteralPath $_ -Force -ErrorAction SilentlyContinue
}

Get-Item -LiteralPath 'HKCU:\Software\NetSentinel' -ErrorAction SilentlyContinue
```

Zkontroluj, že výpis obsahuje jen uvedené složky NetSentinelu a jeho klíč registru.

Pokud jsi reporty přesunul do jiné složky, PowerShell je nenajde ani nesmaže.

## 4. Odstraň data a nastavení

Teprve po kontrole cílů spusť ve stejném okně PowerShellu:

```powershell
$netsentinelTargets | Where-Object {
    Test-Path -LiteralPath $_
} | ForEach-Object {
    Remove-Item -LiteralPath $_ -Recurse -Force
}

if (Test-Path -LiteralPath 'HKCU:\Software\NetSentinel') {
    Remove-Item -LiteralPath 'HKCU:\Software\NetSentinel' -Recurse -Force
}
```

Příkazy pracují jen s profilem právě přihlášeného uživatele a nepotřebují správce.

Pokud PowerShell oznámí používaný soubor, NetSentinel nebo některý jeho pomocný proces stále běží. Nic nevynucuj; proces ukonči a krok zopakuj.

## 5. Odstraň uložená pověření

Tento krok proveď, pokud jsi nastavoval e-mail, MQTT, REST API, Pushover, ntfy, Telegram, Threat Intel nebo hardwarový plugin.

1. Otevři **Ovládací panely → Uživatelské účty → Správce pověření**.
2. Vyber **Pověření systému Windows**.
3. V části **Obecná pověření** rozbal a odeber jen položky, jejichž název začíná `NetSentinel`.

Nemaž jiné položky. Jejich odstraněním by ses mohl odhlásit z nesouvisejících aplikací.

## 6. Zkontroluj přenosnou verzi

Tento krok přeskoč u běžné instalace z Microsoft Store, `winget` nebo instalátoru.

Pokud spouštíš přenosný `NetSentinel.exe` ze zapisovatelné složky, může být databáze vedle něj. Po ověření správné složky odstraň jen tyto soubory:

- `NetSentinel.db`,
- `NetSentinel.db-wal`,
- `NetSentinel.db-shm`.

## 7. Ověř čisté spuštění

Spusť NetSentinel běžným způsobem.

Reset je úplný, pokud platí:

- aplikace používá výchozí motiv a výchozí nastavení,
- seznam zařízení a historie skenů jsou prázdné,
- plánované skeny, pravidla, pluginy a integrace nejsou nastavené,
- NetSentinel žádá přihlašovací údaje k dříve používaným integracím,
- v `%LOCALAPPDATA%\NetSentinel` vznikla nová databáze s aktuálním časem vytvoření.

Nyní proveď [základní kontrolu sítě](basic-check.md) stejně jako při prvním použití.

## Když chceš aplikaci také odinstalovat

Úplný reset nevyžaduje přeinstalaci.

Samotná odinstalace naopak nemusí odstranit uživatelskou databázi, nastavení ani pověření. Pokud chceš NetSentinel z počítače odstranit beze zbytku, nejdřív proveď tento reset a až potom aplikaci odinstaluj běžným způsobem ve Windows.

Postup vychází z úložišť používaných [NetSentinelem 2.3.0](https://github.com/ossianericson/netsentinel/tree/v2.3.0) a z chování jeho [resetu nastavení](https://github.com/ossianericson/netsentinel/blob/v2.3.0/ui/pages/settings_cards.py).
