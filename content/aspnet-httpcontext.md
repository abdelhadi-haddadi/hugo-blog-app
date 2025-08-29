+++
title = "ASP.NET HttpContext"
date = 2025-08-27T23:21:19.484+01:00
draft = false
description = "ASP.NET HttpContext tutorial shows how to
retrieve HTTP data via HttpContext."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpContext

last modified October 18, 2023

In this article we show how to retrieve HTTP specific data via HttpContext in
an ASP.NET application.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

Minimal APIs provide a way of creating HTTP APIs with minimal dependencies. They
are ideal for microservices and learning about web programming. With minimal
APIs, we can quickly create a new web application and test our code.

The HttpContext contains all HTTP-specific information about an
individual HTTP request. We can get information about the request, response,
user, or the session.

## ASP.NET HttpContext example

The following example uses HttpContext to get some information
about the request.

$ dotnet new web --no-https -o HttpContextEx

We create a new ASP.NET web application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/ctx", (HttpContext context) =&gt; context.Response.WriteAsync("HTTP Context\n"));
app.MapGet("/ctx2", (HttpContext context) =&gt;
{
    var method = context.Request.Method;
    var host = context.Request.Host;
    var ua = context.Request.Headers["User-Agent"];

    context.Response.WriteAsync($"{method} {host} {ua}\n");
});

app.MapGet("/ctx3", (HttpContext context) =&gt;
{
    string name = context.Request.Query["name"];
    string occupation = context.Request.Query["occupation"];
    context.Response.WriteAsync($"{name} is a {occupation}\n");
});

app.Run("http://localhost:3000");

We map three endpoints in which we use the HttpContext.

app.MapGet("/ctx", (HttpContext context) =&gt; context.Response.WriteAsync("HTTP Context\n"));

For the /ctx path, we simply write a message back to the client
with WriteAsync.

app.MapGet("/ctx2", (HttpContext context) =&gt;
{
    var method = context.Request.Method;
    var host = context.Request.Host;
    var ua = context.Request.Headers["User-Agent"];

    context.Response.WriteAsync($"{method} {host} {ua}\n");
});

For the /ctx2 path, we get retrieve the request method, host, and
User-Agent header. We build a message using this information and
send it to the client.

app.MapGet("/ctx3", (HttpContext context) =&gt;
{
    string name = context.Request.Query["name"];
    string occupation = context.Request.Query["occupation"];
    context.Response.WriteAsync($"{name} is a {occupation}\n");
});

In the third case, we retrieve the GET queries.

$ dotnet watch

We start the application. The application listens on port 3000. We will use the
curl tool to generate requests to our application.

$ curl localhost:3000/ctx
HTTP Context

We generate a GET request to the first URL.

$ curl localhost:3000/ctx2
GET localhost:3000 curl/7.81.0

We send a GET request to the second URL.

$ curl 'localhost:3000/ctx3?name=John%20Doe&amp;occupation=gardener'
John Doe is a gardener

In the third case, we add some query data to the URL.

## ASP.NET HttpContext example II

In the second example, we use HttpContext in a controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =&gt;
{
    endpoints.MapControllers();
});

app.Run("http://localhost:3000");

We set up the controllers.

Controllers/Home/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    [HttpGet("/")]
    [Produces("text/plain")]
    public IActionResult Index()
    {
        string method = HttpContext.Request.Method;
        string host = HttpContext.Request.Host.ToString();
        string ua = HttpContext.Request.Headers["User-Agent"];

        string msg = $"{method} {host} {ua}\n";
        return Ok(msg);
    }
}

For the home page, we get the request method, host, and the user agent. The
action returns a plain text message to the client.

string method = HttpContext.Request.Method;

The HttpContext.Request.Method returns the request method.

$ dotnet watch

We start the application.

$ curl localhost:3000
GET localhost:3000 curl/7.81.0

We generate a GET request to the home page.

In this article we have used HttpContext to retrieve HTTP-specific data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).