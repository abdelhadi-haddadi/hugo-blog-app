+++
title = "ASP.NET URL"
date = 2025-08-29T19:49:24.892+01:00
draft = false
description = "ASP.NET URL tutorial shows how to work with URLs in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET URL

last modified April 3, 2025

In this article, we explore URL handling in ASP.NET 8. URLs are fundamental to
web applications for routing and resource identification.

ASP.NET provides powerful tools for working with URLs, including generation,
parsing, and routing. Proper URL handling is crucial for SEO and user experience.

## Basic Definition

A URL (Uniform Resource Locator) is a reference to a web resource. In ASP.NET,
URLs are used to route requests to controller actions and views.

ASP.NET 8 offers several ways to work with URLs, including the IUrlHelper service
and various URL generation methods. These tools help create maintainable links.

URLs in ASP.NET can contain route parameters, query strings, and fragments. The
framework provides safe ways to construct and manipulate these components.

## ASP.NET URL Example

The following example demonstrates URL generation and handling in an ASP.NET 8
application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up a basic ASP.NET MVC application with default routing. The
MapControllerRoute method defines the URL pattern for requests.

Controllers/ProductController.cs
  

using Microsoft.AspNetCore.Mvc;

public class ProductController : Controller
{
    public IActionResult Index()
    {
        // Generate URL to another action
        var detailsUrl = Url.Action("Details", "Product", new { id = 42 });
        ViewBag.DetailsUrl = detailsUrl;
        
        return View();
    }

    public IActionResult Details(int id)
    {
        // Get current URL information
        var currentUrl = $"{Request.Scheme}://{Request.Host}{Request.Path}";
        var queryString = Request.QueryString.HasValue ? 
            Request.QueryString.Value : string.Empty;

        ViewBag.CurrentUrl = currentUrl;
        ViewBag.QueryParams = Request.Query;
        
        return View();
    }

    public IActionResult Search(string term)
    {
        // Generate URL with query parameters
        var searchUrl = Url.Action("Search", "Product", new { term = "aspnet" });
        ViewBag.SearchUrl = searchUrl;
        
        return View();
    }
}

This controller demonstrates three aspects of URL handling. The Index action
shows URL generation using Url.Action to create links to other actions.

The Details action shows how to access current URL information from the request.
This includes scheme, host, path, and query string components.

The Search action demonstrates generating URLs with query parameters. The
Url.Action method automatically encodes values for URL safety.

Views/Product/Index.cshtml
  

@{
    ViewData["Title"] = "Products";
}

&lt;h2&gt;Product Listing&lt;/h2&gt;

&lt;p&gt;
    &lt;a href="@ViewBag.DetailsUrl"&gt;View Product 42 Details&lt;/a&gt;
&lt;/p&gt;

&lt;p&gt;
    &lt;a href="@Url.Action("Search", "Product", new { term = "net8" })"&gt;
        Search for .NET 8 products
    &lt;/a&gt;
&lt;/p&gt;

The view shows two ways to generate URLs in Razor views. The first uses a
pre-generated URL from ViewBag, while the second uses Url.Action.

This example covers the essential aspects of URL handling in ASP.NET 8,
including generation, access to current URL data, and query parameter handling.

## Source

[Microsoft ASP.NET Routing Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-8.0)

In this article, we have explored URL handling in ASP.NET 8. Proper URL
management is crucial for building maintainable and SEO-friendly web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).