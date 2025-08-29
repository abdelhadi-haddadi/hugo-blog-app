+++
title = "ASP.NET controller"
date = 2025-08-29T19:48:58.609+01:00
draft = false
description = "ASP.NET controller tutorial shows how to work with controllers in ASP.NET application. A controller handles client requests, retrieves model data, and returns a response to the client."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET controller

last modified October 18, 2023

In this article we show how to work with controllers in ASP.NET application.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

Controller is a class which handles an HTTP request sent from a
client. It retrieves model data and returns a response back to the client. 

A controller is a part of the MVC pattern. The Model-View-Controller (MVC) is an
architectural pattern, which separates the application into three parts: the
model, the view, and the controller. 

The model represents data that the application processes. The view is the UI
which is sent to the client. It could be an HTML file, a PDF file, an Excel
file, or an image. The view is often created from templates, which merge model
data with static data to form a UI. The controller is the part that manages this
process.

## Controller actions

A controller exposes actions. An action is a method that is invoked in reaction
to a particular request URL pattern. The controller action must be a public
method of a controller class; it cannot be a static method.

A controller action returns an action result. ASP.NET supports several types of 
action results, including ViewResult, EmptyResult, 
RedirectResult, JsonResult,
ContentResult, and FileContentResult.

## Controller conventions

The controllers are placed in the Controllers directory by default.

app.UseEndpoints(endppoints =&gt;
{
    endppoints.MapControllerRoute(name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
});

This is the default mapping of controllers and URL patterns. 

    
        request URL
        Controller
        Action
    

    
        http://localhost
        Home
        Index
    

    
        http://localhost/Home/About
        Home
        About
    

    
        http://localhost/Product/List
        Product
        List
    

The names of the controllers end with Controller; e.g. we have HomeController or 
ProductController. The default mapping can be chaned. We can also modify the 
mappings with attributes.  

## ASP.NET controller example

The following is a simple example which has a controller.

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

In Program.cs, we set up the controller support. 

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace ControllerEx.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewBag.Message = "Home page";
        return View();
    }

    [HttpGet("about")]
    public ContentResult About()
    {
        return Content("About page\n");
    }

    [HttpGet("words")]
    public JsonResult Context()
    {
        var words = new List&lt;string&gt; { "red", "class", "rock", "war" };
        return Json(words);
    }
}

In the HomeController, we set up three actions.

public IActionResult Index()
{
    ViewBag.Message = "Home page";
    return View();
}

The Index action returns an HTML view. The view is built from the 
template inside Views/Home/Index.cshtml.

[HttpGet("about")]
public ContentResult About()
{
    return Content("About page\n");
}

This action returns a text result. It is remapped to /about URL 
with HttpGet attribute.

[HttpGet("words")]
public JsonResult Context()
{
    var words = new List&lt;string&gt; { "red", "class", "rock", "war" };
    return Json(words);
}

The third action returns a JSON result; it is mapped to /words.

Views/Home/Index.cshtml
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        @ViewBag.Message
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In the Index.cshtml view, have an HTML file to which we add dynamic 
content via the ViewBag.

$ curl localhost:3000 -i
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Wed, 28 Sep 2022 14:04:45 GMT
Server: Kestrel
Transfer-Encoding: chunked

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Home page
    &lt;/p&gt;
    
&lt;/body&gt;

For the home page, we get an HTML output.

$ curl localhost:3000/about -i
HTTP/1.1 200 OK
Content-Length: 11
Content-Type: text/plain; charset=utf-8
Date: Wed, 28 Sep 2022 14:05:42 GMT
Server: Kestrel

About page

For the about page, we get a plain text output.

$ curl localhost:3000/words -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Wed, 28 Sep 2022 14:06:08 GMT
Server: Kestrel
Transfer-Encoding: chunked

["red","class","rock","war"]

For the /words pattern, we get a JSON ouput.

In this article we have covered ASP.NET controllers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).