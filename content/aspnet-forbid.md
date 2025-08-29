+++
title = "ASP.NET Forbid"
date = 2025-08-29T19:49:03.100+01:00
draft = false
description = "ASP.NET Forbid tutorial shows how to use Forbid in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Forbid

last modified April 3, 2025

In this article, we explore the Forbid method in ASP.NET 8. This method is
essential for handling authorization failures in web applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Forbid method helps manage access control in a standardized way.

## Basic Definition

The Forbid method in ASP.NET returns a 403 Forbidden HTTP status code. This
indicates the server understood the request but refuses to authorize it.

Unlike Unauthorized (401), Forbid is used when the user is authenticated but
lacks sufficient permissions. It's commonly used in authorization middleware.

Forbid is part of ASP.NET's authorization system and works with authentication
schemes. It can trigger authentication challenges if configured to do so.

## ASP.NET Forbid Example

The following example demonstrates using Forbid in a controller with role-based
authorization.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with authentication and authorization.
The middleware order is crucial for proper functionality.

Controllers/AdminController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    [Authorize(Roles = "Administrator")]
    [HttpGet("settings")]
    public IActionResult GetSettings()
    {
        return Ok(new { Theme = "Dark", LogLevel = "Debug" });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        if (!User.IsInRole("User") 
            &amp;&amp; !User.IsInRole("Administrator"))
        {
            return Forbid();
        }

        return Ok(new { Name = "John Doe", Email = "john@example.com" });
    }

    [AllowAnonymous]
    [HttpGet("status")]
    public IActionResult GetStatus()
    {
        return Ok(new { Status = "Operational" });
    }
}

This controller demonstrates three different authorization scenarios. The first
method requires Administrator role access.

The second method shows manual role checking with Forbid. If the user lacks both
User and Administrator roles, Forbid is returned.

The third method is publicly accessible with AllowAnonymous. The Forbid response
will trigger any configured authentication schemes to challenge the user.

The example shows how Forbid can be used for granular authorization control.
It works with ASP.NET's built-in authentication and authorization systems.

## Source

[Microsoft ASP.NET Authorization Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-8.0)

In this article, we have explored the Forbid method in ASP.NET 8. This powerful
feature helps implement robust authorization in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).