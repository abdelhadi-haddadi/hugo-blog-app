+++
title = "ASP.NET ViewBag"
date = 2025-08-29T19:49:28.315+01:00
draft = false
description = "ASP.NET ViewBag tutorial shows how to pass data between controllers and views."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ViewBag

last modified October 18, 2023

In this article we show how to pass data betweeen controllers and views in 
ASP.NET with ViewBag.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

A *controller* is a class which handles an HTTP request sent from a
client. It retrieves model data and returns a response back to the client.
A *view* displays data and handles user interaction.

A ViewBag is a controller property which is used to pass data from 
controllers to views. It is used for passing weakly-typed data. ViewBag is 
suitable for passing small amounts of data in and out of controllers and views.

If we want to pass strongly-typed data, we can use viewmodel.

## ASP.NET ViewBag example

In the following example, we show how to use ViewBag.

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

We set up controllers and views.

Controller/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace ViewBagEx.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewBag.Now = DateTime.Now;

        return View();
    }

    [HttpGet("words")]
    public IActionResult Words()
    {
        var words = new List&lt;string&gt; { "red", "class", "rock", "war" };
        ViewBag.Words = words;
        
        return View();
    }
}

In the controller we have two actions. The first returns the current datetime 
and the second a list of words.

ViewBag.Now = DateTime.Now;

We set the current datetime to the ViewBag.

var words = new List&lt;string&gt; { "red", "class", "rock", "war" };
ViewBag.Words = words;

Here we set a list of strings.

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
        @ViewBag.Now
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In this view we display the current datetime. We access the bag via
@ViewBag.

Views/Home/Words.cshtml
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Words&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;ul&gt;
        @{
            foreach (var word in ViewBag.Words)
            {
                &lt;li&gt;@word&lt;/li&gt;
            }
        }
    &lt;/ul&gt;
&lt;/body&gt;
&lt;/html&gt;

In this view, we display the words in an HTML list. We go through the list of 
words in a foreach loop.

$ dotnet watch

We start the application and navigate to localhost:3000 
and localhost:3000/words.

In this article we have shown how to pass data betweeen controllers and views 
with ViewBag.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).