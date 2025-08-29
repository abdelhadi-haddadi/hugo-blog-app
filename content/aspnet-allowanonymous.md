+++
title = "ASP.NET AllowAnonymous"
date = 2025-08-29T19:48:54.156+01:00
draft = false
description = "ASP.NET AllowAnonymous tutorial shows how to use AllowAnonymous in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET AllowAnonymous

last modified April 3, 2025

In this article, we explore the AllowAnonymous attribute in ASP.NET 8. This
attribute bypasses authorization requirements for specific controller actions.

ASP.NET provides robust authentication and authorization features. AllowAnonymous
is used when you need to make certain endpoints accessible without authentication.

## Basic Definition

The AllowAnonymous attribute in ASP.NET indicates that a controller or action
method should skip authorization checks. It overrides any authorization policies.

When applied to a controller or action, it allows anonymous access even when
the controller or application requires authentication. This is useful for public
endpoints like login pages.

AllowAnonymous is part of ASP.NET's authorization system. It works with both
traditional and attribute-based authorization approaches in .NET 8 applications.

## ASP.NET AllowAnonymous Example

The following example demonstrates using AllowAnonymous in a Web API controller.

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

This sets up JWT bearer authentication for the application. The authentication
middleware is added before authorization to ensure proper request processing.

Controllers/AuthController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        // In a real app, validate credentials against database
        if (login.Username != "admin" || login.Password != "password")
            return Unauthorized();
            
        var token = GenerateJwtToken(login.Username);
        return Ok(new { Token = token });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var username = User.Identity.Name;
        return Ok(new { Username = username, Message = "Secure data" });
    }

    private string GenerateJwtToken(string username)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, "User")
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public record LoginModel(string Username, string Password);

This controller shows two endpoints: one public login endpoint and one secure
profile endpoint. The login endpoint is marked with AllowAnonymous to permit
unauthenticated access.

The Login action generates a JWT token after validating credentials.
The GetProfile action requires authentication, as indicated by the
Authorize attribute.

The example demonstrates how AllowAnonymous can be used alongside Authorize in
the same controller. This pattern is common for authentication-related endpoints.

## Source

[Microsoft ASP.NET Authorization Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/simple?view=aspnetcore-8.0)

In this article, we have explored the AllowAnonymous attribute in ASP.NET 8. This
essential feature enables flexible authorization configurations in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).