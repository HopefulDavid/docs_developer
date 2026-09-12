# WPF – Rozložení, datové vazby a styly

WPF je UI framework pro desktopové aplikace Windows; vzhled popisuje XAML a chování obvykle C#.

## Založení projektu

Na Windows se SDK .NET 10:

```powershell
dotnet new wpf -n WpfDemo -f net10.0
cd WpfDemo
```

WPF zůstává technologií pro Windows i v moderním .NET. [Microsoft: WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview/).

## Data Binding (Vazba dat)

Nahraď `MainWindow.xaml` následujícím obsahem:

```xml
<Window x:Class="WpfDemo.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Vazba dat" Width="480" Height="260"
        MinWidth="320" MinHeight="220">
    <Grid Margin="24">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
        </Grid.RowDefinitions>
        <Label Content="_Jméno:" Target="{Binding ElementName=NameInput}"/>
        <TextBox x:Name="NameInput" Grid.Row="1" Margin="0,8"
                 Text="{Binding Name, UpdateSourceTrigger=PropertyChanged,
                                ValidatesOnDataErrors=True}"/>
        <TextBlock Grid.Row="2" Text="{Binding Name}" TextWrapping="Wrap"/>
    </Grid>
</Window>
```

Nahraď `MainWindow.xaml.cs`:

```csharp
using System.ComponentModel;
using System.Windows;

namespace WpfDemo;

/// <summary>Okno demonstrující vazbu na model.</summary>
public partial class MainWindow : Window
{
    /// <summary>Vytvoří ovládací prvky a jejich zdroj dat.</summary>
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new PersonViewModel();
    }
}

/// <summary>Upravované jméno s oznámením změn a validací.</summary>
public sealed class PersonViewModel : INotifyPropertyChanged, IDataErrorInfo
{
    private string name = "Eva";

    /// <summary>Jméno zobrazené v obou ovládacích prvcích.</summary>
    public string Name
    {
        get => name;
        set
        {
            if (name == value)
                return;
            name = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
        }
    }

    /// <summary>Oznámí změnu vlastnosti datové vazbě.</summary>
    public event PropertyChangedEventHandler? PropertyChanged;

    /// <summary>Ukázka nepoužívá chybu celého objektu.</summary>
    public string Error => "";

    /// <summary>Vrátí chybu pro ověřovanou vlastnost.</summary>
    public string this[string columnName] =>
        columnName == nameof(Name) && string.IsNullOrWhiteSpace(Name)
            ? "Jméno je povinné."
            : "";
}
```

Po `dotnet run` změna textu ihned mění náhled pod vstupem.

Vymazání jména aktivuje výchozí chybový rámeček WPF.

`DataContext` určuje zdroj vazby, `INotifyPropertyChanged` hlásí jeho změny a `UpdateSourceTrigger=PropertyChanged` přenáší úpravy při psaní. [Microsoft: datové vazby a validace](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/).

## Základní ovládací prvky a rozložení

| Prvek | Účel |
|---|---|
| `Button` | Spuštění akce nebo příkazu |
| `TextBox`, `TextBlock` | Editovatelný a zobrazovaný text |
| `CheckBox` | Nezávislá volba |
| `RadioButton` | Výběr ve skupině |
| `ComboBox` | Výběr ze seznamu |
| `Slider` | Číselná hodnota v intervalu |
| `Grid` | Řádky a sloupce |
| `StackPanel`, `WrapPanel` | Řazení bez zalamování nebo se zalamováním |
| `DockPanel` | Umístění k okrajům |
| `Viewbox` | Škálování obsahu |

U `Grid` znamená `Auto` velikost podle obsahu a `*` podíl zbývajícího prostoru.

Například sloupce `2*` a `*` si dostupný prostor rozdělí v poměru 2: 1; zápis procent není podporovaný.

`Viewbox` škáluje celý obsah a nenahrazuje přeskupení formuláře při zúžení okna. [Microsoft: panely](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/panels-overview), [Viewbox](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/viewbox).

## Styly a šablony

`Style` sdílí hodnoty vlastností a `ControlTemplate` definuje vizuální strom prvku.

`Button` nemá vlastnost `CornerRadius`; zaoblení patří například prvku `Border` uvnitř jeho šablony. [Microsoft: styly a šablony](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/styles-templates-overview).

Následující samostatný fragment patří do `Window.Resources` před hlavní `Grid`:

```xml
<Window.Resources>
    <Style x:Key="RoundedButton" TargetType="Button">
        <Setter Property="Background" Value="#174B75"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="Padding" Value="12,8"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="Button">
                    <Border x:Name="Surface" CornerRadius="6"
                            Padding="{TemplateBinding Padding}"
                            Background="{TemplateBinding Background}">
                        <ContentPresenter HorizontalAlignment="Center"
                                          VerticalAlignment="Center"
                                          RecognizesAccessKey="True"/>
                    </Border>
                    <ControlTemplate.Triggers>
                        <Trigger Property="IsMouseOver" Value="True">
                            <Setter TargetName="Surface" Property="Background" Value="#24679D"/>
                        </Trigger>
                        <Trigger Property="IsPressed" Value="True">
                            <Setter TargetName="Surface" Property="Background" Value="#103550"/>
                        </Trigger>
                        <Trigger Property="IsKeyboardFocused" Value="True">
                            <Setter TargetName="Surface" Property="BorderBrush" Value="#F0B400"/>
                            <Setter TargetName="Surface" Property="BorderThickness" Value="2"/>
                        </Trigger>
                        <Trigger Property="IsEnabled" Value="False">
                            <Setter TargetName="Surface" Property="Opacity" Value="0.5"/>
                        </Trigger>
                    </ControlTemplate.Triggers>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
</Window.Resources>
```

Styl použij například na tlačítku v jiném řádku formuláře:

```xml
<Button Style="{StaticResource RoundedButton}" Content="_Uložit"/>
```

Akci připoj přes `Command` nebo obsluhu `Click`; samotný styl data neukládá.

Při vlastní šabloně ověř stavy myši, stisku, klávesnicového fokusu a zakázání.

## Prefixy v XAML

Prefix platí až po deklaraci příslušného `xmlns`.

`x` obvykle označuje jazykové prvky jako `x:Class`; `local` je běžně volené jméno pro vlastní CLR namespace, nikoli automaticky dostupné klíčové slovo. [Microsoft: jmenné prostory XAML](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/xaml-namespaces-and-namespace-mapping-for-wpf-xaml).

## Animace

Pro změny v čase použij `Storyboard` a animaci vhodnou pro daný typ vlastnosti.

Například `ColorAnimation` na `(Background).(SolidColorBrush.Color)` vyžaduje pozadí typu `SolidColorBrush`.

U vlastní šablony animuj skutečně zobrazovaný prvek; výchozí šablona může barvu tlačítka řídit svými stavy. [Microsoft: přehled animací](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/animation-overview).
