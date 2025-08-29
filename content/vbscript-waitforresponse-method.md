+++
title = "VBScript WaitForResponse Method"
date = 2025-08-29T20:15:39.943+01:00
draft = false
description = "Learn about VBScript WaitForResponse method, including HTTP requests, timeout handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript WaitForResponse Method

last modified April 9, 2025

The WaitForResponse method in VBScript is part of the
MSXML2.XMLHTTP object. It pauses script execution until an HTTP
request completes or times out. This method is essential for synchronous web
requests in VBScript. It ensures the script waits for server responses before
proceeding.

WaitForResponse accepts an optional timeout parameter in seconds. It
returns True if the request completes successfully within the timeout period.
This tutorial covers WaitForResponse with practical examples to
demonstrate its usage in various scenarios.

## WaitForResponse Method Overview

The WaitForResponse method is used with XMLHTTP requests to wait
for completion. It takes one optional parameter specifying the timeout duration.
The method returns a Boolean indicating if the response was received in time.

Key features include synchronous request handling and timeout control. It's
commonly used for web scraping or API interactions. Understanding this method
helps create reliable web-connected scripts. The timeout parameter prevents
indefinite waiting for unresponsive servers.

## Basic HTTP GET Request

This example demonstrates the simplest use of WaitForResponse with
a synchronous HTTP GET request. It shows how to wait for a web page response.
The script retrieves content from a URL and displays the status.

basic_waitforresponse.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send
success = http.WaitForResponse(10)

If success Then
    WScript.Echo "Status: " &amp; http.Status &amp; " " &amp; http.StatusText
Else
    WScript.Echo "Request timed out"
End If

Set http = Nothing

The script creates an XMLHTTP object and sends a GET request. 
WaitForResponse waits up to 10 seconds for completion. If
successful, it displays the HTTP status. Otherwise, it reports a timeout.

## Handling Timeouts

This example shows how WaitForResponse handles request timeouts.
It demonstrates setting a short timeout to test the timeout behavior. The script
shows proper timeout detection and handling.

timeout_handling.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com", False
http.Send
success = http.WaitForResponse(1) ' Very short timeout

If success Then
    WScript.Echo "Request completed successfully"
Else
    WScript.Echo "Error: Request timed out after 1 second"
End If

Set http = Nothing

The script sets a 1-second timeout to demonstrate timeout handling. With such a
short timeout, the request likely fails unless the server responds extremely
quickly. The script properly checks the return value to detect timeouts.

## POST Request with Data

This example demonstrates WaitForResponse with a POST request
sending data to a server. It shows waiting for the response after submitting
form data. The script includes proper headers for form submission.

post_request.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "POST", "https://example.com/api", False
http.SetRequestHeader "Content-Type", "application/x-www-form-urlencoded"
http.Send "name=John&amp;age=30"
success = http.WaitForResponse(15)

If success Then
    WScript.Echo "Response: " &amp; http.responseText
Else
    WScript.Echo "POST request failed to complete"
End If

Set http = Nothing

The script sends form data to an API endpoint using POST. 
WaitForResponse waits up to 15 seconds for the response. Upon
success, it displays the server's response text. The timeout ensures the script
doesn't hang indefinitely.

## Checking Response Status

This example shows how to combine WaitForResponse with response
status checking. It demonstrates proper error handling for different HTTP status
codes. The script validates the response after waiting.

status_checking.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/nonexistent", False
http.Send
success = http.WaitForResponse(10)

If success Then
    If http.Status = 200 Then
        WScript.Echo "Success: " &amp; http.responseText
    Else
        WScript.Echo "Error: " &amp; http.Status &amp; " " &amp; http.StatusText
    End If
Else
    WScript.Echo "Request failed to complete"
End If

Set http = Nothing

The script requests a potentially non-existent resource. After waiting for the
response, it checks both the wait success and HTTP status. This demonstrates
proper layered error handling for web requests.

## Custom Timeout Based on Conditions

This advanced example shows dynamic timeout setting based on script conditions.
It demonstrates calculating timeout values programmatically. The script adjusts
the wait time according to network conditions.

dynamic_timeout.vbs
  

Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "https://example.com/largefile", False
http.Send

' Set timeout based on file size estimate
estimatedSize = 1024 * 1024 ' 1MB
timeoutSeconds = estimatedSize / (1024 * 10) ' 10KB/s = ~100 seconds
If timeoutSeconds &gt; 300 Then timeoutSeconds = 300 ' Max 5 minutes

success = http.WaitForResponse(timeoutSeconds)

If success Then
    WScript.Echo "Downloaded: " &amp; Len(http.responseText) &amp; " bytes"
Else
    WScript.Echo "Timeout after " &amp; timeoutSeconds &amp; " seconds"
End If

Set http = Nothing

The script calculates an appropriate timeout based on estimated download size.
This demonstrates sophisticated timeout management. The timeout caps at 5 minutes
to prevent excessive waits. The script shows how to make WaitForResponse
adapt to different scenarios.

## Source

[MSXML2.XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760403(v=vs.85))

In this article, we have explored the WaitForResponse method in
VBScript, covering its usage and practical applications. From basic requests to
advanced timeout handling, these examples demonstrate reliable web request
management. With this knowledge, you can enhance your web-connected scripts with
robust response handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).