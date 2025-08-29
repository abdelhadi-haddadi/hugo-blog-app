+++
title = "ASP.NET IServiceCollection"
date = 2025-08-29T19:49:11.031+01:00
draft = false
description = "ASP.NET IServiceCollection tutorial shows how to use dependency injection in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IServiceCollection

last modified April 3, 2025

In this article, we explore IServiceCollection in ASP.NET 8. This interface is
the foundation of dependency injection in ASP.NET applications. Dependency
injection is a key design pattern in modern .NET development.

IServiceCollection provides methods to register application services with
different lifetimes. These services can then be injected into controllers,
middleware, and other components. This promotes loose coupling and testability.

## Basic Definition

IServiceCollection is an interface that represents a collection of service
descriptors. It is part of the Microsoft.Extensions.DependencyInjection
namespace. The interface provides methods to register services with the DI
container.

Services can be registered with three different lifetimes: transient, scoped,
and singleton. Transient services are created each time they're requested.
Scoped services are created once per client request.

Singleton services are created once and reused throughout the application's
lifetime. The IServiceCollection is typically configured in the Program.cs
file during application startup.

## ASP.NET IServiceCollection Example

The following example demonstrates how to use IServiceCollection to configure
services in an ASP.NET 8 application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddControllers();
builder.Services.AddScoped&lt;IProductRepository, ProductRepository&gt;();
builder.Services.AddTransient&lt;IEmailService, EmailService&gt;();
builder.Services.AddSingleton&lt;ILoggerService, FileLoggerService&gt;();

var app = builder.Build();

app.MapControllers();
app.Run();

This code configures three services with different lifetimes. The
AddScoped method registers a repository that will be created
once per HTTP request. AddTransient creates a new email service
instance each time it's requested.

AddSingleton registers a logger service that will be shared
throughout the application's lifetime. The AddControllers
method adds support for MVC controllers.

Models/Product.cs
  

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    public Product(int id, string name, decimal price)
    {
        Id = id;
        Name = name;
        Price = price;
    }
}

This is a simple Product model class that will be used in our repository.
It contains basic properties for product identification and pricing.

Repositories/IProductRepository.cs
  

public interface IProductRepository
{
    IEnumerable&lt;Product&gt; GetAllProducts();
    Product GetProductById(int id);
    void AddProduct(Product product);
}

The IProductRepository interface defines the contract for our product data
access. It includes methods for retrieving and adding products.

Repositories/ProductRepository.cs
  

public class ProductRepository : IProductRepository
{
    private readonly List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    public IEnumerable&lt;Product&gt; GetAllProducts() =&gt; _products;

    public Product GetProductById(int id) =&gt; 
        _products.FirstOrDefault(p =&gt; p.Id == id);

    public void AddProduct(Product product)
    {
        product.Id = _products.Max(p =&gt; p.Id) + 1;
        _products.Add(product);
    }
}

The ProductRepository implements the IProductRepository interface. It uses
an in-memory list for demonstration purposes. In a real application, this
would connect to a database.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly ILoggerService _logger;

    public ProductsController(
        IProductRepository productRepository,
        ILoggerService logger)
    {
        _productRepository = productRepository;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAllProducts()
    {
        _logger.Log("Fetching all products");
        return Ok(_productRepository.GetAllProducts());
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var product = _productRepository.GetProductById(id);
        if (product == null)
        {
            _logger.Log($"Product with id {id} not found");
            return NotFound();
        }
        return Ok(product);
    }
}

The ProductsController demonstrates dependency injection in action. The
IProductRepository and ILoggerService are injected via constructor injection.
The controller uses these services to handle HTTP requests.

The GetAllProducts method returns all products from the repository. The
GetProductById method retrieves a specific product by ID. Both methods
utilize the injected services.

## Source

[Microsoft Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored IServiceCollection in ASP.NET 8. This
powerful feature enables clean dependency management in modern applications.
Proper use of dependency injection leads to more maintainable and testable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).