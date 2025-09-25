# 🌐 .NET – Vytvoření REST API v ASP.NET Core

> 🚀 Praktické rady pro založení, strukturu, konfiguraci a rozšíření vlastního API v C# s ASP.NET Core.

---

## 🏗️ Vytvoření projektu

<details>
<summary><span style="color:#1E90FF;">🛠️ Krok za krokem</span></summary>

1. Otevři **Visual Studio**.
2. Zvol **Create a new project**.
3. Vyber šablonu **ASP.NET Core Web API**.
4. Pojmenuj projekt a klikni na **Create**.
5. Vyber **.NET 6 (LTS)** nebo nejnovější verzi.

![](../../images/net_api_create.png)

</details>

---

## 📁 Struktura projektu

<details>
<summary><span style="color:#1E90FF;">🗂️ Přehled složek a souborů</span></summary>

| Složka/Soubor    | Popis                        |
|------------------|------------------------------|
| Controllers      | Obsahuje kontrolery API.     |
| Program.cs       | Hlavní vstupní bod aplikace. |
| appsettings.json | Konfigurační soubor.         |

![](../../images/net_api_structure.png)

</details>

---

## 🧑‍💻 Přidání kontroleru

<details>
<summary><span style="color:#1E90FF;">🔌 Ukázka kontroleru</span></summary>

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MyController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok(new { message = "Vítejte v mém API!" });

        [HttpPost]
        public IActionResult Post([FromBody] MyModel model)
        {
            if (model == null) return BadRequest("Model je null");
            return CreatedAtAction(nameof(Get), new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] MyModel model)
        {
            if (id != model.Id) return BadRequest("ID neodpovídá");
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Smazání logiky zde
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] string query)
        {
            // Vyhledávací logika zde
            return Ok(new { query });
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var model = new MyModel { Id = id, Name = "Example" };
            if (model == null) return NotFound();
            return Ok(model);
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

---

## ⚙️ Konfigurace závislostí

<details>
<summary><span style="color:#1E90FF;">🔧 Nastavení v `Startup.cs`</span></summary>

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MyAPI
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration) => _configuration = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();
            services.AddAuthentication();
            services.AddAuthorization();
            services.AddSwaggerGen();
            services.AddSingleton<MyService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger, MyService myService)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = string.Empty;
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            app.Use(async (context, next) =>
            {
                myService.LogInformation();
                myService.UseApiKeys();
                logger.LogInformation("Handling request: " + context.Request.Path);
                await next.Invoke();
                logger.LogInformation("Finished handling request.");
            });

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
```
</details>

---

## 🚀 Vstupní bod aplikace

<details>
<summary><span style="color:#E95A84;">📝 `Program.cs`</span></summary>

```csharp
public class Program
{
    public static void Main(string[] args) => CreateHostBuilder(args).Build().Run();

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
}
```
</details>

---

## ⚙️ Konfigurace v `appsettings.json`

<details>
<summary><span style="color:#E95A84;">🗂️ Ukázka konfigurace</span></summary>

```json
{
  "Logging": {
    "LogLevel": { "Default": "Information" },
    "Console": { "IncludeScopes": true }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;",
    "AnotherConnection": "Server=anotherServerAddress;Database=anotherDataBase;User Id=anotherUsername;Password=anotherPassword;"
  },
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
</details>

---

## 🧩 Příklad služby s konfigurací

<details>
<summary><span style="color:#1E90FF;">🔑 Třída služby</span></summary>

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
        _defaultConnectionString = _configuration.GetConnectionString("DefaultConnection");
        _anotherConnectionString = _configuration.GetConnectionString("AnotherConnection");
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