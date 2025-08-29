+++
title = "VBScript Create Method"
date = 2025-08-29T20:15:41.060+01:00
draft = false
description = "Learn about VBScript Create method, including file creation, folder creation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Create Method

last modified April 9, 2025

The Create method in VBScript is part of the
FileSystemObject. It creates new files, folders, or text streams. 
This method is essential for file system operations in VBScript. It provides 
different variations for creating various types of objects.

Create methods include CreateTextFile, 
CreateFolder, and others. Each serves a specific purpose in file 
system manipulation. This tutorial covers these methods with practical examples 
to demonstrate their usage.

## Create Method Overview

The Create methods in VBScript create new file system objects. 
They are available through the FileSystemObject. These methods 
return references to newly created objects for further manipulation.

Key methods include CreateTextFile for text files and 
CreateFolder for directories. Each method has specific parameters 
to control creation behavior. Understanding these methods enables powerful file 
system automation.

## Creating a Text File

This example demonstrates creating a new text file using 
CreateTextFile. The method creates an empty text file at the 
specified path. It returns a TextStream object for writing.

create_textfile.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\Temp\example.txt", True)
file.WriteLine "This is a test file created with VBScript"
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and calls 
CreateTextFile. The second parameter (True) overwrites existing 
files. The script writes a line to the file and closes it. Always release 
objects when done.

## Creating a Folder

This example shows how to create a new directory using 
CreateFolder. The method creates a folder at the specified path. 
It throws an error if the folder already exists.

create_folder.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
On Error Resume Next
Set folder = fso.CreateFolder("C:\Temp\NewFolder")

If Err.Number = 0 Then
    WScript.Echo "Folder created successfully"
Else
    WScript.Echo "Error creating folder: " &amp; Err.Description
End If

Set folder = Nothing
Set fso = Nothing

The script attempts to create "C:\Temp\NewFolder". Error handling catches cases 
where the folder exists. The method returns a Folder object. Always 
include error handling for file system operations.

## Creating a File with Unicode Encoding

This example creates a Unicode text file using CreateTextFile. The 
third parameter controls Unicode encoding. Setting it to True creates a Unicode 
file instead of ASCII.

create_unicode.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\Temp\unicode.txt", True, True)
file.WriteLine "This file uses Unicode encoding"
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a Unicode-encoded text file. The third True parameter enables 
Unicode support. This is essential for non-ASCII character sets. The file 
operations remain the same as ASCII files.

## Creating Multiple Folders

This example demonstrates creating nested folder structures. It uses multiple 
CreateFolder calls to build a directory tree. Each call creates 
one level of the hierarchy.

create_nested.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
On Error Resume Next

fso.CreateFolder "C:\Temp\Project"
fso.CreateFolder "C:\Temp\Project\Documents"
fso.CreateFolder "C:\Temp\Project\Images"

If Err.Number = 0 Then
    WScript.Echo "Folder structure created successfully"
End If

Set fso = Nothing

The script creates three nested folders under C:\Temp. Error handling prevents 
script termination if folders exist. This approach builds complex directory 
structures. Each folder must be created separately.

## Creating and Writing to a Text File

This comprehensive example creates a text file and writes multiple lines. It 
demonstrates the full process from creation to writing and closing. The example 
shows practical file operations.

create_write_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\Temp\data.log", True)

file.WriteLine "Log file created: " &amp; Now()
file.WriteLine "-------------------------------"
file.WriteLine "This is line 1 of the log file"
file.WriteLine "This is line 2 of the log file"
file.WriteBlankLines(1)
file.WriteLine "End of log file"

file.Close

Set file = Nothing
Set fso = Nothing

The script creates a log file with timestamp and structured content. 
WriteLine adds text with line breaks, while WriteBlankLines 
adds empty lines. Always close files after writing to ensure data is saved.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Create methods in VBScript, 
covering file and folder creation. From simple text files to complex directory 
structures, these examples demonstrate essential file system operations. With 
this knowledge, you can implement robust file handling in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).