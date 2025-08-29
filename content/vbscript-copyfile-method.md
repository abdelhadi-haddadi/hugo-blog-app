+++
title = "VBScript CopyFile Method"
date = 2025-08-29T20:14:55.228+01:00
draft = false
description = "Learn about VBScript CopyFile method, including file copying, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CopyFile Method

last modified April 9, 2025

The CopyFile method in VBScript is part of the
FileSystemObject. It copies one or more files from one location to
another. This method provides flexible file copying capabilities in scripts. It
can overwrite existing files if specified. The method handles both single files
and wildcard patterns.

CopyFile is essential for file management tasks in VBScript. It
simplifies backup operations and file distribution. This tutorial covers
CopyFile with practical examples to demonstrate its usage. You'll
learn various copying scenarios and error handling techniques.

## CopyFile Method Overview

The CopyFile method takes three parameters: source, destination,
and overwrite flag. Source can be a single file or wildcard pattern.
Destination must be a folder path or target filename. The overwrite flag
determines if existing files should be replaced.

Key features include wildcard support and optional overwrite control. The method
raises errors for invalid paths or permission issues. CopyFile
preserves file attributes during copying. Understanding this method helps create
robust file management scripts.

## Basic File Copy

This example demonstrates the simplest use of CopyFile to copy a
single file. It shows how to specify source and destination paths. The file is
copied to the new location with the same name.

basic_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Temp\report.txt"
destination = "C:\Backup\report.txt"

fso.CopyFile source, destination

Set fso = Nothing
WScript.Echo "File copied successfully"

The script creates a FileSystemObject and calls CopyFile.
The source file "report.txt" is copied to the backup folder. The destination
includes the filename. The script confirms completion with a message.

## Copying with Wildcards

This example shows how to copy multiple files using wildcards. The asterisk (*)
wildcard matches all files with a specific extension. All matching files in the
source folder are copied to the destination.

wildcard_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Logs\*.log"
destination = "D:\Archive\"

fso.CopyFile source, destination

Set fso = Nothing
WScript.Echo "All log files copied to archive"

The script copies all .log files from C:\Logs to D:\Archive. The destination is
specified as a folder path. Each file keeps its original name. Wildcards enable
batch operations on multiple files.

## Overwriting Existing Files

This example demonstrates the overwrite parameter of CopyFile. When
set to True, existing files are replaced. When False, the operation fails if the
destination exists. The default is True if omitted.

overwrite_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Data\config.ini"
destination = "C:\Backup\config.ini"

' False prevents overwriting existing files
fso.CopyFile source, destination, False

Set fso = Nothing
WScript.Echo "File copied (not overwritten if exists)"

The script attempts to copy config.ini without overwriting. If the destination
exists, an error occurs. This protects against accidental data loss. Error
handling should be added for production scripts.

## Copying to a Different Filename

This example shows how to copy a file while changing its name. The destination
includes a new filename. The original file content is preserved in the new
location with the new name.

rename_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\Reports\Q1.pdf"
destination = "C:\Archives\Quarterly_Report_2025_Q1.pdf"

fso.CopyFile source, destination

Set fso = Nothing
WScript.Echo "File copied with new name"

The script copies Q1.pdf to a new location with a descriptive name. Both source
and destination include filenames. This technique is useful for versioning or
organizing files. The original file remains unchanged.

## Error Handling in CopyFile

This example demonstrates error handling during file copying. VBScript's
On Error Resume Next prevents script termination on errors. The
script checks for common issues like missing files or access denied.

error_handling.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
source = "C:\NonExistent\file.txt"
destination = "C:\Backup\file.txt"

fso.CopyFile source, destination

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error " &amp; Err.Number &amp; ": " &amp; Err.Description
    Err.Clear
Else
    WScript.Echo "File copied successfully"
End If

Set fso = Nothing

The script attempts to copy a non-existent file. The error handler catches and
displays the problem. This approach makes scripts more robust in real-world
scenarios. Always include error handling for file operations.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the CopyFile method in VBScript,
covering its usage and practical applications. From basic file copying to
advanced scenarios with error handling, these examples demonstrate reliable file
operations. With this knowledge, you can enhance your file management scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).