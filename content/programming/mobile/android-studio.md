---
description: "Instalace SDK, příprava emulátoru a připojení fyzického zařízení."
---

# Android Studio

Android Studio poskytuje Android SDK, správu emulátorů a nástroje pro ladění aplikací na telefonu.

## SDK a emulátor ve Windows

1. Nainstaluje se [Android Studio](https://developer.android.com/studio/install) a dokončí úvodní průvodce.
2. Otevře se **Tools → SDK Manager**. Na úvodní obrazovce je správce pod **More Actions → SDK Manager**.
3. V **SDK Platforms** se nainstaluje platforma požadovaná projektem.
4. V **SDK Tools** se zkontroluje **Android SDK Build-Tools**, **Android SDK Platform-Tools**, **Android SDK Command-line Tools** a **Android Emulator**.
5. V **Tools → Device Manager** vznikne virtuální zařízení, stáhne se jeho systémový image pro architekturu počítače a zařízení se spustí.

Flutter vyžaduje také NDK a CMake podle [požadavků Android toolchainu](https://docs.flutter.dev/platform-integration/android/setup).

Akceleraci emulátoru ve Windows zajišťuje **Windows Hypervisor Platform** a povolená virtualizace CPU v UEFI.

Po zapnutí funkce Windows se počítač restartuje.

Starší Android Emulator hypervisor driver má oznámený konec podpory 31. prosince 2026. [Akcelerace emulátoru](https://developer.android.com/studio/run/emulator-acceleration)

## Skutečný telefon

Na telefonu se zapnou vývojářské možnosti a ladění USB, telefon se připojí datovým kabelem a potvrdí se autorizace tohoto počítače.

Ve Windows může být potřeba USB ovladač výrobce. [Připojení zařízení](https://developer.android.com/studio/run/device)

## Ověření pro Flutter

Nejprve se připraví [Flutter SDK](flutter/setup-and-configuration.md).

Samotný plugin IDE jej nenahrazuje.

```powershell
flutter doctor --android-licenses
flutter doctor -v
flutter devices
```

Licence se přijímají až po přečtení a jen při souhlasu s nimi.

Pokračuje se až po odstranění chyb Android toolchainu a zobrazení telefonu nebo spuštěného emulátoru ve výpisu zařízení.
