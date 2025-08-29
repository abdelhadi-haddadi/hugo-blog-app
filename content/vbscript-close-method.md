+++
title = "VBScript Close Method"
date = 2025-08-29T20:14:54.123+01:00
draft = false
description = "Learn about VBScript Close method, including file handling, TextStream operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Close Method

last modified April 9, 2025

The Close method in VBScript is used to close open file handles and
release system resources. It's essential for proper file handling and preventing
resource leaks. The method is available on objects like TextStream
and File from the FileSystemObject.

Close ensures all buffered data is written before closing. It's a
critical practice in file operations to maintain data integrity. This tutorial
covers Close with practical examples to demonstrate its usage.

## Close Method Overview

The Close method terminates access to a file or stream object. It
has no parameters and doesn't return a value. After closing, the object becomes
unavailable for further operations. Always close files when done to free
resources.

Key features include flushing write buffers and releasing file locks. It's
available on TextStream, File, and similar objects.
Proper closing prevents data corruption and system resource exhaustion.
Understanding this method is essential for robust file handling.

## Closing a TextStream After Writing

This example demonstrates closing a TextStream after writing data.
It shows the basic pattern of open-write-close operations. The Close
method ensures all data is written to disk.

basic_close.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\example.txt")

file.WriteLine "This is sample text"
file.Close ' Important: Close the file after writing

Set file = Nothing
Set fso = Nothing

The script creates a text file and writes one line to it. The Close
call ensures the data is flushed to disk. Without closing, data might remain in
buffers. Always close files when done writing to prevent data loss.

## Closing a File After Reading

This example shows closing a file after reading its contents. It demonstrates the
proper sequence for read operations. The Close method releases the
file lock after reading.

read_close.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\example.txt", 1) ' 1 = ForReading

content = file.ReadAll
WScript.Echo content
file.Close ' Release the file handle

Set file = Nothing
Set fso = Nothing

The script opens a file, reads all content, then closes it. Closing releases
system resources and allows other processes to access the file. Even for read
operations, closing is essential for proper resource management.

## Using Close in Error Handling

This example demonstrates using Close with error handling. It shows
how to ensure files are properly closed even if errors occur. The technique
prevents resource leaks during exceptional conditions.

error_handling_close.vbs
  

On Error Resume Next

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\nonexistent.txt", 1)

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error opening file: " &amp; Err.Description
Else
    content = file.ReadAll
    WScript.Echo content
    file.Close ' Ensure close even if error occurs
End If

Set file = Nothing
Set fso = Nothing

The script attempts to open a potentially nonexistent file. The error handling
structure ensures the file is closed if opened successfully. This pattern is
crucial for robust file operations in production scripts.

## Closing Multiple Files

This example shows proper handling when working with multiple files. It
demonstrates closing each file individually. Managing multiple resources
requires careful attention to closing each one.

multiple_close.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file1 = fso.OpenTextFile("C:\temp\file1.txt", 2) ' 2 = ForWriting
Set file2 = fso.OpenTextFile("C:\temp\file2.txt", 2)

file1.WriteLine "Data for file 1"
file2.WriteLine "Data for file 2"

file1.Close ' Close first file
file2.Close ' Close second file

Set file1 = Nothing
Set file2 = Nothing
Set fso = Nothing

The script opens two files for writing, writes to both, then closes each
separately. The order of closing typically follows the reverse of opening.
Proper resource cleanup prevents file handle leaks in long-running scripts.

## Closing in a Function

This example demonstrates proper file closing within a function. It shows how to
handle resource cleanup when files are opened in different scopes. The technique
ensures proper closing regardless of where the file was opened.

function_close.vbs
  

Function ProcessFile(filename)
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set file = fso.OpenTextFile(filename, 1)
    
    ProcessFile = file.ReadAll
    file.Close ' Close inside the function
    
    Set file = Nothing
    Set fso = Nothing
End Function

content = ProcessFile("C:\temp\data.txt")
WScript.Echo content

The function opens a file, reads content, then closes it before returning. This
pattern encapsulates the entire file operation lifecycle. It's a clean approach
that prevents resource leaks when files are processed in functions.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Close method in VBScript,
covering its usage and practical applications. From basic file operations to
error handling scenarios, these examples demonstrate proper resource management.
With this knowledge, you can write more reliable file handling scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).