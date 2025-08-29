+++
title = "VBScript Copy Method"
date = 2025-08-29T20:14:55.234+01:00
draft = false
description = "Learn about VBScript Copy method, including file copying, folder copying, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Copy Method

last modified April 9, 2025

The Copy method in VBScript is part of the
FileSystemObject. It allows copying files or folders from one
location to another. This method is essential for file management operations in
VBScript. It provides a simple way to duplicate files while maintaining their
content and attributes.

Copy can overwrite existing files if specified. It works with both
absolute and relative paths. This tutorial covers Copy with
practical examples to demonstrate its various applications in file operations.

## Copy Method Overview

The Copy method is available for both File and
Folder objects. For files, it copies the file to a new location.
For folders, it copies the entire folder structure. The method takes destination
path as a required parameter.

An optional overwrite parameter determines behavior when the destination
exists. The method raises an error if the destination exists and overwrite is
False. Understanding this method is crucial for file management scripts.

## Basic File Copy

This example demonstrates the simplest use of Copy to duplicate a
file. It shows how to copy a file from one location to another. The destination
can be a full path or just a filename in the current directory.

basic_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set sourceFile = fso.GetFile("C:\Temp\source.txt")

sourceFile.Copy "C:\Backup\destination.txt"

WScript.Echo "File copied successfully"

Set sourceFile = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to the
source file. The Copy method is called with the destination path.
If successful, it displays a confirmation message. All objects are properly
cleaned up at the end.

## Copy with Overwrite Option

This example shows how to control overwrite behavior when copying files. The
second parameter determines whether existing files should be overwritten. When
True, it allows overwriting; when False, it prevents it.

copy_overwrite.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set sourceFile = fso.GetFile("C:\Reports\current.csv")

' True allows overwriting existing file
sourceFile.Copy "D:\Archives\backup.csv", True

WScript.Echo "File copied with overwrite enabled"

Set sourceFile = Nothing
Set fso = Nothing

The script copies a CSV file to an archive location. The True parameter ensures
any existing file with the same name will be replaced. This is useful for
regular backup operations where overwriting is desired.

## Copying Multiple Files

This example demonstrates copying multiple files using a loop. It shows how to
process all files in a folder and copy them to another location. The
Files collection is used to iterate through files.

copy_multiple.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\SourceFiles")

For Each file In folder.Files
    file.Copy "D:\Backup\" &amp; file.Name, True
Next

WScript.Echo "All files copied successfully"

Set folder = Nothing
Set fso = Nothing

The script gets all files from the source folder. Each file is copied to the
backup location while preserving the original filename. The overwrite parameter
is set to True for all copies. This pattern is common in backup scripts.

## Copying an Entire Folder

This example shows how to copy a complete folder with all its contents. The
CopyFolder method of FileSystemObject is used instead
of the Copy method. It recursively copies all subfolders and files.

copy_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

' Copy entire folder structure
fso.CopyFolder "C:\Projects\Website", "D:\Backup\Website", True

WScript.Echo "Folder copied with all contents"

Set fso = Nothing

The script copies the entire Website folder to a backup location. The True
parameter enables overwriting of existing files in the destination. This method
is powerful for creating complete backups of folder structures.

## Conditional File Copy

This example demonstrates conditional copying based on file attributes. It shows
how to copy only files that meet specific criteria. In this case, only text
files modified today are copied.

conditional_copy.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\DailyLogs")
today = Date()

For Each file In folder.Files
    If LCase(fso.GetExtensionName(file.Name)) = "txt" And _
       DateValue(file.DateLastModified) = today Then
        file.Copy "D:\Archive\" &amp; file.Name, True
    End If
Next

WScript.Echo "Conditional copy completed"

Set folder = Nothing
Set fso = Nothing

The script checks each file's extension and modification date. Only .txt files
modified today are copied to the archive. This demonstrates advanced file
filtering before copying. Such logic is useful for selective backup operations.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Copy method in VBScript,
covering its usage and practical applications. From simple file copies to complex
conditional operations, these examples demonstrate reliable file duplication.
With this knowledge, you can enhance your file management scripts with robust
copying capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).