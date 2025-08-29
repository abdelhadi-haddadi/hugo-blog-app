+++
title = "ASP.NET ChildActionOnly"
date = 2025-08-29T19:48:56.377+01:00
draft = false
description = "ASP.NET ChildActionOnly tutorial shows how to use ChildActionOnly in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ChildActionOnly

last modified April 3, 2025

In this article, we explore the ChildActionOnly attribute in ASP.NET 8. This
attribute is used to restrict action methods to be called only as child actions.

Child actions are special controller actions that are invoked from within a view.
They enable reusable UI components and partial page updates in ASP.NET MVC.

## Basic Definition

The ChildActionOnly attribute in ASP.NET MVC marks a controller action method
to be callable only as a child action. It prevents direct access via URL.

When applied to an action method, ChildActionOnly ensures the method can only
be invoked using Html.Action or Html.RenderAction helper methods in views.

Child actions are useful for creating reusable components like menus, widgets,
or partial views that need server-side processing. They help organize complex
views into smaller, manageable pieces.

## ASP.NET ChildActionOnly Example

The following example demonstrates using ChildActionOnly to create a navigation
menu that's rendered as a partial view.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();

This sets up a basic ASP.NET MVC application with controller support and routing.
The AddControllersWithViews method enables MVC features.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [ChildActionOnly]
    public IActionResult NavigationMenu()
    {
        var menuItems = new List&lt;MenuItem&gt;
        {
            new MenuItem("Home", "Index", "Home"),
            new MenuItem("Products", "Index", "Products"),
            new MenuItem("About", "About", "Home"),
            new MenuItem("Contact", "Contact", "Home")
        };
        
        return PartialView("_NavigationMenu", menuItems);
    }
}

public record MenuItem(string Text, string Action, string Controller);

The HomeController contains two actions. The Index action serves the main page,
while NavigationMenu is marked with ChildActionOnly and returns a partial view.

Views/Shared/_NavigationMenu.cshtml
  

@model List&lt;MenuItem&gt;

&lt;nav&gt;
    &lt;ul&gt;
        @foreach (var item in Model)
        {
            &lt;li&gt;
                &lt;a asp-controller="@item.Controller" 
                   asp-action="@item.Action"&gt;
                    @item.Text
                &lt;/a&gt;
            &lt;/li&gt;
        }
    &lt;/ul&gt;
&lt;/nav&gt;

This partial view renders the navigation menu. It receives the menu items from
the child action and generates the HTML for the navigation.

Views/Home/Index.cshtml
  

@{
    ViewData["Title"] = "Home Page";
}

&lt;div class="container"&gt;
    &lt;h1&gt;Welcome to our website&lt;/h1&gt;
    
    @await Html.PartialAsync("_NavigationMenu")
    
    &lt;div class="main-content"&gt;
        &lt;p&gt;This is the main content of the page.&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;

The main view includes the navigation menu by rendering the partial view. The
child action is automatically invoked when the partial view is rendered.

This example shows how ChildActionOnly helps create reusable components. The
navigation menu can be included in any view while keeping the logic separate.

## Source

[Microsoft ASP.NET Partial Views Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/partial?view=aspnetcore-8.0)

In this article, we have explored the ChildActionOnly attribute in ASP.NET 8.
This feature enables creating modular, reusable UI components in MVC apps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).