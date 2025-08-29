+++
title = "ASP.NET IConfiguration"
date = 2025-08-29T19:49:08.780+01:00
draft = false
description = "ASP.NET IConfiguration tutorial shows how to use IConfiguration in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IConfiguration

last modified April 3, 2025

In this article, we explore the IConfiguration interface in ASP.NET 8. This
interface provides access to configuration values from various sources in a
unified way.

ASP.NET Core's configuration system is highly flexible and extensible. It can
read configuration data from JSON files, environment variables, command-line
arguments, and more.

## Basic Definition

IConfiguration is the main interface for working with configuration in ASP.NET.
It provides methods to read configuration values as strings, numbers, or complex
objects.

The configuration system in ASP.NET Core follows a hierarchical structure. Values
can be accessed using colon-separated keys that represent the hierarchy path.

IConfiguration is automatically registered in the dependency injection container.
It can be injected into controllers, services, or other components that need
configuration values.

## ASP.NET IConfiguration Example

The following example demonstrates how to use IConfiguration in an ASP.NET 8
application.

appsettings.json
  

{
  "AppSettings": {
    "Title": "Product Catalog",
    "MaxItems": 50,
    "Enabled": true,
    "ConnectionStrings": {
      "Default": "Server=localhost;Database=Products;Trusted_Connection=True;"
    }
  }
}

This JSON configuration file defines application settings with various value
types. The hierarchical structure is represented through nested objects.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

The default WebApplication builder automatically loads configuration from
appsettings.json, environment variables, and command-line arguments.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly AppSettings _settings;

    public ProductsController(IConfiguration configuration, 
        IOptions&lt;AppSettings&gt; settings)
    {
        _configuration = configuration;
        _settings = settings.Value;
    }

    [HttpGet("config")]
    public IActionResult GetConfig()
    {
        // Direct access to configuration
        var title = _configuration["AppSettings:Title"];
        var maxItems = _configuration.GetValue&lt;int&gt;("AppSettings:MaxItems");
        
        // Strongly-typed access
        return Ok(new {
            ConfigTitle = title,
            ConfigMaxItems = maxItems,
            SettingsTitle = _settings.Title,
            SettingsEnabled = _settings.Enabled,
            ConnectionString = _settings.ConnectionStrings.Default
        });
    }
}

public class AppSettings
{
    public string Title { get; set; }
    public int MaxItems { get; set; }
    public bool Enabled { get; set; }
    public ConnectionStrings ConnectionStrings { get; set; }
}

public class ConnectionStrings
{
    public string Default { get; set; }
}

This controller demonstrates two ways to access configuration values. The first
method uses IConfiguration directly to read values. The second uses strongly-typed
configuration via IOptions.

Program.cs (additional configuration)
  

var builder = WebApplication.CreateBuilder(args);

// Configure strongly-typed settings
builder.Services.Configure&lt;AppSettings&gt;(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();

The Configure method binds the AppSettings section to the AppSettings class. This
enables dependency injection of strongly-typed configuration throughout the app.

The example shows both direct configuration access and the preferred strongly-typed
approach. The IOptions pattern provides compile-time safety and better testability.

## Source

[Microsoft ASP.NET Configuration Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0)

In this article, we have explored the IConfiguration interface in ASP.NET 8. This
powerful feature provides flexible access to configuration values from multiple
sources.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).