+++
title = "ASP.NET ClaimsPrincipal"
date = 2025-08-27T23:21:09.491+01:00
draft = false
description = "ASP.NET ClaimsPrincipal tutorial shows how to use ClaimsPrincipal in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ClaimsPrincipal

last modified April 3, 2025

In this article, we explore the ClaimsPrincipal class in ASP.NET 8. This class
is fundamental for authentication and authorization in modern ASP.NET apps.

ClaimsPrincipal represents the security context of the current user. It contains
claims that describe the user's identity and permissions within the application.

## Basic Definition

ClaimsPrincipal is the primary class for user identity in ASP.NET. It implements
the IPrincipal interface and contains one or more ClaimsIdentity objects.

Each ClaimsIdentity represents a single identity with multiple claims. Claims are
key-value pairs that describe the user, like name, email, or role membership.

In ASP.NET Core, the current ClaimsPrincipal is automatically available in
controllers through the User property. It's populated by the authentication
middleware during request processing.

## ASP.NET ClaimsPrincipal Example

The following example demonstrates how to work with ClaimsPrincipal in an ASP.NET
8 Web API application.

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

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

This sets up JWT bearer token authentication in an ASP.NET application. The
authentication middleware populates the ClaimsPrincipal from the JWT token.

Controllers/UserController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet("profile")]
    [Authorize]
    public IActionResult GetUserProfile()
    {
        var user = HttpContext.User;
        
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var username = user.FindFirst(ClaimTypes.Name)?.Value;
        var email = user.FindFirst(ClaimTypes.Email)?.Value;
        var roles = user.FindAll(ClaimTypes.Role).Select(c =&gt; c.Value);
        
        return Ok(new {
            UserId = userId,
            Username = username,
            Email = email,
            Roles = roles
        });
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminOnly()
    {
        return Ok("Welcome, Admin!");
    }

    [HttpGet("custom-claim")]
    [Authorize]
    public IActionResult GetCustomClaim()
    {
        var department = User.FindFirst("Department")?.Value;
        
        if (string.IsNullOrEmpty(department))
        {
            return BadRequest("Department claim is missing");
        }
        
        return Ok($"User belongs to {department} department");
    }
}

This controller demonstrates three different ways to work with ClaimsPrincipal.
The first method retrieves standard claims from the authenticated user.

The second method shows role-based authorization using the [Authorize] attribute.
Only users with the Admin role can access this endpoint.

The third method demonstrates accessing a custom claim (Department). Claims can
be extended beyond standard claim types to include application-specific data.

The User property (HttpContext.User) provides access to the current
ClaimsPrincipal. Various methods like FindFirst and FindAll help retrieve claims.

## Source

[Microsoft ASP.NET Claims Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/claims?view=aspnetcore-8.0)

In this article, we have explored the ClaimsPrincipal class in ASP.NET 8. This
powerful feature is essential for implementing authentication and authorization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).