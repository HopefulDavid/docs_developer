## Python

### Balíčky

<details>
<summary><span style="color:#1E90FF;">Záloha balíčků</span></summary>

```bash
pip download <název balíčku> -d <cesta k adresáři>
```

Tento příkaz stáhne balíček keep a všechny potřebné závislosti do specifikované složky, kterou pak můžete použít k instalaci na jiném počítači bez připojení k internetu.

</details>

<details>
<summary><span style="color:#1E90FF;">Instalace balíčků ze zálohy</span></summary>

```bash
pip install --no-index --find-links <cesta/k/adresari>
```

> [!NOTE]
> `--no-index` říká pipu, aby nehledal balíček online.
> 
> `--find-links` říká pipu, kde se nachází stažené balíčky, které má nainstalovat.

</details>