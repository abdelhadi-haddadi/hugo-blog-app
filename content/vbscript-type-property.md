+++
title = "VBScript Type Property"
date = 2025-08-29T20:15:16.504+01:00
draft = false
description = "Learn about VBScript Type Property, including file type checking, object type identification, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Type Property

last modified April 9, 2025

The Type property in VBScript is used to determine the type of a file
or folder when working with the FileSystemObject. It returns a numeric
value indicating whether the item is a file, folder, or drive. This property is
essential for file system operations where type checking is required.

Type helps distinguish between different filesystem objects before
performing operations. It prevents errors by ensuring operations match the object
type. This tutorial covers Type with practical examples to demonstrate
its usage in various scenarios.

## Type Property Overview

The Type property returns an integer representing the object type.
For files, it returns the file type as registered in the system. For folders, it
returns 1, and for drives, it returns 2. The property is read-only and available
through FileSystemObject objects.

Common return values include 1 for folders, 2 for drives, and various numbers
for files. File types correspond to system registry associations.
Understanding these values helps create robust file handling scripts with proper
type checking.

## Checking File Type

This example demonstrates checking the type of a file using the Type
property. It shows how to determine if a path points to a file and display its
type. The script uses FileSystemObject to access the property.

check_file_type.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Windows\notepad.exe")

fileType = file.Type
WScript.Echo "File type: " &amp; fileType ' Output: File type: Application

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to
notepad.exe. The Type property returns "Application" for executable
files. Different file extensions return different type descriptions based on
system registry.

## Distinguishing Files from Folders

This example shows how to use the Type property to distinguish
between files and folders. It checks the type of a given path and displays
whether it's a file or folder. This is useful for path validation.

file_folder_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
path = "C:\Windows"

If fso.FolderExists(path) Then
    Set folder = fso.GetFolder(path)
    WScript.Echo "Type: " &amp; folder.Type ' Output: Type: File Folder
ElseIf fso.FileExists(path) Then
    Set file = fso.GetFile(path)
    WScript.Echo "Type: " &amp; file.Type
Else
    WScript.Echo "Path not found"
End If

Set fso = Nothing

The script checks if the path exists as a folder or file. For folders, the
Type property returns "File Folder". This distinction helps prevent
errors when performing type-specific operations like file reading or directory
listing.

## Checking Drive Type

This example demonstrates using the Type property with drive
objects. It shows how to determine if a path represents a drive and identify its
type. Drive types include fixed, removable, and network drives.

drive_type_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive in drives
    WScript.Echo "Drive " &amp; drive.DriveLetter &amp; ": " &amp; drive.Type
Next

Set drives = Nothing
Set fso = Nothing

The script enumerates all available drives and displays their types. For drives,
the Type property returns descriptions like "Local Disk" or "CD-ROM
Drive". This information is useful for scripts that need to handle different
storage media types.

## Handling Multiple File Types

This example shows how to handle different file types in a directory. It lists
files in a folder and displays their types. The script demonstrates practical
use of the Type property for file classification.

multiple_file_types.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Windows\System32")

WScript.Echo "Files in System32:"
For Each file in folder.Files
    WScript.Echo file.Name &amp; " - " &amp; file.Type
Next

Set folder = Nothing
Set fso = Nothing

The script retrieves all files in the System32 directory and displays their
names and types. Different files show different type descriptions like
"Application", "DLL", or "Configuration Settings". This helps in organizing or
processing files based on their types.

## Validating Object Types Before Operations

This example demonstrates using the Type property to validate
object types before performing operations. It checks if a path points to a text
file before attempting to read it. This prevents errors from incorrect file types.

type_validation.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\example.txt"

If fso.FileExists(filePath) Then
    Set file = fso.GetFile(filePath)
    If InStr(1, file.Type, "Text", 1) &gt; 0 Then
        WScript.Echo "File is a text document"
    Else
        WScript.Echo "Not a text file: " &amp; file.Type
    End If
Else
    WScript.Echo "File not found"
End If

Set fso = Nothing

The script checks if the file exists and then verifies its type contains "Text".
This approach is more reliable than just checking the file extension. The
Type property provides system-registered file type information for
accurate validation.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Type property in VBScript,
covering its usage and practical applications. From simple type checking to
complex file system operations, these examples demonstrate reliable object type
identification. With this knowledge, you can enhance your file handling scripts
with robust type validation.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).