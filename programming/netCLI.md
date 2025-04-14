## .NET CLI (Command Line Interface)

> [!IMPORTANT]
> Je zapotřebí mít nainstalovaný **`.NET SDK (Software Development Kit)`** a **`.NET Runtime (Framework)`**

<details>
<summary><span style="color:#1E90FF;">Umístění balíčků </span></summary>

- Po instalaci, balíčky jsou umístěny v adresáři dle platformy:

   <details>
   <summary><span style="color:#E95A84;"> Windows </span></summary>

  Umístění: `C:\Program Files\dotnet\`

  > [!TIP]
  > Můžete zjistit umístění pomocí příkazu:
  > ```bash
     > where dotnet
     > ```

   </details>
   <details>
   <summary><span style="color:#E95A84;"> macOS </span></summary>

  Umístění: : `/usr/local/share/dotnet/`

  > [!TIP]
  > Můžete zjistit umístění pomocí příkazu:
  > ```bash
     > which dotnet
     > ```

   </details>
   <details>
   <summary><span style="color:#E95A84;"> Linux </span></summary>

  Umístění: `/usr/share/dotnet/` nebo `/usr/local/share/dotnet/`

  > [!TIP]
  > Můžete zjistit umístění pomocí příkazu:
  > ```bash
     > which dotnet
     > ```
   </details>

</details>

<details>
<summary><span style="color:#1E90FF;">Seznam nainstalovaných balíčků </span></summary>

```bash
dotnet tool list -g
```

</details>

<details>
<summary><span style="color:#1E90FF;">Záloha globálních nástrojů</span></summary>

1. Zjištění nainstalovaných globálních nástrojů

   ```bash
   dotnet tool list -g
   ```

   > [!IMPORTANT]
   > Zaznamenejte názvy a verze nainstalovaných nástrojů, což usnadní jejich opětovnou instalaci.

2. Umístění nástrojů

   Zálohujte celý adresář `tools`.

    <details>
    <summary><span style="color:#E95A84;">Windows</span></summary>

   `C:\Users\<uživatelské\_jméno>\.dotnet\tools`
    </details>

    <details>
     <summary><span style="color:#E95A84;">macOS/Linux</span></summary>

   `~/.dotnet/tools`
     </details>

</details>

<details>
<summary><span style="color:#1E90FF;">Obnova globálních nástrojů</span></summary>

1. Obnovení ze zálohy

   Pokud máte zálohovaný adresář `tools`, jednoduše zkopírujte jeho obsah zpět do původního umístění.

   > [!NOTE]
   > Restartovat příkazový řádek nebo terminál, aby se projevily změny.

2. Kontrola instalace

   Po obnovení zkontrolujte, zda jsou nástroje správně nainstalovány:

   ```bash
   dotnet tool list -g
   ```

</details>

## Příkazy

<details>
<summary><span style="color:#1E90FF;">Instalace</span></summary>

- Globálně:

    ```bash
    dotnet tool install -g <balíček>
    ```

- Lokálně:

    ```bash
    dotnet tool install <balíček>
    ```

</details>

<details>
<summary><span style="color:#1E90FF;">Aktualizace</span></summary>

- Globálně:

    ```bash
    dotnet tool update -g <balíček>
    ```

- Lokálně:

    ```bash
    dotnet tool update <balíček>
    ```

</details>

<details>
<summary><span style="color:#E95A84;">Odinstalace</span></summary>

- Globálně:

    ```bash
    dotnet tool uninstall -g <balíček>
    ```
- Lokálně:

    ```bash
    dotnet tool uninstall <balíček>
    ```

</details>