+++
title = "ASP.NET AddJsonOptions"
date = 2025-08-29T19:48:51.818+01:00
draft = false
description = "ASP.NET AddJsonOptions tutorial shows how to use AddJsonOptions in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddJsonOptions

last modified April 3, 2025

In this article, we explore the AddJsonOptions method in ASP.NET 8. This method
is essential for configuring JSON serialization settings in ASP.NET applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. AddJsonOptions provides control over how JSON data is formatted.

## Basic Definition

AddJsonOptions is an extension method in ASP.NET Core that configures JSON
serialization options. It's part of the Microsoft.AspNetCore.Mvc namespace.

This method allows developers to customize how objects are serialized to JSON.
Options include property naming, formatting, and handling of null values.

Common use cases include setting camelCase property names, ignoring null values,
and configuring date/time formats. It's typically called in Program.cs.

## ASP.NET AddJsonOptions Example

The following example demonstrates configuring JSON serialization options.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =&gt;
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var app = builder.Build();

app.MapControllers();
app.Run();

This configuration applies several JSON serialization settings. The
PropertyNamingPolicy converts property names to camelCase.

WriteIndented makes the JSON output more readable with indentation.
DefaultIgnoreCondition skips null values during serialization.

The JsonStringEnumConverter converts enum values to their string
representations rather than numeric values. This improves API clarity.

Controllers/WeatherController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWeather()
    {
        var weather = new WeatherForecast
        {
            Date = DateTime.Now,
            TemperatureC = 25,
            Summary = "Warm",
            AdditionalInfo = null,
            WeatherType = WeatherType.Sunny
        };
        
        return Ok(weather);
    }
}

public class WeatherForecast
{
    public DateTime Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
    public string? AdditionalInfo { get; set; }
    public WeatherType WeatherType { get; set; }
}

public enum WeatherType
{
    Sunny,
    Cloudy,
    Rainy
}

This controller returns a weather forecast object. The JSON response will reflect
our serialization settings from Program.cs.

The output will have camelCase property names, indented formatting, and the
AdditionalInfo null value will be omitted. The enum will be
serialized as a string.

The example shows how AddJsonOptions provides centralized control over JSON
serialization behavior. This ensures consistent responses across all endpoints.

## Source

[Microsoft ASP.NET JSON Formatting Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-8.0)

In this article, we have explored the AddJsonOptions method in ASP.NET 8. This
powerful feature provides fine-grained control over JSON serialization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).