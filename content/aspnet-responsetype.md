+++
title = "ASP.NET ResponseType"
date = 2025-08-27T23:21:33.990+01:00
draft = false
description = "ASP.NET ResponseType tutorial shows how to use ResponseType in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ResponseType

last modified April 3, 2025

In this article, we explore the ResponseType attribute in ASP.NET 8. This
attribute is crucial for documenting API responses in Swagger and OpenAPI.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The ResponseType attribute helps define expected response formats.

## Basic Definition

The ResponseType attribute in ASP.NET specifies the type of response that an
action method returns. It's particularly useful for API documentation tools.

When applied to an action method, ResponseType informs Swagger and clients about
the expected response model. This improves API discoverability and documentation.

ResponseType works with both successful and error responses. It can specify
simple types, complex objects, or collections. It's commonly used in Web APIs.

## ASP.NET ResponseType Example

The following example demonstrates a Web API controller using ResponseType.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();

This sets up an ASP.NET application with Swagger support. Swagger will use
ResponseType attributes to generate accurate API documentation.

Controllers/WeatherController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class WeatherController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    [HttpGet("forecast")]
    [ProducesResponseType(typeof(IEnumerable&lt;WeatherForecast&gt;), 
        StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetForecast([FromQuery] int days = 5)
    {
        if (days &lt;= 0 || days &gt; 30)
        {
            return BadRequest("Days must be between 1 and 30.");
        }

        var forecast = Enumerable.Range(1, days).Select(index =&gt;
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]
            ))
            .ToArray();

        return Ok(forecast);
    }

    [HttpGet("current/{city}")]
    [ProducesResponseType(typeof(WeatherForecast), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetCurrentWeather(string city)
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest("City name is required.");
        }

        if (city.Equals("unknown", StringComparison.OrdinalIgnoreCase))
        {
            return NotFound();
        }

        var weather = new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now),
            Random.Shared.Next(-20, 55),
            Summaries[Random.Shared.Next(Summaries.Length)]
        );

        return Ok(weather);
    }
}

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates ResponseType usage with two action methods. The
first method returns a weather forecast for multiple days with various response
types documented.

The ProducesResponseType attributes specify the possible response
types and status codes. Swagger will use this information to generate accurate
API documentation.

The first method shows responses for success (200), not found (404), and server
error (500). The second method demonstrates single object return with bad request
(400) handling.

The example shows how ResponseType improves API documentation and client
understanding. It helps tools like Swagger generate better documentation and
client code.

## Source

[Microsoft ASP.NET Web API Return Types Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-8.0)

In this article, we have explored the ResponseType attribute in ASP.NET 8. This
powerful feature enhances API documentation and client development experience.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).