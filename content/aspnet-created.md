+++
title = "ASP.NET Created"
date = 2025-08-27T23:21:13.453+01:00
draft = false
description = "ASP.NET Created tutorial shows how to use Created responses in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Created

last modified April 3, 2025

In this article, we explore the Created response in ASP.NET 8. This response
type is essential for RESTful APIs when creating new resources.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Created response follows REST conventions for resource creation.

## Basic Definition

The Created response in ASP.NET returns HTTP status code 201, indicating
successful resource creation. It typically includes the location of the new
resource.

This response type is used in POST methods of RESTful APIs. It follows the HTTP
protocol specification for successful creation operations.

Created responses often include both the Location header pointing to the new
resource and the resource itself in the response body. This provides immediate
access to the created data.

## ASP.NET Created Example

The following example demonstrates a Web API controller using Created responses.

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
            productDto.Price);

        _products.Add(newProduct);

        return CreatedAtAction(
            nameof(GetProductById),
            new { id = newProduct.Id },
            newProduct);
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
public record ProductCreateDto(string Name, decimal Price);

This controller demonstrates a POST method that creates a new product and returns
a Created response. The CreatedAtAction method generates a 201
response.

The CreatedAtAction method takes three parameters: the name of the
action to generate the URL, route values for that action, and the created
resource to include in the response body.

The example shows proper RESTful conventions by returning the location of the
new resource in the Location header. Clients can immediately access the created
resource using this URL.

The response includes both the new product data and the URL where it can be
accessed. This provides complete information to API consumers about the
creation result.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the Created response in ASP.NET 8. This
powerful feature helps build proper RESTful APIs that follow HTTP standards.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).