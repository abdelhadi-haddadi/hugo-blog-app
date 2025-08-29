+++
title = "VBScript Files Property"
date = 2025-08-29T20:15:01.939+01:00
draft = false
description = "Learn about VBScript Files property, including file collections, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Files Property

last modified April 9, 2025

The Files property in VBScript is part of the
FileSystemObject and Folder objects. It returns a
collection of all files in a specified folder. This property enables efficient
file enumeration and manipulation within directories. It's essential for file
management tasks in VBScript.

The Files collection provides access to individual file objects
with their properties and methods. You can iterate through files, check their
attributes, or perform operations. This tutorial covers the Files
property with practical examples to demonstrate its usage.

## Files Property Overview

The Files property returns a Files collection object
containing all files in a folder. Each file is represented as a
File object with properties like Name, Size, and DateCreated. The
collection is accessed through a Folder object.

Key features include the ability to count files and access them by index or
name. The collection is read-only; you can't add or remove files directly.
Understanding this property helps create powerful file management scripts.

## Listing All Files in a Folder

This example demonstrates how to retrieve and display all files in a specified
folder. It shows basic usage of the Files property with a simple
iteration. The script lists file names from the target directory.

list_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")
Set files = folder.Files

For Each file In files
    WScript.Echo file.Name
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a folder reference.
The Files property returns all files in the folder. A For Each loop
iterates through the collection, displaying each file name. Proper cleanup
releases all object references.

## Counting Files in a Directory

This example shows how to count files in a directory using the
Files collection's Count property. It demonstrates
quick file enumeration without iterating through each file. The count includes
all files in the specified folder.

count_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Windows\System32")
fileCount = folder.Files.Count

WScript.Echo "Number of files: " &amp; fileCount

Set folder = Nothing
Set fso = Nothing

The script accesses the System32 directory and retrieves its file count. The
Count property provides the total number of files immediately. This
is efficient for getting directory statistics without processing each file
individually.

## Filtering Files by Extension

This example demonstrates filtering files by extension using the
Files collection. It shows how to check file extensions during
iteration. The script lists only files with a specific extension (.txt in this
case).

filter_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Documents")
Set files = folder.Files

For Each file In files
    If LCase(fso.GetExtensionName(file.Name)) = "txt" Then
        WScript.Echo file.Name
    End If
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script checks each file's extension using GetExtensionName.
Only files with .txt extension are displayed. This pattern can be adapted for
any file type filter. The comparison uses lowercase to ensure case-insensitive
matching.

## Accessing File Properties

This example shows how to access various properties of files in the
Files collection. It demonstrates retrieving size, creation date,
and other attributes. Each file object contains valuable metadata.

file_properties.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")
Set files = folder.Files

For Each file In files
    WScript.Echo "Name: " &amp; file.Name
    WScript.Echo "Size: " &amp; file.Size &amp; " bytes"
    WScript.Echo "Created: " &amp; file.DateCreated
    WScript.Echo "Modified: " &amp; file.DateLastModified
    WScript.Echo "---------------------"
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script displays multiple properties for each file in the Temp directory.
Properties include name, size, creation and modification dates. This information
is useful for file management and reporting tasks. Each file object provides
these standard properties.

## Checking for Specific Files

This example demonstrates checking if a specific file exists in a folder's
Files collection. It shows how to search for a file by name. The
script verifies file existence without using the FileExists method.

check_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\ImportantFiles")
Set files = folder.Files
targetFile = "report.xlsx"
fileExists = False

For Each file In files
    If LCase(file.Name) = LCase(targetFile) Then
        fileExists = True
        Exit For
    End If
Next

If fileExists Then
    WScript.Echo targetFile &amp; " exists in the folder."
Else
    WScript.Echo targetFile &amp; " not found."
End If

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script searches for "report.xlsx" in the ImportantFiles directory. It uses
case-insensitive comparison to match filenames. This approach is useful when you
need to process the file if found. The loop exits early when the file is
located.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Files property in VBScript,
covering its usage and practical applications. From simple file listing to
complex filtering and property access, these examples demonstrate powerful file
management capabilities. With this knowledge, you can enhance your file handling
scripts with robust collection operations.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).