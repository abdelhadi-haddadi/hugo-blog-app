+++
title = "ASP.NET ApiController"
date = 2025-08-29T19:48:54.145+01:00
draft = false
description = "ASP.NET ApiController tutorial shows how to use ApiController in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ApiController

last modified April 3, 2025

In this article, we explore the ApiController attribute in ASP.NET 8. This
attribute is fundamental for building RESTful APIs and web services.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The ApiController simplifies API development with built-in features.

## Basic Definition

The ApiController attribute in ASP.NET marks a controller as a web API controller.
It enables opinionated behaviors that make building HTTP APIs easier.

When applied to a controller class, ApiController enables automatic model state
validation, attribute routing requirement, and default response formatting.

ApiController is part of ASP.NET Core's MVC framework. It's designed specifically
for building HTTP APIs with RESTful conventions and behaviors.

## ASP.NET ApiController Example

The following example demonstrates a complete Web API using ApiController.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
AddControllers method registers services needed for controllers.

Controllers/CustomersController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List&lt;Customer&gt; _customers = new()
    {
        new Customer(1, "John", "Doe", "john@example.com"),
        new Customer(2, "Jane", "Smith", "jane@example.com"),
        new Customer(3, "Bob", "Johnson", "bob@example.com")
    };

    [HttpGet]
    public ActionResult&lt;IEnumerable&lt;Customer&gt;&gt; Get()
    {
        return _customers;
    }

    [HttpGet("{id}")]
    public ActionResult&lt;Customer&gt; GetById(int id)
    {
        var customer = _customers.FirstOrDefault(c =&gt; c.Id == id);
        if (customer == null) return NotFound();
        return customer;
    }

    [HttpPost]
    public IActionResult Create([FromBody] Customer customer)
    {
        customer.Id = _customers.Max(c =&gt; c.Id) + 1;
        _customers.Add(customer);
        return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Customer customer)
    {
        var existing = _customers.FirstOrDefault(c =&gt; c.Id == id);
        if (existing == null) return NotFound();
        
        existing.FirstName = customer.FirstName;
        existing.LastName = customer.LastName;
        existing.Email = customer.Email;
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var customer = _customers.FirstOrDefault(c =&gt; c.Id == id);
        if (customer == null) return NotFound();
        
        _customers.Remove(customer);
        return NoContent();
    }
}

public record Customer(int Id, string FirstName, string LastName, string Email);

This controller demonstrates a complete CRUD API for customer management. The
ApiController attribute enables several automatic behaviors.

The controller inherits from ControllerBase which provides HTTP
response helpers. The Route attribute sets the base path to
/api/customers.

The example shows all major HTTP methods: GET for retrieval, POST for creation,
PUT for updates, and DELETE for removal. Each method returns appropriate
HTTP status codes.

The ApiController attribute automatically handles model validation
errors and binds parameters from different sources (route, query, body).

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the ApiController attribute in ASP.NET 8. This
powerful feature simplifies API development with built-in conventions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).