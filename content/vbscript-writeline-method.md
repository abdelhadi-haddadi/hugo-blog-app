+++
title = "VBScript WriteLine Method"
date = 2025-08-29T20:15:17.662+01:00
draft = false
description = "Learn about VBScript WriteLine method, including text file writing, output operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript WriteLine Method

last modified April 9, 2025

The WriteLine method in VBScript is part of the
TextStream object from the FileSystemObject. It writes
a specified string to a text file followed by a newline character. This method
is essential for creating structured text files with line breaks. It's commonly
used in logging and data export operations.

WriteLine automatically appends a line terminator after each call.
It simplifies file writing by handling line breaks consistently. This tutorial
covers WriteLine with practical examples to demonstrate its usage.

## WriteLine Method Overview

The WriteLine method writes data to a text file and moves to the
next line. It's available through TextStream objects created by
FileSystemObject. The method accepts an optional string parameter.
If omitted, it writes just a newline character.

Key features include automatic newline handling and sequential file writing. It
works with files opened for writing or appending. WriteLine is
ideal for creating human-readable text files. Understanding this method helps
create effective file output scripts.

## Basic File Writing

This example demonstrates the simplest use of WriteLine to create a
new text file. It shows how to write a single line of text to a file. The file
is created if it doesn't exist or overwritten if it does.

basic_writeline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\example.txt")

file.WriteLine "This is the first line of text."
file.Close

Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and a new text file. The
WriteLine method writes text followed by a newline. The file is
then closed properly. This demonstrates basic file creation and writing.

## Writing Multiple Lines

This example shows how to write multiple lines to a file using consecutive
WriteLine calls. Each call creates a new line in the output file.
The example creates a simple three-line text file.

multiple_lines.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\multiline.txt")

file.WriteLine "Line 1: This is the first line."
file.WriteLine "Line 2: This is the second line."
file.WriteLine "Line 3: This is the third line."
file.Close

Set file = Nothing
Set fso = Nothing

The script writes three distinct lines to the file. Each WriteLine
call automatically moves to the next line. The resulting file will have exactly
three lines with proper line breaks between them.

## Appending to Existing Files

This example demonstrates how to append text to an existing file using
WriteLine. The OpenTextFile method with parameter 8
opens the file in append mode. New content is added at the end of the file.

append_file.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\log.txt", 8, True)

file.WriteLine "New log entry: " &amp; Now()
file.Close

Set file = Nothing
Set fso = Nothing

The script opens an existing file for appending. The WriteLine call
adds a timestamped log entry. The True parameter creates the file if it doesn't
exist. This pattern is useful for logging operations.

## Writing Empty Lines

WriteLine can create empty lines in files when called without
parameters. This example shows how to add vertical spacing in text files. Empty
lines can improve file readability and organization.

empty_lines.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\spaced.txt")

file.WriteLine "Section Header"
file.WriteLine
file.WriteLine "This text appears after an empty line."
file.Close

Set file = Nothing
Set fso = Nothing

The script writes a header, then an empty line, then more text. The empty
WriteLine call inserts just a newline character. This creates
visual separation between sections in the output file.

## Writing Variable Content

This example demonstrates writing variable values to a file using
WriteLine. It shows how to combine fixed text with variable data.
The script creates a simple report with dynamic content.

variable_content.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("C:\temp\report.txt")

userName = "John Doe"
itemsProcessed = 42
processingTime = "2 minutes 15 seconds"

file.WriteLine "Processing Report"
file.WriteLine "----------------"
file.WriteLine "User: " &amp; userName
file.WriteLine "Items processed: " &amp; itemsProcessed
file.WriteLine "Time taken: " &amp; processingTime
file.Close

Set file = Nothing
Set fso = Nothing

The script combines literal strings with variable values in the output. Each
WriteLine call builds its output dynamically. This technique is
useful for generating reports with runtime data.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the WriteLine method in VBScript,
covering its usage and practical applications. From basic file creation to
dynamic content writing, these examples demonstrate effective text file
operations. With this knowledge, you can enhance your scripts with robust file
output capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).