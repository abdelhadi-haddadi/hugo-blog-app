+++
title = "ASP.NET MapGet"
date = 2025-08-29T19:49:13.283+01:00
draft = false
description = "ASP.NET MapGet tutorial shows how to map GET requests to handlers in ASP.NET."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET MapGet

last modified October 18, 2023

In this article we show how to map GET requests to handlers in ASP.NET.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data. 

GET requests:

    - should only be used to request a resource

    - parameters are displayed in the URL

    - can be cached

    - remain in the browser history

    - can be bookmarked

    - should never be used when dealing with sensitive data

    - have length limits

The MapGet method adds a RouteEndpoint to the endpoint
builder that matches HTTP GET requests for the specified pattern.

## ASP.NET MapGet example

The following is a simple MapGet example.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =&gt; "home page\n");
app.MapGet("/about", () =&gt; "about page\n");

app.Run("http://localhost:3000");

We map two endpoints with MapGet. 

app.MapGet("/", () =&gt; "home page\n");

With MapGet, we map the lambda expression to the /
path.

app.Run("http://localhost:3000");

The application listens on port 3000.

$ curl localhost:3000
home page
$ curl localhost:3000/about
about page

We generate two GET requests.

$ curl localhost:3000 -X POST -i
HTTP/1.1 405 Method Not Allowed
Content-Length: 0
Date: Wed, 28 Sep 2022 11:33:34 GMT
Server: Kestrel
Allow: GET

$ curl localhost:3000/about -X POST -i
HTTP/1.1 405 Method Not Allowed
Content-Length: 0
Date: Wed, 28 Sep 2022 11:33:39 GMT
Server: Kestrel
Allow: GET

However, the POST requests are not allowed.

## ASP.NET MapGet example II

In the next example, we map two endpoints to local functions.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", homePage);
app.MapGet("/about", aboutPage);

app.Run("http://localhost:3000");

string homePage() =&gt; "home page\n";
string aboutPage() =&gt; "about page\n";

We have two endpoints.

app.MapGet("/", homePage);
app.MapGet("/about", aboutPage);

We map the two endpoints to two local functions.

Program.cs
  

using var client = new HttpClient();
var content = await client.GetStringAsync("http://localhost:3000/about");

Console.WriteLine(content);

We create a C# console application which sends a GET request to one of the
endpoints. We use the HttpClient class.

$ dotnet run 
about page

We run the console application and receive a response from the ASP.NET
application.

In this article we have shown how to map GET requests with MapGet in ASP.NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).