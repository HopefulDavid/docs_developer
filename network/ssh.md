# 🗂️ SSH & GitHub – Praktický průvodce & tipy

> 🚀 Moderní přehled nastavení SSH klíče, připojení ke GitHubu a správy URL repozitářů.

---

## 📖 Co je SSH?

- **Bezpečný protokol pro vzdálené připojení**
- Využívá veřejný a soukromý klíč místo hesla
- Zvyšuje bezpečnost při práci s GitHubem

> [!NOTE]  
> SSH je bezpečnější než používání uživatelského jména a hesla.

---

## 🛠️ Krok 1: Generování SSH klíče

<details>
<summary><span style="color:#1E90FF;">🔑 Vytvoření nového SSH klíče</span></summary>

```bash
ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"
```

- Zadejte umístění pro uložení klíče (obvykle `~/.ssh/id_rsa`)
- Volitelně nastavte heslo pro klíč

> [!TIP]  
> Pokud již máte SSH klíč, tento krok přeskočte.
</details>

---

## 🛠️ Krok 2: Přidání SSH klíče do GitHubu

<details>
<summary><span style="color:#1E90FF;">📋 Zkopírování veřejného klíče</span></summary>

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
<summary><span style="color:#1E90FF;">🔗 Přidání klíče na GitHub</span></summary>

1. Přihlaste se na GitHub
2. Otevřete **Settings → SSH and GPG keys**
3. Klikněte na **New SSH key**
4. Vložte obsah veřejného klíče
5. Potvrďte kliknutím na **Add SSH key**
</details>

---

## 🛠️ Krok 3: Testování SSH připojení

<details>
<summary><span style="color:#1E90FF;">🧪 Ověření funkčnosti</span></summary>

```bash
ssh -T git@github.com
```

Pokud je vše správně nastaveno, zobrazí se zpráva:

```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
</details>

---

## 🛠️ Krok 4: Klonování repozitáře pomocí SSH

<details>
<summary><span style="color:#1E90FF;">📦 Klonování bez hesla</span></summary>

```bash
git clone git@github.com:username/repository.git
```
</details>

---

## 🛠️ Krok 5: Nastavení SSH URL pro existující repozitář

<details>
<summary><span style="color:#1E90FF;">🔄 Změna URL z HTTPS na SSH</span></summary>

```bash
git remote set-url origin git@github.com:username/repository.git
```

> [!TIP]  
> Pokud nastavíte špatně URL, můžete ji znovu upravit stejným příkazem.
</details>

<details>
<summary><span style="color:#E95A84;">Zobrazení aktuálních URL pro fetch a push</span></summary>

```bash
git remote -v
```
</details>

<details>
<summary><span style="color:#E95A84;">Nastavení odlišné URL pro fetch a push</span></summary>

1. Nastavit URL pro fetch:
   ```bash
   git remote set-url origin <fetch-url>
   ```
2. Nastavit URL pro push:
   ```bash
   git remote set-url origin https://github.com/username/repo.git
   ```
3. Zkontrolovat nastavení:
   ```bash
   git remote -v
   ```
</details>