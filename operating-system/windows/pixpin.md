---
description: "Nastavení PixPinu pro klávesu Print Screen a zapnutí nebo vypnutí historie snímků a oblastí ve Windows."
---

# PixPin na Print Screen ve Windows

Tento postup nastaví PixPin místo systémových Výstřižků pro klávesu `Print Screen` a umožní zapnout nebo vypnout historii pořízených snímků a vybraných oblastí.

PixPin musí být nainstalovaný a spuštěný.

Názvy jeho voleb odpovídají anglickému rozhraní.

## Nastavení PixPinu pro Print Screen

1. Ve Windows otevři **Start → Nastavení → Usnadnění → Klávesnice**.
2. Vypni volbu **K otevření výstřižků obrazovky použijte tlačítko Print Screen**.
3. Klikni pravým tlačítkem na ikonu PixPinu v oznamovací oblasti a otevři **Config**.
4. Přejdi na **Shortcut/Action**.
5. U vestavěné akce **Screenshot** vyber pole pro zkratku a stiskni `Print Screen`.
6. Změnu potvrď tlačítkem **Apply**.

Na některých klávesnicích je klávesa označená `PrtSc` nebo `PrtScn` a na notebooku může vyžadovat současné stisknutí `Fn`.

Pokud PixPin oznámí konflikt zkratky, ověř vypnutí systémové volby a ukonči jinou aplikaci, která používá `Print Screen`.

Stisknutím `Print Screen` ověř, že se otevře výběr PixPinu místo Výstřižků.

## Zapnutí nebo vypnutí historie

V PixPinu otevři **Config → Screenshot** a nastav požadované hodnoty:

| Historie | Nastavení | Použití během snímání |
|---|---|---|
| Pořízené snímky | **Number of Kept History Screenshots** | Předchozí snímky procházíš klávesami `<` a `>` |
| Vybrané oblasti | **Number of Kept History Screenshot Areas** | Předchozí oblasti vybíráš klávesami `R` a `Shift+R` |

Hodnota `0` příslušnou historii vypne.

Kladné číslo ji zapne a určí nejvyšší počet uchovávaných záznamů, například `10`.

Změnu potvrď tlačítkem **Apply**.

Po vypnutí historie pořiď nový snímek a při dalším snímání ověř, že předchozí záznam není příslušnými klávesami dostupný.

Zdroje: [PixPin: zkratky a akce](https://pixpin.com/docs/configuration/actions), [PixPin: nastavení snímků a historie](https://pixpin.com/docs/configuration/screenshot), [Microsoft: klávesové zkratky ve Windows](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec).
