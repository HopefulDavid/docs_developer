# WPF – Moderní UI & Tipy

> Praktické rady pro tvorbu desktopových aplikací ve WPF, stylování, datové vazby, validaci, animace a responzivní design.

---

<img src="../../images/bce43a30-8b45-414f-b656-200d5551f88e.png" alt="" style="width: 30%; display: block; border-radius: 8px;">

## Co je WPF?

- Tvorba moderních desktopových aplikací pro Windows.
- Oddělení logiky (**C#**) od vzhledu (**XAML**).
- Podpora datových vazeb, stylů, animací a vektorové grafiky.

---

## Základní ovládací prvky

<details>
<summary>Button</summary>

- Interaktivní tlačítko s možností stylování a událostí.

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

<details>
<summary>TextBox</summary>

- Vstupní pole pro text s událostmi a stylováním.

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
    TextChanged="TextBox_TextChanged"/>
```
</details>

<details>
<summary>CheckBox</summary>

- Zaškrtávací pole pro volby.

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
    Checked="CheckBox_Checked"/>
```
</details>

<details>
<summary>ComboBox</summary>

- Rozevírací seznam pro výběr jedné hodnoty.

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
    Height="30">
    <ComboBoxItem Content="Možnost 1"/>
    <ComboBoxItem Content="Možnost 2"/>
</ComboBox>
```
</details>

<details>
<summary>RadioButton</summary>

- Výběr jedné možnosti ze skupiny.

```xml
<StackPanel Margin="10">
    <TextBlock Text="Vyberte si jednu z možností:" FontSize="16" Margin="0,0,0,10"/>
    <RadioButton Content="Možnost A" GroupName="OptionsGroup"/>
    <RadioButton Content="Možnost B" GroupName="OptionsGroup"/>
</StackPanel>
```
</details>

<details>
<summary>Slider</summary>

- Výběr hodnoty posunutím jezdce.

```xml
<Slider
    Minimum="0"
    Maximum="100"
    Value="50"
    Background="LightGray"
    Foreground="Blue"
    Width="200"
    Height="30"
    Margin="10"/>
```
</details>

---

## Vlastní ovládací prvky

<details>
<summary>Jak vytvořit vlastní prvek?</summary>

- Dědění z existujícího prvku (např. `Button`).
- Definice stylu a šablony v XAML.

```csharp
public class MyCustomButton : Button
{
    static MyCustomButton()
    {
        DefaultStyleKeyProperty.OverrideMetadata(typeof(MyCustomButton),
            new FrameworkPropertyMetadata(typeof(MyCustomButton)));
    }
}
```

```xml
<Style TargetType="{x:Type local:MyCustomButton}">
    <Setter Property="Background" Value="LightGray"/>
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="{x:Type local:MyCustomButton}">
                <Border Background="{TemplateBinding Background}" CornerRadius="10">
                    <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
                </Border>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```
</details>

---

## Styly & Šablony

<details>
<summary>Definování stylu</summary>

- Styl pro více prvků najednou.

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
</details>


```xml
<Button Style="{StaticResource MyButtonStyle}" Content="Klikni na mě"/>
```


<details>
<summary>Šablony (ControlTemplates)</summary>

- Úplná změna vzhledu prvku.

```xml
<ControlTemplate x:Key="MyButtonTemplate" TargetType="Button">
    <Border Background="{TemplateBinding Background}" CornerRadius="5">
        <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
    </Border>
</ControlTemplate>
<Button Template="{StaticResource MyButtonTemplate}" Content="Stylizované tlačítko"/>
```
</details>

---

## Prefixy v XAML

<details>
<summary>Přehled prefixů</summary>

| Prefix      | Použití                                      |
|-------------|----------------------------------------------|
| `x`         | Standardní XAML funkce (`x:Class`, `x:Name`) |
| `local`     | Vlastní namespace aplikace                   |
| `sys`       | Základní typy .NET                           |
| `controls`  | Externí knihovny                             |
| `mc`        | Kompatibilita markupů                        |
| `d`         | Návrhové funkce                              |

```xml
<Window x:Class="MyNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="clr-namespace:MyNamespace"
        xmlns:sys="clr-namespace:System;assembly=mscorlib"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        mc:Ignorable="d">
```
</details>

---

## Responzivní design


- **Grid**: Řádky/sloupce
- **StackPanel**: Vertikální/horizontální řazení
- **WrapPanel**: Zalomení prvků
- **DockPanel**: Uspořádání k okrajům


<details>
<summary>Dynamické velikosti</summary>

- Procenta, hvězdičky (`*`), `Auto` pro flexibilní rozložení.

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="2*"/>
        <ColumnDefinition Width="1*"/>
    </Grid.ColumnDefinitions>
</Grid>
```
</details>

<details>
<summary>Sledování změny velikosti</summary>

- Událost `SizeChanged` pro dynamické úpravy.

```csharp
private void Window_SizeChanged(object sender, SizeChangedEventArgs e)
{
    // Úprava velikosti prvků podle okna
}
```
</details>

<details>
<summary>ViewBox</summary>

- Automatické škálování obsahu.

```xml
<ViewBox>
    <Grid>
        <TextBlock Text="Responzivní text!" FontSize="20"/>
    </Grid>
</ViewBox>
```
</details>

---

## Triggery

<details>
<summary>Dynamické změny stylu</summary>

- Změna vzhledu na základě událostí.

```xml
<Style TargetType="Button">
    <Setter Property="Background" Value="Gray"/>
    <Style.Triggers>
        <Trigger Property="IsMouseOver" Value="True">
            <Setter Property="Background" Value="Green"/>
        </Trigger>
    </Style.Triggers>
</Style>
```
</details>

---

## Data Binding (Vazba dat)

<details>
<summary>‍ ViewModel + Binding</summary>

- Použití `INotifyPropertyChanged` pro automatickou aktualizaci UI.

```csharp
public class MyViewModel : INotifyPropertyChanged
{
    private string _name;
    public string Name
    {
        get => _name;
        set { _name = value; OnPropertyChanged(nameof(Name)); }
    }
    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

```xml
<TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" Width="200"/>
<TextBlock Text="{Binding Name}" Margin="10,50,10,10"/>
```
</details>

---

## Validace

<details>
<summary>IDataErrorInfo</summary>

- Validace vlastností s chybovou zprávou.

```csharp
public class MyViewModel : INotifyPropertyChanged, IDataErrorInfo
{
    // ... implementace validace ...
}
```

```xml
<TextBox Text="{Binding Name, ValidatesOnDataErrors=True}" />
```
</details>

<details>
<summary>INotifyDataErrorInfo</summary>

- Pokročilá validace s více chybami.

```csharp
public class MyViewModel : INotifyPropertyChanged, INotifyDataErrorInfo
{
    // ... implementace validace ...
}
```

```xml
<TextBox Text="{Binding Name, ValidatesOnNotifyDataErrors=True}" />
```
</details>

---

## Animace

<details>
<summary>Příklad animace</summary>

- Animace změny barvy pozadí tlačítka.

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
</details>