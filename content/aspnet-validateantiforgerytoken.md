+++
title = "ASP.NET ValidateAntiForgeryToken"
date = 2025-08-27T23:21:42.549+01:00
draft = false
description = "ASP.NET ValidateAntiForgeryToken tutorial shows how to use ValidateAntiForgeryToken in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ValidateAntiForgeryToken

last modified April 3, 2025

In this article, we explore the ValidateAntiForgeryToken attribute in ASP.NET 8.
This security feature protects against Cross-Site Request Forgery (CSRF) attacks.

ASP.NET provides built-in protection against CSRF attacks through anti-forgery
tokens. The ValidateAntiForgeryToken attribute validates these tokens.

## Basic Definition

The ValidateAntiForgeryToken attribute in ASP.NET is a security feature that
validates anti-forgery tokens in HTTP requests. These tokens prevent CSRF attacks.

CSRF attacks trick users into submitting malicious requests while authenticated.
Anti-forgery tokens ensure requests originate from your application's UI.

When applied to an action method, ValidateAntiForgeryToken requires a valid
token with each POST request. The token is generated in forms using a helper.

The token consists of two parts: a cookie token and a form token. Both must
match for the request to be considered valid. This prevents external sites from
making requests.

## ASP.NET ValidateAntiForgeryToken Example

The following example demonstrates using ValidateAntiForgeryToken in a form
submission scenario.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.MapControllers();
app.MapDefaultControllerRoute();
app.Run();

This sets up a basic ASP.NET MVC application. The AddControllersWithViews
method enables MVC features including anti-forgery token support.

Controllers/AccountController.cs
  

using Microsoft.AspNetCore.Mvc;

public class AccountController : Controller
{
    [HttpGet]
    public IActionResult ChangePassword()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ChangePassword(ChangePasswordModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        // Process password change
        return RedirectToAction("Success");
    }
}

public class ChangePasswordModel
{
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmPassword { get; set; }
}

The controller has two actions: one for displaying the form (GET) and one for
processing it (POST). The POST action is protected with ValidateAntiForgeryToken.

Views/Account/ChangePassword.cshtml
  

@model ChangePasswordModel

&lt;h2&gt;Change Password&lt;/h2&gt;

&lt;form method="post"&gt;
    @Html.AntiForgeryToken()
    
    &lt;div class="form-group"&gt;
        &lt;label asp-for="CurrentPassword"&gt;&lt;/label&gt;
        &lt;input asp-for="CurrentPassword" class="form-control" /&gt;
        &lt;span asp-validation-for="CurrentPassword"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label asp-for="NewPassword"&gt;&lt;/label&gt;
        &lt;input asp-for="NewPassword" class="form-control" /&gt;
        &lt;span asp-validation-for="NewPassword"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;div class="form-group"&gt;
        &lt;label asp-for="ConfirmPassword"&gt;&lt;/label&gt;
        &lt;input asp-for="ConfirmPassword" class="form-control" /&gt;
        &lt;span asp-validation-for="ConfirmPassword"&gt;&lt;/span&gt;
    &lt;/div&gt;
    
    &lt;button type="submit" class="btn btn-primary"&gt;Change Password&lt;/button&gt;
&lt;/form&gt;

The view contains a form with the Html.AntiForgeryToken() helper.
This generates a hidden form field with the anti-forgery token.

When the form is submitted, both the cookie token and form token are validated.
If either is missing or doesn't match, the request is rejected with a 400 error.

The example shows a complete implementation of CSRF protection for a sensitive
operation (password change). The token ensures the request came from your form.

## Source

[Microsoft Anti-Forgery Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-8.0)

In this article, we have explored the ValidateAntiForgeryToken attribute in ASP.NET 8.
This crucial security feature helps protect your applications from CSRF attacks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).