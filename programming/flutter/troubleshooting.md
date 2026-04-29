## Řešení problémů ve Flutteru

---

### Automatické zmenšení textu bez doplňků

Použijte kombinaci `Expanded` a `FittedBox` pro automatické přizpůsobení velikosti textu:

```dart
Expanded(
  child: FittedBox(
    fit: BoxFit.scaleDown,
    child: Text('${widget.article.price * chosenQuantity} DH',
      style: const TextStyle(fontSize: 25, fontWeight: FontWeight.w700),
    ),
  ),
)
```

---

### Vypnutí pravidla `no_logic_in_create_state`

**Jak vypnout linter pravidlo:**

1. Otevřete soubor `analysis_options.yaml` v kořenovém adresáři projektu.
2. Přidejte následující konfiguraci:

```yaml
linter:
  rules:
    no_logic_in_create_state: false
```

3. Uložte soubor a restartujte IDE.

---

### Chyba: Building with plugins requires symlink support

Pokud se zobrazí tato chyba na Windows, je potřeba povolit `Developer Mode`:

1. Stiskněte `Win + R`
2. Zadejte `ms-settings:developers` a potvrďte
3. Povolte `Developer Mode` (Režim pro vývojáře)