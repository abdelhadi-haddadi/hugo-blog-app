+++
title = "ASP.NET Produces"
date = 2025-08-27T23:21:30.683+01:00
draft = false
description = "ASP.NET Produces tutorial shows how to use
Produces in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Produces

last modified April 3, 2025

In this article, we explore the Produces attribute in ASP.NET 8. This attribute
is essential for controlling response content types in Web API controllers.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Produces attribute helps define the MIME types an action can
return.

## Basic Definition

The Produces attribute in ASP.NET specifies the response content types that a
particular action can produce. It helps with content negotiation in Web APIs.

When applied to an action or controller, Produces restricts the response format
to the specified media types. This ensures clients receive data in the expected
format.

Produces is part of ASP.NET's content negotiation system. It works with the
Accept header in HTTP requests to determine the best response format.

## ASP.NET Produces Example

The following example demonstrates a Web API controller using the Produces
attribute to control response formats.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/WeatherController.cs
  

using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    public IEnumerable&lt;WeatherForecast&gt; Get()
    {
        return Enumerable.Range(1, 5).Select(index =&gt; new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });
    }

    [HttpGet("{id}")]
    [Produces("application/json", "application/xml")]
    public ActionResult&lt;WeatherForecast&gt; GetById(int id)
    {
        if (id &lt; 1 || id &gt; 5) return NotFound();
        
        return new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(id)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        };
    }

    [HttpGet("text")]
    [Produces("text/plain")]
    public IActionResult GetTextForecast()
    {
        var forecast = new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        };
        
        return Content($"{forecast.Date}: {forecast.Summary}, {forecast.TemperatureC}°C");
    }
}

public record WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
    public int TemperatureF =&gt; 32 + (int)(TemperatureC / 0.5556);
}

This controller demonstrates three different uses of the Produces attribute. The
controller-level attribute specifies JSON as the default response format.

The first action inherits the controller-level Produces attribute. The second
action overrides it to support both JSON and XML responses. The third action
specifically produces plain text.

The ApiController attribute enables automatic HTTP 400 responses
for invalid models. Route sets the base path for all actions in
this controller.

The example shows how Produces can be used at different levels to control
response formats. It works with ASP.NET's content negotiation to return the
appropriate format based on client preferences.

## Source

[Microsoft ASP.NET Web API Formatting Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-8.0)

In this article, we have explored the Produces attribute in ASP.NET 8. This
powerful feature helps ensure your API returns data in the expected formats.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).