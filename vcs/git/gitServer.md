# Git – Server s Gitem (např. Forgejo, Gitea, Github, Gitlab, atd.)

> Praktické rady pro práci s Git repozitářem na serveru.

---

<img src="./images/2356729c-7942-4f2c-8ecc-f2b712c6e5ad.png" alt="Ollama" style="width: 100%; max-width: 950px; display: block; border-radius: 8px;">

## Správa remote URL

### Přepnutí z HTTP na SSH

<details>
<summary>Změna remote URL na SSH</summary>

```bash
git remote set-url origin ssh://git@127.0.0.1:2222/dslavik29/Unity_UITK-MMA.git
```

> [!NOTE]
> SSH přístup vyžaduje správně nakonfigurovaný SSH klíč na Gitea serveru (viz sekce SSH níže).

</details>

### Přepnutí ze SSH na HTTP

<details>
<summary>Změna remote URL na HTTP</summary>

```bash
git remote set-url origin http://localhost:3010/dslavik29/Unity_UITK-MMA.git
```

> [!TIP]
> HTTP je vhodné pro situace, kdy SSH není dostupné nebo při problémech s klíči.

</details>

### Zobrazení aktuální URL

<details>
<summary>Kontrola remote URL</summary>

```bash
git remote -v
```

</details>

---

## Hromadný mirror repozitářů na Gitea (SSH)

> Přesune všechny lokální `.git` repozitáře na SSH remote na Gitea serveru.

<details>
<summary>Bash skript pro hromadný mirror</summary>

```bash
for repo in *.git; do
  name=${repo%.git}
  echo "=== $name ==="
  cd "$repo"
  git remote remove origin 2>/dev/null
  git remote add origin ssh://git@127.0.0.1:2222/dslavik29/$name.git
  git push --mirror origin
  cd ..
done
```

> [!IMPORTANT]
> Skript je nutné spustit v Bash prostředí (např. Git Bash nebo WSL).
>
> Ujisti se, že máš SSH klíč přidán do svého účtu na Gitea serveru.

> [!WARNING]
> `git push --mirror` přepíše vzdálený repozitář kompletně – včetně všech větví a tagů.
> Použij pouze při inicializaci nového remote nebo záměrném přepisu.

</details>

---

## Git LFS s lokálním serverem

> Git LFS (Large File Storage) umožňuje verzovat velké soubory mimo Git historii.

<details>
<summary>LFS a SSH – důležité omezení</summary>

Git LFS **nepodporuje SSH** pro přenos dat na vlastních serverech.
I pokud je Git remote nastaven na SSH, LFS musí komunikovat přes HTTP.

Pokud narazíš na chyby při `git push` se soubory LFS, nastav LFS URL ručně:

```bash
git config lfs.url http://localhost:3020/dslavik29/Unity_MMA.git/info/lfs
```

> [!NOTE]
> - Port LFS serveru (`3020`) se může lišit od Git HTTP portu (`3010`).
> - Tato konfigurace je **lokální** pro daný repozitář – uloží se do `.git/config`.

</details>

<details>
<summary>Ověření LFS konfigurace</summary>

```bash
git lfs env
```

Výstup zobrazí aktuální LFS endpoint a stav konfigurace.

</details>

---

## SSH přístup ke Gitea

<details>
<summary>Nastavení SSH klíče pro Gitea</summary>

1. **Vygeneruj SSH klíč** (pokud ještě nemáš):

   ```bash
   ssh-keygen -t rsa -b 4096 -C "tvuj@email.com"
   ```

2. **Zobraz veřejný klíč:**

   **Windows:**
   ```bash
   type %userprofile%\.ssh\id_rsa.pub
   ```

   **Linux/macOS:**
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

3. **Přidej klíč do Gitea:**
   - Otevři Gitea → **Settings → SSH / GPG Keys → Add Key**

4. **Otestuj připojení:**

   ```bash
   ssh -T git@127.0.0.1 -p 2222
   ```

</details>
