+++
title = "VBScript Column Property"
date = 2025-08-29T20:14:55.240+01:00
draft = false
description = "Learn about VBScript Column property, including file reading, position tracking, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Column Property

last modified April 9, 2025

The Column property in VBScript is part of the
TextStream object. It returns the column number of the current
character position in a text file. This property is read-only and useful for
tracking position when reading or writing files. It helps in precise file
manipulation and error reporting.

Column counts from 1 at the beginning of each line. It's updated
automatically as you read or write to the file. This tutorial covers
Column with practical examples to demonstrate its usage in file
operations.

## Column Property Overview

The Column property provides the current column position in a line
of text. It's available through TextStream objects created by
FileSystemObject. The property is particularly useful for parsing
structured text files.

Key features include automatic position tracking and line-based counting. It
resets to 1 at the start of each new line. Column works with both
reading and writing operations. Understanding this property helps create robust
file processing scripts.

## Basic Column Tracking

This example demonstrates basic usage of the Column property while
reading a file. It shows how the column number changes as we read characters.
The script reads a file and outputs each character with its column position.

basic_column.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("sample.txt", 1)

Do Until file.AtEndOfStream
    char = file.Read(1)
    WScript.Echo "Char: " &amp; char &amp; ", Column: " &amp; file.Column
Loop

file.Close
Set fso = Nothing

The script opens "sample.txt" and reads it character by character. For each
character, it outputs the character and its column position. The
Column property automatically increments after each read operation.

## Tracking Columns Across Lines

This example shows how the Column property behaves across multiple
lines. It demonstrates the automatic reset to 1 at the start of each new line.
The script reads a multi-line file and tracks column positions.

multiline_column.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("multiline.txt", 1)

Do Until file.AtEndOfStream
    line = file.ReadLine()
    WScript.Echo "Line: " &amp; line
    WScript.Echo "Next line starts at column: " &amp; file.Column
Loop

file.Close
Set fso = Nothing

The script reads "multiline.txt" line by line. After each ReadLine,
the Column property shows 1, indicating the start of a new line.
This demonstrates how column counting resets after line breaks.

## Writing with Column Tracking

This example demonstrates using the Column property while writing to
a file. It shows how column position updates during write operations. The script
writes text while tracking the current column position.

write_column.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("output.txt")

file.Write "Hello"
WScript.Echo "After 'Hello': " &amp; file.Column

file.Write " World"
WScript.Echo "After ' World': " &amp; file.Column

file.WriteLine "!"
WScript.Echo "After new line: " &amp; file.Column

file.Close
Set fso = Nothing

The script creates "output.txt" and writes text while monitoring column
positions. After each write operation, it displays the current column. The
WriteLine method resets the column to 1 for the next line.

## Column Position in Error Handling

This example shows how the Column property can assist in error
handling. It helps identify the exact position of problematic data in a file.
The script parses a CSV file and reports errors with column positions.

error_handling.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("data.csv", 1)

Do Until file.AtEndOfStream
    char = file.Read(1)
    If Not IsNumeric(char) And char &lt;&gt; "," Then
        WScript.Echo "Error at column " &amp; file.Column &amp; ": '" &amp; char &amp; "'"
    End If
Loop

file.Close
Set fso = Nothing

The script checks each character in "data.csv" for numeric values or commas.
When it finds an invalid character, it reports the error with the column
position. This precise error reporting helps in debugging file format issues.

## Advanced Column Tracking

This example demonstrates advanced column tracking with custom delimiters. It
shows how to use Column with Skip and
SkipLine methods. The script processes a file with specific format
requirements.

advanced_tracking.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("formatted.txt", 1)

Do Until file.AtEndOfStream
    If file.Column = 1 Then
        header = file.ReadLine()
        WScript.Echo "Header: " &amp; header
    Else
        file.Skip(5) ' Skip 5 columns
        data = file.Read(10)
        WScript.Echo "Data: " &amp; data
    End If
Loop

file.Close
Set fso = Nothing

The script processes "formatted.txt" with headers at column 1. It skips 5
columns after headers and reads 10 characters of data. The Column
property helps identify header lines and position the read operations precisely.

## Source

[TextStream Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Column property in VBScript,
covering its usage and practical applications. From basic position tracking to
advanced file processing, these examples demonstrate precise column management.
With this knowledge, you can enhance your file handling scripts with accurate
position tracking.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).