+++
title = "VBScript OpenTextFile Method"
date = 2025-08-29T20:15:09.868+01:00
draft = false
description = "Learn about VBScript OpenTextFile method, including file reading, writing, appending and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript OpenTextFile Method

last modified April 9, 2025

The OpenTextFile method in VBScript is part of the
FileSystemObject. It opens a specified file and returns a
TextStream object. This object can read from, write to, or append
to the file. The method provides flexible file handling capabilities in VBScript.

OpenTextFile supports different modes: reading, writing, and
appending. It can also create new files if they don't exist. This tutorial
covers OpenTextFile with practical examples to demonstrate its
usage.

## OpenTextFile Method Overview

The OpenTextFile method takes three parameters: filename, IOMode,
and create. Filename specifies the file to open. IOMode determines the access
mode. The create parameter specifies whether to create a new file if missing.

Key features include reading entire files line by line, writing new content, and
appending to existing files. The method returns a TextStream object for file
operations. Understanding this method is essential for file handling in VBScript.

## Reading a Text File

This example demonstrates reading a text file line by line using
OpenTextFile. It shows the basic reading mode operation. The script
opens a file and outputs its contents to the console.

read_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\example.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfStream
    line = file.ReadLine
    WScript.Echo line
Loop

file.Close
Set fso = Nothing

The script creates a FileSystemObject and opens a file for reading.
It reads each line until the end of file. Each line is displayed using
WScript.Echo. Finally, it closes the file and cleans up resources.

## Writing to a New File

This example shows how to create and write to a new text file. The
OpenTextFile method is used with writing mode. If the file exists,
it will be overwritten.

write_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\output.txt", 2, True) ' 2 = ForWriting

file.WriteLine "This is line 1"
file.WriteLine "This is line 2"
file.Write "This will be on line 3"

file.Close
Set fso = Nothing

The script opens a file for writing (mode 2) with create flag set to True. It
writes two lines with WriteLine and one with Write.
WriteLine adds a newline while Write doesn't. The file
is automatically created if it doesn't exist.

## Appending to an Existing File

This example demonstrates appending content to an existing file. The append mode
(8) adds new content at the end without overwriting existing data. This is
useful for log files.

append_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\log.txt", 8, True) ' 8 = ForAppending

file.WriteLine "New log entry: " &amp; Now()

file.Close
Set fso = Nothing

The script opens a file in append mode (8). It adds a new line with the current
date and time. If the file doesn't exist, it will be created due to the True
parameter. Each run appends a new line without affecting existing content.

## Reading Entire File at Once

This example shows how to read an entire file's content in one operation. The
ReadAll method of the TextStream object loads all content into
memory. This is useful for small files.

read_all.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\data.txt", 1) ' 1 = ForReading

content = file.ReadAll
WScript.Echo content

file.Close
Set fso = Nothing

The script opens a file for reading and uses ReadAll to get all
content. The entire content is stored in the content variable and
displayed. This approach is simpler but uses more memory for large files.

## Checking File Existence Before Opening

This example demonstrates checking if a file exists before attempting to open it.
The FileExists method prevents errors when files are missing. It's
a good practice for robust scripts.

check_exists.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = "C:\temp\important.txt"

If fso.FileExists(filePath) Then
    Set file = fso.OpenTextFile(filePath, 1)
    content = file.ReadAll
    WScript.Echo content
    file.Close
Else
    WScript.Echo "File not found: " &amp; filePath
End If

Set fso = Nothing

The script first checks if the file exists using FileExists. If
found, it opens and reads the file. If not, it displays an error message. This
approach prevents runtime errors from missing files.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the OpenTextFile method in
VBScript, covering its usage and practical applications. From reading and
writing to appending and checking existence, these examples demonstrate
comprehensive file handling. With this knowledge, you can implement robust file
operations in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).