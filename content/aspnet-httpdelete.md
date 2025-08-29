+++
title = "ASP.NET HttpDelete"
date = 2025-08-27T23:21:19.497+01:00
draft = false
description = "ASP.NET HttpDelete tutorial shows how to use
HttpDelete in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpDelete

last modified April 3, 2025

In this article, we explore the HttpDelete attribute in ASP.NET 8. This attribute
is essential for building RESTful APIs that handle DELETE requests to remove resources.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The HttpDelete attribute simplifies routing for resource deletion.

## Basic Definition

The HttpDelete attribute in ASP.NET marks a controller action method to respond
only to HTTP DELETE requests. DELETE is used to remove resources from a server.

When applied to an action method, HttpDelete specifies that the method should be
invoked when receiving a DELETE request. It can be used with route parameters.

HttpDelete is part of ASP.NET's attribute routing system, which provides precise
control over URI patterns. It's commonly used in Web API controllers for CRUD.

## ASP.NET HttpDelete Example

The following example demonstrates a Web API controller using HttpDelete to
remove products from a collection.

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

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        
        _products.Remove(product);
        return NoContent();
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates a typical HttpDelete implementation. The method
responds to DELETE requests at /api/products/{id}.

The action first attempts to find the product with the specified ID. If not found,
it returns a 404 Not Found response. If found, it removes the product from the
collection.

The method returns 204 No Content on successful deletion, which is the standard
response for successful DELETE operations in REST APIs. No response body is needed.

The example shows proper REST conventions: using route parameters for resource
identification and appropriate HTTP status codes for different scenarios.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the HttpDelete attribute in ASP.NET 8. This
essential feature enables proper implementation of resource deletion in REST APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).