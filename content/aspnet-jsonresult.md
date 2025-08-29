+++
title = "ASP.NET JsonResult"
date = 2025-08-29T19:49:11.034+01:00
draft = false
description = "ASP.NET JsonResult tutorial shows how to use JsonResult in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET JsonResult

last modified April 3, 2025

In this article, we explore the JsonResult class in ASP.NET 8. JsonResult is
used to return JSON-formatted data from controller actions in web applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. JsonResult simplifies returning JSON responses from API endpoints.

## Basic Definition

JsonResult is an ActionResult type in ASP.NET that serializes objects to JSON
format. It inherits from ActionResult and is used primarily in Web API projects.

When a controller action returns JsonResult, ASP.NET automatically serializes
the provided data to JSON format. The response includes proper content-type
headers for JSON data.

JsonResult supports various serialization options through JsonSerializerSettings.
This includes handling of null values, date formatting, and reference handling.

## ASP.NET JsonResult Example

The following example demonstrates a Web API controller using JsonResult.

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
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    [HttpGet("forecast")]
    public JsonResult GetWeatherForecast()
    {
        var forecast = Enumerable.Range(1, 5).Select(index =&gt; new
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });

        return new JsonResult(forecast);
    }

    [HttpGet("forecast/custom")]
    public JsonResult GetCustomWeatherForecast()
    {
        var forecast = Enumerable.Range(1, 5).Select(index =&gt; new
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        });

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };

        return new JsonResult(forecast, options);
    }
}

This controller demonstrates two different ways to use JsonResult. The first
method returns a simple JSON response with default serialization settings.

The second method shows how to customize JSON serialization using
JsonSerializerOptions. Here we set camelCase naming and pretty printing.

The ApiController attribute enables automatic HTTP 400 responses
for invalid models. Route sets the base path for all actions.

The example generates random weather forecast data. JsonResult automatically
serializes the anonymous objects to JSON format with proper content headers.

## Source

[Microsoft ASP.NET Web API Formatting Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-8.0)

In this article, we have explored the JsonResult class in ASP.NET 8. This
powerful feature simplifies returning JSON responses from API endpoints.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).