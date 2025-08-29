+++
title = "VBScript ParentFolder Property"
date = 2025-08-29T20:15:10.976+01:00
draft = false
description = "Learn about VBScript ParentFolder property, including file system navigation, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ParentFolder Property

last modified April 9, 2025

The ParentFolder property in VBScript is part of the
FileSystemObject object model. It returns the folder object for the
parent of a specified file or folder. This property is read-only and provides
access to the containing directory. It's essential for navigating file system
hierarchies.

ParentFolder works with both File and Folder
objects. It enables moving up directory trees programmatically. This tutorial
covers ParentFolder with practical examples to demonstrate its usage
in various scenarios.

## ParentFolder Property Overview

The ParentFolder property returns a Folder object
representing the parent directory. It's available on both File and
Folder objects from the FileSystemObject. The property
doesn't modify the file system.

Key features include read-only access to parent directory information. It throws
an error when used on root directories. ParentFolder enables
navigation without hardcoding paths. Understanding this property helps create
flexible file system scripts.

## Getting Parent Folder of a File

This example demonstrates how to get the parent folder of a specific file. It
shows basic usage of the ParentFolder property with a file object.
The script retrieves and displays the parent folder's path.

file_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents\report.docx")
Set parentFolder = file.ParentFolder

WScript.Echo "Parent folder: " &amp; parentFolder.Path ' Output: C:\Documents

Set file = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a file object. The
ParentFolder property returns the containing folder. The folder's
path is then displayed. This is useful when you need to work with a file's
directory.

## Getting Parent Folder of a Folder

This example shows how to get the parent folder of another folder. It
demonstrates ParentFolder usage with folder objects. The script
navigates up one level in the directory structure.

folder_parent.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects\Website\Images")
Set parentFolder = folder.ParentFolder

WScript.Echo "Parent folder: " &amp; parentFolder.Path ' Output: C:\Projects\Website

Set folder = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script gets a folder object for "C:\Projects\Website\Images". The
ParentFolder property returns its parent directory. The parent
folder's path is displayed. This technique is useful for relative navigation.

## Handling Root Directory Case

This example demonstrates what happens when trying to get the parent folder of a
root directory. The ParentFolder property throws an error in this
case. The script includes error handling to manage this scenario.

root_directory.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\")
Set parentFolder = folder.ParentFolder

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Cannot get parent of root directory"
Else
    WScript.Echo "Parent folder: " &amp; parentFolder.Path
End If

On Error GoTo 0

Set folder = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script attempts to get the parent folder of "C:\". Since this is a root
directory, it has no parent. The error is caught and handled gracefully. This
shows proper error handling when working with file system boundaries.

## Navigating Multiple Levels Up

This example shows how to navigate multiple directory levels up using the
ParentFolder property. It demonstrates chaining parent folder
access to move up several levels in the directory tree.

multi_level.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Projects\Website\Images\Products")
Set parent1 = folder.ParentFolder
Set parent2 = parent1.ParentFolder
Set parent3 = parent2.ParentFolder

WScript.Echo "Level 1 parent: " &amp; parent1.Path ' C:\Projects\Website\Images
WScript.Echo "Level 2 parent: " &amp; parent2.Path ' C:\Projects\Website
WScript.Echo "Level 3 parent: " &amp; parent3.Path ' C:\Projects

Set folder = Nothing
Set parent1 = Nothing
Set parent2 = Nothing
Set parent3 = Nothing
Set fso = Nothing

The script starts with a deep folder path. It then accesses three levels of
parent folders. Each step moves up one directory level. This technique is useful
for finding ancestor directories without knowing the exact path structure.

## Checking Parent Folder Properties

This example demonstrates accessing properties of a parent folder. After getting
the parent folder object, we can examine its attributes. The script shows common
folder properties available through the parent folder reference.

folder_properties.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Documents\report.docx")
Set parentFolder = file.ParentFolder

WScript.Echo "Parent folder name: " &amp; parentFolder.Name
WScript.Echo "Date created: " &amp; parentFolder.DateCreated
WScript.Echo "Number of files: " &amp; parentFolder.Files.Count

Set file = Nothing
Set parentFolder = Nothing
Set fso = Nothing

The script gets a file's parent folder and examines its properties. It displays
the folder name, creation date, and file count. This shows how ParentFolder
enables inspection of directory characteristics. Such information is valuable for
file management scripts.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the ParentFolder property in VBScript,
covering its usage and practical applications. From basic parent directory access
to multi-level navigation, these examples demonstrate essential file system
operations. With this knowledge, you can enhance your scripts with robust
directory navigation capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).