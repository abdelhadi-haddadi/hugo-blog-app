+++
title = "ASP.NET IActionResult"
date = 2025-08-29T19:49:07.574+01:00
draft = false
description = "ASP.NET IActionResult tutorial shows how to use IActionResult in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IActionResult

last modified April 3, 2025

In this article, we explore the IActionResult interface in ASP.NET 8. This
interface is fundamental for building flexible web APIs that return various
HTTP responses.

ASP.NET is a cross-platform framework for building modern web applications.
IActionResult provides a way to return different types of HTTP responses from
controller actions.

## Basic Definition

IActionResult is an interface in ASP.NET Core that represents the result of an
action method. It allows returning different HTTP responses with status codes.

Controller action methods can return IActionResult to provide flexibility in
response types. This includes JSON, views, files, redirects, and status codes.

The interface defines a single method ExecuteResultAsync that
handles writing the response to the HTTP context. Various helper methods in
ControllerBase return IActionResult implementations.

Common implementations include OkResult, NotFoundResult, BadRequestResult,
and ViewResult. These provide standardized ways to return HTTP responses.

## ASP.NET IActionResult Example

The following example demonstrates a Web API controller using IActionResult.

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
        if (user == null) return NotFound($"User with id {id} not found");
        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] User newUser)
    {
        if (newUser == null) return BadRequest("User data is required");
        
        newUser.Id = _users.Max(u =&gt; u.Id) + 1;
        _users.Add(newUser);
        
        return CreatedAtAction(nameof(GetUserById), 
            new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
    {
        var existingUser = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (existingUser == null) return NotFound();
        
        existingUser.Name = updatedUser.Name;
        existingUser.Email = updatedUser.Email;
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _users.FirstOrDefault(u =&gt; u.Id == id);
        if (user == null) return NotFound();
        
        _users.Remove(user);
        return Ok(user);
    }
}

public record User(int Id, string Name, string Email);

This controller demonstrates various IActionResult return types. The Ok
method returns 200 OK with the specified data. NotFound returns 404.

The CreatedAtAction method returns 201 Created with a Location header.
BadRequest returns 400 for invalid requests. NoContent
returns 204 for successful updates.

Each action method returns an appropriate HTTP status code and response format.
This follows REST conventions and provides clear feedback to API consumers.

The example shows how IActionResult enables returning different response types
from the same controller. This flexibility is crucial for building robust APIs.

## Source

[Microsoft ASP.NET Action Return Types Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-8.0)

In this article, we have explored the IActionResult interface in ASP.NET 8. This
powerful feature provides flexibility in returning different HTTP responses from
controller actions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).