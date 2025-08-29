+++
title = "VBScript AddToRecent Method"
date = 2025-08-29T20:15:23.269+01:00
draft = false
description = "Learn about VBScript AddToRecent method, including recent items management, shell operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AddToRecent Method

last modified April 9, 2025

The AddToRecent method in VBScript is part of the Windows Shell
object. It adds a file or folder to the system's recent documents list. This
method helps users quickly access frequently used items through Windows
interfaces. It's commonly used in file management applications and scripts.

AddToRecent updates the Windows Recent Items list visible in Start
Menus and File Dialogs. The method requires proper file paths and permissions
to work correctly. This tutorial covers AddToRecent with practical
examples to demonstrate its usage.

## AddToRecent Method Overview

The AddToRecent method takes one parameter: the path to a file or
folder. It doesn't return any value but updates the system's recent items list.
The method is available through the Shell.Application object in
VBScript scripting.

Key features include integration with Windows shell and automatic list updates.
It works with both local and network paths when accessible. The method affects
the current user's recent items only. Understanding this method helps create
more user-friendly scripts.

## Basic File Addition to Recent Items

This example demonstrates the simplest use of AddToRecent to add a
file to the recent documents list. It shows how to create the Shell object and
call the method. The file will appear in Windows Recent Items after execution.

basic_addtorecent.vbs
  

Set shell = CreateObject("Shell.Application")
shell.AddToRecent "C:\Documents\Report.docx"

Set shell = Nothing

The script creates a Shell.Application object and calls
AddToRecent with a file path. The specified document will be added
to the Recent Items list. The method silently succeeds unless the path is invalid
or inaccessible.

## Adding Multiple Files to Recent Items

This example shows how to add multiple files to the recent items list in one
script. It demonstrates calling AddToRecent multiple times with
different paths. Each file will appear separately in the Recent Items list.

multiple_files.vbs
  

Set shell = CreateObject("Shell.Application")
shell.AddToRecent "C:\Projects\Budget.xlsx"
shell.AddToRecent "C:\Projects\Timeline.pptx"
shell.AddToRecent "C:\Projects\Specs.pdf"

Set shell = Nothing

The script adds three different office documents to the Recent Items list. Each
AddToRecent call operates independently. The files will appear in
the order they were added, with the last one typically showing first.

## Adding Network Share Files to Recent Items

AddToRecent can work with network paths when properly accessible.
This example shows adding a file from a network share to recent items. The
network path must be reachable from the executing machine.

network_file.vbs
  

Set shell = CreateObject("Shell.Application")
networkPath = "\\Server\Shared\Presentation.pptm"
shell.AddToRecent networkPath

Set shell = Nothing

The script adds a PowerPoint file from a network share to Recent Items. The UNC
path format is required for network resources. The method works the same as with
local files if permissions allow access.

## Error Handling with AddToRecent

This example demonstrates basic error handling when using AddToRecent.
It shows how to check if a file exists before attempting to add it. This prevents
errors from invalid paths.

error_handling.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("Shell.Application")

filePath = "C:\Data\Analysis.csv"

If fso.FileExists(filePath) Then
    shell.AddToRecent filePath
    WScript.Echo "File added to recent items"
Else
    WScript.Echo "File not found, skipping"
End If

Set shell = Nothing
Set fso = Nothing

The script checks file existence before calling AddToRecent. This
approach prevents errors from invalid paths. The FileSystemObject
is used for file verification. Proper error handling makes scripts more robust.

## Adding Folder to Recent Items

AddToRecent works with folders as well as files. This example shows
adding a directory to the Recent Items list. The folder will appear alongside
recent files in Windows interfaces.

add_folder.vbs
  

Set shell = CreateObject("Shell.Application")
folderPath = "C:\Projects\Website\Assets"
shell.AddToRecent folderPath

Set shell = Nothing

The script adds a folder path to the Recent Items list. The method treats folder
paths the same way as file paths. Recent folders can be accessed through Windows
File Explorer and Open/Save dialogs.

## Source

[Windows Shell Documentation](https://learn.microsoft.com/en-us/windows/win32/shell/shell)

In this article, we have explored the AddToRecent method in VBScript,
covering its usage and practical applications. From single files to network
resources, these examples demonstrate recent items management. With this knowledge,
you can enhance your scripts with Windows shell integration.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).