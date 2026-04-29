# Git – Vytvoření & push nové větve na remote

> Praktické rady pro založení a umístění nové větve (`develop`) na Git server (např. GitHub, GitLab).

---

<img src="./images/6caa6198-1ee2-4529-8e40-2c62da4232c7.png" alt="" style="width: 100%; display: block; border-radius: 8px;">

## Vytvoření nové větve

<details>
<summary>Krok 1: Založení větve</summary>

```bash
git checkout -b develop
```
- Vytvoří novou větev `develop` a přepne na ni.
</details>

---

## Nastavení vzdáleného repozitáře

<details>
<summary>Krok 2: Ověření remote</summary>

```bash
git remote -v
```
- Zobrazí nastavené vzdálené repozitáře.

> [!NOTE]
> Pokud není remote nastaven, použij:
> `git remote add origin <url>`
</details>

---

## Push větve na server

<details>
<summary>Krok 3: Push větve na remote</summary>

```bash
git push -u origin develop
```
- Nahraje větev `develop` na server a nastaví ji jako sledovanou vůči `origin/develop`.

> [!NOTE]
> Parametr `-u` zajistí automatické sledování větve.
</details>

---

## Ověření online

<details>
<summary>Krok 4: Kontrola na webu</summary>

- Otevři webové rozhraní (GitHub, GitLab apod.) a ověř, že se větev objevila mezi vzdálenými větvemi.
</details>