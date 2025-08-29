+++
title = "ASP.NET HttpPatch"
date = 2025-08-27T23:21:20.601+01:00
draft = false
description = "ASP.NET HttpPatch tutorial shows how to use
HttpPatch in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpPatch

last modified April 3, 2025

In this article, we explore the HttpPatch attribute in ASP.NET 8. This attribute
is essential for building RESTful APIs that handle partial updates efficiently.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The HttpPatch attribute enables partial resource modifications.

## Basic Definition

The HttpPatch attribute in ASP.NET marks a controller action method to respond
only to HTTP PATCH requests. PATCH is used for partial updates to resources.

Unlike PUT which replaces the entire resource, PATCH applies only the changes
specified in the request. This makes it more efficient for partial updates.

HttpPatch is part of ASP.NET's attribute routing system. It's commonly used in
Web API controllers for implementing RESTful partial update operations.

## ASP.NET HttpPatch Example

The following example demonstrates a Web API controller using HttpPatch for
partial product updates.

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
using Microsoft.AspNetCore.JsonPatch;

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

    [HttpPatch("{id}")]
    public IActionResult PatchProduct(int id, 
        [FromBody] JsonPatchDocument&lt;Product&gt; patchDoc)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();

        var productToPatch = new Product(product.Id, product.Name, product.Price);
        patchDoc.ApplyTo(productToPatch, ModelState);

        if (!TryValidateModel(productToPatch))
        {
            return BadRequest(ModelState);
        }

        product.Name = productToPatch.Name;
        product.Price = productToPatch.Price;

        return NoContent();
    }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }

    public Product(int id, string name, decimal price)
    {
        Id = id;
        Name = name;
        Price = price;
    }
}

This controller demonstrates partial updates using HttpPatch and JsonPatchDocument.
The method accepts a product ID and a patch document containing the changes.

The JsonPatchDocument represents a set of operations to apply to
the product. The ApplyTo method applies these changes to a copy of
the original product.

After applying the patch, we validate the modified product. If validation passes,
we update the original product. The method returns 204 No Content on success.

To test this endpoint, send a PATCH request to /api/products/1 with
a JSON body like:

Example PATCH Request
  

[
    { "op": "replace", "path": "/name", "value": "Ultra Laptop" },
    { "op": "replace", "path": "/price", "value": "1099.99" }
]

This request updates only the name and price of the product with ID 1, leaving
other properties unchanged. The JSON Patch format is standardized in RFC 6902.

## Source

[Microsoft ASP.NET JSON Patch Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-8.0)

In this article, we have explored the HttpPatch attribute in ASP.NET 8. This
feature enables efficient partial updates in RESTful APIs following best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).