+++
title = "ASP.NET DbSet"
date = 2025-08-29T19:49:00.821+01:00
draft = false
description = "ASP.NET DbSet tutorial shows how to use DbSet in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET DbSet

last modified April 3, 2025

In this article, we explore the DbSet class in ASP.NET 8 with Entity Framework
Core. DbSet represents a collection of entities in the context and is used for
database operations.

Entity Framework Core is a lightweight, extensible ORM for .NET. DbSet provides
methods to query and save instances of entity classes. It bridges your code and
database tables.

## Basic Definition

DbSet is a class in Entity Framework Core that represents a collection
of entities mapped to a database table. TEntity is the entity type in the model.

Each DbSet corresponds to a database table, and each entity in the DbSet
represents a row in that table. DbSet provides LINQ query capabilities against
the database.

DbSet includes methods for adding, updating, and removing entities. Changes are
tracked by the DbContext and saved with SaveChanges. It's the primary class for
data access in EF Core.

## ASP.NET DbSet Example

The following example demonstrates using DbSet in an ASP.NET 8 Web API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext&lt;ApplicationDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();

This configures the application with a DbContext and SQL Server database. The
connection string is read from configuration (appsettings.json).

Models/Product.cs
  

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

This defines a simple Product entity class. Entity Framework will map this to a
database table with matching columns. The Id property will be the primary key.

Data/ApplicationDbContext.cs
  

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions&lt;ApplicationDbContext&gt; options)
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

The ApplicationDbContext contains the Products DbSet. The OnModelCreating method
seeds initial data. DbContextOptions is injected via dependency injection.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task&lt;IActionResult&gt; GetProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task&lt;IActionResult&gt; GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; CreateProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), 
            new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task&lt;IActionResult&gt; UpdateProduct(int id, Product product)
    {
        if (id != product.Id) return BadRequest();
        
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task&lt;IActionResult&gt; DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

This controller demonstrates CRUD operations using the Products DbSet. Each
action method performs database operations asynchronously. The DbContext is
injected via constructor injection.

The GetProducts method retrieves all products. GetProduct finds a single product
by ID. CreateProduct adds a new product to the database. UpdateProduct modifies
an existing product.

DeleteProduct removes a product from the database. All methods use async/await
for better scalability. Entity Framework tracks changes and generates SQL
commands when SaveChangesAsync is called.

## Source

[Microsoft EF Core DbContext Documentation](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

In this article, we have explored DbSet in ASP.NET 8 with Entity Framework Core.
DbSet provides a powerful abstraction for database operations in .NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).