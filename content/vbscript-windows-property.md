+++
title = "VBScript Windows Property"
date = 2025-08-29T20:15:30.996+01:00
draft = false
description = "Learn about VBScript Windows Property, including window manipulation, script execution, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Windows Property

last modified April 9, 2025

The Windows property in VBScript is part of the WScript
object. It provides access to the collection of all open command windows. This
property is useful for managing script execution and window behavior. It allows
script interaction with the command-line environment.

Windows property enables enumeration and manipulation of command
windows. It's commonly used in automation scripts and system administration
tasks. This tutorial covers Windows with practical examples to
demonstrate its usage.

## Windows Property Overview

The Windows property returns a collection of WshWindow
objects. Each object represents a command window associated with the script. The
property is accessed through the WScript object in VBScript.

Key features include window enumeration and basic window management. It provides
access to window properties and methods. Understanding this property helps
create scripts that interact with the command-line environment.

## Counting Open Command Windows

This example demonstrates how to count the number of open command windows. It
shows basic usage of the Windows property. The script displays the
total count of command windows currently open.

count_windows.vbs
  

Set wshShell = WScript.CreateObject("WScript.Shell")
Set windows = WScript.Windows

WScript.Echo "Number of open command windows: " &amp; windows.Count

Set windows = Nothing
Set wshShell = Nothing

The script creates a WScript.Shell object and accesses the
Windows property. The Count property returns the
number of open command windows. This is useful for monitoring script execution
environments.

## Enumerating Command Windows

This example shows how to enumerate all open command windows. It demonstrates
accessing individual window objects from the collection. Each window's process
ID is displayed.

enumerate_windows.vbs
  

Set windows = WScript.Windows

For Each window In windows
    WScript.Echo "Window Process ID: " &amp; window.ProcessID
Next

Set windows = Nothing

The script loops through the Windows collection using a For Each
loop. Each window's ProcessID property is displayed. This
technique helps identify specific command windows in complex scripting
environments.

## Closing All Command Windows

This example demonstrates closing all open command windows. It shows how to use
the Windows property for window management. The script terminates
each command window in the collection.

close_windows.vbs
  

Set windows = WScript.Windows

For Each window In windows
    window.Close
Next

Set windows = Nothing

The script iterates through all command windows and calls the Close
method on each. This is useful for cleanup operations in script execution. Note
that this will close all command windows, including potentially important ones.

## Creating New Command Window

This example shows how to create a new command window using the
Windows property. It demonstrates the CreateWindow
method. The new window runs a specified command.

create_window.vbs
  

Set wshShell = WScript.CreateObject("WScript.Shell")
Set windows = WScript.Windows

Set newWindow = windows.CreateWindow("cmd /k echo Hello World")

WScript.Echo "New window created with PID: " &amp; newWindow.ProcessID

Set windows = Nothing
Set wshShell = Nothing

The script creates a new command window that executes "echo Hello World". The
CreateWindow method returns a reference to the new window. This is
useful for launching separate command processes from a script.

## Window Visibility Control

This example demonstrates controlling window visibility. It shows how to
minimize and restore command windows. The script toggles the window state of
the first command window.

window_visibility.vbs
  

Set windows = WScript.Windows

If windows.Count &gt; 0 Then
    windows(0).Minimize
    WScript.Sleep 2000
    windows(0).Restore
End If

Set windows = Nothing

The script checks if any command windows exist, then minimizes the first one.
After a 2-second delay, it restores the window. This demonstrates basic window
state management in VBScript.

## Source

[WScript Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/aew9yb99(v=vs.84))

In this article, we have explored the Windows property in VBScript,
covering its usage and practical applications. From window enumeration to
creation and management, these examples demonstrate command window control.
With this knowledge, you can enhance your scripts with window manipulation
capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).