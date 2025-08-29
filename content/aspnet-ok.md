+++
title = "ASP.NET Ok"
date = 2025-08-29T19:49:15.525+01:00
draft = false
description = "ASP.NET Ok tutorial shows how to use Ok in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Ok

last modified April 3, 2025

In this article, we explore the Ok method in ASP.NET 8. This method is a
convenient way to return successful HTTP 200 responses from Web API controllers.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Ok method simplifies returning successful responses with data.

## Basic Definition

The Ok method in ASP.NET is a helper method that creates an OkObjectResult
object. This result represents an HTTP 200 OK response with optional content.

It is commonly used in Web API controller actions to indicate successful
operations. The method can wrap any object that should be returned to the client.

Ok is part of the ControllerBase class, which is the base class for Web API
controllers. It automatically serializes the response object to JSON by default.

## ASP.NET Ok Example

The following example demonstrates various uses of the Ok method in a Web API.

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
        new User(1, "John", "Doe", "john@example.com"),
        new User(2, "Jane", "Smith", "jane@example.com"),
        new User(3, "Bob", "Johnson", "bob@example.com")
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
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] User newUser)
    {
        newUser.Id = _users.Max(u =&gt; u.Id) + 1;
        _users.Add(newUser);
        return Ok(newUser);
    }

    [HttpGet("search")]
    public IActionResult SearchUsers([FromQuery] string term)
    {
        var results = _users.Where(u =&gt; 
            u.FirstName.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            u.LastName.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            u.Email.Contains(term, StringComparison.OrdinalIgnoreCase));
        
        return Ok(new { 
            Count = results.Count(),
            Results = results 
        });
    }
}

public record User(int Id, string FirstName, string LastName, string Email);

This controller demonstrates four different scenarios using the Ok method. The
first method returns all users when hitting the base route /api/users.

The second method retrieves a specific user by ID. The third method shows Ok
being used after a successful POST operation to return the created resource.

The fourth method demonstrates returning a complex object with Ok, including both
the search results and a count. This shows how Ok can wrap anonymous types.

The ApiController attribute enables automatic model validation and
other Web API conventions. All methods return appropriate HTTP status codes,
with Ok representing success (200).

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the Ok method in ASP.NET 8. This convenient
helper method simplifies returning successful responses from Web API endpoints.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).