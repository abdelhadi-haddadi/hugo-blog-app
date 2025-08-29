+++
title = "ASP.NET FromRoute"
date = 2025-08-27T23:21:18.390+01:00
draft = false
description = "ASP.NET FromRoute tutorial shows how to use FromRoute in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET FromRoute

last modified April 3, 2025

In this article, we explore the FromRoute attribute in ASP.NET 8. This attribute
is essential for binding route parameters to action method parameters in Web APIs.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The FromRoute attribute simplifies parameter binding from URL routes.

## Basic Definition

The FromRoute attribute in ASP.NET binds action method parameters to route
values. It extracts values from the URL path and binds them to method parameters.

When applied to a parameter, FromRoute specifies that the parameter's value
should come from the route data. It's commonly used with HttpGet and HttpDelete.

FromRoute is part of ASP.NET's model binding system. It provides explicit
control over where parameter values come from, making code more maintainable.

## ASP.NET FromRoute Example

The following example demonstrates a Web API controller using FromRoute to
retrieve a product by ID from the route parameter.

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

    [HttpGet("{id}")]
    public IActionResult GetProductById([FromRoute] int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpGet("category/{categoryId}/products")]
    public IActionResult GetProductsByCategory(
        [FromRoute(Name = "categoryId")] int catId)
    {
        // In a real app, we would filter by category
        return Ok(_products);
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates two different FromRoute scenarios. The first method
binds the id parameter from the route template {id}.

The second method shows how to bind a route parameter with a different name
than the action parameter. The Name property specifies the route
parameter name to bind to.

The ApiController attribute enables automatic HTTP 400 responses
for invalid models. Route sets the base path for all actions in
this controller.

The example shows how FromRoute provides explicit binding of route parameters.
This makes the code more readable and maintainable compared to implicit binding.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the FromRoute attribute in ASP.NET 8. This
powerful feature provides explicit control over route parameter binding in Web APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).