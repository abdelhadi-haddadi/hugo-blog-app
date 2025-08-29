+++
title = "VBScript SetRequestHeader Method"
date = 2025-08-29T20:15:38.834+01:00
draft = false
description = "Learn about VBScript SetRequestHeader method, including HTTP headers, web requests, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetRequestHeader Method

last modified April 9, 2025

The SetRequestHeader method in VBScript is part of the
XMLHTTP object. It sets the value of an HTTP header to be sent with
a request. This method must be called after calling open but before
send. It allows customization of HTTP requests with specific headers.

SetRequestHeader is essential for API interactions and web scraping.
It enables sending authentication tokens, content types, and custom headers.
This tutorial covers SetRequestHeader with practical examples to
demonstrate its usage.

## SetRequestHeader Method Overview

The SetRequestHeader method takes two parameters: the header name
and its value. It doesn't return any value. The method is available through the
XMLHTTP object in VBScript for making HTTP requests.

Key features include setting standard and custom HTTP headers. Headers must be
set after opening the connection but before sending. Multiple headers can be set
for a single request. Understanding this method helps create robust web clients.

## Basic Header Setting

This example demonstrates the simplest use of SetRequestHeader to
set a Content-Type header. It shows how to prepare a POST request with JSON
content. The header informs the server about the data format being sent.

basic_header.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "POST", "https://api.example.com/data", False
http.SetRequestHeader "Content-Type", "application/json"
http.Send "{""name"":""John""}"

WScript.Echo http.responseText

Set http = Nothing

The script creates an XMLHTTP object and opens a POST request.
SetRequestHeader sets the Content-Type to application/json. The
server will interpret the sent data as JSON. Finally, the response is displayed.

## Setting Authorization Header

This example shows how to set an Authorization header for API authentication.
Many web services require Bearer tokens or API keys in headers. The method
ensures secure transmission of credentials.

auth_header.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/protected", False
http.SetRequestHeader "Authorization", "Bearer abc123xyz456"
http.Send

WScript.Echo http.status &amp; " " &amp; http.statusText

Set http = Nothing

The script sets an Authorization header with a Bearer token. This is common in
OAuth2 authentication flows. The token grants access to protected resources.
The response status indicates whether authentication succeeded.

## Setting Multiple Headers

SetRequestHeader can be called multiple times to set several
headers. This example shows setting both Content-Type and Accept headers.
Different headers serve different purposes in HTTP communication.

multiple_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://api.example.com/users", False
http.SetRequestHeader "Content-Type", "application/json"
http.SetRequestHeader "Accept", "application/json"
http.SetRequestHeader "X-Custom-Header", "MyValue"
http.Send

WScript.Echo http.responseText

Set http = Nothing

Three headers are set: Content-Type, Accept, and a custom header. Content-Type
describes sent data, Accept specifies preferred response format. Custom headers
enable additional server-side processing. Each header is set with a separate call.

## Setting User-Agent Header

This example demonstrates setting the User-Agent header to identify the client.
Some servers require specific User-Agent values or block unknown agents. The
header helps servers tailor responses to client capabilities.

user_agent.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://www.example.com", False
http.SetRequestHeader "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
http.Send

WScript.Echo http.responseText

Set http = Nothing

The script sets a common browser User-Agent string. This can help avoid being
blocked as a bot. The string identifies the client as Windows 10 with 64-bit
architecture. Servers may serve different content based on User-Agent.

## Setting Custom Headers

Custom headers allow sending application-specific data with requests. This
example shows setting a custom X-Request-ID header. Such headers are often used
for tracking requests through systems.

custom_header.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "POST", "https://api.example.com/log", False
http.SetRequestHeader "X-Request-ID", "123e4567-e89b-12d3-a456-426614174000"
http.SetRequestHeader "X-API-Version", "2.0"
http.Send "Test message"

WScript.Echo "Request completed with ID"

Set http = Nothing

Two custom headers are set: X-Request-ID with a UUID and X-API-Version. These
headers don't affect HTTP protocol behavior but are processed by the application.
Custom headers typically start with X- to avoid conflicts with standard headers.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760874(v=vs.85))

In this article, we have explored the SetRequestHeader method in
VBScript, covering its usage and practical applications. From basic content
types to custom headers, these examples demonstrate flexible HTTP request
customization. With this knowledge, you can enhance your web interaction scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).