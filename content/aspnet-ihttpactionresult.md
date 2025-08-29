+++
title = "ASP.NET IHttpActionResult"
date = 2025-08-27T23:21:24.001+01:00
draft = false
description = "ASP.NET IHttpActionResult tutorial shows how to use IHttpActionResult in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IHttpActionResult

last modified April 3, 2025

In this article, we explore the IHttpActionResult interface in ASP.NET 8. This
interface provides a powerful way to return HTTP responses from Web API actions.

ASP.NET Web API is a framework for building HTTP services that reach a broad
range of clients. IHttpActionResult helps create standardized HTTP responses.

## Basic Definition

IHttpActionResult is an interface in ASP.NET Web API that represents an HTTP
response. It encapsulates the logic to create an HttpResponseMessage.

The interface contains a single method: ExecuteAsync. This method asynchronously
creates an HttpResponseMessage instance. It allows for deferred execution.

Using IHttpActionResult provides several benefits over returning raw data. It
enables better testability and separates response creation from action logic.

ASP.NET provides several built-in implementations through the ApiController
class. These include Ok, NotFound, BadRequest, and other helper methods.

IHttpActionResult is particularly useful when you need to return different HTTP
status codes or need to customize the response in complex ways.

## ASP.NET IHttpActionResult Example

The following example demonstrates a Web API controller using IHttpActionResult.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/CustomersController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.Net;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List&lt;Customer&gt; _customers = new()
    {
        new Customer(1, "John Doe", "john@example.com"),
        new Customer(2, "Jane Smith", "jane@example.com"),
        new Customer(3, "Bob Johnson", "bob@example.com")
    };

    [HttpGet]
    public IHttpActionResult GetAllCustomers()
    {
        return Ok(_customers);
    }

    [HttpGet("{id}")]
    public IHttpActionResult GetCustomerById(int id)
    {
        var customer = _customers.FirstOrDefault(c =&gt; c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
    }

    [HttpPost]
    public IHttpActionResult CreateCustomer([FromBody] Customer customer)
    {
        if (customer == null)
        {
            return BadRequest("Customer data is required");
        }

        if (_customers.Any(c =&gt; c.Email == customer.Email))
        {
            return Conflict("Customer with this email already exists");
        }

        customer.Id = _customers.Max(c =&gt; c.Id) + 1;
        _customers.Add(customer);

        return CreatedAtAction(
            nameof(GetCustomerById),
            new { id = customer.Id },
            customer);
    }

    [HttpPut("{id}")]
    public IHttpActionResult UpdateCustomer(int id, [FromBody] Customer customer)
    {
        if (customer == null || customer.Id != id)
        {
            return BadRequest();
        }

        var existingCustomer = _customers.FirstOrDefault(c =&gt; c.Id == id);
        if (existingCustomer == null)
        {
            return NotFound();
        }

        existingCustomer.Name = customer.Name;
        existingCustomer.Email = customer.Email;

        return StatusCode(HttpStatusCode.NoContent);
    }
}

public record Customer(int Id, string Name, string Email);

This controller demonstrates various IHttpActionResult return types. The
Ok method returns 200 OK with the specified data in the response.

The NotFound method returns 404 Not Found when a customer isn't
found. BadRequest returns 400 Bad Request for invalid input.

The CreatedAtAction method returns 201 Created with a Location
header pointing to the new resource. StatusCode allows returning
any HTTP status code.

The example shows how IHttpActionResult provides a clean way to return
different HTTP responses. Each method clearly indicates its response type.

## Source

[Microsoft ASP.NET Web API Return Types Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-8.0)

In this article, we have explored the IHttpActionResult interface in ASP.NET 8.
This powerful feature simplifies returning standardized HTTP responses.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).