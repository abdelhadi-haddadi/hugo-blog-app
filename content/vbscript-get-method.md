+++
title = "VBScript Get Method"
date = 2025-08-29T20:15:42.163+01:00
draft = false
description = "Learn about VBScript Get Method, including HTTP requests, web operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Get Method

last modified April 9, 2025

The Get method in VBScript is part of the
MSXML2.XMLHTTP object. It sends an HTTP GET request to a specified
URL and retrieves the response. This method is commonly used for web scraping,
API interactions, and fetching remote resources. It works synchronously by
default but can be configured for asynchronous operation.

Get is essential for client-server communication in VBScript. It
supports various HTTP operations and response handling. This tutorial covers
Get with practical examples to demonstrate its usage in different
scenarios.

## Get Method Overview

The Get method initiates an HTTP GET request to a specified URL. It
is available through the MSXML2.XMLHTTP object in VBScript. The
method retrieves data from the specified resource without modifying it.

Key features include support for HTTP/HTTPS protocols and various response
formats. It can handle text, XML, JSON, and binary data. Understanding this
method helps create robust web interaction scripts. The method is synchronous by
default but supports async operations.

## Basic HTTP GET Request

This example demonstrates the simplest use of Get to fetch content
from a web page. It shows how to create the XMLHTTP object, send the request,
and read the response. The response text is displayed in the console.

basic_get.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send

WScript.Echo http.responseText

Set http = Nothing

The script creates an XMLHTTP object and calls Open
with "GET" method. The third parameter (False) makes the request synchronous.
Send executes the request, and responseText contains
the server's response.

## GET Request with Query Parameters

This example shows how to send a GET request with query parameters appended to
the URL. Parameters are added after a question mark in the URL. Multiple
parameters are separated by ampersands.

get_with_params.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
url = "https://api.example.com/data?name=John&amp;age=30"
http.Open "GET", url, False
http.Send

WScript.Echo "Status: " &amp; http.status
WScript.Echo "Response: " &amp; http.responseText

Set http = Nothing

The URL includes query parameters "name=John" and "age=30". The script displays
both the HTTP status code and response text. This format is common for REST API
requests. Always URL-encode special characters in parameter values.

## Handling JSON Response

This example demonstrates processing a JSON response from a GET request. The
response is parsed using the ScriptControl object. This allows
accessing JSON properties like regular objects.

json_response.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/users/1", False
http.Send

Set sc = CreateObject("MSScriptControl.ScriptControl")
sc.Language = "JScript"
Set user = sc.Eval("(" &amp; http.responseText &amp; ")")

WScript.Echo "User: " &amp; user.name &amp; ", Email: " &amp; user.email

Set sc = Nothing
Set http = Nothing

The script fetches user data in JSON format. ScriptControl converts
the JSON string to an object. Properties are accessed using dot notation. This
approach simplifies working with JSON APIs in VBScript.

## GET Request with Headers

This example shows how to add custom headers to a GET request. Headers are set
after opening the request but before sending it. Common headers include
Authorization and Content-Type.

get_with_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/protected", False
http.setRequestHeader "Authorization", "Bearer abc123"
http.setRequestHeader "Accept", "application/json"
http.Send

WScript.Echo "Status: " &amp; http.status
WScript.Echo "Response: " &amp; http.responseText

Set http = Nothing

The script sets Authorization and Accept headers before sending the request.
Headers modify how the server processes the request. The Authorization header is
common for protected resources. Always secure sensitive header information.

## Asynchronous GET Request

This example demonstrates an asynchronous GET request using the
onreadystatechange event. The script continues execution while
waiting for the response. The event handler processes the response when ready.

async_get.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")

Sub Handler()
    If http.readyState = 4 Then
        WScript.Echo "Response: " &amp; http.responseText
        WScript.Quit
    End If
End Sub

http.onreadystatechange = GetRef("Handler")
http.Open "GET", "https://example.com", True
http.Send

WScript.Echo "Waiting for response..."
While True
    WScript.Sleep 100
Wend

The script sets True as the async parameter in Open. The handler
checks readyState for completion (value 4). This approach prevents
blocking during network operations. The main loop keeps the script running until
response arrives.

## Source

[MSXML2.XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760291(v=vs.85))

In this article, we have explored the Get method in VBScript,
covering its usage and practical applications. From simple requests to advanced
async operations, these examples demonstrate web interaction capabilities. With
this knowledge, you can enhance your scripts with robust HTTP communication.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).