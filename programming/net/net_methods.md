# .NET – Metody a parametry

> Typy parametrů, druhy metod, delegáty, asynchronní a paralelní zpracování v C#.

---

## Základní pojmy

- **Parametr** – proměnná v definici metody.
- **Argument** – skutečná hodnota předaná při volání metody.

---

## Předání hodnoty vs. reference

| Způsob | Popis | Kdy použít |
|--------|-------|------------|
| **Hodnotou** | Vytvoří kopii dat; změny v metodě neovlivní originál | Malé primitivní typy (`int`, `bool`, `float`) |
| **Referencí (`ref`)** | Předává odkaz; metoda může měnit původní data | Velké struktury, sdílený stav |
| **Out (`out`)** | Metoda musí hodnotu nastavit; nemusí být inicializována | Vrácení více hodnot |
| **In (`in`)** | Odkaz pouze pro čtení; metoda nemůže hodnotu měnit | Velké struktury, optimalizace výkonu |

---

## Druhy metod

| Typ | Klíčové slovo | Popis |
|-----|---------------|-------|
| Statická | `static` | Volání bez instance třídy |
| Instanční | *(žádné)* | Vyžaduje instanci třídy |
| Virtuální | `virtual` | Lze přepsat v potomcích (`override`) |
| Abstraktní | `abstract` | Bez implementace, musí být přepsána |
| Přetížená | *(žádné)* | Stejný název, různé parametry |
| Rozšiřující | `this` | Přidává metody existujícím typům |
| Asynchronní | `async` | Neblokující operace s `await` |
| Indexátor | `this[]` | Umožňuje indexování objektu jako pole |

---

## Ukázky deklarací

```csharp
// Statická metoda
public static void MyStaticMethod() { }

// Virtuální metoda
public virtual void MyVirtualMethod() { }

// Abstraktní metoda
public abstract void MyAbstractMethod();

// Přetížené metody
public void MyMethod(int param1) { }
public void MyMethod(int param1, int param2) { }

// Výchozí hodnota parametru
public void MyMethod(int param1, int param2 = 10) { }

// Params – libovolný počet parametrů
public void MyMethod(params int[] numbers) { }

// Ref, Out, In
public void AddTen(ref int number) { number += 10; }
public void GetValues(out int x, out int y) { x = 5; y = 10; }
public void PrintValue(in int number) { Console.WriteLine(number); }

// Rozšiřující metoda
public static class MyExtensions
{
    public static void MyExtMethod(this MyType obj) { }
}

// Asynchronní metoda
public async Task MyAsyncMethod() { await Task.CompletedTask; }
public async Task<int> MyAsyncMethodWithResult() { return await Task.FromResult(42); }

// Indexátor
public interface IOAuth2Configuration
{
    IClientConfiguration this[string clientTypeName] { get; }
}
```

---

## Delegáti

Typově bezpečné reference na metody. Používají se pro události, callbacky a LINQ.

```csharp
// Vlastní delegát
public delegate void MyDelegate(string message);
MyDelegate del = MyMethod;
del("Hello, World!");
```

### Generické delegáty

| Typ | Popis | Příklad |
|-----|-------|---------|
| `Func<T, TResult>` | Vrací hodnotu | `Func<int, int, int> add = (x, y) => x + y;` |
| `Action<T>` | Nevrací hodnotu | `Action<string> print = msg => Console.WriteLine(msg);` |
| `Predicate<T>` | Vrací `bool` | `Predicate<int> isEven = x => x % 2 == 0;` |

---

## Asynchronní zpracování

```csharp
// Async / await
public async Task MethodA()
{
    await MethodB();
}

public async Task MethodB()
{
    await Task.Delay(1000);
}
```

---

## Paralelní zpracování (TPL)

```csharp
// Parallel.For
Parallel.For(0, 10, i => { /* kód */ });

// Task.Run
Task<int> task = Task.Run(() => 42);
int result = await task;

// Parallel.ForEach
Parallel.ForEach(collection, item => { /* kód */ });
```
