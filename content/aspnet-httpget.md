+++
title = "ASP.NET HttpGet"
date = 2025-08-27T23:21:20.608+01:00
draft = false
description = "ASP.NET HttpGet tutorial shows how to use
HttpGet in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpGet

last modified April 3, 2025

In this article, we explore the HttpGet attribute in ASP.NET 8. This attribute
is essential for building RESTful APIs and web services that handle GET requests.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The HttpGet attribute simplifies routing and request handling.

## Basic Definition

The HttpGet attribute in ASP.NET marks a controller action method to respond
only to HTTP GET requests. GET is the most common HTTP method used to retrieve
data from a server.

When applied to an action method, HttpGet specifies that the method should be
invoked when receiving a GET request. It can be used with route templates to
define custom URL patterns.

HttpGet is part of ASP.NET's attribute routing system, which provides more
control over URI patterns than conventional routing. It's commonly used in
Web API controllers.

## ASP.NET HttpGet Example

The following example demonstrates a basic Web API controller using HttpGet.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    [HttpGet]
    public IActionResult GetAllProducts()
    {
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpGet("search")]
    public IActionResult SearchProducts([FromQuery] string name)
    {
        var results = _products.Where(p =&gt; 
            p.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
        return Ok(results);
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates three different HttpGet scenarios. The first method
returns all products when hitting the base route /api/products.

The second method uses route parameter {id} to get a specific
product. The third method shows query parameter binding with [FromQuery].

The ApiController attribute enables automatic HTTP 400 responses
for invalid models and other Web API conventions. Route sets the
base path for all actions in this controller.

The example shows how HttpGet can be used for different GET scenarios:
collection retrieval, single item retrieval, and filtered searches. Each method
returns appropriate HTTP status codes.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the HttpGet attribute in ASP.NET 8. This
powerful feature simplifies the creation of RESTful endpoints for retrieving data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).