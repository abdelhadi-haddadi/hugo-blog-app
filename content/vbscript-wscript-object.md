+++
title = "VBScript WScript Object"
date = 2025-08-29T20:15:46.610+01:00
draft = false
description = "Learn about VBScript WScript object, including methods, properties, and practical usage examples for scripting automation."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript WScript Object

last modified April 4, 2025

The WScript object is a fundamental part of Windows Script Host (WSH) in VBScript.
It provides access to the script execution environment and various utility
functions. This tutorial covers the WScript object's properties and methods with
practical examples for scripting automation tasks.

## WScript Object Overview

The WScript object is automatically available in any VBScript running under
Windows Script Host. It provides information about the script environment and
methods to control script execution. Key properties include Arguments,
FullName, Name, Path, and
Version.

Important methods include Echo for output, Sleep for
pausing execution, Quit for terminating scripts, and
CreateObject for COM object creation. Understanding these helps
create more powerful and flexible scripts.

## Displaying Script Information

This example demonstrates how to use WScript properties to display information
about the script execution environment. We'll show the script name, path, and
WSH version.

script_info.vbs
  

WScript.Echo "Script Name: " &amp; WScript.Name
WScript.Echo "Script Full Path: " &amp; WScript.FullName
WScript.Echo "Script Directory: " &amp; WScript.Path
WScript.Echo "WSH Version: " &amp; WScript.Version
WScript.Echo "Running as: " &amp; WScript.ScriptName

This code outputs details about the running script and environment. The
Name property returns "WScript" or "CScript" depending on the host.
FullName shows the complete path to the script host executable.

## Working with Command Line Arguments

The WScript object provides access to command line arguments through its
Arguments collection. This allows scripts to accept and process
input parameters when executed.

arguments.vbs
  

Dim args, i
Set args = WScript.Arguments

If args.Count = 0 Then
    WScript.Echo "No arguments provided."
Else
    WScript.Echo "Number of arguments: " &amp; args.Count
    For i = 0 To args.Count - 1
        WScript.Echo "Argument " &amp; (i + 1) &amp; ": " &amp; args(i)
    Next
End If

This script checks for arguments and displays them if present. The
Count property gives the number of arguments, while individual
arguments are accessed by index (0-based). Run this with parameters to see them
listed.

## Creating COM Objects

The CreateObject method allows interaction with COM components.
This example demonstrates creating a FileSystemObject for file operations.

com_object.vbs
  

Dim fso, file
Set fso = WScript.CreateObject("Scripting.FileSystemObject")

If fso.FileExists("test.txt") Then
    Set file = fso.GetFile("test.txt")
    WScript.Echo "File size: " &amp; file.Size &amp; " bytes"
Else
    WScript.Echo "File not found"
End If

This script checks for a file's existence and displays its size if found. The
CreateObject method instantiates COM objects by their ProgID. Here
we use the FileSystemObject to interact with the file system.

## Controlling Script Execution

WScript provides methods to control script flow. Sleep pauses
execution, while Quit terminates the script with an optional exit
code.

execution_control.vbs
  

WScript.Echo "Starting script execution..."
WScript.Sleep 2000  ' Pause for 2 seconds
WScript.Echo "After 2 second pause"

Dim result
result = MsgBox("Continue script?", vbYesNo, "Confirmation")

If result = vbNo Then
    WScript.Quit 1  ' Exit with error code 1
End If

WScript.Echo "Script completed successfully"

This script demonstrates pausing execution and conditional termination. The
Sleep method accepts milliseconds, while Quit can
return an exit code to the calling process. These are useful for timed
operations and error handling.

## Network Operations with WScript.Network

The WScript object can create a Network object for network-related operations.
This example shows how to retrieve current user and computer information.

network_info.vbs
  

Dim net
Set net = WScript.CreateObject("WScript.Network")

WScript.Echo "Computer Name: " &amp; net.ComputerName
WScript.Echo "User Domain: " &amp; net.UserDomain
WScript.Echo "User Name: " &amp; net.UserName
WScript.Echo "Current Printer: " &amp; net.Printer

This script displays network-related information about the current session. The
Network object provides access to user credentials, computer name, and printer
settings. These are valuable for system administration scripts.

## Source

[WScript Object Documentation](https://learn.microsoft.com/en-us/previous-versions//at5ydy31(v=vs.85))

In this article, we have explored the WScript object's capabilities in VBScript,
covering essential properties and methods. From accessing script information to
controlling execution flow and working with COM objects, these examples provide
a solid foundation for Windows scripting. Mastering the WScript object enables
more powerful and flexible automation solutions.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).