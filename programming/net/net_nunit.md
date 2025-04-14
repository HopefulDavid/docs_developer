## NUnit

= Testovací framework

<details>
<summary><span style="color:#1E90FF;">Multiple Asserts</span></summary>

Nechceme, aby se test ukončil, jakmile první `assert` selže uvnitř metody.

- Ve standardním případě, pokud první test selže, tak následující testy již nejsou spuštěny z této metody.

  > [!NOTE]
  > Stane se pouze v případě, že máme více `assert` v jedné metodě.

- Příklad použití:

  ```C#
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
  
      // Can also work with the classic assertion syntax
      Assert.Multiple(() =>
      {
          ClassicAssert.AreEqual(5.2, result.RealPart, "Real Part");
          ClassicAssert.AreEqual(3.9, result.ImaginaryPart, "Imaginary Part");
      });
  }

## Video prezentace

<a href="https://download.wug.cz/videos/wug/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani/WUGBrno_WUG-Days-2018_Trendy-v-unit-testovani-a-mockovani_1080p.mp4"> Trendy v unit testování a mockování (WUG Days 2018)</a>