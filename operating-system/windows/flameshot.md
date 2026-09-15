---
description: "Spouštění Flameshotu klávesou Print Screen, automatický start a ověření snímku ve Windows."
---

# Flameshot místo Výstřižků na Print Screen

Flameshot je aplikace pro snímání vybrané části obrazovky, do které můžeš hned přidat šipku, rámeček nebo text.

Hodí se například pro obrázkové návody a hlášení chyb.

Aby se otevřel po stisku `Print Screen`, musí běžet na pozadí a Windows nesmí stejnou klávesou spouštět své Výstřižky.

## Před použitím

- Potřebuješ nainstalovaný Flameshot. Pokud ho nemáš, použij [oficiální postup instalace pro Windows](https://flameshot.org/docs/installation/installation-windows/).
- Spusť Flameshot z nabídky Start a ověř jeho ikonu v oznamovací oblasti u hodin. Může být schovaná pod šipkou skrytých ikon.
- Na klávesnici hledej `Print Screen`, `PrtSc` nebo `PrtScn`. Na některých noteboocích je potřeba také `Fn`.

## 1. Uvolni Print Screen ve Windows

1. Otevři **Start → Nastavení → Bluetooth a zařízení → Klávesnice**.
2. Najdi část **Zástupci a klávesové zkratky**.
3. U volby **K otevření snímku obrazovky použijte klávesu Print Screen** nastav **Vypnuto**.

Pokud se volba v této části nenachází, ve starších sestaveních Windows 11 hledej **Usnadnění → Klávesnice** nebo v Nastavení vyhledej `Print Screen`.

Tato volba pouze uvolní klávesu.

Sama Flameshot nespustí.

Umístění ve starších Windows popisují také [Microsoft](https://support.microsoft.com/en-us/servicing/os/configuration-updates/2023/05/may-24-2023-windows-configuration-update) a [nápověda Flameshotu](https://flameshot.org/docs/guide/windows-help/#how-to-disable-windows-snipping-tool-when-i-press-printscreen).

## 2. Zapni spouštění Flameshotu při přihlášení

1. Klikni pravým tlačítkem na ikonu Flameshotu u hodin a otevři **Nastavení**.
2. Přejdi na kartu **Obecné**.
3. Zaškrtni **Launch in background at startup** (spouštění na pozadí při přihlášení, v jiných verzích **Spouštět při přihlášení**).
4. Zavři okno nastavení a nech aplikaci běžet v oznamovací oblasti.

Automatický start zajistí běh po příštím přihlášení.

Pro první zkoušku musí být Flameshot spuštěný už teď.

## 3. Ověř pořízení snímku

1. Zobraz okno, které chceš zachytit, a stiskni samotný `Print Screen`.
2. Ověř, že se objeví výběr oblasti Flameshotu.
3. Tažením myší označ malou oblast. Kolem výběru se zobrazí nástroje Flameshotu.
4. Stiskni `Ctrl+C` a vlož snímek pomocí `Ctrl+V` do rozepsaného dokumentu nebo obrázkového editoru.
5. Zkontroluj, že vložený obrázek obsahuje právě vybranou oblast.

Pokud chceš obrázek uložit do souboru, použij během výběru `Ctrl+S`.

Samotné kopírování do schránky soubor neukládá.

Rozpracovaný výběr zrušíš klávesou `Esc`.

Zkratky pro výběr, kopírování a uložení uvádí [oficiální přehled Flameshotu](https://flameshot.org/docs/guide/key-bindings/).

Při příštím běžném přihlášení ověř ikonu u hodin a zopakuj zkoušku `Print Screen`, aby se potvrdil i automatický start.

## Časté problémy

| Projev | Co zkontrolovat |
|---|---|
| Otevřou se Výstřižky | Znovu ověř vypnutou volbu Windows z prvního kroku, zejména po aktualizaci systému. |
| Po stisku se nic nestane | Spusť Flameshot z nabídky Start, ověř ikonu u hodin a případnou kombinaci s `Fn`. |
| Flameshot běží, ale klávesa nereaguje | Ukonči ho přes nabídku jeho ikony a znovu spusť. Ověř, zda stejnou klávesu nepoužívá další aplikace pro snímání. |
| Po přihlášení Flameshot chybí | Ověř volbu automatického startu z druhého kroku a případné zakázání Flameshotu ve **Správci úloh → Aplikace po spuštění**. |
| Změna zkratky se neprojeví | Ulož rozpracovanou práci a restartuj Windows, pokud nepomohlo opětovné spuštění Flameshotu. |

Pokud už je volba Windows vypnutá a automatický start zaškrtnutý, nic nepřepínej a přejdi rovnou k ověření snímku.

## Návrat k Výstřižkům

1. V nabídce ikony Flameshotu aplikaci ukonči.
2. Ve Windows znovu zapni volbu Print Screen z prvního kroku.
3. Stiskni `Print Screen` a ověř otevření Výstřižků.

Pokud Flameshot nechceš používat ani po přihlášení, před ukončením vypni jeho automatické spouštění.

Tento postup mění chování samotného `Print Screen`.

Zkratka `Win+Shift+S` má vlastní nastavení a není součástí této změny.
