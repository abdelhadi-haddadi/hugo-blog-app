+++
title = "ASP.NET CreateBuilder"
date = 2025-08-27T23:21:13.427+01:00
draft = false
description = "ASP.NET CreateBuilder tutorial shows how to use
CreateBuilder in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET CreateBuilder

last modified April 3, 2025

In this article, we explore the WebApplication.CreateBuilder method in ASP.NET 8.
This method is fundamental for configuring and launching ASP.NET applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. CreateBuilder simplifies application configuration and startup.

## Basic Definition

WebApplication.CreateBuilder is a factory method that creates a WebApplicationBuilder
instance. This builder pattern is the modern way to configure ASP.NET apps.

The builder provides access to configuration, services, logging, and hosting
settings. It replaces the traditional Startup class in ASP.NET Core.

CreateBuilder sets up sensible defaults for web apps, including Kestrel server,
configuration sources, and logging. It's the entry point for most ASP.NET apps.

## ASP.NET CreateBuilder Example

The following example demonstrates a basic ASP.NET application using CreateBuilder.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

This code sets up a complete ASP.NET Web API application. The CreateBuilder method
initializes the application with default configuration and services.

The builder.Services property is used to register services in the dependency
injection container. Here we add controllers, API explorer, and Swagger.

After building the app with builder.Build(), we configure the HTTP pipeline.
Middleware components are added for development tools, HTTPS, and authorization.

MapControllers enables attribute routing for controller actions. Finally,
app.Run() starts the application and begins listening for requests.

This minimal API approach reduces boilerplate while providing full functionality.
The entire application configuration is contained in a single file.

## Source

[Microsoft ASP.NET Core Fundamentals Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/?view=aspnetcore-8.0)

In this article, we have explored the CreateBuilder method in ASP.NET 8. This
modern approach simplifies application configuration while maintaining flexibility.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).