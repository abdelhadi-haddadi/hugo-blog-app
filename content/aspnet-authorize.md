+++
title = "ASP.NET Authorize"
date = 2025-08-27T23:21:08.195+01:00
draft = false
description = "ASP.NET Authorize tutorial shows how to use
Authorize in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Authorize

last modified April 3, 2025

In this article, we explore the Authorize attribute in ASP.NET 8. This attribute
is essential for securing web applications and APIs by controlling access.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Authorize attribute helps implement authentication and
authorization.

## Basic Definition

The Authorize attribute in ASP.NET restricts access to controllers or actions
to authenticated users. It can also specify required roles or policies.

When applied to a controller or action method, Authorize checks if the current
user is authenticated. If not, it returns a 401 Unauthorized status code.

Authorize is part of ASP.NET's security system, which integrates with various
authentication schemes. It works with cookie-based auth, JWT tokens, and more.

## ASP.NET Authorize Example

The following example demonstrates a secure Web API controller using Authorize.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =&gt;
    {
        options.TokenValidationParameters = new()
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

This sets up an ASP.NET application with JWT bearer token authentication. The
UseAuthentication and UseAuthorization middleware
are required for the Authorize attribute to work.

Controllers/OrdersController.cs
  

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private static List&lt;Order&gt; _orders = new()
    {
        new Order(1, "Laptop", 2, 1999.98m),
        new Order(2, "Monitor", 1, 299.99m)
    };

    [HttpGet]
    public IActionResult GetAllOrders()
    {
        return Ok(_orders);
    }

    [HttpGet("{id}")]
    public IActionResult GetOrderById(int id)
    {
        var order = _orders.FirstOrDefault(o =&gt; o.Id == id);
        if (order == null) return NotFound();
        return Ok(order);
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminData()
    {
        return Ok("This is sensitive admin data");
    }
}

public record Order(int Id, string ProductName, int Quantity, decimal Total);

This controller demonstrates three different authorization scenarios. The
controller-level [Authorize] requires authentication for all
actions.

The first two methods are accessible to any authenticated user. The third method
has an additional [Authorize(Roles = "Admin")] attribute that
restricts access to users in the Admin role.

The ApiController attribute enables Web API conventions. The
Route attribute sets the base path for all actions in this
controller.

This example shows how Authorize can be used at different levels and with
different requirements. It demonstrates both simple authentication checks
and role-based authorization.

## Source

[Microsoft ASP.NET Authorization Documentation](https://learn.microsoft.com/en-us/aspnet/core/security/authorization/simple?view=aspnetcore-8.0)

In this article, we have explored the Authorize attribute in ASP.NET 8. This
powerful feature is essential for securing web applications and APIs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).