# 🧩 Vývojové vzory – Kompletní přehled & použití

> 🚀 Praktické rady pro opakovaně použitelné návrhové vzory v softwarovém vývoji.

---

## 📚 Co jsou vývojové vzory?

<details>
<summary><span style="color:#1E90FF;">🔍 Definice & význam</span></summary>

- **Vývojové vzory** jsou osvědčená řešení opakujících se problémů v návrhu softwaru.
- Zlepšují čitelnost, údržbu a rozšiřitelnost kódu.
- Vzory nejsou konkrétní kód, ale obecné postupy a struktury.

</details>

---

## 🗂️ Klasifikace návrhových vzorů

<details>
<summary><span style="color:#1E90FF;">🧩 Přehled kategorií</span></summary>

| Typ vzoru         | Popis                                      | Příklad použití                |
|-------------------|--------------------------------------------|-------------------------------|
| **Creational**    | Vytváření objektů                          | Singleton, Factory, Builder, Prototype, Abstract Factory |
| **Structural**    | Skládání objektů a tříd                    | Adapter, Decorator, Facade, Composite, Bridge, Proxy, Flyweight |
| **Behavioral**    | Komunikace a chování objektů               | Observer, Strategy, Command, State, Chain of Responsibility, Mediator, Memento, Iterator, Template Method, Visitor, Interpreter |

</details>

---

## 📝 Ukázky hlavních vzorů

<details>
<summary><span style="color:#1E90FF;">🔧 Creational vzory</span></summary>

| Vzor                | Popis                                      | Ukázka (JavaScript)            |
|---------------------|--------------------------------------------|-------------------------------|
| **Singleton**       | Jediná instance třídy                      | `class Singleton { ... }`      |
| **Factory Method**  | Vytváření objektů přes tovární metodu      | `class CarFactory { ... }`     |
| **Abstract Factory**| Vytváření rodin objektů                    | `class GUIFactory { ... }`     |
| **Builder**         | Složené vytváření objektů                  | `class CarBuilder { ... }`     |
| **Prototype**       | Klonování existujícího objektu             | `const clone = Object.create(proto);` |

</details>

<details>
<summary><span style="color:#1E90FF;">🏗️ Structural vzory</span></summary>

| Vzor                | Popis                                      | Ukázka (JavaScript)            |
|---------------------|--------------------------------------------|-------------------------------|
| **Adapter**         | Přizpůsobení rozhraní                      | `class NewApiAdapter { ... }`  |
| **Decorator**       | Přidání funkcionality                      | `function decorate(obj) { ... }`|
| **Facade**          | Zjednodušené rozhraní pro složitý systém   | `class Facade { ... }`         |
| **Composite**       | Skládání objektů do stromu                 | `class Component { ... }`      |
| **Bridge**          | Oddělení abstrakce od implementace         | `class Bridge { ... }`         |
| **Proxy**           | Zástupce objektu                           | `class Proxy { ... }`          |
| **Flyweight**       | Sdílení dat mezi objekty                   | `class FlyweightFactory { ... }`|

</details>

<details>
<summary><span style="color:#1E90FF;">🤝 Behavioral vzory</span></summary>

| Vzor                | Popis                                      | Ukázka (JavaScript)            |
|---------------------|--------------------------------------------|-------------------------------|
| **Observer**        | Sledování změn objektu                     | `class Subject { ... }`        |
| **Strategy**        | Zaměnitelné algoritmy                      | `class Strategy { ... }`       |
| **Command**         | Zapouzdření požadavku jako objektu         | `class Command { ... }`        |
| **State**           | Změna chování podle stavu                  | `class State { ... }`          |
| **Chain of Responsibility** | Řetězení zpracovatelů             | `class Handler { ... }`        |
| **Mediator**        | Zprostředkování komunikace                 | `class Mediator { ... }`       |
| **Memento**         | Uložení a obnovení stavu                   | `class Memento { ... }`        |
| **Iterator**        | Procházení kolekcí                         | `class Iterator { ... }`       |
| **Template Method** | Definice kostry algoritmu                  | `class Template { ... }`       |
| **Visitor**         | Přidání operací objektům                   | `class Visitor { ... }`        |
| **Interpreter**     | Interpretace jazyků                        | `class Interpreter { ... }`    |

</details>

---

## 📄 Ukázky implementace

<details>
<summary><span style="color:#1E90FF;">🔧 Singleton</span></summary>

```javascript
class Singleton {
  static instance;
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}
```
</details>

<details>
<summary><span style="color:#1E90FF;">🏭 Factory Method</span></summary>

```javascript
class CarFactory {
  createCar(type) {
    if (type === 'electric') return new ElectricCar();
    if (type === 'diesel') return new DieselCar();
  }
}
```
</details>

<details>
<summary><span style="color:#1E90FF;">🎭 Adapter</span></summary>

```javascript
class OldApi {
  getData() { return 'old data'; }
}
class NewApiAdapter {
  constructor(oldApi) { this.oldApi = oldApi; }
  fetch() { return this.oldApi.getData(); }
}
```
</details>

<details>
<summary><span style="color:#1E90FF;">👀 Observer</span></summary>

```javascript
class Subject {
  constructor() { this.observers = []; }
  subscribe(obs) { this.observers.push(obs); }
  notify(data) { this.observers.forEach(o => o.update(data)); }
}
```
</details>

---

## 📄 Další zdroje

- [📄 Dokument vývojových vzorů (PDF)](../pdf/dev_design_patterns.pdf)
- [💡 Design Patterns – Refactoring Guru](https://refactoring.guru/design-patterns)
- [📝 Přehled vzorů v JavaScriptu](https://www.patterns.dev/)