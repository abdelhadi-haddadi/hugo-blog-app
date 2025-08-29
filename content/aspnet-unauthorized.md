+++
title = "ASP.NET Unauthorized"
date = 2025-08-27T23:21:38.807+01:00
draft = false
description = "ASP.NET Unauthorized tutorial shows how to handle unauthorized access in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Unauthorized

last modified April 3, 2025

In this article, we explore handling unauthorized access in ASP.NET 8. The
Unauthorized response is crucial for secure web applications with authentication.

ASP.NET provides robust tools for authentication and authorization. The
Unauthorized result helps protect resources from unauthenticated users.

## Basic Definition

The Unauthorized status in ASP.NET indicates that a request lacks valid
authentication credentials. It corresponds to HTTP status code 401.

When a user tries to access a protected resource without proper credentials,
ASP.NET can return an Unauthorized result. This differs from Forbidden (403).

Unauthorized means authentication is possible but hasn't been provided. Forbidden
means the user is authenticated but lacks permissions for the resource.

## ASP.NET Unauthorized Example

The following example demonstrates handling unauthorized access in ASP.NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =&gt;
    {
        options.Authority = "https://localhost:5001";
        options.TokenValidationParameters = new()
        {
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

This sets up JWT bearer token authentication. The AddAuthentication
method configures the authentication scheme. UseAuthentication and
UseAuthorization enable the middleware.

Controllers/SecureController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SecureController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult PublicEndpoint()
    {
        return Ok("This is public data");
    }

    [Authorize]
    [HttpGet("protected")]
    public IActionResult ProtectedEndpoint()
    {
        return Ok("This is protected data");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult AdminEndpoint()
    {
        return Ok("This is admin-only data");
    }

    [HttpGet("custom")]
    public IActionResult CustomAuthCheck()
    {
        if (!User.Identity.IsAuthenticated)
        {
            return Unauthorized("Please authenticate first");
        }
        
        return Ok("You are authenticated");
    }
}

This controller shows different authorization scenarios. The Authorize
attribute protects endpoints. Unauthenticated users get 401 Unauthorized responses.

The first endpoint is public. The second requires any authenticated user. The
third needs an Admin role. The fourth demonstrates manual authorization checks.

When an unauthenticated user accesses a protected endpoint, ASP.NET automatically
returns a 401 response. The Unauthorized method creates this response.

The example shows both attribute-based and manual authorization approaches. The
User.Identity.IsAuthenticated property checks authentication status.

## Source

[Microsoft ASP.NET Authorization Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/?view=aspnetcore-8.0)

In this article, we have explored handling unauthorized access in ASP.NET 8. Proper
authentication and authorization are essential for secure web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).