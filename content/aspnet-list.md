+++
title = "ASP.NET List"
date = 2025-08-29T19:49:12.173+01:00
draft = false
description = "ASP.NET List tutorial shows how to use List in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET List

last modified April 3, 2025

In this article, we explore the List&lt;T&gt; collection in ASP.NET 8. List is
a fundamental data structure used extensively in .NET applications for storing
and manipulating collections of objects.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The List&lt;T&gt; class provides powerful methods for working with
collections of data in memory.

## Basic Definition

List&lt;T&gt; is a generic collection class in .NET that represents a strongly
typed list of objects. It provides methods to search, sort, and manipulate lists.

Unlike arrays, Lists can dynamically grow and shrink in size as needed. They
provide better performance for most operations compared to traditional arrays.

List is part of the System.Collections.Generic namespace. It implements several
interfaces including IList&lt;T&gt;, ICollection&lt;T&gt;, and IEnumerable&lt;T&gt;.

## ASP.NET List Example

The following example demonstrates using List&lt;T&gt; in an ASP.NET Web API
controller to manage a collection of products.

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
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List&lt;Product&gt; _products = new List&lt;Product&gt;
    {
        new Product { Id = 1, Name = "Laptop", Price = 999.99m },
        new Product { Id = 2, Name = "Mouse", Price = 19.99m },
        new Product { Id = 3, Name = "Keyboard", Price = 49.99m }
    };

    [HttpGet]
    public ActionResult&lt;List&lt;Product&gt;&gt; GetAllProducts()
    {
        return _products;
    }

    [HttpPost]
    public ActionResult&lt;Product&gt; AddProduct([FromBody] Product product)
    {
        product.Id = _products.Max(p =&gt; p.Id) + 1;
        _products.Add(product);
        return CreatedAtAction(nameof(GetProductById), 
            new { id = product.Id }, product);
    }

    [HttpGet("{id}")]
    public ActionResult&lt;Product&gt; GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return product;
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] Product product)
    {
        var existingProduct = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (existingProduct == null) return NotFound();

        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();

        _products.Remove(product);
        return NoContent();
    }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

This controller demonstrates CRUD operations using a List&lt;Product&gt; as the
in-memory data store. The list is initialized with three sample products.

The GetAllProducts method returns the entire list. AddProduct
adds a new product to the list and assigns it a new ID. GetProductById
finds a product by ID using LINQ's FirstOrDefault.

UpdateProduct modifies an existing product in the list.
DeleteProduct removes a product from the list. All methods return
appropriate HTTP status codes.

The example shows how List&lt;T&gt; can be used as a simple in-memory database
for demonstration purposes. In real applications, you would typically use a
proper database.

## Source

[Microsoft List&lt;T&gt; Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-8.0)

In this article, we have explored the List&lt;T&gt; collection in ASP.NET 8.
This versatile class is essential for working with collections of objects in
.NET applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).