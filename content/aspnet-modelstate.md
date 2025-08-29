+++
title = "ASP.NET ModelState"
date = 2025-08-27T23:21:28.442+01:00
draft = false
description = "ASP.NET ModelState tutorial shows how to use
ModelState in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ModelState

last modified April 3, 2025

In this article, we explore ModelState in ASP.NET 8. ModelState is a crucial
component for handling model validation and error reporting in web applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ModelState provides a way to track validation state of model data.

## Basic Definition

ModelState in ASP.NET represents the state of model binding and validation. It
contains information about submitted values, validation errors, and model state.

The ModelState property is available in controllers through the ControllerBase
class. It's a dictionary-like structure that holds model binding and validation
results for each property.

ModelState is automatically populated during model binding when using the
[ApiController] attribute. It's commonly used to check validation results
before processing requests.

## ASP.NET ModelState Example

The following example demonstrates how to use ModelState for validation in a
Web API controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
AddControllers method enables model binding and validation.

Controllers/UsersController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateUser([FromBody] UserDto user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Process valid user data
        return Ok(new { Message = "User created successfully", User = user });
    }
}

public class UserDto
{
    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 8)]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", 
        ErrorMessage = "Password must be complex")]
    public string Password { get; set; }

    [Range(18, 120, ErrorMessage = "Age must be between 18 and 120")]
    public int Age { get; set; }
}

This controller demonstrates ModelState validation for a user creation endpoint.
The CreateUser method checks ModelState.IsValid before processing.

When validation fails, it returns a 400 Bad Request with the ModelState errors.
The UserDto class defines validation rules using data annotations attributes.

The [Required] attribute ensures fields aren't empty. [StringLength] validates
length constraints. [EmailAddress] checks email format. [RegularExpression]
validates password complexity.

The example shows how ModelState automatically collects validation errors from
data annotations. It provides a consistent way to handle validation failures
in API responses.

## Source

[Microsoft ASP.NET Model Validation Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-8.0)

In this article, we have explored ModelState in ASP.NET 8. This powerful
feature simplifies model validation and error handling in web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).