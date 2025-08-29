+++
title = "VBScript ShortName Property"
date = 2025-08-29T20:15:13.157+01:00
draft = false
description = "Learn about VBScript ShortName property, including 8.3 filename format, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ShortName Property

last modified April 9, 2025

The ShortName property in VBScript is part of the
FileSystemObject object model. It returns the short (8.3) name
version of a file or folder. This property is useful for compatibility with
legacy systems that require the 8.3 filename format. It's available for both
File and Folder objects.

ShortName provides backward compatibility with older Windows
versions. The 8.3 format consists of up to 8 characters for the name and 3 for
the extension. This tutorial covers ShortName with practical
examples to demonstrate its usage.

## ShortName Property Overview

The ShortName property returns a string representing the short name
of a file or folder. It's a read-only property available through the
FileSystemObject in VBScript. The property works with both
existing files and directories.

Key features include automatic conversion from long filenames to 8.3 format. It
doesn't modify the actual file, just provides an alternative name. Understanding
this property helps when working with legacy applications or systems.

## Getting Short Name of a File

This example demonstrates how to retrieve the short name of a file. It shows the
basic usage of the ShortName property with a File object. The
script gets both the long and short names for comparison.

file_shortname.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Windows\System32\notepad.exe")

WScript.Echo "Long name: " &amp; file.Name
WScript.Echo "Short name: " &amp; file.ShortName

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to
notepad.exe. It then displays both the regular name and short name. The short
name typically appears in 8.3 format like NOTEPAD.EXE.

## Getting Short Name of a Folder

This example shows how to retrieve the short name of a directory. The process is
similar to files but uses a Folder object instead. It demonstrates the
ShortName property with directories.

folder_shortname.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files")

WScript.Echo "Long name: " &amp; folder.Name
WScript.Echo "Short name: " &amp; folder.ShortName

Set folder = Nothing
Set fso = Nothing

The script gets the "Program Files" folder and displays both names. The short
name typically appears as PROGRA~1 or similar. This is useful when working with
legacy applications that can't handle spaces in paths.

## Using ShortName in Path Construction

This example demonstrates using ShortName to build paths compatible
with older systems. It combines the short names of a folder and file to create a
complete path. This ensures maximum compatibility.

shortname_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files")
Set file = fso.GetFile("C:\Program Files\Internet Explorer\iexplore.exe")

shortPath = folder.ShortName &amp; "\" &amp; file.ShortName
WScript.Echo "Short path: " &amp; shortPath

Set file = Nothing
Set folder = Nothing
Set fso = Nothing

The script constructs a path using short names for both the directory and file.
This creates a path like "PROGRA~1\IEXPLORE.EXE". Such paths work in older
systems that don't support long filenames or spaces.

## Listing Short Names in a Directory

This example shows how to list all files in a directory with their short names.
It demonstrates processing multiple files and accessing their ShortName
properties. The script provides a complete directory listing.

directory_listing.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Windows\System32")

WScript.Echo "Files in " &amp; folder.Name &amp; ":"
For Each file In folder.Files
    WScript.Echo file.Name &amp; " (" &amp; file.ShortName &amp; ")"
Next

Set folder = Nothing
Set fso = Nothing

The script lists all files in System32 with both long and short names. Each line
shows the filename in both formats. This is useful for comparing naming
conventions or troubleshooting legacy system issues.

## Checking Short Name Availability

This example checks if a short name exists for a given file. Some systems may
have short names disabled. The script demonstrates error handling when working
with the ShortName property.

check_shortname.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Windows\System32\notepad.exe")

If Err.Number = 0 Then
    shortName = file.ShortName
    If Err.Number = 0 Then
        WScript.Echo "Short name available: " &amp; shortName
    Else
        WScript.Echo "Short names not enabled on this system"
    End If
Else
    WScript.Echo "File not found"
End If

Set file = Nothing
Set fso = Nothing

The script attempts to get the short name of notepad.exe. If short names are
disabled on the system, it will display an appropriate message. This helps
create robust scripts that work in different environments.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d6dw7aeh(v=vs.84))

In this article, we have explored the ShortName property in VBScript,
covering its usage and practical applications. From basic file operations to
directory listings, these examples demonstrate working with 8.3 filenames. With
this knowledge, you can enhance your scripts for better compatibility with
legacy systems.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).