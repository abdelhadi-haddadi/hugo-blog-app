+++
title = "ASP.NET Dependency Injection"
date = 2025-08-29T19:49:00.813+01:00
draft = false
description = "ASP.NET Dependency Injection tutorial shows how to use DI in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Dependency Injection

last modified April 3, 2025

In this article, we explore Dependency Injection (DI) in ASP.NET 8. DI is a
design pattern that implements Inversion of Control for resolving dependencies.

ASP.NET Core and .NET 8 have built-in support for dependency injection. This
makes applications more modular, testable, and maintainable by default.

## Basic Definition

Dependency Injection is a technique where objects receive their dependencies
from an external source rather than creating them directly. This promotes loose
coupling between components.

In ASP.NET, the DI container manages the lifetime of services and injects them
into classes that require them. Services are registered at application startup.

The built-in DI container supports three main lifetime options: Transient,
Scoped, and Singleton. Each has different behavior regarding instance creation.

Constructor injection is the preferred method in ASP.NET, where dependencies
are provided through class constructors. This makes dependencies explicit.

## ASP.NET Dependency Injection Example

The following example demonstrates a complete ASP.NET application using DI.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register services with different lifetimes
builder.Services.AddTransient&lt;ITransientService, TransientService&gt;();
builder.Services.AddScoped&lt;IScopedService, ScopedService&gt;();
builder.Services.AddSingleton&lt;ISingletonService, SingletonService&gt;();

// Register a custom repository
builder.Services.AddScoped&lt;IProductRepository, ProductRepository&gt;();

var app = builder.Build();

app.MapGet("/", (ITransientService transient1, ITransientService transient2,
    IScopedService scoped1, IScopedService scoped2,
    ISingletonService singleton1, ISingletonService singleton2) =&gt;
{
    return Results.Ok(new
    {
        Transient1 = transient1.GetId(),
        Transient2 = transient2.GetId(),
        Scoped1 = scoped1.GetId(),
        Scoped2 = scoped2.GetId(),
        Singleton1 = singleton1.GetId(),
        Singleton2 = singleton2.GetId()
    });
});

app.MapControllers();
app.Run();

This sets up an ASP.NET application with various service registrations. The
endpoint demonstrates different service lifetimes by showing instance IDs.

Services/ProductRepository.cs
  

public interface IProductRepository
{
    IEnumerable&lt;Product&gt; GetAll();
    Product? GetById(int id);
}

public class ProductRepository : IProductRepository
{
    private readonly List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    public IEnumerable&lt;Product&gt; GetAll() =&gt; _products;

    public Product? GetById(int id) =&gt; 
        _products.FirstOrDefault(p =&gt; p.Id == id);
}

This repository provides data access for products. The interface defines the
contract, while the concrete class implements the actual data operations.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly ILogger&lt;ProductsController&gt; _logger;

    public ProductsController(
        IProductRepository repository,
        ILogger&lt;ProductsController&gt; logger)
    {
        _repository = repository;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        _logger.LogInformation("Getting all products");
        return Ok(_repository.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _repository.GetById(id);
        if (product == null)
        {
            _logger.LogWarning("Product {Id} not found", id);
            return NotFound();
        }
        return Ok(product);
    }
}

public record Product(int Id, string Name, decimal Price);

The controller demonstrates constructor injection, receiving both a custom
repository and the built-in ILogger service. The repository is used to fetch
product data.

The example shows how ASP.NET automatically resolves and injects dependencies
when creating controller instances. The logger is injected without explicit
registration because it's part of the framework.

This implementation follows the Dependency Inversion Principle by depending
on abstractions (interfaces) rather than concrete implementations. This makes
the code more testable and maintainable.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored Dependency Injection in ASP.NET 8. This
powerful feature helps create loosely coupled, maintainable applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).