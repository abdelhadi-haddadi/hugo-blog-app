+++
title = "ASP.NET UseEndpoints"
date = 2025-08-27T23:21:39.978+01:00
draft = false
description = "ASP.NET UseEndpoints tutorial shows how to use
UseEndpoints in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET UseEndpoints

last modified April 3, 2025

In this article, we explore the UseEndpoints middleware in ASP.NET 8. This
powerful feature is central to routing and endpoint configuration in modern
ASP.NET applications.

ASP.NET Core introduced endpoint routing in version 3.0, and UseEndpoints
became the primary way to define request handling pipelines. It provides
fine-grained control over routing and endpoint execution.

## Basic Definition

UseEndpoints is a middleware component in ASP.NET Core that defines the
application's request processing pipeline. It's where all routes and endpoints
are configured.

This middleware replaces the older UseMvc approach and provides better
performance and flexibility. It enables both conventional routing and
attribute routing patterns.

UseEndpoints works with endpoint routing, which separates route matching from
endpoint execution. This allows middleware to make decisions based on the
matched route.

The middleware is typically added at the end of the middleware pipeline. It
uses lambda expressions to define route patterns and their corresponding
handlers.

## ASP.NET UseEndpoints Example

The following example demonstrates a basic ASP.NET application using UseEndpoints
with various routing scenarios.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =&gt;
{
    // Simple GET endpoint
    endpoints.MapGet("/", async context =&gt;
    {
        await context.Response.WriteAsync("Welcome to our ASP.NET 8 application!");
    });

    // Route with parameter
    endpoints.MapGet("/greet/{name}", async context =&gt;
    {
        var name = context.Request.RouteValues["name"];
        await context.Response.WriteAsync($"Hello, {name}!");
    });

    // Conventional MVC-style routing
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");

    // Minimal API endpoint
    endpoints.MapGet("/products", async context =&gt;
    {
        var products = new[] { "Laptop", "Mouse", "Keyboard" };
        await context.Response.WriteAsJsonAsync(products);
    });
});

app.Run();

This example shows four different endpoint configurations using UseEndpoints.
The first is a simple root endpoint that returns a welcome message.

The second endpoint demonstrates route parameters, extracting the name from
the URL. The third shows conventional MVC routing for controllers.

The fourth endpoint is a minimal API example that returns JSON data. All these
endpoints are configured within the UseEndpoints middleware block.

Note that UseRouting must be called before UseEndpoints. UseRouting performs
route matching, while UseEndpoints executes the matched endpoint.

This approach provides centralized configuration of all application routes.
It supports various endpoint types including MVC controllers, Razor Pages,
and minimal APIs.

## Source

[Microsoft ASP.NET Core Routing Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-8.0)

In this article, we have explored the UseEndpoints middleware in ASP.NET 8.
This essential component provides flexible routing configuration for modern
web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).