+++
title = "VBScript ShellExecute Method"
date = 2025-08-29T20:15:29.906+01:00
draft = false
description = "Learn about VBScript ShellExecute method, including launching applications, opening documents, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ShellExecute Method

last modified April 9, 2025

The ShellExecute method in VBScript is part of the
WScript.Shell object. It launches applications or opens documents
using their associated programs. This method is powerful for automating tasks
that involve external applications. It can open files, URLs, and execute
commands.

ShellExecute uses Windows shell associations to determine how to
handle different file types. It's commonly used in administrative scripts and
automation tasks. This tutorial covers ShellExecute with practical
examples to demonstrate its usage.

## ShellExecute Method Overview

The ShellExecute method takes several parameters: the file to open,
optional operation, parameters, directory, and window style. The operation
parameter specifies the action like "open" or "print". It returns nothing but
may raise errors if execution fails.

Key features include automatic program association handling and flexible window
display options. It doesn't wait for the launched application to complete.
ShellExecute works with files, URLs, and system commands.
Understanding this method helps create powerful automation scripts.

## Opening a Document with Default Application

This example demonstrates opening a document using its default associated
application. The script launches Notepad to open a text file. This shows the
basic usage of ShellExecute with the "open" operation.

open_document.vbs
  

Set objShell = CreateObject("WScript.Shell")
objShell.ShellExecute "notepad.exe", "C:\temp\notes.txt", "", "open", 1
Set objShell = Nothing

The script creates a WScript.Shell object and calls
ShellExecute. It opens "notes.txt" with Notepad. The last parameter
(1) makes the window appear normally. This is the simplest way to open a file
with its default program.

## Opening a Website in Default Browser

This example shows how to open a website URL in the system's default browser.
The script demonstrates ShellExecute's ability to handle URLs. The
method automatically launches the configured default browser.

open_website.vbs
  

Set objShell = CreateObject("WScript.Shell")
objShell.ShellExecute "https://www.example.com", "", "", "open", 1
Set objShell = Nothing

The script launches the default browser and navigates to example.com. No
application is specified as the first parameter since the URL protocol (http://)
determines the handler. This is a common way to open web pages from scripts.

## Printing a Document

This example demonstrates using ShellExecute to print a document.
Instead of opening the file, it sends it directly to the printer. The "print"
operation tells Windows to use the file's associated print handler.

print_document.vbs
  

Set objShell = CreateObject("WScript.Shell")
objShell.ShellExecute "C:\reports\summary.docx", "", "", "print", 0
Set objShell = Nothing

The script prints "summary.docx" without showing any window (parameter 0). The
file is sent to the default printer using Word's print capabilities. This is
useful for silent printing operations in scripts.

## Running a Command with Administrator Privileges

This example shows how to run a command with elevated privileges. The script
demonstrates using "runas" operation to request administrator rights. This is
useful for administrative tasks requiring elevated permissions.

runas_command.vbs
  

Set objShell = CreateObject("WScript.Shell")
objShell.ShellExecute "cmd.exe", "/k dir C:\Windows", "", "runas", 1
Set objShell = Nothing

The script attempts to run Command Prompt with admin rights to list Windows
directory contents. The "/k" parameter keeps the window open after execution.
Note that this will trigger a UAC prompt if not already elevated.

## Opening Control Panel Applet

This example demonstrates opening a Control Panel applet using
ShellExecute. The script shows how to access system configuration
tools. This technique works with various Control Panel items and system utilities.

control_panel.vbs
  

Set objShell = CreateObject("WScript.Shell")
objShell.ShellExecute "control.exe", "timedate.cpl", "", "open", 1
Set objShell = Nothing

The script opens the Date and Time Control Panel applet. The "control.exe"
application handles various .cpl files representing different Control Panel
items. This is useful for scripts that need to access system settings.

## Source

[ShellExecute Documentation](https://learn.microsoft.com/en-us/windows/win32/shell/shell-shellexecute)

In this article, we have explored the ShellExecute method in VBScript,
covering its usage and practical applications. From opening documents to running
commands with elevation, these examples demonstrate its versatility. With this
knowledge, you can enhance your scripts with powerful automation capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).