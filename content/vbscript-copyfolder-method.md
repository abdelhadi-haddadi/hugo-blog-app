+++
title = "VBScript CopyFolder Method"
date = 2025-08-29T20:14:56.341+01:00
draft = false
description = "Learn about VBScript CopyFolder method, including folder copying, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CopyFolder Method

last modified April 9, 2025

The CopyFolder method in VBScript is part of the
FileSystemObject. It copies folders and their contents from one
location to another. This method handles recursive copying of all subfolders and
files. It's commonly used in backup scripts and file management operations.

CopyFolder provides options to overwrite existing files or skip
them. It simplifies folder duplication tasks with a single method call. This
tutorial covers CopyFolder with practical examples to demonstrate
its usage in various scenarios.

## CopyFolder Method Overview

The CopyFolder method takes source and destination paths as
parameters. An optional third parameter controls overwrite behavior. The method
is available through the FileSystemObject in VBScript scripting.

Key features include recursive folder copying and wildcard support. It can copy
entire directory trees with one command. CopyFolder throws errors if
paths are invalid or access is denied. Understanding this method helps automate
file management tasks.

## Basic Folder Copy

This example demonstrates the simplest use of CopyFolder to copy a
folder. It shows how to duplicate a folder and its contents to a new location.
The operation includes all subfolders and files within the source folder.

basic_copyfolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\Reports"
destination = "D:\Backups\Reports"

fso.CopyFolder source, destination

WScript.Echo "Folder copied successfully"
Set fso = Nothing

The script creates a FileSystemObject and calls
CopyFolder. The "Reports" folder is copied from C:\Temp to
D:\Backups. If the destination folder exists, it will raise an error unless
overwrite is enabled.

## Copying with Overwrite Option

This example shows how to use the overwrite parameter to control file
replacement. When set to True, existing files in the destination are
overwritten. False skips existing files during the copy operation.

overwrite_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Projects\Website"
destination = "D:\Backups\Website"

' True enables overwriting existing files
fso.CopyFolder source, destination, True

WScript.Echo "Folder copied with overwrite enabled"
Set fso = Nothing

The script copies the Website folder and overwrites any existing files in the
destination. The third parameter (True) enables overwrite behavior. Without this
parameter, the default is True in most Windows versions.

## Using Wildcards in Folder Copy

CopyFolder supports wildcards to copy multiple matching folders.
This example shows how to use the asterisk (*) wildcard. Only folders matching
the pattern will be copied to the destination.

wildcard_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Projects\Web*"
destination = "D:\Backups"

fso.CopyFolder source, destination

WScript.Echo "All Web* folders copied successfully"
Set fso = Nothing

The script copies all folders starting with "Web" from C:\Projects to D:\Backups.
Each matching folder maintains its original name in the destination. Wildcards
provide flexibility when selecting folders to copy.

## Handling Copy Errors

This example demonstrates error handling during folder copy operations. It uses
VBScript's On Error Resume Next to catch and report copy failures.
Proper error handling makes scripts more robust in production environments.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\NonExistentFolder"
destination = "D:\Backups"

fso.CopyFolder source, destination

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error copying folder: " &amp; Err.Description
Else
    WScript.Echo "Folder copied successfully"
End If

On Error GoTo 0
Set fso = Nothing

The script attempts to copy a non-existent folder, triggering an error. The
error handler displays a descriptive message instead of crashing. This approach
is essential for unattended script execution.

## Copying to Network Location

This example shows how to copy folders to a network share. The process is
similar to local copying but requires proper network permissions. UNC paths are
used to specify network locations.

network_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\ImportantData"
destination = "\\Server\Shared\Backups"

fso.CopyFolder source, destination

WScript.Echo "Folder copied to network location"
Set fso = Nothing

The script copies ImportantData to a network share. The destination uses UNC
format (\\Server\Share). Network copies may require authentication and proper
share permissions. Large copies may take longer over network connections.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the CopyFolder method in VBScript,
covering its usage and practical applications. From basic folder copies to
network operations, these examples demonstrate reliable folder duplication. With
this knowledge, you can enhance your file management scripts with powerful
copying capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).