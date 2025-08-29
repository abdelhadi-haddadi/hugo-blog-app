+++
title = "ASP.NET Program"
date = 2025-08-27T23:21:31.790+01:00
draft = false
description = "ASP.NET Program tutorial shows how to use Program in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Program

last modified April 3, 2025

In this article, we explore the Program class in ASP.NET 8. This class serves
as the entry point for ASP.NET applications and configures the web host.

The Program class in .NET 8 follows the minimal API approach, providing a
streamlined way to bootstrap applications. It replaces the traditional Startup
class pattern from earlier versions.

## Basic Definition

The Program class in ASP.NET is the entry point that configures and runs the
web application. It creates a WebApplicationBuilder instance to set up services.

In .NET 8, the Program class typically uses top-level statements, eliminating
explicit Main method declaration. This makes the code more concise while
maintaining functionality.

The Program class handles dependency injection configuration, middleware
pipeline setup, and application startup. It's the foundation of every ASP.NET
Core application.

## ASP.NET Program Example

The following example demonstrates a complete ASP.NET 8 Program class
configuration with various features.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/hello", () =&gt; "Hello World!");

app.MapGet("/products", () =&gt; 
{
    var products = new[]
    {
        new { Id = 1, Name = "Laptop", Price = 999.99m },
        new { Id = 2, Name = "Mouse", Price = 19.99m }
    };
    return Results.Ok(products);
});

app.Run();

public partial class Program { }

This Program.cs file demonstrates several key ASP.NET 8 features. The
WebApplicationBuilder is created first to configure services and the app.

The example shows service registration for controllers, API explorer, and
Swagger. The development environment check enables Swagger only during
development.

The HTTP pipeline is configured with HTTPS redirection and authorization.
MapControllers enables conventional routing for controller actions.

Two minimal API endpoints are defined directly in Program.cs. The first
returns a simple string, while the second returns a product array as JSON.

The partial Program class declaration at the end enables integration testing.
This is a common pattern in ASP.NET Core applications.

## Source

[Microsoft ASP.NET Core Fundamentals Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/?view=aspnetcore-8.0)

In this article, we have explored the Program class in ASP.NET 8. This
central component configures and launches ASP.NET applications with minimal
boilerplate code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).