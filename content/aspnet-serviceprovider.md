+++
title = "ASP.NET ServiceProvider"
date = 2025-08-27T23:21:36.312+01:00
draft = false
description = "ASP.NET ServiceProvider tutorial shows how to use dependency injection in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ServiceProvider

last modified April 3, 2025

In this article, we explore the ServiceProvider in ASP.NET 8. This core
component manages dependency injection and service lifetime in applications.

ASP.NET's built-in dependency injection system uses ServiceProvider to resolve
and manage services. It's essential for writing modular, testable applications.

## Basic Definition

The ServiceProvider in ASP.NET is the container that manages registered services.
It implements the IServiceProvider interface and handles service resolution.

Services are registered with specific lifetimes: transient, scoped, or singleton.
The ServiceProvider creates and disposes services according to these lifetimes.

Transient services are created each time they're requested. Scoped services are
created once per client request. Singleton services are created once and reused.

## ASP.NET ServiceProvider Example

The following example demonstrates ServiceProvider usage with different service
lifetimes and service resolution.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register services with different lifetimes
builder.Services.AddTransient&lt;ITransientService, TransientService&gt;();
builder.Services.AddScoped&lt;IScopedService, ScopedService&gt;();
builder.Services.AddSingleton&lt;ISingletonService, SingletonService&gt;();

var app = builder.Build();

app.MapGet("/", (HttpContext context) =&gt;
{
    var serviceProvider = context.RequestServices;
    
    var transient1 = serviceProvider.GetRequiredService&lt;ITransientService&gt;();
    var transient2 = serviceProvider.GetRequiredService&lt;ITransientService&gt;();
    
    var scoped1 = serviceProvider.GetRequiredService&lt;IScopedService&gt;();
    var scoped2 = serviceProvider.GetRequiredService&lt;IScopedService&gt;();
    
    var singleton1 = serviceProvider.GetRequiredService&lt;ISingletonService&gt;();
    var singleton2 = serviceProvider.GetRequiredService&lt;ISingletonService&gt;();
    
    return Results.Ok(new
    {
        TransientSame = transient1.Id == transient2.Id,
        ScopedSame = scoped1.Id == scoped2.Id,
        SingletonSame = singleton1.Id == singleton2.Id,
        Transient1 = transient1.Id,
        Transient2 = transient2.Id,
        Scoped1 = scoped1.Id,
        Scoped2 = scoped2.Id,
        Singleton1 = singleton1.Id,
        Singleton2 = singleton2.Id
    });
});

app.Run();

This sets up an ASP.NET application with three services registered with different
lifetimes. The endpoint demonstrates how ServiceProvider resolves these services.

Services/ServiceDefinitions.cs
  

public interface ITransientService
{
    Guid Id { get; }
}

public interface IScopedService
{
    Guid Id { get; }
}

public interface ISingletonService
{
    Guid Id { get; }
}

public class TransientService : ITransientService
{
    public Guid Id { get; } = Guid.NewGuid();
}

public class ScopedService : IScopedService
{
    public Guid Id { get; } = Guid.NewGuid();
}

public class SingletonService : ISingletonService
{
    public Guid Id { get; } = Guid.NewGuid();
}

This defines the service interfaces and implementations. Each service has a Guid
Id property to demonstrate instance creation behavior with different lifetimes.

When you call the endpoint, you'll see that transient services get new instances
each resolution. Scoped services reuse the same instance per request. Singleton
services maintain one instance for the application lifetime.

The GetRequiredService method throws an exception if the service
isn't registered. For optional services, use GetService which
returns null for unregistered services.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored the ServiceProvider in ASP.NET 8. This
powerful component is fundamental to ASP.NET's dependency injection system.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).