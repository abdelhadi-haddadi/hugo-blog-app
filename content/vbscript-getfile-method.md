+++
title = "VBScript GetFile Method"
date = 2025-08-29T20:15:05.439+01:00
draft = false
description = "Learn about VBScript GetFile method, including file properties, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetFile Method

last modified April 9, 2025

The GetFile method in VBScript is part of the
FileSystemObject. It returns a File object corresponding to the
specified path. This method allows access to file properties and operations.
It's essential for file manipulation tasks in VBScript.

GetFile requires an existing file path or it will raise an error.
The returned File object provides methods and properties for file management.
This tutorial covers GetFile with practical examples to demonstrate
its usage.

## GetFile Method Overview

The GetFile method takes one parameter: the path to an existing
file. It returns a File object that represents the specified file. The method is
available through the FileSystemObject in VBScript scripting.

Key features include access to file attributes, size, and dates. The File object
also supports file operations like copying and moving. GetFile is
essential for scripts that need to examine or manipulate files.

## Basic File Information Retrieval

This example demonstrates the simplest use of GetFile to get basic
file information. It shows how to access common file properties like name, size,
and creation date. The script retrieves and displays these properties.

basic_getfile.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\example.txt")

WScript.Echo "File Name: " &amp; file.Name
WScript.Echo "Size: " &amp; file.Size &amp; " bytes"
WScript.Echo "Created: " &amp; file.DateCreated

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and calls
GetFile with a file path. It then accesses properties of the File
object. The output shows the file's name, size, and creation date.

## Checking File Existence Before Access

This example shows how to safely check if a file exists before using
GetFile. It demonstrates proper error handling to avoid runtime
errors. The script uses FileExists to verify the file first.

file_existence.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\nonexistent.txt"

If fso.FileExists(filePath) Then
    Set file = fso.GetFile(filePath)
    WScript.Echo "File size: " &amp; file.Size
Else
    WScript.Echo "File does not exist"
End If

Set fso = Nothing

The script checks for file existence before calling GetFile. This
prevents errors when the file doesn't exist. It's a best practice for robust
file handling scripts.

## Working with File Attributes

This example demonstrates accessing and modifying file attributes using the File
object. It shows how to read and change attributes like ReadOnly, Hidden, and
System. The script toggles the ReadOnly attribute.

file_attributes.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\example.txt")

WScript.Echo "Current attributes: " &amp; file.Attributes
file.Attributes = file.Attributes Xor 1 ' Toggle ReadOnly

Set file = Nothing
Set fso = Nothing

The script gets a File object and displays its current attributes. It then
toggles the ReadOnly bit using XOR operation. This demonstrates attribute
manipulation with the File object.

## Copying and Moving Files

This example shows how to use the File object's methods to copy and move files.
It demonstrates the Copy and Move methods available
through the File object. The script performs both operations.

file_operations.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\source.txt")

' Copy the file
file.Copy "C:\temp\backup\source_copy.txt"

' Move the file
file.Move "C:\temp\archive\source.txt"

Set file = Nothing
Set fso = Nothing

The script first copies the file to a backup location. Then it moves the
original file to an archive directory. Both operations use methods of the File
object returned by GetFile.

## Getting File Version Information

This advanced example demonstrates accessing version information of executable
files. It shows how to use the File object's properties to get version details.
The script retrieves and displays version information.

file_version.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Windows\notepad.exe")

WScript.Echo "File Version: " &amp; file.VersionInfo.FileVersion
WScript.Echo "Product Version: " &amp; file.VersionInfo.ProductVersion

Set file = Nothing
Set fso = Nothing

The script accesses the VersionInfo property of the File object. This property
contains detailed version information for executable files. The output shows both
file and product version numbers.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetFile method in VBScript,
covering its usage and practical applications. From basic file information to
advanced operations, these examples demonstrate file handling capabilities. With
this knowledge, you can enhance your scripts with robust file management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).