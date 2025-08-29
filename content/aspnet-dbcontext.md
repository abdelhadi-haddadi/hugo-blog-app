+++
title = "ASP.NET DbContext"
date = 2025-08-27T23:21:14.571+01:00
draft = false
description = "ASP.NET DbContext tutorial shows how to use DbContext in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET DbContext

last modified April 3, 2025

In this article, we explore DbContext in ASP.NET 8. DbContext is the primary
class for interacting with databases in Entity Framework Core applications.

Entity Framework Core is an object-relational mapper (ORM) that simplifies data
access in .NET applications. DbContext represents a session with the database.

## Basic Definition

DbContext is a bridge between your domain classes and the database. It manages
database connections, tracks changes to objects, and performs CRUD operations.

The DbContext class is part of Entity Framework Core. It provides LINQ-based
querying, change tracking, and transaction management capabilities.

DbContext works with entity classes and DbSet properties. Each DbSet represents
a table in the database. The context coordinates between these objects and the
database.

## ASP.NET DbContext Example

The following example demonstrates a complete ASP.NET application using DbContext.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();

This configures the application with DbContext using SQL Server. The connection
string is read from configuration (appsettings.json).

Models/Product.cs
  

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

This defines a simple Product entity class. Entity Framework will map this to a
database table with corresponding columns.

Data/AppDbContext.cs
  

using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions&lt;AppDbContext&gt; options) 
        : base(options) { }

    public DbSet&lt;Product&gt; Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity&lt;Product&gt;().HasData(
            new Product { Id = 1, Name = "Laptop", Price = 999.99m },
            new Product { Id = 2, Name = "Mouse", Price = 19.99m },
            new Product { Id = 3, Name = "Keyboard", Price = 49.99m }
        );
    }
}

This DbContext subclass defines a Products DbSet and seeds initial data. The
OnModelCreating method configures the model and adds sample data.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task&lt;IActionResult&gt; GetAll()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task&lt;IActionResult&gt; GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}

This controller demonstrates basic CRUD operations using DbContext. The context
is injected via constructor dependency injection.

The GetAll method retrieves all products asynchronously. GetById finds a single
product by ID. Create adds a new product to the database.

DbContext provides methods like ToListAsync and FindAsync for async operations.
SaveChangesAsync persists changes to the database. The controller follows REST
conventions.

## Source

[Microsoft EF Core DbContext Documentation](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

In this article, we have explored DbContext in ASP.NET 8. This powerful class
simplifies database operations and integrates seamlessly with ASP.NET Core.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).