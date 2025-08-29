+++
title = "VBScript Delete Method"
date = 2025-08-29T20:15:42.175+01:00
draft = false
description = "Learn about VBScript Delete method, including file deletion, folder deletion, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Delete Method

last modified April 9, 2025

The Delete method in VBScript is part of the
FileSystemObject. It permanently removes files or folders from the
file system. This method is powerful and should be used with caution as deleted
items cannot be recovered. It's commonly used in file cleanup operations.

Delete can remove both files and folders, with options for
recursive deletion. It permanently erases data without sending to recycle bin.
This tutorial covers Delete with practical examples to demonstrate
its usage in various scenarios.

## Delete Method Overview

The Delete method is available on both File and
Folder objects. It takes an optional parameter to force deletion of
read-only items. The method permanently removes the specified file system
object. No confirmation is requested before deletion.

Key features include immediate permanent deletion and recursive folder removal.
It doesn't support wildcards - exact paths must be specified.
Delete throws errors if the target doesn't exist or is in use.
Understanding this method helps create effective file management scripts.

## Deleting a Single File

This example demonstrates the simplest use of Delete to remove a
single file. It shows basic file deletion with error handling. The script checks
if the file exists before attempting deletion.

delete_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\Temp\old_report.txt"

If fso.FileExists(filePath) Then
    Set file = fso.GetFile(filePath)
    file.Delete
    WScript.Echo "File deleted successfully"
Else
    WScript.Echo "File does not exist"
End If

Set fso = Nothing

The script creates a FileSystemObject and checks for file
existence. If found, it gets a File object and calls
Delete. The file is permanently removed without confirmation.
Always verify existence before deletion to avoid errors.

## Force Deleting Read-Only Files

This example shows how to delete read-only files using the force parameter. 
The second parameter of Delete when set to True overrides
read-only attributes. This ensures deletion regardless of file attributes.

force_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\Temp\protected_file.txt"

If fso.FileExists(filePath) Then
    Set file = fso.GetFile(filePath)
    file.Delete True ' Force deletion
    WScript.Echo "Read-only file deleted"
Else
    WScript.Echo "File not found"
End If

Set fso = Nothing

The script attempts to delete a potentially read-only file. The True
parameter forces deletion regardless of attributes. This is useful when cleaning
up system-generated files that might be marked read-only. Use with caution.

## Deleting an Empty Folder

This example demonstrates deleting an empty directory. The Delete
method fails if the folder contains files. Only completely empty folders can be
deleted with this approach. The script includes existence checking.

delete_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\Temp\EmptyFolder"

If fso.FolderExists(folderPath) Then
    Set folder = fso.GetFolder(folderPath)
    folder.Delete
    WScript.Echo "Folder deleted successfully"
Else
    WScript.Echo "Folder does not exist"
End If

Set fso = Nothing

The script checks for folder existence before attempting deletion. If found and
empty, it's permanently removed. For non-empty folders, an error occurs. This
approach is useful for cleaning up temporary directories in scripts.

## Recursive Folder Deletion

This example shows how to delete a folder and all its contents recursively. The
DeleteFolder method of FileSystemObject handles this.
The second parameter forces deletion of read-only items within the folder.

recursive_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\Temp\OldProject"

If fso.FolderExists(folderPath) Then
    fso.DeleteFolder folderPath, True
    WScript.Echo "Folder and contents deleted"
Else
    WScript.Echo "Folder not found"
End If

Set fso = Nothing

The script uses DeleteFolder to remove the folder and all
contents. The True parameter forces deletion of read-only items.
This is powerful but dangerous - ensure correct path is specified. Useful for
complete cleanup operations.

## Deleting Multiple Files with Wildcards

While Delete doesn't support wildcards directly, we can combine
FileSystemObject methods to achieve this. This example shows how
to delete multiple files matching a pattern in a directory.

wildcard_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\Temp\Logs"
filePattern = "*.bak"

If fso.FolderExists(folderPath) Then
    Set folder = fso.GetFolder(folderPath)
    For Each file In folder.Files
        If LCase(fso.GetExtensionName(file.Name)) = "bak" Then
            file.Delete
            WScript.Echo "Deleted: " &amp; file.Name
        End If
    Next
Else
    WScript.Echo "Folder not found"
End If

Set fso = Nothing

The script enumerates all files in a folder and deletes those matching the
pattern. Here we check file extensions, but other criteria could be used. This
approach provides more control than direct wildcard support would. Useful for
log file rotation and cleanup.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Delete method in VBScript,
covering its usage and practical applications. From single file deletion to
recursive folder removal, these examples demonstrate file system cleanup
techniques. With this knowledge, you can implement robust file management in
your scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).