## WPF (Windows Presentation Foundation)

- Tvorba desktopových aplikací na platformě Windows
- Odděluje logiku aplikace (C#) od vzhledu (XAML)
- Umožňuje datové vazby a stylování
- Podpora vektorové grafiky, animací a multimédií

### Prvky

[//]: # (Button)
<details>
<summary><span style="color:#1E90FF;">Button</span></summary>
Tlačítko je interaktivní prvek, na který může uživatel kliknout.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí tlačítka.

- Foreground: Barva textu.

- BorderBrush: Barva ohraničení.

- BorderThickness: Tloušťka ohraničení.

- FontSize: Velikost písma.

- Padding: Vnitřní odsazení (rozestup textu od okrajů).

- Margin: Vnější odsazení (rozestup tlačítka od ostatních prvků).

- CornerRadius: Zaoblení rohů tlačítka.

##### Události

- Click: Vyvolána, když uživatel klikne na tlačítko.

##### Příklad použití

```xml
<Button 
    Content="Klikni na mě"
    Background="LightBlue"
    Foreground="White"
    BorderBrush="Blue"
    BorderThickness="2"
    FontSize="16"
    Padding="10"
    Margin="10"
    CornerRadius="5"/>
```

</details>

[//]: # (TextBox)
<details>
<summary><span style="color:#1E90FF;">TextBox</span></summary>

TextBox je prvek pro vstup textu od uživatele.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí vstupního pole.
- Foreground: Barva textu.
- BorderBrush: Barva ohraničení.
- BorderThickness: Tloušťka ohraničení.
- FontSize: Velikost písma.
- Padding: Vnitřní odsazení.
- Margin: Vnější odsazení.
- Width: Šířka pole.
- Height: Výška pole.

##### Události

- TextChanged: Vyvolána, když se změní obsah `TextBox`.
- GotFocus: Vyvolána, když `TextBox` získá fokus.
- LostFocus: Vyvolána, když `TextBox` ztratí fokus.

##### Příklad použití

```xml
<TextBox 
    Text="Zadejte text"
    Background="White"
    Foreground="Black"
    BorderBrush="Gray"
    BorderThickness="1"
    FontSize="14"
    Padding="5"
    Margin="10"
    Width="200"
    Height="30"
    TextChanged="TextBox_TextChanged"
    GotFocus="TextBox_GotFocus"
    LostFocus="TextBox_LostFocus"/>
```

</details>

[//]: # (CheckBox)
<details>
<summary><span style="color:#1E90FF;">CheckBox</span></summary>

CheckBox je prvek, který umožňuje uživateli vybrat nebo odznačit volbu.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí.
- Foreground: Barva textu.
- BorderBrush: Barva ohraničení.
- BorderThickness: Tloušťka ohraničení.
- FontSize: Velikost písma.
- Padding: Vnitřní odsazení.
- Margin: Vnější odsazení.

##### Události

- Checked: Vyvolána, když uživatel zaškrtne `CheckBox`.
- Unchecked: Vyvolána, když uživatel odškrtne `CheckBox`.
- Click: Vyvolána, když uživatel klikne na `CheckBox`.

##### Příklad použití

```xml
<CheckBox 
    Content="Souhlasím s podmínkami"
    Background="Transparent"
    Foreground="Black"
    BorderBrush="Gray"
    BorderThickness="1"
    FontSize="14"
    Padding="5"
    Margin="10"
    Checked="CheckBox_Checked"
    Unchecked="CheckBox_Unchecked"
    Click="CheckBox_Click"/>
```

</details>

[//]: # (ComboBox)
<details>
<summary><span style="color:#1E90FF;">ComboBox</span></summary>

ComboBox je prvek, který umožňuje výběr jedné hodnoty z rozevíracího seznamu.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí.
- Foreground: Barva textu.
- BorderBrush: Barva ohraničení.
- BorderThickness: Tloušťka ohraničení.
- FontSize: Velikost písma.
- Padding: Vnitřní odsazení.
- Margin: Vnější odsazení.
- Width: Šířka pole.
- Height: Výška pole.

##### Události

- SelectionChanged:Vyvolána, když uživatel vybere novou položku v `ComboBox`.
- DropDownOpened: Vyvolána, když je rozevírací seznam otevřen.
- DropDownClosed: Vyvolána, když je rozevírací seznam zavřen.

##### Příklad použití

```xml
<ComboBox 
    Background="White"
    Foreground="Black"
    BorderBrush="Gray"
    BorderThickness="1"
    FontSize="14"
    Padding="5"
    Margin="10"
    Width="150"
    Height="30"
    SelectionChanged="ComboBox_SelectionChanged"
    DropDownOpened="ComboBox_DropDownOpened"
    DropDownClosed="ComboBox_DropDownClosed">
    <ComboBoxItem Content="Možnost 1"/>
    <ComboBoxItem Content="Možnost 2"/>
    <ComboBoxItem Content="Možnost 3"/>
</ComboBox>
```

</details>

[//]: # (RadioButton)
<details>
<summary><span style="color:#1E90FF;">RadioButton</span></summary>

RadioButton je prvek, který umožňuje uživateli vybrat jednu možnost z více možností.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí.
- Foreground: Barva textu.
- BorderBrush: Barva ohraničení.
- BorderThickness: Tloušťka ohraničení.
- FontSize: Velikost písma.
- Padding: Vnitřní odsazení.
- Margin: Vnější odsazení.

##### Události

- Checked: Vyvolána, když je `RadioButton` vybrán.
- Unchecked: Vyvolána, když je `RadioButton` odznačen.
- Click: Vyvolána, když uživatel klikne na `RadioButton`.

##### Příklad použití

```xml
<StackPanel Margin="10">
    <TextBlock Text="Vyberte si jednu z možností:" FontSize="16" Margin="0,0,0,10"/>

    <RadioButton 
        Content="Možnost A"
        GroupName="OptionsGroup"
        Background="LightGray"
        Foreground="Black"
        BorderBrush="DarkGray"
        BorderThickness="2"
        FontSize="14"
        Padding="8"
        Margin="0,5"
        CornerRadius="10"
        Checked="RadioButton_Checked"
        Unchecked="RadioButton_Unchecked"
        Click="RadioButton_Click"/>

    <RadioButton 
        Content="Možnost B"
        GroupName="OptionsGroup"
        Background="LightGray"
        Foreground="Black"
        BorderBrush="DarkGray"
        BorderThickness="2"
        FontSize="14"
        Padding="8"
        Margin="0,5"
        CornerRadius="10"
        Checked="RadioButton_Checked"
        Unchecked="RadioButton_Unchecked"
        Click="RadioButton_Click"/>
</StackPanel>
```

</details>


[//]: # (Slider)
<details>
<summary><span style="color:#1E90FF;">Slider</span></summary>

Slider je prvek, který umožňuje uživateli vybrat hodnotu posunutím jezdce.

##### Vlastnosti, které lze stylovat

- Background: Barva pozadí.
- Foreground: Barva jezdce.
- BorderBrush: Barva ohraničení.
- BorderThickness: Tloušťka ohraničení.
- Width: Šířka slideru.
- Height: Výška slideru.

##### Události

- ValueChanged: Vyvolána, když se změní hodnota `Slider`.
- GotFocus: Vyvolána, když `Slider` získá fokus.
- LostFocus: Vyvolána, když `Slider` ztratí fokus.

##### Příklad použití

```xml
<Slider 
    Minimum="0"
    Maximum="100"
    Value="50"
    Background="LightGray"
    Foreground="Blue"
    Width="200"
    Height="30"
    Margin="10"
    ValueChanged="Slider_ValueChanged"
    GotFocus="Slider_GotFocus"
    LostFocus="Slider_LostFocus"/>
```

</details>

[//]: # (Vlastní ovládací prvek)
<details>
<summary><span style="color:#1E90FF;">Vlastní ovládací prvek</span></summary>

Pokud standardní ovládací prvky nevyhovují vašim potřebám, můžete vytvořit vlastní ovládací prvek.

- **Definice vlastního ovládacího prvku**

  Vytvořte třídu vlastního ovládacího prvku. (Tato třída by měla dědit z existujícího ovládacího prvku, např. `Button`.)

   ```csharp
    using System.Windows;
    using System.Windows.Controls;
    
    namespace YourNamespace
    {
        public class MyCustomButton : Button
        {
            static MyCustomButton()
            {
                DefaultStyleKeyProperty.OverrideMetadata(typeof(MyCustomButton), 
                    new FrameworkPropertyMetadata(typeof(MyCustomButton)));
            }
        }
    }
   ```

    - **DefaultStyleKeyProperty**: Určuje výchozí styl pro vlastní ovládací prvek.

- **Definujte styl a šablonu pro vlastní ovládací prvek**

  Styl a šablonu můžete definovat v XAML jako obvykle.

  ```xml
  <Window.Resources>
    <Style TargetType="{x:Type local:MyCustomButton}">
        <Setter Property="Background" Value="LightGray"/>
        <Setter Property="Foreground" Value="Black"/>
        <Setter Property="FontSize" Value="16"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="{x:Type local:MyCustomButton}">
                    <Border Background="{TemplateBinding Background}" 
                            BorderBrush="Black" 
                            BorderThickness="2" 
                            CornerRadius="10">
                        <ContentPresenter HorizontalAlignment="Center" 
                                          VerticalAlignment="Center"/>
                    </Border>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
  </Window.Resources>
  ```

- **Použití vlastního ovládacího prvku** v XAML:

  ```xml
  <local:MyCustomButton Content="Moje vlastní tlačítko" Width="200" Height="50"/>
  ```

</details>

### Styly

Styl se používá k definování vzhledu a chování více prvků najednou.

Definuje se pomocí **XAML**.

<details>
<summary><span style="color:#1E90FF;">Definování stylu</span></summary>

- Styl se definuje v sekci **Resources**:

    ```xml
        <Window.Resources>
            <Style x:Key="MyButtonStyle" TargetType="Button">
                <Setter Property="Background" Value="Blue"/>
                <Setter Property="Foreground" Value="White"/>
                <Setter Property="FontSize" Value="14"/>
                <Setter Property="Padding" Value="10"/>
            </Style>
        </Window.Resources>
    ```

    - **x**: Unikátní název stylu, který použijete později.

    - **TargetType**: Typ prvku, na který se styl vztahuje.

</details>

<details>
<summary><span style="color:#1E90FF;">Použití stylu</span></summary>

- Chcete-li styl použít na prvek, využijete atribut **Style**:

  ```xml
  <Button Style="{StaticResource MyButtonStyle}" Content="Klikni na mě"/>
  ```

</details>

#### Prefixy

**x**:

- Vyhrazen pro XAML standardní funkce a typy.
- Používá se pro přístup k základním vlastnostem, jako jsou `x:Class`, `x:Name`, `x:Key`, atd.
- Příklad
  ```xml
  <Window x:Class="MyNamespace.MainWindow"
        x:Name="mainWindow"
        x:Key="myWindowKey">
  ```

**xmlns:**

- Používá se k deklaraci namespace.
- Obvykle se používá v kořenovém prvku XAML souboru.
- Příklad deklarace namespace:
  ```xml
    <Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
            xmlns:local="clr-namespace:MyNamespace">
  ```

**local**:

- Používán k odkazování na vlastní namespace aplikace.
- Můžete ho použít k přístupu k vlastním ovládacím prvkům, datovým modelům a dalším třídám definovaným ve vaší aplikaci.
- Příklad:
  ```xml
	<local:MyCustomButton Content="Moje vlastní tlačítko"/>
  ```

**xmlns:sys:**

- Pro přístup k základním typům .NET, jako jsou `System.String`, `System.Int32`, atd.
- Příklad:

```xml
xmlns:sys="clr-namespace:System;assembly=mscorlib"
```

**xmlns:controls:**

- Pro přístup k ovládacím prvkům z externích knihoven, jako je například **Windows Community Toolkit**.
- Příklad:
  ```xml
	<controls:MyCustomControl/>
  ```

**xmlns:mc:**

- Používá se pro **Markup Compatibility**.
- Umožňuje použití starších XAML formátů a zajišťuje zpětnou kompatibilitu.
- Příklad:
  ```xml
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
  ```

**xmlns:d:**

- Používá se pro návrhové časové funkce a umožňuje definovat prvky, které se zobrazují pouze během návrhu.
- Příklad:
  ```xml
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
  ```

##### Použití prefixů v XAML

```xml
<Window x:Class="MyNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="clr-namespace:MyNamespace"
        xmlns:controls="clr-namespace:MyCustomControls;assembly=MyCustomControlsAssembly"
        xmlns:sys="clr-namespace:System;assembly=mscorlib"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        mc:Ignorable="d"
        Title="Hlavní okno" Height="350" Width="525">
    
    <Grid>
        <local:MyCustomButton Content="Moje vlastní tlačítko" Width="200" Height="50"/>
        <Button Content="Tlačítko" Width="100" Height="30"/>
    </Grid>
</Window>
```

#### Šablony (ControlTemplates)

Šablony umožňují plně přizpůsobit vzhled ovládacího prvku.

Šablona definuje strukturu a vzhled prvku.

- Vytvoření šablony pro tlačítko

  ```xml
  <Window.Resources>
    <ControlTemplate x:Key="MyButtonTemplate" TargetType="Button">
        <Border Background="{TemplateBinding Background}" 
                BorderBrush="Black" 
                BorderThickness="2" 
                CornerRadius="5">
            <ContentPresenter HorizontalAlignment="Center" 
                              VerticalAlignment="Center"/>
        </Border>
    </ControlTemplate>
  </Window.Resources>
  ```

    - **ControlTemplate**: Určuje, jak bude tlačítko vypadat.

    - **TemplateBinding**: Slouží k vázání vlastností stylu na vlastnosti šablony.

- Použití šablony

  ```xml
  <Button Template="{StaticResource MyButtonTemplate}" 
        Background="LightBlue" 
        Content="Stylizované tlačítko"/>
  ```

### Responzivní design prvků

**Responzivní design** znamená, že se aplikace přizpůsobí různým velikostem a rozlišením obrazovky.

<details>
<summary><span style="color:#1E90FF;">Layout Panely</span></summary>

WPF nabízí různé layout panely, které vám pomohou uspořádat ovládací prvky, jako jsou tlačítka nebo textová pole.

- Zde jsou nejčastěji používané panely

    <details>
    <summary><span style="color:#E95A84;">Grid</span></summary>
    
    Rozděluje okno na řádky a sloupce.
    
    Umožňuje flexibilní uspořádání.
    
    Příklad:
    
    ```xml
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="*" />
            <RowDefinition Height="*" />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
    
        <Button Grid.Row="0" Grid.Column="0" Content="Tlačítko 1" />
        <Button Grid.Row="0" Grid.Column="1" Content="Tlačítko 2" />
        <Button Grid.Row="1" Grid.Column="0" Content="Tlačítko 3" />
        <Button Grid.Row="1" Grid.Column="1" Content="Tlačítko 4" />
    </Grid>
    ```
    
    </details>
    
    <details>
    <summary><span style="color:#E95A84;">StackPanel</span></summary>
    
    Ukládá ovládací prvky buď vertikálně (jeden pod druhým), nebo horizontálně (vedle sebe).
    
    Příklad:
    
    ```xml
    <StackPanel Orientation="Vertical">
        <Button Content="Tlačítko 1" />
        <Button Content="Tlačítko 2" />
        <Button Content="Tlačítko 3" />
    </StackPanel>
    ```
    
    Pokud chceme prvky uspořádat horizontálně:
    
    ```xml
    <StackPanel Orientation="Horizontal">
        <Button Content="Tlačítko 1" />
        <Button Content="Tlačítko 2" />
        <Button Content="Tlačítko 3" />
    </StackPanel>
    ```
    
    </details>
    
    <details>
    <summary><span style="color:#E95A84;">WrapPanel</span></summary>
    
    Pokud je na obrazovce málo místa, ovládací prvky se "obalí" na další řádek/sloupec.
    
    Příklad:
    
    ```xml
    <WrapPanel>
        <Button Content="Tlačítko 1" Width="100" Height="50" />
        <Button Content="Tlačítko 2" Width="100" Height="50" />
        <Button Content="Tlačítko 3" Width="100" Height="50" />
        <Button Content="Tlačítko 4" Width="100" Height="50" />
        <Button Content="Tlačítko 5" Width="100" Height="50" />
    </WrapPanel>
    ```
    
    </details>
    
    <details>
    <summary><span style="color:#E95A84;">DockPanel</span></summary>
    
    Umožňuje umístit ovládací prvky na okraje okna (vlevo, vpravo, nahoře, dole) a zbývající prostor zaplní jeden prvek.
    
    Příklad:
    
    ```xml
    <DockPanel>
        <Button DockPanel.Dock="Top" Content="Horní tlačítko" />
        <Button DockPanel.Dock="Bottom" Content="Spodní tlačítko" />
        <Button DockPanel.Dock="Left" Content="Levé tlačítko" />
        <Button DockPanel.Dock="Right" Content="Pravé tlačítko" />
        <Button Content="Centrální tlačítko" />
    </DockPanel>
    ```
    
    </details>
</details>

<details>
<summary><span style="color:#1E90FF;">Dynamické Velikosti</span></summary>

**Dynamické velikosti** znamenají, že se ovládací prvky automaticky přizpůsobují velikosti okna.

- Místo pevně definovaných hodnot můžete použít:

    <details>
    <summary><span style="color:#E95A84;">Procentuální hodnoty</span></summary>
    
    Umožňují ovládacím prvkům zabírat procento rodičovského prvku.
    
    Příklad:
    
    ```xml
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="50%"/> <!-- 50% šířky rodičovského prvku -->
            <ColumnDefinition Width="50%"/> <!-- 50% šířky rodičovského prvku -->
        </Grid.ColumnDefinitions>
    
        <TextBlock Text="Toto zabírá 50% šířky okna" Background="LightCoral" Grid.Column="0" />
        <TextBlock Text="Toto také zabírá 50% šířky okna" Background="LightBlue" Grid.Column="1" />
    </Grid>
    ```
    
    </details>

    <details>
    <summary><span style="color:#E95A84;">Hodnoty s `*`</span></summary>
    
    V Gridu můžete použít `*` k rozdělení zbývajícího místa.
    
    Například `2*` a `1*` znamená, že první sloupec zabere dvakrát více místa než druhý.
    
    Příklad:
    
    ```xml
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="2*"/> <!-- Dva díly prostoru -->
            <ColumnDefinition Width="1*"/> <!-- Jeden díl prostoru -->
        </Grid.ColumnDefinitions>
    
        <TextBlock Text="Toto zabírá 2/3 šířky okna" Background="LightCoral" Grid.Column="0"/>
        <TextBlock Text="Toto zabírá 1/3 šířky okna" Background="LightBlue" Grid.Column="1"/>
    </Grid>
    ```

    </details>
    
    <details>
    <summary><span style="color:#E95A84;">Auto</span></summary>
    
    Automatická velikost na základě obsahu.
    
    Příklad:
    
    ```xml
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>  <!-- Automatická výška pro hlavičku -->
            <RowDefinition Height="*"/>     <!-- Zbytek prostoru pro další prvky -->
        </Grid.RowDefinitions>
    
        <TextBlock Text="Hlavička" Grid.Row="0" FontSize="24" Background="LightGray" />
        <Button Content="Toto tlačítko zabírá zbytek prostoru" Grid.Row="1" />
    </Grid>
    ```
    
    </details>

</details>

<details>
<summary><span style="color:#1E90FF;">Sledování Změny Velikosti</span></summary>

Můžete sledovat změny velikosti okna a upravit rozložení ovládacích prvků.

Pomocí události `SizeChanged` můžete reagovat na změnu velikosti okna a provést potřebné úpravy.

Příklad:

```csharp
private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
{
    // Získání nové šířky a výšky okna
    double newWidth = e.NewSize.Width;
    double newHeight = e.NewSize.Height;

    // Například upravit velikost tlačítka na základě velikosti okna
    if (newWidth < 600)
    {
        myButton.Width = 100; // Menší šířka tlačítka
    }
    else
    {
        myButton.Width = 200; // Větší šířka tlačítka
    }

    // Můžete také změnit další vlastnosti na základě velikosti okna
}
```

> [!IMPORTANT]
> Nezapomeňte přidat událost do XAML:
>
> ```xml
> <Window x:Class="ResponzivniDesign.MainWindow"
>        SizeChanged="Window_SizeChanged">
> ```

</details>

<details>
<summary><span style="color:#1E90FF;">ViewBox</span></summary>

Vše, co je uvnitř ViewBoxu, se přizpůsobí velikosti okna. (Automatické škálování obsahu.)

Příklad:

```xml
<ViewBox>
    <Grid>
        <TextBlock Text="Toto je responzivní text!" FontSize="20"/>
    </Grid>
</ViewBox>
```

</details>

### Triggery

Triggery umožňují dynamicky měnit vzhled prvku na základě určitých událostí nebo podmínek.

- Použití triggeru

  Zde je příklad stylu tlačítka, který mění barvu pozadí, když je kurzor myši nad tlačítkem:

  ```xml
    <Style TargetType="Button">
        <Setter Property="Background" Value="Gray"/>
        <Setter Property="Foreground" Value="White"/>
        <Style.Triggers>
            <Trigger Property="IsMouseOver" Value="True">
                <Setter Property="Background" Value="Green"/>
            </Trigger>
        </Style.Triggers>
    </Style>
  ```

### Data Binding (Vazba Modelu na View)

<details>
<summary><span style="color:#1E90FF;">1. Vytvoření ViewModel</span></summary>

- Nejprve vytvoříme ViewModel, který bude obsahovat vlastnost, kterou chceme vázat.
    
    > [!IMPORTANT]
    > Použijeme `INotifyPropertyChanged`, aby WPF věděl, kdy se vlastnost změnila.
    
    ```csharp
    using System.ComponentModel;
    
    public class MyViewModel : INotifyPropertyChanged
    {
        private string _name;
    
        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                OnPropertyChanged(nameof(Name));
            }
        }
    
        public event PropertyChangedEventHandler PropertyChanged;
    
        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
    ```
    
    > [!NOTE]
    > `MyViewModel` má vlastnost `Name`, která implementuje `INotifyPropertyChanged`.
    >
    >To zajišťuje, že pokud se `Name` změní, UI se automaticky aktualizuje.

</details>

<details>
<summary><span style="color:#1E90FF;">2. Vytvoření XAML pro UI</span></summary>

- Vytvoříme jednoduché uživatelské rozhraní, které umožní uživateli zadat jméno a zobrazit ho.
    
    Použijeme `TextBox` pro zadání a `TextBlock` pro zobrazení.
    
    ```csharp
    <Window x:Class="WpfApp.MainWindow"
            xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
            Title="Binding Example" Height="200" Width="300">
        <Grid>
            <TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" Width="200" Margin="10"/>
            <TextBlock Text="{Binding Name}" Margin="10,50,10,10"/>
        </Grid>
    </Window>
    ```
    
    - UpdateSourceTrigger
  
      | **Možnost**         | **Popis**                                                                 |
      |---------------------|---------------------------------------------------------------------------|
      | **PropertyChanged** | Aktualizuje vlastnost ViewModelu při každé změně textu v `TextBox`.       |
      | **LostFocus**       | Aktualizuje vlastnost ViewModelu pouze po ztrátě fokusu.                 |
      | **Explicit**        | Aktualizuje vlastnost ViewModelu pouze po zavolání `UpdateSource()`.     |
      | **Default**         | Používá výchozí chování, které závisí na ovládacím prvku (např. LostFocus pro TextBox). |

    > [!NOTE]
    > V XAML používáme `{Binding Name}` pro vázání `TextBox` a `TextBlock` na vlastnost `Name` ve ViewModelu.
    >
    > `UpdateSourceTrigger=PropertyChanged` znamená, že binding se aktualizuje při každé změně textu v `TextBox`.
    >
    > (Vlastnost ViewModelu se aktualizuje okamžitě při každé změně textu.)
    >
    > Příklad:
    >
    > ```xml
    > <TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" Width="200" Margin="10"/>

</details>

<details>
<summary><span style="color:#1E90FF;">3. Nastavení DataContext</span></summary>

- V `MainWindow.xaml.cs` nastavíme `DataContext` na instanci našeho `ViewModelu`.
    
    ```csharp
    using System.Windows;
    
    namespace WpfApp
    {
        public partial class MainWindow : Window
        {
            public MainWindow()
            {
                InitializeComponent();
                DataContext = new MyViewModel(); // Nastavujeme DataContext
            }
        }
    }
    ```
    
    > [!NOTE]
    > V konstruktoru `MainWindow` nastavujeme `DataContext` na instanci `MyViewModel`.
    >
    > To umožňuje XAML binding k vlastnostem ViewModelu.

</details>

### Validace

<details>
<summary><span style="color:#1E90FF;">INotifyPropertyChanged + IDataErrorInfo</span></summary>

Obvykle se používá pro vracení celkové chyby objektu.

1. **Vytvoření ViewModelu s validací**

    ```c#
        public class MyViewModel : INotifyPropertyChanged, IDataErrorInfo
        {
            private string _name;
        
            // Property s validací
            [Required(ErrorMessage = "Pole je povinné.")]
            public string Name
            {
                get => _name;
                set
                {
                    _name = value;
                    OnPropertyChanged(nameof(Name)); // Oznámení o změně
                }
            }
        
            // Notifikace o změně
            public event PropertyChangedEventHandler PropertyChanged;
        
            protected void OnPropertyChanged(string propertyName)
            {
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
            }
        
            // Implementace IDataErrorInfo
            public string this[string columnName]
            {
                get
                {
                    var validationResults = new List<ValidationResult>();
                    var context = new ValidationContext(this) { MemberName = columnName };
                    Validator.TryValidateProperty(
                        this.GetType().GetProperty(columnName).GetValue(this),
                        context,
                        validationResults
                    );
        
                    // Vrátí první chybu, pokud existuje, jinak vrátí null
                    return validationResults.FirstOrDefault()?.ErrorMessage;
                }
            }
        
            public string Error
            {
                get
                {
                    return null; // Gets a message that describes any validation errors for the object.
                }
            }
        }
    ```
    > [!NOTE]
    > Použití `this[string columnName]`:
    >
    > Tato metoda slouží k validaci konkrétní vlastnosti.
    >
    > Pokud se objeví chyba, vrací odpovídající chybovou zprávu.

2. **XAML pro validaci pomocí `IDataErrorInfo`**

    ```xml
      <TextBox Text="{Binding Name, 
                      UpdateSourceTrigger=PropertyChanged, 
                      ValidatesOnDataErrors=True}" />
      
      <TextBox.Style>
          <Style TargetType="TextBox">
              <Style.Triggers>
                  <Trigger Property="Validation.HasError" Value="True">
                      <Setter Property="BorderBrush" Value="Red" />
                      <Setter Property="BorderThickness" Value="2" />
                  </Trigger>
              </Style.Triggers>
          </Style>
      </TextBox.Style>
    ```
</details>

<details>
<summary><span style="color:#1E90FF;">INotifyPropertyChanged + INotifyDataErrorInfo</span></summary>

Umožňuje validovat více chyb na jedné vlastnosti a spravovat chybové zprávy pro každou vlastnost asynchronně.

1. **Vytvoření ViewModelu s validací**
    ```c#
    public class MyViewModel : INotifyPropertyChanged, INotifyDataErrorInfo
    {
        private string _name;
        private readonly Dictionary<string, List<string>> _errors = new Dictionary<string, List<string>>();
    
        // Property s validací
        [Required(ErrorMessage = "Pole je povinné.")]
        [StringLength(10, ErrorMessage = "Maximálně 10 znaků.")]
        public string Name
        {
            get => _name;
            set
            {
                _name = value;
                OnPropertyChanged(nameof(Name)); // Oznámení o změně
                ValidateProperty(nameof(Name), value); // Spuštění validace
            }
        }
    
        // Notifikace o změně
        public event PropertyChangedEventHandler PropertyChanged;
    
        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    
        // Validace vlastnosti
        private void ValidateProperty(string propertyName, object value)
        {
            var context = new ValidationContext(this) { MemberName = propertyName };
            var validationResults = new List<ValidationResult>();
    
            bool isValid = Validator.TryValidateProperty(value, context, validationResults);
    
            if (!isValid)
            {
                _errors[propertyName] = validationResults.Select(vr => vr.ErrorMessage).ToList();
            }
            else
            {
                _errors.Remove(propertyName);
            }
    
            OnErrorsChanged(propertyName);
        }
    
        // Implementace INotifyDataErrorInfo
        public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;
    
        // Vrací, zda má objekt nějaké chyby
        public bool HasErrors => _errors.Any();
    
        // Získá seznam chyb pro konkrétní vlastnost
        public IEnumerable GetErrors(string propertyName)
        {
            if (_errors.ContainsKey(propertyName))
                return _errors[propertyName];
            return null;
        }
    
        protected void OnErrorsChanged(string propertyName)
        {
            ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
        }
    }
    ```

2. **XAML pro validaci pomocí `INotifyDataErrorInfo`**

    ```xml
    <TextBox Text="{Binding Name, 
                UpdateSourceTrigger=PropertyChanged, 
                ValidatesOnNotifyDataErrors=True}" />
    
    <TextBox.Style>
        <Style TargetType="TextBox">
            <Style.Triggers>
                <Trigger Property="Validation.HasError" Value="True">
                    <Setter Property="BorderBrush" Value="Red" />
                    <Setter Property="BorderThickness" Value="2" />
                </Trigger>
            </Style.Triggers>
        </Style>
    </TextBox.Style>
    ```

</details>

### Animace

WPF podporuje animace, které umožňují měnit vlastnosti prvků v čase.

Zde je příklad, jak animovat změnu barvy pozadí tlačítka, když na něj najedete:

```xml
<Button Content="Klikni na mě">
    <Button.Triggers>
        <EventTrigger RoutedEvent="Button.MouseEnter">
            <BeginStoryboard>
                <Storyboard>
                    <ColorAnimation Storyboard.TargetProperty="(Button.Background).(SolidColorBrush.Color)"
                                    To="Red" Duration="0:0:1"/>
                </Storyboard>
            </BeginStoryboard>
        </EventTrigger>
    </Button.Triggers>
</Button>
```