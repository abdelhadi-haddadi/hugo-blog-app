+++
title = "ASP.NET LogInformation"
date = 2025-08-27T23:21:26.229+01:00
draft = false
description = "ASP.NET LogInformation tutorial shows how to use LogInformation in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET LogInformation

last modified April 3, 2025

In this article, we explore the LogInformation method in ASP.NET 8. This method
is essential for logging informational messages in ASP.NET applications.

ASP.NET provides a robust logging infrastructure through the ILogger interface.
LogInformation is used to log messages that highlight application flow.

## Basic Definition

LogInformation is a method of the ILogger interface in ASP.NET. It writes
informational log messages that describe normal application operation.

These messages are typically used to track application flow, record important
events, and provide context for debugging. They are less severe than warnings
or errors.

LogInformation messages are often written to various outputs like console,
files, or monitoring systems. The level can be configured in appsettings.json.

## ASP.NET LogInformation Example

The following example demonstrates using LogInformation in an ASP.NET controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.MapGet("/", () =&gt; "Hello World!");
app.Run();

This configures console logging for the application. The ClearProviders method
removes default loggers, and AddConsole adds console logging.

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
    }

    [HttpGet]
    public IEnumerable&lt;WeatherForecast&gt; Get()
    {
        _logger.LogInformation("Weather forecast requested at {Time}", 
            DateTime.UtcNow);

        var forecast = Enumerable.Range(1, 5).Select(index =&gt; 
            new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();

        _logger.LogInformation(
            "Generated {Count} weather forecasts", forecast.Length);

        return forecast;
    }
}

public record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates LogInformation usage. The first log records when
the forecast was requested, including the timestamp.

The second log records how many forecasts were generated. Both logs use
structured logging with named parameters in the message template.

The ILogger is injected through constructor injection. The generic type
parameter helps categorize logs by their source class.

Structured logging allows for better log analysis. The placeholders like {Time}
and {Count} become named properties in log storage systems.

## Source

[Microsoft ASP.NET Logging Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0)

In this article, we have explored LogInformation in ASP.NET 8. This powerful
logging method helps track application behavior and diagnose issues.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).