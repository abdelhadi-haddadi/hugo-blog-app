+++
title = "ASP.NET ConfigureServices"
date = 2025-08-29T19:48:57.499+01:00
draft = false
description = "ASP.NET ConfigureServices tutorial shows how to use ConfigureServices in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ConfigureServices

last modified April 3, 2025

In this article, we explore the ConfigureServices method in ASP.NET 8. This
method is essential for configuring application services and dependencies.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ConfigureServices is where you register services for dependency
injection.

## Basic Definition

The ConfigureServices method in ASP.NET is part of the application startup
process. It's called by the runtime to add services to the DI container.

Services registered in ConfigureServices become available throughout your
application. This includes framework services and your own custom services.

ConfigureServices receives an IServiceCollection parameter which provides
methods for service registration. The method is called before Configure.

## ASP.NET ConfigureServices Example

The following example demonstrates a basic Web API with service configuration.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// ConfigureServices equivalent in .NET 6+ minimal APIs
builder.Services.AddControllers();
builder.Services.AddScoped&lt;IProductRepository, ProductRepository&gt;();
builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();

This shows the modern .NET 8 approach to service configuration. The
builder.Services property replaces the traditional ConfigureServices.

We register controllers, a repository interface, Entity Framework DbContext,
and Swagger documentation. Each service has a specific lifetime (Scoped here).

Models/Product.cs
  

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

Repositories/IProductRepository.cs
  

```
public interface IProductRepository
{
    IEnumerable&lt;Product&gt; GetAll();
    Product GetById(int id);
    void Add(Product product);
}

```

Repositories/ProductRepository.cs
  

```
public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable&lt;Product&gt; GetAll() =&gt; _context.Products.ToList();
    public Product GetById(int id) =&gt; _context.Products.Find(id);
    public void Add(Product product) =&gt; _context.Products.Add(product);
}

```

The repository pattern abstracts data access. The interface and implementation
are registered in ConfigureServices. Entity Framework handles database operations.

Controllers/ProductsController.cs
  

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;

    public ProductsController(IProductRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult&lt;IEnumerable&lt;Product&gt;&gt; Get()
    {
        return Ok(_repository.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult&lt;Product&gt; Get(int id)
    {
        var product = _repository.GetById(id);
        if (product == null) return NotFound();
        return Ok(product);
    }
}

The controller demonstrates dependency injection in action. The repository is
injected via constructor injection, enabled by ConfigureServices registration.

This example shows a complete flow: service registration, interface
implementation, and consumption via DI. The pattern promotes loose coupling.

## Source

[Microsoft ASP.NET Dependency Injection Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0)

In this article, we have explored ConfigureServices in ASP.NET 8. This
fundamental concept enables clean architecture through dependency injection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).