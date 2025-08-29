+++
title = "VBScript Name Property"
date = 2025-08-29T20:15:09.873+01:00
draft = false
description = "Learn about VBScript Name property, including file and folder naming, object identification, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Name Property

last modified April 9, 2025

The Name property in VBScript is a fundamental attribute available 
in various objects. It returns or sets the name of an object, such as files, 
folders, or drives. This property is read-only for some objects and read-write 
for others. It's commonly used for identification and manipulation of objects.

The Name property is available through the FileSystemObject
and other VBScript objects. It provides a simple way to access or modify object 
names. This tutorial covers the Name property with practical 
examples to demonstrate its usage.

## Name Property Overview

The Name property represents the identifier of an object. For file 
system objects, it returns the name portion without the path. The property 
behaves differently depending on the object type. Some objects allow name 
changes while others don't.

Key features include simple name retrieval and modification where allowed. It 
works with files, folders, drives, and other objects. Understanding this 
property helps in object identification and manipulation. The examples will 
demonstrate various use cases.

## Getting a File Name

This example demonstrates how to retrieve the name of a file using the 
Name property. It shows basic file object creation and name 
access. The script gets a file object and displays its name.

get_filename.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\example.txt")

WScript.Echo "File name: " &amp; file.Name ' Output: example.txt

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and gets a file object. 
The Name property returns just the filename portion. The full path 
is not included in the result. This is useful when you need just the filename.

## Getting a Folder Name

This example shows how to retrieve the name of a folder. It demonstrates the 
Name property with folder objects. The script gets a folder 
object and displays its name.

get_foldername.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Windows\System32")

WScript.Echo "Folder name: " &amp; folder.Name ' Output: System32

Set folder = Nothing
Set fso = Nothing

The script creates a folder object for "C:\Windows\System32". The 
Name property returns "System32" without the path. This works 
similarly to the file name example but with folder objects.

## Renaming a File

This example demonstrates changing a file's name using the Name 
property. It shows how to rename a file by assigning a new value to the 
property. The script renames a file from "oldname.txt" to "newname.txt".

rename_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\Temp\oldname.txt")

file.Name = "newname.txt"
WScript.Echo "File renamed to: " &amp; file.Name

Set file = Nothing
Set fso = Nothing

The script gets a file object and changes its Name property. 
This effectively renames the file on disk. Note that the file must not be 
locked or in use for this to work. The change is immediate and permanent.

## Getting Drive Names

This example shows how to retrieve the names of all available drives. It 
demonstrates the Name property with drive objects. The script 
iterates through all drives and displays their names.

get_drivenames.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives

For Each drive in drives
    WScript.Echo "Drive: " &amp; drive.Name
Next

Set drives = Nothing
Set fso = Nothing

The script accesses the Drives collection and iterates through 
each drive. The Name property returns the drive letter followed 
by a colon (e.g., "C:"). This is useful for drive enumeration tasks.

## Checking Object Names in a Folder

This example demonstrates checking names of all files in a folder. It shows 
how to use the Name property with collections. The script lists 
all files in a directory with their names.

list_filenames.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder("C:\Temp")
Set files = folder.Files

WScript.Echo "Files in " &amp; folder.Name &amp; ":"
For Each file in files
    WScript.Echo file.Name
Next

Set files = Nothing
Set folder = Nothing
Set fso = Nothing

The script gets all files in "C:\Temp" and displays their names. The 
Name property provides just the filename without the path. 
This is useful for directory listing operations and file management tasks.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Name property in VBScript, 
covering its usage and practical applications. From simple name retrieval to 
file renaming, these examples demonstrate its versatility. With this knowledge, 
you can better manage and identify objects in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).