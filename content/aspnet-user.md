+++
title = "ASP.NET User"
date = 2025-08-29T19:49:27.193+01:00
draft = false
description = "ASP.NET User tutorial shows how to use User in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET User

last modified April 3, 2025

In this article, we explore the User property in ASP.NET 8. This property
provides access to the current user's identity and claims in web applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The User property is essential for authentication and authorization.

## Basic Definition

The User property in ASP.NET represents the current HTTP request's security
context. It's available in controllers, Razor Pages, and middleware components.

User provides information about the authenticated user including their identity,
roles, and claims. It implements the ClaimsPrincipal class from System.Security.

This property is automatically populated by ASP.NET's authentication middleware.
It's commonly used with Identity, JWT, or other authentication schemes.

## ASP.NET User Example

The following example demonstrates how to use the User property in a controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =&gt;
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

This sets up JWT bearer authentication in an ASP.NET application. The
authentication middleware populates the User property for authorized requests.

Controllers/UserController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    [HttpGet("profile")]
    public IActionResult GetUserProfile()
    {
        var userName = User.Identity?.Name;
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = User.FindFirstValue(ClaimTypes.Email);
        
        return Ok(new {
            UserName = userName,
            UserId = userId,
            Email = email
        });
    }

    [HttpGet("roles")]
    public IActionResult GetUserRoles()
    {
        var roles = User.Claims
            .Where(c =&gt; c.Type == ClaimTypes.Role)
            .Select(c =&gt; c.Value);
            
        return Ok(roles);
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminEndpoint()
    {
        return Ok("Welcome Admin!");
    }
}

This controller demonstrates three different ways to use the User property. The
first method retrieves basic user profile information from claims.

The second method extracts all role claims from the User property. The third
method shows role-based authorization using the Authorize attribute.

The Authorize attribute at the controller level requires
authentication for all actions. The Roles parameter restricts
access to specific user roles.

The example shows how User provides access to identity information through
claims. Claims are name-value pairs that represent attributes of the user.

## Source

[Microsoft ASP.NET Security Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-8.0)

In this article, we have explored the User property in ASP.NET 8. This
essential feature enables secure user authentication and authorization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).