+++
title = "VBScript GetParentFolderName Method"
date = 2025-08-29T20:15:06.543+01:00
draft = false
description = "Learn about VBScript GetParentFolderName method, including path navigation, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetParentFolderName Method

last modified April 9, 2025

The GetParentFolderName method in VBScript is part of the
FileSystemObject. It returns the parent folder of a specified path.
This method is useful for navigating directory structures and file paths. It
helps in determining the containing folder of files or subdirectories.

GetParentFolderName works with both file and folder paths. It
returns an empty string if the path has no parent folder. This tutorial covers
GetParentFolderName with practical examples to demonstrate its
usage.

## GetParentFolderName Method Overview

The GetParentFolderName method takes a single path parameter. It
returns a string containing the parent folder's path. The method is available
through the FileSystemObject in VBScript scripting.

Key features include automatic path parsing and normalization. It doesn't verify
path existence or validity. GetParentFolderName works with both
absolute and relative paths. Understanding this method helps create robust file
navigation scripts.

## Basic Parent Folder Retrieval

This example demonstrates the simplest use of GetParentFolderName.
It shows how to get the parent folder of a file path. The method returns the
directory containing the specified file.

basic_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
parentFolder = fso.GetParentFolderName("C:\Documents\Report.docx")
WScript.Echo parentFolder ' Output: C:\Documents

Set fso = Nothing

The script creates a FileSystemObject and calls
GetParentFolderName. The file path "C:\Documents\Report.docx" is
processed. The result is "C:\Documents", the containing folder of the file.

## Getting Parent of a Directory

This example shows how GetParentFolderName works with directory
paths. It demonstrates retrieving the parent of a folder rather than a file. The
method behaves consistently with both file and folder paths.

directory_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
parentFolder = fso.GetParentFolderName("C:\Projects\Website\Images")
WScript.Echo parentFolder ' Output: C:\Projects\Website

Set fso = Nothing

The script processes the folder path "C:\Projects\Website\Images". The method
returns "C:\Projects\Website", the immediate parent folder. This demonstrates
hierarchical directory navigation.

## Handling Root Directory

This example demonstrates GetParentFolderName's behavior with root
directories. When processing a drive root, the method returns an empty string.
This indicates there is no parent folder at the root level.

root_directory.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
parentFolder = fso.GetParentFolderName("C:\")
WScript.Echo "Parent: '" &amp; parentFolder &amp; "'" ' Output: Parent: ''

Set fso = Nothing

The script attempts to get the parent of "C:\". The empty result shows root
directories have no parent. This behavior is important for boundary conditions
in path navigation scripts.

## Working with Relative Paths

GetParentFolderName also works with relative paths. This example
shows how the method processes paths without drive letters. It demonstrates
consistent behavior regardless of path format.

relative_path.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
parentFolder = fso.GetParentFolderName("..\Data\Files\config.ini")
WScript.Echo parentFolder ' Output: ..\Data\Files

Set fso = Nothing

The relative path "..\Data\Files\config.ini" is processed. The method returns
"..\Data\Files" as the parent folder. This shows GetParentFolderName
works with relative path navigation.

## Combining with Other Path Methods

This example shows GetParentFolderName used with other
FileSystemObject methods. It demonstrates building a complete path
navigation solution. The script gets a file's parent folder and checks its
existence.

combined_methods.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\Users\Public\Documents\Budget.xlsx"
parentFolder = fso.GetParentFolderName(filePath)

If fso.FolderExists(parentFolder) Then
    WScript.Echo "Parent folder exists: " &amp; parentFolder
Else
    WScript.Echo "Parent folder not found"
End If

Set fso = Nothing

The script first gets the parent folder of "Budget.xlsx". It then checks if the
folder exists using FolderExists. This demonstrates practical
integration of GetParentFolderName with other file operations.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the GetParentFolderName method in
VBScript, covering its usage and practical applications. From simple path
navigation to complex directory operations, these examples demonstrate reliable
parent folder retrieval. With this knowledge, you can enhance your file handling
scripts with robust path navigation.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).