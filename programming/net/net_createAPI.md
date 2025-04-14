## Vytvoření API

Vlastní REST API v C# s využitím frameworku `ASP.NET Core`.

<details>
<summary><span style="color:#1E90FF;">Vytvoření projektu</span></summary>

1. Otevřete `Visual Studio`.
2. Vyberte možnost `Create a new project`.
3. Zvolte šablonu `ASP.NET Core Web API`.
4. Pojmenujte projekt a klikněte na `Create`.
5. Vyberte `.NET 6 (Long-term support)` nebo nejnovější dostupnou verzi .NET a potvrďte.

</details>

<details>
<summary><span style="color:#1E90FF;">Struktura projektu</span></summary>

| Složka/Soubor    | Popis                        |
|------------------|------------------------------|
| Controllers      | Obsahuje kontrolery API.     |
| Program.cs       | Hlavní vstupní bod aplikace. |
| appsettings.json | Konfigurační soubor.         |

</details>

<details>
<summary><span style="color:#1E90FF;">Přidání kontroleru</span></summary>

1. Klikněte pravým tlačítkem na složku `Add` → `Controller...`.
2. Vyberte `MVC Controller - Empty` a pojmenujte ho např. `MyController`.

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyAPI.Controllers
{
    // Třída MyController je použita jako "my" v URL trasách
    // To je způsobeno tím, že atribut [Route("api/[controller]")] používá název třídy kontroleru (bez přípony "Controller") jako prefix trasy.
    [ApiController] // Definuje třídu jako API kontroler.
    [Route("api/[controller]")] // Definuje prefix URL pro kontroler.
    public class MyController : ControllerBase
    {
        // GET: api/my
        [HttpGet] // Definuje metodu jako GET.
        public IActionResult Get()
        {
            return Ok(new { message = "Vítejte v mém API!" }); // Vrátí HTTP 200 OK s objektem.
        }

        // POST: api/my
        [HttpPost] // Definuje metodu jako POST.
        public IActionResult Post([FromBody] MyModel model) // Označuje, že parametr metody je z těla požadavku.
        {
            if (model == null)
            {
                return BadRequest("Model je null"); // Vrátí HTTP 400 Bad Request s objektem.
            }
            return CreatedAtAction(nameof(Get), new { id = model.Id }, model); // Vrátí HTTP 201 Created s objektem.
        }

        // PUT: api/my/{id}
        [HttpPut("{id}")] // Definuje metodu jako PUT.
        public IActionResult Put(int id, [FromBody] MyModel model) // Označuje, že parametr metody je z těla požadavku.
        {
            if (id != model.Id)
            {
                return BadRequest("ID neodpovídá"); // Vrátí HTTP 400 Bad Request s objektem.
            }
            // Aktualizace logiky zde
            return Ok(model); // Vrátí HTTP 200 OK s objektem.
        }

        // DELETE: api/my/{id}
        [HttpDelete("{id}")] // Definuje metodu jako DELETE.
        public IActionResult Delete(int id)
        {
            // Smazání logiky zde
            return NoContent(); // Vrátí HTTP 204 No Content.
        }

        // GET: api/my/search?query={query}
        [HttpGet("search")] // Definuje metodu jako GET.
        public IActionResult Search([FromQuery] string query) // Označuje, že parametr metody je z dotazu URL.
        {
            // Vyhledávací logika zde
            return Ok(new { query }); // Vrátí HTTP 200 OK s objektem.
        }

        // GET: api/my/{id}
        [HttpGet("{id}")] // Definuje metodu jako GET.
        public IActionResult GetById([FromRoute] int id) // Označuje, že parametr metody je z cesty URL.
        {
            // Získání logiky zde
            var model = new MyModel { Id = id, Name = "Example" };
            if (model == null)
            {
                return NotFound(); // Vrátí HTTP 404 Not Found.
            }
            return Ok(model); // Vrátí HTTP 200 OK s objektem.
        }
    }

    public class MyModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
```

</details>

<details>
<summary><span style="color:#1E90FF;">Konfigurace závislostí</span></summary>

Soubor `Startup.cs` slouží k nastavení a konfiguraci aplikace.

<details>
<summary><span style="color:#E95A84;">`Startup.cs`</span></summary>

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace MyAPI
{
    public class Startup
    {
        /// <summary> Obsahuje konfiguraci aplikace. </summary>
        private readonly IConfiguration _configuration;

        /// <summary> Inicializuje novou instanci třídy <see cref="Startup"/>. </summary>
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration; // Uloží konfiguraci do privátní proměnné.
        }
        
        /// <summary>
        /// Konfiguruje služby pro aplikaci.
        ///
        /// Zde se přidávají služby do kontejneru služeb, které jsou následně použíty v <see cref="Configure"/>.
        /// </summary>
        /// <param name="services">Kolekce služeb pro aplikaci.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            // Přidává službu MVC.
            // MVC = Model-View-Controller, architektura pro vytváření webových aplikací.
            services.AddControllers();
            
            // Příklad použití konfigurace z appsettings.json

            // Přidává podporu pro CORS. 
            // (CORS = Cross-Origin Resource Sharing, umožňuje webům získat data ze serverů na jiné doméně, pokud to server povolí.)
            services.AddCors();

            // Přidává podporu pro autentizaci.
            // Aplikace může používat různé způsoby autentizace, např. OAuth, OpenID Connect, Cookies, JWT atd.
            services.AddAuthentication();

            // Přidává podporu pro autorizaci.
            // Autorizace určuje, kdo může přistupovat k různým částem aplikace.
            services.AddAuthorization();

            // Přidává podporu pro Swagger (dokumentace API).
            // Swagger je nástroj pro vytváření, dokumentaci a testování API.
            services.AddSwaggerGen();
            
            // Příklad použití konfigurace v třídě služby.
            services.AddSingleton<MyService>();
        }

        /// <summary>
        /// Konfiguruje middleware a další nastavení aplikace.
        /// </summary>
        /// <param name="app">Aplikace pro konfiguraci middleware.</param>
        /// <param name="env">Poskytuje informace o prostředí, ve kterém aplikace běží.</param>
        /// <param name="logger">Poskytuje funkce pro logování.</param>
        /// <param name="myService">Poskytuje službu pro konfiguraci.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger, MyService myService)
        {
            // Přidává middleware pro logování chyb.
            if (env.IsDevelopment())
            {
                // Povoluje stránku s chybami pro vývojové prostředí.
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Používá stránku s chybami pro produkční prostředí.
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts(); // HSTS = HTTP Strict Transport Security, zajišťuje, že prohlížeči budou komunikovat pouze přes HTTPS.
            }

            // Přidává podporu pro HTTPS.
            app.UseHttpsRedirection();

            // Přidává podporu pro statické soubory.
            app.UseStaticFiles();

            // Přidává podporu pro CORS.
            app.UseCors(builder => 
                builder.AllowAnyOrigin() // Povoluje všechny zdroje.
                       .AllowAnyMethod() // Povoluje všechny metody.
                       .AllowAnyHeader()); // Povoluje všechny hlavičky.

            // Přidává podporu pro routování.
            // Routování určuje, jaké akce budou provedeny pro různé URL adresy.
            app.UseRouting();

            // Přidává podporu pro autentizaci.
            app.UseAuthentication();

            // Přidává podporu pro autorizaci.
            app.UseAuthorization();

            // Přidává podporu pro Swagger.
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {                
                // Nastavuje prefix URL pro Swagger.
                // Pokud je nastaveno na prázdný řetězec, Swagger UI bude dostupné na kořenové URL (např. https://localhost:5001/).
                c.RoutePrefix = string.Empty;
                
                // Přidává endpoint pro Swagger.
                // Definuje URL, kde bude dostupná specifikace Swagger (např. https://localhost:5001/v1/swagger.json).
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            // Přidává middleware pro logování požadavků.
            app.Use(async (context, next) =>
            {
                // Příklad použití služby s konfigurací.
                myService.LogInformation();
                myService.UseApiKeys();
                
                // Loguje informace o požadavku.
                logger.LogInformation("Handling request: " + context.Request.Path);
                
                // Předává řízení dalšímu middleware.
                await next.Invoke();
                
                // Loguje informace o dokončení požadavku.
                logger.LogInformation("Finished handling request.");
            });

            // Přidává middleware pro routování pro kontrolery.
            app.UseEndpoints(endpoints =>
            {
                // Přidává routování pro kontrolery.
                endpoints.MapControllers();
            });
        }
    }
}
```
</details>

Soubor `Program.cs` obsahuje vstupní bod aplikace.

<details>
<summary><span style="color:#E95A84;"> `Program.cs`</span></summary>

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        // Vytvoří a spustí hostitele aplikace.
        CreateHostBuilder(args).Build().Run();
    }

    /// <summary>
    /// Vytvoří hostitele pro aplikaci.
    /// </summary>
    /// <param name="args">Argumenty příkazového řádku.</param>
    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        // Vytvoří hostitele pro aplikaci.
        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                // Konfiguruje hostitele pro aplikaci.
                webBuilder.UseStartup<Startup>();
            });
    }
}
```
</details>


Soubor `appsettings.json` obsahuje konfiguraci aplikace.

<details>
<summary><span style="color:#E95A84;">`appsettings.json`</span></summary>

```json
{
  // Pevné konfigurace
  "Logging": { 
    "LogLevel": {
      "Default": "Information", // Výchozí úroveň logování
    },
    "Console": {
      "IncludeScopes": true // Zahrnuje rozsahy logování. (Zahrnuje informace o třídě, která loguje zprávu.)
    }
  },
  "AllowedHosts": "*",  // Povolené hostitelské adresy
  "ConnectionStrings": { 
    // Konfigurace připojení k databázi
    "DefaultConnection": "Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;", // Custom
    // Další připojení k databázi
    "AnotherConnection": "Server=anotherServerAddress;Database=anotherDataBase;User Id=anotherUsername;Password=anotherPassword;" // Custom
  },
  // Příklad vlastní konfigurace pro modely a služby
  "CustomSettings": { 
    "EmailSettings": { 
      "SmtpServer": "smtp.example.com",
      "SmtpPort": 587, 
      "SenderName": "Example App",
      "SenderEmail": "noreply@example.com",
      "Username": "smtpUser", 
      "Password": "smtpPassword" 
    },
    "ThirdPartyApiKeys": { 
      "GoogleMaps": "your-google-maps-api-key",
      "SendGrid": "your-sendgrid-api-key" 
    }
  }
}
```

Příklad použití konfigurace v třídě služby.

```csharp
public class MyService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MyService> _logger;
    private readonly string _defaultConnectionString;
    private readonly string _anotherConnectionString;
    private readonly EmailSettings _emailSettings;
    private readonly ThirdPartyApiKeys _apiKeys;

    public MyService(IConfiguration configuration, ILogger<MyService> logger)
    {
        _configuration = configuration;
        _logger = logger;

        // Načtení připojovacích řetězců
        _defaultConnectionString = _configuration.GetConnectionString("DefaultConnection");
        _anotherConnectionString = _configuration.GetConnectionString("AnotherConnection");

        // Načtení vlastních nastavení
        _emailSettings = _configuration.GetSection("CustomSettings:EmailSettings").Get<EmailSettings>();
        _apiKeys = _configuration.GetSection("CustomSettings:ThirdPartyApiKeys").Get<ThirdPartyApiKeys>();
    }

    public void LogInformation()
    {
        _logger.LogInformation("Default connection string: {ConnectionString}", _defaultConnectionString);
        _logger.LogInformation("Another connection string: {ConnectionString}", _anotherConnectionString);
    }

    public void SendEmail()
    {
        // Příklad použití EmailSettings
        var smtpClient = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
        {
            Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
            EnableSsl = true
        };
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
            Subject = "Test Email",
            Body = "This is a test email.",
            IsBodyHtml = true,
        };
        mailMessage.To.Add("recipient@example.com");
        smtpClient.Send(mailMessage);
    }

    public void UseApiKeys()
    {
        // Příklad použití ThirdPartyApiKeys
        var googleMapsApiKey = _apiKeys.GoogleMaps;
        var sendGridApiKey = _apiKeys.SendGrid;
        _logger.LogInformation("Google Maps API Key: {ApiKey}", googleMapsApiKey);
        _logger.LogInformation("SendGrid API Key: {ApiKey}", sendGridApiKey);
    }
}

public class EmailSettings
{
    public string SmtpServer { get; set; }
    public int SmtpPort { get; set; }
    public string SenderName { get; set; }
    public string SenderEmail { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}

public class ThirdPartyApiKeys
{
    public string GoogleMaps { get; set; }
    public string SendGrid { get; set; }
}
```
</details>

</details>