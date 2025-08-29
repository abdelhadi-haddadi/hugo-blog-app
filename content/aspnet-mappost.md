+++
title = "ASP.NET MapPost"
date = 2025-08-29T19:49:13.254+01:00
draft = false
description = "ASP.NET MapPost tutorial shows how to use MapPost in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET MapPost

last modified April 3, 2025

In this article, we explore the MapPost method in ASP.NET 8. This method is
essential for handling HTTP POST requests in minimal API applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The MapPost method simplifies routing for POST requests.

## Basic Definition

The MapPost method in ASP.NET is used to create route handlers for HTTP POST
requests in minimal APIs. POST is commonly used for creating resources.

When applied to a route, MapPost specifies that the handler should be invoked
only for POST requests. It can be used with route templates and parameters.

MapPost is part of ASP.NET's endpoint routing system in minimal APIs. It
provides a lightweight alternative to controller-based routing.

## ASP.NET MapPost Example

The following example demonstrates a basic minimal API using MapPost.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var products = new List&lt;Product&gt;()
{
    new(1, "Laptop", 999.99m),
    new(2, "Mouse", 19.99m),
    new(3, "Keyboard", 49.99m)
};

app.MapGet("/products", () =&gt; Results.Ok(products));

app.MapGet("/products/{id}", (int id) =&gt; 
{
    var product = products.FirstOrDefault(p =&gt; p.Id == id);
    return product is null ? Results.NotFound() : Results.Ok(product);
});

app.MapPost("/products", (Product product) =&gt; 
{
    products.Add(product);
    return Results.Created($"/products/{product.Id}", product);
});

app.Run();

public record Product(int Id, string Name, decimal Price);

This example sets up a minimal API with three endpoints. The first two use
MapGet for retrieving products, while the third uses MapPost for creation.

The MapPost endpoint at /products accepts a Product object in the
request body. It adds the product to the collection and returns a 201 Created
response.

The Results.Created method generates a proper HTTP 201 response
with the Location header pointing to the new resource. This follows REST
conventions.

The example shows how MapPost can be used alongside MapGet to create a
complete CRUD API. The minimal API approach reduces boilerplate code.

## Source

[Microsoft ASP.NET Minimal APIs Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-8.0)

In this article, we have explored the MapPost method in ASP.NET 8. This
powerful feature simplifies the creation of endpoints for handling POST requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).