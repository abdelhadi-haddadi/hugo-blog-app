+++
title = "ASP.NET Entity Framework"
date = 2025-08-29T19:49:01.965+01:00
draft = false
description = "ASP.NET Entity Framework tutorial shows how to use Entity Framework in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Entity Framework

last modified April 3, 2025

In this article, we explore Entity Framework in ASP.NET 8. Entity Framework is
a powerful ORM that simplifies database operations in .NET applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. Entity Framework provides object-relational mapping capabilities.

## Basic Definition

Entity Framework (EF) is an object-relational mapper (ORM) that enables .NET
developers to work with a database using .NET objects. It eliminates the need
for most data-access code.

EF Core is the lightweight, extensible version of Entity Framework for .NET.
It supports multiple database providers including SQL Server, SQLite, and MySQL.

Entity Framework uses LINQ to query data from the database. It tracks changes
to objects and persists them back to the database automatically.

## ASP.NET Entity Framework Example

The following example demonstrates a basic Web API using Entity Framework Core.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();

This sets up an ASP.NET application with Entity Framework Core. The
AddDbContext method registers the database context.

Models/Product.cs
  

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

This defines our Product entity class. Entity Framework will map this class to
a database table. The properties will become columns in the table.

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

The AppDbContext represents the database session. The
DbSet&lt;Product&gt; property allows querying the Products table.

The OnModelCreating method seeds initial data into the database.
This is useful for development and testing purposes.

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
    public async Task&lt;IActionResult&gt; GetAllProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task&lt;IActionResult&gt; GetProductById(int id)
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
        return CreatedAtAction(nameof(GetProductById), 
            new { id = product.Id }, product);
    }
}

This controller demonstrates basic CRUD operations using Entity Framework. The
AppDbContext is injected via constructor dependency injection.

The GetAllProducts method retrieves all products from the database.
ToListAsync executes the query asynchronously.

The GetProductById method finds a single product by its primary key.
FindAsync is optimized for primary key lookups.

The CreateProduct method demonstrates adding a new entity. Changes
are saved to the database with SaveChangesAsync.

## Source

[Microsoft Entity Framework Core Documentation](https://learn.microsoft.com/en-us/ef/core/)

In this article, we have explored Entity Framework in ASP.NET 8. This powerful
ORM simplifies database operations and improves developer productivity.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).