+++
title = "ASP.NET plain text"
date = 2025-08-27T23:21:30.675+01:00
draft = false
description = "ASP.NET plain text tutorial shows how to serve plain text in ASP.NET application."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET plain text

last modified October 18, 2023

In this article we show how to serve plain text in an ASP.NET application.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

## Content type

Content type, or media type, is a string sent along with a file indicating the
type of the file. It describes the content format; for example, an HTML file
might be labeled text/html, or an image file as image/png). It serves the same
purpose as filename extensions on Windows.

The content-type header values is used to indicate the
media type of the resource. The text/plain; charset=utf-8 is used
for text files.

## ASP.NET plain text example

The easiest way to return plain text is with lambda expressions.

$ dotnet new web --no-https -o PlainTextEx

We create a new ASP.NET web application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =&gt; "home page\n");
app.MapGet("/about", () =&gt; Results.Content("about page\n"));
app.MapGet("/contact", () =&gt; "contact page\n");

app.Run("http://localhost:3000");

We have three mappings. The mappings use lambdas.

app.MapGet("/", () =&gt; "home page\n");

In the first mapping, we send a string. ASP.NET automatically sets the status
code and the content type.

app.MapGet("/about", () =&gt; Results.Content("about page\n"));

We can also use the Results.Content helper for a more explicit
intent.

$ dotnet watch

We start the application.

$ curl localhost:3000 -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Sep 2022 10:28:43 GMT
Server: Kestrel
Transfer-Encoding: chunked

home page
$ curl localhost:3000/about -i
HTTP/1.1 200 OK
Content-Length: 11
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Sep 2022 10:25:54 GMT
Server: Kestrel

about page
$ curl localhost:3000/contact -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Sep 2022 10:29:00 GMT
Server: Kestrel
Transfer-Encoding: chunked

contact page

We create GET requests with curl.

## ASP.NET plain text example II

In the second example, we send plain text response from a controller.

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

In Program.cs, we set up the controllers.

Controllers/Home/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace PlainTextEx.Controllers;

public class HomeController : Controller
{
    [Produces("text/plain")]
    [HttpGet("/")]
    public IActionResult Home()
    {
        string msg = "home page\n";

        return Ok(msg);
    }

    [HttpGet("about")]
    public ContentResult About()
    {
        return Content("about page\n");
    }
}

We have two action methods.

[Produces("text/plain")]
[HttpGet("/")]
public IActionResult Home()
{
    string msg = "home page\n";

    return Ok(msg);
}

With Produces attribute, we set the content type. We put the message 
into the Ok method, which sets the OK status code.

[HttpGet("about")]
public ContentResult About()
{
    return Content("about page\n");
}

Alternatively, we can also use the ContentResult and
Content to produce plaint text response.

$ curl localhost:3000 -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Sep 2022 10:22:49 GMT
Server: Kestrel
Transfer-Encoding: chunked

home page

We generate a GET request to the home page.

$ curl localhost:3000/about -i
HTTP/1.1 200 OK
Content-Length: 11
Content-Type: text/plain; charset=utf-8
Date: Tue, 27 Sep 2022 10:23:39 GMT
Server: Kestrel

about page

We generate a GET request to the about page.

In this article we have shown how to serve plain text in an ASP.NET application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).