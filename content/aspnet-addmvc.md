+++
title = "ASP.NET AddMvc"
date = 2025-08-27T23:21:03.903+01:00
draft = false
description = "ASP.NET AddMvc tutorial shows how to use AddMvc in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AddMvc

last modified April 3, 2025

In this article, we explore the AddMvc method in ASP.NET 8. This method is
essential for configuring MVC services in ASP.NET Core applications.

ASP.NET Core MVC is a framework for building web apps and APIs using the
Model-View-Controller pattern. AddMvc registers required services for MVC.

## Basic Definition

AddMvc is an extension method in ASP.NET Core that adds MVC services to the
service collection. It's called during application startup in Program.cs.

This method configures services like controllers, views, Razor Pages, and
tag helpers. It also sets up the MVC pipeline with default conventions.

AddMvc combines the functionality of AddControllers, AddViews, and
AddRazorPages. It's suitable for traditional MVC applications with views.

In .NET 8, AddMvc continues to support both controller-based and view-based
applications. It remains backward compatible with previous versions.

## ASP.NET AddMvc Example

The following example demonstrates a basic MVC application using AddMvc.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add MVC services to the container
builder.Services.AddMvc();

var app = builder.Build();

// Configure the HTTP request pipeline
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

This configuration sets up a complete MVC application. AddMvc registers all
required services for MVC functionality including views and Razor Pages.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult About()
    {
        ViewData["Message"] = "Your application description page.";
        return View();
    }

    public IActionResult Contact()
    {
        ViewData["Message"] = "Your contact page.";
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View();
    }
}

This controller demonstrates basic MVC actions. Each action returns a view,
with some passing data through ViewData. The Error action handles exceptions.

Views/Home/Index.cshtml
  

@{
    ViewData["Title"] = "Home Page";
}

&lt;div class="text-center"&gt;
    &lt;h1 class="display-4"&gt;Welcome&lt;/h1&gt;
    &lt;p&gt;Learn about &lt;a href="https://learn.microsoft.com/aspnet/core"&gt;
    building Web apps with ASP.NET Core&lt;/a&gt;.&lt;/p&gt;
&lt;/div&gt;

This Razor view displays the home page content. The @ symbol denotes Razor
code blocks. ViewData accesses data passed from the controller.

The example shows a complete MVC setup with controller, views, and routing.
AddMvc enables all these components to work together seamlessly.

## Source

[Microsoft ASP.NET MVC Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-8.0)

In this article, we have explored the AddMvc method in ASP.NET 8. This
essential configuration method enables MVC functionality in ASP.NET apps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).