# 🧑‍💻 JetBrains Rider – Tipy, propojení & nástroje

> 🚀 Praktické rady pro efektivní práci v JetBrains Rider, propojení s Androidem, XML komentáře, klávesové zkratky a regulární výrazy.

---

## 📱 Propojení s mobilním zařízením (Android)

<details>
<summary><span style="color:#1E90FF;">🔗 Kompletní postup propojení</span></summary>

1. **Nastavení BIOSu (AMD CPU)**
    - Otevřete `BIOS` → najděte konfiguraci CPU → nastavte `SVM` na `Enabled`.

2. **Správa Android SDK v Rideru**
    - Otevřete: `File` → `Project Structure` → `SDKs` → `Project` → nastavte Android SDK.
    - SDK lze stáhnout v `Android Studio` → `More Actions` → `SDK Manager`.

3. **Ověření základních komponent SDK**
    - V sekci `SDK Tools` zkontrolujte:
      | Komponenta | Popis |
      |------------|-------|
      | `Android SDK Built-Tools` | Sestavení aplikací |
      | `Android SDK Command-Line Tools` | Správa SDK |
      | `Android Emulator` | Testování aplikací |
      | `Android Emulator hypervisor driver` | Výkon emulátoru (Intel/AMD) |
      | `Android SDK Platform-Tools` | Komunikace s zařízeními (`adb`) |

4. **Nastavení AVD (Android Virtual Device)**
    - Přidejte do proměnné prostředí:  
      `C:\Users\<YourUsername>\AppData\Local\Android\Sdk\platform-tools`
    - ADB umožňuje komunikaci mezi PC a Androidem.

   <details>
   <summary><span style="color:#E95A84;">📋 Zkontrolovat status emulátorů</span></summary>

   ```bash
   adb devices
   ```
   </details>

   <details>
   <summary><span style="color:#E95A84;">🔄 Restart ADB služby</span></summary>

   ```bash
   adb kill-server
   adb start-server
   ```
   </details>

5. **Propojení s mobilním zařízením**
    - Otevřete `Android Studio` → `More Actions` → `Virtual Device Manager`.
    - Vytvořte nové virtuální zařízení a spusťte jej.
    - V Rideru vyberte zařízení a spusťte aplikaci.

</details>

---

## 📝 XML komentáře

<details>
<summary><span style="color:#1E90FF;">💬 Zalomení řádku v XML komentáři</span></summary>

- Použijte:  
  **`<para>&#160;</para>`**

> [!WARNING]  
> `<para></para>` a `<br/>` nefungují pro zalomení řádku.

**Příklad:**

```csharp
/// <summary>
///     This sentence shows up when the type is hovered
///     <para>&#160;</para>
///     <para>int PrimaryKey</para>
///     <para>&#160;</para>
///     <para>virtual Relation Relation</para>
/// </summary>
```

Více info: [XML zalomení komentáře](https://stackoverflow.com/questions/7279108/how-to-add-a-line-break-in-c-sharp-net-documentation)

</details>

---

## ⌨️ Klávesové zkratky

<details>
<summary><span style="color:#1E90FF;">🔤 Parametry metody</span></summary>

- Zobrazení informací o parametrech:  
  `Ctrl` + `Shift` + `Space`
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Procházení seznamu</span></summary>

- Vpřed:  
  `Ctrl` + `Shift` + `Space`
- Zpět:  
  `Ctrl` + `Shift` + `P`
</details>

---

## 🔍 Regulární výrazy

<details>
<summary><span style="color:#1E90FF;">💡 Použití proměnné v regexu</span></summary>

<details>
<summary><span style="color:#E95A84;">🔢 Číselná proměnná</span></summary>

- Vyhledání proměnné v textu:

  ```regex
  <h2>(.*?)</h2>
  ```

- Nahrazení proměnné v textu:

  ```regex
  <h2>Test $1</h2>
  ```

</details>

<details>
<summary><span style="color:#E95A84;">🏷️ Pojmenovaná proměnná</span></summary>

- Vyhledání proměnné v textu:

  ```regex
  <h2>(?<customName>.*?)</h2>
  ```

- Nahrazení proměnné v textu:

  ```regex
  <h2>Test ${customName}</h2>
  ```

</details>
</details>