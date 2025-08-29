+++
title = "VBScript SubFolders Property"
date = 2025-08-29T20:15:15.396+01:00
draft = false
description = "Learn about VBScript SubFolders property, including folder traversal, directory operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SubFolders Property

last modified April 9, 2025

The SubFolders property in VBScript is part of the
FileSystemObject. It returns a collection of all subfolders within
a specified folder. This property is essential for directory traversal and
folder management operations. It enables recursive folder processing and
hierarchical directory analysis.

SubFolders provides access to Folder objects representing each
subdirectory. It's commonly used with the Folder object in file
system operations. This tutorial covers SubFolders with practical
examples to demonstrate its usage.

## SubFolders Property Overview

The SubFolders property belongs to the Folder object
in VBScript. It returns a Folders collection containing all
subfolders of the parent folder. Each item in the collection is a
Folder object with its own properties and methods.

Key features include recursive folder access and hierarchical directory
navigation. The property doesn't include files, only subdirectories.
Understanding this property helps create robust directory handling scripts.

## Listing All SubFolders

This example demonstrates how to list all subfolders of a specified directory.
It shows basic usage of the SubFolders property. The script
iterates through the collection and displays each subfolder name.

list_subfolders.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set parentFolder = fso.GetFolder("C:\Projects")

WScript.Echo "Subfolders of " &amp; parentFolder.Name &amp; ":"

For Each subFolder In parentFolder.SubFolders
    WScript.Echo subFolder.Name
Next

Set parentFolder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to the
"C:\Projects" folder. It then loops through the SubFolders
collection. Each subfolder's name is displayed using WScript.Echo.

## Counting SubFolders

This example shows how to count the number of subfolders in a directory. It
demonstrates accessing the Count property of the
SubFolders collection. The result provides quick folder statistics.

count_subfolders.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set parentFolder = fso.GetFolder("C:\Windows")

subFolderCount = parentFolder.SubFolders.Count
WScript.Echo "Number of subfolders: " &amp; subFolderCount

Set parentFolder = Nothing
Set fso = Nothing

The script gets the Windows directory and accesses its
SubFolders.Count property. This returns the total number of
subfolders. The count is displayed to the user, providing immediate feedback
about the directory structure.

## Recursive Folder Traversal

This example demonstrates recursive folder traversal using the
SubFolders property. It shows how to process an entire directory
tree. The script lists all subfolders at all levels beneath the starting point.

recursive_traversal.vbs
  

Sub ListAllFolders(folder)
    WScript.Echo folder.Path
    
    For Each subFolder In folder.SubFolders
        ListAllFolders subFolder
    Next
End Sub

Set fso = CreateObject("Scripting.FileSystemObject")
Set startFolder = fso.GetFolder("C:\Test")

ListAllFolders startFolder

Set startFolder = Nothing
Set fso = Nothing

The script defines a recursive subroutine ListAllFolders that
processes each folder and its subfolders. It starts from "C:\Test" and
recursively lists all subfolders. Each folder's full path is displayed during
the traversal.

## Filtering SubFolders by Name

This example shows how to filter subfolders based on name patterns. It
demonstrates conditional processing of the SubFolders collection.
The script only processes folders matching specific criteria.

filter_subfolders.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set parentFolder = fso.GetFolder("C:\Program Files")

WScript.Echo "Folders starting with 'Microsoft':"

For Each subFolder In parentFolder.SubFolders
    If Left(subFolder.Name, 9) = "Microsoft" Then
        WScript.Echo subFolder.Name
    End If
Next

Set parentFolder = Nothing
Set fso = Nothing

The script examines the "C:\Program Files" directory and its subfolders. It only
displays folders whose names begin with "Microsoft". This demonstrates how to
selectively process specific folders from the collection.

## Checking SubFolder Existence

This example demonstrates checking for the existence of a specific subfolder. It
shows practical use of the SubFolders property for validation. The
script searches for a particular folder within a parent directory.

check_subfolder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set parentFolder = fso.GetFolder("C:\")

targetFolder = "Windows"
folderExists = False

For Each subFolder In parentFolder.SubFolders
    If subFolder.Name = targetFolder Then
        folderExists = True
        Exit For
    End If
Next

If folderExists Then
    WScript.Echo targetFolder &amp; " folder exists."
Else
    WScript.Echo targetFolder &amp; " folder not found."
End If

Set parentFolder = Nothing
Set fso = Nothing

The script checks if the "Windows" folder exists in the C: drive root. It
iterates through the SubFolders collection looking for a match.
The result indicates whether the target folder was found in the parent
directory.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the SubFolders property in
VBScript, covering its usage and practical applications. From simple listing to
complex recursive traversal, these examples demonstrate powerful directory
management. With this knowledge, you can enhance your file system scripts with
robust folder handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).