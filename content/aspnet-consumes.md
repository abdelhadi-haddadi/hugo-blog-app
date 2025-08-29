+++
title = "ASP.NET Consumes"
date = 2025-08-29T19:48:58.621+01:00
draft = false
description = "ASP.NET Consumes tutorial shows how to use Consumes in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Consumes

last modified April 3, 2025

In this article, we explore the Consumes attribute in ASP.NET 8. This attribute
is crucial for specifying the content types that an action method can accept.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Consumes attribute helps define request content type handling.

## Basic Definition

The Consumes attribute in ASP.NET restricts the content types that an action
method will accept. It specifies the media types that the action can process.

When applied to a controller or action method, Consumes filters incoming requests
based on their Content-Type header. Only matching requests will be processed.

Consumes is particularly useful in Web APIs where different endpoints might
accept different data formats. It works with both JSON, XML, and custom formats.

## ASP.NET Consumes Example

The following example demonstrates a Web API controller using the Consumes
attribute to handle different content types.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/OrdersController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static List&lt;Order&gt; _orders = new();

    // Accepts JSON requests
    [HttpPost]
    [Consumes("application/json")]
    public IActionResult CreateOrderFromJson([FromBody] Order order)
    {
        _orders.Add(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    // Accepts XML requests
    [HttpPost("xml")]
    [Consumes("application/xml")]
    public IActionResult CreateOrderFromXml([FromBody] Order order)
    {
        _orders.Add(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    // Accepts form data
    [HttpPost("form")]
    [Consumes("multipart/form-data")]
    public IActionResult CreateOrderFromForm([FromForm] OrderForm form)
    {
        var order = new Order(form.Id, form.ProductName, form.Quantity);
        _orders.Add(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        var order = _orders.FirstOrDefault(o =&gt; o.Id == id);
        if (order == null) return NotFound();
        return Ok(order);
    }
}

public record Order(int Id, string ProductName, int Quantity);
public record OrderForm(int Id, string ProductName, int Quantity);

This controller demonstrates three different Consumes scenarios. The first method
only accepts JSON content (application/json) in the request body.

The second method specifically handles XML content (application/xml).
The third method processes form data (multipart/form-data).

The ApiController attribute enables automatic model validation and
other Web API conventions. Each action method processes a different content type.

The example shows how Consumes can be used to create specialized endpoints for
different data formats. This is useful when supporting multiple client types.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the Consumes attribute in ASP.NET 8. This
powerful feature enables precise control over request content type handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).