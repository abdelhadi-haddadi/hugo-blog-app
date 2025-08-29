+++
title = "ASP.NET View"
date = 2025-08-29T19:49:28.310+01:00
draft = false
description = "ASP.NET View tutorial shows how to use Views in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET View

last modified April 3, 2025

In this article, we explore Views in ASP.NET 8. Views are essential components
in MVC architecture that handle the presentation layer of web applications.

ASP.NET Views are responsible for rendering the user interface. They work with
controllers to display data to users and collect user input. Views use Razor
syntax to combine HTML with C# code.

## Basic Definition

A View in ASP.NET MVC is a template that generates HTML responses. Views are
typically associated with controller actions and use the .cshtml file extension.

Views can contain HTML markup, Razor syntax, and C# code. They support layouts
for consistent page structure and partial views for reusable components. Views
are strongly typed when working with specific models.

The Razor view engine processes Views at runtime. It combines data from the
controller with HTML templates to generate dynamic web pages. Views support
tag helpers for cleaner syntax.

## ASP.NET View Example

The following example demonstrates creating and using a View in ASP.NET MVC.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();

This sets up an ASP.NET MVC application with view support. The
AddControllersWithViews method registers services needed for views.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var model = new WelcomeModel
        {
            Title = "Welcome to ASP.NET",
            Message = "This is a view example in .NET 8",
            CurrentDate = DateTime.Now
        };
        return View(model);
    }
}

public class WelcomeModel
{
    public string Title { get; set; }
    public string Message { get; set; }
    public DateTime CurrentDate { get; set; }
}

The controller creates a model and passes it to the View method. By convention,
this will look for a view named Index.cshtml in the Views/Home folder.

Views/Home/Index.cshtml
  

@model WelcomeModel

@{
    ViewData["Title"] = Model.Title;
}

&lt;div class="text-center"&gt;
    &lt;h1&gt;@Model.Title&lt;/h1&gt;
    &lt;p&gt;@Model.Message&lt;/p&gt;
    &lt;p&gt;Current date: @Model.CurrentDate.ToString("D")&lt;/p&gt;
    
    @if (Model.CurrentDate.DayOfWeek == DayOfWeek.Saturday || 
         Model.CurrentDate.DayOfWeek == DayOfWeek.Sunday)
    {
        &lt;p&gt;It's the weekend!&lt;/p&gt;
    }
    else
    {
        &lt;p&gt;It's a weekday.&lt;/p&gt;
    }
&lt;/div&gt;

This view demonstrates several Razor features. The @model directive
specifies the model type. We access model properties with @Model.

The view includes C# logic with @if statements and uses ViewData
for the page title. Razor syntax seamlessly mixes HTML with C# code for dynamic
content generation.

The example shows how Views separate presentation logic from business logic.
Views remain focused on display while controllers handle application flow.

## Source

[Microsoft ASP.NET Views Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-8.0)

In this article, we have explored Views in ASP.NET 8. Views are powerful
components that enable clean separation of concerns in MVC applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).