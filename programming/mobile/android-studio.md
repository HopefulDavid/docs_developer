---
description: "Instalace SDK, příprava emulátoru a připojení fyzického zařízení."
---

# Android Studio

Android Studio poskytuje Android SDK, správu emulátorů a nástroje pro ladění aplikací na telefonu.

## SDK a emulátor ve Windows

1. Nainstaluj [Android Studio](https://developer.android.com/studio/install) a dokonči úvodní průvodce.
2. Otevři **Tools → SDK Manager**. Na úvodní obrazovce je správce pod **More Actions → SDK Manager**.
3. V **SDK Platforms** nainstaluj platformu požadovanou projektem.
4. V **SDK Tools** zkontroluj **Android SDK Build-Tools**, **Android SDK Platform-Tools**, **Android SDK Command-line Tools** a **Android Emulator**.
5. Otevři **Tools → Device Manager**, vytvoř virtuální zařízení, stáhni jeho systémový image pro architekturu počítače a spusť jej.

Pro Flutter doplň také NDK a CMake podle [požadavků Android toolchainu](https://docs.flutter.dev/platform-integration/android/setup).

Pro akceleraci emulátoru ve Windows použij **Windows Hypervisor Platform** a povolenou virtualizaci CPU v UEFI.

Po zapnutí funkce Windows restartuj počítač.

Starší Android Emulator hypervisor driver má oznámený konec podpory 31. prosince 2026. [Akcelerace emulátoru](https://developer.android.com/studio/run/emulator-acceleration)

## Skutečný telefon

Na telefonu zapni vývojářské možnosti a ladění USB, připoj jej datovým kabelem a potvrď autorizaci tohoto počítače.

Ve Windows může být potřeba USB ovladač výrobce. [Připojení zařízení](https://developer.android.com/studio/run/device)

## Ověření pro Flutter

Nejprve připrav [Flutter SDK](flutter/setup-and-configuration.md).

Samotný plugin IDE jej nenahrazuje.

```powershell
flutter doctor --android-licenses
flutter doctor -v
flutter devices
```

Licence si přečti a přijmi, pokud s nimi souhlasíš.

Pokračuj až po odstranění chyb Android toolchainu a zobrazení telefonu nebo spuštěného emulátoru ve výpisu zařízení.
