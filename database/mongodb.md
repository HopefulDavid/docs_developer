---
description: "Výběr databáze a čtení či změny dokumentů v mongosh."
---

# MongoDB – příkazy v mongosh

MongoDB ukládá dokumenty BSON do kolekcí; následující příklady jsou pro interaktivní shell `mongosh`.

## Databáze a kolekce

Připoj se ke své vývojové instanci a vyber databázi:

```javascript
show dbs
use docs_demo
db
show collections
```

`use` změní aktuální databázi reprezentovanou proměnnou `db`; databáze vznikne až při prvním zápisu, pokud dosud neexistuje. [Příkazy mongosh](https://www.mongodb.com/docs/mongodb-shell/run-commands/)

## Vložení a čtení

```javascript
db.users.insertOne({ name: "Jana", age: 28 })
db.users.insertMany([
  { name: "Petr", age: 17 },
  { name: "Eva", age: 35 }
])
db.users.find({ age: { $gte: 18 } })
db.users.findOne({ name: "Jana" })
db.users.countDocuments({ age: { $gte: 18 } })
```

Opakované vložení vytvoří další dokumenty; jméno není automaticky unikátní. [CRUD operace](https://www.mongodb.com/docs/manual/crud/)

Pro výběr sloupců, řazení a omezení výsledků:

```javascript
db.users.find({}, { _id: 0, name: 1, age: 1 })
db.users.find().sort({ age: -1, _id: 1 }).limit(10)
db.users.find().sort({ age: -1, _id: 1 }).skip(10).limit(10)
```

`_id` se standardně vrací i při projekci vybraných polí, pokud jej výslovně nevypneš.

Jedinečné `_id` doplňuje jednoznačné pořadí při shodném věku; změny dat mezi dotazy přesto mohou posunout stránkování. [Find a projekce](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)

## Změny a odstranění

Před zápisem si stejným filtrem `find` prohlédni cílové dokumenty.

```javascript
db.users.updateOne({ name: "Jana" }, { $set: { age: 29 } })
db.users.updateMany({ age: { $lt: 18 } }, { $set: { minor: true } })
db.users.deleteOne({ name: "Petr" })
db.users.deleteMany({ minor: true })
```

Metody s `One` mění nejvýše jeden odpovídající dokument, `Many` všechny odpovídající dokumenty.

Prázdný filtr u `deleteMany({})` odstraní celý obsah kolekce. [CRUD operace](https://www.mongodb.com/docs/manual/crud/)

## Indexy

```javascript
db.users.createIndex({ name: 1 })
db.users.createIndexes([{ age: -1 }, { name: 1, age: 1 }])
db.users.getIndexes()
```

Každá položka pole v `createIndexes` je přímo specifikace klíčů jednoho indexu.

Složený index `{name: 1, age: 1}` není totéž co dva samostatné indexy. [CreateIndexes](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndexes/)

## Odstranění kolekce nebo databáze

Až po ověření `db.getName()` a uchování potřebných dat lze použít `db.users.drop()` pro kolekci nebo `db.dropDatabase()` pro aktuální databázi.

Tyto operace nejsou běžným ukončením práce. [Drop database](https://www.mongodb.com/docs/manual/reference/method/db.dropDatabase/)
