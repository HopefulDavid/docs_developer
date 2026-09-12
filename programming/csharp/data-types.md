---
description: "Výběr kolekcí podle způsobu přístupu, vyhledávání a změn dat."
---

# .NET – kolekce a související typy

Kolekci vybírej podle přístupu k prvkům, pořadí, jedinečnosti a požadavků na souběh.

## Seznamy, slovníky a množiny

| Typ | Vhodné použití |
|---|---|
| `T[]` | Indexovaný počet prvků, který se po vytvoření pole nemění |
| `List<T>` | Běžný měnitelný seznam |
| `LinkedList<T>` | Vkládání a mazání přes známý uzel; nalezení uzlu stále může vyžadovat průchod |
| `Dictionary<TKey,TValue>` | Vyhledání hodnoty podle jedinečného klíče |
| `SortedDictionary<TKey,TValue>` | Slovník s pořadím podle klíče |
| `HashSet<T>` | Jedinečné hodnoty podle použitého porovnávače |
| `SortedSet<T>` | Jedinečné hodnoty v seřazeném pořadí |

Starší `Hashtable` je negenerický slovník, nikoli množina; pro nový typovaný kód zpravidla použij `Dictionary<TKey,TValue>`. [Výběr kolekce](https://learn.microsoft.com/en-us/dotnet/standard/collections/selecting-a-collection-class)

## FIFO/LIFO kolekce

`Queue<T>` vrací prvky v pořadí vložení, `Stack<T>` od posledního vloženého.

```csharp
var queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
Console.WriteLine(queue.Dequeue()); // 1

var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
Console.WriteLine(stack.Pop()); // 2
```

`PriorityQueue<TElement,TPriority>` má dva typové parametry a odebírá nejnižší hodnotu priority:

```csharp
var jobs = new PriorityQueue<string, int>();
jobs.Enqueue("Běžná úloha", 10);
jobs.Enqueue("Naléhavá úloha", 1);
Console.WriteLine(jobs.Dequeue()); // Naléhavá úloha
```

Při shodné prioritě pořadí vložení není zaručené. [PriorityQueue](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.priorityqueue-2)

## Kolekce pouze pro čtení a neměnné kolekce

`ReadOnlyCollection<T>` a `ReadOnlyDictionary<TKey,TValue>` omezují změny přes obal; původní kolekce se stále může měnit.

```csharp
var source = new List<int> { 1, 2 };
var view = source.AsReadOnly();
source.Add(3);
Console.WriteLine(view.Count); // 3
```

[ReadOnlyCollection](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.readonlycollection-1)

Typy z `System.Collections.Immutable` při změně vracejí novou hodnotu kolekce:

```csharp
using System.Collections.Immutable;

var original = ImmutableList.Create(1, 2);
var extended = original.Add(3);
Console.WriteLine($"{original.Count}, {extended.Count}"); // 2, 3
```

K dispozici jsou také `ImmutableArray`, `ImmutableDictionary`, `ImmutableHashSet`, `ImmutableSortedSet`, `ImmutableQueue` a `ImmutableStack`.

Neměnnost kolekce nezaručuje neměnnost objektů uložených uvnitř. [Neměnné kolekce](https://learn.microsoft.com/en-us/dotnet/api/system.collections.immutable)

## Pozorovatelné kolekce

`ObservableCollection<T>` hlásí přidání, odebrání a další změny kolekce.

Změny vlastností jednotlivé položky musí hlásit samotná položka, například přes `INotifyPropertyChanged`. [ObservableCollection](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1)

## Kolekce pro více vláken

| Typ | Účel |
|---|---|
| `ConcurrentQueue<T>`, `ConcurrentStack<T>` | Fronta nebo zásobník pro souběžné operace |
| `ConcurrentDictionary<TKey,TValue>` | Souběžná práce se slovníkem |
| `ConcurrentBag<T>` | Neuspořádané ukládání položek |
| `BlockingCollection<T>` | Producent/konzument s blokujícím čekáním; plnost blokuje jen při nastavené kapacitě |

Bezpečnost jednotlivých operací nezaručuje atomicitu složeného postupu „ověř a potom změň“. [Kolekce pro souběh](https://learn.microsoft.com/en-us/dotnet/standard/collections/thread-safe/)

## Tuple, paměť a slabé reference

`Tuple` a hodnotové n-tice seskupují pevně dané položky různých typů; nejde o obecné rozšiřitelné kolekce.

`Span<T>` a `Memory<T>` představují pohled na souvislou oblast paměti. [Memory a Span](https://learn.microsoft.com/en-us/dotnet/standard/memory-and-spans/)

`WeakReference<T>` nepřidržuje cílový objekt proti GC a vyžaduje referenční typ, takže `WeakReference<int>` není platné.

Před použitím cíle vždy ověř `TryGetTarget`. [WeakReference](https://learn.microsoft.com/en-us/dotnet/api/system.weakreference-1)
