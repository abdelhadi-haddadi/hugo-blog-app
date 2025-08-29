+++
title = "VBScript FileExists Method"
date = 2025-08-29T20:15:00.844+01:00
draft = false
description = "Learn about VBScript FileExists method, including file checking, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FileExists Method

last modified April 9, 2025

The FileExists method in VBScript is part of the
FileSystemObject. It checks whether a specified file exists at a
given path. This method returns a Boolean value indicating the file's existence.
It's commonly used before performing file operations to prevent errors.

FileExists helps create robust scripts by verifying file presence
before access. It works with absolute and relative paths. This tutorial covers
FileExists with practical examples to demonstrate its usage.

## FileExists Method Overview

The FileExists method takes one parameter: the file path to check.
It returns True if the file exists, False otherwise. The method is available
through the FileSystemObject in VBScript scripting.

Key features include case-insensitive checking on Windows systems. It only
checks for files, not directories. FileExists requires proper
permissions to access the file location. Understanding this method helps create
error-resistant file handling scripts.

## Basic File Existence Check

This example demonstrates the simplest use of FileExists to verify
a file's existence. It shows how to check if a specific file is present. The
script outputs a message based on the check result.

basic_fileexists.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\test.txt"

If fso.FileExists(filePath) Then
    WScript.Echo "File exists"
Else
    WScript.Echo "File does not exist"
End If

Set fso = Nothing

The script creates a FileSystemObject and checks for "test.txt".
The result determines which message is displayed. This pattern is fundamental for
safe file operations. Always check existence before accessing files.

## Checking File Before Deletion

This example shows using FileExists before attempting to delete a
file. It prevents errors when the file doesn't exist. The script only attempts
deletion if the file is present.

delete_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\oldfile.txt"

If fso.FileExists(filePath) Then
    fso.DeleteFile(filePath)
    WScript.Echo "File deleted successfully"
Else
    WScript.Echo "File not found - nothing to delete"
End If

Set fso = Nothing

The script checks for "oldfile.txt" before deletion. This prevents runtime
errors from attempting to delete non-existent files. It's a best practice for
file management scripts. The user gets appropriate feedback in both cases.

## Conditional File Creation

This example demonstrates creating a file only if it doesn't already exist. It
uses FileExists to avoid overwriting existing files. The script
makes decisions based on the file's current status.

conditional_create.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\data.log"

If Not fso.FileExists(filePath) Then
    Set file = fso.CreateTextFile(filePath)
    file.WriteLine "Initial log entry"
    file.Close
    WScript.Echo "New file created"
Else
    WScript.Echo "File already exists - not modified"
End If

Set fso = Nothing

The script checks for "data.log" before creation. If absent, it creates the file
with initial content. If present, it leaves the file unchanged. This pattern is
useful for initialization scripts.

## Processing Files in a Directory

This example shows how to use FileExists when processing files in a
directory. It combines file checking with directory operations. The script
verifies each file before processing.

directory_processing.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\reports\"

For Each file In fso.GetFolder(folderPath).Files
    If fso.FileExists(file.Path) Then
        WScript.Echo "Processing file: " &amp; file.Name
        ' Add file processing logic here
    End If
Next

Set fso = Nothing

The script iterates through files in "C:\reports". It confirms each file's
existence before processing. This extra check adds robustness to directory
processing scripts. The pattern works with any file operation logic.

## Checking Multiple File Paths

This example demonstrates checking multiple potential file locations. It uses
FileExists to find which of several paths contains the file. The
script tests paths in order until finding the existing file.

multiple_paths.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
paths = Array("C:\config.ini", "D:\config.ini", "C:\temp\config.ini")

For Each path In paths
    If fso.FileExists(path) Then
        WScript.Echo "Found config file at: " &amp; path
        Exit For
    End If
Next

If Not fso.FileExists(path) Then
    WScript.Echo "Config file not found in any location"
End If

Set fso = Nothing

The script checks three possible locations for "config.ini". It stops at the
first valid path found. This approach is useful for configuration file lookup.
The script provides feedback whether the file was found or not.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/1ftczy61(v=vs.84))

In this article, we have explored the FileExists method in VBScript,
covering its usage and practical applications. From simple checks to complex file
processing, these examples demonstrate reliable file verification. With this
knowledge, you can enhance your file handling scripts with robust existence
checking.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).