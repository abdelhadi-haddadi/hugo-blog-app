+++
title = "VBScript ReadLine Method"
date = 2025-08-29T20:15:12.049+01:00
draft = false
description = "Learn about VBScript ReadLine method, including file reading, text processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ReadLine Method

last modified April 9, 2025

The ReadLine method in VBScript is part of the
FileSystemObject TextStream object. It reads one line from a text
file and returns it as a string. This method is essential for processing text
files line by line. It automatically advances to the next line after reading.

ReadLine is commonly used in file processing scripts to handle log
files, configuration files, and data files. It stops at each line break
character sequence. This tutorial covers ReadLine with practical
examples to demonstrate its usage.

## ReadLine Method Overview

The ReadLine method reads a single line from an open text file. It
returns the line content without the line break characters. The method requires
a TextStream object opened for reading. It moves the file pointer to the next
line after each call.

Key features include automatic line break handling and sequential reading. It
returns an empty string for blank lines. At end-of-file, it raises an error.
Understanding this method helps create robust file processing scripts.

## Basic File Reading

This example demonstrates the simplest use of ReadLine to read a
file line by line. It shows how to open a file, read its contents, and close it.
The script outputs each line to the console.

basic_readline.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\sample.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfStream
    line = file.ReadLine
    WScript.Echo line
Loop

file.Close
Set fso = Nothing

The script creates a FileSystemObject and opens a text file. The
Do Until loop reads each line until end-of-file. Each line is
displayed using WScript.Echo. Finally, resources are cleaned up.

## Processing CSV File

This example shows how to process a CSV file using ReadLine. It
reads each line and splits it into fields. The script demonstrates basic data
parsing from a structured text file.

process_csv.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\data\employees.csv", 1)

' Skip header line if needed
file.ReadLine

Do Until file.AtEndOfStream
    line = file.ReadLine
    fields = Split(line, ",")
    WScript.Echo "Name: " &amp; fields(0) &amp; ", Department: " &amp; fields(2)
Loop

file.Close
Set fso = Nothing

The script reads a CSV file containing employee data. Each line is split into
fields using the comma delimiter. The script then outputs specific fields. Note
how the header line can be skipped if needed.

## Counting Lines in a File

This example demonstrates using ReadLine to count lines in a file.
It shows how to process a file while maintaining a counter. The script provides
basic file statistics.

count_lines.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\logs\app.log", 1)
lineCount = 0

Do Until file.AtEndOfStream
    file.ReadLine
    lineCount = lineCount + 1
Loop

WScript.Echo "Total lines: " &amp; lineCount

file.Close
Set fso = Nothing

The script opens a log file and initializes a counter. Each ReadLine
call increments the counter. The total line count is displayed at the end. This
pattern is useful for file analysis tasks.

## Searching File Contents

This example shows how to search for specific text in a file using
ReadLine. It reads each line and checks for a match. The script
demonstrates basic text search functionality.

search_file.vbs
  

searchTerm = "ERROR"
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\logs\system.log", 1)
lineNumber = 0

Do Until file.AtEndOfStream
    line = file.ReadLine
    lineNumber = lineNumber + 1
    
    If InStr(line, searchTerm) &gt; 0 Then
        WScript.Echo "Found at line " &amp; lineNumber &amp; ": " &amp; line
    End If
Loop

file.Close
Set fso = Nothing

The script searches for "ERROR" in a log file. Each line is checked using
InStr. Matching lines are displayed with their line numbers. This
approach is useful for log analysis and debugging.

## Reading Configuration File

This example demonstrates reading a configuration file with
ReadLine. It processes key-value pairs separated by equals signs.
The script shows how to parse simple configuration files.

read_config.vbs
  

Set config = CreateObject("Scripting.Dictionary")
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\app\config.ini", 1)

Do Until file.AtEndOfStream
    line = file.ReadLine
    If InStr(line, "=") &gt; 0 Then
        parts = Split(line, "=")
        key = Trim(parts(0))
        value = Trim(parts(1))
        config.Add key, value
    End If
Loop

' Access configuration values
WScript.Echo "Timeout: " &amp; config("timeout")

file.Close
Set fso = Nothing

The script reads a configuration file storing settings in a Dictionary. Each
key-value pair is split and trimmed. The configuration can then be accessed
through the Dictionary object. This pattern is useful for script configuration.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the ReadLine method in VBScript,
covering its usage and practical applications. From simple file reading to
complex data processing, these examples demonstrate line-based file handling.
With this knowledge, you can enhance your file processing scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).