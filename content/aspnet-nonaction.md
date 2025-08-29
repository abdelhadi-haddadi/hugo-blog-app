+++
title = "ASP.NET NonAction"
date = 2025-08-27T23:21:28.428+01:00
draft = false
description = "ASP.NET NonAction tutorial shows how to use
NonAction in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET NonAction

last modified April 3, 2025

In this article, we explore the NonAction attribute in ASP.NET 8. This attribute
is used to prevent public controller methods from being treated as action methods.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The NonAction attribute helps organize controller code effectively.

## Basic Definition

The NonAction attribute in ASP.NET indicates that a public controller method
should not be treated as an action method. This prevents it from being invoked
by routing requests.

By default, all public methods in a controller class are considered action
methods. NonAction allows you to exclude specific methods from this behavior.

NonAction is useful when you need helper methods in controllers that shouldn't
be directly callable via HTTP requests. It's part of ASP.NET's controller
architecture.

## ASP.NET NonAction Example

The following example demonstrates a Web API controller using NonAction.

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
        var product = FindProductById(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [NonAction]
    public Product? FindProductById(int id)
    {
        return _products.FirstOrDefault(p =&gt; p.Id == id);
    }

    [NonAction]
    public void LogProductAccess(string productName)
    {
        Console.WriteLine($"Product accessed: {productName}");
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates two scenarios where NonAction is useful. The
FindProductById method is a helper method used by action methods.

The LogProductAccess method shows another common use case - a
utility method that shouldn't be exposed as an endpoint. Both are marked with
NonAction.

Without the NonAction attribute, these methods would be exposed as action
methods accessible via HTTP requests. The attribute prevents this exposure.

The example shows how NonAction helps organize controller code by separating
action methods from helper methods while keeping them in the same class.

## Source

[Microsoft ASP.NET Actions Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions?view=aspnetcore-8.0#nonaction-attribute)

In this article, we have explored the NonAction attribute in ASP.NET 8. This
useful feature helps maintain clean controller architecture by hiding methods.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).