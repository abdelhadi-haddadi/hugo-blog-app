+++
title = "VBScript SetTimeouts Method"
date = 2025-08-29T20:15:38.846+01:00
draft = false
description = "Learn about VBScript SetTimeouts method, including script execution limits, timeout handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetTimeouts Method

last modified April 9, 2025

The SetTimeouts method in VBScript is part of the
WScript object. It controls how long a script will wait for certain
operations to complete. This includes network requests, COM object calls, and
user interactions. Proper timeout management prevents scripts from hanging
indefinitely.

SetTimeouts accepts four timeout values in milliseconds. These
control different aspects of script execution. Understanding this method helps
create more robust and predictable scripts. This tutorial covers
SetTimeouts with practical examples.

## SetTimeouts Method Overview

The SetTimeouts method takes four parameters representing different
timeout durations. These are connect, send, receive, and script execution
timeouts. All values are specified in milliseconds (1000ms = 1 second).

The first parameter sets the connection timeout for network operations. The
second controls how long to wait for sending data. The third manages receive
operation timeouts. The fourth limits total script execution time.

## Basic Timeout Configuration

This example demonstrates setting basic timeout values for a script. It shows how
to configure all four timeout parameters. The values are set to reasonable
defaults for general scripting purposes.

basic_timeouts.vbs
  

' Set connection timeout to 10 seconds
' Set send timeout to 20 seconds
' Set receive timeout to 30 seconds
' Set script timeout to 60 seconds
WScript.SetTimeouts 10000, 20000, 30000, 60000

WScript.Echo "Timeouts configured successfully"

The script sets connection timeout to 10 seconds (10000ms). Send operations will
timeout after 20 seconds. Receive operations get 30 seconds. The entire script
must complete within 60 seconds. These values prevent indefinite waiting.

## Network Operation Timeouts

This example focuses on network-related timeouts. It shows how to configure
timeouts specifically for HTTP requests. The values are optimized for web
operations where responses may vary.

network_timeouts.vbs
  

' Optimize timeouts for HTTP operations
WScript.SetTimeouts 5000, 15000, 30000, 120000

Set http = CreateObject("MSXML2.XMLHTTP")
http.open "GET", "https://example.com", False
http.send

WScript.Echo "HTTP request completed with status: " &amp; http.status

The script sets a short 5-second connection timeout. It allows 15 seconds for
sending data. Receiving data gets 30 seconds. The total script can run for 2
minutes. These values work well for typical web requests.

## Long-Running Script Configuration

This example shows timeout settings for scripts with lengthy operations. It
demonstrates how to extend timeouts for processing-intensive tasks. The focus is
on the script execution timeout parameter.

long_running.vbs
  

' Configure for long-running data processing
WScript.SetTimeouts 10000, 10000, 10000, 3600000 ' 1 hour

' Simulate long processing
For i = 1 To 1000000
    ' Processing code here
Next

WScript.Echo "Long operation completed successfully"

The script sets generous 10-second timeouts for network operations. The critical
setting is the 1-hour (3600000ms) script execution timeout. This prevents the
script from timing out during extended processing tasks.

## Interactive Script Timeouts

This example demonstrates timeout configuration for scripts requiring user
interaction. It shows how to balance responsiveness with timeout protection. The
settings accommodate potential user delays.

interactive_timeouts.vbs
  

' Configure for interactive scripts
WScript.SetTimeouts 5000, 5000, 5000, 0 ' No script timeout

response = InputBox("Please enter your name:", "User Input")
If response &lt;&gt; "" Then
    WScript.Echo "Hello, " &amp; response
Else
    WScript.Echo "No input received"
End If

The script sets moderate 5-second timeouts for network operations. The script
execution timeout is set to 0 (no limit). This allows indefinite waiting for
user input while maintaining network operation timeouts.

## Disabling Timeouts

This example shows how to completely disable all timeouts in a script. It
demonstrates using the maximum possible values for each parameter. Use this
approach cautiously as it removes all timeout protections.

disable_timeouts.vbs
  

' Disable all timeouts
WScript.SetTimeouts -1, -1, -1, -1

' This operation could potentially hang indefinitely
Set obj = CreateObject("Some.External.Component")
obj.LongRunningMethod

WScript.Echo "Operation completed (if it didn't hang)"

The script sets all timeout parameters to -1, which disables them. This means
network operations and script execution can run indefinitely. Only use this when
absolutely necessary and with trusted components.

## Source

[WScript Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d5wf7c4x(v=vs.84))

In this article, we have explored the SetTimeouts method in VBScript,
covering its usage and practical applications. From basic configurations to
specialized scenarios, these examples demonstrate effective timeout management.
With this knowledge, you can create more reliable and predictable scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).