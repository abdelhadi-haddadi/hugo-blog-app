+++
title = "ASP.NET Bind"
date = 2025-08-27T23:21:09.497+01:00
draft = false
description = "ASP.NET Bind tutorial shows how to use Bind in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Bind

last modified April 3, 2025

In this article, we explore the Bind attribute in ASP.NET 8. This attribute
is used for model binding in ASP.NET applications to map request data to
complex objects.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Bind attribute provides control over model binding behavior.

## Basic Definition

The Bind attribute in ASP.NET specifies which properties of a model should be
included or excluded during model binding. It helps prevent over-posting attacks.

Model binding is the process of mapping HTTP request data to action method
parameters. The Bind attribute gives developers fine-grained control over this
process.

Bind is particularly useful when you want to restrict which properties can be
bound from user input. This is important for security in web applications.

## ASP.NET Bind Example

The following example demonstrates using the Bind attribute in an ASP.NET
controller to control model binding.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Models/User.cs
  

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public bool IsAdmin { get; set; }
    public DateTime CreatedDate { get; set; }
}

This User model contains several properties we want to control during binding.
Some properties like IsAdmin should not be settable by users.

Controllers/UsersController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static List&lt;User&gt; _users = new();

    [HttpPost]
    public IActionResult CreateUser([Bind("Username,Password")] User user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        user.Id = _users.Count + 1;
        user.CreatedDate = DateTime.UtcNow;
        user.IsAdmin = false;
        
        _users.Add(user);
        
        return CreatedAtAction(nameof(GetUser), 
            new { id = user.Id }, user);
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }
}

In this controller, the CreateUser action uses the Bind attribute to specify
that only Username and Password properties should be bound from the request.

This prevents malicious users from setting IsAdmin or CreatedDate through the
request. The other properties are set programmatically in the action method.

The Bind attribute accepts a comma-separated list of property names to include.
Alternatively, you can use Bind(Exclude = "property") to exclude
specific properties.

This example demonstrates security best practices by limiting which properties
can be set through model binding. It prevents over-posting attacks where users
try to set properties they shouldn't have access to.

## Source

[Microsoft ASP.NET Model Binding Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-8.0)

In this article, we have explored the Bind attribute in ASP.NET 8. This
powerful feature helps secure your applications by controlling model binding.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).