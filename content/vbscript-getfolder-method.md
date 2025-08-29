+++
title = "VBScript GetFolder Method"
date = 2025-08-29T20:15:05.436+01:00
draft = false
description = "Learn about VBScript GetFolder method, including folder operations, directory management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetFolder Method

last modified April 9, 2025

The GetFolder method in VBScript is part of the
FileSystemObject. It returns a Folder object corresponding to the
specified path. This method allows access to folder properties and contents.
It's essential for directory management and file system operations in VBScript.

GetFolder requires the folder path to exist; otherwise it throws an
error. It provides access to folder attributes, files, and subfolders. This
tutorial covers GetFolder with practical examples to demonstrate
its usage in various scenarios.

## GetFolder Method Overview

The GetFolder method takes one parameter: the path to an existing
folder. It returns a Folder object with properties and methods for folder
manipulation. The method is available through the FileSystemObject
in VBScript.

Key features include access to folder attributes, size, and contents. The Folder
object provides methods for copying, moving, and deleting folders.
GetFolder is fundamental for any folder-related operations in
VBScript automation scripts.

## Basic Folder Information

This example demonstrates basic usage of GetFolder to retrieve
folder properties. It shows how to access common folder attributes like name,
path, and creation date. The script displays information about a specified
folder.

basic_getfolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")

WScript.Echo "Folder Name: " &amp; folder.Name
WScript.Echo "Path: " &amp; folder.Path
WScript.Echo "Date Created: " &amp; folder.DateCreated
WScript.Echo "Size: " &amp; folder.Size &amp; " bytes"

Set folder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and calls
GetFolder for "C:\Temp". It then displays basic folder properties.
Note that Size includes all files and subfolders recursively.

## Listing Folder Contents

This example shows how to list all files in a folder using
GetFolder. It demonstrates accessing the Files collection of the
Folder object. Each file's name and size are displayed.

list_files.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")

WScript.Echo "Files in " &amp; folder.Path &amp; ":"
For Each file In folder.Files
    WScript.Echo file.Name &amp; " - " &amp; file.Size &amp; " bytes"
Next

Set folder = Nothing
Set fso = Nothing

The script retrieves all files in "C:\Temp" and iterates through the Files
collection. For each file, it displays the name and size. This pattern is
useful for file processing scripts and directory listings.

## Working with Subfolders

GetFolder can access subfolders through the SubFolders collection.
This example demonstrates enumerating all subfolders of a given folder. Each
subfolder's name and creation date are displayed.

list_subfolders.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Program Files")

WScript.Echo "Subfolders in " &amp; folder.Path &amp; ":"
For Each subfolder In folder.SubFolders
    WScript.Echo subfolder.Name &amp; " - Created: " &amp; subfolder.DateCreated
Next

Set folder = Nothing
Set fso = Nothing

The script lists all subfolders in "C:\Program Files". The SubFolders
collection provides access to all immediate child folders. This is useful for
recursive directory processing or folder structure analysis.

## Checking Folder Existence

This example shows how to safely check if a folder exists before calling
GetFolder. It demonstrates error handling to avoid runtime errors
when folders don't exist. The FolderExists method is used for verification.

check_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\NonexistentFolder"

If fso.FolderExists(folderPath) Then
    Set folder = fso.GetFolder(folderPath)
    WScript.Echo "Folder found: " &amp; folder.Path
Else
    WScript.Echo "Folder does not exist: " &amp; folderPath
End If

Set fso = Nothing

The script first checks if the folder exists using FolderExists.
This prevents errors when calling GetFolder on nonexistent paths.
This pattern is essential for robust folder handling in scripts.

## Copying a Folder

This example demonstrates using GetFolder to perform folder
operations. It shows how to copy a folder and its contents to a new location.
The Copy method of the Folder object is used for the operation.

copy_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
sourcePath = "C:\Temp\Source"
destPath = "C:\Temp\Destination"

If fso.FolderExists(sourcePath) Then
    Set sourceFolder = fso.GetFolder(sourcePath)
    sourceFolder.Copy destPath
    WScript.Echo "Folder copied successfully"
Else
    WScript.Echo "Source folder not found"
End If

Set fso = Nothing

The script copies "C:\Temp\Source" to "C:\Temp\Destination". The Copy method
handles all contents recursively. Note that the destination folder must not
exist for the operation to succeed.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetFolder method in VBScript,
covering its usage and practical applications. From basic folder information to
complex operations like copying, these examples demonstrate essential folder
management techniques. With this knowledge, you can enhance your scripts with
powerful directory handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).