+++
title = "ASP.NET Session"
date = 2025-08-27T23:21:36.308+01:00
draft = false
description = "ASP.NET Session tutorial shows how to use
Session in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Session

last modified April 3, 2025

In this article, we explore Session state management in ASP.NET 8. Session
allows storing user-specific data across multiple HTTP requests.

ASP.NET Session provides a way to persist user data during a browsing session.
It's essential for maintaining state in stateless HTTP protocol applications.

## Basic Definition

Session in ASP.NET is a server-side state management mechanism. It stores data
specific to a user's browsing session on the web server.

Each user gets a unique session identified by a Session ID. This ID is typically
stored in a cookie or passed via URL for cookie-less sessions.

Session data is stored in memory by default but can be configured to use
distributed caches or databases. It's ideal for user-specific temporary data.

Session state is maintained for each user separately. The data persists until
the session expires or is explicitly abandoned.

## ASP.NET Session Example

The following example demonstrates basic Session usage in an ASP.NET Core MVC
application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add session support with configuration
builder.Services.AddSession(options =&gt;
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Enable session middleware
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up a basic ASP.NET MVC application with Session support. The
AddSession method configures session options like timeout.

Controllers/SessionController.cs
  

using Microsoft.AspNetCore.Mvc;

public class SessionController : Controller
{
    public IActionResult Index()
    {
        // Retrieve visit count from session or initialize
        int visitCount = HttpContext.Session.GetInt32("VisitCount") ?? 0;
        visitCount++;
        
        // Store updated count in session
        HttpContext.Session.SetInt32("VisitCount", visitCount);
        
        // Store current timestamp
        HttpContext.Session.SetString("LastVisit", DateTime.Now.ToString());
        
        ViewBag.VisitCount = visitCount;
        ViewBag.LastVisit = HttpContext.Session.GetString("LastVisit");
        
        return View();
    }
    
    public IActionResult ClearSession()
    {
        HttpContext.Session.Clear();
        return RedirectToAction("Index");
    }
}

This controller demonstrates basic Session operations. The Index action tracks
page visits by storing a counter in Session.

Views/Session/Index.cshtml
  

@{
    ViewData["Title"] = "Session Demo";
}

&lt;h2&gt;Session Demo&lt;/h2&gt;

&lt;p&gt;You have visited this page @ViewBag.VisitCount times.&lt;/p&gt;
&lt;p&gt;Your last visit was at @ViewBag.LastVisit&lt;/p&gt;

&lt;a asp-action="ClearSession" class="btn btn-danger"&gt;Clear Session&lt;/a&gt;

The view displays the session data and provides a button to clear the session.
Session values are accessed through the ViewBag populated by the controller.

This example shows basic Session operations: storing and retrieving simple data
types. The session persists across requests until cleared or expired.

## Source

[Microsoft ASP.NET Session Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/app-state?view=aspnetcore-8.0)

In this article, we have explored Session state management in ASP.NET 8. This
powerful feature enables maintaining user-specific data across requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).