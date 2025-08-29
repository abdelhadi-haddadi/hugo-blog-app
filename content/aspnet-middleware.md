+++
title = "ASP.NET Middleware"
date = 2025-08-29T19:49:13.257+01:00
draft = false
description = "ASP.NET Middleware tutorial shows how to use Middleware in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Middleware

last modified April 3, 2025

In this article, we explore Middleware in ASP.NET 8. Middleware components are
essential for handling HTTP requests and responses in ASP.NET applications.

ASP.NET Middleware forms a pipeline that processes requests and responses. Each
component can inspect, modify, or short-circuit the request/response flow.

## Basic Definition

Middleware in ASP.NET is software components that are assembled into an
application pipeline. They handle HTTP requests and responses in sequence.

Each Middleware component can perform operations before and after the next
component in the pipeline. They can also decide not to call the next component.

Middleware is configured in the Program.cs file using the WebApplication object.
The order of Middleware registration is critical as it defines the execution
sequence.

Common built-in Middleware includes routing, authentication, static files, and
CORS. Custom Middleware can be created for application-specific requirements.

## ASP.NET Middleware Example

The following example demonstrates creating and using custom Middleware in ASP.NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Custom Middleware
app.Use(async (context, next) =&gt;
{
    Console.WriteLine($"Request started: {context.Request.Path}");
    await next();
    Console.WriteLine($"Request completed: {context.Request.Path}");
});

// Another custom Middleware
app.Use(async (context, next) =&gt;
{
    context.Response.Headers.Add("X-Custom-Header", "Middleware-Example");
    await next();
});

// Built-in Middleware
app.UseRouting();
app.UseAuthorization();

app.MapGet("/", () =&gt; "Hello from Middleware example!");

app.Run();

This example shows two inline custom Middleware components and built-in Middleware.
The first logs request start/end times, while the second adds a custom header.

The Use method adds Middleware to the pipeline. The next
parameter represents the next Middleware in the pipeline. Calling await next()
passes control to the next component.

Custom Middleware Class Example
  

public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger&lt;RequestTimingMiddleware&gt; _logger;

    public RequestTimingMiddleware(RequestDelegate next, 
        ILogger&lt;RequestTimingMiddleware&gt; logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();
            _logger.LogInformation(
                $"Request {context.Request.Path} took {stopwatch.ElapsedMilliseconds}ms");
        }
    }
}

public static class RequestTimingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestTiming(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware&lt;RequestTimingMiddleware&gt;();
    }
}

This shows a more structured approach to Middleware as a separate class. The
Middleware measures request processing time and logs it using the ILogger service.

The RequestDelegate represents the next Middleware in the pipeline.
The InvokeAsync method is called for each request. The extension
method simplifies adding this Middleware to the pipeline.

Using the Custom Middleware in Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddLogging();

var app = builder.Build();

app.UseRequestTiming();

app.MapGet("/", () =&gt; "Hello from custom Middleware!");

app.Run();

Here we register the logging service and add our custom Middleware using the
extension method. The Middleware will now log timing for all requests.

This example demonstrates both inline and class-based Middleware approaches.
The class-based approach is more maintainable for complex scenarios and supports
dependency injection.

## Source

[Microsoft ASP.NET Middleware Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0)

In this article, we have explored Middleware in ASP.NET 8. Middleware provides
powerful capabilities to inspect and modify the HTTP request/response pipeline.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).