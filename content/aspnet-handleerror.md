+++
title = "ASP.NET HandleError"
date = 2025-08-27T23:21:18.387+01:00
draft = false
description = "ASP.NET HandleError tutorial shows how to implement error handling in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET HandleError

last modified April 3, 2025

In this article, we explore error handling in ASP.NET 8 using HandleError. 
Proper error handling is crucial for building robust web applications.

ASP.NET provides several mechanisms for error handling. The HandleError 
attribute offers a declarative way to manage exceptions in controllers.

## Basic Definition

The HandleError attribute in ASP.NET allows you to specify how exceptions 
should be handled for controller actions. It's part of the MVC framework.

When applied to a controller or action method, HandleError catches 
unhandled exceptions during execution. It can redirect to custom error views.

HandleError works with the ASP.NET error handling pipeline. It provides 
granular control over exception handling at the action or controller level.

## ASP.NET HandleError Example

The following example demonstrates using HandleError in an ASP.NET MVC 
application with .NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options =&gt;
{
    options.Filters.Add(new HandleErrorAttribute()
    {
        ExceptionType = typeof(Exception),
        View = "Error"
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up global error handling in the ASP.NET application. The 
HandleErrorAttribute is registered as a global filter.

Controllers/ProductsController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

public class ProductsController : Controller
{
    private readonly List&lt;Product&gt; _products = new()
    {
        new Product(1, "Laptop", 999.99m),
        new Product(2, "Mouse", 19.99m),
        new Product(3, "Keyboard", 49.99m)
    };

    [HandleError(ExceptionType = typeof(KeyNotFoundException), 
                View = "ProductNotFound")]
    public IActionResult Details(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product {id} not found");
        }
        return View(product);
    }

    [HandleError(ExceptionType = typeof(DivideByZeroException), 
                View = "MathError")]
    public IActionResult CalculateDiscount(int productId, decimal divisor)
    {
        var product = _products.First(p =&gt; p.Id == productId);
        var discountedPrice = product.Price / divisor;
        return View(discountedPrice);
    }
}

public record Product(int Id, string Name, decimal Price);

This controller demonstrates two different error handling scenarios. The 
Details action handles product not found errors with a custom view.

The CalculateDiscount action specifically catches DivideByZeroException. 
Each HandleError attribute specifies which exception type to catch.

Views/Shared/Error.cshtml
  

@model ErrorViewModel
@{
    ViewData["Title"] = "Error";
}

&lt;h1 class="text-danger"&gt;Error.&lt;/h1&gt;
&lt;h2 class="text-danger"&gt;An error occurred while processing your request.&lt;/h2&gt;

@if (Model.ShowRequestId)
{
    &lt;p&gt;
        &lt;strong&gt;Request ID:&lt;/strong&gt; &lt;code&gt;@Model.RequestId&lt;/code&gt;
    &lt;/p&gt;
}

&lt;h3&gt;Development Mode&lt;/h3&gt;
&lt;p&gt;
    Swapping to &lt;strong&gt;Development&lt;/strong&gt; environment will display more detailed information about the error that occurred.
&lt;/p&gt;

This is the default error view that will be displayed for unhandled 
exceptions. Custom error views can be created for specific exceptions.

The example shows how HandleError provides fine-grained control over 
exception handling. Different exceptions can be routed to different views.

## Source

[Microsoft ASP.NET MVC Filters Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-8.0)

In this article, we have explored the HandleError attribute in ASP.NET 8. 
This powerful feature simplifies exception handling in MVC applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).