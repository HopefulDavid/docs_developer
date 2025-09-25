# 📚 .NET – Kolekce & Datové typy

> 🚀 Praktické rady pro práci s kolekcemi v .NET, jejich vlastnosti, příklady použití a tipy pro efektivní správu dat.

---

## 🔄 FIFO/LIFO kolekce

<details>
<summary><span style="color:#1E90FF;">🚌 Queue (Fronta)</span></summary>

- **FIFO** – První vložený prvek je první odebraný.
- Představ si frontu lidí na autobus.

```csharp
Queue<int> queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
queue.Enqueue(3);
Console.WriteLine(queue.Dequeue()); // 1
```
</details>

<details>
<summary><span style="color:#1E90FF;">🎯 PriorityQueue</span></summary>

- Každý prvek má prioritu, vybírá se nejvyšší.
- Vhodné pro plánování úloh.

```csharp
PriorityQueue<int> queue = new PriorityQueue<int>();
queue.Enqueue(1, 2);
queue.Enqueue(2, 1);
queue.Enqueue(3, 3);
Console.WriteLine(queue.Dequeue()); // 2
```
</details>

<details>
<summary><span style="color:#1E90FF;">🍽️ Stack (Zásobník)</span></summary>

- **LIFO** – Poslední vložený prvek je první odebraný.
- Představ si hromadu talířů.

```csharp
Stack<int> stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
stack.Push(3);
Console.WriteLine(stack.Pop()); // 3
```
</details>

---

## 📋 Seznamy

<details>
<summary><span style="color:#1E90FF;">📑 List</span></summary>

- Indexovatelný seznam prvků.

```csharp
List<int> list = new List<int>();
list.Add(1);
list.Add(2);
list.Add(3);
Console.WriteLine(list[1]); // 2
list.RemoveAt(1);
Console.WriteLine(list[1]); // 3
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔗 LinkedList</span></summary>

- Efektivní úpravy, rychlé vkládání/mazání.

```csharp
LinkedList<int> linkedList = new LinkedList<int>();
linkedList.AddLast(1);
linkedList.AddLast(2);
linkedList.AddLast(3);
Console.WriteLine(linkedList.First.Value); // 1
linkedList.RemoveFirst();
Console.WriteLine(linkedList.First.Value); // 2
```
</details>

---

## 🗝️ Slovníky

<details>
<summary><span style="color:#1E90FF;">📖 Dictionary</span></summary>

- Kolekce klíč-hodnota, rychlé vyhledávání.

```csharp
Dictionary<string, int> dictionary = new Dictionary<string, int>();
dictionary.Add("key1", 1);
dictionary.Add("key2", 2);
Console.WriteLine(dictionary["key2"]); // 2
dictionary.Remove("key2");
Console.WriteLine(dictionary.ContainsKey("key2")); // false
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 SortedDictionary</span></summary>

- Automaticky seřazené podle klíčů.

```csharp
SortedDictionary<string, int> sortedDictionary = new SortedDictionary<string, int>();
sortedDictionary.Add("key3", 3);
sortedDictionary.Add("key1", 1);
Console.WriteLine(sortedDictionary.First().Key); // "key1"
```
</details>

---

## 🚫 Kolekce bez duplicit

<details>
<summary><span style="color:#1E90FF;">🔗 HashSet</span></summary>

- Množina bez duplicit, rychlé vyhledávání.

```csharp
HashSet<int> hashSet = new HashSet<int>();
hashSet.Add(1);
hashSet.Add(2);
Console.WriteLine(hashSet.Contains(2)); // true
hashSet.Remove(2);
Console.WriteLine(hashSet.Contains(2)); // false
```
</details>

<details>
<summary><span style="color:#1E90FF;">📦 Hashtable</span></summary>

- Starší kolekce klíč-hodnota.

```csharp
Hashtable hashtable = new Hashtable();
hashtable.Add("key1", 1);
Console.WriteLine(hashtable["key1"]); // 1
```
</details>

---

## 🧩 Tuple kolekce

<details>
<summary><span style="color:#1E90FF;">🧮 Tuple</span></summary>

- Kombinace různých typů v jedné kolekci.

```csharp
Tuple<int, string> tuple = new Tuple<int, string>(1, "Hello");
Console.WriteLine(tuple.Item1); // 1
Console.WriteLine(tuple.Item2); // "Hello"
```
</details>

<details>
<summary><span style="color:#1E90FF;">⚡ ValueTuple</span></summary>

- Rychlé vytváření, možnost pojmenování prvků.

```csharp
(var Shield, var Sword) = (1, "Hello");
Console.WriteLine(Shield); // 1
Console.WriteLine(Sword); // "Hello"
```
</details>

---

## 👀 Pozorovatelné kolekce

<details>
<summary><span style="color:#1E90FF;">🔔 ObservableCollection</span></summary>

- Upozorní na změny v kolekci.

```csharp
ObservableCollection<int> observableCollection = new ObservableCollection<int>();
observableCollection.CollectionChanged += (s, e) => Console.WriteLine("Collection changed");
observableCollection.Add(1);
```
</details>

---

## 🔒 Kolekce pouze pro čtení

<details>
<summary><span style="color:#1E90FF;">📚 ReadOnlyCollection</span></summary>

- Nelze měnit po vytvoření.

```csharp
List<int> list = new List<int> { 1, 2, 3 };
ReadOnlyCollection<int> readOnlyCollection = new ReadOnlyCollection<int>(list);
Console.WriteLine(readOnlyCollection[1]); // 2
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗝️ ReadOnlyDictionary</span></summary>

- Klíč-hodnota, pouze pro čtení.

```csharp
Dictionary<string, int> dictionary = new Dictionary<string, int> {
    { "key1", 1 }, { "key2", 2 }
};
ReadOnlyDictionary<string, int> readOnlyDictionary = new ReadOnlyDictionary<string, int>(dictionary);
Console.WriteLine(readOnlyDictionary["key2"]); // 2
```
</details>

---

## 🛡️ Neměnné kolekce

<details>
<summary><span style="color:#1E90FF;">🧊 ImmutableArray</span></summary>

- Pole, které nelze měnit.

```csharp
ImmutableArray<int> immutableArray = ImmutableArray.Create(1, 2, 3);
Console.WriteLine(immutableArray[1]); // 2
```
</details>

<details>
<summary><span style="color:#1E90FF;">📋 ImmutableList</span></summary>

- Seznam, který nelze měnit.

```csharp
ImmutableList<int> immutableList = ImmutableList.Create(1, 2, 3);
Console.WriteLine(immutableList[1]); // 2
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗝️ ImmutableDictionary</span></summary>

- Klíč-hodnota, neměnný.

```csharp
ImmutableDictionary<string, int> immutableDictionary = ImmutableDictionary.Create<string, int>();
immutableDictionary = immutableDictionary.Add("key1", 1);
Console.WriteLine(immutableDictionary["key1"]); // 1
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔗 ImmutableHashSet</span></summary>

- Množina, neměnná.

```csharp
ImmutableHashSet<int> immutableHashSet = ImmutableHashSet.Create(1, 2, 3);
Console.WriteLine(immutableHashSet.Contains(2)); // true
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔢 ImmutableSortedSet</span></summary>

- Seřazená množina, neměnná.

```csharp
ImmutableSortedSet<int> immutableSortedSet = ImmutableSortedSet.Create(3, 1, 2);
Console.WriteLine(immutableSortedSet.Min); // 1
```
</details>

<details>
<summary><span style="color:#1E90FF;">🚌 ImmutableQueue</span></summary>

- Fronta, neměnná.

```csharp
ImmutableQueue<int> immutableQueue = ImmutableQueue.Create(1, 2, 3);
Console.WriteLine(immutableQueue.Peek()); // 1
```
</details>

<details>
<summary><span style="color:#1E90FF;">🍽️ ImmutableStack</span></summary>

- Zásobník, neměnný.

```csharp
ImmutableStack<int> immutableStack = ImmutableStack.Create(1, 2, 3);
Console.WriteLine(immutableStack.Peek()); // 3
```
</details>

---

## 🧠 Paměťové kolekce

<details>
<summary><span style="color:#1E90FF;">💾 Memory</span></summary>

- Bezpečný přístup k paměti.

```csharp
Memory<int> memory = new Memory<int>(new int[] { 1, 2, 3 });
Console.WriteLine(memory.Span[1]); // 2
```
</details>

<details>
<summary><span style="color:#1E90FF;">🔍 Span</span></summary>

- Efektivní práce s pamětí.

```csharp
Span<int> span = new Span<int>(new int[] { 1, 2, 3 });
Console.WriteLine(span[1]); // 2
```
</details>

---

## 🕸️ Slabé reference

<details>
<summary><span style="color:#1E90FF;">🧬 WeakReference</span></summary>

- Umožňuje GC uvolnit objekt.

```csharp
WeakReference<int> weakReference = new WeakReference<int>(1);
Console.WriteLine(weakReference.TryGetTarget(out int value)); // true
```
</details>

---

## 🧵 Kolekce pro více vláken

<details>
<summary><span style="color:#1E90FF;">🚌 ConcurrentQueue</span></summary>

- Fronta bezpečná pro více vláken.

```csharp
ConcurrentQueue<int> concurrentQueue = new ConcurrentQueue<int>();
concurrentQueue.Enqueue(1);
Console.WriteLine(concurrentQueue.TryDequeue(out int value)); // true
```
</details>

<details>
<summary><span style="color:#1E90FF;">🍽️ ConcurrentStack</span></summary>

- Zásobník bezpečný pro více vláken.

```csharp
ConcurrentStack<int> concurrentStack = new ConcurrentStack<int>();
concurrentStack.Push(1);
Console.WriteLine(concurrentStack.TryPop(out int value)); // true
```
</details>

<details>
<summary><span style="color:#1E90FF;">🗝️ ConcurrentDictionary</span></summary>

- Klíč-hodnota, bezpečné pro více vláken.

```csharp
ConcurrentDictionary<string, int> concurrentDictionary = new ConcurrentDictionary<string, int>();
concurrentDictionary.TryAdd("key1", 1);
Console.WriteLine(concurrentDictionary["key1"]); // 1
```
</details>

<details>
<summary><span style="color:#1E90FF;">👜 ConcurrentBag</span></summary>

- Kolekce bezpečná pro více vláken.

```csharp
ConcurrentBag<int> concurrentBag = new ConcurrentBag<int>();
concurrentBag.Add(1);
Console.WriteLine(concurrentBag.TryTake(out int value)); // true
```
</details>

<details>
<summary><span style="color:#1E90FF;">⏳ BlockingCollection</span></summary>

- Blokuje vlákno při prázdné/plné kolekci.

```csharp
BlockingCollection<int> blockingCollection = new BlockingCollection<int>();
Task.Run(() => blockingCollection.Add(1));
Console.WriteLine(blockingCollection.Take()); // 1
```
</details>