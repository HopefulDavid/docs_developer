## Co je MongoDB

= Dokumentová databáze

- NoSQL (typ databáze)

  > [!NOTE]
  > Nevyužívá tabulkový formát, který je běžný u SQL databází.

- Data ukládá ve formátu zvaném **`BSON`**. (Binární verze formátu `JSON`)

  > [!TIP]
  > Formát `BSON` podporuje více datových typů.
  >
  > Efektivnější při encoding a decoding než `JSON`.

## Klíčové pojmy

<details>
<summary><span style="color:#1E90FF;">Dokumenty</span></summary>

Záznamy v MongoDB.

> [!NOTE]
> Každý dokument je struktura dat podobná JSON.

</details>

<details>
<summary><span style="color:#1E90FF;">Kolekce</span></summary>

- Data jsou organizována do **`kolekce`**

  > [!NOTE]
  > Jsou to ekvivalenty tabulek v SQL.

- Každá kolekce obsahuje **`dokumenty`**, což jsou jednotlivé záznamy dat.

  > [!NOTE]
  > Na rozdíl od řádků v tabulce SQL nemusí mít dokumenty v MongoDB stejnou strukturu.
  >
  > To znamená, že různé dokumenty ve stejné kolekci mohou mít různé sady polí.
  >
  > Příklad:
  >
  >```Javascript
  > var document1 = { name: "Peter", age: 30, residence: "Prague" };
  > db.myPeople.insert(document1);
  >
  > var document2 = { name: "Anna", age: 25, occupation: "Engineer" };
  > db.myPeople.insert(document2);
  >```

</details>

<details>
<summary><span style="color:#1E90FF;">BSON</span></summary>

Formát ve kterém jsou data uložena.

> [!NOTE]
> Je to binární verze JSON.

</details>

## Kód

### Vytvořit

<details>
<summary><span style="color:#1E90FF;">Databázi</span></summary>

```Javascript
use mydb
```

</details>

<details>
<summary><span style="color:#1E90FF;">Kolekci</span></summary>

```Javascript
mydb.createCollection('mycollection')
```

</details>

<details>
<summary><span style="color:#1E90FF;">Vložit dokument do kolekce</span></summary>

```Javascript
mydb.mycollection.insert({name: 'test'})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Vložit více dokumentů do kolekce</span></summary>

```Javascript
mydb.mycollection.insertMany([{name: 'test1'}, {name: 'test2'}])
```

</details>

<details>
<summary><span style="color:#1E90FF;">Vytvořit index</span></summary>

  ```Javascript
  mydb.mycollection.createIndex({name: 1})
  ```

> [!TIP]
> Index je vytvořen na pole `name`
>
> Vzestupný = 1
>
> Sestupný = -1
>
> Vzestupné a sestupné indexy určují pořadí, ve kterém jsou data v indexu uložena, což může ovlivnit výkon a rychlost
> dotazů, které vyžadují řazení

</details>

<details>
<summary><span style="color:#1E90FF;">Vytvoření více indexů</span></summary>

  ```Javascript
  mydb.mycollection.createIndexes([{ key: { name: 1 } }, { key: { age: -1 } }])
  ```

</details>

### Hledat

<details>
<summary><span style="color:#1E90FF;">Výpis databází</span></summary>

```Javascript
show dbs
```

</details>

<details>
<summary><span style="color:#1E90FF;">Výpis dokumentů</span></summary>

```Javascript
mydb.mycollection.find()
```

</details>

<details>
<summary><span style="color:#1E90FF;">Výpis kolekcí</span></summary>

```Javascript
show collections
```

</details>

<details>
<summary><span style="color:#1E90FF;">Hledání dokumentu</span></summary>

```Javascript
mydb.mycollection.find({name: 'test'})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Hledání dokumentu s určitými poli</span></summary>

```Javascript
mydb.mycollection.find({name: 'test'}, {name: 1})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Hledání dokumentu s regulárním výrazem</span></summary>

```Javascript
mydb.mycollection.find({name: {$regex: 'te.*'}})
```

</details>

### Aktualizovat

<details>
<summary><span style="color:#1E90FF;">Aktualizace dokumentu</span></summary>

```Javascript
mydb.mycollection.update({name: 'test'}, {$set: {name: 'newTest'}})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Aktualizace více dokumentů</span></summary>

 ```Javascript
 mydb.mycollection.updateMany({}, {$set: {name: 'newTest'}})
 ```

</details>

<details>
<summary><span style="color:#1E90FF;">Aktualizace dokumentu s upsert</span></summary>

```Javascript
mydb.mycollection.update({name: 'test'}, {$set: {name: 'newTest'}}, {upsert: true})
```

> [!NOTE]  
> "upsert" **je kombinací "update" a "insert"**
>
> Aktualizuje existující dokument, nebo pokud dokument neexistuje, vloží nový dokument.

</details>

### Smazat

<details>
<summary><span style="color:#1E90FF;">Smazání databáze</span></summary>

```Javascript
db.dropDatabase()
```

</details>

<details>
<summary><span style="color:#1E90FF;">Smazání kolekce</span></summary>

```Javascript
mydb.mycollection.drop()
```

</details>

<details>
<summary><span style="color:#1E90FF;">Smazání dokumentu</span></summary>

```Javascript
mydb.mycollection.remove({name: 'test'})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Smazání všech dokumentů</span></summary>

 ```Javascript
 mydb.mycollection.remove({})
 ```

</details>

### Počet

<details>
<summary><span style="color:#1E90FF;">Počet dokumentů v kolekci</span></summary>

```Javascript
mydb.mycollection.count()
```

</details>

<details>
<summary><span style="color:#1E90FF;">Počet dokumentů odpovídajících určitému dotazu</span></summary>

```Javascript
mydb.mycollection.count({name: 'test'})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Počet unikátních hodnot v určitém poli</span></summary>

```Javascript
mydb.mycollection.distinct('name').length
```

</details>

<details>
<summary><span style="color:#1E90FF;">Počet dokumentů odpovídajících regulárnímu výrazu</span></summary>

```Javascript
mydb.mycollection.count({name: {$regex: 'te.*'}})
```

</details>

### Setřídit

<details>
<summary><span style="color:#1E90FF;">Seřazení dokumentů podle pole</span></summary>

```Javascript
mydb.mycollection.find().sort({name: 1})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Seřazení dokumentů podle více políí</span></summary>

```Javascript
mydb.mycollection.find().sort({name: 1, age: -1})
```

</details>

<details>
<summary><span style="color:#1E90FF;">Seřazení a omezení počtu dokumentů</span></summary>

```Javascript
mydb.mycollection.find().sort({name: 1}).limit(5)
```

</details>

<details>
<summary><span style="color:#1E90FF;">Seřazení a přeskočení dokumentů</span></summary>

```Javascript
mydb.mycollection.find().sort({name: 1}).skip(5)
```

</details>

## Rady a Tipy

<details>
<summary><span style="color:#1E90FF;">Povolení autorizace</span></summary>

- MongoDB má vestavěný systém pro správu uživatelů a rolí.

  Pro povolení autorizace upravte konfigurační soubor MongoDB a nastavte `security.authorization` na `enabled`.

  ```bash
  security:
    authorization: "enabled"
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Využití indexů</span></summary>

- Indexy v MongoDB vytváříte pomocí metody `createIndex()`.

  Například pro vytvoření vzestupného indexu na pole `name` v kolekci `mycollection` použijete následující příkaz:

  ```Javascript
  db.mycollection.createIndex({name: 1})
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Optimalizace dotazů</span></summary>

- MongoDB poskytuje operátor `explain()`, který vám umožní zjistit, jak databáze vykonává váš dotaz.

  Tímto způsobem můžete identifikovat, které části dotazu je třeba optimalizovat.

  ```Javascript
  db.mycollection.find({name: 'test'}).explain()
  ```

</details>

<details>
<summary><span style="color:#1E90FF;">Správné modelování dat</span></summary>

- MongoDB je dokumentová databáze, která umožňuje velmi flexibilní modelování dat.

  Při návrhu vašeho datového modelu zvažte, jak budou data dotazována a jaké budou pracovní zátěže.

</details>

<details>
<summary><span style="color:#1E90FF;">Škálování</span></summary>

- MongoDB podporuje horizontální škálování pomocí replikačních sad a sharding.

  Pro větší aplikace zvažte použití těchto funkcí pro zlepšení výkonu a dostupnosti.

</details>

<details>
<summary><span style="color:#1E90FF;">Paměť</span></summary>

- MongoDB využívá paměť pro ukládání pracovní sady, což zlepšuje výkon dotazů.

  Ujistěte se, že váš server má dostatek RAM pro vaše pracovní zátěže.

</details>

<details>
<summary><span style="color:#1E90FF;">Šetření prostředky</span></summary>

- Pokud máte dotazy, které se často opakují, zvažte ukládání výsledků těchto dotazů pro pozdější použití.

  To může šetřit výpočetní prostředky a zlepšit výkon vaší aplikace.

</details>