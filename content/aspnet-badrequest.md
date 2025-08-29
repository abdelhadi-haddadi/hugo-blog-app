+++
title = "ASP.NET BadRequest"
date = 2025-08-27T23:21:08.192+01:00
draft = false
description = "ASP.NET BadRequest tutorial shows how to use BadRequest in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET BadRequest

last modified April 3, 2025

In this article, we explore the BadRequest response in ASP.NET 8. This response
is essential for handling client errors in RESTful APIs and web services.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The BadRequest helper method simplifies error handling.

## Basic Definition

The BadRequest method in ASP.NET returns an HTTP 400 status code response. This
indicates the server cannot process the request due to client error.

BadRequest is typically used when client input validation fails. It can return
a simple status code or include additional error details in the response body.

In ASP.NET Core, BadRequest is available through the ControllerBase class. It's
commonly used in Web API controllers to handle invalid requests.

## ASP.NET BadRequest Example

The following example demonstrates a Web API controller using BadRequest.

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
        new User(1, "john_doe", "john@example.com"),
        new User(2, "jane_smith", "jane@example.com")
    };

    [HttpPost]
    public IActionResult CreateUser([FromBody] UserCreateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username))
        {
            return BadRequest("Username is required");
        }

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            return BadRequest("Email is required");
        }

        if (!request.Email.Contains('@'))
        {
            return BadRequest("Invalid email format");
        }

        if (_users.Any(u =&gt; u.Username == request.Username))
        {
            return BadRequest("Username already exists");
        }

        var newUser = new User(
            _users.Max(u =&gt; u.Id) + 1,
            request.Username,
            request.Email);

        _users.Add(newUser);
        return CreatedAtAction(nameof(GetUserById), 
            new { id = newUser.Id }, newUser);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }
}

public record User(int Id, string Username, string Email);
public record UserCreateRequest(string Username, string Email);

This controller demonstrates multiple BadRequest scenarios. The CreateUser action
validates the request and returns appropriate 400 responses for invalid input.

The first validation checks for empty username. The second checks for empty
email. The third validates email format. The fourth prevents duplicate usernames.

Each validation failure returns a BadRequest with a descriptive message. The
ApiController attribute enables automatic model state validation.

When all validations pass, the action creates the user and returns 201 Created.
This shows proper RESTful status code usage alongside BadRequest for errors.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the BadRequest response in ASP.NET 8. This
essential feature helps build robust APIs with proper error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).