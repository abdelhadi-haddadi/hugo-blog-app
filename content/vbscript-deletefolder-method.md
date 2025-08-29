+++
title = "VBScript DeleteFolder Method"
date = 2025-08-29T20:14:58.562+01:00
draft = false
description = "Learn about VBScript DeleteFolder method, including folder deletion, error handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DeleteFolder Method

last modified April 9, 2025

The DeleteFolder method in VBScript is part of the
FileSystemObject. It permanently removes a specified folder and all
its contents from the filesystem. This method is powerful and should be used with
caution. It doesn't move files to the Recycle Bin but deletes them immediately.

DeleteFolder can handle empty folders and those containing files.
It supports recursive deletion of all subfolders and files. This tutorial covers
DeleteFolder with practical examples to demonstrate its usage and
potential pitfalls.

## DeleteFolder Method Overview

The DeleteFolder method takes one required parameter: the folder
path to delete. An optional second parameter controls force deletion of read-only
files. The method is available through the FileSystemObject in
VBScript scripting.

Key features include recursive folder deletion and read-only file handling. It
throws errors if the path doesn't exist or is inaccessible. Understanding this
method helps create robust folder management scripts. Always verify paths before
deletion to prevent data loss.

## Basic Folder Deletion

This example demonstrates the simplest use of DeleteFolder to remove
an empty folder. It shows basic error handling to catch common issues. The script
attempts to delete a folder at a specified path.

basic_delete.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
fso.DeleteFolder "C:\Temp\OldData"

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting folder: " &amp; Err.Description
Else
    WScript.Echo "Folder deleted successfully"
End If

Set fso = Nothing

The script creates a FileSystemObject and calls
DeleteFolder. Error handling catches issues like missing folders or
permission problems. The folder "C:\Temp\OldData" is permanently deleted if it
exists and is accessible.

## Force Deleting Read-Only Folders

This example shows how to force deletion of folders containing read-only files.
The second parameter of DeleteFolder controls this behavior. When
set to True, it overrides read-only attributes.

force_delete.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
fso.DeleteFolder "C:\Temp\ProtectedData", True

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting folder: " &amp; Err.Description
Else
    WScript.Echo "Folder and contents deleted (forced)"
End If

Set fso = Nothing

The script attempts to delete "C:\Temp\ProtectedData" with force enabled. This
deletes the folder even if it contains read-only files. Without force, such
folders would cause errors. Use this option carefully to avoid unintended data
loss.

## Deleting Nested Folder Structures

DeleteFolder automatically handles nested folder structures. This
example shows deletion of a folder containing subfolders and files. The method
recursively removes all contents before deleting the parent folder.

nested_delete.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
fso.DeleteFolder "C:\Projects\OldWebsite"

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting folder structure: " &amp; Err.Description
Else
    WScript.Echo "Folder structure deleted recursively"
End If

Set fso = Nothing

The script deletes "C:\Projects\OldWebsite" and all its contents. This includes
any subfolders and files within them. No additional code is needed for recursive
deletion as DeleteFolder handles this automatically.

## Checking Folder Existence Before Deletion

This example demonstrates good practice by checking if a folder exists before
attempting deletion. The FolderExists method prevents errors when
working with potentially missing folders. It makes scripts more robust.

safe_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\Temp\ToDelete"

If fso.FolderExists(folderPath) Then
    fso.DeleteFolder folderPath
    WScript.Echo "Folder deleted successfully"
Else
    WScript.Echo "Folder does not exist"
End If

Set fso = Nothing

The script first verifies "C:\Temp\ToDelete" exists using
FolderExists. Only if found does it proceed with deletion. This
approach prevents errors from attempting to delete non-existent folders. It's a
recommended pattern for folder operations.

## Handling Deletion Errors Gracefully

This advanced example shows comprehensive error handling for folder deletion. It
catches specific error numbers and provides user-friendly messages. The script
attempts to diagnose why deletion failed.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
fso.DeleteFolder "C:\System\ImportantFolder"

Select Case Err.Number
    Case 0
        WScript.Echo "Folder deleted successfully"
    Case 70  ' Permission denied
        WScript.Echo "Error: Permission denied. Folder may be in use."
    Case 76  ' Path not found
        WScript.Echo "Error: Folder path not found"
    Case Else
        WScript.Echo "Error " &amp; Err.Number &amp; ": " &amp; Err.Description
End Select

Set fso = Nothing

The script attempts to delete "C:\System\ImportantFolder" and handles various
error scenarios. Specific error numbers help identify the exact issue. This
approach provides better user feedback than generic error messages. It's
particularly useful in scripts run by non-technical users.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DeleteFolder method in VBScript,
covering its usage and practical applications. From basic deletion to advanced
error handling, these examples demonstrate robust folder management. With this
knowledge, you can enhance your scripts with reliable folder deletion
capabilities while avoiding common pitfalls.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).