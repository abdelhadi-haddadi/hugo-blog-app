+++
title = "VBScript GetSpecialFolder Method"
date = 2025-08-29T20:15:06.550+01:00
draft = false
description = "Learn about VBScript GetSpecialFolder method, including system folder access, path retrieval, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetSpecialFolder Method

last modified April 9, 2025

The GetSpecialFolder method in VBScript is part of the
FileSystemObject. It retrieves the path to special system folders
like Windows, System, or Temp directories. This method provides reliable access
to standard system locations. It's essential for scripts needing consistent
folder references.

GetSpecialFolder accepts folder type constants as parameters. It
returns the full path to the requested system folder. This tutorial covers
GetSpecialFolder with practical examples demonstrating its usage.
Understanding this method helps create portable system-aware scripts.

## GetSpecialFolder Method Overview

The GetSpecialFolder method takes one parameter: a folder type
constant. It returns a string containing the full path to that system folder.
The method is available through the FileSystemObject in VBScript.

Three main folder constants are available: 0 (Windows), 1 (System), and 2
(Temporary). The method provides paths regardless of Windows version or
installation location. This ensures scripts work across different systems.

## Accessing the Windows Folder

This example demonstrates retrieving the Windows installation folder path. The
Windows folder contains critical system files and components. Using
GetSpecialFolder ensures correct path retrieval on any system.

windows_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
winFolder = fso.GetSpecialFolder(0)
WScript.Echo "Windows folder: " &amp; winFolder

Set fso = Nothing

The script creates a FileSystemObject and calls
GetSpecialFolder(0). This returns the Windows directory path, like
"C:\Windows". The path is displayed using WScript.Echo. This
approach works across Windows versions.

## Retrieving the System Folder

This example shows how to get the System32 folder path, which contains critical
system DLLs and executables. The System folder is essential for many system
operations. GetSpecialFolder provides reliable access to this
location.

system_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
sysFolder = fso.GetSpecialFolder(1)
WScript.Echo "System folder: " &amp; sysFolder

Set fso = Nothing

The script calls GetSpecialFolder(1) to retrieve the System folder
path. This typically returns "C:\Windows\System32" on modern Windows systems.
The path is displayed for verification. This method works regardless of Windows
installation drive.

## Accessing the Temp Folder

This example demonstrates retrieving the system's temporary folder path. The Temp
folder is commonly used for storing transient files. GetSpecialFolder
provides a consistent way to access this location across systems.

temp_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempFolder = fso.GetSpecialFolder(2)
WScript.Echo "Temp folder: " &amp; tempFolder

Set fso = Nothing

The script uses GetSpecialFolder(2) to get the Temp folder path.
This typically returns a path like "C:\Users\[User]\AppData\Local\Temp". The
result is displayed for verification. This approach works for all user accounts.

## Creating a Temp File Path

This example combines GetSpecialFolder with other methods to create
a temporary file path. It shows practical usage for generating unique temp
files. The script ensures proper temp file location regardless of system
configuration.

temp_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempFolder = fso.GetSpecialFolder(2)
tempFile = fso.BuildPath(tempFolder, "temp_" &amp; Timer &amp; ".tmp")

WScript.Echo "Temp file path: " &amp; tempFile

Set fso = Nothing

The script first gets the Temp folder path using GetSpecialFolder(2).
It then creates a unique filename using Timer for uniqueness. The
BuildPath method combines these into a complete path. This pattern
is useful for temporary file operations.

## Checking Folder Accessibility

This example demonstrates verifying access to a special folder before use. It
combines GetSpecialFolder with error handling. This ensures robust
script behavior when dealing with system folders.

folder_check.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
sysFolder = fso.GetSpecialFolder(1)

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error accessing System folder: " &amp; Err.Description
Else
    WScript.Echo "System folder accessible: " &amp; sysFolder
End If

Set fso = Nothing

The script attempts to access the System folder with error handling enabled. If
successful, it displays the path. If not, it shows the error description. This
pattern is useful for scripts requiring system folder access.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetSpecialFolder method in
VBScript, covering its usage and practical applications. From accessing system
folders to creating temp files, these examples demonstrate reliable system path
retrieval. With this knowledge, you can enhance your scripts with robust system
folder handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).