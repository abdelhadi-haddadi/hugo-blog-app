+++
title = "ASP.NET Route"
date = 2025-08-27T23:21:35.203+01:00
draft = false
description = "ASP.NET Route tutorial shows how to use Route in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Route

last modified April 3, 2025

In this article, we explore routing in ASP.NET 8. Routing is fundamental for
mapping incoming requests to controller actions in web applications.

ASP.NET routing enables clean URLs and flexible request handling. It's essential
for building RESTful APIs and MVC applications in .NET 8.

## Basic Definition

Routing in ASP.NET is the process of matching incoming HTTP requests to
executable endpoints (actions). It examines the URL and HTTP method to determine
the appropriate handler.

ASP.NET supports two routing approaches: conventional routing and attribute
routing. Attribute routing provides more control with route templates defined
directly on controllers and actions.

The Route attribute can be applied at both controller and action levels. It
accepts templates that define URL patterns and parameter constraints.

Route parameters are enclosed in curly braces {}. They can have constraints and
default values. ASP.NET automatically binds these to action method parameters.

## ASP.NET Route Example

The following example demonstrates attribute routing in an ASP.NET 8 Web API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This basic setup enables attribute routing in ASP.NET. The MapControllers
method scans for Route attributes on controllers and actions.

Controllers/BooksController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private static List&lt;Book&gt; _books = new()
    {
        new Book(1, "The Hobbit", "J.R.R. Tolkien"),
        new Book(2, "Dune", "Frank Herbert"),
        new Book(3, "Neuromancer", "William Gibson")
    };

    [HttpGet]
    public IActionResult GetAllBooks()
    {
        return Ok(_books);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetBookById(int id)
    {
        var book = _books.FirstOrDefault(b =&gt; b.Id == id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [HttpGet("author/{authorName}")]
    public IActionResult GetBooksByAuthor(string authorName)
    {
        var books = _books.Where(b =&gt; 
            b.Author.Contains(authorName, StringComparison.OrdinalIgnoreCase));
        return Ok(books);
    }

    [HttpGet("search")]
    public IActionResult SearchBooks([FromQuery] string term)
    {
        var results = _books.Where(b =&gt; 
            b.Title.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            b.Author.Contains(term, StringComparison.OrdinalIgnoreCase));
        return Ok(results);
    }
}

public record Book(int Id, string Title, string Author);

This controller demonstrates various routing scenarios. The base route
api/books is defined at the controller level.

The first action responds to GET requests at the base route. The second action
includes a route parameter {id:int} with a type constraint.

The third action shows a more complex route pattern with
author/{authorName}. The fourth action uses query parameters for
search functionality.

Type constraints in routes (:int) ensure parameter values match
the expected type. ASP.NET returns 404 for requests with invalid parameter
types.

The example shows how route templates can be combined with HTTP method
attributes to create clean, RESTful APIs with meaningful URLs.

## Source

[Microsoft ASP.NET Routing Documentation](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-8.0)

In this article, we have explored routing in ASP.NET 8. Proper routing setup is
essential for creating maintainable and user-friendly web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).