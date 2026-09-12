# Návrhové vzory

Návrhový vzor je pojmenované řešení opakujícího se problému se vztahy mezi objekty nebo částmi programu.

Pomáhá popsat návrh a jeho kompromisy; není to hotová knihovna ani požadavek přidávat do každého programu více tříd.

## K čemu slouží

Nejprve pojmenuj konkrétní problém, například „výpočet dopravy se mění podle dopravce“.

Teprve potom vybírej strukturu, která změnu oddělí od zbytku programu.

Pokud vystačíš s přehlednou funkcí, není nutné zavádět složitější vzor.

## Přehled kategorií

| Kategorie | Řeší | Typické vzory |
|---|---|---|
| Vytvářecí | Jak vznikají objekty | Factory Method, Abstract Factory, Builder, Prototype, Singleton |
| Strukturální | Jak se části skládají a přizpůsobují | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy |
| Vzory chování | Jak spolu části komunikují a mění chování | Strategy, Observer, Command, State, Chain of Responsibility, Iterator, Mediator, Memento, Template Method, Visitor, Interpreter |

Singleton zavádí jedinou instanci, ale skrytý globální stav může komplikovat testování a souběh.

Pouhé `if` vybírající typ objektu bývá jednoduchá továrna; Factory Method v klasickém významu dovoluje podtřídám změnit vytvářený typ.

## Před použitím ukázek

Ukázky jsou samostatný moderní JavaScript bez knihoven a lze je spustit v konzoli prohlížeče nebo jako soubor pomocí Node.js.

Každý blok vlož do vlastního souboru `priklad.js` a v jeho složce spusť následující příkaz.

```bash
# Node.js provede soubor a vypíše výsledky console.log do terminálu.
node priklad.js
```

## Strategy: zaměnitelný výpočet

Objednávka potřebuje cenu dopravy, ale nemusí znát pravidla každého dopravce.

V JavaScriptu může strategii představovat obyčejná funkce.

```javascript
// Parametrem je cena zboží v Kč; výstupem je cena dopravy v Kč.
const personalPickup = () => 0;
const courier = subtotal => subtotal >= 1500 ? 0 : 99;

function totalPrice(subtotal, shippingStrategy) {
  return subtotal + shippingStrategy(subtotal);
}

console.log(totalPrice(500, personalPickup)); // 500
console.log(totalPrice(500, courier));        // 599
```

Částky `1500` a `99` jsou obchodní pravidla ukázkového dopravce a můžeš je změnit.

V reálné aplikaci doplň validaci vstupů a dohodnutou reprezentaci peněz, například celé haléře.

## Adapter: sjednocení rozhraní

Adaptér překládá rozhraní existující služby na to, které očekává klientský kód.

```javascript
class LegacyCatalog {
  getProductName(id) { return id === 1 ? 'Klávesnice' : null; }
}

class CatalogAdapter {
  constructor(legacyCatalog) { this.legacyCatalog = legacyCatalog; }

  findProduct(id) {
    const name = this.legacyCatalog.getProductName(id);
    // Klient dostává objekt nebo null, nikoli samotný řetězec.
    return name === null ? null : { id, name };
  }
}

const catalog = new CatalogAdapter(new LegacyCatalog());
console.log(catalog.findProduct(1)); // { id: 1, name: 'Klávesnice' }
console.log(catalog.findProduct(2)); // null
```

Při výměně katalogu upravíš adaptér, zatímco klient může dál používat `findProduct`.

Adaptér sám neřeší síťové chyby ani rozdílný význam dat; tyto rozdíly musí mít výslovné pravidlo.

## Observer: oznámení změny

Pozorovatel umožňuje více odběratelům reagovat na událost, aniž by vydavatel znal jejich konkrétní implementaci.

```javascript
class Subject {
  listeners = new Set();

  subscribe(listener) {
    this.listeners.add(listener);
    // Odběratel dostane možnost ukončit odběr.
    return () => this.listeners.delete(listener);
  }

  notify(value) {
    // Snímek zabrání změně právě procházeného seznamu odběratelů.
    for (const listener of [...this.listeners]) listener(value);
  }
}

const saved = new Subject();
const unsubscribe = saved.subscribe(id => console.log(`Uložena objednávka ${id}`));
saved.notify(42); // Uložena objednávka 42
unsubscribe();
saved.notify(43); // Odhlášený odběratel už nic nevypíše.
```

Tato varianta volá odběratele synchronně a chyba jednoho volání přeruší oznamování.

Pro asynchronní události, izolaci chyb nebo frontu zpráv je potřeba navrhnout další pravidla.

## Co lze upravit a jak ověřit návrh

Názvy tříd, datové typy a konkrétní strategie přizpůsob doméně projektu.

Zkontroluj, zda umíš přidat další variantu bez změny všech klientů a zda test pokrývá i chybový nebo prázdný vstup.

Vzor má snížit počet míst, kterým musíš při změně rozumět; pokud jen přidává vrstvy bez přínosu, zjednoduš návrh.

## Související témata

[Rozhraní v C#](csharp/interface.md) ukazuje typový kontrakt, [komentáře](code-comments.md) vysvětlení záměru.

[Starší přehled vzorů v PDF](../pdf/dev_design_patterns.pdf) slouží jako doplňkový studijní materiál, nikoli jako zdroj ověřených spustitelných ukázek této stránky.
