+++
title = "VBScript IsRootFolder Property"
date = 2025-08-29T20:15:07.636+01:00
draft = false
description = "Learn about VBScript IsRootFolder property, including folder checks, directory operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript IsRootFolder Property

last modified April 9, 2025

The IsRootFolder property in VBScript is part of the
FileSystemObject Folder object. It returns a Boolean value indicating
whether a folder is the root of a drive. This property is useful for directory
traversal and file system operations. It helps identify the top-level folder in
a drive hierarchy.

IsRootFolder provides a simple way to check folder hierarchy status.
It's commonly used in recursive folder processing scripts. This tutorial covers
IsRootFolder with practical examples to demonstrate its usage.

## IsRootFolder Property Overview

The IsRootFolder property is read-only and returns True if the
folder is a drive's root directory. It requires a valid Folder object reference
from FileSystemObject. The property helps prevent infinite loops in
recursive folder operations.

Key features include simple Boolean return value and no parameters needed. It
works with all drive types (local, network, removable). Understanding this
property helps create robust file system navigation scripts.

## Basic IsRootFolder Check

This example demonstrates the simplest use of IsRootFolder to check
a folder's status. It shows how to access the property for a given folder path.
The script checks if "C:\" is a root folder.

basic_isroot.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\")

If folder.IsRootFolder Then
    WScript.Echo "This is a root folder"
Else
    WScript.Echo "This is not a root folder"
End If

Set folder = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets the "C:\" folder.
It then checks the IsRootFolder property. The output confirms "C:\"
is a root folder. This is the most straightforward usage of the property.

## Checking Non-Root Folder

This example shows IsRootFolder returning False for a non-root
directory. It demonstrates the property's behavior with regular folders. The
script checks a subfolder of the C: drive.

nonroot_check.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Windows")

If folder.IsRootFolder Then
    WScript.Echo "This is a root folder"
Else
    WScript.Echo "This is not a root folder"
End If

Set folder = Nothing
Set fso = Nothing

The script checks the Windows directory, which is not a root folder. The
IsRootFolder property correctly returns False. This confirms the
property's ability to distinguish root from non-root folders.

## Recursive Folder Traversal with IsRootFolder

This example demonstrates using IsRootFolder in recursive folder
processing. It shows how to prevent infinite recursion when reaching the root.
The script lists folders while avoiding upward traversal at the root.

recursive_traversal.vbs
  

Sub ListFolders(folder)
    WScript.Echo folder.Path
    
    For Each subfolder In folder.SubFolders
        ListFolders subfolder
    Next
    
    If Not folder.IsRootFolder Then
        Set parent = folder.ParentFolder
        WScript.Echo "Parent: " &amp; parent.Path
    End If
End Sub

Set fso = CreateObject("Scripting.FileSystemObject")
Set startFolder = fso.GetFolder("C:\Temp")
ListFolders startFolder

Set startFolder = Nothing
Set fso = Nothing

The script recursively lists folders starting from "C:\Temp". It uses
IsRootFolder to check before accessing the parent folder. This
prevents errors when reaching the drive root during traversal.

## Network Drive Root Check

This example shows IsRootFolder working with network shares. It
demonstrates the property's behavior with UNC paths. The script checks if a
network folder is a root share.

network_root.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("\\server\share")

If folder.IsRootFolder Then
    WScript.Echo "This is a root network share"
Else
    WScript.Echo "This is not a root network share"
End If

Set folder = Nothing
Set fso = Nothing

The script checks a network share path. IsRootFolder correctly
identifies it as a root folder. This shows the property works consistently
across different drive types.

## Checking All Drive Roots

This example demonstrates checking the root status of all drives on a system. It
uses IsRootFolder with the Drives collection. The
script lists all drive roots and their types.

all_drives.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For Each drive In fso.Drives
    If drive.IsReady Then
        Set rootFolder = fso.GetFolder(drive.DriveLetter &amp; ":\")
        
        WScript.Echo "Drive: " &amp; drive.DriveLetter
        WScript.Echo "IsRoot: " &amp; rootFolder.IsRootFolder
        WScript.Echo "DriveType: " &amp; drive.DriveType
        WScript.Echo ""
    End If
Next

Set fso = Nothing

The script iterates through all available drives. For each, it gets the root
folder and checks IsRootFolder. The output confirms all drive roots
are correctly identified. This demonstrates comprehensive root checking.

## Source

[Folder Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/s2wfw85t(v=vs.84))

In this article, we have explored the IsRootFolder property in
VBScript, covering its usage and practical applications. From simple checks to
complex recursive operations, these examples demonstrate reliable root folder
identification. With this knowledge, you can enhance your file system scripts
with robust folder hierarchy handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).