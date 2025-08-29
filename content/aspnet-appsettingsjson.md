+++
title = "ASP.NET appsettings.json"
date = 2025-08-27T23:21:06.317+01:00
draft = false
description = "ASP.NET appsettings.json tutorial shows how to use configuration in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET appsettings.json

last modified April 3, 2025

In this article, we explore the appsettings.json file in ASP.NET 8. This file is
the primary way to store configuration settings in modern ASP.NET applications.

ASP.NET provides a flexible configuration system that works with various sources.
The appsettings.json file is the default JSON-based configuration file in .NET.

## Basic Definition

The appsettings.json file is a JSON configuration file used in ASP.NET Core and
.NET applications. It stores application settings in a structured format.

Configuration values in appsettings.json can be accessed throughout the
application. The file supports hierarchical data organization through JSON
objects and arrays.

ASP.NET automatically loads appsettings.json during application startup.
Environment-specific versions like appsettings.Development.json can override
settings based on the current environment.

## ASP.NET appsettings.json Example

The following example demonstrates how to use appsettings.json in an ASP.NET 8
application with a Web API controller.

appsettings.json
  

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "AppSettings": {
    "ApiKey": "abc123xyz456",
    "MaxItems": 100,
    "FeatureFlags": {
      "EnableNewSearch": true,
      "EnableExperimentalApi": false
    },
    "AllowedOrigins": [
      "https://example.com",
      "https://test.example.com"
    ]
  }
}

This appsettings.json file contains standard logging configuration and custom
application settings. The AppSettings section demonstrates various
configuration value types.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Bind configuration to a strongly-typed class
builder.Services.Configure&lt;AppSettings&gt;(
    builder.Configuration.GetSection("AppSettings"));

var app = builder.Build();

app.MapControllers();
app.Run();

This Program.cs sets up the application and binds the AppSettings section to a
strongly-typed configuration class. The Configure method enables
dependency injection of settings.

Models/AppSettings.cs
  

public class AppSettings
{
    public string ApiKey { get; set; }
    public int MaxItems { get; set; }
    public FeatureFlags FeatureFlags { get; set; }
    public string[] AllowedOrigins { get; set; }
}

public class FeatureFlags
{
    public bool EnableNewSearch { get; set; }
    public bool EnableExperimentalApi { get; set; }
}

This strongly-typed configuration class mirrors the structure of the AppSettings
section in appsettings.json. Nested objects are represented as separate classes.

Controllers/SettingsController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly AppSettings _settings;

    public SettingsController(IOptions&lt;AppSettings&gt; settings)
    {
        _settings = settings.Value;
    }

    [HttpGet]
    public IActionResult GetSettings()
    {
        return Ok(new
        {
            _settings.ApiKey,
            _settings.MaxItems,
            _settings.FeatureFlags,
            _settings.AllowedOrigins
        });
    }

    [HttpGet("feature-flags")]
    public IActionResult GetFeatureFlags()
    {
        return Ok(_settings.FeatureFlags);
    }
}

This controller demonstrates two ways to access configuration settings. The
constructor injects the strongly-typed AppSettings via IOptions&lt;T&gt;.

The first action returns all settings, while the second focuses on feature flags.
The IOptions&lt;T&gt; pattern provides type-safe access to configuration values.

The example shows how to organize complex configuration in appsettings.json and
access it throughout the application. Strongly-typed configuration improves code
safety and maintainability.

## Source

[Microsoft ASP.NET Configuration Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0)

In this article, we have explored the appsettings.json file in ASP.NET 8. This
powerful configuration system supports both simple and complex application
settings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).