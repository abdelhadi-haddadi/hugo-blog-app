+++
title = "VBScript BrowseForFolder Method"
date = 2025-08-29T20:15:24.392+01:00
draft = false
description = "Learn about VBScript BrowseForFolder method, including folder selection, dialog customization, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript BrowseForFolder Method

last modified April 9, 2025

The BrowseForFolder method in VBScript is part of the
Shell.Application object. It displays a dialog box that allows users
to select a folder. This method is commonly used in scripts requiring user input
for folder selection. It provides a familiar interface consistent with Windows
Explorer.

BrowseForFolder offers customization options for the dialog title
and behavior. It returns a Folder object representing the selected
directory. This tutorial covers BrowseForFolder with practical
examples to demonstrate its usage.

## BrowseForFolder Method Overview

The BrowseForFolder method takes several parameters: window handle,
title, options, and root folder. It displays a modal dialog for folder
selection. The method returns a Folder object or nothing if
canceled.

Key features include customizable dialog text and root folder specification. It
can show files or restrict to folders only. Understanding this method helps
create interactive scripts requiring folder input. The dialog appearance matches
the Windows version it runs on.

## Basic Folder Selection

This example demonstrates the simplest use of BrowseForFolder to
select a folder. It shows the default dialog with minimal parameters. The script
displays the selected folder path or a message if canceled.

basic_browse.vbs
  

Set shell = CreateObject("Shell.Application")
Set folder = shell.BrowseForFolder(0, "Select a folder", 0)

If Not folder Is Nothing Then
    WScript.Echo "Selected folder: " &amp; folder.Self.Path
Else
    WScript.Echo "No folder selected"
End If

Set folder = Nothing
Set shell = Nothing

The script creates a Shell.Application object and calls
BrowseForFolder. The first parameter (0) specifies no parent
window. The second parameter sets the dialog title. The third parameter (0)
uses default options.

## Custom Dialog Title and Options

This example shows customizing the dialog title and behavior options. The title
provides user instructions. Options control dialog behavior like showing files
or edit box. Different combinations serve various use cases.

custom_browse.vbs
  

Set shell = CreateObject("Shell.Application")
' 1 = Show both files and folders
' 512 = Show an edit box for path entry
options = 1 + 512
Set folder = shell.BrowseForFolder(0, "Please select a destination folder:", options)

If Not folder Is Nothing Then
    WScript.Echo "You selected: " &amp; folder.Self.Path
Else
    WScript.Echo "Operation canceled"
End If

Set folder = Nothing
Set shell = Nothing

The script combines options 1 (show files) and 512 (edit box) for flexible
selection. The custom title guides the user. The options parameter accepts
bitwise combinations of available flags. This creates a more versatile folder
picker.

## Setting Root Folder

This example demonstrates restricting the starting folder for the dialog. The
root folder parameter limits where browsing begins. It helps guide users to
appropriate locations. The script uses a known folder ID for Documents.

root_folder.vbs
  

Set shell = CreateObject("Shell.Application")
' &amp;H5 = CSIDL_PERSONAL (My Documents)
rootFolder = &amp;H5
Set folder = shell.BrowseForFolder(0, "Select a folder in Documents:", 0, rootFolder)

If Not folder Is Nothing Then
    WScript.Echo "Selected: " &amp; folder.Self.Path
Else
    WScript.Echo "No selection made"
End If

Set folder = Nothing
Set shell = Nothing

The script starts browsing from the Documents folder using CSIDL_PERSONAL (0x5).
This focuses user selection within a specific directory tree. Known folder IDs
provide consistent starting points across systems. The dialog opens directly at
the specified location.

## Creating New Folders

This example enables folder creation within the dialog. The option combination
allows users to make new folders during selection. This is useful for scripts
that need to create output directories. The dialog handles the creation UI.

new_folder.vbs
  

Set shell = CreateObject("Shell.Application")
' 8 = BIF_NEWDIALOGSTYLE (enables New Folder button)
' 64 = BIF_EDITBOX
options = 8 + 64
Set folder = shell.BrowseForFolder(0, "Select or create output folder:", options)

If Not folder Is Nothing Then
    WScript.Echo "Output will go to: " &amp; folder.Self.Path
Else
    WScript.Echo "No folder specified"
End If

Set folder = Nothing
Set shell = Nothing

The script combines options 8 (new folder button) and 64 (edit box). Users can
create folders or type paths directly. The dialog maintains standard Windows
folder creation behavior. This provides maximum flexibility for output location
selection.

## Advanced Options Combination

This example shows a complex combination of dialog options. It demonstrates
multiple features working together. The script creates a versatile folder picker
with several advanced features enabled. This serves specialized use cases.

advanced_browse.vbs
  

Set shell = CreateObject("Shell.Application")
' 1 = Show files
' 4 = Show text labels
' 8 = New folder button
' 16 = Show shared folders differently
' 64 = Edit box
options = 1 + 4 + 8 + 16 + 64
Set folder = shell.BrowseForFolder(0, "Advanced folder selection:", options, &amp;H5)

If Not folder Is Nothing Then
    WScript.Echo "Final selection: " &amp; folder.Self.Path
Else
    WScript.Echo "Selection canceled"
End If

Set folder = Nothing
Set shell = Nothing

The script combines five options for maximum dialog functionality. It starts in
Documents folder and shows files with labels. Shared folders appear distinct,
and users can create folders. The edit box allows direct path entry. This
creates a comprehensive selection interface.

## Source

[Shell.BrowseForFolder Documentation](https://learn.microsoft.com/en-us/windows/win32/shell/shell-browseforfolder)

In this article, we have explored the BrowseForFolder method in
VBScript, covering its usage and practical applications. From basic folder
selection to advanced dialog customization, these examples demonstrate flexible
user interaction. With this knowledge, you can enhance your scripts with
professional folder selection dialogs.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).