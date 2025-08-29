+++
title = "ASP.NET UseAuthorization"
date = 2025-08-29T19:49:26.025+01:00
draft = false
description = "ASP.NET UseAuthorization tutorial shows how to use authorization in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET UseAuthorization

last modified April 3, 2025

In this article, we explore the UseAuthorization middleware in ASP.NET 8. This
component is essential for implementing authentication and authorization in web
applications.

ASP.NET provides a robust security system that separates authentication and
authorization. UseAuthorization enables policy-based access control to protect
your application resources.

## Basic Definition

The UseAuthorization middleware in ASP.NET handles authorization for requests.
It works with authentication middleware to secure your application endpoints.

Authorization determines what an authenticated user is allowed to do. It's
typically added after UseAuthentication and before endpoint routing in the
middleware pipeline.

UseAuthorization evaluates authorization policies against the current user.
These policies can be role-based, claim-based, or custom requirements.

## ASP.NET UseAuthorization Example

The following example demonstrates a basic ASP.NET application with
authorization setup.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddAuthentication("Cookies")
    .AddCookie("Cookies", options =&gt;
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

builder.Services.AddAuthorization(options =&gt;
{
    options.AddPolicy("AdminOnly", policy =&gt; 
        policy.RequireRole("Admin"));
        
    options.AddPolicy("Over18", policy =&gt; 
        policy.RequireClaim("Age", "18"));
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up an ASP.NET application with cookie authentication and two
authorization policies. The AdminOnly policy requires users to have the
Admin role.

The Over18 policy requires users to have an Age claim with value 18.
UseAuthorization is placed after UseAuthentication in the middleware pipeline.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [Authorize]
    public IActionResult MembersOnly()
    {
        return View();
    }

    [Authorize(Policy = "AdminOnly")]
    public IActionResult AdminDashboard()
    {
        return View();
    }

    [Authorize(Policy = "Over18")]
    public IActionResult AdultContent()
    {
        return View();
    }
}

This controller demonstrates different authorization scenarios. The MembersOnly
action requires any authenticated user, using the basic [Authorize] attribute.

The AdminDashboard action uses the AdminOnly policy we defined in Program.cs.
Only users with the Admin role can access this endpoint.

The AdultContent action uses the Over18 policy, requiring users to have the
Age claim set to 18. The [Authorize] attribute applies these policies to
specific actions.

Views/Account/Login.cshtml
  

@{
    ViewData["Title"] = "Login";
}

&lt;h2&gt;Login&lt;/h2&gt;

&lt;form method="post"&gt;
    &lt;div&gt;
        &lt;label&gt;Username&lt;/label&gt;
        &lt;input name="username" /&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label&gt;Password&lt;/label&gt;
        &lt;input name="password" type="password" /&gt;
    &lt;/div&gt;
    &lt;button type="submit"&gt;Login&lt;/button&gt;
&lt;/form&gt;

This simple login view collects credentials. In a real application, you would
validate these against a user store and issue authentication cookies.

## Source

[Microsoft ASP.NET Authorization Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-8.0)

In this article, we have explored the UseAuthorization middleware in ASP.NET 8.
This powerful feature enables flexible security policies to protect your
application resources.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).