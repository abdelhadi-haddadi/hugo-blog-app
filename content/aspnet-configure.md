+++
title = "ASP.NET Configure"
date = 2025-08-27T23:21:11.088+01:00
draft = false
description = "ASP.NET Configure tutorial shows how to use
Configure in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Configure

last modified April 3, 2025

In this article, we explore the Configure method in ASP.NET 8. This method is
essential for setting up the HTTP request pipeline in ASP.NET applications.

The Configure method defines how the application responds to HTTP requests. It
allows adding middleware components to handle requests and responses.

## Basic Definition

The Configure method in ASP.NET is part of the application startup process. It
is called by the runtime after ConfigureServices to set up the request pipeline.

This method takes an IApplicationBuilder parameter and optional others like
IWebHostEnvironment. It's where you add middleware components in sequence.

Middleware components handle requests and responses in ASP.NET. They can perform
operations like authentication, routing, and static file serving.

## ASP.NET Configure Example

The following example demonstrates a basic Configure method setup in ASP.NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This example shows a typical Configure setup in ASP.NET 8. The pipeline starts
with exception handling and HTTPS redirection for production environments.

UseStaticFiles enables serving static files like CSS and JavaScript.
UseRouting and UseAuthorization set up routing and
authentication middleware.

The MapControllerRoute method defines the default route pattern
for MVC controllers. The order of middleware registration is crucial as it
determines the processing sequence.

Custom Middleware Example
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =&gt;
{
    // Logic before the next middleware
    Console.WriteLine($"Request started: {context.Request.Path}");
    await next.Invoke();
    // Logic after the next middleware
    Console.WriteLine($"Request completed: {context.Response.StatusCode}");
});

app.Use(async (context, next) =&gt;
{
    if (context.Request.Path.StartsWithSegments("/admin"))
    {
        context.Response.StatusCode = 403;
        await context.Response.WriteAsync("Forbidden");
        return;
    }
    await next();
});

app.MapGet("/", () =&gt; "Hello World!");

app.Run();

This example demonstrates custom middleware in the Configure pipeline. The first
middleware logs request start and completion times.

The second middleware checks for admin paths and returns a 403 Forbidden response
if matched. Custom middleware gives fine-grained control over request handling.

The MapGet method adds a simple endpoint that responds to GET
requests at the root path. This shows how to mix middleware and endpoint routing.

## Source

[Microsoft ASP.NET Middleware Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0)

In this article, we have explored the Configure method in ASP.NET 8. This
powerful feature allows building flexible request processing pipelines.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).