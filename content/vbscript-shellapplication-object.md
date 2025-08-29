+++
title = "VBScript Shell.Application Object"
date = 2025-08-29T20:15:24.382+01:00
draft = false
description = "Learn about VBScript Shell.Application object, including file operations, system tasks, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Shell.Application Object

last modified April 9, 2025

The Shell.Application object in VBScript provides access to Windows
Shell functionality. It allows scripts to interact with the operating system at
a high level. This includes file operations, system dialogs, and special folder
access. The object is part of the Windows Script Host environment.

Shell.Application offers methods for common system tasks like
opening files and browsing folders. It can control windows, access the recycle
bin, and manage desktop items. This tutorial covers Shell.Application
with practical examples to demonstrate its capabilities.

## Shell.Application Object Overview

The Shell.Application object is created using the
CreateObject function. It provides numerous methods and properties
for system interaction. Common uses include file operations and system dialogs.
The object doesn't require any special installation.

Key features include folder browsing, file operations, and system control. It
can access special folders like Desktop and My Documents. Shell.Application
works on all modern Windows versions. Understanding this object helps create
powerful system administration scripts.

## Opening a File with Default Application

This example demonstrates how to open a file using its default application. The
ShellExecute method launches the associated program. The script
doesn't need to know which application to use. Windows handles the association.

open_file.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "C:\example.txt", "", "", "open", 1

Set objShell = Nothing

The script creates a Shell.Application object and calls
ShellExecute. The first parameter is the file path. The "open"
verb specifies the default action. The final parameter makes the window visible.

## Browsing for a Folder

This example shows how to display the folder browser dialog. The
BrowseForFolder method lets users select a folder. The script
returns the selected folder path. This is useful for file operations.

browse_folder.vbs
  

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.BrowseForFolder(0, "Select a folder:", 0)

If Not objFolder Is Nothing Then
    WScript.Echo "Selected folder: " &amp; objFolder.Self.Path
End If

Set objFolder = Nothing
Set objShell = Nothing

The script creates the folder browser dialog with a custom title. The selected
folder object contains path information. The Self.Path property
returns the full path. The script checks if a folder was actually selected.

## Accessing Special Folders

This example demonstrates accessing Windows special folders. The
NameSpace method retrieves folders like Desktop and My Documents.
Each special folder has a unique identifier. The script shows the Desktop path.

special_folders.vbs
  

Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.NameSpace(&amp;H00) ' Desktop folder

WScript.Echo "Desktop path: " &amp; objFolder.Self.Path

Set objFolder = Nothing
Set objShell = Nothing

The script uses the hexadecimal value &amp;H00 for the Desktop folder. Other common
values include &amp;H05 for My Documents. The Self.Path property
returns the folder's full path. This method works across different Windows versions.

## Minimizing All Windows

This example shows how to minimize all open windows. The MinimizeAll
method performs the same action as Win+D. It's useful for scripts that need a
clean desktop. The windows can be restored normally afterward.

minimize_windows.vbs
  

Set objShell = CreateObject("Shell.Application")
objShell.MinimizeAll

Set objShell = Nothing

The script creates a Shell.Application object and calls
MinimizeAll. No parameters are needed for this method. The effect
is immediate and affects all open windows. This is purely a visual operation.

## Creating a Shortcut

This example demonstrates creating a desktop shortcut. The
NameSpace method locates the Desktop. The CreateShortcut
method generates the shortcut file. The script sets the shortcut's properties.

create_shortcut.vbs
  

Set objShell = CreateObject("Shell.Application")
Set objDesktop = objShell.NameSpace(&amp;H00)

Set objShortcut = objDesktop.NewShortcut("C:\Desktop\Notepad.lnk")
objShortcut.TargetPath = "C:\Windows\notepad.exe"
objShortcut.IconLocation = "C:\Windows\notepad.exe, 0"
objShortcut.Save

Set objShortcut = Nothing
Set objDesktop = Nothing
Set objShell = Nothing

The script creates a shortcut to Notepad on the desktop. The TargetPath
sets the executable path. IconLocation specifies the icon. The
Save method writes the shortcut file. The shortcut appears immediately.

## Source

[Windows Shell Documentation](https://learn.microsoft.com/en-us/windows/win32/shell/shell)

In this article, we have explored the Shell.Application object in
VBScript, covering its usage and practical applications. From file operations
to system control, these examples demonstrate powerful Windows integration. With
this knowledge, you can enhance your scripts with advanced system capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).