# 🗂️ Git – Vytvoření & push nové větve na remote

> 🚀 Praktické rady pro založení a umístění nové větve (`develop`) na Git server (např. GitHub, GitLab).

---

## 🌱 Vytvoření nové větve

<details>
<summary><span style="color:#1E90FF;">🛠️ Krok 1: Založení větve</span></summary>

```bash
git checkout -b develop
```
- Vytvoří novou větev `develop` a přepne na ni.
</details>

---

## 🌐 Nastavení vzdáleného repozitáře

<details>
<summary><span style="color:#1E90FF;">🔗 Krok 2: Ověření remote</span></summary>

```bash
git remote -v
```
- Zobrazí nastavené vzdálené repozitáře.

> [!NOTE]  
> Pokud není remote nastaven, použij:  
> `git remote add origin <url>`
</details>

---

## 🚀 Push větve na server

<details>
<summary><span style="color:#1E90FF;">📤 Krok 3: Push větve na remote</span></summary>

```bash
git push -u origin develop
```
- Nahraje větev `develop` na server a nastaví ji jako sledovanou vůči `origin/develop`.

> [!NOTE]  
> Parametr `-u` zajistí automatické sledování větve.
</details>

---

## 🖥️ Ověření online

<details>
<summary><span style="color:#1E90FF;">🔎 Krok 4: Kontrola na webu</span></summary>

- Otevři webové rozhraní (GitHub, GitLab apod.) a ověř, že se větev objevila mezi vzdálenými větvemi.
</details>