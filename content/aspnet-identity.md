+++
title = "ASP.NET Identity"
date = 2025-08-27T23:21:22.900+01:00
draft = false
description = "ASP.NET Identity tutorial shows how to use
Identity in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Identity

last modified April 3, 2025

In this article, we explore ASP.NET Identity in .NET 8. Identity is a membership
system for adding login functionality to ASP.NET applications.

ASP.NET Identity provides a robust framework for managing users, passwords,
profile data, roles, claims, tokens, and more. It supports external logins and
two-factor authentication.

## Basic Definition

ASP.NET Identity is a modern authentication system for ASP.NET applications. It
replaces the older ASP.NET Membership system with more flexible architecture.

Identity supports various storage providers including SQL Server, Azure Table
Storage, and NoSQL databases. It's designed to work with OWIN middleware.

Key features include user management, role-based authorization, claims-based
authentication, and external provider integration. It's highly customizable.

## ASP.NET Identity Example

The following example demonstrates setting up ASP.NET Identity in a .NET 8
application with user registration and login.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext&lt;ApplicationDbContext&gt;(options =&gt;
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity&lt;IdentityUser, IdentityRole&gt;()
    .AddEntityFrameworkStores&lt;ApplicationDbContext&gt;()
    .AddDefaultTokenProviders();

builder.Services.AddControllersWithViews();

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

This sets up the basic configuration for ASP.NET Identity. The
AddIdentity method configures the identity services with default
user and role types.

Models/ApplicationDbContext.cs
  

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions&lt;ApplicationDbContext&gt; options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model if needed
    }
}

The IdentityDbContext provides all the database tables needed for
Identity. It inherits from DbContext with Identity-specific
configuration.

Controllers/AccountController.cs
  

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public class AccountController : Controller
{
    private readonly UserManager&lt;IdentityUser&gt; _userManager;
    private readonly SignInManager&lt;IdentityUser&gt; _signInManager;

    public AccountController(
        UserManager&lt;IdentityUser&gt; userManager,
        SignInManager&lt;IdentityUser&gt; signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Register(RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToAction("Index", "Home");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return View(model);
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Login(LoginViewModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(
                model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
        }

        return View(model);
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Index", "Home");
    }
}

This controller demonstrates user registration, login, and logout functionality.
The UserManager handles user creation while SignInManager
manages authentication.

The Register action creates new users with email and password. The
Login action authenticates users using credentials. Both actions
follow the standard Identity patterns.

Error handling is built into the Identity system. Errors during user creation or
authentication are added to ModelState for display in the view.

## Source

[Microsoft ASP.NET Core Identity Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-8.0)

In this article, we have explored ASP.NET Identity in .NET 8. This powerful
framework provides comprehensive authentication and authorization features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).