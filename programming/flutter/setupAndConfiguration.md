# Flutter

Flutter je framework pro vývoj mobilních aplikací pro **Android** a **iOS**. Používá programovací jazyk **Dart**.

---

## Instalace

> **Důležité:**  
> Flutter používá `Git` pro správu závislostí, proto je nutné mít nainstalovaný `Git`.  
> Pro vývoj pro Android je potřeba mít nainstalovaný `Android Studio`.

### Windows

1. Stáhněte Flutter SDK z [oficiálních stránek](https://flutter.dev/docs/get-started/install/windows).
2. Rozbalte ZIP do složky, např. `C:\src\flutter`.
   > **Poznámka:** Cesta nesmí obsahovat mezery ani speciální znaky.
3. Přidejte cestu k `flutter\bin` do proměnné prostředí `PATH`.
4. Ověřte instalaci:
   ```bash
   flutter doctor
   ```
5. Vypněte analyzování:
   ```bash
   flutter config --no-analytics
   ```
6. Pro kontrolu nastavení:
   ```bash
   flutter config
   ```

### Android toolchain

1. Ujistěte se, že je nainstalován `Android Studio`.
2. Nastavte Android toolchain podle obrázků:
    - ![Obrázek 1](../../images/77fb408804c94851a06078aae17e694f.png)
    - ![Obrázek 2](../../images/5d7ee05eacb549d5ada6e1edef7a2e59.png)

### Vývoj webových aplikací

Pokud chcete použít jiný prohlížeč než Google Chrome:
```bash
flutter config --no-web-browser
```
Spusťte aplikaci:
```bash
flutter run -d web-server
```
Otevřete ve vlastním prohlížeči adresu `http://localhost:PORT/`.