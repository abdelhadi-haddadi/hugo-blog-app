+++
title = "ASP.NET Content"
date = 2025-08-27T23:21:12.247+01:00
draft = false
description = "ASP.NET Content tutorial shows how to use
Content in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Content

last modified April 3, 2025

In this article, we explore the Content method in ASP.NET 8. This method is
used to return content responses with specific MIME types in web applications.

ASP.NET is a cross-platform framework for building modern web applications. The
Content method provides a simple way to return various content types from
controller actions.

## Basic Definition

The Content method in ASP.NET returns a ContentResult object that renders
content to the response. It allows specifying the content, content type, and
encoding.

This method is part of the Controller base class in ASP.NET MVC and Web API. It
is commonly used when you need to return plain text, HTML, XML, or other
content types.

The Content method provides flexibility in response generation. It can be used
for simple text responses or when building custom content types not covered by
other result types.

## ASP.NET Content Example

The following example demonstrates various uses of the Content method in an
ASP.NET controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
AddControllersWithViews method enables MVC features including views.

Controllers/ContentController.cs
  

using Microsoft.AspNetCore.Mvc;

public class ContentController : Controller
{
    [HttpGet("plain")]
    public IActionResult PlainText()
    {
        return Content("This is plain text content", "text/plain");
    }

    [HttpGet("html")]
    public IActionResult HtmlContent()
    {
        var html = @"&lt;html&gt;
            &lt;body&gt;
                &lt;h1&gt;HTML Content&lt;/h1&gt;
                &lt;p&gt;This is HTML content returned from ASP.NET&lt;/p&gt;
            &lt;/body&gt;
        &lt;/html&gt;";
        
        return Content(html, "text/html");
    }

    [HttpGet("xml")]
    public IActionResult XmlContent()
    {
        var xml = @"&lt;?xml version=""1.0"" encoding=""UTF-8""?&gt;
            &lt;note&gt;
                &lt;to&gt;User&lt;/to&gt;
                &lt;from&gt;Server&lt;/from&gt;
                &lt;message&gt;This is XML content&lt;/message&gt;
            &lt;/note&gt;";
            
        return Content(xml, "application/xml");
    }

    [HttpGet("custom")]
    public IActionResult CustomContent()
    {
        var csv = "Id,Name,Price\n1,Laptop,999.99\n2,Mouse,19.99";
        return Content(csv, "text/csv");
    }

    [HttpGet("encoded")]
    public IActionResult EncodedContent()
    {
        return Content("Special characters: &amp; &lt; &gt;", "text/plain", 
            System.Text.Encoding.UTF8);
    }
}

This controller demonstrates five different scenarios using the Content method.
Each action returns a different content type with appropriate MIME type.

The first action returns plain text with the "text/plain" content type. The
second returns HTML content with "text/html" type. The third returns XML data.

The fourth action shows returning custom content type (CSV). The fifth
demonstrates specifying encoding for the content, which is important for
special characters.

Each action is accessible via different routes (/plain, /html, /xml, etc.).
The Content method ensures proper Content-Type headers are set in responses.

## Source

[Microsoft ASP.NET Web API Documentation](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)

In this article, we have explored the Content method in ASP.NET 8. This
versatile method provides precise control over response content types and
formatting.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).