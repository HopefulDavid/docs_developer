# 🗂️ MongoDB – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, příkazů a doporučení pro práci s MongoDB.

---

## 📖 Co je MongoDB?

- **Dokumentová databáze**
- **NoSQL** – nevyužívá tabulkový formát jako SQL databáze
- Data ukládá ve formátu **BSON** (binární JSON)

> [!NOTE]  
> BSON podporuje více datových typů a je efektivnější při kódování/dekódování než JSON.

---

## 🧩 Klíčové pojmy

<details>
<summary><span style="color:#1E90FF;">📄 Dokumenty</span></summary>
Záznamy v MongoDB, struktura podobná JSON.
</details>

<details>
<summary><span style="color:#1E90FF;">📚 Kolekce</span></summary>
- Ekvivalent tabulky v SQL.
- Obsahuje dokumenty, které nemusí mít stejnou strukturu.

```javascript
var document1 = { name: "Peter", age: 30, residence: "Prague" };
db.myPeople.insert(document1);

var document2 = { name: "Anna", age: 25, occupation: "Engineer" };
db.myPeople.insert(document2);
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗃️ BSON</span></summary>
Binární verze JSON, formát pro ukládání dat v MongoDB.
</details>

---

## 🛠️ Základní operace

### Vytvoření

<details>
<summary><span style="color:#1E90FF;">🗄️ Databáze</span></summary>

```javascript
use mydb
```
</details>

<details>
<summary><span style="color:#1E90FF;">📁 Kolekce</span></summary>

```javascript
mydb.createCollection('mycollection')
```
</details>

<details>
<summary><span style="color:#1E90FF;">➕ Vložit dokument</span></summary>

```javascript
mydb.mycollection.insert({name: 'test'})
```
</details>

<details>
<summary><span style="color:#1E90FF;">➕ Vložit více dokumentů</span></summary>

```javascript
mydb.mycollection.insertMany([{name: 'test1'}, {name: 'test2'}])
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔎 Vytvořit index</span></summary>

```javascript
mydb.mycollection.createIndex({name: 1})
```
> [!TIP]  
> 1 = vzestupně, -1 = sestupně
</details>

<details>
<summary><span style="color:#1E90FF;">🔎 Vytvoření více indexů</span></summary>

```javascript
mydb.mycollection.createIndexes([{ key: { name: 1 } }, { key: { age: -1 } }])
```
</details>

---

### Hledání

<details>
<summary><span style="color:#1E90FF;">📋 Výpis databází</span></summary>

```javascript
show dbs
```
</details>

<details>
<summary><span style="color:#1E90FF;">📄 Výpis dokumentů</span></summary>

```javascript
mydb.mycollection.find()
```
</details>

<details>
<summary><span style="color:#1E90FF;">📁 Výpis kolekcí</span></summary>

```javascript
show collections
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔍 Hledání dokumentu</span></summary>

```javascript
mydb.mycollection.find({name: 'test'})
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔍 Hledání s určitými poli</span></summary>

```javascript
mydb.mycollection.find({name: 'test'}, {name: 1})
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔍 Hledání s regulárním výrazem</span></summary>

```javascript
mydb.mycollection.find({name: {$regex: 'te.*'}})
```
</details>

---

### Aktualizace

<details>
<summary><span style="color:#1E90FF;">✏️ Aktualizace dokumentu</span></summary>

```javascript
mydb.mycollection.update({name: 'test'}, {$set: {name: 'newTest'}})
```
</details>

<details>
<summary><span style="color:#1E90FF;">✏️ Aktualizace více dokumentů</span></summary>

```javascript
mydb.mycollection.updateMany({}, {$set: {name: 'newTest'}})
```
</details>

<details>
<summary><span style="color:#1E90FF;">✏️ Aktualizace s upsert</span></summary>

```javascript
mydb.mycollection.update({name: 'test'}, {$set: {name: 'newTest'}}, {upsert: true})
```
> [!NOTE]  
> Upsert = update nebo insert, pokud dokument neexistuje.
</details>

---

### Smazání

<details>
<summary><span style="color:#1E90FF;">🗑️ Smazání databáze</span></summary>

```javascript
db.dropDatabase()
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Smazání kolekce</span></summary>

```javascript
mydb.mycollection.drop()
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Smazání dokumentu</span></summary>

```javascript
mydb.mycollection.remove({name: 'test'})
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗑️ Smazání všech dokumentů</span></summary>

```javascript
mydb.mycollection.remove({})
```
</details>

---

### Počet

<details>
<summary><span style="color:#1E90FF;">🔢 Počet dokumentů v kolekci</span></summary>

```javascript
mydb.mycollection.count()
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 Počet dokumentů podle dotazu</span></summary>

```javascript
mydb.mycollection.count({name: 'test'})
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 Počet unikátních hodnot</span></summary>

```javascript
mydb.mycollection.distinct('name').length
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 Počet podle regulárního výrazu</span></summary>

```javascript
mydb.mycollection.count({name: {$regex: 'te.*'}})
```
</details>

---

### Řazení

<details>
<summary><span style="color:#1E90FF;">↕️ Řazení podle pole</span></summary>

```javascript
mydb.mycollection.find().sort({name: 1})
```
</details>

<details>
<summary><span style="color:#1E90FF;">↕️ Řazení podle více polí</span></summary>

```javascript
mydb.mycollection.find().sort({name: 1, age: -1})
```
</details>

<details>
<summary><span style="color:#1E90FF;">↕️ Řazení a limit</span></summary>

```javascript
mydb.mycollection.find().sort({name: 1}).limit(5)
```
</details>

<details>
<summary><span style="color:#1E90FF;">↕️ Řazení a skip</span></summary>

```javascript
mydb.mycollection.find().sort({name: 1}).skip(5)
```
</details>