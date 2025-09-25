# 🧪 .NET – NUnit (Testovací framework)

> 🚀 Praktické rady pro psaní unit testů v .NET pomocí NUnit, práce s více asserty a odkazy na video prezentaci.

---

## 🧩 Co je NUnit?

<details>
<summary><span style="color:#1E90FF;">🔍 Základní principy NUnit</span></summary>

- **NUnit** je populární open-source framework pro unit testování v .NET.
- Umožňuje psát automatizované testy, ověřovat chování kódu a zvyšovat jeho kvalitu.
- Podporuje různé typy asertů, parametrizované testy, setup/teardown metody a další.

![](../../images/net_nunit_intro.png)

</details>

---

## 🧑‍💻 Multiple Asserts

<details>
<summary><span style="color:#1E90FF;">🧩 Jak fungují Multiple Asserts?</span></summary>

- Ve standardním případě, pokud první `assert` selže, následující testy v metodě už nejsou spuštěny.
- Pomocí `Assert.Multiple` lze provést více ověření najednou a zobrazit všechny chyby najednou.
- Vhodné pro komplexní ověřování výsledků.

**Ukázka použití:**
```csharp
[Test]
public void MultipleAssertsDemo()
{
    var situationUnderTest = new SomeCalculator();
    var result = situationUnderTest.DoCalculation();

    Assert.Multiple(() =>
    {
        Assert.That(result.RealPart, Is.EqualTo(5.2));
        Assert.That(result.ImaginaryPart, Is.EqualTo(3.9));
    });

    // Lze použít i klasickou syntaxi
    Assert.Multiple(() =>
    {
        ClassicAssert.AreEqual(5.2, result.RealPart, "Real Part");
        ClassicAssert.AreEqual(3.9, result.ImaginaryPart, "Imaginary Part");
    });
}
```

> [!NOTE]
> Multiple asserts využij, pokud chceš v jednom testu ověřit více vlastností najednou.

</details>

---

## 🎬 Video prezentace

<details>
<summary><span style="color:#1E90FF;">📺 Trendy v unit testování a mockování</span></summary>

- Doporučené video:  
  [Trendy v unit testování a mockování (WUG Days 2018)](https://download.wug.cz/videos/wug/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani_1080p.mp4)

</details>