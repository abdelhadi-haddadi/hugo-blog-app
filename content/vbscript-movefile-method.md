+++
title = "VBScript MoveFile Method"
date = 2025-08-29T20:15:08.724+01:00
draft = false
description = "Learn about VBScript MoveFile method, including file moving operations, error handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MoveFile Method

last modified April 9, 2025

The MoveFile method in VBScript is part of the
FileSystemObject. It moves one or more files from one location to
another. This method can handle both single files and wildcard patterns for
multiple files. It's commonly used in file management and automation scripts.

MoveFile performs both the move and rename operations in one step.
It overwrites existing files if they have the same name in the destination.
Understanding this method helps create efficient file management scripts.

## MoveFile Method Overview

The MoveFile method takes two parameters: source and destination.
Source can be a single file path or a wildcard pattern. Destination must be a
valid path where files should be moved. The method is available through the
FileSystemObject in VBScript.

Key features include moving files across drives and handling wildcards. It
throws errors if source files don't exist or destination is invalid.
MoveFile is atomic when moving within the same volume. This
tutorial covers MoveFile with practical examples.

## Basic File Move Operation

This example demonstrates the simplest use of MoveFile to move a
single file. It shows how to specify source and destination paths. The file is
moved from its original location to the new destination.

basic_movefile.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\test.txt"
destination = "C:\Backup\test.txt"

fso.MoveFile source, destination
WScript.Echo "File moved successfully"

Set fso = Nothing

The script creates a FileSystemObject and calls MoveFile.
The file "test.txt" is moved from C:\Temp to C:\Backup. If the operation
succeeds, a confirmation message is displayed. Always release the object when
done.

## Moving Multiple Files with Wildcards

MoveFile can move multiple files using wildcard patterns. This
example shows how to move all text files from one directory to another. The
wildcard character (*) matches any filename with the .txt extension.

wildcard_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\*.txt"
destination = "C:\Backup\"

fso.MoveFile source, destination
WScript.Echo "All text files moved successfully"

Set fso = Nothing

All .txt files in C:\Temp are moved to C:\Backup. The destination must be a
directory path ending with a backslash. The original filenames are preserved.
This is useful for batch file operations.

## Renaming a File During Move

MoveFile can rename files during the move operation. This example
shows how to change a file's name when moving it. The destination path includes
the new filename while the source specifies the original.

rename_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\oldname.txt"
destination = "C:\Backup\newname.txt"

fso.MoveFile source, destination
WScript.Echo "File moved and renamed successfully"

Set fso = Nothing

The file "oldname.txt" is moved to C:\Backup and renamed to "newname.txt". This
combines moving and renaming into a single operation. The destination must
include the full new path and filename.

## Error Handling in MoveFile

This example demonstrates proper error handling when using MoveFile.
It catches common errors like missing source files or invalid paths. Error
handling makes scripts more robust and user-friendly.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\nonexistent.txt"
destination = "C:\Backup\file.txt"

fso.MoveFile source, destination

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error moving file: " &amp; Err.Description
    Err.Clear
Else
    WScript.Echo "File moved successfully"
End If

Set fso = Nothing

The script attempts to move a non-existent file. The error is caught and a
descriptive message is displayed. On Error Resume Next prevents
script termination on errors. Always clear the error object after handling.

## Moving Files Between Drives

MoveFile can move files between different drives. This example
shows moving a file from C: drive to D: drive. The operation works the same way
as moving within the same drive.

cross_drive_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\data.dat"
destination = "D:\Archive\data.dat"

fso.MoveFile source, destination
WScript.Echo "File moved between drives successfully"

Set fso = Nothing

The file "data.dat" is moved from C:\Temp to D:\Archive. Moving between drives
may take longer than same-drive moves. The operation is not atomic between
drives. Ensure sufficient space exists on the destination drive.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/1dz311e4(v=vs.84))

In this article, we have explored the MoveFile method in VBScript,
covering its usage and practical applications. From basic moves to error
handling, these examples demonstrate reliable file operations. With this
knowledge, you can enhance your file management scripts with robust moving
capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).