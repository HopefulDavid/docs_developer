# 🤖 Ollama – Průvodce instalací & správou

> 🚀 Praktické rady pro nastavení, spuštění a správu Ollama na Windows.

---

## 🌐 Základní informace

- Ollama naslouchá na adrese:  
  [http://127.0.0.1:11434/](http://127.0.0.1:11434/)
- Pro spuštění je nutné spustit soubor `ollama app.exe`.

---

## ⚙️ Změna naslouchací adresy

<details>
<summary><span style="color:#1E90FF;">🔧 Nastavení OLLAMA_HOST</span></summary>

1. Otevřete **System variables** ve Windows.
2. Přidejte proměnnou prostředí **`OLLAMA_HOST`** s požadovanou adresou.
3. Restartujte aplikaci `ollama app.exe`.

> [!IMPORTANT]  
> Změna se projeví až po restartu aplikace.

</details>

---

## 🛑 Vypnutí automatického spuštění

<details>
<summary><span style="color:#1E90FF;">🛠️ Jak zakázat autostart Ollama</span></summary>

1. Stiskněte `Windows` + `R`.
2. Zadejte `shell:startup` a potvrďte.
3. Odstraňte zástupce na Ollama ze složky.

> [!NOTE]  
> Ollama se ve výchozím stavu spouští při startu počítače.

</details>

---

## 📝 Příkazy pro správu modelů

<details>
<summary><span style="color:#1E90FF;">📦 Zobrazení nainstalovaných modulů</span></summary>

```bash
ollama list
```
</details>

<details>
<summary><span style="color:#1E90FF;">⬇️ Stažení modelu</span></summary>

```bash
ollama run [model]
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Odstranění modelu</span></summary>

```bash
ollama rm [model]
```
</details>