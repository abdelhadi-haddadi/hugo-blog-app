+++
title = "ASP.NET Run"
date = 2025-08-29T19:49:21.573+01:00
draft = false
description = "ASP.NET Run tutorial shows how to use Run in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Run

last modified April 3, 2025

In this article, we explore the Run method in ASP.NET 8. This method is crucial
for starting the application and handling HTTP requests in the ASP.NET pipeline.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Run method is the final step in configuring the request pipeline.

## Basic Definition

The Run method in ASP.NET is an extension method that adds a terminal middleware
to the application's request pipeline. It processes all requests that reach it.

Unlike other middleware components, Run doesn't have a next parameter. This means
it's the final step in the pipeline and doesn't call subsequent middleware.

Run is typically used at the end of the middleware chain to handle requests that
weren't processed by previous middleware. It's commonly used for simple apps.

## ASP.NET Run Example

The following example demonstrates the basic usage of Run in an ASP.NET app.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =&gt;
{
    await context.Response.WriteAsync("Middleware 1 processing...\n");
    await next();
});

app.Run(async context =&gt;
{
    await context.Response.WriteAsync("Terminal middleware handling request\n");
    await context.Response.WriteAsync($"Request path: {context.Request.Path}\n");
});

app.Run();

This example shows a simple ASP.NET application with two middleware components.
The first middleware writes a message and calls the next middleware in the chain.

The Run middleware is terminal - it writes a message and the request path to the
response. No middleware after Run will execute for matching requests.

The final app.Run() starts the application and begins listening for
incoming HTTP requests. This is different from the middleware Run method.

Here's another example showing how Run can be used to handle specific routes:

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Map("/hello", helloApp =&gt;
{
    helloApp.Run(async context =&gt;
    {
        await context.Response.WriteAsync("Hello from the /hello route!\n");
    });
});

app.Map("/time", timeApp =&gt;
{
    timeApp.Run(async context =&gt;
    {
        await context.Response.WriteAsync($"Current time: {DateTime.Now}\n");
    });
});

app.Run(async context =&gt;
{
    context.Response.StatusCode = 404;
    await context.Response.WriteAsync("Not found. Try /hello or /time\n");
});

app.Run();

This example demonstrates route-specific terminal middleware using Map with Run.
Each mapped route has its own terminal middleware that handles requests.

The final Run middleware acts as a catch-all for unmatched routes, returning a
404 status. This pattern is useful for simple applications without controllers.

## Source

[Microsoft ASP.NET Middleware Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-8.0)

In this article, we have explored the Run method in ASP.NET 8. This essential
component helps build request processing pipelines in ASP.NET applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).