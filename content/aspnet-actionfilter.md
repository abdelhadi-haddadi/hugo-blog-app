+++
title = "ASP.NET ActionFilter"
date = 2025-08-27T23:21:02.783+01:00
draft = false
description = "ASP.NET ActionFilter tutorial shows how to use
ActionFilter in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ActionFilter

last modified April 3, 2025

In this article, we explore ActionFilters in ASP.NET 8. ActionFilters allow you
to run code before or after controller action execution. They are powerful for
cross-cutting concerns.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ActionFilters provide a way to implement middleware-like behavior
at the action level.

## Basic Definition

An ActionFilter in ASP.NET is an attribute that implements the IActionFilter or
IAsyncActionFilter interface. It intercepts requests to controller actions.

ActionFilters can execute code before an action runs (OnActionExecuting) and
after it completes (OnActionExecuted). They are useful for logging, validation,
or modifying responses.

Filters in ASP.NET run in a pipeline called the filter pipeline. ActionFilters
are executed after authorization filters but before result filters and exception
filters.

## ASP.NET ActionFilter Example

The following example demonstrates creating and using a custom ActionFilter for
logging request information.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Filters/LogActionFilter.cs
  

using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

public class LogActionFilter : IActionFilter
{
    private readonly ILogger&lt;LogActionFilter&gt; _logger;

    public LogActionFilter(ILogger&lt;LogActionFilter&gt; logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        _logger.LogInformation($"Action {context.ActionDescriptor.DisplayName} " +
            $"is executing at {DateTime.UtcNow}");
        
        // You can access action arguments
        foreach (var arg in context.ActionArguments)
        {
            _logger.LogInformation($"Argument: {arg.Key} = {arg.Value}");
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        var elapsed = Stopwatch.GetTimestamp();
        _logger.LogInformation($"Action {context.ActionDescriptor.DisplayName} " +
            $"completed at {DateTime.UtcNow}");
        
        if (context.Exception != null)
        {
            _logger.LogError(context.Exception, "Action threw an exception");
        }
    }
}

This custom ActionFilter logs information before and after action execution. It
demonstrates accessing action arguments and handling exceptions.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[ServiceFilter(typeof(LogActionFilter))]
public class ProductsController : ControllerBase
{
    private static List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    [HttpGet]
    public IActionResult GetAllProducts()
    {
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }
}

public record Product(int Id, string Name, decimal Price);

The controller applies the LogActionFilter using the [ServiceFilter]
attribute. This ensures dependency injection works for the filter's constructor.

When any action in this controller runs, the filter will log execution details.
The example shows how ActionFilters can add cross-cutting behavior without
modifying action methods.

For global registration, you can add the filter in Program.cs:
builder.Services.AddControllers(options =&gt; 
options.Filters.Add&lt;LogActionFilter&gt;());
This applies the filter to all controllers.

## Source

[Microsoft ASP.NET Filters Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-8.0)

In this article, we have explored ActionFilters in ASP.NET 8. These powerful
components help implement cross-cutting concerns cleanly and maintainably.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).