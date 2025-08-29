+++
title = "ASP.NET send image"
date = 2025-08-27T23:21:36.320+01:00
draft = false
description = "ASP.NET send image tutorial shows how to serve 
images from an ASP.NET application."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET send image

last modified October 18, 2023

In this article we show how to send images from an ASP.NET application.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

## HTTP Content-Disposition

The Content-Disposition response header is a header indicating if the
content is expected to be displayed inline in the browser or as an attachment,
that is downloaded and saved locally.

## Media type

A media type or MIME type is a specific metadata information which indicates the
nature and format of a file. Servers can send various types of files including 
text files, HTML files, PDF, Excel or image files.

## ASP.NET send image inline

In the first example, we send an image inline. 

The Results.File function writes the file at the specified path to
the response.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/image", () =&gt;
{
    var mimeType = "image/png";
    var path = Path.Combine(builder.Environment.ContentRootPath, 
        "images/sid.png");

    return Results.File(path, contentType: mimeType);
});

app.Run("http://localhost:3000");

We have one endpoint which sends an image. We do not specify the
Content-Disposition; the default is inline.

var mimeType = "image/png";

We define a mime type. It is a PNG image.

var path = Path.Combine(builder.Environment.ContentRootPath, 
    "images/sid.png");

We build the path to the image.

return Results.File(path, contentType: mimeType);

We return the image to the client with Results.File.

## ASP.NET send image as attachment

In the next example, we send the image as an attachment.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/image", (HttpResponse response) =&gt;
{
    var mimeType = "image/png";
    var path = Path.Combine(builder.Environment.ContentRootPath, 
        "images/sid.png");

    response.Headers.Add("Content-Disposition", "attachment;filename=sid.png");
    return Results.File(path, contentType: mimeType);
});

app.Run("http://localhost:3000");

We need to set the Content-Disposition to attachment.

app.MapGet("/image", (HttpResponse response) =&gt;

To change a header, we need the HttpResponse object.

response.Headers.Add("Content-Disposition", "attachment;filename=sid.png");

We add the Content-Disposition header.

## ASP.NET send image with view

The following example shows how to send an image within a static HTML file.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endppoints =&gt;
{
    endppoints.MapDefaultControllerRoute();
});

app.Run("http://localhost:3000");

We have a MVC web application. We set up routing, controllers and views.

app.UseStaticFiles();

We enable static file serving. The static files are located in
wwwroot directory by default.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace ServeImageEx.Controllers;

public class HomeController : Controller
{
    [HttpGet("image")]
    public IActionResult Image()
    {
        return View();
    }
}

We have one action in the HomeController. It simply returns a view.

Views/Home/Image.cshtml
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Image&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h2&gt;Sid the sloth&lt;/h2&gt;

    &lt;p&gt;
        &lt;img src="~/images/sid.png"&gt;
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

In the view file, we have an img tag. It points to the PNG file 
in wwwroot/images directory.

In this article we have served image files from an ASP.NET application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).