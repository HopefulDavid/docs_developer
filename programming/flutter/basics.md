## Základní znalosti

### Co je Riverpod?

- **Riverpod** je knihovna pro správu stavu ve Flutteru.
- Pomáhá jednoduše sdílet data (např. uživatele, nastavení, seznamy) mezi různými částmi aplikace.
- Místo toho, abys data tahal ručně, použiješ tzv. **provider** a data si "vytáhneš" kdekoliv v aplikaci.

**Příklad:**  
Chci vědět, kdo je přihlášený uživatel. Vytvořím provider a pak ho použiju v jakémkoliv widgetu.

---

## 1. Co je `StatelessWidget`?

- **Neumí si nic pamatovat.**
- Jen zobrazí UI podle vstupních dat.
- Nepoužívá žádný vnitřní stav, žádné změny, žádné reakce na události.

**Použití:**  
Když potřebuješ jen vykreslit něco jednoduchého, co se nemění.

---

## 2. Co je `StatefulWidget`?

- **Umí si pamatovat stav.**
- Může reagovat na změny, ukládat si data, spouštět kód při startu (`initState`) a při zavření (`dispose`).
- Hodí se, když potřebuješ např. načítat data, čekat na odpověď, reagovat na kliknutí, animace apod.

**Použití:**  
Když stránka potřebuje něco sledovat, měnit, nebo reagovat na události.

---

## 3. Co je `ConsumerWidget`?

- **Speciální typ StatelessWidgetu pro Riverpod.**
- Umožňuje jednoduše číst data z providerů (Riverpod).
- Nemá vlastní stav, ale umí reagovat na změny v datech z provideru.

**Použití:**  
Když chceš zobrazit data z Riverpod provideru, ale nepotřebuješ vlastní stav.

---

## Kdy použít co?

- **StatelessWidget** – jednoduché zobrazení, žádný stav, žádné změny.
- **StatefulWidget** – složitější logika, potřeba pamatovat si stav, reagovat na změny, používat `initState`/`dispose`.
- **ConsumerWidget** – jednoduché zobrazení dat z Riverpod provideru, bez vlastního stavu.

---

## Proč není všude `ConsumerWidget`?

- `ConsumerWidget` neumí mít vlastní stav ani životní cyklus (`initState`, `dispose`).
- Pokud potřebuješ vlastní stav nebo reagovat na start/zavření stránky, použij `StatefulWidget`.
- Pokud jen čteš data z provideru a nepotřebuješ stav, použij `ConsumerWidget`.

---

## Jednoduché příklady

```dart
// 1. StatelessWidget – jen vykreslí text
class JednoduchaStranka extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text('Ahoj světe!');
  }
}

// 2. ConsumerWidget – čte data z provideru (Riverpod)
final userProvider = Provider((ref) => 'Pepa');

class HomePage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    return Text('Ahoj, $user');
  }
}

// 3. StatefulWidget – umí si pamatovat stav a reagovat na změny
class PurchaseCodePage extends StatefulWidget {
  @override
  State<PurchaseCodePage> createState() => PurchaseCodePageState();
}

class PurchaseCodePageState extends State<PurchaseCodePage> {
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    // Tady začíná sledování nákupu
  }

  @override
  void dispose() {
    // Tady končí sledování nákupu
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return _loading ? CircularProgressIndicator() : Text('Koupit aplikaci');
  }
}
```

---

## Shrnutí v jedné větě

- **StatelessWidget** = nic si nepamatuje, jen vykreslí.
- **StatefulWidget** = umí si pamatovat, reaguje na změny, složitější logika.
- **ConsumerWidget** = jednoduché zobrazení dat z Riverpod provideru.
- **Riverpod** = knihovna na sdílení a správu dat v aplikaci.