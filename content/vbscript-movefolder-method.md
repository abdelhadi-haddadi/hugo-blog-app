+++
title = "VBScript MoveFolder Method"
date = 2025-08-29T20:15:08.703+01:00
draft = false
description = "Learn about VBScript MoveFolder method, including folder operations, file management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MoveFolder Method

last modified April 9, 2025

The MoveFolder method in VBScript is part of the
FileSystemObject. It moves a folder from one location to another.
This method handles all contents within the folder including subfolders. It's
commonly used in file management and directory organization tasks.

MoveFolder differs from copying as it removes the original folder.
The method requires proper permissions for both source and destination paths.
This tutorial covers MoveFolder with practical examples to
demonstrate its usage in various scenarios.

## MoveFolder Method Overview

The MoveFolder method takes two parameters: source path and
destination path. It moves the entire folder structure to the new location.
The method is available through the FileSystemObject in VBScript.

Key features include moving folders across drives and handling subfolders.
The source folder must exist, while the destination must not exist.
MoveFolder preserves all folder contents during the operation.
Understanding this method helps automate folder management tasks.

## Basic Folder Move Operation

This example demonstrates the simplest use of MoveFolder to move
a folder to a new location. It shows how the method transfers the entire
folder structure. The operation is atomic when performed on the same drive.

basic_movefolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\OldFolder"
destination = "C:\Temp\NewFolder"

fso.MoveFolder source, destination
WScript.Echo "Folder moved successfully"

Set fso = Nothing

The script creates a FileSystemObject and calls
MoveFolder. The folder "OldFolder" is moved to "NewFolder".
All contents are preserved during the move. The original folder is deleted
after successful transfer.

## Moving Folders Across Drives

This example shows how MoveFolder works when moving between
different drives. The operation behaves differently across drives compared
to same-drive moves. It's essentially a copy followed by delete.

cross_drive_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Projects\Website"
destination = "D:\Backups\Website"

fso.MoveFolder source, destination
WScript.Echo "Folder moved to different drive"

Set fso = Nothing

The folder is moved from C: to D: drive. Unlike same-drive moves, this
operation takes longer as it copies all files. The original folder is
deleted only after successful copy. Permissions are required on both drives.

## Handling Errors in Move Operations

This example demonstrates error handling when using MoveFolder.
Common errors include missing source or existing destination folders.
Proper error handling makes scripts more robust and user-friendly.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\NonExistentFolder"
destination = "C:\Temp\NewLocation"

fso.MoveFolder source, destination

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error moving folder: " &amp; Err.Description
Else
    WScript.Echo "Folder moved successfully"
End If

Set fso = Nothing

The script attempts to move a non-existent folder. Error handling captures
the failure and displays a descriptive message. This approach prevents script
termination on errors. Always check for errors after file operations.

## Moving Folders with Wildcards

MoveFolder supports wildcard characters for moving multiple
folders matching a pattern. This example shows moving folders using the
asterisk wildcard. Only folders matching the pattern will be moved.

wildcard_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\Project*"
destination = "D:\Archives\"

fso.MoveFolder source, destination
WScript.Echo "Moved all Project folders"

Set fso = Nothing

The script moves all folders starting with "Project" from C:\Temp to
D:\Archives. Each matching folder is moved with its complete contents.
Wildcards provide powerful pattern matching for batch operations.
Note that the destination must be a folder, not a file path.

## Moving Folders with Special Characters

This example demonstrates moving folders containing special characters
in their names. Proper handling of spaces and special chars is essential
for reliable script operation. Paths with spaces often require quotes.

special_chars.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\My Projects\Important Data"
destination = "C:\Backups\Critical Files"

' Alternative approach for paths with spaces:
' source = Chr(34) &amp; "C:\My Projects\Important Data" &amp; Chr(34)
' destination = Chr(34) &amp; "C:\Backups\Critical Files" &amp; Chr(34)

fso.MoveFolder source, destination
WScript.Echo "Folder with special chars moved"

Set fso = Nothing

The script moves a folder containing spaces in its name. The commented
alternative shows using Chr(34) for explicit quoting. Both approaches
work correctly with spaces and special characters. Choose the method
that fits your scripting style better.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/0k5wxfxd(v=vs.84))

In this article, we have explored the MoveFolder method in VBScript,
covering its usage and practical applications. From basic moves to advanced
scenarios with error handling and wildcards, these examples demonstrate
reliable folder management. With this knowledge, you can enhance your file
handling scripts with robust folder operations.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).