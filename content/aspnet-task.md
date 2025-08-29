+++
title = "ASP.NET Task"
date = 2025-08-27T23:21:37.493+01:00
draft = false
description = "ASP.NET Task tutorial shows how to use
Task in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Task

last modified April 3, 2025

In this article, we explore the Task class in ASP.NET 8. Task is fundamental
for writing asynchronous code in modern .NET applications.

ASP.NET is a cross-platform, high-performance framework for building web apps.
Task enables efficient handling of I/O-bound operations without blocking threads.

## Basic Definition

Task represents an asynchronous operation in .NET. It's a promise of future work
that may or may not return a value. Tasks are used with async/await keywords.

Tasks help manage concurrency by allowing non-blocking execution of operations.
They're essential for scalable web applications that handle many requests.

In ASP.NET, controller actions can return Task to support async
operations. This improves server throughput by freeing threads during I/O waits.

## ASP.NET Task Example

The following example demonstrates async controller actions using Task in ASP.NET.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up an ASP.NET application with controller and Entity Framework Core
support. The DbContext is configured for async database operations.

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

    [HttpGet("expensive")]
    public async Task&lt;IActionResult&gt; GetExpensiveProducts()
    {
        var products = await _context.Products
            .Where(p =&gt; p.Price &gt; 100)
            .ToListAsync();
        return Ok(products);
    }
}

This controller demonstrates three async actions using Task. Each method performs
database operations asynchronously using Entity Framework Core's async methods.

The GetAllProducts method returns all products from the database.
ToListAsync is used instead of ToList for async operation.

The GetProductById method shows async retrieval of a single item.
FindAsync is the async version of Find for primary key lookups.

The GetExpensiveProducts method demonstrates async query execution
with filtering. All database operations are non-blocking, freeing threads.

## Source

[Microsoft Task Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-8.0)

In this article, we have explored Task in ASP.NET 8. This powerful feature
enables efficient async programming for scalable web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).