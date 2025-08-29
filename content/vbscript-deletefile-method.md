+++
title = "VBScript DeleteFile Method"
date = 2025-08-29T20:14:58.536+01:00
draft = false
description = "Learn about VBScript DeleteFile method, including file deletion, error handling, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript DeleteFile Method

last modified April 9, 2025

The DeleteFile method in VBScript is part of the
FileSystemObject. It permanently removes a specified file from the
file system. This method is powerful and should be used with caution as deleted
files cannot be recovered through VBScript. It's commonly used in file cleanup
and maintenance scripts.

DeleteFile can optionally force deletion of read-only files. It
raises errors if the file doesn't exist or is in use. This tutorial covers
DeleteFile with practical examples to demonstrate its usage and
error handling.

## DeleteFile Method Overview

The DeleteFile method takes one required parameter (file path) and
one optional parameter (force flag). It permanently removes the specified file
from disk. The method is available through the FileSystemObject in
VBScript scripting.

Key features include optional read-only file deletion and immediate file removal.
It doesn't move files to the Recycle Bin. DeleteFile works with
absolute and relative paths. Understanding this method helps create robust file
management scripts.

## Basic File Deletion

This example demonstrates the simplest use of DeleteFile to remove
a single file. It shows how to specify the file path and handle basic errors.
The script attempts to delete "temp.txt" in the current directory.

basic_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
fso.DeleteFile "temp.txt"
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting file: " &amp; Err.Description
End If
On Error GoTo 0

Set fso = Nothing

The script creates a FileSystemObject and calls
DeleteFile. Error handling ensures graceful failure if the file
doesn't exist. The method permanently removes the file if successful. No
confirmation is requested before deletion.

## Deleting Read-Only Files

This example shows how to force deletion of read-only files using the optional
second parameter. The force parameter overrides the read-only attribute.
Without it, deletion would fail for read-only files.

force_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
fso.DeleteFile "readonly.txt", True
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting file: " &amp; Err.Description
End If
On Error GoTo 0

Set fso = Nothing

The True parameter forces deletion regardless of file attributes.
This is useful when cleaning up system-generated files. The script includes
error handling to catch potential issues like locked files or missing
permissions.

## Deleting Multiple Files with Wildcards

DeleteFile supports wildcard characters to delete multiple files
matching a pattern. This example shows how to delete all .tmp files in a
directory. Wildcards provide powerful batch file operations.

wildcard_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
fso.DeleteFile "C:\Temp\*.tmp"
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting files: " &amp; Err.Description
End If
On Error GoTo 0

Set fso = Nothing

The script deletes all files with .tmp extension in C:\Temp. Wildcard operations
are atomic - either all matching files delete or none do. Error handling is
crucial as one failure aborts the entire operation.

## Deleting Files with Absolute Paths

This example demonstrates deleting files using absolute paths. Absolute paths
specify the complete file location from the drive root. They're more reliable
than relative paths in scripts.

absolute_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
fso.DeleteFile "C:\Users\Public\Documents\old_data.csv"
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error deleting file: " &amp; Err.Description
End If
On Error GoTo 0

Set fso = Nothing

The script specifies the complete path to old_data.csv. Absolute paths ensure
the correct file is targeted regardless of current directory. Error handling
catches cases where the file might be missing or locked.

## Checking File Existence Before Deletion

This example shows best practice by checking if a file exists before attempting
deletion. The FileExists method prevents unnecessary errors.
Combined operations make scripts more robust.

safe_delete.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\Logs\app.log"

If fso.FileExists(filePath) Then
    On Error Resume Next
    fso.DeleteFile filePath
    If Err.Number = 0 Then
        WScript.Echo "File deleted successfully"
    Else
        WScript.Echo "Error deleting file: " &amp; Err.Description
    End If
    On Error GoTo 0
Else
    WScript.Echo "File does not exist"
End If

Set fso = Nothing

The script first verifies file existence with FileExists. This
prevents errors from attempting to delete non-existent files. The deletion is
still wrapped in error handling for other potential issues. This approach makes
scripts more reliable.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the DeleteFile method in VBScript,
covering its usage and practical applications. From single file deletion to
wildcard operations, these examples demonstrate reliable file removal. With this
knowledge, you can enhance your file management scripts with proper deletion
capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).