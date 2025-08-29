+++
title = "ASP.NET OutputCache"
date = 2025-08-27T23:21:29.585+01:00
draft = false
description = "ASP.NET OutputCache tutorial shows how to use
OutputCache in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET OutputCache

last modified April 3, 2025

In this article, we explore the OutputCache feature in ASP.NET 8. This powerful
caching mechanism improves application performance by storing page output.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. OutputCache reduces server load by serving cached content.

## Basic Definition

OutputCache in ASP.NET stores the rendered output of pages or user controls. When
subsequent requests arrive, cached content is served instead of reprocessing.

This significantly improves response times and reduces server resource usage. It's
particularly useful for content that changes infrequently but is requested often.

OutputCache can be configured at different levels: page, control, or action. It
supports various cache locations: server, client, or both. Cache duration is
configurable in seconds.

## ASP.NET OutputCache Example

The following example demonstrates using OutputCache in an ASP.NET Core MVC
application. We'll cache a product listing page for 60 seconds.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddOutputCache(options =&gt;
{
    options.AddPolicy("ProductCache", builder =&gt; 
    {
        builder.Expire(TimeSpan.FromSeconds(60));
        builder.SetVaryByQuery("category");
    });
});

var app = builder.Build();

app.UseOutputCache();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up the OutputCache middleware with a custom cache policy. The policy
defines a 60-second expiration and varies cache by the "category" query parameter.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

public class ProductsController : Controller
{
    private static List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", "Electronics"),
        new Product(2, "Chair", "Furniture"),
        new Product(3, "Smartphone", "Electronics"),
        new Product(4, "Table", "Furniture")
    };

    [OutputCache(PolicyName = "ProductCache")]
    public IActionResult Index(string category)
    {
        var filteredProducts = string.IsNullOrEmpty(category) 
            ? _products 
            : _products.Where(p =&gt; p.Category == category).ToList();
            
        ViewBag.LastGenerated = DateTime.Now.ToString("HH:mm:ss");
        return View(filteredProducts);
    }
}

public record Product(int Id, string Name, string Category);

The controller action is decorated with the OutputCache attribute using our
"ProductCache" policy. The action filters products by category if provided.

Views/Products/Index.cshtml
  

@model List&lt;Product&gt;

&lt;h2&gt;Product List&lt;/h2&gt;
&lt;p&gt;Last generated: @ViewBag.LastGenerated&lt;/p&gt;

&lt;div class="categories"&gt;
    &lt;a href="/Products"&gt;All&lt;/a&gt;
    &lt;a href="/Products?category=Electronics"&gt;Electronics&lt;/a&gt;
    &lt;a href="/Products?category=Furniture"&gt;Furniture&lt;/a&gt;
&lt;/div&gt;

&lt;ul&gt;
@foreach (var product in Model)
{
    &lt;li&gt;@product.Name - @product.Category&lt;/li&gt;
}
&lt;/ul&gt;

The view displays the product list along with the generation time. The time
stamp helps verify caching is working (it won't change during cache duration).

When you run this application and navigate to /Products, the page will be cached
for 60 seconds. The cache will store separate versions for different categories.

OutputCache significantly improves performance for frequently accessed pages. The
example shows how to implement basic caching with varying by query parameters.

## Source

[Microsoft ASP.NET OutputCache Documentation](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/output?view=aspnetcore-8.0)

In this article, we have explored the OutputCache feature in ASP.NET 8. This
powerful caching mechanism can dramatically improve application performance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).