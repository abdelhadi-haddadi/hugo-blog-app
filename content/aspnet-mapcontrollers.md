+++
title = "ASP.NET MapControllers"
date = 2025-08-29T19:49:12.155+01:00
draft = false
description = "ASP.NET MapControllers tutorial shows how to use MapControllers in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET MapControllers

last modified April 3, 2025

In this article, we explore the MapControllers method in ASP.NET 8. This method
is essential for enabling attribute routing in ASP.NET Core applications.

ASP.NET Core is a cross-platform framework for building modern web applications.
MapControllers simplifies routing configuration for controllers using attributes.

## Basic Definition

MapControllers is an extension method in ASP.NET Core that adds endpoints for
controller actions to the application's request pipeline. It enables attribute
routing for controllers.

When called in the application configuration, MapControllers scans all registered
controllers for routing attributes like [Route], [HttpGet], and [HttpPost]. It
then maps these attributes to endpoint routes.

MapControllers is typically used in minimal API applications or when you want to
use attribute routing exclusively. It works with both MVC and Web API controllers.

## ASP.NET MapControllers Example

The following example demonstrates a basic Web API setup using MapControllers.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();

// Map controller routes
app.MapControllers();

app.Run();

This code sets up a basic ASP.NET Core Web API application. The key line is
app.MapControllers() which enables attribute routing for all
controllers in the application.

Controllers/WeatherForecastController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

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

    [HttpGet("{days}")]
    public IEnumerable&lt;WeatherForecast&gt; GetByDays(int days)
    {
        return Enumerable.Range(1, days).Select(index =&gt; new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates two different HttpGet endpoints. The first method
responds to GET /api/weatherforecast and returns 5-day forecast.

The second method uses route parameter {days} to return a forecast
for a specific number of days. It responds to requests like
GET /api/weatherforecast/7.

The [ApiController] attribute enables several Web API conventions
like automatic model validation and problem details for error responses. The
[Route] attribute sets the base path for all actions in this
controller.

This example shows how MapControllers automatically discovers and maps these
endpoints based on their routing attributes. No additional route configuration
is needed in Program.cs.

## Source

[Microsoft ASP.NET Core Routing Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-8.0#attribute-routing)

In this article, we have explored the MapControllers method in ASP.NET 8. This
powerful feature simplifies endpoint configuration when using attribute routing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).