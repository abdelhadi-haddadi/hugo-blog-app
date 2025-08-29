+++
title = "VBScript Shell.Application"
date = 2025-08-29T20:15:32.111+01:00
draft = false
description = "Learn about VBScript Shell.Application object, including file operations, special folders, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Shell.Application

last modified April 4, 2025

The Shell.Application object in VBScript provides access to the Windows shell 
functionality. It allows scripts to interact with the file system, special 
folders, and system operations. This powerful automation tool can manipulate 
files, launch applications, and access system information.

Shell.Application is part of the Windows Script Host object model. It offers 
methods and properties for common shell tasks. This tutorial covers Shell.Application 
with practical examples to demonstrate its capabilities in various scenarios.

## Shell.Application Overview

The Shell.Application object is created using the CreateObject function in 
VBScript. It provides access to Windows shell features through its methods and 
properties. Common uses include file operations, special folder access, and 
system dialogs.

Key methods include NameSpace, Explore, Open, and MinimizeAll. The object can 
navigate folders, launch applications, and control windows. Understanding these 
features enables powerful automation scripts for Windows administration.

## Opening a Folder in Explorer

The Explore method opens a specified folder in Windows Explorer. This is useful 
for scripts that need to show folder contents to users. The method accepts a 
folder path as its parameter.

open_folder.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.Explore "C:\Windows\System32"

Set objShell = Nothing

This example opens the System32 folder in Windows Explorer. The CreateObject 
function instantiates the Shell.Application object. The Explore method displays 
the folder. Always release objects with Set to Nothing when done.

## Accessing Special Folders

Shell.Application can access Windows special folders like Desktop or My 
Documents. The NameSpace method returns a Folder object for special folders. 
These are identified by their CSIDL (constant special item ID list) values.

special_folders.vbs
  

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.NameSpace(&amp;H10) ' My Documents

WScript.Echo "My Documents path: " &amp; objFolder.Self.Path

Set objFolder = Nothing
Set objShell = Nothing

This script displays the path to the My Documents folder. The hexadecimal value 
&amp;H10 represents the My Documents CSIDL. The Self.Path property returns the 
folder's full path. Common CSIDL values include Desktop (&amp;H0) and Program Files (&amp;H26).

## Minimizing All Windows

The MinimizeAll method minimizes all open windows, showing the desktop. This is 
equivalent to pressing Windows+D. The method takes no parameters and immediately 
performs the action.

minimize_windows.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.MinimizeAll

Set objShell = Nothing

This simple example demonstrates minimizing all windows. The MinimizeAll method 
provides quick access to the desktop. There's also a corresponding UndoMinimizeALL 
method to restore windows.

## Creating a Shortcut

Shell.Application can create shortcuts using the NameSpace method and Folder 
object. The CreateShortcut method generates a new shortcut file. This is useful 
for installation scripts or desktop customization.

create_shortcut.vbs
  

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.NameSpace(&amp;H10) ' My Documents

' Create shortcut in My Documents
Set objShortcut = objFolder.NewFolderItem("Notepad.lnk", 1)
objShortcut.TargetPath = "C:\Windows\System32\notepad.exe"
objShortcut.Save

Set objShortcut = Nothing
Set objFolder = Nothing
Set objShell = Nothing

This script creates a Notepad shortcut in My Documents. The NewFolderItem method 
with type 1 creates a shortcut. The TargetPath property sets the target 
application. The Save method writes the shortcut to disk.

## Displaying File Properties

The FileRun method displays the Properties dialog for a specified file. This 
shows the same dialog as right-clicking a file and selecting Properties. The 
method accepts the full file path as its parameter.

file_properties.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.FileRun "C:\Windows\System32\notepad.exe"

Set objShell = Nothing

This example displays the properties of Notepad.exe. The FileRun method opens 
the standard Windows file properties dialog. This can be useful for scripts that 
need to show file information to users.

## Source

[Windows Shell Documentation](https://learn.microsoft.com/en-us/windows/win32/shell/shell)

In this article, we have explored the Shell.Application object in VBScript, 
covering its key methods and practical applications. From opening folders to 
creating shortcuts, these examples demonstrate powerful Windows automation 
capabilities. With this knowledge, you can enhance your scripts with advanced 
shell interactions.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).