+++
title = "VBScript async Property"
date = 2025-08-29T20:14:40.636+01:00
draft = false
description = "Learn about VBScript async property, including asynchronous operations, XMLHTTP requests, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript async Property

last modified April 9, 2025

The async property in VBScript controls whether operations should
execute asynchronously. It's commonly used with XMLHTTP requests to enable
non-blocking execution. When set to True, scripts can continue running while
waiting for operations to complete. This property is essential for responsive
script design.

async is particularly useful for network operations that may take
time. It prevents script freezing during long-running tasks. This tutorial
covers async with practical examples to demonstrate its usage in
various scenarios.

## async Property Overview

The async property is a Boolean value that determines execution
mode. True enables asynchronous operation, while False forces synchronous
behavior. It's available on objects like XMLHTTP and FileSystemObject in
VBScript.

Key features include non-blocking execution and event-driven programming.
Asynchronous mode requires proper event handling for completion. Understanding
this property helps create efficient scripts that don't freeze during
operations.

## Basic Asynchronous XMLHTTP Request

This example demonstrates a simple asynchronous XMLHTTP request. The script
fetches data from a URL without blocking execution. The async
property is set to True for non-blocking behavior.

basic_async.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.async = True
xmlhttp.onreadystatechange = GetRef("HandleResponse")

xmlhttp.open "GET", "https://example.com/api/data", True
xmlhttp.send

Sub HandleResponse()
    If xmlhttp.readyState = 4 Then
        If xmlhttp.status = 200 Then
            WScript.Echo xmlhttp.responseText
        End If
    End If
End Sub

' Keep script running while waiting for response
While xmlhttp.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

The script creates an XMLHTTP object and sets async to True. It
registers a callback for state changes. The request executes in the background
while the script continues. The loop keeps the script alive until completion.

## Synchronous vs Asynchronous Comparison

This example compares synchronous and asynchronous request behavior. It shows how
async affects script execution flow. The synchronous version blocks
until completion, while asynchronous allows continued execution.

sync_vs_async.vbs
  

' Synchronous request
Set syncHttp = CreateObject("MSXML2.XMLHTTP")
syncHttp.async = False
syncHttp.open "GET", "https://example.com/api", False
syncHttp.send
WScript.Echo "Sync complete: " &amp; syncHttp.status

' Asynchronous request
Set asyncHttp = CreateObject("MSXML2.XMLHTTP")
asyncHttp.async = True
asyncHttp.onreadystatechange = GetRef("AsyncComplete")
asyncHttp.open "GET", "https://example.com/api", True
asyncHttp.send
WScript.Echo "Async started (script continues)"

Sub AsyncComplete()
    If asyncHttp.readyState = 4 Then
        WScript.Echo "Async complete: " &amp; asyncHttp.status
    End If
End Sub

' Script continues executing here
WScript.Sleep 2000

The synchronous request blocks until completion before echoing. The asynchronous
version echoes immediately after starting. The callback handles completion
notification. This demonstrates the non-blocking advantage of async mode.

## Multiple Concurrent Async Requests

async enables sending multiple requests simultaneously. This example
shows how to manage several concurrent operations. Each request has its own
callback for individual completion handling.

multiple_async.vbs
  

Set req1 = CreateObject("MSXML2.XMLHTTP")
Set req2 = CreateObject("MSXML2.XMLHTTP")

req1.async = True
req2.async = True

req1.onreadystatechange = GetRef("Req1Complete")
req2.onreadystatechange = GetRef("Req2Complete")

req1.open "GET", "https://example.com/api1", True
req2.open "GET", "https://example.com/api2", True

req1.send
req2.send

Sub Req1Complete()
    If req1.readyState = 4 Then
        WScript.Echo "Request 1 completed"
    End If
End Sub

Sub Req2Complete()
    If req2.readyState = 4 Then
        WScript.Echo "Request 2 completed"
    End If
End Sub

' Wait for both requests
While req1.readyState &lt;&gt; 4 Or req2.readyState &lt;&gt; 4
    WScript.Sleep 100
Wend

Two XMLHTTP objects are created with async set to True. Each has its own
callback handler. Both requests run concurrently. The script waits for both to
complete before exiting. This pattern is useful for parallel operations.

## Error Handling in Async Operations

Asynchronous operations require proper error handling. This example demonstrates
error management in async requests. It includes timeout handling and status code
checking for robust operation.

async_error_handling.vbs
  

Set xmlhttp = CreateObject("MSXML2.XMLHTTP")
xmlhttp.async = True
startTime = Timer
timeout = 5 ' seconds

xmlhttp.onreadystatechange = GetRef("HandleResponse")

xmlhttp.open "GET", "https://example.com/unreliable", True
xmlhttp.send

Sub HandleResponse()
    If xmlhttp.readyState = 4 Then
        If xmlhttp.status = 200 Then
            WScript.Echo "Success: " &amp; xmlhttp.responseText
        Else
            WScript.Echo "Error: " &amp; xmlhttp.status &amp; " - " &amp; xmlhttp.statusText
        End If
    End If
End Sub

' Timeout handling
While xmlhttp.readyState &lt;&gt; 4
    If Timer - startTime &gt; timeout Then
        xmlhttp.abort
        WScript.Echo "Request timed out"
        Exit While
    End If
    WScript.Sleep 100
Wend

The script implements a timeout mechanism for the async request. The callback
checks both readyState and status. If the operation takes too long, it's
aborted. This prevents indefinite waiting for failed requests.

## Async File Operations with FileSystemObject

While FileSystemObject doesn't natively support async, we can simulate async
behavior. This example shows how to implement non-blocking file operations.
It uses a wrapper approach to achieve async-like functionality.

async_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

' Simulate async file copy
Sub AsyncCopyFile(source, dest, callback)
    shell.Run "cmd /c copy """ &amp; source &amp; """ """ &amp; dest &amp; """", 0, False
    callback()
End Sub

Sub OnCopyComplete()
    WScript.Echo "File copy completed (simulated async)"
End Sub

' Usage
AsyncCopyFile "C:\temp\source.txt", "C:\temp\dest.txt", GetRef("OnCopyComplete")

' Script continues while copy runs in background
WScript.Echo "Script continues execution..."
WScript.Sleep 2000

The script simulates async file operations using shell execution. The main script
continues while the operation runs in parallel. A callback notifies completion.
This pattern can be extended to other file operations.

## Source

[XMLHTTP Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms535874(v=vs.84))

In this article, we have explored the async property in VBScript,
covering its usage and practical applications. From basic requests to error
handling and simulated file operations, these examples demonstrate asynchronous
programming techniques. With this knowledge, you can create more responsive
VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).