# ✍️ Komentářové konvence v kódu

Definuje sadu konvencí pro komentáře v kódu, které pomáhají vývojářům rychle identifikovat různé typy poznámek a úkolů.

---

### ✅ // TODO: Co je potřeba dodělat

Označ místo, kde je potřeba něco dodělat nebo implementovat.

```csharp
// TODO: Přidat validaci vstupních dat
```

---

### 🐞 // FIXME: Oprava chyby

Označ místo, kde je chyba, kterou je nutné opravit.

```csharp
// FIXME: Metoda vrací špatný výsledek při nulovém vstupu
```

---

### 💡 // NOTE: Poznámka nebo vysvětlení

Použij pro poznámky nebo vysvětlení, proč je něco udělané určitým způsobem.

```csharp
// NOTE: Používáme synchronní volání kvůli kompatibilitě s legacy systémem
```

---

### 🧠 // HACK: Rychlé (neideální) řešení

Označ workaround nebo neideální řešení, které funguje.

```csharp
// HACK: Obcházíme bug v knihovně pomocí této kontroly
```

---

### 📌 // REVIEW: Kód ke kontrole

Použij, když si nejsi jistý a chceš kód později zkontrolovat nebo prodiskutovat.

```csharp
// REVIEW: Je tento algoritmus dostatečně efektivní pro velké množství dat?
```

---

### 🎯 // OPTIMIZE: Prostor pro zlepšení

Označ místo, které lze časem optimalizovat.

```csharp
// OPTIMIZE: Cyklus by šel paralelizovat pro vyšší výkon
```