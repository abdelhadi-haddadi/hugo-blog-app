+++
title = "ASP.NET AddControllers"
date = 2025-08-27T23:21:03.900+01:00
draft = false
description = "ASP.NET AddControllers tutorial shows how to use
AddControllers in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddControllers

last modified April 3, 2025

In this article, we explore the AddControllers method in ASP.NET 8. This method
is fundamental for setting up Web API controllers in ASP.NET Core applications.

ASP.NET Core is a cross-platform framework for building modern web applications.
AddControllers configures essential services needed for API controller support.

## Basic Definition

The AddControllers method is part of the ASP.NET Core dependency injection system.
It registers services required by MVC controllers with attribute routing.

This method is called in the Program.cs file during application startup. It
enables features like model binding, validation, and API-specific conventions.

AddControllers is typically used for Web API projects rather than Razor Pages or
MVC applications. It provides a lightweight setup focused on API development.

## ASP.NET AddControllers Example

The following example demonstrates a basic Web API setup using AddControllers.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();

This code sets up a minimal Web API application. The AddControllers
method registers services needed for API controllers. MapControllers
enables attribute routing.

Controllers/WeatherForecastController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace WebApiExample.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger&lt;WeatherForecastController&gt; _logger;

    public WeatherForecastController(ILogger&lt;WeatherForecastController&gt; logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable&lt;WeatherForecast&gt; Get()
    {
        return Enumerable.Range(1, 5).Select(index =&gt; new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}

public record WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates a typical Web API endpoint. The [ApiController]
attribute enables API-specific behaviors. The [Route] attribute
defines the base route for all actions in this controller.

The [HttpGet] attribute marks the action to respond to HTTP GET
requests. The action returns a collection of weather forecast data in JSON
format automatically.

The example shows how AddControllers enables clean API development with minimal
configuration. Controllers can focus on business logic while framework handles
infrastructure concerns.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the AddControllers method in ASP.NET 8. This
essential configuration enables building robust Web APIs with minimal setup.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).