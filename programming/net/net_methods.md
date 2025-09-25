# 🧮 .NET – Metody & Parametry

> 🚀 Praktické rady pro práci s metodami v .NET, typy parametrů, delegáty, asynchronní a paralelní zpracování.

---

## 🗂️ Základní pojmy

<details>
<summary><span style="color:#1E90FF;">🔍 Parametr vs. Argument</span></summary>

- **Parametr** – proměnná v definici metody.
- **Argument** – skutečná hodnota předaná při volání metody.

</details>

---

## 🔄 Předání hodnoty vs. reference

<details>
<summary><span style="color:#E95A84;">📦 Hodnota</span></summary>

- Vytvoří se kopie dat, změny v metodě neovlivní původní data.
- Efektivní pro malé typy (`int`, `float`, `bool`).

</details>

<details>
<summary><span style="color:#E95A84;">🔗 Reference</span></summary>

- Předává se odkaz na původní data (`ref`, `out`, `in`).
- Metoda může manipulovat s původními daty (kromě `in` – pouze pro čtení).
- Efektivní pro velké struktury/třídy.

</details>

---

## 🧑‍💻 Druhy metod

<details>
<summary><span style="color:#1E90FF;">📚 Přehled typů metod</span></summary>

| Typ metody           | Klíčové slovo | Popis                                      |
|----------------------|---------------|---------------------------------------------|
| Indexátor            | `this[]`      | Umožňuje objektům být indexovány jako pole. |
| Statická             | `static`      | Volání bez instance třídy.                  |
| Instanční            | —             | Vyžaduje instanci třídy.                    |
| Virtuální            | `virtual`     | Lze přepsat v potomcích.                    |
| Abstraktní           | `abstract`    | Bez implementace, nutná v potomcích.        |
| Přetížená            | —             | Stejný název, různé parametry.              |
| Výchozí hodnoty      | `=`           | Parametry s defaultní hodnotou.             |
| Params               | `params`      | Libovolný počet parametrů.                  |
| Ref/Out/In           | `ref/out/in`  | Předání odkazem, různé chování.             |
| Rozšířené            | `this`        | Přidání metod existujícím typům.            |
| Asynchronní          | `async`       | Asynchronní operace.                        |

</details>

---

## 🧩 Ukázky deklarace metod

<details>
<summary><span style="color:#E95A84;">📑 Indexátor</span></summary>

```csharp
public interface IOAuth2Configuration
{
    IClientConfiguration this[string clientTypeName] { get; }
}
```
</details>

<details>
<summary><span style="color:#E95A84;">⚡ Statická metoda</span></summary>

```csharp
public static void MyStaticMethod() { /* kód */ }
```
</details>

<details>
<summary><span style="color:#E95A84;">🧑‍💻 Instanční metoda</span></summary>

```csharp
public void MyInstanceMethod() { /* kód */ }
```
</details>

<details>
<summary><span style="color:#E95A84;">🔄 Virtuální metoda</span></summary>

```csharp
public virtual void MyVirtualMethod() { /* kód */ }
```
</details>

<details>
<summary><span style="color:#E95A84;">🌀 Abstraktní metoda</span></summary>

```csharp
public abstract void MyAbstractMethod();
```
</details>

<details>
<summary><span style="color:#E95A84;">🔁 Přetížené metody</span></summary>

```csharp
public void MyMethod(int param1) { }
public void MyMethod(int param1, int param2) { }
```
</details>

<details>
<summary><span style="color:#E95A84;">📝 Výchozí hodnoty parametrů</span></summary>

```csharp
public void MyMethod(int param1, int param2 = 10) { }
```
</details>

<details>
<summary><span style="color:#E95A84;">🔢 Params</span></summary>

```csharp
public void MyMethod(params int[] numbers) { }
```
</details>

<details>
<summary><span style="color:#E95A84;">🔗 Ref/Out/In parametry</span></summary>

```csharp
public void AddTen(ref int number) { number += 10; }
public void GetValues(out int x, out int y) { x = 5; y = 10; }
public void PrintValue(in int number) { Console.WriteLine(number); }
```
</details>

<details>
<summary><span style="color:#E95A84;">🧩 Rozšířené metody</span></summary>

```csharp
public static class MyExtensionMethods
{
    public static void MyExtensionMethod(this MyType myType) { }
}
```
</details>

<details>
<summary><span style="color:#E95A84;">⚡ Asynchronní metoda</span></summary>

```csharp
public async Task MyAsyncMethod() { await Task.CompletedTask; }
public async Task<int> MyAsyncMethod() { return await Task.FromResult(42); }
```
</details>

---

## 🧭 Ukazatel na metody & Delegáti

<details>
<summary><span style="color:#1E90FF;">🔗 Delegáti</span></summary>

- Typově bezpečné odkazy na metody.
- Užitečné pro události, LINQ, asynchronní operace.

```csharp
public delegate void MyDelegate(string message);
MyDelegate del = MyMethod;
del("Hello, World!");
```
</details>

<details>
<summary><span style="color:#E95A84;">⚡ Generické delegáty</span></summary>

- **Func** – vrací hodnotu.
- **Action** – nevrací hodnotu.
- **Predicate** – vrací bool.

```csharp
Func<int, int, int> add = (x, y) => x + y;
Action<string> print = msg => Console.WriteLine(msg);
Predicate<int> isEven = x => x % 2 == 0;
```
</details>

---

## 🚀 Asynchronní & Paralelní metody

<details>
<summary><span style="color:#1E90FF;">⚡ Asynchronní volání</span></summary>

- Umožňuje neblokovat hlavní vlákno.
- Klíčová slova `async` a `await`.

```csharp
public async Task MethodA() { await MethodB(); }
public async Task MethodB() { await Task.Delay(1000); }
```
</details>

<details>
<summary><span style="color:#E95A84;">🧵 Paralelní zpracování (TPL)</span></summary>

- `Task`, `Task<T>`, `Parallel.For`, `Parallel.ForEach`, `Parallel.Invoke`.

```csharp
Parallel.For(0, 10, i => { /* kód */ });
Task<int> task = Task.Run(() => 42);
int result = task.Result;
```
</details>