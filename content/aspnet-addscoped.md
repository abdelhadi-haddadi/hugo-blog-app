+++
title = "ASP.NET AddScoped"
date = 2025-08-27T23:21:05.216+01:00
draft = false
description = "ASP.NET AddScoped tutorial shows how to use AddScoped in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddScoped

last modified April 3, 2025

In this article, we explore the AddScoped method in ASP.NET 8. This method is
essential for dependency injection and managing service lifetimes.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The AddScoped method helps manage object lifetimes effectively.

## Basic Definition

AddScoped is a method in ASP.NET Core's dependency injection system. It registers
a service with a scoped lifetime. Scoped services are created once per client
request.

When using AddScoped, the same instance is shared within a single HTTP request.
This is ideal for services that maintain state during a request but don't need
to persist between requests.

Scoped services are disposed at the end of the request. They are commonly used
for database contexts, repositories, and other request-specific operations.

## ASP.NET AddScoped Example

The following example demonstrates using AddScoped with a repository pattern.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register services with different lifetimes
builder.Services.AddScoped&lt;IProductRepository, ProductRepository&gt;();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up dependency injection with a scoped repository service. The
AddScoped method registers the interface-implementation pair.

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

This simple Product model represents our data structure. It will be used by our
repository and controller.

Repositories/IProductRepository.cs
  

public interface IProductRepository
{
    IEnumerable&lt;Product&gt; GetAll();
    Product GetById(int id);
    void Add(Product product);
}

The interface defines the contract for our product repository. It includes basic
CRUD operations for demonstration purposes.

Repositories/ProductRepository.cs
  

public class ProductRepository : IProductRepository
{
    private readonly List&lt;Product&gt; _products;
    private readonly ILogger&lt;ProductRepository&gt; _logger;

    public ProductRepository(ILogger&lt;ProductRepository&gt; logger)
    {
        _logger = logger;
        _products = new List&lt;Product&gt;
        {
            new(1, "Laptop", 999.99m),
            new(2, "Mouse", 19.99m),
            new(3, "Keyboard", 49.99m)
        };
        
        _logger.LogInformation("ProductRepository instance created");
    }

    public IEnumerable&lt;Product&gt; GetAll() =&gt; _products;

    public Product GetById(int id) =&gt; 
        _products.FirstOrDefault(p =&gt; p.Id == id);

    public void Add(Product product)
    {
        product.Id = _products.Max(p =&gt; p.Id) + 1;
        _products.Add(product);
    }
}

The repository implementation manages our product data. Notice it includes
constructor injection for logging, demonstrating DI within DI.

Controllers/ProductsController.cs
  

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

    [HttpPost]
    public IActionResult Add([FromBody] Product product)
    {
        _repository.Add(product);
        _logger.LogInformation("Added product {Id}", product.Id);
        return CreatedAtAction(nameof(GetById), 
            new { id = product.Id }, product);
    }
}

The controller uses constructor injection to get the scoped repository. Each
request gets its own repository instance, ensuring proper isolation.

The logging demonstrates that a new repository is created per request. Try making
multiple requests to see the log messages in action.

This example shows how AddScoped provides request-level service instances. The
repository maintains its state throughout a request but doesn't leak between
requests.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored the AddScoped method in ASP.NET 8. This
powerful feature helps manage service lifetimes effectively in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).