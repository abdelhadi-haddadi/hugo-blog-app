+++
title = "ASP.NET ResultFilter"
date = 2025-08-29T19:49:20.255+01:00
draft = false
description = "ASP.NET ResultFilter tutorial shows how to use ResultFilter in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ResultFilter

last modified April 3, 2025

In this article, we explore the ResultFilter in ASP.NET 8. Result filters allow
you to run code before or after action results are executed in ASP.NET Core.

ASP.NET filters provide a way to run code at specific stages in the request
processing pipeline. Result filters are particularly useful for modifying
responses or adding headers.

## Basic Definition

A ResultFilter in ASP.NET Core is a type of action filter that runs code before
or after an action result executes. It implements either IResultFilter or
IAsyncResultFilter interface.

Result filters are executed after the action method completes but before the
result is processed. They can modify the response or short-circuit execution.

Common use cases include response formatting, adding headers, logging, or
modifying the response content. Result filters run for both successful and
failed action results.

## ASP.NET ResultFilter Example

The following example demonstrates creating and using a custom ResultFilter in
ASP.NET 8 to add response headers.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =&gt;
{
    options.Filters.Add&lt;AddCustomHeadersFilter&gt;();
});

var app = builder.Build();

app.MapControllers();
app.Run();

This configures the application to use our custom ResultFilter globally. The
filter will be applied to all controller actions.

Filters/AddCustomHeadersFilter.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class AddCustomHeadersFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Runs before the action result executes
        if (context.HttpContext.Response.Headers.ContainsKey("X-Custom-Header"))
        {
            context.HttpContext.Response.Headers.Remove("X-Custom-Header");
        }
        
        context.HttpContext.Response.Headers.Add(
            "X-Custom-Header", "Custom-Value");
            
        context.HttpContext.Response.Headers.Add(
            "X-Response-Time", DateTime.UtcNow.ToString());
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Runs after the action result executes
        // Can be used for cleanup or logging
    }
}

This filter adds two custom headers to every response. The
OnResultExecuting method runs before the result executes, while
OnResultExecuted runs after.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { Name = "Product 1", Price = 19.99 });
    }
}

When you call the /api/products endpoint, the response will include
the custom headers added by our filter. This demonstrates how ResultFilters can
modify responses.

The example shows a global filter, but you can also apply ResultFilters to
specific controllers or actions using the [ServiceFilter] or
[TypeFilter] attributes.

## Source

[Microsoft ASP.NET Filters Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-8.0)

In this article, we have explored the ResultFilter in ASP.NET 8. This powerful
feature allows you to intercept and modify responses in your web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).