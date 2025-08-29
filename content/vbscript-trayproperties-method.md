+++
title = "VBScript TrayProperties Method"
date = 2025-08-29T20:15:30.980+01:00
draft = false
description = "Learn about VBScript TrayProperties method, including popup notifications, tray icons, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript TrayProperties Method

last modified April 9, 2025

The TrayProperties method in VBScript is part of the
WScript.Shell object. It displays a notification in the system tray
area. This method creates a balloon tip with customizable title, text, and icon.
It's commonly used for script notifications and user alerts.

TrayProperties provides visual feedback without interrupting script
execution. It supports different icon types for various message priorities.
This tutorial covers TrayProperties with practical examples to
demonstrate its usage.

## TrayProperties Method Overview

The TrayProperties method takes several parameters: title, text,
icon type, and timeout. It displays a notification near the system clock area.
The method is available through the WScript.Shell object in VBScript.

Key features include customizable display duration and multiple icon types.
It doesn't require user interaction to dismiss. TrayProperties
works on Windows systems with taskbar notifications enabled. Understanding this
method helps create user-friendly script notifications.

## Basic Notification Example

This example demonstrates the simplest use of TrayProperties to
display a basic notification. It shows how to create a notification with just
title and message text. The notification appears in the system tray area.

basic_notification.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Popup "Script completed successfully", 5, "Status Update", 64

Set WshShell = Nothing

The script creates a WScript.Shell object and calls
Popup (which internally uses TrayProperties). The notification
shows "Script completed successfully" with "Status Update" title. The 64
parameter specifies an information icon.

## Custom Icon Notification

This example shows how to use different icon types with
TrayProperties. It demonstrates the available icon constants for
various notification purposes. Different icons indicate message priority.

custom_icon.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")

' Information icon (64)
WshShell.Popup "This is an information message", 5, "Info", 64

' Warning icon (48)
WshShell.Popup "This is a warning message", 5, "Warning", 48

' Error icon (16)
WshShell.Popup "This is an error message", 5, "Error", 16

Set WshShell = Nothing

The script displays three notifications with different icons. The numeric values
(64, 48, 16) represent information, warning, and error icons respectively.
This helps users quickly identify notification importance.

## Notification with Custom Timeout

This example demonstrates setting a custom display duration for the notification.
The timeout parameter controls how long the message remains visible. It's
specified in seconds.

timeout_notification.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")

' Show for 10 seconds
WshShell.Popup "This message will display for 10 seconds", 10, "Timed Message", 64

' Show for 3 seconds
WshShell.Popup "Brief notification", 3, "Quick Alert", 64

Set WshShell = Nothing

The first notification displays for 10 seconds, while the second shows for only
3 seconds. The timeout parameter follows the message text in the method call.
This controls how long the balloon tip remains visible to the user.

## Interactive Notification

This example shows how to create a notification that requires user
acknowledgment. By omitting the timeout parameter, the notification remains
until the user clicks it. This ensures important messages aren't missed.

interactive_notification.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")

result = WshShell.Popup("Please acknowledge this message", , "Action Required", 48)

If result = 1 Then
    WScript.Echo "User clicked OK"
Else
    WScript.Echo "Notification timed out or was closed"
End If

Set WshShell = Nothing

The script creates a persistent warning notification (icon 48). The user must
click OK to dismiss it. The method returns a value indicating how the
notification was closed. This allows for different script responses.

## Notification with Line Breaks

This example demonstrates creating multi-line notifications using the
TrayProperties method. By including vbCrLf constants in the message
text, you can format notifications with multiple lines. This improves readability.

multiline_notification.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")

message = "Backup operation completed" &amp; vbCrLf &amp; vbCrLf &amp; _
          "Files processed: 245" &amp; vbCrLf &amp; _
          "Total size: 1.2 GB" &amp; vbCrLf &amp; _
          "Duration: 12 minutes"

WshShell.Popup message, 10, "Backup Report", 64

Set WshShell = Nothing

The notification displays with clear line breaks between sections. The vbCrLf
constant inserts newlines in the message text. This creates a well-formatted,
readable notification with multiple pieces of information.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/a6s7w3a5(v=vs.84))

In this article, we have explored the TrayProperties method in
VBScript, covering its usage and practical applications. From simple alerts to
interactive notifications, these examples demonstrate effective user
communication. With this knowledge, you can enhance your scripts with visual
feedback mechanisms.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).