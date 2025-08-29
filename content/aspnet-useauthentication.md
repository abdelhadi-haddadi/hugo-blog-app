+++
title = "ASP.NET UseAuthentication"
date = 2025-08-27T23:21:39.976+01:00
draft = false
description = "ASP.NET UseAuthentication tutorial shows how to implement authentication in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET UseAuthentication

last modified April 3, 2025

In this article, we explore the UseAuthentication middleware in ASP.NET 8. This
middleware is essential for implementing authentication in web applications.

ASP.NET provides a robust authentication system that supports various providers.
UseAuthentication enables the authentication middleware in the request pipeline.

## Basic Definition

UseAuthentication is a middleware component in ASP.NET that enables authentication
functionality. It must be called before any middleware that depends on users
being authenticated.

Authentication is the process of determining a user's identity. ASP.NET supports
cookie-based authentication, JWT, OAuth, and other authentication schemes.

UseAuthentication works with authentication services registered via
AddAuthentication. It examines each request for authentication credentials.

## ASP.NET UseAuthentication Example

The following example demonstrates cookie-based authentication using UseAuthentication.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add authentication services
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =&gt;
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

// Enable authentication middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up cookie authentication with custom paths for login and access denied.
The UseAuthentication middleware is placed after routing but before authorization.

Controllers/AccountController.cs
  

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

public class AccountController : Controller
{
    [HttpGet]
    public IActionResult Login(string returnUrl = "/")
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Login(string username, string password, string returnUrl)
    {
        if (username == "admin" &amp;&amp; password == "password")
        {
            var claims = new List&lt;Claim&gt;
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Administrator")
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return LocalRedirect(returnUrl);
        }

        ViewData["ReturnUrl"] = returnUrl;
        ModelState.AddModelError("", "Invalid username or password");
        return View();
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
    }
}

The AccountController handles login and logout operations. The Login action
validates credentials and creates a cookie with claims. The Logout action
removes the authentication cookie.

Views/Account/Login.cshtml
  

@{
    ViewData["Title"] = "Login";
}

&lt;h2&gt;Login&lt;/h2&gt;

&lt;form method="post"&gt;
    &lt;div&gt;
        &lt;label for="username"&gt;Username:&lt;/label&gt;
        &lt;input type="text" id="username" name="username" /&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label for="password"&gt;Password:&lt;/label&gt;
        &lt;input type="password" id="password" name="password" /&gt;
    &lt;/div&gt;
    &lt;input type="hidden" name="returnUrl" value="@ViewData["ReturnUrl"]" /&gt;
    &lt;button type="submit"&gt;Login&lt;/button&gt;
&lt;/form&gt;

@if (ViewData.ModelState[""]?.Errors.Count &gt; 0)
{
    &lt;div class="error"&gt;
        @Html.ValidationSummary()
    &lt;/div&gt;
}

This simple login view collects username and password. It includes validation
messages and preserves the return URL for redirecting after successful login.

The example demonstrates a complete authentication flow. UseAuthentication
middleware processes the authentication cookie on each request. The
[Authorize] attribute can protect controller actions.

## Source

[Microsoft ASP.NET Authentication Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-8.0)

In this article, we have explored the UseAuthentication middleware in ASP.NET 8.
This essential component enables secure authentication in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).