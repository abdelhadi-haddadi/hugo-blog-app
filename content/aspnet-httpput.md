+++
title = "ASP.NET HttpPut"
date = 2025-08-27T23:21:21.812+01:00
draft = false
description = "ASP.NET HttpPut tutorial shows how to use
HttpPut in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpPut

last modified April 3, 2025

In this article, we explore the HttpPut attribute in ASP.NET 8. This attribute
is essential for building RESTful APIs that handle resource updates.

ASP.NET is a cross-platform framework for building modern web applications. The
HttpPut attribute simplifies handling HTTP PUT requests for updating resources.

## Basic Definition

The HttpPut attribute in ASP.NET marks a controller action method to respond
only to HTTP PUT requests. PUT is used to update existing resources on the server.

When applied to an action method, HttpPut specifies that the method should be
invoked when receiving a PUT request. It typically includes the resource ID in
the route and the updated data in the request body.

HttpPut is part of ASP.NET's attribute routing system. It follows REST
conventions where PUT requests are idempotent - repeated calls produce the same
result.

## ASP.NET HttpPut Example

The following example demonstrates a Web API controller using HttpPut to update
product information.

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

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
    {
        var existingProduct = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (existingProduct == null) return NotFound();

        existingProduct = existingProduct with 
        { 
            Name = updatedProduct.Name,
            Price = updatedProduct.Price 
        };

        _products[_products.IndexOf(_products.First(p =&gt; p.Id == id))] = existingProduct;
        return NoContent();
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates a complete HttpPut implementation. The method is
decorated with [HttpPut("{id}")] to handle PUT requests with an ID
parameter.

The action takes two parameters: the ID from the route and the updated product
data from the request body. It first checks if the product exists, returning
404 if not found.

The example uses C# 9 record types with the with expression to
create an updated copy of the product. The updated product is then saved back
to the list.

The method returns NoContent() (HTTP 204) on success, following
REST conventions. This indicates the request was successful but no content needs
to be returned.

## Testing the HttpPut Endpoint

Here's how to test the PUT endpoint using curl:

Terminal
  

curl -X PUT -H "Content-Type: application/json" \
-d '{"id":2,"name":"Wireless Mouse","price":24.99}' \
http://localhost:5000/api/products/2

This command sends a PUT request to update the product with ID 2. The request
includes the updated product data in JSON format in the request body.

The endpoint expects the ID in both the route and the body to match. This is a
common practice to ensure consistency between the URL and the resource being
updated.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the HttpPut attribute in ASP.NET 8. This
powerful feature simplifies the creation of RESTful endpoints for updating
resources.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).