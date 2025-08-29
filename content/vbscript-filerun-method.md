+++
title = "VBScript FileRun Method"
date = 2025-08-29T20:15:26.605+01:00
draft = false
description = "Learn about VBScript FileRun method, including executing files, applications, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FileRun Method

last modified April 9, 2025

The Run method in VBScript is part of the WScript.Shell
object. It executes applications, scripts, or documents in the Windows
environment. This method provides control over program execution with various
parameters. It's commonly used for automation tasks and system administration.

Run can launch both console and GUI applications with optional
window styles. It returns the process exit code when the launched program
terminates. This tutorial covers Run with practical examples to
demonstrate its usage in different scenarios.

## FileRun Method Overview

The Run method takes up to three parameters: the command string,
window style, and wait option. It returns an integer representing the exit code
of the executed process. The method is available through the
WScript.Shell object in VBScript.

Key features include launching any executable file or document with its default
handler. It supports different window states (normal, minimized, maximized).
Run can wait for the program to complete or run it asynchronously.
Understanding this method helps create powerful automation scripts.

## Basic Program Execution

This example demonstrates the simplest use of Run to launch a
program. It shows how to execute Notepad with default parameters. The script
creates a WScript.Shell object and calls the Run
method.

basic_run.vbs
  

Set wsh = CreateObject("WScript.Shell")
returnCode = wsh.Run("notepad.exe", 1, True)
WScript.Echo "Notepad closed with exit code: " &amp; returnCode

Set wsh = Nothing

The script launches Notepad in a normal window (style 1) and waits for it to
close (True). The exit code is captured in returnCode and
displayed. This demonstrates synchronous execution with basic parameters.

## Running with Different Window Styles

This example shows how to control the window state of the launched application.
The second parameter of Run specifies the window style. Different
values produce different window behaviors.

window_styles.vbs
  

Set wsh = CreateObject("WScript.Shell")

' Normal window (default)
wsh.Run "calc.exe", 1, False

' Minimized window
wsh.Run "calc.exe", 2, False

' Maximized window
wsh.Run "calc.exe", 3, False

Set wsh = Nothing

The script launches Calculator three times with different window styles. Style 1
shows a normal window, 2 minimizes it, and 3 maximizes it. All executions are
asynchronous (False wait parameter).

## Opening Documents with Default Applications

Run can open documents using their associated applications. This
example demonstrates launching a text file with the default text editor. The
system automatically determines the appropriate program to use.

open_document.vbs
  

Set wsh = CreateObject("WScript.Shell")
wsh.Run "C:\temp\notes.txt", 1, True
WScript.Echo "Text file closed"

Set wsh = Nothing

The script opens "notes.txt" with the system's default text editor. The window
appears normally (style 1) and the script waits for the editor to close. This
shows document handling without specifying the application.

## Running Command Line Programs

This example demonstrates executing command line programs with Run.
It shows how to run IPConfig and capture its output. The script uses cmd.exe to
execute the command and redirect output to a file.

command_line.vbs
  

Set wsh = CreateObject("WScript.Shell")
command = "cmd /c ipconfig /all &gt; C:\temp\network_info.txt"
returnCode = wsh.Run(command, 0, True)

If returnCode = 0 Then
    WScript.Echo "Command executed successfully"
Else
    WScript.Echo "Command failed with code: " &amp; returnCode
End If

Set wsh = Nothing

The script runs IPConfig with all parameters (/all) and redirects output to a
file. The window is hidden (style 0) and execution waits for completion. The
exit code is checked to determine success or failure.

## Asynchronous Execution with Parameters

This example shows asynchronous program execution with command line parameters.
The script launches a program without waiting for it to complete. Parameters are
passed to the target application.

async_execution.vbs
  

Set wsh = CreateObject("WScript.Shell")
program = "C:\Program Files\MyApp\app.exe"
params = "/silent /log=C:\temp\app.log"
wsh.Run Chr(34) &amp; program &amp; Chr(34) &amp; " " &amp; params, 1, False

WScript.Echo "Application started in background"
Set wsh = Nothing

The script launches "app.exe" with two parameters (/silent and /log). The
program path is enclosed in quotes to handle spaces. Execution is asynchronous
(False wait parameter). The script continues immediately after launch.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/a72y2t1c(v=vs.84))

In this article, we have explored the Run method in VBScript,
covering its usage and practical applications. From simple program execution to
complex command line operations, these examples demonstrate its versatility.
With this knowledge, you can enhance your automation scripts with powerful
program execution capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).