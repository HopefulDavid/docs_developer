# Praktické použití Gitu

> Reálné postupy pro bezpečné přepsání remote větve, force push a práci s historií commitů.

---

## Proč někdy přepisujeme vzdálenou větev?

- 🔄 Po `rebase` nebo `commit --amend` se mění historie větve.
- 🚫 Při push může vzniknout chyba **`non-fast-forward`** – remote větev má nové commity, které nejsou v lokální větvi.
- 🛡️ Chceme zachovat vlastní změny, ale **nechceme přijít o cizí práci**.

---

## Jak Git chrání historii?

- 🚧 **Non-fast-forward** push je zablokován, aby se nechtěně nepřepsaly cizí commity.
- ✅ Git vyžaduje explicitní potvrzení, že víš, co děláš.

---

## Doporučený workflow krok za krokem

1️⃣ **Aktualizuj si remote:**
   ```bash
   git fetch origin
   ```
📥 Získáš aktuální stav vzdálené větve.

2️⃣ **Proveď změny** (např. `rebase`, `commit --amend`)

3️⃣ **Bezpečně pushni změny:**
   ```bash
   git push origin main --force-with-lease
   ```
🛡️ Přepíše vzdálenou větev **jen pokud se nezměnila od tvého posledního fetch/pullu**.

---

## Co dělat při chybě?

- ❌ Push s `--force-with-lease` selže, pokud někdo mezitím pushnul nové změny.
- 🔄 Stáhni je (`git fetch`), vyřeš konflikty a workflow opakuj.

---

## Rizika & doporučení

- 💣 **`git push --force`** přepíše remote bez kontroly – použij **jen pokud jsi jediný na větvi**!
- 📢 Vždy informuj tým, pokud musíš přepisovat historii.

---

## Slovníček pojmů

- ⏩ **Fast-forward**: Push bez konfliktu, remote větev je přímo navazující.
- 🚫 **Non-fast-forward**: Remote větev má nové commity, které nejsou v tvé větvi.
- 💣 **Force push**: Přepíše remote větev bez kontroly.
- 🛡️ **Force-with-lease**: Přepíše remote větev jen pokud se nezměnila od tvého posledního fetch/pullu.