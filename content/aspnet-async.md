+++
title = "ASP.NET Async"
date = 2025-08-27T23:21:08.199+01:00
draft = false
description = "ASP.NET Async tutorial shows how to use
Async in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Async

last modified April 3, 2025

In this article, we explore asynchronous programming in ASP.NET 8. Async
operations improve scalability by freeing threads during I/O operations.

ASP.NET Core is designed for async from the ground up. Async programming
helps build responsive applications that can handle more concurrent requests.

## Basic Definition

Asynchronous programming in ASP.NET allows non-blocking execution of code.
The async/await pattern simplifies writing async code while maintaining
structure.

An async method returns a Task or Task&lt;T&gt; and contains await expressions.
The await keyword suspends execution until the awaited task completes.

Async is particularly valuable for I/O-bound operations like database calls,
file operations, and web service requests. It prevents thread pool starvation.

## ASP.NET Async Example

The following example demonstrates async controller actions in ASP.NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up an ASP.NET application with controller and Entity Framework Core
support. The database context is configured for dependency injection.

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
    public async Task&lt;IActionResult&gt; GetAllProductsAsync()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task&lt;IActionResult&gt; GetProductByIdAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpGet("expensive")]
    public async Task&lt;IActionResult&gt; GetExpensiveProductsAsync()
    {
        var products = await _context.Products
            .Where(p =&gt; p.Price &gt; 100)
            .OrderByDescending(p =&gt; p.Price)
            .ToListAsync();
            
        return Ok(products);
    }
}

This controller demonstrates three async actions. Each method is marked with
async and returns a Task&lt;IActionResult&gt;. The await keyword is used for
all database operations.

The first method retrieves all products asynchronously. The second fetches a
single product by ID. The third shows a more complex query with filtering and
sorting.

Entity Framework Core provides async versions of all data access methods like
ToListAsync and FindAsync. These should always be
used in web applications for better scalability.

The async pattern allows the thread pool to handle other requests while waiting
for database operations. This improves server throughput under load.

## Source

[Microsoft ASP.NET Async Programming Documentation](https://learn.microsoft.com/en-us/aspnet/core/performance/async?view=aspnetcore-8.0)

In this article, we have explored async programming in ASP.NET 8. Proper use of
async/await can significantly improve application performance and scalability.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).