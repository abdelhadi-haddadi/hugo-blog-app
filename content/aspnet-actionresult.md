+++
title = "ASP.NET ActionResult"
date = 2025-08-27T23:21:02.780+01:00
draft = false
description = "ASP.NET ActionResult tutorial shows how to use ActionResult in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ActionResult

last modified April 3, 2025

In this article, we explore the ActionResult type in ASP.NET 8. ActionResult is
a fundamental return type for controller actions in ASP.NET applications.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ActionResult provides a flexible way to return HTTP responses.

## Basic Definition

ActionResult is a base class in ASP.NET that represents the result of an action
method. It encapsulates both the response data and the HTTP status code.

ActionResult provides various derived types for common HTTP responses like
OkResult, NotFoundResult, and BadRequestResult. These simplify returning
standard HTTP responses.

Using ActionResult makes your API more flexible and maintainable. It allows
returning different response types from the same action method when needed.

## ASP.NET ActionResult Example

The following example demonstrates various ActionResult return types in a Web API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/BooksController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private static List&lt;Book&gt; _books = new()
    {
        new Book(1, "The Great Gatsby", "F. Scott Fitzgerald"),
        new Book(2, "1984", "George Orwell"),
        new Book(3, "To Kill a Mockingbird", "Harper Lee")
    };

    [HttpGet]
    public ActionResult&lt;IEnumerable&lt;Book&gt;&gt; GetAllBooks()
    {
        return Ok(_books);
    }

    [HttpGet("{id}")]
    public ActionResult&lt;Book&gt; GetBookById(int id)
    {
        var book = _books.FirstOrDefault(b =&gt; b.Id == id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [HttpPost]
    public ActionResult&lt;Book&gt; AddBook([FromBody] Book newBook)
    {
        if (newBook == null) return BadRequest();
        
        newBook.Id = _books.Max(b =&gt; b.Id) + 1;
        _books.Add(newBook);
        
        return CreatedAtAction(nameof(GetBookById), 
            new { id = newBook.Id }, newBook);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var existingBook = _books.FirstOrDefault(b =&gt; b.Id == id);
        if (existingBook == null) return NotFound();
        
        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteBook(int id)
    {
        var book = _books.FirstOrDefault(b =&gt; b.Id == id);
        if (book == null) return NotFound();
        
        _books.Remove(book);
        return NoContent();
    }
}

public record Book(int Id, string Title, string Author);

This controller demonstrates various ActionResult return types for a RESTful API.
The ActionResult&lt;T&gt; generic type provides better Swagger
documentation and type safety.

The GetAllBooks method returns an OkObjectResult with
the book list. GetBookById returns either the book or a 404 status.

The AddBook method shows how to return a 201 Created response with
location header. UpdateBook and DeleteBook return 204
NoContent for successful operations.

This example covers all CRUD operations with appropriate HTTP status codes and
response types. It demonstrates the flexibility of ActionResult in handling
different response scenarios.

## Source

[Microsoft ASP.NET Action Return Types Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/action-return-types?view=aspnetcore-8.0)

In this article, we have explored the ActionResult type in ASP.NET 8. This
powerful feature provides a flexible way to return HTTP responses from actions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).