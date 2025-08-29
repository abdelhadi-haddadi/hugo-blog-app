+++
title = "ASP.NET IEnumerable"
date = 2025-08-27T23:21:22.894+01:00
draft = false
description = "ASP.NET IEnumerable tutorial shows how to use
IEnumerable in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IEnumerable

last modified April 3, 2025

In this article, we explore the IEnumerable interface in ASP.NET 8. This
interface is fundamental for working with collections in C# and .NET.

IEnumerable provides a simple way to iterate over collections. It's widely used
in LINQ queries, foreach loops, and data binding scenarios in ASP.NET apps.

## Basic Definition

IEnumerable is an interface in the System.Collections namespace. It exposes an
enumerator that supports simple iteration over a collection of a specified type.

The interface contains a single method: GetEnumerator(). This method returns
an IEnumerator object that can be used to iterate through the collection.

IEnumerable is the base interface for all non-generic collections. Its generic
counterpart, IEnumerable&lt;T&gt;, is preferred in modern .NET applications.

Key features include deferred execution and lazy evaluation. Many LINQ methods
return IEnumerable to enable query composition and efficient execution.

## ASP.NET IEnumerable Example

The following example demonstrates IEnumerable usage in an ASP.NET Web API.

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
using System.Collections;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private static List&lt;Book&gt; _books = new()
    {
        new Book(1, "The Hobbit", "J.R.R. Tolkien"),
        new Book(2, "Dune", "Frank Herbert"),
        new Book(3, "Neuromancer", "William Gibson")
    };

    [HttpGet]
    public IEnumerable&lt;Book&gt; GetAllBooks()
    {
        return _books;
    }

    [HttpGet("filter")]
    public IEnumerable&lt;Book&gt; FilterBooks([FromQuery] string term)
    {
        return _books.Where(b =&gt; 
            b.Title.Contains(term, StringComparison.OrdinalIgnoreCase) ||
            b.Author.Contains(term, StringComparison.OrdinalIgnoreCase));
    }

    [HttpGet("ids")]
    public IEnumerable&lt;int&gt; GetAllBookIds()
    {
        return _books.Select(b =&gt; b.Id);
    }

    [HttpGet("non-generic")]
    public IEnumerable GetNonGenericBooks()
    {
        return _books;
    }
}

public record Book(int Id, string Title, string Author);

This controller demonstrates four different IEnumerable scenarios. The first
method returns all books as IEnumerable&lt;Book&gt; when hitting /api/books.

The second method filters books by title or author using LINQ's Where method.
The third method projects just the book IDs using Select, returning IEnumerable&lt;int&gt;.

The fourth method shows non-generic IEnumerable usage. While functional, the
generic version provides better type safety and is preferred in modern code.

IEnumerable is ideal for API return types because it supports deferred execution.
The actual enumeration happens when the response is being serialized.

## Source

[Microsoft IEnumerable Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerable?view=net-8.0)

In this article, we have explored the IEnumerable interface in ASP.NET 8. This
fundamental interface enables efficient collection processing in .NET apps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).