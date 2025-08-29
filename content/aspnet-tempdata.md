+++
title = "ASP.NET TempData"
date = 2025-08-29T19:49:24.912+01:00
draft = false
description = "ASP.NET TempData tutorial shows how to use TempData in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET TempData

last modified April 3, 2025

In this article, we explore TempData in ASP.NET 8. TempData is a dictionary
object used to pass data between controllers and views during redirects.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. TempData provides a simple way to maintain state between requests.

## Basic Definition

TempData is a property of ControllerBase class in ASP.NET. It stores data
temporarily between two consecutive requests. The data is available only until
it's read or the request completes.

TempData uses session state behind the scenes but is specifically designed for
redirect scenarios. It's commonly used to pass messages or small data between
actions during a redirect.

Unlike ViewData and ViewBag, TempData persists for an additional request. It's
implemented using either cookies or session state, depending on configuration.

## ASP.NET TempData Example

The following example demonstrates using TempData to pass a success message
between actions during a form submission and redirect.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSession(); // Required for TempData

var app = builder.Build();

app.UseSession(); // Required for TempData
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();

This sets up a basic ASP.NET MVC application with session support. The
AddSession and UseSession calls are required for
TempData to work properly.

Controllers/ProductController.cs
  

using Microsoft.AspNetCore.Mvc;

public class ProductController : Controller
{
    private static List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m)
    };

    public IActionResult Index()
    {
        return View(_products);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        if (!ModelState.IsValid)
        {
            return View(product);
        }

        product.Id = _products.Max(p =&gt; p.Id) + 1;
        _products.Add(product);

        TempData["SuccessMessage"] = $"Product {product.Name} created successfully!";
        return RedirectToAction(nameof(Index));
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates TempData usage. After creating a product, we store
a success message in TempData before redirecting to the Index action.

Views/Product/Index.cshtml
  

@model List&lt;Product&gt;

@if (TempData["SuccessMessage"] != null)
{
    &lt;div class="alert alert-success"&gt;
        @TempData["SuccessMessage"]
    &lt;/div&gt;
}

&lt;h2&gt;Products&lt;/h2&gt;
&lt;table class="table"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Id&lt;/th&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        @foreach (var product in Model)
        {
            &lt;tr&gt;
                &lt;td&gt;@product.Id&lt;/td&gt;
                &lt;td&gt;@product.Name&lt;/td&gt;
                &lt;td&gt;@product.Price.ToString("C")&lt;/td&gt;
            &lt;/tr&gt;
        }
    &lt;/tbody&gt;
&lt;/table&gt;

The view checks for a TempData message and displays it if present. The message
will be available only for the next request after being set.

TempData is particularly useful for Post-Redirect-Get (PRG) patterns. It helps
avoid form resubmission issues while still providing feedback to the user.

In this example, the success message will be displayed exactly once. If the
page is refreshed, the message won't appear again because TempData is cleared
after being read.

## Source

[Microsoft ASP.NET TempData Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/temp-data?view=aspnetcore-8.0)

In this article, we have explored TempData in ASP.NET 8. This powerful feature
simplifies passing data between actions during redirects while maintaining
clean application flow.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).