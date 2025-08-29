+++
title = "VBScript GetResponseHeader Method"
date = 2025-08-29T20:15:34.364+01:00
draft = false
description = "Learn about VBScript GetResponseHeader method, including HTTP header retrieval, web requests, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetResponseHeader Method

last modified April 9, 2025

The GetResponseHeader method in VBScript is part of the
XMLHTTP object. It retrieves specific HTTP response headers from
a web request. This method is essential for analyzing server responses and
extracting metadata. It's commonly used in web scraping and API interactions.

GetResponseHeader requires a completed HTTP request before calling.
It returns header values as strings or null if the header doesn't exist. This
tutorial covers GetResponseHeader with practical examples to
demonstrate its usage in various scenarios.

## GetResponseHeader Method Overview

The GetResponseHeader method takes one parameter: the header name.
It returns the header value as a string. The method is available through the
XMLHTTP object after sending a request and receiving a response.

Key features include case-insensitive header name matching and null returns for
missing headers. It only works after the request completes successfully.
Understanding this method helps create robust web interaction scripts.

## Retrieving Content-Type Header

This example demonstrates retrieving the Content-Type header from a web response.
It shows basic usage of GetResponseHeader with a common HTTP header.
The script makes a request to a test server and extracts the content type.

get_content_type.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/get", False
http.Send

contentType = http.GetResponseHeader("Content-Type")
WScript.Echo "Content-Type: " &amp; contentType ' Output: Content-Type: application/json

Set http = Nothing

The script creates an XMLHTTP object and sends a GET request. After receiving the
response, it retrieves the Content-Type header. The output shows the MIME type
of the response, typically application/json for this test endpoint.

## Checking for Server Header

This example shows how to check for the Server header in a response. It
demonstrates handling cases where a header might not exist. The script includes
basic error checking for missing headers.

check_server_header.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/get", False
http.Send

serverHeader = http.GetResponseHeader("Server")
If Not IsNull(serverHeader) Then
    WScript.Echo "Server: " &amp; serverHeader
Else
    WScript.Echo "Server header not found"
End If

Set http = Nothing

The script attempts to retrieve the Server header from the response. It checks if
the returned value is null before displaying it. This pattern is useful for
optional headers that might not be present in all responses.

## Getting Multiple Headers

This example demonstrates retrieving multiple headers from a single response. It
shows how to systematically examine several important HTTP headers. The script
collects and displays multiple header values.

multiple_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/get", False
http.Send

headers = Array("Content-Type", "Date", "Connection")
For Each header In headers
    value = http.GetResponseHeader(header)
    WScript.Echo header &amp; ": " &amp; IIf(IsNull(value), "N/A", value)
Next

Set http = Nothing

Function IIf(expr, trueVal, falseVal)
    If expr Then IIf = trueVal Else IIf = falseVal
End Function

The script creates an array of header names to check. It loops through each
header name and retrieves its value. The IIf helper function handles null values
gracefully, displaying "N/A" for missing headers.

## Handling Redirect Headers

This example focuses on retrieving Location headers for redirect responses. It
shows how to follow redirects manually by examining response headers. The script
demonstrates handling 3xx status codes.

redirect_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/redirect/1", False
http.Send

If http.status &gt;= 300 And http.status &lt; 400 Then
    location = http.GetResponseHeader("Location")
    WScript.Echo "Redirect to: " &amp; location
Else
    WScript.Echo "No redirect (Status: " &amp; http.status &amp; ")"
End If

Set http = Nothing

The script makes a request to a URL that returns a redirect. It checks the
status code and retrieves the Location header if appropriate. This technique is
useful for custom redirect handling in web clients.

## Examining Cache Headers

This example shows how to retrieve cache-related headers from a response. It
demonstrates examining Cache-Control and Expires headers. The script helps
understand caching behavior of web resources.

cache_headers.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/cache/60", False
http.Send

cacheControl = http.GetResponseHeader("Cache-Control")
expires = http.GetResponseHeader("Expires")

WScript.Echo "Cache-Control: " &amp; IIf(IsNull(cacheControl), "None", cacheControl)
WScript.Echo "Expires: " &amp; IIf(IsNull(expires), "None", expires)

Set http = Nothing

Function IIf(expr, trueVal, falseVal)
    If expr Then IIf = trueVal Else IIf = falseVal
End Function

The script retrieves caching-related headers from a special test endpoint. It
displays the values or "None" if headers are missing. This information is
valuable for optimizing repeated requests to the same resource.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms535874(v=vs.84))

In this article, we have explored the GetResponseHeader method in
VBScript, covering its usage and practical applications. From basic header
retrieval to advanced response analysis, these examples demonstrate HTTP header
inspection. With this knowledge, you can enhance your web interaction scripts
with detailed response analysis.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).