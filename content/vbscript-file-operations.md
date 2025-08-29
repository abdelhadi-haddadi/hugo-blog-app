+++
title = "VBScript File Operations"
date = 2025-08-29T20:14:51.919+01:00
draft = false
description = "VBScript file operations tutorial shows how to work with files in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript File Operations

last modified February 19, 2025

In this article, we will learn how to work with files in VBScript. VBScript
provides the FileSystemObject to interact with the file system. We
will use WScript.Echo to output results and run the scripts using
cscript.

## Creating a Text File

The first example demonstrates how to create a text file.

create_file.vbs
  

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("example.txt", True)

file.WriteLine("This is a test file.")
file.Close()

WScript.Echo "File created successfully."

This example creates a text file named example.txt and writes a line
of text to it.

## Reading a Text File

You can read the contents of a text file using the OpenTextFile
method.

read_file.vbs
  

Dim fso, file, content
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("example.txt", 1)

content = file.ReadAll()
file.Close()

WScript.Echo content

This example reads the entire contents of example.txt and displays
it using WScript.Echo.

## Appending to a Text File

You can append text to an existing file using the OpenTextFile
method with the ForAppending mode.

append_file.vbs
  

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("example.txt", 8, True)

file.WriteLine("This is an additional line.")
file.Close()

WScript.Echo "Text appended successfully."

This example appends a line of text to example.txt.

## Checking if a File Exists

You can check if a file exists using the FileExists method.

file_exists.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

If fso.FileExists("example.txt") Then
    WScript.Echo "File exists."
Else
    WScript.Echo "File does not exist."
End If

This example checks if example.txt exists and outputs a message
based on the result.

## Deleting a File

You can delete a file using the DeleteFile method.

delete_file.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

If fso.FileExists("example.txt") Then
    fso.DeleteFile("example.txt")
    WScript.Echo "File deleted successfully."
Else
    WScript.Echo "File does not exist."
End If

This example deletes example.txt if it exists.

## Copying a File

You can copy a file using the CopyFile method.

copy_file.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

If fso.FileExists("example.txt") Then
    fso.CopyFile "example.txt", "example_copy.txt"
    WScript.Echo "File copied successfully."
Else
    WScript.Echo "File does not exist."
End If

This example copies example.txt to example_copy.txt.

## Moving a File

You can move a file using the MoveFile method.

move_file.vbs
  

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")

If fso.FileExists("example.txt") Then
    fso.MoveFile "example.txt", "new_location/example.txt"
    WScript.Echo "File moved successfully."
Else
    WScript.Echo "File does not exist."
End If

This example moves example.txt to a new location.

## Listing Files in a Directory

You can list all files in a directory using the Files collection.

list_files.vbs
  

Dim fso, folder, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set folder = fso.GetFolder(".")

For Each file In folder.Files
    WScript.Echo file.Name
Next

This example lists all files in the current directory.

In this article, we explored how to work with files in VBScript. We covered
creating, reading, appending, checking existence, deleting, copying, moving,
and listing files. The FileSystemObject provides a powerful way to
interact with the file system in VBScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).