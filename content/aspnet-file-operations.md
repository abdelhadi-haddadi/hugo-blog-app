+++
title = "ASP.NET File Operations"
date = 2025-08-27T23:21:15.713+01:00
draft = false
description = "ASP.NET File tutorial shows how to work with files in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET File Operations

last modified April 3, 2025

In this article, we explore file operations in ASP.NET 8 using the File class.
The System.IO.File class provides static methods for file creation, copying,
deletion, and other operations.

ASP.NET is a cross-platform framework for building modern web applications.
File operations are essential for handling uploads, downloads, and data storage.

## Basic Definition

The File class in .NET provides static methods for file manipulation. It's part
of the System.IO namespace and works with the file system in a platform-neutral
way.

File operations include creating, copying, moving, deleting, and reading/writing
files. The class also provides methods for checking file existence and attributes.

In ASP.NET, file operations are commonly used for handling file uploads, serving
downloads, logging, and configuration. Always handle file operations with proper
error handling.

## ASP.NET File Example

The following example demonstrates various file operations in an ASP.NET Web API.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();
app.Run();

This sets up a basic ASP.NET application with controller support. The
MapControllers method enables attribute routing for controllers.

Controllers/FileController.cs
  

using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
    private readonly string _basePath = Path.Combine(Directory.GetCurrentDirectory(), "Files");

    [HttpPost("upload")]
    public async Task&lt;IActionResult&gt; UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        Directory.CreateDirectory(_basePath);
        var filePath = Path.Combine(_basePath, file.FileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { filePath, file.Length });
    }

    [HttpGet("download/{fileName}")]
    public IActionResult DownloadFile(string fileName)
    {
        var filePath = Path.Combine(_basePath, fileName);
        
        if (!System.IO.File.Exists(filePath))
            return NotFound();

        var fileStream = System.IO.File.OpenRead(filePath);
        return File(fileStream, "application/octet-stream", fileName);
    }

    [HttpGet("info/{fileName}")]
    public IActionResult GetFileInfo(string fileName)
    {
        var filePath = Path.Combine(_basePath, fileName);
        
        if (!System.IO.File.Exists(filePath))
            return NotFound();

        var fileInfo = new FileInfo(filePath);
        return Ok(new {
            fileName,
            fileInfo.Length,
            fileInfo.CreationTime,
            fileInfo.LastAccessTime
        });
    }

    [HttpDelete("delete/{fileName}")]
    public IActionResult DeleteFile(string fileName)
    {
        var filePath = Path.Combine(_basePath, fileName);
        
        if (!System.IO.File.Exists(filePath))
            return NotFound();

        System.IO.File.Delete(filePath);
        return NoContent();
    }
}

This controller demonstrates four file operations: upload, download, get info,
and delete. The _basePath field stores the directory for file storage.

The UploadFile method handles file uploads using IFormFile.
It creates the Files directory if it doesn't exist and saves the uploaded file.

The DownloadFile method reads a file from disk and returns it as a
download. The File helper method creates an appropriate response.

The GetFileInfo method uses FileInfo to retrieve file
metadata. The DeleteFile method demonstrates file deletion with
proper existence checking.

All methods include proper error handling and return appropriate HTTP status
codes. The example shows both synchronous and asynchronous file operations.

## Source

[Microsoft File Class Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.io.file?view=net-8.0)

In this article, we have explored file operations in ASP.NET 8. The File class
provides powerful methods for working with files in a cross-platform manner.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).