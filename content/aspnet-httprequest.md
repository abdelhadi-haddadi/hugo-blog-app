+++
title = "ASP.NET HttpRequest"
date = 2025-08-27T23:21:21.822+01:00
draft = false
description = "ASP.NET HttpRequest tutorial shows how to use HttpRequest in ASP.NET application."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HttpRequest

last modified October 18, 2023

In this article we show how to work with HttpRequest in ASP.NET.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

## HTTP request

An HTTP request is created by a client (such as browser or C# program) to a
specified host. The goal of a request is to get a resource. The host responds
with an HTTP response. HTTP request and response are defined by the HTTP
protocol.

The information about the resource is given in the URL.

An HTTP request consists of three parts:

    - a request line

    - HTTP headers

    - an optional body

The request line is the first line in the request message.

GET /data/book.html HTTP/1.1

The request line contains the HTTP method type, the path to the resource, and 
the HTTP version number. 

The HTTP headers provide metadata information about the message; for instance, 
the user client, the host, the accepted language or caching control.

If we want to post some data to the host, we can place it inside the body of the 
request message.

HttpRequest represents an individual HTTP request received from a
client. The type contains properties to get request host, body, headers, scheme,
path or method. It is located in the Microsoft.AspNetCore.Http
namespace.

## ASP.NET HttpRequest example

The following example uses HttpContext with Minimal API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/{*.}", (HttpRequest request) =&gt;
{
    string host = request.Host.Host;
    string method = request.Method;
    string path = request.Path;

    string ua = request.Headers.UserAgent;

    return Results.Content($"{host} {method} {path} {ua}");
});

app.Run("http://localhost:3000");

In the example, we map all GET requests to the lambda expression. 

app.MapGet("/{*.}", (HttpRequest request) =&gt;

We have the HttpRequest as a parameter to the lambda.

string host = request.Host.Host;
string method = request.Method;
string path = request.Path;

string ua = request.Headers.UserAgent;

We get the various information via the properties of the request object.

$ curl localhost:3000/users -H 'Content-Type: plain/text'
localhost GET /users curl/7.81.0

We create an HTTP request with the curl tool.

Next, we create an HTTP request from a C# program.

Program.cs
  

var url = "http://localhost:3000/hello";

using var client = new HttpClient();

var msg = new HttpRequestMessage(HttpMethod.Get, url);
msg.Headers.Add("User-Agent", "C# program");
var res = await client.SendAsync(msg);

var content = await res.Content.ReadAsStringAsync();

Console.WriteLine(content);

To create an HTTP request, we utilize the HttpClient.

var msg = new HttpRequestMessage(HttpMethod.Get, url);

From the client side, we create an HTTP request
withHttpRequestMessage.

msg.Headers.Add("User-Agent", "C# program");

We add a header using the Headers property.

$ dotnet run
localhost GET /hello C# program

## ASP.NET HttpRequest MVC example

In the next example, we access the request object in the controller.

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

We set up the controller support.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    [HttpGet("/{*.}")]
    [Produces("text/plain")]
    public IActionResult Index()
    {
        string method = HttpContext.Request.Method;
        string host = HttpContext.Request.Host.ToString();
        string path = HttpContext.Request.Path;
        string ua = HttpContext.Request.Headers["User-Agent"];

        string msg = $"{method} {host} {path} {ua}\n";
        return Ok(msg);
    }
}

Within the controller's Index action, we get the request object 
via the HttpContext.

In this article we have worked with HttpRequest in ASP.NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).