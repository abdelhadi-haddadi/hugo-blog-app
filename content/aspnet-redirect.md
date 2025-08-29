+++
title = "ASP.NET Redirect"
date = 2025-08-27T23:21:31.768+01:00
draft = false
description = "ASP.NET Redirect tutorial shows how to use Redirect in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Redirect

last modified April 3, 2025

In this article, we explore the Redirect functionality in ASP.NET 8. Redirects
are essential for controlling navigation flow in web applications.

ASP.NET provides several ways to perform redirects, each serving different
scenarios. Understanding these methods is crucial for proper web development.

## Basic Definition

A redirect in web development instructs the browser to navigate to a different
URL. ASP.NET offers multiple redirect methods through the Controller class.

The main redirect methods are Redirect, RedirectPermanent, LocalRedirect,
and RedirectToAction. Each serves specific purposes in application routing.

Redirect returns a 302 (temporary) status code, while RedirectPermanent
returns 301 (permanent). LocalRedirect ensures the target is a local URL.

RedirectToAction is used for internal application routing between controller
actions. These methods help manage application flow and URL structure.

## ASP.NET Redirect Example

The following example demonstrates various redirect scenarios in an ASP.NET
controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllers();
app.Run();

This sets up a basic ASP.NET MVC application. The AddControllersWithViews
method enables both API and view-based controllers.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult OldPage()
    {
        // Permanent redirect (301) to new location
        return RedirectPermanent("/Home/NewPage");
    }

    public IActionResult NewPage()
    {
        return View();
    }

    public IActionResult External()
    {
        // Redirect to external URL (302 temporary)
        return Redirect("https://example.com");
    }

    public IActionResult SecureRedirect()
    {
        // Only allow redirects to local URLs
        return LocalRedirect("/Home/Index");
    }

    public IActionResult ProcessForm()
    {
        // Redirect to another action after processing
        return RedirectToAction("Success");
    }

    public IActionResult Success()
    {
        return View();
    }

    public IActionResult ConditionalRedirect(bool isMember)
    {
        // Conditional redirect based on logic
        return isMember 
            ? RedirectToAction("MemberArea") 
            : RedirectToAction("Register");
    }
}

This controller demonstrates several redirect scenarios. The OldPage
action shows a permanent redirect to a new location.

The External action demonstrates redirecting to an external website.
SecureRedirect ensures the target is a local URL for security.

ProcessForm shows a common pattern of redirecting after form
submission. ConditionalRedirect demonstrates logic-based routing.

Each redirect method serves different purposes. Temporary redirects (302) are
for temporary moves, while permanent ones (301) help with SEO for permanent
changes.

## Source

[Microsoft ASP.NET Redirect Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/redirects?view=aspnetcore-8.0)

In this article, we have explored the Redirect functionality in ASP.NET 8. These
methods are essential for proper navigation flow in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).