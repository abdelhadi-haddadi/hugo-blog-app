+++
title = "ASP.NET ExceptionFilter"
date = 2025-08-27T23:21:15.709+01:00
draft = false
description = "ASP.NET ExceptionFilter tutorial shows how to use
Exception Filters in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ExceptionFilter

last modified April 3, 2025

In this article, we explore Exception Filters in ASP.NET 8. Exception Filters
provide a way to handle exceptions in a centralized and consistent manner.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. Exception Filters help manage error handling across controllers.

## Basic Definition

Exception Filters in ASP.NET are attributes that implement the IExceptionFilter
or IAsyncExceptionFilter interface. They catch unhandled exceptions in controllers.

When an exception occurs during action execution, Exception Filters can intercept
it before it reaches the client. They allow custom error responses and logging.

Exception Filters can be applied at different levels: globally, controller-wide,
or to specific actions. They provide more control than traditional try-catch blocks.

## ASP.NET ExceptionFilter Example

The following example demonstrates creating and using a custom Exception Filter.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =&gt;
{
    options.Filters.Add&lt;CustomExceptionFilter&gt;();
});

var app = builder.Build();

app.MapControllers();
app.Run();

This registers our CustomExceptionFilter globally for all controllers. The filter
will process all unhandled exceptions in the application.

Filters/CustomExceptionFilter.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

public class CustomExceptionFilter : IExceptionFilter
{
    private readonly ILogger&lt;CustomExceptionFilter&gt; _logger;

    public CustomExceptionFilter(ILogger&lt;CustomExceptionFilter&gt; logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, 
            "An unhandled exception occurred");

        var problemDetails = new ProblemDetails
        {
            Title = "An error occurred",
            Status = (int)HttpStatusCode.InternalServerError,
            Detail = context.Exception.Message,
            Instance = context.HttpContext.Request.Path
        };

        if (context.Exception is ArgumentException)
        {
            problemDetails.Status = (int)HttpStatusCode.BadRequest;
            problemDetails.Title = "Invalid argument";
        }
        else if (context.Exception is KeyNotFoundException)
        {
            problemDetails.Status = (int)HttpStatusCode.NotFound;
            problemDetails.Title = "Resource not found";
        }

        context.Result = new ObjectResult(problemDetails)
        {
            StatusCode = problemDetails.Status
        };

        context.ExceptionHandled = true;
    }
}

This filter logs exceptions and converts them to standardized ProblemDetails
responses. Different exception types result in different HTTP status codes.

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

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found");
        }
        return Ok(product);
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] Product product)
    {
        if (product.Price &lt;= 0)
        {
            throw new ArgumentException("Price must be greater than zero");
        }
        _products.Add(product);
        return CreatedAtAction(nameof(GetProductById), 
            new { id = product.Id }, product);
    }
}

public record Product(int Id, string Name, decimal Price);

The controller throws exceptions that will be caught by our filter. The filter
converts these to appropriate HTTP responses with ProblemDetails.

When a KeyNotFoundException is thrown, the filter returns a 404 status. For
ArgumentException, it returns 400. All other exceptions result in 500 responses.

This approach centralizes error handling logic while keeping controller code
clean. The filter ensures consistent error responses across the entire API.

## Source

[Microsoft ASP.NET Exception Filters Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-8.0#exception-filters)

In this article, we have explored Exception Filters in ASP.NET 8. These powerful
filters help create robust APIs with consistent error handling patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).