+++
title = "VBScript StatusText Property"
date = 2025-08-29T20:15:39.947+01:00
draft = false
description = "Learn about VBScript StatusText property, including browser status bar updates, automation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript StatusText Property

last modified April 9, 2025

The StatusText property in VBScript is part of the
InternetExplorer object model. It controls the text displayed in
the browser's status bar. This property allows scripts to provide feedback or
status information to users. It's commonly used in browser automation scripts.

StatusText can be both read and written, enabling dynamic status
updates. The property accepts string values that appear in the status bar area.
This tutorial covers StatusText with practical examples to
demonstrate its usage.

## StatusText Property Overview

The StatusText property belongs to the InternetExplorer
object. It represents the text shown in the browser's status bar at the bottom.
The property is available when automating Internet Explorer through VBScript.

Key features include immediate visibility of status updates and simple string
assignment. It doesn't affect browser functionality, only visual feedback.
Understanding this property helps create more user-friendly automation scripts.

## Basic StatusText Usage

This example demonstrates the simplest use of StatusText to display
a message. It shows how to set the status text when automating Internet Explorer.
The message appears in the browser's status bar immediately.

basic_statustext.vbs
  

Set ie = CreateObject("InternetExplorer.Application")
ie.Visible = True
ie.StatusText = "Initializing application..."
WScript.Sleep 2000
ie.StatusText = "Ready"
ie.Quit
Set ie = Nothing

The script creates an Internet Explorer instance and makes it visible. It sets
an initial status message, waits 2 seconds, then updates the status. Finally,
it closes the browser. The status text changes are immediately visible.

## Status Updates During Navigation

This example shows how to update StatusText during page navigation.
It demonstrates status changes before, during, and after loading a webpage. The
status bar reflects each stage of the process.

navigation_status.vbs
  

Set ie = CreateObject("InternetExplorer.Application")
ie.Visible = True
ie.StatusText = "Preparing to navigate..."
ie.Navigate "https://www.example.com"

Do While ie.Busy Or ie.ReadyState &lt;&gt; 4
    ie.StatusText = "Loading page..."
    WScript.Sleep 100
Loop

ie.StatusText = "Page loaded successfully"
WScript.Sleep 2000
ie.Quit
Set ie = Nothing

The script starts navigation after setting an initial status. During loading, it
continuously updates the status. Once complete, it shows a success message. The
status changes help users understand the navigation progress.

## Dynamic Status Updates

This example demonstrates dynamic status updates during a long operation. It
shows a counter incrementing in the status bar. This technique provides visual
feedback for time-consuming processes.

dynamic_status.vbs
  

Set ie = CreateObject("InternetExplorer.Application")
ie.Visible = True

For i = 1 To 10
    ie.StatusText = "Processing item " &amp; i &amp; " of 10"
    WScript.Sleep 500
Next

ie.StatusText = "Processing complete"
WScript.Sleep 1000
ie.Quit
Set ie = Nothing

The script creates a loop that updates the status text with progress
information. Each iteration shows the current item number. After completion, it
displays a final message. This approach keeps users informed during operations.

## Error Status Notification

This example shows using StatusText for error notifications. It
demonstrates how to display error messages in the status bar. The status text
changes when an error condition is detected.

error_status.vbs
  

Set ie = CreateObject("InternetExplorer.Application")
ie.Visible = True
ie.StatusText = "Starting operation..."

On Error Resume Next
ie.Navigate "invalid.url"
If Err.Number &lt;&gt; 0 Then
    ie.StatusText = "Error: " &amp; Err.Description
Else
    ie.StatusText = "Operation successful"
End If

WScript.Sleep 2000
ie.Quit
Set ie = Nothing

The script attempts to navigate to an invalid URL. If an error occurs, it
updates the status text with the error description. Otherwise, it shows a
success message. This provides immediate feedback about operation outcomes.

## Combining StatusText with Other Properties

This example combines StatusText with other InternetExplorer
properties. It shows the current URL in the status bar along with custom text.
This demonstrates how to create informative composite status messages.

combined_status.vbs
  

Set ie = CreateObject("InternetExplorer.Application")
ie.Visible = True
ie.Navigate "https://www.example.com"

Do While ie.Busy Or ie.ReadyState &lt;&gt; 4
    WScript.Sleep 100
Loop

ie.StatusText = "Current page: " &amp; ie.LocationURL &amp; " - Ready"
WScript.Sleep 3000
ie.Quit
Set ie = Nothing

After navigating to a page, the script combines the URL with a status message.
The status bar shows both the current location and operational state. This
technique provides context-rich status information to users.

## Source

[InternetExplorer Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-objects/aa752043(v=vs.84))

In this article, we have explored the StatusText property in
VBScript, covering its usage and practical applications. From basic status
updates to dynamic progress indicators, these examples demonstrate effective
status bar management. With this knowledge, you can enhance your browser
automation scripts with better user feedback.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).