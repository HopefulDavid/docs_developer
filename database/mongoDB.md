# MongoDB – Průvodce a reference

> Přehled základních pojmů, příkazů a doporučení pro práci s MongoDB.

---

<img src="./images/47b4d22e-f30e-46a1-bc78-9d1fbc371e6c.png" alt="" style="width: 60%; display: block; border-radius: 8px;">

## Co je MongoDB?

- **Dokumentová databáze** – data se ukládají jako dokumenty, ne tabulky.
- **NoSQL** – nevyužívá relační model jako SQL databáze.
- Data jsou uložena ve formátu **BSON** (binární JSON).

> [!NOTE]
> BSON podporuje více datových typů a je efektivnější při kódování/dekódování než JSON.

---

## Klíčové pojmy

| Pojem | Popis |
|-------|-------|
| **Dokument** | Základní datová jednotka, struktura podobná JSON |
| **Kolekce** | Sada dokumentů – ekvivalent tabulky v SQL. Dokumenty nemusí mít stejnou strukturu. |
| **BSON** | Binární verze JSON – interní formát pro ukládání dat |
| **Index** | Datová struktura pro rychlejší vyhledávání |

---

## Vytvoření

### Databáze a kolekce

```javascript
// Přepnutí na databázi (vytvoří ji, pokud neexistuje)
use mydb

// Vytvoření kolekce
mydb.createCollection('mycollection')
```

### Vložení dokumentů

```javascript
// Jeden dokument
mydb.mycollection.insert({ name: 'test' })

// Více dokumentů najednou
mydb.mycollection.insertMany([
  { name: 'test1' },
  { name: 'test2' }
])
```

### Indexy

```javascript
// Jeden index (1 = vzestupně, -1 = sestupně)
mydb.mycollection.createIndex({ name: 1 })

// Více indexů najednou
mydb.mycollection.createIndexes([
  { key: { name: 1 } },
  { key: { age: -1 } }
])
```

---

## Čtení

```javascript
// Výpis všech databází
show dbs

// Výpis kolekcí v aktuální databázi
show collections

// Všechny dokumenty v kolekci
mydb.mycollection.find()

// Filtrování podle hodnoty
mydb.mycollection.find({ name: 'test' })

// Projekce – vrátí jen vybraná pole
mydb.mycollection.find({ name: 'test' }, { name: 1 })

// Regulární výraz
mydb.mycollection.find({ name: { $regex: 'te.*' } })
```

---

## Počítání

```javascript
// Počet všech dokumentů
mydb.mycollection.count()

// Počet podle filtru
mydb.mycollection.count({ name: 'test' })

// Počet unikátních hodnot
mydb.mycollection.distinct('name').length

// Počet podle regulárního výrazu
mydb.mycollection.count({ name: { $regex: 'te.*' } })
```

---

## Aktualizace

```javascript
// Aktualizace jednoho dokumentu
mydb.mycollection.update(
  { name: 'test' },
  { $set: { name: 'newTest' } }
)

// Aktualizace více dokumentů
mydb.mycollection.updateMany(
  {},
  { $set: { name: 'newTest' } }
)

// Upsert – aktualizace nebo vložení, pokud dokument neexistuje
mydb.mycollection.update(
  { name: 'test' },
  { $set: { name: 'newTest' } },
  { upsert: true }
)
```

---

## Řazení a stránkování

```javascript
// Řazení vzestupně
mydb.mycollection.find().sort({ name: 1 })

// Řazení podle více polí
mydb.mycollection.find().sort({ name: 1, age: -1 })

// Limit počtu výsledků
mydb.mycollection.find().sort({ name: 1 }).limit(5)

// Přeskočení prvních N výsledků (stránkování)
mydb.mycollection.find().sort({ name: 1 }).skip(5)
```

---

## Smazání

```javascript
// Smazání jednoho dokumentu
mydb.mycollection.remove({ name: 'test' })

// Smazání všech dokumentů v kolekci
mydb.mycollection.remove({})

// Smazání celé kolekce
mydb.mycollection.drop()

// Smazání celé databáze
db.dropDatabase()
```
