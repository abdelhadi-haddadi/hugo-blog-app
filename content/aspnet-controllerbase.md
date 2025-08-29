+++
title = "ASP.NET ControllerBase"
date = 2025-08-29T19:48:59.708+01:00
draft = false
description = "ASP.NET ControllerBase tutorial shows how to use ControllerBase in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET ControllerBase

last modified April 3, 2025

In this article, we explore the ControllerBase class in ASP.NET 8. This base
class is essential for building Web API controllers without view support.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. ControllerBase provides core functionality for handling HTTP requests.

## Basic Definition

ControllerBase is an abstract base class in ASP.NET Core for creating MVC
controllers without view support. It's designed specifically for Web API scenarios.

Unlike Controller, which includes view support, ControllerBase focuses on HTTP
request handling. It provides access to Request, Response, and other HTTP context.

ControllerBase includes helper methods for common HTTP responses like Ok, NotFound,
and BadRequest. These methods simplify returning proper HTTP status codes.

The class is part of the Microsoft.AspNetCore.Mvc namespace. It's the recommended
base class for API controllers in ASP.NET Core applications.

## ASP.NET ControllerBase Example

The following example demonstrates a Web API controller using ControllerBase.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/TasksController.cs
  

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List&lt;TaskItem&gt; _tasks = new()
    {
        new TaskItem(1, "Complete project", false),
        new TaskItem(2, "Write documentation", true),
        new TaskItem(3, "Review code", false)
    };

    [HttpGet]
    public ActionResult&lt;IEnumerable&lt;TaskItem&gt;&gt; GetAllTasks()
    {
        return Ok(_tasks);
    }

    [HttpGet("{id}")]
    public ActionResult&lt;TaskItem&gt; GetTaskById(int id)
    {
        var task = _tasks.FirstOrDefault(t =&gt; t.Id == id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public IActionResult AddTask([FromBody] TaskItem task)
    {
        task.Id = _tasks.Max(t =&gt; t.Id) + 1;
        _tasks.Add(task);
        return CreatedAtAction(nameof(GetTaskById), 
            new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
    {
        var existingTask = _tasks.FirstOrDefault(t =&gt; t.Id == id);
        if (existingTask == null) return NotFound();
        
        existingTask.Title = updatedTask.Title;
        existingTask.IsCompleted = updatedTask.IsCompleted;
        
        return NoContent();
    }
}

public record TaskItem(int Id, string Title, bool IsCompleted);

This controller demonstrates a complete CRUD API using ControllerBase. It handles
GET, POST, and PUT requests for managing task items.

The ActionResult&lt;T&gt; return type provides better OpenAPI/Swagger
documentation. It combines the benefits of strong typing with HTTP semantics.

The CreatedAtAction method in the POST handler returns a 201 status
with a Location header. This follows REST best practices for resource creation.

ControllerBase's helper methods like Ok, NotFound, and
NoContent simplify returning proper HTTP responses. The example shows
common patterns for Web API development.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the ControllerBase class in ASP.NET 8. This
powerful base class simplifies Web API development with its helper methods.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).