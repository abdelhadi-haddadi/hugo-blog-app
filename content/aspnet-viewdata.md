+++
title = "ASP.NET ViewData"
date = 2025-08-27T23:21:43.644+01:00
draft = false
description = "ASP.NET ViewData tutorial shows how to use ViewData in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ViewData

last modified April 3, 2025

In this article, we explore the ViewData dictionary in ASP.NET 8. ViewData is
a fundamental mechanism for passing data from controllers to views in MVC apps.

ASP.NET MVC provides several ways to transfer data between controllers and views.
ViewData is one of the simplest and most straightforward approaches available.

## Basic Definition

ViewData is a dictionary object derived from ViewDataDictionary class. It allows
passing data from a controller to a view during the request-response cycle.

The ViewData dictionary uses string keys to store and retrieve data. The data is
accessible only during the current request and is cleared when the request ends.

ViewData requires typecasting when retrieving values since it stores objects.
It's ideal for small amounts of data that don't need complex model binding.

## ASP.NET ViewData Example

The following example demonstrates how to use ViewData in an ASP.NET MVC app.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();

This sets up a basic ASP.NET MVC application. The AddControllersWithViews
method enables MVC with view support. The default route maps to HomeController.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["Title"] = "Welcome to our Store";
        ViewData["Message"] = "Today's special offers:";
        
        var products = new List&lt;string&gt; 
        { 
            "Laptop - 15% off", 
            "Smartphone - 10% off", 
            "Headphones - 20% off" 
        };
        
        ViewData["Products"] = products;
        ViewData["DiscountDate"] = DateTime.Now.AddDays(1);
        
        return View();
    }
}

The controller sets several ViewData values: a title string, a message string,
a list of products, and a discount expiration date. These values will be
accessible in the corresponding view.

Views/Home/Index.cshtml
  

@{
    Layout = "_Layout";
}

&lt;h2&gt;@ViewData["Title"]&lt;/h2&gt;
&lt;p&gt;@ViewData["Message"]&lt;/p&gt;

&lt;ul&gt;
@foreach (var product in (List&lt;string&gt;)ViewData["Products"])
{
    &lt;li&gt;@product&lt;/li&gt;
}
&lt;/ul&gt;

&lt;p&gt;
    Offers valid until: 
    @(((DateTime)ViewData["DiscountDate"]).ToString("MMMM dd, yyyy"))
&lt;/p&gt;

The view retrieves and displays all ViewData values. Note the explicit casting
required for the list of products and the DateTime value. The title and message
are displayed directly.

This example shows ViewData's flexibility in handling different data types.
However, remember that ViewData values are not strongly typed, which can lead
to runtime errors if casting is incorrect.

## Source

[Microsoft ASP.NET MVC Views Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-8.0)

In this article, we have explored the ViewData dictionary in ASP.NET 8. This
simple yet powerful feature enables easy data transfer between controllers and views.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).