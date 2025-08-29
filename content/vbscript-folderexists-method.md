+++
title = "VBScript FolderExists Method"
date = 2025-08-29T20:15:01.935+01:00
draft = false
description = "Learn about VBScript FolderExists method, including directory checks, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FolderExists Method

last modified April 9, 2025

The FolderExists method in VBScript is part of the
FileSystemObject. It checks whether a specified folder exists on
the system. This method returns a Boolean value (True/False) indicating the
folder's existence. It's essential for robust file system operations.

FolderExists helps prevent errors by verifying folders before
operations. It works with both absolute and relative paths. This tutorial covers
FolderExists with practical examples to demonstrate its usage.

## FolderExists Method Overview

The FolderExists method takes one parameter: the folder path to
check. It returns True if the folder exists, False otherwise. The method is
available through the FileSystemObject in VBScript scripting.

Key features include case-insensitive path checking and network path support. It
doesn't verify folder accessibility or permissions. FolderExists
works with local and network paths. Understanding this method helps create
reliable file handling scripts.

## Basic Folder Existence Check

This example demonstrates the simplest use of FolderExists to check
a folder's existence. It shows how to create a FileSystemObject and call the
method. The result is displayed to confirm whether the folder exists.

basic_folderexists.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
If fso.FolderExists("C:\Windows") Then
    WScript.Echo "The folder exists"
Else
    WScript.Echo "The folder does not exist"
End If

Set fso = Nothing

The script creates a FileSystemObject and checks for "C:\Windows".
The result is displayed based on the check. This basic pattern is the foundation
for more complex folder operations. Always release the object when done.

## Checking Network Folders

FolderExists can verify network shared folders. This example shows
how to check a folder on a network share. The method works similarly to local
paths but requires proper network access permissions.

network_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
networkPath = "\\ServerName\SharedFolder"

If fso.FolderExists(networkPath) Then
    WScript.Echo "Network folder is accessible"
Else
    WScript.Echo "Cannot access network folder"
End If

Set fso = Nothing

The script checks for a network shared folder. Replace "ServerName" and
"SharedFolder" with actual values. Network checks may fail due to permissions
or connectivity issues. Always handle such cases in production scripts.

## Validating User Input Path

This example shows using FolderExists to validate user-provided
folder paths. It demonstrates handling dynamic paths in scripts. The method
helps ensure scripts work with valid paths only.

user_input.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
userPath = InputBox("Enter folder path to check:")

If fso.FolderExists(userPath) Then
    WScript.Echo "Valid folder path provided"
Else
    WScript.Echo "Invalid or non-existent folder path"
End If

Set fso = Nothing

The script prompts the user for a folder path. FolderExists checks
the input before further processing. This pattern is useful for scripts requiring
user-specified folders. Always validate external input in scripts.

## Conditional Folder Creation

This example combines FolderExists with folder creation. It checks
if a folder exists before attempting to create it. This prevents errors when the
folder already exists.

conditional_create.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
newFolder = "C:\Temp\NewFolder"

If Not fso.FolderExists(newFolder) Then
    fso.CreateFolder(newFolder)
    WScript.Echo "Folder created successfully"
Else
    WScript.Echo "Folder already exists"
End If

Set fso = Nothing

The script checks for "C:\Temp\NewFolder" before creating it. This pattern is
common in setup and installation scripts. It demonstrates defensive programming
with file system operations. The CreateFolder method is used when needed.

## Checking Multiple Folders

This example shows how to check multiple folders efficiently. It uses an array of
paths with FolderExists. The results are collected and displayed
for all checked folders.

multiple_folders.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folders = Array("C:\Windows", "C:\Program Files", "D:\Backup")

For Each folder In folders
    If fso.FolderExists(folder) Then
        WScript.Echo folder &amp; " exists"
    Else
        WScript.Echo folder &amp; " does not exist"
    End If
Next

Set fso = Nothing

The script checks three different folders in a loop. This approach scales well
for multiple path checks. The results are displayed for each folder
independently. Arrays make managing multiple paths cleaner in scripts.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/1ft05tef(v=vs.84))

In this article, we have explored the FolderExists method in
VBScript, covering its usage and practical applications. From basic checks to
network paths and user input validation, these examples demonstrate reliable
folder verification. With this knowledge, you can enhance your file handling
scripts with robust directory management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).