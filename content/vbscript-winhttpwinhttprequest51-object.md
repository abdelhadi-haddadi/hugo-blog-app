+++
title = "VBScript WinHttp.WinHttpRequest.5.1 Object"
date = 2025-08-29T20:15:41.074+01:00
draft = false
description = "Learn about VBScript WinHttp.WinHttpRequest.5.1 object, including HTTP requests, web operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript WinHttp.WinHttpRequest.5.1 Object

last modified April 9, 2025

The WinHttp.WinHttpRequest.5.1 object in VBScript provides HTTP
client functionality for making web requests. It supports GET, POST, and other
HTTP methods with full header control. This COM object is part of Windows HTTP
Services and works without additional dependencies.

WinHttpRequest is ideal for automation scripts needing web access.
It handles cookies, authentication, and secure connections. This tutorial covers
the object with practical examples demonstrating common use cases. You'll learn
to make various HTTP requests and process responses.

## WinHttpRequest Object Overview

The WinHttpRequest object represents an HTTP client capable of
sending requests to web servers. Key methods include Open,
Send, and SetRequestHeader. Properties like
ResponseText and Status provide access to results.

The object supports synchronous and asynchronous operation modes. It works with
HTTP and HTTPS protocols. Common uses include web scraping, API interaction, and
automated testing. Understanding this object enables powerful web automation in
VBScript.

## Basic GET Request

This example demonstrates the simplest GET request to fetch webpage content. It
shows how to initialize the object, send a request, and read the response. The
script retrieves and displays the content of a public test API endpoint.

basic_get.vbs
  

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "GET", "https://jsonplaceholder.typicode.com/posts/1", False
http.Send

WScript.Echo "Status: " &amp; http.Status
WScript.Echo "Response: " &amp; http.ResponseText

Set http = Nothing

The script creates a WinHttpRequest object and opens a GET request.
The third parameter (False) specifies synchronous operation. After sending, it
displays the HTTP status and response text. This pattern forms the basis for all
HTTP requests.

## POST Request with JSON Data

This example shows how to send a POST request with JSON data. It demonstrates
setting request headers and including a request body. The script posts data to a
test API and displays the server's response.

post_json.vbs
  

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "POST", "https://jsonplaceholder.typicode.com/posts", False
http.SetRequestHeader "Content-Type", "application/json"

postData = "{""title"":""foo"",""body"":""bar"",""userId"":1}"
http.Send postData

WScript.Echo "Status: " &amp; http.Status
WScript.Echo "Response: " &amp; http.ResponseText

Set http = Nothing

The script sets the Content-Type header to indicate JSON data. The request body
contains properly formatted JSON. The server responds with the created resource
including an assigned ID. This pattern works with most REST APIs.

## Handling Request Headers

This example demonstrates setting and reading HTTP headers. It shows both sending
custom headers and examining response headers. The script includes a User-Agent
header and displays all response headers.

request_headers.vbs
  

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "GET", "https://httpbin.org/get", False
http.SetRequestHeader "User-Agent", "MyVBScriptClient/1.0"
http.Send

WScript.Echo "Status: " &amp; http.Status
WScript.Echo "All Headers: " &amp; http.GetAllResponseHeaders()
WScript.Echo "Content-Type: " &amp; http.GetResponseHeader("Content-Type")

Set http = Nothing

The script sets a custom User-Agent string before sending the request. After
receiving the response, it displays all headers and a specific header value.
Header handling is essential for proper API communication and web scraping.

## Error Handling in Requests

This example shows proper error handling for HTTP requests. It demonstrates
checking the status code and handling potential errors. The script attempts to
access a non-existent URL and handles the 404 error gracefully.

error_handling.vbs
  

On Error Resume Next

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "GET", "https://jsonplaceholder.typicode.com/nonexistent", False
http.Send

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error: " &amp; Err.Description
ElseIf http.Status &gt;= 400 Then
    WScript.Echo "HTTP Error: " &amp; http.Status &amp; " " &amp; http.StatusText
Else
    WScript.Echo "Success: " &amp; http.ResponseText
End If

Set http = Nothing

The script uses On Error Resume Next to prevent crashes from
network errors. It checks both VBScript errors and HTTP status codes. This
approach ensures robust script execution even when requests fail.

## Downloading Binary Data

This example demonstrates downloading binary data (like an image) and saving it
to a file. It shows how to handle binary responses using
ResponseBody. The script downloads a small image and saves it
locally.

download_binary.vbs
  

Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
http.Open "GET", "https://httpbin.org/image/png", False
http.Send

If http.Status = 200 Then
    Set stream = CreateObject("ADODB.Stream")
    stream.Type = 1 ' Binary
    stream.Open
    stream.Write http.ResponseBody
    stream.SaveToFile "downloaded.png", 2 ' Overwrite
    stream.Close
    WScript.Echo "Image saved successfully"
Else
    WScript.Echo "Download failed: " &amp; http.Status
End If

Set stream = Nothing
Set http = Nothing

The script uses ADODB.Stream to handle the binary response data.
ResponseBody returns the raw bytes of the response. This technique
works for any binary file type including images, PDFs, and executables.

## Source

[WinHttpRequest Documentation](https://learn.microsoft.com/en-us/windows/win32/winhttp/winhttprequest)

In this article, we have explored the WinHttp.WinHttpRequest.5.1
object in VBScript. From simple GET requests to binary downloads, these examples
demonstrate powerful web capabilities. With this knowledge, you can automate web
interactions and integrate web services into your scripts effectively.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).