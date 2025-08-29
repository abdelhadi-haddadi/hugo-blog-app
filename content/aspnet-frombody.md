+++
title = "ASP.NET FromBody"
date = 2025-08-27T23:21:16.825+01:00
draft = false
description = "ASP.NET FromBody tutorial shows how to use
FromBody in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET FromBody

last modified April 3, 2025

In this article, we explore the FromBody attribute in ASP.NET 8. This attribute
is crucial for binding HTTP request body data to action method parameters.

ASP.NET is a cross-platform framework for building modern web applications.
FromBody enables complex data binding from JSON or XML request bodies.

## Basic Definition

The FromBody attribute in ASP.NET indicates that a parameter should be bound
using the request body. It's primarily used with POST, PUT, and PATCH requests.

When applied to a parameter, FromBody tells the model binder to use the
content-type header to select an appropriate formatter. JSON is the most
common format for request bodies.

FromBody is essential for Web APIs that accept complex data structures. It
works with the built-in JSON serializer to deserialize request bodies.

## ASP.NET FromBody Example

The following example demonstrates a Web API controller using FromBody to
create and update products.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
AddControllers method configures services needed for controllers.

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

    [HttpPost]
    public IActionResult CreateProduct([FromBody] Product product)
    {
        if (product == null) return BadRequest();
        
        product.Id = _products.Max(p =&gt; p.Id) + 1;
        _products.Add(product);
        
        return CreatedAtAction(nameof(GetProductById), 
            new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] Product product)
    {
        if (product == null || product.Id != id) 
            return BadRequest();
            
        var existingProduct = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (existingProduct == null) return NotFound();
            
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
            
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates two different scenarios using FromBody. The first
method creates a new product from the request body sent as JSON.

The second method updates an existing product by ID, with the updated data
coming from the request body. Both methods validate the input data.

The CreatedAtAction result in the create method returns a 201
status code with the Location header pointing to the new resource. The update
method returns 204 No Content on success.

The example shows how FromBody automatically deserializes JSON request bodies
into Product objects. The ApiController attribute enables automatic model
validation and error responses.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the FromBody attribute in ASP.NET 8. This
powerful feature simplifies binding complex data from HTTP request bodies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).