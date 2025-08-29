+++
title = "ASP.NET RoutePrefix"
date = 2025-08-27T23:21:35.205+01:00
draft = false
description = "ASP.NET RoutePrefix tutorial shows how to use RoutePrefix in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET RoutePrefix

last modified April 3, 2025

In this article, we explore the RoutePrefix attribute in ASP.NET 8. This
attribute helps organize API endpoints by defining a common route prefix.

ASP.NET is a powerful framework for building web applications and APIs.
RoutePrefix simplifies route management by centralizing common path segments.

## Basic Definition

RoutePrefix is an attribute in ASP.NET Web API that specifies a common route
prefix for all actions within a controller. It reduces repetition in route
templates.

When applied to a controller, RoutePrefix defines the base path for all routes
in that controller. Individual action methods can then specify relative paths.

RoutePrefix works with attribute routing to create clean, consistent API
endpoints. It's particularly useful for versioned APIs or grouped resources.

## ASP.NET RoutePrefix Example

The following example demonstrates a Web API controller using RoutePrefix to
organize product-related endpoints.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This basic setup enables attribute routing in ASP.NET 8. The MapControllers
method activates route attributes like RoutePrefix.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[RoutePrefix("api/v1/products")]
public class ProductsController : ControllerBase
{
    private static List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    [HttpGet]
    [Route("")]
    public IActionResult GetAllProducts()
    {
        return Ok(_products);
    }

    [HttpGet]
    [Route("{id:int}")]
    public IActionResult GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpGet]
    [Route("category/{categoryId}")]
    public IActionResult GetProductsByCategory(int categoryId)
    {
        var products = _products.Where(p =&gt; p.CategoryId == categoryId);
        return Ok(products);
    }

    [HttpPost]
    [Route("")]
    public IActionResult AddProduct([FromBody] Product product)
    {
        _products.Add(product);
        return CreatedAtAction(nameof(GetProductById), 
            new { id = product.Id }, product);
    }
}

public record Product(int Id, string Name, decimal Price, int CategoryId = 1);

This controller uses RoutePrefix to set the base path to
api/v1/products. All action routes are relative to this prefix.

The GetAllProducts method combines with the prefix to form
api/v1/products. The GetProductById method adds
/{id} to the prefix.

The GetProductsByCategory shows how to extend the prefix with
additional path segments. The HttpPost method demonstrates that
RoutePrefix works with all HTTP methods.

Route constraints like {id:int} ensure parameter type matching.
The empty [Route("")] on GetAllProducts attaches
directly to the prefix.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the RoutePrefix attribute in ASP.NET 8. This
valuable feature helps create well-organized, maintainable API route structures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).