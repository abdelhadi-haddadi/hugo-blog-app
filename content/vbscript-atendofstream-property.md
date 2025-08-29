+++
title = "VBScript AtEndOfStream Property"
date = 2025-08-29T20:14:53.030+01:00
draft = false
description = "Learn about VBScript AtEndOfStream property, including file reading, stream operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AtEndOfStream Property

last modified April 9, 2025

The AtEndOfStream property in VBScript is part of the
TextStream object. It indicates whether the current position is at
the end of a text file. This property is read-only and returns a Boolean value.
It's essential for reading files line by line or character by character.

AtEndOfStream helps prevent errors when processing file contents.
It's commonly used in loops to read until the file ends. This tutorial covers
AtEndOfStream with practical examples to demonstrate its usage.

## AtEndOfStream Property Overview

The AtEndOfStream property returns True if the file pointer is at
the end of the file. Otherwise, it returns False. It works with files opened
through the FileSystemObject in VBScript. The property is available
only for reading text files.

Key features include automatic detection of file end and simple Boolean return.
It doesn't modify the file or its contents. AtEndOfStream is
typically used with ReadLine or ReadAll methods.
Understanding this property helps create robust file reading scripts.

## Basic File Reading with AtEndOfStream

This example demonstrates the simplest use of AtEndOfStream to read
a file line by line. It shows how to check for end-of-file condition. The script
reads until the entire file is processed.

basic_read.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\data.txt", 1) ' 1 = ForReading

Do Until file.AtEndOfStream
    line = file.ReadLine
    WScript.Echo line
Loop

file.Close
Set file = Nothing
Set fso = Nothing

The script creates a FileSystemObject and opens a file for reading.
The loop continues until AtEndOfStream returns True. Each iteration
reads one line and displays it. Finally, resources are properly cleaned up.

## Reading Entire File at Once

This example shows how to use AtEndOfStream with ReadAll.
It demonstrates checking the property before reading the entire file contents.
This approach is useful for small files.

read_all.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\note.txt", 1)

If Not file.AtEndOfStream Then
    content = file.ReadAll
    WScript.Echo content
End If

file.Close
Set file = Nothing
Set fso = Nothing

The script checks AtEndOfStream before reading. If the file isn't
empty, it reads all contents at once. This is efficient for small files but
should be avoided with large files. The property prevents unnecessary operations.

## Character-by-Character Reading

This example demonstrates using AtEndOfStream to read a file one
character at a time. It shows precise control over file reading operations.
Each character is processed individually until the end.

char_read.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\chars.txt", 1)

Do Until file.AtEndOfStream
    char = file.Read(1)
    WScript.Echo "Character: " &amp; char
Loop

file.Close
Set file = Nothing
Set fso = Nothing

The script reads exactly one character per iteration. AtEndOfStream
ensures the loop stops at the file's end. This approach is useful for parsing
or processing individual characters. It provides maximum control over reading.

## Processing CSV Files

This example shows practical use of AtEndOfStream with CSV files.
It demonstrates reading and parsing comma-separated values. Each line is split
into components for further processing.

csv_reader.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\data.csv", 1)

Do Until file.AtEndOfStream
    line = file.ReadLine
    values = Split(line, ",")
    WScript.Echo "Name: " &amp; values(0) &amp; ", Age: " &amp; values(1)
Loop

file.Close
Set file = Nothing
Set fso = Nothing

The script reads each CSV line until the end. AtEndOfStream ensures
all lines are processed. Each line is split into an array of values. This
pattern is common for data processing scripts. The property makes the loop safe.

## Counting Lines in a File

This example uses AtEndOfStream to count lines in a text file. It
demonstrates how to use the property for file analysis. The script maintains a
counter while reading through the file.

line_counter.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("C:\temp\log.txt", 1)
lineCount = 0

Do Until file.AtEndOfStream
    file.ReadLine
    lineCount = lineCount + 1
Loop

WScript.Echo "Total lines: " &amp; lineCount

file.Close
Set file = Nothing
Set fso = Nothing

The script increments a counter for each line read. AtEndOfStream
ensures all lines are counted. This approach is memory-efficient for large
files. The property provides the loop termination condition. The result shows
the total line count.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the AtEndOfStream property in
VBScript, covering its usage and practical applications. From basic file reading
to complex data processing, these examples demonstrate reliable file handling.
With this knowledge, you can enhance your file processing scripts with robust
end-of-file detection.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).