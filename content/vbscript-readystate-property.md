+++
title = "VBScript ReadyState Property"
date = 2025-08-29T20:15:35.468+01:00
draft = false
description = "Learn about VBScript ReadyState property, including HTTP request monitoring, state changes, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ReadyState Property

last modified April 9, 2025

The ReadyState property in VBScript is used with the
XMLHTTP object to track the state of HTTP requests. It indicates
the current status of the request/response process. This property is essential
for asynchronous operations where you need to monitor progress.

ReadyState returns integer values from 0 to 4 representing different
stages. It enables proper handling of asynchronous requests by signaling state
changes. This tutorial covers ReadyState with practical examples to
demonstrate its usage.

## ReadyState Property Overview

The ReadyState property has five possible values representing
different states. Each value corresponds to a specific stage in the HTTP request
lifecycle. The property is read-only and changes as the request progresses.

The states are: 0 (UNINITIALIZED), 1 (LOADING), 2 (LOADED), 3 (INTERACTIVE),
and 4 (COMPLETED). Monitoring these states allows for proper request handling.
Understanding these states is crucial for effective asynchronous programming.

## Basic ReadyState Monitoring

This example demonstrates basic monitoring of the ReadyState
property. It shows how to check the state during an HTTP request. The script
makes a simple GET request and outputs state changes.

basic_readystate.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://example.com", True
xmlhttp.OnReadyStateChange = GetRef("HandleStateChange")
xmlhttp.Send

Sub HandleStateChange()
    WScript.Echo "ReadyState: " &amp; xmlhttp.readyState
    If xmlhttp.readyState = 4 Then
        WScript.Echo "Request completed with status: " &amp; xmlhttp.status
    End If
End Sub

While xmlhttp.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

The script creates an XMLHTTP object and initiates an asynchronous GET request.
The OnReadyStateChange event handler outputs state changes. When
the state reaches 4 (COMPLETED), it displays the HTTP status code.

## Synchronous Request with ReadyState

This example shows using ReadyState with a synchronous request.
Although synchronous requests block execution, checking ReadyState
can still be useful. The script demonstrates state progression in a simple sync
request.

sync_readystate.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://example.com", False
xmlhttp.Send

WScript.Echo "Initial ReadyState: " &amp; xmlhttp.readyState
WScript.Echo "After Send ReadyState: " &amp; xmlhttp.readyState

If xmlhttp.readyState = 4 Then
    WScript.Echo "Response: " &amp; Left(xmlhttp.responseText, 100)
End If

The script makes a synchronous GET request to example.com. It outputs the
ReadyState before and after sending the request. With synchronous
requests, the state immediately jumps to 4 after Send().

## Handling Different ReadyStates

This example demonstrates handling all possible ReadyState values.
It provides specific actions for each state change. The script shows how to
implement comprehensive state monitoring.

all_states.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://example.com", True
xmlhttp.OnReadyStateChange = GetRef("StateHandler")
xmlhttp.Send

Sub StateHandler()
    Select Case xmlhttp.readyState
        Case 0: WScript.Echo "UNINITIALIZED: Object created"
        Case 1: WScript.Echo "LOADING: Open() called"
        Case 2: WScript.Echo "LOADED: Send() called, headers received"
        Case 3: WScript.Echo "INTERACTIVE: Downloading response"
        Case 4: 
            WScript.Echo "COMPLETED: Request finished"
            If xmlhttp.status = 200 Then
                WScript.Echo "Success: " &amp; Left(xmlhttp.responseText, 50)
            End If
    End Select
End Sub

While xmlhttp.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

The script implements a detailed state handler for all ReadyState
values. Each case provides specific feedback about the request progress. When the
request completes (state 4), it checks the status code and displays part of the
response.

## Error Handling with ReadyState

This example demonstrates error handling in conjunction with
ReadyState monitoring. It shows how to detect and handle request
failures. Proper error handling ensures robust HTTP operations.

error_handling.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "GET", "https://nonexistent.example", True
xmlhttp.OnReadyStateChange = GetRef("ErrorHandler")
xmlhttp.Send

Sub ErrorHandler()
    If xmlhttp.readyState = 4 Then
        If xmlhttp.status = 200 Then
            WScript.Echo "Request successful"
        Else
            WScript.Echo "Error " &amp; xmlhttp.status &amp; ": " &amp; xmlhttp.statusText
        End If
    End If
End Sub

While xmlhttp.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

The script attempts to request a non-existent URL. When the request completes
(state 4), it checks the status code. If not 200, it displays the error code and
description. This pattern is essential for reliable HTTP operations.

## ReadyState with POST Request

This example shows using ReadyState with a POST request. It
demonstrates state monitoring while sending data to a server. The script includes
setting request headers and handling the response.

post_request.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.Open "POST", "https://example.com/api", True
xmlhttp.setRequestHeader "Content-Type", "application/json"
xmlhttp.OnReadyStateChange = GetRef("PostHandler")
xmlhttp.Send "{""key"":""value""}"

Sub PostHandler()
    If xmlhttp.readyState = 4 Then
        WScript.Echo "Response status: " &amp; xmlhttp.status
        WScript.Echo "Response body: " &amp; xmlhttp.responseText
    End If
End Sub

While xmlhttp.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

The script sends a JSON payload via POST to an API endpoint. It sets the
appropriate Content-Type header. The handler waits for completion (state 4) then
displays the status and response. This pattern works for various API interactions.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757849(v=vs.84))

In this article, we have explored the ReadyState property in
VBScript, covering its usage and practical applications. From basic monitoring
to error handling and POST requests, these examples demonstrate robust HTTP
request management. With this knowledge, you can implement reliable asynchronous
operations in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).