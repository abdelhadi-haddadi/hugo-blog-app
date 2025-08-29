+++
title = "ASP.NET UseRouting"
date = 2025-08-29T19:49:27.171+01:00
draft = false
description = "ASP.NET UseRouting tutorial shows how to use UseRouting in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET UseRouting

last modified April 3, 2025

In this article, we explore the UseRouting middleware in ASP.NET 8. This
component is fundamental for request routing in ASP.NET Core applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. UseRouting enables endpoint routing, a powerful routing system.

## Basic Definition

UseRouting is middleware that matches incoming HTTP requests to endpoints. It
is typically placed early in the middleware pipeline to enable routing.

Endpoint routing was introduced in ASP.NET Core 3.0 as a replacement for the
older routing system. It provides better performance and more flexibility.

UseRouting works by examining the request and determining which endpoint should
handle it. It doesn't execute the endpoint - that happens later in the pipeline.

## ASP.NET UseRouting Example

The following example demonstrates a basic ASP.NET application using UseRouting.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =&gt;
{
    endpoints.MapGet("/", async context =&gt;
    {
        await context.Response.WriteAsync("Hello from the root endpoint!");
    });

    endpoints.MapGet("/products", async context =&gt;
    {
        await context.Response.WriteAsync("List of products will be here");
    });

    endpoints.MapGet("/products/{id:int}", async context =&gt;
    {
        var id = context.Request.RouteValues["id"];
        await context.Response.WriteAsync($"Product details for ID: {id}");
    });
});

app.Run();

This example shows a minimal ASP.NET application with three endpoints. The
UseRouting call enables the routing system for the application.

The UseEndpoints middleware is where we define our endpoints. Each
MapGet call creates a route that responds to HTTP GET requests.

The first endpoint handles requests to the root path ("/"). The second handles
"/products". The third shows route parameter binding with "{id:int}".

The route parameter "{id:int}" includes a route constraint that ensures the id
parameter must be convertible to an integer. This provides built-in validation.

Note that UseRouting must come before UseEndpoints in the middleware pipeline.
This ordering is crucial for the routing system to work correctly.

## Source

[Microsoft ASP.NET Core Routing Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-8.0)

In this article, we have explored the UseRouting middleware in ASP.NET 8. This
essential component enables powerful request routing capabilities in web apps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).