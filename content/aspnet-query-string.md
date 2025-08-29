+++
title = "ASP.NET query string"
date = 2025-08-29T19:49:17.809+01:00
draft = false
description = "ASP.NET query string tutorial shows how to work with query strings in ASP.NET application."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET query string

last modified October 18, 2023

In this article we show how to work with query strings in ASP.NET.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

## Query strings

Query strings or query parameters are the part of a uniform resource locator
(URL) which assigns values to specified parameters. This is one way of sending
data to the destination server.

http://example.com/api/users?name=John%20Doe&amp;occupation=gardener

The query parameters are specified after the ? character. Multiple fields are
separated with the &amp;. Special characters, such as spaces, are encoded. In
the above string, the space is encoded with the %20
value

## ASP.NET query string example

In the first example, we get the query strings via the HttpRequest.
HttpRequest represents the incoming side of an individual HTTP
request.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpRequest request) =&gt;
{
    string name = request.Query["name"];
    string occupation = request.Query["occupation"];
    string msg = $"{name} is a {occupation}\n";

    return Results.Content(msg);
});

app.Run("http://localhost:3000");

In the example, we get two query strings via the HttpRequest.

string name = request.Query["name"];

We get the name query parameter using the Query
property of the request object.

$ curl 'localhost:3000?name=John%20Doe&amp;occupation=gardener'
John Doe is a gardener

## Explicit binding with FromQuery

It is possible to explicitly bind query parameters utilizing the
FromQuery attribute.

Program.cs
  

using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", ([FromQuery(Name = "name")] string? name,
                 [FromQuery(Name = "occupation")] string? occupation) =&gt;
{
    if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(occupation))
    {
        return Results.BadRequest("bad request");
    }

    string msg = $"{name} is a {occupation}\n";
    return Results.Content(msg);
});

app.Run("http://localhost:3000");

In the example, we explicitly bind two query parameters to two variables. In
addition, the query strings are mandatory.

if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(occupation))
{
    return Results.BadRequest("bad request");
}

If we do not receive values for the two parameters, we send a bad request back 
to the client.

$ curl 'localhost:3000?name=Roger%20Roe&amp;occupation=driver'
Roger Roe is a driver

For a correct request with all query parameters, we get a response.

$ curl 'localhost:3000?name=Roger%20Roe'
"bad request"

Since we did not provide the second parameter, we have received a bad request 
response.

## Automatic binding of query parameters

ASP.NET automatically binds query, form, and path parameters to types. 

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (string name, string occupation) =&gt;
{
    string msg = $"{name} is a {occupation}\n";
    return Results.Content(msg);
});

app.Run("http://localhost:3000");

In the example, we ASP.NET automatically binds the query parameters to the 
name and occupation variables.

$ curl 'localhost:3000?name=Roger%20Roe&amp;occupation=driver'
Roger Roe is a driver

## Query parameters in a view

We can get query parameters in a view via @Context.Request.Query.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endppoints =&gt;
{
    endppoints.MapDefaultControllerRoute();
});

app.Run("http://localhost:3000");

We set up an ASP.NET application with controllers and views.

Controllers/Home/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace QueryStringEx.Controllers;

public class HomeController : Controller
{
    [HttpGet("/")]
    public IActionResult Home()
    {
        return View();
    }
}

In the controller, we have a single mapping that returns a view for the home
page.

Views/Home/Home.cshtml
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        @Context.Request.Query["name"] is a @Context.Request.Query["occupation"]
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In the view, we refer to two query parameters.

$ curl 'localhost:3000?name=Roger%20Roe&amp;occupation=driver'
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Roger Roe is a driver
    &lt;/p&gt;
    
&lt;/body&gt;

We create a GET request with two query parameters and receive an HTML output.

In this article we worked with query strings in ASP.NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).