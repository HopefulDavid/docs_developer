# 🗂️ Certifikáty

> 🚀 Moderní přehled nastavení certifikátů, SSH klíčů, připojení ke GitHubu a správy URL repozitářů.

---

## 🔐 Certifikáty

Certifikáty se používají pro šifrovanou komunikaci (např. HTTPS).

- V GitHub workflow se obvykle řeší automaticky (např. přes HTTPS klonování).
- Pro pokročilé scénáře lze spravovat vlastní CA, TLS certifikáty apod.

---

### 🗝️ SSH – Bezpečné připojení

> 📖 **Co je SSH?**  
> Bezpečný protokol pro vzdálené připojení, který využívá veřejný a soukromý klíč místo hesla.

> [!NOTE]  
> SSH je bezpečnější než používání uživatelského jména a hesla.

---

#### 📋 Postup krok za krokem

<details>
<summary><span style="color:#1E90FF;">🔑 Krok 1: Generování SSH klíče</span></summary>

```bash
ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"
```

- Lze zadat umístění pro uložení klíče (obvykle `~/.ssh/id_rsa`)
- Volitelně se nastaví heslo pro klíč

> [!TIP]  
> Pokud již existuje SSH klíč, tento krok lze přeskočit.
</details>

<details>
<summary><span style="color:#1E90FF;">📋 Krok 2: Zkopírování veřejného klíče</span></summary>

- **Windows:**
  ```bash
  type %userprofile%\.ssh\id_rsa.pub
  ```
- **Linux/macOS:**
  ```bash
  cat ~/.ssh/id_rsa.pub
  ```
</details>

<details>
<summary><span style="color:#1E90FF;">🔗 Krok 3: Přidání klíče na GitHub</span></summary>

1. Přihlášení na GitHub
2. Otevření **Settings → SSH and GPG keys**
3. Kliknutí na **New SSH key**
4. Vložení obsahu veřejného klíče
5. Potvrzení kliknutím na **Add SSH key**
</details>

<details>
<summary><span style="color:#1E90FF;">🧪 Krok 4: Testování SSH připojení</span></summary>

```bash
ssh -T git@github.com
```

Pokud je vše správně nastaveno, zobrazí se zpráva:

```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
</details>

<details>
<summary><span style="color:#1E90FF;">📦 Krok 5: Klonování repozitáře pomocí SSH</span></summary>

```bash
git clone git@github.com:username/repository.git
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔄 Krok 6: Změna URL z HTTPS na SSH</span></summary>

```bash
git remote set-url origin git@github.com:username/repository.git
```

> [!TIP]  
> URL lze upravit opakovaně stejným příkazem.
</details>

<details>
<summary><span style="color:#1E90FF;">👀 Krok 7: Zobrazení aktuálních URL</span></summary>

```bash
git remote -v
```
</details>

<details>
<summary><span style="color:#1E90FF;">⚙️ Krok 8: Nastavení odlišné URL pro fetch a push</span></summary>

1. Nastavení URL pro fetch:
   ```bash
   git remote set-url origin <fetch-url>
   ```
2. Nastavení URL pro push:
   ```bash
   git remote set-url --push origin <push-url>
   ```
3. Kontrola nastavení:
   ```bash
   git remote -v
   ```
</details>

---

> [!TIP]  
> Pro běžné workflow na GitHubu stačí SSH klíč, certifikáty řeší HTTPS automaticky.