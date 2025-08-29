+++
title = "ASP.NET RedirectToAction"
date = 2025-08-29T19:49:18.947+01:00
draft = false
description = "ASP.NET RedirectToAction tutorial shows how to use RedirectToAction in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET RedirectToAction

last modified April 3, 2025

In this article, we explore the RedirectToAction method in ASP.NET 8. This method
is essential for redirecting users to different actions within MVC applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. RedirectToAction helps manage application flow between controllers.

## Basic Definition

RedirectToAction is a method in ASP.NET MVC that returns a RedirectToActionResult.
This result performs an HTTP redirect to a specified action and controller.

When executed, it sends a 302 Found response to the client, instructing the
browser to make a new request to the specified action. This maintains proper
application flow.

RedirectToAction is commonly used in Post-Redirect-Get (PRG) patterns to prevent
duplicate form submissions. It helps separate action processing from result
display.

## ASP.NET RedirectToAction Example

The following example demonstrates a basic MVC controller using RedirectToAction.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up a basic ASP.NET MVC application with controller support. The
MapControllerRoute method defines the default routing pattern.

Controllers/AccountController.cs
  

using Microsoft.AspNetCore.Mvc;

public class AccountController : Controller
{
    private static List&lt;User&gt; _users = new()
    {
        new User(1, "john", "john@example.com"),
        new User(2, "jane", "jane@example.com")
    };

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Login(string username, string password)
    {
        // Authentication logic would go here
        var user = _users.FirstOrDefault(u =&gt; 
            u.Username == username);
            
        if (user == null)
        {
            TempData["ErrorMessage"] = "Invalid credentials";
            return RedirectToAction("Login");
        }

        // Successful login
        return RedirectToAction("Profile", new { id = user.Id });
    }

    [HttpGet]
    public IActionResult Profile(int id)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (user == null) return NotFound();
        return View(user);
    }

    [HttpPost]
    public IActionResult UpdateProfile(int id, string email)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (user == null) return NotFound();

        // Update logic would go here
        return RedirectToAction("Profile", new { id = id });
    }
}

public record User(int Id, string Username, string Email);

This controller demonstrates three different scenarios using RedirectToAction.
The login POST action redirects back to login on failure or to profile on success.

The UpdateProfile action shows how to redirect back to the same action with
parameters after processing. This follows the PRG pattern to prevent duplicate
submissions.

The TempData dictionary is used to pass data between redirects.
This is especially useful for error messages that should only be displayed once.

The example shows how RedirectToAction maintains clean URLs and proper HTTP
semantics. Each redirect clearly indicates the next step in the application flow.

## Source

[Microsoft ASP.NET MVC Actions Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions?view=aspnetcore-8.0)

In this article, we have explored the RedirectToAction method in ASP.NET 8. This
powerful feature helps maintain proper application flow and URL semantics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).