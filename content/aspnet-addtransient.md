+++
title = "ASP.NET AddTransient"
date = 2025-08-27T23:21:05.223+01:00
draft = false
description = "ASP.NET Dependency Injection tutorial shows how to use AddTransient in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddTransient

last modified April 3, 2025

In this article, we explore the AddTransient method in ASP.NET 8 Dependency
Injection. This method is essential for managing service lifetimes in modern
web applications.

ASP.NET Core includes a built-in Dependency Injection (DI) container that
simplifies managing class dependencies. AddTransient is one of three lifetime
options available.

## Basic Definition

AddTransient is a method used to register services with the DI container in
ASP.NET Core. It creates a new instance of the service for each request.

Transient services are ideal for lightweight, stateless services where each
component needs its own fresh instance. They are created every time they are
requested from the service container.

Unlike Singleton or Scoped services, Transient services are never shared. Each
dependency injection results in a new instance, making them thread-safe by design.

## ASP.NET AddTransient Example

The following example demonstrates using AddTransient with a simple logging
service in an ASP.NET Core Web API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddTransient&lt;ITimeLogger, TimeLogger&gt;();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up the DI container with our TimeLogger service registered as transient.
The service will be available to all controllers through dependency injection.

Services/ITimeLogger.cs
  

public interface ITimeLogger
{
    string LogTime(string message);
}

Services/TimeLogger.cs
  

```
public class TimeLogger : ITimeLogger
{
    private readonly Guid _instanceId = Guid.NewGuid();
    
    public string LogTime(string message)
    {
        return $"[{DateTime.Now:HH:mm:ss}] {message} (Instance: {_instanceId})";
    }
}

```

The TimeLogger service implements ITimeLogger and includes a unique Guid to
demonstrate that new instances are created for each request.

Controllers/TimeController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class TimeController : ControllerBase
{
    private readonly ITimeLogger _logger1;
    private readonly ITimeLogger _logger2;

    public TimeController(ITimeLogger logger1, ITimeLogger logger2)
    {
        _logger1 = logger1;
        _logger2 = logger2;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var result1 = _logger1.LogTime("First call");
        var result2 = _logger2.LogTime("Second call");
        
        return Ok(new { result1, result2 });
    }
}

The TimeController demonstrates the transient behavior by injecting two instances
of ITimeLogger. Each will show a different Guid in the output, proving they are
separate instances.

When you call the endpoint, you'll see output like this, with different instance
IDs for each logger, even within the same request:

{
    "result1": "[14:25:36] First call (Instance: 5a3b8c7d-6e5f-4a3b-9c8d-7e6f5a4b3c2d)",
    "result2": "[14:25:36] Second call (Instance: 9e8f7a6b-5c4d-3e2f-1a0b-9c8d7e6f5a4b)"
}

This example clearly shows how AddTransient creates new instances for each
dependency injection, even when multiple instances are requested in the same
class. The Guid values will be different for every request to the endpoint.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored the AddTransient method in ASP.NET 8 DI. This
powerful feature helps manage service lifetimes effectively in your applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).