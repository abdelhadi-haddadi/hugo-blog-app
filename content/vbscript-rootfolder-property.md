+++
title = "VBScript RootFolder Property"
date = 2025-08-29T20:15:12.045+01:00
draft = false
description = "Learn about VBScript RootFolder property, including drive access, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript RootFolder Property

last modified April 9, 2025

The RootFolder property in VBScript is part of the
Drive object within the FileSystemObject. It returns
the root folder of a specified drive as a Folder object. This
property provides access to the top-level directory of any available drive.

RootFolder is read-only and available for all drive types. It's
commonly used in file system navigation and drive management scripts. This
tutorial covers RootFolder with practical examples to demonstrate
its usage.

## RootFolder Property Overview

The RootFolder property returns a Folder object
representing the root directory. It's accessed through a Drive
object obtained from FileSystemObject. The property works with
local, network, and removable drives.

Key features include access to drive contents and properties. It serves as the
entry point for file system navigation. RootFolder is essential for
scripts that need to examine or manipulate drive contents. Understanding this
property helps create robust file handling scripts.

## Accessing Drive Root Folder

This example demonstrates basic usage of the RootFolder property.
It shows how to access the root folder of the C: drive. The script displays the
path of the root folder.

basic_rootfolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
Set rootFolder = drive.RootFolder

WScript.Echo "Root folder path: " &amp; rootFolder.Path

Set rootFolder = Nothing
Set drive = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the C: drive. It
then accesses the RootFolder property. The path of the root folder
is displayed. This demonstrates basic root folder access.

## Listing Root Folder Contents

This example shows how to list files and folders in a drive's root directory.
It uses the RootFolder property to access contents. The script
displays names of all items in the root folder.

list_root_contents.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
Set rootFolder = drive.RootFolder
Set folderContents = rootFolder.Files

WScript.Echo "Files in root folder:"
For Each file In folderContents
    WScript.Echo file.Name
Next

Set folderContents = Nothing
Set rootFolder = Nothing
Set drive = Nothing
Set fso = Nothing

The script accesses the C: drive's root folder. It retrieves a collection of
files using the Files property. Each file name is displayed in a
loop. This demonstrates root folder content enumeration.

## Checking Root Folder Attributes

This example demonstrates examining attributes of the root folder. It shows how
to check if the root folder is read-only or hidden. The script displays various
properties of the root folder.

root_attributes.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
Set rootFolder = drive.RootFolder

WScript.Echo "Folder attributes:"
WScript.Echo "Date created: " &amp; rootFolder.DateCreated
WScript.Echo "Date last accessed: " &amp; rootFolder.DateLastAccessed
WScript.Echo "Date last modified: " &amp; rootFolder.DateLastModified
WScript.Echo "Size: " &amp; rootFolder.Size &amp; " bytes"

Set rootFolder = Nothing
Set drive = Nothing
Set fso = Nothing

The script accesses the C: drive's root folder properties. It displays creation,
access, and modification dates. The folder size is also shown. This demonstrates
root folder property inspection.

## Creating Subfolder in Root Directory

This example shows how to create a new subfolder in the root directory. It uses
the RootFolder property to access the root. The script creates a
folder named "TempData" if it doesn't exist.

create_root_subfolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drive = fso.GetDrive("C:")
Set rootFolder = drive.RootFolder
folderName = "TempData"

If Not fso.FolderExists(rootFolder.Path &amp; "\" &amp; folderName) Then
    Set newFolder = rootFolder.SubFolders.Add(folderName)
    WScript.Echo "Created folder: " &amp; newFolder.Path
Else
    WScript.Echo "Folder already exists"
End If

Set rootFolder = Nothing
Set drive = Nothing
Set fso = Nothing

The script checks if "TempData" exists in the root folder. If not, it creates
the folder using SubFolders.Add. The new folder's path is displayed.
This demonstrates root folder modification.

## Network Drive Root Access

This example demonstrates accessing the root folder of a network drive. It shows
how to work with mapped network drives. The script displays the root folder path
of drive Z:.

network_root.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

On Error Resume Next
Set drive = fso.GetDrive("Z:")
If Err.Number = 0 Then
    Set rootFolder = drive.RootFolder
    WScript.Echo "Network drive root: " &amp; rootFolder.Path
Else
    WScript.Echo "Drive Z: not available"
End If
On Error GoTo 0

Set drive = Nothing
Set fso = Nothing

The script attempts to access drive Z: with error handling. If available, it
displays the root folder path. Error handling prevents script failure for
unavailable drives. This demonstrates network drive root access.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the RootFolder property in
VBScript, covering its usage and practical applications. From basic access to
content enumeration and modification, these examples demonstrate root folder
operations. With this knowledge, you can enhance your file handling scripts with
robust drive management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).