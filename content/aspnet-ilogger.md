+++
title = "ASP.NET ILogger"
date = 2025-08-29T19:49:09.921+01:00
draft = false
description = "ASP.NET ILogger tutorial shows how to use ILogger in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ILogger

last modified April 3, 2025

In this article, we explore the ILogger interface in ASP.NET 8. This interface
provides a powerful logging abstraction for .NET applications. It helps track
application behavior and diagnose issues.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ILogger is part of Microsoft.Extensions.Logging namespace. It
supports structured logging and multiple logging providers.

## Basic Definition

ILogger is a generic interface that provides methods for logging messages at
different severity levels. It's part of .NET's built-in logging infrastructure.

The interface supports six log levels: Trace, Debug, Information, Warning,
Error, and Critical. Each level represents increasing severity of logged events.

ILogger works with various logging providers like Console, Debug, EventLog, and
third-party solutions. It supports dependency injection out of the box in ASP.NET.

## ASP.NET ILogger Example

The following example demonstrates using ILogger in an ASP.NET 8 Web API
controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with console and debug logging. The
ClearProviders removes default providers before adding our choices.

Controllers/WeatherController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly ILogger&lt;WeatherController&gt; _logger;
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public WeatherController(ILogger&lt;WeatherController&gt; logger)
    {
        _logger = logger;
        _logger.LogInformation("WeatherController initialized");
    }

    [HttpGet]
    public IEnumerable&lt;WeatherForecast&gt; Get()
    {
        _logger.LogDebug("Entering Get method");
        
        try
        {
            var rng = new Random();
            var forecasts = Enumerable.Range(1, 5).Select(index =&gt; new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();

            _logger.LogInformation("Generated {Count} weather forecasts", forecasts.Length);
            return forecasts;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating weather forecasts");
            throw;
        }
        finally
        {
            _logger.LogDebug("Exiting Get method");
        }
    }
}

public record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates various ILogger usage patterns. The logger is
injected via constructor injection with the specific type
ILogger&lt;WeatherController&gt;.

The example shows logging at different levels: Information for initialization,
Debug for method entry/exit, and Error for exceptions. The LogInformation call
demonstrates structured logging with the count parameter.

The LogError method captures both the error message and the
exception object. This provides full stack trace information in the logs.
Structured logging helps with log analysis and filtering.

When running this application, log messages will appear in both the console
output and debug output windows. The log level can be configured in appsettings.json.

## Source

[Microsoft Logging Documentation](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging?tabs=command-line)

In this article, we have explored the ILogger interface in ASP.NET 8. This
powerful logging abstraction helps monitor application behavior and diagnose
issues effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).