+++
title = "VBScript OpenAsTextStream Method"
date = 2025-08-29T20:15:09.871+01:00
draft = false
description = "Learn about VBScript OpenAsTextStream method, including file reading, writing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript OpenAsTextStream Method

last modified April 9, 2025

The OpenAsTextStream method in VBScript is part of the
FileSystemObject. It opens a specified file and returns a
TextStream object. This allows reading from, writing to, or
appending to the file. The method provides flexible file access modes for
different operations.

OpenAsTextStream is commonly used for text file manipulation. It
supports three access modes: reading, writing, and appending. This tutorial
covers OpenAsTextStream with practical examples to demonstrate its
usage in various scenarios.

## OpenAsTextStream Method Overview

The OpenAsTextStream method takes two optional parameters: IOMode
and Format. IOMode specifies how the file will be accessed (read, write, or
append). Format defines the file's character encoding (ASCII or Unicode).

Key features include sequential file access and text manipulation capabilities.
The method requires the file to exist unless opening in write mode. It returns a
TextStream object for file operations. Understanding this method
helps create robust file handling scripts.

## Basic File Reading

This example demonstrates reading a file using OpenAsTextStream.
It shows how to open a file in read mode and display its contents. The script
reads the entire file line by line and outputs each line.

basic_reading.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\sample.txt")
Set ts = file.OpenAsTextStream(1) ' 1 = ForReading

Do Until ts.AtEndOfStream
    WScript.Echo ts.ReadLine
Loop

ts.Close
Set fso = Nothing

The script creates a FileSystemObject and gets a reference to the
file. It opens the file in read mode (1) and reads until the end. Each line is
output using WScript.Echo. Finally, it closes the TextStream and
cleans up objects.

## Writing to a File

This example shows how to write to a file using OpenAsTextStream.
It demonstrates opening a file in write mode (2) and writing new content. The
existing file content will be overwritten when using write mode.

file_writing.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\output.txt")
Set ts = file.OpenAsTextStream(2) ' 2 = ForWriting

ts.WriteLine "This is line 1"
ts.WriteLine "This is line 2"
ts.Write "This is line 3 without newline"

ts.Close
Set fso = Nothing

The script opens the file in write mode (2) and writes three lines of text. The
WriteLine method adds a newline after each string, while
Write does not. The file will contain exactly what was written,
replacing any previous content.

## Appending to a File

This example demonstrates appending content to an existing file. It shows how to
open a file in append mode (8) and add new content. Unlike write mode, append
mode preserves existing file content.

file_appending.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\log.txt")
Set ts = file.OpenAsTextStream(8) ' 8 = ForAppending

ts.WriteLine "New log entry: " &amp; Now()

ts.Close
Set fso = Nothing

The script opens the log file in append mode (8) and adds a new entry with the
current date and time. Each time the script runs, a new line is added to the
file. This is useful for log files or data collection scenarios.

## Reading with Unicode Encoding

This example shows how to specify Unicode encoding when opening a file. The
second parameter of OpenAsTextStream controls the text format. Use
-1 for Unicode or 0 for ASCII (default).

unicode_reading.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\unicode_file.txt")
Set ts = file.OpenAsTextStream(1, -1) ' 1 = ForReading, -1 = Unicode

content = ts.ReadAll
WScript.Echo content

ts.Close
Set fso = Nothing

The script opens a Unicode text file in read mode with Unicode format specified.
The ReadAll method reads the entire file content at once. This
approach is useful when working with files containing non-ASCII characters or
special symbols.

## Combining Read and Write Operations

This example demonstrates more complex file operations by combining reading and
writing. It shows how to read a file, process its content, and write modified
data back. The script uses separate TextStream objects for input and output.

read_write_combined.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\temp\data.txt")

' Read original content
Set inputTS = file.OpenAsTextStream(1) ' 1 = ForReading
content = inputTS.ReadAll
inputTS.Close

' Process content
processedContent = UCase(content)

' Write processed content
Set outputTS = file.OpenAsTextStream(2) ' 2 = ForWriting
outputTS.Write processedContent
outputTS.Close

Set fso = Nothing

The script first reads the entire file content, converts it to uppercase, then
writes it back. Note that two separate TextStream objects are used for reading
and writing. This pattern is common for file transformation tasks.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the OpenAsTextStream method in
VBScript, covering its usage and practical applications. From basic file reading
to complex read-write operations, these examples demonstrate flexible file
handling. With this knowledge, you can enhance your scripts with robust file
processing capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).