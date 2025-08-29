+++
title = "ASP.NET WebHost"
date = 2025-08-29T19:49:29.469+01:00
draft = false
description = "ASP.NET WebHost tutorial shows how to use WebHost in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET WebHost

last modified April 3, 2025

In this article, we explore the WebHost in ASP.NET 8. WebHost is the foundation
for ASP.NET applications, providing essential services and configuration.

ASP.NET WebHost is responsible for application startup, lifetime management,
and hosting environment configuration. It sets up the server and request
processing pipeline.

## Basic Definition

WebHost in ASP.NET is the core component that initializes and runs a web
application. It configures services, middleware, and the server environment.

The WebHostBuilder is used to create and configure the WebHost. It follows the
builder pattern to set up services, content root, and other configurations.

WebHost provides dependency injection, logging, configuration, and HTTP server
functionality. It's the entry point for all ASP.NET Core applications.

## ASP.NET WebHost Example

The following example demonstrates creating a basic ASP.NET application using
WebHost directly in .NET 8.

Program.cs
  

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =&gt;
    {
        webBuilder.Configure(app =&gt;
        {
            app.UseRouting();
            
            app.UseEndpoints(endpoints =&gt;
            {
                endpoints.MapGet("/", async context =&gt;
                {
                    await context.Response.WriteAsync("Hello from WebHost!");
                });
                
                endpoints.MapGet("/time", async context =&gt;
                {
                    await context.Response.WriteAsync($"Current time: {DateTime.Now}");
                });
            });
        });
    })
    .Build();

await host.RunAsync();

This example shows a minimal ASP.NET application using WebHost directly. The
Host.CreateDefaultBuilder creates a host with default configurations.

ConfigureWebHostDefaults sets up the web host with default web
settings. Inside, we configure the request pipeline with routing and endpoints.

The example defines two GET endpoints: one for the root path and one for /time.
Each endpoint writes a simple response to the client. The application runs
asynchronously using RunAsync.

This approach gives you full control over the hosting environment and request
pipeline. It's useful for simple applications or when you need custom hosting.

## Source

[Microsoft ASP.NET WebHost Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-8.0)

In this article, we have explored the WebHost in ASP.NET 8. This fundamental
component provides the foundation for hosting ASP.NET applications with full
control.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).