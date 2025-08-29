+++
title = "VBScript FileSystemObject"
date = 2025-08-29T20:14:51.915+01:00
draft = false
description = "Learn about VBScript FileSystemObject, including file and folder operations. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FileSystemObject

last modified April 4, 2025

The FileSystemObject (FSO) provides access to a computer's file system in
VBScript. It allows you to create, read, update, and delete files and folders.
This tutorial covers FileSystemObject with practical examples for file
operations, folder management, and text file manipulation.

## FileSystemObject Overview

FileSystemObject is part of the Scripting Runtime library. It provides methods
to work with drives, folders, and files. To use FSO, create an instance with
CreateObject("Scripting.FileSystemObject"). The object model
includes Drive, Folder, and File objects.

FSO supports text file operations through TextStream objects. These allow reading
and writing text files line by line. The library is available on Windows systems
by default, making it ideal for automation scripts.

## Creating and Writing to a Text File

This example demonstrates creating a new text file and writing content to it.
The CreateTextFile method creates the file, while
WriteLine adds text. Always close files after operations.

create_file.vbs
  

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\example.txt", True)

file.WriteLine "This is line 1"
file.WriteLine "This is line 2"
file.Close

WScript.Echo "File created and written successfully"

The script first creates a FileSystemObject instance. Then it creates a new file
at the specified path. The second parameter (True) overwrites existing files.
After writing two lines, it closes the file to release system resources.

## Reading from a Text File

This example shows how to read content from an existing text file. The
OpenTextFile method opens the file, and ReadLine
reads content line by line. The AtEndOfStream property checks EOF.

read_file.vbs
  

Dim fso, file, content
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\example.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfStream
    content = file.ReadLine
    WScript.Echo content
Loop

file.Close

The script opens the file in read mode (1). It then reads each line until
reaching the end of file. Each line is displayed using WScript.Echo. Finally,
the file is closed properly. Error handling should be added for production use.

## Checking File Existence and Properties

This example demonstrates checking if a file exists and accessing its properties.
The FileExists method checks existence, while the File object
provides properties like size and creation date.

file_properties.vbs
  

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\example.txt"

If fso.FileExists(filePath) Then
    Set file = fso.GetFile(filePath)
    WScript.Echo "File exists"
    WScript.Echo "Size: " &amp; file.Size &amp; " bytes"
    WScript.Echo "Created: " &amp; file.DateCreated
    WScript.Echo "Modified: " &amp; file.DateLastModified
Else
    WScript.Echo "File does not exist"
End If

The script first checks if the file exists. If it does, it retrieves the File
object and displays several properties. These include file size, creation date,
and last modification date. This is useful for file management scripts.

## Creating and Deleting Folders

This example shows folder operations using FSO. The CreateFolder
method makes new directories, while DeleteFolder removes them.
Folder existence can be checked with FolderExists.

folder_operations.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")
folderPath = "C:\temp\newfolder"

If Not fso.FolderExists(folderPath) Then
    fso.CreateFolder(folderPath)
    WScript.Echo "Folder created"
Else
    WScript.Echo "Folder already exists"
    fso.DeleteFolder(folderPath)
    WScript.Echo "Folder deleted"
End If

The script checks if a folder exists. If not, it creates one. If the folder
exists, it deletes it. These operations are fundamental for directory
management. Always verify folder existence before operations to prevent errors.

## Copying and Moving Files

This example demonstrates file copying and moving operations. The
CopyFile method duplicates files, while MoveFile
relocates them. Both methods can overwrite existing files with caution.

file_copy_move.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")
sourceFile = "C:\temp\example.txt"
destFile = "C:\temp\backup\example_copy.txt"

' Copy file
fso.CopyFile sourceFile, destFile, True ' True = overwrite
WScript.Echo "File copied"

' Move file
newLocation = "C:\temp\archive\example.txt"
fso.MoveFile sourceFile, newLocation
WScript.Echo "File moved"

The script first copies the file to a backup location, overwriting if necessary.
Then it moves the original file to an archive folder. These operations are
useful for file organization and backup scripts. Paths must be valid.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the FileSystemObject in VBScript, covering
file and folder operations. From creating and reading files to managing
directories and file properties, these examples provide practical skills for
scripting tasks. With this knowledge, you can automate file system operations
in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).