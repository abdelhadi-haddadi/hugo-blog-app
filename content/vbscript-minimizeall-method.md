+++
title = "VBScript MinimizeAll Method"
date = 2025-08-29T20:15:27.693+01:00
draft = false
description = "Learn about VBScript MinimizeAll method, including window management, automation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MinimizeAll Method

last modified April 9, 2025

The MinimizeAll method in VBScript is part of the
Shell object. It minimizes all open windows on the desktop,
simulating the Windows key+M keyboard shortcut. This method is useful for
automation scripts that need to clear the desktop quickly. It requires no
parameters and returns no value.

MinimizeAll affects all top-level windows except those with
specific styles. It's commonly used in system administration scripts and
automation tasks. This tutorial covers MinimizeAll with practical
examples to demonstrate its usage in various scenarios.

## MinimizeAll Method Overview

The MinimizeAll method belongs to the Windows Script Host Shell
object. It requires creating a Shell object instance before calling the method.
The method has no parameters and doesn't return any value. It immediately
minimizes all open windows when called.

Key features include system-wide window management and simple syntax. It doesn't
affect windows marked as "Always on Top". MinimizeAll works with
both applications and Explorer windows. Understanding this method helps create
desktop automation scripts.

## Basic MinimizeAll Usage

This example demonstrates the simplest use of MinimizeAll to
minimize all open windows. It shows how to create the Shell object and call the
method. The script provides immediate visual feedback by minimizing windows.

basic_minimizeall.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.MinimizeAll

Set objShell = Nothing

The script creates a Shell.Application object and calls
MinimizeAll. All open windows will minimize to the taskbar. The
method executes immediately with no confirmation dialog. This is the most basic
form of window management in VBScript.

## MinimizeAll with Delay

This example adds a delay before minimizing windows. It demonstrates combining
MinimizeAll with other VBScript features. The script shows a
message before performing the minimization.

delayed_minimize.vbs
  

WScript.Echo "Windows will minimize in 3 seconds..."
WScript.Sleep 3000

Set objShell = CreateObject("Shell.Application")
objShell.MinimizeAll

Set objShell = Nothing

The script displays a message and waits 3 seconds before minimizing windows.
WScript.Sleep pauses execution for the specified milliseconds. This
shows how to create timed automation sequences. The Shell object is created after
the delay for efficiency.

## Toggle Between MinimizeAll and UndoMinimizeAll

This example demonstrates toggling between minimized and restored windows. It
uses both MinimizeAll and UndoMinimizeAll methods.
The script creates a complete minimize/restore cycle.

toggle_windows.vbs
  

Set objShell = CreateObject("Shell.Application")

' Minimize all windows
objShell.MinimizeAll
WScript.Echo "All windows minimized"
WScript.Sleep 2000

' Restore all windows
objShell.UndoMinimizeAll
WScript.Echo "Windows restored"

Set objShell = Nothing

The script first minimizes all windows, then waits 2 seconds before restoring
them. UndoMinimizeAll reverses the effect of MinimizeAll.
This demonstrates complete window state management. The sleep period makes the
effect visible to users.

## MinimizeAll in a Scheduled Task

This example shows MinimizeAll used in a scheduled task scenario.
It includes error handling and logging. The script is designed to run at specific
times through Task Scheduler.

scheduled_minimize.vbs
  

On Error Resume Next

Set objShell = CreateObject("Shell.Application")
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error creating Shell object: " &amp; Err.Description
    WScript.Quit 1
End If

objShell.MinimizeAll
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error minimizing windows: " &amp; Err.Description
Else
    WScript.Echo "All windows minimized successfully at " &amp; Now
End If

Set objShell = Nothing

The script includes error handling for robust scheduled execution. It verifies
Shell object creation before calling methods. Success or failure is logged with
timestamps. This makes it suitable for unattended automation tasks. Error details
help troubleshoot issues.

## Conditional MinimizeAll Based on Time

This advanced example only minimizes windows during specific hours. It
demonstrates combining MinimizeAll with time checks. The script
makes decisions based on the current system time.

conditional_minimize.vbs
  

currentHour = Hour(Now())

' Only minimize between 9 PM and 5 AM
If currentHour &gt;= 21 Or currentHour &lt; 5 Then
    Set objShell = CreateObject("Shell.Application")
    objShell.MinimizeAll
    WScript.Echo "Nighttime minimization activated"
    Set objShell = Nothing
Else
    WScript.Echo "Not within minimization hours"
End If

The script checks the current hour before minimizing windows. Action is only
taken during specified nighttime hours. This shows intelligent automation based
on conditions. The time check prevents unwanted minimization during work hours.
The approach can be adapted for various scheduling needs.

## Source

[Shell Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/a8y4k0c3(v=vs.84))

In this article, we have explored the MinimizeAll method in VBScript,
covering its usage and practical applications. From basic window management to
scheduled automation, these examples demonstrate powerful desktop control. With
this knowledge, you can enhance your automation scripts with robust window
management capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).