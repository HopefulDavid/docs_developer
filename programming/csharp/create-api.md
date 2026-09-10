# .NET – Vytvoření REST API v ASP.NET Core

Tento postup pro SDK .NET 10 vytvoří lokální API poznámek s funkčním přidáním, čtením, úpravou a mazáním.

Data zůstávají pouze v paměti jednoho procesu a po restartu zmizí.

## Vytvoření projektu

V nové pracovní složce spusťte:

```powershell
dotnet new web -n NotesApi -f net10.0
cd NotesApi
```

Prázdná webová šablona umožní přidat jen služby potřebné pro tento příklad. [Microsoft: šablony dotnet new](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates).

## Vstupní bod aplikace

Nahraďte celý `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();
```

`AddControllers` registruje MVC služby a `MapControllers` zpřístupní trasy označené atributy. [Microsoft: API s kontrolery](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-10.0).

## Přidání kontroleru

Vytvořte složku `Controllers` a soubor `Controllers/NotesController.cs`:

```csharp
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace NotesApi.Controllers;

/// <summary>Lokální ukázkové API poznámek uchovávaných v paměti.</summary>
[ApiController]
[Route("api/notes")]
public sealed class NotesController : ControllerBase
{
    private static readonly object Gate = new();
    private static readonly Dictionary<Guid, Note> Notes = new();

    /// <summary>Vrátí aktuální seznam poznámek.</summary>
    [HttpGet]
    public ActionResult<Note[]> GetAll()
    {
        lock (Gate)
            return Notes.Values.OrderBy(note => note.Id).ToArray();
    }

    /// <summary>Vyhledá poznámku podle identifikátoru.</summary>
    [HttpGet("{id:guid}")]
    public ActionResult<Note> GetById(Guid id)
    {
        lock (Gate)
            return Notes.TryGetValue(id, out var note) ? Ok(note) : NotFound();
    }

    /// <summary>Vytvoří poznámku a vrátí její adresu v Location.</summary>
    [HttpPost]
    public ActionResult<Note> Create(NoteInput input)
    {
        var note = new Note(Guid.NewGuid(), input.Text);
        lock (Gate)
            Notes.Add(note.Id, note);
        return CreatedAtAction(nameof(GetById), new { id = note.Id }, note);
    }

    /// <summary>Nahradí text existující poznámky.</summary>
    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, NoteInput input)
    {
        lock (Gate)
        {
            if (!Notes.ContainsKey(id))
                return NotFound();
            Notes[id] = new Note(id, input.Text);
            return NoContent();
        }
    }

    /// <summary>Odstraní existující poznámku.</summary>
    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        lock (Gate)
            return Notes.Remove(id) ? NoContent() : NotFound();
    }
}

/// <summary>Data přijatá při vytvoření nebo změně poznámky.</summary>
public sealed class NoteInput
{
    /// <summary>Povinný text o nejvýše 200 znacích.</summary>
    [Required, StringLength(200)]
    public string Text { get; init; } = "";
}

/// <summary>Uložená neměnná hodnota poznámky.</summary>
/// <param name="Id">Identifikátor přidělený serverem.</param>
/// <param name="Text">Obsah poznámky.</param>
public sealed record Note(Guid Id, string Text);
```

Atribut `ApiController` vrátí pro neplatný model automaticky HTTP 400.

`CreatedAtAction` vrací HTTP 201 s odkazem na existující akci pro čtení právě vytvořené položky. [Microsoft: chování ApiController](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-10.0#automatic-http-400-responses), [návratové typy akcí](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-10.0).

## Spuštění a ověření

Spusťte server s explicitním lokálním portem:

```powershell
dotnet run --no-launch-profile --urls http://127.0.0.1:5057
```

V druhém PowerShellu proveďte celý cyklus:

```powershell
$api = 'http://127.0.0.1:5057/api/notes'
$note = Invoke-RestMethod -Method Post -Uri $api -ContentType 'application/json' -Body '{"text":"Prvni poznamka"}'
Invoke-RestMethod -Uri "$api/$($note.id)"
Invoke-RestMethod -Method Put -Uri "$api/$($note.id)" -ContentType 'application/json' -Body '{"text":"Upraveno"}'
Invoke-RestMethod -Uri "$api/$($note.id)"
Invoke-RestMethod -Method Delete -Uri "$api/$($note.id)"
Invoke-RestMethod -Uri $api
```

Druhé čtení vrátí text `Upraveno` a závěrečný seznam je prázdný.

Opakované čtení smazaného ID vrací HTTP 404; POST s `{"text":""}` vrací HTTP 400.

Server ukončíte pomocí `Ctrl+C`.

## Další rozšíření

Pro trvalé ukládání navazujte na [EF Core](../../database/entity-framework.md).

Před nasazením doplňte autentizaci a oprávnění podle účelu API, HTTPS, práci s chybami a odpovídající úložiště; lokální zámek nesdílí data mezi více procesy.

Tajné hodnoty neukládejte do veřejného `appsettings.json` ani nevypisujte do logů. [Správa tajných údajů](../../network/secrets.md).

Tato ukázka nepřidává OpenAPI ani Swagger UI; jejich konfiguraci řeší [oficiální dokumentace ASP.NET Core OpenAPI](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview?view=aspnetcore-10.0).
