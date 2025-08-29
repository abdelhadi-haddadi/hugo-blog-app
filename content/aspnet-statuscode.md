+++
title = "ASP.NET StatusCode"
date = 2025-08-27T23:21:37.496+01:00
draft = false
description = "ASP.NET StatusCode tutorial shows how to use StatusCode in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET StatusCode

last modified April 3, 2025

In this article, we explore the StatusCode functionality in ASP.NET 8. Status
codes are essential for building RESTful APIs and web services that communicate
properly with clients.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. Proper use of status codes helps create robust and predictable APIs.

## Basic Definition

HTTP status codes are three-digit numbers returned by servers to indicate the
result of a client's request. They are grouped into five classes by their first
digit.

In ASP.NET, status codes can be returned using the StatusCode method or various
helper methods like Ok, NotFound, and BadRequest. These methods create proper
HTTP responses.

Status codes provide important information about the request outcome. They help
clients understand whether the request succeeded, failed, or requires further
action.

## ASP.NET StatusCode Example

The following example demonstrates various ways to return status codes in an
ASP.NET Web API controller.

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
    private static List&lt;Order&gt; _orders = new()
    {
        new Order(1, "Pending", 150.00m),
        new Order(2, "Completed", 299.99m),
        new Order(3, "Cancelled", 75.50m)
    };

    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        var order = _orders.FirstOrDefault(o =&gt; o.Id == id);
        if (order == null)
        {
            return NotFound(); // Returns 404 status code
        }
        return Ok(order); // Returns 200 status code with data
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] Order order)
    {
        if (order == null || string.IsNullOrEmpty(order.Status))
        {
            return BadRequest(); // Returns 400 status code
        }

        order.Id = _orders.Max(o =&gt; o.Id) + 1;
        _orders.Add(order);

        return CreatedAtAction(
            nameof(GetOrder), 
            new { id = order.Id }, 
            order); // Returns 201 status code
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, [FromBody] Order order)
    {
        var existingOrder = _orders.FirstOrDefault(o =&gt; o.Id == id);
        if (existingOrder == null)
        {
            return NotFound(); // Returns 404 status code
        }

        existingOrder.Status = order.Status;
        existingOrder.Amount = order.Amount;

        return NoContent(); // Returns 204 status code
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        var order = _orders.FirstOrDefault(o =&gt; o.Id == id);
        if (order == null)
        {
            return NotFound(); // Returns 404 status code
        }

        _orders.Remove(order);
        return StatusCode(StatusCodes.Status200OK, 
            new { Message = "Order deleted successfully" });
    }
}

public record Order(int Id, string Status, decimal Amount);

This controller demonstrates various status code scenarios in a RESTful API. The
GetOrder method returns either 200 (OK) or 404 (Not Found).

The CreateOrder method returns 400 (Bad Request) for invalid input
or 201 (Created) for successful creation. It includes the location of the new
resource.

The UpdateOrder method returns 204 (No Content) for successful
updates or 404 for non-existent orders. The DeleteOrder method
shows explicit use of StatusCode with a custom message.

This example covers common HTTP status codes used in REST APIs: 200, 201, 204,
400, and 404. Each status code properly communicates the operation's outcome.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored StatusCode functionality in ASP.NET 8. Proper
use of status codes is crucial for building professional, standards-compliant
web APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).