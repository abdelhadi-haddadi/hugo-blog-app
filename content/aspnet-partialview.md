+++
title = "ASP.NET PartialView"
date = 2025-08-27T23:21:30.680+01:00
draft = false
description = "ASP.NET PartialView tutorial shows how to use
PartialView in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET PartialView

last modified April 3, 2025

In this article, we explore PartialView in ASP.NET 8. PartialView is a powerful
feature for creating reusable UI components in ASP.NET MVC applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. PartialView helps organize complex views into smaller components.

## Basic Definition

A PartialView in ASP.NET is a special view that renders a portion of HTML content.
It's typically used to break up large views into smaller, reusable components.

PartialViews can be rendered inside other views using the Partial or
PartialAsync HTML helper methods. They support the same Razor syntax
as regular views but don't have a layout page.

PartialViews are commonly used for components like navigation menus, headers,
footers, or any UI element that appears across multiple pages. They improve
code maintainability and reduce duplication.

## ASP.NET PartialView Example

The following example demonstrates creating and using a PartialView in ASP.NET 8.

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
method enables MVC with view support. Static files middleware is added for CSS/JS.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var products = new List&lt;Product&gt;
        {
            new(1, "Laptop", 999.99m),
            new(2, "Mouse", 19.99m),
            new(3, "Keyboard", 49.99m)
        };
        
        return View(products);
    }

    public IActionResult ProductTable()
    {
        var products = new List&lt;Product&gt;
        {
            new(1, "Laptop", 999.99m),
            new(2, "Mouse", 19.99m),
            new(3, "Keyboard", 49.99m)
        };
        
        return PartialView("_ProductTable", products);
    }
}

public record Product(int Id, string Name, decimal Price);

The controller has two actions. Index returns the main view with all
products. ProductTable returns a PartialView with just the product
table component.

Views/Shared/_ProductTable.cshtml
  

@model IEnumerable&lt;Product&gt;

&lt;table class="table"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;ID&lt;/th&gt;
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

This PartialView defines a reusable product table component. It follows the
convention of starting with an underscore. The model is strongly typed to
IEnumerable&lt;Product&gt;.

Views/Home/Index.cshtml
  

@model IEnumerable&lt;Product&gt;

&lt;h1&gt;Product Catalog&lt;/h1&gt;

&lt;div class="row"&gt;
    &lt;div class="col-md-8"&gt;
        @await Html.PartialAsync("_ProductTable", Model)
    &lt;/div&gt;
    &lt;div class="col-md-4"&gt;
        &lt;h3&gt;Recently Viewed&lt;/h3&gt;
        &lt;!-- Other content --&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;button id="refreshBtn" class="btn btn-primary"&gt;Refresh Table&lt;/button&gt;

@section Scripts {
    &lt;script&gt;
        document.getElementById('refreshBtn').addEventListener('click', async () =&gt; {
            const response = await fetch('/Home/ProductTable');
            const html = await response.text();
            document.querySelector('.col-md-8').innerHTML = html;
        });
    &lt;/script&gt;
}

The main view uses PartialAsync to render the product table. The
JavaScript demonstrates refreshing just the table via AJAX, showing PartialView's
power for partial page updates.

This example shows how PartialViews enable component-based UI development. The
table can be reused across views and updated independently via AJAX calls.

## Source

[Microsoft ASP.NET PartialView Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/partial?view=aspnetcore-8.0)

In this article, we have explored PartialView in ASP.NET 8. This powerful
feature helps create modular, maintainable, and efficient web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).