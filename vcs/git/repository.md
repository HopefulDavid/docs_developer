# Git – Práce s úložištěm

> Praktické rady pro vytvoření a použití Git úložiště na lokálním i online prostředí.

---

<img src="../../images/87aac7e6-0da1-4ada-8c7c-1710636e867a.png" alt="Ollama" style="width: 100%; max-width: 950px; display: block; border-radius: 8px;">

## Vytvoření úložiště

<details>
<summary>Kompletní postup</summary>

1. **Inicializace bare úložiště**
   Spusťte v terminálu:

   ```bash
   git init --bare <cesta>
   ```

    - `<cesta>` = cílová složka, musí končit `.git`
      *Např.:* `C:\projekty\moje-repozitar.git`

> [!WARNING]
> Cesta musí mít na konci `.git`, jinak nebude úložiště správně rozpoznáno.

</details>

---

## Klonování úložiště

<details>
<summary>Použití v pracovním prostředí</summary>

1. **Klonování úložiště**
   Spusťte v terminálu:

   ```bash
   git clone <cesta>
   ```

    - `<cesta>` = adresa k úložišti (lokální nebo online), musí končit `.git`
      *Např.:* `C:\projekty\moje-repozitar.git` nebo `https://github.com/uzivatel/projekt.git`

> [!TIP]
> Cestu lze použít jak lokální, tak online (např. GitHub, GitLab).

</details>