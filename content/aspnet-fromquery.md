+++
title = "ASP.NET FromQuery"
date = 2025-08-29T19:49:03.104+01:00
draft = false
description = "ASP.NET FromQuery tutorial shows how to use FromQuery in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET FromQuery

last modified April 3, 2025

In this article, we explore the FromQuery attribute in ASP.NET 8. This attribute
is essential for binding query string parameters to action method parameters.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The FromQuery attribute simplifies working with query parameters.

## Basic Definition

The FromQuery attribute in ASP.NET binds request query string parameters to
action method parameters. It's used in controller actions to extract values
from the URL query string.

When applied to a parameter, FromQuery specifies that the value should be
retrieved from the query string. It supports simple types, complex objects,
and collections.

FromQuery is part of ASP.NET's model binding system, which automatically maps
request data to action parameters. It's commonly used in Web API controllers.

## ASP.NET FromQuery Example

The following example demonstrates a Web API controller using FromQuery to
filter products by various criteria.

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
        new Product(1, "Laptop", 999.99m, "Electronics", 4.5),
        new Product(2, "Mouse", 19.99m, "Electronics", 4.0),
        new Product(3, "Notebook", 5.99m, "Stationery", 3.5),
        new Product(4, "Headphones", 89.99m, "Electronics", 4.2),
        new Product(5, "Pen", 1.99m, "Stationery", 3.8)
    };

    [HttpGet("filter")]
    public IActionResult FilterProducts(
        [FromQuery] string? name,
        [FromQuery] string? category,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] double? minRating)
    {
        var query = _products.AsQueryable();

        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(p =&gt; 
                p.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p =&gt; 
                p.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(p =&gt; p.Price &gt;= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(p =&gt; p.Price &lt;= maxPrice.Value);
        }

        if (minRating.HasValue)
        {
            query = query.Where(p =&gt; p.Rating &gt;= minRating.Value);
        }

        return Ok(query.ToList());
    }
}

public record Product(
    int Id, 
    string Name, 
    decimal Price, 
    string Category, 
    double Rating);

This controller demonstrates advanced usage of FromQuery with multiple optional
parameters. The FilterProducts action accepts five query parameters.

Each parameter is marked with [FromQuery] and made nullable to
indicate they're optional. The method builds a query dynamically based on
which parameters are provided.

For example, a request to /api/products/filter?category=Electronics&amp;minPrice=50
would return all electronic products priced at $50 or above. The parameters
can be combined in any combination.

The example shows how FromQuery enables flexible API endpoints that support
complex filtering scenarios. The nullable parameters make all filters optional.

## Testing the API

You can test the API using curl, Postman, or a web browser. Here are some
example requests:

Example Requests
  

# Get all electronics products
GET /api/products/filter?category=Electronics

# Get products with 'note' in name and rating &gt;= 4
GET /api/products/filter?name=note&amp;minRating=4

# Get stationery products between $1 and $10
GET /api/products/filter?category=Stationery&amp;minPrice=1&amp;maxPrice=10

Each request demonstrates different combinations of query parameters. The API
will return only products matching all specified criteria.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the FromQuery attribute in ASP.NET 8. This
powerful feature simplifies working with query string parameters in Web APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).