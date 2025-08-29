+++
title = "VBScript Parent Property"
date = 2025-08-29T20:15:28.785+01:00
draft = false
description = "Learn about VBScript Parent property, including file system navigation, object hierarchy, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Parent Property

last modified April 9, 2025

The Parent property in VBScript is used to access the parent object
of a given file or folder in the file system hierarchy. It returns a Folder
object representing the container of the current item. This property is part of
the FileSystemObject model and is available for both File and
Folder objects.

Parent helps navigate upward through directory structures without
manual path manipulation. It's particularly useful when you need to reference
files or folders relative to their parent locations. This tutorial covers
Parent with practical examples to demonstrate its usage.

## Parent Property Overview

The Parent property provides access to the immediate parent folder
of a file or folder object. It's a read-only property that returns a Folder
object. For root directories, it returns Nothing. The property is available
through the FileSystemObject in VBScript scripting.

Key features include automatic path resolution and object-oriented navigation.
It doesn't modify the file system or require path string manipulation.
Understanding this property helps create more flexible file handling scripts.

## Getting Parent Folder of a File

This example demonstrates how to get the parent folder of a specific file. It
shows basic usage of the Parent property with a File object. The script creates
a File object and accesses its Parent property.

file_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents\report.docx")
Set parentFolder = file.Parent

WScript.Echo "Parent folder: " &amp; parentFolder.Name ' Output: Documents
WScript.Echo "Full path: " &amp; parentFolder.Path ' Output: C:\Documents

Set file = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script creates a File object for "report.docx" and accesses its Parent
property. The Parent property returns a Folder object representing
"C:\Documents". We then display both the folder name and full path.

## Getting Parent Folder of a Folder

This example shows how to get the parent folder of another folder. It
demonstrates the Parent property with a Folder object. The script navigates up
one level in the directory structure.

folder_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects\Website\Images")
Set parentFolder = folder.Parent

WScript.Echo "Current folder: " &amp; folder.Name ' Output: Images
WScript.Echo "Parent folder: " &amp; parentFolder.Name ' Output: Website
WScript.Echo "Parent path: " &amp; parentFolder.Path ' Output: C:\Projects\Website

Set folder = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script creates a Folder object for "Images" and accesses its Parent
property. The Parent property returns a Folder object representing
"C:\Projects\Website". We display both the current and parent folder names.

## Handling Root Directory Parent

This example demonstrates what happens when accessing Parent property of a root
directory. Root directories have no parent, so the property returns Nothing.
The script includes error handling for this special case.

root_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\")
Set parentFolder = folder.Parent

If parentFolder Is Nothing Then
    WScript.Echo "This is a root directory with no parent"
Else
    WScript.Echo "Parent folder: " &amp; parentFolder.Name
End If

Set folder = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script attempts to get the Parent of "C:\". Since it's a root directory,
the Parent property returns Nothing. The script checks for this condition and
displays an appropriate message. This demonstrates proper handling of edge
cases.

## Navigating Multiple Levels Up

This example shows how to navigate multiple levels up the directory hierarchy
by chaining Parent property accesses. Each Parent property call moves up one
level in the folder structure.

multi_level_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects\Website\Images\Products")

' Navigate up three levels
Set level1 = folder.Parent ' Website\Images
Set level2 = level1.Parent ' Website
Set level3 = level2.Parent ' Projects

WScript.Echo "Original: " &amp; folder.Path
WScript.Echo "Level 1: " &amp; level1.Path
WScript.Echo "Level 2: " &amp; level2.Path
WScript.Echo "Level 3: " &amp; level3.Path

Set folder = Nothing
Set level1 = Nothing
Set level2 = Nothing
Set level3 = Nothing
Set fso = Nothing

The script starts at "Products" folder and navigates up three levels. Each
Parent property access moves up one directory level. This demonstrates how to
traverse directory structures programmatically without path manipulation.

## Using Parent Property in File Operations

This practical example shows using the Parent property to perform file
operations relative to a file's location. The script creates a new file in the
same directory as an existing file by using the Parent property.

parent_file_operation.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Data\report.txt")
Set parentFolder = file.Parent

' Create a new file in the same directory
newFilePath = fso.BuildPath(parentFolder.Path, "backup.txt")
Set newFile = parentFolder.CreateTextFile("backup.txt")

WScript.Echo "Created new file at: " &amp; newFile.Path
newFile.WriteLine "This is a backup file"
newFile.Close

Set file = Nothing
Set parentFolder = Nothing
Set newFile = Nothing
Set fso = Nothing

The script gets the parent folder of "report.txt" and creates a new file
"backup.txt" in the same directory. This demonstrates practical use of the
Parent property to perform operations relative to existing files. The approach
works regardless of the original file's location.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Parent property in VBScript,
covering its usage and practical applications. From simple parent folder access
to multi-level navigation, these examples demonstrate hierarchical file system
navigation. With this knowledge, you can enhance your file handling scripts
with robust directory traversal.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).