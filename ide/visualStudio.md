# 🖥️ Visual Studio – Offline instalace & tipy

> 🚀 Praktické rady pro stažení a instalaci Visual Studio Community offline.

---

## 📥 Stažení instalátoru pro offline použití

<details>
<summary><span style="color:#1E90FF;">🔽 Kompletní postup stažení</span></summary>

1. **Stáhněte instalátor**  
   Získejte `vs_community.exe` z [oficiálních stránek Visual Studio](https://visualstudio.microsoft.com/cs/downloads/).

2. **Přesuňte se do složky s instalátorem**  
   Například:  
   `C:\Users\<VašeJméno>\Stažené\`

3. **Otevřete příkazový řádek**  
   Spusťte `cmd` jako správce.

4. **Spusťte příkaz pro offline stažení:**

   ```bash
   vs_community.exe --layout C:\visualstudio_offline --lang cs-CZ en-US --all
   ```

   - `--layout` určuje cílovou složku pro instalační soubory.
   - `--lang` nastavuje jazyky (čeština, angličtina).
   - `--all` stáhne všechny dostupné komponenty včetně volitelných modulů.

> [!NOTE]  
> Po dokončení se vytvoří složka `visualstudio_offline` s kompletními instalačními soubory.

</details>