+++
title = "VBScript CreateFolder Method"
date = 2025-08-29T20:14:56.336+01:00
draft = false
description = "Learn about VBScript CreateFolder method, including folder creation, directory operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CreateFolder Method

last modified April 9, 2025

The CreateFolder method in VBScript is part of the
FileSystemObject. It creates a new folder at the specified path. 
This method is essential for directory management in VBScript scripts. It 
returns a Folder object representing the newly created directory.

CreateFolder will raise an error if the folder already exists or if 
the path is invalid. Proper error handling should be implemented when using this 
method. This tutorial covers CreateFolder with practical examples.

## CreateFolder Method Overview

The CreateFolder method takes one parameter: the path of the folder 
to create. It creates a new directory at the specified location if possible. 
The method requires proper permissions to create folders in the target location.

Key features include automatic path resolution and immediate folder creation. 
It doesn't create parent directories if they don't exist. Understanding this 
method helps automate directory creation tasks in scripts.

## Basic Folder Creation

This example demonstrates the simplest use of CreateFolder to 
create a single directory. It shows how to create a folder at a specified path. 
The script includes basic error handling for common scenarios.

basic_createfolder.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
fso.CreateFolder "C:\Temp\NewFolder"

If Err.Number = 0 Then
    WScript.Echo "Folder created successfully"
Else
    WScript.Echo "Error creating folder: " &amp; Err.Description
End If

Set fso = Nothing

The script creates a FileSystemObject and calls 
CreateFolder. The folder "NewFolder" is created in C:\Temp. 
Error handling checks for success or failure. The script reports the outcome.

## Creating Nested Folders

This example shows how to create a nested folder structure. It demonstrates 
creating multiple levels of directories. Each parent folder must exist before 
creating subfolders.

nested_folders.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
basePath = "C:\Projects"
fso.CreateFolder basePath
fso.CreateFolder fso.BuildPath(basePath, "Website")
fso.CreateFolder fso.BuildPath(basePath, "Website\Images")

If Err.Number = 0 Then
    WScript.Echo "Folder structure created successfully"
Else
    WScript.Echo "Error creating folders: " &amp; Err.Description
End If

Set fso = Nothing

The script first creates the base folder "C:\Projects". Then it creates 
subfolders "Website" and "Website\Images". The BuildPath method 
helps construct proper paths. Error handling reports any issues.

## Creating Folder with Current Date

This example demonstrates creating a folder named with the current date. It 
shows dynamic folder naming based on system date. The date format ensures 
folder names are sortable and unique.

date_folder.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
folderName = "Backup_" &amp; Year(Date) &amp; "-" &amp; Right("0" &amp; Month(Date), 2) &amp; "-" &amp; Right("0" &amp; Day(Date), 2)
fso.CreateFolder "C:\Backups\" &amp; folderName

If Err.Number = 0 Then
    WScript.Echo "Dated folder created: " &amp; folderName
Else
    WScript.Echo "Error creating folder: " &amp; Err.Description
End If

Set fso = Nothing

The script generates a folder name like "Backup_2025-04-09". It uses date 
functions to construct the name. The folder is created in C:\Backups. Error 
handling ensures the script reports success or failure.

## Creating Folder with User Input

This example shows creating a folder based on user input. It demonstrates 
interactive folder creation. The script prompts the user for a folder name.

user_input_folder.vbs
  

On Error Resume Next

folderName = InputBox("Enter folder name to create in C:\Temp:")
If folderName &lt;&gt; "" Then
    Set fso = CreateObject("Scripting.FileSystemObject")
    fso.CreateFolder "C:\Temp\" &amp; folderName
    
    If Err.Number = 0 Then
        WScript.Echo "Folder created: C:\Temp\" &amp; folderName
    Else
        WScript.Echo "Error: " &amp; Err.Description
    End If
    
    Set fso = Nothing
Else
    WScript.Echo "No folder name provided"
End If

The script uses InputBox to get user input. It creates the folder 
in C:\Temp with the provided name. Error handling catches invalid names or 
permission issues. The script provides feedback about the operation.

## Checking Before Creating Folder

This example demonstrates checking for folder existence before creation. It 
shows how to avoid errors when a folder already exists. The script uses 
FolderExists to check first.

check_before_create.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\Temp\TestFolder"

If Not fso.FolderExists(folderPath) Then
    fso.CreateFolder folderPath
    WScript.Echo "Folder created: " &amp; folderPath
Else
    WScript.Echo "Folder already exists: " &amp; folderPath
End If

Set fso = Nothing

The script checks if the folder exists before attempting creation. If the 
folder doesn't exist, it creates it. If the folder exists, it informs the 
user. This approach prevents errors from duplicate folder creation.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the CreateFolder method in VBScript,
covering its usage and practical applications. From basic folder creation to 
dynamic naming and user interaction, these examples demonstrate robust directory 
management. With this knowledge, you can enhance your scripts with automated 
folder creation capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).