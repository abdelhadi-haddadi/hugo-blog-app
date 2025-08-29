+++
title = "PowerShell Invoke-WebRequest"
date = 2025-08-29T20:07:05.224+01:00
draft = false
description = "PowerShell Invoke-WebRequest tutorial shows how to use PowerShell to make web requests and work with web content."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Invoke-WebRequest

last modified February 15, 2025

In this article, we will cover the Invoke-WebRequest cmdlet in
PowerShell. This cmdlet sends HTTP/HTTPS requests to web pages and REST APIs.
It returns web responses including status codes, headers, and content.

## Web request basics

Invoke-WebRequest is PowerShell's primary cmdlet for web interactions.
It supports GET, POST, PUT, DELETE and other HTTP methods. The cmdlet returns
a response object containing headers, status code, and content. It can parse
HTML and extract elements using DOM methods.

## Basic GET request

The simplest usage is making a GET request to a URL. This retrieves the web
page content. The response object contains properties like StatusCode and
Content. By default, PowerShell follows up to 5 redirects automatically.

webrequest1.ps1
  

$response = Invoke-WebRequest -Uri "https://example.com"
$response.Content

This makes a GET request to example.com and stores the response. The Content
property contains the raw HTML. Other useful properties include StatusCode
and Headers.

## Extracting links from a page

Invoke-WebRequest can parse HTML and extract elements. The Links
property contains all anchor tags from the page. Each link has href and
innerText properties. This is useful for web scraping tasks.

webrequest2.ps1
  

$response = Invoke-WebRequest -Uri "https://example.com"
$response.Links | Select-Object href, innerText

This retrieves all links from example.com and displays their URLs and text.
The Select-Object cmdlet filters the output to show only relevant properties.

## Sending POST request with data

To send data to a web API, use the POST method with a body. The Body
parameter accepts hashtables or JSON strings. Headers can be added with
the Headers parameter. This is common for REST API interactions.

webrequest3.ps1
  

$body = @{
    username = "admin"
    password = "secret"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "https://api.example.com/login" `
    -Method Post -Body $body -ContentType "application/json"
$response.StatusCode

This sends a JSON payload to a login API endpoint. The ConvertTo-Json cmdlet
converts the hashtable to JSON format. The response's status code indicates
success or failure.

## Handling authentication

Invoke-WebRequest supports various authentication methods. Use the
Credential parameter for basic auth. For OAuth, include bearer tokens in
headers. Windows authentication is available through -UseDefaultCredentials.

webrequest4.ps1
  

$cred = Get-Credential
$response = Invoke-WebRequest -Uri "https://api.example.com/data" `
    -Credential $cred
$response.Content

This prompts for credentials and uses them for basic authentication. The
Get-Credential cmdlet securely collects username and password. The credentials
are sent in the Authorization header.

## Saving web content to file

Web content can be saved directly to a file using the OutFile parameter.
This avoids memory issues with large downloads. The PassThru parameter
returns the response object while saving. Progress can be tracked with
the Verbose parameter.

webrequest5.ps1
  

Invoke-WebRequest -Uri "https://example.com/largefile.zip" `
    -OutFile "C:\downloads\file.zip" -Verbose

This downloads a file directly to disk while showing progress. The Verbose
parameter provides download status updates. For large files, this method is
more efficient than storing in memory.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Invoke-WebRequest cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).