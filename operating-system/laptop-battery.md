---
description: "Omezení nabíjení na 80 % přednostně bez aplikací, s postupy podle systému a výrobce a kontrolou výsledku."
---

# Jak omezit nabíjení notebooku na 80 %

**Při časté práci ze zásuvky pomáhá omezení nabíjení na 80 % zpomalit stárnutí baterie.**

Baterie pak tráví méně času plně nabitá, což prospívá její dlouhodobé životnosti. ([Microsoft: péče o baterii](https://support.microsoft.com/en-us/windows/experience/power-battery/caring-for-your-battery-in-windows))

Po odpojení nabíječky budeš mít kratší výdrž než při 100 %, ale před cestou můžeš omezení zase vypnout.

## 1. Začni systémem a značkou

- **Windows:** níže rozbal značku notebooku. Pokud ji neznáš, stiskni `Win+R`, napiš `msinfo32` a potvrď Enterem. V okně **Systémové informace** najdeš **Výrobce systému** i **Model systému**.
- **MacBook:** otevři nabídku Apple → **O tomto Macu** a ověř čip a verzi macOS.
- **Chromebook nebo Linux:** otevři odpovídající záložku. V Linuxu rozlišuj také prostředí, například GNOME nebo KDE Plasma.

Přesný model dohledávej až tehdy, když se nabídka liší nebo potřebuješ ověřit podporu na stránkách výrobce.

**Vyber níže svůj systém a výrobce.**

Stejná značka nezaručuje stejnou funkci u všech generací notebooku.

**Přednost mají nastavení systému a vestavěné příkazy bez instalace aplikace výrobce.**

Předinstalovaná aplikace je stále aplikace a v tomto návodu je až náhradní možností.

Pokud přímý postup není dostupný, použij odpovídající nástroj výrobce, nejprve již nainstalovaný a teprve potom případnou instalaci.

Do obrazovky BIOSu přecházej až jako k poslední možnosti.

> [!IMPORTANT]
> **Spořič baterie neomezuje nabíjení na 80 %.**
>
> Pevný limit zastaví nabíjení u zvolené hranice, zatímco adaptivní neboli chytré nabíjení může později pokračovat na 100 %.

## 2. Vyber systém a notebook

## [Windows](#tab/battery-windows)

Windows nemají společný přepínač limitu pro všechny notebooky, ale některé notebooky zpřístupňují ovládání přímo přes vestavěný PowerShell. ([Microsoft: chytré nabíjení](https://support.microsoft.com/en-us/windows/experience/power-battery/use-smart-charging-in-windows), [Dell: přímá správa bez aplikací](https://downloads.dell.com/manuals/common/dell-agentless-client-manageability.pdf))

Rozbal svého výrobce a vyber variantu, která odpovídá tvému notebooku.

U přímých postupů rozhoduje dostupnost popsaného rozhraní a odpověď notebooku, samotný název řady nestačí.

| Výrobce | Začni touto možností |
|---|---|
| **Acer** | PowerShell, kontrola a zapnutí ochranného režimu přes `BatteryControl` |
| **ASUS** | PowerShell přes rozhraní `AsusAtkWmi_WMNB` |
| **Dell** | PowerShell přes přímé rozhraní nastavení, pokud je dostupné |
| **HP** | PowerShell pro dostupný Battery Health Manager |
| **HUAWEI a HONOR** | PowerShell na zařízeních s popsaným rozhraním `OemWMIfun` |
| **Ostatní značky** | Rozbal značku a zkontroluj doloženou alternativu a její závislosti |

**Jak otevřít okno pro následující příkazy:**

1. V nabídce Start napiš **Windows PowerShell**.
2. U výsledku zvol **Spustit jako správce** a potvrď dotaz Windows.
3. Zkopíruj celý blok pro svého výrobce, vlož jej do otevřeného okna a stiskni Enter.

Použij vestavěný **Windows PowerShell 5.1**, protože některé ukázky používají `Get-WmiObject`, který novější samostatný PowerShell 7 nemá.

Pracovní složka není důležitá a kvůli vložení příkazu nemusíš měnit zásady spouštění skriptů.

WMI je rozhraní Windows pro komunikaci s notebookem, nikoli další aplikace k instalaci.

Příkaz může změnit nastavení firmwaru za běhu Windows, takže při něm dál vidíš tento návod.

**Při chybě nepokračuj dalším blokem a přejdi k náhradnímu postupu stejné značky.**

Chybějící rozhraní nebo zamítnutý přístup nepotvrzuje zapnutí limitu.

<details>
<summary>Acer — Aspire, Swift, TravelMate, Nitro a Predator</summary>

**První možnost: bez Care Center a AcerSense.**

1. Otevři Windows PowerShell jako správce podle kroků výše.
2. Vlož tento blok, který nejprve ověří podporu a stav kalibrace a potom zapne pouze ochranný režim:

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $enable = 1
    $battery = @(Get-WmiObject -Namespace root\wmi -Class BatteryControl)
    if ($battery.Count -ne 1) { throw 'Rozhraní baterie není jednoznačně dostupné.' }
    $state = $battery[0].GetBatteryHealthControlStatus(1, 1, [byte[]]@(0, 0))
    if (@($state.uReturn).Count -ne 2 -or @($state.uFunctionStatus).Count -lt 2) {
        throw 'Notebook vrátil neznámý formát stavu.'
    }
    if (@($state.uReturn | Where-Object { $_ -ne 0 }).Count -gt 0) {
        throw 'Čtení stavu selhalo.'
    }
    if (($state.uFunctionList -band 1) -eq 0) { throw 'Notebook nepotvrdil podporu limitu.' }
    if ($state.uFunctionStatus[1] -ne 0) { throw 'Probíhá kalibrace. Nyní nic neměň.' }
    $result = $battery[0].SetBatteryHealthControl(1, 1, $enable, [byte[]]@(0, 0, 0, 0, 0))
    if ($null -eq $result.uReturn -or $result.uReturn -ne 0) { throw 'Zapnutí bylo odmítnuto.' }
    $state = $battery[0].GetBatteryHealthControlStatus(1, 1, [byte[]]@(0, 0))
    if (@($state.uReturn).Count -ne 2 -or
        @($state.uReturn | Where-Object { $_ -ne 0 }).Count -gt 0 -or
        @($state.uFunctionStatus).Count -lt 2 -or $state.uFunctionStatus[0] -ne $enable) {
        throw 'Následná kontrola nepotvrdila požadovaný stav.'
    }
    if ($enable -eq 1) { 'Ochranný režim 80 % je zapnutý.' }
    else { 'Ochranný režim je vypnutý.' }
}
```

3. Očekávej zprávu **Ochranný režim 80 % je zapnutý**.
4. Okno můžeš zavřít a pokračovat [ověřením nabíjení](#3-ověř-že-nastavení-funguje).

Čísla v příkazu vybírají první baterii a funkci ochranného režimu, nejde o ruční zadávání libovolného procenta.

Jde o komunitně popsané rozhraní, jehož zapnutí a zpětné čtení bylo ověřeno také na jednom notebooku po odinstalování Care Center. ([Původní postup pro Windows](https://github.com/stefnotch/acer-nitro-enable-smart-charging), [implementace rozhraní a význam stavů](https://github.com/frederik-h/acer-wmi-battery/blob/main/acer-wmi-battery.c))

**Některé notebooky po úplném vypnutí limit zapomenou.**

Po dalším spuštění jej zkontroluj a podle potřeby obnov stejným blokem. ([Zkušenost autora ovladače](https://github.com/frederik-h/acer-wmi-battery/issues/47#issuecomment-2110817949))

**Náhradní možnost: aplikace dodaná k notebooku.**

Použij ji, pokud přímé rozhraní není dostupné, neinstaluj všechny varianty.

**AcerSense:**

1. V nabídce Start otevři **AcerSense**.
2. Vyber **Personal Settings → Battery &amp; USB Charging**.
3. Zapni **Optimized Battery Charging**.

V této aplikaci jde o limit **80 %**, přestože název obsahuje „optimalizované“ nabíjení. ([Acer: postup pro AcerSense](https://community.acer.com/en/kb/articles/17933-how-to-manage-optimized-battery-charging-in-acersense))

**Acer Care Center / ControlCenter:**

1. Otevři dodanou aplikaci a část **Checkup**. V ControlCenter nejprve otevři **Control Panel**.
2. V části baterie přepínej šipkou k položce **Battery Charge Limit**.
3. Přepínač zapni a případný dotaz potvrď tlačítkem **Continue**.

Výsledkem je limit **80 %**. ([Acer: Care Center a ControlCenter](https://community.acer.com/en/kb/articles/19027-battery-charge-limit-function-on-acer-notebooks))

U Nitro a Predator neodvozuj podporu pouze z názvu řady ani z přítomnosti NitroSense či PredatorSense.

Pokud položku nenajdeš, přejdi na [postup pro chybějící volbu](#když-volba-chybí).

</details>

<details>
<summary>ASUS — Vivobook, Zenbook, ExpertBook, TUF a ROG</summary>

**První možnost: bez MyASUS a Armoury Crate.**

1. Otevři Windows PowerShell jako správce.
2. Vlož následující blok:

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $limit = 80
    $asus = @(Get-WmiObject -Namespace root\wmi -Class AsusAtkWmi_WMNB)
    if ($asus.Count -ne 1) { throw 'Rozhraní ASUS není jednoznačně dostupné.' }
    $result = $asus[0].DEVS(0x00120057, $limit)
    if ($null -eq $result.result -or $result.result -ne 1) {
        throw 'Notebook nepotvrdil přijetí limitu.'
    }
    "Notebook přijal požadavek na $limit %. Nyní ověř skutečné nabíjení."
}
```

3. Po úspěšné zprávě proveď [ověření nabíjení](#3-ověř-že-nastavení-funguje).

Hodnota `0x00120057` označuje funkci nabíjecího limitu a `80` požadované procento.

Postup zveřejnil autor G-Helperu, samotný G-Helper kvůli němu neinstaluješ. ([Příkaz od autora](https://github.com/seerge/g-helper/issues/1178), [zdrojový kód volání WMI a návratové hodnoty](https://github.com/seerge/g-helper/blob/main/app/AsusACPI.cs))

Rozhraní závisí na podpoře notebooku a jeho ovladačích, například ASUS System Control Interface.

**Ovladač není totéž co aplikace MyASUS a pro komunikaci může být potřeba i po jejím odstranění.**

Samotné rozhraní na některých zařízeních neumí přečíst uložené procento, proto úspěšnou odpověď nezaměňuj za změřené zastavení nabíjení. ([Implementace ovladače ASUS](https://github.com/torvalds/linux/blob/master/drivers/platform/x86/asus-wmi.c))

**Náhradní možnost: MyASUS.**

1. Otevři **MyASUS** z nabídky Start.
2. Vyber **Device Settings → Power &amp; Performance**.
3. Najdi **Battery Care Mode** a zapni jej, pokud jeho popis uvádí limit **80 %**.
4. Pokud místo přepínače vidíš **Battery Health Charging**, vyber **Balanced Mode**, který omezuje nabití na **80 %**.

**Maximum Lifespan Mode** ve starší nabídce znamená **60 %**.

U starších podporovaných modelů může být Battery Health Charging samostatná aplikace s ikonou u hodin. ([ASUS: režimy a podporované starší modely](https://www.asus.com/support/faq/1032726/))

**Pozor na modely z roku 2026:** ASUS popisuje také adaptivní variantu Battery Care Mode, která může podle používání povolit plné nabití.

Samotný název režimu proto nezaručuje trvalých 80 %.

Limit se navíc při startu obnovuje až po načtení Windows, takže krátké překročení během startu nemusí znamenat závadu. ([ASUS: aktuální Device Settings a výjimky](https://www.asus.com/support/faq/1045651/))

</details>

<details>
<summary>Dell a Alienware — Latitude, Precision, XPS, Inspiron, Vostro a novější řady</summary>

**První možnost: přímo z Windows bez MyDell, Optimizeru a modulů Dell Command.**

Dell nabízí přímé rozhraní zejména u novějších pracovních notebooků, dostupnost zjistíš čtením níže.

1. Otevři Windows PowerShell jako správce a přečti dostupné hodnoty:

```powershell
$dellNamespace = 'root\dcim\sysman\biosattributes'
Get-WmiObject -Namespace $dellNamespace -Class EnumerationAttribute -ErrorAction Stop |
    Where-Object AttributeName -eq 'PrimaryBattChargeCfg' |
    Select-Object AttributeName, CurrentValue, PossibleValue, ReadOnly
Get-WmiObject -Namespace $dellNamespace -Class IntegerAttribute -ErrorAction Stop |
    Where-Object AttributeName -in 'CustomChargeStart', 'CustomChargeStop' |
    Select-Object AttributeName, CurrentValue, LowerBound, UpperBound, ReadOnly
```

2. Poznamenej si původní hodnoty a pokračuj pouze tehdy, když výpis obsahuje všechny tři položky, režim **Custom** a zapisovatelné hranice zahrnující **50 a 80**.
3. Ve stejném okně vlož blok pro zahájení pod 50 % a zastavení na 80 %:

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $ns = 'root\dcim\sysman\biosattributes'
    $mode = @(Get-WmiObject -Namespace $ns -Class EnumerationAttribute |
        Where-Object AttributeName -eq 'PrimaryBattChargeCfg')
    $limits = @(Get-WmiObject -Namespace $ns -Class IntegerAttribute |
        Where-Object AttributeName -in 'CustomChargeStart', 'CustomChargeStop')
    if ($mode.Count -ne 1 -or $limits.Count -ne 2 -or $mode[0].ReadOnly -or
        'Custom' -notin $mode[0].PossibleValue) { throw 'Chybí podpora vlastních hranic.' }
    $wanted = [ordered]@{ CustomChargeStart = 50; CustomChargeStop = 80 }
    foreach ($name in $wanted.Keys) {
        $item = $limits | Where-Object AttributeName -eq $name
        if ($null -eq $item -or $item.ReadOnly -or
            $wanted[$name] -lt $item.LowerBound -or $wanted[$name] -gt $item.UpperBound) {
            throw 'Požadovaná hranice není podporovaná.'
        }
    }
    $interface = @(Get-WmiObject -Namespace $ns -Class BIOSAttributeInterface)
    if ($interface.Count -ne 1) { throw 'Rozhraní nastavení není jednoznačně dostupné.' }
    $wanted.Add('PrimaryBattChargeCfg', 'Custom')
    foreach ($name in $wanted.Keys) {
        $result = $interface[0].SetAttribute(0, 0, [byte[]]@(0), $name, [string]$wanted[$name])
        if ($null -eq $result.Status -or $result.Status -ne 0) {
            throw "Změna $name selhala. Znovu přečti aktuální stav."
        }
    }
    'Požadavky byly přijaty. Zopakuj čtení a ověř Custom, 50 a 80.'
}
```

4. Zopakuj čtení z prvního kroku a ověř **Custom**, **50** a **80**.
5. Potom ověř skutečné nabíjení podle společné části článku.

Příkaz předpokládá, že nastavení není uzamčené heslem správce firmwaru.

Při zamítnutí přístupu na spravovaném notebooku požádej správce.

Jde o použití rozhraní popsaného Dellem, nikoli o instalaci Dell PowerShell Provideru. ([Dell: přímé WMI a návratové hodnoty](https://downloads.dell.com/manuals/common/dell-agentless-client-manageability.pdf), [Dell: význam a rozsah nabíjecích hranic](https://www.dell.com/support/manuals/en-us/command-powershell-provider/dcpp_2_10_2_ug/using-the-primarybattchargecfg-feature?guid=guid-934fb5f8-9e50-4d17-9d11-578d5e43aa84&lang=en-us))

**Náhradní možnost: aplikace podporovaná notebookem.**

Dell přesunul funkce Power Manageru do MyDell a Dell Optimizeru. ([Dell: výběr aplikace podle zařízení](https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/software-and-downloads/dell-power-manager))

1. Otevři **MyDell** nebo **Dell Optimizer**.
2. Přejdi na **Power → Charging Mode → Custom**.
3. Nastav **Start Charging** například na **60 %** a **Stop Charging** na **80 %**.
4. Pokud aplikace nabízí potvrzení, změnu ulož.

První hodnota určuje, pod jakou úrovní se má nabíjení znovu spustit.

Druhá určuje, kde se má zastavit. ([MyDell: vlastní hranice](https://www.dell.com/support/manuals/en-us/mydell/mydell_3_3_ug/customizing-a-battery-setting?guid=guid-539096da-6e56-4d86-a728-3788b06947b8), [Dell Optimizer: vlastní hranice](https://www.dell.com/support/manuals/en-us/dell-optimizer/dell-optimizer-4.1.353_ug/customizing-a-battery-setting?guid=guid-6f3e5c6b-d02f-49bc-b3cd-4bf153f88f39&lang=en-us))

**Starší Dell Power Manager:** otevři **Battery Information → Settings → Custom**, nastav stejné hranice a potvrď **OK**. ([Dell Power Manager: vlastní nastavení](https://www.dell.com/support/manuals/en-us/power-manager/power-manager_ug/Create-custom-battery-setting?guid=guid-b79e8a01-82d8-461d-86c2-15b3a9291329))

Režimy **Adaptive** a **Primarily AC** nejsou zadáním přesného limitu 80 %.

U Alienware i novějšího názvosloví Dell ověř aplikaci na podpoře přesného modelu, protože nabídka **Custom** není společná všem zařízením.

</details>

<details>
<summary>HP — EliteBook, ProBook a ZBook, zvlášť domácí a herní modely</summary>

**První možnost: Battery Health Manager přímo z Windows bez HP Power Manageru.**

1. Otevři Windows PowerShell jako správce a přečti nabídku notebooku:

```powershell
Get-WmiObject -Namespace root\HP\InstrumentedBIOS -Class HP_BIOSEnumeration -ErrorAction Stop |
    Where-Object Name -eq 'Battery Health Manager' |
    Select-Object Name, CurrentValue, PossibleValues, IsReadOnly, RequiresPhysicalPresence
```

2. Poznamenej si **CurrentValue** a ověř, že notebook nabízí některou z možností **Maximize My Battery Health**, **Maximize Battery Health** nebo **Maximize Battery Health Management**.
3. Vlož blok, který vybere nabízenou variantu ochrany:

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $ns = 'root\HP\InstrumentedBIOS'
    $setting = @(Get-WmiObject -Namespace $ns -Class HP_BIOSEnumeration |
        Where-Object Name -eq 'Battery Health Manager')
    if ($setting.Count -ne 1 -or $setting[0].IsReadOnly -ne 0 -or
        $setting[0].RequiresPhysicalPresence -ne 0) { throw 'Přímá změna není dostupná.' }
    $allowed = 'Maximize My Battery Health', 'Maximize Battery Health', 'Maximize Battery Health Management'
    $target = @($setting[0].PossibleValues | Where-Object { $_ -in $allowed })
    if ($target.Count -ne 1) { throw 'Notebook nenabízí jednoznačný ochranný režim.' }
    $interface = @(Get-WmiObject -Namespace $ns -Class HP_BIOSSettingInterface)
    if ($interface.Count -ne 1) { throw 'Rozhraní nastavení není jednoznačně dostupné.' }
    $result = $interface[0].SetBIOSSetting('Battery Health Manager', $target[0])
    if ($null -eq $result.Return -or $result.Return -ne 0) { throw 'Změna byla odmítnuta.' }
    Get-WmiObject -Namespace $ns -Class HP_BIOSEnumeration |
        Where-Object Name -eq 'Battery Health Manager' |
        Select-Object Name, CurrentValue
}
```

4. Výsledné **CurrentValue** musí odpovídat vybranému režimu ochrany.

Postup vychází z rozhraní HP Client Management Interface a významu Battery Health Manageru, moduly HP CMSL kvůli němu neinstaluješ. ([HP: rozhraní WMI](https://h20331.www2.hp.com/Hpsub/downloads/cmi_whitepaper.pdf), [HP: režimy a jejich význam](https://support.hp.com/lamerica_nsc_carib-en/document/ish_4449597-3519507-16))

Při chybě přístupu může nastavení chránit heslo správce firmwaru nebo firemní politika.

**Náhradní možnost: pracovní notebook s podporou HP Power Manager.**

1. Otevři **HP Power Manager**.
2. Vyber **Battery Charge Manager**.
3. Zvol **Maximize My Battery Health**, případně obdobně pojmenované **Maximize Battery Health Management**.
4. Zkontroluj zvolený režim v aplikaci.

Tím zapneš ochranu omezující nabíjecí kapacitu na 80 % podle implementace dané generace.

**Windows mohou dál ukazovat 100 %**, protože ukazatel už vztahují k omezené kapacitě.

Režim **Let HP Manage My Battery** je automatický a nenahrazuje tuto volbu. ([HP: Power Manager a zobrazení procent](https://support.hp.com/in-en/document/ish_5180936-5180983-16), [HP: novější Battery Health Manager](https://support.hp.com/lamerica_nsc_carib-en/document/ish_4449597-3519507-16))

Pokud aplikaci nemáš, otevři stránku ovladačů svého modelu a v **Software-Solutions** ověř dostupnost **HP Power Manager**.

**Pavilion, Envy, Spectre, OMEN a Victus:** postup pro pracovní notebooky nepřenášej automaticky na tyto řady.

Některé používají **Adaptive Battery Optimizer**, který není ručně nastaveným limitem 80 %.

Jiné nabízejí **Battery Care Function** s hodnotami 50, 80 a 100 % pouze v nastavení firmwaru. ([HP: rozdíly funkcí baterie](https://support.hp.com/ca-en/document/ish_2854458-2733239-16))

Pokud výrobce pro tvůj model potvrzuje jen BIOS, použij až [poslední možnost níže](#když-výrobce-nabízí-pouze-bios).

</details>

<details>
<summary>Lenovo — ThinkPad, IdeaPad, Yoga, Legion, LOQ a ThinkBook</summary>

**Nejdříve rozlišuj přímý příkaz a další program.**

Lenovo má pro některé ThinkPady samostatný **ChargeThreshold.exe**, kterým lze nahradit Vantage.

Je to však stažený nástroj vyžadující odpovídající ovladač napájení, nikoli vestavěný příkaz Windows.

Pokud chceš tuto menší alternativu, použij [návod Lenovo k ChargeThreshold](https://forums.lenovo.com/t5/Lenovo-Vantage-Knowledge-Base/Q-amp-A-setting-a-ThinkPad-battery-charge-threshold-by-script/ta-p/4345631) a ověř jeho podmínky pro svůj notebook.

Pro všechny uvedené řady zde není doložený společný postup bez dalšího programu.

**Náhradní možnost: Vantage s podporou příslušné funkce.**

1. Otevři **Lenovo Vantage**, případně již dodaný **Commercial Vantage**.
2. Přejdi do nastavení zařízení a části **Power / Napájení**.
3. Pokračuj podle volby, kterou notebook nabízí.

**ThinkPad s Battery Charge Threshold:**

1. Zapni **Battery Charge Threshold**.
2. Nastav horní hranici **Stop Charging At** na **80 %**.
3. Pokud lze nastavit i začátek nabíjení, zvol například **60 %**, pokud tuto hodnotu aplikace přijme.

Lenovo tuto funkci vysvětluje v [návodu Battery Charge Threshold](https://support.lenovo.com/us/en/videos/nvid500286).

**IdeaPad, Yoga, Legion, LOQ nebo ThinkBook s Conservation Mode:**

1. Najdi **Conservation Mode / Režim ochrany baterie**.
2. Přečti rozsah uvedený u přepínače.
3. Pokud uvádí **75–80 %**, zapni jej.

Takové chování uvádí například [návod IdeaPad Slim 5 14/16](https://download.lenovo.com/pccbbs/pubs/ideapad_slim5_14_16/ug/html_en/en/intro_battery_mode_conservation.html).

**Starší Conservation Mode může držet jen 55–60 %.**

Pokud tvůj model nabízí pouze tento rozsah, samotným přepínačem z něj 80% limit neuděláš. ([Lenovo: starší ochranný režim](https://support.lenovo.com/au/en/solutions/ht103159-battery-charge-stops-at-60-plugged-in-not-charging-windows-ideapad))

</details>

<details>
<summary>Microsoft Surface — Laptop, Laptop Studio, Book a Pro</summary>

1. Otevři aplikaci **Surface** z nabídky Start.
2. Vyber **Battery &amp; charging**.
3. V části **Charging mode** zvol **Limit to 80%**.

Pokud tuto položku máš, zůstává limit zapnutý, dokud režim nezměníš.

**Pokud vidíš jen Smart charging nebo Adaptive, nelze tímto postupem vynutit stálých 80 %.**

U této varianty se ochrana aktivuje podle používání a může později opět povolit 100 %.

Podpora ruční volby závisí na konkrétním Surface, takže ani příslušnost k řadě Laptop nestačí.

Chybějící aplikaci Surface lze získat z Microsoft Storu přes odkaz v [oficiálním postupu Microsoftu](https://support.microsoft.com/en-us/surface/battery/smart-charging-on-surface).

</details>

<details>
<summary>MSI — herní a pracovní notebooky s Battery Master</summary>

1. Otevři **MSI Center**.
2. Vyber **Features → System Diagnosis**.
3. V části **Battery Master** zvol **Balanced**.

Tento režim dobíjí při poklesu pod **70 %** a zastaví na **80 %**.

**Best for Battery** znamená **60 %**, zatímco **Best for Mobility** nabíjí na 100 %.

Některé generace mají Battery Master v **Dragon Center, Creator Center, MSI Center Pro nebo MSI Center S**.

Použij variantu dodanou k notebooku a v její části Battery Master vyber **Balanced**. ([MSI: baterie a podporované nástroje](https://www.msi.com/support/technical_details/NB_Laptop_Battery), [MSI Center: System Diagnosis](https://www.msi.com/support/technical_details/NB_%20SW_MSI_Center))

Režim **Balanced** v nastavení výkonu Windows je jiná funkce.

</details>

<details>
<summary>Samsung — Galaxy Book</summary>

1. Otevři **Samsung Settings**.
2. Vyber **Battery and performance**.
3. Zapni **Battery protection / Protect battery**.
4. Pokud tvoje verze umožňuje volbu procent, nastav **80 %**.
5. Přečti potvrzenou horní hranici přímo u nastavení.

**Ne každý Galaxy Book tímto přepínačem nastaví 80 %.**

Oficiální návody Samsungu popisují podle varianty také **85 %** nebo **90 %**.

Pokud aplikace nabízí jen pevnou jinou hodnotu, jde o užitečnou ochranu, ale nikoli o požadovaný 80% limit. ([Samsung: Protect battery s 85 %](https://www.samsung.com/us/support/galaxy-battery/galaxy-book-battery/), [Samsung: Battery and performance s 90 %](https://www.samsung.com/in/support/computing/battery-and-performance-feature-in-galaxy-book-series/))

Návody pro telefony Galaxy a One UI na notebook nepoužívej.

</details>

<details>
<summary>LG — gram a další podporované notebooky</summary>

1. Otevři aplikaci, kterou máš dodanou s notebookem.
2. Podle jejího názvu přejdi na příslušné místo:

| Aplikace | Cesta k nastavení |
|---|---|
| **my gram** | **PC Maintenance → Power &amp; Performance → Extend Battery Life** |
| **LG Smart Assistant** | **Power Setting → Extend Battery Life** |
| **LG Control Center** | **Power Management Setting → Extend Battery Life** |

3. Zapni **Extend Battery Life**.

Nabíjení se zastaví na **80 %**. ([LG: nastavení ve všech třech aplikacích](https://www.lg.com/us/support/help-library/if-your-lg-laptop-battery-is-not-charging-CT00000317-20155394234620))

</details>

<details>
<summary>HUAWEI a HONOR — nejdříve přímý příkaz, potom PC Manager</summary>

**První možnost: bez PC Manageru na zařízeních s odpovídajícím WMI.**

Jde o komunitně zdokumentovaný postup, nikoli o univerzální příkaz pro každou generaci.

1. Otevři Windows PowerShell jako správce.
2. Vlož blok, který ověří variantu rozhraní a odešle požadavek na rozsah **60–80 %**:

```powershell
& {
    $ErrorActionPreference = 'Stop'
    $start = 60
    $stop = 80
    $class = Get-CimClass -Namespace root\wmi -ClassName OemWMIMethod
    $method = $class.CimClassMethods['OemWMIfun']
    if ($null -eq $method -or $null -eq $method.Parameters['u64Input']) {
        throw 'Tento postup nepodporuje dostupnou variantu rozhraní.'
    }
    $device = @(Get-CimInstance -Namespace root\wmi -ClassName OemWMIMethod)
    if ($device.Count -ne 1) { throw 'Rozhraní není jednoznačně dostupné.' }
    $result = Invoke-CimMethod -InputObject $device[0] -MethodName OemWMIfun -Arguments @{
        u64Input = ([uint64]$stop -shl 40) -bor ([uint64]$start -shl 32) -bor [uint64]0x48011503
    }
    if (@($result.u8Output).Count -lt 1 -or $result.u8Output[0] -ne 0) {
        throw 'Notebook požadavek nepřijal.'
    }
    "Požadavek na $start–$stop % byl přijat. Nyní ověř skutečné nabíjení."
}
```

3. Po úspěšné odpovědi proveď [ověření nabíjení](#3-ověř-že-nastavení-funguje), včetně dalšího spuštění systému.

Hodnota obsahuje horní hranici 80, dolní 60 a kód funkce podle zveřejněného formátu protokolu.

Ukázka je odvozená z tohoto formátu a volání, ne z měření každého modelu. ([Autor popisu WMI a PowerShell volání](https://github.com/baldandbrave/Huawei-WMI), [autor HuaweiBatteryControl: formát hranic a varianty protokolu](https://github.com/AceDroidX/HuaweiBatteryControl))

Starší rozhraní s parametrem `u8Input` má odlišné volání a tento blok je záměrně nepoužívá.

Pokud přímá cesta neuspěje, pokračuj odpovídajícím postupem níže.

**Náhradní možnost pro HUAWEI:**

**PC Manager 13.0.2.370 a novější na podporovaném modelu:**

1. Otevři **HUAWEI PC Manager**.
2. V nabídce vpravo nahoře zvol **Settings**.
3. Otevři **Battery**, na některých modelech **Optimization**.
4. Vypni **Smart charge**, aby se zpřístupnil vlastní limit.
5. V **Custom charging limit / Charging limit** nastav **80 %**.

U starších verzí se používá **Battery Protection** s režimy **Home**, **Office** a **Travel**.

Jejich horní hranice jsou 70, 90 a 100 %, takže žádný z nich sám o sobě není 80% limitem.

Odinstalování PC Manageru může znovu zapnout automatické **Smart charge**. ([HUAWEI: verze, nabídky a chování ochrany](https://consumer.huawei.com/ca/support/content/en-us15783714/))

**Náhradní možnost pro HONOR:**

1. Otevři **PC Manager** dodaný pro svůj HONOR.
2. Vpravo nahoře otevři nabídku nastavení → **Settings**.
3. Vyber **Others**, v některých verzích **Power Management**.
4. Otevři **Battery Protection** a zkontroluj dostupné režimy.

Oficiálně popsané **Home Mode**, **Office Mode** a **Travel Mode** mají horní hranice **70, 90 a 100 %**.

**Z této nabídky přesných 80 % nevybereš.**

Pokud přímé nastavení není dostupné, můžeš pro práci ze zásuvky místo toho zapnout **Home Mode**, jestli přijmeš nižší hranici 70 %.

Postup ani instalátor pro HUAWEI nepřenášej automaticky na HONOR. ([HONOR: režimy Battery Protection](https://www.honor.com/mea/support/content/en-us15813813/))

</details>

<details>
<summary>Razer — podporované generace Blade 14, 15, 16, 17 a 18</summary>

Výrobce uvádí Blade 14/15/17 z roku 2022, Blade 14/15/16/18 z roku 2023, Blade 14/16/18 z let 2024–2025 a Blade 16/18 z roku 2026.

Před nastavením porovnej přesný model s aktuálním seznamem v odkazovaném návodu.

1. Otevři **Razer Synapse 4**.
2. Přejdi do **BATTERY**.
3. Zapni **BATTERY HEALTH OPTIMIZER**.
4. Nastav horní hranici na **80 %**.

Podporovaný rozsah je 50–80 % a ochrana podle Razeru funguje také při vypnutém notebooku.

Pokud volba chybí, zkontroluj požadovanou verzi Synapse a firmwaru pro svůj model. ([Razer: postup a seznam modelů](https://mysupport.razer.com/app/answers/detail/a_id/9681/kw/synapse%2Bnot%2Bconnecting))

</details>

<details>
<summary>GIGABYTE a AORUS — modely s volbou Charging mode</summary>

1. Otevři **GIGABYTE Control Center** dodaný pro notebook.
2. V rozhraní popsaném příručkou vyber **General → Setting → Charging mode**.
3. Otevři nabídku maximálního nabití.
4. Pokud nabízí **80 %**, vyber tuto hodnotu a potvrď případné uložení.

Výrobce výslovně uvádí, že nabídka závisí na modelu.

Příručka nedokládá stejný rozsah procent u všech notebooků AERO, AORUS a GIGABYTE, proto při chybějící volbě nepředpokládej podporu. ([GIGABYTE: Control Center Quick Start Guide, část General](https://download.gigabyte.com/FileList/Manual/VE_ControlCenter_QSG_Manual_v1.1.pdf))

</details>

<details>
<summary>Dynabook a Toshiba — modely s eco Charge Mode</summary>

1. Otevři **dynabook Settings**, případně **TOSHIBA Settings**.
2. Vyber **eco Utility** a najdi **eco Charge Mode**.
3. Režim zapni a potvrď zobrazenou informaci.
4. Pro aktivaci postupuj podle pokynu aplikace k částečnému vybití baterie.

Starší samostatná **TOSHIBA eco Utility** má volbu v části **Battery Life Cycle**.

Tento režim omezuje nabití přibližně na **80 %**.

Odkazovaný postup pro dynabook Settings ve Windows 10 vyžaduje účet správce a při přepnutí uvádí jednorázové vybití přibližně na **50 %**.

Jde o pokyn pro tuto implementaci, nikoli o obecnou údržbu baterií všech značek. ([Dynabook: zapnutí eco Charge Mode](https://dynabook.com/assistpc/faq/pcdata3/018480.htm), [Toshiba: starší eco Utility](https://dynabook.com/assistpc/faq/pcdata2/017308.htm))

</details>

<details>
<summary>Fujitsu / FMV — LIFEBOOK a FMV Note s Battery Utility</summary>

1. Otevři **FUJITSU Battery Utility / バッテリーユーティリティ** v nabídce Start.
2. Vyber nastavení plné kapacity baterie, v japonské verzi **バッテリー満充電量**.
3. U staršího rozhraní klikni na **Change / 変更**.
4. Vyber **80% charging mode / 80%充電モード** a potvrď **OK**.

Novější Battery Utility V6 má jiné rozhraní než V5 a starší, proto v oficiálním návodu vyber svou verzi.

Postup platí pro modely vybavené touto funkcí, včetně uvedených variant LIFEBOOK a FMV Note, nikoli automaticky pro každý notebook Fujitsu. ([FMV: výběr modelů a verze aplikace](https://www.fmworld.net/cs/azbyclub/qanavi/jsp/qacontents.jsp?PID=7307-4244), [LIFEBOOK A747/P a A577/P: postup, část 2.7.5](https://www.fmworld.net/biz/fmv/support/fmvmanual/pdf/B5FK/B5FK8831.pdf))

</details>

<details>
<summary>Panasonic — modely s Battery Economy Mode (ECO)</summary>

1. Otevři **Panasonic PC Settings Utility**.
2. Vyber **Settings**, případně **Advanced Settings → Power Management** podle verze.
3. Najdi **Battery Economy Mode (ECO)**.
4. Zvol **Enable** a potvrď **OK**.

U podporovaných modelů se nabíjení zastaví na **80 %**.

Odkazovaný postup se týká zařízení s touto funkcí a předinstalovanými Windows 10.

U jiných generací Let's note a TOUGHBOOK ověř příručku konkrétního modelu. ([Panasonic: zapnutí ECO v PC Settings Utility](https://faq-pc-support.connect.panasonic.com/faq/show/493?site_domain=default))

</details>

<details>
<summary>VAIO a starší Sony VAIO — modely s Battery Care Function</summary>

1. Otevři **VAIO Control Center**.
2. Vyber **Power and Battery / Power-Battery**.
3. Zapni **Battery Care Function**.
4. Pokud rozhraní nabízí více úrovní, vyber **80 %**.

Některé varianty nabízejí také 50 %, proto ověř zvolenou hodnotu.

Tento postup platí pouze pro modely vybavené Battery Care Function, které popisuje [oficiální podpora VAIO](https://support.us.vaio.com/knowledge-base/vaio_pc-the-battery-cannot-be-charged-over-50-or-over-80-conservation-mode/).

</details>

<details>
<summary>Framework — Laptop 12, 13 a 16 podle generace</summary>

Framework má vlastní příkazový nástroj, takže u podporovaných generací nemusíš kvůli limitu do BIOSu.

**Tato možnost vyžaduje další nástroj a případně ovladač, není zcela bez instalace.**

**Nejprve v [oficiální dokumentaci nástroje](https://github.com/FrameworkComputer/framework-system) ověř podporu Windows pro přesnou generaci, požadovaný firmware a ovladač EC.**

EC je řídicí součást notebooku, se kterou nástroj komunikuje.

1. Otevři nabídku Start, vyhledej **Terminál** a zvol **Spustit jako správce**.
2. Pokud nástroj chybí, nainstaluj jej příkazem uvedeným výrobcem:

```powershell
winget install framework_tool --source winget
```

3. Po instalaci znovu otevři Terminál jako správce a nejdříve přečti současný limit:

```powershell
framework_tool --charge-limit
```

4. Pokud čtení uspělo a zařízení je podporované, nastav a znovu přečti limit:

```powershell
framework_tool --charge-limit 80
framework_tool --charge-limit
```

Výstup má uvést maximum **80 %**. ([Framework: význam příkazu](https://github.com/FrameworkComputer/framework-system/blob/main/EXAMPLES.md))

Při chybě ovladače nebo nepodporované generaci nepokračuj náhodnými náhradními příkazy.

Pro tyto modely zbývá [ověření možnosti BIOSu](#když-výrobce-nabízí-pouze-bios).

</details>

<details>
<summary>XMG a SCHENKER — rozlišení Control Center a FlexiCharger</summary>

**XMG CORE a NEO od roku 2021 s nabíjecími profily:**

1. Otevři dodaný **Control Center**.
2. Najdi nabíjecí profily **Eco Mode, Balanced a High Capacity**.
3. Pro převážnou práci ze zásuvky vyber **Eco Mode**.

Výrobce u této nabídky neuvádí univerzální přesnou hranici 80 %, proto ji za takovou nevydávej.

Windows mohou dál ukazovat 100 % omezené kapacity.

**XMG CORE 14, FOCUS, APEX, PRO a ULTRA s FlexiCharger:** výrobce popisuje ruční hranice v BIOSu.

Pokud příručka tvé generace nenabízí nastavení ze systému, přejdi na [poslední možnost](#když-výrobce-nabízí-pouze-bios).

U SCHENKER se řiď konkrétním modelem a jemu určeným Control Center, nikoli instalátorem pro jiný notebook. ([XMG: profily a FlexiCharger](https://help.xmg.gg/hc/en-gb/articles/17824821322653-How-can-I-give-my-battery-the-best-health-and-longest-life-possible), [XMG a SCHENKER: výběr Control Center](https://help.xmg.gg/hc/en-gb/articles/17824620776349-Where-can-I-find-the-very-latest-Control-Center-for-my-XMG-laptop))

</details>

<details>
<summary>MEDION / ERAZER, jiné značky a notebooky prodávané pod více názvy</summary>

Pro MEDION, ERAZER, Clevo a další dodavatele nelze bezpečně převzít návod podle podobného vzhledu notebooku.

Například podpora MEDION u **ERAZER Deputy P10** uvádí, že nastavení limitu daný model nenabízí. ([MEDION: odpověď podpory k Deputy P10](https://community.medion.com/t5/ERAZER-Gaming/Best-for-Battery/m-p/166779/highlight/true?profile.language=de))

To není důkaz stejného omezení u všech ostatních modelů.

1. Na podpoře svého dodavatele vyber přesné označení notebooku.
2. V uživatelské příručce vyhledej **Battery Charge Limit**, **Battery Care** nebo **FlexiCharger**.
3. Pokud existuje postup v systému, použij jej přednostně.
4. Pokud návod funkci neuvádí, vyžádej si potvrzení podpory modelu podle [postupu níže](#když-volba-chybí).

Stejně postupuj u značky, která v seznamu není, například Xiaomi/Redmi, realme, CHUWI nebo regionálního prodejce.

Chybějící ověřený návod zde neznamená, že notebook funkci určitě nemá.

</details>

## [MacBook](#tab/battery-macos)

**Apple silicon a macOS Tahoe 26.4 nebo novější**

**Limit nastavíš přímo v systému bez další aplikace.**

1. Otevři nabídku **Apple → Nastavení systému**.
2. Vyber **Baterie**.
3. U položky **Nabíjení / Charging** klikni na informační tlačítko **ⓘ**.
4. Nastav **Limit nabíjení / Charge Limit** na **80 %**.
5. Potvrď **Hotovo / Done**.

Mac se má zastavit v rozmezí několika procent od vybrané hranice.

**I s limitem může občas nabít na 100 % kvůli zpřesnění ukazatele baterie.**

**Intel nebo starší macOS**

Tento ručně volitelný limit vyžaduje Apple silicon a macOS Tahoe 26.4 nebo novější.

Od macOS Big Sur je k dispozici **Optimalizované nabíjení baterie**, které se učí tvůj režim a může nabíjení nad 80 % pouze odložit.

V novějším rozhraní je najdeš v **Nastavení systému → Baterie → ⓘ u Nabíjení nebo Kondice baterie**.

Zapnutí této volby nezaručuje stálých 80 %.

Pokud tvůj Mac nepodporuje systémový Charge Limit, tímto postupem pevnou hranici nenastavíš. ([Apple: požadavky, přesný postup a výjimky](https://support.apple.com/en-us/102338))

## [Chromebook](#tab/battery-chromeos)

**Chromebook s podporovaným nastavením ChromeOS**

**Začni nastavením systému bez ohledu na značku notebooku.**

1. Vpravo dole klikni na čas a otevři **Nastavení / Settings**.
2. Vyber **Předvolby systému / System preferences → Napájení / Power**.
3. Zapni **Optimalizované nabíjení / Optimized charging**.
4. Vedle této volby klikni na **Změnit / Change**.
5. Vyber **Limit nabíjení / Charge limit**.
6. Potvrď **Hotovo / Done**.

**Charge limit** omezuje nabití na **80 %**.

Vedlejší volba **Adaptive charging** může později dobít baterii na 100 %.

Pokud Charge limit nenajdeš, nepovažuj samotné zapnutí Adaptive charging za pevný limit.

Dostupnost ověř pro svůj model a u spravovaného školního či pracovního Chromebooku také u správce. ([Google: Optimized charging a Charge limit](https://support.google.com/chromebook/answer/14236882?hl=en))

## [Linux](#tab/battery-linux)

**Nejdříve vyzkoušej nastavení plochy**

**Použij variantu pro prostředí, které už máš nainstalované.**

| Prostředí | Postup bez nové aplikace |
|---|---|
| **GNOME 48 a novější** | Otevři **Nastavení → Napájení → Nabíjení baterie / Battery Charging** a zvol **Preserve Battery Health**. Na podporovaném hardwaru omezí nabití na **80 %**. |
| **KDE Plasma s podporou limitů** | Otevři **Nastavení systému → Správa napájení → Pokročilé nastavení napájení / Advanced Power Settings**. V **Charge Limit** nastav ukončení na **80 %** a případný začátek například na **60 %**, pokud je povolený. Změnu použij tlačítkem **Použít / Apply**. |

Položky se zobrazují pouze tehdy, když je podporuje notebook i příslušný ovladač. ([GNOME: ochrana baterie](https://release.gnome.org/48/), [KDE: Charge Limit](https://docs.kde.org/stable_kf6/en/powerdevil/kcontrol/powerdevil/index.html))

**Když přepínač chybí: přímo přes systém bez TLP**

Tento postup použij, pokud již zavedený ovladač zpřístupňuje soubor `charge_control_end_threshold`.

Značka sama nerozhoduje, stejným rozhraním mohou být dostupné podporované notebooky různých výrobců.

1. Otevři Terminál a vypiš dostupné nabíjecí hranice:

```bash
for battery in /sys/class/power_supply/*; do
    if [ -f "$battery/charge_control_end_threshold" ]; then
        printf '%s: ' "$battery"
        cat "$battery/charge_control_end_threshold"
    fi
done
```

2. Pokud výpis obsahuje například **/sys/class/power_supply/BAT0**, použij tuto cestu níže. Pokud vypíše jiné jméno, nahraď `BAT0` skutečným názvem. Prázdný výpis znamená, že tento postup není dostupný.
3. Poznamenej si původní horní hranici a případnou dolní hranici, které zobrazí:

```bash
battery=/sys/class/power_supply/BAT0
cat "$battery/charge_control_end_threshold"
if [ -f "$battery/charge_control_start_threshold" ]; then
    cat "$battery/charge_control_start_threshold"
fi
```

4. Ve stejném okně nastav 80 % a přečti zpět přijatou hodnotu:

```bash
(
    set -e
    test -f "$battery/charge_control_end_threshold"
    if [ -f "$battery/charge_control_start_threshold" ]; then
        start=$(cat "$battery/charge_control_start_threshold")
        if [ "$start" -ge 80 ]; then
            printf '60\n' | sudo tee "$battery/charge_control_start_threshold"
        fi
    fi
    printf '80\n' | sudo tee "$battery/charge_control_end_threshold"
    cat "$battery/charge_control_end_threshold"
)
```

5. Poslední výpis musí uvést **80**. Pokud ovladač hodnotu zaokrouhlí nebo odmítne, přesných 80 % tímto způsobem potvrzeno není.

Příkaz případně sníží dolní hranici, aby nebyla stejná nebo vyšší než požadovaný strop.

U více baterií proveď postup pro každou nabízenou cestu zvlášť.

Rozhraní a možnost zaokrouhlení definuje [dokumentace jádra Linuxu](https://github.com/torvalds/linux/blob/master/Documentation/ABI/testing/sysfs-class-power).

**Přímý zápis nemusí přežít restart ani opětovné načtení ovladače.**

Po spuštění jej ověř a případně zopakuj, nebo použij trvalé nastavení svého prostředí.

Teprve pokud systémové možnosti nestačí, zvaž nástroje níže.

**TUXEDO s podporovaným Control Center**

1. Otevři předinstalovaný **TUXEDO Control Center**.
2. V části **Battery** otevři nabíjecí profily.
3. Vyber **Stationary use**.

Tento profil omezuje kapacitu přibližně na **80 %**, ale systém může zobrazovat **100 %** už omezené kapacity.

Výrobce uvádí například InfinityBook Pro od Gen6, Stellaris, Polaris a Pulse 15, vždy ověř konkrétní generaci.

U některých dalších modelů nabízí pouze FlexiCharger v BIOSu. ([TUXEDO: profily, podporované řady a zobrazení procent](https://www.tuxedocomputers.com/en/Battery-charging-profiles-inside-the-TUXEDO-Control-Center))

**System76 s Open Firmware a Open EC**

Tento postup vyžaduje podporovaný model a dostupný **system76-power**, například v dodaném Pop!_OS.

1. Otevři Terminál a ověř, že nástroj umí přečíst současné hranice:

```bash
system76-power charge-thresholds
```

2. Nastav začátek na 40 % a konec na 80 %:

```bash
system76-power charge-thresholds 40 80
system76-power charge-thresholds
```

**Po vypnutí a odpojení adaptéru se nastavení může ztratit.**

Výrobce proto uvádí i pokročilý postup obnovení při startu.

Modely **Pangolin pang12 až pang15** podle aktuálního návodu nepodporují ani tuto funkci, ani FlexiCharger. ([System76: podpora, příkazy a zachování limitu](https://support.system76.com/articles/laptop-battery-thresholds/))

**Framework a další notebooky**

Na Frameworku nejdříve vyzkoušej nabídku svého prostředí.

Pokud chybí, může podporovaný model použít oficiální **framework_tool** s volbou `--charge-limit 80` podle [návodu výrobce pro Linux](https://github.com/FrameworkComputer/framework-system).

U ostatních notebooků prověř podporu přesného modelu a ovladače v [dokumentaci TLP k nabíjecím hranicím](https://linrunner.de/tlp/settings/battery.html).

TLP je další instalace, proto přichází na řadu až tehdy, když dostupné nastavení plochy nestačí.

Samotná instalace nástroje nepřidá funkci, kterou hardware nebo ovladač neposkytují.

***

## 3. Ověř, že nastavení funguje

1. **Zkontroluj výsledek příkazu nebo zvolený režim** v nastavení systému. Pokud rozhraní umožňuje zpětné čtení, ověř jím uložený stav.
2. Jestli už je baterie nad 80 %, odpoj adaptér a nech ji při běžné práci klesnout pod limit. U režimu se dvěma hranicemi může být pro nové nabíjení nutný pokles i pod dolní hranici.
3. Připoj adaptér a sleduj, zda se nabíjení zastaví u nastavené horní hranice.
4. Zkontroluj nastavení po běžném restartu a také po úplném vypnutí a opětovném zapnutí.
5. Kontrolu zopakuj po aktualizaci nebo odinstalaci obslužného nástroje a po změně firmwaru.

Není potřeba kvůli této zkoušce vybíjet baterii do nuly.

> [!NOTE]
> **Výsledek posuzuj podle výjimky uvedené u svého notebooku.**
>
> HP a některé profily XMG či TUXEDO mohou ukazovat 100 % omezené kapacity, Mac může občas dobít naplno a adaptivní režimy nezaručují stálý strop.

Zapnutí limitu také nemusí okamžitě vybít již nabitou baterii zpět na 80 %. ([ASUS: chování baterie nad limitem](https://www.asus.com/support/faq/1045651/))

Zavřené okno aplikace neznamená její odinstalování ani zastavení služby na pozadí.

Zachování limitu po odinstalaci ověř v návodu konkrétního nástroje.

**Přijetí příkazu, přečtení nastavení a skutečné zastavení nabíjení jsou tři různé kontroly.**

Úspěšná zpráva sama nenahrazuje pozorování nabíjení z úrovně pod limitem.

### Když se přímé nastavení po zapnutí ztrácí

Nejdříve ověř, že jednorázový příkaz skutečně funguje.

Potom jej můžeš opakovat po každém spuštění nebo obnovovat přes vestavěný Plánovač úloh Windows.

<details>
<summary>Volitelně: obnovování příkazu po přihlášení bez další aplikace</summary>

1. V Poznámkovém bloku ulož celý již ověřený nastavovací blok svého výrobce do souboru **Battery80.ps1** ve své složce Dokumenty. Vyber typ **Všechny soubory** a kódování **UTF-8 s BOM**, aby Windows PowerShell 5.1 správně přečetl i české texty.
2. V nabídce Start otevři **Plánovač úloh** a vyber **Vytvořit úlohu**.
3. Zadej název **Baterie 80 %**, ponech vlastní účet, zvol **Spustit pouze při přihlášení uživatele** a zaškrtni **Spustit s nejvyššími oprávněními**.
4. Na kartě **Aktivační události** přidej **Při přihlášení** svého uživatele.
5. Na kartě **Akce** přidej **Spustit program** a zadej `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`.
6. Do argumentů vlož `-NoProfile -NonInteractive -File "C:\Users\Jana\Documents\Battery80.ps1"`, přičemž ukázkovou cestu pro Janu nahraď skutečnou úplnou cestou svého souboru.
7. V **Podmínkách** zruš omezení spuštění pouze při napájení ze sítě a zastavení při přechodu na baterii, aby se limit obnovil také před pozdějším připojením nabíječky.
8. Úlohu ulož, ručně zvol **Spustit** a znovu ověř nastavení. Totéž ověř po odhlášení a přihlášení.

Úloha jednorázově spustí příkaz a skončí, žádná obslužná aplikace nemusí běžet trvale. ([Microsoft: spuštění při přihlášení](https://learn.microsoft.com/en-us/windows/win32/taskschd/starting-an-executable-when-a-user-logs-on), [oprávnění úlohy](https://learn.microsoft.com/en-us/windows/win32/taskschd/security-contexts-for-running-tasks), [parametry Windows PowerShellu](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_exe?view=powershell-5.1))

Nastavení se tak obnoví až po přihlášení, ne během nabíjení vypnutého notebooku.

Pokud Windows spuštění souboru blokují bezpečnostní politikou, neobcházej ji a používej ruční vložení bloku nebo řešení schválené správcem.

**Před dočasným nabitím na 100 % tuto úlohu zakaž a po návratu zase povol.**

</details>

## 4. Před cestou nabij na 100 %

Ve stejném nastavení dočasně vypni limit nebo vyber plné nabití.

U příkazových postupů použij následující návrat:

| Použitý postup | Jak povolit plné nabití |
|---|---|
| **Acer** | V celém nastavovacím bloku změň pouze `$enable = 1` na `$enable = 0` a znovu jej spusť. |
| **ASUS** | V nastavovacím bloku změň `$limit = 80` na `$limit = 100` a znovu jej spusť. |
| **Dell** | V nastavovacím bloku změň řádek s `$wanted` na `$wanted = [ordered]@{ CustomChargeStart = 95; CustomChargeStop = 100 }` a spusť celý blok. Kontrola musí potvrdit, že notebook tyto hranice dovoluje. Zopakuj čtení a ověř `Custom`, `95` a `100`. |
| **HP** | V nastavovacím bloku nahraď celý řádek začínající `$allowed =` zápisem `$allowed = 'původní hodnota'`, kde text v uvozovkách nahradíš dříve poznamenaným `CurrentValue`. Spusť celý blok a ověř vrácenou hodnotu. Původní adaptivní režim přitom nemusí vždy povolit okamžitých 100 %. |
| **HUAWEI / HONOR** | Ve stejném podporovaném bloku změň `$start = 60` na `$start = 95` a `$stop = 80` na `$stop = 100`. Ověř přijetí a skutečné nabíjení. |
| **Linux, přímý zápis** | Zopakuj zápis horní hranice s hodnotou `100` a přečti ji zpět. Případnou dolní hranici můžeš vrátit na poznamenanou původní hodnotu. |

Před dalším přihlášením zakaž případnou úlohu pro obnovování 80 %.

Například Mac nabízí **Charge to Full Now**, Surface **Charge to 100%** a MyASUS **Instant Full-Charge Mode**.

Po návratu obnov 80% limit, pokud se podle návodu neobnovuje automaticky.

## Když volba chybí

1. Zkontroluj přesný model, generaci a systém, nikoli pouze značku.
2. U přímého příkazu zkontroluj, zda jsi otevřel správný PowerShell jako správce a zda notebook poskytuje požadované rozhraní.
3. Ověř na podpoře výrobce potřebný ovladač. Jeho chybění není důvodem automaticky instalovat celý balík aplikací.
4. Teprve pokud přímý postup není použitelný, vyhledej náhradní aplikaci uvedenou u výrobce. Pokud chybí, ověř na oficiální podpoře její dostupnost pro svůj model a systém. Chybějící přepínač v aplikaci sám ještě nedokazuje, že funkci nemá hardware.
5. Pokud se podpora nepotvrdí, zeptej se výrobce: **„Podporuje můj model pevný limit nabíjení 80 % a lze jej nastavit z běžícího systému?“**

U firemního notebooku může nastavení řídit správce.

Upozornění při dosažení 80 % pouze připomene odpojení nabíječky, samo nabíjení nezastaví.

## Když výrobce nabízí pouze BIOS

BIOS/UEFI je nastavení notebooku před spuštěním systému.

Tuto možnost použij až tehdy, když výrobce pro přesný model nenabízí použitelný postup z běžícího systému.

**Před restartem si příslušný návod otevři v telefonu nebo si kroky poznamenej.**

<details>
<summary>Poslední možnost: modely s doloženým nastavením pouze ve firmwaru</summary>

1. Ověř v příručce přesného modelu název volby i způsob vstupu do BIOSu.
2. Ulož práci a připoj adaptér.
3. Otevři BIOS způsobem uvedeným v příručce a změň pouze příslušnou volbu nabíjení.
4. Ulož změnu, vrať se do systému a proveď [ověření výsledku](#3-ověř-že-nastavení-funguje).

| Doložená varianta | Nastavení |
|---|---|
| **Pracovní HP s Battery Health Manager bez použitelného WMI i HP Power Manageru** | Při startu **F10 → Advanced → Power Management Options → Battery Health Manager → Maximize Battery Health Management**. Starší název může být **Maximize My Battery Health**. |
| **Framework s podporovanou volbou ve firmwaru, ale bez použitelného ovládání ze systému** | V příručce své generace vyhledej **Battery Charge Limit** a nastav **80 %**. Samotný **Battery Extender** je automatický režim. |
| **Model s potvrzeným FlexiCharger, například odpovídající System76 nebo TUXEDO** | **Advanced → Advanced Chipset Control → FlexiCharger → Enabled**, potom dolní hranice například **60 %** a horní **80 %**, pokud je nabídka dovoluje. |

Pro XMG a SCHENKER použij modelový postup FlexiCharger odkazovaný výrobcem, protože struktura nabídky se může lišit.

Zdroje: [HP: cesta do Battery Health Manager](https://support.hp.com/lamerica_nsc_carib-en/document/ish_4449597-3519507-16), [Framework: výběr přesné generace](https://knowledgebase.frame.work/bios-and-drivers-downloads-rJ3PaCexh), [System76: FlexiCharger](https://support.system76.com/articles/laptop-battery-thresholds/), [TUXEDO: FlexiCharger](https://www.tuxedocomputers.com/en/Battery-charging-profiles-inside-the-TUXEDO-Control-Center), [XMG: modelové varianty](https://help.xmg.gg/hc/en-gb/articles/17824821322653-How-can-I-give-my-battery-the-best-health-and-longest-life-possible).

</details>

## Rozsah a aktuálnost

Podklady byly ověřeny **16. 9. 2026** podle odkazovaných návodů výrobců, systémů a původních implementací přímých rozhraní.

Článek pokrývá běžné i vybrané méně rozšířené značky, nikoli úplný katalog všech historických a regionálních modelů.

Tam, kde výrobce nedokládá přesných 80 %, je omezení uvedeno přímo v postupu.

Názvy nabídek se mohou lišit podle jazyka, verze aplikace a generace notebooku.

Přímé zapnutí a zpětné čtení Aceru bylo dříve ověřeno na jednom zařízení bez Care Center.

Ostatní hardwarové postupy jsou doložené dokumentací a zdrojovým kódem, nikoli fyzickou zkouškou každého notebooku.

U značek, u nichž je uveden pouze postup v aplikaci, není v tomto článku doložený použitelný přímý postup pro Windows, to však není tvrzení, že žádný nemůže existovat.
