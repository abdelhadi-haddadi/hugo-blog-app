+++
title = "ASP.NET UseMiddleware"
date = 2025-08-27T23:21:41.165+01:00
draft = false
description = "ASP.NET UseMiddleware tutorial shows how to use middleware in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET UseMiddleware

last modified April 3, 2025

In this article, we explore the UseMiddleware method in ASP.NET 8. Middleware
forms the backbone of request processing in ASP.NET Core applications.

ASP.NET Core middleware are components that form a pipeline to handle HTTP
requests and responses. Each middleware can process requests before and after
the next component.

## Basic Definition

Middleware in ASP.NET Core is software assembled into an application pipeline
to handle requests and responses. Each component chooses whether to pass the
request to the next component.

The UseMiddleware extension method adds middleware components to the application
pipeline. Middleware executes in the order they are added to the pipeline.

Middleware can perform operations before and after the next component in the
pipeline. They can also short-circuit the pipeline by not calling the next
middleware.

## ASP.NET UseMiddleware Example

The following example demonstrates creating and using custom middleware in
ASP.NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseMiddleware&lt;RequestTimingMiddleware&gt;();
app.UseMiddleware&lt;CustomHeaderMiddleware&gt;();

app.MapGet("/", () =&gt; "Hello from ASP.NET Core!");

app.Run();

This sets up an ASP.NET application with two custom middleware components.
The middleware will process all requests to the application.

Middleware/RequestTimingMiddleware.cs
  

public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger&lt;RequestTimingMiddleware&gt; _logger;

    public RequestTimingMiddleware(
        RequestDelegate next,
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
                "Request {Method} {Path} took {ElapsedMilliseconds}ms",
                context.Request.Method,
                context.Request.Path,
                stopwatch.ElapsedMilliseconds);
        }
    }
}

This middleware measures and logs the time taken to process each request.
It uses the Stopwatch class to track elapsed time before and after calling
the next middleware.

Middleware/CustomHeaderMiddleware.cs
  

public class CustomHeaderMiddleware
{
    private readonly RequestDelegate _next;

    public CustomHeaderMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.OnStarting(() =&gt;
        {
            context.Response.Headers.Add(
                "X-Custom-Header", 
                "Middleware-Example");
            return Task.CompletedTask;
        });

        await _next(context);
    }
}

This middleware adds a custom header to all responses. It demonstrates how to
modify the response after the rest of the pipeline has processed the request.

The RequestTimingMiddleware shows how to measure request processing time by
wrapping the _next call. The CustomHeaderMiddleware demonstrates response
modification using the OnStarting callback.

Middleware components are added to the pipeline in Program.cs using
UseMiddleware&lt;T&gt;(). They execute in the order they are registered,
creating a pipeline of processing steps.

## Source

[Microsoft ASP.NET Middleware Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0)

In this article, we have explored the UseMiddleware method in ASP.NET 8.
Middleware provides powerful capabilities for processing HTTP requests and
responses in a modular way.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).