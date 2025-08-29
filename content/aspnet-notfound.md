+++
title = "ASP.NET NotFound"
date = 2025-08-27T23:21:29.580+01:00
draft = false
description = "ASP.NET NotFound tutorial shows how to use
NotFound in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET NotFound

last modified April 3, 2025

In this article, we explore the NotFound response in ASP.NET 8. This response
is essential for building RESTful APIs that properly handle missing resources.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The NotFound response helps maintain proper HTTP semantics.

## Basic Definition

The NotFound response in ASP.NET returns an HTTP 404 status code to the client.
This indicates that the requested resource could not be found on the server.

In ASP.NET controllers, NotFound is typically returned from action methods when
a requested entity doesn't exist in the data store. It implements proper REST
semantics for resource retrieval.

NotFound is part of ASP.NET's ControllerBase class helper methods. These methods
simplify returning common HTTP status codes with appropriate responses.

## ASP.NET NotFound Example

The following example demonstrates a Web API controller using NotFound.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/UsersController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static List&lt;User&gt; _users = new()
    {
        new User(1, "John", "john@example.com"),
        new User(2, "Sarah", "sarah@example.com"),
        new User(3, "Mike", "mike@example.com")
    };

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        return Ok(_users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        
        if (user == null)
        {
            return NotFound($"User with ID {id} not found");
        }
        
        return Ok(user);
    }

    [HttpGet("email/{email}")]
    public IActionResult GetUserByEmail(string email)
    {
        var user = _users.FirstOrDefault(u =&gt; 
            u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            
        return user == null ? NotFound() : Ok(user);
    }
}

public record User(int Id, string Name, string Email);

This controller demonstrates NotFound usage in two scenarios. The first method
returns all users when hitting the base route /api/users.

The second method uses route parameter {id} to get a specific
user. If the user doesn't exist, it returns NotFound with a custom message.

The third method shows NotFound without a message when searching by email. The
conditional operator demonstrates concise NotFound usage in simple cases.

The example shows proper RESTful patterns where NotFound is returned when
requested resources don't exist. This helps clients distinguish between
successful empty responses and actual missing resources.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the NotFound response in ASP.NET 8. This
essential feature helps build proper RESTful APIs that follow HTTP semantics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).