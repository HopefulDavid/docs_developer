# 🗂️ Docker BusyBox – Praktický průvodce zálohováním volumes

> 🚀 Moderní přehled zálohování dat z Docker volumes do lokální složky pomocí BusyBox.

---

## 📖 Co je BusyBox?

- **Minimalistický Linux image s základními Unix nástroji**
- Ideální pro jednoduché operace v Docker kontejnerech (kopírování, skripty, testování)

> [!NOTE]  
> BusyBox je často využíván pro rychlé utility v kontejnerizovaném prostředí.

---

## 🛠️ Krok 1: Zjištění dostupných Docker volumes

<details>
<summary><span style="color:#1E90FF;">🔍 Zobrazit seznam volumes</span></summary>

```bash
docker volume ls
```
</details>

---

## 🛠️ Krok 2: Záloha dat z Docker volume do počítače

<details>
<summary><span style="color:#1E90FF;">📦 Přenesení dat pomocí BusyBox</span></summary>

```bash
docker run --rm -v projekty_planka_config:/volume -v C:\Users\xxx\Docker_Volumes\planka:/backup busybox:1.37.0-glibc sh -c "cp -r /volume/. /backup/"
```

> [!NOTE]  
> **Základní parametry:**
> - `--rm` – automaticky odstraní kontejner po dokončení
> - šetří místo na disku a udržuje systém čistý
>
> **Připojení volumes:**
> - `-v projekty_planka_config:/volume` – připojí Docker volume jako `/volume`
> - `-v C:\Users\xxx\Docker_Volumes\planka:/backup` – připojí lokální složku jako `/backup`
>
> **Použitý image a příkaz:**
> - `busybox:1.37.0-glibc` – minimalistický image s glibc
> - `sh -c "cp -r /volume/. /backup/"` – rekurzivní kopírování obsahu volume do zálohy
</details>