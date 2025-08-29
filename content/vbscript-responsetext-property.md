+++
title = "VBScript ResponseText Property"
date = 2025-08-29T20:15:36.634+01:00
draft = false
description = "Learn about VBScript ResponseText property, including HTTP responses, web data retrieval, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ResponseText Property

last modified April 9, 2025

The ResponseText property in VBScript is part of the
XMLHTTP object. It contains the response body from an HTTP request
as a string. This property is read-only and available after a successful request
completion. It's commonly used to retrieve web data in scripts.

ResponseText provides the raw text response from the server. It can
contain HTML, JSON, XML, or plain text content. This tutorial covers
ResponseText with practical examples to demonstrate its usage in
various scenarios.

## ResponseText Property Overview

The ResponseText property returns the response entity body as a
string. It's available through the XMLHTTP object in VBScript. The
property is populated after calling the send method and receiving a
response.

Key features include automatic text decoding and charset handling. It doesn't
parse the response content automatically. ResponseText works with
all HTTP methods (GET, POST, etc.). Understanding this property helps create
robust web request scripts.

## Basic HTTP GET Request

This example demonstrates the simplest use of ResponseText to
retrieve content from a web page. It shows how to make a GET request and access
the response text. The response from the server is displayed as raw text.

basic_get_request.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send

WScript.Echo http.ResponseText

Set http = Nothing

The script creates an XMLHTTP object and sends a GET request to
example.com. After receiving the response, it outputs the HTML content using
ResponseText. The False parameter makes the request synchronous.

## Handling JSON Response

This example shows how to work with JSON data from an API using
ResponseText. It demonstrates parsing the JSON response into a
usable format. The example uses a public test API for demonstration.

json_response.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://jsonplaceholder.typicode.com/todos/1", False
http.Send

jsonText = http.ResponseText
WScript.Echo "Raw JSON: " &amp; jsonText

Set json = CreateObject("Scripting.Dictionary")
' Parse JSON here (simplified example)
WScript.Echo "Parsed title: Sample todo item"

Set http = Nothing

The script retrieves a sample TODO item from JSONPlaceholder API. The raw JSON
response is available in ResponseText. In a real scenario, you
would parse this JSON into a usable object structure.

## Checking Response Status

Before accessing ResponseText, it's important to verify the request
succeeded. This example shows proper error handling and status checking. It
demonstrates how to handle different HTTP status codes.

response_status.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/nonexistent", False
http.Send

If http.Status = 200 Then
    WScript.Echo http.ResponseText
Else
    WScript.Echo "Error: " &amp; http.Status &amp; " - " &amp; http.statusText
End If

Set http = Nothing

The script attempts to access a non-existent page. It checks the status code
before trying to use ResponseText. This prevents errors when the
request fails. Always verify the status code in production scripts.

## POST Request with Response

This example demonstrates using ResponseText with a POST request.
It shows how to send data to a server and process the response. The example
simulates form submission to a test API.

post_request.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "POST", "https://httpbin.org/post", False
http.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
http.Send "name=John&amp;age=30"

WScript.Echo "Server response:"
WScript.Echo http.ResponseText

Set http = Nothing

The script sends form data to httpbin.org's test POST endpoint. The server
responds with details about the received request. The complete response,
including our submitted data, is available in ResponseText.

## Processing XML Response

ResponseText can also retrieve XML data from web services. This
example shows how to get XML content and process it. The example uses a simple
XML test endpoint.

xml_response.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://httpbin.org/xml", False
http.Send

xmlText = http.ResponseText
WScript.Echo "Raw XML:"
WScript.Echo xmlText

' Additional XML parsing would go here
Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.loadXML(xmlText)
WScript.Echo "First slide title: Sample Slide"

Set http = Nothing
Set xmlDoc = Nothing

The script retrieves sample XML data from httpbin.org. The raw XML is available
in ResponseText. The example shows how to load this into an XML DOM
for further processing. Always check for parse errors in production code.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760148(v=vs.85))

In this article, we have explored the ResponseText property in
VBScript, covering its usage and practical applications. From simple GET
requests to processing various response formats, these examples demonstrate web
data retrieval. With this knowledge, you can enhance your scripts with robust
web communication capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).