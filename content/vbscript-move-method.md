+++
title = "VBScript Move Method"
date = 2025-08-29T20:15:08.720+01:00
draft = false
description = "Learn about VBScript Move method, including file and folder movement, error handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Move Method

last modified April 9, 2025

The Move method in VBScript is part of the
FileSystemObject. It allows moving files or folders from one
location to another. The method handles both file and directory movement
operations. It's commonly used in file management scripts and automation tasks.

Move performs atomic operations when possible, ensuring data
integrity. It can overwrite existing files if they have the same name. This
tutorial covers Move with practical examples to demonstrate its
usage in various scenarios.

## Move Method Overview

The Move method takes one parameter: the destination path. It moves
the file or folder to the specified location. The method is available through
both File and Folder objects in VBScript scripting.

Key features include support for network paths and relative paths. It raises
errors if the destination exists or paths are invalid. Move works
across drives when supported by the filesystem. Understanding this method helps
create robust file management scripts.

## Basic File Movement

This example demonstrates the simplest use of Move to relocate a
file. It shows how to move a file from one directory to another. The operation
is performed using the File object's Move method.

basic_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\source.txt")
file.Move "C:\Archive\destination.txt"

WScript.Echo "File moved successfully"

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to the
source file. The Move method is called with the destination path.
The file is moved from "C:\Temp\source.txt" to "C:\Archive\destination.txt".
Note the destination filename can be changed during the move.

## Moving a Folder

This example shows how to move an entire folder using the Move
method. The operation moves all contents within the folder to the new location.
Folder movement maintains the directory structure.

move_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects\OldLocation")
folder.Move "D:\Backups\NewLocation"

WScript.Echo "Folder moved successfully"

Set folder = Nothing
Set fso = Nothing

The script moves the folder "OldLocation" from "C:\Projects" to "D:\Backups".
All files and subfolders within "OldLocation" are moved recursively. The folder
is renamed to "NewLocation" during the move operation. Note that moving across
drives may have different behavior depending on the filesystem.

## Moving with Error Handling

This example demonstrates proper error handling when using the Move
method. It includes a try-catch block to manage potential errors during the move
operation. Common errors include missing files or permission issues.

move_with_errors.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\nonexistent.txt")
file.Move "C:\Archive\moved.txt"

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error moving file: " &amp; Err.Description
Else
    WScript.Echo "File moved successfully"
End If

On Error GoTo 0

Set file = Nothing
Set fso = Nothing

The script attempts to move a potentially non-existent file. The error handling
structure catches any issues during the operation. If successful, it confirms
the move; otherwise, it displays the error message. This pattern is essential
for robust file operations in scripts.

## Moving Multiple Files

This example shows how to move multiple files using a loop with the
Move method. It demonstrates processing all files in a directory
and moving them to a new location. Each file maintains its original name.

move_multiple.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp\SourceFiles")
Set files = folder.Files

For Each file in files
    file.Move "D:\Archive\" &amp; file.Name
    WScript.Echo "Moved: " &amp; file.Name
Next

WScript.Echo "All files moved successfully"

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script gets all files from "C:\Temp\SourceFiles" and moves them to
"D:\Archive". Each file keeps its original name during the move. The loop
processes each file individually, providing feedback for each operation. This
pattern is useful for batch file processing tasks.

## Conditional File Movement

This example demonstrates conditional file movement based on file properties.
It shows how to move only files that meet specific criteria (in this case, file
extension). The script filters files before performing the move operation.

conditional_move.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Downloads")
Set files = folder.Files

For Each file in files
    If LCase(fso.GetExtensionName(file.Name)) = "pdf" Then
        file.Move "C:\Documents\PDFs\" &amp; file.Name
        WScript.Echo "Moved PDF: " &amp; file.Name
    End If
Next

WScript.Echo "PDF files moved successfully"

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script moves only PDF files from "C:\Downloads" to "C:\Documents\PDFs". It
checks each file's extension before moving. Files that don't match the criteria
are left untouched. This approach is useful for organizing files by type or
other attributes.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Move method in VBScript,
covering its usage and practical applications. From simple file movements to
complex conditional operations, these examples demonstrate reliable file
management. With this knowledge, you can enhance your file handling scripts
with robust movement capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).