+++
title = "ASP.NET HttpPost"
date = 2025-08-27T23:21:20.594+01:00
draft = false
description = "ASP.NET HttpPost tutorial shows how to use HttpPost in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpPost

last modified April 3, 2025

In this article, we explore the HttpPost attribute in ASP.NET 8. This attribute
is essential for building RESTful APIs that handle data submission and creation.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The HttpPost attribute simplifies handling form submissions and
API data creation.

## Basic Definition

The HttpPost attribute in ASP.NET marks a controller action method to respond
only to HTTP POST requests. POST is the standard HTTP method for creating new
resources.

When applied to an action method, HttpPost specifies that the method should be
invoked when receiving a POST request. It's commonly used with model binding to
process submitted data.

HttpPost is part of ASP.NET's attribute routing system. It works with data
annotations to validate incoming data before processing. This ensures data
integrity and security.

## ASP.NET HttpPost Example

The following example demonstrates a Web API controller using HttpPost to create
new products.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for all controllers.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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

    [HttpPost]
    public IActionResult CreateProduct([FromBody] ProductCreateDto productDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newProduct = new Product(
            _products.Max(p =&gt; p.Id) + 1,
            productDto.Name,
            productDto.Price
        );

        _products.Add(newProduct);
        
        return CreatedAtAction(
            nameof(GetAllProducts),
            new { id = newProduct.Id },
            newProduct);
    }
}

public record Product(int Id, string Name, decimal Price);

public record ProductCreateDto(
    [Required][StringLength(100)] string Name,
    [Range(0.01, 10000)] decimal Price
);

This controller demonstrates both GET and POST operations. The HttpPost method
handles creation of new products through POST requests to /api/products.

The [FromBody] attribute tells ASP.NET to bind the request body to
the productDto parameter. Data annotations validate the input
before processing.

If validation fails, the method returns a 400 Bad Request with error details.
On success, it returns 201 Created with the new product's URI in the Location
header.

The example shows proper REST conventions: using DTOs for input, validation,
appropriate status codes, and the CreatedAtAction pattern for resource
creation responses.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the HttpPost attribute in ASP.NET 8. This
essential feature enables secure and structured data submission in web APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).