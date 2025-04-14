<details>
<summary><span style="color:#1E90FF;">Základní pojmy</span></summary>

- Parametr

  proměnná v definici metody

- Argument

  skutečná hodnota této proměnné, která je předána při volání metody.

<details>
<summary><span style="color:#E95A84;">Předání reference či hodnoty do metody</span></summary>

<li>**`Value`**</li>

	Pokud předáváte data hodnotou, **vytvoří se kopie dat** a ta se předá do metody.

	> [!WARNING]
	> Jakákoli změna dat v metodě **neovlivní původní data**.
	>
	> Pro velké struktury nebo třídy může být kopírování dat náročné na paměť a čas.

	> [!NOTE]
	> **Efektivní pro malé datové typy**
	>
	> Jako jsou `int`, `float`, `bool` atd...
	>
	> Kopírování těchto malých hodnot je rychlé.	

<li>**`Reference`**</li>

	Pokud předáte data odkazem pomocí klíčových slov `ref`, `out` nebo `in`, místo kopírování dat se **předá odkaz na původní data**.

	> [!WARNING]
	> Metoda může přímo **manipulovat s původními daty**.
	>
	> **Neplatí pouze pro klíčové slovo `in`**, jelikož ta umožňuje pouze čtení dat.

	> [!NOTE]
	> **Efektivní pro velké struktury nebo třídy**, protože se vyhnete nákladnému kopírování dat.
	>
	>  Předá se jen malý odkaz na data.

</details>
</details>
<details>
<summary><span style="color:#1E90FF;">Druhy metod</span></summary>

<details>
<summary><span style="color:#E95A84;">Indexátor</span></summary>

Speciální druh členské funkce v C#, která umožňuje objektům být indexovány jako pole.

Příklad použití:

- Definice

    ```c#
    /// <summary> OAuth2 library configuration. </summary>
    public interface IOAuth2Configuration
    {
        /// <summary> Returns settings for service client with given name. </summary>
        IClientConfiguration this[string clientTypeName] { get; }
    }
    ```

- Volání

    ```c#
    IOAuth2Configuration config = ...
    IClientConfiguration clientConfig = config["clientTypeName"];
    ```

> [!NOTE]
> Není zapotřebí vytvářet tedy novou funkci jako například: `GetClientConfiguration(string clientTypeName)`.

</details>
<details>
<summary><span style="color:#E95A84;">Statické metody</span></summary>

Deklarovány s klíčovým slovem **`static`**.

> [!NOTE]
> Mohou být volány bez vytváření instance třídy.

<pre><code class="lang-cs">
public static void MyStaticMethod() 
{
    // kód metody
}
</code></pre>

</details>
<details>
<summary><span style="color:#E95A84;">Instanční metody</span></summary>

> [!WARNING]
> Vyžaduje vytvořenou instanci třídy pro jejich volání.
>
> Instance třídy = Objekt vytvořený z dané třídy.

<pre><code class="lang-cs">
public void MyInstanceMethod() 
{
    // kód metody
}
</code></pre>
</details>
<details>
<summary><span style="color:#E95A84;">Virtuální metody</span></summary>

Deklarovány s klíčovým slovem **`virtual`**

Umožňuje potomkům třídy přepsat jejich implementaci.

<pre><code class="lang-cs">
public virtual void MyVirtualMethod() 
{
    // kód metody
}
</code></pre>
</details>
<details>
<summary><span style="color:#E95A84;">Abstraktní metody</span></summary>

Deklarovány s klíčovým slovem **`abstract`**

> [!WARNING]
> **Nemají žádnou vlastní implementaci**.
>
> **Implementaci musí poskytnout třída**, která dědí z abstraktní třídy.

<pre><code class="lang-cs">
public abstract void MyAbstractMethod();
</code></pre>
</details>
<details>
<summary><span style="color:#E95A84;">Přetížené metody</span></summary>

Metody se stejným názvem, které se liší v počtu nebo typu parametrů.

<pre><code class="lang-cs">
public void MyMethod(int param1) 
{
    // kód metody
}

public void MyMethod(int param1, int param2) 
{
    // kód metody
}
</code></pre>
</details>
<details>
<summary><span style="color:#E95A84;">Metody s výchozími hodnotami</span></summary>

Jedná se o parametry, které mohou být při volání metody vynechány.

> [!WARNING]
> Parametry s výchozími hodnotami lze použít až po všech nevýchozích parametrech.
>
> Neplatí pro parametr s klíčovým slovem `params`, ten musí být vždy poslední v seznamu parametrů.

<pre><code class="lang-cs">
public void MyMethod(int param1, int param2 = 10) 
{
    // kód metody
}
</code></pre>

> [!NOTE]
> Při volání této metody by mohl být vynechán `param2`.
>
> Pokud by tento parametr byl vynechán, použila by se jeho výchozí hodnota tedy = 10.

</details>
<details>
<summary><span style="color:#E95A84;">Metody s parametry params</span></summary>

Mohou přijímat **libovolný počet parametrů stejného typu**.

> [!WARNING]
> Musí být **vždy poslední v seznamu parametrů**.

<pre><code class="lang-cs">
public void MyMethod(params int[] numbers) 
{
    // kód metody
}
</code></pre>

</details>
<details>
<summary><span style="color:#E95A84;">Metody s výstupními (out) a referenčními (ref) parametry</span></summary>

Mohou měnit hodnotu argumentů předaných do metody.

<pre><code class="lang-cs">
public void MyMethod(out int param1, ref int param2) 
{
    // kód metody
}
</code></pre>

#### ref

Klíčové slovo **`ref`** se používá k označení parametru, který se má předat odkazem.

> [!NOTE]
> Pokud metoda změní hodnotu ref parametru, **změna se projeví i na původní proměnné**, která byla předána do metody.

> [!WARNING]
> Musí být inicializovány před jejich předáním do metody.

Příklad:
<pre><code class="lang-cs">
public void AddTen(ref int number)
{
    number += 10;
}

int myNumber = 5;
AddTen(ref myNumber);  // myNumber je nyní 15
</code></pre>

#### out

Klíčové slovo **`out`** se používá k označení parametru, který se má předat odkazem a bude použit k **vrácení dat z
metody**.

> [!WARNING]
> Musí být nastaveny v rámci metody před jejím ukončením.

> [!NOTE]
> Užitečné v situacích, kdy chcete, aby metoda vrátila více než jednu hodnotu.
>
> Nemusí být inicializovány před jejich předáním do metody.

Příklad:

<pre><code class="lang-cs">
public void GetValues(out int x, out int y)
{
    x = 5;
    y = 10;
}

int a, b;
GetValues(out a, out b);  // a je nyní 5, b je nyní 10
</code></pre>

#### in

Klíčové slovo **`in`** se používá k označení parametru, který se má předat odkazem, ale **nemůže být změněn metodou**.

> [!NOTE]
> Užitečné pro předání velkých struktur nebo tříd, protože se předávají odkazem (efektivněji) a bez rizika, že by metoda
> změnila jejich hodnotu.

Příklad:

<pre><code class="lang-cs">
public void PrintValue(in int number)
{
    Console.WriteLine(number);
    // number = 10;  // Toto by způsobilo chybu kompilace
}

int myNumber = 5;
PrintValue(in myNumber);  // Vypíše 5
</code></pre>

</details>
<details>
<summary><span style="color:#E95A84;">Rozšířené metody</span></summary>

Rozšiřují existující typy o nové metody bez nutnosti dědění nebo změny původního typu.

<pre><code class="lang-cs">
public static class MyExtensionMethods 
{
    public static void MyExtensionMethod(this MyType myType) 
    {
        // kód metody
    }
}
</code></pre>
</details>
<details>
<summary><span style="color:#E95A84;">Asynchronní metody</span></summary>

Deklarovány s klíčovým slovem **`async`**.

Umožňují asynchronní operace.

> [!NOTE]
> Asynchronní operace
>
> Běží nezávisle na hlavním programu.
>
> Umožňuje tedy hlavnímu programu pokračovat v práci, aniž by musel čekat na dokončení operace.

<pre><code class="lang-cs">
public async Task MyAsyncMethod() 
{
    // kód metody
}
</code></pre>

> Je sepsána samostatná sekce, kde se lze dozvědět více.

</details>
</details>
<details>
<summary><span style="color:#1E90FF;">Ukazetel na metody</span></summary>

<details>
<summary><span style="color:#E95A84;">Delegáti</span></summary>

Drží **odkazy na metody**.

Když je delegát volán, volá se metoda, na kterou odkazuje.

> [!NOTE]
> Typově bezpečný.
>
> Bezpečně tedy zapouzdřují metodu nebo sadu metod.

> Užitečné pro implementaci událostí a zpětných volání.
>
> Jsou základem pro LINQ dotazy a asynchronní metody.

Příklad:
<pre><code class="lang-cs">
// Definice delegáta
public delegate void MyDelegate(string message);

// Metoda, která odpovídá signatuře delegáta
public void MyMethod(string message)
{
    Console.WriteLine(message);
}

// Použití delegáta
MyDelegate del = MyMethod;
del("Hello, World!");  // Vypíše "Hello, World!" na konzoli
</code></pre>

</details>
<details>
<summary><span style="color:#E95A84;">Delegáti - Generické</span></summary>

> [!WARNING]
> Je zapotřebí znalost základních delegátů

#### Func

Delegát pro metody, který **vrací hodnotu**.

- `Func<TResult>`

  Představuje metodu, která vrací hodnotu typu `TResult`.

- `Func<T, TResult>`

  Představuje metodu, která přijímá jeden argument typu `T` a vrací hodnotu typu `TResult`.

> [!NOTE]
> `Func<T1,T2,T3...TResult>` umožňuje až 16 vstupních parametrů.

Příklad:

```c#
// Using Func delegate
Func<Player, int, int> Attack = (p, damage) => 
{
    p.Health -= damage;
    Console.WriteLine($"{p.Name} is attacked and lost {damage} health.");
    return p.Health;
};

int remainingHealth = Attack(player, 20);        
```

#### Action

Delegát, který **nevrací hodnotu**.

- `Action`

  Představuje metodu bez parametrů.

- `Action<T>`

  Představuje metodu, která přijímá jeden argument typu `T`.

> [!NOTE]
> `Action<T1,T2,T3...>` umožňuje až 16 vstupních parametrů.

Příklad:

```c#
Action<string> actionMethod = message => Console.WriteLine(message);

// Použití delegáta k zobrazení zprávy 
actionMethod("Hello, World!");
```

#### Predicate

Reprezentuje metodu, která **přijímá jeden argument typu `T`** a **vrací `bool`**.

> [!NOTE]
> Je to speciální případ `Func<T, bool>`.

Příklad:

```c#
Predicate<int> isEven = x => x % 2 == 0;
bool result = isEven(4);  // result je true
```

</details>
</details>
<details>
<summary><span style="color:#1E90FF;">Asynchronní a Paralelní metody</span></summary>

Umožňuje vykonávání operací bez blokování (nebo "zamrzání") hlavního vlákna aplikace.

> [!NOTE]
> Kód může pokračovat v dalších úlohách, zatímco asynchronní operace běží "na pozadí".
>
> Mohou být přerušeny, aby uvolnily vlákno pro jiné úkoly.

> [!TIP]
> Klíčové slova `async` pro označení metod jako asynchronních a `await` pro čekání na dokončení asynchronních operací
> nebo úloh.

<details>
<summary><span style="color:#E95A84;">Příklady použití</span></summary>

- I/O operace:

  Čtení/zápis souborů, síťové požadavky, přístup k databázi.

- Časově náročné výpočty:

  Operace, které trvají dlouho a mohou být prováděny na pozadí.

- Čekání na události:

  Čekání na uživatelský vstup nebo jiné události.

</details>
<details>
<summary><span style="color:#E95A84;">Vytvoření metody</span></summary>

- Bez návratové hodnoty

    ```c#
    public async Task MyAsyncMethod()
    {
        // Zde můžete provést nějakou synchronní práci
        int x = 10;
        int y = 20;
        int sum = x + y;

        // Použijte Task.CompletedTask k naplnění smlouvy asynchronní metody
        await Task.CompletedTask;
    }
    ```

- S návratovou hodnotou

    ```c#
    public async Task<int> MyAsyncMethod()
    {
        // Zde můžete provést nějakou synchronní práci
        int x = 10;
        int y = 20;
        int sum = x + y;
           // Použijte Task.FromResult k naplnění smlouvy asynchronní metody
        return await Task.FromResult(sum);
    }
    ```

</details>
<details>
<summary><span style="color:#E95A84;">Volání v asynchronní metodě</span></summary>

<pre><code class="lang-cs">
public async Task MethodA()
{
    // Nějaký kód...

    // Volání MethodB z MethodA
    await MethodB();

    // Další kód...
}

public async Task MethodB()
{
    // Nějaký kód...

    // Simulace asynchronní operace
    await Task.Delay(1000);

    // Další kód...
}
</code></pre>

</details>
<details>
<summary><span style="color:#E95A84;">Volání v synchronní metodě</span></summary>

> [!WARNING]
> Nedoporučuje se používat asynchronní metody v synchronní metodě pokud je to možné.

- Zpracovat výsledek v novém vlákně

    ```c#
    public void MySyncMethod()
    {
        // Zde můžete provést nějakou synchronní práci
        int x = 10;
        int y = 20;
        int sum = x + y;

        // Volání asynchronní metody ve vlákně ThreadPool
        Task task = Task.Run(async () => await MyAsyncMethod());

        // Počkejte na dokončení úkolu
        task.Wait();
    }
    ```

    ```c#
    private void OnEnable()
    {
        // Spuštění asynchronní operace
        Task<T> task = MyAsyncMethod();

        // Zpracování výsledku po dokončení úlohy (také se spustí asynchronně)
        task.ContinueWith(t =>
        {
            if (t.IsFaulted)
            {
                // Zpracování všech výjimek
                Debug.LogError(t.Exception);
            }
            else
            {
                // Použijte výsledek
                T result = t.Result;
                // ...
            }
        });
    }
    ```

  > [!TIP]
  > Metoda `ContinueWith` je použita pro plánování další operace, která se má vykonat po dokončení úlohy.
  >
  > Pokud metoda narazí na `ContinueWith`, vytvoří se nový úkol, který se spustí po dokončení původní úlohy.
  >
  > Obvykle se spustí na jiném vlákně, než je hlavní vlákno. (To je dáno tím, jak .NET spravuje svůj thread pool.)

- Zpracovat výsledek v hlavním vlákně

  > [!WARNING]
  > Nedoporučuje se.
  >
  > Může to vést k problémům s výkonem a odezvou aplikace.

  > [!TIP]
  > Hlavní vlákno je obvykle vlákno, které zpracovává události uživatelského rozhraní (UI) a další kritické operace.
  >
  > Pokud hlavní vlákno zablokujete čekáním na dokončení asynchronní operace, může to způsobit, že se vaše aplikace "
  zasekne" nebo přestane reagovat na vstupy uživatele.

    ```c#
    private void OnEnable()
    {
        // Spuštění asynchronní operace
        Task<T> task = MyAsyncMethod();

        // Tím se zablokuje aktuální vlákno, dokud nebude asynchronní operace dokončena.
        T result = task.GetAwaiter().GetResult();
    }
    ```

</details>
</details>
<details>
<summary><span style="color:#1E90FF;">Task Parallel Library (TPL)</span></summary>

TPL je sada API, které umožňují paralelní programování.

> [!TIP]
> TPL zahrnuje `Task` a `Task<T>` třídy, které reprezentují jednotlivé operace, které mohou být asynchronní a mohou
> vrátit hodnotu.
>
> TPL také zahrnuje `Parallel` třídu pro paralelní iterace a regiony.

Typy metod k použití:

<details>
<summary><span style="color:#E95A84;">asynchronní a paralelní</span></summary>

- Vytváření a spouštění úloh

    ```c#
    Task task = Task.Run(async () => 
    {
        // Kód úlohy
        await SomeAsyncMethod();
    });
    ```

- Čekání na dokončení úlohy

    ```c#
    Task task = Task.Run(async () => 
    {
        // Kód úlohy
        await SomeAsyncMethod();
    });
    await task;
    ```

- Získání výsledku úlohy

    ```c#
    Task<int> task = Task.Run(async () => 
    {
        // Kód úlohy
        return await SomeAsyncMethodReturningInt();
    });
    int result = await task;
    ```

- Řetězení úloh

    ```c#
    Task<int> task = Task.Run(async () => 
    {
        // Kód první úlohy
        return await SomeAsyncMethodReturningInt();
    }).ContinueWith(async previousTask => 
    {
        // Kód druhé úlohy
        return await SomeOtherAsyncMethod(previousTask.Result);
    });
    int result = await task;
    ```

- Paralelní cykly

    ```c#
    var items = Enumerable.Range(0, 10);
    var tasks = items.Select(async i => 
    {
        // Kód pro každou iteraci
        await SomeAsyncMethod(i);
    });
    await Task.WhenAll(tasks);
    ```

- Paralelní zpracování kolekcí

    ```c#
    var items = new List<int> { 1, 2, 3, 4, 5 };
    var tasks = items.Select(async item => 
    {
        // Kód pro každou položku
        await SomeAsyncMethod(item);
    });
    await Task.WhenAll(tasks);
    ```

- Paralelní spuštění více operací

    ```c#
    var tasks = new[]
    {
        Task.Run(async () => { await SomeAsyncMethod(); }),
        Task.Run(async () => { await SomeOtherAsyncMethod(); }),
        Task.Run(async () => { await YetAnotherAsyncMethod(); })
    };
    await Task.WhenAll(tasks);
    ```

- Asynchronní metody s `async` a `await`

    ```c#
    public async Task DoWorkAsync()
    {
        await Task.Run(async () => 
        {
            // Kód úlohy
            await SomeAsyncMethod();
        });
    }
    ```

</details>
<details>
<summary><span style="color:#E95A84;">Synchronní a paralelní</span></summary>

- Vytváření a spouštění úloh

    ```c#
    Task task = Task.Run(() =>
    {
        // Kód úlohy
    });
    ```

- Čekání na dokončení úlohy

    ```c#
    Task task = Task.Run(() =>
    {
        // Kód úlohy
    });
    task.Wait();
    ```

- Získání výsledku úlohy

    ```c#
    Task<int> task = Task.Run(() =>
    {
        // Kód úlohy
        return 42;
    });
    int result = task.Result;
    ```

- Řetězení úloh

    ```c#
    Task<int> task = Task.Run(() =>
    {
        // Kód první úlohy
        return 42;
    }).ContinueWith(previousTask =>
    {
        // Kód druhé úlohy
        return previousTask.Result * 2;
    });
    int result = task.Result;
    ```

- Paralelní cykly

    ```c#
    Parallel.For(0, 10, i =>
    {
        // Kód pro každou iteraci
    });
    ```

- Paralelní zpracování kolekcí

    ```c#
    var items = new List<int> { 1, 2, 3, 4, 5 };
    Parallel.ForEach(items, item => 
    {
        // Kód pro každou položku
    });
    ```

- Paralelní spuštění více operací

    ```c#
    Parallel.Invoke(
        () => { /* Kód první operace */ },
        () => { /* Kód druhé operace */ },
        () => { /* Kód třetí operace */ }
    );
    ```

</details>
<details>
<summary><span style="color:#E95A84;">Příklady</span></summary>

- Spustit v asynchronním módu

    ```c#
    using System.Threading.Tasks;

    public class TPLExample
    {
        public async Task RunTasksAsync()
        {
            // Vytvoření a spuštění úloh paralelně
            Task task1 = DoWorkAsync(1);
            Task task2 = DoWorkAsync(2);
            Task task3 = DoWorkAsync(3);

            // Čekání na dokončení všech úloh
            await Task.WhenAll(task1, task2, task3);
        }

        private async Task DoWorkAsync(int taskNumber)
        {
            // Simulace nějaké práce
            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine($"Úloha {taskNumber}: iterace {i}");
                await Task.Delay(1000); // Pauza 1 sekunda
            }
        }
    }
    ```

- Spustit v synchronním módu

    ```c#
    using System.Threading.Tasks;

    public class TPLExample
    {
        public void RunTasks()
        {
            // Vytvoření a spuštění úloh paralelně
            Task task1 = Task.Run(() => DoWork(1));
            Task task2 = Task.Run(() => DoWork(2));
            Task task3 = Task.Run(() => DoWork(3));

            // Čekání na dokončení všech úloh
            Task.WaitAll(task1, task2, task3);
        }

        private void DoWork(int taskNumber)
        {
            // Simulace nějaké práce
            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine($"Úloha {taskNumber}: iterace {i}");
                System.Threading.Thread.Sleep(1000); // Pauza 1 sekunda
            }
        }
    }
    ```

</details>
<details>
<summary><span style="color:#E95A84;">Zjištění kde se kód vykonává</span></summary>

`Thread.CurrentThread` k získání odkazu na aktuální vlákno.

Poté lze zkontrolovat jeho vlastnosti, jako je `IsThreadPoolThread` nebo `IsBackground`, které mohou poskytnout další
informace.

</details>
</details>
<details>
<summary><span style="color:#1E90FF;">Tipy</span></summary>

<details>
<summary><span style="color:#E95A84;">Vytvořit vlastní LINQ</span></summary>

Lze toho dosáhnout skrze rozšíření metod a delegátů.

Příklad:

```c#
public static class MyExtensions
{
    public static IEnumerable<T> MyWhere<T>(this IEnumerable<T> collection, Func<T, bool> predicate)
    {
        foreach (var item in collection)
        {
            if (predicate(item))
            {
                yield return item;
            }
        }
    }
}
```

> V tomto příkladu `MyWhere` je rozšíření metody pro `IEnumerable<T>`, což znamená, že ji můžete použít na jakoukoli
> kolekci.
>
> Metoda přijímá delegáta `Func<T, bool>`, který je použit k rozhodnutí, zda prvek splňuje danou podmínku.

> Můžete pak použít tuto metodu podobně jako metodu where v LINQ:
>
> ```c#
> List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
> var evenNumbers = numbers.MyWhere(x => x % 2 == 0); // filtruje sudá čísla v seznamu.
> ```

</details>
<details>
<summary><span style="color:#E95A84;">Synchronizace vláken pomocí lock</span></summary>

Zabrání vstupu jiného vlákna do bloku kódu.

> [!NOTE]
> Zajistí tedy, že blok kódu uvnitř `lock` může být v daném okamžiku spuštěn pouze jedním vláknem.

Příklad:
<pre><code class="lang-cs">

object zamek = new object();

lock (zamek)
{
    // Kód, který má být prováděn pouze jedním vláknem
}
</code></pre>

> [!NOTE]
> Když vlákno vstoupí do bloku `lock`, získá zámek na objektu `zamek`.
>
> Jakmile vlákno opustí `lock`, `zamek` je automaticky uvolněn.

> [!WARNING]
> Použití `lock(this)` je nebezpečné, protože jiné části kódu mohou také získat zámek na `this` a způsobit deadlock.
</details>
</details>