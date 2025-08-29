+++
title = "ASP.NET RequireHttps"
date = 2025-08-27T23:21:32.887+01:00
draft = false
description = "ASP.NET RequireHttps tutorial shows how to use
RequireHttps in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET RequireHttps

last modified April 3, 2025

In this article, we explore the RequireHttps attribute in ASP.NET 8. This
attribute enforces HTTPS for secure communication in web applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The RequireHttps attribute helps ensure secure data transmission.

## Basic Definition

The RequireHttps attribute in ASP.NET forces controllers or actions to use HTTPS.
It redirects HTTP requests to HTTPS automatically for enhanced security.

When applied to a controller or action method, RequireHttps ensures all requests
must use HTTPS. Non-HTTPS requests are redirected to the HTTPS equivalent URL.

RequireHttps is crucial for protecting sensitive data like login credentials.
It prevents man-in-the-middle attacks by enforcing encrypted communication.

## ASP.NET RequireHttps Example

The following example demonstrates using RequireHttps in an ASP.NET 8 application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options =&gt;
{
    options.Filters.Add(new RequireHttpsAttribute());
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This configuration applies HTTPS requirements globally. The UseHttpsRedirection
middleware automatically redirects HTTP to HTTPS. UseHsts enables
HTTP Strict Transport Security.

Controllers/AccountController.cs
  

using Microsoft.AspNetCore.Mvc;

[RequireHttps]
public class AccountController : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Login(string username, string password)
    {
        // Authentication logic here
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    [RequireHttps]
    public IActionResult SecureData()
    {
        return View();
    }
}

This controller shows two ways to apply HTTPS requirements. The [RequireHttps]
attribute on the class applies to all actions. The attribute can also be applied
to individual actions.

The Login actions demonstrate securing both GET and POST requests.
The SecureData action shows explicit HTTPS requirement for a
specific endpoint.

When users access these endpoints via HTTP, they'll be automatically redirected
to HTTPS. This ensures all communication is encrypted, protecting sensitive data.

## Source

[Microsoft ASP.NET Security Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-8.0)

In this article, we have explored the RequireHttps attribute in ASP.NET 8. This
essential security feature helps protect web applications by enforcing HTTPS.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).