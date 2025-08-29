+++
title = "ASP.NET AddSingleton"
date = 2025-08-27T23:21:05.230+01:00
draft = false
description = "ASP.NET AddSingleton tutorial shows how to use
AddSingleton in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddSingleton

last modified April 3, 2025

In this article, we explore the AddSingleton method in ASP.NET 8. This method
is essential for dependency injection and service lifetime management.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The AddSingleton method helps manage service instances.

## Basic Definition

AddSingleton is a method in ASP.NET Core's dependency injection system. It
registers a service with a singleton lifetime in the service container.

Singleton services are created once and shared throughout the application's
lifetime. All requests to the service get the same instance.

This is ideal for services that maintain state or are expensive to create.
AddSingleton is commonly used for caching, configuration, and logging services.

## ASP.NET AddSingleton Example

The following example demonstrates using AddSingleton with a counter service.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register the CounterService as a singleton
builder.Services.AddSingleton&lt;CounterService&gt;();

var app = builder.Build();

app.MapGet("/", (CounterService counter) =&gt;
{
    counter.Increment();
    return $"Counter: {counter.GetCount()}";
});

app.Run();

This sets up a basic ASP.NET application with a singleton CounterService. The
service is injected into the minimal API endpoint.

Services/CounterService.cs
  

public class CounterService
{
    private int _count = 0;

    public void Increment()
    {
        _count++;
    }

    public int GetCount()
    {
        return _count;
    }
}

The CounterService maintains a simple counter. Each request to the root endpoint
("/") increments and returns the current count.

Since it's registered as a singleton, the same instance is used across all
requests. The counter value persists between requests.

To test this, run the application and refresh the page multiple times. You'll
see the counter increment with each refresh, demonstrating the singleton behavior.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored the AddSingleton method in ASP.NET 8. This
powerful feature helps manage service instances efficiently in your applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).