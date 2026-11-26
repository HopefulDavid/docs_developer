---
description: "Nastavení PixPinu pro klávesu Print Screen a zapnutí nebo vypnutí historie snímků a oblastí ve Windows."
---

# PixPin na Print Screen ve Windows

Tento postup nastaví PixPin místo systémových Výstřižků pro klávesu `Print Screen` a umožní zapnout nebo vypnout historii pořízených snímků a vybraných oblastí.

PixPin musí být nainstalovaný a spuštěný.

Názvy jeho voleb odpovídají anglickému rozhraní.

## Nastavení PixPinu pro Print Screen

1. Ve Windows se otevře **Start → Nastavení → Usnadnění → Klávesnice**.
2. Volba **K otevření výstřižků obrazovky použijte tlačítko Print Screen** se vypne.
3. Pravé tlačítko na ikoně PixPinu v oznamovací oblasti nabídne **Config**.
4. Následuje karta **Shortcut/Action**.
5. U vestavěné akce **Screenshot** se vybere pole pro zkratku a stiskne `Print Screen`.
6. Tlačítko **Apply** změnu potvrdí.

Na některých klávesnicích je klávesa označená `PrtSc` nebo `PrtScn` a na notebooku může vyžadovat současné stisknutí `Fn`.

Při konfliktu zkratky se ověří vypnutí systémové volby a ukončí se jiná aplikace, která používá `Print Screen`.

Po stisknutí `Print Screen` se má otevřít výběr PixPinu místo Výstřižků.

## Zapnutí nebo vypnutí historie

Hodnoty se nastavují v PixPinu v **Config → Screenshot**:

| Historie | Nastavení | Použití během snímání |
|---|---|---|
| Pořízené snímky | **Number of Kept History Screenshots** | Předchozí snímky procházejí klávesy `<` a `>` |
| Vybrané oblasti | **Number of Kept History Screenshot Areas** | Předchozí oblasti vybírají klávesy `R` a `Shift+R` |

Hodnota `0` příslušnou historii vypne.

Kladné číslo ji zapne a určí nejvyšší počet uchovávaných záznamů, například `10`.

Tlačítko **Apply** změnu potvrdí.

Po vypnutí historie se pořídí nový snímek a při dalším snímání se ověří, že předchozí záznam není příslušnými klávesami dostupný.

Zdroje: [PixPin: zkratky a akce](https://pixpin.com/docs/configuration/actions), [PixPin: nastavení snímků a historie](https://pixpin.com/docs/configuration/screenshot), [Microsoft: klávesové zkratky ve Windows](https://support.microsoft.com/en-us/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec).
